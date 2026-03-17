// Rs4Machine · Hook: useChat
import { useState, useCallback, useRef } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const now = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`;
};

export function useChat() {
  const [messages, setMessages] = useState([
    { type:"sys", text:"FinAI v2.0 · Rs4Machine · Motor Gemini inicializado",          time:"08:00:00" },
    { type:"sys", text:"Indicadores carregados · SELIC: 15,00% · IPCA: 4,10%",         time:"08:00:01" },
    { type:"ai",  text:"Olá! Sou o FinAI. Pergunte sobre sua estratégia de investimentos.", time:"08:00:02" },
  ]);
  const [input,    setInput]    = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const isFetching = useRef(false); // evita duplo envio

  const buildHistory = (msgs) =>
    msgs
      .filter(m => m.type === "user" || m.type === "ai")
      .map(m => ({ role: m.type === "ai" ? "assistant" : "user", content: m.text }));

  const send = useCallback(async (textOverride) => {
    const text = (textOverride || input).trim();
    if (!text || isFetching.current) return;

    isFetching.current = true;
    setInput("");

    const userMsg = { type:"user", text, time: now() };
    const newMessages = (prev) => [...prev, userMsg];

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // pega histórico atual + nova mensagem do usuário
      const history = buildHistory([...messages, userMsg]);

      const res = await fetch(`${API}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      const aiText = data.success
        ? data.response
        : "Erro ao conectar com o motor FinAI.";

      setMessages(prev => [...prev, { type:"ai", text: aiText, time: now() }]);
    } catch {
      setMessages(prev => [...prev, { type:"ai", text:"Backend offline. Verifique o servidor.", time: now() }]);
    } finally {
      setIsTyping(false);
      isFetching.current = false;
    }
  }, [input, messages]);

  const pushSys = useCallback((text) => {
    setMessages(prev => [...prev, { type:"sys", text, time: now() }]);
  }, []);

  return { messages, input, setInput, send, isTyping, pushSys };
}