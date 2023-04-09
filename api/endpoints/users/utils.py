from endpoints.users.oauth import OAuth2PasswordBearerWithCookie
from config import (LDAP_SERVER_NAME, LDAP_BIND_USER_NAME, LDAP_BIND_USER_PASSWORD, LDAP_BASE_DN, LDAP_DOMAIN_NAME,
                    APP_LOG_ERROR, AUTH_TYPE_LDAP, AUTH_TYPE_LOCAL, USER_ROLE_ID,
                    JWT_SECRET_KEY, JWT_ALGORITHM, JWT_EXPIRE_MINUTES)
from db import get_db_data, set_db_data
from db.requests.users import (get_user_sql_request, get_user_roles_sql_request,
                               set_user_ldap_sql_request, set_user_role_sql_request, set_user_local_sql_request)
from db.requests.roles import get_role_id_sql_request
from endpoints.users.models import UserInfo
from endpoints.utils import http_exception
from endpoints.exceptions import UserNotFound, UserNotActive

import ldap
from fastapi import status, Depends
from fastapi.security import SecurityScopes
import bcrypt
from datetime import datetime, timedelta
from jose import JWTError, jwt
from typing import List

oauth2_scheme = OAuth2PasswordBearerWithCookie(tokenUrl='login',
                                               scopes={'admin': 'Admin access role',
                                                       'user': 'User access role',
                                                       'creator': 'Content manager role'})


def get_ldap_register_info(address: str, bind_username: str, bind_password: str, user_login: str) -> dict:
    conn = ldap.initialize('ldap://' + address)
    conn.protocol_version = 3
    conn.set_option(ldap.OPT_REFERRALS, 0)
    basedn = LDAP_BASE_DN
    search_filter = f'(&(objectCategory=person)(objectClass=user)(sAMAccountName={user_login}))'
    search_attribute = ['mail', 'cn']
    search_scope = ldap.SCOPE_SUBTREE
    register_result = {'status': '', 'login': '', 'mail': '', 'full_name': ''}
    try:
        conn.simple_bind_s(bind_username, bind_password)
        try:
            ldap_result_id = conn.search(basedn, search_scope, search_filter, search_attribute)
            while 1:
                result_type, result_data = conn.result(ldap_result_id, 0)
                if not result_data:
                    register_result['status'] = 'USER_NOT_FOUNDED'
                    break
                else:
                    if result_type == ldap.RES_SEARCH_ENTRY:
                        register_result['full_name'] = result_data[0][1]['cn'][0].decode('utf-8')
                        register_result['login'] = user_login
                        register_result['mail'] = result_data[0][1]['mail'][0].decode('utf-8')
            if len(register_result['login']) > 0:
                register_result['status'] = 'USER_FOUNDED'
        except ldap.LDAPError as e:
            http_exception(str(e), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)
    except ldap.INVALID_CREDENTIALS:
        register_result['status'] = 'LDAP_SRV_INVALID_CRED'
    except ldap.SERVER_DOWN:
        register_result['status'] = 'LDAP_SRV_UNREACHABLE'
    except ldap.LDAPError as e:
        register_result['status'] = f'LDAP_OTHER_ERROR: {str(e)}'
    finally:
        conn.unbind_s()
    return register_result


def get_user_roles(username: str) -> list:
    roles_list = []
    try:
        user_roles_list = get_db_data(get_user_roles_sql_request, (username,))
        if user_roles_list:
            for row in user_roles_list:
                roles_list.append(row.get('name'))
        return roles_list
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)


def ldap_auth(address: str, bind_username: str, bind_password: str) -> dict:
    conn = ldap.initialize('ldap://' + address)
    conn.protocol_version = 3
    conn.set_option(ldap.OPT_REFERRALS, 0)
    auth_result = {'status': ''}
    try:
        conn.simple_bind_s(f'{bind_username}@{LDAP_DOMAIN_NAME}', bind_password)
        auth_result['status'] = 'USER_AUTHENTICATED'
        auth_result['username'] = bind_username
        auth_result['roles'] = get_user_roles(bind_username)
    except ldap.INVALID_CREDENTIALS:
        auth_result['status'] = 'INVALID_CREDENTIALS'
    except ldap.SERVER_DOWN:
        auth_result['status'] = 'LDAP_SRV_UNREACHABLE'
    except ldap.LDAPError as e:
        auth_result['status'] = f'LDAP_OTHER_ERROR: {str(e)}'
    finally:
        conn.unbind_s()
    return auth_result


def local_auth(username: str, password: str) -> dict:
    auth_result = {'status': ''}
    try:
        users_list = get_db_data(get_user_sql_request, (username,))
        if bcrypt.checkpw(password.encode('utf8'), users_list[0].get('password').encode('utf8')):
            auth_result['status'] = 'USER_AUTHENTICATED'
            auth_result['username'] = username
            auth_result['roles'] = get_user_roles(username)
        else:
            auth_result['status'] = 'INVALID_CREDENTIALS'
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)
    return auth_result


def authenticate_user(username: str, password: str) -> dict:
    user = {'status': ''}
    try:
        users_list = get_db_data(get_user_sql_request, (username,))
        if users_list:
            if users_list[0].get('auth_source') == AUTH_TYPE_LOCAL:
                user = local_auth(username, password)
            elif users_list[0].get('auth_source') == AUTH_TYPE_LDAP:
                user = ldap_auth(LDAP_SERVER_NAME, username, password)
            else:
                raise TypeError('Authentication type unsupported')
        else:
            reg_result = get_ldap_register_info(LDAP_SERVER_NAME,
                                                f'{LDAP_BIND_USER_NAME}@{LDAP_DOMAIN_NAME}',
                                                LDAP_BIND_USER_PASSWORD,
                                                username)
            if reg_result.get('status') == 'USER_FOUNDED':
                user = ldap_auth(LDAP_SERVER_NAME, username, password)
                if user.get('status') == 'USER_AUTHENTICATED':
                    user_id = set_db_data(set_user_ldap_sql_request,
                                          (reg_result.get('login'),
                                           reg_result.get('full_name'),
                                           reg_result.get('mail'),
                                           AUTH_TYPE_LDAP))
                    set_db_data(set_user_role_sql_request, (user_id, USER_ROLE_ID))
                    user['roles'] = get_user_roles(username)
                else:
                    user['status'] = user.get('status')
            else:
                user['status'] = reg_result.get('status')
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)
    return user


def set_local_user(username: str, password: str, full_name: str, mail: str, roles: List[str]):
    try:
        user_id = set_db_data(set_user_local_sql_request, (username,
                                                           bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt()),
                                                           full_name,
                                                           mail,
                                                           AUTH_TYPE_LOCAL))
        for role in roles:
            role_id = get_db_data(get_role_id_sql_request, (role,))[0].get('id')
            set_db_data(set_user_role_sql_request, (user_id, role_id))
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)


def create_access_token(data: dict) -> str:
    expires_delta = timedelta(minutes=JWT_EXPIRE_MINUTES)
    data_encode = data.copy()
    data_encode.update({'exp': datetime.utcnow() + expires_delta})
    encoded_jwt = jwt.encode(data_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt


def get_user(username: str, mode: str = 'auth') -> UserInfo:
    users_list = get_db_data(get_user_sql_request, (username,))
    if users_list:
        if users_list[0]['active'] == 1 and mode == 'auth':
            users_list[0]['roles'] = get_user_roles(username)
            return UserInfo(**users_list[0])
        elif users_list[0]['active'] == 0 and mode == 'auth':
            raise UserNotActive(f'Пользователь: {username} отключен')
        elif mode == 'info':
            users_list[0]['roles'] = get_user_roles(username)
            return UserInfo(**users_list[0])
    else:
        raise UserNotFound(f'Пользователь: {username} не найден')


async def get_current_user(security_scopes: SecurityScopes, token: str = Depends(oauth2_scheme)) -> UserInfo:
    user = None
    if not security_scopes.scopes:
        http_exception('Не указаны области OAuth', APP_LOG_ERROR, status.HTTP_401_UNAUTHORIZED)
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        token_username = payload.get('username')
        token_scopes = payload.get('roles', [])
        user = get_user(token_username)
        if not user:
            http_exception(f'Пользователь не найден', APP_LOG_ERROR, status.HTTP_401_UNAUTHORIZED)
        scope_match = False
        for scope in security_scopes.scopes:
            if scope in token_scopes:
                scope_match = True
        if not scope_match:
            raise PermissionError
    except JWTError as jwt_error:
        http_exception(f'Ошибка токена: {str(jwt_error)}', APP_LOG_ERROR, status.HTTP_401_UNAUTHORIZED)
    except PermissionError:
        http_exception('Недостаточно разрешений', APP_LOG_ERROR, status.HTTP_403_FORBIDDEN)
    except Exception as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)
    return user
