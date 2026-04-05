# SebSmart

SebSmart is a full-stack apple orchard intelligence platform built to support three core workflows:

1. `Yield Estimation` for expected apple output
2. `Pest Detection` from uploaded crop images
3. `GDD / Time-Series Growth Analysis` for phenology and stage forecasting

The project combines a React frontend, a Node/Express backend, and multiple Python ML services.

## Live Project Status

The project has been deployed successfully as separate services:

1. Frontend: deployed
2. Backend: deployed
3. Yield estimation ML service: deployed and working
4. GDD ML service: deployed and working
5. Pest detection ML service: deployed, but unstable on free-tier infrastructure

### Current Known Issue

The `Pest Detection` route is the only production issue at the moment.

Reason:

- The pest model uses TensorFlow and is much heavier than the other ML services.
- On Render free tier, the pest worker hits timeout and memory limits during inference.
- Render logs show `CRITICAL WORKER TIMEOUT` and `Worker was sent SIGKILL! Perhaps out of memory?`

What this means:

- The codebase and deployment setup are correct.
- The service starts successfully.
- The failure happens during live prediction because the free instance is too constrained for the TensorFlow workload.

Recommended fix:

1. Upgrade the `pest-service` instance to a higher tier on Render
2. Or optimize / compress the model and serving path
3. Or move pest inference to a more suitable inference platform

## Project Architecture

This repository contains five runtime components:

1. `client` - React + Vite frontend
2. `server` - Express backend API
3. `mlmodels/yield_estimation` - Flask API for yield prediction
4. `mlmodels/pest_control` - Flask API for pest detection
5. `mlmodels/gdd` - Flask API for GDD and growth-stage analysis

### High-Level Flow

1. User interacts with the React frontend
2. Frontend sends requests to the Express backend
3. Backend forwards prediction requests to the relevant ML service
4. Backend optionally refines model output using Gemini
5. Final response is returned to the frontend

## Features

### 1. Yield Estimation

Predicts apple yield using:

- district
- apple variety
- growth stage
- soil type
- weather condition
- pesticide usage
- tree count

The backend sends this data to the yield ML service, receives the prediction, and then uses Gemini to turn it into a farmer-friendly explanation.

### 2. Pest Detection

Allows the user to:

- upload an orchard / leaf image
- provide location
- provide crop stage

The backend stores the uploaded image temporarily, forwards it to the pest ML service, then refines the output into readable advisory text.

Note:

- This route works in architecture and code
- It is currently affected by deployment memory/time limits on free tier

### 3. GDD / Time-Series Growth Analysis

Accepts:

- apple variety
- soil type
- accumulated GDD
- daily weather values

The backend sends this to the GDD ML service, receives the structured growth output, and then uses Gemini to generate a farmer-friendly interpretation of growth stage, next-stage timing, and advice.

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Clerk
- React Markdown

### Backend

- Node.js
- Express
- Multer
- Axios
- Google Gemini API

### Machine Learning Services

- Python
- Flask
- scikit-learn for yield estimation
- TensorFlow / Keras for pest detection
- custom GDD model logic for phenology prediction

### Deployment

- Frontend: Vercel
- Backend: Render
- ML services: Render

## Team

This project was developed as a group project.

Team members:

- Harshit Bhan
- Sanjeev Singh
- Pawan Lavate

## Repository Structure

```text
SebSmart/
├── client/
├── server/
├── mlmodels/
│   ├── yield_estimation/
│   ├── pest_control/
│   └── gdd/
├── docker-compose.yml
├── DEPLOYMENT.md
└── readme.md
```

## Environment Variables

### Frontend

Create `client/.env`:

```env
VITE_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

For production:

```env
VITE_BASE_URL=https://your-backend-domain
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Backend

Create `server/.env`:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
YIELD_MODEL_URL=http://localhost:5001/predict
PEST_MODEL_URL=http://localhost:5000/pests
GDD_MODEL_URL=http://localhost:5002/run-gdd
```

For production:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
YIELD_MODEL_URL=https://your-yield-service.onrender.com/predict
PEST_MODEL_URL=https://your-pest-service.onrender.com/pests
GDD_MODEL_URL=https://your-gdd-service.onrender.com/run-gdd
```

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd SebSmart
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

### 4. Install ML service dependencies

Yield:

```bash
cd ../mlmodels/yield_estimation
pip install -r requirements.txt
```

Pest:

```bash
cd ../pest_control
pip install -r requirements.txt
```

GDD:

```bash
cd ../gdd
pip install -r requirements.txt
```

### 5. Start ML services

Yield:

```bash
cd mlmodels/yield_estimation
python app.py
```

Pest:

```bash
cd mlmodels/pest_control
python app.py
```

GDD:

```bash
cd mlmodels/gdd
python gdd_api.py
```

### 6. Start backend

```bash
cd server
npm start
```

### 7. Start frontend

```bash
cd client
npm run dev
```

## Docker Support

This repository includes Docker support for:

- frontend
- backend
- yield ML service
- pest ML service
- GDD ML service

Run all services together:

```bash
docker compose up --build
```

See [DEPLOYMENT.md](/C:/Users/harsh/TY/SebSmart/DEPLOYMENT.md) for the deployment-specific walkthrough.

## API Routes

### Backend Routes

- `GET /` - health check
- `POST /api/yield/estimation` - yield estimation
- `POST /api/pest/detectpest` - pest detection
- `POST /api/growth/gdd` - GDD growth prediction

### ML Service Routes

Yield service:

- `GET /`
- `POST /predict`

Pest service:

- `GET /`
- `POST /pests`

GDD service:

- `GET /`
- `POST /run-gdd`

## Deployment Sequence

The project should be deployed in this order:

1. Push the repository to GitHub
2. Deploy `yield_estimation` service
3. Deploy `pest_control` service
4. Deploy `gdd` service
5. Copy all 3 ML service URLs
6. Deploy backend with those URLs in environment variables
7. Copy backend URL
8. Deploy frontend with `VITE_BASE_URL` set to backend URL

## Important Deployment Notes

1. `Yield` and `GDD` are working correctly in production
2. `Pest Detection` is deployment-limited on free tier due to TensorFlow memory/time usage
3. `server/uploads` stores uploaded files locally and is not durable cloud storage
4. `cors({ origin: "*" })` is permissive and should be tightened for production hardening
5. Frontend environment variables are baked at build time, so changing `VITE_BASE_URL` requires frontend redeploy

## Future Improvements

1. Move pest inference to a stronger runtime or optimized serving stack
2. Store structured user, prediction, and historical farm data in MongoDB
3. Store uploaded crop and pest images in Cloudinary instead of temporary local storage
4. Add visual analytics and graph-based dashboards for yield trends, pest patterns, and growth progression
5. Add stronger production error handling and logging
6. Add authentication-aware protected routes
7. Add tests for backend and ML service integrations
8. Add monitoring for ML inference latency

## Project Summary

SebSmart is a deployed multi-service agriculture intelligence platform that demonstrates:

- full-stack integration
- ML model serving
- AI-assisted explanation generation
- multi-service cloud deployment
- real-world debugging under infrastructure constraints

The system is working end-to-end for:

- yield estimation
- GDD / phenology forecasting

The remaining production issue is limited to the TensorFlow-based pest inference service on free-tier infrastructure.
