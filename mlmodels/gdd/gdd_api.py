import os
from flask import Flask, request, jsonify
from gdd_model import process_tree

app = Flask(__name__)

@app.route("/run-gdd", methods=["POST"])
def run_gdd():
    try:
        data = request.get_json()

        result = process_tree(
            variety_name=data["variety"],
            soil_preset=data["soil"],
            daily_weather=data["daily_weather"],
        )

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "GDD API Running!"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5002))
    app.run(host="0.0.0.0", port=port, debug=False)
