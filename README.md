[![Status](https://img.shields.io/badge/Status-MVP%20Concluído-brightgreen)](https://github.com/raphaelmendes-dev/FinAI-Assistente-Financeiro)
[![Python](https://img.shields.io/badge/Python-3.8+-blue?logo=python&logoColor=white)](https://www.python.org/)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.29+-FF4B4B?logo=streamlit&logoColor=white)](https://streamlit.io/)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-API-4285F4?logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![yfinance](https://img.shields.io/badge/yfinance-Market%20Data-00A86B)](https://pypi.org/project/yfinance/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<div align="center">
  <h1>FinAI-Assistente-Financeiro</h1>
  <h3>FinAI Core v3.1 – Assistente Financeiro Híbrido</h3>
  <p><strong>IA generativa + lógica determinística + dados de mercado em tempo real</strong></p>
  <p>Educação financeira acessível, cálculos precisos e respostas seguras.</p>

  <p>
    <a href="https://github.com/raphaelmendes-dev"><strong>Meu GitHub</strong></a> •
    <a href="https://www.linkedin.com/in/raphaelmendes-dev/">LinkedIn</a> •
    <a href="mailto:python.dev.raphael@gmail.com">Contato</a>
  </p>

  <p><em>README em <a href="README.en.md">English</a></em></p>
</div>

## 🎯 Visão Geral

**FinAI-Assistente-Financeiro** combina:
- **Google Gemini** (Flash/Pro auto-detectado) para chat conversacional e explicações educativas
- **Lógica determinística em Python** para cálculos financeiros 100% precisos e simulações
- **Dados reais de mercado** via yfinance (Ibovespa, Dólar) com fallback seguro
- **Interface Streamlit** com dashboard, sidebar calculadora e gráfico de evolução

Foco em **baixa latência**, **validação determinística** (evita alucinações) e **educação financeira** para quem não tem acesso a consultoria profissional.

> Aviso ético: Não substitui aconselhamento financeiro certificado.

## ✨ Funcionalidades Principais

- 💬 **Chat inteligente** com contexto persistente (JSON)
- 📊 **Dashboard real-time**: SELIC, IPCA, Dólar, Ibovespa (yfinance + fallback)
- 🧮 **Calculadora interativa** na sidebar: juros compostos com aportes mensais
- 📈 **Gráfico de evolução patrimonial** (linha com pandas DataFrame)
- 🔒 **Validações determinísticas** + sanitização de inputs
- 📚 **FAQ educativo** + glossário financeiro integrado
- 🎨 **UI cyberpunk** com robô animado (assets/robot_fin.png)


🛠️ Stack Técnica

- Backend/IA → Python 3.8+, Google Gemini API
- UI → Streamlit (chat + sidebar + métricas)
- Dados/Mercado → yfinance, pandas (simulações e gráficos)
- Persistência → JSON (conversas e perfil)
- Env → python-dotenv
- Assets → CSS custom + imagem robô animado

🚀 Instalação Rápida

CloneBashgit clone https://github.com/raphaelmendes-dev/FinAI-Assistente-Financeiro.git
cd FinAI-Assistente-Financeiro
Ambiente virtualBashpython -m venv venv
venv\Scripts\activate  # Windows
ou source venv/bin/activate  - Linux/Mac
DependênciasBashpip install -r requirements.txt
Chave Gemini
Crie .env:textGEMINI_API_KEY=sua-chave-aqui
ExecuteBashstreamlit run app.py


💡 Como Usar

Chat: Pergunte qualquer coisa financeira ("Como investir R$ 10k em CDB?")
Dashboard: Veja métricas reais do mercado
Sidebar: Insira capital, aporte, taxa e tempo → veja montante + gráfico
Contexto: Continue a conversa naturalmente (persistência automática)


📊 Resultados & Diferenciais

Precisão 100% em cálculos e simulações (determinístico)
Latência baixa com Gemini Flash priorizado
Dados reais de mercado (yfinance) com fallback robusto
UI moderna + animação robô
Educação > recomendação de produtos
Validações + sanitização para segurança


🚀 Roadmap Futuro

Integração voz (Whisper)
Export PDF/Excel de simulações
Cache Redis para latência ainda menor
Mais fontes de dados (ex.: Alpha Vantage, Open Finance)
Autenticação simples + perfis múltiplos


🤝 Contribua

Contribuições bem-vindas! Fork → branch → PR.

Arquiteturas híbridas IA (LLM + determinístico), Groq, FastAPI, Azure AI, Redis, baixa latência.
projetos funcionais entregues.

**Contato: raphaelmendes-dev | python.dev.raphael@gmail.com | LinkedIn** 

⭐ Dê uma estrela se o projeto te ajudou!


Última atualização: Março 2026
