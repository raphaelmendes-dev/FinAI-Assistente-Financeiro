```markdown 
[![Status](https://img.shields.io/badge/Status-MVP%20Completed-brightgreen)](https://github.com/raphaelmendes-dev/FinAI-Assistente-Financeiro)
[![Python](https://img.shields.io/badge/Python-3.8+-blue?logo=python&logoColor=white)](https://www.python.org/)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.29+-FF4B4B?logo=streamlit&logoColor=white)](https://streamlit.io/)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-API-4285F4?logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![yfinance](https://img.shields.io/badge/yfinance-Market%20Data-00A86B)](https://pypi.org/project/yfinance/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<div align="center">
  <h1>FinAI Financial Assistant</h1>
  <h3>FinAI Core v3.1 – Hybrid Financial Assistant</h3>
  <p><strong>Generative AI + Deterministic Logic + Real-Time Market Data</strong></p>
  <p>Accessible financial education, precise calculations, secure responses.</p>

  <p>
    <a href="https://github.com/raphaelmendes-dev"><strong>My GitHub</strong></a> •
    <a href="https://www.linkedin.com/in/raphaelmendes-dev/">LinkedIn</a> •
    <a href="mailto:python.dev.raphael@gmail.com">Contact</a>
  </p>

  <p><em>README in <a href="README.md">Português</a></em></p>
</div>

## 🎯 Overview

**FinAI-Assistente-Financeiro** combines:
- **Google Gemini** (auto Flash/Pro) for conversational education
- **Deterministic Python logic** for 100% accurate financial calculations
- **Real-time market data** via yfinance (Ibovespa, USD/BRL) with safe fallback
- **Streamlit UI** with dashboard, interactive sidebar calculator, and evolution chart

Focus on **low latency**, **deterministic validation** and **financial education**.

> Ethical disclaimer: Not a substitute for certified financial advice.

## ✨ Key Features

- 💬 **Smart chat** with persistent context (JSON)
- 📊 **Real-time dashboard**: SELIC, IPCA, USD/BRL, Ibovespa
- 🧮 **Interactive calculator** in sidebar: compound interest with monthly deposits
- 📈 **Patrimonial evolution chart** (pandas line chart)
- 🔒 **Deterministic validations** + input sanitization
- 📚 **Educational FAQ** + financial glossary
- 🎨 **Cyberpunk UI** with animated robot

## 🏗️ Hybrid Architecture

```mermaid
graph TD
    A[User - Streamlit UI] --> B[app.py - Orchestrator + Dashboard]
    B --> C[ai_core.py - Gemini API + Prompt Engineering]
    B --> D[data_handler.py - Calculations + yfinance Market]
    C --> E[utils.py - JSON Persistence + Validation + Formatting]
    D --> E
    E --> F[Final Response + Chart + Metrics]
    F --> A
    subgraph "Hybrid Layer"
        C[LLM Educational]
        D[Deterministic + Real Data]
    end

    ```markdown
    

🛠️ Tech Stack

Backend/AI → Python 3.8+, Google Gemini
UI → Streamlit
Data/Market → yfinance, pandas
Persistence → JSON
Env → python-dotenv
Assets → Custom CSS + robot animation

🚀 Quick Install

CloneBashgit clone https://github.com/raphaelmendes-dev/FinAI-Assistente-Financeiro.git
cd FinAI-Assistente-Financeiro
Virtual envBashpython -m venv venv
venv\Scripts\activate  # Windows
# or source venv/bin/activate  # Linux/Mac
DependenciesBashpip install -r requirements.txt
Gemini key
Create .env:textGEMINI_API_KEY=your-key-here
RunBashstreamlit run app.py


💡 How to Use

Chat: Ask anything financial
Dashboard: View live market metrics
Sidebar: Enter capital, deposit, rate, time → see final amount + chart
Context: Conversation continues naturally

📊 Results & Differentiators

100% accuracy on calculations/simulations (deterministic)
Low latency with Gemini Flash priority
Real market data + robust fallback
Modern UI + robot animation
Education-focused + ethical warnings
Input validation + sanitization

🚀 Future Roadmap

Voice input (Whisper)
PDF/Excel export
Redis caching for even lower latency
Additional data sources
User authentication + multi-profiles

## 🤝 Contribute or Freelance
Contributions welcome! Fork → branch → PR.

Hybrid AI architectures (LLM + deterministic), Groq, FastAPI, Azure AI, Redis, low-latency.

delivered functional projects.

Contact: raphaelmendes-dev | python.dev.raphael@gmail.com | LinkedIn

⭐ Star if you like it!


Last update: March 2026