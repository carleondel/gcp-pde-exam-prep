import { useEffect, useRef, useState } from "react";
import { SCRATCH_PRIZES } from "../../data/gamification.js";

export function ScratchCard({ onComplete, onClose }) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [prize] = useState(() => {
    const weights = { common:50, rare:30, epic:15, legendary:5 };
    let r = Math.random()*100, acc=0;
    let rarity = "common";
    for (const [k,v] of Object.entries(weights)) { acc+=v; if (r<=acc){rarity=k;break;} }
    const pool = SCRATCH_PRIZES.filter(p=>p.rarity===rarity);
    return pool[Math.floor(Math.random()*pool.length)] || SCRATCH_PRIZES[0];
  });
  const isDrawing = useRef(false);
  const scratchCount = useRef(0);

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const g = ctx.createLinearGradient(0,0,c.width,c.height);
    g.addColorStop(0,"#3d4556"); g.addColorStop(0.5,"#8b95a8"); g.addColorStop(1,"#3d4556");
    ctx.fillStyle = g; ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle = "#0f1520"; ctx.font = "bold 16px 'JetBrains Mono',monospace"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("RASCA AQU\u00CD \u2193",c.width/2,c.height/2-10);
    ctx.fillText("\u2726 \u2726 \u2726 \u2726 \u2726",c.width/2,c.height/2+14);
  }, []);

  const scratch = (e) => {
    if (revealed) return;
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const rect = c.getBoundingClientRect();
    const x = (e.clientX||e.touches?.[0]?.clientX||0)-rect.left;
    const y = (e.clientY||e.touches?.[0]?.clientY||0)-rect.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath(); ctx.arc(x,y,22,0,Math.PI*2); ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    scratchCount.current++;
    if (scratchCount.current > 30 && !revealed) {
      setRevealed(true);
      onComplete(prize);
    }
  };

  const rarityColors = { common:"var(--signal-info)", rare:"var(--primary-400)", epic:"var(--highlight)", legendary:"var(--accent-300)" };

  return <div style={{position:"fixed",inset:0,background:"var(--bg-overlay)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(10px)"}}>
    <div style={{background:"var(--gradient-panel-strong)",borderRadius:24,padding:32,textAlign:"center",border:"2px solid var(--primary-medium)",maxWidth:380,position:"relative",boxShadow:"var(--shadow-elevated)"}}>
      <h2 style={{margin:"0 0 4px",fontSize:22,color:"var(--primary-400)",fontWeight:800,fontFamily:"var(--font-heading)"}}>{"\uD83C\uDF9F\uFE0F"} RASCA Y GANA</h2>
      <p style={{margin:"0 0 16px",color:"var(--text-secondary)",fontSize:13}}>Rasca la superficie para revelar tu premio</p>
      <div style={{position:"relative",width:260,height:120,margin:"0 auto 16px",borderRadius:16,overflow:"hidden",border:"2px solid var(--surface-line-strong)"}}>
        <div style={{position:"absolute",inset:0,background:"var(--gradient-panel)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <div style={{fontSize:36,marginBottom:4}}>{prize.freeze?"\uD83D\uDEE1\uFE0F":prize.skip?"\u23ED\uFE0F":prize.mult?"\u26A1":"\uD83D\uDCB0"}</div>
          <div style={{fontSize:20,fontWeight:800,color:rarityColors[prize.rarity]}}>{prize.label}</div>
          <div style={{fontSize:11,color:"var(--text-tertiary)",textTransform:"uppercase",letterSpacing:1,marginTop:2,fontFamily:"var(--font-mono)"}}>{prize.rarity}</div>
        </div>
        <canvas ref={canvasRef} width={260} height={120} style={{position:"absolute",inset:0,cursor:"crosshair",touchAction:"none"}}
          onMouseDown={()=>{isDrawing.current=true}} onMouseUp={()=>{isDrawing.current=false}}
          onMouseMove={e=>{if(isDrawing.current)scratch(e)}}
          onTouchStart={()=>{isDrawing.current=true}} onTouchEnd={()=>{isDrawing.current=false}}
          onTouchMove={e=>{scratch(e)}}
        />
      </div>
      {revealed && (
        <div style={{animation:"pulse 0.5s"}}>
          <div style={{fontSize:15,fontWeight:700,color:rarityColors[prize.rarity],marginBottom:12}}>
            {prize.xp?`+${prize.xp} XP ganados!`:prize.mult?`Multiplicador x${prize.mult} activado!`:prize.freeze?"Escudo de racha obtenido!":"Skip de pregunta obtenido!"}
          </div>
          <button onClick={onClose} style={{padding:"10px 36px",background:"var(--gradient-practice)",border:"none",borderRadius:10,color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Continuar</button>
        </div>
      )}
    </div>
  </div>;
}
