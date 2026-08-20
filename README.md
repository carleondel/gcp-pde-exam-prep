# Exam Prep

Local-first study app for IT certifications. Practice mode, timed mocks,
block-by-block study, daily challenge, and a small gamification layer
(XP, ranks, achievements, boss battles, mystery chests).

Originally built to prepare for the **Google Cloud Professional Data
Engineer (PDE)** exam, then refactored into a multi-cert architecture.
It now ships two certifications behind the same engine, with an in-app
selector to switch between them; progress is tracked separately for
each.

> Independent study tool, not affiliated with or sponsored by any
> certification authority. Brand names and logos are used solely as
> visual references.

## Status

| Cert | Questions | Domains | Bank dumped | State |
| --- | --- | --- | --- | --- |
| `gcp-pde` — Professional Data Engineer | 333 | 5 | 2026-04-30 | Complete; used for a successful exam attempt |
| `gcp-pca` — Professional Cloud Architect | 280 | 6 | 2026-08-17 | Complete; 4 official case studies, 36 questions flagged as outdated |
| `dbt-aeng` — dbt Analytics Engineering | — | — | — | Planned, paused — needs a question pool |

See [STATUS.md](STATUS.md) for the detail on each and for what is
needed to bring `dbt-aeng` online.

![Home](docs/screenshots/home.png)

![Question with answer feedback](docs/screenshots/discussion_1.png)

![Per-option rationale](docs/screenshots/discussion_2.png)

![Community discussion](docs/screenshots/discussion_3.png)

![Daily challenge results](docs/screenshots/daily-challenge.png)

<!-- TODO: ![Boss battle](docs/screenshots/boss-battle.png) — pending: trigger a dragon battle and capture screenshot -->

## Stack

- React 18 + Vite
- No router, no state library, no CSS framework — `localStorage` for
  persistence
- Optional Docker deployment behind nginx

## Running the app

Three ways to run it, and they are not interchangeable — see the
warning about saved progress below.

### Development (recommended for day-to-day study)

```bash
npm install
npm run dev          # http://localhost:5173
```

Vite dev server with hot module replacement: edits appear without a
reload and without losing what is on screen. Modules are served
unbundled, so startup is near-instant. This is what to use both for
working on the app and for studying with it, since it is the only mode
where fixing a typo in a question is immediate.

### Production preview

```bash
npm run build        # bundles into dist/
npm run preview      # http://localhost:4173
```

Serves the real production bundle: minified, tree-shaken, with the
question banks split into their own lazy-loaded chunk. Use it to check
what actually ships — bundle size, chunking, and anything that behaves
differently once minified. No hot reload; every change needs a rebuild.

### Docker

```bash
docker compose up    # http://localhost:8080
```

Builds inside `node:20-alpine` and serves `dist/` from nginx. Needs no
Node toolchain on the host and always builds from a clean `npm ci`, so
it is the closest thing to a deployment and the way to run the app on a
machine where you would rather not install anything. Slowest loop:
every change means rebuilding the image.

### Which one to use

**`npm run dev`.** It is the fastest loop and the only one that reloads
as you edit. Reach for `preview` before publishing something, and for
Docker when you want a disposable, host-independent run.

> **Saved progress does not carry across these modes.** Progress lives
> in `localStorage`, which browsers scope by origin — protocol, host
> *and port*. `localhost:5173`, `localhost:4173` and `localhost:8080`
> are three different origins, so each keeps its own XP, achievements
> and block history. Pick one and stay on it, or expect to start over.

### Where progress is stored

`localStorage`, under keys namespaced per cert:

| Key | Contents |
| --- | --- |
| `<certId>.progress.v2` | XP, achievements, stats, bookmarks, wrong answers, topic history, block progress, daily streak, mock history |
| `<certId>.activeMock.v2` | A mock left in progress |
| `<certId>.activeBlockSession.v1` | A block left in progress |
| `<certId>.practicePrefs.v1` | Source, order and question count |
| `<certId>.blockPrefs.v1` | Block size and selection |

Progress is written on every change, not on exit, so closing the tab
or the browser loses nothing. It survives restarts and rebuilds. It
does **not** survive clearing site data, and it is not shared across
browsers, devices, or private windows. There is no export yet.

## Selecting a certification

With more than one cert registered, opening the app without a `cert`
URL parameter shows the picker (`src/components/CertPicker.jsx`); the
header then carries a "Cambiar" link back to it. Picking a cert sets
the parameter and reloads, so the active manifest and the namespaced
storage keys resolve once at boot.

You can also link straight to one, skipping the picker:

```
http://localhost:5173/?cert=gcp-pca
```

An unknown or missing id falls back to the picker rather than to a
default the user did not choose. With a single cert registered, the
picker is skipped entirely.

## Architecture

```
src/
  App.jsx                 # main UI (single component, ~2.7k lines)
  main.jsx
  engine/                 # cert-agnostic logic
    quiz-engine.js          practice / mock / weak-topic / scoring
    block-study.js          block catalog and mastery
    session-manager.js      mock and block session lifecycle
    storage.js              createStorage(certId) factory, localStorage
    domain-helpers.js       createDomainHelpers({ topicMap, examDomains })
    format.js               shared display formatting
  data/
    gamification.js         XP curve, ranks, achievements, dragons, prizes
  components/
    CertPicker.jsx          # cert selection screen
    rewards/                # SpinWheel, ScratchCard, MysteryChest, BossBattle, Confetti
  certs/
    index.js                # registry, getActiveCert, CERT_LIST, isKnownCertId
    gcp-pde/
      manifest.js             # cert contract (id, name, mock, domains, ...)
      domains.js              # TOPIC_MAP + EXAM_DOMAINS (data only)
      questions.js            # lazy-loaded chunk
      topics.js
      assets/logo.svg
    gcp-pca/
      ...                     # same shape, plus:
      case-studies.js         # official case study briefs, verbatim
  styles/
```

The engine never imports a specific cert. Cert data flows in through
the manifest registered in `src/certs/index.js`. Storage keys are
namespaced per cert id (e.g. `gcp-pde.progress.v2`).

## Adding a new certification

1. Create `src/certs/<cert-id>/` with:
   - `manifest.js` exporting an object with at least:
     `id`, `name`, `short`, `tagline`, `brand`, `logoPath`,
     `disclaimer`, `passPercent`, `mock: { count, durationSec }`,
     `topicMap`, `examDomains`, `loadQuestions: () => import("./questions.js")`.

     Optional: `questionsDumpedAt` (`"YYYY-MM-DD"`, when the question
     bank was last dumped from its source — shown under the title and
     in the picker) and `caseStudies` (keyed briefs that questions
     reference through their `caseStudy` field).
   - `domains.js` exporting `TOPIC_MAP` and `EXAM_DOMAINS` (data only).
   - `questions.js` exporting `QUESTIONS` (array of items with the
     schema below).
   - `assets/logo.svg`.
2. Register the manifest in [src/certs/index.js](src/certs/index.js).
3. Open `http://localhost:5173/?cert=<cert-id>`.

`createDomainHelpers({ topicMap, examDomains })` and the engine
functions consume the manifest values at runtime — no other file
should need to change.

### Question schema

```js
{
  id: 1,
  topic: "Models",                  // raw label, mapped via TOPIC_MAP
  difficulty: 2,                    // 1 easy, 2 medium, 3 hard
  question: "...",
  options: ["A. ...", "B. ...", "C. ...", "D. ..."],
  correct: 1,                       // 0-based index, or array for multi-answer
  explanation: "...",
  discussion: [],                   // optional [{ user, text }]
  correctRationale: "...",          // optional, why the answer is right
  optionRationales: [],             // optional, one entry per option
  images: [{ url, alt }],           // optional, served from public/
  caseStudy: "ehr-healthcare",      // optional, key into manifest.caseStudies
  legacyNote: "...",                // optional, renders a warning banner
  resolvedBy: "gemini-2026-08",     // optional, who adjudicated a conflict
  sourceQuestionNumber: null,
  isRecent: false
}
```

## License

Personal project, no public license. Question banks are not committed
publicly outside of `gcp-pde` and were sourced from publicly available
practice material.
