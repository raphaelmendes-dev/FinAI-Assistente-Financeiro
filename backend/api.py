"""
Rs4Machine · FinAI — FastAPI Backend
Expõe endpoints para o frontend Next.js consumir.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

from ai_core import FinAIEngine
from data_handler import FinancialCalculator

app = FastAPI(title="FinAI API", version="2.0.0")

# ── CORS — permite o frontend Next.js chamar o backend ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://finai-companion.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

calc   = FinancialCalculator()
engine = FinAIEngine()

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# MODELOS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class ChatMessage(BaseModel):
    role: str      # "user" | "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class CalcRequest(BaseModel):
    capital: float
    aporte: float
    taxa: float     # taxa anual em %
    meses: int

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ROTAS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

@app.get("/")
def root():
    return {"status": "ok", "product": "FinAI", "company": "Rs4Machine"}

@app.get("/health")
def health():
    return {"status": "online"}

@app.get("/api/indicadores")
def get_indicadores():
    """Retorna indicadores de mercado em tempo real."""
    try:
        data = calc.obter_metricas_mercado()
        return {"success": True, "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/calcular")
def calcular_projecao(req: CalcRequest):
    """Calcula projeção de investimento e retorna série temporal."""
    try:
        taxa_anual = req.taxa / 100
        anos = req.meses / 12

        montante = calc.juros_compostos(req.capital, taxa_anual, anos, req.aporte)
        total_investido = req.capital + req.aporte * req.meses
        lucro = montante - total_investido
        rentabilidade = ((montante / total_investido) - 1) * 100 if total_investido > 0 else 0

        # Série mensal para o gráfico
        taxa_mensal = taxa_anual / 12
        pontos = []
        val = req.capital
        for i in range(min(req.meses, 60) + 1):
            pontos.append(round(val, 2))
            val = val * (1 + taxa_mensal) + req.aporte

        return {
            "success": True,
            "montante": round(montante, 2),
            "totalInvestido": round(total_investido, 2),
            "lucro": round(lucro, 2),
            "rentabilidade": round(rentabilidade, 1),
            "pontos": pontos,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
def chat(req: ChatRequest):
    """Envia mensagem ao Gemini e retorna resposta do FinAI."""
    try:
        history = [{"role": m.role, "content": m.content} for m in req.history]
        response = engine.generate_response(req.message, history)
        return {"success": True, "response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)