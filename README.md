# AI Health Engine

AI Health Engine is a machine-learning-powered web application that predicts possible health conditions based on user-selected symptoms and provides general health information.

## Features

* Symptom-based disease prediction
* Top predicted conditions with prediction scores
* Health risk information
* General health advice and diet suggestions
* Recommended medical specialty
* Emergency symptom warnings
* Interactive web interface

## Technologies Used

* Python
* Flask
* Pandas
* NumPy
* Scikit-learn
* Joblib
* HTML
* CSS
* JavaScript

## Project Structure

```text
AI-Health-Engine/
├── dataset/
│   ├── Testing.csv
│   └── Training.csv
├── flask_app/
│   ├── static/
│   │   ├── disease_distribution.png
│   │   ├── model_performance.png
│   │   ├── script.js
│   │   └── style.css
│   ├── templates/
│   │   └── index.html
│   └── app.py
├── models/
│   └── health_model.pkl
├── notebooks/
│   └── health_analysis.ipynb
├── .gitignore
├── create_chart.py
├── requirements.txt
└── README.md
```

## How to Run Locally

### Step 1: Clone the Repository

```bash
git clone https://github.com/aasthakushwaha644-hub/AI-Health-Engine.git
cd AI-Health-Engine
```

### Step 2: Create a Virtual Environment

```bash
python -m venv venv
```

### Step 3: Activate the Virtual Environment (Windows)

```bash
venv\Scripts\activate
```

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 5: Run the Application

```bash
python flask_app/app.py
```

### Step 6: Open in Your Browser

Open the following URL in your browser:

http://127.0.0.1:5000/

## Disclaimer

This project is intended for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical concerns. Seek urgent medical care in an emergency.
