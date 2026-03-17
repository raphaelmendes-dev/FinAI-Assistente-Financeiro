// Rs4Machine · FinAI — ChatTerminal (conectado ao Gemini)
import { useRef, useEffect } from "react";
import { T } from "@/constants/tokens";

export default function ChatTerminal({ messages, input, setInput, onSend, isTyping }) {
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, isTyping]);

  const msgColor  = { user:T.cyan, ai:T.green, sys:T.muted };
  const msgPrefix = { user:"▸ VOCÊ", ai:"◈ FinAI", sys:"⬡ SYS" };

  return (
    <div style={{
      background:"#040608", border:`1px solid ${T.border}`,
      borderRadius:"8px", overflow:"hidden",
      display:"flex", flexDirection:"column", height:"100%",
    }}>
      {/* Header */}
      <div style={{
        display:"flex", alignItems:"center", gap:"8px",
        padding:"8px 14px", borderBottom:`1px solid ${T.border}`,
        background:T.surface,
      }}>
        {["#ff5f57","#febc2e","#28c840"].map((c,i) => (
          <div key={i} style={{ width:"8px", height:"8px", borderRadius:"50%", background:c, opacity:0.65 }}/>
        ))}
        <span style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.16em", color:T.muted, textTransform:"uppercase", marginLeft:"4px" }}>
          finai · gemini · terminal
        </span>
        {isTyping && (
          <span style={{ marginLeft:"auto", fontFamily:"monospace", fontSize:"9px", color:T.green, letterSpacing:"0.1em", animation:"dot-blink 0.8s ease-in-out infinite" }}>
            FinAI digitando...
          </span>
        )}
      </div>

      {/* Messages */}
      <div style={{
        flex:1, overflowY:"auto", padding:"10px 14px",
        scrollbarWidth:"thin", scrollbarColor:`${T.border} transparent`,
        minHeight:0,
      }}>
        {messages.map((msg,i) => (
          <div key={i} style={{ display:"flex", gap:"10px", marginBottom:"6px", animation:"log-appear 0.25s ease-out both" }}>
            <span style={{ fontFamily:"monospace", fontSize:"8px", color:T.dim, whiteSpace:"nowrap", paddingTop:"2px", minWidth:"44px" }}>{msg.time}</span>
            <span style={{ fontFamily:"monospace", fontSize:"9px", color:msgColor[msg.type], fontWeight:"700", letterSpacing:"0.08em", whiteSpace:"nowrap", paddingTop:"2px", minWidth:"52px", textShadow:`0 0 6px ${msgColor[msg.type]}66` }}>
              {msgPrefix[msg.type]}
            </span>
            <span style={{ fontFamily:"monospace", fontSize:"11px", color:msg.type==="sys"?T.muted:T.text, lineHeight:"1.6", opacity:msg.type==="sys"?0.5:0.9 }}>
              {msg.text}
              {msg.type==="ai" && i===messages.length-1 && isTyping && (
                <span style={{ color:T.green, animation:"cursor-blink 0.8s step-end infinite" }}>█</span>
              )}
            </span>
          </div>
        ))}
        {isTyping && messages[messages.length-1]?.type !== "ai" && (
          <div style={{ display:"flex", gap:"10px", marginBottom:"6px" }}>
            <span style={{ fontFamily:"monospace", fontSize:"8px", color:T.dim, minWidth:"44px" }}></span>
            <span style={{ fontFamily:"monospace", fontSize:"9px", color:T.green, fontWeight:"700", minWidth:"52px" }}>◈ FinAI</span>
            <span style={{ fontFamily:"monospace", fontSize:"11px", color:T.green }}>
              <span style={{ animation:"dot-blink 0.4s ease-in-out infinite" }}>█</span>
            </span>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Input */}
      <div style={{ display:"flex", gap:"8px", padding:"10px 12px", borderTop:`1px solid ${T.border}`, background:T.surface }}>
        <span style={{ fontFamily:"monospace", fontSize:"11px", color:T.cyan, paddingTop:"8px", flexShrink:0 }}>▸</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key==="Enter" && !e.shiftKey && onSend()}
          placeholder="Pergunte ao FinAI... (ex: como alocar meu capital?)"
          style={{ flex:1, background:"transparent", border:"none", padding:"8px 0", fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", color:T.text, letterSpacing:"0.03em", outline:"none" }}
        />
        <button onClick={onSend} style={{
          padding:"6px 14px", background:`${T.cyan}18`, border:`1px solid ${T.cyan}55`,
          borderRadius:"4px", color:T.cyan, fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.12em",
          cursor:"pointer", transition:"all 0.2s", textTransform:"uppercase",
        }}
          onMouseEnter={e=>{ e.currentTarget.style.background=`${T.cyan}30`; e.currentTarget.style.boxShadow=`0 0 10px ${T.cyan}44`; }}
          onMouseLeave={e=>{ e.currentTarget.style.background=`${T.cyan}18`; e.currentTarget.style.boxShadow="none"; }}
        >ENVIAR</button>
      </div>
    </div>
  );
}