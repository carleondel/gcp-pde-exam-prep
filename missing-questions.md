# Missing questions

Internal record of question banks that are not complete: which source questions are not in the app,
which numbers are guessed, and what it would take to close the gap. Add one section per cert.

## Associate Google Workspace Administrator (`gcp-agwa`)

Source: [ExamTopics](https://www.examtopics.com/exams/google/associate-google-workspace-administrator/view/),
108 questions (last updated there on Sep 24, 2026). Bank dumped on 2026-10-14: **88 of 108 loaded**.

### Not in the bank (20)

46, 47, 49, 53, 54, 55, 57, 65, 72, 86, 87, 88, 89, 90, 91, 92, 93, 94, 106, 108

No text for these was found anywhere public:

- ExamTopics has no discussion thread for them. A thread only exists once someone comments, and a
  full crawl of the Google discussions forum (181 pages, Oct 2026) listed just 56 threads for this
  exam, all of them already loaded.
- The ExamTopics list pages that hold every question in order are login-gated after page 1, and
  even with a free account only pages 1–3 (questions 1–30) are viewable.
- Every other site that keeps ExamTopics' numbering stops around question 10–25 without an
  account: SecExams, ITExams, ExamIce and CertLibrary. Free mirrors (Actual4test, FreeCram,
  ExamDiscuss, CertBlaze, PracticeTorrent) carry many of the texts but in their own scrambled
  order. Their unmatched texts are already loaded as 74–85 (see below).
- No Wayback Machine, archive.today or Common Crawl capture exists for list pages 4–11.

### Loaded, but the number is unconfirmed (22)

These carry `sourceNumberConfirmed: false` and show an `Unconfirmed #N` badge in the app.

| Numbers           | How the number was assigned                                                                                                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 31–37, 41, 43, 45 | CertLibrary's list runs exactly 30 behind ExamTopics (verified on 5 questions, 38–44). 41, 43 and 45 sit between verified anchors; 31–37 extend the offset below the first anchor.                                                                                                    |
| 74–85             | Texts found only on mirrors. ExamTopics' first batch (1–73) dates from Mar–May 2025 and none of these appear before Dec 2025, so they were slotted into the later batch's gaps in order of first appearance. 74–80 share one date (Dec 2025), 81 is May 2026, and 82–85 have no date. |

### How to close the gap

- Any account that shows the full ordered list (ExamTopics pages 4–11, or CertLibrary, ExamIce,
  SecExams or ITExams): paste the list pages and match them by text. CertLibrary's page 2 onwards
  covers 46–94 through the +30 offset.
- If a real number turns up for one of 74–85 or 31–45, move the question to its number, drop
  `sourceNumberConfirmed` and `sourceNumberNote`, and free the slot it was occupying.
- ExamTopics discussion pages only load with the full slug:
  `https://www.examtopics.com/discussions/google/view/<id>-exam-associate-google-workspace-administrator-topic-1-question-<n>-discussion/`.
