import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)

question_answers = {
    "Budget Analysis Overview": "The budget analysis provides a comprehensive review of the government's financial planning and allocation for the fiscal year.",
    "Tax Proposals Summary": "The tax proposals include new tax brackets, changes in corporate tax rates, and introduction of digital service taxes.",
    "Expenditure Breakdown": "The expenditure breakdown details the allocation of funds across various sectors such as healthcare, education, and defense.",
    "DisInvestment Target Explained": "The disinvestment target outlines the government's plan to reduce its stake in public sector enterprises to raise revenue.",
    "Focus on Fiscal Responsibility": "The focus on fiscal responsibility includes measures to reduce the fiscal deficit and manage public debt effectively."
}

class QuestionResponse(BaseModel):
    question: str
    answer: str

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logging.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logging.info(f"Response status code: {response.status_code}")
    return response

@app.get('/')
async def index():
    return {"message": "hello"}

@app.get("/questions", response_model=List[str])
async def get_questions():
    return list(question_answers.keys())

@app.get("/answer/{question}", response_model=QuestionResponse)
async def get_answer(question: str):
    decoded_question = question.replace("%20", " ")
    logging.info(f"Decoded Question: {decoded_question}")
    answer = question_answers.get(decoded_question, "Answer not found")
    logging.info(f"Question: {decoded_question}, Answer: {answer}")
    return {"question": decoded_question, "answer": answer}
