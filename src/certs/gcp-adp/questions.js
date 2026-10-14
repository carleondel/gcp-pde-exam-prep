// Question bank: Google Cloud Associate Data Practitioner.
// Scraped from ExamTopics (bank updated 2026-10-01; 103 listed,
// 101 have a public thread — every number from 1 to 101).

export const QUESTIONS = [
  {
    "id": 101,
    "topic": "Pipelines & Processing",
    "difficulty": 1,
    "question": "You need to design a data pipeline to process large volumes of raw server log data stored in Cloud Storage. The data needs to be cleaned, transformed, and aggregated before being loaded into BigQuery for analysis. The transformation involves complex data manipulation using Spark scripts that your team developed. You need to implement a solution that leverages your team's existing skillset, processes data at scale, and minimizes cost. What should you do?",
    "options": [
      "A. Use Dataform to define the transformations in SQLX.",
      "B. Use Dataflow with a custom template for the transformation logic.",
      "C. Use Dataproc to run the transformations on a cluster.",
      "D. Use Cloud Data Fusion to visually design and manage the pipeline."
    ],
    "correct": 2,
    "explanation": "Dataproc runs the team's existing Spark scripts as-is — minimal cost with ephemeral or serverless clusters.",
    "discussion": [],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 101,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "No community discussion yet. Adjudicated to C — Dataproc reuses the existing Spark scripts (matches the search-snippet suggested answer C).",
    "conceptSummary": "Reusing existing Spark scripts for a large transform pipeline.",
    "correctRationale": "The team already wrote Spark scripts, so Dataproc (ephemeral or serverless) runs them unchanged at scale — skillset reuse plus per-job cost control. Dataform is SQL-only, Dataflow means rewriting in Beam, and Data Fusion's visual designer also means rebuilding rather than reusing.",
    "optionRationales": [
      "Wrong: Dataform expresses transforms in SQLX — the Spark scripts wouldn't be reused.",
      "Wrong: a custom Dataflow template means porting Spark code to Beam.",
      "Correct: Dataproc executes the existing Spark scripts, minimizing rework and cost.",
      "Wrong: Data Fusion is visual pipeline design — again a rebuild of the team's code."
    ]
  },
  {
    "id": 100,
    "topic": "Storage Selection",
    "difficulty": 2,
    "question": "Your organization is building a new application on Google Cloud. Several data files will need to be stored in Cloud Storage. Your organization has approved only two specific cloud regions where these data files can reside. You need to determine a Cloud Storage bucket strategy that includes automated high availability. What should you do?",
    "options": [
      "A. Create a single-region bucket in each of the two regions, and use Storage Transfer Service to replicate the data across the buckets in both regions.",
      "B. Create a multi-region bucket, and upload the files to this bucket.",
      "C. Create a dual-region bucket, and upload the files to this bucket.",
      "D. Create a single-region bucket in each of the two regions, and use the gcloud storage command to replicate the data across the buckets in both regions."
    ],
    "correct": 2,
    "explanation": "A dual-region bucket pins data to the two approved regions and replicates automatically across them.",
    "discussion": [],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 100,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "No community discussion yet. Adjudicated to C: dual-region is the only option combining region pinning with automated replication.",
    "conceptSummary": "Automated HA restricted to two specific regions.",
    "correctRationale": "A dual-region bucket lets you choose exactly the two approved regions and replicates data between them automatically (optionally with turbo replication and automatic failover). Two single-region buckets plus STS or gcloud replication are manual or scheduled rather than automated HA, and a multi-region bucket spans many Google-chosen regions — you can't restrict it to the approved two.",
    "optionRationales": [
      "Wrong: two single-region buckets with STS is a scheduled replication job, not automated HA, and needs app-level failover.",
      "Wrong: a multi-region (US/EU/ASIA) covers regions Google chooses — it can't be limited to the two approved ones.",
      "Correct: a dual-region bucket replicates automatically across exactly the two chosen regions.",
      "Wrong: gcloud replication between single-region buckets is manual — no automated failover."
    ]
  },
  {
    "id": 99,
    "topic": "Pipelines & Processing",
    "difficulty": 2,
    "question": "You are designing a BigQuery data warehouse with a team of experienced SQL developers. You need to recommend a cost-effective, fully-managed, serverless solution to build ELT processes with SQL pipelines. Your solution must include source code control, environment parameterization, and data quality checks. What should you do?",
    "options": [
      "A. Use Cloud Composer to orchestrate and run data workflows.",
      "B. Use Dataproc to run MapReduce jobs for distributed data processing.",
      "C. Use Dataform to build, orchestrate, and monitor the pipelines.",
      "D. Use Cloud Data Fusion to visually design and manage the pipelines."
    ],
    "correct": 2,
    "explanation": "Dataform gives SQL developers serverless ELT pipelines in SQLX with Git control, environment parameterization and assertion quality checks.",
    "discussion": [],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 99,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "No community discussion yet. Adjudicated to C: only Dataform is serverless SQL ELT with VCS and assertions.",
    "conceptSummary": "Serverless SQL ELT with version control and data quality checks.",
    "correctRationale": "Dataform is serverless and costs nothing beyond BigQuery itself: SQL developers write SQLX ELT pipelines with Git source control, environment parameterization via compilation variables and release configurations, assertions for data quality, plus built-in orchestration and monitoring. Composer needs an always-on paid environment and is Python orchestration, Dataproc MapReduce isn't SQL ELT, and Data Fusion is visual with instance cost.",
    "optionRationales": [
      "Wrong: Composer runs an always-on environment (cost) and is Python orchestration, not SQL ELT.",
      "Wrong: Dataproc MapReduce is distributed batch processing, not a SQL pipeline tool.",
      "Correct: Dataform is serverless SQLX ELT with Git, parameterization, assertions and monitoring.",
      "Wrong: Data Fusion is visual-first and bills a running instance."
    ]
  },
  {
    "id": 98,
    "topic": "Machine Learning",
    "difficulty": 1,
    "question": "You manage an ecommerce website that has a diverse range of product. You need to forecast future product demand accurately to ensure that your company has sufficient inventory to meet customer needs and avoid stockouts. Your company's historical sales data is stored in BigQuery table. You need to create a scalable solution that takes into account the seasonality and historical data to predict product demand. What should you do?",
    "options": [
      "A. Use the historical sales data to train and create a BigQueryML time series model. Use the ML.FORECAST function call to output the predictions into a new BigQuery table.",
      "B. Use Colab Enterprise to create a Jupyter notebook. Use the historical sales data to train a custom prediction model in Python.",
      "C. Use the historical sales data to train and create a BigQueryML linear regression model. Use the ML.PREDICT function call to output the predictions into a new BigQuery table.",
      "D. Use the historical sales data to train and create a BigQueryML logistic regression model. Use the ML.PREDICT function call to output the predictions into a new BigQuery table."
    ],
    "correct": 0,
    "explanation": "BigQuery ML's ARIMA_PLUS time-series model captures seasonality, and ML.FORECAST writes the predictions to a table.",
    "discussion": [
      {
        "user": "toasty",
        "text": "Selected Answer: A. Why A is correct\n\nThe problem is about forecasting future product demand using:\n\nHistorical sales data already in BigQuery\n\nSeasonality and historical trends\n\nA scalable solution\n\nBigQuery ML time series models (ARIMA_PLUS) are specifically designed for demand forecasting and automatically:\n\nDetect trends and seasonality\n\nHandle large-scale datasets directly in BigQuery\n\nEliminate the need to ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 98,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for A, matching the snippet's suggested answer A.",
    "conceptSummary": "Demand forecasting with BigQuery ML time series.",
    "correctRationale": "ARIMA_PLUS time-series models natively handle seasonality and holidays and scale per product via time_series_id_col; ML.FORECAST emits future demand into a table — all SQL, no custom code. A notebook-trained custom model is more work, linear regression ignores seasonality without feature engineering, and logistic regression is classification not forecasting.",
    "optionRationales": [
      "Correct: ARIMA_PLUS + ML.FORECAST models seasonality and outputs forecasts per product in SQL.",
      "Wrong: a custom Python model is far more engineering for a problem BQML solves natively.",
      "Wrong: linear regression won't capture temporal seasonality without manual feature work.",
      "Wrong: logistic regression classifies; it doesn't forecast demand."
    ]
  },
  {
    "id": 97,
    "topic": "Looker & Visualization",
    "difficulty": 1,
    "question": "Your data science team needs to collaboratively analyze a 25 TB BigQuery dataset to support the development of a machine learning model. You want to use Colab Enterprise notebooks while ensuring efficient data access and minimizing cost. What should you do?",
    "options": [
      "A. Export the BigQuery dataset to Google Drive. Load the dataset into the Colab Enterprise notebook using Pandas.",
      "B. Use BigQuery magic commands within a Colab Enterprise notebook to query and analyze the data.",
      "C. Create a Dataproc cluster connected to a Colab Enterprise notebook, and use Spark to process the data BigQuery.",
      "D. Copy the BigQuery dataset to the local storage of the Colab Enterprise runtime, and analyze the data using Pandas."
    ],
    "correct": 1,
    "explanation": "%%bigquery magics run the queries in BigQuery and return only the results to the notebook — efficient and cheap at 25 TB.",
    "discussion": [],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 97,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "No community discussion yet. Adjudicated to B — compute in BigQuery, return only results (matches the search-snippet suggested answer B).",
    "conceptSummary": "Querying a large BigQuery dataset from Colab without moving data.",
    "correctRationale": "BigQuery magic commands execute in BigQuery and stream just the result set back, so a 25 TB dataset stays in place and cost stays minimal — collaboration happens by sharing the notebook. Exporting to Drive or local runtime storage can't hold 25 TB, and adding a Dataproc cluster buys nothing for SQL analysis.",
    "optionRationales": [
      "Wrong: 25 TB cannot realistically export to Drive and load into a notebook.",
      "Correct: %%bigquery magics compute in BigQuery and return results only — efficient and cheap.",
      "Wrong: a Dataproc cluster adds cost and complexity for what BigQuery computes natively.",
      "Wrong: local runtime storage can't hold a 25 TB copy."
    ]
  },
  {
    "id": 96,
    "topic": "Machine Learning",
    "difficulty": 1,
    "question": "You want to build a model to predict the likelihood of a customer clicking on an online advertisement. You have historical data in BigQuery that includes features such as user demographic, ad placement, and previous click behavior. After training the model, you want to generate predictions on new data. Which model type should you use in BigQuery ML?",
    "options": [
      "A. Linear regression",
      "B. Matrix factorization",
      "C. Logistic regression",
      "D. K-means clustering"
    ],
    "correct": 2,
    "explanation": "Click-through likelihood is binary classification — logistic regression outputs the probability, and ML.PREDICT scores new data.",
    "discussion": [],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 96,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "No community discussion yet. Adjudicated to C: binary click prediction is logistic regression.",
    "conceptSummary": "Choosing a BigQuery ML model type for click prediction.",
    "correctRationale": "Predicting whether a customer will click is a binary classification problem; logistic regression outputs a click probability and ML.PREDICT scores new rows. Linear regression predicts continuous values, matrix factorization powers recommenders over user-item interactions, and k-means is unsupervised clustering with no label.",
    "optionRationales": [
      "Wrong: linear regression predicts a continuous value, not a click/no-click probability.",
      "Wrong: matrix factorization is for recommendation from user-item interaction matrices.",
      "Correct: logistic regression is the binary-classification model, scored with ML.PREDICT.",
      "Wrong: k-means clusters unlabeled data; there is no probability output for click prediction."
    ]
  },
  {
    "id": 95,
    "topic": "Data Preparation",
    "difficulty": 1,
    "question": "You are working with a small dataset in Cloud Storage that needs to be transformed and loaded into BigQuery for analysis. The transformation involves simple filtering and aggregation operations. You want to use the most efficient and cost-effective data manipulation approach. What should you do?",
    "options": [
      "A. Use Dataproc to create an Apache Hadoop cluster, perform the ETL process using Apache Spark, and load the results into BigQuery.",
      "B. Use BigQuery's SQL capabilities to load the data from Cloud Storage, transform it, and store the results in a new BigQuery table.",
      "C. Create a Cloud Data Fusion instance and visually design an ETL pipeline that reads data from Cloud Storage, transforms it using built-in transformations, and load the result into BigQuery.",
      "D. Use Dataflow to perform the ETL process that reads the data from Cloud Storage, transforms it using Apache Beam, and writes the results to BigQuery."
    ],
    "correct": 1,
    "explanation": "Load the small dataset into BigQuery and transform it with SQL — the cheapest, simplest ELT for filter/aggregate work.",
    "discussion": [],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 95,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "No community discussion yet. Adjudicated to B: in-warehouse SQL is the cheapest path for simple transforms.",
    "conceptSummary": "Small-data transform: ELT inside BigQuery beats building a pipeline.",
    "correctRationale": "For a small dataset with simple filtering and aggregation, loading into BigQuery (via LOAD DATA or an external table) and transforming with SQL into a new table needs no extra infrastructure — the most efficient and cost-effective approach. A Dataproc cluster is overkill, a Data Fusion instance carries significant hourly cost for a trivial job, and a Dataflow/Beam pipeline is more code and worker cost than SQL needs.",
    "optionRationales": [
      "Wrong: a Dataproc Hadoop/Spark cluster is heavy infrastructure for a small simple dataset.",
      "Correct: load with bq/external table and transform in place with SQL — no extra infrastructure at all.",
      "Wrong: a Data Fusion instance bills hourly — disproportionate for a small one-off job.",
      "Wrong: a Dataflow/Beam pipeline is more code and worker cost than the task needs."
    ]
  },
  {
    "id": 94,
    "topic": "Pipelines & Processing",
    "difficulty": 1,
    "question": "You need to create a data pipeline for a new application. Your application will stream data that needs to be enriched and cleaned. Eventually, the data will be used to train machine learning models. You need to determine the appropriate data manipulation methodology and which Google Cloud services to use in this pipeline. What should you choose?",
    "options": [
      "A. ETL; Dataflow -> BigQuery",
      "B. ETL; Cloud Data Fusion -> Cloud Storage",
      "C. ELT; Cloud Storage -> Bigtable",
      "D. ELT; Cloud SQL-> Analytics Hub"
    ],
    "correct": 0,
    "explanation": "Streaming data needing enrichment and cleaning is ETL — transform in Dataflow and land in BigQuery for ML.",
    "discussion": [],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 94,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "No community discussion yet. Adjudicated to A: streaming transform-then-load is ETL via Dataflow into BigQuery.",
    "conceptSummary": "Methodology plus services for a streaming enrichment pipeline feeding ML.",
    "correctRationale": "Because the data must be enriched and cleaned before it's used, the methodology is ETL; Dataflow performs the streaming transform and BigQuery is where BigQuery ML and Vertex AI train on the results. Data Fusion to Cloud Storage leaves the data in files rather than an ML-ready warehouse, Bigtable can't do the transform and isn't an ML training store, and Cloud SQL/Analytics Hub are the wrong roles entirely.",
    "optionRationales": [
      "Correct: ETL — Dataflow enriches and cleans the stream, BigQuery stores it ready for ML training.",
      "Wrong: Data Fusion to Cloud Storage leaves files in object storage, not an analysis/ML-ready warehouse.",
      "Wrong: ELT into Bigtable can't perform the transform and isn't an ML training store.",
      "Wrong: Cloud SQL is OLTP and Analytics Hub is a sharing layer — neither is a pipeline target."
    ]
  },
  {
    "id": 93,
    "topic": "Orchestration & Monitoring",
    "difficulty": 2,
    "question": "Your company is adopting BigQuery as their data warehouse platform. Your team has experienced Python developers. You need to recommend a fully-managed tool to build batch ETL processes that extract data from various source systems, transform the data using a variety of Google services, and load the transformed data into BigQuery. You want this tool to leverage your team's Python skills. What should you do?",
    "options": [
      "A. Use Dataform with assertions.",
      "B. Deploy Cloud Data Fusion and included plugins.",
      "C. Use Cloud Composer with pre-built operators.",
      "D. Use Dataflow and pre-built templates."
    ],
    "correct": 2,
    "explanation": "Cloud Composer is managed Airflow — Python pipelines whose pre-built operators drive many Google services for ETL into BigQuery.",
    "discussion": [],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 93,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "medium",
    "discussionSummary": "No community discussion yet. Adjudicated to C: managed Airflow matches 'Python team + variety of Google services'.",
    "conceptSummary": "Python-based batch ETL orchestration with managed Airflow.",
    "correctRationale": "Cloud Composer is fully managed Apache Airflow: pipelines are Python code, and pre-built operators call a variety of Google services (Dataproc, Dataflow, BigQuery, Cloud Storage, Data Fusion) to extract, transform and load into BigQuery — leveraging the team's Python skills. Dataform is SQLX inside BigQuery, Data Fusion is visual rather than Python-driven, and Dataflow pre-built templates are fixed pipelines needing no Python.",
    "optionRationales": [
      "Wrong: Dataform uses SQLX/JavaScript inside BigQuery, not Python ETL from source systems.",
      "Wrong: Data Fusion's visual plugins don't leverage Python development skills.",
      "Correct: Composer is managed Airflow — Python DAGs and pre-built operators orchestrating many services into BigQuery.",
      "Wrong: pre-built Dataflow templates are fixed pipelines; they neither use Python skills nor orchestrate a variety of services."
    ]
  },
  {
    "id": 92,
    "topic": "Looker & Visualization",
    "difficulty": 2,
    "question": "Your company is setting up an enterprise business intelligence platform. You need to limit data access between many different teams while following the Google-recommended approach. What should you do first?",
    "options": [
      "A. Create a separate Looker Studio report for each team, and share each report with the individual within each team.",
      "B. Create one Looker Studio report with multiple pages, and add each team's data as a separate data source to the report.",
      "C. Create a Looker (Google Cloud core) instance, and create a separate dashboard for each team.",
      "D. Create a Looker (Google Cloud core) instance, and configure different Looker groups for each team."
    ],
    "correct": 3,
    "explanation": "On a Looker (Google Cloud core) instance, per-team Looker groups are the first step to centrally limiting data access.",
    "discussion": [],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 92,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "No community discussion yet. Adjudicated to D: groups on a Looker core instance are the governance primitive.",
    "conceptSummary": "First step to limiting data access between teams in enterprise BI.",
    "correctRationale": "The Google-recommended enterprise approach is a Looker (Google Cloud core) instance with Looker groups per team — folder/content access, model sets and data access (access filters, user attributes) are then granted to groups centrally. Sharing Looker Studio reports per person or per page is not an enterprise governance model, and separate dashboards alone don't restrict data access — permissions must be applied to groups first.",
    "optionRationales": [
      "Wrong: per-person report sharing doesn't scale and is not an enterprise governance model.",
      "Wrong: separate pages per team still share one report's access control — teams see each other's pages.",
      "Wrong: separate dashboards alone don't restrict the underlying data access; groups must be configured first.",
      "Correct: a Looker core instance with per-team Looker groups is the recommended first step to limit access."
    ]
  },
  {
    "id": 91,
    "topic": "Security & Access",
    "difficulty": 2,
    "question": "You are designing an application that will interact with several BigQuery datasets. You need to grant the application's service account permissions that allow it to query and update tables within the datasets, and list all datasets in a project within your application. You want to follow the principle of least privilege. Which pre-defined IAM role(s) should you apply to the service account?",
    "options": [
      "A. roles/bigquery.jobUser and roles/bigquery.dataOwner",
      "B. roles/bigquery.connectionUser and roles/bigquery.dataViewer",
      "C. roles/bigquery.admin",
      "D. roles/bigquery.studioUser and roles/bigquery.filtereddataViewer"
    ],
    "correct": 0,
    "explanation": "bigquery.jobUser runs jobs and bigquery.dataOwner covers update + dataset listing — least privilege among the options.",
    "discussion": [
      {
        "user": "kiappy81",
        "text": "Selected Answer: A. jobuser allow to execute query and job list at project level. data owner allow to update and delete tables futher to list all dataset contents. dataviewer allow to read data so is not correnct option B. admin gives you full control and don't respect least priviledge principle, so option C is wrong. studio user is a role for web interface and doesn't suit with application usecase that needs to ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 91,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for A: the only option covering update plus listing at least privilege.",
    "conceptSummary": "Least-privilege IAM roles for an app's BigQuery service account.",
    "correctRationale": "Query+update needs jobUser (run jobs) plus a data role that includes table update and dataset listing — dataOwner is the only offered role covering both, making A the least-privilege fit. dataViewer can't update, bigquery.admin is far too broad, and studioUser/filteredDataViewer don't permit updates.",
    "optionRationales": [
      "Correct: jobUser + dataOwner cover query, update, and dataset listing at the least privilege offered.",
      "Wrong: dataViewer is read-only — the app must update tables.",
      "Wrong: bigquery.admin grants far more than query/update/list.",
      "Wrong: studioUser/filteredDataViewer don't allow writes."
    ]
  },
  {
    "id": 90,
    "topic": "Data Preparation",
    "difficulty": 1,
    "question": "You are building a batch data pipeline to process 100 GB of structured data from multiple sources for daily reporting. You need to transform and standardize the data prior to loading the data to ensure that it is stored in a single dataset. You want to use a low-code solution that can be easily built and managed. What should you do?",
    "options": [
      "A. Use Cloud Storage to store the data. Use Cloud Run functions to perform data cleaning and transformation, and load the data into BigQuery.",
      "B. Use Cloud Data Fusion to ingest the data, perform data cleaning and transformation, and load the data into Cloud SQL for PostgreSQL.",
      "C. Use Cloud Data Fusion to ingest the data, perform data cleaning and transformation, and load the data into BigQuery.",
      "D. Use Cloud Data Fusion to ingest data and load the data into BigQuery. Use Looker Studio to perform data cleaning and transformation."
    ],
    "correct": 2,
    "explanation": "Cloud Data Fusion is the low-code tool that ingests multiple sources, standardizes before load (ETL), and lands everything in one BigQuery dataset.",
    "discussion": [],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 90,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "No community discussion yet. Adjudicated to C: Data Fusion is the low-code pre-load transform path into BigQuery.",
    "conceptSummary": "Low-code batch ETL into a single BigQuery dataset.",
    "correctRationale": "Cloud Data Fusion gives a visual, low-code pipeline that ingests from multiple sources, cleans and standardizes the data before loading, and writes to BigQuery as the single analytics dataset. Cloud Run functions are custom code rather than low-code, Cloud SQL is OLTP rather than a reporting store for 100 GB daily batches, and Looker Studio only visualizes — it cannot transform data before loading.",
    "optionRationales": [
      "Wrong: Cloud Run functions are custom code, not the low-code approach asked for.",
      "Wrong: Cloud SQL for PostgreSQL is an OLTP engine — the wrong target for daily reporting over 100 GB batches.",
      "Correct: Data Fusion ingests, cleans and transforms before loading into BigQuery, low-code.",
      "Wrong: Looker Studio visualizes data; it cannot clean or transform, and that step would come after loading anyway."
    ]
  },
  {
    "id": 89,
    "topic": "Looker & Visualization",
    "difficulty": 3,
    "question": "Your organization consists of two hundred employees on five different teams. The leadership team is concerned that any employee can move or delete all Looker dashboards saved in the Shared folder. You need to create an easy-to-manage solution that allows the five different teams in your organization to view content in the Shared folder, but only be able to move or delete their team-specific dashboard. What should you do?",
    "options": [
      "A. 1. Create Looker groups representing each of the five different teams, and add users to their corresponding group. 2. Create five subfolders inside the Shared folder. Grant each group the View access level to their corresponding subfolder.",
      "B. 1. Change the access level of the Shared folder to View for the All Users group. 2. Create five subfolders inside the Shared folder. Grant each team member the Manage Access, Edit access level to their corresponding subfolder.",
      "C. 1. Change the access level of the Shared folder to View for the All Users group. 2. Create Looker groups representing each of the five different teams, and add users to their corresponding group. 3. Create five subfolders inside the Shared folder. Grant each group the Manage Access, Edit access level to their corresponding subfolder.",
      "D. 1. Move all team-specific content into the dashboard owner's personal folder. 2. Change the access level of the Shared folder to View for the All Users group. 3. Instruct each user to create content for their team in the user's personal folder."
    ],
    "correct": 2,
    "explanation": "Set Shared to View for everyone, then give each team's group Manage Access, Edit on its own subfolder.",
    "discussion": [],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 89,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "No community discussion yet. Adjudicated to C on Looker folder-permission semantics (groups + subfolder-level Manage Access, Edit).",
    "conceptSummary": "Folder-level Looker permissions so teams edit only their subfolder.",
    "correctRationale": "The three-step design is the clean one: Shared folder → View for All Users (stops everyone moving others' content), Looker groups per team (easy membership management), and Manage Access, Edit on each team's subfolder (their dashboards only). Option A omits the Shared-folder lockdown, option B grants per-member rather than per-group (hard to manage at 200 users), and D abandons the Shared folder.",
    "optionRationales": [
      "Wrong: it never locks the Shared folder, so anyone can still move others' content.",
      "Wrong: granting each member individually is unmanageable at 200 users — groups are needed.",
      "Correct: View on Shared + team groups + Manage Access/Edit per subfolder is easy to manage and correct.",
      "Wrong: personal folders abandon the shared workspace the teams need."
    ]
  },
  {
    "id": 88,
    "topic": "Ingestion & Transfer",
    "difficulty": 2,
    "question": "You have an existing weekly Storage Transfer Service transfer job from Amazon S3 to a Nearline Cloud Storage bucket in Google Cloud. Each week, the job moves a large number of relatively small files. As the number of files to be transferred each week has grown over time, you are at risk of no longer completing the transfer in the allocated time frame. You need to decrease the total transfer time by replacing the process. Your solution should minimize costs where possible. What should you do?",
    "options": [
      "A. Create parallel transfer jobs using include and exclude prefixes.",
      "B. Create a transfer job using the Google Cloud CLI, and specify the Standard storage class with the --custom-storage-class flag.",
      "C. Create a batch Dataflow job that is scheduled weekly to migrate the data from Amazon S3 to Cloud Storage.",
      "D. Create an agent-based transfer job that utilizes multiple transfer agents on Compute Engine instances."
    ],
    "correct": 0,
    "explanation": "Splitting into parallel transfer jobs by include/exclude prefixes scales throughput at no extra cost.",
    "discussion": [
      {
        "user": "AgusSilva",
        "text": "Selected Answer: A. You should create parallel transfer jobs.\n\nThis is the recommended approach for speeding up a Storage Transfer Service job that involves a large number of small files. The performance bottleneck in such cases is typically the per-file operational overhead, not the network bandwidth."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 88,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for A: parallel jobs via include/exclude prefixes.",
    "conceptSummary": "Speeding up an S3→GCS transfer by parallelizing jobs.",
    "correctRationale": "Storage Transfer Service throughput is largely per-job; partitioning the source by prefixes into parallel jobs multiplies workers over the many small files with zero new infrastructure — minimal cost. Changing storage class doesn't speed transfer, a Dataflow rebuild is engineering effort, and agent-based jobs don't apply to an S3 source the same way plus add Compute cost.",
    "optionRationales": [
      "Correct: parallel prefix-partitioned transfer jobs parallelize the small-file workload at no extra cost.",
      "Wrong: a different storage class changes the destination tier, not transfer throughput.",
      "Wrong: a custom Dataflow migration is a rebuild, not a quick fix.",
      "Wrong: agent-based transfers suit POSIX sources; for S3 they add VM cost without the benefit."
    ]
  },
  {
    "id": 87,
    "topic": "Pipelines & Processing",
    "difficulty": 1,
    "question": "You work for a gaming company that collects real-time player activity data. This data is streamed into Pub/Sub and needs to be processed and loaded into BigQuery for analysis. The processing involves filtering, enriching, and aggregating the data before loading it into partitioned BigQuery tables. You need to design a pipeline that ensures low latency and high throughput while following a Google-recommended approach. What should you do?",
    "options": [
      "A. Use Cloud Composer to orchestrate a workflow that reads the data from Pub/Sub, processes the data using a Python script, and writes it to BigQuery.",
      "B. Use Dataflow to create a streaming pipeline that reads the data from Pub/Sub, processes the data, and writes it to BigQuery using the streaming API.",
      "C. Use Dataproc to create an Apache Spark streaming job that reads the data from Pub/Sub, processes the data, and writes it to BigQuery.",
      "D. Use Cloud Run functions to subscribe to the Pub/Sub topic, process the data, and write it to BigQuery using the streaming API."
    ],
    "correct": 1,
    "explanation": "Dataflow streaming is Google's recommended engine for filter/enrich/aggregate into partitioned BigQuery tables.",
    "discussion": [
      {
        "user": "Terralogiq",
        "text": "Selected Answer: B. Dataflow is Google's recommended approach for streaming pipelines like this case, it's built for exactly this pattern (Pub/Sub → transform/enrich/aggregate → BigQuery), autoscales for high throughput, handles windowing/late data natively, and has built-in Pub/Sub-to-BigQuery streaming templates.\n\nA (Composer) is an orchestrator, not a stream processor.\n\nC (Dataproc/Spark) adds cluster management ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 87,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for B: Dataflow streaming is the recommended approach.",
    "conceptSummary": "Low-latency streaming enrichment into BigQuery.",
    "correctRationale": "Dataflow streaming reads Pub/Sub, applies filtering/enrichment/aggregation transforms, and writes via the BigQuery streaming API into partitioned tables — the Google-recommended low-latency, high-throughput path. Composer orchestrates rather than processes, Spark on Dataproc means managing clusters, and Cloud Run functions don't offer the same streaming semantics.",
    "optionRationales": [
      "Wrong: Composer orchestrates workflows; it isn't the streaming transform engine.",
      "Correct: Dataflow streaming does filter/enrich/aggregate and streams into BigQuery.",
      "Wrong: Spark streaming on Dataproc requires cluster management — heavier than needed.",
      "Wrong: Cloud Run functions lack the windowing/aggregation semantics a pipeline needs."
    ]
  },
  {
    "id": 86,
    "topic": "BigQuery & SQL",
    "difficulty": 2,
    "question": "Your organization is conducting analysis on regional sales metrics. Data from each regional sales team is stored as separate tables in BigQuery and updated monthly. You need to create a solution that identifies the top three regions with the highest monthly sales for the next three months. You want the solution to automatically provide up-to-date results. What should you do?",
    "options": [
      "A. Create a BigQuery table that performs a UNION across all of the regional sales tables. Use the ROW_NUMBER() window function to query the new table.",
      "B. Create a BigQuery table that performs a CROSS JOIN across all of the regional sales tables. Use the RANK( ) window function to query the new table.",
      "C. Create a BigQuery materialized view that performs a UNION across all of the regional sales tables. Use the RANK() window function to query the new materialized view.",
      "D. Create a BigQuery materialized view that performs a CROSS JOIN across all of the regional sales tables. Use the ROW_NUMBER() window function to query the new materialized view."
    ],
    "correct": 2,
    "explanation": "A materialized view UNIONing the regional tables stays current, and RANK() picks the top three regions per month.",
    "discussion": [
      {
        "user": "JackMerin",
        "text": "Selected Answer: C. C is the best choice. The UNION operator is the correct choice to vertically append rows from tables with compatible schemas (like sales data)\n\nThe RANK() or DENSE_RANK() window function is the standard SQL method for assigning a rank based on a sorted value (in this case, sales amount). The Materialized View is the ideal solution for auto update. A Materialized View pre-computes the result set ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 86,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "medium",
    "discussionSummary": "Single vote for C: UNION in a materialized view plus RANK.",
    "conceptSummary": "Top-N per group over tables that update monthly.",
    "correctRationale": "A materialized view that UNION ALLs the regional tables stays current as they're updated monthly, and RANK() returns the top three regions per month. Two caveats: UNION ALL (not UNION DISTINCT) is the correct operator for stacking the tables, and a materialized view over UNION requires a non-incremental definition (allow_non_incremental_definition plus max_staleness) — the exam still intends C. A plain table needs manual rebuilds, CROSS JOIN multiplies rows nonsensically, and ROW_NUMBER without a tie policy is the less idiomatic choice for top-N.",
    "optionRationales": [
      "Wrong: UNION is right but a plain table goes stale; ranking over a stale table fails 'automatically up-to-date'.",
      "Wrong: CROSS JOIN multiplies every region by every region — meaningless for this aggregation.",
      "Correct: MV over UNION keeps results fresh and RANK() yields the top three per month.",
      "Wrong: same bad CROSS JOIN basis, and ROW_NUMBER picks arbitrary rows on ties."
    ]
  },
  {
    "id": 85,
    "topic": "Orchestration & Monitoring",
    "difficulty": 1,
    "question": "You manage data at an ecommerce company. You have a Dataflow pipeline that processes order data from Pub/Sub, enriches the data with product information from Bigtable, and writes the processed data to BigQuery for analysis. The pipeline runs continuously and processes thousands of orders every minute. You need to monitor the pipeline's performance and be alerted if errors occur. What should you do?",
    "options": [
      "A. Use Cloud Logging to view the pipeline logs and check for errors. Set up alerts based on specific keywords in the logs.",
      "B. Use the Dataflow job monitoring interface to visually inspect the pipeline graph, check for errors, and configure notifications when critical errors occur.",
      "C. Use Cloud Monitoring to track key metrics. Create alerting policies in Cloud Monitoring to trigger notifications when metrics exceed thresholds or when errors occur.",
      "D. Use BigQuery to analyze the processed data in Cloud Storage and identify anomalies or inconsistencies. Set up scheduled alerts based when anomalies or inconsistencies occur."
    ],
    "correct": 2,
    "explanation": "Cloud Monitoring tracks Dataflow's built-in metrics and fires alerting policies when thresholds or errors trip.",
    "discussion": [
      {
        "user": "Terralogiq",
        "text": "Selected Answer: C. Cloud Monitoring is the proper tool for this, it tracks Dataflow's built-in metrics (system lag, throughput, CPU, error counts, etc.) and lets you build alerting policies with thresholds that page/notify you automatically. A is too fragile (keyword matching on logs isn't reliable monitoring), B is manual/visual only with no real automated alerting, D checks output data after the fact instead of ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 85,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C: metrics + alerting policies.",
    "conceptSummary": "Metric-based monitoring and alerting for a running Dataflow job.",
    "correctRationale": "Dataflow exports system metrics (lag, throughput, errors) to Cloud Monitoring; alerting policies notify automatically when thresholds are crossed — proactive and automatic. Manual log reading and visual graph inspection don't alert on their own, and BigQuery anomaly analysis measures the output rather than the pipeline.",
    "optionRationales": [
      "Wrong: reading logs by keyword is manual — it doesn't alert you.",
      "Wrong: visually inspecting the job graph is manual; it won't notify anyone.",
      "Correct: Monitoring metrics plus alerting policies notify automatically on errors or degraded throughput.",
      "Wrong: analyzing processed output finds data anomalies, not pipeline health."
    ]
  },
  {
    "id": 84,
    "topic": "Ingestion & Transfer",
    "difficulty": 1,
    "question": "You need to transfer approximately 300 TB of data from your company's on-premises data center to Cloud Storage. You have 100 Mbps internet bandwidth, and the transfer needs to be completed as quickly as possible. What should you do?",
    "options": [
      "A. Use Cloud Client Libraries to transfer the data over the internet.",
      "B. Compress the data, upload it to multiple cloud storage providers, and then transfer the data to Cloud Storage.",
      "C. Request a Transfer Appliance, copy the data to the appliance, and ship it back to Google.",
      "D. Use the gcloud storage command to transfer the data over the internet."
    ],
    "correct": 2,
    "explanation": "300 TB over 100 Mbps would take ~280+ days — a Transfer Appliance ships it physically.",
    "discussion": [
      {
        "user": "JackMerin",
        "text": "Selected Answer: C. A and D are out. Transferring data over the 100Mbps bandwidth would take about 300TB / 100Mbps (or 12.5MB/s ) = 278 days.\n\nB is out. Compression will help, but even a 50% compression ratio would still require over 139 days.\n\nC. The Transfer Appliance is specifically designed for moving large datasets (100 TB or more) when network bandwidth is a constraint."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 84,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C: bandwidth math forces the appliance.",
    "conceptSummary": "Offline transfer when bandwidth math rules out the network.",
    "correctRationale": "At 100 Mbps, 300 TB cannot move in any reasonable window online (roughly 8–9 months at line rate), so the offline Transfer Appliance is the only timely option. Client libraries and gcloud are still bottlenecked on the same pipe, and multi-cloud compression games add steps without beating shipping.",
    "optionRationales": [
      "Wrong: client libraries still push bytes over the same 100 Mbps link.",
      "Wrong: compressing and relaying through other clouds adds steps and still rides the pipe.",
      "Correct: a Transfer Appliance bypasses the network entirely for 300 TB.",
      "Wrong: gcloud storage is fast but still bound by 100 Mbps."
    ]
  },
  {
    "id": 83,
    "topic": "Machine Learning",
    "difficulty": 2,
    "question": "Your retail company wants to analyze customer reviews to understand sentiment and identify areas for improvement. Your company has a large dataset of customer feedback text stored in BigQuery that includes diverse language patterns, emojis, and slang. You want to build a solution to classify customer sentiment from the feedback text. What should you do?",
    "options": [
      "A. Preprocess the text data in BigQuery using SQL functions. Export the processed data to AutoML Natural Language for model training and deployment.",
      "B. Develop a custom sentiment analysis model using TensorFlow. Deploy it on a Compute Engine instance.",
      "C. Use Dataproc to create a Spark cluster, perform text preprocessing using Spark NLP, and build a sentiment analysis model with Spark MLlib.",
      "D. Export the raw data from BigQuery. Use AutoML Natural Language to train a custom sentiment analysis model."
    ],
    "correct": 3,
    "explanation": "AutoML text sentiment trains a custom model on the raw feedback — keeping emojis and slang preserves the sentiment signal.",
    "discussion": [
      {
        "user": "kiappy81",
        "text": "Selected Answer: D. automl works better with raw text for emoj and slang. option A will remove precious information with puntctation parsing, so that sentiment analysis will be difficoult."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 83,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "medium",
    "discussionSummary": "Single vote for D: feed raw text to AutoML rather than preprocessing the sentiment away. Product note: see legacyNote.",
    "conceptSummary": "Custom sentiment classification over raw BigQuery feedback text.",
    "correctRationale": "Sentiment models need the raw signal — emojis and slang carry meaning — so exporting the raw text to AutoML Natural Language for custom training fits best. SQL preprocessing would strip the emojis/punctuation that carry sentiment, and custom TensorFlow or Spark NLP pipelines need ML expertise and infrastructure. (See legacyNote: AutoML text is now folded into Vertex AI, where Gemini-based approaches are the modern path.)",
    "optionRationales": [
      "Wrong: SQL preprocessing strips emojis and punctuation that carry sentiment before training.",
      "Wrong: a custom TensorFlow model on Compute Engine needs ML expertise and infra management.",
      "Wrong: a Spark NLP cluster is heavy infrastructure for a trainable text task.",
      "Correct: raw text into AutoML Natural Language trains a custom sentiment model with no feature-stripping."
    ],
    "legacyNote": "AutoML Natural Language has been folded into Vertex AI, and Vertex AI AutoML text training is being retired in favour of Gemini-based tuning and prompting. Today you would classify sentiment in place with a BigQuery ML remote model (Gemini or the Cloud Natural Language API) instead of exporting data."
  },
  {
    "id": 82,
    "topic": "Ingestion & Transfer",
    "difficulty": 1,
    "question": "Your organization's website uses an on-premises MySQL as a backend database. You need to migrate the on-premises MySQL database to Google Cloud while maintaining MySQL features. You want to minimize administrative overhead and downtime. What should you do?",
    "options": [
      "A. Use a Google-provided Dataflow template to replicate the MySQL database in BigQuery.",
      "B. Install MySQL on a Compute Engine virtual machine. Export the database files using the mysqldump command. Upload the files to Cloud Storage, and import them into the MySQL instance on Compute Engine.",
      "C. Use Database Migration Service to transfer the data to Cloud SQL for MySQL, and configure the on-premises MySQL database as the source.",
      "D. Export the database tables to CSV files, and upload the files to Cloud Storage. Convert the MySQL schema to a Spanner schema, create a JSON manifest file, and run a Google-provided Dataflow template to load the data into Spanner."
    ],
    "correct": 2,
    "explanation": "Database Migration Service migrates on-prem MySQL to Cloud SQL for MySQL with minimal downtime and admin overhead.",
    "discussion": [
      {
        "user": "AgusSilva",
        "text": "Selected Answer: C. You should use Database Migration Service to transfer the data to a Cloud SQL for MySQL instance.\n\nThis is the Google-recommended approach because it uses two purpose-built, managed services to meet all your requirements: maintaining MySQL compatibility while minimizing both administrative overhead and downtime."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 82,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C: DMS to Cloud SQL.",
    "conceptSummary": "Managed MySQL migration preserving MySQL features.",
    "correctRationale": "DMS continuously replicates MySQL into Cloud SQL for MySQL — same engine, minimal downtime, managed service, minimal admin. BigQuery changes the engine, self-hosting on Compute Engine keeps admin overhead, and Spanner schema conversion abandons MySQL features.",
    "optionRationales": [
      "Wrong: replicating to BigQuery changes the engine and loses MySQL semantics for a backend DB.",
      "Wrong: mysqldump to a Compute Engine VM is manual, high-downtime, and keeps admin burden.",
      "Correct: DMS → Cloud SQL for MySQL preserves the engine with managed, low-downtime migration.",
      "Wrong: converting to Spanner abandons MySQL features and is far more work."
    ]
  },
  {
    "id": 81,
    "topic": "BigQuery & SQL",
    "difficulty": 2,
    "question": "Your team uses Google Sheets to track budget data that is updated daily. The team wants to compare budget data against actual cost data, which is stored in a BigQuery table. You need to create a solution that calculates the difference between each day's budget and actual costs. You want to ensure that your team has access to daily-updated results in Google Sheets. What should you do?",
    "options": [
      "A. Download the budget data as a CSV file and upload the CSV file to a Cloud Storage bucket. Create a new BigQuery table from Cloud Storage, and join the actual cost table with it. Open the joined BigQuery table by using Connected Sheets.",
      "B. Create a BigQuery external table by using the Drive URI of the Google sheet, and join the actual cost table with it. Save the joined table, and open it by using Connected Sheets.",
      "C. Download the budget data as a CSV file, and upload the CSV file to create a new BigQuery table. Join the actual cost table with the new BigQuery table, and save the results as a CSV file. Open the CSV file in Google Sheets.",
      "D. Create a BigQuery external table by using the Drive URI of the Google sheet, and join the actual cost table with it. Save the joined table as a CSV file and open the file in Google Sheets."
    ],
    "correct": 1,
    "explanation": "An external table over the Sheet's Drive URI joins budgets to actuals, and Connected Sheets puts the fresh result back in Sheets.",
    "discussion": [
      {
        "user": "AgusSilva",
        "text": "Selected Answer: B. Only B could apply. D can't be since Save as a CSV fileWhile the first step of using an external table is correct, the final step is wrong. Saving the result as a CSV and opening it in Google Sheets creates a static, non-refreshable report. Connected Sheets is the correct tool for creating a live link to the results."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 81,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "medium",
    "discussionSummary": "Single vote for B: the Drive-URI external table keeps it live.",
    "conceptSummary": "Joining a live Google Sheet to BigQuery data for Connected Sheets.",
    "correctRationale": "A BigQuery external table backed by the Google Sheet's Drive URI stays current with the sheet; join it to the actuals table and open the joined result via Connected Sheets so the team sees daily-updated numbers in Sheets. CSV uploads create stale manual copies, and saving results to CSV breaks the live connection.",
    "optionRationales": [
      "Wrong: uploading a CSV snapshot goes stale the next day — no daily-updated results.",
      "Correct: external table over the live sheet + Connected Sheets gives daily-fresh joined results.",
      "Wrong: the result saved back as a CSV loses the live sheet connection again.",
      "Wrong: same flaw — saving to CSV freezes the data."
    ]
  },
  {
    "id": 80,
    "topic": "Pipelines & Processing",
    "difficulty": 1,
    "question": "Your company wants to implement a data transformation (ETL) pipeline for their BigQuery data warehouse. You need to identify a managed transformation solution that allows users to develop with SQL and JavaScript, has version control, allows for modular code, and has data quality checks. What should you do?",
    "options": [
      "A. Use Dataform to define the transformations in SQLX.",
      "B. Use Dataproc to create an Apache Spark cluster and implement the transformations by using PySpark SQL.",
      "C. Create a Cloud Composer environment, and orchestrate the transformations by using the BigQueryInsertJob operator.",
      "D. Create BigQuery scheduled queries to define the transformations in SQL."
    ],
    "correct": 0,
    "explanation": "Dataform is the managed SQLX transformation service with version control, modular code, and assertions for data quality.",
    "discussion": [
      {
        "user": "AgusSilva",
        "text": "Selected Answer: A. You should use Dataform.\n\nDataform is the Google Cloud managed service specifically designed for developing and managing data transformation workflows in BigQuery. It is the only solution that meets all of your specific requirements."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 80,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for A: Dataform covers all four requirements.",
    "conceptSummary": "Managed SQL+JS transformation development with Git and quality checks.",
    "correctRationale": "Dataform is Google Cloud's managed transformation service: SQLX supports SQL and JavaScript, repositories integrate version control, code is modular by design, and assertions provide data quality checks. Dataproc/Spark isn't SQL+JS with built-in VCS, Composer orchestrates rather than develops transformations, and scheduled queries lack modular code and assertions.",
    "optionRationales": [
      "Correct: Dataform's SQLX gives SQL+JavaScript, Git versioning, modularity, and quality assertions.",
      "Wrong: PySpark SQL on Dataproc has no integrated version control or quality-check framework.",
      "Wrong: Composer schedules tasks; it isn't a transformation development tool.",
      "Wrong: scheduled queries are single SQL statements — no modularity, VCS, or assertions."
    ]
  },
  {
    "id": 79,
    "topic": "Lifecycle & Availability",
    "difficulty": 1,
    "question": "Your company stores historical data in Cloud Storage. You need to ensure that all data is saved in a bucket for at least three years. What should you do?",
    "options": [
      "A. Set temporary object holds.",
      "B. Set a bucket retention policy.",
      "C. Change the bucket storage class to Archive.",
      "D. Enable Object Versioning."
    ],
    "correct": 1,
    "explanation": "A bucket retention policy guarantees objects can't be deleted before the three-year minimum.",
    "discussion": [
      {
        "user": "Terralogiq",
        "text": "Selected Answer: B. A bucket retention policy lets you set a minimum retention duration (e.g 3 years) so objects can't be deleted or overwritten until that time passes. A is per-object and manual, C just changes storage cost/access tier not retention, D just keeps old versions around but doesn't prevent deletion.\n\nhttps://cloud.google.com/storage/docs/bucket-lock"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 79,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for B: retention policy, not holds or classes.",
    "conceptSummary": "Enforcing a minimum data retention period on a bucket.",
    "correctRationale": "A bucket retention policy prevents deletion or overwrite of any object younger than three years — exactly 'all data saved at least three years'. Temporary holds must be set per object, Archive changes cost not retention, and versioning keeps copies but doesn't enforce a minimum lifetime.",
    "optionRationales": [
      "Wrong: temporary holds are per-object flags, easy to miss, and not a blanket minimum.",
      "Correct: a bucket retention policy blocks deletion before the retention window for every object.",
      "Wrong: Archive is a storage class — it doesn't prevent deletion.",
      "Wrong: versioning preserves versions but objects can still be deleted."
    ]
  },
  {
    "id": 78,
    "topic": "Data Sharing & Governance",
    "difficulty": 2,
    "question": "You created a curated dataset of market trends in BigQuery that you want to share with multiple external partners. You want to control the rows and columns that each partner has access to. You want to follow Google-recommended practices. What should you do?",
    "options": [
      "A. Publish the dataset in Analytics Hub. Grant dataset-level access to each partner by using subscriptions.",
      "B. Grant each partner read access to the BigQuery dataset by using IAM roles.",
      "C. Create a separate Cloud Storage bucket for each partner. Export the dataset to each bucket and assign each partner to their respective bucket. Grant bucket-level access by using IAM roles.",
      "D. Create a separate project for each partner and copy the dataset into each project. Publish each dataset in Analytics Hub. Grant dataset-level access to each partner by using subscriptions."
    ],
    "correct": 0,
    "explanation": "Analytics Hub listings share the curated dataset in place, and subscription scoping controls what each partner gets.",
    "discussion": [
      {
        "user": "AgusSilva",
        "text": "Selected Answer: A. You should publish the dataset in Analytics Hub.\n\nThis is the Google-recommended approach for creating a scalable and governed framework to share data with external partners. Analytics Hub acts as a private data marketplace, allowing you to share live data without creating multiple copies."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 78,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "medium",
    "discussionSummary": "Single vote for A: Analytics Hub is the recommended sharing path.",
    "conceptSummary": "Sharing curated data with external partners the managed way.",
    "correctRationale": "Publishing the dataset in Analytics Hub shares it in place — partners subscribe to a linked dataset rather than copy it — which is Google's recommended external-sharing mechanism. Per-partner row and column control comes from row-level access policies and column-level security (policy tags), or from authorized views, on the shared dataset. IAM on the dataset hands partners broad access, and per-partner buckets or projects create duplicated copies.",
    "optionRationales": [
      "Correct: Analytics Hub publishes curated listings each partner subscribes to — managed, copy-free sharing.",
      "Wrong: dataset IAM gives partners direct access without the governed sharing framework.",
      "Wrong: per-partner buckets make physical copies that drift from the curated source.",
      "Wrong: per-partner projects with copies multiply the duplication problem."
    ]
  },
  {
    "id": 77,
    "topic": "Orchestration & Monitoring",
    "difficulty": 1,
    "question": "Following a recent company acquisition, you inherited an on-premises data infrastructure that needs to move to Google Cloud. The acquired system has 250 Apache Airflow directed acyclic graphs (DAGs) orchestrating data pipelines. You need to migrate the pipelines to a Google Cloud managed service with minimal effort. What should you do?",
    "options": [
      "A. Create a Google Kubernetes Engine (GKE) standard cluster and deploy Airflow as a workload. Migrate all DAGs to the new Airflow environment.",
      "B. Create a Cloud Data Fusion instance. For each DAG, create a Cloud Data Fusion pipeline.",
      "C. Create a new Cloud Composer environment and copy DAGs to the Cloud Composer dags/ folder.",
      "D. Convert each DAG to a Cloud Workflow and automate the execution with Cloud Scheduler."
    ],
    "correct": 2,
    "explanation": "Composer is managed Airflow — copy the 250 DAGs into the environment's dags/ folder and they run.",
    "discussion": [
      {
        "user": "AgusSilva",
        "text": "Selected Answer: C. You should create a new Cloud Composer environment and copy the DAGs to the Cloud Composer dags/ folder.\n\nThis is the recommended approach because Cloud Composer is Google Cloud's fully managed Apache Airflow service. It's specifically designed to run the Airflow DAGs you already have with almost no modifications."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 77,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C: Composer is the managed-Airflow landing zone.",
    "conceptSummary": "Migrating existing Airflow DAGs to managed Airflow.",
    "correctRationale": "Cloud Composer is managed Apache Airflow: the acquired DAGs drop into the environment's dags/ bucket folder and execute with minimal effort. Self-hosted Airflow on GKE means managing the cluster, and Data Fusion or Workflows mean rebuilding all 250 pipelines.",
    "optionRationales": [
      "Wrong: GKE-hosted Airflow is self-managed — you now own a cluster plus the migration.",
      "Wrong: rebuilding 250 DAGs as Data Fusion pipelines is massive effort.",
      "Correct: Composer is managed Airflow; the existing DAGs transfer with minimal effort.",
      "Wrong: converting every DAG to Workflows is a rewrite, not a migration."
    ]
  },
  {
    "id": 76,
    "topic": "Ingestion & Transfer",
    "difficulty": 1,
    "question": "Your company has an on-premises file server with 5 TB of data that needs to be migrated to Google Cloud. The network operations team has mandated that you can only use up to 250 Mbps of the total available bandwidth for the migration. You need to perform an online migration to Cloud Storage. What should you do?",
    "options": [
      "A. Use the gcloud storage cp command to copy all files from on-premises to Cloud Storage using the --daisy-chain option.",
      "B. Use Storage Transfer Service to configure an agent-based transfer. Set the appropriate bandwidth limit for the agent pool.",
      "C. Request a Transfer Appliance, copy the data to the appliance, and ship it back to Google Cloud.",
      "D. Use the gcloud storage cp command to copy all files from on-premises to Cloud Storage using the --no-clobber option."
    ],
    "correct": 1,
    "explanation": "An STS agent-based transfer enforces the 250 Mbps cap on the agent pool during an online migration.",
    "discussion": [
      {
        "user": "AgusSilva",
        "text": "Selected Answer: B. You should use Storage Transfer Service.\n\nThis is the Google-recommended managed service for large-scale online data transfers from on-premises sources to Cloud Storage, and it's the only option that directly meets your bandwidth control requirement."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 76,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for B: STS agent pool bandwidth limit.",
    "conceptSummary": "Bandwidth-capped online file-server migration.",
    "correctRationale": "Storage Transfer Service agent transfers let you set a bandwidth limit on the agent pool, satisfying the 250 Mbps cap while migrating online. gcloud cp flags don't cap bandwidth, and a Transfer Appliance is offline — unneeded for 5 TB at that rate.",
    "optionRationales": [
      "Wrong: --daisy-chain controls copy pathing, not bandwidth; it doesn't honor the 250 Mbps cap.",
      "Correct: agent-based STS with a pool bandwidth limit enforces the cap online.",
      "Wrong: Transfer Appliance is offline shipping — unnecessary for 5 TB at allowed bandwidth.",
      "Wrong: --no-clobber skips existing files; it doesn't limit bandwidth."
    ]
  },
  {
    "id": 75,
    "topic": "Orchestration & Monitoring",
    "difficulty": 1,
    "question": "You work for a healthcare company. You have a daily ETL pipeline that extracts patient data from a legacy system, transforms it, and loads it into BigQuery for analysis. The pipeline currently runs manually using a shell script. You want to automate this process and add monitoring to ensure pipeline observability and troubleshooting insights. You want one centralized solution, using open-source tooling, without rewriting the ETL code. What should you do?",
    "options": [
      "A. Create a Cloud Run function that runs the pipeline daily. Monitor the function's execution using Cloud Monitoring.",
      "B. Configure Cloud Dataflow to implement the ETL pipeline, and use Cloud Scheduler to trigger the Dataflow pipeline daily. Monitor the pipeline's execution using the Dataflow job monitoring interface and Cloud Monitoring.",
      "C. Use Cloud Scheduler to trigger a Dataproc job to execute the pipeline daily. Monitor the job's progress using the Dataproc job web interface and Cloud Monitoring.",
      "D. Create a direct acyclic graph (DAG) in Cloud Composer to orchestrate a pipeline trigger daily. Monitor the pipeline's execution using the Apache Airflow web interface and Cloud Monitoring."
    ],
    "correct": 3,
    "explanation": "A Composer DAG schedules the script daily and Airflow's UI plus Monitoring give the observability, no rewrite.",
    "discussion": [
      {
        "user": "Terralogiq",
        "text": "Selected Answer: D. Composer (managed Airflow) lets you drop your existing shell script into a DAG using a BashOperator, no rewrite script needed. Airflow's open-source, gives you a UI for logs/retries/history, and pairs with Cloud Monitoring for alerts. B and C both force you to rewrite the ETL (Beam/Spark), and A lacks real orchestration features."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 75,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for D: managed Airflow, open-source and no rewrite.",
    "conceptSummary": "Automating a shell-script ETL with managed Airflow.",
    "correctRationale": "Cloud Composer runs the existing shell script as a scheduled DAG task — open-source Airflow, no rewrite — with the Airflow UI and Cloud Monitoring providing observability. Cloud Run functions ignore monitoring/orchestration, Dataflow means rewriting the pipeline in Beam, and Scheduler+Dataproc has no central DAG view.",
    "optionRationales": [
      "Wrong: a scheduled Cloud Run function has no pipeline observability or DAG view.",
      "Wrong: Dataflow means rewriting the ETL in Beam — explicitly avoided.",
      "Wrong: Scheduler+Dataproc is two separate tools with no central pipeline view.",
      "Correct: Composer orchestrates the existing script daily with Airflow UI observability."
    ]
  },
  {
    "id": 74,
    "topic": "Lifecycle & Availability",
    "difficulty": 3,
    "question": "You have a Cloud SQL for PostgreSQL database that stores sensitive historical financial data. You need to ensure that the data is uncorrupted and recoverable in the event that the primary region is destroyed. The data is valuable, so you need to prioritize recovery point objective (RPO) over recovery time objective (RTO). You want to recommend a solution that minimizes latency for primary read and write operations. What should you do?",
    "options": [
      "A. Configure the Cloud SQL for PostgreSQL instance for multi-region backup locations.",
      "B. Configure the Cloud SQL for PostgreSQL instance for regional availability (HA) with synchronous replication to a secondary instance in a different zone.",
      "C. Configure the Cloud SQL for PostgreSQL instance for regional availability (HA) with asynchronous replication to a secondary instance in a different region.",
      "D. Configure the Cloud SQL for PostgreSQL instance for regional availability (HA). Back up the Cloud SQL for PostgreSQL database hourly to a Cloud Storage bucket in a different region."
    ],
    "correct": 2,
    "explanation": "A cross-region asynchronous replica survives region loss with seconds of RPO and adds no latency to primary writes.",
    "discussion": [
      {
        "user": "kailu",
        "text": "Selected Answer: B. The best possible RPO‑focused solution within Cloud SQL constraints is regional HA with synchronous replication. Thus B. Its fully managed, automatic failover, no application changes required, and its the standard Google Cloud best practice for mission‑critical relational data."
      },
      {
        "user": "kiappy81",
        "text": "Selected Answer: A. Cloud SQL multi-region backups are automatically replicated to a different geographic region. If the primary region is destroyed, the data remains intact and recoverable (low RPO, or near-completely recoverable data). Because backups are asynchronous to live transactions, this option minimizes latency on primary write operations.\n\nThe asynchronous replication option would pose a risk of data loss ..."
      },
      {
        "user": "e217092",
        "text": "Selected Answer: C. Prioritizes RPO over RTO: This means you care more about losing as little data as possible than you do about how quickly you can get the database back online. A low RPO (Recovery Point Objective) is achieved by having a recent, or even real-time, copy of the data.\n\nOption D has a much higher RPO than option C. If the primary region is destroyed, you could lose up to one hour's worth of data, ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 74,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "high",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Three-way split A/B/C: resolved to C — regional loss requires a cross-region async replica; zonal HA can't survive region loss. Independent review (Gemini, Oct 2026) confirmed C: synchronous HA is within one region while a cross-region async replica survives region loss.",
    "conceptSummary": "Region-loss DR for Cloud SQL prioritizing RPO.",
    "correctRationale": "When the primary region can be destroyed, the copy must live in another region; asynchronous replication keeps the replica current within seconds while never stalling primary writes — synchronous cross-region replication would add write latency the question forbids. Cloud SQL HA itself is zonal-within-region (lost with the region), and backups give daily/hourly RPO, not the seconds-level RPO prioritized here.",
    "optionRationales": [
      "Wrong: multi-region backups are still backups — recovery takes long and loses data since the last backup.",
      "Wrong: synchronous HA spans zones inside one region — the region's loss kills both.",
      "Correct: a cross-region replica (asynchronous) gives near-zero RPO across regions without slowing primary writes.",
      "Wrong: hourly backups imply up to an hour of lost writes — poor RPO."
    ]
  },
  {
    "id": 73,
    "topic": "Pipelines & Processing",
    "difficulty": 1,
    "question": "You are working on a project that requires analyzing daily social media data. You have 100 GB of JSON formatted data stored in Cloud Storage that keeps growing. You need to transform and load this data into BigQuery for analysis. You want to follow the Google-recommended approach. What should you do?",
    "options": [
      "A. Use Cloud Data Fusion to transfer the data into BigQuery raw tables, and use SQL to transform it.",
      "B. Use Dataflow to transform the data and write the transformed data to BigQuery.",
      "C. Manually download the data from Cloud Storage. Use a Python script to transform and upload the data into BigQuery.",
      "D. Use Cloud Run functions to transform and load the data into BigQuery."
    ],
    "correct": 1,
    "explanation": "Dataflow transforms the JSON in flight and lands it in BigQuery — the recommended managed approach.",
    "discussion": [
      {
        "user": "Babbar",
        "text": "Selected Answer: B. B is the Google-recommended approach"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 73,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for B: Dataflow is the recommended transform path.",
    "conceptSummary": "Transform-then-load JSON files from Cloud Storage to BigQuery.",
    "correctRationale": "Dataflow is Google's recommended managed service for transforming data before it reaches BigQuery — the JSON is cleaned in flight and lands analysis-ready. Loading raw first (Data Fusion to raw tables) is ELT with extra stages, manual downloads don't scale, and Cloud Run functions are ad-hoc for a 100 GB growing set.",
    "optionRationales": [
      "Wrong: Data Fusion to raw tables is load-then-transform; the question wants the recommended transform-then-load.",
      "Correct: Dataflow transforms in flight and writes to BigQuery — managed and scalable.",
      "Wrong: manual download plus a Python script doesn't scale or survive growth.",
      "Wrong: Cloud Run functions are ad-hoc for a growing 100 GB dataset."
    ]
  },
  {
    "id": 72,
    "topic": "Storage Selection",
    "difficulty": 2,
    "question": "You created a customer support application that sends several forms of data to Google Cloud. Your application is sending:\n1. Audio files from phone interactions with support agents that will be accessed during trainings.\n2. CSV files of users’ personally identifiable information (PII) that will be analyzed with SQL.\n3. A large volume of small document files that will power other applications.\nYou need to select the appropriate tool for each data type given the required use case, while following Google-recommended practices. Which should you choose?",
    "options": [
      "A. 1. Cloud Storage 2. CloudSQL for PostgreSQL 3. Bigtable",
      "B. 1. Filestore 2. Cloud SQL for PostgreSQL 3. Datastore",
      "C. 1. Cloud Storage 2. BigQuery 3. Firestore",
      "D. 1. Filestore 2. Bigtable 3. BigQuery"
    ],
    "correct": 2,
    "explanation": "Cloud Storage for audio, BigQuery for PII CSVs to SQL-analyze, Firestore for the small documents powering applications.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. The best option is C. 1. Cloud Storage 2. BigQuery 3. Firestore. Option C is best because: 1. Cloud Storage is ideal for audio files for training access. 2. BigQuery is perfect for SQL analysis of CSV PII data. 3. Firestore is designed for large volumes of small application documents. Option A is incorrect because CloudSQL is not for SQL analysis of large CSVs, and Bigtable is overkill for ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 72,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C: the mapping that respects each use case.",
    "conceptSummary": "Mapping three data types to the right store per use case.",
    "correctRationale": "Audio files belong in object storage (Cloud Storage), PII in CSV that must be analyzed with SQL belongs in BigQuery, and a large volume of small documents powering applications belongs in Firestore (document DB) — option C is the only combination that matches all three use cases. Filestore is NFS file shares, Cloud SQL is relational OLTP, and Bigtable is wide-column for massive sparse/time-series workloads.",
    "optionRationales": [
      "Wrong: Cloud Storage is right for the audio, but Cloud SQL for PostgreSQL is OLTP (not an analytics engine for the CSVs) and Bigtable is wide-column rather than a document store for app documents.",
      "Wrong: Filestore is shared file storage, and Datastore is the legacy document store (Firestore is its successor).",
      "Correct: GCS + BigQuery + Firestore match files, SQL-analyzed CSV, and app-serving documents.",
      "Wrong: Filestore + Bigtable + BigQuery mis-assigns every workload."
    ]
  },
  {
    "id": 71,
    "topic": "Ingestion & Transfer",
    "difficulty": 1,
    "question": "You are migrating data from a legacy on-premises MySQL database to Google Cloud. The database contains various tables with different data types and sizes, including large tables with millions of rows and transactional data. You need to migrate this data while maintaining data integrity, and minimizing downtime and cost. What should you do?",
    "options": [
      "A. Set up a Cloud Composer environment to orchestrate a custom data pipeline. Use a Python script to extract data from the MySQL database and load it to MySQL on Compute Engine.",
      "B. Export the MySQL database to CSV files, transfer the files to Cloud Storage by using Storage Transfer Service, and load the files into a Cloud SQL for MySQL instance.",
      "C. Use Database Migration Service to replicate the MySQL database to a Cloud SQL for MySQL instance.",
      "D. Use Cloud Data Fusion to migrate the MySQL database to MySQL on Compute Engine."
    ],
    "correct": 2,
    "explanation": "Database Migration Service replicates MySQL to Cloud SQL for MySQL continuously — minimal downtime and cost.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. The best option is C. Use Database Migration Service (DMS). Option C is best because DMS is built for MySQL migration to Cloud SQL, ensuring integrity and minimizing downtime. Option A (Composer, Python, Compute Engine) is incorrect because Composer adds complexity, Python is manual, and Compute Engine is less managed. Option B (CSV, Storage Transfer, Cloud SQL) is incorrect because CSV export is ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 71,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C: DMS to Cloud SQL.",
    "conceptSummary": "Low-downtime MySQL migration to Cloud SQL.",
    "correctRationale": "DMS replicates the MySQL database to Cloud SQL for MySQL with continuous replication and minimal cutover downtime, integrity preserved — the purpose-built tool. Composer pipelines and CSV exports are manual multi-step processes, and Data Fusion to Compute Engine keeps self-managed MySQL.",
    "optionRationales": [
      "Wrong: a custom Composer+Python pipeline is effort and downtime DMS removes.",
      "Wrong: CSV export/import is a downtime-heavy manual path.",
      "Correct: DMS continuously replicates MySQL into Cloud SQL with minimal downtime.",
      "Wrong: Data Fusion to self-managed MySQL on Compute Engine skips the managed-database benefit."
    ]
  },
  {
    "id": 70,
    "topic": "Lifecycle & Availability",
    "difficulty": 2,
    "question": "You work for a global financial services company that trades stocks 24/7. You have a Cloud SQL for PostgreSQL user database. You need to identify a solution that ensures that the database is continuously operational, minimizes downtime, and will not lose any data in the event of a zonal outage. What should you do?",
    "options": [
      "A. Continuously back up the Cloud SQL instance to Cloud Storage. Create a Compute Engine instance with PostgreSQL in a different region. Restore the backup in the Compute Engine instance if a failure occurs.",
      "B. Create a read replica in another region. Promote the replica to primary if a failure occurs.",
      "C. Configure and create a high-availability Cloud SQL instance with the primary instance in zone A and a secondary instance in any zone other than zone A.",
      "D. Create a read replica in the same region but in a different zone."
    ],
    "correct": 2,
    "explanation": "A high-availability Cloud SQL instance synchronously replicates to a second zone and fails over with no data loss.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. The best option is C. HA Cloud SQL. Option C is best: HA is built for continuous ops and zonal failure protection. Option A is incorrect: Backup/restore = downtime. Option B is incorrect: Replica less direct for zonal failover. Option D is incorrect: Read replica no auto-failover for primary. Option C = HA for best uptime."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 70,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C: HA zonal pair.",
    "conceptSummary": "Zonal-outage resilience for Cloud SQL with zero data loss.",
    "correctRationale": "Cloud SQL HA stands up a synchronous standby in a different zone: on zonal failure it fails over automatically with zero data loss — exactly the 'continuously operational, no data loss' requirement. Backup-restore loses recent writes and takes time, a cross-region replica still needs manual promotion, and a same-region read replica in another zone is asynchronous and must be promoted manually, so it is not an automatic failover target.",
    "optionRationales": [
      "Wrong: restoring a backup is slow and loses all writes since the backup.",
      "Wrong: a cross-region read replica needs manual promotion — downtime you could avoid.",
      "Correct: HA with a synchronous standby in another zone fails over automatically with no data loss.",
      "Wrong: a read replica is asynchronous and needs manual promotion, adding downtime and steps the synchronous HA standby avoids."
    ]
  },
  {
    "id": 69,
    "topic": "Data Sharing & Governance",
    "difficulty": 2,
    "question": "Your organization has a BigQuery dataset that contains sensitive employee information such as salaries and performance reviews. The payroll specialist in the HR department needs to have continuous access to aggregated performance data, but they do not need continuous access to other sensitive data. You need to grant the payroll specialist access to the performance data without granting them access to the entire dataset using the simplest and most secure approach. What should you do?",
    "options": [
      "A. Use authorized views to share query results with the payroll specialist.",
      "B. Create row-level and column-level permissions and policies on the table that contains performance data in the dataset. Provide the payroll specialist with the appropriate permission set.",
      "C. Create a table with the aggregated performance data. Use table-level permissions to grant access to the payroll specialist.",
      "D. Create a SQL query with the aggregated performance data. Export the results to an Avro file in a Cloud Storage bucket. Share the bucket with the payroll specialist."
    ],
    "correct": 0,
    "explanation": "An authorized view shares just the aggregated results without opening the sensitive dataset.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. The best option is A. Use authorized views. Option A is best because authorized views are the simplest and most secure way to share query results (aggregated data) without granting access to underlying sensitive data. The payroll specialist only sees the view, not the raw data. Option B (Row/column permissions) is incorrect because it's more complex to set up and manage than authorized views, and ... (2 votes)"
      },
      {
        "user": "SaquibHerman",
        "text": "Selected Answer: A. Creating a separate table duplicates data and introduces potential data consistency issues. Authorized views provide a more dynamic and maintainable solution. (2 votes)"
      },
      {
        "user": "a_vi",
        "text": "Selected Answer: C. The best approach is C. Create a table with the aggregated performance data. Use table-level permissions to grant access to the payroll specialist."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 69,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "high",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Split A (2) vs C (1): resolved to A — authorized views are the standard minimal-share mechanism. Independent review (Gemini, Oct 2026) confirmed A: an authorized view shares only the aggregate.",
    "conceptSummary": "Sharing aggregate results without dataset access via authorized views.",
    "correctRationale": "An authorized view lets the payroll specialist query the aggregated result while BigQuery enforces access on the view rather than the underlying sensitive tables — the simplest secure share. Row/column policies are finer-grained than needed, a copied table duplicates data that can go stale, and Avro exports leak data outside governance.",
    "optionRationales": [
      "Correct: authorized views expose the aggregate query without granting access to the sensitive dataset.",
      "Wrong: row/column policies on the table are more machinery than sharing one aggregate needs.",
      "Wrong: a copied aggregate table becomes a stale duplicate.",
      "Wrong: exporting to Avro moves sensitive data outside access control."
    ]
  },
  {
    "id": 68,
    "topic": "Ingestion & Transfer",
    "difficulty": 1,
    "question": "Your team uses the Google Ads platform to visualize metrics. You want to export the data to BigQuery to get more granular insights. You need to execute a one-time transfer of historical data and automatically update data daily. You want a solution that is low-code, serverless, and requires minimal maintenance. What should you do?",
    "options": [
      "A. Export the historical data to BigQuery by using BigQuery Data Transfer Service. Use Cloud Composer for daily automation.",
      "B. Export the historical data to Cloud Storage by using Storage Transfer Service. Use Pub/Sub to trigger a Dataflow template that loads data for daily automation.",
      "C. Export the historical data as a CSV file. Import the file into BigQuery for analysis. Use Cloud Composer for daily automation.",
      "D. Export the historical data to BigQuery by using BigQuery Data Transfer Service. Use BigQuery Data Transfer Service for daily automation."
    ],
    "correct": 3,
    "explanation": "BigQuery Data Transfer Service has a native Google Ads connector that backfills history and refreshes daily — no code.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. The best option is D. BigQuery Data Transfer Service (DTS) for both. Option D is best because BigQuery DTS directly handles both historical and daily Google Ads data transfer to BigQuery in a low-code, serverless, managed way. Option A (DTS + Composer) is incorrect because Composer adds unnecessary complexity for daily updates when DTS can handle it itself. Option B (Storage Transfer + Dataflow) ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 68,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for D: DTS alone handles both halves.",
    "conceptSummary": "Low-code recurring Google Ads import into BigQuery.",
    "correctRationale": "BQ Data Transfer Service's Google Ads transfer does the one-time historical backfill and then scheduled daily refreshes — serverless, low-code, minimal maintenance all in one. Composers, STS+Dataflow chains, and CSV imports each bolt extra tooling onto a job DTS already does.",
    "optionRationales": [
      "Wrong: Composer on top of DTS adds orchestration the DTS scheduling already covers.",
      "Wrong: STS→GCS→Pub/Sub→Dataflow is a four-service pipeline for a one-service job.",
      "Wrong: manual CSV import plus Composer is neither low-code nor minimal-maintenance.",
      "Correct: DTS does both the backfill and the daily refresh for Google Ads natively."
    ]
  },
  {
    "id": 67,
    "topic": "Orchestration & Monitoring",
    "difficulty": 1,
    "question": "Your organization uses scheduled queries to perform transformations on data stored in BigQuery. You discover that one of your scheduled queries has failed. You need to troubleshoot the issue as quickly as possible. What should you do?",
    "options": [
      "A. Navigate to the Logs Explorer page in Cloud Logging. Use filters to find the failed job, and analyze the error details.",
      "B. Set up a log sink using the gcloud CLI to export BigQuery audit logs to BigQuery. Query those logs to identify the error associated with the failed job ID.",
      "C. Request access from your admin to the BigQuery information_schema. Query the jobs view with the failed job ID, and analyze error details.",
      "D. Navigate to the Scheduled queries page in the Google Cloud console. Select the failed job, and analyze the error details."
    ],
    "correct": 3,
    "explanation": "The Scheduled queries page shows the failed run's error details directly — fastest.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. The best option is D. Scheduled queries page. Option D is best because it's the direct console page for scheduled query errors. Option A (Logs Explorer) is incorrect because it's less direct than the dedicated page. Option B (Log sink) is incorrect because it's for future logs, not immediate troubleshooting, and too complex. Option C (INFORMATION_SCHEMA) is incorrect because console page is ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 67,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for D: the console's scheduled-queries page.",
    "conceptSummary": "Finding why a scheduled BigQuery query failed.",
    "correctRationale": "The Scheduled queries page lists each run with its error details, so the failed job is diagnosed in a couple of clicks. Logs Explorer works but requires filtering, a log sink is plumbing for a one-off check, and information_schema needs admin access you may not have.",
    "optionRationales": [
      "Wrong: Logs Explorer works but needs query filtering — slower than the dedicated page.",
      "Wrong: a log sink exports audit logs for ongoing analysis, not a quick look.",
      "Wrong: querying INFORMATION_SCHEMA.JOBS needs permissions and more steps.",
      "Correct: the Scheduled queries page surfaces the failed run and its error immediately."
    ]
  },
  {
    "id": 66,
    "topic": "Ingestion & Transfer",
    "difficulty": 2,
    "question": "Your organization has decided to migrate their existing enterprise data warehouse to BigQuery. The existing data pipeline tools already support connectors to BigQuery. You need to identify a data migration approach that optimizes migration speed. What should you do?",
    "options": [
      "A. Create a temporary file system to facilitate data transfer from the existing environment to Cloud Storage. Use Storage Transfer Service to migrate the data into BigQuery.",
      "B. Use the Cloud Data Fusion web interface to build data pipelines. Create a directed acyclic graph (DAG) that facilitates pipeline orchestration.",
      "C. Use the existing data pipeline tool’s BigQuery connector to reconfigure the data mapping.",
      "D. Use the BigQuery Data Transfer Service to recreate the data pipeline and migrate the data into BigQuery."
    ],
    "correct": 2,
    "explanation": "The existing tools' native BigQuery connectors skip building a new pipeline — the fastest migration path.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. The best option is C. Use the existing data pipeline tool’s BigQuery connector. Option C is best because leveraging existing tools and their BigQuery connectors is generally the fastest migration path. Reconfiguring existing mappings is more direct than introducing new services or intermediate steps, optimizing migration speed. Option A (Temporary file system and Storage Transfer Service) is ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 66,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C: reuse the connectors already in place.",
    "conceptSummary": "Fastest enterprise DW migration using existing connectors.",
    "correctRationale": "When the current pipeline tools already have BigQuery connectors, reconfiguring the mapping to point at BigQuery migrates with the least new machinery and therefore the most speed. STS needs a staging filesystem, Data Fusion means rebuilding pipelines visually, and BQ DTS recreates rather than reuses the pipeline.",
    "optionRationales": [
      "Wrong: staging via a filesystem and STS adds a hop when connectors already exist.",
      "Wrong: rebuilding pipelines in Data Fusion is slower than reusing existing connectors.",
      "Correct: the tools' existing BigQuery connectors migrate the data fastest with no new pipeline.",
      "Wrong: BQ DTS recreates pipelines rather than migrating the existing ones."
    ]
  },
  {
    "id": 65,
    "topic": "Data Sharing & Governance",
    "difficulty": 1,
    "question": "Your organization has several datasets in BigQuery. The datasets need to be shared with your external partners so that they can run SQL queries without needing to copy the data to their own projects. You have organized each partner’s data in its own BigQuery dataset. Each partner should be able to access only their data. You want to share the data while following Google-recommended practices. What should you do?",
    "options": [
      "A. Use Analytics Hub to create a listing on a private data exchange for each partner dataset. Allow each partner to subscribe to their respective listings.",
      "B. Create a Dataflow job that reads from each BigQuery dataset and pushes the data into a dedicated Pub/Sub topic for each partner. Grant each partner the pubsub. subscriber IAM role.",
      "C. Export the BigQuery data to a Cloud Storage bucket. Grant the partners the storage.objectUser IAM role on the bucket.",
      "D. Grant the partners the bigquery.user IAM role on the BigQuery project."
    ],
    "correct": 0,
    "explanation": "Analytics Hub private listings let each partner subscribe to their own dataset in place — no copying.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. The best option is A. Use Analytics Hub. Option A is best because Analytics Hub is Google's recommended, secure, and efficient way to share BigQuery datasets externally for querying in place. Option B (Dataflow & Pub/Sub) is incorrect because it's complex and inefficient for data sharing, Pub/Sub is for messaging. Option C (Cloud Storage Export) is incorrect because it requires copying data, not ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 65,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for A, matching the snippet's suggested answer A.",
    "conceptSummary": "Sharing per-partner datasets via an Analytics Hub private exchange.",
    "correctRationale": "Analytics Hub listings on a private exchange share each dataset in place so partners query without copying, and each partner subscribes only to their listing. Pub/Sub pushes, bucket exports, and project-wide IAM either copy the data or over-share.",
    "optionRationales": [
      "Correct: per-partner Analytics Hub listings share data in place with subscription scoping.",
      "Wrong: pushing data through Pub/Sub topics copies it into a messaging pipe per partner.",
      "Wrong: bucket exports make physical copies outside BigQuery governance.",
      "Wrong: project-level bigquery.user grants access far beyond their own dataset."
    ]
  },
  {
    "id": 64,
    "topic": "Looker & Visualization",
    "difficulty": 1,
    "question": "Your team needs to analyze large datasets stored in BigQuery to identify trends in user behavior. The analysis will involve complex statistical calculations, Python packages, and visualizations. You need to recommend a managed collaborative environment to develop and share the analysis. What should you recommend?",
    "options": [
      "A. Create a Colab Enterprise notebook and connect the notebook to BigQuery. Share the notebook with your team. Analyze the data and generate visualizations in Colab Enterprise.",
      "B. Create a statistical model by using BigQuery ML. Share the query with your team. Analyze the data and generate visualizations in Looker Studio.",
      "C. Create a Looker Studio dashboard and connect the dashboard to BigQuery. Share the dashboard with your team. Analyze the data and generate visualizations in Looker Studio.",
      "D. Connect Google Sheets to BigQuery by using Connected Sheets. Share the Google Sheet with your team. Analyze the data and generate visualizations in Google Sheets."
    ],
    "correct": 0,
    "explanation": "Colab Enterprise is the managed, shareable notebook environment connected to BigQuery for statistical Python work.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. colab enterprise helps large data analyst teams use a collective environment while utilizing python"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. The best option is A. Create a Colab Enterprise notebook and connect the notebook to BigQuery. Share the notebook with your team. Analyze the data and generate visualizations in Colab Enterprise. Option A is best because Colab Enterprise provides a managed, collaborative Python environment directly connected to BigQuery, ideal for complex stats, Python packages, and visualizations. Option B ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 64,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for A: Colab Enterprise is the managed collaborative notebook.",
    "conceptSummary": "Collaborative managed notebook analysis over BigQuery data.",
    "correctRationale": "Colab Enterprise notebooks connect to BigQuery, run Python with statistical packages and visualizations, and are shareable with the team — a managed collaborative environment. BigQuery ML doesn't produce the custom Python stats/plots, a Looker Studio dashboard isn't a Python analysis tool, and Connected Sheets can't run Python packages or complex statistical code.",
    "optionRationales": [
      "Correct: Colab Enterprise gives a managed, shareable Python notebook wired to BigQuery.",
      "Wrong: BigQuery ML plus Looker Studio skips the Python packages and statistical workflow entirely.",
      "Wrong: a Looker Studio dashboard is BI reporting, not collaborative Python analysis.",
      "Wrong: Connected Sheets lets you analyze BigQuery data in Sheets with pivots and charts, but it can't run Python packages or complex statistical code."
    ]
  },
  {
    "id": 63,
    "topic": "Security & Access",
    "difficulty": 3,
    "question": "You work for a financial services company that handles highly sensitive data. Due to regulatory requirements, your company is required to have complete and manual control of data encryption. Which type of keys should you recommend to use for data storage?",
    "options": [
      "A. Use customer-supplied encryption keys (CSEK).",
      "B. Use a dedicated third-party key management system (KMS) chosen by the company.",
      "C. Use Google-managed encryption keys (GMEK).",
      "D. Use customer-managed encryption keys (CMEK)."
    ],
    "correct": 0,
    "explanation": "CSEK keys are created, held, and supplied by you with each request — Google never stores them, giving complete manual control.",
    "discussion": [
      {
        "user": "rich_maverick",
        "text": "Selected Answer: D. CSEK is a dying deployment that is only supported by a few of the storage services. For compete and manual control of data encryption, you need to use CMEK."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 63,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "high",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Split A (2) vs D (1): commenters argued CMEK because CSEK support is limited to some services, but resolved to A — only CSEK keeps keys entirely in your hands. Independent review (Gemini, Oct 2026) confirmed A: CSEK keys are never stored by Google.",
    "conceptSummary": "Choosing the encryption key type for complete manual control.",
    "correctRationale": "Customer-supplied encryption keys live with you: you generate them, store them, and pass them with each request, and Google never persists them — that's the 'complete and manual control' the regulation wants. CMEK keys are managed by you but stored/operated inside Cloud KMS, the 'third-party KMS' option gestures at Cloud EKM without naming it, and GMEK gives no control at all. CSEK is supported on Cloud Storage and Compute Engine — adequate for 'data storage' here.",
    "optionRationales": [
      "Correct: CSEK means you hold and supply the keys; Google never stores them — total manual control.",
      "Wrong: the vague 'third-party KMS' option approximates Cloud EKM rather than a storage key choice.",
      "Wrong: GMEK hands all key control to Google — the opposite of the requirement.",
      "Wrong: CMEK gives you management but keys live in Cloud KMS under Google's operation — not fully manual control."
    ]
  },
  {
    "id": 62,
    "topic": "BigQuery & SQL",
    "difficulty": 3,
    "question": "Your company’s customer support audio files are stored in a Cloud Storage bucket. You plan to analyze the audio files’ metadata and file content within BigQuery to create inference by using BigQuery ML. You need to create a corresponding table in BigQuery that represents the bucket containing the audio files. What should you do?",
    "options": [
      "A. Create an external table.",
      "B. Create a temporary table.",
      "C. Create a native table.",
      "D. Create an object table."
    ],
    "correct": 3,
    "explanation": "Object tables represent unstructured files in a bucket — BigQuery ML reads the audio files themselves.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. object table due to audio files in cloud storage bucket"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. The best option is D. Object table. Option D is best because Object tables directly represent Cloud Storage buckets in BigQuery, letting you query file metadata and content for BigQuery ML. Option A (External table) is incorrect because while possible, Object tables are more specialized for Cloud Storage buckets. Option B (Temporary table) is incorrect because it's for short-term data, not ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 62,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous D (2 votes): object tables are built for unstructured files.",
    "conceptSummary": "Choosing the table type that exposes bucket files for ML inference.",
    "correctRationale": "Object tables index unstructured Cloud Storage objects (the audio files themselves) so BigQuery ML and remote models can infer against file content — external tables read structured row data in files, not file content as objects. Temporary tables vanish with the session, and native tables would require ingesting the audio.",
    "optionRationales": [
      "Wrong: external tables query structured data inside files (Parquet/CSV), not unstructured objects like audio.",
      "Wrong: a temporary table can't persistently represent the bucket.",
      "Wrong: a native table can't hold the audio files themselves.",
      "Correct: an object table represents the bucket's unstructured files so BigQuery ML can analyze content and metadata."
    ]
  },
  {
    "id": 61,
    "topic": "Security & Access",
    "difficulty": 1,
    "question": "You are a database administrator managing sales transaction data by region stored in a BigQuery table. You need to ensure that each sales representative can only see the transactions in their region. What should you do?",
    "options": [
      "A. Add a policy tag in BigQuery.",
      "B. Create a row-level access policy.",
      "C. Create a data masking rule.",
      "D. Grant the appropriate IAM permissions on the dataset."
    ],
    "correct": 1,
    "explanation": "Row-level access policies filter rows per user/principal — the native per-region control.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. The best option is B. Row-level access policy. Option B is best because row-level policies directly filter data by region for each rep. Option A (Policy tag) is incorrect because tags are for column-level control, not rows. Option C (Data masking) is incorrect because masking hides data, doesn't filter rows. Option D (IAM permissions) is incorrect because IAM controls dataset/table access, not ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 61,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for B: row-level policy for per-region filtering.",
    "conceptSummary": "Restricting table visibility per sales representative.",
    "correctRationale": "BigQuery row-level access policies filter the rows each principal sees — each rep gets only their region's transactions. Policy tags and masking act on columns not rows, and dataset-level IAM can't scope within a table.",
    "optionRationales": [
      "Wrong: policy tags control column access, not which rows each rep sees.",
      "Correct: a row-level access policy returns only each rep's region rows.",
      "Wrong: data masking obscures column values; it doesn't select rows.",
      "Wrong: dataset IAM grants the whole table to every rep."
    ]
  },
  {
    "id": 60,
    "topic": "Security & Access",
    "difficulty": 2,
    "question": "Your organization has highly sensitive data that gets updated once a day and is stored across multiple datasets in BigQuery. You need to provide a new data analyst access to query specific data in BigQuery while preventing access to sensitive data. What should you do?",
    "options": [
      "A. Grant the data analyst the BigQuery Job User IAM role in the Google Cloud project.",
      "B. Create a materialized view with the limited data in a new dataset. Grant the data analyst BigQuery Data Viewer IAM role in the dataset and the BigQuery Job User IAM role in the Google Cloud project.",
      "C. Create a new Google Cloud project, and copy the limited data into a BigQuery table. Grant the data analyst the BigQuery Data Owner IAM role in the new Google Cloud project.",
      "D. Grant the data analyst the BigQuery Data Viewer IAM role in the Google Cloud project."
    ],
    "correct": 1,
    "explanation": "A materialized view exposing only the allowed data plus Data Viewer on it gives restricted access with least privilege.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. The best option is B. Materialized view in new dataset + Data Viewer & Job User roles. Option B is best because it uses a view to limit data access and dataset-level permissions for least privilege. Option A (Job User only) is incorrect because it grants no data access. Option C (New project & Data Owner) is incorrect because it's overly complex and too permissive (Data Owner role). Option D ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 60,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for B: scope the data with a view, then IAM it.",
    "conceptSummary": "Granting query access to a data subset across multiple datasets.",
    "correctRationale": "A materialized view containing just the permitted data, shared via a dataset where the analyst has Data Viewer plus project-level Job User, lets them query without touching the sensitive base tables. Job User alone grants no data visibility, a separate project copy duplicates data, and project-level Data Viewer exposes everything.",
    "optionRationales": [
      "Wrong: Job User lets you run jobs but grants no read access to the data.",
      "Correct: an MV exposing only allowed data + scoped IAM roles grants query access to just that data.",
      "Wrong: a new project with copied data creates a stale duplicate and Data Owner is far too broad.",
      "Wrong: project-level Data Viewer reads all datasets, including the sensitive ones."
    ]
  },
  {
    "id": 59,
    "topic": "Orchestration & Monitoring",
    "difficulty": 3,
    "question": "You have a Dataproc cluster that performs batch processing on data stored in Cloud Storage. You need to schedule a daily Spark job to generate a report that will be emailed to stakeholders. You need a fully-managed solution that is easy to implement and minimizes complexity. What should you do?",
    "options": [
      "A. Use Cloud Composer to orchestrate the Spark job and email the report.",
      "B. Use Dataproc workflow templates to define and schedule the Spark job, and to email the report.",
      "C. Use Cloud Run functions to trigger the Spark job and email the report.",
      "D. Use Cloud Scheduler to trigger the Spark job, and use Cloud Run functions to email the report."
    ],
    "correct": 0,
    "explanation": "Composer is fully managed Airflow — it schedules the DAG, submits the Spark job, and emails the report, all in one.",
    "discussion": [
      {
        "user": "pico",
        "text": "Selected Answer: B. Define the workflow with the Spark job + a final shell job to send email in a single YAML file"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. dataproc worker template will work the best."
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. The best option is B. Dataproc workflow templates. Option B is best because workflow templates are built into Dataproc for simple Spark job scheduling. Option A (Composer) is incorrect because Composer is too complex for this simple task. Option C (Cloud Run trigger) is incorrect because Cloud Run is not for Dataproc job management. Option D (Cloud Scheduler + Cloud Run) is incorrect because it's ... (3 votes)"
      },
      {
        "user": "SaquibHerman",
        "text": "Selected Answer: A. Dataproc Workflow Templates are excellent for defining and scheduling Spark jobs, but they do not natively support emailing reports. (4 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 59,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "medium",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Community majority B (3 votes) vs A (1 vote, but the most upvoted comment): the bank overrides the community — Dataproc workflow templates don't self-schedule or send email, so only Composer actually delivers the scheduled job plus report. Independent review (Gemini, Oct 2026) confirmed A: Composer schedules, submits the Spark job and emails — workflow templates can neither schedule nor email.",
    "conceptSummary": "Scheduling a daily Spark job plus report email on managed infrastructure.",
    "correctRationale": "Dataproc workflow templates define a DAG of jobs but cannot schedule themselves (they must be triggered by Cloud Scheduler or Composer anyway) and have no built-in email step, so B as written isn't achievable. Cloud Composer schedules the daily DAG, submits the Spark job to the existing Dataproc cluster with a DataprocSubmitJobOperator, and emails the report with an email operator — one fully managed solution. Cloud Run functions can't self-schedule, and splitting scheduler and function across services adds glue.",
    "optionRationales": [
      "Correct: a Composer DAG schedules daily, submits the Spark job, and sends the email — fully managed in one service.",
      "Wrong: workflow templates can't schedule themselves and have no email action, so this option is not self-sufficient.",
      "Wrong: Cloud Run functions need an external trigger plus custom email code.",
      "Wrong: Scheduler + Cloud Run splits orchestration and reporting into two hand-wired services."
    ]
  },
  {
    "id": 58,
    "topic": "Pipelines & Processing",
    "difficulty": 2,
    "question": "Your company’s ecommerce website collects product reviews from customers. The reviews are loaded as CSV files daily to a Cloud Storage bucket. The reviews are in multiple languages and need to be translated to Spanish. You need to configure a pipeline that is serverless, efficient, and requires minimal maintenance. What should you do?",
    "options": [
      "A. Load the data into BigQuery using Dataproc. Use Apache Spark to translate the reviews by invoking the Cloud Translation API. Set BigQuery as the sink.",
      "B. Use a Dataflow templates pipeline to translate the reviews using the Cloud Translation API. Set BigQuery as the sink.",
      "C. Load the data into BigQuery using a Cloud Run function. Use the BigQuery ML create model statement to train a translation model. Use the model to translate the product reviews within BigQuery.",
      "D. Load the data into BigQuery using a Cloud Run function. Create a BigQuery remote function that invokes the Cloud Translation API. Use a scheduled query to translate new reviews."
    ],
    "correct": 1,
    "explanation": "A Dataflow templates pipeline calls the Cloud Translation API per review and writes to BigQuery, serverless with minimal upkeep.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. The best option is B. Dataflow template with Cloud Translation API. Option B is best because Dataflow templates are serverless, managed, and efficient for data pipelines like translation. Option A (Dataproc/Spark) is incorrect because Dataproc is not serverless and adds maintenance. Option C (Cloud Run/BigQuery ML) is incorrect because training a BigQuery ML model for translation is overly ..."
      },
      {
        "user": "SaquibHerman",
        "text": "Selected Answer: B. Dataflow is a fully managed (3 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 58,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "medium",
    "discussionSummary": "Unanimous B (2 votes): Dataflow templates calling Translation API.",
    "conceptSummary": "Serverless batch translation pipeline for incoming reviews.",
    "correctRationale": "Dataflow is serverless and a template (or flex template) can invoke the Cloud Translation API on each review as the daily CSV batch lands, then sink results to BigQuery — minimal maintenance. Dataproc clusters aren't serverless, BigQuery ML can't CREATE MODEL a translation model, and the remote-function-plus-scheduled-query chain works but adds parts to maintain.",
    "optionRationales": [
      "Wrong: Dataproc clusters aren't serverless.",
      "Correct: a Dataflow templates pipeline translates via Cloud Translation API and sinks to BigQuery, fully managed.",
      "Wrong: BigQuery ML's CREATE MODEL cannot train a translation model.",
      "Wrong: the Cloud Run loader + remote function + scheduled query chain works but has more pieces to maintain."
    ]
  },
  {
    "id": 57,
    "topic": "Looker & Visualization",
    "difficulty": 2,
    "question": "Your company uses Looker to visualize and analyze sales data. You need to create a dashboard that displays sales metrics, such as sales by region, product category, and time period. Each metric relies on its own set of attributes distributed across several tables. You need to provide users the ability to filter the data by specific sales representatives and view individual transactions. You want to follow the Google-recommended approach. What should you do?",
    "options": [
      "A. Create multiple Explores, each focusing on each sales metric. Link the Explores together in a dashboard using drill-down functionality.",
      "B. Use BigQuery to create multiple materialized views, each focusing on a specific sales metric. Build the dashboard using these views.",
      "C. Create a single Explore with all sales metrics. Build the dashboard using this Explore.",
      "D. Use Looker's custom visualization capabilities to create a single visualization that displays all the sales metrics with filtering and drill-down functionality."
    ],
    "correct": 2,
    "explanation": "One Explore joining the relevant tables lets a dashboard share filters and drill to individual transactions.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. The best option is C. Single Explore. Option C is best: Single Explore is Google's recommended way for dashboards with related metrics, offering unified filtering. Option A (Multiple Explores) is incorrect: Fragments user experience. Option B (Materialized Views) is incorrect: BigQuery optimization, not Looker dashboard design. Option D (Custom Visualization) is incorrect: Less efficient than ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 57,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C: a single Explore keeps filters and drill unified.",
    "conceptSummary": "Modeling a single Explore for multi-metric filterable dashboards.",
    "correctRationale": "A single Explore that joins the tables behind the metrics lets one dashboard share a sales-rep filter across all tiles and drill to transaction-level rows. Multiple Explores fragment filtering, materialized views lose transaction detail, and a custom visualization doesn't solve the modeling.",
    "optionRationales": [
      "Wrong: multiple Explores force tiles with different filter contexts, breaking shared filtering.",
      "Wrong: materialized views aggregate away the transaction-level drill requirement.",
      "Correct: one Explore joining all the tables gives shared filters plus drill to transactions.",
      "Wrong: a custom visualization doesn't fix the underlying fragmented model."
    ]
  },
  {
    "id": 56,
    "topic": "Machine Learning",
    "difficulty": 1,
    "question": "You used BigQuery ML to build a customer purchase propensity model six months ago. You want to compare the current serving data with the historical serving data to determine whether you need to retrain the model. What should you do?",
    "options": [
      "A. Compare the two different models.",
      "B. Evaluate the data skewness.",
      "C. Evaluate data drift.",
      "D. Compare the confusion matrix."
    ],
    "correct": 2,
    "explanation": "Comparing current serving data to historical serving data over time is data drift, evaluated with ML.VALIDATE_DATA_DRIFT.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. The best option is C. Evaluate data drift. Option C is best because data drift specifically refers to changes in data distribution over time, directly indicating if the current serving data differs from the historical data the model was trained on, thus signaling a need for retraining. Option A (Compare models) is incorrect because comparing models doesn't directly assess changes in serving data. ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 56,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C, matching the snippet's suggested answer C.",
    "conceptSummary": "Detecting serving-data drift before retraining.",
    "correctRationale": "Data drift measures how the distribution of serving inputs has moved relative to earlier serving data — exactly the check that tells you whether retraining is needed (BigQuery ML has ML.VALIDATE_DATA_DRIFT). Skew is training-vs-serving at one time, and comparing models or confusion matrices evaluates metrics rather than data.",
    "optionRationales": [
      "Wrong: comparing models evaluates model metrics, not input data distribution.",
      "Wrong: skew compares training vs serving data, not serving data over time.",
      "Correct: drift evaluation compares current vs historical serving data — the retraining signal.",
      "Wrong: a confusion matrix measures classification performance, not data change."
    ]
  },
  {
    "id": 55,
    "topic": "Security & Access",
    "difficulty": 3,
    "question": "Your organization stores highly personal data in BigQuery and needs to comply with strict data privacy regulations. You need to ensure that sensitive data values are rendered unreadable whenever an employee leaves the organization. What should you do?",
    "options": [
      "A. Use AEAD functions and delete keys when employees leave the organization.",
      "B. Use dynamic data masking and revoke viewer permissions when employees leave the organization.",
      "C. Use customer-managed encryption keys (CMEK) and delete keys when employees leave the organization.",
      "D. Use column-level access controls with policy tags and revoke viewer permissions when employees leave the organization."
    ],
    "correct": 0,
    "explanation": "AEAD per-employee keysets enable crypto-shredding — delete the keyset and that person's data is permanently unreadable.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. The best option is A. Use AEAD functions and delete keys when employees leave the organization. Option A is best because AEAD encryption makes data values unreadable by design when keys are deleted, directly meeting the requirement. Option B (Dynamic masking) is incorrect because masking only hides data, not making it unreadable at the storage level. Option C (CMEK) is less ideal than AEAD for ..."
      },
      {
        "user": "rich_maverick",
        "text": "Selected Answer: D. You don't delete data record keys (row, tags, columns, KMS, etc..) when an employee leaves the company as that will make the data unusable for everyone who remains. That means that A and C are plain wrong. Using policy tags and removing viewer access to data tagged as sensitive is the easiest answer. (2 votes)"
      },
      {
        "user": "SaquibHerman",
        "text": "Selected Answer: A. With AEAD, we can target specific fields and ensure that only sensitive data is affected when an employee leaves, which is more efficient than locking down the entire dataset using CMEK. (2 votes)"
      },
      {
        "user": "a_vi",
        "text": "Selected Answer: A. AEAD looks the best option here."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 55,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "medium",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Split A (3) vs D (1): resolved to A — crypto-shredding via AEAD is the only option that makes values truly unreadable, not merely hidden. Independent review (Gemini, Oct 2026) confirmed A: crypto-shredding with per-user AEAD keysets is the only true unreadability.",
    "conceptSummary": "Crypto-shredding individual employees' sensitive values.",
    "correctRationale": "Encrypting sensitive values with AEAD functions using per-employee (or per-entity) keysets means deleting a keyset permanently renders that person's data unreadable — the 'make values unreadable when they leave' requirement. Masking and policy tags only hide data from that viewer while it stays readable to others, and CMEK protects whole tables — destroying the key breaks everything, not just the target.",
    "optionRationales": [
      "Correct: AEAD keysets make the departed employee's values unrecoverable when the keyset is destroyed.",
      "Wrong: masking blocks that viewer only; the underlying data is still readable to others.",
      "Wrong: deleting a CMEK key would brick the whole table/dataset, not just the target values.",
      "Wrong: column-level policy tags again only control viewing, not render data unreadable."
    ]
  },
  {
    "id": 54,
    "topic": "Security & Access",
    "difficulty": 1,
    "question": "You are a data analyst working with sensitive customer data in BigQuery. You need to ensure that only authorized personnel within your organization can query this data, while following the principle of least privilege. What should you do?",
    "options": [
      "A. Enable access control by using IAM roles.",
      "B. Encrypt the data by using customer-managed encryption keys (CMEK).",
      "C. Update dataset privileges by using the SQL GRANT statement.",
      "D. Export the data to Cloud Storage, and use signed URLs to authorize access."
    ],
    "correct": 0,
    "explanation": "IAM roles are the standard least-privilege access control for BigQuery data.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. The best option is A. Enable access control by using IAM roles. Option A is optimal because IAM roles are the standard Google Cloud method for managing access, directly enabling least privilege for BigQuery. Option B (CMEK) is incorrect because encryption secures data but doesn't control access. Option C (SQL GRANT) is less preferred than IAM for broader GCP access management. Option D (Export ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 54,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for A, matching the snippet's suggested answer A.",
    "conceptSummary": "Least-privilege access control on a sensitive dataset.",
    "correctRationale": "Granting IAM roles (e.g., BigQuery Data Viewer at dataset/table scope plus Job User for running queries) is the canonical least-privilege mechanism. CMEK encrypts rather than authorizes, SQL GRANT wraps the same IAM layer (IAM remains the recommended control), and exporting with signed URLs moves data out of the governed system.",
    "optionRationales": [
      "Correct: IAM roles at the dataset/table level are the standard least-privilege control.",
      "Wrong: CMEK encrypts data but is not an authorization mechanism.",
      "Wrong: SQL GRANT maps onto IAM anyway; IAM is the recommended answer here.",
      "Wrong: exporting with signed URLs exfiltrates data beyond your access governance."
    ]
  },
  {
    "id": 53,
    "topic": "Looker & Visualization",
    "difficulty": 1,
    "question": "Your company uses Looker as its primary business intelligence platform. You want to use LookML to visualize the profit margin for each of your company’s products in your Looker Explores and dashboards. You need to implement a solution quickly and efficiently. What should you do?",
    "options": [
      "A. Create a derived table that pre-calculates the profit margin for each product, and include it in the Looker model.",
      "B. Define a new measure that calculates the profit margin by using the existing revenue and cost fields.",
      "C. Create a new dimension that categorizes products based on their profit margin ranges (e.g., high, medium, low).",
      "D. Apply a filter to only show products with a positive profit margin."
    ],
    "correct": 1,
    "explanation": "A LookML measure computes margin at any grouping and is the fast, correct Looker way.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. The best option is B. Define a new measure. Option B is best: Measures are for on-the-fly calculations in Looker, quick & efficient. Option A (Derived table) is incorrect: Slower, pre-calculation not needed. Option C (New dimension) is incorrect: Dimensions are for categories, not metrics. Option D (Apply filter) is incorrect: Filter restricts data, doesn't calculate margin. Therefore, Option B, ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 53,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for B: a measure is the right LookML construct.",
    "conceptSummary": "Adding a profit-margin measure in LookML.",
    "correctRationale": "A measure such as type: number with (sum(revenue) − sum(cost)) / sum(revenue) computes margin correctly at whatever grouping the Explore uses — quick and reusable. A derived table is heavier, a categorizing dimension doesn't compute margin, and a filter computes nothing.",
    "optionRationales": [
      "Wrong: a derived table pre-computes per product, losing flexibility for other groupings.",
      "Correct: a measure computes margin dynamically at any grouping in Explores and dashboards.",
      "Wrong: bucketing margin into categories doesn't compute margin itself.",
      "Wrong: filtering for positive margins shows a subset; it doesn't calculate margin."
    ]
  },
  {
    "id": 52,
    "topic": "Storage Selection",
    "difficulty": 2,
    "question": "Your retail company collects customer data from various sources:\nOnline transactions: Stored in a MySQL database\nCustomer feedback: Stored as text files on a company server\nSocial media activity: Streamed in real-time from social media platforms\nYou are designing a data pipeline to extract this data. Which Google Cloud storage system(s) should you select for further analysis and ML model training?",
    "options": [
      "A. 1. Online transactions: Cloud Storage 2. Customer feedback: Cloud Storage 3. Social media activity: Cloud Storage",
      "B. 1. Online transactions: BigQuery 2. Customer feedback: Cloud Storage 3. Social media activity: BigQuery",
      "C. 1. Online transactions: Bigtable 2. Customer feedback: Cloud Storage 3. Social media activity: CloudSQL for MySQL",
      "D. 1. Online transactions: Cloud SQL for MySQL 2. Customer feedback: BigQuery 3. Social media activity: Cloud Storage"
    ],
    "correct": 1,
    "explanation": "Transactions and streams belong in BigQuery for analytics and ML; unstructured feedback files belong in Cloud Storage.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. storing online transactions would be good to put into BigQuery for analytics."
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. online = cloud sql\n\ntext file = cloud storage\n\nstream = bigquery / bigtable (if data pipeline, use dataflow to stream)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 52,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous B (2 votes): BigQuery for analytics, GCS for unstructured files.",
    "conceptSummary": "Mapping three data sources to the right analytics stores.",
    "correctRationale": "For analysis and ML: online transactional records land in BigQuery for SQL analytics, unstructured text feedback lands in Cloud Storage, and real-time social streams stream into BigQuery via streaming ingestion. Putting everything in Cloud Storage loses SQL analytics, Bigtable/Cloud SQL choices are wrong fits, and Cloud SQL is OLTP rather than analytics.",
    "optionRationales": [
      "Wrong: storing all three in Cloud Storage loses SQL analytics and ready ML access.",
      "Correct: transactions→BigQuery, feedback files→Cloud Storage, streams→BigQuery matches each source to its analysis path.",
      "Wrong: Bigtable for transactions and Cloud SQL for social streams are the wrong engines.",
      "Wrong: Cloud SQL is OLTP — poor fit for analysis — and landing streams in Cloud Storage delays analytics."
    ]
  },
  {
    "id": 51,
    "topic": "Lifecycle & Availability",
    "difficulty": 1,
    "question": "You are constructing a data pipeline to process sensitive customer data stored in a Cloud Storage bucket. You need to ensure that this data remains accessible, even in the event of a single-zone outage. What should you do?",
    "options": [
      "A. Set up a Cloud CDN in front of the bucket.",
      "B. Enable Object Versioning on the bucket.",
      "C. Store the data in a multi-region bucket.",
      "D. Store the data in Nearline storage."
    ],
    "correct": 2,
    "explanation": "A multi-region bucket stores data redundantly across regions, so a zonal outage can't take it offline.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. multi region to compensate for single zone outage disaster"
      },
      {
        "user": "rich_maverick",
        "text": "Selected Answer: C. Choosing C only because all the other answers are stupid. A) Setting up a CDN does not ensure High Availability (single zone outage). B) Versioning does not improve file access or HA. D) Storage class is irrelevant to availability. C) is the only answer that improved availability. However, the ask was for High Availability and not Disaster Recovery which would require multi-region for an answer. ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 51,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous C (2 votes): multi-region for zone-outage resilience.",
    "conceptSummary": "Surviving a zonal outage via multi-region storage.",
    "correctRationale": "Multi-region buckets replicate data across regions (and every regional bucket already spans zones), so a single-zone failure cannot affect availability — the only option that addresses topology. CDN caches public content, versioning protects against deletion not outages, and storage class changes cost rather than availability.",
    "optionRationales": [
      "Wrong: Cloud CDN caches public web content; it doesn't give the pipeline HA.",
      "Wrong: Object Versioning protects against overwrite/delete, not zone failures.",
      "Correct: multi-region redundancy makes a zonal outage invisible to the pipeline.",
      "Wrong: a storage class changes cost/latency profile, not redundancy."
    ]
  },
  {
    "id": 50,
    "topic": "BigQuery & SQL",
    "difficulty": 2,
    "question": "Your organization’s ecommerce website collects user activity logs using a Pub/Sub topic. Your organization’s leadership team wants a dashboard that contains aggregated user engagement metrics. You need to create a solution that transforms the user activity logs into aggregated metrics, while ensuring that the raw data can be easily queried. What should you do?",
    "options": [
      "A. Create a Dataflow subscription to the Pub/Sub topic, and transform the activity logs. Load the transformed data into a BigQuery table for reporting.",
      "B. Create an event-driven Cloud Run function to trigger a data transformation pipeline to run. Load the transformed activity logs into a BigQuery table for reporting.",
      "C. Create a Cloud Storage subscription to the Pub/Sub topic. Load the activity logs into a bucket using the Avro file format. Use Dataflow to transform the data, and load it into a BigQuery table for reporting.",
      "D. Create a BigQuery subscription to the Pub/Sub topic, and load the activity logs into the table. Create a materialized view in BigQuery using SQL to transform the data for reporting"
    ],
    "correct": 3,
    "explanation": "A BigQuery subscription lands raw logs in a table, and a materialized view aggregates them for the dashboard.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. D. Keeps original data easily queried, while also transforming into BQ."
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. Option D is the clear winner. BigQuery subscriptions + materialized views are purpose-built for this. Dataflow (A) works, but is more overhead. Cloud Run (B) isn't suitable for continuous processing, and Cloud Storage (C) adds unnecessary steps. Option D is the most efficient and keeps the raw data accessible. (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 50,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous D (2 votes): keep raw data in BigQuery and aggregate with a materialized view.",
    "conceptSummary": "Keeping raw Pub/Sub logs queryable while serving aggregates.",
    "correctRationale": "A BigQuery subscription writes Pub/Sub messages directly into a table preserving the raw data, and a materialized view precomputes the aggregated metrics for dashboards. The Dataflow/Cloud Run options transform-and-drop the raw form, and the Cloud Storage path stores Avro files that aren't easily queried without extra steps.",
    "optionRationales": [
      "Wrong: the Dataflow subscription stores only transformed data — raw logs are lost.",
      "Wrong: a Cloud Run glue pipeline still doesn't keep raw data queryable.",
      "Wrong: Avro files in Cloud Storage need extra steps before they're queryable.",
      "Correct: a BigQuery subscription keeps raw logs in a table while the MV serves the dashboard."
    ]
  },
  {
    "id": 49,
    "topic": "Looker & Visualization",
    "difficulty": 3,
    "question": "You are a Looker analyst. You need to add a new field to your Looker report that generates SQL that will run against your company's database. You do not have the Develop permission. What should you do?",
    "options": [
      "A. Create a new field in the LookML layer, refresh your report, and select your new field from the field picker.",
      "B. Create a calculated field using the Add a field option in Looker Studio, and add it to your report.",
      "C. Create a table calculation from the field picker in Looker, and add it to your report.",
      "D. Create a custom field from the field picker in Looker, and add it to your report."
    ],
    "correct": 3,
    "explanation": "Custom fields from the field picker generate database SQL without needing the Develop permission.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. \"run against company database\" would be D"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. Custom fields (Option D) are specifically designed to allow users without Develop permissions to create new fields that generate SQL and run against the database. This is the direct answer to the question. Table calculations (Option C) are a common point of confusion, but they operate on the results of a query, not the underlying database. LookML changes (Option A) require Develop permissions, ... (2 votes)"
      },
      {
        "user": "A4M",
        "text": "Selected Answer: D. use custom to meet the requirement here, table calculations are used for building calculations on the fly in looker (2 votes)"
      },
      {
        "user": "a_vi",
        "text": "Selected Answer: C. Create a table calculation from the field picker in Looker, and add it to your report."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 49,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "high",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Split D (3) vs C (1): resolved to D — only custom fields generate SQL without Develop access. Independent review (Gemini, Oct 2026) confirmed D: custom fields compile into the SQL sent to the database.",
    "conceptSummary": "Adding computed fields in Looker without developer rights.",
    "correctRationale": "Looker custom fields (custom dimensions/measures) are created right from the Explore field picker by users without Develop permission, and they generate SQL that runs in the database. LookML requires Develop permission, Looker Studio is a different product, and table calculations run client-side on returned rows rather than in the database.",
    "optionRationales": [
      "Wrong: LookML edits need the Develop permission the analyst lacks.",
      "Wrong: Looker Studio is a different product — the field is needed in Looker.",
      "Wrong: table calculations compute in the browser on fetched results; they don't generate database SQL.",
      "Correct: custom fields generate SQL in the database and need no Develop permission."
    ]
  },
  {
    "id": 48,
    "topic": "Ingestion & Transfer",
    "difficulty": 1,
    "question": "Your company currently uses an on-premises network file system (NFS) and is migrating data to Google Cloud. You want to be able to control how much bandwidth is used by the data migration while capturing detailed reporting on the migration status. What should you do?",
    "options": [
      "A. Use a Transfer Appliance.",
      "B. Use Cloud Storage FUSE.",
      "C. Use Storage Transfer Service.",
      "D. Use gcloud storage commands."
    ],
    "correct": 2,
    "explanation": "Storage Transfer Service supports NFS sources with per-agent-pool bandwidth limits and detailed reporting.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. STS can control bandwidth used by data migration."
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. Storage Transfer Service is the most appropriate solution because it directly addresses both requirements: bandwidth control and detailed reporting, specifically for data migration to Google Cloud Storage from sources like NFS."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 48,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous C (2 votes): STS has the bandwidth controls and reporting.",
    "conceptSummary": "Online NFS migration with bandwidth control and reporting.",
    "correctRationale": "Storage Transfer Service agent-based transfers read NFS sources, let you cap bandwidth per agent pool, and give per-file transfer logging/monitoring — all three requirements in one service. Transfer Appliance is offline with no bandwidth control, FUSE mounts a bucket rather than migrating, and gcloud storage has no bandwidth cap or structured reporting.",
    "optionRationales": [
      "Wrong: Transfer Appliance is an offline device — no bandwidth limit applies.",
      "Wrong: Cloud Storage FUSE mounts a bucket as a filesystem; it isn't a migration tool.",
      "Correct: STS agent-based transfer supports NFS, bandwidth caps, and detailed reporting.",
      "Wrong: gcloud storage copies but has no built-in bandwidth limit or migration reporting."
    ]
  },
  {
    "id": 47,
    "topic": "Looker & Visualization",
    "difficulty": 2,
    "question": "You work for a home insurance company. You are frequently asked to create and save risk reports with charts for specific areas using a publicly available storm event dataset. You want to be able to quickly create and re-run risk reports when new data becomes available. What should you do?",
    "options": [
      "A. Export the storm event dataset as a CSV file. Import the file to Google Sheets, and use cell data in the worksheets to create charts.",
      "B. Copy the storm event dataset into your BigQuery project. Use BigQuery Studio to query and visualize the data in Looker Studio.",
      "C. Reference and query the storm event dataset using SQL in BigQuery Studio. Export the results to Google Sheets, and use cell data in the worksheets to create charts.",
      "D. Reference and query the storm event dataset using SQL in a Colab Enterprise notebook. Display the table results and document with Markdown, and use Matplotlib to create charts."
    ],
    "correct": 3,
    "explanation": "A Colab Enterprise notebook re-runs the query, documents the report in Markdown, and renders Matplotlib charts in one artifact.",
    "discussion": [
      {
        "user": "7aa2aea",
        "text": "Selected Answer: D. D is correct because the public datasets are continually updated and allow us to re-run immediately and see the latest information. Colab Enterprise notebooks are saved and hence we have the ability to re-run as needed. The markdown produces annotations and report text and Matplotlib provides charts and graphs.\n\nB is not correct because we are copying public data into our dataset rather than ..."
      },
      {
        "user": "ani3760",
        "text": "Selected Answer: D. D is correct because the public datasets are continually updated and allow us to re-run immediately and see the latest information. Colab Enterprise notebooks are saved and hence we have the ability to re-run as needed. The markdown produces annotations and report text and Matplotlib provides charts and graphs."
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. bigquery studio + looker studio for visualization and making \"reports\" in looker studio."
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. While Option D offers flexibility and control, it's more technical and less focused on quick and easy report generation for a business user. Options A and C are too manual and less scalable for the stated requirements of frequent report generation with new data.\n\nFinal Answer: B"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 47,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "medium",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Split 2–2 between B and D: resolved to D — the notebook is re-runnable end-to-end while the copied-dataset path goes stale. Independent review (Gemini, Oct 2026) confirmed D: querying the live public dataset keeps the notebook a re-runnable report.",
    "conceptSummary": "Re-runnable storm-risk reports combining query, narrative, and charts.",
    "correctRationale": "A Colab Enterprise notebook queries the public dataset in place (it's kept updated), documents the report in Markdown, and renders charts with Matplotlib — one artifact you re-run when new data arrives. Sheets exports are static/manual, and copying the dataset makes a stale copy you'd have to refresh.",
    "optionRationales": [
      "Wrong: exporting to Sheets is manual and the charts don't refresh with new data.",
      "Wrong: copying the public dataset into your project creates a stale copy you must refresh.",
      "Wrong: the query result export to Sheets is still a static, manual workflow.",
      "Correct: a scheduled/re-runnable Colab notebook with SQL + Markdown + Matplotlib is the repeatable report."
    ]
  },
  {
    "id": 46,
    "topic": "Pipelines & Processing",
    "difficulty": 2,
    "question": "You work for an online retail company. Your company collects customer purchase data in CSV files and pushes them to Cloud Storage every 10 minutes. The data needs to be transformed and loaded into BigQuery for analysis. The transformation involves cleaning the data, removing duplicates, and enriching it with product information from a separate table in BigQuery. You need to implement a low-overhead solution that initiates data processing as soon as the files are loaded into Cloud Storage. What should you do?",
    "options": [
      "A. Use Cloud Composer sensors to detect files loading in Cloud Storage. Create a Dataproc cluster, and use a Composer task to execute a job on the cluster to process and load the data into BigQuery.",
      "B. Schedule a direct acyclic graph (DAG) in Cloud Composer to run hourly to batch load the data from Cloud Storage to BigQuery, and process the data in BigQuery using SQL.",
      "C. Use Dataflow to implement a streaming pipeline using an OBJECT_FINALIZE notification from Pub/Sub to read the data from Cloud Storage, perform the transformations, and write the data to BigQuery.",
      "D. Create a Cloud Data Fusion job to process and load the data from Cloud Storage into BigQuery. Create an OBJECT_FINALIZE notification in Pub/Sub, and trigger a Cloud Run function to start the Cloud Data Fusion job as soon as new files are loaded."
    ],
    "correct": 2,
    "explanation": "OBJECT_FINALIZE events via Pub/Sub trigger a Dataflow streaming pipeline that transforms and enriches each file on arrival.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. dataflow with pub/sub is lowest overhead for real-time"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. The best solution is C. Dataflow with Pub/Sub notifications. Dataflow offers low-overhead, real-time streaming, ideal for immediate processing of files as they land in Cloud Storage, and handles the required transformations efficiently before loading into BigQuery. Option A (Composer/Dataproc) is too heavyweight and costly for frequent, small batches. Option B (Composer Hourly Batch) is too slow, ... (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 46,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous C (2 votes): event-driven Dataflow.",
    "conceptSummary": "File-arrival-triggered streaming enrichment pipeline.",
    "correctRationale": "Cloud Storage emits OBJECT_FINALIZE notifications through Pub/Sub, and a Dataflow streaming pipeline consumes them to transform, dedupe, and enrich against BigQuery as files land — fully managed and immediate. Composer plus a Dataproc cluster is heavy, hourly batching adds latency, and Data Fusion with Cloud Run glue is more moving parts.",
    "optionRationales": [
      "Wrong: Composer sensors plus a Dataproc cluster is heavy for file-arrival processing.",
      "Wrong: hourly batching doesn't start processing when files arrive.",
      "Correct: OBJECT_FINALIZE → Pub/Sub → streaming Dataflow handles files immediately with enrichment.",
      "Wrong: Data Fusion plus a Cloud Run trigger adds moving parts and per-run startup latency."
    ]
  },
  {
    "id": 45,
    "topic": "Pipelines & Processing",
    "difficulty": 2,
    "question": "You need to create a data pipeline that streams event information from applications in multiple Google Cloud regions into BigQuery for near real-time analysis. The data requires transformation before loading. You want to create the pipeline using a visual interface. What should you do?",
    "options": [
      "A. Push event information to a Pub/Sub topic. Create a Dataflow job using the Dataflow job builder.",
      "B. Push event information to a Pub/Sub topic. Create a Cloud Run function to subscribe to the Pub/Sub topic, apply transformations, and insert the data into BigQuery.",
      "C. Push event information to a Pub/Sub topic. Create a BigQuery subscription in Pub/Sub.",
      "D. Push event information to Cloud Storage, and create an external table in BigQuery. Create a BigQuery scheduled job that executes once each day to apply transformations."
    ],
    "correct": 0,
    "explanation": "Pub/Sub is multi-region and the Dataflow job builder gives a visual way to build the streaming pipeline.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. dataflow job builder is visual & dataflow is real-time"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. The best solution is A. Push event information to a Pub/Sub topic. Create a Dataflow job using the Dataflow job builder. This is because it directly addresses all requirements: streaming data from multiple regions using Pub/Sub, transformations within Dataflow, near real-time analysis with Dataflow streaming pipelines, and a visual interface using the Dataflow Job Builder. Option B (Cloud Run) is ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 45,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous A (2 votes): Dataflow job builder is the visual path.",
    "conceptSummary": "Visual construction of a multi-region streaming pipeline.",
    "correctRationale": "Pub/Sub topics accept publishes from any region (global endpoint), and the Dataflow job builder is the visual canvas for assembling streaming pipelines with transforms before loading to BigQuery. Cloud Run is code not visual, a BigQuery subscription does no transformation, and daily batch isn't near real-time.",
    "optionRationales": [
      "Correct: Pub/Sub intake plus the visual Dataflow job builder satisfies multi-region streaming with transforms.",
      "Wrong: a Cloud Run function is custom code, not a visual interface.",
      "Wrong: a BigQuery subscription writes raw messages with no transformation.",
      "Wrong: an external table plus daily scheduled job is batch, not near real-time."
    ]
  },
  {
    "id": 44,
    "topic": "BigQuery & SQL",
    "difficulty": 1,
    "question": "Your organization’s business analysts require near real-time access to streaming data. However, they are reporting that their dashboard queries are loading slowly. After investigating BigQuery query performance, you discover the slow dashboard queries perform several joins and aggregations.\nYou need to improve the dashboard loading time and ensure that the dashboard data is as up-to-date as possible. What should you do?",
    "options": [
      "A. Disable BigQuery query result caching.",
      "B. Modify the schema to use parameterized data types.",
      "C. Create a scheduled query to calculate and store intermediate results.",
      "D. Create materialized views."
    ],
    "correct": 3,
    "explanation": "Materialized views precompute the joins and aggregations and stay fresh between queries.",
    "discussion": [
      {
        "user": "Rio55",
        "text": "Selected Answer: D. Materialized views automatically update when the underlying base tables change."
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. D. to improve load time, use materialized views for bigquery"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 44,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous D (2 votes): materialized views.",
    "conceptSummary": "Speeding up join-heavy dashboards with materialized views.",
    "correctRationale": "Materialized views precompute joins and aggregations and refresh incrementally as data changes, so dashboard queries hit precomputed results and stay up to date. Disabling cache only slows things, parameterized types are unrelated, and scheduled intermediate results go stale between runs.",
    "optionRationales": [
      "Wrong: disabling result caching makes repeat queries slower, not faster.",
      "Wrong: parameterized data types are irrelevant to join/aggregation speed.",
      "Wrong: scheduled intermediate results are stale between runs — MVs refresh incrementally.",
      "Correct: materialized views precompute and stay current for fast, fresh dashboards."
    ]
  },
  {
    "id": 43,
    "topic": "Orchestration & Monitoring",
    "difficulty": 2,
    "question": "You have a Dataflow pipeline that processes website traffic logs stored in Cloud Storage and writes the processed data to BigQuery. You noticed that the pipeline is failing intermittently. You need to troubleshoot the issue. What should you do?",
    "options": [
      "A. Use Cloud Logging to identify error groups in the pipeline's logs. Use Cloud Monitoring to create a dashboard that tracks the number of errors in each group.",
      "B. Use Cloud Logging to create a chart displaying the pipeline’s error logs. Use Metrics Explorer to validate the findings from the chart.",
      "C. Use Cloud Logging to view error messages in the pipeline's logs. Use Cloud Monitoring to analyze the pipeline's metrics, such as CPU utilization and memory usage.",
      "D. Use the Dataflow job monitoring interface to check the pipeline's status every hour. Use Cloud Profiler to analyze the pipeline’s metrics, such as CPU utilization and memory usage."
    ],
    "correct": 2,
    "explanation": "Read the error messages in Cloud Logging, then correlate with CPU and memory metrics in Cloud Monitoring.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. C. looks into logs of pipeline / dataflow workers"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. The best approach for troubleshooting intermittent Dataflow pipeline failures is C. Use Cloud Logging to view error messages and Cloud Monitoring to analyze pipeline metrics. This is most effective because Cloud Logging error messages pinpoint what is failing, while Cloud Monitoring metrics reveal why, often due to resource issues. Option A is less detailed and comprehensive. Option B is less ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 43,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous C (2 votes): logs + metrics together.",
    "conceptSummary": "Troubleshooting intermittent Dataflow failures with logs plus metrics.",
    "correctRationale": "Intermittent failures need both signals: Cloud Logging shows the actual error text at the time of failure, and Cloud Monitoring metrics (CPU, memory, throughput) reveal the correlated resource cause. Error groups count occurrences without diagnosis, chart-then-Metrics-Explorer is indirect, and hourly manual checks plus Cloud Profiler miss timing and target the wrong tool.",
    "optionRationales": [
      "Wrong: error grouping and dashboards track counts but don't explain this failure.",
      "Wrong: charting logs then pivoting to Metrics Explorer is an indirect path to the same signals C reads directly.",
      "Correct: error messages in Logging plus pipeline metrics in Monitoring diagnose intermittent failures directly.",
      "Wrong: manual hourly checks are slow, and Cloud Profiler profiles code rather than pipeline health."
    ]
  },
  {
    "id": 42,
    "topic": "Storage Selection",
    "difficulty": 1,
    "question": "Your organization needs to store historical customer order data. The data will only be accessed once a month for analysis and must be readily available within a few seconds when it is accessed. You need to choose a storage class that minimizes storage costs while ensuring that the data can be retrieved quickly. What should you do?",
    "options": [
      "A. Store the data in Cloud Storage using Nearline storage.",
      "B. Store the data in Cloud Storage using Coldline storage.",
      "C. Store the data in Cloud Storage using Standard storage.",
      "D. Store the data in Cloud Storage using Archive storage."
    ],
    "correct": 0,
    "explanation": "Nearline is designed for roughly-monthly access — all classes read in milliseconds but Nearline minimizes cost.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. standard - multiple times a month\n\nnearline - once a month\n\ncoldline - once 3 months\n\narchive - once 1 year (2 votes)"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. The best option is A. Store the data in Cloud Storage using Nearline storage. Nearline provides the optimal balance of minimizing storage costs while ensuring data is readily available within a few seconds when accessed monthly. Coldline (B) is cheaper storage but has higher latency and retrieval costs, potentially making it slightly slower and more expensive for monthly access. Standard (C) is ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 42,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous A (2 votes): monthly access = Nearline.",
    "conceptSummary": "Picking the right storage class for monthly access.",
    "correctRationale": "Nearline targets data accessed about once a month with a 30-day minimum duration — the right cost/availability trade for monthly analytics. Coldline and Archive charge retrieval fees with 90/365-day minimums, and Standard costs more to store for data accessed this rarely.",
    "optionRationales": [
      "Correct: Nearline matches ~monthly access — milliseconds-fast reads at a lower storage cost.",
      "Wrong: Coldline's retrieval fees and 90-day minimum suit quarterly access, not monthly.",
      "Wrong: Standard is more expensive to store for rarely accessed data.",
      "Wrong: Archive's 365-day minimum and retrieval costs fit yearly access, not monthly."
    ]
  },
  {
    "id": 41,
    "topic": "Pipelines & Processing",
    "difficulty": 1,
    "question": "Your organization needs to implement near real-time analytics for thousands of events arriving each second in Pub/Sub. The incoming messages require transformations. You need to configure a pipeline that processes, transforms, and loads the data into BigQuery while minimizing development time. What should you do?",
    "options": [
      "A. Use a Google-provided Dataflow template to process the Pub/Sub messages, perform transformations, and write the results to BigQuery.",
      "B. Create a Cloud Data Fusion instance and configure Pub/Sub as a source. Use Data Fusion to process the Pub/Sub messages, perform transformations, and write the results to BigQuery.",
      "C. Load the data from Pub/Sub into Cloud Storage using a Cloud Storage subscription. Create a Dataproc cluster, use PySpark to perform transformations in Cloud Storage, and write the results to BigQuery.",
      "D. Use Cloud Run functions to process the Pub/Sub messages, perform transformations, and write the results to BigQuery."
    ],
    "correct": 0,
    "explanation": "The Google-provided Pub/Sub-to-BigQuery Dataflow template minimizes development for thousands of events per second.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. dataflow is real-time"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. The best solution to minimize development time while implementing near real-time analytics for high-volume Pub/Sub events with transformations and BigQuery loading is A. Use a Google-provided Dataflow template. Dataflow templates offer pre-built, optimized pipelines, drastically reducing development effort and time. Option B, Cloud Data Fusion, is a good visual alternative, but might require ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 41,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous A (2 votes): the template is the minimal-dev answer.",
    "conceptSummary": "Minimal-dev streaming Pub/Sub transform to BigQuery.",
    "correctRationale": "The managed Dataflow template handles Pub/Sub ingestion, UDF transformation, and BigQuery writes with no custom service to build or operate. Data Fusion realtime pipelines require an instance, the GCS-then-Dataproc path is a batch detour, and Cloud Run functions are custom code with scaling limits.",
    "optionRationales": [
      "Correct: the Google-provided template does stream ingest + transform + load with minimal dev.",
      "Wrong: Data Fusion realtime pipelines need a provisioned instance — more effort and cost.",
      "Wrong: detouring to Cloud Storage then a Dataproc cluster is batch, not streaming.",
      "Wrong: custom Cloud Run functions need code and scale poorly for this."
    ]
  },
  {
    "id": 40,
    "topic": "Pipelines & Processing",
    "difficulty": 1,
    "question": "You are working on a data pipeline that will validate and clean incoming data before loading it into BigQuery for real-time analysis. You want to ensure that the data validation and cleaning is performed efficiently and can handle high volumes of data. What should you do?",
    "options": [
      "A. Write custom scripts in Python to validate and clean the data outside of Google Cloud. Load the cleaned data into BigQuery.",
      "B. Use Cloud Run functions to trigger data validation and cleaning routines when new data arrives in Cloud Storage.",
      "C. Use Dataflow to create a streaming pipeline that includes validation and transformation steps.",
      "D. Load the raw data into BigQuery using Cloud Storage as a staging area, and use SQL queries in BigQuery to validate and clean the data."
    ],
    "correct": 2,
    "explanation": "A streaming Dataflow pipeline validates and cleanses high-volume data before it lands in BigQuery.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. C. Dataflow is real-time (3 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 40,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C: stream-validation before load.",
    "conceptSummary": "Real-time pre-load validation at high volume.",
    "correctRationale": "Dataflow streaming validates and transforms records in flight at high throughput before the load — matching real-time, high-volume, before-load requirements. Off-GCP scripts don't scale, per-file Cloud Run triggers are batchy, and SQL after loading validates too late.",
    "optionRationales": [
      "Wrong: custom scripts outside Google Cloud don't scale to high volumes and add an external hop.",
      "Wrong: per-file Cloud Run triggers work but are batch-oriented and limited for continuous validation.",
      "Correct: a Dataflow streaming pipeline validates and transforms at volume before the load.",
      "Wrong: cleaning after loading means bad data already reached BigQuery."
    ]
  },
  {
    "id": 39,
    "topic": "BigQuery & SQL",
    "difficulty": 2,
    "question": "You have millions of customer feedback records stored in BigQuery. You want to summarize the data by using the large language model (LLM) Gemini. You need to plan and execute this analysis using the most efficient approach. What should you do?",
    "options": [
      "A. Query the BigQuery table from within a Python notebook, use the Gemini API to summarize the data within the notebook, and store the summaries in BigQuery.",
      "B. Use a BigQuery ML model to pre-process the text data, export the results to Cloud Storage, and use the Gemini API to summarize the pre-processed data.",
      "C. Create a BigQuery Cloud resource connection to a remote model in Vertex AI, and use Gemini to summarize the data.",
      "D. Export the raw BigQuery data to a CSV file, upload it to Cloud Storage, and use the Gemini API to summarize the data."
    ],
    "correct": 2,
    "explanation": "A BigQuery remote model over Vertex AI Gemini plus ML.GENERATE_TEXT summarizes millions of rows in place.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. The most efficient approach is C. Use a BigQuery Cloud resource connection to Vertex AI Gemini. This method is optimal because it allows in-database processing within BigQuery, directly using Gemini for summarization via a Cloud Resource Connection, minimizing data movement and maximizing efficiency. Option A (Python Notebook) is inefficient due to data extraction from BigQuery. Option B ..."
      },
      {
        "user": "SaquibHerman",
        "text": "Selected Answer: C. Querying BigQuery from a Python notebook and using the Gemini API manually introduces unnecessary complexity and latency. It also requires additional infrastructure (like a notebook environment) and manual intervention. The most efficient approach should minimize data movement, leverage Google Cloud's native integrations, and avoid unnecessary steps like exporting data to external files or ... (2 votes)"
      },
      {
        "user": "A4M",
        "text": "Selected Answer: C. better to use the vertex api > gemini integration in BQ"
      },
      {
        "user": "a_vi",
        "text": "Selected Answer: A. Using Gemini API is better way"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 39,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "high",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Majority C (3 votes) with one A; resolved to C — remote model in BigQuery is the efficient pattern. Independent review (Gemini, Oct 2026) confirmed C: a remote Gemini model invoked in SQL avoids any data movement.",
    "conceptSummary": "In-warehouse LLM summarization via a BigQuery remote model.",
    "correctRationale": "Creating a Cloud resource connection to a remote Vertex AI Gemini model and calling ML.GENERATE_TEXT (now AI.GENERATE) processes the rows inside BigQuery — no data movement, at scale. Pulling millions of rows into a notebook to call the API row-by-row is slow, and exporting first adds needless data movement.",
    "optionRationales": [
      "Wrong: pulling millions of rows into a notebook and calling the API per row is slow and serial.",
      "Wrong: preprocessing then exporting adds movement; the remote model already accepts text.",
      "Correct: a remote model over Vertex AI Gemini lets ML.GENERATE_TEXT summarize the data where it lives.",
      "Wrong: exporting to CSV then calling the API adds steps and movement."
    ]
  },
  {
    "id": 38,
    "topic": "Pipelines & Processing",
    "difficulty": 2,
    "question": "Your organization sends IoT event data to a Pub/Sub topic. Subscriber applications read and perform transformations on the messages before storing them in the data warehouse. During particularly busy times when more data is being written to the topic, you notice that the subscriber applications are not acknowledging messages within the deadline. You need to modify your pipeline to handle these activity spikes and continue to process the messages. What should you do?",
    "options": [
      "A. Retry messages until they are acknowledged.",
      "B. Implement flow control on the subscribers.",
      "C. Forward unacknowledged messages to a dead-letter topic.",
      "D. Seek back to the last acknowledged message."
    ],
    "correct": 1,
    "explanation": "Subscriber flow control caps outstanding messages so spikes stop triggering ack-deadline expirations.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. Flow control helps with spikes."
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. The best solution is B. Implement flow control on the subscribers. Flow control directly addresses the issue of subscribers being overwhelmed during activity spikes by regulating the rate of message delivery, preventing them from being overloaded and ensuring messages are acknowledged within the deadline. Option A (Retry) worsens overload. Option C (Dead-letter topic) is for handling failed ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 38,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for B: flow control on the subscriber.",
    "conceptSummary": "Tuning Pub/Sub subscribers that lose messages to ack deadline expiry.",
    "correctRationale": "Flow control on the subscriber limits outstanding (unacked) messages so clients aren't handed more than they can process before the ack deadline expires — the direct fix for redelivery storms during spikes. Retry settings push the same messages back harder, dead-lettering abandons them, and seek replays rather than fixing throughput.",
    "optionRationales": [
      "Wrong: retrying harder makes the deadline-expiry loop worse.",
      "Correct: flow control limits outstanding messages so each is acked in time during spikes.",
      "Wrong: a dead-letter topic discards messages instead of fixing the delivery bottleneck.",
      "Wrong: seek replays old messages but doesn't increase processing capacity."
    ]
  },
  {
    "id": 37,
    "topic": "Lifecycle & Availability",
    "difficulty": 2,
    "question": "You manage a BigQuery table that is used for critical end-of-month reports. The table is updated weekly with new sales data. You want to prevent data loss and reporting issues if the table is accidentally deleted. What should you do?",
    "options": [
      "A. Configure the time travel duration on the table to be exactly seven days. On deletion, re-create the deleted table solely from the time travel data.",
      "B. Schedule the creation of a new snapshot of the table once a week. On deletion, re-create the deleted table using the snapshot and time travel data.",
      "C. Create a clone of the table. On deletion, re-create the deleted table by copying the content of the clone.",
      "D. Create a view of the table. On deletion, re-create the deleted table from the view and time travel data."
    ],
    "correct": 1,
    "explanation": "Scheduled snapshots persist beyond the time-travel window; combine with time travel for intra-week gaps.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. B. is most comprehensive prevention of data loss"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. The best solution to prevent data loss and recover from accidental table deletion is B. Schedule weekly snapshots and use them with time travel for recovery. Weekly snapshots provide regular, reliable backups. If deletion occurs, restore from the latest snapshot, potentially supplemented by time travel for very recent data if needed. Option C (Clones) is a decent backup alternative, but snapshots ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 37,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for B: snapshots are the backup mechanism.",
    "conceptSummary": "Weekly backups of BigQuery tables via snapshots.",
    "correctRationale": "BigQuery snapshots capture the table and live past the seven-day time-travel window, so a weekly snapshot schedule covers recovery while time travel fills recent changes. Time travel alone maxes out around seven days (fail-safe adds only retention, not self-serve restore), a clone is a one-off copy rather than a recurring backup, and a view stores nothing.",
    "optionRationales": [
      "Wrong: time travel is limited to roughly seven days and isn't a backup strategy by itself.",
      "Correct: weekly snapshots give durable restore points beyond the time-travel window.",
      "Wrong: a clone is a point-in-time copy, not a scheduled backup approach.",
      "Wrong: a view stores no data, so it can't restore anything."
    ]
  },
  {
    "id": 36,
    "topic": "Pipelines & Processing",
    "difficulty": 1,
    "question": "Your company is migrating their batch transformation pipelines to Google Cloud. You need to choose a solution that supports programmatic transformations using only SQL. You also want the technology to support Git integration for version control of your pipelines. What should you do?",
    "options": [
      "A. Use Cloud Data Fusion pipelines.",
      "B. Use Dataform workflows.",
      "C. Use Dataflow pipelines.",
      "D. Use Cloud Composer operators."
    ],
    "correct": 1,
    "explanation": "Dataform is the SQL-native transformation tool with built-in Git versioning.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. The best solution is B. Use Dataform workflows. Dataform is uniquely suited because it is specifically designed for programmatic data transformations using only SQL and has native, robust Git integration for version control. Option A (Cloud Data Fusion) is a visual ETL tool, not SQL-centric, and has limited Git integration. Option C (Dataflow) is code-based (Java/Python), not SQL-based. Option D ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 36,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for B: Dataform is SQL-native with Git.",
    "conceptSummary": "Choosing a SQL-first transformation tool with version control.",
    "correctRationale": "Dataform defines transformations in SQLX (SQL with dependency declarations) and integrates natively with Git — exactly the 'SQL + version control' combination required. Data Fusion is visual, Dataflow is Beam code in Java/Python/Go, and Composer orchestrates rather than transforms.",
    "optionRationales": [
      "Wrong: Data Fusion is a visual pipeline tool, not a SQL-with-versioning workflow.",
      "Correct: Dataform's SQLX plus native Git integration matches SQL-only development with version control.",
      "Wrong: Dataflow requires writing Beam code, not SQL.",
      "Wrong: Composer orchestrates tasks in Python; it isn't a SQL transformation tool."
    ]
  },
  {
    "id": 35,
    "topic": "Lifecycle & Availability",
    "difficulty": 1,
    "question": "Your organization uses a BigQuery table that is partitioned by ingestion time. You need to remove data that is older than one year to reduce your organization’s storage costs. You want to use the most efficient approach while minimizing cost. What should you do?",
    "options": [
      "A. Create a scheduled query that periodically runs an update statement in SQL that sets the “deleted\" column to “yes” for data that is more than one year old. Create a view that filters out rows that have been marked deleted.",
      "B. Create a view that filters out rows that are older than one year.",
      "C. Require users to specify a partition filter using the alter table statement in SQL.",
      "D. Set the table partition expiration period to one year using the ALTER TABLE statement in SQL."
    ],
    "correct": 3,
    "explanation": "A one-year partition expiration drops old partitions automatically with no query cost.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. D. is the only one that has a partition expiration, meaning deletion. the other answer choices just filter views. (2 votes)"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. The most efficient and cost-effective solution is D. Set the table partition expiration period to one year using the ALTER TABLE statement in SQL. Partition expiration is a built-in BigQuery feature specifically designed to automatically delete old partitions, directly reducing storage costs and requiring minimal effort. Options A and B (soft delete and views) do not reduce storage costs; they ... (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 35,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for D: expiration on partitions beats soft deletes.",
    "conceptSummary": "Auto-expiring old partitions instead of deleting rows.",
    "correctRationale": "Partition expiration is set once on the table and deletes whole partitions at no query cost as they age past one year. A soft-delete UPDATE costs DML and keeps storage, a view only hides data while it still bills, and require_partition_filter limits scan cost but never deletes anything.",
    "optionRationales": [
      "Wrong: an UPDATE marking rows deleted still stores the data and costs DML to run.",
      "Wrong: a view filters visibility but the underlying storage still bills.",
      "Wrong: require_partition_filter reduces scan cost; it deletes nothing.",
      "Correct: partition expiration removes aged partitions automatically at zero query cost."
    ]
  },
  {
    "id": 34,
    "topic": "Ingestion & Transfer",
    "difficulty": 3,
    "question": "Your organization plans to move their on-premises environment to Google Cloud. Your organization’s network bandwidth is less than 1 Gbps. You need to move over 500 ТВ of data to Cloud Storage securely, and only have a few days to move the data. What should you do?",
    "options": [
      "A. Request multiple Transfer Appliances, copy the data to the appliances, and ship the appliances back to Google Cloud to upload the data to Cloud Storage.",
      "B. Connect to Google Cloud using VPN. Use Storage Transfer Service to move the data to Cloud Storage.",
      "C. Connect to Google Cloud using VPN. Use the gcloud storage command to move the data to Cloud Storage.",
      "D. Connect to Google Cloud using Dedicated Interconnect. Use the gcloud storage command to move the data to Cloud Storage."
    ],
    "correct": 0,
    "explanation": "500 TB over sub-gigabit bandwidth takes 46+ days at line rate — multiple Transfer Appliances are the only way to finish in days.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. 500 TB in a few days with 1gbps bandwidth would require option A. multiple Transfer Appliances"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 34,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for A: bandwidth math forces offline appliances.",
    "conceptSummary": "Choosing Transfer Appliances for a bandwidth-bound petabyte-scale migration.",
    "correctRationale": "At under 1 Gbps, 500 TB cannot transfer in a handful of days no matter the protocol — the math rules out every online option. Multiple Transfer Appliances ship the data physically: encrypted, tracked, and fast enough for huge volumes. VPN over the same link is still bandwidth-bound, and Dedicated Interconnect takes weeks to provision and still needs enough throughput to approach the timeline.",
    "optionRationales": [
      "Correct: multiple Transfer Appliances move 500 TB offline when the network can't.",
      "Wrong: STS over a VPN is still bound by the limited link bandwidth.",
      "Wrong: gcloud storage over a VPN has the same bandwidth ceiling.",
      "Wrong: Dedicated Interconnect takes weeks to provision and still needs high enough bandwidth to matter."
    ]
  },
  {
    "id": 33,
    "topic": "Lifecycle & Availability",
    "difficulty": 2,
    "question": "You manage a web application that stores data in a Cloud SQL database. You need to improve the read performance of the application by offloading read traffic from the primary database instance. You want to implement a solution that minimizes effort and cost. What should you do?",
    "options": [
      "A. Use Cloud CDN to cache frequently accessed data.",
      "B. Store frequently accessed data in a Memorystore instance.",
      "C. Migrate the database to a larger Cloud SQL instance.",
      "D. Enable automatic backups, and create a read replica of the Cloud SQL instance."
    ],
    "correct": 3,
    "explanation": "A read replica offloads query traffic, and automated backups plus binary logging are the prerequisite.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. read the question, it says offloading read traffic from the primary database, meaning there would be a read-replica.\n\nThe best solution for improving Cloud SQL read performance by offloading traffic while minimizing effort and cost is D. Enable automatic backups and create a read replica. Read replicas are specifically designed to offload read traffic with minimal effort in Cloud SQL. Option C ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 33,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for D: read replica, with backups/binlog as the enabling step.",
    "conceptSummary": "Offloading Cloud SQL read load with a replica (backups required).",
    "correctRationale": "Cloud SQL read replicas serve read traffic so the primary keeps handling writes — the standard way to offload a loaded database. Creating a replica requires automated backups and binary logging to be enabled, which is why that step matters. Cloud CDN caches HTTP content (not database queries), Memorystore needs application caching code, and a bigger instance just costs more.",
    "optionRationales": [
      "Wrong: Cloud CDN caches web content at the edge, not SQL query load.",
      "Wrong: Memorystore is a good cache but requires application changes — more effort.",
      "Wrong: a larger instance scales vertically, costs more, and doesn't offload reads as cleanly.",
      "Correct: a read replica serves the read workload; automated backups and binary logging are required to create one."
    ]
  },
  {
    "id": 32,
    "topic": "BigQuery & SQL",
    "difficulty": 3,
    "question": "Your organization has several datasets in their data warehouse in BigQuery. Several analyst teams in different departments use the datasets to run queries. Your organization is concerned about the variability of their monthly BigQuery costs. You need to identify a solution that creates a fixed budget for costs associated with the queries run by each department. What should you do?",
    "options": [
      "A. Create a custom quota for each analyst in BigQuery.",
      "B. Create a single reservation by using BigQuery editions. Assign all analysts to the reservation.",
      "C. Assign each analyst to a separate project associated with their department. Create a single reservation by using BigQuery editions. Assign all projects to the reservation.",
      "D. Assign each analyst to a separate project associated with their department. Create a single reservation for each department by using BigQuery editions. Create assignments for each project in the appropriate reservation."
    ],
    "correct": 3,
    "explanation": "Per-department slot reservations with project assignments give each department a fixed, isolated cost.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. The best solution for creating fixed BigQuery budgets per department is D. Separate projects per department, separate reservations per department, and project assignments to departmental reservations. This approach is optimal because separate reservations per department create fixed, predictable costs for each department. Assigning departmental projects to their respective reservations ensures ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 32,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for D: per-department reservations give fixed budgets.",
    "conceptSummary": "Separating BigQuery compute budgets per department with reservations.",
    "correctRationale": "BigQuery reservations provide fixed slot capacity at a fixed cost; one reservation per department with assignments scoped to that department's projects isolates each team's spend. Quotas only cap usage (not a dedicated budget), and a single shared reservation can't separate departments' consumption.",
    "optionRationales": [
      "Wrong: query quotas cap usage but don't give each department its own fixed compute budget.",
      "Wrong: one shared reservation can't separate departments' spend.",
      "Wrong: same issue — a single editions reservation mixes everyone's usage.",
      "Correct: per-department reservations with project assignments isolate each department to fixed-cost slot capacity."
    ]
  },
  {
    "id": 31,
    "topic": "Data Preparation",
    "difficulty": 1,
    "question": "You are a data analyst at your organization. You have been given a BigQuery dataset that includes customer information. The dataset contains inconsistencies and errors, such as missing values, duplicates, and formatting issues. You need to effectively and quickly clean the data. What should you do?",
    "options": [
      "A. Develop a Dataflow pipeline to read the data from BigQuery, perform data quality rules and transformations, and write the cleaned data back to BigQuery.",
      "B. Use Cloud Data Fusion to create a data pipeline to read the data from BigQuery, perform data quality transformations, and write the clean data back to BigQuery.",
      "C. Export the data from BigQuery to CSV files. Resolve the errors using a spreadsheet editor, and re-import the cleaned data into BigQuery.",
      "D. Use BigQuery's built-in functions to perform data quality transformations."
    ],
    "correct": 3,
    "explanation": "Data already in BigQuery is cleaned fastest with SQL functions — no pipeline rebuild needed.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. it's already in bigquery, so just preform the transformation in the dataset (2 votes)"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. The best solution for effective and quick data cleaning is D. Use BigQuery's built-in functions. This is the most efficient and quickest approach as it leverages the power of BigQuery SQL for data transformations directly within the BigQuery environment. Option B (Cloud Data Fusion) is a good visual alternative but slower to set up than direct SQL. Option A (Dataflow) is powerful but more complex ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 31,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for D: clean in place with SQL.",
    "conceptSummary": "Cleaning data that already resides in BigQuery using SQL.",
    "correctRationale": "When the data is already in BigQuery, SQL functions like TRIM, SAFE_CAST, REGEXP_REPLACE and deduplication clean it in place with zero pipeline work. Building a Dataflow/Data Fusion pipeline re-reads and re-writes the data, and manual spreadsheet editing doesn't scale.",
    "optionRationales": [
      "Wrong: building a pipeline to extract, clean, and reload is unnecessary when SQL cleans in place.",
      "Wrong: same problem — an ETL tool is more machinery than needed for in-place SQL cleaning.",
      "Wrong: spreadsheet editing is manual and doesn't scale.",
      "Correct: BigQuery SQL cleaning functions operate directly where the data already lives."
    ]
  },
  {
    "id": 30,
    "topic": "Machine Learning",
    "difficulty": 2,
    "question": "You are predicting customer churn for a subscription-based service. You have a 50 PB historical customer dataset in BigQuery that includes demographics, subscription information, and engagement metrics. You want to build a churn prediction model with minimal overhead. You want to follow the Google-recommended approach. What should you do?",
    "options": [
      "A. Export the data from BigQuery to a local machine. Use scikit-learn in a Jupyter notebook to build the churn prediction model.",
      "B. Use Dataproc to create a Spark cluster. Use the Spark MLlib within the cluster to build the churn prediction model.",
      "C. Create a Looker dashboard that is connected to BigQuery. Use LookML to predict churn.",
      "D. Use the BigQuery Python client library in a Jupyter notebook to query and preprocess the data in BigQuery. Use the CREATE MODEL statement in BigQueryML to train the churn prediction model."
    ],
    "correct": 3,
    "explanation": "BigQuery ML trains where the 50 PB already live; nothing gets exported.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. The best and Google-recommended solution for building a churn model on a 50 PB BigQuery dataset with minimal overhead is D. Use BigQuery Python client and BigQueryML. BigQueryML enables in-database model training, eliminating data movement and minimizing overhead. This aligns with Google's best practices for BigQuery data. Option A (Local scikit-learn) is impractical due to the dataset size. ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 30,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for D: train in place with BigQuery ML.",
    "conceptSummary": "Training a churn model on a massive in-place BigQuery dataset.",
    "correctRationale": "BigQuery ML CREATE MODEL trains directly on the 50 PB dataset inside BigQuery, so no export or extra infrastructure is needed and Python preprocessing stays inside SQL. You can't pull 50 PB into a notebook or local environment, a Spark cluster is unnecessary overhead, and LookML is a BI modeling layer, not an ML tool.",
    "optionRationales": [
      "Wrong: exporting 50 PB to a notebook or local environment is not feasible.",
      "Wrong: a Spark cluster adds infrastructure overhead BigQuery ML avoids.",
      "Wrong: LookML models analytics semantics, not machine learning models.",
      "Correct: BigQuery ML trains the churn model in place with SQL on the existing 50 PB."
    ]
  },
  {
    "id": 29,
    "topic": "Looker & Visualization",
    "difficulty": 2,
    "question": "Your company uses Looker to generate and share reports with various stakeholders. You have a complex dashboard with several visualizations that needs to be delivered to specific stakeholders on a recurring basis, with customized filters applied for each recipient. You need an efficient and scalable solution to automate the delivery of this customized dashboard. You want to follow the Google-recommended approach. What should you do?",
    "options": [
      "A. Create a separate LookML model for each stakeholder with predefined filters, and schedule the dashboards using the Looker Scheduler.",
      "B. Create a script using the Looker Python SDK, and configure user attribute filter values. Generate a new scheduled plan for each stakeholder.",
      "C. Embed the Looker dashboard in a custom web application, and use the application's scheduling features to send the report with personalized filters.",
      "D. Use the Looker Scheduler with a user attribute filter on the dashboard, and send the dashboard with personalized filters to each stakeholder based on their attributes."
    ],
    "correct": 3,
    "explanation": "The Looker scheduler supports user-attribute-filtered deliveries so each stakeholder gets their own view of the same dashboard.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. The optimal and Google-recommended solution is D. Use Looker Scheduler with User Attribute filters. This is the most efficient and scalable approach as it directly utilizes Looker's built-in features to automate personalized dashboard delivery based on user attributes. Option A (Separate LookML models) is inefficient and unscalable due to model duplication. Option B (Python SDK scripting) is more ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 29,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for D, matching the snippet's suggested answer D.",
    "conceptSummary": "Scheduled personalized dashboard delivery with user attributes.",
    "correctRationale": "Looker's scheduler can deliver a dashboard on a recurring basis with user attribute filters applied per recipient, so each stakeholder receives their filtered slice — built-in and scalable. A model per stakeholder duplicates development, SDK scripting is custom code, and a custom app is a whole product to maintain.",
    "optionRationales": [
      "Wrong: a LookML model per stakeholder is duplicated development effort that doesn't scale.",
      "Wrong: SDK scripting recreates what the scheduler does natively, with code to maintain.",
      "Wrong: embedding in a custom app adds an entire application to maintain.",
      "Correct: the built-in scheduler with user attribute filters delivers each stakeholder their filtered dashboard."
    ]
  },
  {
    "id": 28,
    "topic": "Orchestration & Monitoring",
    "difficulty": 1,
    "question": "Your organization uses Dataflow pipelines to process real-time financial transactions. You discover that one of your Dataflow jobs has failed. You need to troubleshoot the issue as quickly as possible. What should you do?",
    "options": [
      "A. Set up a Cloud Monitoring dashboard to track key Dataflow metrics, such as data throughput, error rates, and resource utilization.",
      "B. Create a custom script to periodically poll the Dataflow API for job status updates, and send email alerts if any errors are identified.",
      "C. Navigate to the Dataflow Jobs page in the Google Cloud console. Use the job logs and worker logs to identify the error.",
      "D. Use the gcloud CLI tool to retrieve job metrics and logs, and analyze them for errors and performance bottlenecks."
    ],
    "correct": 2,
    "explanation": "The Dataflow Jobs page shows the failed job's logs and error messages immediately — the fastest troubleshooting path.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. The quickest way to troubleshoot a failed Dataflow job is C. Use the Dataflow Jobs page in the Google Cloud console and examine job and worker logs. The console provides immediate and direct access to job status and detailed logs, allowing for rapid identification of errors. Option A (Cloud Monitoring Dashboard) is for proactive monitoring, not immediate failure diagnosis. Option B (Custom ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 28,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C: use the console's job/worker logs first.",
    "conceptSummary": "Diagnosing a failed Dataflow job quickly.",
    "correctRationale": "The Dataflow Jobs page in the console shows the failed job's graph, job logs, and worker logs with error messages out of the box. Building a monitoring dashboard is proactive work for later, a polling script is custom tooling, and gcloud log retrieval is slower than the console's purpose-built view.",
    "optionRationales": [
      "Wrong: building a Monitoring dashboard is proactive observability work, not the fastest diagnosis of the failure in front of you.",
      "Wrong: a custom polling script is code you must write when the console already shows the logs.",
      "Correct: the Dataflow Jobs page exposes job and worker logs with the error, fastest.",
      "Wrong: gcloud works but is slower and less readable than the console's job view."
    ]
  },
  {
    "id": 27,
    "topic": "Ingestion & Transfer",
    "difficulty": 1,
    "question": "You are using your own data to demonstrate the capabilities of BigQuery to your organization’s leadership team. You need to perform a one-time load of the files stored on your local machine into BigQuery using as little effort as possible. What should you do?",
    "options": [
      "A. Write and execute a Python script using the BigQuery Storage Write API library.",
      "B. Create a Dataproc cluster, copy the files to Cloud Storage, and write an Apache Spark job using the spark-bigquery-connector.",
      "C. Execute the bq load command on your local machine.",
      "D. Create a Dataflow job using the Apache Beam FileIO and BigQueryIO connectors with a local runner."
    ],
    "correct": 2,
    "explanation": "bq load reads local files directly into BigQuery — the least-effort one-time load.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. C. bq load is best for one-time transfer from local machine to BQ"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 27,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C, matching the snippet's suggested answer C.",
    "conceptSummary": "One-time load of local files into BigQuery.",
    "correctRationale": "The bq command-line tool loads a local file straight into a BigQuery table in one command — no code, no clusters. The Storage Write API, a Dataproc cluster with the Spark connector, and a Beam FileIO pipeline are all real options but far more effort.",
    "optionRationales": [
      "Wrong: scripting the Storage Write API is real development work for a one-time load.",
      "Wrong: a Dataproc cluster plus a Spark job is massive overkill here.",
      "Correct: bq load on the local file is the one-command, least-effort answer.",
      "Wrong: a custom Beam pipeline is development effort no one-time load needs."
    ]
  },
  {
    "id": 26,
    "topic": "Lifecycle & Availability",
    "difficulty": 1,
    "question": "You are responsible for managing Cloud Storage buckets for a research company. Your company has well-defined data tiering and retention rules. You need to optimize storage costs while achieving your data retention needs. What should you do?",
    "options": [
      "A. Configure the buckets to use the Archive storage class.",
      "B. Configure a lifecycle management policy on each bucket to downgrade the storage class and remove objects based on age.",
      "C. Configure the buckets to use the Standard storage class and enable Object Versioning.",
      "D. Configure the buckets to use the Autoclass feature."
    ],
    "correct": 1,
    "explanation": "Well-defined tiering and retention rules map directly onto SetStorageClass and Delete lifecycle actions by age.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. The best solution for optimizing Cloud Storage costs and achieving data retention needs is B. Configure a lifecycle management policy on each bucket. Lifecycle Management is designed to automate data tiering (moving data to cheaper classes as it ages) and data retention (deleting objects based on age or other rules), directly addressing the requirements for cost optimization and rule-based data ... (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 26,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for B: explicit rules call for explicit lifecycle policies.",
    "conceptSummary": "Automating storage tiering and deletion with lifecycle policies.",
    "correctRationale": "When rules are well-defined, Object Lifecycle Management does exactly this: SetStorageClass transitions objects to cheaper classes by age and Delete removes them at end of retention. Archiving everything ignores access needs, versioning adds cost, and Autoclass is for unpredictable access patterns and never deletes objects.",
    "optionRationales": [
      "Wrong: archiving everything ignores that some data is still accessed and incurs retrieval fees.",
      "Correct: lifecycle rules encode the defined tiering and retention rules directly (transition by age, delete at retention end).",
      "Wrong: versioning increases cost by retaining old versions and does not implement tiering rules.",
      "Wrong: Autoclass suits unknown access patterns and does not delete objects at end of retention."
    ]
  },
  {
    "id": 25,
    "topic": "Orchestration & Monitoring",
    "difficulty": 1,
    "question": "Your team is building several data pipelines that contain a collection of complex tasks and dependencies that you want to execute on a schedule, in a specific order. The tasks and dependencies consist of files in Cloud Storage, Apache Spark jobs, and data in BigQuery. You need to design a system that can schedule and automate these data processing tasks using a fully managed approach. What should you do?",
    "options": [
      "A. Use Cloud Scheduler to schedule the jobs to run.",
      "B. Use Cloud Tasks to schedule and run the jobs asynchronously.",
      "C. Create directed acyclic graphs (DAGs) in Cloud Composer. Use the appropriate operators to connect to Cloud Storage, Spark, and BigQuery.",
      "D. Create directed acyclic graphs (DAGs) in Apache Airflow deployed on Google Kubernetes Engine. Use the appropriate operators to connect to Cloud Storage, Spark, and BigQuery."
    ],
    "correct": 2,
    "explanation": "Cloud Composer is fully managed Airflow with operators for GCS, Spark and BigQuery and dependency ordering built in.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. The best fully managed solution for scheduling and automating complex data pipelines is C. Use Cloud Composer with DAGs and appropriate operators. Cloud Composer, being a fully managed Apache Airflow service, is specifically designed for orchestrating complex workflows with dependencies and offers built-in operators to connect to Cloud Storage, Spark (via Dataproc), and BigQuery. Option D ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 25,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C: managed Airflow for dependency-ordered jobs.",
    "conceptSummary": "Fully managed scheduling of dependent GCS/Spark/BigQuery tasks.",
    "correctRationale": "Cloud Composer is managed Apache Airflow: DAGs express the dependencies and ordering, and operators exist for Cloud Storage, Dataproc/Spark and BigQuery. Cloud Scheduler only fires times, Cloud Tasks dispatches async work rather than orchestrating dependencies, and Airflow self-hosted on GKE is not fully managed.",
    "optionRationales": [
      "Wrong: Cloud Scheduler triggers jobs on a schedule but has no dependency graph.",
      "Wrong: Cloud Tasks dispatches asynchronous tasks; it is not an orchestrator for ordered pipelines.",
      "Correct: Composer DAGs with GCS/Spark/BigQuery operators give managed, ordered scheduling.",
      "Wrong: Airflow on GKE works but is self-managed, not fully managed."
    ]
  },
  {
    "id": 24,
    "topic": "BigQuery & SQL",
    "difficulty": 1,
    "question": "Your organization has a petabyte of application logs stored as Parquet files in Cloud Storage. You need to quickly perform a one-time SQL-based analysis of the files and join them to data that already resides in BigQuery. What should you do?",
    "options": [
      "A. Create a Dataproc cluster, and write a PySpark job to join the data from BigQuery to the files in Cloud Storage.",
      "B. Launch a Cloud Data Fusion environment, use plugins to connect to BigQuery and Cloud Storage, and use the SQL join operation to analyze the data.",
      "C. Create external tables over the files in Cloud Storage, and perform SQL joins to tables in BigQuery to analyze the data.",
      "D. Use the bq load command to load the Parquet files into BigQuery, and perform SQL joins to analyze the data."
    ],
    "correct": 2,
    "explanation": "External (BigLake) tables query the Parquet files in place and join them to native tables — instant one-time analysis.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. The most efficient and quick solution for a one-time SQL analysis of petabyte-scale Parquet files in Cloud Storage joined with BigQuery data is C. Create external tables over the files in Cloud Storage and perform SQL joins. External tables allow you to query data directly in Cloud Storage with SQL, avoiding the time and cost of loading a petabyte of data into BigQuery. This is ideal for a fast, ... (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 24,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C, matching the snippet's suggested answer C.",
    "conceptSummary": "One-time SQL analysis over a petabyte of Parquet in Cloud Storage.",
    "correctRationale": "An external table defines a BigQuery table over the Parquet files in Cloud Storage, so you can SQL-join them with native tables without moving a petabyte. Dataproc and Data Fusion build clusters/pipelines for a one-off job, and bq load takes time and duplicates a petabyte of storage.",
    "optionRationales": [
      "Wrong: a Dataproc cluster and PySpark job is heavy machinery for a one-time analysis.",
      "Wrong: a Data Fusion environment is a pipeline builder, not a quick one-off query path.",
      "Correct: external tables query the Parquet in place and join to BigQuery tables immediately.",
      "Wrong: loading a petabyte into BigQuery for a one-time analysis wastes time and storage cost."
    ]
  },
  {
    "id": 23,
    "topic": "Ingestion & Transfer",
    "difficulty": 1,
    "question": "You are developing a data ingestion pipeline to load small CSV files into BigQuery from Cloud Storage. You want to load these files upon arrival to minimize data latency. You want to accomplish this with minimal cost and maintenance. What should you do?",
    "options": [
      "A. Use the bq command-line tool within a Cloud Shell instance to load the data into BigQuery.",
      "B. Create a Cloud Composer pipeline to load new files from Cloud Storage to BigQuery and schedule it to run every 10 minutes.",
      "C. Create a Cloud Run function to load the data into BigQuery that is triggered when data arrives in Cloud Storage.",
      "D. Create a Dataproc cluster to pull CSV files from Cloud Storage, process them using Spark, and write the results to BigQuery."
    ],
    "correct": 2,
    "explanation": "An object-finalize-triggered Cloud Run function loads each small file the moment it lands, pay-per-use.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. Given the choices, cloud run function is the only one that can"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 23,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C, matching the snippet's suggested answer C.",
    "conceptSummary": "Loading small files into BigQuery immediately on arrival.",
    "correctRationale": "A Cloud Run function triggered by an OBJECT_FINALIZE event from Cloud Storage runs only when a file arrives, loads it into BigQuery at once, and costs almost nothing at rest. Manual bq loads are not automated, Composer polling every ten minutes costs an environment plus latency, and a Dataproc cluster is overkill for small CSVs.",
    "optionRationales": [
      "Wrong: manual bq loads from Cloud Shell do not automate arrival-triggered loading.",
      "Wrong: a Composer environment is expensive and ten-minute polling adds latency.",
      "Correct: an event-driven Cloud Run function loads each file immediately and costs nothing while idle.",
      "Wrong: a Dataproc cluster is heavy infrastructure for loading small CSV files."
    ]
  },
  {
    "id": 22,
    "topic": "Pipelines & Processing",
    "difficulty": 1,
    "question": "Your organization has decided to move their on-premises Apache Spark-based workload to Google Cloud. You want to be able to manage the code without needing to provision and manage your own cluster. What should you do?",
    "options": [
      "A. Migrate the Spark jobs to Dataproc Serverless.",
      "B. Configure a Google Kubernetes Engine cluster with Spark operators, and deploy the Spark jobs.",
      "C. Migrate the Spark jobs to Dataproc on Google Kubernetes Engine.",
      "D. Migrate the Spark jobs to Dataproc on Compute Engine."
    ],
    "correct": 0,
    "explanation": "Dataproc Serverless submits Spark jobs with no cluster to provision or manage.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. Dataproc serverless to for spark workload without provisioning + managing your own infrastructure. (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 22,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for A: serverless Spark, no cluster.",
    "conceptSummary": "Running migrated Spark jobs without managing a cluster.",
    "correctRationale": "Dataproc Serverless for Spark runs batch workloads on demand — you submit the job and Google provisions ephemeral capacity, so there is no cluster to create, patch, or shut down. Dataproc on GKE or Compute Engine both make you own a cluster.",
    "optionRationales": [
      "Correct: Dataproc Serverless runs Spark jobs with zero cluster management.",
      "Wrong: a GKE cluster with Spark operators is a cluster you provision and run yourself.",
      "Wrong: Dataproc on GKE still means managing a GKE cluster.",
      "Wrong: Dataproc on Compute Engine means managing a Dataproc cluster."
    ]
  },
  {
    "id": 21,
    "topic": "Looker & Visualization",
    "difficulty": 3,
    "question": "You need to create a weekly aggregated sales report based on a large volume of data. You want to use Python to design an efficient process for generating this report. What should you do?",
    "options": [
      "A. Create a Cloud Run function that uses NumPy. Use Cloud Scheduler to schedule the function to run once a week.",
      "B. Create a Colab Enterprise notebook and use the bigframes.pandas library. Schedule the notebook to execute once a week.",
      "C. Create a Cloud Data Fusion and Wrangler flow. Schedule the flow to run once a week.",
      "D. Create a Dataflow directed acyclic graph (DAG) coded in Python. Use Cloud Scheduler to schedule the code to run once a week."
    ],
    "correct": 1,
    "explanation": "A scheduled Colab Enterprise notebook with bigframes.pandas runs the weekly aggregation in Python without moving the data.",
    "discussion": [
      {
        "user": "pico",
        "text": "Selected Answer: D. Not B because Colab Enterprise notebook is more for interactive data analysis and exploration"
      },
      {
        "user": "Rio55",
        "text": "Selected Answer: D. Option D (Dataflow DAG coded in Python) and Option B using (bigframes.pandas in Colab Enterprise) seem to be the most suitable.\n\nOption D, Dataflow is designed for parallel processing of large datasets, making it efficient. Python is the chosen language, and Cloud Scheduler handles the weekly scheduling.\n\nOption B, using bigframes.pandas in Colab Enterprise is also a possibility for leveraging ... (2 votes)"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. Option B (Colab Enterprise + bigframes.pandas) and Option D (Dataflow DAG in Python) are the most efficient options for handling large data volumes and using Python.\n\nOption B is likely more straightforward and faster to implement for generating a report, especially if the analyst is familiar with Pandas and notebooks. bigframes.pandas simplifies interaction with BigQuery data within a Python ... (3 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 21,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "medium",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Split D (2) vs B (1): commenters picked Dataflow+Scheduler, but the adjudication resolves to B — bigframes is the efficient Python-native answer the question wants. Independent review (Gemini, Oct 2026) confirmed B: bigframes pushes computation down to BigQuery and notebooks can be scheduled.",
    "conceptSummary": "Weekly Python aggregation over a large BigQuery dataset.",
    "correctRationale": "BigQuery DataFrames (bigframes.pandas) gives a pandas API whose computation is pushed down to BigQuery, so large volumes aggregate efficiently from Python, and Colab Enterprise supports scheduled notebook runs. NumPy in a Cloud Run function pulls data into limited memory, Data Fusion Wrangler is visual rather than Python, and wiring Dataflow through Cloud Scheduler is heavy for a weekly report.",
    "optionRationales": [
      "Wrong: NumPy in a Cloud Run function loads data into memory, which does not scale to large volumes.",
      "Correct: bigframes.pandas pushes the aggregation into BigQuery, and Colab Enterprise schedules the notebook weekly.",
      "Wrong: Data Fusion and Wrangler are visual tools, not a Python design.",
      "Wrong: a Dataflow pipeline triggered by Scheduler is heavy machinery for a weekly aggregation, and Beam pipelines aren't simply 'DAGs scheduled by Cloud Scheduler'."
    ]
  },
  {
    "id": 20,
    "topic": "Lifecycle & Availability",
    "difficulty": 3,
    "question": "You work for a financial organization that stores transaction data in BigQuery. Your organization has a regulatory requirement to retain data for a minimum of seven years for auditing purposes. You need to ensure that the data is retained for seven years using an efficient and cost-optimized approach. What should you do?",
    "options": [
      "A. Create a partition by transaction date, and set the partition expiration policy to seven years.",
      "B. Set the table-level retention policy in BigQuery to seven years.",
      "C. Set the dataset-level retention policy in BigQuery to seven years.",
      "D. Export the BigQuery tables to Cloud Storage daily, and enforce a lifecycle management policy that has a seven-year retention rule."
    ],
    "correct": 0,
    "explanation": "Date partitioning with a seven-year partition expiration auto-deletes partitions past the retention window at zero cost.",
    "discussion": [
      {
        "user": "8e50960",
        "text": "Selected Answer: A. When you set table-level retention (an expiration time) for a BigQuery table, it means the entire table will expire and be deleted at that specified time. This includes all data within the table, regardless of when that specific data was added.\n\nIn order for only 7 year old data to expire we need to set up partitions and expire partitions (2 votes)"
      },
      {
        "user": "pico",
        "text": "and how, in option A, do prevent a user with the necessary permissions from running a DELETE?"
      },
      {
        "user": "pico",
        "text": "Selected Answer: D. Not A because does not prevent a user with the necessary permissions from running a DELETE\n\nNot B because there ir no table-level retention policy (different than table expiration and fail-safe period)\n\nNot C because there ir no dataset-level retention policy"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. In the context of the question, both are efficient and cost-optimized. If the regulatory requirement applies to all transaction data which is logically grouped into a dataset, dataset-level retention (Option C) might be slightly more practical for management. However, if the requirement is specifically for this BigQuery table, table-level (Option B) is equally valid and directly applicable. In a ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 20,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "high",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Three-way split A/B/D (one vote each): pico correctly noted that B and C reference features that do not exist in BigQuery (there is no table- or dataset-level retention policy). A wins over D because it is native — no data copy, no pipeline — and cost-optimized via long-term storage pricing. Independent review (Gemini, Oct 2026) confirmed A: per-partition expiration rolls data off by age.",
    "conceptSummary": "Enforcing a seven-year retention window with partition expiration.",
    "correctRationale": "Partitioning by transaction date and setting partition expiration to seven years keeps each day's data for seven years and then drops the partition automatically; partitions untouched for 90 days are billed at long-term storage rates, and there is no pipeline to run. Note that expiration controls when data is removed — it does not stop a privileged user from deleting earlier (that would need IAM restrictions, or Cloud Storage Bucket Lock if true immutability were required, which is not asked).",
    "optionRationales": [
      "Correct: partition expiration on a date-partitioned table drops each partition exactly seven years after its date, automatically and for free.",
      "Wrong: BigQuery has no table-level retention policy; the closest feature, table expiration, deletes the whole table at one point in time instead of keeping each record for seven years.",
      "Wrong: there is no dataset-level retention policy either; a dataset default table expiration only sets an expiration on new tables, which deletes them rather than guaranteeing retention.",
      "Wrong: daily exports to Cloud Storage duplicate the data and add a pipeline to maintain — less efficient than a native BigQuery setting."
    ]
  },
  {
    "id": 19,
    "topic": "Security & Access",
    "difficulty": 1,
    "question": "Your retail organization stores sensitive application usage data in Cloud Storage. You need to encrypt the data without the operational overhead of managing encryption keys. What should you do?",
    "options": [
      "A. Use Google-managed encryption keys (GMEK).",
      "B. Use customer-managed encryption keys (CMEK).",
      "C. Use customer-supplied encryption keys (CSEK).",
      "D. Use customer-supplied encryption keys (CSEK) for the sensitive data and customer-managed encryption keys (CMEK) for the less sensitive data."
    ],
    "correct": 0,
    "explanation": "GMEK encrypts at rest by default with zero key-management overhead.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. Google can manage the encryption keys for you using GMEK.\n\nCMEK is customer managed within Cloud KMS\n\nCSEK is keys that are supplied outside, and managed outside. (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 19,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for A: GMEK when no key management is wanted.",
    "conceptSummary": "Choosing encryption when nobody wants to manage keys.",
    "correctRationale": "Cloud Storage encrypts all data at rest with Google-managed keys by default — no keys to create, rotate, or store, matching 'without operational overhead'. CMEK and CSEK are for when you must control or supply the keys yourself, which is the opposite of this requirement.",
    "optionRationales": [
      "Correct: Google-managed encryption is default-on and requires zero key operations from you.",
      "Wrong: CMEK means you manage keys in Cloud KMS — exactly the overhead being avoided.",
      "Wrong: CSEK means you generate and supply keys per request — the most overhead of all.",
      "Wrong: mixing CSEK and CMEK is still heavy key management the question rules out."
    ]
  },
  {
    "id": 18,
    "topic": "Data Preparation",
    "difficulty": 1,
    "question": "You are working with a large dataset of customer reviews stored in Cloud Storage. The dataset contains several inconsistencies, such as missing values, incorrect data types, and duplicate entries. You need to clean the data to ensure that it is accurate and consistent before using it for analysis. What should you do?",
    "options": [
      "A. Use the PythonOperator in Cloud Composer to clean the data and load it into BigQuery. Use SQL for analysis.",
      "B. Use BigQuery to batch load the data into BigQuery. Use SQL for cleaning and analysis.",
      "C. Use Storage Transfer Service to move the data to a different Cloud Storage bucket. Use event triggers to invoke Cloud Run functions to load the data into BigQuery. Use SQL for analysis.",
      "D. Use Cloud Run functions to clean the data and load it into BigQuery. Use SQL for analysis."
    ],
    "correct": 1,
    "explanation": "Since the destination is BigQuery, loading it there and cleaning with SQL is the simplest accurate pipeline.",
    "discussion": [
      {
        "user": "nan10010110",
        "text": "Selected Answer: B. B,\n\nSince you can clean the data and analyse it using SQL.\n\nOption A, even though you can use PythonOperator to clean the data, the tool of composer doesn't have to do anything with this question itself."
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. The best option is B. Use BigQuery to batch load the data into BigQuery and use SQL for cleaning and analysis. Loading directly into BigQuery and using SQL provides the optimal balance of efficiency and simplicity for cleaning large datasets before analysis by leveraging BigQuery's scalable processing for both loading and transformation. Option A (Cloud Composer + PythonOperator) adds unnecessary ... (4 votes)"
      },
      {
        "user": "SaquibHerman",
        "text": "Selected Answer: A. PythonOperator allows leveraging Python libraries (e.g., Pandas, PySpark) to perform robust data cleaning tasks:\n\nHandle missing values (e.g., imputation, filtering).\n\nFix incorrect data types (e.g., string-to-date conversions).\n\nRemove duplicates (e.g., using deduplication logic). (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 18,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "high",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Majority B (2 votes) vs A (1): the Composer PythonOperator loses because an orchestrator running pandas-style cleaning on Airflow workers does not scale and adds an environment to maintain. Resolved to B. Independent review (Gemini, Oct 2026) confirmed B: ELT in BigQuery SQL is the least-overhead path.",
    "conceptSummary": "Cleaning a dirty Cloud Storage dataset with BigQuery SQL.",
    "correctRationale": "The data ends up in BigQuery anyway for SQL analysis, so batch-loading into BigQuery and cleaning with SQL (TRIM, SAFE_CAST, dedup) is the fewest moving parts. Composer PythonOperators, Storage Transfer gymnastics plus Cloud Run triggers, or bespoke Cloud Run cleaning all add infrastructure for a problem SQL already solves.",
    "optionRationales": [
      "Wrong: a Composer PythonOperator adds orchestration machinery for a job SQL does directly.",
      "Correct: batch load to BigQuery, then clean and analyze with SQL — fewest moving parts.",
      "Wrong: STS plus event-triggered Cloud Run functions is unnecessary plumbing for an internal cleaning task.",
      "Wrong: Cloud Run cleaning functions are custom code where SQL functions suffice."
    ]
  },
  {
    "id": 17,
    "topic": "Data Preparation",
    "difficulty": 1,
    "question": "You need to design a data pipeline that ingests data from CSV, Avro, and Parquet files into Cloud Storage. The data includes raw user input. You need to remove all malicious SQL injections before storing the data in BigQuery. Which data manipulation methodology should you choose?",
    "options": [
      "A. EL",
      "B. ELT",
      "C. ETL",
      "D. ETLT"
    ],
    "correct": 2,
    "explanation": "You must transform (remove SQL injections) before load, which is ETL.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. \"remove all malicious SQL injections before storing the data in BigQuery\"\n\nIf you are preforming transformation before, it is ETL.\n\nIf you are doing after, it is ELT.\n\nIf you are doing before and after, ETLT (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 17,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for C: transform before load.",
    "conceptSummary": "Choosing ETL when transformation must happen before loading.",
    "correctRationale": "Extract-Transform-Load cleans the data — stripping malicious SQL injection — before it lands in BigQuery. ELT loads raw first (injections reach the warehouse), EL skips transformation entirely, and ETLT adds a second unnecessary post-load transform.",
    "optionRationales": [
      "Wrong: extract-load with no transform leaves malicious payloads in storage and BigQuery.",
      "Wrong: ELT loads the raw data (and its injections) into BigQuery before cleaning.",
      "Correct: ETL transforms before load, so sanitized data is what reaches BigQuery.",
      "Wrong: ETLT adds a redundant post-load transform when the requirement is met by a single pre-load cleaning."
    ]
  },
  {
    "id": 16,
    "topic": "Looker & Visualization",
    "difficulty": 2,
    "question": "You have created a LookML model and dashboard that shows daily sales metrics for five regional managers to use. You want to ensure that the regional managers can only see sales metrics specific to their region. You need an easy-to-implement solution. What should you do?",
    "options": [
      "A. Create a sales_region user attribute, and assign each manager’s region as the value of their user attribute. Add an access_filter Explore filter on the region_name dimension by using the sales_region user attribute.",
      "B. Create five different Explores with the sql_always_filter Explore filter applied on the region_name dimension. Set each region_name value to the corresponding region for each manager.",
      "C. Create separate Looker dashboards for each regional manager. Set the default dashboard filter to the corresponding region for each manager.",
      "D. Create separate Looker instances for each regional manager. Copy the LookML model and dashboard to each instance. Provision viewer access to the corresponding manager."
    ],
    "correct": 0,
    "explanation": "A user attribute plus an access_filter on the Explore is Looker's built-in row-level filtering per manager.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. The best and easiest-to-implement solution is A. Create a sales_region user attribute, and assign each manager’s region as the value of their user attribute. Add an access_filter Explore filter on the region_name dimension by using the sales_region user attribute. This option is optimal because it directly leverages Looker's built-in features for row-level security (Access Filters) and user ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 16,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for A, matching the snippet's suggested answer A.",
    "conceptSummary": "Restricting an Explore per-region with a user attribute access_filter.",
    "correctRationale": "access_filter combined with a user attribute filters every query from that Explore by the viewer's region — one model, five automatic restrictions. Five separate Explores or dashboards duplicates maintenance, and separate instances are absurd for one dashboard.",
    "optionRationales": [
      "Correct: an access_filter on region_name bound to a sales_region user attribute filters each manager automatically.",
      "Wrong: five Explores duplicates the model five times and is brittle.",
      "Wrong: dashboard-level default filters are cosmetic; users can change them and see other regions' data.",
      "Wrong: separate Looker instances is massive overkill for five regional views."
    ]
  },
  {
    "id": 15,
    "topic": "Lifecycle & Availability",
    "difficulty": 2,
    "question": "You have a BigQuery dataset containing sales data. This data is actively queried for the first 6 months. After that, the data is not queried but needs to be retained for 3 years for compliance reasons. You need to implement a data management strategy that meets access and compliance requirements, while keeping cost and administrative overhead to a minimum. What should you do?",
    "options": [
      "A. Use BigQuery long-term storage for the entire dataset. Set up a Cloud Run function to delete the data from BigQuery after 3 years.",
      "B. Partition a BigQuery table by month. After 6 months, export the data to Coldline storage. Implement a lifecycle policy to delete the data from Cloud Storage after 3 years.",
      "C. Set up a scheduled query to export the data to Cloud Storage after 6 months. Write a stored procedure to delete the data from BigQuery after 3 years.",
      "D. Store all data in a single BigQuery table without partitioning or lifecycle policies."
    ],
    "correct": 1,
    "explanation": "Keep the data in BigQuery — it automatically shifts to long-term pricing after 90 days — and delete it after three years.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. The best option is B. Partition a BigQuery table by month. After 6 months, export the data to Coldline storage. Implement a lifecycle policy to delete the data from Cloud Storage after 3 years. Option B provides the optimal balance of meeting the 3-year data retention requirement, achieving excellent cost optimization by tiering data to Coldline, and maintaining reasonable administrative ... (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 15,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote B, matching the search-snippet suggested answer B.",
    "conceptSummary": "Managing warm-then-retained BigQuery data at minimum cost and effort.",
    "correctRationale": "Partitioning the table by month and exporting the aged partitions to Coldline after six months — then deleting via a lifecycle policy after three years — minimizes storage cost while meeting the retention window. BigQuery does apply long-term pricing to data unmodified for 90 days, which halves the cost, but long-term BigQuery storage still costs more than Coldline for data that is never queried, and the lifecycle rule needs no custom code.",
    "optionRationales": [
      "Wrong: long-term storage halves the BigQuery price after 90 days, but it still costs more than Coldline for data that is never queried, and deleting after 3 years with a custom Cloud Run function adds code to maintain.",
      "Correct: monthly partitioning plus a Coldline export at six months and a lifecycle delete at three years is the low-cost, low-overhead retention path.",
      "Wrong: a scheduled export plus a stored procedure is more custom machinery than needed.",
      "Wrong: a single unpartitioned table gives no lifecycle control and bills everything at active rates."
    ]
  },
  {
    "id": 14,
    "topic": "BigQuery & SQL",
    "difficulty": 2,
    "question": "Your team wants to create a monthly report to analyze inventory data that is updated daily. You need to aggregate the inventory counts by using only the most recent month of data, and save the results to be used in a Looker Studio dashboard. What should you do?",
    "options": [
      "A. Create a materialized view in BigQuery that uses the SUM( ) function and the DATE_SUB( ) function.",
      "B. Create a saved query in the BigQuery console that uses the SUM( ) function and the DATE_SUB( ) function. Re-run the saved query every month, and save the results to a BigQuery table.",
      "C. Create a BigQuery table that uses the SUM( ) function and the _PARTITIONDATE filter.",
      "D. Create a BigQuery table that uses the SUM( ) function and the DATE_DIFF( ) function."
    ],
    "correct": 0,
    "explanation": "A materialized view precomputes the monthly aggregation and stays current automatically for the dashboard.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. The best option is A. Create a materialized view in BigQuery that uses the SUM( ) function and the DATE_SUB( ) function. Materialized views provide the efficiency of pre-computation, automatic updates, and are directly usable in Looker Studio, making them the ideal choice for creating an automated and performant monthly inventory report. Options B, C, and D are either manual, technically ... (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 14,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "medium",
    "discussionSummary": "Single vote for A: the materialized view stays up to date for the dashboard.",
    "conceptSummary": "Precomputing a monthly aggregate for a Looker Studio dashboard.",
    "correctRationale": "A materialized view using SUM and DATE_SUB keeps the last month's aggregate precomputed and automatically refreshed, and Looker Studio can query it directly. Caveat: incremental materialized views do not accept non-deterministic functions such as CURRENT_DATE(), so in practice the rolling window comes from a partition filter or a non-incremental materialized view (max_staleness) — but the exam's intended answer is still A. Manually re-running a saved query adds a monthly chore, and plain tables with the given filters go stale between loads.",
    "optionRationales": [
      "Correct: a materialized view with SUM and DATE_SUB stays fresh automatically and feeds Looker Studio directly.",
      "Wrong: re-running a saved query every month is a manual step that a materialized view eliminates.",
      "Wrong: a plain table computed once goes stale as daily data arrives.",
      "Wrong: DATE_DIFF computes an interval, not the rolling last-month window, and the static table still goes stale."
    ]
  },
  {
    "id": 13,
    "topic": "Pipelines & Processing",
    "difficulty": 1,
    "question": "You need to create a new data pipeline. You want a serverless solution that meets the following requirements:\n• Data is streamed from Pub/Sub and is processed in real-time.\n• Data is transformed before being stored.\n• Data is stored in a location that will allow it to be analyzed with SQL using Looker.\nWhich Google Cloud services should you recommend for the pipeline?",
    "images": [
      {
        "url": "/question-images/gcp-adp/q013-pipeline-diagram.png",
        "alt": "Pipeline diagram read left to right: the Pub/Sub logo, an arrow to a large blue question mark labeled '1', an arrow to a second question mark labeled '2', then an arrow to the Looker logo. The question marks are placeholders for the services to recommend."
      }
    ],
    "options": [
      "A. 1. Dataproc Serverless 2. Bigtable",
      "B. 1. Cloud Composer 2. Cloud SQL for MySQL",
      "C. 1. BigQuery 2. Analytics Hub",
      "D. 1. Dataflow 2. BigQuery"
    ],
    "correct": 3,
    "explanation": "Dataflow is the serverless real-time transform between Pub/Sub and BigQuery, and BigQuery is the SQL-analytics store behind Looker.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. pubsub, dataflow, bigquery, looker\n\nthis architecture is very common in GCP. (3 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 13,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for D: Dataflow into BigQuery.",
    "conceptSummary": "Choosing services for a Pub/Sub-to-Looker real-time pipeline.",
    "correctRationale": "The requirements map slot 1 to Dataflow — serverless streaming that transforms Pub/Sub events — and slot 2 to BigQuery, the SQL-analytics store Looker queries. Bigtable is not SQL-friendly for Looker, Composer orchestrates rather than processes streams, and Analytics Hub shares data rather than storing it.",
    "optionRationales": [
      "Wrong: Dataproc Serverless is for batch/Spark jobs, and Bigtable is not a SQL analytics store for Looker.",
      "Wrong: Composer orchestrates pipelines rather than processing streams, and Cloud SQL for MySQL is not the analytics target.",
      "Wrong: BigQuery is not a streaming transform engine, and Analytics Hub shares datasets rather than storing stream output.",
      "Correct: Dataflow transforms the Pub/Sub stream serverlessly and BigQuery serves SQL analysis through Looker."
    ]
  },
  {
    "id": 12,
    "topic": "Security & Access",
    "difficulty": 1,
    "question": "You recently inherited a task for managing Dataflow streaming pipelines in your organization and noticed that proper access had not been provisioned to you. You need to request a Google-provided IAM role so you can restart the pipelines. You need to follow the principle of least privilege. What should you do?",
    "options": [
      "A. Request the Dataflow Developer role.",
      "B. Request the Dataflow Viewer role.",
      "C. Request the Dataflow Worker role.",
      "D. Request the Dataflow Admin role."
    ],
    "correct": 0,
    "explanation": "Dataflow Developer is the least-privilege Google-provided role that can execute and restart jobs.",
    "discussion": [
      {
        "user": "wask",
        "text": "Selected Answer: A. A, because D is for Service Accounts"
      },
      {
        "user": "Rio55",
        "text": "Selected Answer: A. A and D would work but because to follow the principle of least privilege, we're going to choose A, Dataflow developer."
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. The best option is A. Request the Dataflow Developer role. Requesting the Dataflow Developer role is optimal because it grants the necessary permissions to restart Dataflow pipelines, aligning with the user's need, while adhering to the principle of least privilege by providing a focused set of permissions. Option B (Dataflow Viewer) is insufficient as it only provides read-only access and lacks ... (4 votes)"
      },
      {
        "user": "jatinbhatia2055",
        "text": "Selected Answer: C. Dataflow Worker provides the necessary permissions for managing and interacting with Dataflow streaming pipelines, including restarting them. This role gives you the ability to execute and manage the pipelines without granting excessive permissions, aligning with the principle of least privilege."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 12,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "high",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Majority A (3 votes): Developer is least privilege for restarting; one dissenting C confused the worker role's purpose. Resolved to A. Independent review (Gemini, Oct 2026) confirmed A: developer covers job management while worker is for the worker service account.",
    "conceptSummary": "Picking the least-privilege IAM role to operate Dataflow jobs.",
    "correctRationale": "roles/dataflow.developer can view, launch, update, drain, and cancel jobs — exactly what restarting a pipeline needs — without admin's broader storage and compute permissions. Viewer is read-only, Worker is meant for the worker service account rather than a human operator, and Admin exceeds least privilege.",
    "optionRationales": [
      "Correct: Dataflow Developer grants job management (launch, update, drain, cancel) at least privilege.",
      "Wrong: Dataflow Viewer is read-only and cannot restart jobs.",
      "Wrong: Dataflow Worker is for the worker service account that runs the job, not for human operators.",
      "Wrong: Dataflow Admin works but grants broader management permissions than needed, violating least privilege."
    ]
  },
  {
    "id": 11,
    "topic": "Storage Selection",
    "difficulty": 2,
    "question": "Your company has developed a website that allows users to upload and share video files. These files are most frequently accessed and shared when they are initially uploaded. Over time, the files are accessed and shared less frequently, although some old video files may remain very popular.\nYou need to design a storage system that is simple and cost-effective. What should you do?",
    "options": [
      "A. Create a single-region bucket with Autoclass enabled.",
      "B. Create a single-region bucket. Configure a Cloud Scheduler job that runs every 24 hours and changes the storage class based on upload date.",
      "C. Create a single-region bucket with custom Object Lifecycle Management policies based on upload date.",
      "D. Create a single-region bucket with Archive as the default storage class."
    ],
    "correct": 0,
    "explanation": "Autoclass moves each object by its real access pattern, keeping old-but-popular videos hot with zero maintenance.",
    "discussion": [
      {
        "user": "AmarT",
        "text": "Selected Answer: A. Can anyone please share the complete question set.\n\nIf you already have please share it over\n[email protected]\n.\n\nThanks already for the community support."
      },
      {
        "user": "Rio55",
        "text": "Selected Answer: A. It's A because of the old video files that can remain popular"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. A. Autoclass makes the most sense for some files accessed and shared less frequently, with some old video files remaining popular. (2 votes)"
      },
      {
        "user": "jatinbhatia2055",
        "text": "Selected Answer: A. Autoclass is a feature of Google Cloud Storage that automatically optimizes the storage class for objects based on their access patterns. When objects are newly uploaded and frequently accessed, Autoclass will place them in a more performant (and more expensive) storage class, like Standard. Over time, if access to the objects decreases, Autoclass will automatically transition them to a ..."
      },
      {
        "user": "trashbox",
        "text": "Selected Answer: A. I will go with \"A\" because it should be automatically optimized based on actual access patterns. (5 votes)"
      },
      {
        "user": "Pubb",
        "text": "I chose \"A\" too, because the problem does not describe any specific lifecycle policy."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 11,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous A (5 votes): Autoclass because age does not predict popularity.",
    "conceptSummary": "Choosing Autoclass when access frequency is unpredictable per object.",
    "correctRationale": "Autoclass observes each object's actual access pattern and moves it between hot and cold tiers automatically, so an old video that stays popular stays in Standard while cold objects get cheaper. Age-based lifecycle rules would demote popular old files, and Archive charges retrieval fees with a 365-day minimum that punishes hot content.",
    "optionRationales": [
      "Correct: Autoclass tiers each object by its actual access pattern, so popular old videos stay hot with no maintenance.",
      "Wrong: an age-based lifecycle rule demotes old-but-still-popular videos, which breaks the access pattern.",
      "Wrong: custom lifecycle policies on upload date have the same flaw — popularity does not correlate with age here.",
      "Wrong: Archive has retrieval fees and a 365-day minimum duration, terrible for content still being accessed."
    ]
  },
  {
    "id": 10,
    "topic": "Data Sharing & Governance",
    "difficulty": 2,
    "question": "Another team in your organization is requesting access to a BigQuery dataset. You need to share the dataset with the team while minimizing the risk of unauthorized copying of data. You also want to create a reusable framework in case you need to share this data with other teams in the future. What should you do?",
    "options": [
      "A. Create authorized views in the team’s Google Cloud project that is only accessible by the team.",
      "B. Create a private exchange using Analytics Hub with data egress restriction, and grant access to the team members.",
      "C. Enable domain restricted sharing on the project. Grant the team members the BigQuery Data Viewer IAM role on the dataset.",
      "D. Export the dataset to a Cloud Storage bucket in the team’s Google Cloud project that is only accessible by the team."
    ],
    "correct": 1,
    "explanation": "An Analytics Hub private exchange with a data egress restriction stops copying and gives a reusable sharing framework.",
    "discussion": [
      {
        "user": "oss134566",
        "text": "Selected Answer: B. analytics hub makes more sense for cross team sharing\n\nviews can be used but can be copied by querying so would violate that requirement"
      },
      {
        "user": "Bondman",
        "text": "Selected Answer: B. I think it should be B as it can be 'reused'"
      },
      {
        "user": "JAGLees",
        "text": "Selected Answer: B. Either Authorized Views or Analytics Hub could be reasonable, but I feel the mention of reusable framework and preventing data copying are pushing towards Analytics Hub woth egress restrictions (3 votes)"
      },
      {
        "user": "Rio55",
        "text": "Selected Answer: A. Comparing the options, A (authorized views) and B (Analytics Hub) both seem great for job, authorized views are often a straightforward and effective way to share data while controlling access and minimizing copying.\n\nI've choosing so far Authorized views for internal sharing and Analytics hub for external sharing."
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. While Analytics Hub (Option B) is a powerful data sharing platform, Authorized Views (Option A) are the superior choice for this specific scenario of sharing a BigQuery dataset with another internal team while prioritizing minimizing unauthorized copying and ease of implementation. Authorized Views are simpler, more secure against data copying for internal use cases, easier to implement, and more ... (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 10,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "high",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Split between B (3 votes) and A (2 votes): the egress-restriction argument wins — authorized views cannot prevent copying query results. Resolved to B. Independent review (Gemini, Oct 2026) confirmed B: egress restrictions block copying where authorized views can't.",
    "conceptSummary": "Sharing a dataset without copy risk using an Analytics Hub private exchange.",
    "correctRationale": "Analytics Hub private exchanges share data in place and can apply data egress restrictions so subscribers cannot copy or export it, while listings provide a reusable framework for future teams. Authorized views control what is visible but readers can still copy query results, domain restricted sharing limits identity by domain without stopping copying, and exporting creates an uncontrolled copy.",
    "optionRationales": [
      "Wrong: authorized views control visibility but recipients can still copy query results, and views must be created on the source side rather than in the consumer project.",
      "Correct: a private Analytics Hub exchange with a data egress restriction blocks copying and is reusable for other teams.",
      "Wrong: domain restricted sharing constrains identities by domain but does not stop recipients from copying data.",
      "Wrong: exporting the dataset creates an uncontrolled copy in the other team's project."
    ]
  },
  {
    "id": 9,
    "topic": "Orchestration & Monitoring",
    "difficulty": 3,
    "question": "You are designing a pipeline to process data files that arrive in Cloud Storage by 3:00 am each day. Data processing is performed in stages, where the output of one stage becomes the input of the next. Each stage takes a long time to run. Occasionally a stage fails, and you have to address\nthe problem. You need to ensure that the final output is generated as quickly as possible. What should you do?",
    "options": [
      "A. Design a Spark program that runs under Dataproc. Code the program to wait for user input when an error is detected. Rerun the last action after correcting any stage output data errors.",
      "B. Design the pipeline as a set of PTransforms in Dataflow. Restart the pipeline after correcting any stage output data errors.",
      "C. Design the workflow as a Cloud Workflow instance. Code the workflow to jump to a given stage based on an input parameter. Rerun the workflow after correcting any stage output data errors.",
      "D. Design the processing as a directed acyclic graph (DAG) in Cloud Composer. Clear the state of the failed task after correcting any stage output data errors."
    ],
    "correct": 3,
    "explanation": "A Composer DAG lets you clear the failed task so Airflow reruns only from that point instead of repeating finished stages.",
    "discussion": [
      {
        "user": "JAGLees",
        "text": "Selected Answer: D. Composer is the recommended orchestration tool for managing workloads in Google Cloud and perfectly meets these requirements"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. The best option is D. Design the processing as a directed acyclic graph (DAG) in Cloud Composer. Clear the state of the failed task after correcting any stage output data errors. Cloud Composer (Apache Airflow) is specifically designed for orchestrating complex data pipelines, provides robust error handling with task-level rerun capabilities for efficient recovery, and offers a fully managed and ..."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 9,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous D (2 votes): Composer task clearing reruns only the failed stage.",
    "conceptSummary": "Designing a staged pipeline that can restart from a failed stage.",
    "correctRationale": "Cloud Composer runs the pipeline as a DAG with one task per stage; after fixing the bad output, clearing the failed task's state reruns it and downstream tasks without repeating completed long stages. Waiting for user input inside a Spark program is not a pipeline design, restarting a Dataflow pipeline reruns everything, and a Cloud Workflows jump needs custom parameter logic where Composer's task clearing is built in.",
    "optionRationales": [
      "Wrong: blocking a Spark program for user input is not a pipeline design and wastes a cluster.",
      "Wrong: restarting a Dataflow pipeline reruns all stages, wasting the long completed work.",
      "Wrong: Workflows can jump to a stage but only with custom parameter logic; clearing a task is the built-in mechanism.",
      "Correct: a Composer DAG's task clearing reruns the failed task onward without repeating finished stages."
    ]
  },
  {
    "id": 8,
    "topic": "Machine Learning",
    "difficulty": 1,
    "question": "You work for an ecommerce company that has a BigQuery dataset that contains customer purchase history, demographics, and website interactions. You need to build a machine learning (ML) model to predict which customers are most likely to make a purchase in the next month. You have limited engineering resources and need to minimize the ML expertise required for the solution. What should you do?",
    "options": [
      "A. Use BigQuery ML to create a logistic regression model for purchase prediction.",
      "B. Use Vertex AI Workbench to develop a custom model for purchase prediction.",
      "C. Use Colab Enterprise to develop a custom model for purchase prediction.",
      "D. Export the data to Cloud Storage, and use AutoML Tables to build a classification model for purchase prediction."
    ],
    "correct": 0,
    "explanation": "BigQuery ML logistic regression trains in place with plain SQL, so it needs almost no ML expertise or engineering.",
    "discussion": [
      {
        "user": "vasgupta",
        "text": "Selected Answer: D. Logistic regression won't work for customer churn predictions. (2 votes)"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. A.\n\nUse BigQuery ML minimizes the ML Expertise required. (3 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 8,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "high",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Split votes A/D, with one commenter wrongly claiming logistic regression 'won't work'; resolved to A — BQML logistic regression fits a binary purchase outcome with minimal expertise. AutoML Tables is retired (see legacyNote). Independent review (Gemini, Oct 2026) confirmed A: binary classification in BigQuery ML with SQL is the minimal-expertise fit.",
    "conceptSummary": "Building a purchase-propensity model in BigQuery ML with minimal ML expertise.",
    "correctRationale": "BigQuery ML creates and trains a logistic regression model in place with SQL, which is ideal for a binary 'will purchase next month' outcome and demands minimal ML expertise. Custom models in Vertex AI Workbench or Colab Enterprise require ML skills and engineering effort, and exporting to AutoML Tables adds steps on top of a legacy product that now lives on as Vertex AI tabular AutoML.",
    "optionRationales": [
      "Correct: BigQuery ML logistic regression trains in-database with SQL, the lowest-expertise path to a purchase-propensity model.",
      "Wrong: a custom Vertex AI Workbench model needs ML expertise and engineering effort the team lacks.",
      "Wrong: a custom Colab Enterprise model has the same custom-development problem.",
      "Wrong: exporting the data adds steps, and AutoML Tables is a legacy product superseded by Vertex AI tabular AutoML."
    ],
    "legacyNote": "AutoML Tables (option D) has been retired; its functionality lives on as Vertex AI AutoML for tabular data, which can also read directly from BigQuery."
  },
  {
    "id": 7,
    "topic": "Lifecycle & Availability",
    "difficulty": 2,
    "question": "You manage a large amount of data in Cloud Storage, including raw data, processed data, and backups. Your organization is subject to strict compliance regulations that mandate data immutability for specific data types. You want to use an efficient process to reduce storage costs while ensuring that your storage strategy meets retention requirements. What should you do?",
    "options": [
      "A. Configure lifecycle management rules to transition objects to appropriate storage classes based on access patterns. Set up Object Versioning for all objects to meet immutability requirements.",
      "B. Move objects to different storage classes based on their age and access patterns. Use Cloud Key Management Service (Cloud KMS) to encrypt specific objects with customer-managed encryption keys (CMEK) to meet immutability requirements.",
      "C. Create a Cloud Run function to periodically check object metadata, and move objects to the appropriate storage class based on age and access patterns. Use object holds to enforce immutability for specific objects.",
      "D. Use object holds to enforce immutability for specific objects, and configure lifecycle management rules to transition objects to appropriate storage classes based on age and access patterns."
    ],
    "correct": 3,
    "explanation": "Object holds enforce immutability on specific objects while lifecycle rules move objects to cheaper classes as they age.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: D. The best option is D. Object holds and lifecycle rules. Option D is best because Object holds enforce immutability for compliance, and lifecycle rules ensure cost efficiency by managing storage classes. Option A (Object Versioning) is incorrect because Versioning is for recovery, not strict immutability. Option B (CMEK) is incorrect because CMEK is for encryption, not immutability. Option C ... (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 7,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Single vote for D: holds for immutability, lifecycle rules for cost.",
    "conceptSummary": "Enforcing object immutability with holds plus lifecycle-based storage tiering.",
    "correctRationale": "Object holds (temporary or event-based) prevent specific objects from being deleted or overwritten, satisfying strict immutability requirements, while lifecycle rules transition objects to cheaper storage classes by age or access pattern. Object Versioning preserves old versions but does not prevent deletion of the live object, CMEK is encryption rather than immutability, and a Cloud Run function is custom code instead of the built-in lifecycle feature.",
    "optionRationales": [
      "Wrong: Object Versioning keeps old versions for recovery but does not make objects undeletable.",
      "Wrong: CMEK encrypts data but says nothing about immutability, and a manual class-moving scheme is custom work.",
      "Wrong: a custom Cloud Run function replaces built-in lifecycle management with code you must maintain.",
      "Correct: object holds enforce immutability and lifecycle rules handle cost-efficient class transitions."
    ]
  },
  {
    "id": 6,
    "topic": "Data Preparation",
    "difficulty": 2,
    "question": "You work for a healthcare company that has a large on-premises data system containing patient records with personally identifiable information (PII) such as names, addresses, and medical diagnoses. You need a standardized managed solution that de-identifies PII across all your data feeds prior to ingestion to Google Cloud. What should you do?",
    "options": [
      "A. Use Cloud Run functions to create a serverless data cleaning pipeline. Store the cleaned data in BigQuery.",
      "B. Use Cloud Data Fusion to transform the data. Store the cleaned data in BigQuery.",
      "C. Load the data into BigQuery, and inspect the data by using SQL queries. Use Dataflow to transform the data and remove any errors.",
      "D. Use Apache Beam to read the data and perform the necessary cleaning and transformation operations. Store the cleaned data in BigQuery."
    ],
    "correct": 1,
    "explanation": "Cloud Data Fusion is the managed, standardized way to de-identify PII across feeds before it lands in Google Cloud.",
    "discussion": [
      {
        "user": "JAGLees",
        "text": "Selected Answer: B. A isnt right as Cloud Run isn't well suited to Data pipelines and generally isn't recommended. It *can* handle processing data, but not large volumes of batch data and isn't intended as an ETL tool.\n\nC isn't right because Ingesting first into BigQuery doesn't meet the requirement to cleansing BEFORE ingestion.\n\nD isn't right because Apache BEAM isn't a managed solution (although if the data had ..."
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. The best option is B. Cloud Data Fusion. Option B is best because Data Fusion is a managed, visual, standardized data integration service ideal for building de-identification pipelines. Option A (Cloud Run functions) is incorrect because it requires more coding and is less inherently standardized for pipelines. Option C (Load to BigQuery first) is incorrect because it violates the requirement to ..."
      },
      {
        "user": "rich_maverick",
        "text": "Selected Answer: B. Cloud Data Fusion can be used to Sensitive Protection Service to de-identify feeds. However, Cloud Dataflow (a Google managed version of Beam) is the more general approach being used. I am only selecting Data Fusion over Beam because it is a named Google service. Had they said Dataflow, I would have gone there instead."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 6,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "medium",
    "discussionSummary": "Unanimous B (3 votes): managed, standardized de-identification before ingestion.",
    "conceptSummary": "De-identifying PII with a managed integration pipeline prior to ingestion.",
    "correctRationale": "Cloud Data Fusion is a managed, visual data integration service that standardizes pipelines across many feeds and can de-identify data via the Sensitive Data Protection (DLP) plugin before it lands in BigQuery. Cloud Run functions are custom code per feed, loading into BigQuery first violates 'prior to ingestion', and raw Apache Beam is a framework rather than a managed solution.",
    "optionRationales": [
      "Wrong: Cloud Run functions are custom per-feed code, not a standardized pipeline solution.",
      "Correct: Data Fusion is managed and standardizable, and its Sensitive Data Protection plugin de-identifies data before it lands in BigQuery.",
      "Wrong: loading into BigQuery first ingests the PII, violating the requirement to de-identify before ingestion.",
      "Wrong: Apache Beam alone is a programming framework, not a managed solution; managed Beam on Google Cloud would be Dataflow, which is not offered."
    ]
  },
  {
    "id": 5,
    "topic": "Lifecycle & Availability",
    "difficulty": 1,
    "question": "You manage a Cloud Storage bucket that stores temporary files created during data processing. These temporary files are only needed for seven days, after which they are no longer needed. To reduce storage costs and keep your bucket organized, you want to automatically delete these files once they are older than seven days. What should you do?",
    "options": [
      "A. Set up a Cloud Scheduler job that invokes a weekly Cloud Run function to delete files older than seven days.",
      "B. Configure a Cloud Storage lifecycle rule that automatically deletes objects older than seven days.",
      "C. Develop a batch process using Dataflow that runs weekly and deletes files based on their age.",
      "D. Create a Cloud Run function that runs daily and deletes files older than seven days."
    ],
    "correct": 1,
    "explanation": "A Cloud Storage lifecycle rule with a Delete action and age condition removes stale objects automatically.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. The best option is B. Cloud Storage lifecycle rule. Option B is best because lifecycle rules are built-in, automatic, and efficient for Cloud Storage object management like deletion based on age. Option A (Cloud Scheduler + Cloud Run) is incorrect because it's overly complex using two services when one built-in feature exists. Option C (Dataflow batch) is incorrect because Dataflow is overkill ..."
      },
      {
        "user": "rich_maverick",
        "text": "Selected Answer: B. Simplest solution. All solutions can be made to work."
      },
      {
        "user": "jatinbhatia2055",
        "text": "Selected Answer: B. The most effective solution. (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 5,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous B (3 votes): native lifecycle rules, no custom code.",
    "conceptSummary": "Auto-deleting Cloud Storage objects older than seven days.",
    "correctRationale": "Object Lifecycle Management's Delete action with an age condition deletes objects older than seven days automatically, with zero code to maintain. The other answers all schedule custom compute that must be written, deployed, and maintained.",
    "optionRationales": [
      "Wrong: a weekly scheduled Cloud Run function is custom code and could leave files up to a week late.",
      "Correct: a lifecycle rule deletes objects older than seven days natively, with no code to run or maintain.",
      "Wrong: a weekly Dataflow batch is heavyweight custom tooling for a built-in feature.",
      "Wrong: a daily Cloud Run function still requires writing, deploying, and maintaining deletion code."
    ]
  },
  {
    "id": 4,
    "topic": "Pipelines & Processing",
    "difficulty": 2,
    "question": "You want to process and load a daily sales CSV file stored in Cloud Storage into BigQuery for downstream reporting. You need to quickly build a scalable data pipeline that transforms the data while providing insights into data quality issues. What should you do?",
    "options": [
      "A. Create a batch pipeline in Cloud Data Fusion by using a Cloud Storage source and a BigQuery sink.",
      "B. Load the CSV file as a table in BigQuery, and use scheduled queries to run SQL transformation scripts.",
      "C. Load the CSV file as a table in BigQuery. Create a batch pipeline in Cloud Data Fusion by using a BigQuery source and sink.",
      "D. Create a batch pipeline in Dataflow by using the Cloud Storage CSV file to BigQuery batch template."
    ],
    "correct": 0,
    "explanation": "Cloud Data Fusion builds a visual, scalable Cloud Storage-to-BigQuery pipeline quickly and its Wrangler surfaces data quality insights.",
    "discussion": [
      {
        "user": "n2183712847",
        "text": "Selected Answer: A. The best option is A. Cloud Data Fusion pipeline (Cloud Storage to BigQuery). Option A is best because Cloud Data Fusion is visual and fast for pipeline building, scalable, handles transformations visually, and provides data quality insights within the pipeline. Option B (BigQuery load + SQL) is incorrect because scheduled queries are less of a pipeline and offer fewer built-in data quality ... (3 votes)"
      },
      {
        "user": "jatinbhatia2055",
        "text": "Selected Answer: D. There should be more detail in the question. Though both Dataflow and Datafusion can be used. Datafusion is more suitable if you dont want to code and let google do the work.\n\nIn case there is more complexity in daily analysis of the CSV, Dataflow is the best approach as it provide in built templates and custom template creation both. (3 votes)"
      },
      {
        "user": "rich_maverick",
        "text": "Answer D is saying Dataflow and not Datafusion. We all agree that Datafusion is the \"quick and scalable\" option. Also, Dataflow does not give insights to data quality issues. Answer is A. (2 votes)"
      },
      {
        "user": "trashbox",
        "text": "Selected Answer: A. Cloud Data Fusion enables us to build a scalable data pipeline from Cloud Storage to BigQuery. In addition, the service provides us an end-to-end data lineage for root cause and impact analysis. (4 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 4,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "high",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Split 2–2 between A and D: commenters note Data Fusion is the 'quick and scalable' low-code option and that the Dataflow template lacks data quality insight. Resolved to A — Wrangler's data-quality insights are the differentiator; the Dataflow template only loads data. Independent review (Gemini, Oct 2026) confirmed A: Wrangler's data profiling and quality insights settle it.",
    "conceptSummary": "Building a CSV-to-BigQuery batch pipeline with built-in data quality insight.",
    "correctRationale": "Cloud Data Fusion is the fast, low-code way to build a scalable pipeline directly from a Cloud Storage source to a BigQuery sink, and its Wrangler feature surfaces data quality issues and transformation directives. Scheduled queries offer no data-quality tooling, loading into BigQuery first adds an unnecessary hop, and the Dataflow CSV template loads data but provides no data quality insight.",
    "optionRationales": [
      "Correct: a Cloud Data Fusion batch pipeline goes straight from Cloud Storage to BigQuery and Wrangler exposes data quality issues.",
      "Wrong: scheduled SQL queries transform but provide no data-quality insight tooling.",
      "Wrong: loading into BigQuery first and re-reading it as a Data Fusion source adds a redundant hop.",
      "Wrong: the Dataflow CSV-to-BigQuery template loads data but gives no data quality insights."
    ]
  },
  {
    "id": 3,
    "topic": "Pipelines & Processing",
    "difficulty": 2,
    "question": "Your company is building a near real-time streaming pipeline to process JSON telemetry data from small appliances. You need to process messages arriving at a Pub/Sub topic, capitalize letters in the serial number field, and write results to BigQuery. You want to use a managed service and write a minimal amount of code for underlying transformations. What should you do?",
    "options": [
      "A. Use a Pub/Sub to BigQuery subscription, write results directly to BigQuery, and schedule a transformation query to run every five minutes.",
      "B. Use a Pub/Sub to Cloud Storage subscription, write a Cloud Run service that is triggered when objects arrive in the bucket, performs the transformations, and writes the results to BigQuery.",
      "C. Use the “Pub/Sub to BigQuery” Dataflow template with a UDF, and write the results to BigQuery.",
      "D. Use a Pub/Sub push subscription, write a Cloud Run service that accepts the messages, performs the transformations, and writes the results to BigQuery."
    ],
    "correct": 2,
    "explanation": "The Google-provided Pub/Sub to BigQuery Dataflow template with a UDF is managed, streaming, and needs only a few lines of transform code.",
    "discussion": [
      {
        "user": "jitbay",
        "text": "Selected Answer: C. now we can use a pu/sub directly with simple transformations as toUpperCase with Transform message from pub/sub before it heates big query and without the need for dataflow and UDF schema , this is being the standerd for 2026"
      },
      {
        "user": "NishantRanjanKhaware",
        "text": "Selected Answer: C. Pub/Sub with UDF is having least coding overhead"
      },
      {
        "user": "JAGLees",
        "text": "Selected Answer: C. Cloud Run is not minimal code (or recommended for Data Pipelines)\n\nA scheduled job is not \"near realtime\"\n\nSo the answer is Dataflow with a UDF which gives a scalable managed solution with minimal code"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. The best option is C. Use the “Pub/Sub to BigQuery” Dataflow template with a UDF. Option C is best because Dataflow templates are managed, serverless, and designed for streaming Pub/Sub data to BigQuery. UDFs allow minimal code for transformations within the pipeline. Option A (Pub/Sub to BigQuery + scheduled query) is incorrect because scheduled queries are not real-time transformations. Option ... (2 votes)"
      },
      {
        "user": "bc3f222",
        "text": "Selected Answer: A. Pub/Sub to BQ is now the recommended solution, no longer need dataflow"
      },
      {
        "user": "rich_maverick",
        "text": "Selected Answer: C. I agree that C is the best answer. However, answer A is doable and is also low/no code and also considered acceptable."
      },
      {
        "user": "trashbox",
        "text": "Selected Answer: C. A UDF of the Dataflow is a simpler coding option than a Cloud Run."
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 3,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": true,
    "confidence": "high",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Majority C (6 votes) for the Dataflow template UDF; one vote for A citing Pub/Sub write subscriptions. Resolved to C: the scheduled-query approach is micro-batch, not near-real-time transformation. Independent review (Gemini, Oct 2026) confirmed C: the Dataflow template transforms in-stream while option A's five-minute scheduled query isn't near real-time.",
    "conceptSummary": "Choosing a managed near-real-time Pub/Sub-to-BigQuery streaming pipeline.",
    "correctRationale": "The Pub/Sub to BigQuery Dataflow template is a Google-maintained, serverless streaming pipeline; a JavaScript or Python UDF applies a small transformation like capitalizing a field. A scheduled query every five minutes is micro-batching, not near real-time transformation on the stream, and custom Cloud Run services mean writing and operating more code. Pub/Sub single message transforms are a newer lightweight alternative, but among the options given the Dataflow template is the intended answer.",
    "optionRationales": [
      "Wrong: writing to BigQuery first and running a query every five minutes is micro-batching, not near-real-time in-stream transformation.",
      "Wrong: detouring through a Cloud Storage subscription plus a Cloud Run service adds a hop and custom code.",
      "Correct: the Google-provided Pub/Sub-to-BigQuery Dataflow template with a UDF is managed, streaming, and minimal-code.",
      "Wrong: a push subscription to a custom Cloud Run service requires you to write and operate the transform service yourself."
    ],
    "legacyNote": "Pub/Sub now supports single message transforms (SMTs): a JavaScript UDF can transform each message on a BigQuery subscription, so a simple change like capitalizing a field no longer needs Dataflow. Option A doesn't use SMTs (it relies on a five-minute scheduled query), so C is still the answer to this question."
  },
  {
    "id": 2,
    "topic": "BigQuery & SQL",
    "difficulty": 2,
    "question": "Your company has several retail locations. Your company tracks the total number of sales made at each location each day. You want to use SQL to calculate the weekly moving average of sales by location to identify trends for each store. Which query should you use?",
    "options": [
      "A. SELECT store_id, date, total_sales, AVG(total_sales) OVER (\nPARTITION BY store_id\nORDER BY total_sales RANGE BETWEEN 6 PRECEDING AND CURRENT ROW ) as rolling_avg\nFROM store_sales_daily",
      "B. SELECT store_id, date, total_sales, AVG(total_sales)\nOVER (\nPARTITION BY date ORDER BY store_id ROWS BETWEEN 6 PRECEDING AND CURRENT ROW ) as rolling_avg\nFROM store_sales_daily",
      "C. SELECT store_id, date, total_sales, AVG(total_sales)\nOVER (\nPARTITION BY store_id\nORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW ) as rolling_avg\nFROM store_sales_daily",
      "D. SELECT store_id, date, total_sales, AVG(total_sales)\nOVER (\nPARTITION BY total_sales\nORDER BY date RANGE BETWEEN 6 PRECEDING AND CURRENT ROW ) as rolling_avg\nFROM store_sales_daily"
    ],
    "correct": 2,
    "explanation": "A weekly moving average per store is AVG over a window partitioned by store and ordered by date across the 7 most recent daily rows.",
    "discussion": [
      {
        "user": "jitbay",
        "text": "Selected Answer: C. partition by store id to get each store seperatly and then order by date and create a week window and then compute the averaging of sales in that window"
      },
      {
        "user": "NishantRanjanKhaware",
        "text": "Selected Answer: C. Should be partitioned by store id to get the store based sales, also, to check the weekly average sales, the ROWS between 6 preceeding and current row function will cater to it."
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: C. The best option is C. Option C is best because it correctly partitions by store_id to calculate the moving average for each store individually, and orders by date to ensure the moving average is calculated chronologically over the preceding 7 days (including the current day, thus 6 preceding). ROWS BETWEEN 6 PRECEDING AND CURRENT ROW then correctly defines the 7-day window for the average. Option ..."
      },
      {
        "user": "trashbox",
        "text": "Selected Answer: C. Should be partitioned by store_id to keep averages separate: A or C\n\nThen, should be ordered by date for chronological window calculation: C"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 2,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous C (4 votes): PARTITION BY store_id ORDER BY date over a 7-row window.",
    "conceptSummary": "Writing a windowed moving-average query partitioned by store and ordered by date.",
    "correctRationale": "A moving average needs PARTITION BY store_id so each store gets its own average, ORDER BY date so 'preceding' means earlier days, and ROWS BETWEEN 6 PRECEDING AND CURRENT ROW for a 7-day window. Ordering by total_sales or partitioning by anything else computes a meaningless or wrong average.",
    "optionRationales": [
      "Wrong: ORDER BY total_sales with RANGE orders rows by the sales value, not by time, so 'preceding' does not mean previous days.",
      "Wrong: PARTITION BY date averages across all stores for one day instead of over time per store.",
      "Correct: PARTITION BY store_id ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW gives each store a 7-day moving average.",
      "Wrong: partitioning by total_sales groups rows by sales value, which has nothing to do with a weekly per-store trend."
    ]
  },
  {
    "id": 1,
    "topic": "Machine Learning",
    "difficulty": 2,
    "question": "Your retail company wants to predict customer churn using historical purchase data stored in BigQuery. The dataset includes customer demographics, purchase history, and a label indicating whether the customer churned or not. You want to build a machine learning model to identify customers at risk of churning. You need to create and train a logistic regression model for predicting customer churn, using the customer_data table with the churned column as the target label. Which BigQuery ML query should you use?",
    "options": [
      "A. CREATE OR REPLACE MODEL churn_prediction_model\nOPTIONS(model_type='logistic_reg') AS\nSELECT *\nFROM customer_data;",
      "B. CREATE OR REPLACE MODEL churn_prediction_model\nOPTIONS(model_type='logistic_reg') AS\nSELECT * EXCEPT(churned),\n        churned AS label\nFROM customer_data;",
      "C. CREATE OR REPLACE MODEL churn_prediction_model\nOPTIONS(model_type='logistic_reg') AS\nSELECT * EXCEPT(churned)\nFROM customer_data;",
      "D. CREATE OR REPLACE MODEL churn_prediction_model\nOPTIONS(model_type='logistic_reg') AS\nSELECT churned as label\nFROM customer_data;"
    ],
    "correct": 1,
    "explanation": "Only the query that excludes churned from the features and re-introduces it AS label trains a valid logistic regression model.",
    "discussion": [
      {
        "user": "JohnJai",
        "text": "(Question about whether the bank is still relevant to the exam.)"
      },
      {
        "user": "n2183712847",
        "text": "Selected Answer: B. The best option is B. Option B is best because it correctly selects all columns as features except the churned column, and then explicitly designates the churned column as the label for BigQuery ML, which is required for training. Option A (SELECT *) is incorrect because while it includes the churned column, it doesn't explicitly define it as the label. Option C (SELECT * EXCEPT(churned)) is ..."
      },
      {
        "user": "trashbox",
        "text": "Selected Answer: B. You can use SELECT * EXCEPT (foo) and SELECT foo AS bar. (2 votes)"
      }
    ],
    "source": "examtopics-reviewed",
    "sourceExam": "associate-data-practitioner",
    "sourceQuestionNumber": 1,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "conflict": false,
    "confidence": "high",
    "discussionSummary": "Unanimous B (3 votes): the query must alias the target AS label while excluding it from the features. A spam ad was dropped; an off-topic relevance question was kept as a note.",
    "conceptSummary": "Training a BigQuery ML logistic regression model with an explicit target label.",
    "correctRationale": "BigQuery ML needs to know which column is the target: either via input_label_cols in OPTIONS or by aliasing a column AS label. This query selects every column except churned for features and adds churned AS label, so the model gets both clean features and an explicit label. The other queries either never designate the label or drop the features entirely.",
    "optionRationales": [
      "Wrong: SELECT * keeps churned as a feature but never designates it as the label (no input_label_cols and no 'label' alias), so training fails.",
      "Correct: SELECT * EXCEPT(churned) supplies all feature columns, and churned AS label marks the target BigQuery ML trains on.",
      "Wrong: dropping churned entirely leaves nothing to predict, so there is no label to train on.",
      "Wrong: selecting only churned AS label gives the model a target but no feature columns to learn from."
    ]
  }
];
