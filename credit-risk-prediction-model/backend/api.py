from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import Literal
import logging
from prediction_helper import predict

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Credit Risk Prediction API",
    description="ML-powered credit risk assessment API",
    version="2.0.0"
)

# CORS configuration for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ 
    "http://localhost:5173",  
    "https://credit-risk-prediction-software.vercel.app/",],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionRequest(BaseModel):
    """Request model for credit risk prediction"""
    age: int = Field(..., ge=18, le=100, description="Age of borrower")
    income: float = Field(..., gt=0, description="Annual income in INR")
    loan_amount: float = Field(..., gt=0, description="Requested loan amount")
    loan_tenure_months: int = Field(..., ge=1, le=360, description="Loan duration in months")
    avg_dpd_per_delinquency: int = Field(..., ge=0, description="Average days past due")
    delinquency_ratio: int = Field(..., ge=0, le=100, description="Delinquency ratio percentage")
    credit_utilization_ratio: int = Field(..., ge=0, le=100, description="Credit utilization percentage")
    num_open_accounts: int = Field(..., ge=1, le=10, description="Number of open loan accounts")
    residence_type: Literal['Owned', 'Rented', 'Mortgage'] = Field(..., description="Type of residence")
    loan_purpose: Literal['Education', 'Home', 'Auto', 'Personal'] = Field(..., description="Purpose of loan")
    loan_type: Literal['Secured', 'Unsecured'] = Field(..., description="Type of loan")

    class Config:
        schema_extra = {
            "example": {
                "age": 28,
                "income": 1200000,
                "loan_amount": 2560000,
                "loan_tenure_months": 36,
                "avg_dpd_per_delinquency": 20,
                "delinquency_ratio": 30,
                "credit_utilization_ratio": 30,
                "num_open_accounts": 2,
                "residence_type": "Owned",
                "loan_purpose": "Home",
                "loan_type": "Secured"
            }
        }


class PredictionResponse(BaseModel):
    """Response model for credit risk prediction"""
    default_probability: float = Field(..., description="Probability of default (0-1)")
    default_probability_percentage: str = Field(..., description="Formatted probability percentage")
    credit_score: int = Field(..., ge=300, le=900, description="Credit score (300-900)")
    rating: Literal['Poor', 'Average', 'Good', 'Excellent', 'Undefined'] = Field(..., description="Credit rating")
    loan_to_income_ratio: float = Field(..., description="Calculated loan to income ratio")
    
    class Config:
        schema_extra = {
            "example": {
                "default_probability": 0.052,
                "default_probability_percentage": "5.2%",
                "credit_score": 782,
                "rating": "Excellent",
                "loan_to_income_ratio": 2.13
            }
        }


@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Credit Risk Prediction API",
        "version": "2.0.0",
        "endpoints": {
            "health": "/api/health",
            "predict": "/api/predict",
            "docs": "/docs"
        }
    }


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "credit-risk-api",
        "model_loaded": True
    }


@app.post("/api/predict", response_model=PredictionResponse)
async def predict_credit_risk(request: PredictionRequest):
    """
    Predict credit risk based on borrower details
    
    Returns default probability, credit score (300-900), and rating
    """
    try:
        logger.info(f"Processing prediction request for age={request.age}, income={request.income}")
        
        # Calculate loan to income ratio
        loan_to_income_ratio = request.loan_amount / request.income
        
        # Get prediction from ML model
        probability, credit_score, rating = predict(
            age=request.age,
            income=request.income,
            loan_amount=request.loan_amount,
            loan_tenure_months=request.loan_tenure_months,
            avg_dpd_per_delinquency=request.avg_dpd_per_delinquency,
            delinquency_ratio=request.delinquency_ratio,
            credit_utilization_ratio=request.credit_utilization_ratio,
            num_open_accounts=request.num_open_accounts,
            residence_type=request.residence_type,
            loan_purpose=request.loan_purpose,
            loan_type=request.loan_type
        )
        
        logger.info(f"Prediction successful: score={credit_score}, rating={rating}")
        
        return PredictionResponse(
            default_probability=float(probability),
            default_probability_percentage=f"{probability * 100:.2f}%",
            credit_score=int(credit_score),
            rating=rating,
            loan_to_income_ratio=round(loan_to_income_ratio, 2)
        )
        
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
