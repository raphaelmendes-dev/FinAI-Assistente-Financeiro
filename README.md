[![Status](https://img.shields.io/badge/Status-Live%20em%20Produção-brightgreen)](https://finai-companion.vercel.app/finai)
[![Python](https://img.shields.io/badge/Python-3.11+-blue?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi&logoColor=white)](https://finai-companion.onrender.com/docs)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://finai-companion.vercel.app/finai)
[![Vercel](https://img.shields.io/badge/Vercel-Frontend-black?logo=vercel&logoColor=white)](https://finai-companion.vercel.app/finai)
[![Render](https://img.shields.io/badge/Render-Backend-46E3B7?logo=render&logoColor=white)](https://finai-companion.onrender.com/docs)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-API-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<div align="center">
  <img src="assets/Rs4Machine.png" alt="Rs4Machine Logo" width="380" />
  <h1>₿ FinAI — Rs4Machine</h1>
  <img src="assets/finai.gif" alt="FinAI Demo" width="100%" />
  <p><strong>Financial AI Assistant v1.0</strong></p>
  <p>Assistente financeiro híbrido — IA generativa + cálculos determinísticos + dados reais de mercado.</p>
  <p>
    <a href="https://finai-companion.vercel.app/finai" target="_blank"><strong>🚀 App Online</strong></a> •
    <a href="https://finai-companion.onrender.com/docs" target="_blank"><strong>📡 API Docs</strong></a> •
    <a href="https://github.com/raphaelmendes-dev"><strong>GitHub</strong></a> •
    <a href="mailto:python.dev.raphael@gmail.com">Contato</a>
  </p>
  <p><em>README in <a href="README.en.md">English</a></em></p>
</div>

---

## 🎯 Visão Geral

O **FinAI** é um assistente financeiro desenvolvido pela **Rs4Machine** que combina IA generativa com lógica determinística. Diferente de chatbots financeiros genéricos, ele garante precisão 100% nos cálculos ao separar a camada de simulação (determinística) da camada conversacional (Gemini), eliminando alucinações em dados numéricos.

- 💬 Chat inteligente com Google Gemini (Flash/Pro auto-detectado)
- 🧮 Calculadora de juros compostos com aportes mensais
- 📊 Gráfico de evolução patrimonial em tempo real
- 📈 Dashboard com dados reais: SELIC, IPCA, Dólar, Ibovespa (yfinance)
- 🎨 Interface dark mode com design DNA Rs4Machine
- 🔒 Validações determinísticas — sem alucinações em cálculos

---

## 🏗️ Arquitetura

```
finai-companion/
├── frontend/                        → Next.js 16 (Vercel)
│   ├── app/
│   │   └── finai/
│   │       └── page.jsx             → Orquestrador principal (~180 linhas)
│   ├── components/FinAI/
│   │   ├── Calculadora.jsx          → Sidebar calculadora + perfil de risco
│   │   ├── GraficoEvolucao.jsx      → Gráfico de evolução patrimonial
│   │   ├── ChatPanel.jsx            → Chat com Gemini
│   │   ├── Dashboard.jsx            → Métricas SELIC, IPCA, Dólar, Ibovespa
│   │   └── Rs4Input.jsx             → Input customizado Rs4Machine
│   ├── hooks/
│   │   └── useCalculadora.js        → Lógica de cálculo + integração API
│   ├── constants/
│   │   └── tokens.js                → Design DNA Rs4Machine
│   └── styles/
│       └── finai.css                → Keyframes + globals
└── backend/                         → Python + FastAPI (Render)
    ├── main.py                      → Rotas principais
    ├── requirements.txt
    └── routers/
        ├── calcular.py              → POST /api/calcular — juros compostos
        ├── chat.py                  → POST /api/chat — Gemini AI
        └── mercado.py               → GET /api/mercado — yfinance
```

---

## ✨ Funcionalidades

- Chat conversacional com Google Gemini sobre finanças pessoais
- Calculadora de juros compostos com aportes mensais e perfil de risco
- Gráfico de evolução patrimonial atualizado em tempo real
- Dashboard com SELIC, IPCA, Dólar e Ibovespa via yfinance (fallback seguro)
- Perfis de risco: Conservador, Moderado e Arrojado
- Cálculo local imediato + validação no backend em paralelo
- Interface 100% responsiva com design tokens Rs4Machine

---

## 🛠️ Stack Técnica

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 16 + React |
| Estilo | CSS-in-JS + Design Tokens Rs4Machine |
| Backend | Python 3.11+ + FastAPI + uvicorn |
| IA | Google Gemini API (Flash/Pro) |
| Dados de Mercado | yfinance + pandas |
| Deploy Frontend | Vercel |
| Deploy Backend | Render |

---

## 🚀 Como Rodar Localmente

### Backend
```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Crie o arquivo `.env` na pasta `backend/`:
```env
GEMINI_API_KEY=sua-chave-aqui
PORT=8000
```

API disponível em: `http://localhost:8000/docs`

### Frontend
```powershell
cd frontend
npm install
npm run dev
```

Crie o arquivo `.env.local` na pasta `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

App disponível em: `http://localhost:3000/finai`

> ⚠️ Rode os dois terminais ao mesmo tempo.

---

## 📡 Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Status da API |
| POST | `/api/calcular` | Simulação de juros compostos com aportes |
| POST | `/api/chat` | Chat com Google Gemini |
| GET | `/api/mercado` | Dados reais: SELIC, IPCA, Dólar, Ibovespa |

---

## 🔑 Variáveis de Ambiente

| Variável | Onde | Descrição |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | frontend `.env.local` | URL do backend |
| `GEMINI_API_KEY` | backend `.env` | Chave da Google Gemini API |
| `PORT` | backend `.env` | Porta do uvicorn |

---

## 🤝 Contato

**Rs4Machine** — Corporação de Agentes Autônomos  
CEO: Raphael Mendes  
📧 python.dev.raphael@gmail.com  
🔗 [github.com/raphaelmendes-dev](https://github.com/raphaelmendes-dev)

---

⭐ Dê uma estrela se o projeto te ajudou!

*Última atualização: Março 2026*