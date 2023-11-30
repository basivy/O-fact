from fastapi import FastAPI, Response , Depends
from starlette.responses import StreamingResponse
import time
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
app = FastAPI(title='My gennerator',summary ='gennerator',description='Gennerator response')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # แก้ไขเป็นโดเมนที่อนุญาต เช่น ["http://localhost", "https://yourdomain.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def get_body(request: Request):
    return await request.body()


@app.post('/generate', tags=['Answer Generation'])
async def get_response(body: bytes = Depends(get_body)):
    print(body.decode('utf-8').replace('%2C', ',').replace('%5D', ']').replace('%5B', '[').replace('+', ' '))
    time.sleep(2)
    return body


if __name__ == "__main__":
    uvicorn.run(host='127.0.0.1', port=8000, app=app)