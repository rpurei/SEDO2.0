from endpoints.routes import router

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = ['http://localhost:4200']

app = FastAPI(docs_url='/api/docs',
              openapi_url='/api/openapi.json')
app.include_router(router)
app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=['*'],
                   allow_headers=['*'],)
