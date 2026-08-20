# Project roadmap

Last updated: 2026-08-20.

## Current goal: make the application maintainable without changing how it behaves

The app is a React study tool for multiple certifications. Its data and
progress stay local to the browser, namespaced by certification. The current
work separates a previously monolithic `src/App.jsx` into focused hooks and
screen components, with tests protecting persistence and study flows.

## Completed in this refactor

- Power-up labels are consistent in English without changing IDs or behaviour.
- README documents development, preview and Docker modes, including their
  separate browser-storage origins.
- GitHub Actions runs `npm ci`, lint, formatting checks, tests and the
  production build on pushes and pull requests.
- ESLint, Prettier and Vitest are configured, and `src/App.jsx` is no longer
  exempt from formatting.
- ESLint reports **no errors and no warnings**. The thirteen `exhaustive-deps`
  warnings that were the baseline are gone: each was resolved by naming a
  dependency that was genuinely stable, or by memoising a helper so its effect
  could name it. None were suppressed, and none cost a behaviour change.
- Logic is split into four hooks — [useProgress](src/hooks/useProgress.js),
  [usePracticeConfig](src/hooks/usePracticeConfig.js),
  [useBlockStudy](src/hooks/useBlockStudy.js) and
  [useMockSession](src/hooks/useMockSession.js). Storage is injected into all
  four, so none of them knows which certification is active.
- The screens are out of `App.jsx` and into [src/views/](src/views/):
  `HomeView`, `BlockView`, `PracticeView` with its `TopicPicker`, `MockView`,
  `ProgressView`, `ResultView`, `QuizHeader`, `QuizView` and `RewardOverlays`.
- `AppContent` is now a coordinator: hooks, state, effects, callbacks and the
  assembly of those views, with no markup of its own. The file went from 3,051
  lines to about 1,900.
- **413 tests**: engine and UI helpers, the four hooks, view components,
  and four integration suites that mount the real screen — home, practice,
  blocks and mock.
- The optional `discussion` question field is handled safely.
- Two defects were found and fixed while extracting: a question with no
  `discussion` field crashed the practice screen, and the XP badge read a
  session's `history`, which a mock does not have.

## Definition of done

- [x] App views are separated and `AppContent` only orchestrates them.
- [x] `npm ci`, `npm run lint`, `npm run format:check`, `npm test` and
      `npm run build` pass from a clean install.
- [x] GitHub Actions is green for the final commit.
- [x] Development (`npm run dev`) smoke-tested: every source module
      transforms and is served without error.
- [x] Production preview (`npm run build && npm run preview`)
      smoke-tested: the page and all four built assets are served.
- [x] Docker smoke-tested. `docker compose build --no-cache` succeeds and
      the container serves the page, the stylesheet, the app bundle, both
      lazy question chunks and the question images, with a clean nginx log.
      The four assets it serves are byte-identical to a local build of the
      same commit, which is the build the test suite covers. One caveat:
      `docker compose up` binds host port 8080, and on the machine used for
      this check that port was already taken by an unrelated container. The
      mapping itself is right — the bind was attempted and refused — so the
      image was verified on a spare port. Free 8080 first.

## Later improvements (not required for this refactor)

- Add a small browser-level test suite, for example with Playwright.
- Require pull requests and passing CI before changes reach `main`.
- Build the Docker image in CI.
- Add JSON export/import for local progress backups and portability.
- Review accessibility, responsive behaviour and repeated inline styles.
- Add the next certification package once its content is available.
