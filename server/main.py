from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path 

# GraphQL deps
import strawberry
from strawberry.fastapi import GraphQLRouter

import uvicorn

app = FastAPI()

# Allow CORS for the specific frontend (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", 'https://localhost:3001'],  # You can also allow multiple origins here
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# TODO move this code to ./schemas folder with typedefs and resolvers in seperate files
##
@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        return "Hello World"


schema = strawberry.Schema(Query)

graphql_app = GraphQLRouter(schema)
##

# GraphQL endpoint
app.include_router(graphql_app, prefix="/graphql")

# === Serve Static Files ===
client_dist_path = Path(__file__).parent.parent / 'client' / 'dist'
app.mount("/", StaticFiles(directory=client_dist_path), name="static")

# === Catch-All Route for Serving index.html ===
# @app.get("/{full_path:path}")
# async def serve_spa(full_path: str):
#     return FileResponse(client_dist_path / "index.html")

# spins up local server @ localhost:3001
if __name__ == "__main__":
    uvicorn.run("main:app", 
                reload=True,
                port=3001)
                # ssl_keyfile="./localhost-key.pem",
                # ssl_certfile="./localhost.pem")