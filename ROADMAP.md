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
- ESLint, Prettier and Vitest are configured. The CI baseline has 13 existing
  `exhaustive-deps` warnings and no lint errors.
- Logic is split into `useProgress`, `usePracticeConfig`, `useBlockStudy` and
  `useMockSession`.
- Component and integration tests cover progress, custom practice, blocks,
  mocks, reloads, storage isolation and selected quiz interactions.
- `ResultView` and `ProgressView` have been extracted from `App.jsx`.
- The optional `discussion` question field is handled safely.

## Remaining work for the current refactor

1. Extract the remaining visual sections, one behaviour-neutral commit at a
   time:
   - `MockView`
   - `BlockView`
   - `PracticeView`
   - `HomeView`
   - shared `QuizView`
2. Keep `AppContent` as the coordinator for hooks, navigation, session
   lifecycle and reward overlays. Views must not access localStorage or create
   another source of truth for progress or sessions.
3. Preserve and extend component/integration tests where a new wiring path is
   introduced. Run lint, formatting checks, tests and build after each step.
4. Remove `src/App.jsx` from `.prettierignore` in a formatting-only commit.
5. Review the 13 remaining ESLint dependency warnings individually; do not
   auto-fix dependencies if that could alter when an effect or callback runs.
6. Update `STATUS.md` with the completed screen split and final test count.

## Definition of done

- App views are separated and `AppContent` is substantially smaller and only
  orchestrates them.
- `npm ci`, `npm run lint`, `npm run format:check`, `npm test` and
  `npm run build` pass from a clean install.
- GitHub Actions is green for the final commit.
- Development (`npm run dev`), production preview (`npm run build && npm run
preview`) and Docker (`docker compose up`) have been smoke-tested.

## Later improvements (not required for this refactor)

- Add a small browser-level test suite, for example with Playwright.
- Require pull requests and passing CI before changes reach `main`.
- Build the Docker image in CI.
- Add JSON export/import for local progress backups and portability.
- Review accessibility, responsive behaviour and repeated inline styles.
- Add the next certification package once its content is available.
