import { loadFont as loadHeading } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadBody } from "@remotion/google-fonts/IBMPlexSans";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

// Pulled straight from src/styles/tokens.css so the video and the app are
// visibly the same product. If a token changes there, change it here.
export const C = {
  bgDeep: "#0a0e17",
  bgPrimary: "#0f1520",
  bgSecondary: "#151d2e",
  bgTertiary: "#1a2438",
  primary400: "#0fbfa3",
  primary500: "#0d9e87",
  primary600: "#0a7d6b",
  accent300: "#ffb733",
  accent400: "#d4930a",
  correct: "#2dd4a0",
  wrong: "#f0605a",
  warning: "#e6a817",
  info: "#4a9eff",
  textPrimary: "#e8ecf2",
  textSecondary: "#8b95a8",
  textTertiary: "#7b8598",
  textMuted: "#5a6478",
  highlight: "#8fff6a",
  line: "rgba(143, 165, 200, 0.14)",
};

const heading = loadHeading("normal", { weights: ["500", "700"], subsets: ["latin"] });
const body = loadBody("normal", { weights: ["400", "600"], subsets: ["latin"] });
const mono = loadMono("normal", { weights: ["400", "700"], subsets: ["latin"] });

export const F = {
  heading: `${heading.fontFamily}, "Space Grotesk", system-ui, sans-serif`,
  body: `${body.fontFamily}, "IBM Plex Sans", system-ui, sans-serif`,
  mono: `${mono.fontFamily}, "JetBrains Mono", ui-monospace, monospace`,
};

export const panel = {
  background: "linear-gradient(180deg, rgba(26,36,56,0.94), rgba(15,21,32,0.88))",
  border: `1px solid ${C.line}`,
  borderRadius: 20,
  boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
};

// One place for every word in the video. Translate this object and the whole
// film is translated; nothing else hardcodes copy.
export const COPY = {
  hook: { kicker: "~/gcp-pde-exam-prep", l1: "Built to pass one exam.", l2: "Now it runs two." },
  logo: {
    name: "DataForge",
    lockup: "Professional Data Engineer",
    tag: "Local-first prep engine for cloud certifications",
    badges: ["613 questions", "2 certifications", "0 backend"],
  },
  tour: {
    kicker: "THE REAL APP, NOT A MOCKUP",
    shots: [
      {
        src: "shots/home.png",
        title: "One screen that knows what you should do next",
        caption: "Rank and XP, the five exam domains, and the block it suggests you run.",
      },
      {
        src: "shots/daily.png",
        title: "A daily challenge that scores itself",
        caption: "Five questions, per-topic breakdown, and a streak worth keeping.",
      },
    ],
  },
  modes: {
    title: "Four ways to study",
    items: [
      {
        k: "PRACTICE",
        t: "Free practice",
        d: "Any topic, any order, instant feedback.",
        c: "#0fbfa3",
      },
      { k: "MOCK", t: "Timed mock", d: "50 questions, 120 minutes, 70% to pass.", c: "#ffb733" },
      { k: "BLOCKS", t: "Block study", d: "Fixed rounds, tracked lap by lap.", c: "#4a9eff" },
      {
        k: "DAILY",
        t: "Daily challenge",
        d: "One streak you do not want to break.",
        c: "#8fff6a",
      },
    ],
  },
  // Question 213 of the gcp-pde bank, verbatim: text, options, correct index
  // and rationales all come from src/certs/gcp-pde/questions.js. The option
  // strings are stored without their "A. " prefix because the video draws
  // its own letter badges.
  quiz: {
    kicker: "EVERY ANSWER COMES WITH ITS REASONING",
    topic: "Pub/Sub",
    question:
      "You are designing a messaging system with Pub/Sub using a push subscription. You need reliability for temporary downtime, need to store failed messages and retry gradually, and store failed messages after 10 retries. How should you configure the subscription?",
    options: [
      "Increase the acknowledgement deadline to 10 minutes.",
      "Use immediate redelivery as retry policy, configure dead lettering to a different topic with max 10 attempts.",
      "Use exponential backoff as retry policy, configure dead lettering to the same source topic with max 10 attempts.",
      "Use exponential backoff as retry policy, configure dead lettering to a different topic with max 10 attempts.",
    ],
    correct: 3,
    rationaleLabel: "WHY D",
    rationale:
      "To retry gradually and handle temporary downtime without overwhelming the consumer, an exponential backoff retry policy is required. After the maximum number of attempts (10), the failed message should be routed to a separate Dead Letter Topic (DLT) so it doesn't block the main processing queue.",
    wrongLabel: "WHY NOT C",
    wrong:
      "Configuring dead lettering to route back to the same source topic would create an infinite loop of failures.",
  },
  rationales: {
    kicker: "AND THEN THE REST OF IT",
    title: "Every option, argued. Then the thread.",
    caption:
      "A rationale per option — not just the right one — and the community discussion that came with the question.",
    shots: ["shots/rationales.png", "shots/discussion.png"],
  },
  game: {
    title: "Study is a grind. So it plays like a game.",
    rankFrom: "Pipeline Builder",
    rankTo: "Query Master",
    stats: [
      { n: 22, l: "ranks" },
      { n: 26, l: "achievements" },
      { n: 9, l: "boss dragons" },
      { n: 4, l: "power-ups" },
    ],
    rewards: ["Spin wheel", "Scratch card", "Mystery chest", "Boss battle"],
    footnote: "Every reward is skippable. The grind is optional, the study is not.",
  },
  local: {
    title: "Close the tab. Nothing is lost.",
    sub: "localStorage, written on every change — never on exit. No account, no sync, no telemetry.",
    yes: ["Browser", "localStorage"],
    no: ["Sign-up", "Backend", "Tracking"],
  },
  arch: {
    title: "A new certification is a folder.",
    sub: "The engine never imports a cert. Drop in a manifest, register the id, done.",
    tree: [
      { t: "src/certs/", kind: "dir", depth: 0 },
      { t: "gcp-pde/", kind: "dir", depth: 1 },
      { t: "gcp-pca/", kind: "dir", depth: 1 },
      { t: "your-cert/", kind: "new", depth: 1 },
      { t: "manifest.js", kind: "file", depth: 2 },
      { t: "domains.js", kind: "file", depth: 2 },
      { t: "questions.js", kind: "file", depth: 2 },
    ],
  },
  cta: {
    proof: [
      { n: "413", l: "tests, green" },
      { n: "CI", l: "on every push" },
      { n: "PDE", l: "exam passed" },
    ],
    cmds: ["npm install", "npm run dev"],
    url: "http://localhost:5173",
    disclaimer:
      "Independent study tool. Not affiliated with or sponsored by Google LLC. Google Cloud and its logo are used here only as a visual reference to the exam.",
  },
};
