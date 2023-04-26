# Import Libraries
import uvicorn
import pickle
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize fast API server
app = FastAPI()
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Load trained model
model = pickle.load(open('../model/predictive-model.pkl', 'rb'))


# Define model input types
class Candidate(BaseModel):
    gender: int
    bsc: float
    workex: int
    etest_p: float
    msc: float


# Set home route
@app.get("/")
def home():
    return {'data': "Welcome to the online employee hiring prediction model"}


# Configure server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8000, host='0.0.0.0')
