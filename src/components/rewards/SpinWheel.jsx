import { useEffect, useRef, useState } from "react";
import { WHEEL_SEGMENTS } from "../../data/gamification.js";
import { Particles } from "./Confetti.jsx";

export function SpinWheel({ onComplete, onClose }) {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rot, setRot] = useState(0);

  const segs = WHEEL_SEGMENTS;
  const segAngle = 360 / segs.length;

  useEffect(() => { draw(0); }, []);

  const draw = (r) => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); const sz = c.width; const cx = sz/2; const rad = cx-12;
    ctx.clearRect(0,0,sz,sz);
    ctx.save(); ctx.shadowColor="rgba(99,102,241,0.5)"; ctx.shadowBlur=40;
    ctx.beginPath(); ctx.arc(cx,cx,rad,0,Math.PI*2); ctx.fillStyle="#1e293b"; ctx.fill(); ctx.restore();
    segs.forEach((s,i) => {
      const sa=(i*segAngle-90+r)*Math.PI/180, ea=((i+1)*segAngle-90+r)*Math.PI/180;
      ctx.beginPath(); ctx.moveTo(cx,cx); ctx.arc(cx,cx,rad,sa,ea); ctx.closePath();
      const g = ctx.createRadialGradient(cx,cx,0,cx,cx,rad);
      g.addColorStop(0, s.color+"88"); g.addColorStop(1, s.color);
      ctx.fillStyle=g; ctx.fill(); ctx.strokeStyle="#0f172a"; ctx.lineWidth=2; ctx.stroke();
      ctx.save(); ctx.translate(cx,cx); ctx.rotate(sa+(segAngle*Math.PI/360));
      ctx.textAlign="right"; ctx.fillStyle="white"; ctx.font="bold 12px Inter,sans-serif";
      ctx.fillText(s.label, rad-14, 4); ctx.restore();
    });
    ctx.beginPath(); ctx.arc(cx,cx,24,0,Math.PI*2); ctx.fillStyle="#0f172a"; ctx.fill();
    ctx.strokeStyle="#fbbf24"; ctx.lineWidth=3; ctx.stroke();
    ctx.fillStyle="#fbbf24"; ctx.font="bold 18px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("\u2605",cx,cx);
    ctx.beginPath(); ctx.moveTo(cx-14,4); ctx.lineTo(cx+14,4); ctx.lineTo(cx,26); ctx.closePath();
    ctx.fillStyle="#fbbf24"; ctx.fill();
  };

  const spin = () => {
    if (spinning) return; setSpinning(true); setResult(null);
    let totalW = segs.reduce((s,p)=>s+p.w,0), rand = Math.random()*totalW, winIdx=0;
    for (let i=0;i<segs.length;i++){rand-=segs[i].w;if(rand<=0){winIdx=i;break;}}
    const target = 360*6+(360-(winIdx*segAngle+segAngle/2));
    const start = Date.now(), dur = 4500, startR = rot;
    const anim = () => {
      const p = Math.min((Date.now()-start)/dur,1), ease=1-Math.pow(1-p,4);
      const cr = startR+target*ease; draw(cr); setRot(cr);
      if (p<1) requestAnimationFrame(anim);
      else { setSpinning(false); setResult(segs[winIdx]); setTimeout(()=>onComplete(segs[winIdx]),1800); }
    };
    requestAnimationFrame(anim);
  };

  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(10px)"}}>
    <div style={{background:"linear-gradient(135deg,#1e293b,#0f172a)",borderRadius:24,padding:32,textAlign:"center",border:"2px solid rgba(251,191,36,0.3)",maxWidth:420,position:"relative",overflow:"hidden"}}>
      <Particles count={15} color="#fbbf24" />
      <h2 style={{margin:"0 0 4px",fontSize:22,color:"#fbbf24",fontWeight:800,position:"relative"}}>RULETA DE RECOMPENSAS</h2>
      <p style={{margin:"0 0 16px",color:"#94a3b8",fontSize:13,position:"relative"}}>Gira y descubre tu premio</p>
      <canvas ref={canvasRef} width={280} height={280} style={{margin:"0 auto 16px",display:"block",position:"relative"}}/>
      {result ? (
        <div style={{animation:"pulse 0.5s",position:"relative"}}>
          <div style={{fontSize:36,marginBottom:6}}>{"\uD83C\uDF89"}</div>
          <div style={{fontSize:24,fontWeight:800,color:result.color}}>{result.label}</div>
          <div style={{color:"#94a3b8",fontSize:13,marginTop:4}}>
            {result.xp?`+${result.xp} XP`:result.mult?`Multiplicador x${result.mult} activado`:result.scratch?"Rasca y gana desbloqueado":result.chest?"Cofre misterioso obtenido":result.power?"Power-up obtenido":""}
          </div>
          <button onClick={onClose} style={{marginTop:16,padding:"10px 36px",background:"linear-gradient(135deg,#3b82f6,#2563eb)",border:"none",borderRadius:10,color:"white",fontSize:14,fontWeight:600,cursor:"pointer"}}>Continuar</button>
        </div>
      ) : (
        <button onClick={spin} disabled={spinning} style={{
          padding:"14px 52px",background:spinning?"#374151":"linear-gradient(135deg,#f59e0b,#f97316)",
          border:"none",borderRadius:14,color:"white",fontSize:18,fontWeight:800,
          cursor:spinning?"wait":"pointer",boxShadow:spinning?"none":"0 4px 25px rgba(245,158,11,0.5)",
          animation:spinning?"":"pulse 1.5s infinite",position:"relative"
        }}>{spinning?"Girando...":"\u2605 GIRAR \u2605"}</button>
      )}
    </div>
  </div>;
}
