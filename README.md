# Exam Prep

Local-first study app for IT certifications. Practice mode, timed mocks,
block-by-block study, daily challenge, and a small gamification layer
(XP, ranks, achievements, boss battles, mystery chests).

**Your progress is saved as you go and is still there when you come
back.** Close the tab, quit the browser, restart the machine — XP,
streaks, block history and a half-finished mock all survive, with no
account and no server involved. See
[where progress is stored](#where-progress-is-stored).

Originally built to prepare for the **Google Cloud Professional Data
Engineer (PDE)** exam, then refactored into a multi-cert architecture.
It now ships two certifications behind the same engine, with an in-app
selector to switch between them; progress is tracked separately for
each.

> Independent study tool, not affiliated with or sponsored by any
> certification authority. Brand names and logos are used solely as
> visual references.

## Demo

https://github.com/user-attachments/assets/d80d82d8-faa9-4ae5-8760-ac9d8e4a126d

<sub>Not seeing a player? Your viewer is not GitHub — the file is at
[docs/dataforge-promo.mp4](docs/dataforge-promo.mp4).</sub>

## Status

| Cert                                     | Questions | Domains | Bank dumped | State                                                               |
| ---------------------------------------- | --------- | ------- | ----------- | ------------------------------------------------------------------- |
| `gcp-pde` — Professional Data Engineer   | 333       | 5       | 2026-04-30  | Complete; used for a successful exam attempt                        |
| `gcp-pca` — Professional Cloud Architect | 280       | 6       | 2026-08-17  | Complete; 4 official case studies, 36 questions flagged as outdated |
| `dbt-aeng` — dbt Analytics Engineering   | —         | —       | —           | Planned, paused — needs a question pool                             |

Adding a cert means adding a folder under `src/certs/` and registering its
id; see the manifest contract further down.

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
> _and port_. `localhost:5173`, `localhost:4173` and `localhost:8080`
> are three different origins, so each keeps its own XP, achievements
> and block history. Pick one and stay on it, or expect to start over.

### Where progress is stored

`localStorage`, under keys namespaced per cert:

| Key                              | Contents                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `<certId>.progress.v2`           | XP, achievements, stats, bookmarks, wrong answers, topic history, block progress, daily streak, mock history |
| `<certId>.activeMock.v2`         | A mock left in progress                                                                                      |
| `<certId>.activeBlockSession.v1` | A block left in progress                                                                                     |
| `<certId>.practicePrefs.v1`      | Source, order and question count                                                                             |
| `<certId>.blockPrefs.v1`         | Block size and selection                                                                                     |

Progress is written on **every change**, never on exit. There is no
save button and nothing to flush: by the time you close the app, the
last answer is already on disk. A mock or a block left half-finished
comes back exactly where you left it.

| Progress survives                                 | Progress does **not** survive          |
| ------------------------------------------------- | -------------------------------------- |
| Closing the tab or quitting the browser           | Clearing site data or browsing history |
| Restarting the machine                            | A different browser                    |
| `npm run build`, a rebuilt Docker image, upgrades | A different device                     |
| Crashes and force-quits                           | Private / incognito windows            |

Rebuilding survives because the data never leaves the browser — but only
if you come back on the same origin, which is the port caveat above. There
is no export yet, so treat the browser profile as the backup.

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

## Contributing questions

Question banks come from publicly available practice material, pulled in
one question at a time by hand. There is no scraper and there will not be
one: the discussion threads are the valuable part and they do not survive
automated extraction intact.

### 1. Find the question

Search for the exact question number rather than browsing the site:

```
Google Cloud Professional Data Engineer question 267 discussions examtopics
```

Two things make this bearable, and skipping either wastes more time than
it saves:

- **Run an ad blocker** (Adblock Plus or equivalent). Without one the page
  is mostly interstitials.
- **Block JavaScript pop-ups** for the domain. The discussion list is what
  you came for and it sits behind a modal that fires on scroll.

### 2. Copy the whole thing

Select the question, every option, the voted answer **and the full
discussion thread**, then copy. The thread is not optional padding — the
disagreements in it are usually what make an ambiguous question tractable,
and they end up in the app under the answer.

### 3. Have a model format it

Paste the raw copy into Gemini Pro with a prompt that asks for the repo's
schema and, crucially, for a written justification **per option** — not
just for the correct one. That per-option reasoning is the thing this app
has that a flashcard deck does not, and it is the part you cannot copy off
the page.

A prompt that works:

> Below is a raw copy-paste of one exam question and its community
> discussion. Return a single JavaScript object literal, nothing else, in
> exactly this shape:
>
> ```js
> {
>   id: <number>,
>   topic: "<one short label, e.g. Pub/Sub, Dataflow, BigQuery, ML/AI>",
>   difficulty: <1 easy | 2 medium | 3 hard>,
>   question: "<the question text, verbatim>",
>   options: ["A. ...", "B. ...", "C. ...", "D. ..."],
>   correct: <0-based index, or an array of indices for multi-answer>,
>   explanation: "<two or three sentences on the underlying concept>",
>   correctRationale: "<why the correct answer is correct>",
>   optionRationales: ["<why A is right or wrong>", "<...B>", "<...C>", "<...D>"],
>   discussion: [{ user: "<handle>", text: "<comment>" }],
>   sourceQuestionNumber: <the number on the source page, or null>,
>   isRecent: false
> }
> ```
>
> Rules: `optionRationales` must have one entry per option, and each one
> must say why that option is right or wrong on its own terms — never
> "see the correct answer". Prefer the answer the discussion converges on
> over the site's voted answer when they disagree, and say so in
> `correctRationale`. Keep `question` and `options` verbatim; everything
> else is yours to write. Escape quotes for a JavaScript string literal.

Read what comes back before trusting it. Models are confidently wrong
about GCP service boundaries, and a wrong rationale is worse than no
rationale — it is a thing you will memorise.

If the discussion flags the question as out of date (a deprecated service,
a renamed product), add a `legacyNote` and the app renders a warning
banner above it. If you resolved a conflict with a model rather than from
the thread, record that in `resolvedBy`, e.g. `"gemini-2026-08"`.

### 4. Images, if the question has one

Some questions are unanswerable without their diagram. Screenshot it,
save it under `public/question-images/`, and reference it from the
question:

```
public/question-images/q259-datastore-indexes.png          # gcp-pde
public/question-images/gcp-pca/q120-three-vpcs.png         # every other cert
```

```js
images: [
  {
    url: "/question-images/q259-datastore-indexes.png",
    alt: "Datastore index config diagrams referenced by options A and B",
  },
],
```

`gcp-pde` sits at the root of that folder for historical reasons; every
other cert gets its own subfolder. Write a real `alt` — describe what the
diagram actually shows, because it is also the fallback when the file is
missing.

### 5. Drop it in and check it

Append the object to the `QUESTIONS` array in
`src/certs/<cert-id>/questions.js`, then:

```bash
npm run dev          # find it in practice mode and read it back
npm test             # the schema is covered by the engine tests
```

`questions.js` is generated data as far as the toolchain is concerned —
both Prettier and ESLint skip it — so formatting is on you. Match the
style of the entries around it.

## License

Personal project, no public license. Question banks are not committed
publicly outside of `gcp-pde` and were sourced from publicly available
practice material.
