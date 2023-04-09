from endpoints.roles.models import RoleInfoList, RoleInfo
from db.requests.roles import (get_roles_sql_request, get_role_sql_request, set_role_sql_request,
                                   update_role_sql_request, delete_role_sql_request, delete_role_acl_sql_request,
                                   get_role_name_sql_request)
from db import get_db_data, set_db_data
from endpoints.users.utils import get_current_user
from endpoints.exceptions import ObjectNotFound
from config import APP_LOG_ERROR
from endpoints.utils import http_exception

from fastapi import APIRouter, Security, status
from pydantic import ValidationError

router = APIRouter(
    prefix='/roles',
    tags=['Roles'],
    responses={404: {'detail': 'Not found'}},
)


@router.get('/', response_model=RoleInfoList)
async def get_all_roles(limit: int = 1000000,
                        offset: int = 0,
                        current_user=Security(get_current_user, scopes=['admin'])):
    roles_list = get_db_data(get_roles_sql_request, (limit,
                                                     offset))
    roles_list_info = RoleInfoList(roles=roles_list)
    return roles_list_info


@router.get('/{role_id:int}', response_model=RoleInfo)
async def get_role(role_id: int,
                   current_user=Security(get_current_user, scopes=['admin'])):
    try:
        role_info_result = get_db_data(get_role_sql_request, (role_id,))
        if role_info_result:
            role_info = RoleInfo(**role_info_result[0])
            return role_info
        else:
            raise ObjectNotFound(f'Роль ID: {role_id} не найдена')
    except ObjectNotFound as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_404_NOT_FOUND)
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.post('/', status_code=status.HTTP_201_CREATED)
async def new_role(role_info: RoleInfo,
                   current_user=Security(get_current_user, scopes=['admin'])):
    try:
        set_db_data(set_role_sql_request, (role_info.name,
                                           role_info.title,
                                           role_info.description,
                                           role_info.active,
                                           role_info.is_system))
    except ValidationError as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.patch('/', status_code=status.HTTP_204_NO_CONTENT)
async def update_role(role_info: RoleInfo,
                      current_user=Security(get_current_user, scopes=['admin'])):
    try:
        role_result = get_db_data(get_role_sql_request, (role_info.id,))
        if role_result:
            role_id = role_result[0].get('id')
            set_db_data(update_role_sql_request, (role_info.name,
                                                  role_info.title,
                                                  role_info.description,
                                                  role_info.active,
                                                  role_info.is_system,
                                                  role_id))
        else:
            raise ObjectNotFound(f'Роль ID: {role_info.id} не найдена')
    except ObjectNotFound as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_404_NOT_FOUND)
    except ValidationError as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.delete('/{role_id:int}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_role(role_id: int,
                      current_user=Security(get_current_user, scopes=['admin'])):
    try:
        role_result = get_db_data(get_role_sql_request, (role_id, ))
        if role_result:
            set_db_data(delete_role_acl_sql_request, (role_id,))
            set_db_data(delete_role_sql_request, (role_id,))
        else:
            raise ObjectNotFound(f'Роль ID: {role_id} не найдена')
    except ObjectNotFound as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_404_NOT_FOUND)
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.delete('/{role_name:str}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_role_name(role_name: str,
                           current_user=Security(get_current_user, scopes=['admin'])):
    try:
        role_result = get_db_data(get_role_name_sql_request, (role_name, ))
        if role_result:
            role_id = role_result[0].get('id')
            set_db_data(delete_role_acl_sql_request, (role_id,))
            set_db_data(delete_role_sql_request, (role_id,))
        else:
            raise ObjectNotFound(f'Роль: {role_name} не найдена')
    except ObjectNotFound as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_404_NOT_FOUND)
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)
