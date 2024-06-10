import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from fastapi.responses import JSONResponse

app = FastAPI()

question_answers = {
    "Budget Analysis Overview": "The budget analysis provides a comprehensive review of the government's financial planning and allocation for the fiscal year.",
    "Tax Proposals Summary": "The tax proposals include new tax brackets, changes in corporate tax rates, and introduction of digital service taxes.",
    "Expenditure Breakdown": "The expenditure breakdown details the allocation of funds across various sectors such as healthcare, education, and defense.",
    "DisInvestment Target Explained": "The disinvestment target outlines the government's plan to reduce its stake in public sector enterprises to raise revenue.",
    "Focus on Fiscal Responsibility": "The focus on fiscal responsibility includes measures to reduce the fiscal deficit and manage public debt effectively."
}



@app.middleware("http")
async def add_cors_headers(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "https://fixit-zdxv.vercel.app, http://localhost:8000"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

origins = [
    "https://fixit-zdxv.vercel.app",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for question response
class QuestionResponse(BaseModel):
    question: str
    answer: str

# Default route
@app.get('/')
async def index():
    return {"message": "hello"}

# Endpoint to retrieve list of questions
@app.get("/questions", response_model=List[str])
async def get_questions():
    return list(question_answers.keys())


# Endpoint to retrieve answer for a given question
@app.get("/answer/{question}", response_model=QuestionResponse)
async def get_answer(question: str):
    decoded_question = question.replace("%20", " ")
    logging.info(f"Decoded Question: {decoded_question}")
    answer = question_answers.get(decoded_question, "Answer not found")
    logging.info(f"Question: {decoded_question}, Answer: {answer}")
    return {"question": decoded_question, "answer": answer}


