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

  // ✅ CORREÇÃO: refs espelham sempre o valor atual dos states
  const capitalRef = useRef(10000);
  const aporteRef  = useRef(500);
  const taxaRef    = useRef(12);
  const mesesRef   = useRef(36);

  const triggerGlitch = useCallback(() => {
    clearTimeout(glitchTimer.current);
    setGlitch(true);
    glitchTimer.current = setTimeout(() => setGlitch(false), 500);
  }, []);

  const calcularLocal = useCallback((c, a, t, m) => {
    const cap = Number(c) || 0;
    const apo = Number(a) || 0;
    const tax = Number(t) || 0;
    const mes = Number(m) || 1;

    const taxaMensal = tax / 100 / 12;
    let val = cap;
    const pontos = [Math.round(cap)];

    for (let i = 0; i < mes; i++) {
      val = val * (1 + taxaMensal) + apo;
      if (mes <= 60 || i % Math.ceil(mes / 60) === 0) {
        pontos.push(Math.round(val));
      }
    }
    if (pontos[pontos.length - 1] !== Math.round(val)) {
      pontos.push(Math.round(val));
    }

    const montante = val;
    const totalInvestido = cap + apo * mes;
    const lucro = montante - totalInvestido;
    const rentabilidade = totalInvestido > 0
      ? ((montante / totalInvestido - 1) * 100).toFixed(1)
      : "0.0";

    return { montante, totalInvestido, lucro, rentabilidade, pontos };
  }, []);

  // ✅ CORREÇÃO: calcular lê das refs, nunca do closure congelado
  const calcular = useCallback(async (c, a, t, m) => {
    const cap = c ?? capitalRef.current;
    const apo = a ?? aporteRef.current;
    const tax = t ?? taxaRef.current;
    const mes = m ?? mesesRef.current;

    const local = calcularLocal(cap, apo, tax, mes);
    setResult(local);
    triggerGlitch();

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
      // mantém resultado local
    } finally {
      setLoading(false);
    }
  }, [calcularLocal, triggerGlitch]); // ✅ sem dependências voláteis

  // ✅ CORREÇÃO: cada handler atualiza a ref antes de calcular
  const handleCapital = (val) => {
    const v = Number(val) || 0;
    capitalRef.current = v;
    setCapital(v);
    calcular(v, aporteRef.current, taxaRef.current, mesesRef.current);
  };
  const handleAporte = (val) => {
    const v = Number(val) || 0;
    aporteRef.current = v;
    setAporte(v);
    calcular(capitalRef.current, v, taxaRef.current, mesesRef.current);
  };
  const handleTaxa = (val) => {
    const v = Number(val) || 0;
    taxaRef.current = v;
    setTaxa(v);
    calcular(capitalRef.current, aporteRef.current, v, mesesRef.current);
  };
  const handleMeses = (val) => {
    const v = Number(val) || 1;
    mesesRef.current = v;
    setMeses(v);
    calcular(capitalRef.current, aporteRef.current, taxaRef.current, v);
  };

  return {
    capital, setCapital: handleCapital,
    aporte,  setAporte:  handleAporte,
    taxa,    setTaxa:    handleTaxa,
    meses,   setMeses:   handleMeses,
    perfil,  setPerfil,
    result, loading, glitch, triggerGlitch, calcular,
  };
}