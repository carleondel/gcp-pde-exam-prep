# Status & next steps

Last updated: 2026-05-04. Project paused.

## Where we are

The original GCP PDE app was refactored into a multi-cert platform.
The PDE exam was passed; the codebase is in a clean state to host
additional certifications, but no second cert has been wired up yet.

### Done (most recent first)

- `c402f8a` decouple engine from cert-specific domains via factory
- `beafa27` lazy-load questions per cert via `manifest.loadQuestions`
- `4e3f38f` drive UI strings, logo and exam config from cert manifest
- `b247122` namespace storage per cert via `createStorage(certId)`
- `3f36b7f` cert manifest and registry with URL param routing
- `0b6398f` move PDE data into `src/certs/gcp-pde/`
- `c9985b6` remove ingestion scripts and source data

The engine and `App.jsx` no longer reference any specific cert. Only
`src/certs/<id>/` folders carry cert-specific data and assets.

### Known shape of the platform

- Active cert resolved from `?cert=<id>` URL param (default `gcp-pde`).
- Storage keys are namespaced per cert id.
- The questions module is code-split into its own chunk; the initial
  bundle is ~80 KB gzip.
- There is no in-app cert selector yet — that will be needed once a
  second cert exists.

## Next: add `dbt-aeng` (dbt Analytics Engineering Certification)

The blocker is content. The architecture is ready.

### 1. Gather exam metadata (fast, public sources)

From dbt Labs' official certification page and study guide:

- [ ] Pass percentage (verify; commonly 65)
- [ ] Number of questions in the real exam (verify; commonly 65)
- [ ] Duration in seconds (verify; commonly 7200)
- [ ] Official sections / domains with their weight % (full list, exact
      names)
- [ ] dbt Labs logo as SVG
- [ ] Disclaimer copy adapted for dbt Labs

### 2. Gather a question pool

Target: 60–80 questions minimum to make the app useful, 150+ ideal.
Any format is fine (JSON, CSV, plain text, PDF, screenshots) — it
gets normalized into the schema documented in `README.md`.

Possible sources:

- dbt Labs official practice exam
- Udemy / Maven / similar prep courses with practice questions
- ExamTopics / Skillcertpro / community dumps
- GitHub repos with study material

### 3. Build the cert package

Once content is in hand:

- [ ] Create `src/certs/dbt-aeng/manifest.js`,
      `domains.js`, `questions.js`, `assets/logo.svg`
- [ ] Register `dbt-aeng` in [src/certs/index.js](src/certs/index.js)
- [ ] Decide and define `TOPIC_MAP` (raw → canonical) and
      `EXAM_DOMAINS` based on the official sections + collected
      question topics
- [ ] Verify `?cert=dbt-aeng` loads, mock distribution matches the
      official weights, and the disclaimer / branding render correctly

### 4. Activate the cert selector (only after step 3 lands)

- [ ] Replace the implicit default in `getActiveCert` with a small
      selector screen that lists every registered manifest when more
      than one cert exists; deep-link with `?cert=<id>`.

## Other open items (lower priority)

- [ ] Capture a boss-battle screenshot and uncomment the reference in
      [README.md](README.md). Trigger a battle from the menu, save it
      to `docs/screenshots/boss-battle.png`.
- [ ] Split `src/App.jsx` into per-screen components
      (`PracticeView`, `MockView`, `BlockView`, `BossView`,
      `ResultView`). The file is ~2.7k lines, hardest single
      maintainability hit.
- [ ] Add ESLint + Prettier.
- [ ] Add Vitest for `engine/` (pure logic — quiz, blocks, sessions,
      storage, domain helpers).
- [ ] Drop the engine's PDE-leaning leftovers (already removed
      `MOCK_DURATION_SEC`, `MOCK_QUESTION_COUNT`, `PASS_PERCENT`;
      audit anything else cert-flavoured).
- [ ] Convert engine modules to TypeScript before they grow further.
- [ ] Optional: introduce a real router (`react-router`) and switch
      `?cert=<id>` to `/<cert-id>` once the cert count justifies it.

## Future certs on the roadmap

In priority order:

1. dbt Analytics Engineering Certification Exam (`dbt-aeng`)
2. GCP Professional Cloud Architect (`gcp-pca`)
3. GCP Professional Cloud Database Engineer (`gcp-pcde`)
