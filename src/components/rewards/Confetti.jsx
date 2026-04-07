export function Particles({ count = 20, color = "#fbbf24" }) {
  return <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
    {Array.from({length:count}).map((_,i)=>(
      <div key={i} style={{
        position:"absolute", left:`${Math.random()*100}%`, top:`${Math.random()*100}%`,
        width:6+Math.random()*6, height:6+Math.random()*6, borderRadius:"50%",
        background:color, opacity:0.6, animation:`sparkle ${1+Math.random()*2}s infinite ${Math.random()*2}s`
      }}/>
    ))}
  </div>;
}

export function Confetti({ active }) {
  if (!active) return null;
  const colors = ["#f59e0b","#3b82f6","#ec4899","#10b981","#8b5cf6","#ef4444"];
  return <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:2000}}>
    {Array.from({length:40}).map((_,i)=>(
      <div key={i} style={{
        position:"absolute", left:`${Math.random()*100}%`, top:-20,
        width:8+Math.random()*8, height:8+Math.random()*12,
        background:colors[i%colors.length], borderRadius:Math.random()>.5?"50%":"2px",
        animation:`confetti ${2+Math.random()*3}s linear ${Math.random()*1}s forwards`
      }}/>
    ))}
  </div>;
}
