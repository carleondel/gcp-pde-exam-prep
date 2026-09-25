import { useState } from "react";
import {
  canSubmitAnswer,
  evaluateAnswer,
  getCorrectOptionIndexes,
  normalizeSelection,
} from "../../engine/quiz-engine.js";
import { Confetti } from "./Confetti.jsx";

function randomInRange([min, max]) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function BossBattle({ questions, dragon, onComplete, onClose }) {
  const [hp, setHp] = useState(dragon.playerHp);
  const [bossHp, setBossHp] = useState(dragon.hp);
  const [selected, setSelected] = useState([]);
  const [phase, setPhase] = useState("intro");
  const [shaking, setShaking] = useState(false);
  const [turn, setTurn] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [totalDmgDealt, setTotalDmgDealt] = useState(0);
  const [totalDmgTaken, setTotalDmgTaken] = useState(0);
  const [revealed, setRevealed] = useState(null);
  const [lastEvent, setLastEvent] = useState(
    "Answer correctly to strike. If the boss survives, it counterattacks.",
  );

  const enraged = bossHp > 0 && bossHp / dragon.hp < dragon.enrageThreshold;
  const question = questions[qIndex % questions.length];
  const isMulti = Array.isArray(question.correct);
  const selectedIndexes = normalizeSelection(selected);
  const canAttack = canSubmitAnswer(question, selectedIndexes);
  const correctIndexes = getCorrectOptionIndexes(question);
  const neededAnswers = correctIndexes.length;

  const optionStyle = (index) => {
    if (revealed) {
      if (correctIndexes.includes(index))
        return {
          background: "var(--correct-soft)",
          border: "2px solid var(--signal-correct)",
          color: "var(--signal-correct)",
        };
      if (revealed.selectedIndexes.includes(index))
        return {
          background: "var(--wrong-soft)",
          border: "2px solid var(--signal-wrong)",
          color: "var(--signal-wrong)",
        };
      return {
        background: "var(--surface-panel-muted)",
        border: "1px solid var(--surface-line)",
        color: "var(--text-tertiary)",
      };
    }
    return selectedIndexes.includes(index)
      ? {
          background: "var(--info-soft)",
          border: "2px solid var(--signal-info)",
          color: "var(--signal-info)",
        }
      : {
          background: "var(--surface-panel-muted)",
          border: "1px solid var(--surface-line)",
          color: "var(--text-primary)",
        };
  };

  const toggleSelected = (index) => {
    if (!isMulti) {
      setSelected([index]);
      return;
    }
    setSelected((current) => {
      const currentSet = new Set(normalizeSelection(current));
      if (currentSet.has(index)) currentSet.delete(index);
      else currentSet.add(index);
      return [...currentSet].sort((a, b) => a - b);
    });
  };

  // The answered question stays on screen, graded, until the player moves on.
  const attack = () => {
    if (!canAttack || revealed) return;
    const { isCorrect } = evaluateAnswer(question, selectedIndexes);
    setShaking(true);
    setTimeout(() => setShaking(false), 500);

    const mult = enraged ? dragon.enrageMultiplier : 1;
    let dealt = 0;
    let taken = 0;
    if (isCorrect) {
      dealt = randomInRange(dragon.dmgRange);
      if (bossHp - dealt > 0) taken = Math.round(randomInRange(dragon.counterRange) * mult);
    } else {
      taken = Math.round(randomInRange(dragon.wrongDmgRange) * mult);
      setWrongCount((w) => w + 1);
    }
    const newBossHp = Math.max(0, bossHp - dealt);
    const newHp = Math.max(0, hp - taken);

    setLastEvent(
      !isCorrect
        ? `Miss: ${dragon.name} strikes for ${taken}.`
        : newBossHp <= 0
          ? `Hit: ${dealt} damage. Victory.`
          : `Hit: ${dealt} damage. ${dragon.name} counterattacks for ${taken}.`,
    );
    setBossHp(newBossHp);
    setHp(newHp);
    setTotalDmgDealt((d) => d + dealt);
    setTotalDmgTaken((d) => d + taken);
    setTurn((t) => t + 1);

    const over = newBossHp <= 0 || newHp <= 0;
    setRevealed({ isCorrect, selectedIndexes, over });
    if (over) {
      const won = newBossHp <= 0;
      onComplete({
        won,
        dragon,
        turns: turn + 1,
        dmgDealt: totalDmgDealt + dealt,
        dmgTaken: totalDmgTaken + taken,
        flawless: won && wrongCount === 0,
      });
    }
  };

  const nextTurn = () => {
    if (revealed?.over) {
      setPhase("result");
      return;
    }
    setRevealed(null);
    setSelected([]);
    setQIndex((i) => i + 1);
  };

  const won = bossHp <= 0;
  const tierBadge = `Tier ${dragon.tier}`;

  if (phase === "intro")
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--bg-overlay)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <div style={{ textAlign: "center", animation: "bossEntrance 0.8s ease" }}>
          <div style={{ fontSize: 120, marginBottom: 16 }}>{dragon.emoji}</div>
          <h2
            style={{
              color: "var(--signal-wrong)",
              fontSize: 28,
              fontWeight: 900,
              margin: "0 0 4px",
              textShadow: "0 0 20px rgba(240,96,90,0.3)",
              fontFamily: "var(--font-heading)",
            }}
          >
            BOSS BATTLE
          </h2>
          <p
            style={{ color: "var(--accent-300)", fontSize: 18, fontWeight: 800, margin: "0 0 4px" }}
          >
            {dragon.name}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "var(--radius-pill)",
                background: "var(--wrong-soft)",
                color: "var(--signal-wrong)",
                fontSize: 11,
                fontWeight: 800,
                fontFamily: "var(--font-mono)",
              }}
            >
              {tierBadge}
            </span>
            {dragon.topicLabel && (
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--primary-soft)",
                  color: "var(--primary-400)",
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {dragon.topicLabel}
              </span>
            )}
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "var(--radius-pill)",
                background: "var(--surface-panel-muted)",
                color: "var(--text-secondary)",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
              }}
            >
              {dragon.hp} HP
            </span>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: "0 0 24px" }}>
            Hit: {dragon.dmgRange[0]}-{dragon.dmgRange[1]} damage. Counterattack:{" "}
            {dragon.counterRange[0]}-{dragon.counterRange[1]}. Miss: {dragon.wrongDmgRange[0]}-
            {dragon.wrongDmgRange[1]}.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={() => setPhase("fight")}
              style={{
                padding: "14px 48px",
                background: "var(--gradient-danger)",
                border: "none",
                borderRadius: "var(--radius-md)",
                color: "white",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                animation: "pulse 1s infinite",
                fontFamily: "var(--font-mono)",
              }}
            >
              FIGHT
            </button>
            <button
              onClick={onClose}
              style={{
                padding: "14px 28px",
                background: "transparent",
                border: "1px solid var(--surface-line)",
                borderRadius: "var(--radius-md)",
                color: "var(--text-secondary)",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
              }}
            >
              SKIP
            </button>
          </div>
        </div>
      </div>
    );

  if (phase === "result")
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--bg-overlay)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <Confetti active={won} />
        <div style={{ textAlign: "center", maxWidth: 360 }}>
          <div style={{ fontSize: 80, marginBottom: 16 }}>
            {won ? "\uD83C\uDFC6" : "\uD83D\uDC80"}
          </div>
          <h2
            style={{
              color: won ? "var(--accent-300)" : "var(--signal-wrong)",
              fontSize: 28,
              fontWeight: 900,
              margin: "0 0 8px",
              fontFamily: "var(--font-heading)",
            }}
          >
            {won ? "VICTORY" : "DEFEAT"}
          </h2>
          <p
            style={{
              color: "var(--text-primary)",
              fontSize: 15,
              fontWeight: 700,
              margin: "0 0 4px",
            }}
          >
            {dragon.name}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              margin: "12px 0",
              fontSize: 12,
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span>{turn} turns</span>
            <span>{totalDmgDealt} dmg</span>
            <span>{totalDmgTaken} taken</span>
          </div>
          {won && wrongCount === 0 && (
            <div
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-pill)",
                background: "rgba(143,255,106,0.12)",
                color: "var(--highlight)",
                fontSize: 12,
                fontWeight: 800,
                display: "inline-block",
                marginBottom: 8,
                fontFamily: "var(--font-mono)",
              }}
            >
              FLAWLESS
            </div>
          )}
          <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: "0 0 20px" }}>
            {won ? `+${dragon.xpReward} XP reward` : "The dragon defeated you. Try again."}
          </p>
          <button
            onClick={onClose}
            style={{
              padding: "12px 40px",
              background: "var(--gradient-practice)",
              border: "none",
              borderRadius: "var(--radius-md)",
              color: "white",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(180deg, rgba(33, 10, 10, 0.96), rgba(15, 21, 32, 1))",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
        padding: 20,
        overflow: "auto",
        ...(enraged ? { boxShadow: "inset 0 0 60px rgba(240,96,90,0.25)" } : {}),
      }}
    >
      <button
        onClick={onClose}
        title="Skip battle"
        aria-label="Skip battle"
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          width: 32,
          height: 32,
          borderRadius: "var(--radius-pill)",
          background: "var(--surface-panel-muted)",
          border: "1px solid var(--surface-line)",
          color: "var(--text-secondary)",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
          lineHeight: 1,
          fontFamily: "var(--font-mono)",
        }}
      >
        {"\u00D7"}
      </button>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div
          style={{
            fontSize: 64,
            animation: shaking
              ? "shake 0.5s"
              : enraged
                ? "shake 0.3s infinite"
                : "bounce 2s infinite",
          }}
        >
          {dragon.emoji}
        </div>
        {enraged && (
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              color: "var(--signal-wrong)",
              textTransform: "uppercase",
              letterSpacing: 2,
              fontFamily: "var(--font-mono)",
              marginTop: 4,
              animation: "pulse 0.8s infinite",
            }}
          >
            ENRAGED
          </div>
        )}
        <div style={{ maxWidth: 300, margin: "8px auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              marginBottom: 3,
            }}
          >
            <span style={{ color: "var(--signal-wrong)", fontWeight: 700 }}>{dragon.name}</span>
            <span style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
              {bossHp}/{dragon.hp} HP
            </span>
          </div>
          <div
            style={{
              height: 10,
              background: "var(--surface-line)",
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(bossHp / dragon.hp) * 100}%`,
                background: enraged ? "var(--signal-wrong)" : "var(--gradient-danger)",
                borderRadius: 5,
                transition: "width 0.5s",
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto", width: "100%", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "var(--radius-pill)",
              background: "var(--surface-panel-muted)",
              color: "var(--text-tertiary)",
              fontSize: 10,
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
            }}
          >
            Turn {revealed ? turn : turn + 1}
          </span>
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "var(--radius-pill)",
              background: "var(--primary-soft)",
              color: "var(--primary-400)",
              fontSize: 10,
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
            }}
          >
            {question.topic}
          </span>
          {isMulti && (
            <span
              style={{
                padding: "4px 8px",
                borderRadius: "var(--radius-pill)",
                background: "var(--info-soft)",
                color: "var(--signal-info)",
                fontSize: 10,
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
              }}
            >
              {neededAnswers} answers
            </span>
          )}
        </div>
        <div
          style={{
            background: "var(--gradient-panel)",
            borderRadius: "var(--radius-md)",
            padding: 18,
            border: enraged ? "1px solid rgba(240,96,90,0.4)" : "1px solid rgba(240,96,90,0.2)",
            marginBottom: 12,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--text-primary)",
              whiteSpace: "pre-line",
            }}
          >
            {question.question}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-sm)",
            marginBottom: 12,
          }}
        >
          {question.options.map((o, i) => (
            <button
              key={i}
              onClick={() => toggleSelected(i)}
              disabled={Boolean(revealed)}
              style={{
                padding: "12px 16px",
                borderRadius: "var(--radius-sm)",
                fontSize: 13,
                textAlign: "left",
                cursor: revealed ? "default" : "pointer",
                fontFamily: "inherit",
                lineHeight: 1.4,
                ...optionStyle(i),
              }}
            >
              {o}
            </button>
          ))}
        </div>
        <div
          role="status"
          style={{
            minHeight: 34,
            marginBottom: 10,
            padding: "8px 10px",
            borderRadius: "var(--radius-sm)",
            background: "rgba(15, 21, 32, 0.55)",
            color: "var(--text-secondary)",
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {lastEvent}
        </div>
        {revealed && (
          <div
            style={{
              marginBottom: 10,
              padding: "10px 12px",
              borderRadius: "var(--radius-sm)",
              background: revealed.isCorrect ? "var(--correct-soft)" : "var(--wrong-soft)",
              border: `1px solid ${revealed.isCorrect ? "var(--signal-correct)" : "var(--signal-wrong)"}`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: revealed.isCorrect ? "var(--signal-correct)" : "var(--signal-wrong)",
                marginBottom: question.explanation ? 4 : 0,
              }}
            >
              {revealed.isCorrect ? "Correct" : "Incorrect"}
            </div>
            {question.explanation && (
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "var(--text-secondary)",
                }}
              >
                {question.explanation}
              </p>
            )}
          </div>
        )}
        {revealed ? (
          <button
            onClick={nextTurn}
            style={{
              width: "100%",
              padding: "13px",
              background: "var(--gradient-practice)",
              border: "none",
              borderRadius: "var(--radius-md)",
              color: "white",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
            }}
          >
            {revealed.over ? "SEE RESULT" : "NEXT TURN"}
          </button>
        ) : (
          <button
            onClick={attack}
            disabled={!canAttack}
            style={{
              width: "100%",
              padding: "13px",
              background: canAttack ? "var(--gradient-danger)" : "var(--text-muted)",
              border: "none",
              borderRadius: "var(--radius-md)",
              color: "white",
              fontSize: 15,
              fontWeight: 700,
              cursor: canAttack ? "pointer" : "not-allowed",
              opacity: canAttack ? 1 : 0.5,
              fontFamily: "var(--font-mono)",
            }}
          >
            {"\u2694\uFE0F"} {canAttack ? "ATTACK" : isMulti ? `PICK ${neededAnswers}` : "ATTACK"}
          </button>
        )}
      </div>
      <div style={{ maxWidth: 300, margin: "16px auto 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            marginBottom: 3,
          }}
        >
          <span style={{ color: "var(--signal-correct)", fontWeight: 700 }}>Your HP</span>
          <span style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
            {hp}/{dragon.playerHp}
          </span>
        </div>
        <div
          style={{
            height: 10,
            background: "var(--surface-line)",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(hp / dragon.playerHp) * 100}%`,
              background: "var(--gradient-success)",
              borderRadius: 5,
              transition: "width 0.5s",
            }}
          />
        </div>
      </div>
    </div>
  );
}
