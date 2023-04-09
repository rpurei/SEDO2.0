from config import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, APP_LOG_ERROR
from endpoints.utils import http_exception

import pymysql.cursors
from fastapi import status


def get_db_data(sql_request: str, sql_args: tuple) -> tuple:
    try:
        connection = pymysql.connect(host=DB_HOST,
                                     user=DB_USER,
                                     password=DB_PASSWORD,
                                     database=DB_NAME,
                                     cursorclass=pymysql.cursors.DictCursor)
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(sql_request, sql_args)
                result = cursor.fetchall()
                return result
    except pymysql.Error as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)


def set_db_data(sql_request: str, sql_args: tuple) -> int:
    try:
        connection = pymysql.connect(host=DB_HOST,
                                     user=DB_USER,
                                     password=DB_PASSWORD,
                                     database=DB_NAME)
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(sql_request, sql_args)
            connection.commit()
        return cursor.lastrowid
    except pymysql.Error as err:
        http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)
