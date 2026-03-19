[![Status](https://img.shields.io/badge/Status-Live%20in%20Production-brightgreen)](https://finai-companion.vercel.app/finai)
[![Python](https://img.shields.io/badge/Python-3.11+-blue?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi&logoColor=white)](https://finai-companion.onrender.com/docs)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://finai-companion.vercel.app/finai)
[![Vercel](https://img.shields.io/badge/Vercel-Frontend-black?logo=vercel&logoColor=white)](https://finai-companion.vercel.app/finai)
[![Render](https://img.shields.io/badge/Render-Backend-46E3B7?logo=render&logoColor=white)](https://finai-companion.onrender.com/docs)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-API-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<div align="center">
  <img src="assets/Rs4Machine.jpeg" alt="Rs4Machine Logo" width="380" />
  <h1>₿ FinAI — Rs4Machine</h1>
  <img src="assets/finai.gif" alt="FinAI Demo" width="100%" />
  <p><strong>Financial AI Assistant v1.0</strong></p>
  <p>Hybrid financial assistant — generative AI + deterministic calculations + real market data.</p>
  <p>
    <a href="https://finai-companion.vercel.app/finai" target="_blank"><strong>🚀 Live App</strong></a> •
    <a href="https://finai-companion.onrender.com/docs" target="_blank"><strong>📡 API Docs</strong></a> •
    <a href="https://github.com/raphaelmendes-dev"><strong>GitHub</strong></a> •
    <a href="mailto:python.dev.raphael@gmail.com">Contact</a>
  </p>
  <p><em>README em <a href="README.md">Português</a></em></p>
</div>

---

## 🎯 Overview

**FinAI** is a financial assistant built by **Rs4Machine** that combines generative AI with deterministic logic. Unlike generic financial chatbots, it guarantees 100% accuracy in calculations by separating the simulation layer (deterministic) from the conversational layer (Gemini), eliminating hallucinations on numerical data.

- 💬 Intelligent chat powered by Google Gemini (Flash/Pro auto-detected)
- 🧮 Compound interest calculator with monthly contributions
- 📊 Real-time wealth evolution chart
- 📈 Dashboard with live data: SELIC, IPCA, Dollar, Ibovespa (yfinance)
- 🎨 Dark mode interface with Rs4Machine Design DNA
- 🔒 Deterministic validations — zero hallucinations on calculations

---

## 🏗️ Architecture

```
finai-companion/
├── frontend/                        → Next.js 16 (Vercel)
│   ├── app/
│   │   └── finai/
│   │       └── page.jsx             → Main orchestrator (~180 lines)
│   ├── components/FinAI/
│   │   ├── Calculadora.jsx          → Calculator sidebar + risk profile
│   │   ├── GraficoEvolucao.jsx      → Wealth evolution chart
│   │   ├── ChatPanel.jsx            → Gemini chat panel
│   │   ├── Dashboard.jsx            → SELIC, IPCA, Dollar, Ibovespa metrics
│   │   └── Rs4Input.jsx             → Rs4Machine custom input
│   ├── hooks/
│   │   └── useCalculadora.js        → Calculation logic + API integration
│   ├── constants/
│   │   └── tokens.js                → Rs4Machine Design DNA
│   └── styles/
│       └── finai.css                → Keyframes + globals
└── backend/                         → Python + FastAPI (Render)
    ├── main.py                      → Main routes
    ├── requirements.txt
    └── routers/
        ├── calcular.py              → POST /api/calcular — compound interest
        ├── chat.py                  → POST /api/chat — Gemini AI
        └── mercado.py               → GET /api/mercado — yfinance
```

---

## ✨ Features

- Conversational chat with Google Gemini on personal finance topics
- Compound interest calculator with monthly contributions and risk profiles
- Wealth evolution chart updated in real time
- Dashboard with SELIC, IPCA, Dollar and Ibovespa via yfinance (safe fallback)
- Risk profiles: Conservative, Moderate and Aggressive
- Instant local calculation + backend validation in parallel
- Fully responsive interface with Rs4Machine design tokens

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 + React |
| Styling | CSS-in-JS + Rs4Machine Design Tokens |
| Backend | Python 3.11+ + FastAPI + uvicorn |
| AI | Google Gemini API (Flash/Pro) |
| Market Data | yfinance + pandas |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## 🚀 Running Locally

### Backend
```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Create a `.env` file inside the `backend/` folder:
```env
GEMINI_API_KEY=your-key-here
PORT=8000
```

API available at: `http://localhost:8000/docs`

### Frontend
```powershell
cd frontend
npm install
npm run dev
```

Create a `.env.local` file inside the `frontend/` folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

App available at: `http://localhost:3000/finai`

> ⚠️ Run both terminals at the same time.

---

## 📡 API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/` | API status |
| POST | `/api/calcular` | Compound interest simulation with contributions |
| POST | `/api/chat` | Chat with Google Gemini |
| GET | `/api/mercado` | Live data: SELIC, IPCA, Dollar, Ibovespa |

---

## 🔑 Environment Variables

| Variable | Location | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | frontend `.env.local` | Backend URL |
| `GEMINI_API_KEY` | backend `.env` | Google Gemini API key |
| `PORT` | backend `.env` | uvicorn port |

---

## 🤝 Contact

**Rs4Machine** — Autonomous Agents Corporation  
CEO: Raphael Mendes  
📧 python.dev.raphael@gmail.com  
🔗 [github.com/raphaelmendes-dev](https://github.com/raphaelmendes-dev)

---

⭐ Star this repo if it helped you!

*Last updated: March 2026*