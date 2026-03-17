// Rs4Machine · FinAI — NeonLineChart com tooltip
"use client";
import { useState } from "react";
import { T } from "@/constants/tokens";

export default function NeonLineChart({ pontos = [], inicial = 10000, glitch }) {
  const [tooltip, setTooltip] = useState(null); // { x, y, value, month }

  const W = 560, H = 180;
  const PAD = { top:16, right:16, bottom:28, left:56 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const base   = inicial || 10000;
  const points = (pontos && pontos.length > 1) ? pontos : [base, base * 1.05];

  const maxVal = Math.max(...points) * 1.05 || 1;
  const minVal = Math.min(...points) * 0.95 || 0;
  const range  = (maxVal - minVal) || 1;

  const toX = (i) => PAD.left + (i / Math.max(points.length - 1, 1)) * chartW;
  const toY = (v) => {
    const y = PAD.top + chartH - ((v - minVal) / range) * chartH;
    return isNaN(y) ? PAD.top + chartH / 2 : y;
  };

  const pathD = points.map((v,i) => `${i===0?"M":"L"} ${toX(i)} ${toY(v)}`).join(" ");
  const areaD = pathD + ` L ${toX(points.length-1)} ${PAD.top+chartH} L ${PAD.left} ${PAD.top+chartH} Z`;

  const finalValue = points[points.length - 1] || base;
  const profit     = finalValue - base;
  const profitPct  = base > 0 ? ((finalValue / base - 1) * 100).toFixed(1) : "0.0";

  const fmt = (v) => v >= 1e6
    ? `R$${(v/1e6).toFixed(2)}M`
    : v >= 1e3
    ? `R$${(v/1e3).toFixed(1)}k`
    : `R$${Number(v).toFixed(0)}`;

  const yTicks = Array.from({length:5}, (_,i) => minVal + (range * i) / 4);
  const totalM = points.length - 1;
  const xTicks = [0, Math.floor(totalM*0.25), Math.floor(totalM*0.5), Math.floor(totalM*0.75), totalM];

  // Detecta qual ponto está mais próximo do mouse
  const handleMouseMove = (e) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = W / rect.width;
    const mouseX = (e.clientX - rect.left) * scaleX;

    // encontra índice mais próximo
    let closestIdx = 0;
    let closestDist = Infinity;
    points.forEach((_, i) => {
      const dist = Math.abs(toX(i) - mouseX);
      if (dist < closestDist) { closestDist = dist; closestIdx = i; }
    });

    if (closestDist < 30) {
      setTooltip({
        x: toX(closestIdx),
        y: toY(points[closestIdx]),
        value: points[closestIdx],
        month: closestIdx,
      });
    } else {
      setTooltip(null);
    }
  };

  return (
    <div style={{ position:"relative" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"8px", paddingLeft:"4px" }}>
        <div>
          <div style={{ fontSize:"8px", letterSpacing:"0.16em", color:T.muted, fontFamily:"monospace", textTransform:"uppercase" }}>
            Projeção de Crescimento
          </div>
          <div style={{ display:"flex", gap:"14px", marginTop:"2px" }}>
            <span style={{ fontFamily:"monospace", fontSize:"10px", color:T.cyan }}>▬ Projetado</span>
            <span style={{ fontFamily:"monospace", fontSize:"10px", color:T.muted }}>▬ Conservador</span>
          </div>
        </div>
        <div style={{ marginLeft:"auto", textAlign:"right" }}>
          <div style={{
            fontFamily:"'JetBrains Mono',monospace", fontSize:"22px", fontWeight:"700",
            color:T.green, textShadow:`0 0 16px ${T.green}88`, lineHeight:1,
            animation: glitch ? "value-glitch 0.3s ease-out" : "none",
          }}>
            {fmt(finalValue)}
          </div>
          <div style={{ fontFamily:"monospace", fontSize:"9px", color:T.green, opacity:0.8 }}>
            +{fmt(profit)} (+{profitPct}%)
          </div>
        </div>
      </div>

      {/* SVG */}
      <svg
        width="100%" viewBox={`0 0 ${W} ${H}`}
        style={{ overflow:"visible", display:"block", cursor:"crosshair" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(null)}
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={T.cyan} stopOpacity="0.18"/>
            <stop offset="100%" stopColor={T.cyan} stopOpacity="0.01"/>
          </linearGradient>
          <filter id="glow-line">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <clipPath id="chartClip">
            <rect x={PAD.left} y={PAD.top} width={chartW} height={chartH}/>
          </clipPath>
        </defs>

        {/* Grid */}
        {yTicks.map((_,i) => {
          const y = PAD.top + (chartH/4)*(4-i);
          return <line key={`ygrid-${i}`} x1={PAD.left} y1={y} x2={PAD.left+chartW} y2={y} stroke={T.border} strokeWidth="1" strokeDasharray={i===0?"none":"4,4"} opacity={0.6}/>;
        })}
        {xTicks.map((idx,i) => (
          <line key={`xline-${i}`} x1={toX(idx)} y1={PAD.top} x2={toX(idx)} y2={PAD.top+chartH} stroke={T.dim} strokeWidth="0.5" opacity={0.5}/>
        ))}

        {/* Area + Line */}
        <path d={areaD} fill="url(#areaGrad)" clipPath="url(#chartClip)"/>
        <path d={pathD} fill="none" stroke={T.cyan} strokeWidth="2.5"
          filter="url(#glow-line)" clipPath="url(#chartClip)"
          style={{ animation: glitch ? "line-flash 0.3s ease-out" : "none" }}
        />

        {/* End dot */}
        <circle cx={toX(points.length-1)} cy={toY(finalValue)} r="5" fill={T.bgDeep} stroke={T.cyan} strokeWidth="2" filter="url(#glow-strong)"/>
        <circle cx={toX(points.length-1)} cy={toY(finalValue)} r="2.5" fill={T.cyan}/>

        {/* Labels */}
        {yTicks.map((v,i) => {
          const y = PAD.top + (chartH/4)*(4-i);
          return <text key={`ylabel-${i}`} x={PAD.left-6} y={y+4} textAnchor="end" style={{ fontFamily:"monospace", fontSize:"9px", fill:T.muted }}>{fmt(v)}</text>;
        })}
        {xTicks.map((idx,i) => (
          <text key={`xlabel-${i}`} x={toX(idx)} y={H-6} textAnchor="middle" style={{ fontFamily:"monospace", fontSize:"9px", fill:T.muted }}>{idx}m</text>
        ))}

        {/* Tooltip */}
        {tooltip && (
          <>
            {/* Linha vertical */}
            <line x1={tooltip.x} y1={PAD.top} x2={tooltip.x} y2={PAD.top+chartH} stroke={T.cyan} strokeWidth="1" strokeDasharray="3,3" opacity={0.6}/>
            {/* Ponto destacado */}
            <circle cx={tooltip.x} cy={tooltip.y} r="4" fill={T.cyan} stroke={T.bgDeep} strokeWidth="1.5" filter="url(#glow-strong)"/>
            {/* Caixa do tooltip */}
            <rect
              x={tooltip.x > W - 120 ? tooltip.x - 110 : tooltip.x + 10}
              y={tooltip.y > H - 50 ? tooltip.y - 42 : tooltip.y - 10}
              width="100" height="36"
              fill={T.surface} stroke={T.cyan} strokeWidth="0.5" rx="4" opacity={0.95}
            />
            <text
              x={tooltip.x > W - 120 ? tooltip.x - 60 : tooltip.x + 60}
              y={tooltip.y > H - 50 ? tooltip.y - 26 : tooltip.y + 6}
              textAnchor="middle"
              style={{ fontFamily:"monospace", fontSize:"9px", fill:T.muted }}
            >
              Mês {tooltip.month}
            </text>
            <text
              x={tooltip.x > W - 120 ? tooltip.x - 60 : tooltip.x + 60}
              y={tooltip.y > H - 50 ? tooltip.y - 12 : tooltip.y + 20}
              textAnchor="middle"
              style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", fill:T.green, fontWeight:"700" }}
            >
              {fmt(tooltip.value)}
            </text>
          </>
        )}
      </svg>
    </div>
  );
}