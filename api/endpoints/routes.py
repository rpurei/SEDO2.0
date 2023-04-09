from endpoints.users.routes import router as users_router
from endpoints.roles.routes import router as roles_router

from fastapi import APIRouter

router = APIRouter(prefix='/api')


@router.get('/')
async def root():
    return {'message': 'API online!'}


router.include_router(users_router)
router.include_router(roles_router)
