from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class RoleInfo(BaseModel):
    id: Optional[int] = None
    name: str
    title: str
    description: Optional[str] = None
    active: bool
    is_system: bool
    created: Optional[datetime] = None
    updated: Optional[datetime] = None


class RoleInfoList(BaseModel):
    roles: List[RoleInfo] = None
