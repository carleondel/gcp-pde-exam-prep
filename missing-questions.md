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

## Professional Security Operations Engineer (`gcp-psoe`)

Source: [ExamTopics](https://www.examtopics.com/exams/google/professional-security-operations-engineer/view/),
133 questions (last updated there on Sep 30, 2026). Bank dumped on 2026-10-14: **133 of 133
loaded** — 131 confirmed (1–131, every number confirmed by its discussion thread) plus 2
unconfirmed (132–133).

### Not in the bank

None by text: every one of the 133 questions is loaded. Only the numbers of 132 and 133 are guessed
(see below).

### Loaded, but the number is unconfirmed (2)

These carry `sourceNumberConfirmed: false` and show an `Unconfirmed #N` badge in the app.

| Number | Text found on                                                                          | Topic                                                   |
| ------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| 132    | itdumpsfree                                                                            | SCCE resource graph (CAI relationships → Spanner Graph) |
| 133    | marks4sure ("October updated release"), certprep, utt.edu.tt, examcollection, examsvce | YARA-L rule vs MISP intel: cut false positives          |

They are the only two ExamTopics-style texts on the mirrors that match none of 1–131. They were
slotted into the 132–133 gap: 133 is the MISP question because the 143-item vendor bank appends
it at the end (#142) and an October 2026 release carries it; 132 sits earlier in that bank (#96).
The real numbers could be swapped.

Why there is no thread for them:

- A full crawl of the Google discussions forum (181 pages, Oct 2026) listed only 68 threads for this
  exam. The other 63 of 1–131 never show up in the forum list (almost all have no comments); they
  were found by probing thread ids with the full slug.
- Probing 304 candidate ids (609 requests) inside and around every post-Nov 2025 Google batch found
  nothing for 132 or 133, and per-number searches return nothing.
- The ExamTopics list pages that hold them in order (`view/14/`) are login-gated. ITExams and
  ExamIce keep ExamTopics' numbering (133 questions) but gate content; the free mirrors carry the
  texts in their own scrambled order.

### Caveats

- Thread ids (pages only load with the full slug
  `https://www.examtopics.com/discussions/google/view/<id>-exam-professional-security-operations-engineer-topic-1-question-<n>-discussion/`):
  1 = 315252, 2 = 315346, 4 = 315222, 83 = 315347, 131 = 315687; every other number from 3 to 130
  sits in the Nov 10, 2025 batch 316043–316169, with ids in no particular question order.
- 92 of 131 have no comments. ExamTopics' own "Suggested Answer" is login-gated past page 1; it was
  compared for 1–10 and matched the bank every time. All other answers were decided against
  current docs, using the comment vote as a signal.
- 15 conflicts with the community vote; an independent review by Gemini agreed on 13 and led to
  changing 97 (A → C, per Google's alert-suppression guidance). 4 was kept on A after the same
  review. 28, 49, 52, 97, 98, 125 and 131 go against or break a tie in the community vote
  (`resolvedBy: devin-2026-10`).
- 113 needs its YARA-L rule screenshot, which ships under `public/question-images/gcp-psoe/`.

### How to close the gap

- A logged-in ExamTopics account that can open `view/14/` (or an ITExams/ExamIce account): match
  132–133 by text, then drop `sourceNumberConfirmed`/`sourceNumberNote` (or swap the two numbers if
  needed).
- Or wait until someone comments on them: the threads then appear in the discussions forum.

## Professional Cloud Developer (`gcp-pcd`)

Source: [ExamTopics](https://www.examtopics.com/exams/google/professional-cloud-developer/view/),
379 questions (checked Oct 14, 2026). Bank dumped on 2026-10-14: **378 of 379 loaded** (1–379
except 357, every number confirmed by its discussion thread).

### Not in the bank (1)

357

No text for it was found on ExamTopics or any other public source:

- It has no discussion thread. A full crawl of the Google discussions forum (181 pages, Oct 2026)
  and per-number searches (`Examtopics Professional Cloud Developer: Professional Cloud Developer
question 357 Discussions` and variations) only return its neighbours.
- Probing thread ids with the full slug (about 450 page loads through a real browser) found
  nothing in: 306429, 306436, 306438, 306439, 306443, 306446–306700, 336150–336200,
  308790–308830, 157290–157400 and 303200–303400.
- The ExamTopics list page that holds it in order (`view/36/`) is login-gated.

### Loaded, but the number is unconfirmed

None. Every question was fetched from its own discussion page, whose title and slug carry the
number.

### Caveats

- 17 questions have no comments, so the forum never lists them: 323, 325, 334, 335, 336, 338, 341,
  343, 344, 345, 346, 350, 355, 356, 368, 375 and 378. 336, 338, 341, 343 and 344 were found by
  probing thread ids: the Jul 15, 2025 batch uses 306428–306445 (334=306428, 335=306430,
  336=306431, 338=306432, 343=306433, 344=306434, 345=306435, 346=306437, 350=306440,
  352=306441, 356=306442, 359=306444, 360=306445), and 341=306683. Other recent ids:
  337=157312, 339=157313, 340=157334, 342=303351, 347=303237, 348=157356, 355=336186,
  358=336176, 362=308808, 366=308815.
- ExamTopics' own "Suggested Answer" is login-gated, so it was never compared. Every answer was
  decided against current docs, using the weighted comment vote as a signal; 104 carry
  `resolvedBy: devin-2026-10` (split vote, no vote, or overriding the majority).
- 97 conflicts with the community vote. An independent review by Gemini of the 139 disputed or
  unvoted questions agreed on 132 and led to changing 30, 245, 321, 342, 347, 348 and 369; 55,
  178, 229 and 335 were kept after the same review.
- HipLocal case study: 19 questions (43–50, 80–83, 167–169, 186–189) embedded the full case text in
  the stem. It was stripped into `case-studies.js` as a retired case (it is not in the current
  exam guide) and the questions reference it through `caseStudy: "hiplocal"`.
- Missing exhibits: 4, 12, 20, 28, 53, 62, 75, 98, 100 and 123 show an image on ExamTopics that
  is broken at the source; the stem keeps a `(see exhibit)` marker. All are answerable from the
  text and the thread, and 4, 12, 28, 53, 62, 98 and 100 carry a `legacyNote` saying so. 10
  questions ship their diagram under `public/question-images/gcp-pcd/` (155, 182, 209, 236,
  248, 262, 279, 317, 326 and 368).

### How to close the gap

- A logged-in ExamTopics account that can open `view/36/`: paste the page and add 357 with the
  same per-question review.
- Or wait until someone comments on it: the thread then appears in the discussions forum.
  Discussion pages only load with the full slug:
  `https://www.examtopics.com/discussions/google/view/<id>-exam-professional-cloud-developer-topic-1-question-<n>-discussion/`.

## Professional Cloud Database Engineer (`gcp-pcde`)

Source: [ExamTopics](https://www.examtopics.com/exams/google/professional-cloud-database-engineer/view/),
197 questions (last updated there on Oct 1, 2026). Bank dumped on 2026-10-14: **187 of 197
loaded**: 180 confirmed (1–181 except 180, every number confirmed by its discussion thread) plus 7
unconfirmed (182–188).

### Not in the bank (10)

180, 189, 190, 191, 192, 193, 194, 195, 196, 197

No text for them was found on ExamTopics or any other public source:

- They have no discussion thread. Per-number searches
  (`Examtopics Professional Cloud Database Engineer question <n> Discussions` and variations) only
  return their neighbours.
- Probing thread ids with the full slug (about 2,570 requests, Oct 14–15, 2026) found nothing:
  for 180, 366170–366220 and 366425–366453; for 182–197, 366185–366197, 366425–366433, and
  every 4th id in 430301–430429 and 430454–430885.
- The ExamTopics list pages that hold them in order (`view/18/` to `view/20/`) are login-gated.
- A harvest of 17 mirror sites (342 items) left only 7 texts that match none of 1–181; they are
  loaded as 182–188 (below). So the 10 numbers above have no text anywhere public, and one of
  182–188 may really be 180.

### Loaded, but the number is unconfirmed (7)

These carry `sourceNumberConfirmed: false` and show an `Unconfirmed #N` badge in the app.

| Number | Text found on           | Topic                                                    |
| ------ | ----------------------- | -------------------------------------------------------- |
| 182    | utt                     | AlloyDB backups for RTO 4 h / RPO 6 h / 7-day retention  |
| 183    | utt (3 options only)    | Lowest-latency connection to Memorystore for Redis       |
| 184    | examsrev, passleadervce | "HelioBank": Cloud SQL with regional CMEK + required TLS |
| 185    | vceeng                  | "mcnz.com": rightsizing an oversized Cloud SQL instance  |
| 186    | vceeng                  | Global Bigtable: clusters per continent + routing        |
| 187    | vceeng (OCR-cleaned)    | Bigtable IoT hotspotting: salting + autoscaling          |
| 188    | vceeng                  | Firestore cost: trim unused indexes                      |

The mirrors list them in their own scrambled order next to old questions (17, 35, 42, 79, 121), so
the order gives no clue to the real number. They were slotted into the gap in the order the
mirrors list them and are assumed to be among the newest (182–197). 184 and 185 use made-up company
names (HelioBank, mcnz.com) typical of third-party practice banks, so they may not be ExamTopics
questions at all.

### Caveats

- Thread ids (pages only load with the full slug
  `https://www.examtopics.com/discussions/google/view/<id>-exam-professional-cloud-database-engineer-topic-1-question-<n>-discussion/`):
  1–120 sit in 92020–92908; 121–132 in 103698–107785; 133–150 in 303577–304231;
  151–173 in 308760–308782; 174–181 in 366193–366444 (174 = 366194, 175 = 366435,
  176 = 366195, 177 = 366444, 178 = 366196, 179 = 366197, 181 = 366193). 174, 176 and 179 never
  show up in the forum list; they were found by probing ids next to the rest of that batch.
- 9 confirmed questions have no comments: 163, 169, 170, 174, 175, 176, 177, 179 and 181. The 7
  unconfirmed ones have no discussion either.
- ExamTopics' own "Suggested Answer" is login-gated past page 1; it was compared for 1–10 and
  matched the bank every time. All other answers were decided against current docs, using the
  weighted comment vote as a signal.
- 25 conflicts with the community vote (or the mirror answer). An independent review by Gemini
  of the 25 conflicts plus the 5 other unconfirmed questions agreed on 22 and led to changing 147
  (C → B, `resolvedBy: gemini-2026-10`); 6, 24, 44, 53, 55, 92 and 96 were kept after the same
  review. 18, 21, 22, 53, 133, 153, 186 and 188 go against or break a tie in the community or
  mirror vote (`resolvedBy: devin-2026-10`).
- 6 questions carry a `legacyNote` for a product rename or change since they were written: 45, 78,
  83, 98, 103 and 135.

### How to close the gap

- A logged-in ExamTopics account that can open `view/18/` to `view/20/`: match 182–188 by text,
  fix their numbers (then drop `sourceNumberConfirmed`/`sourceNumberNote`), and add whatever is
  left of 180 and 182–197 with the same per-question review.
- Or wait until someone comments on them: the threads then appear in the discussions forum.
