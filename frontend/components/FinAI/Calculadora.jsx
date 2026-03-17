// Rs4Machine · FinAI — Calculadora (sidebar esquerda)
import { T } from "@/constants/tokens";
import Rs4Input from "./Rs4Input";

const perfilOptions = [
  { id:"conservador", label:"Conservador", color:T.green  },
  { id:"moderado",    label:"Moderado",    color:T.yellow },
  { id:"arrojado",    label:"Arrojado",    color:T.red    },
];

const fmtBRL = (v) => `R$ ${Number(v).toLocaleString("pt-BR", { minimumFractionDigits:2, maximumFractionDigits:2 })}`;

export default function Calculadora({ capital, setCapital, aporte, setAporte, taxa, setTaxa, meses, setMeses, perfil, setPerfil, result, glitch, onRecalcular }) {
  return (
    <div style={{
      width:"260px", flexShrink:0,
      display:"flex", flexDirection:"column",
      padding:"14px 12px 14px 16px", gap:"10px",
      borderRight:`1px solid ${T.border}`,
      overflowY:"auto",
      animation:"stagger-in 0.5s ease-out 0.1s both",
    }}>
      {/* Robô */}
      <div style={{ padding:"10px 12px", background:`${T.gold}0a`, border:`1px solid ${T.gold}28`, borderRadius:"7px", display:"flex", gap:"8px", alignItems:"flex-start" }}>
        <div style={{ fontSize:"20px", flexShrink:0 }}>🤖</div>
        <div>
          <div style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.14em", color:T.gold, textTransform:"uppercase", marginBottom:"3px" }}>FinAI Assistant</div>
          <div style={{ fontFamily:"monospace", fontSize:"9px", color:T.muted, lineHeight:"1.5" }}>
            Ajuste os parâmetros para simular sua estratégia de investimento.
          </div>
        </div>
      </div>

      {/* Título */}
      <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
        <div style={{ width:"3px", height:"14px", background:T.gold, borderRadius:"2px", boxShadow:`0 0 6px ${T.gold}` }}/>
        <span style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.18em", color:T.muted, textTransform:"uppercase" }}>Calculadora AI</span>
      </div>

      <Rs4Input label="Capital inicial"    value={capital} onChange={setCapital} prefix="R$" min={0} step={1000}/>
      <Rs4Input label="Aporte mensal"      value={aporte}  onChange={setAporte}  prefix="R$" min={0} step={100}/>
      <Rs4Input label="Taxa anual"         value={taxa}    onChange={setTaxa}    suffix="% a.a." min={0} max={50} step={0.5}/>
      <Rs4Input label="Período (meses)"    value={meses}   onChange={setMeses}   suffix="m" min={1} max={360} step={6}/>

      {/* Perfil */}
      <div>
        <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.16em", color:T.muted, textTransform:"uppercase", marginBottom:"6px" }}>Perfil de Risco</div>
        <div style={{ display:"flex", gap:"5px" }}>
          {perfilOptions.map(opt => (
            <button key={opt.id} onClick={() => setPerfil(opt.id)} style={{
              flex:1, padding:"6px 4px",
              background: perfil===opt.id ? `${opt.color}20` : "transparent",
              border:`1px solid ${perfil===opt.id ? opt.color : T.border}`,
              borderRadius:"4px",
              fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.08em",
              color: perfil===opt.id ? opt.color : T.muted,
              cursor:"pointer", transition:"all 0.2s",
              boxShadow: perfil===opt.id ? `0 0 8px ${opt.color}33` : "none",
            }}>{opt.label}</button>
          ))}
        </div>
      </div>

      {/* Resultados */}
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:"7px", padding:"12px", display:"flex", flexDirection:"column", gap:"7px" }}>
        {[
          { l:"Total investido", v:fmtBRL(result.totalInvestido || 0), c:T.cyan  },
          { l:"Lucro estimado",  v:fmtBRL(result.lucro || 0),          c:T.green },
          { l:"Rentabilidade",   v:`${result.rentabilidade || "0.0"}%`, c:T.gold  },
        ].map(({ l,v,c }) => (
          <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontFamily:"monospace", fontSize:"9px", color:T.muted, letterSpacing:"0.06em" }}>{l}</span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"12px", fontWeight:"600", color:c, textShadow:`0 0 8px ${c}66`, animation:glitch?"value-glitch 0.35s ease-out":"none" }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Botão */}
      <button onClick={onRecalcular} style={{
        padding:"11px",
        background:`linear-gradient(135deg, ${T.gold}20, ${T.gold}08)`,
        border:`1px solid ${T.gold}55`, borderRadius:"6px",
        color:T.gold, fontFamily:"monospace", fontSize:"10px", letterSpacing:"0.18em", textTransform:"uppercase",
        cursor:"pointer", fontWeight:"700", boxShadow:`0 0 16px ${T.gold}22`, transition:"all 0.2s",
      }}
        onMouseEnter={e=>{ e.currentTarget.style.background=`${T.gold}28`; e.currentTarget.style.boxShadow=`0 0 24px ${T.gold}44`; }}
        onMouseLeave={e=>{ e.currentTarget.style.background=`linear-gradient(135deg,${T.gold}20,${T.gold}08)`; e.currentTarget.style.boxShadow=`0 0 16px ${T.gold}22`; }}
      >₿  RECALCULAR</button>
    </div>
  );
}