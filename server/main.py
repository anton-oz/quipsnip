from fastapi import FastAPI

app = FastAPI()

x = "Alone again, naturally."

@app.get("/")
async def root():
    return {"message": x}