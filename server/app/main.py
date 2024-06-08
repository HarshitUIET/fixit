from fastapi import FastAPI
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

@app.get("/questions", response_model=List[str])
async def get_questions():
    return list(question_answers.keys())

@app.get("/answer/{question}", response_model=QuestionResponse)
async def get_answer(question: str):
    answer = question_answers.get(question, "Answer not found")
    return {"question": question, "answer": answer}
