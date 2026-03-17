import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

class FinAIEngine:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        genai.configure(api_key=api_key)

        try:
            models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
            self.selected_model = "models/gemini-1.5-flash" if "models/gemini-1.5-flash" in models else models[0]
        except Exception:
            self.selected_model = "gemini-pro"

        self.model = genai.GenerativeModel(
            model_name=self.selected_model,
            system_instruction=(
                "Você é o FinAI, assistente financeiro direto e objetivo. "
                "REGRAS OBRIGATÓRIAS: "
                "1. Máximo 3 linhas por resposta. "
                "2. Sem introduções, sem despedidas, sem 'Claro!', sem 'Ótima pergunta!'. "
                "3. Vá direto ao ponto. "
                "4. Use números e percentuais concretos quando possível. "
                "5. Se precisar listar, máximo 3 itens curtos."
            )
        )

    def generate_response(self, user_input, context, calculator=None):
        try:
            chat = self.model.start_chat(history=self._format_history(context[-6:]))
            response = chat.send_message(user_input)
            return response.text
        except Exception as e:
            return f"Erro: {str(e)}"

    def _format_history(self, context):
        history = []
        for msg in context:
            if msg.get("role") == "user":
                history.append({"role": "user", "parts": [msg["content"]]})
            elif msg.get("role") == "assistant":
                history.append({"role": "model", "parts": [msg["content"]]})
        return history