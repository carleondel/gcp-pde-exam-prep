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

## Professional Cloud Security Engineer (`gcp-pcse`)

Source: [ExamTopics](https://www.examtopics.com/exams/google/professional-cloud-security-engineer/view/),
376 questions (last updated there on Oct 1, 2026). Bank dumped on 2026-10-14: **361 of 376 loaded**
(1–361, no gaps, every number confirmed by its discussion thread).

### Not in the bank (15)

362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376

They are the newest batch and no text for them was found anywhere public:

- ExamTopics has no discussion thread for them. A full crawl of the Google discussions forum (181
  pages, Oct 2026) and a re-crawl of the newest 5 pages on Oct 14 end at 361 (the Dec 27, 2025
  batch, thread ids 381869–381882). Per-number searches for 362–376 return nothing either.
- The ExamTopics list pages that hold them in order (`view/37/` and `view/38/`) are login-gated, and
  the Wayback Machine only has captures of `view/1/`–`view/34/`.
- Sites that keep ExamTopics' numbering do not show them without an account: ITExams (lists 376,
  per-question pages need login), SecExams (lists 376, captcha wall), ExamIce (404). CertLibrary is
  still at 361 as of its May 2026 snapshot, so the batch was added between May and late Sep 2026.

### Loaded, but with caveats

- ExamTopics' own "Suggested Answer" is login-gated past page 1, so it was only compared for 1–10.
  All other answers were decided against current docs, using the weighted comment vote as a signal.
- 163: ExamTopics merged options D and E into one; they were split back into five options.

### How to close the gap

- A logged-in ExamTopics account that can open `view/37/` and `view/38/`, or a SecExams/ITExams
  account: paste those pages and add 362–376 with the same per-question review.
- Or wait until someone comments on them: the threads then appear in the discussions forum.
  Discussion pages only load with the full slug:
  `https://www.examtopics.com/discussions/google/view/<id>-exam-professional-cloud-security-engineer-topic-1-question-<n>-discussion/`.

## Professional Cloud DevOps Engineer (`gcp-pcdoe`)

Source: [ExamTopics](https://www.examtopics.com/exams/google/professional-cloud-devops-engineer/view/),
239 questions (checked Oct 14, 2026). Bank dumped on 2026-10-14: **232 of 239 loaded** — 229
confirmed (1–225, 227–230) plus 3 unconfirmed (231–233). Questions 1–196 come from a GitHub cache
of ExamTopics data
([thatonecodes/examtopics-data](https://github.com/thatonecodes/examtopics-data), April 2025
snapshot) with full threads and ExamTopics' answer key; 197–230 come from the live discussion
pages fetched on Oct 14, 2026 — the Suggested Answer is not shown on those pages, so every answer
there was decided against current docs with the comment vote as a signal.

### Not in the bank (7)

226, 234, 235, 236, 237, 238, 239

- They most likely have no discussion comments yet, so they never appear in the forum list — the crawler covered
  pages 1–79 of 181 of the Google forum, which only lists threads with comments and shows the
  newest threads at the front.
- No search-engine hits for any of them, no Wayback captures of DevOps discussion threads (exam
  list pages only captured up to May 2025), and the list pages past page 1 need a captcha/login;
  heavy 429 rate limiting applies.

Thread ids found (to guide future scans; pages only load with the full slug
`https://www.examtopics.com/discussions/google/view/<id>-exam-professional-cloud-devops-engineer-topic-1-question-<n>-discussion/`):
197–201 = 304431–304435 (Jun 3, 2025). Mar 18, 2026 batches: 19:31 → 392418–392428 (202–208
descending from 392428, then 223=392421, 225=392420, 227=392419, 229=392418); 19:46 →
392902–392921 (209=392921, 210=392920, 211=392918, 212=392919, 213=392917, 214=392906,
215=392904, 216=392905, 217=392903, 218=392912, 219=392911, 220=392910, 221=392909,
222=392908, 224=392907, 228=392902); 20:03 → 230=393436. Ids already ruled out: 226 not in
392410–392421 or 392880–392935; 231 not in 392880–392935 or 393362–393510; 392913–392916 are not
226 or 231 (probably other exams).

### Loaded, but the number is unconfirmed (3)

These carry `sourceNumberConfirmed: false` and show an `Unconfirmed #N` badge in the app.

| Number | Text found on (all dated 2026)            | Topic                         |
| ------ | ----------------------------------------- | ----------------------------- |
| 231    | certshero, p2pexams, freecram, testpassed | App Hub forwarding rule       |
| 232    | myexamcollection                          | Cloud Deploy CD for Cloud Run |
| 233    | validtests                                | VPC per department + peering  |

Texts found only on mirror sites dated 2026, slotted into the 226/231–239 gap in the order found;
the real numbers are unknown (could be 226 or 231–239).

### Caveats

- 43 conflicts adjudicated against current docs; a second opinion from Gemini agreed on 35 and led
  to changing 4, 20, 38, 105 and 121.
- Data fixes: 113 (two options merged into one, split back), 119 (ExamTopics shows 118's stem;
  replaced with the real stem quoted in the thread), 163 (options are images on ExamTopics;
  reconstructed from the thread and mirrors), 176 (options C/D are YAML images on ExamTopics and no copy was found anywhere; they were rewritten from the thread's description of the correct answer),
  65 and 74 (garbled characters cleaned).

### How to close the gap

- A logged-in account that can open the list pages holding 226 and 231–239 (`view/23/`–`view/24/`),
  or ITExams/SecExams accounts: paste the list pages and match them by text.
- Or scan thread ids in later 2026 ranges once the rate limit allows.
- When a real number turns up for 231–233, move the question to it, drop
  `sourceNumberConfirmed`/`sourceNumberNote`, and free the slot it was occupying.

## Associate Data Practitioner (`gcp-adp`)

Source: [ExamTopics](https://www.examtopics.com/exams/google/associate-data-practitioner/view/),
103 questions (last updated there on Oct 1, 2026). Bank dumped on 2026-10-14: **101 of 103 loaded**
(1–101, no gaps, every number confirmed by its discussion thread).

### Not in the bank (2)

102, 103

No text for these was found anywhere public:

- ExamTopics has no discussion thread for them. A full crawl of the Google discussions forum (180
  pages, Oct 2026) ends at 101, and per-number searches for 102 and 103 return nothing.
- The newest known batch (99, 100 and 101, Dec 4, 2025) sits at thread ids 323865–323888. Probing
  ids 323850–323960 with the full slug for 102 and 103 returned 404 for every one.
- The ExamTopics list pages that hold them in order (`view/11/`) are login-gated.

### Loaded, but the number is unconfirmed

None. Every question was fetched from its own discussion page, whose title and slug carry the number.

### Caveats

- 90, 92–96, 99 and 100 have no comments, so the forum never lists them and search engines don't
  index them. They were found by probing thread ids with the full slug: the Aug 22, 2025 batch
  (73–98) uses ids 310918–310943, where 90=310942, 92=310937, 93=310940, 94=310938, 95=310925 and
  96=310922; 99=323888, 100=323865 and 101=323874. 89, 97 and 101 have no comments either.
- ExamTopics' own "Suggested Answer" is login-gated past page 1. It was compared for 1–10 (list
  page) and for 15, 16, 23, 24, 27, 29, 30, 34, 54, 56, 65, 97, 98 and 101 (search snippets), and
  matched the bank every time. All other answers were decided against current docs, using the
  comment vote as a signal.
- 16 conflicts with the community vote; an independent review by Gemini confirmed all 16. 59
  overrides the community majority (B → A).
- Data fixes: 1 and 2 have image-only options on ExamTopics (BigQuery SQL); they were transcribed
  as text. 13 needs its pipeline diagram, which ships under `public/question-images/gcp-adp/`.
  Obvious OCR typos (BigOuery, Cloud SGL, Vertex Al…) were corrected in 12 questions.

### How to close the gap

- A logged-in ExamTopics account that can open `view/11/`: paste the page and add 102–103 with the
  same per-question review.
- Or probe thread ids above 323960 for 102 and 103 (likely a later 2026 batch), or wait until
  someone comments and the threads appear in the forum. Discussion pages only load with the full
  slug:
  `https://www.examtopics.com/discussions/google/view/<id>-exam-associate-data-practitioner-topic-1-question-<n>-discussion/`.
