// Rs4Machine · FinAI — Header
import { T } from "@/constants/tokens";

export default function Header({ result, glitch }) {
  const fmtBRL = (v) => `R$ ${Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <header style={{
      display: "flex", alignItems: "center", gap: "14px",
      padding: "0 20px", height: "54px",
      borderBottom: `1px solid ${T.border}`,
      background: `${T.surface}ee`, backdropFilter: "blur(16px)",
      flexShrink: 0, animation: "stagger-in 0.5s ease-out both",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "28px", height: "28px", borderRadius: "6px",
          background: `linear-gradient(135deg, ${T.gold}22, ${T.gold}08)`,
          border: `1px solid ${T.gold}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px", boxShadow: `0 0 12px ${T.gold}33`,
        }}>₿</div>
        <div>
          <div style={{
            fontSize: "15px", fontWeight: "700", letterSpacing: "0.1em",
            background: `linear-gradient(90deg, ${T.gold}, #ffe080, ${T.gold})`,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "shimmer-logo 4s linear infinite",
          }}>FinAI</div>
          <div style={{ fontSize: "7px", letterSpacing: "0.2em", color: T.muted }}>
            Rs4Machine · Financial Intelligence v2.0
          </div>
        </div>
      </div>

      {/* Badges */}
      <div style={{ display: "flex", gap: "6px", marginLeft: "8px" }}>
        {[
          { l:"ENGINE", v:"Rs4-Fin",   c:T.cyan   },
          { l:"MODEL",  v:"Gemini",    c:T.purple },
          { l:"MARKET", v:"B3 · NYSE", c:T.green  },
        ].map(({ l,v,c }) => (
          <div key={l} style={{ display:"flex", gap:"5px", padding:"3px 8px", background:`${c}0d`, border:`1px solid ${c}2a`, borderRadius:"3px", fontSize:"8px", letterSpacing:"0.08em" }}>
            <span style={{ color:T.dim }}>{l}</span>
            <span style={{ color:c, fontWeight:"600" }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Live result badge */}
      <div style={{
        marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px",
        padding: "5px 14px",
        background: `${T.green}10`, border: `1px solid ${T.green}33`,
        borderRadius: "5px",
        animation: glitch ? "result-pop 0.3s ease-out" : "none",
      }}>
        <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:T.green, animation:"dot-blink 2s infinite", boxShadow:`0 0 6px ${T.green}` }} />
        <span style={{ fontFamily:"monospace", fontSize:"8px", color:T.muted, letterSpacing:"0.1em" }}>PROJEÇÃO FINAL</span>
        <span style={{
          fontFamily:"'JetBrains Mono',monospace", fontSize:"16px", fontWeight:"700",
          color:T.green, textShadow:`0 0 12px ${T.green}88`,
          animation: glitch ? "value-glitch 0.35s ease-out" : "none",
        }}>
          {fmtBRL(result.montante || 0)}
        </span>
      </div>
    </header>
  );
}