# AI Health Engine

AI Health Engine is a machine learning based web application that analyzes selected symptoms and provides possible health condition predictions along with risk information, general health guidance, diet suggestions, and recommended medical specialty.

## Features

- Symptom-based health condition prediction
- Top 3 possible predictions with relative scores
- Risk/attention level assessment
- Explanation of important selected symptoms
- General health advice
- Diet and food suggestions
- Recommended medical specialty
- Emergency symptom detection
- Interactive web interface
- Machine learning model integrated with Flask backend

## Technologies Used

- Python
- Flask
- Machine Learning
- Scikit-learn
- Pandas
- NumPy
- Joblib
- HTML
- CSS
- JavaScript

## Project Structure

AI-Health-Engine/

├── dataset/
│   ├── Testing.csv
│   └── Training.csv
│
├── flask_app/
│   ├── static/
│   │   ├── script.js
│   │   ├── style.css
│   │   └── charts
│   │
│   ├── templates/
│   │   └── index.html
│   │
│   └── app.py
│
├── models/
│   └── health_model.pkl
│
├── notebooks/
│   └── health_analysis.ipynb
│
├── create_chart.py
├── requirements.txt
├── .gitignore
└── README.md

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/aasthakushwaha644-hub/AI-Health-Engine.git
cd AI-Health-Engine