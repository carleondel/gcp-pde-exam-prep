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

  const rarityBg = { common:"#3b82f6", rare:"#a855f7", epic:"#ec4899", legendary:"#f59e0b" };
  const rarityGlow = { common:"rgba(59,130,246,0.3)", rare:"rgba(168,85,247,0.4)", epic:"rgba(236,72,153,0.4)", legendary:"rgba(245,158,11,0.5)" };

  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(12px)"}}>
    <div style={{textAlign:"center",maxWidth:380}}>
      {!opened ? (
        <div>
          <div style={{fontSize:100,marginBottom:16,animation:"bounce 1s infinite",cursor:"pointer"}} onClick={()=>setOpened(true)}>{"\uD83D\uDCE6"}</div>
          <h2 style={{color:"#fbbf24",fontSize:22,fontWeight:800,margin:"0 0 8px"}}>COFRE MISTERIOSO</h2>
          <p style={{color:"#94a3b8",fontSize:14,margin:"0 0 20px"}}>Toca el cofre para abrirlo</p>
          <button onClick={()=>setOpened(true)} style={{padding:"14px 48px",background:"linear-gradient(135deg,#f59e0b,#f97316)",border:"none",borderRadius:14,color:"white",fontSize:16,fontWeight:700,cursor:"pointer",animation:"glow 1.5s infinite"}}>ABRIR COFRE</button>
        </div>
      ) : (
        <div style={{animation:"chestOpen 0.8s ease"}}>
          <Confetti active={item.rarity==="legendary"||item.rarity==="epic"} />
          <div style={{width:160,height:160,margin:"0 auto 16px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:72,background:`radial-gradient(circle,${rarityBg[item.rarity]}33,transparent)`,boxShadow:`0 0 60px ${rarityGlow[item.rarity]}`,border:`3px solid ${rarityBg[item.rarity]}`}}>
            {item.icon}
          </div>
          <div style={{fontSize:11,color:rarityBg[item.rarity],textTransform:"uppercase",letterSpacing:2,fontWeight:700,marginBottom:4}}>{item.rarity}</div>
          <div style={{fontSize:22,fontWeight:800,color:"#f1f5f9",marginBottom:4}}>{item.name}</div>
          <div style={{fontSize:14,color:"#94a3b8",marginBottom:20}}>{item.desc}</div>
          <button onClick={()=>{onComplete(item);onClose();}} style={{padding:"12px 40px",background:`linear-gradient(135deg,${rarityBg[item.rarity]},${rarityBg[item.rarity]}cc)`,border:"none",borderRadius:12,color:"white",fontSize:15,fontWeight:600,cursor:"pointer"}}>Recoger</button>
        </div>
      )}
    </div>
  </div>;
}
