// Rs4Machine · FinAI — IndicatorCard
import { T } from "@/constants/tokens";

export default function IndicatorCard({ ind, glitch }) {
  const isUp   = ind.trend === "up";
  const isDown = ind.trend === "down";
  const color  = isUp ? T.green : isDown ? T.red : T.cyan;

  return (
    <div style={{
      background: T.card,
      border: `1px solid ${T.border}`,
      borderTop: `2px solid ${color}66`,
      borderRadius: "7px",
      padding: "12px",
      position: "relative",
      overflow: "hidden",
      transition: "border-color 0.3s, box-shadow 0.3s",
      boxShadow: glitch ? `0 0 20px ${color}44, inset 0 0 20px ${color}08` : "none",
      animation: glitch ? "card-glitch 0.35s ease-out" : "none",
    }}>
      {glitch && (
        <div style={{
          position:"absolute", inset:0,
          background:`linear-gradient(105deg, transparent 30%, ${color}20 50%, transparent 70%)`,
          animation:"sweep-flash 0.4s ease-out forwards",
          pointerEvents:"none",
        }} />
      )}

      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"6px" }}>
        <div>
          <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.18em", color:T.muted, textTransform:"uppercase" }}>
            {ind.label}
          </div>
          <div style={{ fontSize:"10px", marginTop:"1px" }}>{ind.icon}</div>
        </div>
        <div style={{
          padding:"2px 6px",
          background:`${color}15`, border:`1px solid ${color}33`,
          borderRadius:"3px",
          fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.1em",
          color, display:"flex", alignItems:"center", gap:"3px",
        }}>
          <span>{isUp ? "▲" : isDown ? "▼" : "●"}</span>
          <span>{ind.change}</span>
        </div>
      </div>

      <div style={{
        fontFamily:"'JetBrains Mono', monospace",
        fontSize:"16px", fontWeight:"700", lineHeight:1,
        color, textShadow:`0 0 12px ${color}88`,
        animation: glitch ? "value-glitch 0.3s ease-out" : "none",
      }}>
        {ind.value}
      </div>

      <div style={{ fontFamily:"monospace", fontSize:"8px", color:T.muted, marginTop:"4px", letterSpacing:"0.06em", opacity:0.7 }}>
        {ind.desc}
      </div>

      {/* Mini sparkline */}
      <div style={{ marginTop:"8px", height:"20px" }}>
        <svg width="100%" height="20" viewBox="0 0 80 20" preserveAspectRatio="none">
          <polyline
            points={Array.from({ length:12 }, (_,i) => {
              const noise = Math.sin(i * 1.3) * 3 + (isUp ? i*0.4 : isDown ? -i*0.4 : 0);
              return `${(i/11)*80},${10 - noise}`;
            }).join(" ")}
            fill="none" stroke={color} strokeWidth="1.5" opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
}