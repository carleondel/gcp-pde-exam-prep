# Status & next steps

Last updated: 2026-08-18.

## Where we are

The original GCP PDE app was refactored into a multi-cert platform.
The PDE exam was passed. A second certification, GCP Professional
Cloud Architect (`gcp-pca`), is fully loaded with 280 questions, and
the in-app cert selector is live.

### Done (most recent first)

- `d9a85ac` add "Dominio Total" as the secret achievement
- `480a7b4` drop the night owl secret achievement
- `acfb2cb` add a secret achievement and a platinum
- `4403847` give achievement badges a readable hover tooltip
- `2660cd0` record gcp-pca as shipped, document the picker
- `ac80943` split the menu into a home view and one view per mode
- `e096659` show when each cert's question bank was last dumped
- `a4767e0` document gcp-pca and the extended question schema
- `554da04` surface case studies and outdated-content warnings
- `0a53a74` add cert picker screen
- `ff56e6a` add gcp-pca cert package with 280 questions
- `c2616e5` ignore raw question dumps
- `60888b0` README, STATUS handover and screenshots
- `c402f8a` decouple engine from cert-specific domains via factory

Note: everything from `c2616e5` up was rewritten once to strip a
co-author trailer, so those SHAs differ from any noted earlier.

The engine and `App.jsx` no longer reference any specific cert. Only
`src/certs/<id>/` folders carry cert-specific data and assets.

### Known shape of the platform

- Active cert resolved from `?cert=<id>` URL param (default `gcp-pde`).
- Storage keys are namespaced per cert id.
- The questions module is code-split into its own chunk; the initial
  bundle is ~80 KB gzip.
- With more than one cert registered and no `?cert=` in the URL, the
  app shows `src/components/CertPicker.jsx`; the header carries a
  "Cambiar" link back to it.
- Each manifest may carry `questionsDumpedAt` ("YYYY-MM-DD"), the date
  the question bank was last dumped from its source. Shown under the
  home title and on each picker card; omitted when absent.
- The menu screen has sub-views driven by `menuView` state: `home`,
  `blocks`, `practice`, `mock`, `progress`. The home view carries the
  next action, three shortcuts, the domain bars and a compact block
  grid; each configurator lives in its own view.

### Achievements

26 achievements in `src/data/gamification.js`, two of them special:

- `domain_master` "Dominio Total" is **secret**: while locked the badge
  shows a question mark and the tooltip only says "Logro oculto". It
  unlocks at `DOMAIN_MASTERY_PERCENT` (80) accuracy in _every_ exam
  domain, so a high average is not enough. The minimum-data floor is
  inherited: `computeDomainStats` leaves `accuracy` null below ten
  attempts, so a domain answered once cannot report 100%.
- `platinum` "Platino" unlocks when every other achievement is done. It
  reads `REGULAR_ACHIEVEMENT_IDS` against the unlocked set rather than
  the stats, so `getAchievementSnapshot` carries `unlocked`.

`applyUnlockedAchievements` iterates to a fixed point. A single pass
would judge the achievement that closes the collection and the platinum
against the same prior state, leaving the platinum to fire on whatever
unrelated update came next. Nothing re-locks, so it settles in three
passes.

Any new achievement must be reachable on **every** registered cert,
because the platinum requires the full set. That is what ruled out
conditions based on `conflict` or `legacyNote` metadata — `gcp-pde` has
1 and 0 of those respectively.

## Done: `gcp-pca`

The cert package is complete and the full question bank is loaded.

- **280 questions**, covering the entire ExamTopics pool that was
  collected (source numbers 1–281; 191 is a duplicate of 195).
- 5 question images in `public/question-images/gcp-pca/`
  (questions 4, 22, 38, 120, 199).
- 18 multi-answer questions, 257 with community discussion.
- 47 questions flagged `conflict: true` where the community disagrees
  with the loaded answer. The 19 substantive ones were adjudicated
  externally and all confirmed the loaded answer (`resolvedBy` field).
- Confidence after adjudication: 263 high, 16 medium, 1 low.

### Case studies

All four case studies from the current exam guide (v6.1) are loaded
**verbatim** from the official Google PDFs, extracted directly from
`services.google.com/fh/files/misc/v6.1_pca_*_case_study_english.pdf`:

| id                         | questions                               |
| -------------------------- | --------------------------------------- |
| `altostrat-media`          | 219–224                                 |
| `cymbal-retail`            | none yet (newer than the question bank) |
| `ehr-healthcare`           | 268–270                                 |
| `knightmotives-automotive` | 225, 227–234                            |

Three case studies from the older blueprint (`helicopter-racing-league`,
`mountkirk-games`, `terramearth`) are registered with `legacy: true` and
no content. No question currently references them; they are kept so that
if an old question is ever added, the UI flags the case study as retired
rather than silently showing nothing.

Note: several AI assistants still report the _old_ four case studies
(Mountkirk Games, TerramEarth, Helicopter Racing League, EHR Healthcare)
as current. That is wrong — verified against the official exam guide,
which redirects to the v6.1 PDF listing the four above.

### Outdated content is flagged in the UI

36 questions carry a `legacyNote`, rendered as a warning banner above the
question. These cover renamed products (Stackdriver, preemptible VMs,
Datastore), deprecated tooling (kubemci, Deployment Manager), changed CLI
commands, capabilities that have since shipped (Pub/Sub ordering keys,
global snapshots, Cloud SQL for SQL Server HA), and one item (190) that
is simply broken.

### Remaining content items

- [ ] Confirm the PCA pass mark. `passPercent: 70` is the community
      estimate; Google does not publish the real cut score.
- [ ] The question bank predates Cymbal Retail, so no question exercises
      that case study yet.

### Notes on the exam blueprint

The current official Standard Exam Guide uses weights
**25 / 17.5 / 17.5 / 15 / 12.5 / 12.5** and the case studies
Altostrat Media, Cymbal Retail, EHR Healthcare and KnightMotives
Automotive. An older blueprint (24 / 15 / 18 / 18 / 11 / 14, with
Mountkirk Games / TerramEarth / Helicopter Racing League) still appears
on some translated Google pages — `domains.js` uses the current one.

Question pool by domain: D1 47, D2 93, D3 43, D4 36, D5 15, D6 46.
D2 is over-represented and D5 thin, but every domain has enough
questions to fill its share of a 50-question mock.

## Next cert: `dbt-aeng` (dbt Analytics Engineering Certification)

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

### 3. Build the cert package

Follow what `src/certs/gcp-pca/` does: `manifest.js`, `domains.js`,
`questions.js`, `topics.js`, `assets/logo.svg`, then register the id
in [src/certs/index.js](src/certs/index.js). The selector picks it up
automatically.

## Other open items (lower priority)

- [ ] Capture a boss-battle screenshot and uncomment the reference in
      [README.md](README.md). Trigger a battle from the menu, save it
      to `docs/screenshots/boss-battle.png`.
- [ ] Split `src/App.jsx` into per-screen components
      (`PracticeView`, `MockView`, `BlockView`, `BossView`,
      `ResultView`). The file is ~2.9k lines, hardest single
      maintainability hit. The `menuView` split already draws the
      seams inside the menu screen — the sections are now contiguous
      and independent, so extracting them is mostly cut-and-paste.
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

1. ~~GCP Professional Cloud Architect (`gcp-pca`)~~ — done
2. dbt Analytics Engineering Certification Exam (`dbt-aeng`)
3. GCP Professional Cloud Database Engineer (`gcp-pcde`)
