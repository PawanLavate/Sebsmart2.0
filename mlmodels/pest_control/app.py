from flask import Flask, jsonify, request
from PIL import Image
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import io
import numpy as np
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "mobilenetV2_apple_disease_classifier.keras")
CLASS_NAMES = [
    "alternaria_leaf_spot",
    "black_rot",
    "cedar_apple",
    "healthy",
    "mosaic",
    "powdery_mildew",
    "scab",
]

model = load_model(MODEL_PATH)


def preprocess(img):
    img = img.resize((224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Pest Detection API Running"})


@app.route("/pests", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "file is required"}), 400

    file = request.files["file"]
    img = Image.open(io.BytesIO(file.read()))
    img_array = preprocess(img)

    predictions = model.predict(img_array)
    predicted_class = int(np.argmax(predictions[0]))
    confidence = float(np.max(predictions[0]))

    return jsonify(
        {
            "class_name": CLASS_NAMES[predicted_class],
            "confidence": confidence,
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False, use_reloader=False)
