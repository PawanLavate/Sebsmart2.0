# 🍏 Apple Yield & Pest Prediction App

A **full-stack web application** that predicts **apple yield** and
detects **potential pest infestations** using **Machine Learning**.
Built with the **MERN stack (MongoDB, Express, React, Node.js)** for the
frontend & backend, and integrated ML models for prediction.

------------------------------------------------------------------------

## 🚀 Features

-   📊 Predict apple yield based on environmental and farm input data\
-   🐛 Pest risk prediction using trained ML models\
-   🌐 User-friendly web interface (React)\
-   ⚡ RESTful API for model integration\
-   📂 Data storage with MongoDB\
-   🔒 Authentication and role-based access (farmers, researchers,
    admins)

------------------------------------------------------------------------

## 🛠️ Tech Stack

**Frontend**\
- React.js\
- Tailwind CSS / Material UI (choose as per your design)

**Backend**\
- Node.js\
- Express.js

**Database**\
- MongoDB (Atlas or Local)

**Machine Learning**\
- Python (scikit-learn / TensorFlow / PyTorch)\
- Model served via Flask API or integrated with Node

------------------------------------------------------------------------

## 📦 Installation

1.  **Clone the repo**\

``` bash
git clone https://github.com/your-username/apple-yield-pest-prediction.git
cd apple-yield-pest-prediction
```

2.  **Install dependencies**\

-   Backend\

``` bash
cd backend
npm install
```

-   Frontend\

``` bash
cd frontend
npm install
```

3.  **Run the application**\

-   Start backend server\

``` bash
cd backend
npm run dev
```

-   Start frontend\

``` bash
cd frontend
npm start
```

------------------------------------------------------------------------

## ⚙️ Environment Variables

Create a `.env` file in the **backend** folder with:

    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    JWT_SECRET=your_secret_key
    ML_API_URL=http://localhost:5001/predict

------------------------------------------------------------------------

## 🧠 Machine Learning Model

-   Trained on apple yield & pest datasets\
-   Deployed as a **REST API** (Flask/FastAPI)\
-   Endpoint: `/predict`\
-   Input: JSON with environmental and crop features\
-   Output: Predicted yield & pest risk level

------------------------------------------------------------------------

## 📌 Roadmap

-   [ ] Improve UI/UX for farmers\
-   [ ] Add weather API integration\
-   [ ] Support multiple crop datasets\
-   [ ] Deploy to cloud (Heroku / Vercel / AWS)

------------------------------------------------------------------------

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull
request.

------------------------------------------------------------------------

## 📜 License

This project is licensed under the **MIT License**.
