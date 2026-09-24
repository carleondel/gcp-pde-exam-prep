import { C, F, COPY, panel } from "../theme.js";
import { Scene, Rise, Kicker } from "../components/common.jsx";
import { Option, Rationale } from "../scenes/Quiz.jsx";
import { CONTENT_W, safeScene } from "./layout.js";

/**
 * The same question 213 as the landscape film, stacked: question, options,
 * then the rationale sliding in underneath once the answer is graded.
 */
export function Quiz() {
  return (
    <Scene style={{ ...safeScene, paddingTop: 150, paddingBottom: 300 }}>
      <div style={{ width: CONTENT_W + 40 }}>
        <Rise>
          <Kicker color={C.primary400} style={{ fontSize: 24, letterSpacing: 3 }}>
            {COPY.quiz.kicker}
          </Kicker>
        </Rise>
        <Rise delay={6}>
          <div style={{ ...panel, padding: 30, marginTop: 20 }}>
            <div
              style={{
                display: "inline-block",
                fontFamily: F.mono,
                fontSize: 22,
                letterSpacing: 2,
                color: C.primary400,
                background: "rgba(15,191,163,0.10)",
                border: "1px solid rgba(15,191,163,0.3)",
                borderRadius: 999,
                padding: "6px 18px",
              }}
            >
              {COPY.quiz.topic}
            </div>
            <div
              style={{
                fontFamily: F.heading,
                fontWeight: 500,
                fontSize: 33,
                color: C.textPrimary,
                lineHeight: 1.3,
                marginTop: 16,
              }}
            >
              {COPY.quiz.question}
            </div>
            <div style={{ marginTop: 10 }}>
              {COPY.quiz.options.map((o, i) => (
                <Option key={o} text={o} index={i} delay={20 + i * 9} scale={1.12} />
              ))}
            </div>
          </div>
        </Rise>
        <Rationale
          label={COPY.quiz.rationaleLabel}
          text={COPY.quiz.rationale}
          color={C.correct}
          delay={92}
          scale={1.2}
        />
      </div>
    </Scene>
  );
}
