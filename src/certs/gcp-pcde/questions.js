export const QUESTIONS = [
  {
    "id": 188,
    "topic": "Capacity Planning & Cost",
    "difficulty": 2,
    "question": "Your application stores session documents in Firestore and queries them by steps, sessionDuration, and energyBurned. After a 30 day test period, latency is acceptable but costs are high. Which Firestore change would reduce cost while preserving performance and availability?",
    "options": [
      "A. Denormalize documents",
      "B. Add Cloud Memorystore cache",
      "C. Trim Firestore indexes to only required ones",
      "D. Use batched writes for lower cost"
    ],
    "correct": 2,
    "explanation": "Firestore indexes every field by default; exempting the fields you never query cuts index storage and write costs without touching the queries you do run.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 188,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; the text comes from vceeng (2026). The number is estimated: it is slotted into the 180/182–197 gap in the order the mirror lists it.",
    "resolvedBy": "devin-2026-10",
    "discussionSummary": "The mirror marks A, but denormalizing adds duplicated data and writes; trimming unused single-field indexes is Google's documented Firestore cost lever.",
    "conceptSummary": "Firestore cost: exempt unused fields from automatic indexing.",
    "correctRationale": "Firestore creates single-field indexes for every field automatically, and each index entry costs storage and write work. Keeping only the indexes the steps/sessionDuration/energyBurned queries need lowers cost while those queries stay as fast and available as before (C).",
    "optionRationales": [
      "Wrong: Denormalizing duplicates data, so it increases storage and writes rather than cutting cost.",
      "Wrong: A Memorystore cache adds a new paid service and more to operate.",
      "Correct: Removing unneeded indexes reduces index storage and write costs without affecting the queries in use.",
      "Wrong: Batched writes group operations atomically but each document write is still billed."
    ]
  },
  {
    "id": 187,
    "topic": "Monitoring & Performance",
    "difficulty": 3,
    "question": "Your IoT monitoring platform ingests sensor data from 100,000 devices, generating 2 million writes per second during peak hours and 500,000 writes per second during off-peak hours. Each record is 1KB with a row key format: deviceId#timestamp. Your current 12-node Bigtable cluster experiences hotspotting on specific device ranges, with three nodes handling the majority of the traffic while others remain underutilized. Read queries typically access the last 24 hours of data for specific devices. Storage costs are becoming a concern as you retain two years of historical data (500TB total). You need to optimize performance, eliminate hotspotting, and reduce storage costs while maintaining read latency under 10ms. What should you do?",
    "options": [
      "A. Split the table by device type, use separate Bigtable instances for different geographic regions, and implement read replicas for query optimization.",
      "B. Implement row key salting with a hash prefix, configure automated scaling with an optimal min/max threshold setting, and migrate data older than 6 months to Cloud Storage.",
      "C. Increase cluster size to 20 nodes, implement row key salting with a hash prefix, and enable compression on all column families.",
      "D. Change the row key format to deviceId#timestamp, implement automated scaling with an optimal min/max threshold setting based on CPU utilization, and migrate data older than 6 months to Cloud Storage."
    ],
    "correct": 1,
    "explanation": "Salting the row key spreads writes across nodes, autoscaling follows the peak/off-peak swing, and moving cold data to Cloud Storage cuts storage cost.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 187,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; the text comes from vceeng (2026). The number is estimated: it is slotted into the 180/182–197 gap in the order the mirror lists it.",
    "discussionSummary": "The mirror answer B matches Bigtable's guidance on hotspotting, autoscaling and cold-data tiering.",
    "conceptSummary": "Bigtable hotspotting: salt the row key, autoscale, tier cold data out.",
    "correctRationale": "B is the only option that fixes all three problems: a hash-prefix salt distributes sequential device keys across tablets, autoscaling with min/max bounds sizes the cluster to the 4x peak/off-peak swing, and exporting data older than six months to Cloud Storage removes most of the 500TB from Bigtable while the 24-hour reads stay fast.",
    "optionRationales": [
      "Wrong: Splitting tables and adding instances does not fix the key design behind the hotspot, and Bigtable has no read replicas to add.",
      "Correct: Salting removes the hotspot, autoscaling matches the load swing, and tiering cold data cuts storage cost.",
      "Wrong: A fixed 20-node cluster overpays off-peak, and Bigtable already compresses data, so storage cost barely moves.",
      "Wrong: deviceId#timestamp is the current key, so the hotspot stays."
    ]
  },
  {
    "id": 186,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "You have a single global application that uses clickstream data stored in a Bigtable instance. The application's users are spread across North America, Asia, and Europe. You want to reduce user latency, while keeping costs to a minimum. What should you do?",
    "options": [
      "A. Create three instances of Bigtable, each one in a region in North America, Asia, and Europe. Set up three app profiles, one for each region with single-cluster routing.",
      "B. Create one instance of Bigtable with three clusters in a region in North America, Asia, and Europe. Set up a single app profile with multi-cluster routing.",
      "C. Create one instance of Bigtable with three clusters in a region in North America, Asia, and Europe. Set up three app profiles, one for each region with single-cluster routing.",
      "D. Create one instance of Bigtable with three clusters in one central region across three zones. Set up a single app profile with multi-cluster routing."
    ],
    "correct": 1,
    "explanation": "One replicated instance with a cluster per continent and a multi-cluster routing profile sends each request to the nearest available cluster.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 186,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; the text comes from vceeng (2026). The number is estimated: it is slotted into the 180/182–197 gap in the order the mirror lists it.",
    "resolvedBy": "devin-2026-10",
    "discussionSummary": "The mirror marks C, but for one global application multi-cluster routing already sends each request to the nearest cluster and adds automatic failover, with no per-region profiles to manage.",
    "conceptSummary": "Global low-latency Bigtable: one instance, clusters per continent, multi-cluster routing.",
    "correctRationale": "Replicating one instance into clusters in North America, Asia and Europe puts data close to every user, and a multi-cluster routing app profile routes each request to the nearest available cluster with automatic failover (B). Three single-cluster profiles (C) need the application to pick a profile per region and lose automatic failover.",
    "optionRationales": [
      "Wrong: Separate instances do not replicate to each other, so the global application would see three different datasets.",
      "Correct: Multi-cluster routing sends each request to the nearest cluster, cutting latency for every region with one profile.",
      "Wrong: Single-cluster profiles per region work, but add routing logic in the app and give up automatic failover.",
      "Wrong: Three zones in one region keeps the data far from users on the other continents."
    ]
  },
  {
    "id": 185,
    "topic": "Capacity Planning & Cost",
    "difficulty": 1,
    "question": "mcnz.com migrated its busy ticketing platform database to Cloud SQL for MySQL six months ago and monitoring now shows persistently low CPU and memory usage which indicates the instance is oversized. What is the most efficient action to reduce costs while maintaining the current performance levels?",
    "options": [
      "A. Review and apply Cloud SQL rightsizing recommendations for the instance",
      "B. Resize to a smaller machine type that matches metrics from the last 90 days",
      "C. Turn off automated backups to reduce storage charges",
      "D. Migrate the database to a self managed MySQL instance on Compute Engine to gain cost control"
    ],
    "correct": 0,
    "explanation": "Cloud SQL's overprovisioned-instance recommender already analyses usage history and proposes a right-sized machine type.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 185,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; the text comes from vceeng (2026). The number is estimated: it is slotted into the 180/182–197 gap in the order the mirror lists it.",
    "discussionSummary": "The mirror answer A matches the Cloud SQL Recommender's rightsizing feature.",
    "conceptSummary": "Oversized Cloud SQL instance → apply the rightsizing recommendation.",
    "correctRationale": "The Cloud SQL Recommender flags overprovisioned instances from their usage history and suggests a smaller machine type, so applying it is the most efficient way to cut cost without losing performance (A). Sizing by hand from 90 days of metrics (B) reaches the same place with more manual work.",
    "optionRationales": [
      "Correct: The built-in rightsizing recommendation is based on observed usage and is applied in a single step.",
      "Wrong: Workable, but manual analysis is less efficient than the recommendation built for exactly this.",
      "Wrong: Disabling backups risks data loss and barely touches the cost of an oversized machine.",
      "Wrong: Self-managing MySQL adds operational cost and effort instead of removing it."
    ]
  },
  {
    "id": 184,
    "topic": "Security & IAM",
    "difficulty": 1,
    "question": "HelioBank is deploying Cloud SQL for MySQL in europe-west1 to support payment processing for example.com. The compliance team requires that data at rest be encrypted with a key that they own and manage in a specific European location, and they must control the key lifecycle including rotation and disablement. They also need all client connections to be encrypted from end to end. What should they configure?",
    "options": [
      "A. Create the Cloud SQL for MySQL instance with Google managed encryption keys and require SSL or TLS",
      "B. Create the Cloud SQL for MySQL instance using customer managed encryption keys and place it behind Cloud VPN for all client connectivity",
      "C. Create the Cloud SQL for MySQL instance with Google managed encryption keys and secure access using VPC Service Controls",
      "D. Create the Cloud SQL for MySQL instance using customer managed encryption keys from Cloud KMS in the required region and require SSL or TLS for client connections"
    ],
    "correct": 3,
    "explanation": "CMEK in a regional Cloud KMS key ring gives the team ownership of the key lifecycle, and enforcing SSL/TLS encrypts every client connection.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 184,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; the text comes from examsrev and passleadervce (2026). The number is estimated: it is slotted into the 180/182–197 gap in the order the mirrors list it.",
    "discussionSummary": "Both mirrors agree on D, which matches the CMEK and SSL/TLS enforcement docs.",
    "conceptSummary": "Customer-controlled keys in a region + encrypted connections → CMEK + required SSL/TLS.",
    "correctRationale": "Only customer-managed encryption keys in Cloud KMS let the compliance team own, rotate and disable the key in a European location, and requiring SSL/TLS on the instance encrypts every client connection (D).",
    "optionRationales": [
      "Wrong: Google-managed keys do not give the team control of the key lifecycle.",
      "Wrong: Cloud VPN only covers the network path from on-premises, not every client connection to the database.",
      "Wrong: Google-managed keys fail the key requirement, and VPC Service Controls restrict API access rather than encrypt connections.",
      "Correct: Regional CMEK covers key ownership and lifecycle; required SSL/TLS covers encryption in transit."
    ]
  },
  {
    "id": 183,
    "topic": "Connectivity & Networking",
    "difficulty": 1,
    "question": "Which connection method should applications use to connect to a regional Cloud Memorystore for Redis instance to keep 99th percentile latency under 4 milliseconds while minimizing operational overhead?",
    "options": [
      "A. Use a regional load balancer in front of Redis",
      "B. Use the Redis private IP in the same VPC and region",
      "C. Private Service Connect"
    ],
    "correct": 1,
    "explanation": "Clients in the same VPC and region connect straight to the instance's private IP: the fewest hops and nothing extra to run.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 183,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; the text comes from utt (2026), which lists only three options. The number is estimated: it is slotted into the 180/182–197 gap in the order the mirror lists it.",
    "discussionSummary": "The mirror answer B matches Memorystore's recommended same-region private IP connectivity.",
    "conceptSummary": "Lowest-latency Memorystore access: private IP from the same VPC and region.",
    "correctRationale": "Memorystore for Redis is reached over its private IP; clients in the same VPC and region connect directly with no proxy or extra endpoint to manage, which keeps tail latency lowest (B).",
    "optionRationales": [
      "Wrong: A load balancer adds a hop and components to operate; Memorystore is not fronted this way.",
      "Correct: Direct private IP in the same VPC and region gives the lowest latency with no extra infrastructure.",
      "Wrong: Private Service Connect is for cross-VPC or cross-project consumers and adds an endpoint to manage."
    ]
  },
  {
    "id": 182,
    "topic": "Backup & Recovery",
    "difficulty": 1,
    "question": "Your company is adopting AlloyDB for a business-critical application with the following requirements:\n- RTO: Under 4 hours\n- RPO: 6 hours (maximum data loss tolerance)\n- Daily backups with a 7-day retention period\nYou need to design a solution to meet these requirements. What should you do?",
    "options": [
      "A. Configure automatic backups and enable continuous backup and recovery.",
      "B. Make a daily backup and store on Cloud Storage.",
      "C. Set a longer retention period for automatic backups.",
      "D. Disable automatic backups and manually export data to Cloud Storage."
    ],
    "correct": 0,
    "explanation": "Daily automatic backups with 7-day retention cover the backup requirement, and continuous backup and recovery gives point-in-time restore well inside the 6-hour RPO.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 182,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; the text comes from utt (2026). The number is estimated: it is slotted into the 180/182–197 gap in the order the mirror lists it.",
    "discussionSummary": "The mirror answer A matches AlloyDB's automatic plus continuous backup features.",
    "conceptSummary": "AlloyDB RPO/RTO: automatic backups + continuous backup and recovery.",
    "correctRationale": "AlloyDB automatic backups can run daily with a 7-day retention, and continuous backup and recovery allows point-in-time restores to any second in its window, so data loss stays far below 6 hours and a restore fits within the 4-hour RTO (A).",
    "optionRationales": [
      "Correct: Automatic backups meet the daily/7-day policy and continuous backup meets the RPO.",
      "Wrong: A once-a-day manual backup can lose up to 24 hours of data, missing the 6-hour RPO.",
      "Wrong: Longer retention alone does not improve the RPO.",
      "Wrong: Manual exports add effort and miss the RPO between exports."
    ]
  },
  {
    "id": 181,
    "topic": "High Availability & DR",
    "difficulty": 2,
    "question": "You are running a mission-critical application on Google Kubernetes Engine (GKE) and you are using private IP to connect to Cloud SQL for PostgreSQL in us-central1. You want to maximize database uptime without making any major changes to the application in case of a planned event, such as maintenance. What should you do?",
    "options": [
      "A. Enable Automated backups and configure the retention period to 365 days.",
      "B. Create a cross-region read replica in us-south1.",
      "C. Upgrade to the Cloud SAL Enterprise Plus edition.",
      "D. Set up notifications about upcoming maintenance sent to your email at least one week before maintenance is scheduled."
    ],
    "correct": 2,
    "explanation": "Cloud SQL Enterprise Plus offers near-zero-downtime planned maintenance — the uptime-maximizing change that requires no application rework.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 181,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "No comments; Enterprise Plus's near-zero-downtime maintenance is the intended differentiator.",
    "conceptSummary": "Minimize maintenance downtime → Cloud SQL Enterprise Plus.",
    "correctRationale": "Enterprise Plus's near-zero-downtime maintenance keeps the primary serving through planned events — the only option that directly maximizes uptime during maintenance with no app changes.",
    "optionRationales": [
      "Wrong: Longer backup retention does nothing for maintenance downtime.",
      "Wrong: A cross-region replica requires application changes/manual promotion at events.",
      "Correct: Ent Plus's near-zero-downtime maintenance is designed exactly for this.",
      "Wrong: Earlier notification doesn't reduce downtime, only awareness."
    ]
  },
  {
    "id": 179,
    "topic": "Migration",
    "difficulty": 2,
    "question": "Your retail company is currently using DynamoDB to store product catalog data. Due to increasing data volumes and the need for better scalability, cost efficiency, and AI features; you have decided to migrate your data to Bigtable. You want a cost-effective migration, with minimal downtime and minimal effort, while ensuring data consistency between the two databases. What should you do?",
    "options": [
      "A. Export the DynamoDB data to CSV files, upload them to Cloud Storage, and use the cbt CLI to import the data into Bigtable.",
      "B. Create a Dataflow pipeline using the DynamoDBIO and BigtableIO connectors to stream data from DynamoDB to Bigtable in near real time.",
      "C. Develop a custom script using the DynamoDB and Bigtable APIs to directly transfer data between the two databases.",
      "D. Use Dataproc to export the data from DynamoDB and load it into Bigtable."
    ],
    "correct": 1,
    "explanation": "A Dataflow pipeline with the DynamoDBIO and BigtableIO connectors streams data continuously — minimal downtime and minimal effort while keeping both stores consistent during cutover.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 179,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "DynamoDB→Bigtable migration via Dataflow (DynamoDBIO + BigtableIO).",
    "correctRationale": "Minimal downtime plus consistency calls for a streaming migration: the Dataflow DynamoDBIO connector reads DynamoDB and BigtableIO writes Bigtable, giving near-real-time replication without bespoke code.",
    "optionRationales": [
      "Wrong: CSV export + cbt import is a one-shot offline copy — downtime grows with data and no ongoing consistency.",
      "Correct: The Dataflow DynamoDBIO→BigtableIO pipeline is the managed, near-real-time, minimal-downtime path.",
      "Wrong: A custom script is maximal effort and still gives no continuous consistency.",
      "Wrong: Dataproc is batch-oriented export/import — heavier and not near-real-time."
    ]
  },
  {
    "id": 178,
    "topic": "Database Selection",
    "difficulty": 3,
    "question": "Your e-learning platform runs on a Cloud SQL for PostgreSQL instance (16 VCPUs, 60 GB memory and 1TB SSD) serving users in North America. Your analytics team runs complex reporting queries that often consume 80% of CPU resources, causing slow response times for student transactions during peak hours. Current workload includes 8,000 transactions per second with 60% reads and 40% writes. The reporting queries involve JOIN operations across multiple large tables with millions of rows requiring highly efficient analytical processing. The platform also experiences sudden spikes in analytical reporting demand, requiring an elastic scaling of read capacity. You need to improve the query performance for your analytics team to run their reports efficiently without impacting transactional users. You also need to plan for future traffic growth. What should you do?",
    "options": [
      "A. Upgrade to Cloud SAL for PostgreSQL Enterprise Edition and route transaction and analytical queries to the primary instance.",
      "B. Migrate to AlloyDB for PostgreSQL and upgrade the machine type of the primary instance to 32 vCPU. Create materialized views for common analytical queries.",
      "C. Migrate to AlloyDB for PostgreSQL with a 16 vCPU primary instance and enable columnar engine for analytical workloads, using read pools for query isolation.",
      "D. Upgrade the Cloud SQL for PostgreSQL instance to db-n1-highmem-32 and implement connection pooling with PgBouncer to handle increased load."
    ],
    "correct": 2,
    "explanation": "AlloyDB's columnar engine accelerates analytical JOINs while read pools isolate reporting from transactional traffic and scale elastically.",
    "discussion": [
      {
        "user": "shell_terminator",
        "text": "Selected Answer: C. The correct answer is C. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 178,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for C.",
    "conceptSummary": "Analytics isolation + columnar acceleration → AlloyDB with read pools.",
    "correctRationale": "The workload needs isolated, elastically scalable analytics: AlloyDB read pools separate reporting from the transactional primary and the columnar engine speeds analytical queries — the purpose-built upgrade path from Cloud SQL.",
    "optionRationales": [
      "Wrong: Enterprise edition on one primary still shares CPU between OLTP and analytics.",
      "Wrong: Bigger primary + materialized views doesn't isolate or elastically scale reads.",
      "Correct: Columnar engine + read pools = isolated, efficient, elastic analytics.",
      "Wrong: Connection pooling helps connections, not analytical query speed or isolation."
    ]
  },
  {
    "id": 177,
    "topic": "High Availability & DR",
    "difficulty": 3,
    "question": "You are migrating your company’s critical ecommerce platform from an on-premises PostgreSQL database (utilizing PostgreSQL stored procedures) to a highly available solution on Google Cloud. The platform requires an extremely low downtime (Recovery Time Objective (RTO) – 5 minutes) and minimal data loss (Recovery Point Objective – 30 seconds). The platform serves a global customer base with peak traffic distributed across multiple continents, though the primary transactional data resides in a single geographic region for regulatory compliance. You need to design a cloud database solution that meets the RTO/RPO requirements while optimizing for global read access and local transactional integrity. What should you do?",
    "options": [
      "A. Implement a single-instance Spanner deployment configured for multi-regional data replication.",
      "B. Deploy an AlloyDB cluster in the primary region with a high-availability instance configuration, and establish cross-region read replicas in another region for global read scaling.",
      "C. Deploy a single-region AlloyDB cluster with a primary instance and a read replica in the same zone.",
      "D. Implement a multi-regional Cloud SQL for PostgreSQL deployment with read replicas in different regions, and configure asynchronous replication for cross-region data consistency."
    ],
    "correct": 1,
    "explanation": "An HA AlloyDB cluster in the primary region gives the 5-min RTO/30-s RPO for the transactional core, and cross-region read replicas serve global reads while keeping transactions regional.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 177,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "No comments; matches the suggested answer B from the search index — HA AlloyDB + cross-region replicas.",
    "conceptSummary": "Regional transactional core + global reads: AlloyDB HA + cross-region read replicas.",
    "correctRationale": "Regulatory single-region transaction residency plus global reads maps to a regional AlloyDB HA primary with cross-region read replicas — fast failover for the RTO/RPO and read scaling worldwide, without moving to Spanner's global-write model.",
    "optionRationales": [
      "Wrong: 'Single-instance multi-region Spanner' is a contradiction, and moving off PostgreSQL breaks the stored-procedures constraint.",
      "Correct: HA AlloyDB in-region + cross-region replicas meets RTO/RPO and global-read/local-write needs.",
      "Wrong: A same-zone replica gives no regional resilience.",
      "Wrong: 'Multi-regional Cloud SQL' deployment doesn't exist; Cloud SQL is regional with manual cross-region failover."
    ]
  },
  {
    "id": 176,
    "topic": "Migration",
    "difficulty": 2,
    "question": "You have several on-premises Percona Server for MySQL 8.0 instances used for mission-critical applications. The workload is read-heavy with 80%+ reads and each instance has several TBs of data. You want to migrate to Google Cloud with minimal downtime and the fewest changes possible.\nWhat should you do?",
    "options": [
      "A. Use Database Migration Service to migrate to Alloy DB.",
      "B. Use Datastream to migrate to Cloud SQL Enterprise",
      "C. Use the spanner-migration-tool to migrate to Spanner.",
      "D. Use Database Migration Service to migrate to Cloud SQL Enterprise Plus."
    ],
    "correct": 3,
    "explanation": "Percona Server for MySQL is a supported DMS source, and Cloud SQL Enterprise Plus suits a mission-critical, multi-TB, read-heavy workload — minimal downtime, fewest changes.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 176,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Percona MySQL → Cloud SQL Enterprise Plus via DMS.",
    "correctRationale": "DMS performs continuous (dump + CDC) migrations from MySQL-compatible sources including Percona Server for MySQL, keeping downtime minimal and requiring no application changes. Enterprise Plus is the tier aimed at demanding, read-heavy production workloads — matching 'mission-critical' and '80%+ reads, several TBs'.",
    "optionRationales": [
      "Wrong: AlloyDB is a PostgreSQL engine — migrating MySQL to it is an engine change, not 'fewest changes'.",
      "Wrong: Datastream is a CDC replication service for destinations like BigQuery/Cloud Storage, not the MySQL→Cloud SQL migration path.",
      "Wrong: The Spanner migration tool replatforms to Spanner — maximum change, not minimum.",
      "Correct: DMS's continuous MySQL migration to Cloud SQL Enterprise Plus is the minimal-downtime, minimal-change path."
    ]
  },
  {
    "id": 175,
    "topic": "Operations & Maintenance",
    "difficulty": 1,
    "question": "You are performing daily exports of native BAK files from Cloud SOL for SOL Server to Cloud Storage buckets by using gcloud sql export bak command at 6:00AM. You want to automate this routine using managed Google Cloud components so you can focus on other critical tasks of keeping your database healthy and performant. What should you do?",
    "options": [
      "A. Enable retained backups for the instance.",
      "B. Create a Cloud Run function to export with a Pub/Sub trigger. Create a Cloud Scheduler job to trigger the Cloud Run function daily.",
      "C. Implement automated backups using the console and set the default retention to 7 days.",
      "D. Create a cron job to export and configure Pub/Sub as the target. Set a recurring schedule of 0 6 * * * for the job."
    ],
    "correct": 1,
    "explanation": "Cloud Scheduler triggering a Cloud Run function that runs the export automates the daily BAK export with fully managed components.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 175,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "No comments; the Scheduler+function pattern is the standard managed automation.",
    "conceptSummary": "Automate daily SQL Server BAK exports via Scheduler + Cloud Run function.",
    "correctRationale": "The managed automation pattern is a Cloud Scheduler job triggering a serverless function that calls the export command — replacing the manual 6 AM routine; the other options either don't perform exports or misuse cron/Pub/Sub.",
    "optionRationales": [
      "Wrong: Retained backups are Cloud SQL backups, not your BAK export files.",
      "Correct: Scheduler + Cloud Run function is the managed daily automation pattern.",
      "Wrong: Automated backups change backup type, not the BAK export routine.",
      "Wrong: A cron still needs somewhere unmanaged to run, and Pub/Sub is a target config not a scheduler."
    ]
  },
  {
    "id": 174,
    "topic": "Security & IAM",
    "difficulty": 2,
    "question": "Your company is migrating one of its monolithic applications to a microservices architecture on Google Cloud. The new architecture involves a user authentication service that runs on Google Kubernetes Engine (GKE) and needs to access Cloud SQL for PostgreSQL instances. Your developers need to access the databases for local development and debugging purposes. You need to design a centralized, secure, and scalable database connectivity and access management strategy for both application service interfaces and developers. What should you do?",
    "options": [
      "A. Configure the GKE and Compute Engine applications to use the Cloud SQL Auth Proxy for all database connections. Instruct developers to use their local clients with database-native user/password authentication.",
      "B. Enable public IP addresses for all database instances and configure firewall rules to restrict access based on the source IP addresses of the GKE cluster, Compute Engine VMs, and developers’ machines.",
      "C. For all service interfaces and developers, create unique database-native user and password credentials directly on each database instance, and store the credentials in a centralized secret management tool.",
      "D. For GKE and Compute Engine services, create and grant dedicated IAM service accounts with least-privilege roles for Cloud SQL resources, and configure applications to use workload identity account credentials. For developers, use IAM authentication with Cloud SQL Auth Proxy for secure access."
    ],
    "correct": 3,
    "explanation": "Centralized identity is the requirement: dedicated least-privilege service accounts with workload identity for services, and IAM database authentication through the Auth Proxy for developers — no shared or scattered credentials.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 174,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Centralized DB access: workload-identity service accounts + IAM auth via Auth Proxy for devs.",
    "correctRationale": "Google-recommended practice centralizes access on IAM: GKE services use workload identity mapped to dedicated, least-privilege service accounts, and developers authenticate with IAM database authentication through the Cloud SQL Auth Proxy — eliminating per-instance native passwords and giving one auditable control plane.",
    "optionRationales": [
      "Wrong: Auth Proxy for services is fine, but local clients with native passwords leaves developer access unmanaged and decentralized — contrary to the requirement.",
      "Wrong: Public IPs plus firewall rules exposes the database to the internet — the opposite of a secure design.",
      "Wrong: Native credentials per instance plus a secret store is exactly the decentralized credential sprawl the question wants removed.",
      "Correct: Dedicated least-privilege service accounts (workload identity) for services + IAM auth via Auth Proxy for developers is the centralized secure pattern."
    ]
  },
  {
    "id": 173,
    "topic": "Capacity Planning & Cost",
    "difficulty": 2,
    "question": "Your company is migrating from an on-premises database to a single-region Spanner instance. The current database supports 40,000 reads each second, and 7,000 writes each second, at 1 KB row sizes at peak. You need to determine the most cost-effective size for the Spanner instance to handle the equivalent current workload. What should you do?",
    "options": [
      "A. Select a 4-node Spanner instance.",
      "B. Select a 6-node Spanner instance.",
      "C. Select a 1-node Spanner instance.",
      "D. Recommend a multi-region Spanner instance."
    ],
    "correct": 0,
    "explanation": "Per-node single-region guidance (~22,500 reads/s or ~3,500 writes/s per node at 1 KB rows): 40,000 reads ≈ 1.8 node-equivalents and 7,000 writes ≈ 2 node-equivalents ≈ 3.8 → a 4-node instance.",
    "discussion": [
      {
        "user": "missipssamarsh",
        "text": "Selected Answer: A. Quick math (single-region per-node guidance, ~1 KB rows): ~10,000 reads/sec per node → 40,000 reads/sec ⇒ 4 nodes ~2,000 writes/sec per node → 7,000 writes/sec ⇒ 3.5 ⇒ round up to 4 nodes (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 173,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for A via the per-node throughput math.",
    "conceptSummary": "Size a single-region Spanner instance to 4 nodes for 40k reads/7k writes.",
    "correctRationale": "Using Spanner's per-node throughput guidance for a regional instance with 1 KB rows (~22,500 reads/s or ~3,500 writes/s per node), 40,000 reads/s needs ~1.8 node-equivalents and 7,000 writes/s needs ~2 — roughly 3.8 combined, so 4 nodes is the smallest adequate, most cost-effective size.",
    "optionRationales": [
      "Correct: 4 nodes covers the ~3.8 node-equivalent workload with headroom.",
      "Wrong: 6 nodes over-provisions — not most cost-effective.",
      "Wrong: 1 node supports ~22.5k reads or ~3.5k writes — far under.",
      "Wrong: Multi-region doesn't change per-node capacity math and costs more."
    ]
  },
  {
    "id": 172,
    "topic": "Security & IAM",
    "difficulty": 1,
    "question": "You are developing a Python application that will connect to AlloyDB for PostgreSQL as the backend datastore. Your organization’s security requirements do not allow the use of usernames and passwords for database authentication. How should you develop your application?",
    "options": [
      "A. Use any PostgreSQL-compatible Python client. Connect to the AlloyDB cluster by using Identity-Aware Proxy (IAP).",
      "B. Use the AlloyDB Python connector. Use automated IAM authentication for connectivity.",
      "C. Use the AlloyDB Python connector. Enforce SSL connectivity to AlloyDB by using the gcloud alloydb instance update command with the --ssl-mode=ENCRYPTED_ONLY option.",
      "D. Use any PostgreSQL-compatible Python client. Use a service account name and credential as the username and password respectively during connection."
    ],
    "correct": 1,
    "explanation": "The AlloyDB Python connector with automated IAM authentication connects without any username/password.",
    "discussion": [
      {
        "user": "iwork",
        "text": "Selected Answer: B. I'd use IAM authentication with AlloyDB language connector: https://cloud.google.com/alloydb/docs/connect-language-connectors#python-pg8000_1 (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 172,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B.",
    "conceptSummary": "Password-less Python→AlloyDB via the language connector + IAM auth.",
    "correctRationale": "AlloyDB language connectors (Python connector) support automatic IAM authentication — the documented way to connect with no database passwords.",
    "optionRationales": [
      "Wrong: IAP is for HTTP apps, not PostgreSQL wire protocol.",
      "Correct: Python connector + automated IAM auth = password-less connectivity.",
      "Wrong: SSL mode controls encryption, not authentication identity.",
      "Wrong: Passing a service account as user/password is still credential usage, contrary to the requirement."
    ]
  },
  {
    "id": 171,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "You are migrating an on-premises online transactional process (OLTP) PostgreSQL database to Google Cloud. You want to reduce the administrative overhead on database maintenance activities, such as vacuum and memory tuning. You are also planning to introduce analytic use cases in this database. You need the migration to have minimal schema and application changes. What should you do?",
    "options": [
      "A. Use Spanner with PGAdapter.",
      "B. Use Cloud SQL for PostgreSQL.",
      "C. Use AlloyDB for PostgreSQL.",
      "D. Deploy a self-managed PostgreSQL database on Compute Engine."
    ],
    "correct": 2,
    "explanation": "AlloyDB for PostgreSQL minimizes maintenance overhead (managed PostgreSQL with automatic memory/vacuum management), supports analytics, and needs no schema changes.",
    "discussion": [
      {
        "user": "iwork",
        "text": "Selected Answer: C. AlloyDB is google recommended service for PostgreSQL: https://cloud.google.com/products/alloydb?hl=en (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 171,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for C — AlloyDB is the recommended PostgreSQL destination here.",
    "conceptSummary": "OLTP PostgreSQL + analytics + low admin → AlloyDB.",
    "correctRationale": "AlloyDB is Google's managed PostgreSQL-compatible service with intelligent memory/vacuum management and an analytics-oriented columnar engine — minimal schema/app change and reduced DBA overhead; Cloud SQL is more manual, Spanner needs adaptation, GCE is self-managed.",
    "optionRationales": [
      "Wrong: Spanner PGAdapter still means adapting the app/schema to Spanner semantics.",
      "Wrong: Cloud SQL is managed but keeps more tuning/maintenance overhead and no columnar analytics engine.",
      "Correct: AlloyDB minimizes maintenance and adds analytics capability compatibly.",
      "Wrong: Self-managed keeps all the overhead."
    ]
  },
  {
    "id": 170,
    "topic": "High Availability & DR",
    "difficulty": 2,
    "question": "Your company has implemented a multi-regional, highly available (HA) PostgreSQL database cluster on Google Cloud by using Cloud SQL and regional persistent disks. You need to assess the effectiveness of your disaster recovery plan and validate the system's ability to recover from a regional outage. What should you do?",
    "options": [
      "A. Promote the cross-region replica and verify that the application can still access the database.",
      "B. Initiate a failover test to the HA standby instance and verify that the application can still access the database.",
      "C. Create a backup of the database and restore it to a new Cloud SQL instance in a different region to test the backup and restore process.",
      "D. Conduct a chaos engineering experiment by randomly terminating virtual machines in the primary region and observing the system's behavior."
    ],
    "correct": 0,
    "explanation": "Promoting the cross-region replica and verifying application access is the true regional-outage DR test; an HA failover only covers a zonal standby.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 170,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "No comments; promoting the replica is the faithful DR test.",
    "conceptSummary": "Regional-outage DR test: promote cross-region replica, verify app access.",
    "correctRationale": "To validate regional recovery you exercise the real DR path — promote the cross-region replica and confirm the app works against it. An HA failover tests zone loss, not region loss.",
    "optionRationales": [
      "Correct: Promotion + verification tests the actual regional DR procedure.",
      "Wrong: HA failover only proves zonal recovery.",
      "Wrong: Restore testing validates backups, not the running topology's recoverability.",
      "Wrong: Randomly killing VMs is uncontrolled and doesn't validate the DR runbook."
    ]
  },
  {
    "id": 169,
    "topic": "Operations & Maintenance",
    "difficulty": 3,
    "question": "You have a Cloud SQL for MySQL Enterprise instance with four read replicas. Your next scheduled maintenance event is scheduled tomorrow at 6 PM. Your security team identifies an important security vulnerability. You are notified by your management at 8 PM today to update your primary instance and all four read replicas during approved business downtime today at 11 PM. What should you do?",
    "options": [
      "A. Reschedule the upcoming scheduled maintenance to happen today at 11 PM.",
      "B. Perform self-service maintenance on the selected read replicas.",
      "C. Perform self-service maintenance on the primary instance during scheduled business downtime.",
      "D. Reschedule the upcoming scheduled maintenance of the primary instance to apply updates immediately."
    ],
    "correct": 0,
    "explanation": "Rescheduling the upcoming maintenance event to today's approved 11 PM downtime window applies the security update across the maintenance group (primary + replicas).",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 169,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "low",
    "conflict": false,
    "discussionSummary": "No comments; the options are awkward, but rescheduling into the approved window best covers the all-instances requirement.",
    "conceptSummary": "Bring a scheduled maintenance event forward into the approved downtime window.",
    "correctRationale": "The requirement is updating the primary AND all four replicas during today's 11 PM window. Rescheduling the upcoming maintenance event to that time applies the update within the maintenance plan, whereas self-service maintenance acts on individual selected instances and the other options each cover only a subset.",
    "optionRationales": [
      "Correct: Rescheduling to 11 PM puts the update inside the approved window for the maintenance group.",
      "Wrong: Self-service on only the replicas leaves the primary unpatched.",
      "Wrong: Self-service on only the primary leaves four replicas unpatched.",
      "Wrong: 'Immediately' ignores the approved downtime window requirement."
    ]
  },
  {
    "id": 168,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "You have a Cloud SQL for MySQL instance with a table of product information including a column of product descriptions. Your application development team is building a customer facing chatbot and would like to find the product that most closely matches a freeform text description provided by the customer. How should you enable this functionality?",
    "options": [
      "A. Create a stored procedure that uses a regular expression to match the customer’s search text to values in the product description column.",
      "B. Create and populate a column of product description embeddings on the product table and perform an approximate nearest neighbor search using the customer’s search text.",
      "C. Use the LIKE operator to match the customer’s search text to the product description and return similar rows.",
      "D. Create a SQL script that compares the product description and the customer’s search text by using the SOUNDEX function."
    ],
    "correct": 1,
    "explanation": "Product-description embeddings + approximate nearest-neighbor search power semantic text matching for the chatbot.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: B. B is correct. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 168,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B.",
    "conceptSummary": "Semantic product matching via embeddings + ANN search in Cloud SQL.",
    "correctRationale": "Freeform semantic matching needs vector search: Cloud SQL for MySQL supports storing embeddings and ANN queries — the modern, recommended approach; regex/LIKE/SOUNDEX only do lexical matching.",
    "optionRationales": [
      "Wrong: Regex matches literal patterns, not semantic similarity.",
      "Correct: Embedding column + ANN search delivers the chatbot's semantic matching.",
      "Wrong: LIKE is lexical substring matching — poor for freeform descriptions.",
      "Wrong: SOUNDEX matches pronunciation, not meaning."
    ]
  },
  {
    "id": 167,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "You are migrating your on-premises PostgreSQL database to Spanner. You need to identify a solution for handling existing integer-based table primary keys. You want minimal changes to the applications while also following Google-recommended practices. What should you do?",
    "options": [
      "A. Use application generated sequential integer values as primary keys.",
      "B. Update default primary key values to max(primary_key) + 1.",
      "C. Use a UUID function that generates UUID Version 4 values as primary keys.",
      "D. Generate values by using BIT_REVERSED_POSITIVE sequences."
    ],
    "correct": 3,
    "explanation": "BIT_REVERSED_POSITIVE sequences keep integer PKs while spreading inserts across the key space — Google's recommended path for sequential-int keys with minimal app change.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "D is correct. https://cloud.google.com/spanner/docs/schema-design#bit_reverse_primary_key https://cloud.google.com/spanner/docs/primary-key-default-value#bit-reversed-sequence (3 votes)"
      },
      {
        "user": "yokoyan",
        "text": "Selected Answer: D. D is the correct answer. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 167,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D per the bit-reversed-sequence doc.",
    "conceptSummary": "Integer PKs on Spanner → bit-reversed sequences.",
    "correctRationale": "Spanner supports BIT_REVERSED_POSITIVE sequences as default PK values, preserving integer typing and minimal app change while eliminating sequential hotspots — the documented best practice.",
    "optionRationales": [
      "Wrong: App-generated sequential ints recreate the hotspot problem.",
      "Wrong: max+1 is racy and still sequential — a hotspot with concurrency bugs.",
      "Wrong: UUIDv4 works but changes the key type to string — more app change.",
      "Correct: Bit-reversed sequences are the documented recommendation."
    ]
  },
  {
    "id": 166,
    "topic": "Monitoring & Performance",
    "difficulty": 1,
    "question": "Your application uses a Cloud SQL for MySQL instance. Recently, you have noticed performance degradation during peak hours, leading to slow response times and frustrated users. You suspect that inefficient queries might be contributing to these issues. You want to pinpoint and analyze these problematic queries and pass them to the application team for optimizations. What should you do?",
    "options": [
      "A. Use the underprovisioned instance recommender.",
      "B. Increase the Cloud SQL instance read_buffer_size flag.",
      "C. Enable and use Query Insights.",
      "D. Create a Cloud Monitoring alert based on the database/mysql/queries metric."
    ],
    "correct": 2,
    "explanation": "Query Insights surfaces the inefficient queries for handoff to the application team.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: C. https://cloud.google.com/sql/docs/mysql/using-query-insights (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 166,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C.",
    "conceptSummary": "Identify inefficient Cloud SQL queries via Query Insights.",
    "correctRationale": "Query Insights is the tool for pinpointing slow/inefficient queries — the documented workflow before optimization.",
    "optionRationales": [
      "Wrong: The underprovisioned recommender looks at instance sizing, not query quality.",
      "Wrong: Blind flag tuning guesses at causes.",
      "Correct: Query Insights identifies the actual problem queries.",
      "Wrong: A query-count alert reports volume, not which queries are slow."
    ]
  },
  {
    "id": 165,
    "topic": "Capacity Planning & Cost",
    "difficulty": 2,
    "question": "You are designing a new ecommerce application on Google Cloud. You expect high and bursty write volumes during peak sales periods. You need to configure Spanner to ensure consistent database performance during this sales period. What should you do?",
    "options": [
      "A. Implement sharding to distribute the write load across multiple Spanner instances.",
      "B. Configure read-only transactions to improve read performance during peak periods.",
      "C. Use interleaved tables to reduce the number of cross-node transactions.",
      "D. Enable autoscaling in the Spanner instance, and set the maximum number of nodes to match the peak write volume."
    ],
    "correct": 3,
    "explanation": "Autoscaling with max nodes sized to the peak write volume gives consistent capacity for bursty sales traffic.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: D. D is correct. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 165,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "Bursty write peaks → Spanner autoscaling sized to peak.",
    "correctRationale": "For predictable bursts, enable autoscaling and set the max so Spanner can grow to peak capacity automatically — maintaining performance without manual intervention.",
    "optionRationales": [
      "Wrong: Spanner doesn't need app-level sharding across instances; it splits internally.",
      "Wrong: Read-only transaction tuning doesn't help write bursts.",
      "Wrong: Interleaving helps locality, not burst capacity.",
      "Correct: Autoscaling capped at the needed peak directly solves bursty writes."
    ]
  },
  {
    "id": 164,
    "topic": "Monitoring & Performance",
    "difficulty": 2,
    "question": "Your company is using a multi-region Spanner instance. The instance stores data from an application which does a lot of writes without reading the data. You are noticing a lot of latency regression. You want to reduce latency and improve performance. What should you do?",
    "options": [
      "A. Enable leader-aware routing in the client library.",
      "B. Add additional indexes to the table.",
      "C. Disable leader-aware routing in the client library.",
      "D. Increase the number of Spanner nodes."
    ],
    "correct": 0,
    "explanation": "Leader-aware routing sends writes toward the leader region in a multi-region instance, cutting commit latency for write-heavy workloads.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: A. https://cloud.google.com/spanner/docs/leader-aware-routing (3 votes)"
      },
      {
        "user": "sian95",
        "text": "Selected Answer: C. https://cloud.google.com/spanner/docs/leader-aware-routing (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 164,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Community favors A per the leader-aware-routing doc.",
    "conceptSummary": "Cut multi-region Spanner write latency with leader-aware routing.",
    "correctRationale": "For write-heavy apps on multi-region Spanner, enabling leader-aware routing in the client library routes writes to the leader region and reduces commit latency — the documented optimization for exactly this case.",
    "optionRationales": [
      "Correct: LAR reduces write latency for write-heavy multi-region workloads.",
      "Wrong: More indexes add write work — worse latency.",
      "Wrong: Disabling LAR keeps the latency the question wants removed.",
      "Wrong: More nodes help CPU, not leader-quorum write latency."
    ]
  },
  {
    "id": 163,
    "topic": "Capacity Planning & Cost",
    "difficulty": 2,
    "question": "Your organization runs a high-volume, low-latency application on Bigtable. You need to reduce costs without compromising performance. What should you do?",
    "options": [
      "A. Reduce replication factor across clusters.",
      "B. Consolidate multiple small clusters into a single large cluster.",
      "C. Analyze application access patterns to strategically redesign the schema and adjust the node count.",
      "D. Switch to a lower-performance storage type for all clusters."
    ],
    "correct": 2,
    "explanation": "Analyzing access patterns to redesign the schema and right-size node count cuts Bigtable spend without hurting performance.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 163,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "No comments on this question.",
    "conceptSummary": "Bigtable cost reduction via schema/access-pattern optimization and node right-sizing.",
    "correctRationale": "Cost without performance loss comes from fixing inefficient key design and matching nodes to actual usage — analytics-driven optimization, not degraded durability or slower storage.",
    "optionRationales": [
      "Wrong: Lowering replication weakens availability — a performance/resilience cost.",
      "Wrong: Fewer, bigger clusters concentrate load — can hurt throughput.",
      "Correct: Schema redesign + right-sized nodes is the recommended cost lever.",
      "Wrong: HDD storage directly degrades the low-latency requirement."
    ]
  },
  {
    "id": 162,
    "topic": "Backup & Recovery",
    "difficulty": 2,
    "question": "You are using Memorystore for Redis to cache frequently accessed data and improve your application’s performance. In the event of a complete regional outage, the application will failover to another region. You want to ensure that the Memorystore instance in the new region does not start from an empty cache after failover. What should you do?",
    "options": [
      "A. Use Memorystore Standard Tier. Disable read replicas.",
      "B. Use Memorystore Standard Tier. Configure at least one read replica.",
      "C. Schedule exports of the Memorystore instance. Specify a dual-region Cloud Storage bucket as the export destination.",
      "D. Enable Redis RDB snapshots for Memorystore."
    ],
    "correct": 2,
    "explanation": "Scheduled exports to a dual-region Cloud Storage bucket preserve the cache contents across a regional loss, so the failover region doesn't start empty.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: C. C may be correct. (4 votes)"
      },
      {
        "user": "iwork",
        "text": "Selected Answer: D. \"We recommend using the Standard Tier as the primary mechanism for high availability. Additionally, enabling RDB snapshots on Standard Tier instances provides extra protection from failures that can cause cache flushes.\" https://cloud.google.com/memorystore/docs/redis/about-rdb-snapshots (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 162,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Community favored C (dual-region exports) over D (RDB snapshots) — snapshots protect the same region only, so C is loaded for the cross-region cold-start requirement.",
    "conceptSummary": "Cross-region warm cache via scheduled Memorystore exports to dual-region GCS.",
    "correctRationale": "Memorystore replicas and RDB snapshots only cover a single region. Exporting the instance on a schedule to a dual-region bucket lets the other region restore/seed its cache — the only option addressing a cross-region cold cache.",
    "optionRationales": [
      "Wrong: Disabled replicas give no protection at all.",
      "Wrong: Read replicas are same-region — useless after a regional loss.",
      "Correct: Scheduled exports to dual-region storage make the cache restorable in the failover region.",
      "Wrong: RDB snapshots persist in-region; they don't reach the failover region."
    ]
  },
  {
    "id": 161,
    "topic": "Migration",
    "difficulty": 1,
    "question": "Your company is migrating a legacy on-premises Oracle database to Cloud SQL for PostgreSQL. As a part of the migration, you need to convert schema and other database code objects, such as procedures, functions, and triggers, from Oracle to PostgreSQL. The database migration needs to be accomplished with minimal application code changes and manual intervention. What is the Google-recommended approach you should do?",
    "options": [
      "A. Manually rewrite both the Oracle schema and queries to be compatible with PostgreSQL syntax and semantics.",
      "B. Use a schema conversion tool to automatically convert the Oracle schema to PostgreSQL schema, then manually rewrite all queries.",
      "C. Migrate the data directly from Oracle to PostgreSQL without any conversion. Rely on application-level compatibility layers to handle any syntax or semantic differences.",
      "D. Use Database Migration Service code conversion workspace, then review and refactor as needed."
    ],
    "correct": 3,
    "explanation": "DMS's code conversion workspace automatically translates Oracle schema, procedures, functions and triggers to PostgreSQL, with manual review after.",
    "discussion": [
      {
        "user": "missipssamarsh",
        "text": "Selected Answer: D. D. Use Database Migration Service code conversion workspace, then review and refactor as needed. (3 votes)"
      },
      {
        "user": "yokoyan",
        "text": "Selected Answer: D. https://cloud.google.com/database-migration/docs/oracle-to-postgresql/about-conversion-workspaces (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 161,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "Oracle→PostgreSQL object conversion via DMS conversion workspace.",
    "correctRationale": "The DMS conversion workspace is Google's recommended tool for automated Oracle→PostgreSQL schema/code-object conversion, minimizing manual rewriting.",
    "optionRationales": [
      "Wrong: Full manual rewriting is maximum intervention.",
      "Wrong: Still leaves all queries to be rewritten manually.",
      "Wrong: No conversion means broken objects — maximum app changes.",
      "Correct: Conversion workspace automates the bulk of it, then review/refactor."
    ]
  },
  {
    "id": 160,
    "topic": "High Availability & DR",
    "difficulty": 2,
    "question": "Your organization deploys a high-volume, low-latency sensor data ingestion system. Resilience is crucial, and the workload is expected to grow significantly over time. You need to design a database tier on Google Cloud to ensure faster performance and high availability, while following Google-recommended practices. What should you do?",
    "options": [
      "A. Deploy multiple Bigtable clusters, shard data manually across them, and set up the application logic for fault tolerance.",
      "B. Deploy a single-zone Bigtable cluster and optimize the application code for maximum write throughput.",
      "C. Deploy a single-region Bigtable instance and increase the nodes to maximize data durability.",
      "D. Provision a multi-zone Bigtable cluster, configure replication, perform an application stress-test, and set up performance monitoring."
    ],
    "correct": 3,
    "explanation": "Multi-zone replicated Bigtable with stress-testing and monitoring is the recommended resilient design for a growing sensor workload.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: D. D is correct. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 160,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "Resilient Bigtable design: multi-zone replication + stress test + monitoring.",
    "correctRationale": "HA for Bigtable comes from multi-zone/multi-cluster replication, not manual sharding; validation via a stress test plus performance monitoring is the recommended-practice rollout.",
    "optionRationales": [
      "Wrong: Manual sharding and app-level failover reinvent what replication gives for free.",
      "Wrong: A single-zone cluster has no HA.",
      "Wrong: One region, one cluster — no replication, so node count doesn't buy durability across failures.",
      "Correct: Multi-zone replicated cluster + stress test + monitoring is the resilient design."
    ]
  },
  {
    "id": 159,
    "topic": "Capacity Planning & Cost",
    "difficulty": 1,
    "question": "You have a regional Spanner instance with no autoscaler that is serving a production workload. You observed a surge in write activities to the database during an ongoing promotional event. You received an alert that the database is close to the storage limit. Based on the storage utilization trend, the database will run out of storage in the next few hours. You want to resolve this issue as soon as possible. What should you do?",
    "options": [
      "A. Create a custom instance configuration and add a custom read-only replica to the Spanner instance.",
      "B. Increase the compute capacity of the Spanner instance.",
      "C. Move the Spanner instance to a multi-regional configuration.",
      "D. Archive and delete historical data from the database."
    ],
    "correct": 1,
    "explanation": "Google's storage-utilization guidance: add compute capacity first — storage capacity scales with compute units.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: B. B is correct. https://cloud.google.com/spanner/docs/storage-utilization?hl=ja#reduce In general, we recommend that you add compute capacity to your instance as a starting point. After you add compute capacity, you can investigate and address the root causes of high storage utilization. (1 vote)"
      },
      {
        "user": "Bang_Jago",
        "text": "Selected Answer: B. It's the correct answer. (translated) (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 159,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B per the storage-utilization doc.",
    "conceptSummary": "Near Spanner storage limit → add compute capacity.",
    "correctRationale": "Per the Spanner storage doc, the recommended first response to approaching the limit is adding compute capacity, since usable storage scales with provisioned nodes/processing units — the fastest resolution.",
    "optionRationales": [
      "Wrong: A custom read-only replica doesn't address storage.",
      "Correct: Adding compute capacity is the documented first step and expands storage headroom.",
      "Wrong: Changing to multi-regional is a big architectural move, not the fast fix.",
      "Wrong: Deleting data may help later but isn't the immediate resolution."
    ]
  },
  {
    "id": 158,
    "topic": "Capacity Planning & Cost",
    "difficulty": 2,
    "question": "You want to migrate an on-premises MySQL database to Cloud SQL. The on-premises database currently has 16 cores and 64 GB of RAM and averages 75% CPU utilization to support an application with over 100.000 tables. You need to specify the most cost-effective machine size you need when migrating to Cloud SQL for MySQL. What should you do?",
    "options": [
      "A. Select a Cloud SQL for MySQL database with a machine configuration of 12 cores and 48 GB of RAM.",
      "B. Select a Cloud SQL for MySQL database with a machine configuration of 16 cores and 64 GB of RAM.",
      "C. Select a Cloud SQL for MySQL database with a machine configuration of 32 cores and 256 GB of RAM.",
      "D. Select a Cloud SQL for MySQL database with a machine configuration of 64 cores and 768 GB of RAM."
    ],
    "correct": 2,
    "explanation": "Google's guidance for instances with very large table counts (tens of thousands of tables) is to provision substantially more memory/vCPUs to stay within SLA — 32 vCPU/256 GB is the smallest compliant, cost-effective option here.",
    "discussion": [
      {
        "user": "cachopo",
        "text": "Selected Answer: C. This is the correct choice because Cloud SQL for MySQL has specific infrastructure requirements and SLA limits regarding the number of tables, which override pure CPU utilization metrics in this scenario. (3 votes)"
      },
      {
        "user": "cachopo",
        "text": "The Constraint (Table Count): While your CPU utilization suggests a smaller machine might suffice computationally, the primary bottleneck here is the 100,000 tables. Cloud SQL for MySQL has a published SLA limit of 50,000 tables for standard instance sizes. Exceeding this on a smaller instance can cause the database to become unresponsive due to metadata locking, file descriptor exhaustion, and memory pressure on the data dictionary. (2 votes)"
      },
      {
        "user": "cachopo",
        "text": "The Recommendation: To support more than 50,000 tables (up to 500,000) and remain covered by the SLA, Google Cloud explicitly requires upgrading the instance to at least 32 vCPUs and 200 GB of RAM. Cost-Effectiveness: Option C (32 cores, 256 GB RAM) is the smallest configuration that meets this specific \"high table count\" requirement, making it the most cost-effective compliant solution. (2 votes)"
      },
      {
        "user": "cachopo",
        "text": "The Recommendation: To support more than 50,000 tables (up to 500,000) and remain covered by the SLA, Google Cloud explicitly requires upgrading the instance to at least 32 vCPUs and 200 GB of RAM. Cost-Effectiveness: Option C (32 cores, 256 GB RAM) is the smallest configuration that meets this specific \"high table count\" requirement, making it the most cost-effective compliant solution. (2 votes)"
      },
      {
        "user": "cachopo",
        "text": "https://docs.cloud.google.com/sql/docs/mysql/recommender-high-number-of-tables (2 votes)"
      },
      {
        "user": "cachopo",
        "text": "https://docs.cloud.google.com/sql/docs/mysql/recommender-high-number-of-tables (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 158,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for C, citing the high-table-count recommender doc.",
    "conceptSummary": "SLA sizing for >50k tables: ≥32 vCPU/200 GB.",
    "correctRationale": "Google's guidance for Cloud SQL for MySQL instances hosting a very large number of tables (tens of thousands) calls for substantially larger machines to remain within SLA — beyond what raw CPU utilization alone suggests. The 32-core/256 GB option is the smallest choice meeting that bar.",
    "optionRationales": [
      "Wrong: 12c/48GB is below both the observed load and the table-count SLA minimum.",
      "Wrong: Mirroring current hardware ignores the >50k-table SLA sizing requirement.",
      "Correct: 32 vCPU/256 GB satisfies the documented minimum for >100k tables.",
      "Wrong: 64c/768GB far exceeds the documented guidance for large table counts — not cost-effective."
    ]
  },
  {
    "id": 157,
    "topic": "Monitoring & Performance",
    "difficulty": 2,
    "question": "Your company is rapidly expanding its user base across North America, nearly doubling in the last 6 months. This expansion causes a substantial increase in query volume on your mission-critical Cloud SQL database. This has led to noticeable performance issues and slower query response times. You suspect that your Cloud SQL instance may not be able to handle the incremental load. You need to identify the root cause of this performance bottleneck and ensure that your database can scale with your growing user base. What should you do?",
    "options": [
      "A. Migrate the database to Spanner.",
      "B. Evaluate the application connection pooling configuration settings.",
      "C. Review Cloud SQL System Insights for the instance, and analyze CPU, memory, and storage utilization metrics.",
      "D. Create two Cloud SQL instances, and split the workload between them."
    ],
    "correct": 2,
    "explanation": "First diagnose: Cloud SQL System Insights shows CPU/memory/storage utilization trends to find the bottleneck before scaling.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: C. C is correct (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 157,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C.",
    "conceptSummary": "Diagnose the Cloud SQL bottleneck via System Insights before scaling.",
    "correctRationale": "Before migrating or resizing, identify the constraint — System Insights is Cloud SQL's built-in utilization dashboard for exactly this root-cause analysis.",
    "optionRationales": [
      "Wrong: Migrating to Spanner without a diagnosis is premature and a huge change.",
      "Wrong: Connection pooling may matter, but diagnosis precedes tuning.",
      "Correct: System Insights' CPU/memory/storage metrics identify the actual bottleneck.",
      "Wrong: Splitting instances is a re-architecture applied blindly."
    ]
  },
  {
    "id": 156,
    "topic": "Backup & Recovery",
    "difficulty": 2,
    "question": "Your organization’s databases are running in Cloud SQL. Due to data residency regulations, your organization mandates that backups are stored in a specific region. You are also required to make sure that the databases have monthly full backups, which are retained until your Cloud SQL instance is deleted, along with daily backups. What should you do?",
    "options": [
      "A. Schedule automated backups for Cloud SQL with a retention period of 365 days.",
      "B. Schedule daily and monthly on-demand backups.",
      "C. Schedule automated backups, and create on-demand monthly backups to custom backup locations.",
      "D. Create an Organization Policy Service resource location constraint. Schedule automated backups with the retention period of 30 days."
    ],
    "correct": 2,
    "explanation": "Automated backups cover daily needs, and on-demand monthly backups (retained until deleted, to a custom regional location) cover the retention and residency mandates.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: C. C is the correct answer. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 156,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C.",
    "conceptSummary": "Residency + indefinite monthly retention: scheduled backups + custom-location on-demand monthly backups.",
    "correctRationale": "Automated backup retention can't be 'until instance deletion', so monthly on-demand backups (which persist until manually deleted) to a custom regional location cover that requirement while scheduled automated backups handle the daily tier.",
    "optionRationales": [
      "Wrong: A 365-day retention isn't 'until instance deletion' and doesn't fix the region mandate unless a custom location is set.",
      "Wrong: 'Schedule on-demand backups' omits the regional-location control required for residency.",
      "Correct: Automated daily + on-demand monthly to custom regional location = residency + indefinite retention.",
      "Wrong: An org-policy constraint is plausible but a 30-day retention fails the 'until deleted' requirement."
    ]
  },
  {
    "id": 155,
    "topic": "High Availability & DR",
    "difficulty": 2,
    "question": "Your company’s rapidly growing ecommerce application uses Cloud SQL for MySQL. Performance issues are surfacing during peak traffic periods. You need to ensure that the database can handle the load while minimizing downtime. What should you do?",
    "options": [
      "A. Use read replicas for query offloading, configure automatic failover, and test failover procedures regularly.",
      "B. Vertically scale the primary instance by significantly increasing compute resources, such as vCPUs and memory.",
      "C. Increase storage size on the existing instance and implement client-side caching for frequently accessed data.",
      "D. Migrate to a Cloud SQL for PostgreSQL database for better performance during high load."
    ],
    "correct": 0,
    "explanation": "Read replicas offload peak read load and automatic failover protects availability — scale and resilience with minimal downtime.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: A. A is the correct answer. (4 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 155,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A.",
    "conceptSummary": "Peak-load resilience: read replicas + tested automatic failover.",
    "correctRationale": "Offloading reads to replicas relieves the peak load, while automatic failover and rehearsed failover procedures keep downtime minimal — the balanced scaling + availability fix.",
    "optionRationales": [
      "Correct: Replicas + tested failover address both load handling and downtime.",
      "Wrong: Vertical scaling alone hits a ceiling and requires restart downtime.",
      "Wrong: Storage growth doesn't add compute capacity for peak traffic.",
      "Wrong: Changing engines is a needless replatform for a load problem."
    ]
  },
  {
    "id": 154,
    "topic": "Backup & Recovery",
    "difficulty": 2,
    "question": "You are designing the backup and recovery strategy of a Cloud SQL for MySQL database that serves a write heavy application. You need to be able to restore the database to any point in time within the past five days while minimizing the performance impact of database backups. What should you do?",
    "options": [
      "A. Enable automatic backup and point in time recovery. Configure the backup window during periods of low database traffic. Set backup and transaction log retention to at least five days.",
      "B. Schedule hourly on-demand backups and enable point in time recovery. Delete any delete backups that were taken over five days ago.",
      "C. Schedule a database export job to run every hour from a read replica instance. Retain the export dumps for at least five days.",
      "D. Schedule a database export job to run every hour. Use serverless export. Retain the export dumps for at least five days."
    ],
    "correct": 0,
    "explanation": "Automated backups at a low-traffic window plus PITR transaction-log retention of ≥5 days gives any-point-in-time restore with minimal backup impact.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: A. A is the correct answer. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 154,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A.",
    "conceptSummary": "Any-point-in-time restore over 5 days: automated backups + PITR retention.",
    "correctRationale": "PITR restores to any moment in the retention window using transaction logs; scheduling the backup in quiet hours minimizes performance impact and setting retention to five days covers the requirement without hourly manual exports.",
    "optionRationales": [
      "Correct: Automated backups (quiet window) + 5-day PITR retention meets the requirement cleanly.",
      "Wrong: Hourly on-demand backups add load and management overhead PITR already covers.",
      "Wrong: Hourly replica exports are not point-in-time restores and add complexity.",
      "Wrong: Serverless hourly exports still aren't PITR granularity and add cost."
    ]
  },
  {
    "id": 153,
    "topic": "High Availability & DR",
    "difficulty": 3,
    "question": "You are a DBA at a retail company. The production databases are running in Cloud SQL for MySQL Enterprise Plus edition, version 8.0.34, in the us-centrall region. You need to set up and test disaster recovery (DR) with zero data loss in the us-west1 region. What should you do?",
    "options": [
      "A. Use advanced DR by setting up a cascading read replica in the us-west1 region, and designate it as the failover DR replica. Test switchover by using the gcloud switchover command.",
      "B. Create a cross-region read replica, version 8.0.37, in the us-west1 region. Designate it as the failover DR replica, and test switchover by using the gcloud switchover command.",
      "C. Create a cross-region read replica version 8.0.34, in the us-west1 region. Designate it as the failover DR replica, and test switchover by using the gcloud switchover command.",
      "D. Create a cross-region read replica, version 8.0.34, in the us-west1 region. Test switchover by using the gcloud promote-replica with failover command."
    ],
    "correct": 2,
    "explanation": "Designate a same-version cross-region read replica as the DR replica and test with gcloud switchover — switchover preserves replication so no data is lost.",
    "discussion": [
      {
        "user": "Bang_Jago",
        "text": "Selected Answer: D. it's d (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 153,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Scant discussion favored D (promote-replica), but the requirement is zero data loss: switchover preserves replication while promotion severs it, so the same-version replica + switchover (C) is loaded.",
    "conceptSummary": "Zero-data-loss DR test: designated DR replica + gcloud switchover (same engine version).",
    "correctRationale": "Cloud SQL advanced DR designates a cross-region replica as the DR replica and uses switchover, which swaps roles while preserving replication — zero data loss and easy return. Promote-replica breaks the replication relationship, and versions must match (8.0.34).",
    "optionRationales": [
      "Wrong: The DR replica is a direct cross-region replica of the primary, not a cascading replica.",
      "Wrong: The replica version must match the source (8.0.34, not 8.0.37).",
      "Correct: Same-version cross-region replica + DR designation + switchover = zero-loss DR test.",
      "Wrong: promote-replica is not a switchover — it severs replication and risks data loss."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 152,
    "topic": "Security & IAM",
    "difficulty": 1,
    "question": "Your company uses a custom application to service thousands of users. The application is running on a Compute Engine and a Cloud SQL for PostgreSQL database. The company requires database passwords to be changed every 60 days. You need to ensure that the credentials used by the web application to connect to the database are managed securely. What should you do?",
    "options": [
      "A. Step 1: Store the credentials in an encrypted text file in the application.\nStep 2: Use Cloud Key Management Service (Cloud KMS) to store the key for decrypting the text file.\nStep 3: Modify the application to decrypt the text file and retrieve the credentials on startup.\nStep 4: Update the text file every 60 days.",
      "B. Step 1: Store the credentials to the database in Secret Manager.\nStep 2: Modify the application to retrieve the credentials from Secret Manager on startup.\nStep 3: Configure the rotation interval to 60 days.",
      "C. Step 1: Store the credentials in a text file in a Cloud Storage bucket.\nStep 2: Modify the application to download the text file and retrieve the credentials on startup.\nStep 3: Update the text file every 60 days.",
      "D. Step 1: Configure IAM database authentication for the application to connect to the database.\nStep 2: Create an IAM user and map it to a separate database user for each application user.\nStep 3: Require users to update their passwords every 60 days."
    ],
    "correct": 1,
    "explanation": "Secret Manager stores the credentials securely with a 60-day rotation; the app fetches them at startup.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: B. B is the correct answer. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 152,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B.",
    "conceptSummary": "Managed credential rotation via Secret Manager.",
    "correctRationale": "Secret Manager is Google Cloud's managed secret store: versioned secrets, IAM-controlled access and rotation schedules — the clean answer to periodic password rotation.",
    "optionRationales": [
      "Wrong: A KMS-wrapped file leaves decrypted credentials in the app — poor hygiene.",
      "Correct: Secret Manager + startup retrieval + rotation interval is the managed pattern.",
      "Wrong: A text file in a bucket is insecure and manual.",
      "Wrong: Per-user IAM DB users don't fit a shared web application credential model, and password rotation for humans isn't the requirement."
    ]
  },
  {
    "id": 151,
    "topic": "Migration",
    "difficulty": 2,
    "question": "You are planning the migration of a large Oracle database to AlloyDB for PostgreSQL. The database contains a large amount of application logic written as stored procedures that needs to be migrated to the target database. You want to minimize both migration effort and downtime for the migration. What should you do?",
    "options": [
      "A. Use Ora2pg for schema and code conversion and data migration.",
      "B. Use Ora2pg for schema and code conversion. Use the oracle_fdw extension in AlloyDB and replicate data from source to destination by using CREATE TABLE AS SELECT statements.",
      "C. Use Database Migration Service. Set up a conversion workspace for schema and code conversion. Create a migration job to perform backfill and change data capture to replicate data from source to destination.",
      "D. Use Database Migration Service. Set up a legacy conversion workspace for schema and code conversion. Create a migration job to perform backfill and change data capture to replicate data from source to destination."
    ],
    "correct": 2,
    "explanation": "DMS's conversion workspace converts the Oracle schema and stored procedures, and the migration job does backfill + CDC — minimal effort and downtime.",
    "discussion": [
      {
        "user": "Mavee001",
        "text": "Selected Answer: C. https://cloud.google.com/database-migration/docs/oracle-to-alloydb/create-conversion-workspace#conversion-workspaces (4 votes)"
      },
      {
        "user": "Chamiel1028",
        "text": "Selected Answer: A. scenario: Large Oracle database → migrating to AlloyDB for PostgreSQL Database has a large amount of application logic in stored procedures Goals: minimize migration effort and downtime Why Option A is correct Ora2pg is a well-known open-source tool for migrating Oracle to PostgreSQL/AlloyDB: Converts Oracle schema to PostgreSQL-compatible schema Converts Oracle PL/SQL stored procedures to PostgreSQL PL/pgSQL Supports data migration with minimal downtime using incremental or batch exports Ideal for application-heavy Oracle databases with lots of stored procedures and business logic Minimizes effort because schema, code, and data migration are all handled in one tool (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 151,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C per the DMS Oracle→AlloyDB conversion-workspace doc.",
    "conceptSummary": "Oracle→AlloyDB migration: DMS conversion workspace + continuous migration job.",
    "correctRationale": "DMS supports Oracle→AlloyDB with a conversion workspace that translates stored-procedure code automatically, plus a migration job doing backfill and CDC — covering both effort and downtime requirements.",
    "optionRationales": [
      "Wrong: Ora2pg handles conversion but the manual data move is high downtime.",
      "Wrong: CTAS via oracle_fdw is a manual, high-downtime data copy.",
      "Correct: Conversion workspace + backfill/CDC job is the managed minimal-effort path.",
      "Wrong: 'Legacy conversion workspace' is not the correct workspace type for this flow."
    ]
  },
  {
    "id": 150,
    "topic": "High Availability & DR",
    "difficulty": 2,
    "question": "You currently have a MySQL database running on Cloud SQL with a read replica in a different zone for non-mission critical analytics workloads. You want to enable high availability (HA) for the analytic workloads while keeping costs low. What should you do?",
    "options": [
      "A. Increase the size of the read replica instance and enable HA.",
      "B. Enable HA on the current read replica.",
      "C. Create a new HA instance in the same zone as the primary.",
      "D. Create a new HA instance in a different region than the primary."
    ],
    "correct": 1,
    "explanation": "Enabling HA on the existing read replica gives the analytics workload failover protection at the lowest incremental cost.",
    "discussion": [
      {
        "user": "krop",
        "text": "Selected Answer: B. Enabling HA directly on the existing read replica (Option B) is the most cost-effective and operationally efficient method to ensure high availability for analytics workloads while adhering to Cloud SQL best practices. (2 votes)"
      },
      {
        "user": "MikeFR",
        "text": "Selected Answer: B. C does not fixed the HA part, D is more expensive,A does not address HA part so B (1 vote)"
      },
      {
        "user": "Skywatch",
        "text": "Selected Answer: B. Enable HA on current read replica (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 150,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for B — cheapest way to add HA to the analytics path.",
    "conceptSummary": "Cheapest HA for analytics: enable HA on the existing read replica.",
    "correctRationale": "The replica already exists for analytics; flipping HA on it adds a standby without provisioning new instances — minimal cost and effort.",
    "optionRationales": [
      "Wrong: Resizing adds cost without giving HA semantics.",
      "Correct: HA on the existing replica is the lowest-cost path to availability.",
      "Wrong: A new same-zone instance costs more and still needs replication set up.",
      "Wrong: A different-region instance adds cost and is unnecessary for this requirement."
    ]
  },
  {
    "id": 149,
    "topic": "Migration",
    "difficulty": 2,
    "question": "You are migrating your critical production database from Amazon RDS for MySQL to Cloud SQL for MySQL by using Google Cloud's Database Migration Service. You want to keep disruption to your production database to a minimum and, at the same time, optimize migration performance. What should you do?",
    "options": [
      "A. Create and start multiple Database Migration Service jobs to migrate your database to the target Cloud SQL for MySQL instance.",
      "B. Upgrade the Amazon RDS for MySQL primary instance to an instance with more vCPUs and memory, and then run Google Cloud's Database Migration Service.",
      "C. Create a single Database Migration Service migration job with initial load parallelism configured to maximum on the source Amazon RDS for MySQL read replica.",
      "D. Create a single Database Migration Service migration job with initial Load Parallelism configured to Maximum on the Amazon RDS for MySQL primary instance."
    ],
    "correct": 2,
    "explanation": "Running the DMS initial load from the RDS read replica at maximum parallelism protects the production primary while maximizing migration throughput.",
    "discussion": [
      {
        "user": "Skywatch",
        "text": "Selected Answer: C. Option C is the only one that correctly balances both requirements. It uses a read replica to protect the production primary from the heavy initial load and uses load parallelism on that replica to ensure the migration happens as quickly as possible. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 149,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C.",
    "conceptSummary": "DMS initial-load parallelism on a source read replica.",
    "correctRationale": "To protect the production primary, run the heavy initial load against a read replica; max initial-load parallelism finishes it quickly — satisfying both minimal disruption and optimal performance.",
    "optionRationales": [
      "Wrong: Multiple jobs don't help a single database migration and complicate cutover.",
      "Wrong: Resizing the source doesn't offload the read load of the initial dump.",
      "Correct: Replica source + max parallelism = minimal production impact with fastest load.",
      "Wrong: Max parallelism on the primary competes with production traffic."
    ]
  },
  {
    "id": 148,
    "topic": "Connectivity & Networking",
    "difficulty": 3,
    "question": "You have a non-critical business application running on Google Kubernetes Engine (GKE) in the app-dev VPC. You have created an AlloyDB cluster with Private Service Access (PSA) and no public IP address in the db-dev VPC. You want your application to securely connect to AlloyDB in a cost-effective way. What should you do?",
    "options": [
      "A. Set up a high availability VPN between the app-dev and db-dev VPCs. Connect the application directly to AlloyDB.",
      "B. Connect by using the private IP address of the AlloyDB cluster directly from the application.",
      "C. Connect by using AlloyDB Auth Proxy installed in the GKE cluster.",
      "D. Install a SOCKS proxy in a VM in the db-dev VPC. Install AlloyDB Auth Proxy in your GKE cluster, and connect to the AlloyDB cluster through the SOCKS server and port."
    ],
    "correct": 2,
    "explanation": "The AlloyDB Auth Proxy in the GKE cluster tunnels securely to the AlloyDB cluster over Google's endpoint — working across the different VPCs at minimal cost.",
    "discussion": [
      {
        "user": "syffuf",
        "text": "Selected Answer: C. https://cloud.google.com/alloydb/docs/quickstart/integrate-kubernetes (2 votes)"
      },
      {
        "user": "syffuf",
        "text": "But are different VPCs: PSA as created on db-dev (2 votes)"
      },
      {
        "user": "Skywatch",
        "text": "Selected Answer: C. Connect by using AlloyDB Auth Proxy installed in the GKE cluster. Feasibility: This is the ideal solution. The AlloyDB Auth Proxy is a client-side tool that provides secure access to AlloyDB instances without needing a public IP or direct network connectivity via VPN/Peering. How it works: You run the proxy as a sidecar container in your GKE pods. The proxy uses Google Cloud APIs to create a secure, encrypted tunnel directly to your AlloyDB instance. Your application simply connects to the proxy on localhost, and the proxy handles the secure forwarding of traffic. Security: This is the most secure method. It uses IAM permissions for authentication and authorization and automatically encry… (1 vote)"
      },
      {
        "user": "krop",
        "text": "To be fair, i think this question is incorrectly described here - You have 1st VPC with GKE and you have Managed Database visible in 2nd VPC with its private IP because of PSA. As you mentioned these two VPCs are not connected at all and communication won't be possible between them. I think i have to admit, option C might be the answer here. (1 vote)"
      },
      {
        "user": "krop",
        "text": "To be fair, i think this question is incorrectly described here - You have 1st VPC with GKE and you have Managed Database visible in 2nd VPC with its private IP because of PSA. As you mentioned these two VPCs are not connected at all and communication won't be possible between them. I think i have to admit, option C might be the answer here. (1 vote)"
      },
      {
        "user": "krop",
        "text": "Selected Answer: B. Private Service Access (PSA) establishes a private connection between your VPC and the Google-managed service network where AlloyDB resides. This allows resources in your VPC (such as GKE pods) to communicate with AlloyDB using its private IP, without needing public IPs or VPNs (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 148,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for C per the AlloyDB-Kubernetes integration doc.",
    "conceptSummary": "Cross-VPC GKE→AlloyDB connectivity via AlloyDB Auth Proxy.",
    "correctRationale": "Because the VPCs differ, the cluster's private IP is not directly routable from app-dev. The AlloyDB Auth Proxy establishes an IAM-authorized secure tunnel to the instance, so the GKE app connects cheaply without VPN plumbing or exposing a public IP.",
    "optionRationales": [
      "Wrong: HA VPN works but is neither cheap nor the recommended path.",
      "Wrong: A private IP in db-dev is unreachable from app-dev without connectivity.",
      "Correct: Auth Proxy in GKE gives IAM-secured tunneled access — the documented Kubernetes pattern.",
      "Wrong: A SOCKS relay is a hack with more moving parts and no benefit."
    ]
  },
  {
    "id": 147,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "Your company is developing a 24/7, global, real-time analytics platform that needs to store and process large amounts of versioned time-series data. You need to design a platform that is highly scalable to accommodate traffic spikes and ensure high availability for mission-critical operations. What should you do?",
    "options": [
      "A. Implement a single-cluster Bigtable instance with autoscaling enabled and row key design.",
      "B. Implement a multi-cluster Bigtable instance with autoscaling enabled and optimal schema design.",
      "C. Implement a multi-cluster Bigtable instance across multiple regions with replication.",
      "D. Implement AlloyDB for PostgreSQL to handle the analytical workload using read replica."
    ],
    "correct": 1,
    "explanation": "Versioned time-series with traffic spikes and mission-critical HA → multi-cluster Bigtable with autoscaling and a schema designed against hotspots.",
    "discussion": [
      {
        "user": "cachopo",
        "text": "Selected Answer: C. This is the correct choice because Bigtable is the Google Cloud service designed specifically for high-throughput, versioned time-series data, and deploying it across multiple regions is the only way to satisfy the \"Global\" and \"Mission-critical High Availability\" requirements simultaneously. (3 votes)"
      },
      {
        "user": "yokoyan",
        "text": "Selected Answer: B. B is the correct answer. (2 votes)"
      },
      {
        "user": "Alex0707",
        "text": "Selected Answer: B. Autoscaling is an important criteria according to the requirements and C is missing it (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 147,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "The vote is split 3–3 between B and C. B is loaded: it is the only option that covers both stated requirements, traffic spikes (autoscaling) and mission-critical HA (multi-cluster replication), plus the row-key design time-series data needs. C covers HA but leaves out autoscaling. An independent Gemini review also picked B.",
    "conceptSummary": "Spiky, mission-critical time-series → multi-cluster Bigtable + autoscaling + schema design.",
    "correctRationale": "Versioned time-series is Bigtable's design. A multi-cluster instance replicates data across clusters (which can sit in different regions) for mission-critical availability, autoscaling absorbs traffic spikes, and a well-designed row key prevents time-series hotspots (B). C gives replication but says nothing about handling spikes.",
    "optionRationales": [
      "Wrong: A single cluster is a single point of failure for a mission-critical platform.",
      "Correct: Multi-cluster replication gives HA, autoscaling handles spikes, and schema design avoids hotspots.",
      "Wrong: Replication across regions covers HA but omits autoscaling for the traffic spikes.",
      "Wrong: AlloyDB is a relational database, not the fit for large-scale versioned time-series."
    ],
    "resolvedBy": "gemini-2026-10"
  },
  {
    "id": 146,
    "topic": "Backup & Recovery",
    "difficulty": 3,
    "question": "You are the DBA of your organization. You provided a cloned instance from the production Cloud SQL for PostgreSQL database to the developers for testing purposes. After the creation of the clone, your developers notice missing data in one of the recently altered tables. What should you do to ensure that all data is included?",
    "options": [
      "A. Take a back up of the production database, and restore it to another Cloud SQL for PostgreSQL instance. Provide access to the new instance to the developers.",
      "B. Check for missing roles and privileges in the cloned Cloud SQL instance. Grant missing privileges to the developers.",
      "C. Clone the current production database, and restore it to an earlier point-in-time (PITR). Provide access to the cloned instance to the developers.",
      "D. Dump the production database to a file. Modify the dumped file to ALTER TABLE to SET LOGGED on tables that were unlogged in production. Reload the data in the new Cloud SQL for PostgreSQL instance."
    ],
    "correct": 3,
    "explanation": "UNLOGGED tables don't write WAL, so their data is absent from clones; dump the data, ALTER TABLE SET LOGGED, and reload to include it.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: D. D is the correct answer. (4 votes)"
      },
      {
        "user": "Mavee001",
        "text": "Selected Answer: A. https://cloud.google.com/sql/docs/postgres/backup-recovery/restoring#restorebackups (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 146,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Community favors D — the unlogged-table explanation fits the missing-data symptom on a clone.",
    "conceptSummary": "Missing data on a clone → unlogged tables aren't WAL-logged; dump/alter/reload.",
    "correctRationale": "Clones rely on the logged storage/backup path; UNLOGGED PostgreSQL tables skip WAL and thus don't appear. The fix is a logical dump, marking the tables LOGGED, and reloading them on the new instance.",
    "optionRationales": [
      "Wrong: A fresh backup+restore has the same unlogged-data gap.",
      "Wrong: Missing data is not a privileges issue.",
      "Wrong: PITR also relies on WAL — unlogged tables remain missing.",
      "Correct: Dump + SET LOGGED + reload captures the unlogged table contents."
    ]
  },
  {
    "id": 145,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "You are migrating an on-premises database to Spanner. There are a few tables, each with a few hundred records that do not have a primary key on the source database. You need to migrate all of the tables over to the news database while avoiding hot-spotting issues. What should you do?",
    "options": [
      "A. Load the data into Spanner, and designate a primary key later based on business need.",
      "B. Use the GENERATE_UUID() function to generate universally unique identifier (UUID) values with the STRING(36) data type when you do the migration.",
      "C. During the migration, swap the order of keys so that the column that contains the monotonically increasing or decreasing value is the first key par.",
      "D. Migrate the tables with no primary key to maintain consistency with source."
    ],
    "correct": 1,
    "explanation": "For keyless tables, generate UUID primary keys (STRING(36)) during migration — the documented anti-hotspot method.",
    "discussion": [
      {
        "user": "iwork",
        "text": "Selected Answer: B. Google cloud best practices to avoid hotspotting provide several methods: https://cloud.google.com/spanner/docs/schema-design#fix_swap_key_order One of them is creating UUID as string(36). While there are several disadvantages (like more storage costs, UUID don't carry information about record, etc.) it is the only one answer that avoid hotspotting. The answer C (swap keys order) is increasing risk of hotspotting because in answer the \"monotonic\" field is placed to the first position. (1 vote)"
      },
      {
        "user": "Bang_Jago",
        "text": "Selected Answer: B. b is the correct one (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 145,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B per the schema-design doc.",
    "conceptSummary": "Migrate keyless tables to Spanner with generated UUID keys.",
    "correctRationale": "Spanner rows need a primary key; where the source lacks one, the documented approach is generating UUIDs so inserts spread across the key space and avoid hotspotting.",
    "optionRationales": [
      "Wrong: Spanner tables cannot exist without a primary key.",
      "Correct: GENERATE_UUID STRING(36) keys are the documented anti-hotspot solution.",
      "Wrong: Swapping key order applies to composite keys — there is no key here to reorder.",
      "Wrong: Migrating keyless keeps the problem unsolved — Spanner requires a PK."
    ]
  },
  {
    "id": 144,
    "topic": "Capacity Planning & Cost",
    "difficulty": 1,
    "question": "You are using Memorystore for Redis to cache frequently accessed data and improve your application's performance. Recently, your application is experiencing sudden spikes in latency when interacting with the Memorystore for Redis instance. Upon checking the logs, you discover a high number of \"evicted keys\" messages. You want to reduce the occurrences of latency spikes and their impact on the application. What should you do?",
    "options": [
      "A. Increase the time to live (TTL) value of all the keys within the cache.",
      "B. Redeploy your application to the same zone as the Memorystore instance.",
      "C. Scale the Memorystore instance to a larger memory size.",
      "D. Enable read replicas. Deploy additional read replica instances to distribute read workloads."
    ],
    "correct": 2,
    "explanation": "Evicted keys mean the cache is full — scaling the instance to a larger memory size stops evictions and the latency spikes they cause.",
    "discussion": [
      {
        "user": "iwork",
        "text": "Selected Answer: C. Evicted keys is a memory issue. So, C is correct answer: https://cloud.google.com/memorystore/docs/redis/memory-management-best-practices#maintenance (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 144,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C.",
    "conceptSummary": "Memorystore evicted keys → scale up memory.",
    "correctRationale": "Evictions occur when memory is exhausted; a larger Memorystore instance keeps hot keys resident, eliminating the miss-driven latency spikes.",
    "optionRationales": [
      "Wrong: Longer TTL keeps more keys → more eviction, not less.",
      "Wrong: Colocation reduces network latency, not evictions.",
      "Correct: More memory directly removes the eviction pressure.",
      "Wrong: Read replicas spread reads but share the same capacity problem for writes/evictions."
    ]
  },
  {
    "id": 143,
    "topic": "Security & IAM",
    "difficulty": 1,
    "question": "You are setting up a new AlloyDB instance and want users to be able to use their existing Identity and Access Management (IAM) identities to connect to AlloyDB. You have performed the following steps:\n•\tManually enabled IAM authentication on the AlloyDB instance\n•\tGranted the alloydb.databaseUser and ser-viceusage.serviceUsageconsumer IAM roles to the users\n•\tCreated new AlloyDB database users based on corresponding IAM identities\nUsers are able to connect but are reporting that they are not able to SELECT from application tables. What should you do?",
    "options": [
      "A. Grant the new database users access privileges to the appropriate tables.",
      "B. Grant the alloydb.client IAM role to each user.",
      "C. Grant the alloydb.viewer IAM role to each user.",
      "D. Grant the alloydb.alloydbreplica IAM role to each user."
    ],
    "correct": 0,
    "explanation": "IAM-authenticated database users still need database-level table privileges — grant SELECT on the application tables to those DB users.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: A. A is the correct answer. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 143,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A.",
    "conceptSummary": "IAM identity ≠ table privileges: grant DB-level SELECT to the mapped users.",
    "correctRationale": "IAM authentication controls who connects; object-level privileges inside the database are separate. The mapped database users need GRANTs on the application tables to SELECT.",
    "optionRationales": [
      "Correct: Granting table-level privileges to the DB users is the missing step.",
      "Wrong: alloydb.client controls IAM access, not table privileges.",
      "Wrong: viewer is a project/instance IAM role, not table SELECT rights.",
      "Wrong: alloydbreplica is unrelated to table access."
    ]
  },
  {
    "id": 142,
    "topic": "Replication & Read Replicas",
    "difficulty": 2,
    "question": "You have an application that performs numerous reads and writes all day running in a single Bigtable cluster. A new batch analytics job needs to read the same data and you want to make sure that the new job does not affect the existing workload. What should you do?",
    "options": [
      "A. Scale up the Bigtable instance by manually adding more nodes.",
      "B. Add a new cluster to the existing instance, and enable multi-cluster routing in the app profile.",
      "C. Add a new cluster to the existing instance, and isolate the workloads with two app profiles.",
      "D. Scale up the Bigtable instance by enabling Autoscaling."
    ],
    "correct": 2,
    "explanation": "A second cluster plus a dedicated app profile routes the batch job away from the serving workload — workload isolation for the analytics read.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: C. C is the correct answer. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 142,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C.",
    "conceptSummary": "Isolate Bigtable analytics with an added cluster + dedicated app profile.",
    "correctRationale": "Adding a cluster and pinning the batch job to its own app profile (single-cluster routing to the new cluster) isolates it from the production workload; multi-cluster routing would mix them, and scaling the one cluster doesn't isolate the job.",
    "optionRationales": [
      "Wrong: More nodes share capacity; the batch job still competes.",
      "Wrong: Multi-cluster routing lets the batch job hit the serving cluster — no isolation.",
      "Correct: New cluster + separate app profile = true workload isolation.",
      "Wrong: Autoscaling changes capacity, not isolation."
    ]
  },
  {
    "id": 141,
    "topic": "Database Selection",
    "difficulty": 3,
    "question": "You are the DBA working at a large bank in Europe. Your business-critical banking application runs on Oracle 12.2 in your on-premises data center. You decided to modernize your on-premises Oracle database by migrating to AlloyDB. You must meet the following requirements:\n•\tRemain on-premises and maintain open-source portability.\n•\tMeet regulatory requirements for data residency.\n•\tSupport both OLTP and OLAP workloads.\n•\tMaintain high availability (HA) mode and automatic failover.\nWhat should you do?",
    "options": [
      "A. Deploy AlloyDB Omni in a standalone VM on-premises, and set up disaster recovery (DR) in AlloyDB for PostgreSQL.",
      "B. Migrate to AlloyDB for PostgreSQL by using Database Migration Service.",
      "C. Deploy Kubernetes-based AlloyDB Omni database cluster on-premises. Enable HA by using the AlloyDB Omni Kubernetes operator, and migrate your Oracle database to Omni.",
      "D. Deploy AlloyDB Omni as a docker-based container in your on-premises VM, enable HA for it, and migrate your Oracle database to the Omni container."
    ],
    "correct": 2,
    "explanation": "AlloyDB Omni deployed as a Kubernetes cluster on-premises with the Omni K8s operator gives HA/failover, open-source portability, and Oracle→PostgreSQL portability.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: C. C is the correct answer. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 141,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for C.",
    "conceptSummary": "On-prem Oracle modernization → AlloyDB Omni on Kubernetes with HA operator.",
    "correctRationale": "Remaining on-premises with open-source portability + HA + OLTP/OLAP points to AlloyDB Omni on Kubernetes — the supported deployment with an operator managing HA and automatic failover. A standalone or docker VM lacks supported HA.",
    "optionRationales": [
      "Wrong: A standalone Omni VM has no HA/automatic failover, and pairing DR to cloud AlloyDB breaks the on-prem mandate.",
      "Wrong: Migrating to cloud AlloyDB violates the residency/on-prem requirement.",
      "Correct: Omni on K8s with the operator is the supported on-prem HA deployment.",
      "Wrong: A docker container on a VM is not the supported HA deployment model."
    ]
  },
  {
    "id": 140,
    "topic": "Backup & Recovery",
    "difficulty": 3,
    "question": "You are running a Cloud SQL for PostgreSQL 13 Enterprise Edition instance. During an audit, you discovered that the write-ahead logs used for point-in-time recovery (PITR) are stored on disk. You need to store PITR logs in a Cloud Storage bucket going forward. How should you do this without compromising recoverability or losing the current PITR logs?",
    "options": [
      "A. Clone the instance. Create a new instance with PITR retention set to 30 days.",
      "B. Change the transaction logs (WAL) retention period.",
      "C. Upgrade to Enterprise Plus Edition.",
      "D. Disable PITR, then enable PITR."
    ],
    "correct": 2,
    "explanation": "Enterprise Plus edition stores PITR transaction logs in Cloud Storage — upgrading the edition moves log storage to GCS while preserving existing logs.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: C. C is correct (3 votes)"
      },
      {
        "user": "yokoyan",
        "text": "https://cloud.google.com/sql/docs/postgres/backup-recovery/pitr#log-storage-for-pitr (2 votes)"
      },
      {
        "user": "Chamiel1028",
        "text": "Selected Answer: A. A: Clone + configure PITR retention Option A: Clone the instance and create a new instance with PITR retention set to Cloud Storage Step 1: Clone the existing instance → preserves all current data and WAL logs Step 2: On the cloned instance, enable PITR with retention settings → Cloud SQL automatically stores WAL logs in Cloud Storage Outcome: No loss of existing WAL logs Future PITR logs go to Cloud Storage Recoverability is maintained This satisfies both security/compliance and data retention requirements. (1 vote)"
      },
      {
        "user": "iwork",
        "text": "Selected Answer: D. Google recommends to upgrade version to switch log storage location automaticly. You also can migrate logs without downtime using gcloud command. However, it also depends on retention period (they recommend to switch it to 1 day). For more details see the link beliw: https://cloud.google.com/sql/docs/postgres/backup-recovery/pitr (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 140,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Community favors C — Ent Plus's Cloud Storage log storage is the cited doc feature.",
    "conceptSummary": "Move Cloud SQL PITR logs to Cloud Storage via Enterprise Plus.",
    "correctRationale": "Cloud SQL Enterprise Plus keeps PITR transaction logs in Cloud Storage rather than instance disk; upgrading the edition migrates log storage without disabling PITR or losing retained logs — matching the requirement.",
    "optionRationales": [
      "Wrong: Cloning plus new retention doesn't move log storage to GCS on the production instance.",
      "Wrong: Changing retention length does not change where logs are stored.",
      "Correct: Enterprise Plus stores PITR logs in Cloud Storage — the documented differentiator.",
      "Wrong: Disabling PITR loses the current logs — explicitly prohibited."
    ]
  },
  {
    "id": 139,
    "topic": "Migration",
    "difficulty": 2,
    "question": "You are planning to migrate a 10 TB relational database from an on-premises environment to Cloud SQL for PostgreSQL. The database contains sensitive customer information. You want to follow Google-recommended practices to keep data secure during the migration. What should you do? (Choose two.)",
    "options": [
      "A. Configure Cloud SQL for automatic patching, and enable binary logging.",
      "B. Establish a Private Service Connect connection between your on-premises environment and the Cloud SQL instance.",
      "C. Use an external IP address for the Cloud SQL instance, and configure firewall rules.",
      "D. Set up Identity and Access Management (IAM) roles to restrict access with Cloud SQL with an internal IP address.",
      "E. Leverage Storage Transfer Service with client-side encryption."
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "Private Service Connect gives private connectivity to Cloud SQL for the migration path, and IAM + internal IP restrict access — the secure-migration pair.",
    "discussion": [
      {
        "user": "c3815ba",
        "text": "Selected Answer: BD. ✅ B. Use Private Service Connect (PSC) • PSC enables private, secure connectivity to Cloud SQL using internal IPs only, even across hybrid networks (on-prem to GCP). • Prevents exposing the Cloud SQL instance over the public internet. • This is a Google-recommended practice for connecting securely from on-premises environments to GCP-managed services. ⸻ ✅ D. Use IAM roles + internal IPs • IAM enforces least privilege access control for managing and connecting to Cloud SQL instances. • Internal IP usage ensures connections remain inside the VPC, not over the public internet. • Together, these controls reduce the attack surface and follow GCP security best practices. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 139,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B+D.",
    "conceptSummary": "Secure migration: PSC connectivity + IAM/internal-IP access control.",
    "correctRationale": "For sensitive data, Google-recommended practice is private connectivity (PSC to the Cloud SQL internal IP, no public exposure) and tight IAM access control with internal-IP addressing — options B and D.",
    "optionRationales": [
      "Wrong: Patching and binlogs are operational concerns, not migration security controls.",
      "Correct: PSC gives private, non-internet connectivity from on-prem to Cloud SQL.",
      "Wrong: A public IP + firewall rules exposes the sensitive path — contrary to recommended practice.",
      "Correct: IAM-restricted access on an internal IP limits who can reach the migrated data.",
      "Wrong: Storage Transfer Service is for object/file data, not a relational migration path here."
    ]
  },
  {
    "id": 138,
    "topic": "Backup & Recovery",
    "difficulty": 2,
    "question": "You are deploying a Cloud SQL for MySQL database to serve a non-critical application. The database size is 10 GB and will be updated every night with data stored in a Cloud Storage bucket. The database serves read-only traffic from the application during the day. The data locality requirement of this application mandates that data must reside in a single region. You want to minimize the cost of running this database while maintaining an RTO of 1 day. What should you do?",
    "options": [
      "A. Create a Cloud SQL for MySQL instance with high availability (HA) enabled. Configure automated backups of the Cloud SQL instance, and use the default backup location.",
      "B. Create a Cloud SQL for MySQL instance with high availability (HA) disabled. Create a read replica in the same zone.",
      "C. Create a Cloud SQL for MySQL instance with high availability (HA) disabled. Create a read replica in a second region.",
      "D. Create a Cloud SQL for MySQL instance with high availability (HA) disabled. Configure automated backups of the Cloud SQL instance, and use a custom backup location to store backups in a Cloud Storage bucket in the same region."
    ],
    "correct": 3,
    "explanation": "Non-critical app + 1-day RTO → no HA needed; automated backups to a custom same-region location satisfy residency at lowest cost.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: D. D is the correct answer. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 138,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "Cheap compliant setup: no HA + automated backups in a same-region location.",
    "correctRationale": "A one-day RTO and non-critical workload doesn't justify HA or replicas; automated backups meet recovery needs, and the custom same-region backup location satisfies the data-locality mandate (default location is multi-region).",
    "optionRationales": [
      "Wrong: HA doubles the cost for a non-critical app; default backup location is multi-region, breaking locality.",
      "Wrong: A same-zone replica adds cost without recovery or locality benefit.",
      "Wrong: A second-region replica violates the single-region mandate.",
      "Correct: No HA + automated backups to a custom same-region location = cheapest compliant design."
    ]
  },
  {
    "id": 137,
    "topic": "Capacity Planning & Cost",
    "difficulty": 2,
    "question": "Your rapidly growing ecommerce company is migrating their analytics workloads to AlloyDB for PostgreSQL. You anticipate a significant increase in reporting queries as the business scales. You need a read pool strategy to scale your analytics operations in anticipation of future growth while minimizing costs. What should you do?",
    "options": [
      "A. Direct all complex, long-running analytics queries to the primary instance, and only use read pools for short, frequent reports.",
      "B. Change the instance sizes of the read nodes in the read pool.",
      "C. Begin with minimal read pools and iteratively expand or shrink them based on real-time load monitoring to optimize resource allocation.",
      "D. Assign all reporting queries to a single, large read pool to maximize the combined compute resources available for analytics."
    ],
    "correct": 2,
    "explanation": "Start with a small read pool and adjust node size/count from real load metrics — the cost-minimal growth strategy for AlloyDB analytics.",
    "discussion": [
      {
        "user": "c3815ba",
        "text": "Selected Answer: C. AlloyDB for PostgreSQL supports read pools, which are read-only replicas designed to handle analytical workloads like reporting and business intelligence queries. These help offload read pressure from the primary instance and scale horizontally. Why Option C is correct: • Cost-efficient: You avoid overprovisioning and only scale when needed. • Scalable: AlloyDB allows dynamic scaling of read pool nodes. • Performance-aware: You can use Cloud Monitoring and query performance stats to determine when to scale. • Best practice: Google Cloud recommends starting small and adjusting based on observed load to balance performance and cost. (1 vote)"
      },
      {
        "user": "MikeFR",
        "text": "Selected Answer: C. adapt the figure when needed ... not before (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 137,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for C — scale the read pool to observed demand.",
    "conceptSummary": "Right-size AlloyDB read pools iteratively from observed load.",
    "correctRationale": "Read pools offload analytics from the primary; the cost-efficient approach is to start small and expand/shrink from measured load rather than oversizing one big pool or sending analytics back to the primary.",
    "optionRationales": [
      "Wrong: Sending analytics to the primary re-creates the contention read pools exist to remove.",
      "Wrong: Only changing node size is a subset of the iterative approach, not the strategy.",
      "Correct: Iterative expansion/contraction from live metrics minimizes cost while scaling analytics.",
      "Wrong: One large pool over-provisions immediately — not cost-minimal."
    ]
  },
  {
    "id": 136,
    "topic": "Database Selection",
    "difficulty": 1,
    "question": "Your company is launching a new globally distributed application with strict requirements for low latency, strong consistency, zero downtime, and high availability (HA). You need to configure a scalable database solution to support anticipated rapid growth and optimal application performance. What should you do?",
    "options": [
      "A. Create a Spanner instance across regions for optimal performance.",
      "B. Implement Bigtable with replication across multiple regions and configure to prioritize data accuracy.",
      "C. Create a Cloud SQL instance in HA mode with a cross-region read replica.",
      "D. Create an AlloyDB instance in HA mode with a cross-region read replica."
    ],
    "correct": 0,
    "explanation": "Global distribution + low latency + strong consistency + zero downtime → multi-region Cloud Spanner.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: A. A is the correct answer. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 136,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A.",
    "conceptSummary": "Global low-latency strongly consistent DB → multi-region Spanner.",
    "correctRationale": "Only Spanner spans regions with synchronous replication, strong consistency and continuous availability; the other engines are regional.",
    "optionRationales": [
      "Correct: Spanner across regions uniquely meets all four requirements.",
      "Wrong: Bigtable replication is eventually consistent, not strong.",
      "Wrong: Cloud SQL cross-region replicas can't write in the second region.",
      "Wrong: AlloyDB is regional; cross-region replicas don't give strong global consistency."
    ]
  },
  {
    "id": 135,
    "topic": "Operations & Maintenance",
    "difficulty": 1,
    "question": "Your company is launching a gaming application that uses a Firestore database. You need to identify an easy-to-manage and cost-effective solution to automate the scheduling of Firestore data exports. What should you do?",
    "options": [
      "A. Create a new Compute Engine, and set up a cron Job to run the gcloud firestore export command.",
      "B. Use Dataflow to create a custom pipeline to extract data from Firestore, transform it into the desired format, and load it into a Cloud Storage bucket at regular intervals.",
      "C. Use Cloud Scheduler to trigger a Cloud Function that executes the Firestore export process.",
      "D. Use the Firebase Admin SDK to programmatically schedule and manage exports."
    ],
    "correct": 2,
    "explanation": "Cloud Scheduler triggering a Cloud Function that runs the Firestore export is the managed, cheap scheduling path.",
    "discussion": [
      {
        "user": "yokoyan",
        "text": "Selected Answer: C. C is the correct answer. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 135,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C.",
    "conceptSummary": "Scheduled Firestore exports via Scheduler + Function.",
    "correctRationale": "Scheduler + function is the documented, low-cost way to automate Firestore exports; VMs and pipelines are overhead and the Admin SDK has no scheduling.",
    "optionRationales": [
      "Wrong: A VM cron keeps paying for a server and its upkeep.",
      "Wrong: A custom Dataflow pipeline is over-engineered for scheduled exports.",
      "Correct: Scheduler-triggered function running the export is the managed pattern.",
      "Wrong: The Admin SDK does not provide a scheduler."
    ],
    "legacyNote": "Cloud Functions are now Cloud Run functions."
  },
  {
    "id": 134,
    "topic": "Database Selection",
    "difficulty": 1,
    "question": "You want to migrate an existing on-premises application to Google Cloud. Your application supports semi-structured data ingested from 100,000 sensors, and each sensor sends 10 readings per second from manufacturing plants. You need to make this data available for real-time monitoring and analysis. What should you do?",
    "options": [
      "A. Deploy the database using Cloud SQL.",
      "B. Use BigQuery, and load data in batches.",
      "C. Deploy the database using Bigtable.",
      "D. Deploy the database using Cloud Spanner."
    ],
    "correct": 2,
    "explanation": "1,000,000 writes/sec of semi-structured IoT data for real-time monitoring → Bigtable.",
    "discussion": [
      {
        "user": "c3815ba",
        "text": "Selected Answer: C. You’re dealing with: • High-velocity, semi-structured data • 100,000 sensors × 10 readings/sec = 1,000,000 writes/sec • Real-time monitoring and analysis • Time-series-like data from IoT devices These requirements align exactly with the strengths of Cloud Bigtable. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 134,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C.",
    "conceptSummary": "Massive sensor write throughput → Bigtable.",
    "correctRationale": "A million writes per second of semi-structured time-series data with real-time access is Bigtable's exact design profile; SQL/Spanner cannot absorb that rate cost-effectively and BigQuery batches are not real-time.",
    "optionRationales": [
      "Wrong: Cloud SQL cannot ingest 1M writes/sec.",
      "Wrong: Batch loads are not real-time monitoring.",
      "Correct: Bigtable handles the write rate, semi-structured shape and low-latency reads.",
      "Wrong: Spanner is relational OLTP — wrong profile and cost for sensor ingestion."
    ]
  },
  {
    "id": 133,
    "topic": "Migration",
    "difficulty": 3,
    "question": "You are building a data warehouse on BigQuery. Sources of data include several MySQL databases located on-premises. You need to transfer data from these databases into BigQuery for analytics. You want to use a managed solution that has low latency and is easy to set up. What should you do?",
    "options": [
      "A. Use Datastream to connect to your on-premises database and create a stream. Have Datastream write to Cloud Storage. Then use Dataflow to process the data into BigQuery.",
      "B. Use Cloud Data Fusion and scheduled workflows to extract data from MySQL. Transform this data into the appropriate schema, and load this data into your BigQuery database.",
      "C. Use Database Migration Service to replicate data to a Cloud SQL for MySQL instance. Create federated tables in BigQuery on top of the replicated instances to transform and load the data into your BigQuery database.",
      "D. Create extracts from your on-premises databases periodically, and push these extracts to Cloud Storage. Upload the changes into BigQuery, and merge them with existing tables."
    ],
    "correct": 0,
    "explanation": "Datastream is the managed low-latency CDC service that streams MySQL changes toward BigQuery (via GCS + Dataflow) — matching the low-latency requirement.",
    "discussion": [
      {
        "user": "MikeFR",
        "text": "Selected Answer: B. looks like the right way to do (2 votes)"
      },
      {
        "user": "Alex0707",
        "text": "Selected Answer: B. A and B are good, but Data Fusion is easier to setup. You may say only Datastream provides low latency, but Data Fusion has Replication mode that also may provide low latency (1 vote)"
      },
      {
        "user": "lhstudylh",
        "text": "Selected Answer: A. Datastream is a managed and low latency that allows for near real time replication (1 vote)"
      },
      {
        "user": "Skywatch",
        "text": "Selected Answer: A. Datastream is made for this (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 133,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Community favored B (Data Fusion) but A is loaded: the explicit low-latency requirement is Datastream's purpose — it streams changes in near-real time, while Data Fusion's scheduled workflows are batch-oriented.",
    "conceptSummary": "Low-latency managed MySQL→BigQuery ingestion via Datastream.",
    "correctRationale": "Datastream is purpose-built for low-latency change-data-capture from MySQL sources into Google Cloud; writing to Cloud Storage and processing into BigQuery via Dataflow is the documented managed near-real-time pattern.",
    "optionRationales": [
      "Correct: Datastream provides the managed low-latency CDC the question demands.",
      "Wrong: Data Fusion scheduled workflows are batch-oriented — heavier and higher latency than CDC streaming.",
      "Wrong: DMS→Cloud SQL then federating adds a hop and is not 'easy to set up' low-latency analytics.",
      "Wrong: Periodic manual extracts are high-latency and manual."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 132,
    "topic": "Migration",
    "difficulty": 2,
    "question": "Your company is shutting down their data center and migrating several MySQL and PostgreSQL databases to Google Cloud. Your database operations team is severely constrained by ongoing production releases and the lack of capacity for additional on-premises backups. You want to ensure that the scheduled migrations happen with minimal downtime and that the Google Cloud databases stay in sync with the on-premises data changes until the applications can cut over.\nWhat should you do? (Choose two.)",
    "options": [
      "A. Use an external read replica to migrate the databases to Cloud SQL.",
      "B. Use a read replica to migrate the databases to Cloud SQL.",
      "C. Use Database Migration Service to migrate the databases to Cloud SQL.",
      "D. Use a cross-region read replica to migrate the databases to Cloud SQL.",
      "E. Use replication from an external server to migrate the databases to Cloud SQL."
    ],
    "correct": [
      2,
      4
    ],
    "explanation": "DMS is the managed migration path, and replication from an external server keeps Cloud SQL continuously in sync — both minimize downtime with no extra on-prem backup capacity.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C, E. Classic use case for the Database Migration Service (C). E is effectively doing what the DMS does as well. (9 votes)"
      },
      {
        "user": "KennyHuang",
        "text": "Selected Answer: CE. CE correct answers! (5 votes)"
      },
      {
        "user": "c3815ba",
        "text": "Selected Answer: AC. Option Valid for on-prem to Cloud SQL? Meets minimal downtime goal? Managed solution? A ✅ Yes (external replica) ✅ Yes ✅ Supported B ❌ No (Cloud SQL → Cloud SQL only) ❌ — C ✅ Yes (DMS) ✅ Yes ✅ Fully managed D ❌ No ❌ — E ⚠️ Possible but not ideal ⚠️ Operationally heavy ❌ Not recommended (1 vote)"
      },
      {
        "user": "EmiNard84",
        "text": "Selected Answer: BE. BE correct answers! (1 vote)"
      },
      {
        "user": "PKookNN",
        "text": "Selected Answer: CE. This should be CE (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 132,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C+E (same pairing as the companion question, with shuffled option letters).",
    "conceptSummary": "Continuous-sync migration paths: DMS and external-server replication.",
    "correctRationale": "The two mechanisms that keep the Cloud SQL target synchronized with the live on-prem databases until cutover are Database Migration Service (managed, handles MySQL+PostgreSQL) and replication from an external server — both avoiding on-prem backup capacity.",
    "optionRationales": [
      "Wrong: 'External read replica' is not the migration mechanism name here; the source is external, making replication-from-external-server the fit.",
      "Wrong: A read replica presumes a Cloud SQL primary already exists.",
      "Correct: DMS performs the managed continuous migration to Cloud SQL.",
      "Wrong: Cross-region replicas are Cloud SQL-to-Cloud SQL.",
      "Correct: External-server replication keeps Cloud SQL in sync until cutover."
    ]
  },
  {
    "id": 131,
    "topic": "Security & IAM",
    "difficulty": 1,
    "question": "Your company's mission-critical, globally available application is supported by a Cloud Spanner database. Experienced users of the application have read and write access to the database, but new users are assigned read-only access to the database. You need to assign the appropriate Cloud Spanner Identity and Access Management (IAM) role to new users being onboarded soon. What roles should you set up?",
    "options": [
      "A. roles/spanner.databaseReader",
      "B. roles/spanner.databaseUser",
      "C. roles/spanner.viewer",
      "D. roles/spanner.backupWriter"
    ],
    "correct": 0,
    "explanation": "Read-only database access = roles/spanner.databaseReader; viewer only sees the instance, databaseUser can write.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. Nothing to do with backups. Eliminate D. databaseUser allows read and write. Eliminate B. viewer is at the instance level and does not allow database reads. Eliminate C. Leaves A. (7 votes)"
      },
      {
        "user": "EmiNard84",
        "text": "The correct answer is A! With Spanner.viewer user cannot read database, but he can visualize only database List. https://cloud.google.com/spanner/docs/iam?hl=it (5 votes)"
      },
      {
        "user": "EueChan",
        "text": "Selected Answer: A. See this link https://cloud.google.com/spanner/docs/iam (5 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 131,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A.",
    "conceptSummary": "Spanner read-only onboarding role → spanner.databaseReader.",
    "correctRationale": "databaseReader grants database read access — exactly what new read-only users need; databaseUser adds writes and viewer can't read data.",
    "optionRationales": [
      "Correct: databaseReader = read-only on the database.",
      "Wrong: databaseUser permits writes.",
      "Wrong: viewer lists instances but cannot read data.",
      "Wrong: backupWriter is for backup jobs."
    ]
  },
  {
    "id": 130,
    "topic": "Operations & Maintenance",
    "difficulty": 1,
    "question": "Your DevOps team is using Terraform to deploy applications and Cloud SQL databases. After every new application change is rolled out, the environment is torn down and recreated, and the persistent database layer is lost. You need to prevent the database from being dropped. What should you do?",
    "options": [
      "A. Set Terraform deletion_protection to true.",
      "B. Rerun terraform apply.",
      "C. Create a read replica.",
      "D. Use point-in-time-recovery (PITR) to recover the database."
    ],
    "correct": 0,
    "explanation": "Terraform's deletion_protection lifecycle flag stops terraform destroy/apply from dropping the stateful database resource.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. It makes sense that a Terraform problem would use a Terra form solution. From Google's documentation, \"For stateful resources, such as databases, ensure that deletion protection is enabled. The syntax is: lifecycle { prevent_destroy = true } https://cloud.google.com/docs/terraform/best-practices-for-terraform#stateful-resources (9 votes)"
      },
      {
        "user": "dedotes",
        "text": "Selected Answer: A. agreed with dynamic_dba (2 votes)"
      },
      {
        "user": "DPonly",
        "text": "Selected Answer: A. For stateful resources, such as databases, ensure that deletion protection is enabled. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 130,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A.",
    "conceptSummary": "Protect Terraform-managed Cloud SQL via deletion_protection.",
    "correctRationale": "For stateful resources Terraform offers the deletion_protection lifecycle setting — exactly the fix for teardowns dropping the database.",
    "optionRationales": [
      "Correct: deletion_protection=true prevents Terraform from deleting the instance.",
      "Wrong: Re-running apply just recreates/tears down again.",
      "Wrong: A replica doesn't stop the primary's deletion.",
      "Wrong: PITR recovers data but doesn't prevent the instance drop."
    ]
  },
  {
    "id": 129,
    "topic": "Connectivity & Networking",
    "difficulty": 2,
    "question": "You are migrating an on-premises application to Compute Engine and Cloud SQL. The application VMs will live in their own project, separate from the Cloud SQL instances which have their own project. What should you do to configure the networks?",
    "options": [
      "A. Create a new VPC network in each project, and use VPC Network Peering to connect the two together.",
      "B. Create a Shared VPC that both the application VMs and Cloud SQL instances will use.",
      "C. Use the default networks, and leverage Cloud VPN to connect the two together.",
      "D. Place both the application VMs and the Cloud SQL instances in the default network of each project."
    ],
    "correct": 1,
    "explanation": "Shared VPC lets both projects' resources share one network — the recommended way to link app VMs and Cloud SQL across projects.",
    "discussion": [
      {
        "user": "tkg13",
        "text": "I believe it's option B as shared VPC can be used to connect multiple projects . (7 votes)"
      },
      {
        "user": "abdenago",
        "text": "Selected Answer: B. https://groups.google.com/g/google-cloud-sql-discuss/c/M5G5_HPXytY?pli=1 (2 votes)"
      },
      {
        "user": "Chamiel1028",
        "text": "Selected Answer: A. Shared VPC allows multiple projects to use subnets in a single “host” project Only the host project owns the network, and other “service” projects attach resources to it Requires: Projects are within the same Google Cloud organization You are willing to make one project the host network owner B is not wrong in general, but in this scenario, because the projects are already separate and restructuring to a host/service model may not be possible, A (VPC Peering) is the simpler, recommended approach. (1 vote)"
      },
      {
        "user": "ssp01",
        "text": "B. More info on this matter: https://cloud.google.com/network-connectivity/docs/interconnect/how-to/enabling-multiple-networks-access-same-attachment (1 vote)"
      },
      {
        "user": "nmnm22",
        "text": "Selected Answer: B. Option B (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 129,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Community favors B (Shared VPC); A would work but is the heavier design.",
    "conceptSummary": "Cross-project app+Cloud SQL networking via Shared VPC.",
    "correctRationale": "When resources in different projects must share connectivity, Shared VPC (host + service projects) is the standard topology — cleaner than peering two separate VPCs or VPNs.",
    "optionRationales": [
      "Wrong: Two new VPCs + peering works but is more network management than needed.",
      "Correct: One Shared VPC for both projects is the canonical cross-project design.",
      "Wrong: Cloud VPN is for external/on-prem links, not VPC-to-VPC in the same org.",
      "Wrong: Default networks in different projects are not connected."
    ]
  },
  {
    "id": 128,
    "topic": "High Availability & DR",
    "difficulty": 1,
    "question": "You want to migrate an on-premises mission-critical PostgreSQL database to Cloud SQL. The database must be able to withstand a zonal failure with less than five minutes of downtime and still not lose any transactions. You want to follow Google-recommended practices for the migration. What should you do?",
    "options": [
      "A. Take nightly snapshots of the primary database instance, and restore them in a secondary zone.",
      "B. Build a change data capture (CDC) pipeline to read transactions from the primary instance, and replicate them to a secondary instance.",
      "C. Create a read replica in another region, and promote the read replica if a failure occurs.",
      "D. Enable high availability (HA) for the database to make it regional."
    ],
    "correct": 3,
    "explanation": "Enabling HA makes the instance regional with synchronous standby — automatic zonal failover under five minutes with no transaction loss.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "D. Mission critical means make the instance HA. Nothing else makes sense apart from D. (4 votes)"
      },
      {
        "user": "AnilKr",
        "text": "D, zonal failure > enable HA to recover (1 vote)"
      },
      {
        "user": "DBAgain",
        "text": "Selected Answer: D. D is the clear winner. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 128,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "Zonal-failure tolerance → enable Cloud SQL HA (regional instance).",
    "correctRationale": "An HA (regional) instance keeps a synchronous standby in another zone; failover is automatic in well under five minutes with zero transaction loss — the recommended practice for mission-critical Cloud SQL.",
    "optionRationales": [
      "Wrong: Nightly snapshots restore to last night — large data loss and long downtime.",
      "Wrong: A DIY CDC pipeline adds complexity and lag; HA is managed and synchronous.",
      "Wrong: A cross-region replica is for regional DR and manual promotion; zonal failure is covered more simply by HA.",
      "Correct: HA/regional instance = automatic zonal failover, <5 min, zero loss."
    ]
  },
  {
    "id": 127,
    "topic": "Replication & Read Replicas",
    "difficulty": 3,
    "question": "You have deployed a Cloud SQL for SQL Server instance. In addition, you created a cross-region read replica for disaster recovery (DR) purposes. Your company requires you to maintain and monitor a recovery point objective (RPO) of less than 5 minutes. You need to verify that your cross-region read replica meets the allowed RPO. What should you do?",
    "options": [
      "A. Use Cloud SQL instance monitoring.",
      "B. Use the Cloud Monitoring dashboard with available metrics from Cloud SQL.",
      "C. Use Cloud SQL logs.",
      "D. Use the SQL Server Always On Availability Group dashboard."
    ],
    "correct": 1,
    "explanation": "Cloud Monitoring exposes Cloud SQL metrics including replica lag, letting you verify the cross-region replica stays inside the 5-minute RPO.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "D. Note, you cannot create a read replica in Cloud SQL for SQL Server unless you use an Enterprise Edition. Which is also a requirement for configuring SQL Server AG. That's not a coincidence. That's how Cloud SQL for SQL Server creates SQL Server read replicas. To find out about the replication, use the AG Dashboard in SSMS. https://cloud.google.com/sql/docs/sqlserver/replication/manage-replicas#promote-replica (14 votes)"
      },
      {
        "user": "abdenago",
        "text": "Selected Answer: B. https://medium.com/google-cloud/cloud-sql-recovering-from-regional-failure-in-10-minutes-or-less-mysql-fc055540a8f0 (3 votes)"
      },
      {
        "user": "sapsant",
        "text": "Selected Answer: D. https://cloud.google.com/sql/docs/sqlserver/replication/manage-replicas#promote-replica (3 votes)"
      },
      {
        "user": "sapsant",
        "text": "Selected Answer: D. D is the correct answer (3 votes)"
      },
      {
        "user": "cachopo",
        "text": "Selected Answer: B. This is the correct choice because Cloud Monitoring is the native Google Cloud observability tool that collects and visualizes the specific metric needed to verify RPO: Replication Lag. 1. The Metric (Replication Lag): RPO (Recovery Point Objective) essentially defines the maximum acceptable data loss in the event of a failure. For a read replica, this is measured by the replication lag—the time difference (in seconds or minutes) between when a transaction is committed on the primary and when it is applied to the replica. (2 votes)"
      },
      {
        "user": "Chamiel1028",
        "text": "Selected Answer: B. Cloud Monitoring metrics are the official way to monitor RPO/replication lag in Cloud SQL You can set alerts if lag exceeds thresholds (e.g., 5 minutes) Fully supported and works for cross-region replicas Reason D is wrong: Cloud SQL for SQL Server does not give access to the Always On AG dashboard, so you cannot rely on it for verifying RPO. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 127,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "low",
    "conflict": true,
    "discussionSummary": "Community favored B (Cloud Monitoring metrics) but a substantial minority argued D (Always On AG dashboard, since Cloud SQL for SQL Server replicas are AG-based). B is loaded for the platform-metrics RPO view; flag for adjudication.",
    "conceptSummary": "Verify cross-region replica RPO via Cloud Monitoring metrics.",
    "correctRationale": "Replication lag metrics for Cloud SQL instances live in Cloud Monitoring, so a dashboard there is the way to confirm the replica's lag stays under 5 minutes — the service-level way to monitor RPO across SQL Server replicas.",
    "optionRationales": [
      "Wrong: Instance monitoring shows the instance console view, not a metrics dashboard for RPO tracking.",
      "Correct: Cloud Monitoring's Cloud SQL metrics (including replica lag) let you verify RPO compliance.",
      "Wrong: Logs show events, not a quantitative lag figure to compare with the RPO.",
      "Wrong: The AG dashboard is a SQL Server-side view; Cloud SQL abstracts replica management, and Cloud Monitoring is the recommended platform metric path."
    ]
  },
  {
    "id": 126,
    "topic": "Migration",
    "difficulty": 3,
    "question": "You are migrating your 2 TB on-premises PostgreSQL cluster to Compute Engine. You want to set up your new environment in an Ubuntu virtual machine instance in Google Cloud and seed the data to a new instance. You need to plan your database migration to ensure minimum downtime. What should you do?",
    "options": [
      "A. Step 1: Take a full export while the database is offline.\nStep 2: Create a bucket in Cloud Storage.\nStep 3: Transfer the dump file to the bucket you just created.\nStep 4: Import the dump file into the Google Cloud primary server.",
      "B. Step 1: Take a full export while the database is offline.\nStep 2: Create a bucket in Cloud Storage.\nStep 3: Transfer the dump file to the bucket you just created.\nStep 4: Restore the backup into the Google Cloud primary server.",
      "C. Step 1: Take a full backup while the database is online.\nStep 2: Create a bucket in Cloud Storage.\nStep 3: Transfer the backup to the bucket you just created.\nStep 4: Restore the backup into the Google Cloud primary server.\nStep 5: Create a recovery.conf file in the $PG_DATA directory.\nStep 6: Stop the source database.\nStep 7: Transfer the write ahead logs to the bucket you created before.\nStep 8: Start the PostgreSQL service.\nStep 9: Wait until Google Cloud primary server syncs with the running primary server.",
      "D. Step 1: Take a full export while the database is online.\nStep 2: Create a bucket in Cloud Storage.\nStep 3: Transfer the dump file and write-ahead logs to the bucket you just created.\nStep 4: Restore the dump file into the Google Cloud primary server.\nStep 5: Create a recovery.conf file in the $PG_DATA directory.\nStep 6: Stop the source database.\nStep 7: Transfer the write-ahead logs to the bucket you created before.\nStep 8: Start the PostgreSQL service.\nStep 9: Wait until the Google Cloud primary server syncs with the running primary server."
    ],
    "correct": 2,
    "explanation": "Online base backup + WAL shipping with recovery.conf lets the new GCE primary sync then cut over — minimum downtime on a self-managed target.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C. Full exports are not possible offline. Eliminate A and B. Migrating to GCE means you can't use the Database Migration Service. Note, Datastream CDC only supports MySQL and Oracle. To seed the PostgreSQL instance in GCE, a backup is needed created using pg_basebackup. An export won't cut it. That eliminates D and leaves C. Those 9 steps actually make sense. (5 votes)"
      },
      {
        "user": "pico",
        "text": "B This approach minimizes downtime by exporting the database while it's offline, transferring it to Google Cloud Storage, and then restoring it into the new Google Cloud primary server. It's a straightforward and efficient method to migrate your PostgreSQL database. The other options involve additional steps that are not necessary or may introduce unnecessary complexities and potential issues during the migration process. For C and D: The major issue with this option is the additional steps involving creating a recovery.conf file, stopping the source database, transferring write-ahead logs, and syncing with the running primary server. These steps are overly complex and can introduce unnec… (2 votes)"
      },
      {
        "user": "njda",
        "text": "Selected Answer: C. Couple of reasons for C option. 1. Database remains online (see link below, and step 1, which says \"running master database\" 2. Backups are faster then exports (which generates new files) https://cloud.google.com/architecture/migrating-postgresql-to-gcp (2 votes)"
      },
      {
        "user": "abdenago",
        "text": "Selected Answer: C. https://cloud.google.com/architecture/migrating-postgresql-to-gcp (1 vote)"
      },
      {
        "user": "dija123",
        "text": "Selected Answer: C. Agree with C, As taking backup is faster than the export. (1 vote)"
      },
      {
        "user": "AnilKr",
        "text": "C, Its to take full backup not full export in this case. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 126,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for C — online backup + WAL shipping is the low-downtime recipe for a self-managed target.",
    "conceptSummary": "Minimum-downtime GCE PostgreSQL migration via base backup + WAL shipping.",
    "correctRationale": "The documented minimal-downtime pattern for self-managed PostgreSQL is an online full backup, then WAL transfer so the new server replays changes (recovery.conf), then stop the source and let the GCP primary catch up — only the final cutover causes downtime.",
    "optionRationales": [
      "Wrong: An offline export means the whole transfer is downtime, plus 'export' is not the right mechanism here.",
      "Wrong: Same offline-export downtime problem.",
      "Correct: Online backup + WAL replay via recovery.conf + brief cutover = minimum downtime.",
      "Wrong: Dump file + ad-hoc WAL steps is less coherent than the documented backup+recovery.conf flow."
    ]
  },
  {
    "id": 125,
    "topic": "Security & IAM",
    "difficulty": 1,
    "question": "You are a DBA of Cloud SQL for PostgreSQL. You want the applications to have password-less authentication for read and write access to the database. Which authentication mechanism should you use?",
    "options": [
      "A. Use Identity and Access Management (IAM) authentication.",
      "B. Use Managed Active Directory authentication.",
      "C. Use Cloud SQL federated queries.",
      "D. Use PostgreSQL database's built-in authentication."
    ],
    "correct": 0,
    "explanation": "IAM database authentication gives password-less login to Cloud SQL for PostgreSQL using IAM identities.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. Google wants you to use IAM regardless. PostgreSQL built-in authentication requires a username and a password. That rules out D. Federated queries are queries originating from BigQuery to Cloud SQL. Eliminate C. AD is strongly tied to SQL Server. Eliminate B. That leaves A. (6 votes)"
      },
      {
        "user": "abdenago",
        "text": "Selected Answer: A. https://cloud.google.com/sql/docs/postgres/authentication (3 votes)"
      },
      {
        "user": "shaiz98",
        "text": "A. IAM Authentication is password less. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 125,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A.",
    "conceptSummary": "Password-less DB auth via IAM database authentication.",
    "correctRationale": "IAM database authentication lets users and applications log in to Cloud SQL with IAM credentials instead of passwords — the Google-recommended password-less mechanism.",
    "optionRationales": [
      "Correct: IAM DB authentication is the password-less mechanism.",
      "Wrong: Managed AD is for SQL Server, not PostgreSQL.",
      "Wrong: Federated queries are a BigQuery feature, not an auth mechanism.",
      "Wrong: Built-in auth requires a password by definition."
    ]
  },
  {
    "id": 124,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "Your company is evaluating Google Cloud database options for a mission-critical global payments gateway application. The application must be available 24/7 to users worldwide, horizontally scalable, and support open source databases. You need to select an automatically shardable, fully managed database with 99.999% availability and strong transactional consistency. What should you do?",
    "options": [
      "A. Select Bare Metal Solution for Oracle.",
      "B. Select Cloud SQL.",
      "C. Select Bigtable.",
      "D. Select Cloud Spanner."
    ],
    "correct": 3,
    "explanation": "Automatically shardable, fully managed, 99.999% availability, strong consistency — Cloud Spanner's exact spec.",
    "discussion": [
      {
        "user": "absero1609",
        "text": "Selected Answer: D. worldwide, horizontally scalable, strong transactional consistency Definitely Cloud Spanner (4 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. Oracle is not open source. Eliminate A. Horizontally scalable means adding more servers to run the database. That eliminates Cloud SQL (B). Strong transactional consistency rules out Bigtable since Bigtable transactions are at the single row level. Eliminate C. That leaves D. (3 votes)"
      },
      {
        "user": "Ryannn23",
        "text": "The application must be available 24/7 to users worldwide, horizontally scalable, and support open source databases. Open source databases .... The only solution is Cloud SQL... (3 votes)"
      },
      {
        "user": "Steve8512",
        "text": "Selected Answer: D. 99.999%, shardable, horizontally scalable, strong consistency, global - all of these scream Spanner. And while Spanner is not open source, it has a postgres interface and so supports open source. https://cloud.google.com/spanner/docs/postgresql-interface (1 vote)"
      },
      {
        "user": "lijulalithangathan",
        "text": "but cloud sql doesn't provide 99.999 availability (1 vote)"
      },
      {
        "user": "nmnm22",
        "text": "Selected Answer: D. horizontally scalable --> Cloud spanner (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 124,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "Global payments: auto-sharded, strongly consistent, 99.999% → Cloud Spanner.",
    "correctRationale": "Only Spanner combines automatic sharding/splitting, full management, a 99.999% multi-region SLA and strong transactional consistency; Bigtable lacks transactions and Cloud SQL lacks the SLA/scale.",
    "optionRationales": [
      "Wrong: BMS is not fully managed nor horizontally shardable.",
      "Wrong: Cloud SQL can't reach 99.999% or automatic sharding.",
      "Wrong: Bigtable is not transactional.",
      "Correct: Spanner uniquely meets every requirement."
    ]
  },
  {
    "id": 123,
    "topic": "Migration",
    "difficulty": 1,
    "question": "Your company is migrating all legacy applications to Google Cloud. All on-premises applications are using legacy Oracle 12c databases with Oracle Real Application Cluster (RAC) for high availability (HA) and Oracle Data Guard for disaster recovery. You need a solution that requires minimal code changes, provides the same high availability you have today on-premises, and supports a low latency network for migrated legacy applications. What should you do?",
    "options": [
      "A. Migrate the databases to Cloud Spanner.",
      "B. Migrate the databases to Cloud SQL, and enable a standby database.",
      "C. Migrate the databases to Compute Engine using regional persistent disks.",
      "D. Migrate the databases to Bare Metal Solution for Oracle."
    ],
    "correct": 3,
    "explanation": "Oracle 12c RAC + Data Guard with minimal code changes and HA parity → Bare Metal Solution for Oracle.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "D. BMS is the only Google database service which supports Oracle aside from GCVE. It allows you to use all native Oracle features including RAC. Since GCVE isn't mentioned, it has to be D - Bare Metal Solution. (2 votes)"
      },
      {
        "user": "fad3r",
        "text": "Pretty much anytime Oracle is mentioned the answer is always Bare Metal (1 vote)"
      },
      {
        "user": "EmiNard84",
        "text": "Selected Answer: D. The correct answer is D! (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 123,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "Oracle RAC/Data Guard estate → Bare Metal Solution for Oracle.",
    "correctRationale": "BMS is the only Google Cloud offering supporting Oracle RAC and native Oracle features (including Data Guard for DR) with low-latency connectivity and zero code changes.",
    "optionRationales": [
      "Wrong: Spanner is a full replatform.",
      "Wrong: Cloud SQL does not host Oracle.",
      "Wrong: Regional PDs on GCE cannot run licensed/supported RAC.",
      "Correct: BMS runs Oracle RAC/Data Guard natively."
    ]
  },
  {
    "id": 122,
    "topic": "Operations & Maintenance",
    "difficulty": 1,
    "question": "You need to issue a new server certificate because your old one is expiring. You need to avoid a restart of your Cloud SQL for MySQL instance. What should you do in your Cloud SQL instance?",
    "options": [
      "A. Issue a rollback, and download your server certificate.",
      "B. Create a new client certificate, and download it.",
      "C. Create a new server certificate, and download it.",
      "D. Reset your SSL configuration, and download your server certificate."
    ],
    "correct": 2,
    "explanation": "Rotating to a new server certificate does not require an instance restart — just create and download it.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C. Issuing a rollback is nonsense. Eliminate A. The client certificate is unaffected. Eliminate B. Resetting the SSL configuration is not mentioned, but if you enforced SSL that would require an instance re-start. All you need to do is create a new server certificate and download it (to your clients). https://cloud.google.com/sql/docs/sqlserver/configure-ssl-instance#server-certs (6 votes)"
      },
      {
        "user": "abdenago",
        "text": "Selected Answer: C. https://cloud.google.com/sql/docs/mysql/manage-ssl-instance#rotate (2 votes)"
      },
      {
        "user": "AnilKr",
        "text": "You must restart an instance after enforcing SSL for the instance. However, you don't need to restart the instance after changing SSL/TLS certificates. If a restart is required, then this is done automatically during the SSL update event. https://cloud.google.com/sql/docs/mysql/configure-ssl-instance (1 vote)"
      },
      {
        "user": "nmnm22",
        "text": "Selected Answer: C. answer is C , update the stinkin answers (1 vote)"
      },
      {
        "user": "DPonly",
        "text": "Selected Answer: C. will go by C (1 vote)"
      },
      {
        "user": "absero1609",
        "text": "Selected Answer: C. vote for C (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 122,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C per the rotate-certificate doc.",
    "conceptSummary": "Rotate Cloud SQL server certificate without restart.",
    "correctRationale": "Per the SSL management doc, creating a new server certificate on the instance does not require a restart (unlike enforcing SSL). Client certificates and config resets don't apply.",
    "optionRationales": [
      "Wrong: Rollback is not a certificate operation.",
      "Wrong: The expiring cert is the server cert, not a client cert.",
      "Correct: Create + download a new server certificate — no restart.",
      "Wrong: Resetting SSL config is a disruptive action, not needed here."
    ]
  },
  {
    "id": 121,
    "topic": "High Availability & DR",
    "difficulty": 2,
    "question": "You are managing a Cloud SQL for PostgreSQL instance in Google Cloud. You have a primary instance in region 1 and a read replica in region 2. After a failure of region 1, you need to make the Cloud SQL instance available again. You want to minimize data loss and follow Google-recommended practices. What should you do?",
    "options": [
      "A. Restore the Cloud SQL instance from the automatic backups in region 3.",
      "B. Restore the Cloud SQL instance from the automatic backups in another zone in region 1.",
      "C. Check \"Lag Bytes\" in the monitoring dashboard for the primary instance in the read replica instance. Check the replication status using pg_catalog.pg_last_wal_receive_lsn(). Then, fail over to region 2 by promoting the read replica instance.",
      "D. Check your instance operational log for the automatic failover status. Look for time, type, and status of the operations. If the failover operation is successful, no action is necessary. Otherwise, manually perform gcloud sql instances failover  ."
    ],
    "correct": 2,
    "explanation": "Check replication lag/status on the region-2 replica, then promote it — no restore needed and minimal data loss.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C. No need for restores if you have a read replica which you can promote to be the new primary. Eliminate A and B. Failovers do not happen automatically to read replicas. You have to promote them. Eliminate D. That leaves C which is supported by Google's documentation. https://cloud.google.com/sql/docs/postgres/replication/cross-region-replicas#disaster_recovery (9 votes)"
      },
      {
        "user": "absero1609",
        "text": "Selected Answer: C. agree with dynamic_dba. Read his reference link (3 votes)"
      },
      {
        "user": "ArtistS",
        "text": "Agree with dynamic_dba too, thanks for the perfect document (2 votes)"
      },
      {
        "user": "nmnm22",
        "text": "Selected Answer: C. answer C makes sense, special thanks to dynamic dba (1 vote)"
      },
      {
        "user": "DPonly",
        "text": "Selected Answer: C. C is the only option , (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 121,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C.",
    "conceptSummary": "Regional DR: verify replica lag then promote the cross-region read replica.",
    "correctRationale": "With a read replica already in region 2, the recovery path is checking its lag (e.g., Lag Bytes, pg_last_wal_receive_lsn) and promoting it; restores are unnecessary and failover to replicas is manual.",
    "optionRationales": [
      "Wrong: Restoring from backups loses everything since the last backup and ignores the replica.",
      "Wrong: Same plus region 1 is down anyway.",
      "Correct: Verify replica lag then promote — the documented DR procedure with least data loss.",
      "Wrong: There is no automatic failover to a read replica to check; promotion is required."
    ]
  },
  {
    "id": 120,
    "topic": "Migration",
    "difficulty": 1,
    "question": "Your company wants to migrate its MySQL, PostgreSQL, and Microsoft SQL Server on-premises databases to Google Cloud. You need a solution that provides near-zero downtime, requires no application changes, and supports change data capture (CDC). What should you do?",
    "options": [
      "A. Use the native export and import functionality of the source database.",
      "B. Create a database on Google Cloud, and use database links to perform the migration.",
      "C. Create a database on Google Cloud, and use Dataflow for database migration.",
      "D. Use Database Migration Service."
    ],
    "correct": 3,
    "explanation": "DMS provides CDC-based, near-zero-downtime, no-application-change migrations for MySQL/PostgreSQL/SQL Server to Cloud SQL.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. Vote for D (3 votes)"
      },
      {
        "user": "hoahm00",
        "text": "Selected Answer: D. D is right (2 votes)"
      },
      {
        "user": "pk349",
        "text": "The correct Answer is D: Database Migration Service Simplify migrations to the cloud. Available now for MySQL and PostgreSQL, with SQL Server and Oracle migrations in preview. • Migrate to Cloud SQL and AlloyDB for PostgreSQL from on-premises, Google Cloud, or other clouds • Replicate data continuously for minimal downtime migrations • Serverless and easy to set up (1 vote)"
      },
      {
        "user": "DPonly",
        "text": "Selected Answer: D. Will go by D (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 120,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "Near-zero-downtime CDC migration → Database Migration Service.",
    "correctRationale": "DMS is the purpose-built managed service for homogeneous migrations with continuous CDC — exactly the three requirements.",
    "optionRationales": [
      "Wrong: Native export/import is offline — maximum downtime.",
      "Wrong: Database links are not a Google Cloud managed migration path.",
      "Wrong: Dataflow is a data pipeline tool, not the managed DB migration path.",
      "Correct: DMS covers all three engine families with CDC and minimal downtime."
    ]
  },
  {
    "id": 119,
    "topic": "Replication & Read Replicas",
    "difficulty": 3,
    "question": "You are the DBA of an online tutoring application that runs on a Cloud SQL for PostgreSQL database. You are testing the implementation of the cross-regional failover configuration. The database in region R1 fails over successfully to region R2, and the database becomes available for the application to process data. During testing, certain scenarios of the application work as expected in region R2, but a few scenarios fail with database errors. The application-related database queries, when executed in isolation from Cloud SQL for PostgreSQL in region R2, work as expected. The application performs completely as expected when the database fails back to region R1. You need to identify the cause of the database errors in region R2. What should you do?",
    "options": [
      "A. Determine whether the versions of Cloud SQL for PostgreSQL in regions R1 and R2 are different.",
      "B. Determine whether the database patches of Cloud SQI for PostgreSQL in regions R1 and R2 are different.",
      "C. Determine whether the failover of Cloud SQL for PostgreSQL from region R1 to region R2 is in progress or has completed successfully.",
      "D. Determine whether Cloud SQL for PostgreSQL in region R2 is a near-real-time copy of region R1 but not an exact copy."
    ],
    "correct": 3,
    "explanation": "The promoted R2 replica may have been behind the R1 primary — a near-real-time but not exact copy — so data-dependent scenarios fail while isolated queries still run.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. Verify that the replica has processed all the transactions it has received from the primary. This ensures that when promoted, the replica reflects all transactions that were received before the primary became unavailable. https://cloud.google.com/sql/docs/postgres/replication/cross-region-replicas#verify_failover_criteria (8 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. Since this is Cloud SQL, the versions and patch levels should be the same since it’s managed by Google. That eliminates A and B. The instance in region 2 must have been a read replica which was promoted to being the primary instance. You cannot access the new primary until Google completes the failover, so C doesn’t make sense. That leaves D. Basically, the data is slightly out of sync. (5 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: C. If it was a DATA gap of data between the databases; The SQLs will not return \"database-errors\" just different data sets. Therefore I'm not going for D. Yet if the failover is ongoing/in-progress/hanging or not completed - than some stuff will work and other not. And we will get \"database-errors\" I'm going for C (A, B - versions should be managed by GCP) (3 votes)"
      },
      {
        "user": "LunarLander",
        "text": "Selected Answer: B. C and D are so wrong on so many levels: \"the failover completed successfully\" means that all transactions in flight were committed to the standby and it was brought up to be primary, while the original primary now is offline. This is black and white - any uncommitted transactions on the primary stay uncommitted, so this cannot be a matter of sync. That leaves A or B and the versions of an HA pair MUST match but patches do not have to, so it's B. (2 votes)"
      },
      {
        "user": "DPonly",
        "text": "Selected Answer: C. will go by C (2 votes)"
      },
      {
        "user": "pico",
        "text": "Selected Answer: B. B Determine whether the database patches of Cloud SQL for PostgreSQL in regions R1 and R2 are different. This is important because differences in database patches could lead to inconsistencies in behavior between the two regions. Ensuring that the database patches are consistent between the two regions is essential for stable and expected behavior. D does not makes sense because the question specify that when executed in isolation from Cloud SQL for PostgreSQL in region R2, work as expected. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 119,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Community favors D: check whether the promoted replica was fully caught up (not an exact copy); versions are managed so A/B are out.",
    "conceptSummary": "Diagnose post-failover errors: replica may have been replication-lagged (not an exact copy).",
    "correctRationale": "Managed Cloud SQL keeps versions/patches identical across regions (eliminating A and B), and the failover already completed (app serves data). Cross-region replication is asynchronous, so at promotion the replica can lag — missing the last transactions and breaking data-dependent scenarios, even though queries execute fine in isolation.",
    "optionRationales": [
      "Wrong: Cloud SQL versions are managed and identical across regions.",
      "Wrong: Same — patches are managed identically.",
      "Wrong: The failover already completed; the instance serves data.",
      "Correct: Async replication lag means R2 may not be an exact copy — the cause of the data errors."
    ]
  },
  {
    "id": 118,
    "topic": "Replication & Read Replicas",
    "difficulty": 1,
    "question": "You are managing two different applications: Order Management and Sales Reporting. Both applications interact with the same Cloud SQL for MySQL database. The Order Management application reads and writes to the database 24/7, but the Sales Reporting application is read-only. Both applications need the latest data. You need to ensure that the Performance of the Order Management application is not affected by the Sales Reporting application. What should you do?",
    "options": [
      "A. Create a read replica for the Sales Reporting application.",
      "B. Create two separate databases in the instance, and perform dual writes from the Order Management application.",
      "C. Use a Cloud SQL federated query for the Sales Reporting application.",
      "D. Queue up all the requested reports in PubSub, and execute the reports at night."
    ],
    "correct": 0,
    "explanation": "A read replica offloads the read-only Sales Reporting workload so Order Management's write performance is unaffected.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. Read replica is more than enough (7 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. B could be done, but would need some application work to make it happen. Eliminate B. Federated queries are queries sent from BigQuery to Cloud SQL or Cloud Spanner with the results returned to BigQuery as a temporary table. So C is wrong. Even if D made sense, running all the reports at night would still impact the Order Management application since it accesses the database 24x7. That leaves A which is the classic solution to offload reads from the primary instance. (5 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Create a read replica for the ***** Sales Reporting application. (3 votes)"
      },
      {
        "user": "Zek",
        "text": "A Create a Read Replica to serve the Sales Reporting application while the Order Management continues to write to the Primary instance (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 118,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A.",
    "conceptSummary": "Isolate read-only reporting on a Cloud SQL read replica.",
    "correctRationale": "The read-only app goes to a read replica that continuously mirrors the primary — latest data available, zero contention with the writer.",
    "optionRationales": [
      "Correct: Read replica serves current data without touching primary performance.",
      "Wrong: Dual writes add app complexity and contention.",
      "Wrong: Federated queries are a BigQuery feature direction, not an app-facing solution here.",
      "Wrong: Reports need latest data — nightly batches break that."
    ]
  },
  {
    "id": 117,
    "topic": "Connectivity & Networking",
    "difficulty": 1,
    "question": "You are configuring the networking of a Cloud SQL instance. The only application that connects to this database resides on a Compute Engine VM in the same project as the Cloud SQL instance. The VM and the Cloud SQL instance both use the same VPC network, and both have an external (public) IP address and an internal (private) IP address. You want to improve network security. What should you do?",
    "options": [
      "A. Disable and remove the internal IP address assignment.",
      "B. Disable both the external IP address and the internal IP address, and instead rely on Private Google Access.",
      "C. Specify an authorized network with the CIDR range of the VM.",
      "D. Disable and remove the external IP address assignment."
    ],
    "correct": 3,
    "explanation": "Removing the external IP leaves the Cloud SQL reachable only over the private IP inside the shared VPC — the security improvement.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. B is not applicable here because Private Google Access requires internal IP address. (4 votes)"
      },
      {
        "user": "learnazureportal",
        "text": "The correct answer is C. Specify an authorized network with the CIDR range of the VM. (3 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. It is always more secure to use an internal IP, so removing them doesn’t make sense. Eliminate A. You can use Private Google Access when VM instances only have internal IP addresses, so disabling the internal IPs and use Private Google Access doesn’t make sense. Eliminate B. Specifying an authorized network when they’re on the same subnet doesn’t make sense. Eliminate C. A way to improve network security would be to disable external IPs since they’re not needed. (2 votes)"
      },
      {
        "user": "SandyZA",
        "text": "D as both are in VPC they can communicate internally. Private Google Access enabled allows VM instances which only have internal IP addresses (no external IP addresses) to reach the external IP addresses of Google APIs and services (2 votes)"
      },
      {
        "user": "pk349",
        "text": "B: Disable both the external IP address and the internal IP address, and instead rely on *** Private Google Access. (1 vote)"
      },
      {
        "user": "ArtistS",
        "text": "They are already in the same VPC, why do you want to create another authorized network???? (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 117,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "Harden Cloud SQL networking by removing the external IP.",
    "correctRationale": "The VM shares the VPC, so internal connectivity suffices; disabling the external IP removes the public attack surface while keeping connectivity.",
    "optionRationales": [
      "Wrong: Removing the internal IP would sever private connectivity.",
      "Wrong: Private Google Access is for reaching Google APIs from private-IP-only VMs, not this path.",
      "Wrong: An authorized network still leaves the public IP exposed — weaker than removing it.",
      "Correct: Internal-only addressing removes the public surface entirely."
    ]
  },
  {
    "id": 116,
    "topic": "Security & IAM",
    "difficulty": 2,
    "question": "Your organization is currently updating an existing corporate application that is running in another public cloud to access managed database services in Google Cloud. The application will remain in the other public cloud while the database is migrated to Google Cloud. You want to follow Google-recommended practices for authentication. You need to minimize user disruption during the migration. What should you do?",
    "options": [
      "A. Use workload identity federation to impersonate a service account.",
      "B. Ask existing users to set their Google password to match their corporate password.",
      "C. Migrate the application to Google Cloud, and use Identity and Access Management (IAM).",
      "D. Use Google Workspace Password Sync to replicate passwords into Google Cloud."
    ],
    "correct": 0,
    "explanation": "Workload identity federation lets the external-cloud app impersonate a service account — Google-recommended auth with no user/password changes.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. Updating passwords represents user disruption. Eliminate B. Eliminate C for the same reason. D doesn’t make sense, leaves A. From Google’s documentation, “Traditionally, applications running outside Google Cloud can use service account keys to access Google Cloud resources. However, service account keys are powerful credentials, and can present a security risk if they are not managed correctly. With identity federation, you can use Identity and Access Management (IAM) to grant external identities IAM roles, including the ability to impersonate service accounts. This approach eliminates the maintenance and security burden associated with service account keys.” https://cloud.google.com/i… (7 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. With identity federation, you can use Identity and Access Management (IAM) to grant external identities IAM roles, including the ability to impersonate service accounts. This lets you access resources directly, using a short-lived access token, and eliminates the maintenance and security burden associated with service account keys. (4 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Use workload identity ***** federation to impersonate a service account. Use identity federation to access resources from AWS, access resources from Microsoft Azure, access resources from an OIDC provider, or access resources from a SAML 2.0 provider. Learn how to manage workload identity pools using the Google Cloud CLI or the REST API. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 116,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A — federation replaces keys and avoids any user changes.",
    "conceptSummary": "External-cloud workload auth via workload identity federation.",
    "correctRationale": "Workforce/workload identity federation is Google's recommended way for apps on other clouds to access Google Cloud resources without service-account keys or password changes — minimizing user disruption.",
    "optionRationales": [
      "Correct: Federation gives the external app IAM access via service-account impersonation.",
      "Wrong: Forcing password resets is user disruption.",
      "Wrong: Migrating the app is exactly what the question avoids.",
      "Wrong: Password sync is not the recommended pattern for service-to-service auth."
    ]
  },
  {
    "id": 115,
    "topic": "Migration",
    "difficulty": 1,
    "question": "You are choosing a new database backend for an existing application. The current database is running PostgreSQL on an on-premises VM and is managed by a database administrator and operations team. The application data is relational and has light traffic. You want to minimize costs and the migration effort for this application. What should you do?",
    "options": [
      "A. Migrate the existing database to Firestore.",
      "B. Migrate the existing database to Cloud SQL for PostgreSQL.",
      "C. Migrate the existing database to Cloud Spanner.",
      "D. Migrate the existing database to PostgreSQL running on Compute Engine."
    ],
    "correct": 1,
    "explanation": "A like-for-like PostgreSQL move to managed Cloud SQL minimizes migration effort and cost for light traffic.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "B. Firestore is a NoSQL database. Eliminate A. You could migrate to Spanner leveraging the PostgreSQL dialect, but costs need to be minimized so that wouldn’t be the cheapest option. Especially since the load doesn’t justify Spanner. Again, you could migrate like-for-like to a GCE VM, but that defeats minimizing the migration effort. The cheapest and easiest way to migrate would be Database Migration Service to Cloud SQL for PostgreSQL. (6 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. Migrate to CloudSQL (2 votes)"
      },
      {
        "user": "pk349",
        "text": "B: Migrate the existing database to Cloud SQL for PostgreSQL. (1 vote)"
      },
      {
        "user": "ArtistS",
        "text": "I agree with u. The answer is B (1 vote)"
      },
      {
        "user": "dija123",
        "text": "Selected Answer: B. Totally B (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 115,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B.",
    "conceptSummary": "Lowest-effort PostgreSQL move → Cloud SQL for PostgreSQL.",
    "correctRationale": "Same engine to a managed service is the cheapest, lowest-effort migration; Firestore/Spanner require re-architecture and Compute Engine stays self-managed.",
    "optionRationales": [
      "Wrong: Firestore means rewriting the relational model.",
      "Correct: Homogeneous migration to managed Cloud SQL minimizes effort and cost.",
      "Wrong: Spanner's dialect differences and cost exceed this light workload's needs.",
      "Wrong: Self-managed PostgreSQL on GCE keeps the ops burden."
    ]
  },
  {
    "id": 114,
    "topic": "Migration",
    "difficulty": 1,
    "question": "You are running a large, highly transactional application on Oracle Real Application Cluster (RAC) that is multi-tenant and uses shared storage. You need a solution that ensures high-performance throughput and a low-latency connection between applications and databases. The solution must also support existing Oracle features and provide ease of migration to Google Cloud. What should you do?",
    "options": [
      "A. Migrate to Compute Engine.",
      "B. Migrate to Bare Metal Solution for Oracle.",
      "C. Migrate to Google Kubernetes Engine (GKE)",
      "D. Migrate to Google Cloud VMware Engine"
    ],
    "correct": 1,
    "explanation": "Bare Metal Solution for Oracle supports RAC, shared storage and all native Oracle features — the migration target for an Oracle RAC estate.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "B. Oracle is neither licensed nor supported in GCE. The only platform which supports RAC and all existing Oracle features is BMS. (3 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. B for sure (3 votes)"
      },
      {
        "user": "pk349",
        "text": "B: Migrate to Bare Metal Solution ***** for Oracle. (2 votes)"
      },
      {
        "user": "DPonly",
        "text": "Selected Answer: B. BMS for Oracle (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 114,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B.",
    "conceptSummary": "Oracle RAC with shared storage → Bare Metal Solution for Oracle.",
    "correctRationale": "BMS is the only Google Cloud platform certified for Oracle RAC with shared storage and full feature support, with low-latency connectivity to applications.",
    "optionRationales": [
      "Wrong: Oracle RAC is not licensed/supported on Compute Engine.",
      "Correct: BMS runs Oracle RAC natively with shared storage and all features.",
      "Wrong: GKE cannot host shared-storage RAC.",
      "Wrong: GCVE is for VMware estates; it is not the Oracle database target here."
    ]
  },
  {
    "id": 113,
    "topic": "High Availability & DR",
    "difficulty": 2,
    "question": "You are designing a database strategy for a new web application in one region. You need to minimize write latency. What should you do?",
    "options": [
      "A. Use Cloud SQL with cross-region replicas.",
      "B. Use high availability (HA) Cloud SQL with multiple zones.",
      "C. Use zonal Cloud SQL without high availability (HA).",
      "D. Use Cloud Spanner in a regional configuration."
    ],
    "correct": 2,
    "explanation": "A non-HA zonal Cloud SQL instance has the lowest write latency — no synchronous standby replication to a second zone.",
    "discussion": [
      {
        "user": "marpayer",
        "text": "D - spanner ABC it is about Cloud SQL and the options don't offer anything to improve writing latency (12 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: C. Another metric to note is that the latency for regional persistent disk with solid-state drives (SSD) is higher than it would be for a zonal persistent disk with SSD. https://cloud.google.com/sql/docs/mysql/high-availability#ha-performance (11 votes)"
      },
      {
        "user": "badrisrinivas9",
        "text": "Selected Answer: D. Spanner has higher write latency than other options (3 votes)"
      },
      {
        "user": "cachopo",
        "text": "Selected Answer: C. This is the correct answer because utilizing a Zonal Cloud SQL instance without High Availability (HA) eliminates the network overhead associated with synchronous replication. - Mechanism: In a non-HA, single-zone configuration, a write operation is considered complete as soon as it is committed to the local transaction log on the primary instance's disk. - Speed: There is no need to wait for the data to travel across the network to a standby instance in a different zone and be acknowledged there. This results in the absolute lowest possible write latency for Cloud SQL. (2 votes)"
      },
      {
        "user": "krop",
        "text": "Selected Answer: C. To minimize write latency in a single-region web application, Option C (zonal Cloud SQL without HA) is the optimal choice. By avoiding synchronous replication across zones, it ensures write operations are committed with minimal overhead. While this configuration lacks automatic failover, it aligns with the priority of reducing latency for write-heavy workloads. Alternatives like HA Cloud SQL or Cloud Spanner introduce multi-zone synchronization, which inherently increases latency. (2 votes)"
      },
      {
        "user": "DBAgain",
        "text": "Selected Answer: D. A and B add latency. C screams of an anti-pattern to me (no HA). Spanner satisfies the requirement without sacrificing availability, so D. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 113,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Community favors C (zonal non-HA Cloud SQL) over D (regional Spanner) — lowest write latency comes from removing synchronous replication; the trade-off is losing HA.",
    "conceptSummary": "Lowest write latency in one region → zonal Cloud SQL without HA.",
    "correctRationale": "Every extra replica adds synchronous work to writes: HA Cloud SQL waits on the standby commit and Spanner waits on its leader quorum. For pure write-latency in a single region, a standalone zonal Cloud SQL instance is fastest — at the cost of no HA.",
    "optionRationales": [
      "Wrong: Cross-region replicas don't speed writes (they replicate async anyway) and add management.",
      "Wrong: HA synchronous standby adds commit latency to every write.",
      "Correct: A plain zonal Cloud SQL instance has the least work per write → lowest latency.",
      "Wrong: Even regional Spanner replicates writes across zones synchronously, costing latency."
    ]
  },
  {
    "id": 112,
    "topic": "Database Selection",
    "difficulty": 1,
    "question": "You are designing a new gaming application that uses a highly transactional relational database to store player authentication and inventory data in Google Cloud. You want to launch the game in multiple regions. What should you do?",
    "options": [
      "A. Use Cloud Spanner to deploy the database.",
      "B. Use Bigtable with clusters in multiple regions to deploy the database",
      "C. Use BigQuery to deploy the database",
      "D. Use Cloud SQL with a regional read replica to deploy the database."
    ],
    "correct": 0,
    "explanation": "A highly transactional relational database deployed in multiple regions → Cloud Spanner.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. Global, relational -> Spanner (7 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. Bigtable would not be a valid choice. BigQuery lends itself to OLAP not OLTP. Cloud SQL could not scale to multiple regions. It’s Spanner. A. (2 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Use Cloud *** Spanner to deploy the database. Cloud Spanner is a fully managed, mission-critical, relational database service that offers transactional consistency at global scale, automatic, synchronous replication for high availability, and support for two SQL dialects: Google Standard SQL (ANSI 2011 with extensions) and PostgreSQL. (1 vote)"
      },
      {
        "user": "887ad17",
        "text": "Selected Answer: A. sql(relational) eliminate B and C, muliregional eliminate D (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 112,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A.",
    "conceptSummary": "Multi-region transactional relational store → Spanner.",
    "correctRationale": "Spanner is the only fully managed relational database with synchronous multi-region deployment and transactional consistency.",
    "optionRationales": [
      "Correct: Spanner is relational, transactional, and multi-region.",
      "Wrong: Bigtable is NoSQL, not relational.",
      "Wrong: BigQuery is analytics, not a transactional backend.",
      "Wrong: Cloud SQL write traffic stays in one region even with regional read replicas."
    ]
  },
  {
    "id": 111,
    "topic": "Database Selection",
    "difficulty": 1,
    "question": "Your team is building an application that stores and analyzes streaming time series financial data. You need a database solution that can perform time series-based scans with sub-second latency. The solution must scale into the hundreds of terabytes and be able to write up to 10k records per second and read up to 200 MB per second. What should you do?",
    "options": [
      "A. Use Firestore.",
      "B. Use Bigtable",
      "C. Use BigQuery.",
      "D. Use Cloud Spanner."
    ],
    "correct": 1,
    "explanation": "Time-series financial data at hundreds of TB, 10k writes/sec, 200 MB/s reads and sub-second latency is the canonical Bigtable profile.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. Financial data, such as transaction histories, stock prices, and currency exchange rates. https://cloud.google.com/bigtable/docs/overview#what-its-good-for With SSD: Reads - up to 10,000 rows per second Writes - up to 10,000 rows per second Scans - up to 220 MB/s https://cloud.google.com/bigtable/docs/performance#typical-workloads (9 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "B. Processing time-series data is a classic use case for Bigtable. Sub-second latency and scaling to 100s of TBs seals the deal. It’s B. (2 votes)"
      },
      {
        "user": "ssaporylo",
        "text": "time series data => Big Table per Google reccomandation (2 votes)"
      },
      {
        "user": "pk349",
        "text": "C: Use BigQuery. About 330 100MB/sec dedicated hard-drives to read 1TB of data. A 330 Gigabit network to shuffle the 1.25 TB of data. 3,300 cores to uncompress 1TB of data and process 100 billion regular expressions at 1 μsec per. μsec: A microsecond is a unit of time in the International System of Units equal to one millionth of a second. Its symbol is μs, sometimes simplified to us when Unicode is not available. A microsecond is equal to 1000 nanoseconds or 1⁄1000 of a millisecond. (1 vote)"
      },
      {
        "user": "dija123",
        "text": "Selected Answer: B. Totally agree with B (1 vote)"
      },
      {
        "user": "887ad17",
        "text": "Selected Answer: B. I choose nosql B (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 111,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B — the official 'what Bigtable is good for' doc cites exactly this case.",
    "conceptSummary": "Time-series scans at scale → Bigtable.",
    "correctRationale": "Bigtable is documented for time-series financial data; its row-key scans deliver sub-second latency at exactly these throughput numbers, and it scales to hundreds of terabytes by adding nodes.",
    "optionRationales": [
      "Wrong: Firestore is a document store not built for this throughput/scale profile.",
      "Correct: Bigtable is purpose-built for high-throughput time-series scans at this scale and latency.",
      "Wrong: BigQuery is analytics/OLAP — not sub-second serving reads/writes.",
      "Wrong: Spanner is relational OLTP — wrong shape for append-heavy time-series scans."
    ]
  },
  {
    "id": 110,
    "topic": "Security & IAM",
    "difficulty": 1,
    "question": "Your organization works with sensitive data that requires you to manage your own encryption keys. You are working on a project that stores that data in a Cloud SQL database. You need to ensure that stored data is encrypted with your keys. What should you do?",
    "options": [
      "A. Export data periodically to a Cloud Storage bucket protected by Customer-Supplied Encryption Keys.",
      "B. Use Cloud SQL Auth proxy.",
      "C. Connect to Cloud SQL using a connection that has SSL encryption.",
      "D. Use customer-managed encryption keys with Cloud SQL."
    ],
    "correct": 3,
    "explanation": "Cloud SQL supports customer-managed encryption keys (CMEK) so stored data is encrypted with keys you control.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "D. By stored data, we assume it means stored in the database so there’s no point in exporting it to encrypt it. A is wrong. Cloud SQL Auth Proxy is about secure connections to Cloud SQL, not encrypted data. B is wrong and so is C for the same reason. That leaves D. Just use CMEK when you create the instance. (3 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. Standard CMEK quiestion, D (3 votes)"
      },
      {
        "user": "pk349",
        "text": "D: Use customer-managed encryption keys *** with Cloud SQL. How do I encrypt a SQL database? Enable Transparent Data Encryption (TDE) Create a master key. Create or obtain a certificate protected by the master key. Create a database encryption key and protect it by using the certificate. Set the database to use encryption. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 110,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "Encrypt Cloud SQL data at rest with CMEK.",
    "correctRationale": "To have stored data encrypted with your own keys, enable CMEK on the Cloud SQL instance; CSEK is not offered for Cloud SQL data at rest, and SSL/Auth proxy cover transit only.",
    "optionRationales": [
      "Wrong: Exporting to a CSEK bucket encrypts exports, not the data at rest in the database.",
      "Wrong: The Auth proxy secures the connection, not stored data.",
      "Wrong: SSL encrypts in transit, not at rest, and uses Google-managed cert material.",
      "Correct: CMEK on the instance encrypts stored data with customer-managed keys."
    ]
  },
  {
    "id": 109,
    "topic": "Replication & Read Replicas",
    "difficulty": 2,
    "question": "You have an application that sends banking events to Bigtable cluster-a in us-east. You decide to add cluster-b in us-central1. Cluster-a replicates data to cluster-b. You need to ensure that Bigtable continues to accept read and write requests if one of the clusters becomes unavailable and that requests are routed automatically to the other cluster. What deployment strategy should you use?",
    "options": [
      "A. Use the default app profile with single-cluster routing.",
      "B. Use the default app profile with multi-cluster routing.",
      "C. Create a custom app profile with multi-cluster routing.",
      "D. Create a custom app profile with single-cluster routing."
    ],
    "correct": 2,
    "explanation": "Adding a second cluster leaves the default app profile on single-cluster routing (set when the instance had one cluster); a custom app profile with multi-cluster routing gives automatic failover routing.",
    "discussion": [
      {
        "user": "marpayer",
        "text": "C - Even the default profile can be single-cluster or multi-cluster \"The settings in an instance's default app profile depend on the number of clusters the instance had when you first created it: If you created the instance with 1 cluster, the default app profile uses single-cluster routing, and it enables single-row transactions. This ensures that adding additional clusters later doesn't change the behavior of your existing applications.\" (10 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. To ensure you still get connected when a Bigtable instance has 2 or more clusters, you must use multi-cluster routing. The question states that a single cluster existed first, then a second cluster was added. Google’s documentation states, “if you created the instance with one cluster, the default app profile uses single-cluster routing. This ensures that adding additional clusters later does not change the behavior of your existing applications”. Simply adding a second cluster does not change the default profile from single-cluster routing to multi-cluster routing. Since you need multi-cluster routing, you’re going to need a custom app profile. So C is correct. https://cloud.google.co… (8 votes)"
      },
      {
        "user": "leroygordo",
        "text": "Selected Answer: C. Check the documentation: The default app profile does not change when you add or remove clusters. You must manually update the default app profile to change its settings. However, as a best practice you should create and use a new app profile instead of changing the default app profile. https://cloud.google.com/bigtable/docs/app-profiles#how-they-work Best practice must be the C, a custom app profile. (3 votes)"
      },
      {
        "user": "SVGoogle89",
        "text": "C If you created the instance with 1 cluster, the default app profile uses single-cluster routing, and it enables single-row transactions. This ensures that adding additional clusters later doesn't change the behavior of your existing applications. (3 votes)"
      },
      {
        "user": "SVGoogle89",
        "text": "C https://cloud.google.com/bigtable/docs/app-profiles#:~:text=Multi%2Dcluster%20routing%20automatically%20routes,they%20are%20in%20different%20zones. (3 votes)"
      },
      {
        "user": "njda",
        "text": "Per the link default profile can be updated for multi cloud routing. So answer should be B https://cloud.google.com/bigtable/docs/replication-settings#high-availability:~:text=To%20configure%20your%20instance%20for%20a%20high%20availability%20(HA)%20use%20case%2C%20create%20a%20new%20app%20profile%20that%20uses%20multi%2Dcluster%20routing%2C%20or%20update%20the%20default%20app%20profile%20to%20use%20multi%2Dcluster%20routing. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 109,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — the default profile's routing is frozen at creation, so a custom multi-cluster profile is required.",
    "conceptSummary": "Bigtable cluster failover via custom multi-cluster routing app profile.",
    "correctRationale": "The default app profile keeps the routing mode it had at creation — since cluster-a was the only cluster then, the default is single-cluster. Creating a custom app profile with multi-cluster routing lets Bigtable route reads/writes to whichever cluster is healthy.",
    "optionRationales": [
      "Wrong: The default profile is stuck on single-cluster routing — traffic dies with cluster-a.",
      "Wrong: You cannot change the default profile's routing mode implicitly by adding a cluster; it stays single-cluster.",
      "Correct: A custom multi-cluster app profile routes automatically to the surviving cluster.",
      "Wrong: Single-cluster routing sends everything to one cluster — no failover."
    ]
  },
  {
    "id": 108,
    "topic": "Migration",
    "difficulty": 2,
    "question": "You want to migrate your on-premises PostgreSQL database to Compute Engine. You need to migrate this database with the minimum downtime possible. What should you do?",
    "options": [
      "A. Perform a full backup of your on-premises PostgreSQL, and then, in the migration window, perform an incremental backup.",
      "B. Create a read replica on Cloud SQL, and then promote it to a read/write standalone instance.",
      "C. Use Database Migration Service to migrate your database.",
      "D. Create a hot standby on Compute Engine, and use PgBouncer to switch over the connections."
    ],
    "correct": 3,
    "explanation": "A hot standby on Compute Engine replicating the on-prem PostgreSQL, cut over via PgBouncer, gives near-zero downtime — DMS does not target Compute Engine.",
    "discussion": [
      {
        "user": "Atnafu",
        "text": "D PgBouncer maintains a pool for connections for each database and user combination. PgBouncer either creates a new database connection for a client or reuses an existing connection for the same user and database. + PgBouncer is a simple PostgreSQL connection pool that allows for several thousand connections at a time. Using Kubernetes Engine to run a Helm Chart w/ PgBouncer based on the great article from futuretech-industries, we were able to set up an easily deployable system to get the most out of our CloudSQL DBs without breaking the bank. https://medium.com/google-cloud/increasing-cloud-sql-postgresql-max-connections-w-pgbouncer-kubernetes-engine-49b0b2894820#:~:text=That%20is%20whe… (4 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. B - we're not talking CloudSQL here C - you can only migrate PostgreSQL to CloudSQL for PostgreSQL or AlloyDB for PostgreSQL A is kinda fine, but D is better (4 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. A does not represent the minimum downtime. Read replicas in Cloud SQL depend upon a primary instance also in Cloud SQL. We’re talking about migrating to GCE, so B is wrong. The Database Migration Service migrates PostgreSQL to Cloud SQL or AlloyDB for PostgreSQL (Preview as of 3/16/23 which means it won’t be on the exam - yet). That makes C wrong. That leaves D. Pgbouncer is a connection pooler used to minimize application downtime. https://cloud.google.com/architecture/migrating-postgresql-to-gcp (3 votes)"
      },
      {
        "user": "pk349",
        "text": "D: Create a hot standby on ***** Compute Engine, and use PgBouncer to switch over the connections. To perform the migration, you shut down the current master and then promote the subordinate Google Cloud replica to master. PgBouncer reroutes traffic to the new master node on Google Cloud. (2 votes)"
      },
      {
        "user": "887ad17",
        "text": "Selected Answer: D. D: create binary replication and promote (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 108,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for D — DMS can't target Compute Engine, so hot standby + PgBouncer is the low-downtime route.",
    "conceptSummary": "Minimal-downtime on-prem→GCE PostgreSQL migration via hot standby + PgBouncer cutover.",
    "correctRationale": "Since the target is Compute Engine (self-managed), the low-downtime approach is a hot standby with streaming replication and a fast PgBouncer connection switchover at cutover.",
    "optionRationales": [
      "Wrong: Full+incremental backups still leave the app down for backup+restore of the delta.",
      "Wrong: The destination is Compute Engine, not Cloud SQL; a Cloud SQL replica doesn't deliver there.",
      "Wrong: DMS does not migrate to Compute Engine targets.",
      "Correct: Hot standby + PgBouncer switchover minimizes downtime onto GCE."
    ]
  },
  {
    "id": 107,
    "topic": "Operations & Maintenance",
    "difficulty": 1,
    "question": "Your organization is running a critical production database on a virtual machine (VM) on Compute Engine. The VM has an ext4-formatted persistent disk for data files. The database will soon run out of storage space. You need to implement a solution that avoids downtime. What should you do?",
    "options": [
      "A. In the Google Cloud Console, increase the size of the persistent disk, and use the resize2fs command to extend the disk.",
      "B. In the Google Cloud Console, increase the size of the persistent disk, and use the fdisk command to verify that the new space is ready to use",
      "C. In the Google Cloud Console, create a snapshot of the persistent disk, restore the snapshot to a new larger disk, unmount the old disk, mount the new disk, and restart the database service.",
      "D. In the Google Cloud Console, create a new persistent disk attached to the VM, and configure the database service to move the files to the new disk."
    ],
    "correct": 0,
    "explanation": "Resize the persistent disk in the console, then extend the ext4 filesystem online with resize2fs — no downtime.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. If you are using ext4, use the resize2fs command to extend the file system https://cloud.google.com/compute/docs/disks/resize-persistent-disk#resize_partitions (7 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. Using fdisk by itself won’t achieve anything. A is wrong. Snapshotting a disk with database instances in flight is a potential problem. C is wrong. D, with some tweaking could move things to a larger disk, but there would be downtime. D is therefore wrong. There are several steps to achieving this task and they start with A. The link provided by chelbsik is spot on. (2 votes)"
      },
      {
        "user": "PKookNN",
        "text": "Selected Answer: A. A, this is almost the same question as the one on PCA too (1 vote)"
      },
      {
        "user": "DPonly",
        "text": "Selected Answer: A. Key words , Critical application , Avoid downtime (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 107,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A per the disk-resize doc.",
    "conceptSummary": "Grow an ext4 persistent disk online via console resize + resize2fs.",
    "correctRationale": "Persistent disks can be grown live in the console; for ext4 the documented next step is resize2fs inside the guest to extend the filesystem — zero downtime.",
    "optionRationales": [
      "Correct: Console resize + resize2fs is the documented no-downtime procedure.",
      "Wrong: fdisk only verifies; it does not grow the filesystem.",
      "Wrong: Snapshot-restore involves unmounting and a service restart — downtime.",
      "Wrong: Migrating data files to a new disk requires service interruption."
    ]
  },
  {
    "id": 106,
    "topic": "Capacity Planning & Cost",
    "difficulty": 1,
    "question": "Your organization has hundreds of Cloud SQL for MySQL instances. You want to follow Google-recommended practices to optimize platform costs. What should you do?",
    "options": [
      "A. Use Query Insights to identify idle instances.",
      "B. Remove inactive user accounts.",
      "C. Run the Recommender API to identify overprovisioned instances.",
      "D. Build indexes on heavily accessed tables."
    ],
    "correct": 2,
    "explanation": "The Cloud SQL overprovisioned-instance recommender (Recommender API) finds oversized instances to resize for cost savings.",
    "discussion": [
      {
        "user": "Atnafu",
        "text": "C The Cloud SQL overprovisioned instance recommender helps you detect instances that are unnecessarily large for a given workload. It then provides recommendations on how to resize such instances and reduce cost. This page describes how this recommender works and how to use it. https://cloud.google.com/sql/docs/mysql/recommender-sql-overprovisioned#:~:text=The%20Cloud%20SQL%20overprovisioned%20instance%20recommender%20helps%20you%20detect%20instances%20that%20are%20unnecessarily%20large%20for%20a%20given%20workload.%20It%20then%20provides%20recommendations%20on%20how%20to%20resize%20such%20instances%20and%20reduce%20cost.%20This%20page%20describes%20how%20this%20recommender%20works%20and%… (4 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: C. https://cloud.google.com/sql/docs/mysql/recommender-sql-overprovisioned (4 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. This is a cost question, so eliminate anything that doesn’t address cost. Eliminate A, B and C. The right answer is to use Recommender. https://cloud.google.com/recommender/docs/overview (3 votes)"
      },
      {
        "user": "pk349",
        "text": "C: Run the Recommender *** API to identify overprovisioned instances. The Cloud SQL idle instance recommender helps you detect instances that might be idle and provides you insights and recommendations to help you reduce costs . The Cloud SQL overprovisioned instance recommender helps you detect instances that are unnecessarily large for a given workload. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 106,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C.",
    "conceptSummary": "Cut Cloud SQL spend via the overprovisioned-instance recommender.",
    "correctRationale": "Google's recommender flags overprovisioned Cloud SQL instances and suggests right-sizing — the documented cost-optimization practice at fleet scale.",
    "optionRationales": [
      "Wrong: Query Insights analyzes queries, not instance utilization for cost.",
      "Wrong: Removing accounts is security hygiene, not a platform-cost lever.",
      "Correct: The Recommender API's overprovisioned-instance insights are the documented cost tool.",
      "Wrong: Indexing is performance tuning, not cost optimization."
    ]
  },
  {
    "id": 105,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "Your company is developing a global ecommerce website on Google Cloud. Your development team is working on a shopping cart service that is durable and elastically scalable with live traffic. Business disruptions from unplanned downtime are expected to be less than 5 minutes per month. In addition, the application needs to have very low latency writes. You need a data storage solution that has high write throughput and provides 99.99% uptime. What should you do?",
    "options": [
      "A. Use Cloud SQL for data storage.",
      "B. Use Cloud Spanner for data storage.",
      "C. Use Memorystore for data storage.",
      "D. Use Bigtable for data storage."
    ],
    "correct": 1,
    "explanation": "Global scale, durability, elastic scaling, <5min/month downtime (99.99%), and low-latency writes → multi-region Cloud Spanner.",
    "discussion": [
      {
        "user": "zanhsieh",
        "text": "Selected Answer: B. B Note that what BT differ with Spanner is BT can't do very high throughput (insert single row one-by-one) and low latency at the same time. The official document suggested we should do that in batch; that's a rare case in the shopping cart and no customer will like to wait till other customers finishing their transaction so BT could handle together. Plus, it's hard for BT handling join, e.g. complex upsale, different type of products, etc. Uptime 99.9% => BT, Spanner Low latency write => BT, Spanner High throughput low latency => Spanner ECommerce & Shopping cart => SQL => Spanner https://cloud.google.com/bigtable/docs/writes (4 votes)"
      },
      {
        "user": "LunarLander",
        "text": "Selected Answer: D. Bigtable is elastically scalable and has vastly lower latency than Spanner and also is routinely used for shopping cart functions. Spanner is nearly a magnitude slower in this write-heavy context. I disagree that B is the correct answer. (3 votes)"
      },
      {
        "user": "DPonly",
        "text": "Selected Answer: B. Spanner because \"Global\" eliminates others (3 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. Scalable, =>99,99, low write latency -> Spanner (3 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "B. Global eliminates Cloud SQL (A). Memorystore is a cache not a data storage solution. Eliminate C. Spanner has multi-region but doesn’t autoscale (unless you use Autoscaler). Bigtable instances can be in different regions and does autoscale. Both Bigtable and Spanner can handle the writes and uptime. The word “durable” and no mention of huge quantities of data suggests the best answer is B, Cloud Spanner. (2 votes)"
      },
      {
        "user": "atnafuadd",
        "text": "Selected Answer: B. Option B: Cloud Spanner ✅ 99.999% availability for multi-region configurations (exceeds 99.99% requirement) ✅ Global distribution with automatic scaling ✅ High write throughput with horizontal scaling ✅ Low latency writes with global replication ✅ Durable and consistent - ACID transactions globally ✅ Elastic scaling - automatically handles traffic spikes Not D Option D: Bigtable ✅ High write throughput and low latency ✅ Elastic scaling ❌ NoSQL - less suitable for ecommerce transactions requiring ACID properties ❌ Eventually consistent - not ideal for shopping cart operations ❌ Complex application logic needed for ecommerce use cases (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 105,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for B — global + durable + low-latency writes rules out the other stores.",
    "conceptSummary": "Global elastic shopping-cart store → Cloud Spanner.",
    "correctRationale": "Spanner multi-region delivers global scale, strong durability, low-latency writes worldwide and ≥99.99% uptime; Bigtable lacks the transactional/durable consistency story for a cart, Cloud SQL is regional, and Memorystore is ephemeral.",
    "optionRationales": [
      "Wrong: Cloud SQL cannot scale elastically across the globe or write multi-region.",
      "Correct: Spanner covers global scale, durability, uptime and write latency together.",
      "Wrong: A cache is not durable cart storage.",
      "Wrong: Bigtable is fast but not the transactional, globally consistent durable store a cart needs."
    ]
  },
  {
    "id": 104,
    "topic": "Migration",
    "difficulty": 2,
    "question": "Your organization needs to migrate a critical, on-premises MySQL database to Cloud SQL for MySQL. The on-premises database is on a version of MySQL that is supported by Cloud SQL and uses the InnoDB storage engine. You need to migrate the database while preserving transactions and minimizing downtime. What should you do?",
    "options": [
      "A. Step 1: Use Database Migration Service to connect to your on-premises database, and choose continuous replication.\nStep 2: After the on-premises database is migrated, promote the Cloud SQL for MySQL instance, and connect applications to your Cloud SQL instance.",
      "B. Step 1: Build a Cloud Data Fusion pipeline for each table to migrate data from the on-premises MySQL database to Cloud SQL for MySQL.\nStep 2: Schedule downtime to run each Cloud Data Fusion pipeline.\nStep 3: Verify that the migration was successful.\nStep 4: Re-point the applications to the Cloud SQL for MySQL instance.",
      "C. Step 1: Pause the on-premises applications.\nStep 2: Use the mysqldump utility to dump the database content in compressed format.\nStep 3: Run gsutil –m to move the dump file to Cloud Storage.\nStep 4: Use the Cloud SQL for MySQL import option.\nStep 5: After the import operation is complete, re-point the applications to the Cloud SQL for MySQL instance.",
      "D. 1 Pause the on-premises applications.\n2. Use the mysqldump utility to dump the database content in CSV format.\n3. Run gsutil –m to move the dump file to Cloud Storage.\n4. Use the Cloud SQL for MySQL import option.\n5. After the import operation is complete, re-point the applications to the Cloud SQL for MySQL instance."
    ],
    "correct": 0,
    "explanation": "A continuous-replication DMS job migrates the database while transactions keep flowing, then promoting the Cloud SQL instance finishes the cutover with minimal downtime.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. A looks like the best option to me (3 votes)"
      },
      {
        "user": "orbo",
        "text": "Selected Answer: A. To migrate the database while preserving transactions and minimizing downtime, you should use Database Migration Service. This service will allow you to migrate the database in a way that is transparent to your users and applications. It will also allow you to test the migration before you make it live, so that you can be sure that everything will work as expected. (2 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. Preserve transactions and minimize downtime. That eliminates B, C and D. A is the best answer. (2 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: A. A is the right one for me. (2 votes)"
      },
      {
        "user": "DPonly",
        "text": "Selected Answer: A. Database Migration Service supports one-time and continuous migrations from source databases to Cloud SQL destination databases. (1 vote)"
      },
      {
        "user": "SVGoogle89",
        "text": "A https://cloud.google.com/database-migration/docs/mysql/configure-source-database (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 104,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A.",
    "conceptSummary": "Transaction-preserving MySQL migration via continuous DMS + promotion.",
    "correctRationale": "Preserving transactions and minimizing downtime rules out dump-based and pipeline approaches; continuous DMS keeps the target in sync until cutover, after which the Cloud SQL instance is promoted and apps re-pointed.",
    "optionRationales": [
      "Correct: Continuous DMS + promotion is the only option preserving transactions with minimal downtime.",
      "Wrong: Per-table Data Fusion pipelines with scheduled downtime is complex and not transaction-continuous.",
      "Wrong: mysqldump requires the application paused for the whole dump+import — maximal downtime.",
      "Wrong: Same pause requirement plus CSV loses InnoDB fidelity benefits."
    ]
  },
  {
    "id": 103,
    "topic": "Operations & Maintenance",
    "difficulty": 1,
    "question": "You finished migrating an on-premises MySQL database to Cloud SQL. You want to ensure that the daily export of a table, which was previously a cron job running on the database server, continues. You want the solution to minimize cost and operations overhead. What should you do?",
    "options": [
      "A. Use Cloud Scheduler and Cloud Functions to run the daily export.",
      "B. Create a streaming Datatlow job to export the table.",
      "C. Set up Cloud Composer, and create a task to export the table daily.",
      "D. Run the cron job on a Compute Engine instance to continue the export."
    ],
    "correct": 0,
    "explanation": "Cloud Scheduler + Cloud Function replaces the cron job at minimal cost and zero server management.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. A is Google recommended couple (10 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. Minimize cost and operational overhead eliminates D. Cloud Composer is a workflow orchestration service for managing workflow pipelines that span across clouds and on premises data centers. Eliminate C. Dataflow processes data. Eliminate B. A is the best answer. https://cloud.google.com/blog/topics/developers-practitioners/scheduling-cloud-sql-exports-using-cloud-functions-and-cloud-scheduler (3 votes)"
      },
      {
        "user": "pk349",
        "text": "Please ignore last two submits: A: Use Cloud Scheduler *** and Cloud Functions to run the daily export. (3 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Use Database Migration Service (2 votes)"
      },
      {
        "user": "pk349",
        "text": "AUse Database Migration Service *** to connect to your on-premises database, and choose continuous replication. After the on-premises database is migrated, promote the Cloud SQL for MySQL instance, and connect applications to your Cloud SQL instance. The mysqldump client utility performs logical backups, producing a set of SQL statements that can be executed to reproduce the original database object definitions and table data. It dumps one or more MySQL databases for backup or transfer to another SQL server. The mysqldump command can also generate output in CSV, other delimited text, or XML format. (1 vote)"
      },
      {
        "user": "zanhsieh",
        "text": "Selected Answer: C. C A: Cloud Scheduler and Cloud Functions can't run on the on-premises MySQL database. B: Dataflow is mostly good for real time job. Again, need special tweaking to access the on-premises DB. C: Best answer. Composer deals with various kinds of inputs. Also handle retry / HA for free. D: Run cron job on a GCE instance then we have to maintain GCE instance stability. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 103,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A.",
    "conceptSummary": "Replace a daily export cron with Scheduler + Function.",
    "correctRationale": "The cheapest managed replacement for a daily cron export is a Scheduler-triggered Cloud Function; all other options keep servers or heavyweight orchestration running.",
    "optionRationales": [
      "Correct: Scheduler + Function is serverless, cheap and minimal-overhead for a daily job.",
      "Wrong: Streaming Dataflow is built for continuous pipelines, not a daily export.",
      "Wrong: Composer is heavyweight orchestration for a single task.",
      "Wrong: A GCE cron server restores the overhead you're trying to remove."
    ],
    "legacyNote": "Cloud Functions are now Cloud Run functions; same pattern."
  },
  {
    "id": 102,
    "topic": "Monitoring & Performance",
    "difficulty": 1,
    "question": "Your ecommerce application connecting to your Cloud SQL for SQL Server is expected to have additional traffic due to the holiday weekend. You want to follow Google-recommended practices to set up alerts for CPU and memory metrics so you can be notified by text message at the first sign of potential issues. What should you do?",
    "options": [
      "A. Use a Cloud Function to pull CPU and memory metrics from your Cloud SQL instance and to call a custom service to send alerts.",
      "B. Use Error Reporting to monitor CPU and memory metrics and to configure SMS notification channels.",
      "C. Use Cloud Logging to set up a log sink for CPU and memory metrics and to configure a sink destination to send a message to Pub/Sub.",
      "D. Use Cloud Monitoring to set up an alerting policy for CPU and memory metrics and to configure SMS notification channels."
    ],
    "correct": 3,
    "explanation": "Cloud Monitoring alerting policies on Cloud SQL CPU/memory metrics support SMS notification channels — the standard practice.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "D. No custom service needed. Eliminate A. There are no errors to report, only usage metrics. Eliminate B. Sending a message to Pub/Sub doesn’t notify you by text message. Eliminate C. That leaves D. (5 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. D is correct (5 votes)"
      },
      {
        "user": "pk349",
        "text": "Cloud Monitoring collects metrics, events, and metadata from Google Cloud, Amazon Web Services (AWS), hosted uptime probes, and application instrumentation. Using the BindPlane service, you can also collect this data from over 150 common application components, on-premise systems, and hybrid cloud systems. (1 vote)"
      },
      {
        "user": "pk349",
        "text": "D: Use Cloud Monitoring to set up an alerting policy for CPU and memory metrics and to configure SMS notification channels. (1 vote)"
      },
      {
        "user": "DPonly",
        "text": "Selected Answer: D. This one only talks about SMS (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 102,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "Metric alerting with SMS via Cloud Monitoring.",
    "correctRationale": "Cloud Monitoring is the metrics service: create an alerting policy on Cloud SQL CPU and memory metrics with an SMS channel — purpose-built and recommended.",
    "optionRationales": [
      "Wrong: Custom code and a custom alerting service is unnecessary when Monitoring exists.",
      "Wrong: Error Reporting is for exceptions, not metrics.",
      "Wrong: Pub/Sub sinks are for logs, not metric alerting, and don't send SMS to you.",
      "Correct: Monitoring alerting policy + SMS channel is the documented pattern."
    ]
  },
  {
    "id": 101,
    "topic": "Backup & Recovery",
    "difficulty": 2,
    "question": "You are managing a set of Cloud SQL databases in Google Cloud. Regulations require that database backups reside in the region where the database is created. You want to minimize operational costs and administrative effort. What should you do?",
    "options": [
      "A. Configure the automated backups to use a regional Cloud Storage bucket as a custom location.",
      "B. Use the default configuration for the automated backups location.",
      "C. Disable automated backups, and create an on-demand backup routine to a regional Cloud Storage bucket.",
      "D. Disable automated backups, and configure serverless exports to a regional Cloud Storage bucket."
    ],
    "correct": 0,
    "explanation": "By default backups go to the closest multi-region bucket — for a regional residency mandate, set a custom regional backup location.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. Let's eliminate: B - defaul is multi-regional even if your instance is regional C and D - you don't need to disable automated backups, this will increase administrative efforts All you need to do is to edit your backups and choose to store them in the region that you want instead of multi-regional. A is the answer. (8 votes)"
      },
      {
        "user": "marpayer",
        "text": "A - https://cloud.google.com/sql/docs/mysql/backup-recovery/backups#default-backup-location \"If you do not specify a storage location, your backups are stored in the multiregion that is geographically closest to the location of your Cloud SQL instance.\" (4 votes)"
      },
      {
        "user": "absero1609",
        "text": "Selected Answer: A. A \"\"\" Where backups are stored Backups locations include: Default locations that Cloud SQL selects, based on the location of the original instance. Custom locations that you choose when you do not want to use the default location. \"\"\" https://cloud.google.com/sql/docs/mysql/backup-recovery/backups \"\"\" Set a custom location for backups Only use a custom backup location if required by regulation. If not required, use the default multi-region backup location. You can use a custom location for on-demand and automatic backups. \"\"\" https://cloud.google.com/sql/docs/mysql/backup-recovery/backing-up#locationbackups (2 votes)"
      },
      {
        "user": "sky09",
        "text": "Selected Answer: B. in default two option - Click Multi-region (default) or Region. In the Google Cloud console, go to the Cloud SQL Instances page. Go to Cloud SQL Instances To open the Overview page of an instance, click the instance name. From the SQL navigation menu, select Backups. Next to Settings, click Edit. In the Automated Backups section, expand Advanced Options. Click Multi-region (default) or Region. Select the location from the Location drop-down menu. Click Save. https://cloud.google.com/sql/docs/mysql/backup-recovery/backing-up#locationbackups (2 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. You cannot configure a custom location for automatic backups. A is wrong. The default option for automatic backups is multi-region. B is wrong. The question specifically mentions backups not exports, so eliminate D. That leaves C which involves manual effort, but it does keep the data in the correct region. (2 votes)"
      },
      {
        "user": "pico",
        "text": "Selected Answer: A. A https://cloud.google.com/sql/docs/mysql/backup-recovery/backing-up#locationbackups You can use a custom location for on-demand and automatic backups. For a complete list of valid location values, see the Instance locations. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 101,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A; the default is multi-region, so a custom regional location is required.",
    "conceptSummary": "Regional backup residency via custom automated-backup location.",
    "correctRationale": "The docs state unspecified backup locations default to the geographically closest multi-region — which breaks the in-region regulation. The minimal-effort fix is configuring automated backups with a custom regional location.",
    "optionRationales": [
      "Correct: A custom regional backup location satisfies the residency requirement at no extra admin overhead.",
      "Wrong: The default is the nearest multi-region, not the same region.",
      "Wrong: Disabling automation increases both risk and admin effort.",
      "Wrong: Serverless exports are manual/orchestrated work, not the minimal-effort path."
    ]
  },
  {
    "id": 100,
    "topic": "High Availability & DR",
    "difficulty": 2,
    "question": "During an internal audit, you realized that one of your Cloud SQL for MySQL instances does not have high availability (HA) enabled. You want to follow Google-recommended practices to enable HA on your existing instance. What should you do?",
    "options": [
      "A. Create a new Cloud SQL for MySQL instance, enable HA, and use the export and import option to migrate your data.",
      "B. Create a new Cloud SQL for MySQL instance, enable HA, and use Cloud Data Fusion to migrate your data.",
      "C. Use the gcloud instances patch command to update your existing Cloud SQL for MySQL instance.",
      "D. Shut down your existing Cloud SQL for MySQL instance, and enable HA."
    ],
    "correct": 2,
    "explanation": "You can enable HA on a running Cloud SQL instance by patching it (gcloud sql instances patch --availability-type=REGIONAL) — no rebuild or shutdown needed.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "So I took exam, and command was written correctly in the exam question: `gcloud sql instances patch`, so C is indeed correct here (14 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: C. A and B are obviously wrong, but it's still a bit confusing with the last two: C - `gcloud instances patch` is not complete, it should be `gcloud sql instances patch`, so I would consider it to be wrong, if not the D - you can't edit your instance (i.e. enable HA) when it's shut down, you can only do it when instance is running, and then it will restart. So I'll go for C (8 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. You can add a failover replica to an already created and running Cloud SQL instance. This can be done from the console or by using gcloud. The gcloud command is: gcloud sql instances patch INSTANCE_NAME \\ --availability-type REGIONAL \\ --enable-bin-log \\ --backup-start-time=HH:MM No need to create a new Cloud SQL instance. Eliminate A and B. Adding HA requires you to edit the configuration which you can’t do if the instance is down. So D is wrong. (3 votes)"
      },
      {
        "user": "ssaporylo",
        "text": "you can enbale HA without shutdown https://cloud.google.com/sql/docs/postgres/configure-ha (2 votes)"
      },
      {
        "user": "Hilab",
        "text": "The correct option is C. Use the gcloud instances patch command to update your existing Cloud SQL for MySQL instance. Explanation: Creating a new instance and migrating data can be time-consuming and disruptive to your application's availability. Shutting down the existing instance is not a recommended approach, as it will cause downtime for your application. The recommended approach is to use the gcloud instances patch command to enable high availability on your existing Cloud SQL for MySQL instance. This command updates the instance's configuration to enable the failover replica, configure it, and enable automatic failover. By following this approach, you can ensure minimal downtime, an… (1 vote)"
      },
      {
        "user": "kfiryo",
        "text": "C is correct: https://cloud.google.com/sql/docs/mysql/configure-ha#ha-existing (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 100,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C (the option's command reads 'gcloud instances patch' but clearly intends gcloud sql instances patch, as an exam-taker confirmed).",
    "conceptSummary": "Enable HA on an existing Cloud SQL instance via gcloud sql instances patch.",
    "correctRationale": "The configure-HA documentation shows HA can be added to a live instance by updating its availability type (console or gcloud sql instances patch). No new instance, migration or shutdown is required.",
    "optionRationales": [
      "Wrong: Building a new instance and migrating data is unnecessary — HA can be enabled in place.",
      "Wrong: Data Fusion is a data-integration tool, not needed for HA conversion.",
      "Correct: Patching the existing instance to REGIONAL availability enables HA in place.",
      "Wrong: The instance cannot be edited while shut down — and no shutdown is needed anyway."
    ]
  },
  {
    "id": 99,
    "topic": "High Availability & DR",
    "difficulty": 1,
    "question": "You are configuring a brand new PostgreSQL database instance in Cloud SQL. Your application team wants to have an optimal and highly available environment with automatic failover to avoid any unplanned outage. What should you do?",
    "options": [
      "A. Create one regional Cloud SQL instance with a read replica in another region.",
      "B. Create one regional Cloud SQL instance in one zone with a standby instance in another zone in the same region.",
      "C. Create two read-write Cloud SQL instances in two different zones with a standby instance in another region.",
      "D. Create two read-write Cloud SQL instances in two different regions with a standby instance in another zone."
    ],
    "correct": 1,
    "explanation": "An HA (regional) Cloud SQL instance = primary in one zone + standby in another zone of the same region with automatic failover.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. In HA configuration standby instance can't be in another region (7 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "B. A is not HA. B would be HA. C doesn’t make sense and neither does D. Cloud SQL is a regional service which means the failover replica is in the same region as the primary - hopefully in a different zone. Read replicas can be in different regions, but they’re read replicas not failover replicas. (3 votes)"
      },
      {
        "user": "pico",
        "text": "Selected Answer: A. A From: https://cloud.google.com/sql/docs/mysql/high-availability The HA configuration provides data redundancy. A Cloud SQL instance configured for HA is also called a regional instance and has a primary and secondary zone within the configured region. When we say: regional Cloud SQL that already means that the instance has the configuration made up of a primary instance and a standby instance. If we want to have the maximum availability If a replica is a cross-region replica, you can perform a failover to another region; specifically, you can promote a replica to a standalone instance (1 vote)"
      },
      {
        "user": "Zek",
        "text": "Your explanation support B as the answer. With cross-region replica, you cannot do automatic failover, it has to be manually promoted. Automatic failover is achievable within the region using different zones in same region. (1 vote)"
      },
      {
        "user": "pk349",
        "text": "B: Create one regional Cloud SQL instance in one zone with a standby ***** instance in another zone in the same region. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 99,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B — standby must be same-region for automatic failover.",
    "conceptSummary": "Automatic failover → regional HA instance with standby in another zone.",
    "correctRationale": "Automatic failover requires the HA configuration: a regional instance with primary and standby in different zones of the same region. Cross-region replicas require manual promotion, and two read-write primaries are not an HA topology.",
    "optionRationales": [
      "Wrong: A cross-region read replica cannot fail over automatically.",
      "Correct: Primary + standby in two zones of one region = the HA setup with automatic failover.",
      "Wrong: Two primaries with a cross-region standby is not a supported HA topology.",
      "Wrong: Same invalid multi-primary topology."
    ]
  },
  {
    "id": 98,
    "topic": "Monitoring & Performance",
    "difficulty": 1,
    "question": "You are the database administrator of a Cloud SQL for PostgreSQL instance that has pgaudit disabled. Users are complaining that their queries are taking longer to execute and performance has degraded over the past few months. You need to collect and analyze query performance data to help identity slow-running queries. What should you do?",
    "options": [
      "A. View Cloud SQL operations to view historical query information.",
      "B. White a Logs Explorer query to identify database queries with high execution times.",
      "C. Review application logs to identify database calls.",
      "D. Use the Query Insights dashboard to identify high execution times."
    ],
    "correct": 3,
    "explanation": "Query Insights is the built-in Cloud SQL dashboard for identifying high-execution-time queries without pgaudit.",
    "discussion": [
      {
        "user": "pk349",
        "text": "D: Use the Query Insights *** dashboard to identify high execution times. (10 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: D. D. Use the Query Insights dashboard to identify high execution times. (3 votes)"
      },
      {
        "user": "pk349",
        "text": "A Cloud SQL instance configured for HA is also called a regional instance and has a primary and secondary zone within the configured region. Within a regional instance, the configuration is made up of a primary instance and a standby instance. Through synchronous replication to each zone's persistent disk, all writes made to the primary instance are replicated to disks in both zones before a transaction is reported as committed. In the event of an instance or zone failure, the standby instance becomes the new primary instance. Users are then rerouted to the new primary instance. This process is called a failover. (1 vote)"
      },
      {
        "user": "dija123",
        "text": "Selected Answer: D. Query Insights (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 98,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "Find slow PostgreSQL queries with Query Insights.",
    "correctRationale": "Query Insights surfaces slow and resource-intensive queries with execution times — no pgaudit needed. The other options lack per-query execution timing.",
    "optionRationales": [
      "Wrong: Cloud SQL operations list instance events, not query timings.",
      "Wrong: Logs Explorer only helps if query logging is enabled; pgaudit is off.",
      "Wrong: App logs don't carry per-query database execution times.",
      "Correct: Query Insights is the documented slow-query dashboard."
    ],
    "legacyNote": "'Cloud SQL Insights' is now Query Insights."
  },
  {
    "id": 97,
    "topic": "Database Selection",
    "difficulty": 1,
    "question": "Your team is building a new inventory management application that will require read and write database instances in multiple Google Cloud regions around the globe. Your database solution requires 99.99% availability and global transactional consistency. You need a fully managed backend relational database to store inventory changes. What should you do?",
    "options": [
      "A. Use Bigtable.",
      "B. Use Firestore.",
      "C. Use Cloud SQL for MySQL",
      "D. Use Cloud Spanner."
    ],
    "correct": 3,
    "explanation": "Global multi-region read/write with transactional consistency and ≥99.99% SLA is Cloud Spanner.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. Spanner covers the SLA (99,999), it's global and transactional (5 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. Relational rules out A and B. Global rules out C. That leaves D. (3 votes)"
      },
      {
        "user": "pk349",
        "text": "D: Use Cloud Spanner. SLA 99.999 (2 votes)"
      },
      {
        "user": "Edison_pina",
        "text": "D. Spanner Usa Case: Order & Inventory Management (1 vote)"
      },
      {
        "user": "Edison_pina",
        "text": "Selected Answer: D. Spanner Use Case: Order & Inventory Management (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 97,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "Global transactional relational DB → Cloud Spanner.",
    "correctRationale": "Only Spanner offers multi-region read/write with global transactional consistency and a 99.99–99.999% SLA; Cloud SQL is single-region for writes and the NoSQL options are not relational.",
    "optionRationales": [
      "Wrong: Bigtable is not relational and lacks global transactions.",
      "Wrong: Firestore is document NoSQL, not a relational inventory store.",
      "Wrong: Cloud SQL cannot write in multiple regions.",
      "Correct: Spanner meets relational, global read/write, consistency and SLA requirements together."
    ]
  },
  {
    "id": 96,
    "topic": "Replication & Read Replicas",
    "difficulty": 3,
    "question": "You have a Cloud SQL instance (DB-1) with two cross-region read replicas (DB-2 and DB-3). During a business continuity test, the primary instance (DB-1) was taken offline and a replica (DB-2) was promoted. The test has concluded and you want to return to the pre-test configuration. What should you do?",
    "options": [
      "A. Bring DB-1 back online.",
      "B. Delete DB-1, and re-create DB-1 as a read replica in the same region as DB-1.",
      "C. Delete DB-2 so that DB-1 automatically reverts to the primary instance.",
      "D. Create DB-4 as a read replica in the same region as DB-1, and promote DB-4 to primary."
    ],
    "correct": 3,
    "explanation": "After promoting DB-2, the old replication chain is broken; to restore a primary in the original region you create a new read replica (DB-4) in that region and promote it.",
    "discussion": [
      {
        "user": "BIGQUERY_ALT_ALT",
        "text": "Selected Answer: D. The Option D describes the correct answer (even though it is only half part as it doesn't prevent split brain situations but It is better answer than B, A or C), The issue with answer B is It doesn't return to pretest configuration. Same Goes for A as DB-2 still the primary in this case. Option C is not recommended in case region is not available and still you end up having only Primary (DB-1) available and Not Replica (DB-2) we want pre test config which is both DB-1 and DB-2 available. PLEASE UPVOTE SO OTHERS CAN BENEFIT. (7 votes)"
      },
      {
        "user": "sp57",
        "text": "I disagree with B. Requirement is to return to pre-test config (primary in same region as original db-1). Only D accomplishes. (4 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. https://cloud.google.com/sql/docs/mysql/high-availability#:~:text=After%20a%20failover,Initiating%20failover. (4 votes)"
      },
      {
        "user": "fantax26",
        "text": "As stated in the documentation (https://cloud.google.com/sql/docs/mysql/replication/cross-region-replicas) the cross region read replica promotion is a manual activity and it destroys all the previous replica flow. The pre-test configuration is having a primary instance on region 1 with 2 read replicas on region 2 and 3; the only way to do that is to create a replica of DB2 in region 1 (DB4), promote it as a primary instance and then create DB4 read replicas on region 2 and 3. - Answer D is the only one in that direction - Answer A is wrong because the replica flow between DB1 and DB2 has been destroyed with the promotion - Answer B is partially correct but not enough - Answer C is wrong… (3 votes)"
      },
      {
        "user": "isribalaji",
        "text": "Selected Answer: A. The answer is A. To return to the pre-test configuration, you need to bring DB-1 back online. This will automatically demote DB-2 and make DB-1 the primary instance again. Option B is incorrect because it would re-create DB-1 as a read replica, which is not the pre-test configuration. Option C is incorrect because deleting DB-2 would not automatically revert DB-1 to the primary instance. You would need to manually promote DB-1 to primary. Option D is incorrect because creating DB-4 as a read replica and promoting it to primary would create a new primary instance, but it would not revert DB-1 to its pre-test configuration. (3 votes)"
      },
      {
        "user": "zanhsieh",
        "text": "Selected Answer: C. C A: WRONG. This will have two primary instances, and DB-3 is still the read replica of DB-1. B: WRONG. DB-1 can't be deleted. DB-3 won't automatically recognize DB-2 as its primary. C: CORRECT. D: WRONG. This option implies two ways: 1. DB-1 can't create DB-4 replica on stopping state, DB-3 can't create DB-4 replica, either. 2. Although someone could create DB-4 replica from DB-2 and promote, this won't make DB-3 knows DB-4 as its primary. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 96,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Community majority favors D (new replica + promote) over B (recreate DB-1 as replica). The loaded answer is D: only promotion of a replica in the original region restores the primary where it was.",
    "conceptSummary": "Failback after promoting a Cloud SQL replica: create + promote a replica in the original region.",
    "correctRationale": "Promoting a read replica destroys the old replication relationship — DB-1 does not automatically become primary again. The documented failback is to create a new read replica in the region where you want the primary and promote it, returning to the pre-test topology.",
    "optionRationales": [
      "Wrong: Bringing DB-1 back online does not make it primary again; the promoted replica stays primary.",
      "Wrong: Recreating DB-1 as a replica gives you a replica, not the original primary topology.",
      "Wrong: Deleting DB-2 destroys the current primary and does not resurrect DB-1's role.",
      "Correct: A new replica in DB-1's region promoted to primary restores the pre-test configuration."
    ]
  },
  {
    "id": 95,
    "topic": "Security & IAM",
    "difficulty": 2,
    "question": "You are migrating a telehealth care company's on-premises data center to Google Cloud. The migration plan specifies:\nPostgreSQL databases must be migrated to a multi-region backup configuration with cross-region replicas to allow restore and failover in multiple scenarios.\nMySQL databases handle personally identifiable information (PII) and require data residency compliance at the regional level.\nYou want to set up the environment with minimal administrative effort. What should you do?",
    "options": [
      "A. Set up Cloud Logging and Cloud Monitoring with Cloud Functions to send an alert every time a new database instance is created, and manually validate the region.",
      "B. Set up different organizations for each database type, and apply policy constraints at the organization level.",
      "C. Set up Pub/Sub to ingest data from Cloud Logging, send an alert every time a new database instance is created, and manually validate the region.",
      "D. Set up different projects for PostgreSQL and MySQL databases, and apply organizational policy constraints at a project level."
    ],
    "correct": 3,
    "explanation": "Per-database-type projects with project-level organization policy constraints enforce residency/topology requirements with minimal admin effort.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. A and C don't prevent anything, and between B and D I choose D because there is no sense to maintain a separate org just because of the compliance - a separate project is more than enough. (5 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. A doesn’t make sense. B is complete overkill. C does something manually and is convoluted. That leaves D. Managing policy at the project level is cleaner than having separate Organizations. (4 votes)"
      },
      {
        "user": "Zek",
        "text": "D. No need to setup different organizations, isolating the databases at the project level and applying the constraints will be require less administrative effort than setting different organizations (1 vote)"
      },
      {
        "user": "pk349",
        "text": "B: Set up different organizations for each *** database type, and apply policy constraints at the organization level. (1 vote)"
      },
      {
        "user": "SVGoogle89",
        "text": "one Org with multiple folders and projects under folders (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 95,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D — policies beat manual checks, and projects beat separate organizations.",
    "conceptSummary": "Enforce DB residency rules via projects + org policy at project level.",
    "correctRationale": "Alerting approaches don't prevent misplacement and separate organizations are overkill. Segregating PostgreSQL and MySQL into different projects lets you apply organization policy constraints (region/location restrictions, replica rules) at project level — minimal administrative effort.",
    "optionRationales": [
      "Wrong: Alerts plus manual validation are reactive and laborious, not preventive.",
      "Wrong: Separate organizations per database type is unnecessary overhead; one org with project-level policies suffices.",
      "Wrong: Same manual-alerting problem via Pub/Sub.",
      "Correct: Project separation + project-level org policies enforces the requirements declaratively with least effort."
    ]
  },
  {
    "id": 94,
    "topic": "Backup & Recovery",
    "difficulty": 2,
    "question": "Your company wants to migrate an Oracle-based application to Google Cloud. The application team currently uses Oracle Recovery Manager (RMAN) to back up the database to tape for long-term retention (LTR). You need a cost-effective backup and restore solution that meets a 2-hour recovery time objective (RTO) and a 15-minute recovery point objective (RPO). What should you do?",
    "options": [
      "A. Migrate the Oracle databases to Bare Metal Solution for Oracle, and store backups on tapes on-premises.",
      "B. Migrate the Oracle databases to Bare Metal Solution for Oracle, and use Actifio to store backup files on Cloud Storage using the Nearline Storage class.",
      "C. Migrate the Oracle databases to Bare Metal Solution for Oracle, and back up the Oracle databases to Cloud Storage using the Standard Storage class.",
      "D. Migrate the Oracle databases to Compute Engine, and store backups on tapes on-premises."
    ],
    "correct": 1,
    "explanation": "Migrate Oracle to BMS and use Actifio to store backups on Cloud Storage Nearline — the documented cost-effective RMAN-replacement meeting 2h RTO/15min RPO.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "B. A doesn’t make sense. Oracle is neither licensed nor supported in GCE. Eliminate D. Standard storage is more expensive that Nearline storage. Eliminate C. That leaves B as the most cost effective solution. (5 votes)"
      },
      {
        "user": "pico",
        "text": "Currently, instead of Actifio, the correct name is: Google Cloud Backup and DR for Oracle on Bare Metal Solution (5 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. Vote for B (3 votes)"
      },
      {
        "user": "pk349",
        "text": "B: Migrate the Oracle databases to Bare Metal Solution for Oracle, and use Actifio to store backup files on Cloud Storage using the Nearline Storage class. BMigrate the Oracle databases to Bare Metal Solution for Oracle, and use Actifio to store backup files on Cloud Storage using the Nearline *** Storage class. (2 votes)"
      },
      {
        "user": "Atnafu",
        "text": "B Actifio provides a single platform for backup, recovery, cloning and analytics for Cloud and on-premises VMs & Databases, delivering low RTO, RPO, and costs. Enterprises use Actifio to backup data from data centers and Public cloud platforms onto Google Cloud. (2 votes)"
      },
      {
        "user": "Atnafu",
        "text": "https://www.actifio.com/solutions/cloud/google/ (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 94,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Limited discussion favors B — Actifio to Cloud Storage Nearline is the BMS backup reference design.",
    "conceptSummary": "Oracle backup on BMS: Actifio → Cloud Storage Nearline.",
    "correctRationale": "On Bare Metal Solution, Actifio is the Google-recommended backup path, writing backups to Cloud Storage — Nearline gives cheap long-term retention while Actifio's incremental/dedup capture meets the 15-minute RPO and restores within 2 hours.",
    "optionRationales": [
      "Wrong: Keeping tapes on-prem misses the point of moving to Google Cloud.",
      "Correct: BMS + Actifio to Nearline Cloud Storage is the documented cost-effective design.",
      "Wrong: Standard storage costs more than Nearline for the same retention.",
      "Wrong: Compute Engine does not host Oracle, and tapes are no DR plan."
    ]
  },
  {
    "id": 93,
    "topic": "Monitoring & Performance",
    "difficulty": 2,
    "question": "You are designing for a write-heavy application. During testing, you discover that the write workloads are performant in a regional Cloud Spanner instance but slow down by an order of magnitude in a multi-regional instance. You want to make the write workloads faster in a multi-regional instance. What should you do?",
    "options": [
      "A. Place the bulk of the read and write workloads closer to the default leader region.",
      "B. Use staleness of at least 15 seconds.",
      "C. Add more read-write replicas.",
      "D. Keep the total CPU utilization under 45% in each region."
    ],
    "correct": 0,
    "explanation": "Spanner multi-region best practice: put write-heavy compute near the default leader region to cut commit latency.",
    "discussion": [
      {
        "user": "sp57",
        "text": "Selected Answer: A. https://cloud.google.com/spanner/docs/instance-configurations#multi-region-best-practices Best practices For optimal performance, follow these best practices: Design a schema that prevents hotspots and other performance issues. For optimal write latency, place compute resources for write-heavy workloads within or close to the default leader region. For optimal read performance outside of the default leader region, use staleness of at least 15 seconds. To avoid single-region dependency for your workloads, place critical compute resources in at least two regions. A good option is to place them next to the two different read-write regions so that any single region outage will not impact all… (11 votes)"
      },
      {
        "user": "pk349",
        "text": "D: Keep the total CPU utilization under 45% in each region. For optimal performance, follow these best practices: • Design a schema that prevents hotspots and other performance issues. • Place critical compute resources within the same region as your Spanner instance. • Provision enough compute capacity to keep high priority total CPU utilization ***** under 65%. (3 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. For optimal read (not write) performance outside of the default leader region, use staleness of at least 15 seconds. Eliminate B. CPU capacity is not mentioned as an issue. Eliminate D. When you create a Spanner instance, u can choose to add additional read-only replicas. Once the instance is created, you can change the instance name and add processing units. You can’t add more read-write replicas. Eliminate C. That leaves A. The link provided by sp57 is spot on. (2 votes)"
      },
      {
        "user": "SandyZA",
        "text": "A. For optimal write latency, place compute resources for write-heavy workloads within or close to the default leader region B is applicable to reads C will add load/latency D is only applicable to \"high priority\" tasks (2 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. https://cloud.google.com/spanner/docs/instance-configurations#multi-region-best-practices (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 93,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A per the multi-region best-practices doc.",
    "conceptSummary": "Reduce multi-region Spanner write latency by colocating writes with the leader region.",
    "correctRationale": "Writes must reach the leader's quorum, so the documented best practice is placing write-heavy workloads in or near the default leader region — directly fixing the order-of-magnitude slowdown observed outside the leader region.",
    "optionRationales": [
      "Correct: Proximity to the leader region minimizes write-commit latency.",
      "Wrong: Staleness helps reads, not writes.",
      "Wrong: More read-write replicas enlarge the write quorum, adding latency.",
      "Wrong: CPU headroom matters for capacity but does not fix cross-region commit latency."
    ]
  },
  {
    "id": 92,
    "topic": "Database Selection",
    "difficulty": 3,
    "question": "Your organization has a ticketing system that needs an online marketing analytics and reporting application. You need to select a relational database that can manage hundreds of terabytes of data to support this new application. Which database should you use?",
    "options": [
      "A. Cloud SQL",
      "B. BigQuery",
      "C. Cloud Spanner",
      "D. Bigtable"
    ],
    "correct": 1,
    "explanation": "Hundreds of terabytes of analytics and reporting workloads belong in BigQuery, Google Cloud's petabyte-scale analytics warehouse.",
    "discussion": [
      {
        "user": "SVGoogle89",
        "text": "bigquery - Analytics and reporting (13 votes)"
      },
      {
        "user": "juliorevk",
        "text": "Selected Answer: B. This question is poorly worded. I interpret it as: you have a ticketing system that needs an analytics and reporting app. Which database for this analytics and reporting app (not the ticketing system)? It should be BQ. However, it could also be read as what database for the ticketing system which also happens to need analytics and reporting. Which means the answer should be Spanner. Very confusing, but I'm leaning towards B for BQ based on my first interpretation. (8 votes)"
      },
      {
        "user": "Kapello10",
        "text": "Selected Answer: C. The answer is C Bigquery is not a Database \" You need to select a relational database \" Bigquery is a Datawarehouse (5 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. Cloud SQL could not scale to 100s of TBs. Eliminate A. Neither Big Query nor Bigtable are relational (although BigQuery does support SQL). Eliminate B and D. That leaves C. (4 votes)"
      },
      {
        "user": "SandyZA",
        "text": "B - This is a new application used for analytics, it does not need to take care of the DML required by the ticketing system (4 votes)"
      },
      {
        "user": "pk349",
        "text": "C: Cloud Spanner On the other hand, Google Cloud Spanner supports ***** OLTP along with scalability and high availability. Hence, Cloud Spanner is more suited for E-commerce systems, Core Banking, Gaming, Telecom, etc. It allows updating to existing records and appending data to existing tables. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 92,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Split between B (BigQuery) and C (Spanner). The loaded answer is B: despite the loose 'relational database' wording, an analytics and reporting workload at hundreds of TB is a warehouse use case — BigQuery's explicit purpose.",
    "conceptSummary": "Hundreds of TB analytics/reporting → BigQuery.",
    "correctRationale": "The application is online marketing analytics and reporting over hundreds of terabytes — a warehouse workload. BigQuery stores and queries petabyte-scale data with a relational SQL model; Spanner and Cloud SQL are OLTP databases that do not target this analytical scale, and Bigtable is not relational.",
    "optionRationales": [
      "Wrong: Cloud SQL tops out far below hundreds of TB for analytics.",
      "Correct: BigQuery is the analytics/reporting store built for hundreds of TB and beyond.",
      "Wrong: Spanner is an OLTP relational store; it is not the analytics/reporting choice at this scale.",
      "Wrong: Bigtable is NoSQL, not a relational database."
    ]
  },
  {
    "id": 91,
    "topic": "Security & IAM",
    "difficulty": 1,
    "question": "Your project is using Bigtable to store data that should not be accessed from the public internet under any circumstances, even if the requestor has a valid service account key. You need to secure access to this data. What should you do?",
    "options": [
      "A. Use Identity and Access Management (IAM) for Bigtable access control.",
      "B. Use VPC Service Controls to create a trusted network for the Bigtable service.",
      "C. Use customer-managed encryption keys (CMEK).",
      "D. Use Google Cloud Armor to add IP addresses to an allowlist."
    ],
    "correct": 1,
    "explanation": "VPC Service Controls creates a perimeter so Bigtable data cannot be reached from outside the trusted network, even with valid credentials.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. I'll go for B (4 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "B. A is wrong because you might have the right credentials but still access Bigtable across the internet. Same is true for C. Cloud Armor could help, but VPC Service Controls is a classic use case of ensuring access is only from within certain VPC networks. From Google’s documentation, “Users can define a security perimeter around Google Cloud resources such as Cloud Storage buckets, Bigtable instances, and BigQuery datasets to constrain data within a VPC and control the flow of data.” https://cloud.google.com/vpc-service-controls (3 votes)"
      },
      {
        "user": "Zek",
        "text": "B While IAM enables granular identity-based access control, VPC Service Controls enables broader context-based perimeter security, including controlling data egress across the perimeter. We recommend using both VPC Service Controls and IAM for defense in depth. https://cloud.google.com/vpc-service-controls/docs/overview#how-vpc-service-controls-works (1 vote)"
      },
      {
        "user": "pk349",
        "text": "B: Use VPC Service Controls to create a trusted network for the Bigtable service. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 91,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B.",
    "conceptSummary": "Block public-internet access to Bigtable with VPC Service Controls.",
    "correctRationale": "IAM validates who you are but not where the request comes from; VPC Service Controls adds a network perimeter that blocks access from outside the trusted network regardless of credentials — exactly the stated requirement.",
    "optionRationales": [
      "Wrong: A valid service-account key could still be used from the public internet.",
      "Correct: VPC-SC denies access originating outside the trusted network, credential or not.",
      "Wrong: CMEK governs encryption keys, not network reachability.",
      "Wrong: Cloud Armor is for edge/HTTP applications, not Bigtable API access control."
    ]
  },
  {
    "id": 90,
    "topic": "Security & IAM",
    "difficulty": 2,
    "question": "You are a DBA on a Cloud Spanner instance with multiple databases. You need to assign these privileges to all members of the application development team on a specific database:\nCan read tables, views, and DDL\nCan write rows to the tables\nCan add columns and indexes\nCannot drop the database\nWhat should you do?",
    "options": [
      "A. Assign the Cloud Spanner Database Reader and Cloud Spanner Backup Writer roles.",
      "B. Assign the Cloud Spanner Database Admin role.",
      "C. Assign the Cloud Spanner Database User role.",
      "D. Assign the Cloud Spanner Admin role."
    ],
    "correct": 2,
    "explanation": "spanner.databaseUser provides read on tables/views/DDL, row writes, and DDL updates (columns/indexes) without database-drop/admin power.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: C. Vote for C (4 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. This has nothing to do with backups. Eliminate A. Any admin role would be too wide. Eliminate B and D. That leaves C. roles/spanner.databaseUser provides r/w. view and update schemas. https://cloud.google.com/spanner/docs/iam#spanner.databaseUser (3 votes)"
      },
      {
        "user": "whoosh",
        "text": "Selected Answer: C. Option C is corect spanner.admin God-tier control over everything Full CRUD & DDL for instances, databases, users, policies Manage entire Cloud Spanner environment spanner.databaseAdmin Database master control Full CRUD & DDL for databases, users, policies Create, manage, and secure databases spanner.databaseUser Power user with data rights Full CRUD & DDL for specified databases Read, write, modify data, manage database schema spanner.databaseReader Curious but hands-off observer Read-only access and query execution Analyze data without manipulation spanner.viewer Peeping Tom (metaphorically speaking) View instances, databases, and users Monitor Cloud Spanner metadata, no dat… (2 votes)"
      },
      {
        "user": "zanhsieh",
        "text": "Selected Answer: C. C A: WRONG. Neither roles can add columns and indexes (missing spanner.databases.updateDdl permission) B: WRONG. Exceeded permissions needed. C: CORRECT. D: WRONG. Exceeded permissions needed. Reference: https://gcp.permissions.cloud/predefinedroles/spanner.admin https://gcp.permissions.cloud/predefinedroles/spanner.databaseReader https://gcp.permissions.cloud/predefinedroles/spanner.backupWriter https://gcp.permissions.cloud/predefinedroles/spanner.databaseAdmin https://gcp.permissions.cloud/predefinedroles/spanner.databaseUser (1 vote)"
      },
      {
        "user": "learnazureportal",
        "text": "The answer list is not correct. we need to have a custom role for this task. BTW, Option C (assigning the Cloud Spanner Database User role) does not provide the necessary permissions to add columns and indexes or perform DDL operations. that said, it not correct either :) (1 vote)"
      },
      {
        "user": "pk349",
        "text": "C: Assign the Cloud Spanner Database User *** role. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 90,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for C — databaseUser covers read/write/updateDdl without drop; one commenter argued a custom role is needed since databaseUser's updateDdl scope is debatable.",
    "conceptSummary": "Spanner databaseUser role covers read+write+schema updates without admin.",
    "correctRationale": "roles/spanner.databaseUser grants reading data and DDL, writing rows, and updating the schema (adding columns/indexes) — while not allowing dropping the database. Reader+BackupWriter lacks write/DDL; Admin roles exceed least privilege.",
    "optionRationales": [
      "Wrong: Reader cannot write and neither role permits schema updates.",
      "Wrong: databaseAdmin can drop the database — explicitly disallowed.",
      "Correct: databaseUser matches every listed privilege and no more.",
      "Wrong: spanner.admin is instance-level god-mode."
    ]
  },
  {
    "id": 89,
    "topic": "Backup & Recovery",
    "difficulty": 3,
    "question": "Your organization is migrating 50 TB Oracle databases to Bare Metal Solution for Oracle. Database backups must be available for quick restore. You also need to have backups available for 5 years. You need to design a cost-effective architecture that meets a recovery time objective (RTO) of 2 hours and recovery point objective (RPO) of 15 minutes. What should you do?",
    "options": [
      "A. 1 Create the database on a Bare Metal Solution server with the database running on flash storage.\n2. Keep a local backup copy on all flash storage.\n3. Keep backups older than one day stored in Actifio OnVault storage.",
      "B. 1 Create the database on a Bare Metal Solution server with the database running on flash storage.\n2. Keep a local backup copy on standard storage.\n3. Keep backups older than one day stored in Actifio OnVault storage.",
      "C. Step 1: Create the database on a Bare Metal Solution server with the database running on flash storage.\nStep 2: Keep a local backup copy on standard storage.\nStep 3: Use the Oracle Recovery Manager (RMAN) backup utility to move backups older than one day to a Coldline Storage bucket.",
      "D. Step 1: Create the database on a Bare Metal Solution server with the database running on flash storage.\nStep 2: Keep a local backup copy on all flash storage.\nStep 3: Use the Oracle Recovery Manager (RMAN) backup utility to move backups older than one day to an Archive Storage bucket."
    ],
    "correct": 1,
    "explanation": "Flash for the production DB, a local backup copy on standard storage for quick restore, and Actifio OnVault for backups older than a day — cost-effective while meeting 2h RTO / 15min RPO.",
    "discussion": [
      {
        "user": "pk349",
        "text": "D: Create the database on a Bare Metal Solution server with the database running on flash storage. Archive storage ARCHIVE 365 days Yes • 99.95% in multi-regions and dual-regions • 99.9% in regions Keep a local backup copy on all flash storage. Use the Oracle Recovery Manager (RMAN) backup utility to move backups older than one day to an ***** Archive Storage bucket. (4 votes)"
      },
      {
        "user": "Jay_Krish",
        "text": "Selected Answer: D. Keeping local storage on flash drive would meet the requirement for RTO. And moving older backups to Archival storage is the cost-effective option. (4 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: B. GCP wants us to choose B (4 votes)"
      },
      {
        "user": "whoosh",
        "text": "Selected Answer: B. Option B is correct There are two activities: Manage incremental backup (transaction log) and manage obsolete backup (older than retention time to another backup storage (archival)). Option B make as actifio as tool to organize this two activities while Option D make RMAN as tools to organize this to activities. actifio have feature like “Incremental-forever” backups\" and store in OnVault storage which is official standard for actifio and actifio in gcp which is very fast compare to option D (RMAN). RMAN will need more than 2 hours to do recovery for 50 TB. (3 votes)"
      },
      {
        "user": "nanay",
        "text": "Selected Answer: B. Create the database on a Bare Metal Solution server with the database running on flash storage. Keep a local backup copy on standard storage. Keep backups older than one day stored in Actifio OnVault storage. (3 votes)"
      },
      {
        "user": "learnazureportal",
        "text": "correct answer is C. Option C aligns with the requirements for performance, cost-effectiveness, and long-term data retention while meeting the RTO and RPO objectives. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 89,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Community split between B (OnVault with standard local copy) and D (flash local copy + RMAN to Archive). The loaded answer is B: Actifio OnVault is the recommended BMS backup stack, and standard local storage meets the RTO more cheaply than flash.",
    "conceptSummary": "BMS backup design: local standard-storage copy + Actifio OnVault for retention.",
    "correctRationale": "Actifio OnVault is Google's recommended backup architecture for Bare Metal Solution, providing deduplicated backup with fast restore and long retention. Keeping the local copy on standard (not flash) storage controls cost while still meeting the 2-hour RTO; OnVault retains older backups for the 5-year requirement.",
    "optionRationales": [
      "Wrong: All-flash local backups work but cost more than necessary — standard storage is sufficient for the RTO.",
      "Correct: Flash DB + local standard copy for quick restore + OnVault for aged backups is the cost-effective documented design.",
      "Wrong: Manual RMAN to Coldline loses the Actifio backup/DR integration and quick-restore tooling.",
      "Wrong: All-flash local copy is costly and RMAN-to-Archive gives slow restores and no Actifio integration."
    ]
  },
  {
    "id": 88,
    "topic": "Operations & Maintenance",
    "difficulty": 1,
    "question": "You need to provision several hundred Cloud SQL for MySQL instances for multiple project teams over a one-week period. You must ensure that all instances adhere to company standards such as instance naming conventions, database flags, and tags. What should you do?",
    "options": [
      "A. Automate instance creation by writing a Dataflow job.",
      "B. Automate instance creation by setting up Terraform scripts.",
      "C. Create the instances using the Google Cloud Console UI.",
      "D. Create clones from a template Cloud SQL instance."
    ],
    "correct": 1,
    "explanation": "Terraform scripts codify the naming, flags and tags so hundreds of instances are created consistently and repeatably.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. Use Terraform, it will allow you to template same resource (3 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "B. The scale of the problem suggests automation. Eliminate C and D. Dataflow concerns data, not instances. The only answer which makes sense is to use Terraform. (2 votes)"
      },
      {
        "user": "Ayush9596",
        "text": "Selected Answer: B. B will work (2 votes)"
      },
      {
        "user": "pk349",
        "text": "B: Automate instance creation by setting up ***** Terraform scripts. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 88,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B.",
    "conceptSummary": "Mass-provision Cloud SQL with Terraform for standards enforcement.",
    "correctRationale": "Infrastructure-as-code via Terraform templates enforces naming conventions, database flags and tags across hundreds of instances created in a week — consistent and auditable.",
    "optionRationales": [
      "Wrong: Dataflow moves data, not infrastructure provisioning.",
      "Correct: Terraform is the standard IaC tool for repeatable, policy-conformant provisioning.",
      "Wrong: Manual console creation of hundreds of instances is slow and error-prone.",
      "Wrong: Cloning a template does not enforce conventions and still requires manual steps per instance."
    ]
  },
  {
    "id": 87,
    "topic": "Migration",
    "difficulty": 3,
    "question": "You want to migrate an on-premises 100 TB Microsoft SQL Server database to Google Cloud over a 1 Gbps network link. You have 48 hours allowed downtime to migrate this database. What should you do? (Choose two.)",
    "options": [
      "A. Use a change data capture (CDC) migration strategy.",
      "B. Move the physical database servers from on-premises to Google Cloud.",
      "C. Keep the network bandwidth at 1 Gbps, and then perform an offline data migration.",
      "D. Increase the network bandwidth to 2 Gbps, and then perform an offline data migration.",
      "E. Increase the network bandwidth to 10 Gbps, and then perform an offline data migration."
    ],
    "correct": [
      0,
      4
    ],
    "explanation": "A CDC migration minimizes live transfer, and upgrading to 10 Gbps makes the 100 TB offline transfer fit the 48-hour window (1 Gbps would take ~12 days).",
    "discussion": [
      {
        "user": "DBAgain",
        "text": "Selected Answer: AC. A, C The question doesn't tell you that you have to move the database within 48 hours from right now - it says you're allow 48 hours of downtime. i.e. You can schedule it. C, D, and E all require an offline transfer, so increasing bandwidth wouldn't help. 1 Gbps should be enough to handle CDC updates within 48 hours after the initial offline transfer is complete, and it minimizes cost. (8 votes)"
      },
      {
        "user": "pk349",
        "text": "AUse a change data capture ***** (CDC) migration strategy. BMove the physical database servers from on-premises to Google Cloud. CKeep the network bandwidth at 1 Gbps, and then perform an offline data migration. 1 Gbps = 1*24*60*60/8 = 10,800 GB = 10 TB per 24 hrs So, 20 TB per 48 hrs DIncrease the network bandwidth to 2 Gbps, and then perform an offline data migration. So, 40 TB per 48 hrs EIncrease the network bandwidth to 10 ***** Gbps, and then perform an offline data migration. So, 200 TB per 48 hrs Answer: A E (7 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A, E. According to Google’s data transfer chart, 100 TB across a 1 Gbps link would take 12 days. I don’t think you can physically move your own equipment into a Google DC. Eliminate B. Increasing the bandwidth to 2 Gbps and doing an offline migration anyway wouldn’t help. The Google Transfer Appliance comes in 7 TB, 40 TB and 300 TB sizes. However, the turnaround time (Google ships the appliance to you, you load it with data, you ship it back, Google unloads it to a Cloud Storage bucket) is approximately 3 weeks. Eliminate C and D. That leaves A and E. A 10 Gbps link would transfer 100 TB in 30 hours. That leaves 18 hours for a CDC solution to sync the data. https://cloud.google.com/archi… (5 votes)"
      },
      {
        "user": "PrtkKA",
        "text": "Selected Answer: AE. Ideally, you can transfer 1 GB in eight seconds over a 1 Gbps network. https://cloud.google.com/architecture/migration-to-google-cloud-transferring-your-large-datasets (4 votes)"
      },
      {
        "user": "james2033",
        "text": "Selected Answer: AE. 1 minutes = 60 seconds 1 hour = 60 minutes = 60 * 60 = 3_600 seconds 1 day = 24 hours = 24 * 3_600 = 86_400 seconds 48 hours = 2 days = 86_400 * 2 = 172_800 seconds Network link 1 Gbps, 48 hours transfer 172_800 Gb = 172_800/8 GB = 21_600 GB < 100 TB Network link 2 Gbps, 48 hours transfer 43_200 GB < 100 TB Network link 10 Gbps, 48 hours transfer 210_600 GB = 205.66 TB > 100 TB. (3 votes)"
      },
      {
        "user": "PKookNN",
        "text": "Selected Answer: AC. I think the question tricks you into thinking that you need more bandwidth. For offline, you don't need bandwidth. So answers is A and C. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 87,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Community split between A+E and A+C. The loaded answer is A+E: only CDC or a 10 Gbps link gets 100 TB moved within a 48-hour window; staying at 1 Gbps cannot.",
    "conceptSummary": "100 TB migration in 48 h: CDC strategy and/or 10 Gbps bandwidth.",
    "correctRationale": "Bulk transfer math: 1 Gbps moves ~10 TB/day, so 100 TB needs ~12 days at 1 Gbps — far beyond 48 h. The workable levers are a CDC migration strategy (sync online, cut over with minimal downtime) and increasing bandwidth to 10 Gbps so an offline transfer completes inside the window.",
    "optionRationales": [
      "Correct: CDC keeps systems in sync and shrinks the downtime requirement dramatically.",
      "Wrong: You cannot physically relocate your servers into a Google data center.",
      "Wrong: 1 Gbps cannot move 100 TB in 48 hours (~20 TB in that window).",
      "Wrong: 2 Gbps only doubles capacity — still ~6 days, not 48 hours.",
      "Correct: 10 Gbps moves ~100 TB/day — 100 TB fits in ~48 hours."
    ]
  },
  {
    "id": 86,
    "topic": "Operations & Maintenance",
    "difficulty": 2,
    "question": "You manage a production MySQL database running on Cloud SQL at a retail company. You perform routine maintenance on Sunday at midnight when traffic is slow, but you want to skip routine maintenance during the year-end holiday shopping season. You need to ensure that your production system is available 24/7 during the holidays. What should you do?",
    "options": [
      "A. Define a maintenance window on Sundays between 12 AM and 1 AM, and deny maintenance periods between November 1 and January 15.",
      "B. Define a maintenance window on Sundays between 12 AM and 5 AM, and deny maintenance periods between November 1 and February 15.",
      "C. Build a Cloud Composer job to start a maintenance window on Sundays between 12 AM and 1AM, and deny maintenance periods between November 1 and January 15.",
      "D. Create a Cloud Scheduler job to start maintenance at 12 AM on Sundays. Pause the Cloud Scheduler job between November 1 and January 15."
    ],
    "correct": 0,
    "explanation": "Pair the Sunday 12–1 AM maintenance window with a maintenance deny period Nov 1–Jan 15 (within the 90-day limit).",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. A loogs good. B is impossible because you can't hold maintenance for more than a 90 days period (10 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. This is a maintenance deny question, so eliminate C and D. Maintenance deny periods can be set that last up to 90 days. That eliminates B since the period mentioned would be 107 days. B is also eliminated because the maintenance windows are an hour. You can't set a maintenance window in Cloud SQL to be 5 hours. A is the answer. (5 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Define a maintenance window on Sundays between 12 AM and *****1 AM, and deny maintenance periods between November 1 and ***** January 15. Cloud SQL offers you the ability to configure maintenance updates through a set of maintenance settings. You can configure maintenance to be scheduled at times when brief downtime causes the lowest impact to your applications. For each Cloud SQL instance, you can configure the following: • Maintenance window. The day of the week and the hour in which Cloud SQL schedules maintenance. Maintenance windows last for ***** one hour. Learn how to configure a maintenance window. (2 votes)"
      },
      {
        "user": "FunkyB",
        "text": "Correct Answer: A \"Deny maintenance period. A block of days in which Cloud SQL does not schedule maintenance. Deny maintenance periods can be up to 90 days long. \" https://cloud.google.com/sql/docs/mysql/maintenance (1 vote)"
      },
      {
        "user": "learnazureportal",
        "text": "correct answer is D. Create a Cloud Scheduler job to start maintenance at 12 AM on Sundays. Pause the Cloud Scheduler job between November 1 and January 15. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 86,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A — only valid combination within the 90-day deny limit.",
    "conceptSummary": "Maintenance window + ≤90-day deny period for holiday freeze.",
    "correctRationale": "Cloud SQL offers maintenance windows plus deny periods up to 90 days. Nov 1→Jan 15 is 75 days (valid); option B's Nov 1→Feb 15 exceeds 90 days, and Cloud Scheduler/Composer cannot create maintenance windows.",
    "optionRationales": [
      "Correct: Window + a deny period under 90 days is the supported mechanism.",
      "Wrong: Nov 1–Feb 15 is ~107 days, over the 90-day deny limit.",
      "Wrong: Composer cannot set Cloud SQL maintenance windows.",
      "Wrong: Scheduler cannot control Cloud SQL maintenance."
    ]
  },
  {
    "id": 85,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "You are designing a physician portal app in Node.js. This application will be used in hospitals and clinics that might have intermittent internet connectivity. If a connectivity failure occurs, the app should be able to query the cached data. You need to ensure that the application has scalability, strong consistency, and multi-region replication. What should you do?",
    "options": [
      "A. Use Firestore and ensure that the PersistenceEnabled option is set to true.",
      "B. Use Memorystore for Memcached.",
      "C. Use Pub/Sub to synchronize the changes from the application to Cloud Spanner.",
      "D. Use Table.read with the exactStaleness option to perform a read of rows in Cloud Spanner."
    ],
    "correct": 0,
    "explanation": "Firestore gives multi-region replication, strong consistency, scale, and client-side persistence (PersistenceEnabled) for offline reads during connectivity loss.",
    "discussion": [
      {
        "user": "pk349",
        "text": "A: Use Firestore and ensure that the PersistenceEnabled ***** option is set to true. Cloud Firestore is a NoSQL document database that lets you easily store, sync, and query data for your mobile and web apps - at global scale. To use offline persistence, you don't need to make any changes to the code that you use to access Cloud Firestore data. With offline persistence enabled, the Cloud Firestore client library automatically manages online and offline data access and synchronizes local data when the device is back online. (6 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. Intermittment connectivity -> Firestore (5 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. An app with intermitted internet access meaning it does not HAVE to sync with the live data source must mean Firestore in Datastore mode. The only option that mentions Firestore is A. https://firebase.google.com/docs/firestore/manage-data/enable-offline (4 votes)"
      },
      {
        "user": "887ad17",
        "text": "Selected Answer: A. Firestore meets all the requirements for your physician portal app: Offline Access: With the PersistenceEnabled option, Firestore caches data locally, allowing the app to function during intermittent internet connectivity. Scalability: Firestore is designed to scale automatically with your application's needs. Strong Consistency: Firestore provides strong consistency for read and write operations. Multi-Region Replication: Firestore supports multi-region replication, ensuring high availability and resilience. (1 vote)"
      },
      {
        "user": "learnazureportal",
        "text": "correct answer is C! Firestore may not provide the same level of strong consistency and multi-region replication as Cloud Spanner. :) (1 vote)"
      },
      {
        "user": "gcp_k",
        "text": "The answer is: C since the use case is for Strong consistency and multi-regional replication. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 85,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A — 'intermittent connectivity' is the Firestore persistence signature.",
    "conceptSummary": "Offline-capable strongly consistent portal → Firestore with persistence enabled.",
    "correctRationale": "Only Firestore couples a multi-region strongly consistent serverless database with built-in client persistence (PersistenceEnabled=true) that serves cached queries offline — matching hospitals with intermittent connectivity.",
    "optionRationales": [
      "Correct: Firestore + persistence gives offline reads and strongly consistent multi-region sync.",
      "Wrong: Memcached is volatile cache — no durable storage or replication.",
      "Wrong: Pub/Sub into Spanner is bespoke plumbing with no client offline story.",
      "Wrong: Stale reads still need connectivity; not an offline solution."
    ]
  },
  {
    "id": 84,
    "topic": "Migration",
    "difficulty": 2,
    "question": "Your company is using Cloud SQL for MySQL with an internal (private) IP address and wants to replicate some tables into BigQuery in near-real time for analytics and machine learning. You need to ensure that replication is fast and reliable and uses Google-managed services. What should you do?",
    "options": [
      "A. Develop a custom data replication service to send data into BigQuery.",
      "B. Use Cloud SQL federated queries.",
      "C. Use Database Migration Service to replicate tables into BigQuery.",
      "D. Use Datastream to capture changes, and use Dataflow to write those changes to BigQuery."
    ],
    "correct": 3,
    "explanation": "Datastream captures changes from Cloud SQL and Dataflow writes them to BigQuery — Google's managed near-real-time replication pattern.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "D. Anytime you see words like “develop” or “manually” be suspicious given this is cloud and everything is supposed to be automated and point-and-click easy. Eliminate A. Federated queries are SQL queries initiated FROM BigQuery to Cloud Spanner or Cloud SQL databases. So B doesn’t make sense. The Database Migration Service does not support BigQuery as a destination database engine. Eliminate C. That leaves D. From Google’s documentation, “Datastream is a serverless and easy-to-use Change Data Capture (CDC) and replication service that allows you to synchronize data across heterogeneous databases, storage systems, and applications reliably and with minimal latency. Datastream supports chan… (12 votes)"
      },
      {
        "user": "pk349",
        "text": "D: Use Datastream to capture *** changes, and use Dataflow to write those changes to BigQuery. Dataflow is a fully managed streaming analytics service that minimizes latency, processing time, and cost through autoscaling and batch processing. Dataflow is a managed service for executing a wide variety of data processing patterns. The documentation on this site shows you how to deploy your batch and streaming data processing pipelines using Dataflow, including directions for using service features. (3 votes)"
      },
      {
        "user": "pico",
        "text": "You can not connect Datastream directly to Cloud SQL with an internal IP without using A compute instance where a SQL Proxy is deployed to bridge the traffic between Datastream and Cloud SQL. Because connecting to Cloud SQL from Datastream is not possible https://github.com/rocketechgroup/mysql-to-bq-datastream (2 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. I'll go for D (2 votes)"
      },
      {
        "user": "pico",
        "text": "B As a data analyst, you can query data in Cloud SQL from BigQuery using federated queries. BigQuery Cloud SQL federation enables BigQuery to query data residing in Cloud SQL in real time, without copying or moving data. Query federation supports both MySQL (2nd generation) and PostgreSQL instances in Cloud SQL. Alternatively, to replicate data into BigQuery, you can also use Cloud Data Fusion or Datastream. For more about using Cloud Data Fusion, see Replicating data from MySQL to BigQuery. https://cloud.google.com/bigquery/docs/cloud-sql-federated-queries (1 vote)"
      },
      {
        "user": "sp57",
        "text": "Linked article confirms datastream + dataflow is a \"thing\". Provides additional customization vs just datastream. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 84,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D — Datastream+Dataflow is the managed CDC pattern (noted caveat: private-IP sources need a proxy/bridge).",
    "conceptSummary": "Near-real-time Cloud SQL→BigQuery replication via Datastream + Dataflow.",
    "correctRationale": "The Google-managed CDC path into BigQuery is Datastream for change capture plus Dataflow for landing the changes — fast, reliable and fully managed.",
    "optionRationales": [
      "Wrong: Custom replication is not managed and is fragile.",
      "Wrong: BigQuery federated queries run live against the source — not replication and adds load.",
      "Wrong: DMS does not target BigQuery as a destination.",
      "Correct: Datastream CDC + Dataflow is the documented managed replication architecture into BigQuery."
    ]
  },
  {
    "id": 83,
    "topic": "Operations & Maintenance",
    "difficulty": 1,
    "question": "You use Python scripts to generate weekly SQL reports to assess the state of your databases and determine whether you need to reorganize tables or run statistics. You want to automate this report but need to minimize operational costs and overhead. What should you do?",
    "options": [
      "A. Create a VM in Compute Engine, and run a cron job.",
      "B. Create a Cloud Composer instance, and create a directed acyclic graph (DAG).",
      "C. Create a Cloud Function, and call the Cloud Function using Cloud Scheduler.",
      "D. Create a Cloud Function, and call the Cloud Function from a Cloud Tasks queue."
    ],
    "correct": 2,
    "explanation": "A Cloud Function triggered by Cloud Scheduler is the cheapest, lowest-overhead way to run a weekly Python report job.",
    "discussion": [
      {
        "user": "isribalaji",
        "text": "Selected Answer: C. Minimal Cost Approach: 1. Put the python script on the Cloud Function 2. Schedule weekly trigger using Cloud Scheduler Compute Engine and Cloud Composer would increase the cost and making it complex (4 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. Need to automate and minimize costs/overhead. Eliminate A. From Google’s documentation, “Cloud Composer is a fully managed workflow orchestration service, enabling you to create, schedule, monitor, and manage workflow pipelines that span across clouds and on-premises data centers.”. We don’t need Cloud Composer. Eliminate B. To have something run at a specific time on a specific schedule, you need to use Cloud Scheduler (which has cron like scheduling). Cloud Tasks doesn’t do that. Eliminate D. That leaves C. (3 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: C. I'll go for C (2 votes)"
      },
      {
        "user": "pk349",
        "text": "C: Create a Cloud Function, and call the Cloud Function using Cloud *** Scheduler. Compare Cloud Tasks vs. Cloud Scheduler Both Cloud Tasks and Cloud Scheduler can be used to initiate actions outside of the immediate context. But they have significant differences in functionality and usage. This page helps you understand the differences between them. (1 vote)"
      },
      {
        "user": "zanhsieh",
        "text": "Selected Answer: C. C Cloud Scheduler triggers actions at regular fixed intervals, whereas Cloud Tasks triggers actions based on how the individual task object is configured. Reference: https://cloud.google.com/tasks/docs/comp-tasks-sched (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 83,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — cheapest recurring trigger.",
    "conceptSummary": "Low-cost weekly job automation: Cloud Scheduler + Cloud Function.",
    "correctRationale": "For a simple weekly script, Scheduler triggering a function is serverless and nearly free; a VM cron job costs a running VM, Composer is heavy, and Cloud Tasks is for event-driven queues, not recurring schedules.",
    "optionRationales": [
      "Wrong: A dedicated VM costs money and needs patching — maximal overhead.",
      "Wrong: Composer is a full Airflow deployment, far beyond one weekly script.",
      "Correct: Scheduler + function = minimal cost and overhead for a weekly job.",
      "Wrong: Cloud Tasks is for asynchronous task queues, not cron schedules."
    ],
    "legacyNote": "Cloud Functions are now called Cloud Run functions; the pattern is unchanged."
  },
  {
    "id": 82,
    "topic": "High Availability & DR",
    "difficulty": 1,
    "question": "You are managing a Cloud SQL for PostgreSQL instance in Google Cloud. You need to test the high availability of your Cloud SQL instance by performing a failover. You want to use the cloud command. What should you do?",
    "options": [
      "A. Use gcloud sql instances failover <PrimaryInstanceName>.",
      "B. Use gcloud sql instances failover <ReplicaInstanceName>.",
      "C. Use gcloud sql instances promote-replica <PrimaryInstanceName>.",
      "D. Use gcloud sql instances promote-replica <ReplicaInstanceName>."
    ],
    "correct": 0,
    "explanation": "gcloud sql instances failover <primary> initiates an HA failover test on the primary.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. We are not promoting a read replica to be the primary instance. Eliminate C and D. When HA is enabled you only deal with the primary instance name, so B doesn’t make sense. That leaves A. (7 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. Since primary instance is HA, it can failover between it's two intances (6 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Use gcloud sql instances failover ***** <PrimaryInstanceName>. (2 votes)"
      },
      {
        "user": "learnazureportal",
        "text": "correct answer is B! When you initiate the failover on the replica instance, it will be promoted to the primary instance, simulating a high-availability failover event. option A is not the recommended! (1 vote)"
      },
      {
        "user": "887ad17",
        "text": "Selected Answer: A. gcloud sql instances failover <PrimaryInstanceName> (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 82,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A.",
    "conceptSummary": "Test Cloud SQL HA with gcloud sql instances failover on the primary.",
    "correctRationale": "An HA instance fails over between primary and standby by invoking failover on the primary instance name — the documented test command.",
    "optionRationales": [
      "Correct: gcloud sql instances failover targets the HA primary.",
      "Wrong: The failover command takes the primary, not a replica name.",
      "Wrong: promote-replica is for read replicas, not HA failover testing.",
      "Wrong: Same — promote-replica does not test HA."
    ]
  },
  {
    "id": 81,
    "topic": "Migration",
    "difficulty": 1,
    "question": "Your company wants you to migrate their Oracle, MySQL, Microsoft SQL Server, and PostgreSQL relational databases to Google Cloud. You need a fully managed, flexible database solution when possible. What should you do?",
    "options": [
      "A. Migrate all the databases to Cloud SQL.",
      "B. Migrate the Oracle, MySQL, and Microsoft SQL Server databases to Cloud SQL, and migrate the PostgreSQL databases to Compute Engine.",
      "C. Migrate the MySQL, Microsoft SQL Server, and PostgreSQL databases to Compute Engine, and migrate the Oracle databases to Bare Metal Solution for Oracle.",
      "D. Migrate the MySQL, Microsoft SQL Server, and PostgreSQL databases to Cloud SQL, and migrate the Oracle databases to Bare Metal Solution for Oracle."
    ],
    "correct": 3,
    "explanation": "MySQL, SQL Server and PostgreSQL go to managed Cloud SQL; Oracle has no managed equivalent and goes to Bare Metal Solution for Oracle.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. Oracle should go to the Bare Metal Solution for Oracle only, others - to CloudSQL (4 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. Cloud SQL doesn’t support Oracle. Eliminate A and B. Migrating 3 of the platforms to GCE would not be a fully managed solution. Eliminate C. D is the only reasonable option, even though it’s not “fully managed” since you have to manage Oracle on BMS. (3 votes)"
      },
      {
        "user": "badrisrinivas9",
        "text": "Selected Answer: D. D. Migrate the MySQL, Microsoft SQL Server, and PostgreSQL databases to Cloud SQL, and migrate the Oracle databases to Bare Metal Solution for Oracle. (2 votes)"
      },
      {
        "user": "pk349",
        "text": "D: Migrate the MySQL, Microsoft SQL Server, and PostgreSQL databases to Cloud SQL, and migrate the Oracle databases to Bare Metal Solution for Oracle. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 81,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "Engine-matched targets: Cloud SQL for MySQL/SQL Server/PostgreSQL, BMS for Oracle.",
    "correctRationale": "Cloud SQL natively hosts MySQL, SQL Server and PostgreSQL — the fully managed flexible option for three of the four. Oracle is not offered on Cloud SQL, so it goes to Bare Metal Solution for Oracle.",
    "optionRationales": [
      "Wrong: Cloud SQL cannot host Oracle.",
      "Wrong: Same Oracle problem, and PostgreSQL on self-managed GCE loses the 'managed' requirement.",
      "Wrong: Three engines on self-managed Compute Engine loses the managed-service benefit.",
      "Correct: The only mapping giving managed targets where they exist and a supported Oracle target."
    ]
  },
  {
    "id": 80,
    "topic": "Migration",
    "difficulty": 1,
    "question": "Your company is shutting down their on-premises data center and migrating their Oracle databases using Oracle Real Application Clusters (RAC) to Google Cloud. You want minimal to no changes to the applications during the database migration. What should you do?",
    "options": [
      "A. Migrate the Oracle databases to Cloud Spanner.",
      "B. Migrate the Oracle databases to Compute Engine.",
      "C. Migrate the Oracle databases to Cloud SQL.",
      "D. Migrate the Oracle databases to Bare Metal Solution for Oracle."
    ],
    "correct": 3,
    "explanation": "Oracle RAC with minimal application change is exactly what Bare Metal Solution for Oracle provides — certified Oracle on dedicated hardware.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. D is the Google-recommended solution (4 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. In theory you could migrate Oracle to Spanner for PostgreSQL, but that would entail application changes which the questions says can’t happen. Eliminate A. Oracle is not licensed or supported in GCE. Eliminate B. Cloud SQL doesn’t support Oracle. Eliminate C. That leaves D on which you can configure and run RAC. (2 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: D. D. Oracle databases to Bare Metal Solution for Oracle will do the job. (2 votes)"
      },
      {
        "user": "pk349",
        "text": "D: Migrate the Oracle databases to Bare Metal Solution for Oracle. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 80,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D — only BMS supports Oracle RAC.",
    "conceptSummary": "Oracle RAC lift-and-shift → Bare Metal Solution for Oracle.",
    "correctRationale": "BMS for Oracle is the only Google Cloud offering that hosts Oracle RAC natively with all Oracle features — applications need no changes.",
    "optionRationales": [
      "Wrong: Spanner is a different engine — full application rewrite.",
      "Wrong: Oracle RAC is not licensed/supported on Compute Engine.",
      "Wrong: Cloud SQL doesn't host Oracle.",
      "Correct: BMS runs Oracle RAC natively with zero application changes."
    ]
  },
  {
    "id": 79,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "You are designing a database strategy for a new web application. You plan to start with a small pilot in one country and eventually expand to millions of users in a global audience. You need to ensure that the application can run 24/7 with minimal downtime for maintenance. What should you do?",
    "options": [
      "A. Use Cloud Spanner in a regional configuration.",
      "B. Use Cloud Spanner in a multi-region configuration.",
      "C. Use Cloud SQL with cross-region replicas.",
      "D. Use highly available Cloud SQL with multiple zones."
    ],
    "correct": 0,
    "explanation": "Start the pilot on a cost-effective regional Spanner instance; expand to multi-region when the audience globalizes.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. Changing my vote to A (6 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. Initially it’s a choice between Cloud SQL and Cloud Spanner. Given the final objective is a massive user base on a global scale, it suggests Spanner. Therefore, starting with Cloud SQL then migrating to Cloud Spanner doesn’t seem like a smart move. Eliminate C and D. You can start small with Spanner (single region, 100 processing units) and convert to multi-region by contacting Google. The wording to that effect is on the Edit Spanner screen in the GCP console. So, given those details it eliminates B. Best answer is A. (5 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: A. \"You plan to start with a small pilot in one country\" == small spanner ==> regional. (4 votes)"
      },
      {
        "user": "juliorevk",
        "text": "Selected Answer: B. Going with B because - Small pilot in one \"country\". A country would be multiple regions - Don't have to change to multi-region spanner in the future. - Q doesn't say anything about being cost-efficient so might as well start with multi-region. (3 votes)"
      },
      {
        "user": "bc1c510",
        "text": "if you are eventually going to expand as the question indicates then just go with multi-regional. Answer is B. Also agree one country has multpile regions. Doesn't say small country just one country. (2 votes)"
      },
      {
        "user": "Topg4u",
        "text": "You plan to start with a small pilot in one country. so country is multi region right? so B ? (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 79,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Vote tied between A (regional Spanner for the pilot) and B (multi-region from day one). The loaded answer is A: the pilot's one-country scope does not justify multi-region cost.",
    "conceptSummary": "Pilot-first phasing: regional Spanner now, multi-region later.",
    "correctRationale": "The pilot serves one country, so regional Spanner is the right initial size at far lower cost while still giving the transactional, always-on semantics required; when the audience globalizes, Spanner scales to multi-region. Buying multi-region for a one-country pilot wastes money.",
    "optionRationales": [
      "Correct: Regional Spanner fits the pilot's scale and budget and grows to multi-region later.",
      "Wrong: Multi-region Spanner now is oversized and expensive for a single-country pilot.",
      "Wrong: Cloud SQL cross-region replicas do not give the global transactional scale the end-state needs.",
      "Wrong: Zonal HA Cloud SQL stays single-region and can't transparently scale to a global audience."
    ]
  },
  {
    "id": 78,
    "topic": "Monitoring & Performance",
    "difficulty": 1,
    "question": "You are the primary DBA of a Cloud SQL for PostgreSQL database that supports 6 enterprise applications in production. You used Cloud SQL Insights to identify inefficient queries and now need to identify the application that is originating the inefficient queries. You want to follow Google-recommended practices. What should you do?",
    "options": [
      "A. Shut down and restart each application.",
      "B. Write a utility to scan database query logs.",
      "C. Write a utility to scan application logs.",
      "D. Use query tags to add application-centric database monitoring."
    ],
    "correct": 3,
    "explanation": "Query Insights supports application tags (query tags/sqlcommenter) that attribute queries to the originating application — the documented practice.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "D. A is just wrong on so many levels. B and C represent work and unless you know which SQL belongs to which application won’t actually help. First you need to add query tags to help identify application SQL. D is therefore correct. https://cloud.google.com/sql/docs/postgres/using-query-insights#filter_by_query_tags (6 votes)"
      },
      {
        "user": "pk349",
        "text": "D: Use query tags to add application-centric database monitoring. Store application tags Stores application tags that help you determine the APIs and model-view-controller (MVC) routes that are making requests and group the data to run metrics against it. This option requires you to comment queries with a specific set of tags using the sqlcommenter open source object-relational mapping (ORM) auto-instrumentation library. This information helps Query insights identify the source of a problem and the MVC the problem is coming from. Application paths help you with application monitoring. (3 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. https://cloud.google.com/sql/docs/postgres/using-query-insights#specific-query:~:text=Store%20application%20tags,with%20application%20monitoring. (3 votes)"
      },
      {
        "user": "badrisrinivas9",
        "text": "Selected Answer: D. D: Use query tags to add application-centric database monitoring. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 78,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D per the Query Insights application-tags documentation.",
    "conceptSummary": "Attribute queries to applications via Query Insights query tags.",
    "correctRationale": "Google's recommendation is to instrument apps with query tags so Query Insights groups slow queries by application — precisely what the DBA needs.",
    "optionRationales": [
      "Wrong: Restarting production apps is disruptive and reveals nothing.",
      "Wrong: Scanning DB logs cannot attribute queries to apps without tags.",
      "Wrong: Application logs show app events, not per-query database attribution.",
      "Correct: Query tags give application-centric monitoring in Query Insights."
    ],
    "legacyNote": "'Cloud SQL Insights' is now called Query Insights; the tagging feature is unchanged."
  },
  {
    "id": 77,
    "topic": "Backup & Recovery",
    "difficulty": 1,
    "question": "You have a large Cloud SQL for PostgreSQL instance. The database instance is not mission-critical, and you want to minimize operational costs. What should you do to lower the cost of backups in this environment?",
    "options": [
      "A. Set the automated backups to occur every other day to lower the frequency of backups.",
      "B. Change the storage tier of the automated backups from solid-state drive (SSD) to hard disk drive (HDD).",
      "C. Select a different region to store your backups.",
      "D. Reduce the number of automated backups that are retained to two (2)."
    ],
    "correct": 3,
    "explanation": "Backup retention count is configurable (1–365); dropping from the default seven to two cuts backup storage cost for a non-critical instance.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "D. A is wrong - you can’t do that. Automated backups are either on or off. You only get to choose the 4 hour window and if the backups are stored in a single or multi-region. B is wrong for the same reason. C wouldn’t lower the cost, but reducing the number of backups retained would. The default is 7. This can be verified using the Google Pricing Calculator. (7 votes)"
      },
      {
        "user": "PrtkKA",
        "text": "Selected Answer: D. By default, for each instance, Cloud SQL retains seven automated backups, in addition to on-demand backups. You can configure how many automated backups to retain (from 1 to 365). We charge a lower rate for backup storage than for other types of instances. https://cloud.google.com/sql/docs/mysql/backup-recovery/backups (6 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. I'll go for D, seems like the best option (3 votes)"
      },
      {
        "user": "pk349",
        "text": "D: Reduce the number of automated backups that are retained to two ***** (2). (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 77,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D — retention count is the only real cost knob offered.",
    "conceptSummary": "Lower Cloud SQL backup cost by reducing retained automated backups.",
    "correctRationale": "The only cost lever here is the number of retained automated backups — frequency can't be lowered below daily and you can't pick storage tier/region for cheaper backup storage. Retaining two instead of seven reduces billed backup storage.",
    "optionRationales": [
      "Wrong: Automated backups are daily when on; there's no every-other-day setting.",
      "Wrong: Backup storage tier is not selectable.",
      "Wrong: Region choice does not lower cost for non-critical backups here.",
      "Correct: Retention is configurable; retaining fewer backups directly reduces backup storage charges."
    ]
  },
  {
    "id": 76,
    "topic": "Migration",
    "difficulty": 1,
    "question": "You need to migrate a 1 TB PostgreSQL database from a Compute Engine VM to Cloud SQL for PostgreSQL. You want to ensure that there is minimal downtime during the migration. What should you do?",
    "options": [
      "A. Export the data from the existing database, and load the data into a new Cloud SQL database.",
      "B. Use Migrate for Compute Engine to complete the migration.",
      "C. Use Datastream to complete the migration.",
      "D. Use Database Migration Service to complete the migration."
    ],
    "correct": 3,
    "explanation": "Homogeneous PostgreSQL GCE→Cloud SQL with minimal downtime is DMS's core use case (continuous migration).",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. Database Migration Service should hadle this. (8 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. The key is minimal downtime. That eliminates A. Migrate for Compute Engine operates at the VM level. That eliminates B. Migrating from a GCE VM to Cloud SQL is a classic use case for the Database Migration Service. D is the best answer. (4 votes)"
      },
      {
        "user": "PKookNN",
        "text": "Selected Answer: D. https://cloud.google.com/blog/products/databases/database-migration-service-now-available-for-cloud-sql-and-more (2 votes)"
      },
      {
        "user": "pk349",
        "text": "It's the correct answer. (translated) (1 vote)"
      },
      {
        "user": "CloudKida",
        "text": "Selected Answer: D. https://www.cloudskillsboost.google/focuses/22792?parent=catalog (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 76,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D.",
    "conceptSummary": "GCE PostgreSQL→Cloud SQL minimal downtime via DMS.",
    "correctRationale": "DMS handles PostgreSQL on Compute Engine to Cloud SQL for PostgreSQL with dump+CDC continuous migration — the documented minimal-downtime path.",
    "optionRationales": [
      "Wrong: Export/load means the app is down for the whole transfer of 1 TB.",
      "Wrong: Migrate for Compute Engine moves VMs, not databases.",
      "Wrong: Datastream replicates to other services; homogeneous DB migration is DMS's role.",
      "Correct: DMS continuous migration to Cloud SQL minimizes downtime."
    ]
  },
  {
    "id": 75,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "Your organization is running a Firestore-backed Firebase app that serves the same top ten news stories on a daily basis to a large global audience. You want to optimize content delivery while decreasing cost and latency. What should you do?",
    "options": [
      "A. Enable serializable isolation in the Firebase app.",
      "B. Deploy a US multi-region Firestore location.",
      "C. Build a Firestore bundle, and deploy bundles to Cloud CDN.",
      "D. Create a Firestore index on the news story date."
    ],
    "correct": 2,
    "explanation": "Firestore bundles let you package the top stories once and serve them from Cloud CDN — cheaper reads and lower global latency than per-client Firestore reads.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C. Must decrease cost and latency. Creating or deploying anything would likely cost more, so eliminate B and D. That leaves A and C. A global audience strongly suggests serving content via Google’s Content Delivery Network. Changing the isolation level won’t decrease cost or latency, so C is the best answer. (6 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: C. I'll go for C (3 votes)"
      },
      {
        "user": "learnazureportal",
        "text": "The correct answer is B ==>B. Deploy a US multi-region Firestore location. (1 vote)"
      },
      {
        "user": "pk349",
        "text": "C: Build a Firestore bundle, and deploy bundles to Cloud *** CDN. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 75,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — bundles on CDN is the documented optimization for shared hot content.",
    "conceptSummary": "Serve shared daily content via Firestore bundles on Cloud CDN.",
    "correctRationale": "Because every user reads the same ten stories, bundling them once per day and caching the bundle on Cloud CDN replaces millions of per-user Firestore reads with cheap CDN hits worldwide — cutting cost and latency simultaneously.",
    "optionRationales": [
      "Wrong: Serializable isolation affects transaction semantics, not delivery cost/latency.",
      "Wrong: A multi-region location improves Firestore availability but not per-read delivery cost.",
      "Correct: Firestore bundle + Cloud CDN is the documented pattern for this exact hot-content case.",
      "Wrong: An index does not reduce per-client reads or latency for static shared content."
    ]
  },
  {
    "id": 74,
    "topic": "Migration",
    "difficulty": 3,
    "question": "You want to migrate your PostgreSQL database from another cloud provider to Cloud SQL. You plan on using Database Migration Service and need to assess the impact of any known limitations. What should you do? (Choose two.)",
    "options": [
      "A. Identify whether the database has over 512 tables.",
      "B. Identify all tables that do not have a primary key.",
      "C. Identity all tables that do not have at least one foreign key.",
      "D. Identify whether the source database is encrypted using pgcrypto extension.",
      "E. Identify whether the source database uses customer-managed encryption keys (CMEK)."
    ],
    "correct": [
      1,
      4
    ],
    "explanation": "DMS PostgreSQL known limitations: tables without primary keys only get their snapshot and INSERTs captured, and source databases encrypted with CMEK cannot be migrated if DMS lacks key access.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: BE. https://cloud.google.com/database-migration/docs/postgres/known-limitations (8 votes)"
      },
      {
        "user": "examprof",
        "text": "From this link (https://cloud.google.com/database-migration/docs/postgres/known-limitations), correct answers should be B and D. Excerpts supporting these choices: \"For tables that don't have primary keys, Database Migration Service supports migration of the initial snapshot and INSERT statements during the change data capture (CDC) phase. You should migrate UPDATE and DELETE statements manually.\" \"If encrypted databases require customer-managed encryption keys to decrypt the databases, and if Database Migration Service doesn't have access to the keys, then the databases can't be migrated. However, if customer data is encrypted by the pgcrypto extension, then the data can b… (5 votes)"
      },
      {
        "user": "pk349",
        "text": "B: Identify all tables that do not have a ***** primary key. Tables in databases that don't have a primary key aren't migrated automatically by Database Migration Service. You must manually migrate them. The Migrating tables without a primary key section outlines different strategies. E: Identify whether the source database uses customer-managed encryption ***** keys (CMEK). (3 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "B, E. A is irrelevant. So is C. Cloud SQL supports the pgcrypto extension so that’s also irrelevant. That leaves B and E. The link provided by chelbsik is spot on. (3 votes)"
      },
      {
        "user": "DBA03",
        "text": "Selected Answer: BD. PKs (needed) and pgcrypto extension (confirm if enabled) to assess limitations during migration (3 votes)"
      },
      {
        "user": "rglearn",
        "text": "Selected Answer: BE. If encrypted databases require customer-managed encryption keys to decrypt the databases, and if Database Migration Service doesn't have access to the keys, then the databases can't be migrated. However, if customer data is encrypted by the pgcrypto extension, then the data can be migrated with Database Migration Service (because Cloud SQL supports the extension). (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 74,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B+E — missing primary keys limit CDC to snapshot+INSERTs and CMEK-encrypted sources can't migrate without key access; pgcrypto is supported so D is out.",
    "conceptSummary": "DMS PostgreSQL limitations: missing primary keys and CMEK-encrypted sources.",
    "correctRationale": "The DMS known-limitations doc states tables without primary keys migrate only their snapshot plus INSERTs (no UPDATE/DELETE CDC), and databases encrypted with customer-managed keys cannot be migrated if DMS has no key access — both need assessing before migration. pgcrypto-encrypted data migrates fine because Cloud SQL supports the extension.",
    "optionRationales": [
      "Wrong: A 512-table count is not a DMS limitation.",
      "Correct: Tables without primary keys only get snapshot + INSERTs — a documented limitation to assess.",
      "Wrong: Foreign keys are not a documented blocking limitation.",
      "Wrong: pgcrypto-encrypted data does migrate — Cloud SQL supports the extension, so it is not a limitation.",
      "Correct: CMEK-encrypted source databases can't be migrated if DMS lacks key access — a documented limitation."
    ]
  },
  {
    "id": 73,
    "topic": "Database Selection",
    "difficulty": 1,
    "question": "Your company is developing a new global transactional application that must be ACID-compliant and have 99.999% availability. You are responsible for selecting the appropriate Google Cloud database to serve as a datastore for this new application. What should you do?",
    "options": [
      "A. Use Firestore.",
      "B. Use Cloud Spanner.",
      "C. Use Cloud SQL.",
      "D. Use Bigtable."
    ],
    "correct": 1,
    "explanation": "ACID transactions plus 99.999% availability SLA is multi-region Cloud Spanner.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. 99,999% availability and global - it's either Spanner or Firestore, but 'transactional' eliminates Firestore (9 votes)"
      },
      {
        "user": "Alfred_Magno",
        "text": "Cloud SQL Enterprise Plus edition with high availability (HA)>=99.99% Cloud SQL Enterprise edition with high availability (HA)>=99.95% Cloud Spanner - Multi-Regional Instance >= 99.999% Cloud Spanner - Regional Instance >= 99.99% Firestore Multi-Region >= 99.999% Firestore Regional >= 99.99% Cloud Bigtable - Zonal instance (single cluster) >= 99.9% The key is transactional because spanner and firestore covers global and 99.999 , just spanner covers transactional (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 73,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B per the SLA comparison.",
    "conceptSummary": "ACID + 99.999% availability → Cloud Spanner.",
    "correctRationale": "Only Spanner pairs strong ACID transactions with a multi-region 99.999% SLA; Cloud SQL tops out lower (99.95–99.99%) and Firestore/Bigtable are not the ACID transactional fit for this requirement.",
    "optionRationales": [
      "Wrong: Firestore offers high availability but is not the ACID transactional datastore implied.",
      "Correct: Multi-region Spanner is the only option delivering ACID + 99.999%.",
      "Wrong: Cloud SQL HA reaches at most 99.99% (Enterprise Plus).",
      "Wrong: Bigtable is NoSQL without ACID transactions."
    ]
  },
  {
    "id": 72,
    "topic": "Monitoring & Performance",
    "difficulty": 2,
    "question": "Your organization stores marketing data such as customer preferences and purchase history on Bigtable. The consumers of this database are predominantly data analysts and operations users. You receive a service ticket from the database operations department citing poor database performance between 9 AM-10 AM every day. The application team has confirmed no latency from their logs. A new cohort of pilot users that is testing a dataset loaded from a third-party data provider is experiencing poor database performance. Other users are not affected. You need to troubleshoot the issue. What should you do?",
    "options": [
      "A. Isolate the data analysts and operations user groups to use different Bigtable instances.",
      "B. Check the Cloud Monitoring table/bytes_used metric from Bigtable.",
      "C. Use Key Visualizer for Bigtable.",
      "D. Add more nodes to the Bigtable cluster."
    ],
    "correct": 2,
    "explanation": "A small cohort with degraded performance on newly loaded data points to key hotspotting — Key Visualizer is the documented first troubleshooting step.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: C. First step of performance troubleshooting is to use Key Visualizer https://cloud.google.com/bigtable/docs/performance#troubleshooting (8 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. The test data set is likely to have poor row key design. When loaded into the database, that data is probably hitting the same node and causing a hot spot. Addng more nodes will not solve a hot spot. Eliminate D. Neither will creating a new instance (A). B might be of interest, but is not the primary tool to diagnose Bigtable performance problems. For that, use Key Visualizer. Best answer is C. https://cloud.google.com/bigtable/docs/keyvis-overview (7 votes)"
      },
      {
        "user": "pk349",
        "text": "B: Check the Cloud Monitoring table/bytes_used *** metric from Bigtable. Read throughput The number of bytes per second of response data sent. This metric refers to the full amount of data that is returned after filters are applied. Write throughput The number of bytes per second that were received when data was written. (1 vote)"
      },
      {
        "user": "chelbsik",
        "text": "Where did you get that from? table/bytes_used - Amount of compressed data stored in a table. Sampled every 60 seconds. After sampling, data is not visible for up to 120 seconds. https://cloud.google.com/bigtable/docs/metrics#:~:text=Bigtable%20application%20profile.-,table/bytes_used,-GA%0AData%20stored (1 vote)"
      },
      {
        "user": "dija123",
        "text": "Selected Answer: C. Agree with Key Visualizer (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 72,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — Key Visualizer is the documented first step for Bigtable performance troubleshooting.",
    "conceptSummary": "Diagnose Bigtable hotspotting with Key Visualizer.",
    "correctRationale": "Poor performance isolated to users of a newly loaded dataset suggests a hotspot from bad row-key design. Bigtable's documented first troubleshooting tool is Key Visualizer, which shows access patterns per key range.",
    "optionRationales": [
      "Wrong: Splitting analysts onto separate instances is a workaround, not a diagnosis, and the app team reports no latency.",
      "Wrong: bytes_used shows storage size, not access hotspots.",
      "Correct: Key Visualizer visualizes read/write distribution across key ranges — the documented hotspotting diagnostic.",
      "Wrong: Nodes help capacity, not a hotspot concentrated on one key range."
    ]
  },
  {
    "id": 71,
    "topic": "Replication & Read Replicas",
    "difficulty": 2,
    "question": "Your organization has a busy transactional Cloud SQL for MySQL instance. Your analytics team needs access to the data so they can build monthly sales reports. You need to provide data access to the analytics team without adversely affecting performance. What should you do?",
    "options": [
      "A. Create a read replica of the database, provide the database IP address, username, and password to the analytics team, and grant read access to required tables to the team.",
      "B. Create a read replica of the database, enable the cloudsql.iam_authentication flag on the replica, and grant read access to required tables to the analytics team.",
      "C. Enable the cloudsql.iam_authentication flag on the primary database instance, and grant read access to required tables to the analytics team.",
      "D. Provide the database IP address, username, and password of the primary database instance to the analytics, team, and grant read access to required tables to the team."
    ],
    "correct": 1,
    "explanation": "Offload analytics to a read replica and enable cloudsql.iam_authentication on the replica (it is not inherited from the primary) for IAM-managed access.",
    "discussion": [
      {
        "user": "juliorevk",
        "text": "Selected Answer: B. B because while both A and B work, B seems more native and secure since you aren't passing around database authentication passwords. You can also better manage the authentication through Google groups since you're using IAM. (4 votes)"
      },
      {
        "user": "JayGeotab",
        "text": "Selected Answer: A. B will still need grant database privileges to the IAM user where A we can assume they use built-in database authentication and database privileges are already granted (4 votes)"
      },
      {
        "user": "leroygordo",
        "text": "Selected Answer: B. \"Read replicas do not have the cloudsql.iam_authentication flag enabled automatically when it is enabled on the primary instance.\" https://cloud.google.com/sql/docs/postgres/replication/create-replica#configure_iam_replicas (3 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: B. You can enable IAM database authentication on an instance using the cloudsql.iam_authentication flag. Once you enable this flag, the instance enables logins from accounts that are configured for IAM database authentication. (2 votes)"
      },
      {
        "user": "blathul",
        "text": "Selected Answer: B. B offers a balance between providing data access to the analytics team and maintaining the performance of the busy transactional Cloud SQL instance. (2 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. https://cloud.google.com/sql/docs/mysql/authentication#instance_configuration_for (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 71,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B — the replica flag is not inherited, so it must be enabled on the replica explicitly.",
    "conceptSummary": "Analytics on a read replica with IAM DB authentication enabled on the replica.",
    "correctRationale": "A read replica removes analytics load from the busy primary. Because cloudsql.iam_authentication is not enabled automatically on replicas even when set on the primary, enabling it on the replica gives clean IAM-based access with table-level read grants — better than handing out passwords.",
    "optionRationales": [
      "Wrong: Works but shares database passwords — weaker security than IAM authentication.",
      "Correct: Replica + IAM auth flag on the replica offloads analytics with managed identity access.",
      "Wrong: Enabling IAM auth on the primary still leaves analytics on the busy primary.",
      "Wrong: Sending analytics to the primary with passwords hurts performance and security."
    ]
  },
  {
    "id": 70,
    "topic": "Capacity Planning & Cost",
    "difficulty": 2,
    "question": "You work for a financial services company that wants to use fully managed database services. Traffic volume for your consumer services products has increased annually at a constant rate with occasional spikes around holidays. You frequently need to upgrade the capacity of your database. You want to use Cloud Spanner and include an automated method to increase your hardware capacity to support a higher level of concurrency. What should you do?",
    "options": [
      "A. Use linear scaling to implement the Autoscaler-based architecture",
      "B. Use direct scaling to implement the Autoscaler-based architecture.",
      "C. Upgrade the Cloud Spanner instance on a periodic basis during the scheduled maintenance window.",
      "D. Set up alerts that are triggered when Cloud Spanner utilization metrics breach the threshold, and then schedule an upgrade during the scheduled maintenance window."
    ],
    "correct": 0,
    "explanation": "Steady annual growth with occasional spikes is the gradual-load pattern the Spanner Autoscaler's linear scaling method is designed for.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. An automated method eliminates C and D. Autoscaler is the way to go. Autoscaler has 3 scaling methods. Stepwise, linear and direct. From Google’s documentation: Stepwise - Stepwise scaling is useful for workloads that have small or multiple peaks. Linear - Linear scaling is best used with load patterns that change more gradually or have a few large peaks. Direct - Direct scaling provides an immediate increase in capacity. A is the obvious answer. https://cloud.google.com/spanner/docs/autoscaling-overview (11 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Use linear scaling to implement the Autoscaler-based architecture Linear scaling is best used with load patterns that change more gradually or have a few ***** large peaks. The method calculates the minimum number of nodes or processing units required to keep utilization below the scaling threshold. The number of nodes or processing units added or removed in each scaling event is not limited to a fixed step amount. (3 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: A. Linear Linear scaling is best used with load patterns that change more gradually or have a few large peaks. The method calculates the minimum number of nodes or processing units required to keep utilization below the scaling threshold. The number of nodes or processing units added or removed in each scaling event is not limited to a fixed step amount. https://cloud.google.com/spanner/docs/autoscaling-overview#linear (3 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. https://cloud.google.com/architecture/autoscaling-cloud-spanner#linear (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 70,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A per the Spanner Autoscaler documentation (linear = gradual changes / few peaks).",
    "conceptSummary": "Spanner Autoscaler: linear scaling for gradually changing load with few peaks.",
    "correctRationale": "The Autoscaler offers stepwise, linear and direct methods; Google's doc describes linear scaling as best for loads that change gradually or have a few large peaks — matching constant annual growth plus holiday spikes — and it is automated, unlike the scheduled/manual options.",
    "optionRationales": [
      "Correct: Linear scaling automatically adjusts capacity for gradual growth and occasional spikes.",
      "Wrong: Direct scaling is intended for batch/scheduled workloads with sharp, predictable boundaries.",
      "Wrong: Periodic manual upgrades are not an automated method and lag demand.",
      "Wrong: Alert-then-schedule is still manual and delayed."
    ]
  },
  {
    "id": 69,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "Your hotel booking company is expanding into Country A, where personally identifiable information (PII) must comply with regional data residency requirements and audits. You need to isolate customer data in Country A from the rest of the customer data. You want to design a multi-tenancy strategy to efficiently manage costs and operations. What should you do?",
    "options": [
      "A. Apply a schema data management pattern.",
      "B. Apply an instance data management pattern.",
      "C. Apply a table data management pattern.",
      "D. Apply a database data management pattern."
    ],
    "correct": 1,
    "explanation": "Residency isolation at country granularity can only be enforced at the instance level (region is chosen per instance), so an instance-per-tenant pattern isolates Country A.",
    "discussion": [
      {
        "user": "openkg",
        "text": "Selected Answer: B. I think B is the correct one.https://cloud.google.com/solutions/implementing-multi-tenancy-cloud-spanner#multi-tenancy-data-management-patterns (6 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "B. From the question, it appears the multi-tenancy solution needs to be multi-regional. That suggests Spanner as the database platform. Within a multi-region instance, you cannot place a database into a specific region (D). The same is also true for a table (C) and a schema (A). That leaves B. Makes sense that you would have an instance specific to a given region to comply with the data residency requirements. Even if you did this with Cloud SQL - using the same database/schema/table design everywhere, you would still need to deploy into a specific region to satisfy the data regulations. So B still makes sense. (5 votes)"
      },
      {
        "user": "juliorevk",
        "text": "Selected Answer: B. B because when you deploy a Cloud SQL or Spanner instance you can't specifically target a region at the schema, table, or database levels. You select the region at the instance level. (4 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: D. What is the difference between database and instance? Instance is where the database processing is done (memory, shorting, calculating) and database is where the data is stored. The task here is to isolate the data and keep the logic as simple as possible. So D looks like the best option to me. using one system with 1 instance with 1 set of logic ( views, procedures). But, separate , repeated set of base tables (for each PII) stored physically in different regions (data sets, databases, tablespaces). (3 votes)"
      },
      {
        "user": "SVGoogle89",
        "text": "B https://cloud.google.com/solutions/implementing-multi-tenancy-cloud-spanner (3 votes)"
      },
      {
        "user": "sp57",
        "text": "I think it's B. Summary table at link shows only d. database and b. instance options as having high rating for reg & compliance. Option d. database does not have location flexibility - i.e. can't change location for different tenants, so then 'b.' (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 69,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B — region is an instance-level property, so only instance-per-tenant gives residency isolation.",
    "conceptSummary": "Residency-driven tenant isolation → instance-per-tenant data pattern.",
    "correctRationale": "Region selection happens at instance creation — schemas, tables and databases inside an instance all inherit its locality. To guarantee Country A's data resides in-country for audit, isolate that tenant in its own instance (the instance data-management pattern), while other tenants share the rest.",
    "optionRationales": [
      "Wrong: A schema sits inside an instance and cannot be pinned to a country/region.",
      "Correct: Only the instance level lets you choose residency, giving true data isolation per country.",
      "Wrong: A table has no locality boundary either.",
      "Wrong: A separate database still lives inside the same instance and region as the others."
    ]
  },
  {
    "id": 68,
    "topic": "High Availability & DR",
    "difficulty": 3,
    "question": "Your online delivery business that primarily serves retail customers uses Cloud SQL for MySQL for its inventory and scheduling application. The required recovery time objective (RTO) and recovery point objective (RPO) must be in minutes rather than hours as a part of your high availability and disaster recovery design. You need a high availability configuration that can recover without data loss during a zonal or a regional failure. What should you do?",
    "options": [
      "A. Set up all read replicas in a different region using asynchronous replication.",
      "B. Set up all read replicas in the same region as the primary instance with synchronous replication.",
      "C. Set up read replicas in different zones of the same region as the primary instance with synchronous replication, and set up read replicas in different regions with asynchronous replication.",
      "D. Set up read replicas in different zones of the same region as the primary instance with asynchronous replication, and set up read replicas in different regions with synchronous replication."
    ],
    "correct": 2,
    "explanation": "RPO≈0 against zone loss needs synchronous replicas in other zones of the region; regional DR with minutes RTO needs additional asynchronous cross-region replicas.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. Google’s documentation (https://cloud.google.com/sql/faq) states MySQL read replicas use asynchronous replication. That eliminates B, C and D because they all say to use read replicas with synchronous replication. That leaves A. A states read replicas (plural) in a different region which suggests more than one read replica, each in a different zone. With the primary instance in region A (zone 1) and presumably a failover replica also in region A (zone 2), read replicas in region B (zone 1 and 2) would provide HA in the event of a region or zone failure. (12 votes)"
      },
      {
        "user": "pk349",
        "text": "C: Set up read replicas in different zones *** of the same region as the primary instance with *** synchronous replication, and set up read replicas in different regions with asynchronous replication. (10 votes)"
      },
      {
        "user": "sp57",
        "text": "C is correct answer - see cross-region replica - uses asynch vs synch for replicas in same region. (4 votes)"
      },
      {
        "user": "DBAgain",
        "text": "I'm hung up on the phrase \"without data loss\". There is always a chance for some loss of data with asynchronous replication. However, Cloud SQL doesn't support synchronous replication on read replicas (as others have stated). There are NO VALID ANSWERS provided, and the authors of the question clearly have no idea what they're talking about. (3 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. Where is no such setting as replication type in CloudSQL, and C and D looks like overcomplicated solution. I'll go for A (3 votes)"
      },
      {
        "user": "Teraflow",
        "text": "Selected Answer: C. C is correct answer (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 68,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Community favors C over A. A's async-only cross-region replicas can't deliver minutes-level RPO for zonal failure, while C pairs synchronous zonal replicas with cross-region async replicas.",
    "conceptSummary": "Minutes RTO/RPO: synchronous in-region zonal replicas + asynchronous cross-region replicas.",
    "correctRationale": "Zero-data-loss recovery from a zonal failure requires synchronous replication to standby/replicas in other zones of the same region; surviving a regional failure additionally requires replicas in another region, which are asynchronous for latency reasons — matching option C.",
    "optionRationales": [
      "Wrong: Only cross-region asynchronous replicas means nothing synchronous — the RPO is not minutes-level for zone failure and there's no in-region HA.",
      "Wrong: Same-region-only replicas leave no copy surviving a regional failure.",
      "Correct: Synchronous zonal replicas cover zone loss with no data loss; asynchronous cross-region replicas cover regional DR.",
      "Wrong: Asynchronous in-region replication loses the zero-data-loss property, and synchronous cross-region replication is not how Cloud SQL replicas work — the combination is inverted."
    ]
  },
  {
    "id": 67,
    "topic": "Operations & Maintenance",
    "difficulty": 1,
    "question": "Your company is migrating their MySQL database to Cloud SQL and cannot afford any planned downtime during the month of December. The company is also concerned with cost, so you need the most cost-effective solution. What should you do?",
    "options": [
      "A. Open a support ticket in Google Cloud to prevent any maintenance in that MySQL instance during the month of December.",
      "B. Use Cloud SQL maintenance settings to prevent any maintenance during the month of December.",
      "C. Create MySQL read replicas in different zones so that, if any downtime occurs, the read replicas will act as the primary instance during the month of December.",
      "D. Create a MySQL regional instance so that, if any downtime occurs, the standby instance will act as the primary instance during the month of December."
    ],
    "correct": 1,
    "explanation": "Cloud SQL maintenance deny periods (up to 90 days) block maintenance through December at zero extra cost.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "B. You don’t open a support ticket to prevent maintenance on a managed Cloud SQL instance. Eliminate A. C and D both involve additional costs which the question says is a concern. That leaves B. In Maintenance - Advanced Options you can define a maintenance deny period which can be up to 90 days. So B is the right answer. (7 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. CloudSQL - Edit instance - Maintenance: Deny maintenance period You can deny upcoming maintenance by creating a deny period, which can last up to 90 days. You can only have one deny period in effect at a time. (3 votes)"
      },
      {
        "user": "pk349",
        "text": "B: Use Cloud SQL maintenance settings to prevent *** any maintenance during the month of December. (1 vote)"
      },
      {
        "user": "Boumer",
        "text": "Answer B https://cloud.google.com/sql/docs/mysql/maintenance?hl=fr (1 vote)"
      },
      {
        "user": "887ad17",
        "text": "Selected Answer: B. not C and D because its not cost-effective solution (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 67,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B — the 90-day deny period is the cost-free mechanism.",
    "conceptSummary": "Block Cloud SQL maintenance with a maintenance deny period.",
    "correctRationale": "The maintenance settings allow a deny period of up to 90 days — free and purpose-built for freezing maintenance during December. Replicas or HA only add cost.",
    "optionRationales": [
      "Wrong: You cannot file tickets to block managed maintenance.",
      "Correct: The maintenance deny period blocks December maintenance for free.",
      "Wrong: Extra replicas cost money and don't stop maintenance.",
      "Wrong: An HA standby costs money and doesn't stop maintenance either."
    ]
  },
  {
    "id": 66,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "You are designing a database architecture for a global application that stores information about public parks worldwide. The application uses the database for read-only purposes, and a centralized batch job updates the database nightly. You want to select an open source, SQL-compliant database. What should you do?",
    "options": [
      "A. Use Bigtable with multi-region clusters.",
      "B. Use Memorystore for Redis with multi-zones within a region.",
      "C. Use Cloud SQL for PostgreSQL with cross-region replicas.",
      "D. Use Cloud Spanner with multi-region configuration."
    ],
    "correct": 2,
    "explanation": "An open-source, SQL-compliant engine means PostgreSQL; for a read-mostly global app, Cloud SQL for PostgreSQL with cross-region replicas serves reads locally at lower cost.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C. Bigtable doesn’t support SQL. Eliminate A. Even if Memorystore could scale, B says single region. Eliminate B. Cloud Spanner supports Google Standard SQL and PostgreSQL dialects. That’s not the same thing as a natively open source database. Eliminate D. That leaves C. (5 votes)"
      },
      {
        "user": "gcp_k",
        "text": "D. It says global application, open source and sql compliant, why not Cloud Spanner? Cloud SQL for PostgreSQL is the best if the question did not mention \"global application\" .. With Cloud SQL for PostgreSQL, you cannot reach the global audience. the latency will be terrible. (3 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: C. I'll go for C (3 votes)"
      },
      {
        "user": "dija123",
        "text": "According to gemini: While Cloud Spanner is a powerful globally distributed database, it might be overkill for a read-only application with nightly updates. It's also generally more complex to manage compared to Cloud SQL. (2 votes)"
      },
      {
        "user": "gcp_k",
        "text": "Plus Cloud Spanner offers Postgres - opensource version. So it checks that box too. (2 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: C. C. PostgreSQL is a real open source RDBMS (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 66,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for C — open-source SQL points to PostgreSQL; the few Spanner votes ignore the open-source and cost cues.",
    "conceptSummary": "Open-source SQL, global read-only → Cloud SQL PostgreSQL + cross-region replicas.",
    "correctRationale": "PostgreSQL is the open-source SQL engine, and with writes only in a nightly central batch plus read-only global use, Cloud SQL with cross-region read replicas is the fitting, lower-cost choice; Spanner's proprietary dialect and cost are unnecessary here.",
    "optionRationales": [
      "Wrong: Bigtable is not SQL-compliant.",
      "Wrong: Memorystore is a cache, not a durable database, and is confined to one region.",
      "Correct: Cloud SQL for PostgreSQL is open-source and SQL-compliant; cross-region replicas serve global reads.",
      "Wrong: Spanner is not open-source and is overkill for read-only + nightly batch updates."
    ]
  },
  {
    "id": 65,
    "topic": "Monitoring & Performance",
    "difficulty": 2,
    "question": "Your retail organization is preparing for the holiday season. Use of catalog services is increasing, and your DevOps team is supporting the Cloud SQL databases that power a microservices-based application. The DevOps team has added instrumentation through Sqlcommenter. You need to identify the root cause of why certain microservice calls are failing. What should you do?",
    "options": [
      "A. Watch Query Insights for long running queries.",
      "B. Watch the Cloud SQL instance monitor for CPU utilization metrics.",
      "C. Watch the Cloud SQL recommenders for overprovisioned instances.",
      "D. Watch Cloud Trace for application requests that are failing."
    ],
    "correct": 3,
    "explanation": "Sqlcommenter tags ORM queries with application context and feeds Cloud Trace, so watching Cloud Trace for failing application requests pinpoints which microservice call is failing.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. Cloud Trace doesn’t support Cloud SQL. Eliminate D. Cloud SQL recommenders for overprovisioned instances would tell you about Cloud SQL instances which are too large for their workload. Eliminate C. Monitoring CPU utilization wouldn’t tell you why microservice calls are failing. Eliminate B. SQLcommenter integrates with Query Insights. So A is the best answer. https://cloud.google.com/blog/topics/developers-practitioners/introducing-sqlcommenter-open-source-orm-auto-instrumentation-library (8 votes)"
      },
      {
        "user": "DBAgain",
        "text": "Selected Answer: D. https://cloud.google.com/blog/topics/developers-practitioners/introducing-sqlcommenter-open-source-orm-auto-instrumentation-library (6 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. I'll go for A (4 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Watch Query Insights for long running queries. Sqlcommenter is an open source library that enables ORMs to augment SQL statements before execution, with comments containing information about the code that caused its execution. This helps in easily correlating slow queries with source code and giving insights into backend database performance. In short, it provides observability into the state of client-side applications and their impact on database performance. Application developers need to do very little application code change to enable Sqlcommenter for their applications using ORMs. Observability information from Sqlcommenter can be used by application developers directly using slo… (3 votes)"
      },
      {
        "user": "learnazureportal",
        "text": "D - To diagnose and address application-level issues, monitoring at the application request level (Option D) is the appropriate choice. (3 votes)"
      },
      {
        "user": "hussain.sain",
        "text": "Selected Answer: D. Cloud Trace does not automatically support Cloud SQL, meaning it won't natively track latency or errors within Cloud SQL queries without additional instrumentation. Cloud Trace can provide comprehensive tracing of application requests, but for Cloud SQL queries to be included, explicit instrumentation is needed, typically via tools like Sqlcommenter. Cloud Trace should be able to include latency data for SQL queries. This setup helps team see the impact of database performance on the overall application performance. This helps in identifying the root cause of microservice call failures. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 65,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Community favors D (Cloud Trace via sqlcommenter) over A (Query Insights). The loaded answer is D: the question asks why microservice calls fail, and sqlcommenter was added to correlate queries with application traces.",
    "conceptSummary": "Sqlcommenter + Cloud Trace to attribute failing requests to microservice calls.",
    "correctRationale": "The point of instrumenting with Sqlcommenter is to correlate database queries with application traces. Cloud Trace shows failing application requests end-to-end and, with sqlcommenter, the related SQL — identifying which microservice calls fail.",
    "optionRationales": [
      "Wrong: Query Insights finds slow queries, not failing microservice requests.",
      "Wrong: CPU metrics say nothing about which calls fail.",
      "Wrong: Recommenders flag overprovisioned instances, not failing calls.",
      "Correct: Sqlcommenter exists to tie queries to traces; Cloud Trace surfaces the failing application requests."
    ]
  },
  {
    "id": 64,
    "topic": "Security & IAM",
    "difficulty": 1,
    "question": "You are configuring a new application that has access to an existing Cloud Spanner database. The new application reads from this database to gather statistics for a dashboard. You want to follow Google-recommended practices when granting Identity and Access Management (IAM) permissions. What should you do?",
    "options": [
      "A. Reuse the existing service account that populates this database.",
      "B. Create a new service account, and grant it the Cloud Spanner Database Admin role.",
      "C. Create a new service account, and grant it the Cloud Spanner Database Reader role.",
      "D. Create a new service account, and grant it the spanner.databases.select permission."
    ],
    "correct": 2,
    "explanation": "Least-privilege read-only dashboard access = a new service account with the Cloud Spanner Database Reader role.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: C. spanner.database.select is not enough, you also need a spanner.database.read which is included in Cloud Spanner Database Reader role (7 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. A new application should have its own service account. Eliminate A. The Admin role is too broad. Eliminate B. D grants an individual permission not a role. Granting permissions in IAM is done via a role. From Google’s documentation: “In IAM, permission to access a resource isn't granted directly to the end user. Instead, permissions are grouped into roles, and roles are granted to authenticated principals.” https://cloud.google.com/iam/docs/overview (4 votes)"
      },
      {
        "user": "Tharun1125438",
        "text": "Selected Answer: B. Google Recommended practice is to assign roles but not permissions directly. SO, C (2 votes)"
      },
      {
        "user": "theseawillclaim",
        "text": "Selected Answer: C. A is nonsense. Admin is too much, select is not enough. C is the one. (2 votes)"
      },
      {
        "user": "whoosh",
        "text": "Selected Answer: C. Option C is correct. Here is why: spanner.admin God-tier control over everything Full CRUD & DDL for instances, databases, users, policies Manage entire Cloud Spanner environment spanner.databaseAdmin Database master control Full CRUD & DDL for databases, users, policies Create, manage, and secure databases spanner.databaseUser Power user with data rights Full CRUD & DDL for specified databases Read, write, modify data, manage database schema spanner.databaseReader Curious but hands-off observer Read-only access and query execution Analyze data without manipulation spanner.viewer Peeping Tom (metaphorically speaking) View instances, databases, and users Monitor Cloud Spanner m… (1 vote)"
      },
      {
        "user": "Ayush9596",
        "text": "Service account task Required permissions Read data spanner.databases.select spanner.sessions.create spanner.sessions.delete (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 64,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — dedicated SA + reader role.",
    "conceptSummary": "Least-privilege Spanner read access via a dedicated service account + Database Reader role.",
    "correctRationale": "A dedicated service account per application plus the Database Reader role is the Google-recommended pattern: individual permissions are not granted directly, Admin is excessive, and reusing the writer account breaks separation of duties.",
    "optionRationales": [
      "Wrong: Reusing the population account gives the app write privileges it does not need.",
      "Wrong: Admin grants far more than read.",
      "Correct: Dedicated service account + Database Reader = least privilege for a read-only dashboard.",
      "Wrong: IAM grants roles, not individual permissions; select alone is also insufficient without sessions/read."
    ]
  },
  {
    "id": 63,
    "topic": "Capacity Planning & Cost",
    "difficulty": 2,
    "question": "Your organization has an existing app that just went viral. The app uses a Cloud SQL for MySQL backend database that is experiencing slow disk performance while using hard disk drives (HDDs). You need to improve performance and reduce disk I/O wait times. What should you do?",
    "options": [
      "A. Export the data from the existing instance, and import the data into a new instance with solid-state drives (SSDs).",
      "B. Edit the instance to change the storage type from HDD to SSD.",
      "C. Create a high availability (HA) failover instance with SSDs, and perform a failover to the new instance.",
      "D. Create a read replica of the instance with SSDs, and perform a failover to the new instance"
    ],
    "correct": 0,
    "explanation": "Storage type is fixed at instance creation, so migrating to a new SSD-backed instance via export/import is the path to SSD performance.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. You can't edit disk time, this setting is permanent. https://stackoverflow.com/questions/72034607/can-i-change-storage-type-from-hdd-to-ssd-on-cloud-sql-after-creating-an-instanc You also can't choose disk type for read replica. (9 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. B would not work. You cannot change the disk type of the instance after it’s created. C is wrong for the same reason. Adding HA would create a failover replica with the same disk type as the primary. The same is true for a read replica, so D is wrong as well. Leaves A. (5 votes)"
      },
      {
        "user": "pk349",
        "text": "C: Create a high availability (HA) failover instance with SSDs, *** and perform a failover to the new instance. (3 votes)"
      },
      {
        "user": "PrtkKA",
        "text": "Selected Answer: A. Switch between SSD and HDD storage When you create a Cloud SQL instance, your choice of SSD or HDD storage for the instance is permanent. If you need to convert an existing HDD instance to SSD, or conversely, you can export the data from the existing instance and import the data into a new instance. Keep in mind that migrating an entire instance takes time. https://cloud.google.com/sql/docs/mysql/choosing-ssd-hdd (2 votes)"
      },
      {
        "user": "csrazdan",
        "text": "When a read replica is created you do not configure the disk type and it is used as it is on primary to avoid replication errors. That is the reason A is the correct answer. See link --> https://cloud.google.com/sql/docs/mysql/replication/create-replica (2 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: A. The choice of SSD or HDD storage for the instance is not available. It should be is done manually. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 63,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A — disk type is immutable and replicas inherit it, leaving rebuild-on-SSD as the only route.",
    "conceptSummary": "Change Cloud SQL storage type by rebuilding on SSD via export/import.",
    "correctRationale": "You cannot edit the storage type of an existing Cloud SQL instance, and replicas/standby inherit the primary's disk type — so the only route to SSD is exporting the data and importing it into a new instance provisioned with SSD.",
    "optionRationales": [
      "Correct: Export + import into a new SSD instance is the supported path since disk type is immutable.",
      "Wrong: Storage type cannot be edited after creation.",
      "Wrong: An HA standby inherits the primary's disk type — it would also be HDD.",
      "Wrong: A read replica likewise inherits the source's storage type, and you can't choose SSD for it."
    ]
  },
  {
    "id": 62,
    "topic": "Security & IAM",
    "difficulty": 1,
    "question": "Your organization has a security policy to ensure that all Cloud SQL for PostgreSQL databases are secure. You want to protect sensitive data by using a key that meets specific locality or residency requirements. Your organization needs to control the key's lifecycle activities. You need to ensure that data is encrypted at rest and in transit. What should you do?",
    "options": [
      "A. Create the database with Google-managed encryption keys.",
      "B. Create the database with customer-managed encryption keys.",
      "C. Create the database persistent disk with Google-managed encryption keys.",
      "D. Create the database persistent disk with customer-managed encryption keys."
    ],
    "correct": 1,
    "explanation": "Customer-managed encryption keys give key-locality and lifecycle control, chosen at the Cloud SQL instance level.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "B. Having greater control over EK means use CMEK. That eliminates A and C. When creating a Cloud SQL instance you get to choose the encryption method at the instance level, which would include databases. That makes D not make sense. So it’s B. (4 votes)"
      },
      {
        "user": "pk349",
        "text": "B: Create the database with customer-managed encryption keys. How do you create a customer managed key? In the navigation pane, choose Customer managed keys. Choose Create key. To create a symmetric encryption KMS key, for Key type choose Symmetric. For information about how to create an asymmetric KMS key in the AWS KMS console, see Creating asymmetric KMS keys (console). (3 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. Despite that you select CMEK in the Storage section, it says: This instance is encrypted with a Google-managed key by default. If you need to manage your encryption, you can use a customer-managed key instead. Also, you don't need to create persistent disk, google does that. (2 votes)"
      },
      {
        "user": "887ad17",
        "text": "Selected Answer: B. Create the Cloud SQL instance with CMEK: When creating the Cloud SQL instance, specify the KMS key to be used for encryption. You can do this via the Google Cloud Console, gcloud command-line tool, or the Cloud SQL Admin API. (1 vote)"
      },
      {
        "user": "DPonly",
        "text": "Selected Answer: B. This is better option \"database with customer-managed encryption keys\" (1 vote)"
      },
      {
        "user": "chelbsik",
        "text": "https://cloud.google.com/sql/docs/postgres/configure-cmek#createcmekinstance (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 62,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B — CMEK is the only option granting key custody.",
    "conceptSummary": "Key custody/lifecycle control → CMEK on the Cloud SQL instance.",
    "correctRationale": "Only CMEK lets the organization control key location and lifecycle. In Cloud SQL, CMEK is selected at instance creation and covers the instance's data at rest; transit is covered by TLS.",
    "optionRationales": [
      "Wrong: Google-managed keys give no customer control over key lifecycle/locality.",
      "Correct: CMEK on the instance satisfies locality and lifecycle control.",
      "Wrong: Google-managed disk keys are still Google-managed.",
      "Wrong: CMEK is configured at the instance level for Cloud SQL, not directly on the persistent disk."
    ]
  },
  {
    "id": 61,
    "topic": "Backup & Recovery",
    "difficulty": 1,
    "question": "You are running a transactional application on Cloud SQL for PostgreSQL in Google Cloud. The database is running in a high availability configuration within one region. You have encountered issues with data and want to restore to the last known pristine version of the database. What should you do?",
    "options": [
      "A. Create a clone database from a read replica database, and restore the clone in the same region.",
      "B. Create a clone database from a read replica database, and restore the clone into a different zone.",
      "C. Use the Cloud SQL point-in-time recovery (PITR) feature. Restore the copy from two hours ago to a new database instance.",
      "D. Use the Cloud SQL database import feature. Import last week's dump file from Cloud Storage."
    ],
    "correct": 2,
    "explanation": "Restoring to a timestamp just before the data issue via PITR recovers the last known good state to a new instance.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: C. I'll go for C (6 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. An HA configuration means a primary instance and a failover replica instance. There is no read replica unless you specifically create one. Hence, A and B are wrong. D is wrong since the question doesn’t mention logical backups, whereas an HA configuration would have automatic (physical) backups enabled. A PIT restore is the only answer here. (5 votes)"
      },
      {
        "user": "pk349",
        "text": "C: Use the Cloud SQL point-in-time recovery *** (PITR) feature. Restore the copy from two hours ago to a new database instance. Point-in-time recovery allows you to recover an instance to a specific point in time. For example, if an operator 'fat finger' error causes a loss of data you can recover a database to the state it was just before the error occurred. (1 vote)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: C. Logical corruption like deleted records will be pushed to the read replica. Using import/export from last week is slow for large scale databases and will restore database from last week. So C - restoring using point in time option - is ok. (1 vote)"
      },
      {
        "user": "zanhsieh",
        "text": "Selected Answer: D. D. PITR always restore to a **NEW** db instance, but the question does not ask to change the application configuration. (1 vote)"
      },
      {
        "user": "zanhsieh",
        "text": "https://cloud.google.com/sql/docs/postgres/backup-recovery/restore#tips-pitr (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 61,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — replicas carry the same corruption and a week-old import is stale.",
    "conceptSummary": "Recover to last-known-good state with Cloud SQL PITR.",
    "correctRationale": "PITR replays transaction logs to a chosen timestamp — ideal for recovering from a data issue at a known-good point. Cloning a replica copies the same corrupted data, and last week's dump is stale.",
    "optionRationales": [
      "Wrong: The replica holds the same (corrupted) data; also 'restore a clone' is not a thing — a clone is a new instance.",
      "Wrong: Same corruption problem plus an unnecessary zone change.",
      "Correct: PITR to a timestamp before the issue restores the pristine version.",
      "Wrong: A week-old dump loses a week of transactions — much more data loss than PITR."
    ]
  },
  {
    "id": 60,
    "topic": "High Availability & DR",
    "difficulty": 2,
    "question": "You are configuring a brand new Cloud SQL for PostgreSQL database instance in Google Cloud. Your application team wants you to deploy one primary instance, one standby instance, and one read replica instance. You need to ensure that you are following Google-recommended practices for high availability. What should you do?",
    "options": [
      "A. Configure the primary instance in zone A, the standby instance in zone C, and the read replica in zone B, all in the same region.",
      "B. Configure the primary and standby instances in zone A and the read replica in zone B, all in the same region.",
      "C. Configure the primary instance in one region, the standby instance in a second region, and the read replica in a third region.",
      "D. Configure the primary, standby, and read replica instances in zone A, all in the same region."
    ],
    "correct": 0,
    "explanation": "HA keeps primary and standby in the same region but different zones; best practice spreads the read replica into a third zone of that region too.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. Cloud SQL is a regional service so the primary and standby instances must be in the same region. A recommended practice would have them in different zones. A read replica could be in a different region, but that option isn’t offered probably because it would be too far away from the user base. Having it in a different zone from the primary and standby instances is therefore the best and only answer. (9 votes)"
      },
      {
        "user": "pk349",
        "text": "The HA configuration provides data redundancy. A Cloud SQL instance configured for HA is also called a regional instance and has a primary and secondary zone within the configured region. Within a regional instance, the configuration is made up of a primary instance and a standby instance. Through synchronous replication to each zone's persistent disk, all writes made to the primary instance are replicated to disks in both zones before a transaction is reported as committed. In the event of an instance or zone failure, the standby instance becomes the new primary instance. Users are then rerouted to the new primary instance. This process is called a failover. (3 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. HA standby instance can't be located in different region, and Google recommends to use different zones for all three, so answer is A https://cloud.google.com/sql/docs/postgres/high-availability#failover-overview (3 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Configure the primary instance in zone A, the standby instance in zone C, and the read replica in zone B, all in the same region. (3 votes)"
      },
      {
        "user": "887ad17",
        "text": "Selected Answer: A. A. Configure the primary instance in zone A, the standby instance in zone C, and the read replica in zone B, all in the same region. This option follows Google-recommended practices for high availability by distributing the instances across multiple zones within the same region. This setup ensures that: The primary instance and standby instance are in different zones, providing resilience against zonal failures. The read replica is also in a different zone, allowing for load balancing of read operations and further protection against zone-specific outages. (1 vote)"
      },
      {
        "user": "learnazureportal",
        "text": "The correct answer is ==> B. Configure the primary and standby instances in zone A and the read replica in zone B, all in the same region. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 60,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A per the Cloud SQL HA documentation.",
    "conceptSummary": "Recommended Cloud SQL HA placement: primary, standby and replica in three different zones of one region.",
    "correctRationale": "Cloud SQL HA is regional: primary and standby must share the region but live in different zones. Recommended practice additionally spreads the read replica to another zone for zonal survivability — three distinct zones in one region.",
    "optionRationales": [
      "Correct: Zone A primary + zone C standby + zone B replica, all in one region, is the documented HA layout.",
      "Wrong: Primary and standby in the same zone offers no zonal failover protection.",
      "Wrong: A standby cannot be in a different region; HA is regional.",
      "Wrong: All in one zone removes all zone-level redundancy."
    ]
  },
  {
    "id": 59,
    "topic": "Operations & Maintenance",
    "difficulty": 1,
    "question": "Your organization has a production Cloud SQL for MySQL instance. Your instance is configured with 16 vCPUs and 104 GB of RAM that is running between 90% and 100% CPU utilization for most of the day. You need to scale up the database and add vCPUs with minimal interruption and effort. What should you do?",
    "options": [
      "A. Issue a gcloud sql instances patch command to increase the number of vCPUs.",
      "B. Update a MySQL database flag to increase the number of vCPUs.",
      "C. Issue a gcloud compute instances update command to increase the number of vCPUs.",
      "D. Back up the database, create an instance with additional vCPUs, and restore the database."
    ],
    "correct": 0,
    "explanation": "gcloud sql instances patch --cpu resizes vCPUs on the running managed instance — the minimal-interruption scaling path.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. D would not represent minimal interruption or effort. B would not change the number of vCPUs available to the instance as a whole. Option C is for GCE VMs, not Cloud SQL. (4 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Issue a gcloud sql instances *** patch command to increase the number of vCPUs. Cores Y 1 to 96 (must be either 1 or an even number) Partial for shared vCPU gcloud sql instances patch INSTANCE [--activation-policy=ACTIVATION_POLICY] [--active-directory-domain=ACTIVE_DIRECTORY_DOMAIN] [--[no-]assign-ip] [--async] [--audit-bucket-path=AUDIT_BUCKET_PATH] [--audit-retention-interval=AUDIT_RETENTION_INTERVAL] [--audit-upload-interval=AUDIT_UPLOAD_INTERVAL] [--availability-type=AVAILABILITY_TYPE] [--clear-password-policy] [--connector-enforcement=CONNECTOR_ENFORCEMENT] [--cpu=CPU] [--database-version (2 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. https://cloud.google.com/sdk/gcloud/reference/sql/instances/patch#:~:text=existing%20authorized%20networks.-,%2D%2Dcpu,-%3DCPU (2 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: A. \"gcloud sql instances patch\" --> updates the settings of a Cloud SQL instance (1 vote)"
      },
      {
        "user": "887ad17",
        "text": "Selected Answer: A. gcloud sql instances patch [INSTANCE_NAME] --cpu=[NUMBER_OF_VCPUS] (1 vote)"
      },
      {
        "user": "juliorevk",
        "text": "Selected Answer: A. https://cloud.google.com/sdk/gcloud/reference/sql/instances/patch (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 59,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A.",
    "conceptSummary": "Scale Cloud SQL vCPUs via gcloud sql instances patch.",
    "correctRationale": "vCPU count is an instance property changed with gcloud sql instances patch; the managed service performs the resize with a brief restart — minimal interruption and effort.",
    "optionRationales": [
      "Correct: gcloud sql instances patch is the documented way to change vCPUs on a Cloud SQL instance.",
      "Wrong: A MySQL flag cannot add physical vCPUs to the VM.",
      "Wrong: gcloud compute instances targets Compute Engine VMs, not Cloud SQL.",
      "Wrong: Backup + recreate + restore is maximal interruption and effort."
    ]
  },
  {
    "id": 58,
    "topic": "Operations & Maintenance",
    "difficulty": 2,
    "question": "Your organization has strict policies on tracking rollouts to production and periodically shares this information with external auditors to meet compliance requirements. You need to enable auditing on several Cloud Spanner databases. What should you do?",
    "options": [
      "A. Use replication to roll out changes to higher environments.",
      "B. Use backup and restore to roll out changes to higher environments.",
      "C. Use Liquibase to roll out changes to higher environments.",
      "D. Manually capture detailed DBA audit logs when changes are rolled out to higher environments."
    ],
    "correct": 2,
    "explanation": "Liquibase is the supported Spanner change-management tool that produces an auditable changelog of production rollouts.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C. To satisfy audit reporting you would need a way to record what was changed and when. The best answer is one which uses some kind of source code control system (SCCS). That rules out A and B. Any mention of anything manual in a cloud environment should look suspicious, which leave option C. As it happens, Liquibase is an SCCS and can be integrated with Spanner. https://cloud.google.com/spanner/docs/use-liquibase (6 votes)"
      },
      {
        "user": "Pilot50",
        "text": "Selected Answer: C. https://cloud.google.com/spanner/docs/use-liquibase (5 votes)"
      },
      {
        "user": "zanhsieh",
        "text": "Selected Answer: C. I assume production environment shall be a standalone project. Based on this, A: No. Replication can't be done cross projects. B: No. Backup / restore only get a whole set drop / load statements from audit logs. External auditors would focus on \"what changes\". C: Yes. Liguibase could export change.yaml to hand over the external auditors. D: No. No way to capture audit logs and ship to the target project. Spanner is a managed service. Reference: https://cloud.google.com/spanner/docs/backup/gcloud https://cloud.google.com/spanner/docs/use-liquibase (4 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. https://cloud.google.com/spanner/docs/audit-logging#audited_operations (3 votes)"
      },
      {
        "user": "SVGoogle89",
        "text": "C, liquidbase for db source control (3 votes)"
      },
      {
        "user": "Mitra123",
        "text": "D. Auditors wants to see what changed. The only way to showcase that is to capture the audit logs, who changed what... Hence D (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 58,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — Liquibase's changelog is the auditable record; a minority argued backup/restore events are logged, which tracks restores, not rollouts.",
    "conceptSummary": "Auditable Spanner schema rollout tracking with Liquibase.",
    "correctRationale": "Tracking and auditing schema rollouts calls for a change-management tool: Liquibase integrates with Spanner and emits a changelog (e.g. change.yaml) that can be shared with auditors. Backups and replication move data, not tracked schema changes.",
    "optionRationales": [
      "Wrong: Replication copies data for availability; it does not log what schema changes were rolled out.",
      "Wrong: Backup/restore captures data snapshots, not an auditable change log.",
      "Correct: Liquibase records every rollout as a changelog — exactly what auditors need.",
      "Wrong: Spanner is managed; there is no manual mechanism to capture and ship detailed DBA audit logs of change rollouts."
    ]
  },
  {
    "id": 57,
    "topic": "Database Selection",
    "difficulty": 3,
    "question": "You are working on a new centralized inventory management system to track items available in 200 stores, which each have 500 GB of data. You are planning a gradual rollout of the system to a few stores each week. You need to design an SQL database architecture that minimizes costs and user disruption during each regional rollout and can scale up or down on nights and holidays. What should you do?",
    "options": [
      "A. Use Oracle Real Application Cluster (RAC) databases on Bare Metal Solution for Oracle.",
      "B. Use sharded Cloud SQL instances with one or more stores per database instance.",
      "C. Use a Biglable cluster with autoscaling.",
      "D. Use Cloud Spanner with a custom autoscaling solution."
    ],
    "correct": 3,
    "explanation": "An SQL architecture that scales elastically with rollout and nightly load is Cloud Spanner driven by a custom autoscaler; Bigtable is not SQL, and sharded Cloud SQL scaling is manual.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "D. A SQL database architecture rules out Bigtable. Minimizing costs rules out Oracle RAC. That leaves B and D. B would work with each Cloud SQL instance being dedicated to a few stores which would not impact other Cloud SQL instances already running. The downside is the scaling up/down. To change the vCPU on a Cloud SQL instance requires it to be re-started and that’s disruption. Spanner also doesn’t autoscale by itself, but there’s a tool available for Spanner called Autoscaler which can automate scaling up/down. So on balance, D is the best answer. https://cloud.google.com/spanner/docs/autoscaling-overview (12 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. Cloud SQL sharding looks like a good option since we need to minimize costs and we don't need global scaling https://cloud.google.com/community/tutorials/horizontally-scale-mysql-database-backend-with-google-cloud-sql-and-proxysql (4 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: D. 1. CloudSQL max out at 64TB, so unable to told 100TB of data. https://cloud.google.com/sql/docs/quotas#metrics_collection_limit 2. Scale is done manually on SQL Cloud. (3 votes)"
      },
      {
        "user": "RaphaelG",
        "text": "Selected Answer: B. To me, it is \"B\" here. A couple of reasons; the statement \"minimizes costs and user disruption during each regional rollout\" explicitly emphasises that the disruption relates to the rollout not the scale-up or scale-down, and considering it's only a few stores per db, I would presume it would take like a few minutes tops. Lastly, the cost is a bit of a give away as well since Cloud SQL is like twice as cheap (I did some rough estimates recently using europe-west2 as my benchmark). (2 votes)"
      },
      {
        "user": "zanhsieh",
        "text": "Selected Answer: D. CloudSQL max out at 64TB, so unable to told 200 * 500 GB of data. A: No. Oracle RAC cannot scale up or down B: No. Cloud SQL cannot scale up or down manually and the sharded Cloud SQL sound weird, and doesn't meet the \"minimize costs and user disruption during each REGIONAL rollout\". Also can't break storage limits 64TB. C: No. BigTable handles rational db poorly https://cloud.google.com/sql/docs/quotas#:~:text=Cloud%20SQL%20storage%20limits,core%3A%20Up%20to%203%20TB. (2 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "i agree with you on ruling out A and C, however cloud spanner is much costlier than cloud SQL , so B woudlnt be the best answer ? (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 57,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Split between D (Spanner + autoscaling) and B (sharded Cloud SQL). The loaded answer is D: the question demands SQL plus elastic scale up/down, which Spanner + an autoscaler provides natively.",
    "conceptSummary": "Elastic SQL backend → Cloud Spanner + custom autoscaling.",
    "correctRationale": "The system must be SQL and scale up/down on demand (nights, holidays, rolling rollout). Spanner is the globally scalable relational store and the open-source Autoscaler adjusts capacity to load. Oracle RAC on BMS is maximally expensive, Bigtable is not SQL, and sharded Cloud SQL scaling is manual and disruptive.",
    "optionRationales": [
      "Wrong: Oracle RAC on Bare Metal is the most expensive option — contradicts minimizing cost.",
      "Wrong: Sharded Cloud SQL can work, but scaling capacity up/down is manual, and the 100 TB total exceeds a single instance's limit, keeping sharding management heavy.",
      "Wrong: Bigtable is not a SQL database.",
      "Correct: Spanner gives the SQL architecture and an autoscaler matches capacity to the rollout and nightly load."
    ]
  },
  {
    "id": 56,
    "topic": "Connectivity & Networking",
    "difficulty": 1,
    "question": "You are troubleshooting a connection issue with a newly deployed Cloud SQL instance on Google Cloud. While investigating the Cloud SQL Proxy logs, you see the message Error 403: Access Not Configured. What should you do?",
    "options": [
      "A. Check the app.yaml value cloud_sql_instances for a misspelled or incorrect instance connection name.",
      "B. Check whether your service account has cloudsql.instances.connect permission.",
      "C. Enable the Cloud SQL Admin API.",
      "D. Ensure that you are using an external (public) IP address interface."
    ],
    "correct": 2,
    "explanation": "The 403 'Access Not Configured' message in Cloud SQL Auth proxy logs specifically means the Cloud SQL Admin API is not enabled.",
    "discussion": [
      {
        "user": "AngieSoccerBall49",
        "text": "Selected Answer: C. The answer is C. If you're missing cloudsql.instances.connect on the attached service account, the error is 403 FORBIDDEN. If you haven't enabled the Cloud SQL Admin API, the error is 403 ACCESS NOT CONFIGURED. (4 votes)"
      },
      {
        "user": "juliorevk",
        "text": "Selected Answer: C. https://cloud.google.com/sql/docs/mysql/connect-auth-proxy#troubleshooting C because in docs it says \"Make sure to enable the Cloud SQL Admin API. If it is not, you see output like Error 403: Access Not Configured in your Cloud SQL Auth Proxy logs.\" B is not correct because this is for a different error: \"If you are getting a 403 notAuthorized error, and you are using a service account to authenticate the Cloud SQL Auth Proxy, make sure the service account has the correct permissions.\" (2 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. D is not a recommended way to access a Cloud SQL instance and you wouldn’t get a 403 error connecting via a public IP anyway. A and B could trigger a 403 error, but the text would be “not authorized”. The answer is in Google’s documentation. The link provided by sp57 is spot on. (2 votes)"
      },
      {
        "user": "juancambb",
        "text": "Selected Answer: C. Answer C, https://cloud.google.com/sql/docs/mysql/connect-admin-proxy#troubleshooting (2 votes)"
      },
      {
        "user": "learnazureportal",
        "text": "The \"Error 403: Access Not Configured\" message typically indicates a permission issue related to the Cloud SQL instance. The correct answer is B B. Check whether your service account has cloudsql.instances.connect permission. (1 vote)"
      },
      {
        "user": "sp57",
        "text": "wrong - error is 403 Access not Configured - see 4 bullet pts down at link https://cloud.google.com/sql/docs/mysql/connect-admin-proxy#troubleshooting C is correct (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 56,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — the doc pairs this exact message with the disabled Admin API.",
    "conceptSummary": "Auth proxy 403 Access Not Configured → enable Cloud SQL Admin API.",
    "correctRationale": "Per the Auth proxy troubleshooting doc, 'Error 403: Access Not Configured' is emitted when the Cloud SQL Admin API is disabled. Missing permissions produce a different 'notAuthorized' 403.",
    "optionRationales": [
      "Wrong: A bad instance connection name produces a different error, not Access Not Configured.",
      "Wrong: Missing cloudsql.instances.connect yields a 'notAuthorized' 403, a different message.",
      "Correct: The troubleshooting doc maps this exact message to enabling the Cloud SQL Admin API.",
      "Wrong: The network interface does not produce a 403."
    ]
  },
  {
    "id": 55,
    "topic": "Connectivity & Networking",
    "difficulty": 2,
    "question": "You are writing an application that will run on Cloud Run and require a database running in the Cloud SQL managed service. You want to secure this instance so that it only receives connections from applications running in your VPC environment in Google Cloud. What should you do?",
    "options": [
      "A. Step 1: Create your instance with a specified external (public) IP address.\nStep 2: Choose the VPC and create firewall rules to allow only connections from Cloud Run into your instance.\nStep 3: Use Cloud SQL Auth proxy to connect to the instance.",
      "B. Step 1: Create your instance with a specified external (public) IP address.\nStep 2: Choose the VPC and create firewall rules to allow only connections from Cloud Run into your instance.\nStep 3: Connect to the instance using a connection pool to best manage connections to the instance.",
      "C. Step 1: Create your instance with a specified internal (private) IP address.\nStep 2: Choose the VPC with private service connection configured.\nStep 3: Configure the Serverless VPC Access connector in the same VPC network as your Cloud SQL instance.\nStep 4: Use Cloud SQL Auth proxy to connect to the instance.",
      "D. Step 1: Create your instance with a specified internal (private) IP address.\nStep 2: Choose the VPC with private service connection configured.\nStep 3: Configure the Serverless VPC Access connector in the same VPC network as your Cloud SQL instance.\nStep 4: Connect to the instance using a connection pool to best manage connections to the instance."
    ],
    "correct": 3,
    "explanation": "Private IP + private service connection keeps Cloud SQL off the public internet; the Serverless VPC Access connector lets Cloud Run reach it and a connection pool manages connections — no Auth proxy needed on a private IP.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. It's D, CloudSQL Auth proxy is not used when connecting to Private IP https://cloud.google.com/sql/docs/mysql/connect-run#configure https://cloud.google.com/sql/docs/mysql/connect-run#connection-pools (12 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. Cloud Run to Cloud SQL connectivity can be done using private IPs. Eliminate A and B. C would be right except you wouldn’t use Cloud SQL Auth Proxy because Serverless VPC Access would connect directly to the Cloud SQL instance. The connection pool reference in D puts you off, but it is the right answer. The link provided by SVGoogle89 is spot on. (5 votes)"
      },
      {
        "user": "gabrielosluz",
        "text": "The Cloud SQL Auth proxy works with both public and private IP endpoints: https://cloud.google.com/sql/docs/mysql/connect-auth-proxy (5 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: C. C is the correct answer Requirements for using the Cloud SQL Auth proxy To use the Cloud SQL Auth proxy, you must meet the following requirements: The Cloud SQL Admin API must be enabled. You must provide the Cloud SQL Auth proxy with Google Cloud authentication credentials. You must provide the Cloud SQL Auth proxy with a valid database user account and password. The instance must either have a public IPv4 address, or be configured to use private IP. The public IP address does not need to be accessible to any external address (it does not need to be added as an authorized network address). (4 votes)"
      },
      {
        "user": "examprof",
        "text": "Option D. This link explicitly indicates that \"For private IP paths, your application will connect directly to your instance through Serverless VPC Access. This method uses TCP to connect directly to the Cloud SQL instance without using the Cloud SQL Auth Proxy.\" https://cloud.google.com/sql/docs/mysql/connect-run#connect_to (3 votes)"
      },
      {
        "user": "sp57",
        "text": "Agree with chelbsik's point re. Cloud SQL Auth proxy not required with Cloud Run - vote D. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 55,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Split between D (private IP + connector + pool) and C (same but with Auth proxy). The community majority and the Cloud Run connectivity docs favor D: the proxy is not needed for private-IP connections.",
    "conceptSummary": "Cloud Run → Cloud SQL private IP via Serverless VPC Access + connection pool.",
    "correctRationale": "To restrict connections to the VPC, the instance gets a private IP with private service connection, Cloud Run reaches it through a Serverless VPC Access connector in the same VPC, and a connection pool manages connections. The Auth proxy is unnecessary for private-IP connections from the connector.",
    "optionRationales": [
      "Wrong: Public IP + firewall rules does not restrict traffic to the VPC and still exposes an external address; Auth proxy on top is redundant with the requirement.",
      "Wrong: Same public-IP exposure problem.",
      "Wrong: The networking is right, but adding the Auth proxy on a private-IP path is unnecessary — direct connection with pooling is the documented private pattern.",
      "Correct: Private IP + private service connection + Serverless VPC Access + connection pool is the documented VPC-only Cloud Run connectivity."
    ]
  },
  {
    "id": 54,
    "topic": "Database Selection",
    "difficulty": 1,
    "question": "You are responsible for designing a new database for an airline ticketing application in Google Cloud. This application must be able to:\nWork with transactions and offer strong consistency.\nWork with structured and semi-structured (JSON) data.\nScale transparently to multiple regions globally as the operation grows.\nYou need a Google Cloud database that meets all the requirements of the application. What should you do?",
    "options": [
      "A. Use Cloud SQL for PostgreSQL with both cross-region read replicas.",
      "B. Use Cloud Spanner in a multi-region configuration.",
      "C. Use Firestore in Datastore mode.",
      "D. Use a Bigtable instance with clusters in multiple regions."
    ],
    "correct": 1,
    "explanation": "Transactions with strong consistency, structured+JSON data, and transparent global multi-region scaling is the Cloud Spanner profile.",
    "discussion": [
      {
        "user": "absero1609",
        "text": "Selected Answer: B. I'd choose B. To me, there is no totally true option. I agree with dynamic_dba that A and D are wrong. B. Spanner supports JSON, but not that good (as Pilot50 pointed out) C. Firestore Firestore in Datastore mode does provide some degree of consistency guarantees, specifically \"eventual consistency\" for global queries and strong consistency for ancestor queries. However, it does not provide strong consistency for non-ancestor queries. In contrast, Cloud Spanner provides strong consistency for all transactions, which is especially important for applications that require ACID transactions across multiple regions. So between B and C, I'll pick Spanner for strong consistency (7 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. I'll go for Spanner because of 'Scale transparently to multiple regions globally as the operation grows' (4 votes)"
      },
      {
        "user": "H_S",
        "text": "Selected Answer: C. Hello Team, I hope this comment helps Work with transactions and offer strong consistency Work with structured and semi-structured (JSON) data => NoSQL (cloud SQL + spanner are not suitable here ) Scale transparently to multiple regions globally as the operation grows => scale transparently => you don't manage anything Big Table is for time series, millisecond access and for JSON Referrence ; https://cloud.google.com/firestore#all-features (3 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: B. A and B are correct answer but B looks best answer because of \"Scale transparently to multiple regions globally as the operation grows.\" (3 votes)"
      },
      {
        "user": "Pilot50",
        "text": "Correction: the correct answer is B, Firestore in Datastore mode dose not provided strong consistency (3 votes)"
      },
      {
        "user": "AngieSoccerBall49",
        "text": "Selected Answer: B. A. Use Cloud SQL for PostgreSQL with both cross-region read replicas: This won't scale transparently or globally B. Use Cloud Spanner in a multi-region configuration: supports JSON, designed for mission critical workloads, can be scaled transparently with an autoscaler across the globe. C. Use Firestore in Datastore mode: Firestore can scale transparently in a multi-region; but it can't be scaled GLOBALLY. D. Use a Bigtable instance with clusters in multiple regions: This doesn't necesarily fit the supplied workload. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 54,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B — Spanner is the only option satisfying all three requirements.",
    "conceptSummary": "Global transactional DB with JSON support → multi-region Spanner.",
    "correctRationale": "Spanner offers strong transactional consistency, a relational model with JSON support, and transparent multi-region replication — all three requirements together; the alternatives each miss one.",
    "optionRationales": [
      "Wrong: Cross-region Cloud SQL read replicas scale reads only; writes remain single-region, so it is not transparent global scaling.",
      "Correct: Multi-region Spanner meets transactions/consistency, JSON data, and global scaling simultaneously.",
      "Wrong: Firestore in Datastore mode is eventually consistent across regions and is not the relational/transactional fit.",
      "Wrong: Bigtable is NoSQL without multi-row transactions or JSON document modeling."
    ]
  },
  {
    "id": 53,
    "topic": "Security & IAM",
    "difficulty": 3,
    "question": "An analytics team needs to read data out of Cloud SQL for SQL Server and update a table in Cloud Spanner. You need to create a service account and grant least privilege access using predefined roles. What roles should you assign to the service account?",
    "options": [
      "A. roles/cloudsql.viewer and roles/spanner.databaseUser",
      "B. roles/cloudsql.editor and roles/spanner.admin",
      "C. roles/cloudsql.client and roles/spanner.databaseReader",
      "D. roles/cloudsql.instanceUser and roles/spanner.databaseUser"
    ],
    "correct": 0,
    "explanation": "roles/cloudsql.viewer can read (and export) Cloud SQL data, and roles/spanner.databaseUser is the least-privilege role that can read and update Spanner table rows.",
    "discussion": [
      {
        "user": "Mithi_Kumar011",
        "text": "Correct Ans = A Explanation: To read data out of Cloud SQL for SQL Server, you need to use a service account with the roles/cloudsql.viewer role on the Cloud SQL instance. This role grants the service account permission to read data from the instance. Whereas roles/cloudsql.instanceUser will only allow to login to cloud SQL instance. No resource will be allowed to view. To update a table in Cloud Spanner, you need to use a service account with the roles/spanner.databaseUser role on the Cloud Spanner instance. This role grants the service account permission to read and write data in the Spanner database. (4 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. https://cloud.google.com/spanner/docs/iam#:~:text=roles/spanner.databaseUser%20contains%20the%20permissions%20spanner.databases.read%20and%20spanner.databases.write https://cloud.google.com/sql/docs/mysql/iam-roles#:~:text=roles/cloudsql.viewer,to%20all%20Cloud%20SQL%20resources. (4 votes)"
      },
      {
        "user": "CosmoKramer",
        "text": "Selected Answer: D. Y'all should read the documentation. Seems like none of you actually know anything about IAM? the cloudsql.viewer roles has: cloudsql.*.export cloudsql.*.get cloudsql.*.list cloudsql.instances.listServerCas cloudsql.instances.listServerCertificates in addition to a bunch of recommender permissions. roles/cloudsql.instanceUser only has two permissions: cloudsql.instances.get cloudsql.instances.login Some of you may think that this includes \"Cloud SQL Admin\", but that's wrong. As mentioned, read the docs more thoroughly, it says: \"The following table lists each permission that Cloud SQL supports, the Cloud SQL roles that include it, and its basic role\". A role has a perm… (3 votes)"
      },
      {
        "user": "filotti",
        "text": "Selected Answer: D. To read data out of Cloud SQL for SQL Server, you need to use a service account with the roles/cloudsql.instanceUser role on the Cloud SQL instance. This role grants the service account permission to read data from the instance. To update a table in Cloud Spanner, you need to use a service account with the roles/spanner.databaseUser role on the Cloud Spanner instance. This role grants the service account permission to read and write data in the Spanner database. Therefore, to grant least privilege access, you should assign the service account only the required roles, which are roles/cloudsql.instanceUser and roles/spanner.databaseUser. (3 votes)"
      },
      {
        "user": "absero1609",
        "text": "Selected Answer: A. We want to apply least privilege and need to read data out of Cloud SQL for SQL Server only, `roles/cloudsql.viewer` is good enough to statisfy the those requirement, that filters out B, C, and D already https://cloud.google.com/sql/docs/sqlserver/iam-roles#roles (3 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: A. A is the correct answer (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 53,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Community split between A and D. The loaded answer is A: roles/cloudsql.instanceUser is only for IAM database authentication — which SQL Server doesn't support — so it grants nothing; cloudsql.viewer is the minimal Cloud SQL read role among the options, and spanner.databaseUser covers read+write.",
    "conceptSummary": "Least-privilege roles for Cloud SQL read + Spanner table update.",
    "correctRationale": "Cloud SQL for SQL Server does not support IAM database authentication, so roles/cloudsql.instanceUser — whose purpose is IAM database login — gives nothing here; reading is done with database credentials. roles/cloudsql.viewer is the least-privilege Cloud SQL role among the options for the analyst, and roles/spanner.databaseUser gives read+write on the Spanner table.",
    "optionRationales": [
      "Correct: cloudsql.viewer is the least-privilege read role for Cloud SQL here — SQL Server has no IAM database authentication, so instanceUser gains nothing — and spanner.databaseUser covers read+write.",
      "Wrong: databaseReader is read-only, but databaseUser also lacks the Cloud SQL side; and instanceUser gives no data access on SQL Server.",
      "Wrong: databaseReader alone can't write rows for the developer role, and viewer+databaseReader leaves the Spanner writer under-powered.",
      "Wrong: instanceUser's purpose is IAM database login, which Cloud SQL for SQL Server doesn't support, so it grants nothing; pairing it with databaseUser still leaves SQL Server read unaddressed."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 52,
    "topic": "Migration",
    "difficulty": 2,
    "question": "Your organization is running a low-latency reporting application on Microsoft SQL Server. In addition to the database engine, you are using SQL Server Analysis Services (SSAS), SQL Server Reporting Services (SSRS), and SQL Server Integration Services (SSIS) in your on-premises environment. You want to migrate your Microsoft SQL Server database instances to Google Cloud. You need to ensure minimal disruption to the existing architecture during migration. What should you do?",
    "options": [
      "A. Migrate to Cloud SQL for SQL Server.",
      "B. Migrate to Cloud SQL for PostgreSQL.",
      "C. Migrate to Compute Engine.",
      "D. Migrate to Google Kubernetes Engine (GKE)."
    ],
    "correct": 2,
    "explanation": "Cloud SQL for SQL Server does not host SSAS/SSRS/SSIS, so the minimal-disruption target is SQL Server on Compute Engine.",
    "discussion": [
      {
        "user": "absero1609",
        "text": "I think they do this on purpose. They simply give a random answer on each question and let us fight in the comment section to find the truth answer. The good thing is that we have to work out ass to find the correct answer and we might learn something new along the way (or at least in my case) :D (6 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. Cloud SQL doesn’t support SSAS, SSRS or SSIS. Eliminate A. Migrating to a different database platform doesn’t make sense. Eliminate B. Minimal disruption to the existing architecture rules out GKE. Eliminate D. Leaves C. Migrate to a GCE VM. (5 votes)"
      },
      {
        "user": "felipeschossler",
        "text": "I have to agree 100% witg absero1609 kkkkkkkkkkkkk, researching in the comments and reading the docs that actually let me learn fast for the exam. (3 votes)"
      },
      {
        "user": "felipeschossler",
        "text": "I have to agree 100% witg absero1609 kkkkkkkkkkkkk, researching in the comments and reading the docs that actually let me learn fast for the exam. (3 votes)"
      },
      {
        "user": "Pilot50",
        "text": "Selected Answer: C. I always wonder why the answers provided are wrong! so wrong and not even close to the reality! why examtopics.com are doing this? (3 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: C. C is the correct answer https://cloud.google.com/sql/docs/sqlserver/features#general_features_unavailable_for (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 52,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — the auxiliary SQL Server services rule out Cloud SQL.",
    "conceptSummary": "SQL Server with SSAS/SSRS/SSIS → Compute Engine, not Cloud SQL.",
    "correctRationale": "The BI/ETL companion services (SSAS, SSRS, SSIS) are not part of managed Cloud SQL for SQL Server. Moving the whole stack onto Compute Engine keeps the architecture identical and minimizes disruption.",
    "optionRationales": [
      "Wrong: Cloud SQL for SQL Server lacks SSAS/SSRS/SSIS — the architecture would break.",
      "Wrong: Changing engines to PostgreSQL is a replatform, not minimal disruption.",
      "Correct: Compute Engine runs full SQL Server with SSAS/SSRS/SSIS unchanged.",
      "Wrong: Containerizing SQL Server + BI services into GKE is far more disruptive."
    ]
  },
  {
    "id": 51,
    "topic": "Security & IAM",
    "difficulty": 1,
    "question": "You are deploying a new Cloud SQL instance on Google Cloud using the Cloud SQL Auth proxy. You have identified snippets of application code that need to access the new Cloud SQL instance. The snippets reside and execute on an application server running on a Compute Engine machine. You want to follow Google-recommended practices to set up Identity and Access Management (IAM) as quickly and securely as possible. What should you do?",
    "options": [
      "A. For each application code, set up a common shared user account.",
      "B. For each application code, set up a dedicated user account.",
      "C. For the application server, set up a service account.",
      "D. For the application server, set up a common shared user account."
    ],
    "correct": 2,
    "explanation": "The Compute Engine application server should run with a service account, which the Auth proxy uses for IAM-authenticated connections.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: C. https://cloud.google.com/sql/docs/mysql/sql-proxy#using-a-service-account (3 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: C. Correct answer is C, service account is the GCP recommended option (3 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. The Google recommendation would be for an application to use a service account. None of the other options make sense in light of this. (2 votes)"
      },
      {
        "user": "Lucker",
        "text": "the best answer would be B . Need granular control for each of the code snippets . The advantage of using a service account for this purpose is that you can create a credential file specifically for the Cloud SQL Auth Proxy, and it is explicitly and permanently linked to the Cloud SQL Auth Proxy as long as it is running. For this reason, using a service account is the recommended method for production instances not running on a Compute Engine instance. (1 vote)"
      },
      {
        "user": "ebd62a2",
        "text": "Selected Answer: B. Google best practices, use Dedicated Service Accounts per Workload: Create a specific service account (SA) dedicated to running each code snippet/workload rather than using default Compute Engine or App Engine service accounts. (1 vote)"
      },
      {
        "user": "felipeschossler",
        "text": "C. The docs proving this are here: Create and configure a Google Cloud service account that has the Cloud SQL Client role with permissions to connect to Cloud SQL. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 51,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — service account on the application server.",
    "conceptSummary": "Auth proxy + IAM on GCE: attach a service account to the server.",
    "correctRationale": "Google-recommended practice is to attach a service account to the Compute Engine VM; the Auth proxy then authenticates as that service account to the instance — the quickest, most secure IAM setup.",
    "optionRationales": [
      "Wrong: Shared user accounts are neither service identities nor secure practice.",
      "Wrong: Per-snippet user accounts add management overhead for no benefit; identity belongs to the workload/VM.",
      "Correct: A VM service account + Auth proxy is the documented IAM pattern.",
      "Wrong: A shared user account is still a user credential, not the recommended service identity."
    ]
  },
  {
    "id": 50,
    "topic": "Backup & Recovery",
    "difficulty": 1,
    "question": "Your team is running a Cloud SQL for MySQL instance with a 5 TB database that must be available 24/7. You need to save database backups on object storage with minimal operational overhead or risk to your production workloads. What should you do?",
    "options": [
      "A. Use Cloud SQL serverless exports.",
      "B. Create a read replica, and then use the mysqldump utility to export each table.",
      "C. Clone the Cloud SQL instance, and then use the mysqldump utlity to export the data.",
      "D. Use the mysqldump utility on the primary database instance to export the backup."
    ],
    "correct": 0,
    "explanation": "Cloud SQL serverless exports offload the export onto a temporary Google-managed instance — minimal overhead and zero risk to the 24/7 primary.",
    "discussion": [
      {
        "user": "GCP72",
        "text": "Selected Answer: A. A is the correct answer https://cloud.google.com/blog/products/databases/introducing-cloud-sql-serverless-exports (5 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. Minimal operational overhead eliminates B and C. Minimal risk to production workloads eliminates D. That leaves A. Least amount of work and doesn't impact the primary instance. (4 votes)"
      },
      {
        "user": "Nirca",
        "text": "With serverless export, Cloud SQL creates a separate, temporary instance to offload the export operation. Offloading the export operation allows databases on the primary instance to continue to serve queries and perform operations at the usual performance rate. BUT is is export (logical backup) and will never be incremental. and the recovery is slow. for 5TB server is it not an option. (only for mini databases). I believe The better option is C (1 vote)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: C. Cloud SQL backups are incremental. They contain only data that changed after the previous backup was taken. Your oldest backup is a similar size to your database, but the sizes of subsequent backups depend on the rate of change of your data. When the oldest backup is deleted, the size of the next oldest backup increases so that a full backup still exists. (1 vote)"
      },
      {
        "user": "pk349",
        "text": "A: Use Cloud SQL serverless exports. Serverless exports enables you to export data from your MySQL and PostgreSQL database instances without any impact on performance or risk to your production workloads. Cloud SQL exports, which offer portable data formats (SQL, CSV), can be triggered anytime and are written to Cloud Storage buckets that you control. (1 vote)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. https://cloud.google.com/sql/docs/mysql/import-export#:~:text=Use%20serverless%20export,is%20deleted%20automatically. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 50,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A per the serverless-exports announcement.",
    "conceptSummary": "Safe, low-effort exports via Cloud SQL serverless export.",
    "correctRationale": "Serverless export runs the export on a temporary instance, so the production primary keeps serving without load — the Google-recommended way to get backups onto Cloud Storage with minimal operational overhead and risk.",
    "optionRationales": [
      "Correct: Serverless exports offload the work to a temporary instance; no overhead and no production impact.",
      "Wrong: Per-table mysqldump on a replica is heavy operational work.",
      "Wrong: Cloning then mysqldump is manual and expensive.",
      "Wrong: mysqldump on the 5 TB primary puts the production workload at risk."
    ]
  },
  {
    "id": 49,
    "topic": "High Availability & DR",
    "difficulty": 2,
    "question": "You are migrating an on-premises application to Google Cloud. The application requires a high availability (HA) PostgreSQL database to support business-critical functions. Your company's disaster recovery strategy requires a recovery time objective (RTO) and recovery point objective (RPO) within 30 minutes of failure. You plan to use a Google Cloud managed service. What should you do to maximize uptime for your application?",
    "options": [
      "A. Deploy Cloud SQL for PostgreSQL in a regional configuration. Create a read replica in a different zone in the same region and a read replica in another region for disaster recovery.",
      "B. Deploy Cloud SQL for PostgreSQL in a regional configuration with HA enabled. Take periodic backups, and use this backup to restore to a new Cloud SQL for PostgreSQL instance in another region during a disaster recovery event.",
      "C. Deploy Cloud SQL for PostgreSQL in a regional configuration with HA enabled. Create a cross-region read replica, and promote the read replica as the primary node for disaster recovery.",
      "D. Migrate the PostgreSQL database to multi-regional Cloud Spanner so that a single region outage will not affect your application. Update the schema to support Cloud Spanner data types, and refactor the application."
    ],
    "correct": 2,
    "explanation": "An HA Cloud SQL pair covers zone failure within the RTO/RPO, and a promotable cross-region read replica covers regional disaster recovery within 30 minutes.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C. D might be possible but it’s a lot of effort to migrate to a different platform. Eliminate D. A does not mention HA. Eliminate A. B says to take periodic backups which doesn’t support an RTO/RPO of 30 minutes. The best answer is deploy an HA configuration and have a read replica you could promote to the primary in a different region. C is the best answer. (4 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: C. C is the correct answer (3 votes)"
      },
      {
        "user": "pk349",
        "text": "C: Deploy Cloud SQL for PostgreSQL in a regional configuration with HA enabled. Create a cross-region read replica, and promote ***** the read replica as the primary node for disaster recovery. (1 vote)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: C. I'll go with C (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 49,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — backups can't hit 30-minute RTO/RPO and Spanner is a needless replatform.",
    "conceptSummary": "RTO/RPO ≤30 min: HA Cloud SQL + promotable cross-region read replica.",
    "correctRationale": "HA (regional configuration) handles zonal failure in minutes; a cross-region read replica that can be promoted handles regional DR within the 30-minute RTO/RPO — the standard Cloud SQL DR architecture without a Spanner replatform.",
    "optionRationales": [
      "Wrong: Same-zone replicas only do not constitute HA (no standby) — the HA flag is missing.",
      "Wrong: Backup restore to a new instance cannot meet a 30-minute RTO/RPO.",
      "Correct: HA + promotable cross-region replica satisfies both failure scopes inside 30 minutes.",
      "Wrong: Migrating PostgreSQL→Spanner means schema/data-type refactoring — huge effort for a requirement Cloud SQL meets."
    ]
  },
  {
    "id": 48,
    "topic": "Replication & Read Replicas",
    "difficulty": 2,
    "question": "You are managing a Cloud SQL for MySQL environment in Google Cloud. You have deployed a primary instance in Zone A and a read replica instance in Zone B, both in the same region. You are notified that the replica instance in Zone B was unavailable for 10 minutes. You need to ensure that the read replica instance is still working. What should you do?",
    "options": [
      "A. Use the Google Cloud Console or gcloud CLI to manually create a new clone database.",
      "B. Use the Google Cloud Console or gcloud CLI to manually create a new failover replica from backup.",
      "C. Verify that the new replica is created automatically.",
      "D. Start the original primary instance and resume replication."
    ],
    "correct": 2,
    "explanation": "After a zonal outage Cloud SQL automatically recovers its read replicas — verify the replica is recreated/resumes replication rather than rebuilding by hand.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "C - makes no sense D - nobody said primary instance was offline, plus you can't stop/resture replication on the primary instance, only on read replica A makes no sense: you can't create clone database from read replica, and if it means to create one from the primary instance - how would that help to insure that replica is still working? I'll go for B (4 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: B. B is the correct answer (3 votes)"
      },
      {
        "user": "Sandipcst",
        "text": "C Recovery Process: Once Zone-B becomes available again, Cloud SQL will initiate the recovery process for the impacted read replica. The recovery process involves the following steps: 1. Synchronization: Cloud SQL will compare the data in the recovered read replica with the primary instance in Zone-A. If there is any data divergence due to the unavailability period, Cloud SQL will synchronize the read replica with the primary instance to ensure data consistency. 2. Catch-up Replication: The recovered read replica will start catching up on the changes that occurred on the primary instance during its unavailability. It will apply the necessary updates from the primary instance's binary logs… (2 votes)"
      },
      {
        "user": "kyou1313",
        "text": "Selected Answer: C. When a Cloud SQL read replica becomes unavailable, Cloud SQL automatically tries to create a new replica to replace the failed one. This process is part of the automated failover mechanism in Cloud SQL. B. Manually creating a new failover replica from backup might involve additional steps and may not be necessary for a temporary unavailability of the read replica. (2 votes)"
      },
      {
        "user": "KennyHuang",
        "text": "Selected Answer: C. By verifying that the new replica is created automatically, you can ensure that the read replica instance is functioning and replication is maintained even after the temporary unavailability of the replica in Zone B. (2 votes)"
      },
      {
        "user": "Pilot50",
        "text": "Selected Answer: D. https://cloud.google.com/sql/docs/mysql/replication#:~:text=If%20replication%20is,a%20new%20one. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 48,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Community favors C: replicas resume automatically after a zonal event; a minority argued for manual rebuild.",
    "conceptSummary": "Read replica recovery after a zonal outage is automatic — verify, don't rebuild.",
    "correctRationale": "Per the Cloud SQL high-availability docs, during a zonal outage read replicas in that zone stop receiving traffic, and once the zone returns (or the replica is recreated automatically) replication resumes. The right action is to verify the replica came back automatically before any manual intervention.",
    "optionRationales": [
      "Wrong: Cloning creates a new primary copy, not a working read replica of the existing primary.",
      "Wrong: Rebuilding a replica from backup is a heavy last resort; Cloud SQL restores replicas automatically.",
      "Correct: Replicas resume replication once the zone/recovery completes — verify the automatic recovery first.",
      "Wrong: The primary was never down; starting it or toggling replication does not apply here."
    ]
  },
  {
    "id": 47,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "You are designing a payments processing application on Google Cloud. The application must continue to serve requests and avoid any user disruption if a regional failure occurs. You need to use AES-256 to encrypt data in the database, and you want to control where you store the encryption key. What should you do?",
    "options": [
      "A. Use Cloud Spanner with a customer-managed encryption key (CMEK).",
      "B. Use Cloud Spanner with default encryption.",
      "C. Use Cloud SQL with a customer-managed encryption key (CMEK).",
      "D. Use Bigtable with default encryption."
    ],
    "correct": 0,
    "explanation": "Surviving a regional failure without disruption requires multi-region Spanner, and controlling key location requires CMEK.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. Avoiding user disruption if a regional failure occurs means you need to pick a multi-region service. That rules out C and D. Having more control over the EKs means CMEK. That eliminates B. (4 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: A. A is the correct answer because \" you want to control where you store the encryption key\" (4 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. A for me: it's A or C because we want to control keys, but C would cause downtime, since we would need to manually failover to another region if a regional failure occurs, and we don't want that. (2 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Right, but C would cause downtime, since you would need to manually failover to another region (2 votes)"
      },
      {
        "user": "fredcaram",
        "text": "A and C would work for this scenario (2 votes)"
      },
      {
        "user": "Tharun1125438",
        "text": "Yes default encryption comes with AES-256 but the question states that you need to control where you store the encryption keys. that can be achieved by CMEK. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 47,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A: multi-region requirement eliminates Cloud SQL; CMEK requirement eliminates default encryption.",
    "conceptSummary": "Region-fault-tolerant payments DB → multi-region Spanner with CMEK.",
    "correctRationale": "Only multi-region Cloud Spanner keeps serving through a regional failure transparently, and CMEK lets you choose where the AES-256 key is stored. Default encryption gives Google control of the key; Cloud SQL and single-region options cannot promise zero-disruption regional failover.",
    "optionRationales": [
      "Correct: Multi-region Spanner + CMEK satisfies regional survivability and key-custody control together.",
      "Wrong: Default Google-managed keys remove control over where the key is stored.",
      "Wrong: CMEK works on Cloud SQL but a regional outage there means manual failover and user disruption.",
      "Wrong: Bigtable with default keys fails the key-control requirement, and it is not the transactional fit either."
    ]
  },
  {
    "id": 46,
    "topic": "Database Selection",
    "difficulty": 1,
    "question": "You are choosing a database backend for a new application. The application will ingest data points from IoT sensors. You need to ensure that the application can scale up to millions of requests per second with sub-10ms latency and store up to 100 TB of history. What should you do?",
    "options": [
      "A. Use Cloud SQL with read replicas for throughput.",
      "B. Use Firestore, and rely on automatic serverless scaling.",
      "C. Use Memorystore for Memcached, and add nodes as necessary to achieve the required throughput.",
      "D. Use Bigtable, and add nodes as necessary to achieve the required throughput."
    ],
    "correct": 3,
    "explanation": "Millions of requests/sec, sub-10 ms latency, and 100 TB of history is the signature Bigtable profile; add nodes to scale throughput.",
    "discussion": [
      {
        "user": "fredcaram",
        "text": "Selected Answer: D. This is a bigtable use case (7 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. Simply a classic use case for Bigtable. Neither Cloud SQL, Firestore nor Memorystore have either the capacity or latency to provide the solution. (2 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: D. C is not a correct answer, D- Bigtable is correct choice for this user case. https://cloud.google.com/memorystore/docs/redis/redis-overview (2 votes)"
      },
      {
        "user": "felipeschossler",
        "text": "You just forgot the 100TB of data that needs to be stored 🙏 (2 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: D. IOT -->> Bigtable (2 votes)"
      },
      {
        "user": "hussain.sain",
        "text": "point to consider is : IOT data, scaling for accepting millions of request. storing historic data of 100TB. Big Table is used for low latency but its for operational workload and we need Fully managed Redis and Memcached for sub-millisecond data access. that's the only argument here. i think option c is correct. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 46,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D — the 100 TB history requirement rules out the cache options.",
    "conceptSummary": "High-rate IoT ingestion at scale → Bigtable.",
    "correctRationale": "Bigtable is Google's managed wide-column store built for low single-digit-millisecond access at millions of ops/sec over petabyte-class data, and throughput scales linearly with nodes.",
    "optionRationales": [
      "Wrong: Cloud SQL cannot scale to millions of writes/sec via read replicas (they scale reads only).",
      "Wrong: Firestore targets document workloads and does not hit this throughput/latency/capacity combination.",
      "Wrong: Memcached is an ephemeral cache — 100 TB of history cannot live there.",
      "Correct: Bigtable meets the throughput, latency and capacity requirements and scales by adding nodes."
    ]
  },
  {
    "id": 45,
    "topic": "Operations & Maintenance",
    "difficulty": 2,
    "question": "You work in the logistics department. Your data analysis team needs daily extracts from Cloud SQL for MySQL to train a machine learning model. The model will be used to optimize next-day routes. You need to export the data in CSV format. You want to follow Google-recommended practices. What should you do?",
    "options": [
      "A. Use Cloud Scheduler to trigger a Cloud Function that will run a select * from table(s) query to call the cloudsql.instances.export API.",
      "B. Use Cloud Scheduler to trigger a Cloud Function through Pub/Sub to call the cloudsql.instances.export API.",
      "C. Use Cloud Composer to orchestrate an export by calling the cloudsql.instances.export API.",
      "D. Use Cloud Composer to execute a select * from table(s) query and export results."
    ],
    "correct": 1,
    "explanation": "The documented pattern is Cloud Scheduler → Pub/Sub → Cloud Function → cloudsql.instances.export API for scheduled CSV exports.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. https://cloud.google.com/blog/topics/developers-practitioners/scheduling-cloud-sql-exports-using-cloud-functions-and-cloud-scheduler (10 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "B. Performing a “SELECT * FROM TABLE” wouldn’t give you CSV output and that alone wouldn’t call an API. Eliminate A. There’s no need for Cloud Composer in this scenario, especially when the solution is a known combination of Cloud Scheduler, Cloud Function and a Pub/Sub Topic, which is B. (4 votes)"
      },
      {
        "user": "sp57",
        "text": "As noted in text from this link, Cloud Function can be triggered with/without pub/sub. I think distinction between A & B is suggestion in A the API s called from query, which is not correct - the 'select query' is passed as parameter in call, so I think B is correct. \"Note that we could also have a Pub/Sub Trigger configured Cloud Function get triggered by the Scheduler by using the same steps given above to create a job. Except that in the target, you will select Pub/Sub and provide the Pub/Sub Topic name. At the scheduler trigger time, the Cloud Scheduler will publish a message to the topic with the message body that you specify.\" https://rominirani.com/google-cloud-functi… (3 votes)"
      },
      {
        "user": "njda",
        "text": "why will someone use 3 services when it can be done using 1 service only, in this case composer. Secondly export can be for multiple tables, and ,cloud functions has a execution time limit.? C still looks most appropriate solution. (3 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: A. A is the correct answer, PUSUB is not required for this task (3 votes)"
      },
      {
        "user": "KennyHuang",
        "text": "Selected Answer: C. C is the recommended choice as it leverages Cloud Composer's workflow orchestration capabilities to schedule and automate the export process. By calling the cloudsql.instances.export API within the workflow, you can ensure that the data is exported from Cloud SQL for MySQL in CSV format as needed by your data analysis team. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 45,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B, citing Google's 'Scheduling Cloud SQL exports using Cloud Functions and Cloud Scheduler' pattern; Composer is overkill.",
    "conceptSummary": "Scheduled Cloud SQL CSV exports via Scheduler + Pub/Sub + Cloud Function.",
    "correctRationale": "Google's published pattern for scheduled Cloud SQL exports is Cloud Scheduler triggering a Cloud Function through Pub/Sub, which calls the instances.export API to write CSV to Cloud Storage — fully managed and no Composer overhead.",
    "optionRationales": [
      "Wrong: Running a SELECT inside the function bypasses the export API and cannot produce managed CSV output at table scale.",
      "Correct: Scheduler→Pub/Sub→Function→export API is the documented scheduled-export architecture.",
      "Wrong: Composer/Airflow is heavyweight for a single daily API call.",
      "Wrong: Running SELECT * via Composer is not the recommended managed export path and scales poorly."
    ],
    "legacyNote": "Cloud Functions were rebranded as Cloud Run functions; the pattern (Scheduler → Pub/Sub → function → export API) is unchanged."
  },
  {
    "id": 44,
    "topic": "High Availability & DR",
    "difficulty": 3,
    "question": "You are designing a highly available (HA) Cloud SQL for PostgreSQL instance that will be used by 100 databases. Each database contains 80 tables that were migrated from your on-premises environment to Google Cloud. The applications that use these databases are located in multiple regions in the US, and you need to ensure that read and write operations have low latency. What should you do?",
    "options": [
      "A. Deploy 2 Cloud SQL instances in the us-central1 region with HA enabled, and create read replicas in us-east1 and us-west1.",
      "B. Deploy 2 Cloud SQL instances in the us-central1 region, and create read replicas in us-east1 and us-west1.",
      "C. Deploy 4 Cloud SQL instances in the us-central1 region with HA enabled, and create read replicas in us-central1, us-east1, and us-west1.",
      "D. Deploy 4 Cloud SQL instances in the us-central1 region, and create read replicas in us-central1, us-east1 and us-west1."
    ],
    "correct": 0,
    "explanation": "HA mandates an HA-enabled pair; 100 databases × 80 tables (8,000 tables) fits comfortably on two Cloud SQL instances, and read replicas in us-east1/us-west1 serve low-latency reads in those regions.",
    "discussion": [
      {
        "user": "SandyZA",
        "text": "A is correct. We only have 8000 tables. More than 1 HA env is only required beyond 50000 tables If you have 50,000 or more database tables on a single instance, it could result in the instance becoming unresponsive or unable to perform maintenance operations, and the instance is not covered by the SLA. (8 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. B and D do not mention HA, so eliminate those. That leaves A and C. C talks about 4 instances with HA which presumably means 2 primaries each with an HA standby. Oddly, there are 4 zones in us-central1. The killer is having a read replica also in us-central1 which would mean the same zone would have a read replica and either a primary or HA standby. Not a good idea. Option A is the best choice. A primary and an HA standby in us-central1 (different zones) and then read replicas in us-east1 and us-west1. (7 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. We only need options with HA enabled and 4 databases with 3 read replicas (each?) seems overkill to me. (6 votes)"
      },
      {
        "user": "Blackstile",
        "text": "Selected Answer: A. Answer C is wrong because the question suggests low-latency and replication for 4 region INCREASE latency. Answer A is correct because attend the two requirements high availability and low latency. The Key for this question is low latency. (5 votes)"
      },
      {
        "user": "KennyHuang",
        "text": "Selected Answer: C. This option provides high availability with four instances in the primary region, ensuring redundancy and fault tolerance. By creating read replicas in us-central1, us-east1, and us-west1, read operations can be distributed across multiple regions, reducing latency for applications in those regions. This design allows for efficient and low-latency read operations while maintaining high availability. Option C is the recommended choice as it combines HA with multiple read replicas in different regions, providing both high availability and low-latency read operations for your multi-region application setup. (4 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Deploy 2 Cloud SQL instances in the us-central1 region ***** with HA enabled, and create read replicas in us-east1 and us-west1. (4 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 44,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "The vote tied between A (2 HA instances + east/west replicas) and C (4 HA instances + replicas everywhere). A is loaded because HA is mandatory and the table count does not justify four HA primaries.",
    "conceptSummary": "HA Cloud SQL topology sized by table count plus regional read replicas.",
    "correctRationale": "HA is required, eliminating the non-HA options. Eight thousand tables are well below the ~50k-table level where Cloud SQL can become unresponsive, so two HA instances suffice; replicas in us-east1 and us-west1 put reads close to users in the other US regions while writes stay in us-central1.",
    "optionRationales": [
      "Correct: Two HA instances + replicas in east and west give HA, low-latency reads, and fit the 8,000-table footprint.",
      "Wrong: No HA enabled — fails the explicit HA requirement.",
      "Wrong: Four HA instances plus a replica everywhere is oversized for 8,000 tables and adds cost and replication lag.",
      "Wrong: Four instances but still no HA enabled."
    ]
  },
  {
    "id": 43,
    "topic": "Operations & Maintenance",
    "difficulty": 1,
    "question": "You manage a meeting booking application that uses Cloud SQL. During an important launch, the Cloud SQL instance went through a maintenance event that resulted in a downtime of more than 5 minutes and adversely affected your production application. You need to immediately address the maintenance issue to prevent any unplanned events in the future. What should you do?",
    "options": [
      "A. Set your production instance's maintenance window to non-business hours.",
      "B. Migrate the Cloud SQL instance to Cloud Spanner to avoid any future disruptions due to maintenance.",
      "C. Contact Support to understand why your Cloud SQL instance had a downtime of more than 5 minutes.",
      "D. Use Cloud Scheduler to schedule a maintenance window of no longer than 5 minutes."
    ],
    "correct": 0,
    "explanation": "Set the instance's maintenance window to non-business hours so future maintenance events land outside the launch/business window.",
    "discussion": [
      {
        "user": "fredcaram",
        "text": "Selected Answer: A. A makes more sense than changing products (5 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: A. A is the correct answer (4 votes)"
      },
      {
        "user": "lapeyus",
        "text": "Selected Answer: A. maintenance window (3 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Set your production instance's maintenance window to ***** non-business hours. (2 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. Migrating to a different platform is a bit extreme, so eliminate B. C would be a good idea in any event, but is not the best answer here. D is not how you manage maintenance windows on Cloud SQL. A is the best answer. (1 vote)"
      },
      {
        "user": "vodkaHN",
        "text": "Selected Answer: A. Changing service is too risky. ==> A (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 43,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A — maintenance windows exist precisely for this.",
    "conceptSummary": "Prevent business-hours Cloud SQL maintenance via maintenance windows.",
    "correctRationale": "Cloud SQL maintenance windows let you choose when disruptive maintenance occurs. Pointing the window at non-business hours directly prevents recurrence of the >5-minute outage during business operation.",
    "optionRationales": [
      "Correct: A maintenance window outside business hours keeps maintenance restarts off the critical path.",
      "Wrong: Migrating to Spanner is a massive replatform to solve a scheduling problem; Spanner has maintenance too.",
      "Wrong: Contacting support explains the past incident but does not prevent future maintenance events.",
      "Wrong: Cloud Scheduler cannot control Cloud SQL maintenance timing or cap its duration."
    ]
  },
  {
    "id": 42,
    "topic": "Backup & Recovery",
    "difficulty": 2,
    "question": "You are managing a small Cloud SQL instance for developers to do testing. The instance is not critical and has a recovery point objective (RPO) of several days. You want to minimize ongoing costs for this instance. What should you do?",
    "options": [
      "A. Take no backups, and turn off transaction log retention.",
      "B. Take one manual backup per day, and turn off transaction log retention.",
      "C. Turn on automated backup, and turn off transaction log retention.",
      "D. Turn on automated backup, and turn on transaction log retention."
    ],
    "correct": 2,
    "explanation": "With an RPO of days, turn on automated backups (daily, managed) and disable transaction-log retention — no PITR storage cost, no manual work.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C. A is wrong since there is an RPO. B requires manual intervention which partly defeats the object of using a managed service like Cloud SQL. D is wrong since retaining transaction logs would permit point-in-time recovery which is not required. That leaves C. (3 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: C. C. Turn on automated backup, and turn off transaction log retention. (3 votes)"
      },
      {
        "user": "fredcaram",
        "text": "Selected Answer: C. There is no need to have the overload of using a manual backup, you could schedule an automatic one once a day (2 votes)"
      },
      {
        "user": "hussain.sain",
        "text": "Why not A. its a testing environment. why we need to have backup when we are low on budget. (2 votes)"
      },
      {
        "user": "juliorevk",
        "text": "Selected Answer: C. C and not B because as per: https://cloud.google.com/sql/docs/mysql/backup-recovery/backups On-demand backups are not automatically deleted the way automated backups are. They persist until you delete them or until their instance is deleted. Because they are not automatically deleted, on-demand backups can have a long-term effect on your billing charges. (1 vote)"
      },
      {
        "user": "csrazdan",
        "text": "Selected Answer: C. Automatic backups are incremental where as manual backups are full. Other than compute time for manual backup, storage costs will also increase. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 42,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — automated backups plus no log retention is the cheapest posture that still meets the RPO.",
    "conceptSummary": "Cheapest backup posture for a dev Cloud SQL instance: automated backups, no log retention.",
    "correctRationale": "A several-day RPO only needs daily recovery points: automated backups satisfy it with zero manual effort. Transaction-log retention for PITR adds storage cost the RPO does not justify, so disable it. Manual daily backups cost more in ops time and persist until deleted.",
    "optionRationales": [
      "Wrong: No backups at all fails any RPO — the instance can never be recovered.",
      "Wrong: Manual daily backups are an operational burden and on-demand backups persist (adding storage cost) — automated backups are cheaper to run.",
      "Correct: Automated backups meet a multi-day RPO at minimum managed cost; disabling log retention avoids PITR storage charges.",
      "Wrong: Transaction-log retention adds PITR capability the RPO does not require, costing extra storage."
    ]
  },
  {
    "id": 41,
    "topic": "Capacity Planning & Cost",
    "difficulty": 2,
    "question": "You need to migrate existing databases from Microsoft SQL Server 2016 Standard Edition on a single Windows Server 2019 Datacenter Edition to a single Cloud SQL for SQL Server instance. During the discovery phase of your project, you notice that your on-premises server peaks at around 25,000 read IOPS. You need to ensure that your Cloud SQL instance is sized appropriately to maximize read performance. What should you do?",
    "options": [
      "A. Create a SQL Server 2019 Standard on Standard machine type with 4 vCPUs, 15 GB of RAM, and 800 GB of solid-state drive (SSD).",
      "B. Create a SQL Server 2019 Standard on High Memory machine type with at least 16 vCPUs, 104 GB of RAM, and 200 GB of SSD.",
      "C. Create a SQL Server 2019 Standard on High Memory machine type with 16 vCPUs, 104 GB of RAM, and 4 TB of SSD.",
      "D. Create a SQL Server 2019 Enterprise on High Memory machine type with 16 vCPUs, 104 GB of RAM, and 500 GB of SSD."
    ],
    "correct": 2,
    "explanation": "Cloud SQL for SQL Server best practice: provision ≥4 TB SSD for maximum IOPS; 25,000 read IOPS need far more disk than 200–800 GB provides, and Standard edition suffices.",
    "discussion": [
      {
        "user": "fredcaram",
        "text": "Selected Answer: C. Given that Google SSD performance is related to the size of the disk in an order of 30 IOPS for each GB, ti would require at least 833 GB to handle 25000 IOPS, the only answer that exceeds this value is C. https://cloud.google.com/compute/docs/disks/performance (12 votes)"
      },
      {
        "user": "Popa",
        "text": "Selected Answer: C. A disk size of 4TB or greater provides more throughput and IOPS. Storage: >= 4TB for the best IOPS https://cloud.google.com/sql/docs/sqlserver/best-practices#admin (3 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. D is wrong since the IOPS would not improve based upon the edition of SQL Server. IOPS increases with the amount of storage, so the most amount of storage is C with 4 TB. I checked this using the GCP console and C is correct. (2 votes)"
      },
      {
        "user": "learnazureportal",
        "text": "The correct answer is ==> B. Create a SQL Server 2019 Standard on High Memory machine type with at least 16 vCPUs, 104 GB of RAM, and 200 GB of SSD focus on \"at least\" keyword (2 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: C. Agree C is the correct answer (2 votes)"
      },
      {
        "user": "pk349",
        "text": "C: Create a SQL Server 2019 Standard on High Memory machine type with 16 vCPUs, ***** 104 GB of RAM, and 4 TB of SSD. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 41,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Consensus for C: disk size determines IOPS and ≥4 TB is the documented threshold; one dissenter argued B on the 'at least' wording.",
    "conceptSummary": "Size Cloud SQL for SQL Server storage for 25k IOPS (≥4 TB SSD).",
    "correctRationale": "Persistent-disk IOPS scale with disk size, and the Cloud SQL for SQL Server best-practices doc recommends ≥4 TB SSD for the best IOPS. Standard edition (not Enterprise) covers this single-instance workload, so the 16 vCPU/104 GB/4 TB Standard option is the right sizing.",
    "optionRationales": [
      "Wrong: 800 GB on a 4-vCPU Standard type cannot reach 25k IOPS; disk size drives IOPS.",
      "Wrong: 200 GB SSD is far below what 25,000 IOPS requires regardless of vCPU/RAM.",
      "Correct: Standard edition with 4 TB SSD provides the disk-scaled IOPS for ~25k reads; no need for Enterprise.",
      "Wrong: Enterprise edition does not raise disk IOPS; 500 GB is too small for 25k IOPS."
    ]
  },
  {
    "id": 40,
    "topic": "Database Selection",
    "difficulty": 1,
    "question": "You need to redesign the architecture of an application that currently uses Cloud SQL for PostgreSQL. The users of the application complain about slow query response times. You want to enhance your application architecture to offer sub-millisecond query latency. What should you do?",
    "options": [
      "A. Configure Firestore, and modify your application to offload queries.",
      "B. Configure Bigtable, and modify your application to offload queries.",
      "C. Configure Cloud SQL for PostgreSQL read replicas to offload queries.",
      "D. Configure Memorystore, and modify your application to offload queries."
    ],
    "correct": 3,
    "explanation": "Sub-millisecond latency requires an in-memory cache layer (Memorystore) in front of Cloud SQL.",
    "discussion": [
      {
        "user": "pk349",
        "text": "D: Configure Memorystore and modify your application to offload queries. (8 votes)"
      },
      {
        "user": "GCP72",
        "text": "Sorry D is the correct answer https://cloud.google.com/blog/topics/developers-practitioners/what-memorystore/ (7 votes)"
      },
      {
        "user": "csrazdan",
        "text": "Selected Answer: D. The question says \"redesign the architecture of an application\" - Caching data using MemoryStore will trigger this. Read replica will require only updating connection details which would not be considered an application redesign. (6 votes)"
      },
      {
        "user": "theseawillclaim",
        "text": "Selected Answer: D. \"sub-millisecond latency\" always involves Memorystore. Furthermore, as we are talking about a relational DB (Cloud SQL), BigTable is not a solution to be considered. (5 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. A is wrong since Firestore would not offer sub-millisecond response. C would help, but sub-millisecond would still be hard to achieve. The question gives no justification for Bigtable and sub-millisecond response does strongly suggest reads from memory rather than disk. That leaves D as the best answer. (4 votes)"
      },
      {
        "user": "KennyHuang",
        "text": "Selected Answer: D. The recommended approach is to configure Memorystore (Redis) and modify your application to offload queries. This will allow you to take advantage of the sub-millisecond query latency provided by in-memory caching and significantly improve the performance of your application. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 40,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Strong consensus for D — 'sub-millisecond' is the Memorystore signature.",
    "conceptSummary": "Sub-millisecond reads via Memorystore caching.",
    "correctRationale": "Only an in-memory store reaches sub-millisecond query latency. Adding Memorystore (Redis/Memcached) as a cache in front of Cloud SQL, with the app reading hot data from cache, is the standard redesign for this requirement.",
    "optionRationales": [
      "Wrong: Firestore is durable disk-based storage; it does not deliver sub-millisecond query latency.",
      "Wrong: Bigtable is fast (single-digit ms) but not sub-millisecond, and is a data store, not a cache for a relational workload.",
      "Wrong: Read replicas still read from disk with ms-plus latency and cannot hit sub-millisecond times.",
      "Correct: Memorystore serves from memory, the only option that reaches sub-millisecond latency."
    ]
  },
  {
    "id": 39,
    "topic": "Backup & Recovery",
    "difficulty": 1,
    "question": "You are running an instance of Cloud Spanner as the backend of your ecommerce website. You learn that the quality assurance (QA) team has doubled the number of their test cases. You need to create a copy of your Cloud Spanner database in a new test environment to accommodate the additional test cases. You want to follow Google-recommended practices. What should you do?",
    "options": [
      "A. Use Cloud Functions to run the export in Avro format.",
      "B. Use Cloud Functions to run the export in text format.",
      "C. Use Dataflow to run the export in Avro format.",
      "D. Use Dataflow to run the export in text format."
    ],
    "correct": 2,
    "explanation": "Spanner exports run as Dataflow jobs and the full-database format is Avro — the documented way to produce a complete copy for a test environment.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C. A and B are wrong because Spanner exports are run as Dataflow jobs. The question says you need a copy of your entire database which means all the tables. You cannot export an entire database using the CSV (text) format, but you can using the Avro format. So that would make it the better option. https://cloud.google.com/spanner/docs/import-export-overview#file-format (5 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: C. Use Dataflow to run the export in Avro format. . https://cloud.google.com/spanner/docs/export (4 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: C. Answer is C, Dataflow and Avro format. Cloud functions has timeout Gen-1 6mins Gen-2 1hr (3 votes)"
      },
      {
        "user": "pk349",
        "text": "C: Use Dataflow to run the export in Avro format. (2 votes)"
      },
      {
        "user": "H_S",
        "text": "Although I agree with C, I don't know why not D (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 39,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — Dataflow job + Avro is the Spanner export mechanism.",
    "conceptSummary": "Copy a whole Spanner database via Dataflow export to Avro.",
    "correctRationale": "Spanner's export feature launches a Dataflow job that writes the full database in Avro format to Cloud Storage — the documented method for creating a complete database copy.",
    "optionRationales": [
      "Wrong: Spanner export is a managed Dataflow job, not a Cloud Function (and functions have execution limits anyway).",
      "Wrong: Same — wrong compute product, and text is not the full-database export format.",
      "Correct: Dataflow + Avro is the documented full-database export path.",
      "Wrong: Text/CSV export cannot capture an entire database export the way Avro does."
    ]
  },
  {
    "id": 38,
    "topic": "Connectivity & Networking",
    "difficulty": 2,
    "question": "You are migrating your data center to Google Cloud. You plan to migrate your applications to Compute Engine and your Oracle databases to Bare Metal Solution for Oracle. You must ensure that the applications in different projects can communicate securely and efficiently with the Oracle databases. What should you do?",
    "options": [
      "A. Set up a Shared VPC, configure multiple service projects, and create firewall rules.",
      "B. Set up Serverless VPC Access.",
      "C. Set up Private Service Connect.",
      "D. Set up Traffic Director."
    ],
    "correct": 0,
    "explanation": "Shared VPC lets multiple service projects reach the Bare Metal Solution attachment over private internal networking with controlled firewall rules.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. B is not applicable here. C is also not the case - don't confuse it with Private Google Access https://cloud.google.com/bare-metal/docs/bms-security#enforce-a-secure-perimeter-with-private-google-access We don't have a Service Mesh here, so D is also not an option. I go for A - https://cloud.google.com/bare-metal/docs/bms-security#:~:text=As%20shown%20in%20Figure%206%2C%20use%20a%20shared%20VPC%20architecture%20to%20allow%20resources%20from%20different%20projects%20to%20access%20the%20Bare%20Metal%20Solution%20servers (3 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: A. When you use Shared VPC, you designate a project as a host project and attach one or more other service projects to it. (3 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: A. A is the correct answer (3 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. B is wrong since Serverless VPC Access is for connecting to your VPC network from serverless environments (Cloud Run, App Engine, Cloud Functions). C is wrong as this concerns private consumption of services across VPC networks that belong to different groups, teams, projects, or organizations. D is wrong because it concerns application networking for services. Nothing in its documentation mentions BMS. That leaves A. I would prefer to have seen something about VPC network peering, but the clincher is firewall rules which you would use to limit IP traffic sources to the backend Oracle DBs residing in their own Google managed VPC on BMS. (2 votes)"
      },
      {
        "user": "H_S",
        "text": "Selected Answer: A. The answer is for sure A read the following; https://medium.com/google-cloud/shared-vpc-in-google-cloud-64527e0a409e#:~:text=Unlike%20VPC%20peering%2C%20Shared%20VPC%20connects%20projects%20within%20the%20same%20organization.&text=There%20are%20a%20lot%20of,between%20VPCs%20in%20different%20projects. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 38,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A; PSC and Serverless VPC Access are the wrong primitives for BMS.",
    "conceptSummary": "Cross-project access to Bare Metal via Shared VPC.",
    "correctRationale": "Bare Metal Solution peers with a VPC, and Shared VPC is the standard way to let applications across multiple service projects privately reach it while firewall rules enforce security.",
    "optionRationales": [
      "Correct: Shared VPC plus service projects is the documented pattern for multi-project private access to BMS.",
      "Wrong: Serverless VPC Access connects serverless products to the VPC; the apps run on Compute Engine.",
      "Wrong: Private Service Connect publishes/consumes managed services; BMS connectivity is provided over the customer VPC.",
      "Wrong: Traffic Director is for service-mesh traffic management, not basic private connectivity to BMS."
    ]
  },
  {
    "id": 37,
    "topic": "Operations & Maintenance",
    "difficulty": 1,
    "question": "You are starting a large CSV import into a Cloud SQL for MySQL instance that has many open connections. You checked memory and CPU usage, and sufficient resources are available. You want to follow Google-recommended practices to ensure that the import will not time out. What should you do?",
    "options": [
      "A. Close idle connections or restart the instance before beginning the import operation.",
      "B. Increase the amount of memory allocated to your instance.",
      "C. Ensure that the service account has the Storage Admin role.",
      "D. Increase the number of CPUs for the instance to ensure that it can handle the additional import operation."
    ],
    "correct": 0,
    "explanation": "Google's import best practices: too many active connections interfere with imports, so close idle connections or restart the instance first.",
    "discussion": [
      {
        "user": "GCP72",
        "text": "Selected Answer: A. The import operation is taking too long. Too many active connections can interfere with import operations. Close unused operations. Check the CPU and memory usage of your Cloud SQL instance to make sure there are plenty of resources available. The best way to ensure maximum resources for the import is to restart the instance before beginning the operation. A restart: Closes all connections. Ends any tasks that may be consuming resources https://cloud.google.com/sql/docs/mysql/import-export (3 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: A. Close idle connections or restart the instance before beginning the import operation. (3 votes)"
      },
      {
        "user": "fredcaram",
        "text": "Selected Answer: A. It should be A given the amount of opened connections (3 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. CPU and memory are OK so that elimiates B and D. C is nonsense which leaves A. This is supported by Google’s own documention (read recommended practices) which says close unused operations and re-start the instance. This is the best way to ensure maximum resources for the import operation. https://cloud.google.com/sql/docs/mysql/import-export#troubleshooting (2 votes)"
      },
      {
        "user": "chelbsik",
        "text": "To elaborate on C - it's required for the export into Cloud Storage, which is not the case https://cloud.google.com/sql/docs/postgres/import-export/import-export-csv#required_roles_and_permissions_for_exporting (2 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Close idle connections or restart the instance before beginning the import operation. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 37,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A per the import-export troubleshooting guidance.",
    "conceptSummary": "Prevent Cloud SQL import timeouts by clearing idle connections.",
    "correctRationale": "The Cloud SQL import troubleshooting doc says too many active connections can interfere with import operations; with CPU and memory already fine, the recommended action is closing unused connections or restarting the instance before importing.",
    "optionRationales": [
      "Correct: Closing idle connections/restarting is the documented fix when many connections threaten the import.",
      "Wrong: Memory is already sufficient — adding more does not address the connection contention.",
      "Wrong: The issue is import timeouts, not GCS access permissions.",
      "Wrong: CPU is already sufficient; vCPUs do not fix connection contention."
    ]
  },
  {
    "id": 36,
    "topic": "Backup & Recovery",
    "difficulty": 3,
    "question": "You released a popular mobile game and are using a 50 TB Cloud Spanner instance to store game data in a PITR-enabled production environment. When you analyzed the game statistics, you realized that some players are exploiting a loophole to gather more points to get on the leaderboard. Another DBA accidentally ran an emergency bugfix script that corrupted some of the data in the production environment. You need to determine the extent of the data corruption and restore the production environment. What should you do? (Choose two.)",
    "options": [
      "A. If the corruption is significant, use backup and restore, and specify a recovery timestamp.",
      "B. If the corruption is significant, perform a stale read and specify a recovery timestamp. Write the results back.",
      "C. If the corruption is significant, use import and export.",
      "D. If the corruption is insignificant, use backup and restore, and specify a recovery timestamp.",
      "E. If the corruption is insignificant, perform a stale read and specify a recovery timestamp. Write the results back."
    ],
    "correct": [
      0,
      4
    ],
    "explanation": "Google's PITR recovery doc: for significant corruption, restore (or export) the whole database at a past timestamp; for small/limited corruption, do a stale read at a timestamp and write the recovered rows back.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: AE. https://cloud.google.com/spanner/docs/pitr#ways-to-recover To recover the entire database, backup or export the database specifying a timestamp in the past and then restore or import it to a new database. This is typically used to recover from data corruption issues when you have to revert the entire database to a point-in-time before the corruption occurred. This part describes significant corruption - A To recover a portion of the database, perform a stale read specifying a query-condition and timestamp in the past, and then write the results back into the live database. This is typically used for surgical operations on a live database. For example, if you accidentally delete a particul… (12 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A, E. The answers are split between significant and insignificant. For insignificant, the simplest form of recovery would be E. That eliminates D. For significant, let’s assume that means a lot of data of the the 50 TB total. A stale read and write back would probably been too onerous, so that eliminates B. That leaves A and C. The question doesn’t mention anything about logical backups (export) which suggests a restore from a backup would be appropriate of a large amount of data that needed to be recovered. https://cloud.google.com/spanner/docs/pitr https://cloud.google.com/spanner/docs/backup/restore-backup (4 votes)"
      },
      {
        "user": "pk349",
        "text": "B: If the corruption is significant, perform a stale ***** read and specify a recovery timestamp. Write the results back. D: If the corruption is insignificant, use backup and ***** restore, and specify a recovery timestamp. (1 vote)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: BD. B. If the corruption is significant, perform a stale read and specify a recovery timestamp. Write the results back. D. If the corruption is insignificant, use backup and restore, and specify a recovery timestamp. (1 vote)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: BC. B. If the corruption is significant, perform a stale read and specify a recovery timestamp. Write the results back. C. If the corruption is significant, use import and export. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 36,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A+E, citing the Spanner PITR ways-to-recover documentation.",
    "conceptSummary": "Spanner PITR recovery: full restore for significant corruption, stale-read writeback for small corruption.",
    "correctRationale": "The Spanner point-in-time-recovery documentation splits recovery by extent: to recover the entire database you restore/import at a timestamp (significant corruption); to fix a limited portion you perform a stale read at a timestamp and write the results back to the live database (insignificant/surgical corruption).",
    "optionRationales": [
      "Correct: For significant corruption the doc prescribes backup/export at a recovery timestamp and restore into a new database.",
      "Wrong: A surgical stale-read writeback is for small portions; for significant corruption a full restore is appropriate.",
      "Wrong: 'Import and export' is part of the mechanism, but the doc pairs significant corruption with restore-at-timestamp; export alone is incomplete phrasing.",
      "Wrong: For insignificant corruption a full backup/restore is unnecessarily heavy; the surgical stale-read path is recommended.",
      "Correct: For insignificant corruption, a stale read at a recovery timestamp with write-back is the documented surgical fix."
    ]
  },
  {
    "id": 35,
    "topic": "Database Selection",
    "difficulty": 1,
    "question": "You are building an Android game that needs to store data on a Google Cloud serverless database. The database will log user activity, store user preferences, and receive in-game updates. The target audience resides in developing countries that have intermittent internet connectivity. You need to ensure that the game can synchronize game data to the backend database whenever an internet network is available. What should you do?",
    "options": [
      "A. Use Firestore.",
      "B. Use Cloud SQL with an external (public) IP address.",
      "C. Use an in-app embedded database.",
      "D. Use Cloud Spanner."
    ],
    "correct": 0,
    "explanation": "Firestore's mobile SDKs cache locally and sync to the serverless backend whenever connectivity returns — built for intermittent networks.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. B is wrong since that’s not secure and doesn’t make sense. C is bizarre and doesn’t leverage a GCP serverless database. The key is intermittent internet coverage, meaning real-time syncing is not needed and can be supported. That rules out Spanner, which leaves Firestore. Probably Datastore mode, not that the question mentions that. The link provided by GCP72 is spot on. (8 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: A. Android App -->> Cloud Firestone (4 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: A. A is a correct answer , Cloud Firestone https://firebase.google.com/docs/firestore (3 votes)"
      },
      {
        "user": "fredcaram",
        "text": "Selected Answer: A. A supports offline sync (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 35,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A — Firestore handles offline sync natively.",
    "conceptSummary": "Offline-tolerant mobile data sync with Firestore.",
    "correctRationale": "Firestore is the serverless document database whose Android SDK persists data locally and synchronizes automatically when the device regains connectivity — designed for intermittent networks.",
    "optionRationales": [
      "Correct: Firestore's offline persistence and automatic sync match intermittent connectivity for a game backend.",
      "Wrong: Cloud SQL over a public IP has no offline sync and exposes the database needlessly.",
      "Wrong: An embedded database never reaches Google Cloud, so there is no backend to sync to.",
      "Wrong: Spanner is a server-managed relational store without mobile offline-sync SDKs for this pattern."
    ]
  },
  {
    "id": 34,
    "topic": "High Availability & DR",
    "difficulty": 2,
    "question": "Your organization has a critical business app that is running with a Cloud SQL for MySQL backend database. Your company wants to build the most fault-tolerant and highly available solution possible. You need to ensure that the application database can survive a zonal and regional failure with a primary region of us-central1 and the backup region of us-east1. What should you do?",
    "options": [
      "A. Step 1: Provision a Cloud SQL for MySQL instance in us-central1-a.\nStep 2: Create a multiple-zone instance in us-west1-b.\nStep 3: Create a read replica in us-east1-c.",
      "B. Step 1: Provision a Cloud SQL for MySQL instance in us-central1-a.\nStep 2: Create a multiple-zone instance in us-central1-b.\nStep 3: Create a read replica in us-east1-b.",
      "C. Step 1: Provision a Cloud SQL for MySQL instance in us-central1-a.\nStep 2: Create a multiple-zone instance in us-east-b.\nStep 3: Create a read replica in us-east1-c.",
      "D. Step 1: Provision a Cloud SQL for MySQL instance in us-central1-a.\nStep 2: Create a multiple-zone instance in us-east1-b.\nStep 3: Create a read replica in us-central1-b."
    ],
    "correct": 1,
    "explanation": "HA requires the primary and standby in two zones of the primary region (us-central1), plus a cross-region read replica in the DR region us-east1 for regional failover.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "B. Cloud SQL is a regional service with read replicas allowed in other regions. So the answer must reference 2 different zones in the us-central1 region, one for the primary and one for the HA replica. A read replica needs to be in a zone within us-east1. The only options which provides that is B. (4 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: B. B is the correct answer (4 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. Very confusing description. My only guess is that steps 1 and 2 describe the same action - creating primary instance with multiple zones HA. This eliminates all answers but B, because you can only have HA setup within the same region. (2 votes)"
      },
      {
        "user": "sp57",
        "text": "B is correct. DR write-up helps... https://cloud.google.com/sql/docs/sqlserver/intro-to-cloud-sql-disaster-recovery (2 votes)"
      },
      {
        "user": "Ral17",
        "text": "Selected Answer: B. Cloud SQL is a regional service with read replicas allowed in other regions. So the answer must reference 2 different zones in the us-central1 region, one for the primary and one for the HA replica. A read replica needs to be in a zone within us-east1. (1 vote)"
      },
      {
        "user": "Steve8512",
        "text": "Selected Answer: B. The answers are badly worded. B looks right, but reads like there will be two instances, one single-zone and one HA, in the same region. Presumably it's actually describing a single HA instance in central1. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 34,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B: HA lives inside the primary region; the us-east1 replica covers regional failure.",
    "conceptSummary": "Zonal+regional fault tolerance: HA pair in us-central1, read replica in us-east1.",
    "correctRationale": "Cloud SQL HA keeps primary and standby in the same region but different zones; surviving a regional failure additionally requires a cross-region read replica in us-east1 that can be promoted. Only option B places the HA pair in us-central1 zones and the replica in us-east1.",
    "optionRationales": [
      "Wrong: The standby zone is in us-west1, not the primary region us-central1, so it is not the HA pair for this primary.",
      "Correct: HA standby in us-central1-b plus read replica in us-east1-b covers zonal and regional failure.",
      "Wrong: 'us-east' is not a valid zone, and the secondary zone sits in the DR region where the HA standby cannot be.",
      "Wrong: The HA standby is in the DR region (invalid — standby must share the primary region) and the read replica stays in the primary region, leaving no DR copy."
    ]
  },
  {
    "id": 33,
    "topic": "Capacity Planning & Cost",
    "difficulty": 1,
    "question": "Your company uses Bigtable for a user-facing application that displays a low-latency real-time dashboard. You need to recommend the optimal storage type for this read-intensive database. What should you do?",
    "options": [
      "A. Recommend solid-state drives (SSD).",
      "B. Recommend splitting the Bigtable instance into two instances in order to load balance the concurrent reads.",
      "C. Recommend hard disk drives (HDD).",
      "D. Recommend mixed storage types."
    ],
    "correct": 0,
    "explanation": "SSD storage is the recommended Bigtable tier for low-latency, real-time, read-intensive workloads.",
    "discussion": [
      {
        "user": "Kloudgeek",
        "text": "Correct answer is A. https://cloud.google.com/bigtable/docs/choosing-ssd-hdd (3 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. When you create a Bigtable instance you have to choose either SSD or HDD. The SSD options says, “Lower latency and more rows read per second. Typically used for real-time serving use cases, such as ad serving and mobile app recommendations”. User facing plus low latency plus read intensive equals SSD. (2 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: A. A is correct answer ,Question is about storage type so B is not a correct answer (2 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: A. A is correct answer ,Question is about storage type (hardware) (2 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Recommend solid-state drives ***** (SSD). (2 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: A. Recommend solid-state drives (SSD) (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 33,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Unanimous for A per the Bigtable SSD/HDD selection doc.",
    "conceptSummary": "Bigtable SSD vs HDD: SSD for real-time serving.",
    "correctRationale": "Google's Bigtable storage guidance: SSD gives lower latency and higher read throughput and is intended for real-time serving — exactly this dashboard. HDD is for latency-tolerant, batch/scan-heavy workloads.",
    "optionRationales": [
      "Correct: SSD is the documented choice for low-latency real-time reads.",
      "Wrong: Splitting into two instances is not how Bigtable scales reads — it scales by nodes, not instances.",
      "Wrong: HDD is cheaper but higher latency — opposite of the requirement.",
      "Wrong: Bigtable instances use a single storage type; 'mixed' is not an option."
    ]
  },
  {
    "id": 32,
    "topic": "Capacity Planning & Cost",
    "difficulty": 2,
    "question": "You support a consumer inventory application that runs on a multi-region instance of Cloud Spanner. A customer opened a support ticket to complain about slow response times. You notice a Cloud Monitoring alert about high CPU utilization. You want to follow Google-recommended practices to address the CPU performance issue. What should you do first?",
    "options": [
      "A. Increase the number of processing units.",
      "B. Modify the database schema, and add additional indexes.",
      "C. Shard data required by the application into multiple instances.",
      "D. Decrease the number of processing units."
    ],
    "correct": 0,
    "explanation": "When Spanner CPU exceeds the recommended level, the first remediation is to add compute capacity (nodes/processing units).",
    "discussion": [
      {
        "user": "njda",
        "text": "Selected Answer: A. In case of high CPU utilization like, mentioned in question, refer: https://cloud.google.com/spanner/docs/identify-latency-point#:~:text=Check%20the%20CPU%20utilization%20of%20the%20instance.%20If%20the%20CPU%20utilization%20of%20the%20instance%20is%20above%20the%20recommended%20level%2C%20you%20should%20manually%20add%20more%20nodes%2C%20or%20set%20up%20auto%20scaling. \"Check the CPU utilization of the instance. If the CPU utilization of the instance is above the recommended level, you should manually add more nodes, or set up auto scaling.\" Indexes and schema are reviewed post identifying query with slow performance. Refer : https://cloud.google.com/spanner/docs/troubleshootin… (3 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. B is wrong since that would increase CPU utilization even further and the question does not mention anything being wrong with index design. D is wrong since that would reduce CPU capacity and thus increase the load on the remaining CPUs. Cloud Spanner does not autoscale. It’s up to you to allocate the number of nodes or processing units to keep CPU utilization under 65%. So add more processing units. (3 votes)"
      },
      {
        "user": "learnazureportal",
        "text": "I surprised with the chosen answer. The correct answer is B. When addressing high CPU utilization in a Google Cloud Spanner instance, you should first consider B. Modify the database schema, and add additional indexes. High CPU utilization in a database often occurs due to inefficient queries or lack of appropriate indexes. (3 votes)"
      },
      {
        "user": "honeymania23",
        "text": "A seems to be the first go to choice, if that does not resolve we can move to other options, But first A. (3 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: A. Increase the number of processing units. (3 votes)"
      },
      {
        "user": "pk349",
        "text": "Compute capacity defines amount of server and storage resources that are available to the databases in an instance. When you create an instance, you specify its compute capacity as a number of processing ***** units or as a number of nodes, with 1000 processing units being equal to 1 node. range9005 (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 32,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A: add capacity first when Spanner CPU is over the recommended level.",
    "conceptSummary": "Remediate high Spanner CPU by adding processing units.",
    "correctRationale": "Google's Spanner latency-troubleshooting guidance says: if CPU utilization is above the recommended level, add more nodes or set up autoscaling. Indexes and schema changes are investigated after capacity is adequate.",
    "optionRationales": [
      "Correct: Adding processing units is the documented first response when CPU is above the recommended threshold.",
      "Wrong: Schema/index changes address slow queries, not raw CPU saturation — and are investigated after capacity.",
      "Wrong: Sharding into multiple instances is a re-architecture, not the first step.",
      "Wrong: Decreasing capacity would worsen CPU saturation."
    ]
  },
  {
    "id": 31,
    "topic": "Backup & Recovery",
    "difficulty": 1,
    "question": "You are managing a mission-critical Cloud SQL for PostgreSQL instance. Your application team is running important transactions on the database when another DBA starts an on-demand backup. You want to verify the status of the backup. What should you do?",
    "options": [
      "A. Check the cloudsql.googleapis.com/postgres.log instance log.",
      "B. Perform the gcloud sql operations list command.",
      "C. Use Cloud Audit Logs to verify the status.",
      "D. Use the Google Cloud Console."
    ],
    "correct": 1,
    "explanation": "gcloud sql operations list shows running instance operations — the documented way to see an in-progress backup's status.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "B. A is wrong. The cloudsql.googleapis.com/postgres.log log file could be used to find out who started the backup operation, not the status of the operation. C is wrong for a similar reason. D is partially right. In the console there’s an Operations option in the menu on the left. Click that and it shows “Creating backup” together a start time. That’s not a million miles different from the gcloud sql operations list command which shows similar output except there’s a STATUS: line showing the word RUNNING while the backup is in progress. Given the question specifically mentions “status”, B would be the better answer. Just. (7 votes)"
      },
      {
        "user": "Sekierer",
        "text": "Selected Answer: B. Should be B Perform the gcloud sql operations list command https://cloud.google.com/sql/docs/postgres/backup-recovery/backups#troubleshooting-backups Under Troubleshooting: Issue: \"You can't see the current operation's status.\" The Google Cloud console reports only success or failure when the operation is done. It isn't designed to show warnings or other updates. Run the gcloud sql operations list command to list all operations for the given Cloud SQL instance. A and C iis wrong because there are used for WHO issued the Backup, but not the current status of the backup D is wrong only shows success or failure in the Cloud Console but not the current status of the backup (4 votes)"
      },
      {
        "user": "juliorevk",
        "text": "Selected Answer: B. B to get the status using gcloud. D is possible but as mentioned, it doesn't specifically mention where in the console so B is a better answer. (2 votes)"
      },
      {
        "user": "honeymania23",
        "text": "gcloud sql backup list --instance= instance-id will give the status of backup for that particular instance. So B is good. (2 votes)"
      },
      {
        "user": "Kloudgeek",
        "text": "Correct answer is B. https://cloud.google.com/sql/docs/postgres/backup-recovery/backups#troubleshooting-backups (2 votes)"
      },
      {
        "user": "KennyHuang",
        "text": "Selected Answer: D. Using the Google Cloud Console is the most straightforward and convenient method for verifying the status of an on-demand backup for your mission-critical Cloud SQL for PostgreSQL instance. It provides a graphical interface that displays the backup status and any relevant details, enabling you to quickly assess the situation and ensure the integrity of your important transactions. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 31,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B per the backup-troubleshooting doc; the console only shows completed status.",
    "conceptSummary": "Check a running Cloud SQL backup's status with gcloud sql operations list.",
    "correctRationale": "The Cloud SQL troubleshooting doc for 'can't see the current operation status' directs you to gcloud sql operations list (or the Operations page), which reports the backup job as RUNNING — precisely what is needed while transactions continue.",
    "optionRationales": [
      "Wrong: The postgres.log shows who started the backup and DB events, not the operation's live status.",
      "Correct: gcloud sql operations list returns the backup operation with a STATUS field, the documented method for checking in-progress operations.",
      "Wrong: Audit logs record who initiated the backup, not its progress.",
      "Wrong: The console only reports success/failure once done per the troubleshooting note; gcloud gives the live status."
    ]
  },
  {
    "id": 30,
    "topic": "Capacity Planning & Cost",
    "difficulty": 1,
    "question": "Your company uses the Cloud SQL out-of-disk recommender to analyze the storage utilization trends of production databases over the last 30 days. Your database operations team uses these recommendations to proactively monitor storage utilization and implement corrective actions. You receive a recommendation that the instance is likely to run out of disk space. What should you do to address this storage alert?",
    "options": [
      "A. Normalize the database to the third normal form.",
      "B. Compress the data using a different compression algorithm.",
      "C. Manually or automatically increase the storage capacity.",
      "D. Create another schema to load older data."
    ],
    "correct": 2,
    "explanation": "The out-of-disk recommender's remediation is to increase storage capacity, manually or via automatic storage increase.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C. A is wrong since modifying the schemas to 3NF would use more disk. D is nonsense. B sounds vague at best and probably not supported at the database level. C is the best answer. The link provided by Kloudgeek is spot on. (6 votes)"
      },
      {
        "user": "Kloudgeek",
        "text": "Correct answer is C: https://cloud.google.com/sql/docs/mysql/using-ood-recommender#apply_recommendations (6 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: C. Manually or automatically increase the storage capacity. (2 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: C. C is the correct answer (2 votes)"
      },
      {
        "user": "lapeyus",
        "text": "Selected Answer: C. https://cloud.google.com/sql/docs/mysql/instance-settings#storage-capacity-2ndgen (1 vote)"
      },
      {
        "user": "pk349",
        "text": "C: Manually or automatically increase the storage capacity. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 30,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C per the out-of-disk recommender documentation.",
    "conceptSummary": "Remediate Cloud SQL out-of-disk risk by increasing storage capacity.",
    "correctRationale": "Google's out-of-disk recommender remediation is simply to grow storage — either increase capacity now or enable automatic storage increase so the instance scales before exhausting disk.",
    "optionRationales": [
      "Wrong: Normalizing schema is a design exercise, can increase storage, and is not a remediation for an imminent disk-full.",
      "Wrong: Compression does not address the documented remediation and may not be applicable.",
      "Correct: The recommender's apply step is increasing storage capacity, manually or automatically.",
      "Wrong: A separate schema does not reduce disk usage on the alerting instance."
    ]
  },
  {
    "id": 29,
    "topic": "Migration",
    "difficulty": 2,
    "question": "Your company is migrating the existing infrastructure for a highly transactional application to Google Cloud. You have several databases in a MySQL database instance and need to decide how to transfer the data to Cloud SQL. You need to minimize the downtime for the migration of your 500 GB instance. What should you do?",
    "options": [
      "A. Step 1: Create a Cloud SQL for MySQL instance for your databases, and configure Datastream to stream your database changes to Cloud SQL.\nStep 2: Select the Backfill historical data check box on your stream configuration to initiate Datastream to backfill any data that is out of sync between the source and destination.\nStep 3: Delete your stream when all changes are moved to Cloud SQL for MySQL, and update your application to use the new instance.",
      "B. Step 1: Create migration job using Database Migration Service.\nStep 2: Set the migration job type to Continuous, and allow the databases to complete the full dump phase and start sending data in change data capture (CDC) mode.\nStep 3: Wait for the replication delay to minimize, initiate a promotion of the new Cloud SQL instance, and wait for the migration job to complete.\nStep 4: Update your application connections to the new instance.",
      "C. Step 1: Create migration job using Database Migration Service.\nStep 2: Set the migration job type to One-time, and perform this migration during a maintenance window.\nStep 3: Stop all write workloads to the source database and initiate the dump. Wait for the dump to be loaded into the Cloud SQL destination database and the destination database to be promoted to the primary database.\nStep 4: Update your application connections to the new instance.",
      "D. Step 1: Use the mysqldump utility to manually initiate a backup of MySQL during the application maintenance window.\nStep 2: Move the files to Cloud Storage, and import each database into your Cloud SQL instance.\nStep 3: Continue to dump each database until all the databases are migrated.\nStep 4: Update your application connections to the new instance."
    ],
    "correct": 1,
    "explanation": "A Continuous Database Migration Service job does the initial dump plus CDC replication, then promotes with minimal downtime — the designed path for homogeneous MySQL→Cloud SQL.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "B. A is wrong because Datastream is a CDC and replication service for data synchronization across heterogeneous databases. It’s reasonable to assume you’ll be using Cloud SQL for MySQL, so you’ll be performing a homogeneous migration. Plus, while the a Datastream source can be MySQL, a Datastream target is either BigQuery or Cloud Storage and not Cloud SQL. See https://cloud.google.com/datastream/docs/overview. C is wrong because a one time migration wouldn’t capture all the data changes once the maintenance window ended and the apps were fired back up. Furthermore, stopping all writes during the dump would constitute downtime which the question wants minimized. D would take forever in a… (8 votes)"
      },
      {
        "user": "Kloudgeek",
        "text": "Correct option is B. You need to minimize the downtime of the application but option C refers to stop the app while migration to complete. (4 votes)"
      },
      {
        "user": "Pilot50",
        "text": "Selected Answer: B. C isn't correct since it will not minimize the downtime (2 votes)"
      },
      {
        "user": "fredcaram",
        "text": "Selected Answer: B. C is not minimizing the downtime (2 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: B. Continuous Migration with CDC (2 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: B. B is the correct answer (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 29,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B — continuous DMS is the documented minimal-downtime migration type.",
    "conceptSummary": "Homogeneous MySQL→Cloud SQL migration via continuous DMS job.",
    "correctRationale": "A continuous DMS migration job backfills the data then keeps the Cloud SQL target in sync via CDC, so downtime is limited to the promotion — the documented minimal-downtime path for a 500 GB MySQL instance.",
    "optionRationales": [
      "Wrong: Datastream targets heterogeneous/external replication destinations; homogeneous MySQL→Cloud SQL is DMS's job.",
      "Correct: DMS continuous mode backfills + CDC then promotes the Cloud SQL instance, minimizing downtime.",
      "Wrong: One-time DMS requires stopping writes during the dump — downtime for 500 GB is not minimal.",
      "Wrong: Repeated manual mysqldump cycles cannot keep the target in sync and stretch downtime badly."
    ]
  },
  {
    "id": 28,
    "topic": "Migration",
    "difficulty": 2,
    "question": "Your company is shutting down their data center and migrating several MySQL and PostgreSQL databases to Google Cloud. Your database operations team is severely constrained by ongoing production releases and the lack of capacity for additional on-premises backups. You want to ensure that the scheduled migrations happen with minimal downtime and that the Google Cloud databases stay in sync with the on-premises data changes until the applications can cut over. What should you do? (Choose two.)",
    "options": [
      "A. Use Database Migration Service to migrate the databases to Cloud SQL.",
      "B. Use a cross-region read replica to migrate the databases to Cloud SQL.",
      "C. Use replication from an external server to migrate the databases to Cloud SQL.",
      "D. Use an external read replica to migrate the databases to Cloud SQL.",
      "E. Use a read replica to migrate the databases to Cloud SQL."
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "DMS is the managed path for the migrations, and replication from an external server keeps Cloud SQL in sync until cutover — both minimize downtime.",
    "discussion": [
      {
        "user": "pk349",
        "text": "A: Use Database Migration Service ***** to migrate the databases to Cloud SQL. C: Use replication ***** from an external server to migrate the databases to Cloud SQL. (2 votes)"
      },
      {
        "user": "GCP72",
        "text": "A & C is the correct Answer (2 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A, C. B doesn’t make sense since the DBs aren’t in Cloud SQL yet. D and E don’t makes sense because no method is attached to either answer and you wouldn’t use a read replica as a source anyway. That leaves A and C. A makes sense since it can be scheduled and is online hence little/no downtime. Native DB replication of an external (on prem) server is basically what the Database Migration Service is doing. Which makes C correct as well. (1 vote)"
      },
      {
        "user": "juliorevk",
        "text": "Selected Answer: AC. A because Database migration service is the managed offering C because the external server is used for migration. The others aren't approaches aren't actual methods for migration. (1 vote)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: AC. A is Database Migration Service to migrate the databases with CDC C is Replication from an external server is used to Migration Database to Cloud SQL (1 vote)"
      },
      {
        "user": "lapeyus",
        "text": "Selected Answer: AC. https://cloud.google.com/sql/docs/mysql/replication/manage-replicas#basic-steps-to-change-parallel-replication-flags (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 28,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A+C — DMS and external-server replication are the two continuous-sync paths.",
    "conceptSummary": "Minimal-downtime migrations via DMS and external-server replication.",
    "correctRationale": "Two mechanisms deliver low-downtime migration with continuous sync: Database Migration Service performs managed migrations to Cloud SQL including CDC, and replication from an external server replicates the on-premises MySQL into Cloud SQL until cutover. Both avoid new on-prem backup capacity the constrained team lacks.",
    "optionRationales": [
      "Correct: DMS handles MySQL and PostgreSQL sources to Cloud SQL with continuous replication — minimal downtime and managed.",
      "Wrong: A cross-region read replica is a Cloud SQL-to-Cloud SQL feature, not a migration path from on-premises.",
      "Correct: External-server replication keeps the Cloud SQL target in sync with the live on-prem databases until cutover.",
      "Wrong: 'External read replica' is not the migration mechanism name; the source here is external, making replication-from-external-server the fit.",
      "Wrong: A plain read replica assumes an existing Cloud SQL primary; nothing is in Cloud SQL yet."
    ]
  },
  {
    "id": 27,
    "topic": "Replication & Read Replicas",
    "difficulty": 3,
    "question": "You are using Compute Engine on Google Cloud and your data center to manage a set of MySQL databases in a hybrid configuration. You need to create replicas to scale reads and to offload part of the management operation. What should you do?",
    "options": [
      "A. Use external server replication.",
      "B. Use Data Migration Service.",
      "C. Use Cloud SQL for MySQL external replica.",
      "D. Use the mysqldump utility and binary logs."
    ],
    "correct": 2,
    "explanation": "A Cloud SQL for MySQL external replica replicates from the existing external MySQL primary into a managed Cloud SQL instance, scaling reads and offloading management.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C. D is nonsense, so can be eliminated. The question tells us we’re already managing BOTH sets of MySQL instances, one on prem and the other in GCE. The question also says an objective is to offload part of the management. That can only mean leverage a managed service. The Data(base) Migration Service is a managed service used to instantiate a new migrated DB in Cloud SQL (or AlloyDB for PostgreSQL but that’s not in scope here). The question isn’t asking about database migration, so we can eliminate B. A could be used to create replicas, but doesn’t help with offloading management operations. That leaves C which does use a managed service which could be leveraged to create replicas. (17 votes)"
      },
      {
        "user": "zanhsieh",
        "text": "Selected Answer: A. A A: CORRECT. External server replication meant to serve the case as the question describe: DC -> GSQL. B: WRONG. DMS intends for one time migration + CDC but does not mean to serve as primary + replica fashion. The replica is not ready to serve the traffic. C: WRONG. Cloud SQL for MySQL external replica meant to serve the replica is outside of Google cloud, which means GSQL -> GSQL or GSQL -> DC. D: WRONG. This option is for one time only. Reference: https://cloud.google.com/sql/docs/mysql/replication/external-server https://cloud.google.com/sql/docs/mysql/replication https://cloud.google.com/database-migration/docs/overview#use_cases (5 votes)"
      },
      {
        "user": "KennyHuang",
        "text": "Selected Answer: A. By using external server replication, you can set up and manage replication between your on-premises MySQL database and a replica instance in Google Cloud. This enables you to scale reads, offload management operations, and distribute the workload between your data center and Google Cloud, providing the desired benefits in a hybrid configuration. (4 votes)"
      },
      {
        "user": "Tharun1125438",
        "text": "Selected Answer: A. I strongly believe it is A. Since the database is already in your datacenter. So you need to replicate your datacenter database to cloud to offload management. External Server Replication will replicate your database on to cloud sql. https://cloud.google.com/sql/docs/mysql/replication/external-server (4 votes)"
      },
      {
        "user": "Kloudgeek",
        "text": "Correct answer is C: https://cloud.google.com/sql/docs/mysql/replication/create-replica , Use Read Replica, in this case we can use Cloud SQL as read replica to offload the read requests and scaling (3 votes)"
      },
      {
        "user": "BIGQUERY_ALT_ALT",
        "text": "Selected Answer: C. C is the answer as Question mentions offload part of the management operation (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 27,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Split between C (Cloud SQL external replica) and A (external server replication). The loaded answer follows the community majority: the question asks for managed offload, which is what a Cloud SQL external replica provides.",
    "conceptSummary": "Scale reads into Google Cloud with a Cloud SQL external replica.",
    "correctRationale": "The team already runs MySQL both on-prem and on Compute Engine; to add managed replicas they create a Cloud SQL for MySQL external replica of the existing external primary. That scales read capacity and hands replication, patching and backups to Cloud SQL — offloading management.",
    "optionRationales": [
      "Wrong: 'External server replication' describes the mechanism direction but not the managed landing zone that offloads management — the managed product is the Cloud SQL external replica.",
      "Wrong: DMS is for one-time/CDC migrations to Cloud SQL, not an ongoing read-scaling replica topology.",
      "Correct: A Cloud SQL external replica continuously replicates the existing MySQL primary into a managed instance for read scaling and management offload.",
      "Wrong: Manual mysqldump+binlog replication is DIY and adds operational burden rather than offloading it."
    ]
  },
  {
    "id": 26,
    "topic": "Migration",
    "difficulty": 2,
    "question": "You plan to use Database Migration Service to migrate data from a PostgreSQL on-premises instance to Cloud SQL. You need to identify the prerequisites for creating and automating the task. What should you do? (Choose two.)",
    "options": [
      "A. Drop or disable all users except database administration users.",
      "B. Disable all foreign key constraints on the source PostgreSQL database.",
      "C. Ensure that all PostgreSQL tables have a primary key.",
      "D. Shut down the database before the Data Migration Service task is started.",
      "E. Ensure that pglogical is installed on the source PostgreSQL database."
    ],
    "correct": [
      2,
      4
    ],
    "explanation": "DMS for PostgreSQL requires every table to have a primary key (tables without one need a workaround) and pglogical installed on the source.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C, E. A is wrong because you want user accounts migrated as well as the data. B is nonsense. D is also nonsense since the DMS is an online migration. That leave C and E, both of which are mentioned in the Google doc: https://cloud.google.com/database-migration/docs/postgres/configure-source-database (5 votes)"
      },
      {
        "user": "DeeData",
        "text": "You are sure to know the answer is CE if you did the labs😂 (4 votes)"
      },
      {
        "user": "Hilab",
        "text": "C. Ensure that all PostgreSQL tables have a primary key. E. Ensure that pglogical is installed on the source PostgreSQL database. When using Database Migration Service to migrate data from a PostgreSQL on-premises instance to Cloud SQL, it is important to ensure that all PostgreSQL tables have a primary key. This is because Cloud SQL requires tables to have a primary key to enable replication and ensure data consistency. It is also important to ensure that pglogical is installed on the source PostgreSQL database. This is because pglogical is used by Database Migration Service to replicate data changes from the source database to the target Cloud SQL instance. Options A and D are not prere… (3 votes)"
      },
      {
        "user": "RaphaelG",
        "text": "so true!! I remember doing the challenge on my own for like 2 days to make certain I've got it all right; so the number of times I actually had to install pglogical and create primary keys on tables were ridiculous! :D (3 votes)"
      },
      {
        "user": "Pilot50",
        "text": "Selected Answer: CE. https://cloud.google.com/database-migration/docs/postgres/faq (3 votes)"
      },
      {
        "user": "sp57",
        "text": "Found this confirming C - was not option prior to 6/2022 - Tables without primary keys on the source PostgreSQL database are not migrated. For those tables, DMS migrated only the schema. This is no longer a limitation after the June 2022 product update. Additional good content beyond scope of question in source link...https://cloud.google.com/blog/products/databases/reduce-downtime-for-postgresql-migration-to-google-cloud-sql (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 26,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C+E; practitioners who ran the lab confirm the primary-key and pglogical prerequisites.",
    "conceptSummary": "DMS PostgreSQL prerequisites: primary keys and pglogical on the source.",
    "correctRationale": "The DMS PostgreSQL documentation lists the prerequisites: all tables must have a primary key (or replica identity) so changes replicate row-accurately, and the pglogical extension must be installed/enabled on the source database for logical replication into Cloud SQL.",
    "optionRationales": [
      "Wrong: Dropping users is not required; migration needs its own service accounts anyway.",
      "Wrong: Foreign keys need not be disabled; DMS handles them during migration.",
      "Correct: Primary keys on all tables are a documented DMS prerequisite for row-level replication.",
      "Wrong: DMS is an online migration service — the source stays up.",
      "Correct: pglogical on the source is required for the logical replication DMS uses with Cloud SQL for PostgreSQL."
    ]
  },
  {
    "id": 25,
    "topic": "Backup & Recovery",
    "difficulty": 1,
    "question": "Your organization deployed a new version of a critical application that uses Cloud SQL for MySQL with high availability (HA) and binary logging enabled to store transactional information. The latest release of the application had an error that caused massive data corruption in your Cloud SQL for MySQL database. You need to minimize data loss. What should you do?",
    "options": [
      "A. Open the Google Cloud Console, navigate to SQL > Backups, and select the last version of the automated backup before the corruption.",
      "B. Reload the Cloud SQL for MySQL database using the LOAD DATA command to load data from CSV files that were used to initialize the instance.",
      "C. Perform a point-in-time recovery of your Cloud SQL for MySQL database, selecting a date and time before the data was corrupted.",
      "D. Fail over to the Cloud SQL for MySQL HA instance. Use that instance to recover the transactions that occurred before the corruption."
    ],
    "correct": 2,
    "explanation": "Binary logging is enabled, so point-in-time recovery to just before the corruption minimizes data loss.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C. The question specifically mentions binary logging and the binary logs are used by point-in-time recovery. D doesn’t buy you anything since the corrupt data would also be on the HA replica you fail over to. B looks like a lot of work and if the Cloud SQL instance were instantiated a while ago, option B could take a long time. A would work but the backup could have been taken a while before the corruption began. In which case restoring using that backup would wipe all the good data up to the point of corruption. The question asks for minimal data loss and the only way to ensure that is to restore to a point-in-time just before the corruption began. (7 votes)"
      },
      {
        "user": "Kloudgeek",
        "text": "Correct Answer C: Binary Logging enabled, with that you can identify the point of time the data was good and recover from that point time. https://cloud.google.com/sql/docs/mysql/backup-recovery/pitr#perform_the_point-in-time_recovery_using_binary_log_positions (3 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: C. Binary logging --> Point in Recovery (3 votes)"
      },
      {
        "user": "Hilab",
        "text": "C. Perform a point-in-time recovery of your Cloud SQL for MySQL database, selecting a date and time before the data was corrupted. Performing a point-in-time recovery is the best option to minimize data loss in case of data corruption. Point-in-time recovery restores the database to a specific point in time before the data was corrupted, by replaying the binary logs that were generated since the selected time. This option is available when binary logging is enabled on Cloud SQL for MySQL with high availability. Option A, restoring from an automated backup, can lead to data loss because it might not contain all the changes made to the database after the backup was taken. Option B, reloadin… (2 votes)"
      },
      {
        "user": "fredcaram",
        "text": "Selected Answer: C. Since it is retaining transaction log, point in time recovery is enabled and that would be the best option (2 votes)"
      },
      {
        "user": "zanhsieh",
        "text": "Selected Answer: A. A. Originally I thought it was C, but after reading mysql best practices as well as Kloudgeek link carefully I changed my answer. In Cloud SQL best-practice: https://cloud.google.com/sql/docs/mysql/best-practices \"A point-in-time recovery always creates a new instance; you cannot perform a point-in-time recovery to an existing instance.\" Kloudgeek's link (why gcloud command use clone?): https://cloud.google.com/sql/docs/mysql/backup-recovery/pitr#perform-pitr-binlog \"gcloud sql instances clone instance1 \\ instance1-clone \\ --bin-log-file-name=mysql-bin.0000031 \\ --bin-log-position=107\" It seems to me that the question does not expect Cloud SQL instance switched just be… (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 25,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — binary logging exists precisely to enable point-in-time recovery.",
    "conceptSummary": "Data corruption recovery via Cloud SQL PITR.",
    "correctRationale": "With binary logging on, PITR lets you recover the instance to a timestamp before the corrupted release — the documented recovery path that loses the least data.",
    "optionRationales": [
      "Wrong: The last automated backup is a coarse recovery point and discards all good transactions since that backup.",
      "Wrong: Rebuilding from initialization CSVs loses all subsequent transactions entirely.",
      "Correct: PITR replays the binary logs to a point just before corruption, minimizing loss.",
      "Wrong: The HA standby mirrors the same corrupted data; failover does not remove the corruption."
    ]
  },
  {
    "id": 24,
    "topic": "Connectivity & Networking",
    "difficulty": 3,
    "question": "You are running a mission-critical application on a Cloud SQL for PostgreSQL database with a multi-zonal setup. The primary and read replica instances are in the same region but in different zones. You need to ensure that you split the application load between both instances. What should you do?",
    "options": [
      "A. Use Cloud Load Balancing for load balancing between the Cloud SQL primary and read replica instances.",
      "B. Use PgBouncer to set up database connection pooling between the Cloud SQL primary and read replica instances.",
      "C. Use HTTP(S) Load Balancing for database connection pooling between the Cloud SQL primary and read replica instances.",
      "D. Use the Cloud SQL Auth proxy for database connection pooling between the Cloud SQL primary and read replica instances."
    ],
    "correct": 0,
    "explanation": "A TCP-level load balancer (e.g. HAProxy via Cloud Load Balancing) distributes connections between the primary and read replica; the Auth proxy does no pooling or balancing.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. Eliminate D because Cloud SQL Auth Proxy by itself does not provide connection pooling. There’s nothing in the question about needing to load balance HTTP traffic specifically, so ignore C. B is eliminated on the basis Pgbouncer does not have multi-host configuration, failover, or detection and the question specifically says “mission critical”. That leaves A which makes sense since Google Cloud Load Balancer is a regional service and the question specifically mentions a single region. (12 votes)"
      },
      {
        "user": "Teraflow",
        "text": "Selected Answer: A. https://cloud.google.com/blog/products/databases/using-haproxy-to-scale-read-only-workloads-on-cloud-sql-for-postgresql (4 votes)"
      },
      {
        "user": "sp57",
        "text": "Per GPC72's referenced link, you need PgBouncer only does connection pooling, need Load balancing coupled. Since Load Balancing not referenced in B., is not A the best answer? PgBouncer is a popular connection pooler designed for PostgreSQL, but it is not enough to achieve PostgreSQL High Availability by itself as it doesn’t have multi-host configuration, failover, or detection. Using a Load Balancer is a way to have High Availability in your database topology. It could be useful for redirecting traffic to healthy database nodes, distribute the (3 votes)"
      },
      {
        "user": "PKookNN",
        "text": "Selected Answer: B. Cloud Load Balancing can't be used to LB cloud SQL (it's mostly for VM), so you can choose to use HAProxy or PGBouncer as Google recommend connection pooling (https://cloud.google.com/sql/docs/postgres/replication#rr-info) (3 votes)"
      },
      {
        "user": "BenMS",
        "text": "Selected Answer: A. As others have said, A is the only option which could achieve the desired effect, providing TCP load balancing across multiple servers. (3 votes)"
      },
      {
        "user": "studymoreoften",
        "text": "Selected Answer: B. Cloud SQL doesn't provide load balancing between replicas. You can choose to implement load balancing for your Cloud SQL instance. You can also use connection pooling to distribute queries across replicas with your load balancing setup for better performance. https://cloud.google.com/sql/docs/postgres/replication#:~:text=Cloud%20SQL%20doesn't%20provide,balancing%20setup%20for%20better%20performance.&text=You%20can't%20configure%20maintenance%20windows%20on%20a%20read%20replica. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 24,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Split between A (load balancer) and B (PgBouncer). The community majority favors A; PgBouncer only pools toward one endpoint and cannot split load between two instances.",
    "conceptSummary": "Split read/write load across Cloud SQL primary and read replica via TCP load balancing.",
    "correctRationale": "To share application load between a primary and its read replica you need something that distributes TCP connections across both endpoints. Google's documented pattern uses a TCP load balancer (HAProxy-style) in front of Cloud SQL; PgBouncer only pools connections to one target and the Auth proxy provides connectivity, not pooling or balancing.",
    "optionRationales": [
      "Correct: A TCP load balancer can distribute connections across the primary and read replica, splitting the application load as required.",
      "Wrong: PgBouncer pools connections but does not itself route reads to the replica and writes to the primary for load splitting.",
      "Wrong: HTTP(S) load balancing speaks HTTP, not PostgreSQL wire protocol.",
      "Wrong: Cloud SQL Auth proxy encrypts connectivity; it performs no connection pooling or load distribution."
    ]
  },
  {
    "id": 23,
    "topic": "Backup & Recovery",
    "difficulty": 2,
    "question": "You need to perform a one-time migration of data from a running Cloud SQL for MySQL instance in the us-central1 region to a new Cloud SQL for MySQL instance in the us-east1 region. You want to follow Google-recommended practices to minimize performance impact on the currently running instance. What should you do?",
    "options": [
      "A. Create and run a Dataflow job that uses JdbcIO to copy data from one Cloud SQL instance to another.",
      "B. Create two Datastream connection profiles, and use them to create a stream from one Cloud SQL instance to another.",
      "C. Create a SQL dump file in Cloud Storage using a temporary instance, and then use that file to import into a new instance.",
      "D. Create a CSV file by running the SQL statement SELECT...INTO OUTFILE, copy the file to a Cloud Storage bucket, and import it into a new instance."
    ],
    "correct": 2,
    "explanation": "A serverless export (SQL dump to Cloud Storage via a temporary instance) offloads the export work so the running primary sees minimal performance impact.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "C. The only way to minimize performance impact of running an export on a Cloud SQL instance is to use a serverless export. The fact that no data synchronization is needed since it’s a one off eliminates every option apart from C. (3 votes)"
      },
      {
        "user": "pk349",
        "text": "C: Create a SQL dump file in Cloud Storage using a temporary instance, and then use that file to import into a new instance. (1 vote)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: C. C - serverless export https://cloud.google.com/sql/docs/mysql/import-export#serverless (1 vote)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: C. C is the correct answer (1 vote)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: C. C looks simple and ok. (1 vote)"
      },
      {
        "user": "PKookNN",
        "text": "Selected Answer: C. C is simple and works (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 23,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C — serverless export is the documented way to export without hurting the live instance.",
    "conceptSummary": "Low-impact Cloud SQL export via serverless export to Cloud Storage.",
    "correctRationale": "For a one-time copy, Cloud SQL offers a serverless export: a temporary Google-managed instance performs the mysqldump-style export to Cloud Storage instead of the production instance, minimizing performance impact. Importing that dump into the new us-east1 instance finishes the move.",
    "optionRationales": [
      "Wrong: A Dataflow JdbcIO copy reads heavily from the source instance — exactly the performance impact to avoid.",
      "Wrong: Datastream streams from a source endpoint to a destination; it is for continuous replication, not a one-time copy, and still reads from the source.",
      "Correct: Serverless export creates the dump on a temporary instance, protecting the running primary, and the file imports cleanly into the new instance.",
      "Wrong: SELECT...INTO OUTFILE runs on the production instance, loading it during the export."
    ]
  },
  {
    "id": 22,
    "topic": "Capacity Planning & Cost",
    "difficulty": 2,
    "question": "Your application follows a microservices architecture and uses a single large Cloud SQL instance, which is starting to have performance issues as your application grows. in the Cloud Monitoring dashboard, the CPU utilization looks normal You want to follow Google-recommended practices to resolve and prevent these performance issues while avoiding any major refactoring. What should you do?",
    "options": [
      "A. Use Cloud Spanner instead of Cloud SQL.",
      "B. Increase the number of CPUs for your instance.",
      "C. Increase the storage size for the instance.",
      "D. Use many smaller Cloud SQL instances."
    ],
    "correct": 3,
    "explanation": "Google's Cloud SQL best-practices doc recommends splitting very large instances into smaller ones — a natural fit for a microservices estate — without replatforming.",
    "discussion": [
      {
        "user": "Kloudgeek",
        "text": "Correct answer is D. https://cloud.google.com/sql/docs/mysql/best-practices#data-arch - Split your large instances into smaller instances, where possible. (14 votes)"
      },
      {
        "user": "fraloca",
        "text": "Selected Answer: C. The solution D is better if we can execute a massive refactor. So, the best solution is C because if CPU is normal, the issue is the capacity of the I/O. For increase it, it's enough increase the disk storage. Source: https://cloud.google.com/sql/docs/sqlserver/best-practices (10 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. Needing to avoid any major refactoring eliminates A. The question states CPU is not an issue, so that eliminates B. Adding more storage would increase IOPS, but there’s no indication network throughput is an issue, so that eliminates C. That leaves D. A microservice architecture is supposed to use a separate database for each microservice, rather than one big database for all the microservices. So D it is. The link provided by Kloudgeek is spot on. (6 votes)"
      },
      {
        "user": "juliorevk",
        "text": "Selected Answer: D. It's a microservices architecture and CPU utilization is normal. This means that having multiple Cloud SQL instances will help for each microservice. (3 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: D. Split CloudSql instance into many small instances to support Microservices (3 votes)"
      },
      {
        "user": "pk349",
        "text": "D: Use many smaller ***** Cloud SQL instances. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 22,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Community split between D (split instances, per the best-practices doc) and C (grow storage). The loaded answer is D: with CPU normal and no storage/IOPS symptom, only the documented 'split large instances' guidance addresses growth-related contention.",
    "conceptSummary": "Split an overgrown Cloud SQL instance per microservice boundaries.",
    "correctRationale": "With CPU normal and a single instance straining under a growing microservices app, the documented Cloud SQL best practice is to divide large instances into smaller instances aligned with the workload. Using per-service instances matches the microservices architecture, removes the contention, and requires no application rewrite.",
    "optionRationales": [
      "Wrong: Migrating to Spanner is a major replatform (schema, SQL dialect, drivers) — the opposite of avoiding refactoring.",
      "Wrong: More CPUs is useless when CPU utilization is already normal.",
      "Wrong: More storage only buys IOPS/throughput if storage-bound, which the question does not indicate.",
      "Correct: The Cloud SQL best-practices guide explicitly recommends splitting large instances into smaller ones; microservice-aligned instances resolve the contention without refactoring."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 21,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "Your team uses thousands of connected IoT devices to collect device maintenance data for your oil and gas customers in real time. You want to design inspection routines, device repair, and replacement schedules based on insights gathered from the data produced by these devices. You need a managed solution that is highly scalable, supports a multi-cloud strategy, and offers low latency for these IoT devices. What should you do?",
    "options": [
      "A. Use Firestore with Looker.",
      "B. Use Cloud Spanner with Data Studio.",
      "C. Use MongoDB Atlas with Charts.",
      "D. Use Bigtable with Looker."
    ],
    "correct": 2,
    "explanation": "'Supports a multi-cloud strategy' is the discriminator: MongoDB Atlas is a managed database service that runs on Google Cloud, AWS and Azure, and MongoDB Charts provides the analytics insights.",
    "discussion": [
      {
        "user": "KennyHuang",
        "text": "Selected Answer: D. By combining Google Cloud IoT Core for device management and data ingestion, Google Cloud Bigtable for storing and processing IoT data with low latency, and Looker for advanced analytics and visualization, you can build a highly scalable, multi-cloud compatible, and low-latency solution to address your IoT device maintenance requirements effectively. (10 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. The question says a managed solution, so that eliminates C. Firestore and Spanner do not have the scalability or low latency required. This leaves D. Bigtable by itself is a GCP thing, but Looker allows data visualization across multiple cloud environments. https://www.looker.com/google-cloud/ (6 votes)"
      },
      {
        "user": "Ravi_Mangalpally",
        "text": "The answer is D. Use Bigtable with Looker. Bigtable is a fully managed, petabyte-scale NoSQL wide column database service for storing large amounts of data. It is designed for low latency, high throughput, and scalability. Bigtable is a good choice for storing IoT data because it can handle the high volume of data generated by IoT devices and provide low latency for real-time analysis. Looker is a business intelligence and data analytics platform that can be used to visualize and analyze data stored in Bigtable. Looker provides a variety of features that can be used to design inspection routines, device repair, and replacement schedules based on insights gathered from the data produced by… (4 votes)"
      },
      {
        "user": "theseawillclaim",
        "text": "Selected Answer: C. \"Multi-cloud\" is the key that rules out everything except C. (4 votes)"
      },
      {
        "user": "BenMS",
        "text": "Selected Answer: C. This is a curious question! This scenario has BigTable written all over it - large amounts of data from many devices to be analysed in realtime. I would even argue it could qualify as a multicloud solution, given the links to HBASE. BUT it does not support SQL queries and is not therefore compatible (on its own) with Looker. Firestore + Looker has the same problem. Spanner + Data Studio is at least a compatible pairing, but I agree with others that it doesn't fit this use-case - not least because it's Google-native. By contrast, MongoDB Atlas is a managed solution (just not by Google) which is compatible with the proposed reporting tool (Mongo's own Charts), it's specifically designed for… (3 votes)"
      },
      {
        "user": "Ramheadhunter",
        "text": "Selected Answer: C. Every thing in this question points to D except for one scenario \"multi-cloud\". So just becuase multi cloud is specified, I choose 'C' (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 21,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "The vote was nearly tied (35 D vs 34 C). The loaded answer is C: 'supports a multi-cloud strategy' requires the database tier itself to run across clouds — Atlas does; Bigtable, however well suited to IoT ingestion, does not.",
    "conceptSummary": "IoT sensor DB + insights under a multi-cloud mandate → MongoDB Atlas + Charts.",
    "correctRationale": "The multi-cloud requirement eliminates the Google-only database option. MongoDB Atlas is a managed partner DBaaS available across Google Cloud, AWS and Azure, well suited to IoT sensor streams, and MongoDB Charts supplies the real-time insights layer — the only option satisfying both the workload and the multi-cloud mandate.",
    "optionRationales": [
      "Wrong: Cloud SQL for PostgreSQL is Google-Cloud-only and not the multi-cloud IoT/time-series fit.",
      "Wrong: BigQuery ML is analytics, not the low-latency operational sensor database.",
      "Correct: MongoDB Atlas runs across all three clouds and Charts delivers the insights — the only multi-cloud pair.",
      "Wrong: Bigtable + Looker is a strong IoT/low-latency fit, but Bigtable is Google-Cloud-only and fails the multi-cloud requirement."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 20,
    "topic": "Migration",
    "difficulty": 2,
    "question": "Your customer is running a MySQL database on-premises with read replicas. The nightly incremental backups are expensive and add maintenance overhead. You want to follow Google-recommended practices to migrate the database to Google Cloud, and you need to ensure minimal downtime. What should you do?",
    "options": [
      "A. Create a Google Kubernetes Engine (GKE) cluster, install MySQL on the cluster, and then import the dump file.",
      "B. Use the mysqldump utility to take a backup of the existing on-premises database, and then import it into Cloud SQL.",
      "C. Create a Compute Engine VM, install MySQL on the VM, and then import the dump file.",
      "D. Create an external replica, and use Cloud SQL to synchronize the data to the replica."
    ],
    "correct": 3,
    "explanation": "Replicate the on-prem MySQL to a Cloud SQL external replica, let it synchronize, then promote — minimal downtime and a managed landing zone.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "D. The question says backups and maintenance are an issue, so moving to a managed service (Cloud SQL) would be the right thing to do. That eliminates C and A. Option B could (depending upon the DB size) require a lot of downtime to export, copy the dump file to Cloud Storage, then import into Cloud SQL. Therefore, the least amount of downtime would be D. https://cloud.google.com/sql/docs/mysql/replication/configure-replication-from-external (8 votes)"
      },
      {
        "user": "RaphaelG",
        "text": "The only issue that I have with the D answer is that an external replica is an explicit Cloud SQL concept not a MySQL concept; external replica is when you have a primary instance already in Cloud SQL, however, if you have your MySQL on premises then you are dealing with replication from an external server. I have read documentation for CloudSQL for MySQL before and I am more convinced with B to be frank (5 votes)"
      },
      {
        "user": "SidsA",
        "text": "Correct answer is D: Create cloudsql replica of on-prem server and promote with almost-no downtime by pointing app to cloudsql. mysqldump is heavy and time-consuming operation (even though if you run it on on-prem read-replica, it will be identical to migrating to cloudsql using managed database migration service. (4 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: D. minimal downtime!!! And the customer has read replicas + backups are expensive. D is the better option (4 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: B. https://cloud.google.com/database-migration/docs/mysql/mysql-dump (4 votes)"
      },
      {
        "user": "kkjw",
        "text": "External replica is a setup with primary on cloud an the replica external to the cloud .eg.e on prem.. which is the reverse of what the question is looking for (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 20,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Majority for D — continuous replication to a Cloud SQL replica minimizes downtime versus dump/restore.",
    "conceptSummary": "Minimal-downtime MySQL migration via Cloud SQL external replica.",
    "correctRationale": "Since the source already has read replicas and downtime must be minimal, the recommended path is an external/Cloud SQL replica of the on-premises primary: it syncs continuously, so cutover is just a promotion — far less downtime than a dump/restore cycle, and it lands on a managed service that removes the backup and maintenance overhead.",
    "optionRationales": [
      "Wrong: MySQL on GKE is self-managed and preserves the operational overhead the customer wants to remove.",
      "Wrong: mysqldump restore requires the application to stay down for the full dump+import window — not minimal downtime.",
      "Wrong: A self-managed MySQL VM keeps the same backup and maintenance burden.",
      "Correct: An external replica syncs continuously so the cutover is a quick promotion to Cloud SQL with minimal downtime."
    ]
  },
  {
    "id": 19,
    "topic": "Security & IAM",
    "difficulty": 2,
    "question": "You are evaluating Cloud SQL for PostgreSQL as a possible destination for your on-premises PostgreSQL instances. Geography is becoming increasingly relevant to customer privacy worldwide. Your solution must support data residency requirements and include a strategy to:\nconfigure where data is stored\ncontrol where the encryption keys are stored\ngovern the access to data\nWhat should you do?",
    "options": [
      "A. Replicate Cloud SQL databases across different zones.",
      "B. Create a Cloud SQL for PostgreSQL instance on Google Cloud for the data that does not need to adhere to data residency requirements. Keep the data that must adhere to data residency requirements on-premises. Make application changes to support both databases.",
      "C. Allow application access to data only if the users are in the same region as the Google Cloud region for the Cloud SQL for PostgreSQL database.",
      "D. Use features like customer-managed encryption keys (CMEK), VPC Service Controls, and Identity and Access Management (IAM) policies."
    ],
    "correct": 3,
    "explanation": "CMEK controls where encryption keys live, VPC Service Controls bounds data location/exfiltration, and IAM governs access — the standard data-residency toolkit.",
    "discussion": [
      {
        "user": "juliorevk",
        "text": "D because CMEK where the encryption keys are stored IAM govern the access to data VPC Service Controls configure where data is stored control (4 votes)"
      },
      {
        "user": "sp57",
        "text": "D, https://cloud.google.com/blog/products/identity-security/meet-data-residency-requirements-with-google-cloud (4 votes)"
      },
      {
        "user": "pk349",
        "text": "D. Use features like customer-managed encryption keys (CMEK), VPC Service Controls, and Identity and Access Management (IAM) policies. (2 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: D. data residency requirements can be achiy with CMEK, VPC and IAM (2 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D. Using IAM policies, VPC Service Controls and CMEK is the best answer. A doesn’t make sense since Geography would be a factor at the Region level, not zone level. B is a lot of work and GCP is all about making things easier. C address part of the issue, but D addresses more. The link provided by sp57 is spot on. (1 vote)"
      },
      {
        "user": "theseawillclaim",
        "text": "Selected Answer: D. D. C might seem ok, but you'd need some kind of tracking to localize users, and there is no mention of it. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 19,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D, citing Google's data-residency documentation.",
    "conceptSummary": "Data residency via CMEK, VPC Service Controls and IAM.",
    "correctRationale": "The three residency requirements map one-to-one onto Google Cloud controls: CMEK keeps key material under customer control and in chosen locations, VPC Service Controls constrains where data can go and who can call the API, and IAM governs access. Together they are Google's documented approach to data residency for services like Cloud SQL.",
    "optionRationales": [
      "Wrong: Zonal replication is an availability technique and says nothing about key custody or access governance.",
      "Wrong: Splitting data across on-prem and cloud adds application complexity and still leaves key custody and access governance unsolved.",
      "Wrong: Restricting by user location does not control where data is stored or where keys live.",
      "Correct: CMEK + VPC Service Controls + IAM directly cover storage location, key location and governed access."
    ]
  },
  {
    "id": 18,
    "topic": "Replication & Read Replicas",
    "difficulty": 3,
    "question": "Your application uses Cloud SQL for MySQL. Your users run reports on data that relies on near-real time; however, the additional analytics caused excessive load on the primary database. You created a read replica for the analytics workloads, but now your users are complaining about the lag in data changes and that their reports are still slow. You need to improve the report performance and shorten the lag in data replication without making changes to the current reports. Which two approaches should you implement? (Choose two.)",
    "options": [
      "A. Create secondary indexes on the replica.",
      "B. Create additional read replicas, and partition your analytics users to use different read replicas.",
      "C. Disable replication on the read replica, and set the flag for parallel replication on the read replica. Re-enable replication and optimize performance by setting flags on the primary instance.",
      "D. Disable replication on the primary instance, and set the flag for parallel replication on the primary instance. Re-enable replication and optimize performance by setting flags on the read replica.",
      "E. Move your analytics workloads to BigQuery, and set up a streaming pipeline to move data and update BigQuery."
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "Create secondary indexes on the replica to speed report reads, and enable parallel replication on the replica (the documented stop-replica→set-flags→restart procedure plus primary tuning) to cut lag.",
    "discussion": [
      {
        "user": "ssaporylo",
        "text": "Vote for AC A https://cloud.google.com/sql/docs/mysql/replication/read-replica-indexes increase performance on read operation C https://cloud.google.com/sql/docs/mysql/replication/manage-replicas#basic-steps-to-change-parallel-replication-flags (8 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "B, C. You have 2 problems. Replication lag and slow report performance. E is eliminated because using BigQuery would mean changes to the current reports. Report slowness could be the result of poor indexing or just too much read load (or both!). Since excessive load is mentioned in the question, creating additional read replicas and spreading the analytics workload around makes B correct and eliminates A as a way to speed up reporting. That leaves the replication problem. Cloud SQL enables single threaded replication by default, so it stands to reason enabling parallel replication would help the lag. To do that you disable replication on the replica (not the primary), set flags on the rep… (7 votes)"
      },
      {
        "user": "cardareel",
        "text": "There's no discussion about C. A & B both sounds reasonable. Why I would choose A instead of B? Due to keywords \"without making changes to the current reports\" and \"MySQL\". Option B would require to point to new IP addresses (the new read replicas) and split which group of users which run X reports and which group of user which run Y reports connect to which read replica. Option A (secondary indexes) is only available for Cloud SQL (the question's use case is about MySQL) and explicitly mentions \"for reporting purposes\". (4 votes)"
      },
      {
        "user": "csrazdan",
        "text": "Selected Answer: BC. The question has 2 issues - replication lag and reports running slow. B - will address reports running snow since fewer uses will be on the replica server C - will address replication lag. (4 votes)"
      },
      {
        "user": "muky31dec",
        "text": "Selected Answer: AC. Ans is AC (4 votes)"
      },
      {
        "user": "KennyHuang",
        "text": "Selected Answer: BC. B. By creating additional read replicas, you can distribute the load of analytics workloads across multiple instances. Partitioning your analytics users to use different read replicas allows you to further distribute the workload and improve performance. This helps to alleviate the excessive load on the primary database and enhances the reporting experience for users. C. Disabling replication on the read replica can help reduce the data replication lag. By setting the flag for parallel replication on the read replica, you allow parallel execution of replication threads, which can expedite data replication. Additionally, optimizing performance by setting flags on the primary instance can h… (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 18,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "The community was split: B+C took the largest share (adding replicas + parallel replication), A+C second. The loaded answer is A+C because replica-side secondary indexes are the documented fix for read/report slowness without changing reports, and B's extra replicas do not address lag and force report re-partitioning.",
    "conceptSummary": "Fix report slowness (replica indexes) and replication lag (parallel replication flags).",
    "correctRationale": "The two complaints map to two documented levers: (1) Cloud SQL for MySQL supports creating secondary indexes on a read replica to speed read/report workloads without touching the primary or the reports; (2) enabling parallel replication requires disabling replication on the replica, setting the parallel-replication flags there, re-enabling it, and optimizing write behavior on the primary — which shortens lag. That is options A and C.",
    "optionRationales": [
      "Correct: Secondary indexes on the replica accelerate the existing reports with no changes to the reports or the primary.",
      "Wrong: Spreading analytics over extra replicas helps read throughput but does not address replication lag, and repartitioning users is an application change.",
      "Correct: The documented way to enable parallel replication is stop replication on the replica, set the parallel-replication flags on the replica, restart replication, and tune the primary's write settings — directly shortening lag.",
      "Wrong: Parallel-replication flags belong on the replica that applies the binlog, not on the primary; this option configures the wrong instance.",
      "Wrong: Moving analytics to BigQuery means changing the reports, which the question forbids."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 17,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "You are building an application that allows users to customize their website and mobile experiences. The application will capture user information and preferences. User profiles have a dynamic schema, and users can add or delete information from their profile. You need to ensure that user changes automatically trigger updates to your downstream BigQuery data warehouse. What should you do?",
    "options": [
      "A. Store your data in Bigtable, and use the user identifier as the key. Use one column family to store user profile data, and use another column family to store user preferences.",
      "B. Use Cloud SQL, and create different tables for user profile data and user preferences from your recommendations model. Use SQL to join the user profile data and preferences",
      "C. Use Firestore in Native mode, and store user profile data as a document. Update the user profile with preferences specific to that user and use the user identifier to query.",
      "D. Use Firestore in Datastore mode, and store user profile data as a document. Update the user profile with preferences specific to that user and use the user identifier to query."
    ],
    "correct": 2,
    "explanation": "Dynamic-schema user profiles and automatic downstream triggers fit Firestore in Native mode, whose document model and client libraries drive updates toward BigQuery.",
    "discussion": [
      {
        "user": "BenMS",
        "text": "Selected Answer: C. Dynamic schema indicates this is a NoSQL solution (ruling out Cloud SQL) and the application use case specifically suits Firestore (the question even refers to storing data in documents) as opposed to BigTable. Firestore in Native supports realtime client updates, which is needed for the analytics requirement: https://cloud.google.com/firestore/docs/firestore-or-datastore#feature_comparison (6 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. A dynamic schema means the database backend cannot be relational. That eliminates B. No criteria is mentioned that would justify Bigtable (low latency or massive data volume), so eliminate A. That leaves Firestore options which make sense since it’s a NoSQL database. Since “website” and “mobile” are both mentioned in the question, Firestore in Native mode must be the correct answer. (5 votes)"
      },
      {
        "user": "Shadab",
        "text": "Selected Answer: C. Use Firestore in Datastore mode for new server projects. Firestore in Datastore mode allows you to use established Datastore server architectures while removing fundamental Datastore limitations. Datastore mode can automatically scale to millions of writes per second. Use Firestore in Native mode for new mobile and web apps. Firestore offers mobile and web client libraries with real-time and offline features. Native mode can automatically scale to millions of concurrent clients. (3 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: C. Firestore introduces new features such as: A new, strongly consistent storage layer A collection and document data model Real-time updates Mobile and Web client libraries . https://cloud.google.com/datastore/docs/firestore-or-datastore#in_native_mode (3 votes)"
      },
      {
        "user": "abhinav45852",
        "text": "Selected Answer: A. Firestore in native mode and Bigtable both seems to be correct answer but weightage can be given to Bigtable on the basis of replication to BigQuery via change streams is easier. (2 votes)"
      },
      {
        "user": "pk349",
        "text": "C: Use Firestore in Native mode, and store user profile data as a document. Update the user profile with preferences specific to that user and use the user identifier to query. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 17,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for C; the few Datastore-mode votes misread which Firestore mode suits client-facing apps.",
    "conceptSummary": "Dynamic-schema user profiles → Firestore in Native mode.",
    "correctRationale": "A dynamic, per-user schema rules out a relational store, and nothing here demands Bigtable-scale throughput. Firestore Native mode stores profiles as documents, supports real-time updates and client libraries for web/mobile customization, and integrates with triggers that fan changes out to BigQuery.",
    "optionRationales": [
      "Wrong: Bigtable needs a designed row key/column-family layout and has no document triggers; overkill and awkward for per-user dynamic profiles.",
      "Wrong: A relational schema for arbitrarily extensible user profiles means constant schema changes; also no built-in document trigger path.",
      "Correct: Firestore Native mode gives document storage for dynamic schemas, real-time sync to clients, and a trigger path to BigQuery.",
      "Wrong: Datastore mode targets server-side Datastore workloads; Native mode is the recommended mode for client-facing document apps."
    ]
  },
  {
    "id": 16,
    "topic": "Monitoring & Performance",
    "difficulty": 1,
    "question": "You are managing multiple applications connecting to a database on Cloud SQL for PostgreSQL. You need to be able to monitor database performance to easily identify applications with long-running and resource-intensive queries. What should you do?",
    "options": [
      "A. Use log messages produced by Cloud SQL.",
      "B. Use Query Insights for Cloud SQL.",
      "C. Use the Cloud Monitoring dashboard with available metrics from Cloud SQL.",
      "D. Use Cloud SQL instance monitoring in the Google Cloud Console."
    ],
    "correct": 1,
    "explanation": "Query Insights is Cloud SQL's built-in tool for identifying long-running and resource-intensive queries per application.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "B. Query Insights helps identify performance and load issues at the database application layer. None of the other options do that. So the answer is B. (8 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. Vote for B (5 votes)"
      },
      {
        "user": "SidsA",
        "text": "Answer should be B: As long-running query and resource intensive queries are available in query insight providing details about which queries are taking how much time and resource utilization at what stage. (4 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: B. B. Query insights: for identifying long running SQLs https://cloud.google.com/sql/docs/mysql/using-query-insights#introduction (3 votes)"
      },
      {
        "user": "H_S",
        "text": "Selected Answer: B. B. Query insights: for identifying long running SQLs https://cloud.google.com/sql/docs/mysql/using-query-insights#introduction (3 votes)"
      },
      {
        "user": "Blueocean",
        "text": "Option B https://cloud.google.com/sql/docs/postgres/using-query-insights (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 16,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Clear consensus for B — Query Insights is purpose-built for this requirement.",
    "conceptSummary": "Per-application slow-query visibility with Query Insights.",
    "correctRationale": "Query Insights for Cloud SQL shows query latency, resource usage, and per-tag attribution (via sqlcommenter/Query Insights tags), which is precisely what is needed to attribute long-running, resource-heavy queries to specific applications.",
    "optionRationales": [
      "Wrong: Raw Cloud SQL log messages do not give per-application query performance breakdowns.",
      "Correct: Query Insights surfaces long-running and resource-intensive queries with per-application attribution.",
      "Wrong: Cloud Monitoring shows instance-level metrics, not which queries or which applications are heavy.",
      "Wrong: The instance console shows top-level metrics only, not per-query per-app performance."
    ]
  },
  {
    "id": 15,
    "topic": "Database Selection",
    "difficulty": 3,
    "question": "Your company uses Cloud Spanner for a mission-critical inventory management system that is globally available. You recently loaded stock keeping unit (SKU) and product catalog data from a company acquisition and observed hotspots in the Cloud Spanner database. You want to follow Google-recommended schema design practices to avoid performance degradation. What should you do? (Choose two.)",
    "options": [
      "A. Use an auto-incrementing value as the primary key.",
      "B. Normalize the data model.",
      "C. Promote low-cardinality attributes in multi-attribute primary keys.",
      "D. Promote high-cardinality attributes in multi-attribute primary keys.",
      "E. Use bit-reverse sequential value as the primary key."
    ],
    "correct": [
      3,
      4
    ],
    "explanation": "Promote high-cardinality attributes to the front of multi-attribute keys and use bit-reversed sequential values so new writes spread across splits instead of hotspotting.",
    "discussion": [
      {
        "user": "PrtkKA",
        "text": "Selected Answer: DE. Spanner needs high cardinality primary key to avoid hotspotting. (7 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: DE. \"hotspots\" in a database means that many IOPS (usually writes/updates) are happening on the same data-block; usually due to calling the same DATA. low cardinality => same value in the column ==> hotspots. High cardinality => different values in the column ==> avoiding hotspotting. (4 votes)"
      },
      {
        "user": "felipeschossler",
        "text": "Selected Answer: DE. D and E, the docs are below. D: https://cloud.google.com/bigtable/docs/schema-design#row-keys-avoid E: https://cloud.google.com/spanner/docs/schema-design#bit_reverse_primary_key (4 votes)"
      },
      {
        "user": "zanhsieh",
        "text": "Selected Answer: CE. CE A and D: WRONG. Anti-pattern Since the question specifically stated the hotspots cause by new SKUs and product catalog data added, so the goal would be: 1. The old data keeps distributed without any extra work needed. 2. Resolving the new data hot spots problem. It seems to me that SKU and product catalog are already normalized, so further normalize might touch the old data. This means B is out. If the new data already normalized, then it must have some high-cardinality attributes, e.g. SKU_id, and some low-cardinality attributes, e.g. category_id. So I picked low-cardinality attibutes in multi-attribute primary keys as C. I agreed with E as already Google recommended practice. Referen… (3 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "D, E. A is wrong because that will promote hotspots. C is wrong because low cardinality attributes being part of the key (particularly at the front multi-attribute keys) will also promote hotspots. That makes D correct by definition. This leave B or D at the other correct answer. The fact the new data has already been added to the database suggests the data model is already properly normalized. In addition, one of the techniques to reduce or eliminate hotspots is to bit reverse sequential values. It’s in Google’s docs here: https://cloud.google.com/spanner/docs/schema-design (3 votes)"
      },
      {
        "user": "BenMS",
        "text": "Selected Answer: DE. A - incrementing values are an explicitly documented antipattern B - normalising the schema does not specifically address hotspotting C - low cardinality values in the primary key will also cause hotspotting D - promoting high cardinality values in the primary key (i.e. moving them nearer the front of the value) is a recommended approach to reduce hotspotting E - bit-reversed keys are an explicitly recommended best practice (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 15,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D+E per the Spanner schema-design docs (high-cardinality leading keys, bit-reversed sequential PK).",
    "conceptSummary": "Spanner anti-hotspot key design: high cardinality + bit-reversed sequential keys.",
    "correctRationale": "Spanner routes rows to splits in key order, so writes on monotonically increasing or low-cardinality leading keys concentrate on a few servers. Google's schema-design guidance recommends choosing high-cardinality attributes for the leading key parts and using bit-reverse sequential values to distribute sequential writes across splits.",
    "optionRationales": [
      "Wrong: Auto-incrementing primary keys create a write hotspot on the newest key range — the classic Spanner anti-pattern.",
      "Wrong: Normalization is generally good practice but does not address hotspotting; the loaded catalog is already structured.",
      "Wrong: Low-cardinality leading attributes group many rows under few key prefixes, promoting hotspots rather than preventing them.",
      "Correct: Leading with high-cardinality attributes spreads rows across many splits, avoiding hotspots.",
      "Correct: Bit-reversed sequential values scatter sequential inserts across the key space, removing the append hotspot."
    ]
  },
  {
    "id": 14,
    "topic": "Database Selection",
    "difficulty": 2,
    "question": "Your ecommerce website captures user clickstream data to analyze customer traffic patterns in real time and support personalization features on your website. You plan to analyze this data using big data tools. You need a low-latency solution that can store 8 TB of data and can scale to millions of read and write requests per second. What should you do?",
    "options": [
      "A. Write your data into Bigtable and use Dataproc and the Apache Hbase libraries for analysis.",
      "B. Deploy a Cloud SQL environment with read replicas for improved performance. Use Datastream to export data to Cloud Storage and analyze with Dataproc and the Cloud Storage connector.",
      "C. Use Memorystore to handle your low-latency requirements and for real-time analytics.",
      "D. Stream your data into BigQuery and use Dataproc and the BigQuery Storage API to analyze large volumes of data."
    ],
    "correct": 0,
    "explanation": "Low latency, 8 TB, and millions of read/write requests per second is the classic Bigtable profile, analyzed with Dataproc and the HBase API.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. Cloud SQL could not handle the load, so B is wrong. Memorystore can scale up to 300 GB. The question mentions needing 8 TB, so C must be wrong. BigQuery could not handle the latency requirements of the question, which leaves A. Bigtable could handle the volume of writes at the speeds required. (7 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Write your data into Bigtable ***** and use Dataproc and the Apache Hbase libraries for analysis. (6 votes)"
      },
      {
        "user": "Kloudgeek",
        "text": "Answer is A. Click stream and time series data and the size is 8TB. Read low latency with reads and writes. Correct answer is A to use BigTable for storage and use either CBT or Hbase API to interact with data. (5 votes)"
      },
      {
        "user": "VG1900",
        "text": "Selected Answer: D. A is not correct because Bigtable is not designed for real-time analytics. It is a good choice for storing and retrieving small amounts of data quickly, but it is not as efficient for analyzing large volumes of data. B is not correct because it cannot support Million of Read and Write C is not correct because of storage limitation D is correct (4 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: A. Bigtable is ideal for clickstream and IOT use cases, also it can process high performance read and writes globally. (4 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: A. A is correct answer, C wouldn't be handled 8TB data Scalable: Start with the lowest tier and smallest size and then grow your instance as needed. Memorystore provides automated scaling using APIs, and optimized node placement across zones for redundancy. Memorystore for Memcached can support clusters as large as 5 TB, enabling millions of QPS at very low latency (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 14,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A; Memorystore (capacity) and BigQuery (latency) are eliminated, leaving Bigtable.",
    "conceptSummary": "Clickstream-scale low-latency NoSQL storage → Bigtable + Dataproc/HBase.",
    "correctRationale": "Clickstream data at 8 TB with millions of read/write ops per second and low latency is Bigtable's design point, and Dataproc with the Apache HBase libraries is the Google-recommended way to run big-data analysis on it.",
    "optionRationales": [
      "Correct: Bigtable meets the throughput/latency requirement and Dataproc+HBase is the documented analytics path.",
      "Wrong: Cloud SQL read replicas cannot sustain millions of writes per second; Datastream export adds latency.",
      "Wrong: Memorystore is an in-memory cache — 8 TB far exceeds its capacity profile and it is not a durable analytics store.",
      "Wrong: BigQuery excels at analytics but is not a low-latency operational store for millions of writes per second."
    ]
  },
  {
    "id": 13,
    "topic": "High Availability & DR",
    "difficulty": 2,
    "question": "You recently launched a new product to the US market. You currently have two Bigtable clusters in one US region to serve all the traffic. Your marketing team is planning an immediate expansion to APAC. You need to roll out the regional expansion while implementing high availability according to Google-recommended practices. What should you do?",
    "options": [
      "A. Maintain a target of 23% CPU utilization by locating:\ncluster-a in zone us-central1-a\ncluster-b in zone europe-west1-d\ncluster-c in zone asia-east1-b",
      "B. Maintain a target of 23% CPU utilization by locating:\ncluster-a in zone us-central1-a\ncluster-b in zone us-central1-b\ncluster-c in zone us-east1-a",
      "C. Maintain a target of 35% CPU utilization by locating:\ncluster-a in zone us-central1-a\ncluster-b in zone australia-southeast1-a\ncluster-c in zone europe-west1-d\ncluster-d in zone asia-east1-b",
      "D. Maintain a target of 35% CPU utilization by locating:\ncluster-a in zone us-central1-a\ncluster-b in zone us-central2-a\ncluster-c in zone asia-northeast1-b\ncluster-d in zone asia-east1-b"
    ],
    "correct": 3,
    "explanation": "Bigtable HA needs multiple replicated clusters split across the US and APAC, and the recommended multi-cluster CPU target is 35%.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "D. The question HA for US and APAC. Any answer which mentions Europe must be wrong. That eliminates A and C. HA requires > 1 cluster, so B must be wrong, leaving D. D shows 2 clusters in US and 2 in APAC. (12 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Looks like D to me - it's the only one with 2 US and 2 Asia regions. Also https://cloud.google.com/bigtable/docs/replication-settings#regional-failover (4 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: D. Forgot to vote (4 votes)"
      },
      {
        "user": "pk349",
        "text": "D: Maintain a target of 35% CPU utilization by locating: cluster-a in zone us-central1-a cluster-b in zone us-central2-a cluster-c in zone asia-northeast1-b cluster-d in zone asia-east1-b (2 votes)"
      },
      {
        "user": "goodsport",
        "text": "Selected Answer: D. D seems right. (2 votes)"
      },
      {
        "user": "jteru",
        "text": "Selected Answer: D. D is correct. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 13,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for D — only option pairing US and APAC clusters at the recommended 35% replicated-cluster CPU target.",
    "conceptSummary": "Multi-cluster Bigtable replication across US and APAC for HA.",
    "correctRationale": "Expanding from one US region to APAC with HA means adding clusters in APAC while keeping at least two in the US so a zone or cluster loss is tolerated. For replicated Bigtable instances Google recommends keeping average CPU under 35% so failover traffic can be absorbed; option D is the only one with two US and two APAC zones and the 35% target.",
    "optionRationales": [
      "Wrong: Only three clusters, one is in Europe (not APAC), and 23% is not the documented multi-cluster target.",
      "Wrong: All clusters stay in the US; nothing serves APAC and there is no regional diversity benefit for the expansion.",
      "Wrong: Includes Europe instead of a second US/APAC pairing the question requires.",
      "Correct: 35% CPU target with two clusters in US zones and two in APAC zones gives HA across both markets."
    ]
  },
  {
    "id": 12,
    "topic": "Capacity Planning & Cost",
    "difficulty": 2,
    "question": "You are designing an augmented reality game for iOS and Android devices. You plan to use Cloud Spanner as the primary backend database for game state storage and player authentication. You want to track in-game rewards that players unlock at every stage of the game. During the testing phase, you discovered that costs are much higher than anticipated, but the query response times are within the SLA. You want to follow Google-recommended practices. You need the database to be performant and highly available while you keep costs low. What should you do?",
    "options": [
      "A. Manually scale down the number of nodes after the peak period has passed.",
      "B. Use interleaving to co-locate parent and child rows.",
      "C. Use the Cloud Spanner query optimizer to determine the most efficient way to execute the SQL query.",
      "D. Use granular instance sizing in Cloud Spanner and Autoscaler."
    ],
    "correct": 3,
    "explanation": "Costs are the problem and queries meet SLA, so use granular instance sizing plus the Spanner Autoscaler to pay only for needed capacity.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "D. A is nonsense. Using interleaved tables can help speed up queries, but the question says query response times are OK. So B is wrong. C is wrong for the same reason. That leaves D. The question is about which factors determine the cost of running Spanner. They include region vs. multi-region, compute unit (nodes or processing units), how much storage and how much backup space. From the Google docs, it says “When you create a Cloud Spanner instance, you choose the number of compute capacity nodes or processing units to serve your data. However, if the workload of an instance changes, Cloud Spanner doesn't automatically adjust the size of the instance. This document introduces the Autosca… (8 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: D. D is the correct answer, https://cloud.google.com/architecture/autoscaling-cloud-spanner (4 votes)"
      },
      {
        "user": "pk349",
        "text": "D: Use granular instance sizing in Cloud Spanner and Autoscaler. (4 votes)"
      },
      {
        "user": "CloudKida",
        "text": "Selected Answer: D. Granular instance is available in Public Preview. With this feature, you can run workloads on Spanner at as low as 1/10th the cost of regular instances, https://cloud.google.com/blog/products/databases/get-more-out-of-spanner-with-granular-instance-sizing (3 votes)"
      },
      {
        "user": "BenMS",
        "text": "Selected Answer: D. As the others say - use autoscaling to rightsize the cluster (3 votes)"
      },
      {
        "user": "goodsport",
        "text": "Selected Answer: D. Autoscaling is the way to go here. D. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 12,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Strong consensus for D: since latency is fine, the answer is granular sizing + Autoscaler for cost.",
    "conceptSummary": "Spanner cost control via granular instance sizing and Autoscaler.",
    "correctRationale": "Query response times are within SLA, so the lever is cost, not query tuning. Spanner supports provisioning in 100-processing-unit increments and the open-source Autoscaler adjusts capacity with load, which is the Google-recommended way to keep a performant, highly available Spanner backend while minimizing spend.",
    "optionRationales": [
      "Wrong: Manually scaling down after peaks is error-prone and risks capacity shortfalls during the next spike; Google recommends autoscaling instead.",
      "Wrong: Interleaving optimizes join locality and query speed, but queries already meet SLA and it does not reduce cost.",
      "Wrong: The query optimizer improves query plans; again performance is fine, the issue is cost.",
      "Correct: Granular sizing right-sizes the instance and Autoscaler matches capacity to demand, directly cutting cost without hurting availability."
    ]
  },
  {
    "id": 11,
    "topic": "Security & IAM",
    "difficulty": 2,
    "question": "Your organization operates in a highly regulated industry. Separation of concerns (SoC) and security principle of least privilege (PoLP) are critical. The operations team consists of:\nPerson A is a database administrator.\nPerson B is an analyst who generates metric reports.\nApplication C is responsible for automatic backups.\nYou need to assign roles to team members for Cloud Spanner. Which roles should you assign?",
    "options": [
      "A. roles/spanner.databaseAdmin for Person A\nroles/spanner.databaseReader for Person B\nroles/spanner.backupWriter for Application C",
      "B. roles/spanner.databaseAdmin for Person A\nroles/spanner.databaseReader for Person B\nroles/spanner.backupAdmin for Application C",
      "C. roles/spanner.databaseAdmin for Person A\nroles/spanner.databaseUser for Person B\nroles/spanner databaseReader for Application C",
      "D. roles/spanner.databaseAdmin for Person A\nroles/spanner.databaseUser for Person B\nroles/spanner.backupWriter for Application C"
    ],
    "correct": 0,
    "explanation": "Least privilege maps DBA→databaseAdmin, read-only analyst→databaseReader, and the automated backup job→backupWriter, which can create backups but not manage them.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. C is wrong because databaseUser (Person B) would allow database writes and the question says generate metric reports, which would be read access only. databaseReader (Application C) doesn't allow backups. D is wrong because databaseUser (Person B) would allow database writes. That leaves A and B. Based upon Google's own documentation, it must be A. B would work, but backupAdmin for Application C would allow backup deletion as well as creation. backupWriter is described in the docs as \"is intended to be used by scripts that automate backup creation\". https://cloud.google.com/spanner/docs/iam (9 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. B and C are obviously wrong because application only needs backupWriter permissions. D is wrong because roles/spanner.databaseUser contains write permissions, and we don't need that. (4 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: A. A is the correct answer. Cloud Spanner Backup Writer This role is intended to be used by scripts that automate backup creation. A principal with this role can create backups, but cannot update or delete them. Lowest-level resource (3 votes)"
      },
      {
        "user": "pk349",
        "text": "A: roles/spanner.databaseAdmin for Person A roles/spanner.databaseReader for Person B roles/spanner.backupWriter for Application C (3 votes)"
      },
      {
        "user": "cloudkoala",
        "text": "Selected Answer: A. It should be A as per the documentation. https://cloud.google.com/spanner/docs/iam#spanner.backupWriter (2 votes)"
      },
      {
        "user": "Tempingtron",
        "text": "Selected Answer: A. We need an Admin for A, A reader for B and a Writer for C. Therefore A is the correct answer. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 11,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for A: reader (not user) for the analyst and backupWriter (not backupAdmin) for the backup application.",
    "conceptSummary": "Least-privilege Cloud Spanner IAM roles per persona.",
    "correctRationale": "Person A administers the database so databaseAdmin fits. Person B only produces metric reports, so databaseUser (which grants writes) violates least privilege while databaseReader fits. Application C runs automatic backups: backupWriter is intended for scripts that create backups and cannot delete or manage them, which is tighter than backupAdmin.",
    "optionRationales": [
      "Correct: Each role matches the persona's actual duty at the lowest privilege level.",
      "Wrong: backupAdmin lets Application C delete backups and manage backup operations — more than an automated backup script needs.",
      "Wrong: databaseUser grants write access Person B does not need, and databaseReader cannot perform backups.",
      "Wrong: Person B gets databaseUser (write) here, violating least privilege for a reporting-only role."
    ]
  },
  {
    "id": 10,
    "topic": "Replication & Read Replicas",
    "difficulty": 2,
    "question": "Your team recently released a new version of a highly consumed application to accommodate additional user traffic. Shortly after the release, you received an alert from your production monitoring team that there is consistently high replication lag between your primary instance and the read replicas of your Cloud SQL for MySQL instances. You need to resolve the replication lag. What should you do?",
    "options": [
      "A. Identify and optimize slow running queries, or set parallel replication flags.",
      "B. Stop all running queries, and re-create the replicas.",
      "C. Edit the primary instance to upgrade to a larger disk, and increase vCPU count.",
      "D. Edit the primary instance to add additional memory."
    ],
    "correct": 0,
    "explanation": "Google's guidance for replication lag is to optimize slow queries and schema, and to enable parallel replication flags on the replica.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. High replication lag is caused when the write load is too high for the replica to handle. Other causes include slow running queries on the replica, tables not having PKs thus forcing FTS, queries like DELETE…WHERE. Possible solutions are configure parallel replications, increase the size of the replica, send read traffic to the read replica, index the tables, identify and fix slow write queries, recreate the replica. To increase the throughput of replication increase the flag slave_parallel_workers. B is possible but should not be the first option. C and D add resource but don’t fix the issue. As others have said, the issue could be network related and additional traffic is mentioned i… (4 votes)"
      },
      {
        "user": "felipeschossler",
        "text": "Selected Answer: A. A. Optimize query for resolve replication lag. Docs: https://cloud.google.com/sql/docs/mysql/replication/replication-lag#optimize_queries_and_schema (4 votes)"
      },
      {
        "user": "jitu028",
        "text": "Selected Answer: A. correct answer - A https://cloud.google.com/sql/docs/mysql/replication/manage-replicas#:~:text=Replication%20lag%20is%20consistently,Find%20and%20fix%20them. (3 votes)"
      },
      {
        "user": "whoosh",
        "text": "Selected Answer: A. Definitely A. (3 votes)"
      },
      {
        "user": "goodsport",
        "text": "Selected Answer: A. Definitely A. (3 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: A. A. But in reality, none. You need to analyze the root cause. Network connection latency or bandwidth might be relevant too. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 10,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus is A, citing the Cloud SQL replication-lag documentation on query optimization and parallel replication.",
    "conceptSummary": "Reduce Cloud SQL MySQL replication lag via query optimization and parallel replication.",
    "correctRationale": "The documented fixes for Cloud SQL MySQL replication lag are to find and optimize slow or lock-heavy queries and schema issues (e.g. tables without primary keys) and to enable parallel replication on the read replica so apply threads keep up with the write volume after the release.",
    "optionRationales": [
      "Correct: Optimizing slow queries/schema and enabling parallel replication are the documented remedies for replication lag.",
      "Wrong: Stopping queries and recreating replicas is disruptive, does not fix the underlying throughput problem, and lag would return.",
      "Wrong: A larger disk does not address replication throughput; lag is an apply-rate problem, not a capacity one.",
      "Wrong: More memory may help marginally but does not address the documented causes of replication lag."
    ]
  },
  {
    "id": 9,
    "topic": "Operations & Maintenance",
    "difficulty": 2,
    "question": "You host an application in Google Cloud. The application is located in a single region and uses Cloud SQL for transactional data. Most of your users are located in the same time zone and expect the application to be available 7 days a week, from 6 AM to 10 PM. You want to ensure regular maintenance updates to your Cloud SQL instance without creating downtime for your users. What should you do?",
    "options": [
      "A. Configure a maintenance window during a period when no users will be on the system. Control the order of update by setting non-production instances to earlier and production instances to later.",
      "B. Create your database with one primary node and one read replica in the region.",
      "C. Enable maintenance notifications for users, and reschedule maintenance activities to a specific time after notifications have been sent.",
      "D. Configure your Cloud SQL instance with high availability enabled."
    ],
    "correct": 0,
    "explanation": "Set a maintenance window in the user-free period (overnight) and stage the update order so production instances are patched after non-production.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. Since we don't really need HA and we have a window that users are not need our app - A is fine, and D looks like an overkill (10 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. Google controls maintenance which could cause some downtime. Hence D would be irrelevant. C seems like a lot of work. B is also irrelevant. That leaves A as the best answer since you can choose your maintenance window to be after users will not be using the system. The addition of the earlier and later information is fluff and is not relevant to the question. (4 votes)"
      },
      {
        "user": "pk349",
        "text": "A: Configure a maintenance window ***** during a period when no users will be on the system. Control the order of update by setting non-production instances to earlier and production instances to later. (4 votes)"
      },
      {
        "user": "ssaporylo",
        "text": "Vote for A. Configure time slot for maintainance HA for fail over but also has maintainance window (4 votes)"
      },
      {
        "user": "jitu028",
        "text": "Selected Answer: D. Correct answer - D https://cloud.google.com/sql/docs/mysql/high-availability#HA-configuration (3 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: A. A is the correct answer because application is used between (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 9,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus is A: a scheduled maintenance window during the quiet hours beats adding HA for this case.",
    "conceptSummary": "Control Cloud SQL maintenance timing with maintenance windows and update ordering.",
    "correctRationale": "Users are absent 10 PM–6 AM in one time zone, so downtime is acceptable outside business hours. Cloud SQL maintenance windows let you schedule updates for that quiet period, and ordering settings let non-production instances receive updates before production ones — no HA build-out needed.",
    "optionRationales": [
      "Correct: A maintenance window during the user-free window plus non-prod-first ordering prevents user-facing downtime at no extra cost.",
      "Wrong: A read replica does not reduce maintenance downtime on the primary and adds cost the question does not need.",
      "Wrong: Rescheduling after notifications is reactive and still lets maintenance land inside business hours; a fixed window is deterministic.",
      "Wrong: HA adds a standby instance for failover; maintenance of the primary still requires restarts, and it is costly overkill for this requirement."
    ]
  },
  {
    "id": 8,
    "topic": "Database Selection",
    "difficulty": 1,
    "question": "You work for a large retail and ecommerce company that is starting to extend their business globally. Your company plans to migrate to Google Cloud. You want to use platforms that will scale easily, handle transactions with the least amount of latency, and provide a reliable customer experience. You need a storage layer for sales transactions and current inventory levels. You want to retain the same relational schema that your existing platform uses. What should you do?",
    "options": [
      "A. Store your data in Firestore in a multi-region location, and place your compute resources in one of the constituent regions.",
      "B. Deploy Cloud Spanner using a multi-region instance, and place your compute resources close to the default leader region.",
      "C. Build an in-memory cache in Memorystore, and deploy to the specific geographic regions where your application resides.",
      "D. Deploy a Bigtable instance with a cluster in one region and a replica cluster in another geographic region."
    ],
    "correct": 1,
    "explanation": "Global scale plus an existing relational schema points to multi-region Cloud Spanner, with compute near the default leader region for lowest latency.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "B. The clues are \"globally\" and \"relational schema\". Relational rules out Firestore (A) and Bigtable (D). Cloud Spanner is both global in scale and relational, so it fits. So B. (4 votes)"
      },
      {
        "user": "somnathmaddi",
        "text": "Selected Answer: B. It's B. Spanner (3 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. Spanner seems to be the only option, since it's the only relational DB. Plus \"scale easily\", which is another clear indication of Spanner. (2 votes)"
      },
      {
        "user": "juliorevk",
        "text": "Selected Answer: B. B and Spanner as soon as it says Global and relational (2 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: B. Spanner is the right answer (2 votes)"
      },
      {
        "user": "hanayome",
        "text": "Selected Answer: B. Obviously B (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 8,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus for B: global + relational schema = Cloud Spanner.",
    "conceptSummary": "Global relational transactions → multi-region Cloud Spanner.",
    "correctRationale": "The platform must keep a relational schema, handle transactions at low latency, and scale globally — Cloud Spanner's multi-region configuration is the Google service built for exactly this, and placing compute near the default leader region minimizes write latency.",
    "optionRationales": [
      "Wrong: Firestore is a document NoSQL database, so the existing relational schema cannot be retained.",
      "Correct: Multi-region Spanner gives global scale, strong consistency and a relational schema; locating compute near the leader region minimizes latency.",
      "Wrong: Memorystore is a cache, not a durable storage layer for sales transactions and inventory.",
      "Wrong: Bigtable is NoSQL wide-column storage and cannot retain a relational schema."
    ]
  },
  {
    "id": 7,
    "topic": "Monitoring & Performance",
    "difficulty": 1,
    "question": "Your organization is running a MySQL workload in Cloud SQL. Suddenly you see a degradation in database performance. You need to identify the root cause of the performance degradation. What should you do?",
    "options": [
      "A. Use Logs Explorer to analyze log data.",
      "B. Use Cloud Monitoring to monitor CPU, memory, and storage utilization metrics.",
      "C. Use Error Reporting to count, analyze, and aggregate the data.",
      "D. Use Cloud Debugger to inspect the state of an application."
    ],
    "correct": 1,
    "explanation": "Cloud Monitoring exposes Cloud SQL CPU, memory and storage-utilization metrics — the standard first step to find the resource bottleneck behind degraded performance.",
    "discussion": [
      {
        "user": "chelbsik",
        "text": "Selected Answer: B. If your instance stops responding to connections or performance is degraded, make sure it conforms to the Operational Guidelines https://cloud.google.com/sql/docs/mysql/diagnose-issues#:~:text=If%20your%20instance%20stops%20responding%20to%20connections%20or%20performance%20is%20degraded%2C%20make%20sure%20it%20conforms%20to%20the%20Operational%20Guidelines And then checking resource constraints: Storage full CPU overloaded Too many database tables https://cloud.google.com/sql/docs/mysql/operational-guidelines#resource_constraints Cloud Monitoring seems like the only way to check 2/3 of those, so for me answer is B (3 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "B. No actual errors are mentioned so using Error reporting would be irrelevant. That eliminates C. Inspecting the state of an application is also irrelevant since so mention of any application changes is made. Eliminate D. That leave A and B and B is the best answer. In Cloud SQL you get monitoring built right in (which you don't by default with GCE VMs). Cloud SQL monitoring metrics include CPU utilization, storage usage, memory usage, r/w operations and egress/ingress bytes. Has to be B. (3 votes)"
      },
      {
        "user": "pk349",
        "text": "B: Use Cloud Monitoring ***** to monitor CPU, memory, and storage utilization metrics. (3 votes)"
      },
      {
        "user": "Zakky_09",
        "text": "Selected Answer: B. Performance degradation in a Cloud SQL MySQL instance is often tied to resource utilization. Cloud Monitoring provides real-time insights into CPU, memory, and storage usage, which are critical factors that affect database performance. Analyzing these metrics helps identify issues such as: High CPU usage due to inefficient queries or excessive connections. Low available memory causing performance bottlenecks. Storage nearing capacity or IOPS limitations impacting performance. (2 votes)"
      },
      {
        "user": "H_S",
        "text": "Selected Answer: B. B. Use Cloud Monitoring to monitor CPU, memory, and storage utilization metrics. (2 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: B. B is the correct answer (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 7,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Unanimous consensus for B — metrics first when performance degrades with no error signal.",
    "conceptSummary": "Diagnose Cloud SQL performance degradation with Cloud Monitoring metrics.",
    "correctRationale": "Sudden performance degradation with no error signature calls for resource metrics first: Cloud Monitoring's Cloud SQL dashboards show CPU, memory and storage utilization, which quickly reveal whether the instance is saturated, memory-starved or I/O-bound — the documented diagnostic path for Cloud SQL.",
    "optionRationales": [
      "Wrong: Logs Explorer is for analyzing log entries; the symptom is a resource/performance problem, not log content.",
      "Correct: CPU, memory and storage metrics in Cloud Monitoring directly reveal the resource constraint causing the degradation.",
      "Wrong: Error Reporting aggregates application errors; no errors are reported here.",
      "Wrong: Cloud Debugger inspects application state in code; it says nothing about database resource usage."
    ]
  },
  {
    "id": 6,
    "topic": "Connectivity & Networking",
    "difficulty": 2,
    "question": "You are setting up a Bare Metal Solution environment. You need to update the operating system to the latest version. You need to connect the Bare Metal Solution environment to the internet so you can receive software updates. What should you do?",
    "options": [
      "A. Setup a static external IP address in your VPC network.",
      "B. Set up bring your own IP (BYOIP) in your VPC.",
      "C. Set up a Cloud NAT gateway on the Compute Engine VM.",
      "D. Set up Cloud NAT service."
    ],
    "correct": 2,
    "explanation": "The documented way to give a Bare Metal Solution environment internet access is routing through a NAT gateway on a Compute Engine VM in the connected VPC.",
    "discussion": [
      {
        "user": "JustANick",
        "text": "Selected Answer: C. https://cloud.google.com/bare-metal/docs/bms-setup?hl=en#bms-access-options It can't be D. This doc mentions NAT gateway, not Cloud NAT. (7 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: C. Some of the options for accessing the internet include: Routing outgoing traffic through a NAT gateway. Routing traffic through a Compute Engine VM that serves as a proxy server. Routing traffic through Cloud VPN or Dedicated Interconnect to on-premises gateways to the internet. . https://cloud.google.com/bare-metal/docs/bms-setup#bms-access-internet-vm-nat (3 votes)"
      },
      {
        "user": "juliorevk",
        "text": "Selected Answer: C. C - https://cloud.google.com/bare-metal/docs/bms-setup?hl=en#bms-access-internet-vm-nat The docs specifically says \"Setting up a NAT gateway on a Compute Engine VM\" is the way to give BMS internet access. (3 votes)"
      },
      {
        "user": "BenMS",
        "text": "Selected Answer: D. https://cloud.google.com/bare-metal/docs/bms-setup#bms-access-internet The BMS documentation mentions the Cloud NAT service as an option but the provided example involves manually deploying a NAT gateway on a GCE machine, without explaining why you would need this option as opposed to the managed NAT service. However there are no limitations mentioned, so I take it both options are valid. In this question, there is no mention of an existing GCE machine, therefore a managed NAT service is the simplest option, which avoids additional infrastructure - hence D is my choice. (2 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. A could directly expose your BMS solution to the internet. Not good. B doesn't make sense. D (setup Cloud NAT service) is incorrect. Cloud NAT is intended for GCE VMs which do not have an external (public) IP to connect to the internet. Since this is a BMS solution, it's not a GCE VM by definition, so D cannot be correct. That leaves C. Using a GCE VM configured with Cloud NAT is the way to solve this. The BMS server talks to the GCE VM via private IP and the GCE VM talks to the internet on the BMS server's behalf. The link provided by range9005 is spot on. (2 votes)"
      },
      {
        "user": "ak1247",
        "text": "Selected Answer: C. Cloud NAT feature doesn't support transitive endpoints thus it can not be used standalone to provide the internet access to the BMS server. Compute Engine VM must be used along with Cloud NAT. Option D - Refers only to Cloud NAT omits Compute Engine. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 6,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Community landed on C after debate with D: the BMS documentation names a NAT gateway on a Compute Engine VM, not standalone Cloud NAT.",
    "conceptSummary": "Internet access for Bare Metal Solution via NAT gateway on a Compute Engine VM.",
    "correctRationale": "Bare Metal Solution connects to a customer VPC and has no direct internet path. The documented options for outbound internet include routing through a NAT gateway on a Compute Engine VM, a proxy VM, or Cloud VPN; Cloud NAT alone is not listed as a supported path because it does not support transitive endpoints toward the BMS environment.",
    "optionRationales": [
      "Wrong: A static external IP in the VPC does not give the BMS servers an internet route; BMS machines attach via the interconnect, not as VPC VMs.",
      "Wrong: BYOIP is for bringing public address space into Google Cloud for inbound addressing, not for outbound internet access.",
      "Correct: The BMS setup guide lists routing through a NAT gateway on a Compute Engine VM as the way to reach the internet for OS updates.",
      "Wrong: Cloud NAT alone does not serve transitive endpoints like the BMS environment; it must ride behind a Compute Engine VM NAT configuration."
    ]
  },
  {
    "id": 5,
    "topic": "Migration",
    "difficulty": 1,
    "question": "Your company has PostgreSQL databases on-premises and on Amazon Web Services (AWS). You are planning multiple database migrations to Cloud SQL in an effort to reduce costs and downtime. You want to follow Google-recommended practices and use Google native data migration tools. You also want to closely monitor the migrations as part of the cutover strategy. What should you do?",
    "options": [
      "A. Use Database Migration Service to migrate all databases to Cloud SQL.",
      "B. Use Database Migration Service for one-time migrations, and use third-party or partner tools for change data capture (CDC) style migrations.",
      "C. Use data replication tools and CDC tools to enable migration.",
      "D. Use a combination of Database Migration Service and partner tools to support the data migration strategy."
    ],
    "correct": 0,
    "explanation": "Database Migration Service is Google's native managed tool for homogeneous PostgreSQL migrations to Cloud SQL, including continuous CDC and monitoring through the cutover.",
    "discussion": [
      {
        "user": "cloudkoala",
        "text": "Selected Answer: A. DMS will do the CDC too. (4 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. A is enough (4 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "A. The question says to use Google native data migration tools. That eliminates B and D. C doesn't specify the data replication tool in question so it's a reasonable assumption its referring to database native replication which wouldn't be a Google native solution. That eliminates C. That leave A. (3 votes)"
      },
      {
        "user": "somnathmaddi",
        "text": "Selected Answer: A. The question says to use Google native data migration tools (3 votes)"
      },
      {
        "user": "whoosh",
        "text": "Selected Answer: A. https://cloud.google.com/database-migration/docs/overview (3 votes)"
      },
      {
        "user": "goodsport",
        "text": "Selected Answer: A. A is the correct answer here. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 5,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Consensus is A: DMS alone handles these homogeneous PostgreSQL migrations including CDC.",
    "conceptSummary": "Homogeneous PostgreSQL→Cloud SQL migrations with Database Migration Service.",
    "correctRationale": "All sources here are PostgreSQL migrating to Cloud SQL — exactly the homogeneous-migration sweet spot of Database Migration Service. DMS handles the initial dump plus continuous change data capture, supports multiple concurrent migration jobs, and exposes monitoring for the cutover window, all without third-party tooling.",
    "optionRationales": [
      "Correct: DMS natively supports PostgreSQL on-prem and on AWS to Cloud SQL with continuous replication, monitoring, and minimal downtime.",
      "Wrong: Third-party CDC tools are unnecessary here; DMS itself performs continuous CDC to Cloud SQL.",
      "Wrong: Generic replication/CDC tools are not the Google-native tooling the question asks for and add license and operational cost.",
      "Wrong: Partner tools add nothing when DMS alone covers the supported source/target pair."
    ]
  },
  {
    "id": 4,
    "topic": "Monitoring & Performance",
    "difficulty": 2,
    "question": "Your customer has a global chat application that uses a multi-regional Cloud Spanner instance. The application has recently experienced degraded performance after a new version of the application was launched. Your customer asked you for assistance. During initial troubleshooting, you observed high read latency. What should you do?",
    "options": [
      "A. Use query parameters to speed up frequently executed queries.",
      "B. Change the Cloud Spanner configuration from multi-region to single region.",
      "C. Use SQL statements to analyze SPANNER_SYS.READ_STATS* tables.",
      "D. Use SQL statements to analyze SPANNER_SYS.QUERY_STATS* tables."
    ],
    "correct": 2,
    "explanation": "SPANNER_SYS.READ_STATS* tables expose read-operation statistics used to diagnose high read latency in Cloud Spanner.",
    "discussion": [
      {
        "user": "jnya_1991",
        "text": "Selected Answer: C. Read statistics provide insight into how an application is using the database, and are useful when investigating performance issues. https://cloud.google.com/spanner/docs/introspection/read-statistics (5 votes)"
      },
      {
        "user": "omermahgoub",
        "text": "C. Use SQL statements to analyze SPANNER_SYS.READ_STATS* tables. To troubleshoot high read latency, you can use SQL statements to analyze the SPANNER_SYS.READ_STATS* tables. These tables contain statistics about read operations in Cloud Spanner, including the number of reads, read latency, and the number of read errors. By analyzing these tables, you can identify the cause of the high read latency and take appropriate action to resolve the issue. Other options, such as using query parameters to speed up frequently executed queries or changing the Cloud Spanner configuration from multi-region to single region, may not be directly related to the issue of high read latency. Similarly, analyz… (4 votes)"
      },
      {
        "user": "H_S",
        "text": "Selected Answer: C. C. Use SQL statements to analyze SPANNER_SYS.READ_STATS* tables (4 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: C. C is the correct answer (4 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. A Query parameters is vague at best. B would not achieve anything. C and D look interesting, but as others have stated, querying the READ_STATS* tables would give you information about what is causing read issues. So C is the best answer. (3 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: C. Read statistics provide insight into how an application is using the database, and are useful when investigating performance issues . https://cloud.google.com/spanner/docs/introspection/read-statistics#when_to_use_read_statistics (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 4,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Community strongly favors C (READ_STATS) over D (QUERY_STATS) because the symptom is read latency; the suggested answer agrees.",
    "conceptSummary": "Diagnose Spanner read latency via SPANNER_SYS.READ_STATS introspection tables.",
    "correctRationale": "Spanner's introspection tables let you query performance statistics with SQL. For high read latency the documented starting point is the SPANNER_SYS.READ_STATS* tables, which rank read operations by CPU usage and let you find the reads consuming the most resources after the new release.",
    "optionRationales": [
      "Wrong: Query parameters can change execution plans, but they do not help you identify which reads are slow; the first step is diagnosis, not tuning blind.",
      "Wrong: Moving to a single-region instance is an architectural change that does not identify the cause of the latency and sacrifices global availability.",
      "Correct: SPANNER_SYS.READ_STATS* tables list reads by CPU usage and are the documented tool for investigating read latency.",
      "Wrong: QUERY_STATS covers query (SQL) execution statistics; the reported problem is read latency specifically, which is what READ_STATS captures."
    ]
  },
  {
    "id": 3,
    "topic": "Migration",
    "difficulty": 1,
    "question": "Your company wants to move to Google Cloud. Your current data center is closing in six months. You are running a large, highly transactional Oracle application footprint on VMWare. You need to design a solution with minimal disruption to the current architecture and provide ease of migration to Google Cloud. What should you do?",
    "options": [
      "A. Migrate applications and Oracle databases to Google Cloud VMware Engine (VMware Engine).",
      "B. Migrate applications and Oracle databases to Compute Engine.",
      "C. Migrate applications to Cloud SQL.",
      "D. Migrate applications and Oracle databases to Google Kubernetes Engine (GKE)."
    ],
    "correct": 0,
    "explanation": "Migrating the VMs and Oracle databases to Google Cloud VMware Engine keeps the existing architecture intact and allows a lift-and-shift move with minimal disruption.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "A. The key here is the current architecture and minimal disruption to it. The simplest way to keep the current architecture is a live migrate using VMware. That can only mean one thing, use Oracle running in GCVE. You could do B. There's nothing stopping you creating a VM in GCE, copying the Oracle binaries to it and spinning up an Oracle database or several. However, the licensing costs would not be attractive (if even supported), plus the migration would likely be disruptive. C is wrong because Cloud SQL doesn't support Oracle. D is wrong because that represents an architecture change. (4 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: A. Since there is no Bare Metal for Oracle option and VMware mentioned -> Choose VMware (4 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: A. Classic lift and lift. Everything keeps the same structure. Therefore minimizing impact to zero. (3 votes)"
      },
      {
        "user": "goodsport",
        "text": "Selected Answer: A. Lift , shift. Correct andswer is A. (3 votes)"
      },
      {
        "user": "Popa",
        "text": "Selected Answer: A. Here is the explanation: https://cloud.google.com/blog/products/databases/migrate-databases-to-google-cloud-vmware-engine-gcve (2 votes)"
      },
      {
        "user": "hanayome",
        "text": "Selected Answer: A. obviously A (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 3,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Clear consensus for A: lift-and-shift to Google Cloud VMware Engine preserves the current architecture.",
    "conceptSummary": "Lift-and-shift Oracle-on-VMware estate to Google Cloud VMware Engine.",
    "correctRationale": "The estate already runs Oracle on VMware, so the least-disruptive target is Google Cloud VMware Engine: the same hypervisor, tooling and operational model continue unchanged, and workloads can be migrated live with minimal re-architecture before the six-month deadline.",
    "optionRationales": [
      "Correct: GCVE preserves the VMware environment exactly, so applications and Oracle databases move with minimal disruption and easy migration.",
      "Wrong: Moving to Compute Engine means rebuilding every VM and reinstalling Oracle by hand — far more disruptive than keeping VMware.",
      "Wrong: Cloud SQL does not host Oracle databases; this would require a full database replatform, the opposite of minimal disruption.",
      "Wrong: Replatforming applications and Oracle into GKE containers is a large refactoring effort, not minimal disruption."
    ]
  },
  {
    "id": 2,
    "topic": "Backup & Recovery",
    "difficulty": 1,
    "question": "Your digital-native business runs its database workloads on Cloud SQL. Your website must be globally accessible 24/7. You need to prepare your Cloud SQL instance for high availability (HA). You want to follow Google-recommended practices. What should you do? (Choose two.)",
    "options": [
      "A. Set up manual backups.",
      "B. Create a PostgreSQL database on-premises as the HA option.",
      "C. Configure single zone availability for automated backups.",
      "D. Enable point-in-time recovery.",
      "E. Schedule automated backups."
    ],
    "correct": [
      3,
      4
    ],
    "explanation": "Point-in-time recovery and scheduled automated backups are the managed, recommended mechanisms that let a Cloud SQL instance survive failures and data loss; manual backups and on-prem replicas are neither managed nor HA.",
    "discussion": [
      {
        "user": "dynamic_dba",
        "text": "D,E. A is wrong because why bother configuring manual backups when Cloud SQL will automate that for you. B seems attractive, but why bother replicating back to on-prem when you can configure a Cloud SQL for HA. C is wrong because a single zone failure would not give you HA. That leaves D & E. (7 votes)"
      },
      {
        "user": "chelbsik",
        "text": "Selected Answer: DE. Vote for DE, seems only reasonable options to me (4 votes)"
      },
      {
        "user": "omermahgoub",
        "text": "To prepare your Cloud SQL instance for high availability, you should do the following: D. Enable point-in-time recovery - This feature allows you to restore your database to a specific point in time. It helps protect against data loss and can be used in the event of data corruption or accidental data deletion. E. Schedule automated backups - Automated backups allow you to take regular backups of your database without manual intervention. You can use these backups to restore your database in the event of data loss or corruption. Note that options A and C are not recommended practices for high availability. Option B is not related to Cloud SQL. (3 votes)"
      },
      {
        "user": "range9005",
        "text": "Selected Answer: DE. Enable point-in-time recovery. Schedule automated backups. (3 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: DE. D,E is the correct answer (3 votes)"
      },
      {
        "user": "Nirca",
        "text": "Selected Answer: DE. Only valid options. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 2,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Unanimous community consensus for D+E (PITR and automated backups), matching the suggested answer.",
    "conceptSummary": "Cloud SQL availability via PITR plus scheduled automated backups.",
    "correctRationale": "For an HA-ready Cloud SQL posture, Google recommends enabling point-in-time recovery (transaction-log retention for PITR) and scheduling automated backups so the instance can be restored quickly with minimal data loss. Both are managed, require no operational burden, and are the supported path to recovery.",
    "optionRationales": [
      "Wrong: Manual backups are a manual operational burden and provide no point-in-time recovery; the managed alternative exists.",
      "Wrong: An on-premises PostgreSQL database is not an HA option for a Cloud SQL workload and cannot be failed over to by Cloud SQL.",
      "Wrong: Restricting backups to a single zone weakens availability rather than improving it; backups are stored regionally anyway.",
      "Correct: Point-in-time recovery keeps transaction logs so the instance can be restored to any moment before an outage or corruption event.",
      "Correct: Scheduled automated backups give a managed, regular recovery point without manual effort, a core Google-recommended practice."
    ]
  },
  {
    "id": 1,
    "topic": "Connectivity & Networking",
    "difficulty": 2,
    "question": "You are developing a new application on a VM that is on your corporate network. The application will use Java Database Connectivity (JDBC) to connect to Cloud SQL for PostgreSQL. Your Cloud SQL instance is configured with IP address 192.168.3.48, and SSL is disabled. You want to ensure that your application can access your database instance without requiring configuration changes to your database. What should you do?",
    "options": [
      "A. Define a connection string using your Google username and password to point to the external (public) IP address of your Cloud SQL instance.",
      "B. Define a connection string using a database username and password to point to the internal (private) IP address of your Cloud SQL instance.",
      "C. Define a connection string using Cloud SQL Auth proxy configured with a service account to point to the internal (private) IP address of your Cloud SQL instance.",
      "D. Define a connection string using Cloud SQL Auth proxy configured with a service account to point to the external (public) IP address of your Cloud SQL instance."
    ],
    "correct": 2,
    "explanation": "Google-recommended practice is to connect via Cloud SQL Auth proxy (or a language connector) with a service account; with a private IP the proxy gives secure access and needs no change to the instance, even with instance SSL disabled.",
    "discussion": [
      {
        "user": "Hilab",
        "text": "Option B is the best choice. By using the internal (private) IP address of the Cloud SQL instance, the traffic will stay within the corporate network and will not traverse the public internet. This will help to ensure that the traffic is secure and cannot be intercepted by unauthorized parties. Additionally, using the internal IP address does not require any additional configuration changes to the database instance. Option A is not recommended as it requires exposing the database instance's external (public) IP address, which can be less secure and may require additional firewall rules. Option C is a valid option if SSL is enabled on the Cloud SQL instance, but since SSL is disabled in th… (9 votes)"
      },
      {
        "user": "dynamic_dba",
        "text": "C. The IP address given is a private IP address and not routable via the internet. Therefore any answer which references a public IP is wrong by definition (A, D). That leaves B and C. B cannot be correct because the app is on a corporate network and thus not on a Google VPC network. Good security practices dictate using Cloud SQL Auth Proxy and a service account which access the Cloud SQL instance via its private IP address. (5 votes)"
      },
      {
        "user": "CloudKida",
        "text": "Selected Answer: C. The Cloud SQL connectors are libraries that provide encryption and IAM-based authorization when connecting to a Cloud SQL instance. They can't provide a network path to a Cloud SQL instance if one is not already present. Other ways to connect to a Cloud SQL instance include using a database client or the Cloud SQL Auth proxy. (4 votes)"
      },
      {
        "user": "Kloudgeek",
        "text": "C is correct answer. First of all SSL is disabled and it is not secure to get it exposed to Internet. https://cloud.google.com/sql/docs/postgres/connect-overview#authentication_options (4 votes)"
      },
      {
        "user": "pk349",
        "text": "C: Define a connection string using Cloud SQL Auth proxy *** configured with a service account to point to the internal (private) IP address of your Cloud SQL instance. (3 votes)"
      },
      {
        "user": "Witcher_PL",
        "text": "Selected Answer: C. C is the valid (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-database-engineer",
    "sourceQuestionNumber": 1,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community consensus is C (Auth proxy to the private IP), matching the ExamTopics suggested answer; a minority argued for a direct private-IP connection string but Google guidance favors the connector.",
    "conceptSummary": "Secure Cloud SQL connectivity via Auth proxy and private IP.",
    "correctRationale": "The instance advertises a private (RFC 1918) IP, so only options pointing at the internal address can reach it. Between the direct connection string and the Auth proxy, Google-recommended practice is to use the Cloud SQL Auth proxy (or the Cloud SQL connectors) authenticated with a service account: it handles IAM authentication and encrypts the connection itself, so it works safely even though instance-level SSL is disabled, and requires no configuration change on the database.",
    "optionRationales": [
      "Wrong: The instance has a private IP address (192.168.3.48), which is not routable externally, and a Google account is not a database credential.",
      "Wrong: The private IP would be reachable if the corporate network had private connectivity, but a plain database-username connection skips IAM authentication and sends credentials over an unencrypted channel since SSL is disabled.",
      "Correct: Cloud SQL Auth proxy authenticated with a service account is the Google-recommended connector; it reaches the private IP, provides IAM auth, and encrypts traffic regardless of the instance's SSL setting.",
      "Wrong: The proxy cannot help reach an external IP that does not exist here; the instance address is private."
    ]
  }
]
