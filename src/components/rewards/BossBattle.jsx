import { useState } from "react";
import { Confetti } from "./Confetti.jsx";

export function BossBattle({ question, onComplete, onClose }) {
  const [hp, setHp] = useState(100);
  const [bossHp, setBossHp] = useState(100);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState("intro");
  const [shaking, setShaking] = useState(false);
  const [turn, setTurn] = useState(0);

  const attack = () => {
    if (selected === null) return;
    const correct = selected === question.correct;
    setShaking(true);
    setTimeout(()=>setShaking(false), 500);
    if (correct) {
      const dmg = 35 + Math.floor(Math.random()*20);
      const newBossHp = Math.max(0, bossHp - dmg);
      setBossHp(newBossHp);
      if (newBossHp <= 0) {
        setTimeout(()=>{ setPhase("result"); onComplete(true); }, 600);
      } else {
        const bossDmg = 10 + Math.floor(Math.random()*10);
        setTimeout(()=>setHp(h=>Math.max(0,h-bossDmg)), 400);
      }
    } else {
      const bossDmg = 30 + Math.floor(Math.random()*20);
      const newHp = Math.max(0, hp - bossDmg);
      setHp(newHp);
      if (newHp <= 0) {
        setTimeout(()=>{ setPhase("result"); onComplete(false); }, 600);
      }
    }
    setSelected(null);
    setTurn(t=>t+1);
  };

  if (phase === "intro") return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
      <div style={{textAlign:"center",animation:"bossEntrance 0.8s ease"}}>
        <div style={{fontSize:120,marginBottom:16}}>{"\uD83D\uDC09"}</div>
        <h2 style={{color:"#ef4444",fontSize:28,fontWeight:900,margin:"0 0 4px",textShadow:"0 0 20px rgba(239,68,68,0.5)"}}>BOSS BATTLE!</h2>
        <p style={{color:"#fbbf24",fontSize:16,margin:"0 0 8px"}}>Data Dragon te desafia</p>
        <p style={{color:"#94a3b8",fontSize:13,margin:"0 0 24px"}}>Responde correctamente para atacar. Errores = dano masivo!</p>
        <button onClick={()=>setPhase("fight")} style={{padding:"14px 48px",background:"linear-gradient(135deg,#ef4444,#dc2626)",border:"none",borderRadius:14,color:"white",fontSize:16,fontWeight:700,cursor:"pointer",animation:"pulse 1s infinite"}}>LUCHAR</button>
      </div>
    </div>
  );

  if (phase === "result") return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
      <Confetti active={bossHp<=0} />
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:80,marginBottom:16}}>{bossHp<=0?"\uD83C\uDFC6":"\uD83D\uDC80"}</div>
        <h2 style={{color:bossHp<=0?"#fbbf24":"#ef4444",fontSize:28,fontWeight:900,margin:"0 0 8px"}}>{bossHp<=0?"VICTORIA!":"DERROTA"}</h2>
        <p style={{color:"#94a3b8",fontSize:14,margin:"0 0 20px"}}>{bossHp<=0?"+500 XP de recompensa!":"El dragon te ha vencido. Intenta de nuevo."}</p>
        <button onClick={onClose} style={{padding:"12px 40px",background:"linear-gradient(135deg,#3b82f6,#2563eb)",border:"none",borderRadius:12,color:"white",fontSize:15,fontWeight:600,cursor:"pointer"}}>Continuar</button>
      </div>
    </div>
  );

  return (
    <div style={{position:"fixed",inset:0,background:"linear-gradient(180deg,#1a0a0a,#0f172a)",display:"flex",flexDirection:"column",zIndex:1000,padding:20,overflow:"auto"}}>
      <div style={{textAlign:"center",marginBottom:16}}>
        <div style={{fontSize:64,animation:shaking?"shake 0.5s":"bounce 2s infinite"}}>{"\uD83D\uDC09"}</div>
        <div style={{maxWidth:300,margin:"8px auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
            <span style={{color:"#ef4444",fontWeight:700}}>Data Dragon</span><span style={{color:"#94a3b8"}}>{bossHp}/100 HP</span>
          </div>
          <div style={{height:10,background:"rgba(148,163,184,0.1)",borderRadius:5,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${bossHp}%`,background:"linear-gradient(90deg,#ef4444,#f97316)",borderRadius:5,transition:"width 0.5s"}}/>
          </div>
        </div>
      </div>
      <div style={{maxWidth:600,margin:"0 auto",width:"100%",flex:1}}>
        <div style={{background:"rgba(30,41,59,0.8)",borderRadius:14,padding:18,border:"1px solid rgba(239,68,68,0.2)",marginBottom:12}}>
          <p style={{margin:0,fontSize:14,lineHeight:1.6,color:"#f1f5f9"}}>{question.question}</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
          {question.options.map((o,i)=>(
            <button key={i} onClick={()=>setSelected(i)} style={{
              padding:"12px 16px",borderRadius:10,fontSize:13,textAlign:"left",cursor:"pointer",fontFamily:"inherit",lineHeight:1.4,
              background:selected===i?"rgba(59,130,246,0.2)":"rgba(30,41,59,0.6)",
              border:selected===i?"2px solid #3b82f6":"1px solid rgba(148,163,184,0.1)",
              color:selected===i?"#60a5fa":"#cbd5e1"
            }}>{o}</button>
          ))}
        </div>
        <button onClick={attack} disabled={selected===null} style={{
          width:"100%",padding:"13px",background:selected!==null?"linear-gradient(135deg,#ef4444,#dc2626)":"#374151",
          border:"none",borderRadius:12,color:"white",fontSize:15,fontWeight:700,
          cursor:selected!==null?"pointer":"not-allowed",opacity:selected!==null?1:0.5
        }}>{"\u2694\uFE0F"} ATACAR</button>
      </div>
      <div style={{maxWidth:300,margin:"16px auto 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
          <span style={{color:"#34d399",fontWeight:700}}>Tu HP</span><span style={{color:"#94a3b8"}}>{hp}/100</span>
        </div>
        <div style={{height:10,background:"rgba(148,163,184,0.1)",borderRadius:5,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${hp}%`,background:"linear-gradient(90deg,#10b981,#34d399)",borderRadius:5,transition:"width 0.5s"}}/>
        </div>
      </div>
    </div>
  );
}
