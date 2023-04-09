from config import APP_LOG_ERROR
from endpoints.utils import http_exception
from endpoints.users.models import User, UserInfo, UserInfoList
from endpoints.users.utils import (authenticate_user, get_current_user, set_local_user, get_user, create_access_token,
                                   get_user_roles)
from endpoints.exceptions import UserNotFound, AuthError, UserNotActive
from db import get_db_data, set_db_data
from db.requests.users import (get_user_sql_request, delete_user_sql_request, delete_user_roles_sql_request,
                               update_user_sql_request, update_user_wpass_sql_request, set_user_role_sql_request,
                               get_user_id_sql_request, get_users_sql_request)
from db.requests.roles import get_role_id_sql_request
from endpoints.exceptions import ObjectNotFound

from fastapi import APIRouter, status, Security, Response, HTTPException
from pydantic import ValidationError
import bcrypt

router = APIRouter(
    prefix='/users',
    tags=['Users'],
    responses={404: {'detail': 'Not found'}},
)


@router.post('/login', response_model=UserInfo)
async def login(user_payload: User, response: Response):
    try:
        user_auth = authenticate_user(user_payload.username, user_payload.password)
        if not user_auth.get('username'):
            raise AuthError(f'Ошибка аутентификации: {user_auth.get("status")}')
        user_info = get_user(user_auth.get('username'))
        bearer_token = create_access_token(user_auth)
        response.set_cookie(key='access_token',
                            value=f'Bearer {bearer_token}',
                            httponly=True,
                            samesite="none",
                            secure=True)
        user_info.password = None
        return user_info
    except ValidationError as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except (AuthError, UserNotFound, UserNotActive) as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_401_UNAUTHORIZED)
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.post('/', status_code=status.HTTP_201_CREATED)
async def new_user(user_info: UserInfo,
                   current_user=Security(get_current_user, scopes=['admin'])):
    try:
        if user_info.password is None:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail='Password can\'t be empty')
        set_local_user(user_info.login,
                       user_info.password,
                       user_info.full_name,
                       user_info.email,
                       user_info.roles)
    except ValidationError as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.patch('/', status_code=status.HTTP_204_NO_CONTENT)
async def update_user(user_info: UserInfo,
                      current_user=Security(get_current_user, scopes=['admin'])):
    try:
        user_id_result = get_db_data(get_user_sql_request, (user_info.login,))
        if user_id_result:
            user_id = user_id_result[0].get('id')
            if user_info.password:
                set_db_data(update_user_wpass_sql_request, (bcrypt.hashpw(user_info.password.encode('utf8'),
                                                                          bcrypt.gensalt()),
                                                            user_info.active,
                                                            user_id))
            else:
                set_db_data(update_user_sql_request, (user_info.active,
                                                      user_id))
            set_db_data(delete_user_roles_sql_request, (user_id,))
            for role in user_info.roles:
                role_id = get_db_data(get_role_id_sql_request, (role,))[0].get('id')
                set_db_data(set_user_role_sql_request, (user_id, role_id))
        else:
            raise UserNotFound(f'Пользователь: {user_info.login} не найден')
    except ValidationError as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.delete('/{user_name:str}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_name: str,
                      current_user=Security(get_current_user, scopes=['admin'])):
    try:
        user_id_result = get_db_data(get_user_sql_request, (user_name,))
        if user_id_result:
            user_id = user_id_result[0].get('id')
            set_db_data(delete_user_roles_sql_request, (user_id,))
            set_db_data(delete_user_sql_request, (user_id,))
        else:
            raise UserNotFound(f'Пользователь: {user_name} не найден')
    except UserNotFound as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_404_NOT_FOUND)
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.delete('/{user_id:int}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int,
                      current_user=Security(get_current_user, scopes=['admin'])):
    try:
        user_id_result = get_db_data(get_user_id_sql_request, (user_id,))
        if user_id_result:
            user_id = user_id_result[0].get('id')
            set_db_data(delete_user_roles_sql_request, (user_id,))
            set_db_data(delete_user_sql_request, (user_id,))
        else:
            raise UserNotFound(f'Пользователь ID: {user_id} не найден')
    except UserNotFound as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_404_NOT_FOUND)
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.get('/', response_model=UserInfoList)
async def get_all_users(limit: int = 1000000,
                        offset: int = 0,
                        current_user=Security(get_current_user, scopes=['admin'])):
    try:
        userinfo_list = []
        user_list_result = get_db_data(get_users_sql_request, (limit,
                                                               offset))
        if user_list_result and isinstance(user_list_result, list):
            for user_info_result in user_list_result:
                user_info = get_user(user_info_result.get('login'), mode='info')
                if user_info.auth_source == 1:
                    user_info.password = "************"
                userinfo_list.append(user_info)
        user_info_list = UserInfoList(users=userinfo_list)
        return user_info_list
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.get('/{user_id:int}', response_model=UserInfo)
async def get_user_info(user_id: int,
                        current_user=Security(get_current_user, scopes=['admin'])):
    try:
        user_info_result = get_db_data(get_user_id_sql_request, (user_id,))
        if user_info_result:
            user_info = get_user(user_info_result[0].get('login'), mode='info')
            if user_info.auth_source == 1:
                user_info.password = "************"
            return user_info
        else:
            raise ObjectNotFound(f'Пользователь ID: {user_id} не найден')
    except ObjectNotFound as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_404_NOT_FOUND)
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)
