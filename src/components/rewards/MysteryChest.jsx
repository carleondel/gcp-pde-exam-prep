import { useState } from "react";
import { CHEST_ITEMS } from "../../data/gamification.js";
import { Confetti } from "./Confetti.jsx";

export function MysteryChest({ onComplete, onClose }) {
  const [opened, setOpened] = useState(false);
  const [item] = useState(() => {
    const weights = { common:35, rare:35, epic:20, legendary:10 };
    let r=Math.random()*100, acc=0, rarity="common";
    for (const [k,v] of Object.entries(weights)){acc+=v;if(r<=acc){rarity=k;break;}}
    const pool = CHEST_ITEMS.filter(i=>i.rarity===rarity);
    return pool[Math.floor(Math.random()*pool.length)] || CHEST_ITEMS[0];
  });

  const rarityBg = { common:"var(--signal-info)", rare:"var(--primary-400)", epic:"var(--highlight)", legendary:"var(--accent-300)" };
  const rarityGlow = { common:"rgba(74,158,255,0.22)", rare:"rgba(15,191,163,0.26)", epic:"rgba(143,255,106,0.24)", legendary:"rgba(255,183,51,0.3)" };

  return <div style={{position:"fixed",inset:0,background:"var(--bg-overlay)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(12px)"}}>
    <div style={{textAlign:"center",maxWidth:380}}>
      {!opened ? (
        <div>
          <div style={{fontSize:100,marginBottom:16,animation:"bounce 1s infinite",cursor:"pointer"}} onClick={()=>setOpened(true)}>{"\uD83D\uDCE6"}</div>
          <h2 style={{color:"var(--accent-300)",fontSize:22,fontWeight:800,margin:"0 0 8px",fontFamily:"var(--font-heading)"}}>COFRE MISTERIOSO</h2>
          <p style={{color:"var(--text-secondary)",fontSize:14,margin:"0 0 20px"}}>Toca el cofre para abrirlo</p>
          <button onClick={()=>setOpened(true)} style={{padding:"14px 48px",background:"var(--gradient-mock)",border:"none",borderRadius:14,color:"white",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"var(--font-mono)"}}>ABRIR COFRE</button>
        </div>
      ) : (
        <div style={{animation:"chestOpen 0.8s ease"}}>
          <Confetti active={item.rarity==="legendary"||item.rarity==="epic"} />
          <div style={{width:160,height:160,margin:"0 auto 16px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:72,background:`radial-gradient(circle,${rarityBg[item.rarity]}33,transparent)`,boxShadow:`0 0 60px ${rarityGlow[item.rarity]}`,border:`3px solid ${rarityBg[item.rarity]}`}}>
            {item.icon}
          </div>
          <div style={{fontSize:11,color:rarityBg[item.rarity],textTransform:"uppercase",letterSpacing:2,fontWeight:700,marginBottom:4,fontFamily:"var(--font-mono)"}}>{item.rarity}</div>
          <div style={{fontSize:22,fontWeight:800,color:"var(--text-primary)",marginBottom:4,fontFamily:"var(--font-heading)"}}>{item.name}</div>
          <div style={{fontSize:14,color:"var(--text-secondary)",marginBottom:20}}>{item.desc}</div>
          <button onClick={()=>{onComplete(item);onClose();}} style={{padding:"12px 40px",background:`linear-gradient(135deg,${rarityBg[item.rarity]},${rarityBg[item.rarity]}cc)`,border:"none",borderRadius:12,color:"white",fontSize:15,fontWeight:600,cursor:"pointer"}}>Recoger</button>
        </div>
      )}
    </div>
  </div>;
}
