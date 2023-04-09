from pydantic import BaseModel
from typing import List, Optional


class User(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class UserInfo(BaseModel):
    id: Optional[int] = None
    login: str
    password: Optional[str] = None
    full_name: str
    email: str
    auth_source: int
    active: bool
    roles: List[str]


class RolePermissions(BaseModel):
    role_name: str
    role_title: str
    permissions: List[str]


class UserInfoList(BaseModel):
    users: List[UserInfo]
