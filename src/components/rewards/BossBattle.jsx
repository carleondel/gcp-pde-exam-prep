import { useState, useMemo } from "react";
import { Confetti } from "./Confetti.jsx";

function randomInRange([min, max]) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function BossBattle({ questions, dragon, onComplete, onClose }) {
  const [hp, setHp] = useState(dragon.playerHp);
  const [bossHp, setBossHp] = useState(dragon.hp);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState("intro");
  const [shaking, setShaking] = useState(false);
  const [turn, setTurn] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [totalDmgDealt, setTotalDmgDealt] = useState(0);
  const [totalDmgTaken, setTotalDmgTaken] = useState(0);

  const enraged = bossHp > 0 && bossHp / dragon.hp < dragon.enrageThreshold;
  const question = questions[qIndex % questions.length];

  const attack = () => {
    if (selected === null) return;
    const correct = selected === question.correct;
    setShaking(true);
    setTimeout(() => setShaking(false), 500);

    if (correct) {
      const dmg = randomInRange(dragon.dmgRange);
      const newBossHp = Math.max(0, bossHp - dmg);
      setBossHp(newBossHp);
      setTotalDmgDealt((d) => d + dmg);
      if (newBossHp <= 0) {
        const finalDmg = totalDmgDealt + dmg;
        const finalTaken = totalDmgTaken;
        setTimeout(() => {
          setPhase("result");
          onComplete({ won: true, dragon, turns: turn + 1, dmgDealt: finalDmg, dmgTaken: finalTaken, flawless: wrongCount === 0 });
        }, 600);
      } else {
        const counterMult = enraged ? dragon.enrageMultiplier : 1;
        const counterDmg = Math.round(randomInRange(dragon.counterRange) * counterMult);
        setTimeout(() => {
          setHp((h) => {
            const newHp = Math.max(0, h - counterDmg);
            if (newHp <= 0) {
              setTimeout(() => {
                setPhase("result");
                onComplete({ won: false, dragon, turns: turn + 1, dmgDealt: totalDmgDealt + dmg, dmgTaken: totalDmgTaken + counterDmg, flawless: false });
              }, 400);
            }
            return newHp;
          });
          setTotalDmgTaken((d) => d + counterDmg);
        }, 400);
      }
    } else {
      setWrongCount((w) => w + 1);
      const wrongMult = enraged ? dragon.enrageMultiplier : 1;
      const bossDmg = Math.round(randomInRange(dragon.wrongDmgRange) * wrongMult);
      const newHp = Math.max(0, hp - bossDmg);
      setHp(newHp);
      setTotalDmgTaken((d) => d + bossDmg);
      if (newHp <= 0) {
        setTimeout(() => {
          setPhase("result");
          onComplete({ won: false, dragon, turns: turn + 1, dmgDealt: totalDmgDealt, dmgTaken: totalDmgTaken + bossDmg, flawless: false });
        }, 600);
      }
    }
    setSelected(null);
    setTurn((t) => t + 1);
    setQIndex((i) => i + 1);
  };

  const won = bossHp <= 0;
  const tierBadge = `Tier ${dragon.tier}`;

  if (phase === "intro") return (
    <div style={{ position: "fixed", inset: 0, background: "var(--bg-overlay)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ textAlign: "center", animation: "bossEntrance 0.8s ease" }}>
        <div style={{ fontSize: 120, marginBottom: 16 }}>{dragon.emoji}</div>
        <h2 style={{ color: "var(--signal-wrong)", fontSize: 28, fontWeight: 900, margin: "0 0 4px", textShadow: "0 0 20px rgba(240,96,90,0.3)", fontFamily: "var(--font-heading)" }}>BOSS BATTLE</h2>
        <p style={{ color: "var(--accent-300)", fontSize: 18, fontWeight: 800, margin: "0 0 4px" }}>{dragon.name}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ padding: "4px 10px", borderRadius: "var(--radius-pill)", background: "var(--wrong-soft)", color: "var(--signal-wrong)", fontSize: 11, fontWeight: 800, fontFamily: "var(--font-mono)" }}>{tierBadge}</span>
          {dragon.topicFilter && <span style={{ padding: "4px 10px", borderRadius: "var(--radius-pill)", background: "var(--primary-soft)", color: "var(--primary-400)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{dragon.topicFilter}</span>}
          <span style={{ padding: "4px 10px", borderRadius: "var(--radius-pill)", background: "var(--surface-panel-muted)", color: "var(--text-secondary)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{dragon.hp} HP</span>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: "0 0 24px" }}>Responde bien para atacar. Fallar castiga fuerte.</p>
        <button onClick={() => setPhase("fight")} style={{ padding: "14px 48px", background: "var(--gradient-danger)", border: "none", borderRadius: "var(--radius-md)", color: "white", fontSize: 16, fontWeight: 700, cursor: "pointer", animation: "pulse 1s infinite", fontFamily: "var(--font-mono)" }}>LUCHAR</button>
      </div>
    </div>
  );

  if (phase === "result") return (
    <div style={{ position: "fixed", inset: 0, background: "var(--bg-overlay)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <Confetti active={won} />
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <div style={{ fontSize: 80, marginBottom: 16 }}>{won ? "\uD83C\uDFC6" : "\uD83D\uDC80"}</div>
        <h2 style={{ color: won ? "var(--accent-300)" : "var(--signal-wrong)", fontSize: 28, fontWeight: 900, margin: "0 0 8px", fontFamily: "var(--font-heading)" }}>{won ? "VICTORIA" : "DERROTA"}</h2>
        <p style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>{dragon.name}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, margin: "12px 0", fontSize: 12, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
          <span>{turn} turnos</span>
          <span>{totalDmgDealt} dmg</span>
          <span>{totalDmgTaken} recibido</span>
        </div>
        {won && wrongCount === 0 && <div style={{ padding: "6px 14px", borderRadius: "var(--radius-pill)", background: "rgba(143,255,106,0.12)", color: "var(--highlight)", fontSize: 12, fontWeight: 800, display: "inline-block", marginBottom: 8, fontFamily: "var(--font-mono)" }}>FLAWLESS</div>}
        <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: "0 0 20px" }}>{won ? `+${dragon.xpReward} XP de recompensa` : "El dragon te ha vencido. Intenta de nuevo."}</p>
        <button onClick={onClose} style={{ padding: "12px 40px", background: "var(--gradient-practice)", border: "none", borderRadius: "var(--radius-md)", color: "white", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Continuar</button>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg, rgba(33, 10, 10, 0.96), rgba(15, 21, 32, 1))", display: "flex", flexDirection: "column", zIndex: 1000, padding: 20, overflow: "auto", ...(enraged ? { boxShadow: "inset 0 0 60px rgba(240,96,90,0.25)" } : {}) }}>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 64, animation: shaking ? "shake 0.5s" : enraged ? "shake 0.3s infinite" : "bounce 2s infinite" }}>{dragon.emoji}</div>
        {enraged && <div style={{ fontSize: 11, fontWeight: 900, color: "var(--signal-wrong)", textTransform: "uppercase", letterSpacing: 2, fontFamily: "var(--font-mono)", marginTop: 4, animation: "pulse 0.8s infinite" }}>FURIOSO</div>}
        <div style={{ maxWidth: 300, margin: "8px auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
            <span style={{ color: "var(--signal-wrong)", fontWeight: 700 }}>{dragon.name}</span><span style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{bossHp}/{dragon.hp} HP</span>
          </div>
          <div style={{ height: 10, background: "var(--surface-line)", borderRadius: 5, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(bossHp / dragon.hp) * 100}%`, background: enraged ? "var(--signal-wrong)" : "var(--gradient-danger)", borderRadius: 5, transition: "width 0.5s" }} />
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto", width: "100%", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ padding: "4px 8px", borderRadius: "var(--radius-pill)", background: "var(--surface-panel-muted)", color: "var(--text-tertiary)", fontSize: 10, fontWeight: 700, fontFamily: "var(--font-mono)" }}>Turno {turn + 1}</span>
          <span style={{ padding: "4px 8px", borderRadius: "var(--radius-pill)", background: "var(--primary-soft)", color: "var(--primary-400)", fontSize: 10, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{question.topic}</span>
        </div>
        <div style={{ background: "var(--gradient-panel)", borderRadius: "var(--radius-md)", padding: 18, border: enraged ? "1px solid rgba(240,96,90,0.4)" : "1px solid rgba(240,96,90,0.2)", marginBottom: 12 }}>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--text-primary)" }}>{question.question}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", marginBottom: 12 }}>
          {question.options.map((o, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{
              padding: "12px 16px", borderRadius: "var(--radius-sm)", fontSize: 13, textAlign: "left", cursor: "pointer", fontFamily: "inherit", lineHeight: 1.4,
              background: selected === i ? "var(--info-soft)" : "var(--surface-panel-muted)",
              border: selected === i ? "2px solid var(--signal-info)" : "1px solid var(--surface-line)",
              color: selected === i ? "var(--signal-info)" : "var(--text-primary)"
            }}>{o}</button>
          ))}
        </div>
        <button onClick={attack} disabled={selected === null} style={{
          width: "100%", padding: "13px", background: selected !== null ? "var(--gradient-danger)" : "var(--text-muted)",
          border: "none", borderRadius: "var(--radius-md)", color: "white", fontSize: 15, fontWeight: 700,
          cursor: selected !== null ? "pointer" : "not-allowed", opacity: selected !== null ? 1 : 0.5, fontFamily: "var(--font-mono)"
        }}>{"\u2694\uFE0F"} ATACAR</button>
      </div>
      <div style={{ maxWidth: 300, margin: "16px auto 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
          <span style={{ color: "var(--signal-correct)", fontWeight: 700 }}>Tu HP</span><span style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{hp}/{dragon.playerHp}</span>
        </div>
        <div style={{ height: 10, background: "var(--surface-line)", borderRadius: 5, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(hp / dragon.playerHp) * 100}%`, background: "var(--gradient-success)", borderRadius: 5, transition: "width 0.5s" }} />
        </div>
      </div>
    </div>
  );
}
