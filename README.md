# NeuroFlow HMI

Visual flow-based operator dashboard for industrial mobile robots — Node-RED + Dashboard.

**Features:** Digital Twin · Live Sensor Gauges · Robot Controls · Automation Templates · AI Agent · MQTT publishing

---

## 🚀 Deploy to Railway (GitHub → Live URL in ~3 minutes)

> Railway is the recommended cloud host. It connects to your GitHub repo and gives you a public URL like `neuroflow-hmi.up.railway.app`.

### Step 1 — Push to GitHub

```bash
# In the project folder:
git init
git add .
git commit -m "Initial commit — NeuroFlow HMI"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/neuroflow-hmi.git
git branch -M main
git push -u origin main
```

### Step 2 — Deploy on Railway

1. Go to **[railway.app](https://railway.app)** → Sign in with GitHub
2. Click **New Project → Deploy from GitHub repo**
3. Select your `neuroflow-hmi` repo
4. Railway auto-detects `railway.json` and `Dockerfile.railway` → click **Deploy**
5. Go to **Settings → Networking → Generate Domain**
6. Your live URL appears: `https://neuroflow-hmi-xxxx.up.railway.app`

> Dashboard: `https://your-url.up.railway.app/ui`  
> Node-RED editor: `https://your-url.up.railway.app/`

### Auto-deploy on every push

Once connected, every `git push origin main` automatically redeploys in ~60s.

---

## 🌐 Alternative: Render.com (free tier)

1. Go to **[render.com](https://render.com)** → New → Web Service
2. Connect your GitHub repo
3. Render detects `render.yaml` automatically → click **Deploy**
4. Live URL: `https://neuroflow-hmi.onrender.com/ui`

> Note: Render free tier spins down after 15 min of inactivity (cold start ~30s).

---

## 💻 Local Development (Docker)

```bash
cp .env.example .env
docker compose up --build
# Dashboard → http://localhost:1880/ui
```

## 💻 Local (No Docker)

```bash
npm install
cp flows.json ~/.node-red/flows.json
cp settings.js ~/.node-red/settings.js
npm start
# Dashboard → http://localhost:1880/ui
```

---

## Why not Vercel?

Vercel runs **serverless functions** — stateless, max 10s lifespan. Node-RED needs a persistent
server for inject timers, WebSocket connections, and context storage. Railway/Render run full
containers — same "push to GitHub → get a URL" experience, but with a real server.

---

## Architecture

```
Inject (1.5s)
  └─► Sensor Simulator ──► context.global (robot_state) ◄── All command handlers
        ├─► Gauges: Battery / Temp / Vibration / Speed / Risk
        ├─► Sparkline chart (Vib & Temp trend)
        ├─► Alert Engine → Notifications + Alert list
        └─► MQTT Publisher → neuroflow/sensors

UI Buttons ──► Robot Command Handler (start/stop/estop/patrol/dock/spin/waypoint)
UI Input ───► AI Response Engine
Inject(5s) ──► Agent Monitor
Inject(3s) ──► Flow Rule Engine → Flow Log
```

## File Reference

| File | Purpose |
|------|---------|
| `flows.json` | All Node-RED HMI logic (bug-fixed) |
| `package.json` | Dependencies: node-red + node-red-dashboard |
| `settings.js` | Node-RED config (local / Docker) |
| `settings.railway.js` | Node-RED config for Railway/Render (`$PORT` aware) |
| `Dockerfile` | Production Docker image (local / VPS) |
| `Dockerfile.railway` | Cloud-optimised image (Railway / Render) |
| `docker-compose.yml` | Local stack: NeuroFlow + Mosquitto MQTT |
| `railway.json` | Railway deployment config |
| `render.yaml` | Render.com deployment config |
| `.gitignore` | Excludes node_modules, secrets, runtime files |
