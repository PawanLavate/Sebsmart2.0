# Deployment Guide

This project is made of 5 runtime services:

1. `client` - Vite React frontend
2. `server` - Express API
3. `mlmodels/yield_estimation` - Flask service on port `5001`
4. `mlmodels/pest_control` - Flask service on port `5000`
5. `mlmodels/gdd` - Flask service on port `5002`

The backend also requires a Gemini API key, and the frontend requires a Clerk publishable key.

## Recommended Deployment Shape

Use this split:

1. Deploy `client` as a static site
2. Deploy `server` as a Node service
3. Deploy each ML model as its own Python service

This is the safest option because your backend already talks to the ML models over HTTP.

## Local Docker Deployment

### 1. Prepare environment files

Create these files before starting:

- `server/.env`
- `client/.env` if you still want local non-Docker frontend development

Use these values as a starting point:

```env
# server/.env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
YIELD_MODEL_URL=http://yield-model:5001/predict
PEST_MODEL_URL=http://pest-model:5000/pests
GDD_MODEL_URL=http://gdd-model:5002/run-gdd
```

```env
# client/.env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000
```

### 2. Start everything

From the repo root:

```bash
docker compose up --build
```

### 3. Open the app

- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:3000`
- Yield model: `http://localhost:5001`
- Pest model: `http://localhost:5000`
- GDD model: `http://localhost:5002`

## Cloud Deployment

### Frontend

Deploy `client` to Vercel, Netlify, or Cloudflare Pages.

Set:

```env
VITE_BASE_URL=https://your-backend-domain.com
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Backend

Deploy `server` to Render, Railway, Fly.io, or AWS.

Set:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
YIELD_MODEL_URL=https://your-yield-service.com/predict
PEST_MODEL_URL=https://your-pest-service.com/pests
GDD_MODEL_URL=https://your-gdd-service.com/run-gdd
```

Also make sure persistent storage is configured if you need to keep uploaded files from `server/uploads`. Right now uploads are written to local disk.

### ML Services

Deploy these as separate Python services:

1. `mlmodels/yield_estimation`
2. `mlmodels/pest_control`
3. `mlmodels/gdd`

Recommended hosts:

- Render Web Services
- Railway
- Fly.io
- AWS ECS/App Runner

Expose:

- Yield: port `5001`
- Pest: port `5000`
- GDD: port `5002`

## Important Notes Before Production

1. `server/uploads` is local disk storage. On many cloud platforms, local files are ephemeral. Move uploads to S3, Cloudinary, or another object store if you need durability.
2. The pest model uses TensorFlow, so its container will be much heavier than the others.
3. The frontend build needs the correct `VITE_BASE_URL` at build time.
4. Your backend currently allows `cors({ origin: "*" })`. Tighten that for production.
5. The repo README still describes generic setup. Use this file as the real deployment reference for this codebase.

## Easiest Real-World Hosting Option

If you want the lowest-friction path:

1. Host `client` on Vercel
2. Host `server` on Render or Railway
3. Host the 3 Python ML services on Render or Railway
4. Store uploaded images in Cloudinary or S3

That avoids having to manage your own VM while keeping the current architecture intact.
