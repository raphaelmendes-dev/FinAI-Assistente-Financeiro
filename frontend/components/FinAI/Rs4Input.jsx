// Rs4Machine · FinAI — Rs4Input
import { useState } from "react";
import { T } from "@/constants/tokens";

export default function Rs4Input({ label, value, onChange, prefix, suffix, type="number", min, max, step }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.16em", color:T.muted, textTransform:"uppercase", marginBottom:"5px" }}>
        {label}
      </div>
      <div style={{
        display:"flex", alignItems:"center",
        background:T.bgDeep,
        border:`1px solid ${focused ? T.cyan : T.border}`,
        borderRadius:"5px",
        boxShadow: focused ? `0 0 10px ${T.cyan}33, inset 0 0 10px ${T.cyan}08` : "none",
        transition:"border-color 0.2s, box-shadow 0.2s",
        overflow:"hidden",
      }}>
        {prefix && (
          <span style={{ padding:"0 10px", fontFamily:"monospace", fontSize:"11px", color:T.muted, borderRight:`1px solid ${T.border}`, whiteSpace:"nowrap" }}>
            {prefix}
          </span>
        )}
        <input
          type={type} value={value}
          onChange={e => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          min={min} max={max} step={step}
          style={{
            flex:1, padding:"9px 12px",
            background:"transparent", border:"none", outline:"none",
            fontFamily:"'JetBrains Mono', monospace", fontSize:"13px", fontWeight:"500",
            color: focused ? T.cyan : T.text,
            letterSpacing:"0.04em", width:"100%",
          }}
        />
        {suffix && (
          <span style={{ padding:"0 10px", fontFamily:"monospace", fontSize:"11px", color:T.cyan, borderLeft:`1px solid ${T.border}` }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}