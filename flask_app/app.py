from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
import os
import numpy as np


app = Flask(__name__)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "models", "health_model.pkl")

model = joblib.load(MODEL_PATH)

symptoms = model.feature_names_in_.tolist()


health_info = {
    "Hepatitis D": {
        "risk": "Moderate",
        "advice": [
            "Monitor symptoms and consider professional medical evaluation.",
            "Avoid alcohol and unnecessary medicines unless advised by a doctor.",
            "Maintain adequate hydration and rest."
        ],
        "diet": [
            "Prefer light and balanced meals.",
            "Stay hydrated with water and suitable fluids.",
            "Avoid alcohol and very heavy meals."
        ],
        "foods": [
            "Rice",
            "Bananas",
            "Oatmeal",
            "Fresh fruits",
            "Cooked vegetables"
        ],
        "doctor": [
            "Consider consulting a General Physician.",
            "A gastroenterologist or liver specialist may be considered for liver-related concerns.",
            "Seek medical evaluation if symptoms persist or become worse."
        ]
    },

    "Common Cold": {
        "risk": "Low",
        "advice": [
            "Get adequate rest and sleep.",
            "Drink enough fluids.",
            "Monitor fever and other symptoms."
        ],
        "diet": [
            "Prefer warm and easily digestible foods.",
            "Stay hydrated.",
            "Include fruits and nutritious meals."
        ],
        "foods": [
            "Soup",
            "Oranges",
            "Bananas",
            "Oatmeal",
            "Warm fluids"
        ],
        "doctor": [
            "A General Physician can evaluate persistent or worsening symptoms.",
            "Seek medical attention if breathing difficulty or severe symptoms develop."
        ]
    },

    "Flu": {
        "risk": "Moderate",
        "advice": [
            "Take adequate rest.",
            "Maintain hydration.",
            "Monitor fever and body symptoms."
        ],
        "diet": [
            "Choose light and nutritious meals.",
            "Drink enough fluids.",
            "Avoid foods that worsen stomach discomfort."
        ],
        "foods": [
            "Soup",
            "Bananas",
            "Rice",
            "Oatmeal",
            "Fresh fruits"
        ],
        "doctor": [
            "Consider consulting a General Physician.",
            "Professional evaluation is appropriate if symptoms become severe or persistent."
        ]
    },

    "Migraine": {
        "risk": "Moderate",
        "advice": [
            "Rest in a quiet and comfortable environment.",
            "Maintain regular sleep and hydration.",
            "Try to identify possible headache triggers."
        ],
        "diet": [
            "Maintain regular meals.",
            "Stay adequately hydrated.",
            "Avoid foods that you personally notice trigger headaches."
        ],
        "foods": [
            "Bananas",
            "Oatmeal",
            "Fresh fruits",
            "Rice",
            "Water-rich foods"
        ],
        "doctor": [
            "Consider consulting a General Physician or Neurologist.",
            "Seek medical attention if headaches are severe, sudden or unusual."
        ]
    },

    "Gastritis": {
        "risk": "Moderate",
        "advice": [
            "Prefer smaller and lighter meals.",
            "Avoid foods that irritate your stomach.",
            "Stay hydrated."
        ],
        "diet": [
            "Choose simple and easily digestible foods.",
            "Avoid very spicy or heavy meals if they worsen symptoms.",
            "Maintain regular meal timing."
        ],
        "foods": [
            "Rice",
            "Bananas",
            "Oatmeal",
            "Boiled vegetables",
            "Plain foods"
        ],
        "doctor": [
            "Consider consulting a General Physician or Gastroenterologist.",
            "Seek evaluation if stomach pain or vomiting persists."
        ]
    }
}


def get_health_info(prediction):

    if prediction in health_info:
        return health_info[prediction]

    prediction_lower = prediction.lower()

    if any(word in prediction_lower for word in [
        "asthma",
        "pneumonia",
        "bronchitis",
        "respiratory"
    ]):
        return {
            "risk": "Moderate",
            "advice": [
                "Monitor breathing and respiratory symptoms.",
                "Avoid known environmental triggers.",
                "Consider professional medical evaluation if symptoms persist."
            ],
            "diet": [
                "Maintain adequate hydration.",
                "Prefer balanced and nutritious meals."
            ],
            "foods": [
                "Warm soup",
                "Fresh fruits",
                "Oatmeal",
                "Rice"
            ],
            "doctor": [
                "Consider consulting a General Physician.",
                "A Pulmonologist may be appropriate for persistent breathing-related concerns."
            ]
        }

    if any(word in prediction_lower for word in [
        "gastritis",
        "gerd",
        "ulcer",
        "hepatitis",
        "digestive"
    ]):
        return {
            "risk": "Moderate",
            "advice": [
                "Monitor digestive symptoms.",
                "Avoid foods that clearly worsen your symptoms.",
                "Consider professional evaluation if symptoms continue."
            ],
            "diet": [
                "Prefer light and easily digestible meals.",
                "Maintain adequate hydration."
            ],
            "foods": [
                "Rice",
                "Bananas",
                "Oatmeal",
                "Cooked vegetables"
            ],
            "doctor": [
                "Consider consulting a General Physician.",
                "A Gastroenterologist may be considered for persistent digestive concerns."
            ]
        }

    if any(word in prediction_lower for word in [
        "migraine",
        "headache",
        "neurological"
    ]):
        return {
            "risk": "Moderate",
            "advice": [
                "Rest adequately.",
                "Maintain hydration and regular sleep.",
                "Monitor recurring or worsening symptoms."
            ],
            "diet": [
                "Maintain regular meals.",
                "Stay hydrated."
            ],
            "foods": [
                "Bananas",
                "Oatmeal",
                "Fresh fruits",
                "Rice"
            ],
            "doctor": [
                "Consider consulting a General Physician.",
                "A Neurologist may be considered for recurring neurological symptoms."
            ]
        }

    if any(word in prediction_lower for word in [
        "fungal",
        "skin",
        "dermatitis",
        "allergy"
    ]):
        return {
            "risk": "Low",
            "advice": [
                "Monitor skin-related symptoms.",
                "Avoid known irritants or triggers.",
                "Consider professional evaluation if symptoms persist."
            ],
            "diet": [
                "Maintain a balanced diet.",
                "Stay adequately hydrated."
            ],
            "foods": [
                "Fresh fruits",
                "Vegetables",
                "Rice",
                "Oatmeal"
            ],
            "doctor": [
                "Consider consulting a General Physician.",
                "A Dermatologist may be considered for persistent skin-related concerns."
            ]
        }

    return {
        "risk": "General Monitoring",
        "advice": [
            "Monitor the selected symptoms.",
            "Maintain hydration, rest and a balanced diet.",
            "Consider professional evaluation if symptoms persist or worsen."
        ],
        "diet": [
            "Prefer balanced and nutritious meals.",
            "Maintain adequate hydration."
        ],
        "foods": [
            "Fresh fruits",
            "Cooked vegetables",
            "Rice",
            "Oatmeal"
        ],
        "doctor": [
            "Consider consulting a General Physician for an initial evaluation.",
            "A specialist may be appropriate depending on persistent symptoms."
        ]
    }


def get_food_explanations(foods):

    explanations = {
        "Rice": "Provides easily digestible carbohydrates and energy.",
        "Bananas": "Provide carbohydrates and can be a convenient, gentle food option.",
        "Oatmeal": "Provides carbohydrates and dietary fiber in a simple meal.",
        "Fresh fruits": "Provide fluids, vitamins and other nutrients.",
        "Cooked vegetables": "Provide vitamins, minerals and dietary fiber.",
        "Boiled vegetables": "Can provide nutrients in a simple and lighter preparation.",
        "Soup": "Can provide fluids and nutrients in an easy-to-consume form.",
        "Warm soup": "Can provide fluids and may be comfortable when appetite is reduced.",
        "Oranges": "Provide vitamin C and fluids.",
        "Warm fluids": "Help maintain fluid intake.",
        "Water-rich foods": "Can contribute to overall fluid intake.",
        "Plain foods": "May be easier to tolerate when the stomach feels uncomfortable.",
        "Vegetables": "Provide vitamins, minerals and dietary fiber."
    }

    result = []
    for food in foods:
        result.append({
            "name": food,
            "explanation": explanations.get(
                food,
                "Provides general nutritional value as part of a balanced diet."
            )
        })

    return result


emergency_symptoms = {
    "chest_pain",
    "breathlessness",
    "difficulty_breathing",
    "loss_of_consciousness",
    "unconsciousness",
    "severe_chest_pain"
}


def check_emergency(selected_symptoms):
    matched = [
        symptom
        for symptom in selected_symptoms
        if symptom in emergency_symptoms
    ]
    return len(matched) > 0, matched


def calculate_risk(selected_symptoms, top_score):

    emergency, matched = check_emergency(selected_symptoms)

    if emergency:
        return {
            "level": "Needs Urgent Attention",
            "label": "Please seek medical care",
            "tone": "urgent",
            "description": "Some selected symptoms may require prompt medical evaluation."
        }

    if top_score >= 50 and len(selected_symptoms) >= 3:
        return {
            "level": "Higher Attention",
            "label": "Consider professional evaluation",
            "tone": "high",
            "description": "The model produced a relatively strong match with several selected symptoms."
        }

    if top_score >= 30 or len(selected_symptoms) >= 2:
        return {
            "level": "Moderate",
            "label": "Monitor your symptoms",
            "tone": "moderate",
            "description": "The selected symptoms may warrant monitoring and professional advice if they persist."
        }

    return {
        "level": "Low",
        "label": "General monitoring",
        "tone": "low",
        "description": "The selected symptoms produced a lower model match. Continue monitoring your symptoms."
    }


def get_explanation(selected_symptoms):

    importances = getattr(model, "feature_importances_", None)

    if importances is None:
        # Fallback if model doesn't have feature_importances_
        return [{
            "symptom": symptom.replace("_", " ").title(),
            "importance": 0.2,
            "contribution": "Moderate"
        } for symptom in selected_symptoms[:5]]

    feature_importance = dict(
        zip(model.feature_names_in_, importances)
    )

    selected = []

    for symptom in selected_symptoms:
        importance = feature_importance.get(symptom, 0)

        if importance >= 0.03:
            contribution = "Strong"
        elif importance >= 0.01:
            contribution = "Moderate"
        else:
            contribution = "Supporting"

        selected.append({
            "symptom": symptom.replace("_", " ").title(),
            "importance": float(importance),
            "contribution": contribution
        })

    selected.sort(key=lambda x: x["importance"], reverse=True)

    return selected[:5]


def get_recommended_specialty(prediction, selected_symptoms):

    prediction_lower = prediction.lower()
    symptom_text = " ".join(selected_symptoms).lower()

    if any(word in prediction_lower for word in ["fungal", "skin", "dermatitis", "allergy", "acne"]):
        return "Dermatologist"

    if any(word in prediction_lower for word in ["migraine", "headache", "neurological"]):
        return "Neurologist"

    if any(word in prediction_lower for word in ["hepatitis", "liver", "gastritis", "gerd", "ulcer", "digestive"]):
        return "Gastroenterologist"

    if any(word in symptom_text for word in ["cough", "breathlessness", "difficulty_breathing", "wheezing", "chest_pain"]):
        return "General Physician"

    if any(word in prediction_lower for word in ["pneumonia", "asthma", "bronchitis"]):
        return "Pulmonologist"

    return "General Physician"


@app.route("/")
def home():
    return render_template("index.html", symptoms=symptoms)


@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.get_json()

        if not data or "symptoms" not in data:
            return jsonify({"error": "No symptoms were provided."}), 400

        selected_symptoms = data["symptoms"]

        if not isinstance(selected_symptoms, list):
            return jsonify({"error": "Symptoms must be provided as a list."}), 400

        selected_symptoms = [
            symptom for symptom in selected_symptoms if symptom in symptoms
        ]

        if len(selected_symptoms) == 0:
            return jsonify({"error": "Please select at least one valid symptom."}), 400

        input_data = pd.DataFrame(0, index=[0], columns=symptoms)

        for symptom in selected_symptoms:
            input_data.loc[0, symptom] = 1

        prediction = model.predict(input_data)[0]

        probabilities = model.predict_proba(input_data)[0]
        classes = model.classes_

        # 1. Combine classes and raw probabilities
        raw_results = list(zip(classes, probabilities))
        raw_results.sort(key=lambda x: x[1], reverse=True)

        # 2. Extract Top 3
        top_3_raw = raw_results[:3]
        sum_top_3 = sum([score for _, score in top_3_raw])

        # 3. Rescale Top 3 probabilities relative to each other
        prediction_data = []
        for condition, raw_score in top_3_raw:
            if sum_top_3 > 0:
                # Relative Top-K score percentage
                scaled_score = (raw_score / sum_top_3) * 100
            else:
                scaled_score = 33.33

            prediction_data.append({
                "condition": condition,
                "score": round(float(scaled_score), 2)
            })

        top_predictions = prediction_data

        top_score = top_predictions[0]["score"] if top_predictions else 0

        risk_data = calculate_risk(selected_symptoms, top_score)

        emergency, emergency_matches = check_emergency(selected_symptoms)

        info = get_health_info(prediction)

        recommended_specialty = get_recommended_specialty(
            prediction,
            selected_symptoms
        )

        food_explanations = get_food_explanations(info["foods"])

        explanation = get_explanation(selected_symptoms)

        return jsonify({
            "prediction": prediction,
            "top_predictions": top_predictions,
            "symptoms_used": selected_symptoms,
            "why_result": explanation,
            "risk_level": risk_data["level"],
            "risk_label": risk_data["label"],
            "risk_description": risk_data["description"],
            "risk_tone": risk_data["tone"],
            "attention_level": risk_data["level"],
            "attention_label": risk_data["label"],
            "attention_description": risk_data["description"],
            "attention_tone": risk_data["tone"],
            "emergency": emergency,
            "emergency_symptoms": [
                symptom.replace("_", " ").title() for symptom in emergency_matches
            ],
            "advice": info["advice"],
            "diet": info["diet"],
            "doctor": info["doctor"],
            "food_explanations": food_explanations,
            "recommended_specialty": recommended_specialty,
            "disclaimer": "This application provides educational health information based on selected symptoms and machine-learning patterns. It is not a medical diagnosis and should not replace professional medical advice."
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)