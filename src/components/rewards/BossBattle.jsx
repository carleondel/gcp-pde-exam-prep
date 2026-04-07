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
    <div style={{position:"fixed",inset:0,background:"var(--bg-overlay)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
      <div style={{textAlign:"center",animation:"bossEntrance 0.8s ease"}}>
        <div style={{fontSize:120,marginBottom:16}}>{"\uD83D\uDC09"}</div>
        <h2 style={{color:"var(--signal-wrong)",fontSize:28,fontWeight:900,margin:"0 0 4px",textShadow:"0 0 20px rgba(240,96,90,0.3)",fontFamily:"var(--font-heading)"}}>BOSS BATTLE</h2>
        <p style={{color:"var(--accent-300)",fontSize:16,margin:"0 0 8px"}}>Data Dragon te desafia</p>
        <p style={{color:"var(--text-secondary)",fontSize:13,margin:"0 0 24px"}}>Responde bien para atacar. Fallar castiga fuerte.</p>
        <button onClick={()=>setPhase("fight")} style={{padding:"14px 48px",background:"var(--gradient-danger)",border:"none",borderRadius:"var(--radius-md)",color:"white",fontSize:16,fontWeight:700,cursor:"pointer",animation:"pulse 1s infinite",fontFamily:"var(--font-mono)"}}>LUCHAR</button>
      </div>
    </div>
  );

  if (phase === "result") return (
    <div style={{position:"fixed",inset:0,background:"var(--bg-overlay)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
      <Confetti active={bossHp<=0} />
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:80,marginBottom:16}}>{bossHp<=0?"\uD83C\uDFC6":"\uD83D\uDC80"}</div>
        <h2 style={{color:bossHp<=0?"var(--accent-300)":"var(--signal-wrong)",fontSize:28,fontWeight:900,margin:"0 0 8px",fontFamily:"var(--font-heading)"}}>{bossHp<=0?"VICTORIA":"DERROTA"}</h2>
        <p style={{color:"var(--text-secondary)",fontSize:14,margin:"0 0 20px"}}>{bossHp<=0?"+500 XP de recompensa":"El dragon te ha vencido. Intenta de nuevo."}</p>
        <button onClick={onClose} style={{padding:"12px 40px",background:"var(--gradient-practice)",border:"none",borderRadius:"var(--radius-md)",color:"white",fontSize:15,fontWeight:600,cursor:"pointer"}}>Continuar</button>
      </div>
    </div>
  );

  return (
    <div style={{position:"fixed",inset:0,background:"linear-gradient(180deg, rgba(33, 10, 10, 0.96), rgba(15, 21, 32, 1))",display:"flex",flexDirection:"column",zIndex:1000,padding:20,overflow:"auto"}}>
      <div style={{textAlign:"center",marginBottom:16}}>
        <div style={{fontSize:64,animation:shaking?"shake 0.5s":"bounce 2s infinite"}}>{"\uD83D\uDC09"}</div>
        <div style={{maxWidth:300,margin:"8px auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
            <span style={{color:"var(--signal-wrong)",fontWeight:700}}>Data Dragon</span><span style={{color:"var(--text-secondary)",fontFamily:"var(--font-mono)"}}>{bossHp}/100 HP</span>
          </div>
          <div style={{height:10,background:"var(--surface-line)",borderRadius:5,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${bossHp}%`,background:"var(--gradient-danger)",borderRadius:5,transition:"width 0.5s"}}/>
          </div>
        </div>
      </div>
      <div style={{maxWidth:600,margin:"0 auto",width:"100%",flex:1}}>
        <div style={{background:"var(--gradient-panel)",borderRadius:"var(--radius-md)",padding:18,border:"1px solid rgba(240,96,90,0.2)",marginBottom:12}}>
          <p style={{margin:0,fontSize:14,lineHeight:1.6,color:"var(--text-primary)"}}>{question.question}</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"var(--space-sm)",marginBottom:12}}>
          {question.options.map((o,i)=>(
            <button key={i} onClick={()=>setSelected(i)} style={{
              padding:"12px 16px",borderRadius:"var(--radius-sm)",fontSize:13,textAlign:"left",cursor:"pointer",fontFamily:"inherit",lineHeight:1.4,
              background:selected===i?"var(--info-soft)":"var(--surface-panel-muted)",
              border:selected===i?"2px solid var(--signal-info)":"1px solid var(--surface-line)",
              color:selected===i?"var(--signal-info)":"var(--text-primary)"
            }}>{o}</button>
          ))}
        </div>
        <button onClick={attack} disabled={selected===null} style={{
          width:"100%",padding:"13px",background:selected!==null?"var(--gradient-danger)":"var(--text-muted)",
          border:"none",borderRadius:"var(--radius-md)",color:"white",fontSize:15,fontWeight:700,
          cursor:selected!==null?"pointer":"not-allowed",opacity:selected!==null?1:0.5,fontFamily:"var(--font-mono)"
        }}>{"\u2694\uFE0F"} ATACAR</button>
      </div>
      <div style={{maxWidth:300,margin:"16px auto 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
          <span style={{color:"var(--signal-correct)",fontWeight:700}}>Tu HP</span><span style={{color:"var(--text-secondary)",fontFamily:"var(--font-mono)"}}>{hp}/100</span>
        </div>
        <div style={{height:10,background:"var(--surface-line)",borderRadius:5,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${hp}%`,background:"var(--gradient-success)",borderRadius:5,transition:"width 0.5s"}}/>
        </div>
      </div>
    </div>
  );
}
