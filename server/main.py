import uvicorn
from fastapi import FastAPI

app = FastAPI()

x = "Alone again, naturally."

@app.get("/")
async def root():
    return {"message": x}

if __name__ == "__main__":
    uvicorn.run("main:app", 
                reload=True,
                port=3001)