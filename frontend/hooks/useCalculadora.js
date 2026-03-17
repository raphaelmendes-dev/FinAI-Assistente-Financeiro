// Rs4Machine · Hook: useCalculadora
import { useState, useCallback, useRef } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function useCalculadora() {
  const [capital, setCapital] = useState(10000);
  const [aporte,  setAporte]  = useState(500);
  const [taxa,    setTaxa]    = useState(12);
  const [meses,   setMeses]   = useState(36);
  const [perfil,  setPerfil]  = useState("moderado");

  const [result, setResult] = useState({
    montante: 0, totalInvestido: 0, lucro: 0, rentabilidade: "0.0", pontos: [],
  });
  const [loading, setLoading] = useState(false);
  const [glitch,  setGlitch]  = useState(false);
  const glitchTimer = useRef(null);

  const triggerGlitch = useCallback(() => {
    clearTimeout(glitchTimer.current);
    setGlitch(true);
    glitchTimer.current = setTimeout(() => setGlitch(false), 500);
  }, []);

  // Calculo local — sempre funciona mesmo sem backend
  const calcularLocal = useCallback((c, a, t, m) => {
    const cap = Number(c) || 0;
    const apo = Number(a) || 0;
    const tax = Number(t) || 0;
    const mes = Number(m) || 1;

    const taxaMensal = tax / 100 / 12;
    let val = cap;
    const pontos = [];
    for (let i = 0; i <= Math.min(mes, 60); i++) {
      pontos.push(Math.round(val));
      val = val * (1 + taxaMensal) + apo;
    }
    const totalInvestido = cap + apo * mes;
    const montante = val;
    const lucro = montante - totalInvestido;
    const rentabilidade = totalInvestido > 0
      ? ((montante / totalInvestido - 1) * 100).toFixed(1)
      : "0.0";

    return { montante, totalInvestido, lucro, rentabilidade, pontos };
  }, []);

  const calcular = useCallback(async (c, a, t, m) => {
    const cap = c ?? capital;
    const apo = a ?? aporte;
    const tax = t ?? taxa;
    const mes = m ?? meses;

    // Atualiza resultado local imediatamente (sem esperar backend)
    const local = calcularLocal(cap, apo, tax, mes);
    setResult(local);
    triggerGlitch();

    // Tenta backend em paralelo
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/calcular`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ capital: cap, aporte: apo, taxa: tax, meses: mes }),
      });
      const data = await res.json();
      if (data.success) setResult(data);
    } catch {
      // mantém resultado local — sem problema
    } finally {
      setLoading(false);
    }
  }, [capital, aporte, taxa, meses, calcularLocal, triggerGlitch]);

  // Cada setter atualiza o estado E recalcula com o novo valor
  const handleCapital = (val) => { const v = Number(val) || 0; setCapital(v); calcular(v, aporte, taxa, meses); };
  const handleAporte  = (val) => { const v = Number(val) || 0; setAporte(v);  calcular(capital, v, taxa, meses); };
  const handleTaxa    = (val) => { const v = Number(val) || 0; setTaxa(v);    calcular(capital, aporte, v, meses); };
  const handleMeses   = (val) => { const v = Number(val) || 1; setMeses(v);   calcular(capital, aporte, taxa, v); };

  return {
    capital, setCapital: handleCapital,
    aporte,  setAporte:  handleAporte,
    taxa,    setTaxa:    handleTaxa,
    meses,   setMeses:   handleMeses,
    perfil,  setPerfil,
    result, loading, glitch, triggerGlitch, calcular,
  };
}