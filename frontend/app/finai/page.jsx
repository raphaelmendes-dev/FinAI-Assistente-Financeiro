"use client";
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Rs4Machine · FinAI — Orquestrador
// app/finai/page.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import "@/styles/finai.css";
import { useEffect } from "react";
import { T } from "@/constants/tokens";

import { useCalculadora }  from "@/hooks/useCalculadora";
import { useChat }         from "@/hooks/useChat";
import { useIndicadores }  from "@/hooks/useIndicadores";

import Header        from "@/components/FinAI/Header";
import Calculadora   from "@/components/FinAI/Calculadora";
import NeonLineChart from "@/components/FinAI/NeonLineChart";
import IndicatorCard from "@/components/FinAI/IndicatorCard";
import ChatTerminal  from "@/components/FinAI/ChatTerminal";

export default function FinAIPage() {
  const calc        = useCalculadora();
  const chat        = useChat();
  const { indicators, liveStatus } = useIndicadores();

  // Dispara cálculo inicial ao montar
  useEffect(() => { calc.calcular(); }, []);

  // Notifica o chat quando a projeção muda muito
  useEffect(() => {
    if (!calc.result.montante) return;
    const msg = `Projeção atualizada: R$ ${Number(calc.result.montante).toLocaleString("pt-BR", { maximumFractionDigits:0 })} em ${calc.meses} meses · Rentabilidade: ${calc.result.rentabilidade}%`;
    const t = setTimeout(() => chat.pushSys(msg), 400);
    return () => clearTimeout(t);
  }, [calc.result.montante]);

  return (
    <>
      <div style={{
        height:"100vh", minHeight:"600px",
        background:`linear-gradient(150deg, #040608 0%, ${T.bgDeep} 50%, #040a10 100%)`,
        fontFamily:"'JetBrains Mono', monospace",
        display:"flex", flexDirection:"column",
        overflow:"hidden",
      }}>
        {/* HEADER */}
        <Header result={calc.result} glitch={calc.glitch} />

        {/* MAIN */}
        <div style={{ flex:1, display:"flex", overflow:"hidden", minHeight:0 }}>

          {/* SIDEBAR ESQUERDA — Calculadora */}
          <Calculadora
            capital={calc.capital}   setCapital={calc.setCapital}
            aporte={calc.aporte}     setAporte={calc.setAporte}
            taxa={calc.taxa}         setTaxa={calc.setTaxa}
            meses={calc.meses}       setMeses={calc.setMeses}
            perfil={calc.perfil}     setPerfil={calc.setPerfil}
            result={calc.result}
            glitch={calc.glitch}
            onRecalcular={calc.calcular}
          />

          {/* CONTEÚDO CENTRAL */}
          <div style={{
            flex:1, display:"flex", flexDirection:"column",
            padding:"14px 12px", gap:"10px",
            overflow:"hidden", minHeight:0,
            animation:"stagger-in 0.5s ease-out 0.15s both",
          }}>
            {/* Indicadores de Mercado */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"8px" }}>
                <div style={{ width:"3px", height:"13px", background:T.cyan, borderRadius:"2px", boxShadow:`0 0 6px ${T.cyan}` }}/>
                <span style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.18em", color:T.muted, textTransform:"uppercase" }}>
                  Indicadores de Mercado
                </span>
                <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"5px" }}>
                  <div style={{
                    width:"5px", height:"5px", borderRadius:"50%",
                    background: liveStatus==="live" ? T.green : liveStatus==="offline" ? T.red : T.yellow,
                    animation: liveStatus==="live" ? "dot-blink 2s infinite" : "none",
                    boxShadow: `0 0 5px ${liveStatus==="live" ? T.green : T.yellow}`,
                  }}/>
                  <span style={{ fontFamily:"monospace", fontSize:"8px", color:T.muted, letterSpacing:"0.1em" }}>
                    {liveStatus === "live" ? "LIVE" : liveStatus === "offline" ? "OFFLINE" : "..."}
                  </span>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"7px" }}>
                {indicators.map(ind => (
                  <IndicatorCard key={ind.id} ind={ind} glitch={calc.glitch}/>
                ))}
              </div>
            </div>

            {/* Gráfico */}
            <div style={{
              flex:1, minHeight:0,
              background:"#060a10", border:`1px solid ${T.border}`,
              borderRadius:"8px", padding:"14px 16px",
              display:"flex", flexDirection:"column", overflow:"hidden",
              boxShadow: calc.glitch ? `0 0 20px ${T.cyan}14` : "none",
              transition:"box-shadow 0.3s",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"4px", flexShrink:0 }}>
                <div style={{ width:"3px", height:"13px", background:T.purple, borderRadius:"2px", boxShadow:`0 0 6px ${T.purple}` }}/>
                <span style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.18em", color:T.muted, textTransform:"uppercase" }}>
                  Simulação de Patrimônio
                </span>
              </div>
              <div style={{ flex:1, minHeight:0, overflow:"hidden" }}>
                <NeonLineChart
                  pontos={calc.result.pontos || []}
                  inicial={calc.capital}
                  glitch={calc.glitch}
                />
              </div>
            </div>
          </div>

          {/* SIDEBAR DIREITA — Chat Gemini */}
          <div style={{
            width:"300px", flexShrink:0,
            display:"flex", flexDirection:"column",
            padding:"14px 16px 14px 12px",
            borderLeft:`1px solid ${T.border}`,
            overflow:"hidden",
            animation:"stagger-in 0.5s ease-out 0.2s both",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"10px", flexShrink:0 }}>
              <div style={{ width:"3px", height:"13px", background:T.green, borderRadius:"2px", boxShadow:`0 0 6px ${T.green}` }}/>
              <span style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.18em", color:T.muted, textTransform:"uppercase" }}>
                Chat FinAI · Gemini
              </span>
            </div>
            <div style={{ flex:1, minHeight:0 }}>
              <ChatTerminal
                messages={chat.messages}
                input={chat.input}
                setInput={chat.setInput}
                onSend={() => chat.send()}
                isTyping={chat.isTyping}
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{
          display:"flex", alignItems:"center", gap:"14px",
          padding:"5px 20px", height:"28px",
          borderTop:`1px solid ${T.border}`,
          background:T.surface, flexShrink:0,
        }}>
          {["Rs4Machine · FinAI v2.0","Financial Intelligence Engine","CEO: Raphael Mendes"].map((s,i) => (
            <span key={i} style={{ fontSize:"8px", color:T.dim, letterSpacing:"0.14em" }}>{i>0?"·  ":""}{s}</span>
          ))}
          <div style={{ marginLeft:"auto", fontFamily:"monospace", fontSize:"8px", color:T.dim, letterSpacing:"0.1em" }}>
            Não é recomendação de investimento · fins educacionais
          </div>
        </div>
      </div>
    </>
  );
}