import { useEffect } from "react";

export function AchievementPopup({ achievement, onClose }) {
  useEffect(()=>{const t=setTimeout(onClose,3500);return()=>clearTimeout(t);},[]);
  return <div style={{
    position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",zIndex:1500,
    background:"linear-gradient(135deg,#1e293b,#334155)",border:"2px solid #fbbf24",
    borderRadius:16,padding:"14px 24px",display:"flex",alignItems:"center",gap:12,
    boxShadow:"0 8px 40px rgba(251,191,36,0.3)",animation:"slideDown 0.5s ease"
  }}>
    <span style={{fontSize:32}}>{achievement.icon}</span>
    <div>
      <div style={{fontSize:10,color:"#fbbf24",fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>Logro desbloqueado</div>
      <div style={{fontSize:15,fontWeight:700,color:"#f1f5f9"}}>{achievement.name}</div>
      <div style={{fontSize:11,color:"#94a3b8"}}>{achievement.desc}</div>
    </div>
  </div>;
}
