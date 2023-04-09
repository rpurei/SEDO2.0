from config import DEBUG, APP_LOG_ERROR, FILES_PATH, FILES_NAME_LENGTH
from app_logger import logger_output

from fastapi import HTTPException, status
import string
import random
import base64
from pathlib import Path


def http_exception(error_message: str, error_level: int, error_code: int):
    lf = '\n'
    logger_output(error_message, DEBUG, error_level)
    error_message = error_message.replace(lf, ' ')
    raise HTTPException(status_code=error_code,
                        detail=error_message)


def file_processing(json_image: str, file_category: str, file_name: str, file_extension: str, rand: bool) -> str:
    file_full_name = ''
    if len(json_image) > 0:
        file_dir = Path(FILES_PATH) / f'{str(file_category)}'
        file_dir.mkdir(parents=True, exist_ok=True)
        if rand:
            file_name = file_name + '_' + ''.join(random.choices(string.ascii_lowercase +
                                                                 string.digits,
                                                                 k=FILES_NAME_LENGTH)) + f'.{file_extension}'
        else:
            file_name = f'{file_name}.{file_extension}'
        file_full_name = file_dir / file_name
        try:
            with open(file_full_name, 'wb+') as f:
                f.write(base64.b64decode(json_image.encode('ascii')))
        except Exception as err:
            http_exception(str(err), APP_LOG_ERROR, status.HTTP_500_INTERNAL_SERVER_ERROR)
    return file_full_name.as_posix()


def file_check(file_category: str, file_name: str, file_extension: str) -> str:
    file_dir = Path(FILES_PATH) / f'{str(file_category)}'
    file_name = f'{file_name}.{file_extension}'
    file_full_name = file_dir / file_name
    if file_full_name.is_file():
        return file_full_name.as_posix()
    else:
        return ''


def file_delete(file_category: str, file_name: str, file_extension: str):
    file_dir = Path(FILES_PATH) / f'{str(file_category)}'
    file_name = f'{file_name}.{file_extension}'
    file_full_name = file_dir / file_name
    file_full_name.unlink(missing_ok=True)
