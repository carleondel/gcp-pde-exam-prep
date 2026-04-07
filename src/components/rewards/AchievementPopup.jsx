import { useEffect } from "react";

export function AchievementPopup({ achievement, onClose }) {
  useEffect(()=>{const t=setTimeout(onClose,3500);return()=>clearTimeout(t);},[onClose]);
  return <div style={{
    position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",zIndex:1500,
    background:"var(--gradient-panel-strong)",border:"2px solid var(--accent-400)",
    borderRadius:"var(--radius-lg)",padding:"14px 24px",display:"flex",alignItems:"center",gap:"var(--space-md)",
    boxShadow:"0 8px 40px rgba(212,147,10,0.24)",animation:"slideDown 0.5s ease"
  }}>
    <span style={{fontSize:32}}>{achievement.icon}</span>
    <div>
      <div style={{fontSize:10,color:"var(--accent-300)",fontWeight:700,textTransform:"uppercase",letterSpacing:1,fontFamily:"var(--font-mono)"}}>Logro desbloqueado</div>
      <div style={{fontSize:15,fontWeight:700,color:"var(--text-primary)",fontFamily:"var(--font-heading)"}}>{achievement.name}</div>
      <div style={{fontSize:11,color:"var(--text-secondary)"}}>{achievement.desc}</div>
    </div>
  </div>;
}
