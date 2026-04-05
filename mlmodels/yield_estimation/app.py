from flask import Flask, jsonify, request
import joblib
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "yield_estimator_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "yield_estimator_label_encoders.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "yield_estimator_scaler.pkl")


def safe_load(path, name):
    if not os.path.exists(path):
        raise FileNotFoundError(f"{name} file not found at: {path}")

    return joblib.load(path)


model = safe_load(MODEL_PATH, "Model")
label_encoders = safe_load(ENCODER_PATH, "Label Encoders")
scaler = safe_load(SCALER_PATH, "Scaler")


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Apple Yield Prediction API Running"})


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json() or {}

        required_fields = [
            "District_name",
            "species",
            "growth_stage",
            "soil",
            "weather",
            "pesticides",
            "tree_count",
        ]

        missing = [field for field in required_fields if field not in data]
        if missing:
            return jsonify({"error": f"Missing fields: {missing}"}), 400

        for col in [
            "District_name",
            "species",
            "growth_stage",
            "soil",
            "weather",
            "pesticides",
        ]:
            if data[col] not in label_encoders[col].classes_:
                return jsonify({"error": f"Invalid value '{data[col]}' for {col}"}), 400

            data[col] = label_encoders[col].transform([data[col]])[0]

        data["tree_count"] = scaler.transform([[data["tree_count"]]])[0][0]

        features = [
            data["District_name"],
            data["species"],
            data["growth_stage"],
            data["soil"],
            data["weather"],
            data["pesticides"],
            data["tree_count"],
        ]

        prediction = model.predict([features])[0]

        return jsonify({"prediction": float(prediction), "status": "success"})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=False)
