export const QUESTIONS = [
  {
    "id": 1,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "Your company built a TensorFlow neutral-network model with a large number of neurons and layers. The model fits well for the training data. However, when tested against new data, it performs poorly. What method can you employ to address this?",
    "options": [
      "A. Threading",
      "B. Serialization",
      "C. Dropout Methods",
      "D. Dimensionality Reduction"
    ],
    "correct": 2,
    "explanation": "Dropout Methods This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "henriksoder24",
        "text": "Answer is C.\nBad performance of a model is either due to lack of relationship between dependent and independent variables used, or just overfit due to having used too many features and/or bad features.\nA: Threading parallelisation can reduce training time, but if the selected featuers are the same then the resulting performance won't have changed\nB: Serialization is only changing data into byte streams. This won't be useful.\nC: This can show which features are bad. E.g. if it is one feature c..."
      },
      {
        "user": "samdhimal",
        "text": "C. Dropout Methods\nDropout is a regularization technique that can be used to prevent overfitting of the model to the training data. It works by randomly dropping out a certain percentage of neurons during training, which helps to reduce the complexity of the model and prevent it from memorizing the training data. This can improve the model's ability to generalize to new data and reduce the risk of poor performance when tested against new data."
      },
      {
        "user": "samdhimal",
        "text": "A. Threading: it's not a method to address overfitting, it's a technique to improve the performance of the model by parallelizing the computations using multiple threads.\nB. Serialization: it's a technique to save the model's architecture and trained parameters to a file, it's helpful when you want to reuse the model later, but it doesn't address overfitting problem.\nD. Dimensionality Reduction: it's a technique that can be used to reduce the number of features in the data, it's helpful when ..."
      },
      {
        "user": "Ahamada",
        "text": "Dropout methods is the solution here to resolve overfitting issue"
      },
      {
        "user": "SamuelTsch",
        "text": "It occurs overfitting problem. A general idea is to simplify the model. A GENERALIZATION related method should be used."
      },
      {
        "user": "korntewin",
        "text": "answer is likely to be C, but D (dimensionality reduction) can also be used to mitigate overfitting too! Not sure which one is the correct answer."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 2,
    "topic": "Security",
    "difficulty": 3,
    "question": "Your company is in a highly regulated industry. One of your requirements is to ensure individual users have access only to the minimum amount of information required to do their jobs. You want to enforce this requirement with Google BigQuery. Which three approaches can you take? (Choose three.)",
    "options": [
      "A. Disable writes to certain tables.",
      "B. Restrict access to tables by role.",
      "C. Ensure that the data is encrypted at all times.",
      "D. Restrict BigQuery API access to approved users.",
      "E. Segregate data across multiple tables or databases.",
      "F. Use Google Stackdriver Audit Logging to determine policy violations."
    ],
    "correct": [
      1,
      4,
      5
    ],
    "explanation": "Segregating data (E) allows granular least-privilege IAM roles. Restricting API access per-user (D) is not a standard GCP capability.",
    "discussion": [
      {
        "user": "samdhimal",
        "text": "correct option -> B. Restrict access to tables by role.\nReference: https://cloud.google.com/bigquery/docs/table-access-controls-intro\ncorrect option -> D. Restrict BigQuery API access to approved users.\n***Only approved users will have access which means other users will have minimum amount of information required to do their job.***\nReference: https://cloud.google.com/bigquery/docs/access-control\ncorrect option -> F. Use Google Stackdriver Audit Logging to determine policy violations.\nRefere..."
      },
      {
        "user": "samdhimal",
        "text": "I was WRONG. I am not sure why s o many upvotes lol.\nI think this is the correct answer:\nB. Restrict access to tables by role.\nD. Restrict BigQuery API access to approved users.\nE. Segregate data across multiple tables or databases.\nRestrict access to tables by role: You can use BigQuery's access controls to restrict access to specific tables based on user roles. This allows you to ensure that users can only access the data they need to do their job.\nRestrict BigQuery API access to approved u..."
      },
      {
        "user": "IsaB",
        "text": "Yes. Access control on table level is now possible in BigQuery : https://cloud.google.com/bigquery/docs/table-access-controls-intro"
      },
      {
        "user": "samdhimal",
        "text": "Option A is incorrect because disabling writes to certain tables would prevent users from updating the data which is not in line with the goal of providing access to the minimum amount of information required to do their jobs.\nOption C is incorrect because while data encryption is important for security it doesn't specifically help with providing users access to the minimum amount of information required to do their jobs.\nOption F is incorrect because while Google Stackdriver Audit Logging ca..."
      },
      {
        "user": "Jackalski",
        "text": "answer F -> audit is not part of the question; so I would not go for it\nanswer E -> Yes - due to segregation you can add different rights to different data/users"
      },
      {
        "user": "juliobs",
        "text": "F won't avoid undesired access, only detect after it already happened.\nE makes it easier to control access."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 3,
    "topic": "Data Ingestion",
    "difficulty": 2,
    "question": "You have a requirement to insert minute-resolution data from 50,000 sensors into a BigQuery table. You expect significant growth in data volume and need the data to be available within 1 minute of ingestion for real-time analysis of aggregated trends. What should you do?",
    "options": [
      "A. Use bq load to load a batch of sensor data every 60 seconds.",
      "B. Use a Cloud Dataflow pipeline to stream data into the BigQuery table.",
      "C. Use the INSERT statement to insert a batch of data every 60 seconds.",
      "D. Use the MERGE statement to apply updates in batch every 60 seconds."
    ],
    "correct": 1,
    "explanation": "Use a Cloud Dataflow pipeline to stream data into the BigQuery table This handles streaming data with proper ordering and delivery semantics.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "I think we need a pipeline, so it's B to me."
      },
      {
        "user": "MaxNRG",
        "text": "Is B, if we expect a growth we’ll need some buffer (that will be pub-sub) and the dataflow pipeline to stream data in big query.\nThe tabledata.insertAll method is not valid here."
      },
      {
        "user": "sedado77",
        "text": "I got this question on sept 2022. Answer is B"
      },
      {
        "user": "felixwtf",
        "text": "You need a pipeline because this type of operation can be easily parallelized, as the ingestion can be divided between into chunks (PCollections) and handled by many workers."
      },
      {
        "user": "Rajokkiyam",
        "text": "Answer B : this use case ask for streaming data."
      },
      {
        "user": "krizt9",
        "text": "One day has 60 * 24 = 1,440 minutes = 1,440 batch jobs. This is still not exceeding the limit of 1,500. However, I still think it is B. :)"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 4,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "You need to copy millions of sensitive patient records from a relational database to BigQuery. The total size of the database is 10 TB. You need to design a solution that is secure and time-efficient. What should you do?",
    "options": [
      "A. Export the records from the database as an Avro file. Upload the file to GCS using gsutil, and then load the Avro file into BigQuery using the BigQuery web UI in the GCP Console.",
      "B. Export the records from the database as an Avro file. Copy the file onto a Transfer Appliance and send it to Google, and then load the Avro file into BigQuery using the BigQuery web UI in the GCP Console.",
      "C. Export the records from the database into a CSV file. Create a public URL for the CSV file, and then use Storage Transfer Service to move the file to Cloud Storage. Load the CSV file into BigQuery using the BigQuery web UI in the GCP Console.",
      "D. Export the records from the database as an Avro file. Create a public URL for the Avro file, and then use Storage Transfer Service to move the file to Cloud Storage. Load the Avro file into BigQuery using the BigQuery web UI in the GCP Console."
    ],
    "correct": 0,
    "explanation": "Export the records from the database as an Avro file This managed relational database with automated backups, replication, and patch management; supports MySQL, PostgreSQL, SQL Server.",
    "discussion": [
      {
        "user": "Ganshank",
        "text": "You are transferring sensitive patient information, so C & D are ruled out. Choice comes down to A & B. Here it gets tricky. How to choose Transfer Appliance: (https://cloud.google.com/transfer-appliance/docs/2.0/overview)\nWithout knowing the bandwidth, it is not possible to determine whether the upload can be completed within 7 days, as recommended by Google. So the safest and most performant way is to use Transfer Appliance.\nTherefore my choice is B."
      },
      {
        "user": "TNT87",
        "text": "Answer is B,gsutil has a limit of 1TBaccording to Google documentation,if data is morethan 1TBthen we have to use Transfer Appliance."
      },
      {
        "user": "Yiouk",
        "text": "The answer is clearly seen here: https://cloud.google.com/architecture/migration-to-google-cloud-transferring-your-large-datasets#transfer-options"
      },
      {
        "user": "SSV",
        "text": "Answer should be B: A is also correct but it has its own limit. It allows only 5TB data upload at a time to cloud storage.\nhttps://cloud.google.com/storage/quotas\nI will go with B"
      },
      {
        "user": "Ender_H",
        "text": "A is the answer, the question states the following facts:\n- Total size of database 10TB.\n- Solution needs to be:\n* Secure\n* Time-efficient\nTotal size of database:\nwill be significantly reduced in an avro file compression (up to 90% compression)\nSecure transfer:\nEven if we are dealing with sensitive data, data is encrypted when in transit while using `gsutils cp` to upload the data to GCS. https://cloud.google.com/storage/docs/gsutil/addlhelp/SecurityandPrivacyConsiderations#transport-layer-se..."
      },
      {
        "user": "tprashanth",
        "text": "https://cloud.google.com/solutions/migration-to-google-cloud-transferring-your-large-datasets\nThe table shows for 1Gbps, it takes 30 hrs for 10 TB. Generally, corporate internet speeds are over 1Gbps. I'm inclined to pick A"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 5,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You need to create a near real-time inventory dashboard that reads the main inventory tables in your BigQuery data warehouse. Historical inventory data is stored as inventory balances by item and location. You have several thousand updates to inventory every hour. You want to maximize performance of the dashboard and ensure that the data is accurate. What should you do?",
    "options": [
      "A. Leverage BigQuery UPDATE statements to update the inventory balances as they are changing.",
      "B. Partition the inventory balance table by item to reduce the amount of data scanned with each inventory update.",
      "C. Use the BigQuery streaming API to stream changes into a daily inventory movement table. Calculate balances in a view that joins it to the historical inventory balance table. Update the inventory balance table nightly.",
      "D. Use the BigQuery bulk loader to batch load inventory changes into a daily inventory movement table. Calculate balances in a view that joins it to the historical inventory balance table. Update the inventory balance table nightly."
    ],
    "correct": 2,
    "explanation": "Use the BigQuery streaming API to stream changes into a daily inventory movement tabl This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "MaxNRG",
        "text": "A - New correct answer\nC - Old correct answer (for 2019)"
      },
      {
        "user": "haroldbenites",
        "text": "C is correct.\nIt says “update Every hour”\nAnd need “ accuracy”"
      },
      {
        "user": "jalk",
        "text": "Since BQ doesn't allow more than 1500 updates pr table pr day, A and B are out. Bulk loading (D) is also out since batching the inserts goes against the real time requirement. But C with the more complex querying is at odds with the maximize dashboard performance"
      },
      {
        "user": "NicolasN",
        "text": "I'm afraid that even the DML statements per day are unlimited nowadays (2022), the answer [C] remains the best option for the near real-time constraint, since updating row-by-row in BigQuery is considered by Google an anti-pattern.\nQuoting from https://cloud.google.com/bigquery/docs/best-practices-performance-patterns#dml_statements_that_update_or_insert_single_rows :\nBest practice: Avoid point-specific DML statements (updating or inserting 1 row at a time). Batch your updates and inserts.\n....."
      },
      {
        "user": "kishanu",
        "text": "A\nDML without limits: https://cloud.google.com/blog/products/data-analytics/dml-without-limits-now-in-bigquery"
      },
      {
        "user": "17isprime",
        "text": "There is no dml limitation anymore, so A is also OK\nhttps://cloud.google.com/blog/products/data-analytics/dml-without-limits-now-in-bigquery"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 6,
    "topic": "BigQuery DR",
    "difficulty": 2,
    "question": "You have data stored in BigQuery. The data in the BigQuery dataset must be highly available. You need to define a storage, backup, and recovery strategy of this data that minimizes cost. How should you configure the BigQuery table that has a recovery point objective (RPO) of 30 days?",
    "options": [
      "A. Set the BigQuery dataset to be regional. In the event of an emergency, use a point-in-time snapshot to recover the data.",
      "B. Set the BigQuery dataset to be regional. Create a scheduled query to make copies of the data to tables suffixed with the time of the backup.",
      "C. Set the BigQuery dataset to be multi-regional. In the event of an emergency, use a point-in-time snapshot to recover the data.",
      "D. Set the BigQuery dataset to be multi-regional. Create a scheduled query to make copies of the data to tables suffixed with the time of the backup."
    ],
    "correct": 1,
    "explanation": "BigQuery time travel only retains data for up to 7 days. To achieve a 30-day RPO, you must schedule queries to copy and persist the data.",
    "discussion": [
      {
        "user": "DeepakVenkatachalam",
        "text": "Answer is B. Timetravel only covers for 7 days and a scheduled query is needed for creating Table snapshots for 30 days. Also table snapshot must remain in the same region as base table (please refer to limitation of table snapshot from below link) https://cloud.google.com/bigquery/docs/table-snapshots-intro"
      },
      {
        "user": "desertlotus1211",
        "text": "Answer is C: https://cloud.google.com/bigquery/docs/table-snapshots-intro\n\"Benefits of using table snapshots include the following:\nKeep a record for longer than seven days. With BigQuery time travel, you can only access a table's data from seven days ago or more recently. With table snapshots, you can preserve a table's data from a specified point in time for as long as you want.\nMinimize storage cost. BigQuery only stores bytes that are different between a snapshot and its base table, so a ..."
      },
      {
        "user": "Gcpteamprep",
        "text": "Minimized Cost with Regional Storage: Regional datasets are less costly than multi-regional datasets in BigQuery. Since there is no requirement here for multi-regional availability, regional storage meets the high availability need while keeping costs lower.\nRPO Compliance with Scheduled Backups: A scheduled query that periodically creates copies of the data (e.g., daily or weekly, depending on the requirements) allows for recovery within the 30-day RPO, meeting the requirement for data reten..."
      },
      {
        "user": "rocky48",
        "text": "ou should consider option A.\nSetting the BigQuery dataset to be regional and using a point-in-time snapshot to recover the data in the event of an emergency can help you achieve the desired level of availability and minimize cost. This approach can help you avoid the additional cost of creating and maintaining backup copies of the data, which can be expensive.\nSetting the BigQuery dataset to be multi-regional (options C and D) can provide additional redundancy and availability. However, this ..."
      },
      {
        "user": "Nirca",
        "text": "I'm going for A:\n1. Set the BigQuery dataset to be regional. This will reduce the cost of storage compared to a multi-regional dataset.\n2. building Snapshot: bq snapshot --dataset <dataset_id> --table <table_id> <snapshot_id>"
      },
      {
        "user": "ckanaar",
        "text": "I think the answer is A:\nThis option meets the 30-day RPO requirement, assuming that the snapshot is maintained for that long. It offers high availability as data is written synchronously to 2 zones within a region: https://cloud.google.com/blog/topics/developers-practitioners/backup-disaster-recovery-strategies-bigquery/. The cost would be lower than maintaining a multi-regional dataset, but you'll incur the cost of the snapshot."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 7,
    "topic": "Orchestration",
    "difficulty": 2,
    "question": "You used Dataprep to create a recipe on a sample of data in a BigQuery table. You want to reuse this recipe on a daily upload of data with the same schema, after the load job with variable execution time completes. What should you do?",
    "options": [
      "A. Create a cron schedule in Dataprep.",
      "B. Create an App Engine cron job to schedule the execution of the Dataprep job.",
      "C. Export the recipe as a Dataprep template, and create a job in Cloud Scheduler.",
      "D. Export the Dataprep job as a Dataflow template, and incorporate it into a Composer job."
    ],
    "correct": 3,
    "explanation": "Export the Dataprep job as a Dataflow template, and incorporate it into a Composer job This visual data cleaning and preparation tool reducing time from raw data to analysis-ready datasets.",
    "discussion": [
      {
        "user": "jkhong",
        "text": "I'd pick D because it's the only option which allows variable execution (since we need to execute the dataprep job only after the prior load job). Although D suggests the export of Dataflow templates, this discussion suggests that the export option is no longer available (https://stackoverflow.com/questions/72544839/how-to-get-the-dataflow-template-of-a-dataprep-job), there are already Airflow Operators for Dataprep which we should be using instead - https://airflow.apache.org/docs/apache-air..."
      },
      {
        "user": "midgoo",
        "text": "Since the load job execution time is unexpected, schedule the Dataprep based on a fixed time window may not work.\nWhen the Dataprep job run the first time, we can find the Dataflow job for that in the console. We can use that to create the Template --> With the help of the Composer to determine if the load job is completed, we can then trigger the Dataflow job"
      },
      {
        "user": "lucaluca1982",
        "text": "I think C it is more straighforward"
      },
      {
        "user": "anicloudgirl",
        "text": "It's A. You can set it directly in Dataprep a job and it will use Dataflow under the hood."
      },
      {
        "user": "jkhong",
        "text": "The question mentions after a load job with variable time, i dont think setting a dataprep cron job can address the issue of variable load times"
      },
      {
        "user": "AWSandeep",
        "text": "D. Export the Dataprep job as a Dataflow template, and incorporate it into a Composer job.\nReveal Solution"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 8,
    "topic": "Orchestration",
    "difficulty": 2,
    "question": "You want to automate execution of a multi-step data pipeline running on Google Cloud. The pipeline includes Dataproc and Dataflow jobs that have multiple dependencies on each other. You want to use managed services where possible, and the pipeline will run every day. Which tool should you use?",
    "options": [
      "A. cron",
      "B. Cloud Composer",
      "C. Cloud Scheduler",
      "D. Workflow Templates on Dataproc"
    ],
    "correct": 1,
    "explanation": "Cloud Composer This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "vaga1",
        "text": "Airflow is the only choiche to handle dependencies and being able to call all of the services included in the question"
      },
      {
        "user": "niketd",
        "text": "Multi-step sequential pipelines -> Cloud Composer"
      },
      {
        "user": "AzureDP900",
        "text": "Cloud composer B is right"
      },
      {
        "user": "John_Pongthorn",
        "text": "if you want your wf to schedule there are 3 ways to perform it, it of them is composer\nhttps://cloud.google.com/dataproc/docs/concepts/workflows/workflow-schedule-solutions"
      },
      {
        "user": "Sofiia98",
        "text": "Of course, it is Cloud Composer!"
      },
      {
        "user": "Nirca",
        "text": "B. Cloud Composer is the right answer !"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 9,
    "topic": "Dataproc",
    "difficulty": 2,
    "question": "You are managing a Cloud Dataproc cluster. You need to make a job run faster while minimizing costs, without losing work in progress on your clusters. What should you do?",
    "options": [
      "A. Increase the cluster size with more non-preemptible workers.",
      "B. Increase the cluster size with preemptible worker nodes, and configure them to forcefully decommission.",
      "C. Increase the cluster size with preemptible worker nodes, and use Cloud Stackdriver to trigger a script to preserve work.",
      "D. Increase the cluster size with preemptible worker nodes, and configure them to use graceful decommissioning."
    ],
    "correct": 3,
    "explanation": "Increase the cluster size with preemptible worker nodes, and configure them to use gr This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "AzureDP900",
        "text": "D is right\nhttps://cloud.google.com/dataproc/docs/concepts/configuring-clusters/scaling-clusters#using_graceful_decommissioning"
      },
      {
        "user": "John_Pongthorn",
        "text": "https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/scaling-clusters\nWhy scale a Dataproc cluster?\nto increase the number of workers to make a job run faster\nto decrease the number of workers to save money (see Graceful Decommissioning as an option to use when downsizing a cluster to avoid losing work in progress).\nto increase the number of nodes to expand available Hadoop Distributed Filesystem (HDFS) storage"
      },
      {
        "user": "yafsong",
        "text": "graceful decommissioning: to finish work in progress on a worker before it is removed from the Cloud Dataproc cluster.\nhttps://cloud.google.com/dataproc/docs/concepts/configuring-clusters/scaling-clusters"
      },
      {
        "user": "skp57",
        "text": "A. \"graceful decommissioning\" is not a configuration value but a parameter passed with scale down action - to decrease the number of workers to save money (see Graceful Decommissioning as an option to use when downsizing a cluster to avoid losing work in progress)"
      },
      {
        "user": "hauhau",
        "text": "This weird.\nThe question mentions that increase cluster, but Graceful Decommissioning use in downscale the cluster"
      },
      {
        "user": "rocky48",
        "text": "D is right\nhttps://cloud.google.com/dataproc/docs/concepts/configuring-clusters/scaling-clusters#using_graceful_decommissioning"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 10,
    "topic": "Security/DLP",
    "difficulty": 2,
    "question": "You work for a shipping company that uses handheld scanners to read shipping labels. Your company has strict data privacy standards that require scanners to only transmit tracking numbers when events are sent to Kafka topics. A recent software update caused the scanners to accidentally transmit recipients' PII to analytics systems. You want to quickly build a scalable solution using cloud-native managed services to prevent exposure of PII to the analytics systems. What should you do?",
    "options": [
      "A. Create an authorized view in BigQuery to restrict access to tables with sensitive data.",
      "B. Install a third-party data validation tool on Compute Engine VMs to check the incoming data for sensitive information.",
      "C. Use Cloud Logging to analyze the data passed through the total pipeline to identify transactions that may contain sensitive information.",
      "D. Build a Cloud Function that reads the topics and makes a call to the Cloud DLP API. Use the tagging and confidence levels to either pass or quarantine the data in a bucket for review."
    ],
    "correct": 3,
    "explanation": "Build a Cloud Function that reads the topics and makes a call to the Cloud DLP API This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "dconesoko",
        "text": "The cloud function with DLP seems the best option"
      },
      {
        "user": "AWSandeep",
        "text": "D. Build a Cloud Function that reads the topics and makes a call to the Cloud Data Loss Prevention (Cloud DLP) API. Use the tagging and confidence levels to either pass or quarantine the data in a bucket for review."
      },
      {
        "user": "PhilipKoku",
        "text": "DLP is required"
      },
      {
        "user": "AzureDP900",
        "text": "Agreed\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 11,
    "topic": "Orchestration",
    "difficulty": 2,
    "question": "You have developed three data processing jobs. One executes a Cloud Dataflow pipeline that transforms data uploaded to Cloud Storage and writes results to BigQuery. The second ingests data from on-premises servers and uploads it to Cloud Storage. The third is a Cloud Dataflow pipeline that gets information from third-party data providers and uploads the information to Cloud Storage. You need to be able to schedule and monitor the execution of these three workflows and manually execute them when needed. What should you do?",
    "options": [
      "A. Create a Direct Acyclic Graph in Cloud Composer to schedule and monitor the jobs.",
      "B. Use Stackdriver Monitoring and set up an alert with a Webhook notification to trigger the jobs.",
      "C. Develop an App Engine application to schedule and request the status of the jobs using GCP API calls.",
      "D. Set up cron jobs in a Compute Engine instance to schedule and monitor the pipelines using GCP API calls."
    ],
    "correct": 0,
    "explanation": "Create a Direct Acyclic Graph in Cloud Composer to schedule and monitor the jobs This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "Rajokkiyam",
        "text": "Create dependency in Cloud Composer and schedule it."
      },
      {
        "user": "[Removed]",
        "text": "Answer: A\nDescription: Cloud composer is used to schedule the interdependent jobs"
      },
      {
        "user": "kishanu",
        "text": "A\nThough the jobs are not dependent, they are data-driven. Refer to the below link:\nhttps://cloud.google.com/blog/topics/developers-practitioners/choosing-right-orchestrator-google-cloud"
      },
      {
        "user": "MaxNRG",
        "text": "Cloud Composer is a fully managed workflow orchestration service that empowers you to author, schedule, and monitor pipelines that span across clouds and on-premises data centers.\nhttps://cloud.google.com/composer/?hl=en"
      },
      {
        "user": "sandipk91",
        "text": "should be option A"
      },
      {
        "user": "atnafu2020",
        "text": "A\nis correct Answer"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 12,
    "topic": "Pub/Sub",
    "difficulty": 2,
    "question": "You have Cloud Functions written in Node.js that pull messages from Cloud Pub/Sub and send the data to BigQuery. You observe that the message processing rate on the Pub/Sub topic is orders of magnitude higher than anticipated, but there is no error logged in Cloud Logging. What are the two most likely causes of this problem? (Choose two.)",
    "options": [
      "A. Publisher throughput quota is too small.",
      "B. Total outstanding messages exceed the 10-MB maximum.",
      "C. Error handling in the subscriber code is not handling run-time errors properly.",
      "D. The subscriber code cannot keep up with the messages.",
      "E. The subscriber code does not acknowledge the messages that it pulls."
    ],
    "correct": [
      2,
      4
    ],
    "explanation": "Error handling in the subscriber code is not handling run-time errors properly This Google's managed pub/sub messaging service enabling asynchronous communication with built-in ordering guarantees and at-least-once delivery semantics.",
    "discussion": [
      {
        "user": "TNT87",
        "text": "Answer C E\nBy not acknowleding the pulled message, this result in it be putted back in Cloud Pub/Sub, meaning the messages accumulate instead of being consumed and removed from Pub/Sub. The same thing can happen ig the subscriber maintains the lease on the message it receives in case of an error. This reduces the overall rate of processing because messages get stuck on the first subscriber. Also, errors in Cloud Function do not show up in Stackdriver Log Viewer if they are not correctly handled."
      },
      {
        "user": "musumusu",
        "text": "Answer D&E\nI am not in the favour of C, error handling is a side factor but not the primary cause.\nFirst check the configuration access.\nDoes subscriber has enough acknowledge policies (option E)\nDoes sub have ability to keep up the message( enough network, cpu and capable codes) (option D)\noption C is just a part of option D somewhere showing incapable handling"
      },
      {
        "user": "desertlotus1211",
        "text": "My question is: 'What is the actual problem?'\n- That there is no logs in Cloud Logging?\n- That Pub/Sub is having a problem?\n- Or there an actual problem?\n- Is there an actual error?\nSo what is Pub/Sub the message processing rate is high...Does that mean there is a problem?\nThoughts?"
      },
      {
        "user": "MounicaN",
        "text": "D might also be right?\nSubscriber might not be provisioned enough"
      },
      {
        "user": "AWSandeep",
        "text": "C. Error handling in the subscriber code is not handling run-time errors properly.\nE. The subscriber code does not acknowledge the messages that it pulls."
      },
      {
        "user": "Pime13",
        "text": "While poor error handling can cause issues, it would likely result in errors being logged rather than an increased message processing rate without errors, excluding C"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 13,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You are designing a basket abandonment system for an ecommerce company. The system will send a message to a user based on these rules: No interaction by the user on the site for 1 hour, Has added more than $30 worth of products to the basket, Has not completed a transaction. You use Google Cloud Dataflow to process the data and decide if a message should be sent. How should you design the pipeline?",
    "options": [
      "A. Use a fixed-time window with a duration of 60 minutes.",
      "B. Use a sliding time window with a duration of 60 minutes.",
      "C. Use a session window with a gap time duration of 60 minutes.",
      "D. Use a global window with a time based trigger with a delay of 60 minutes."
    ],
    "correct": 2,
    "explanation": "Use a session window with a gap time duration of 60 minutes This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "vetaal",
        "text": "There are 3 windowing concepts in dataflow and each can be used for below use case\n1) Fixed window\n2) Sliding window and\n3) Session window.\nFixed window = any aggregation use cases, any batch analysis of data, relatively simple use cases.\nSliding window = Moving averages of data\nSession window = user session data, click data and real time gaming analysis.\nThe question here is about user session data and hence session window.\nReference:\nhttps://cloud.google.com/dataflow/docs/concepts/streaming..."
      },
      {
        "user": "cqrm3n",
        "text": "The answer is C because session window is specifically designed to handle use cases where activity is grouped by gaps.\nA. Fixed-time window divides data into non-overlapping, equally-size intervals but do not track gaps in user activity.\nB. Sliding-time window process overlapping intervals and are better suited for periodic aggregation.\nD. Global windows process all data over the pipeline's lifetime and rely on custom triggers to handle time-based logic. It is technically possible but unneces..."
      },
      {
        "user": "rtcpost",
        "text": "C. Use a session window with a gap time duration of 60 minutes.\nA session window with a gap time duration of 60 minutes is appropriate for capturing user sessions where there has been no interaction on the site for 1 hour. It allows you to group user activity within a session, and when the session becomes inactive for the defined gap time, you can evaluate whether the user added more than $30 worth of products to the basket and has not completed a transaction.\nOptions A and B (fixed-time wind..."
      },
      {
        "user": "imran79",
        "text": "The basket abandonment system needs to determine if a user hasn't interacted with the site for 1 hour, has added products worth more than $30, and hasn't completed a transaction. Therefore, the pipeline should account for periods of user activity and inactivity. A session-based windowing approach is appropriate here.\nThe right choice is:\nC. Use a session window with a gap time duration of 60 minutes.\nSession windows group data based on periods of activity and inactivity. If there's no interac..."
      },
      {
        "user": "Chesternut999",
        "text": "C - The best option for this use case."
      },
      {
        "user": "bha11111",
        "text": "Session window is used for these type of scenario"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 14,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You are creating a new pipeline in Google Cloud to stream IoT data from Cloud Pub/Sub through Cloud Dataflow to BigQuery. While previewing the data, you notice that roughly 2% of the data appears to be corrupt. You need to modify the Cloud Dataflow pipeline to filter out this corrupt data. What should you do?",
    "options": [
      "A. Add a SideInput that returns a Boolean if the element is corrupt.",
      "B. Add a ParDo transform in Cloud Dataflow to discard corrupt elements.",
      "C. Add a Partition transform in Cloud Dataflow to separate valid data from corrupt data.",
      "D. Add a GroupByKey transform in Cloud Dataflow to group all of the valid data together and discard the rest."
    ],
    "correct": 1,
    "explanation": "Add a ParDo transform in Cloud Dataflow to discard corrupt elements This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "SteelWarrior",
        "text": "Should be B. The Partition transform would require the element identifying the valid/invalid records for partitioning the pcollection that means there is some logic to be executed before the Partition transformation is invoked. That logic can be implemented in a ParDO transform and which can both identify valid/invalid records and also generate two PCollections one with valid records and other with invalid records."
      },
      {
        "user": "MaxNRG",
        "text": "B: ParDo is a Beam transform for generic parallel processing. ParDo is useful for common data processing operations, including:\na. Filtering a data set. You can use ParDo to consider each element in a PCollection and either output that element to a new collection, or discard it.\nb. Formatting or type-converting each element in a data set.\nc. Extracting parts of each element in a data set.\nd. Performing computations on each element in a data set.\nA does not help\nC Partition is a Beam transform..."
      },
      {
        "user": "atnafu2020",
        "text": "according this link its\nPardo\n* Filtering a data set. You can use ParDo to consider each element in a PCollection and either output that element to a new collection or discard it.\n* But Partition just splitting which is is a Beam transform for PCollection objects that store the same data type. Partition splits a single PCollection into a fixed number of smaller collections."
      },
      {
        "user": "dg63",
        "text": "Correct answer should be \"C\". A Pardo transform will allow the processing to happening in parallel using multiple workers. Partition transform will allow data to be partitions in two different Pcollections according to some logic. Using partition transform once can split the corrupted data and finally discard it."
      },
      {
        "user": "Pime13",
        "text": "vote B :https://beam.apache.org/documentation/programming-guide/#pardo\nFiltering a data set. You can use ParDo to consider each element in a PCollection and either output that element to a new collection or discard it.\nFormatting or type-converting each element in a data set. If your input PCollection contains elements that are of a different type or format than you want, you can use ParDo to perform a conversion on each element and output the result to a new PCollection.\nExtracting parts of ..."
      },
      {
        "user": "sumanshu",
        "text": "vote for 'B', ParDo can discard the elements.\nhttps://beam.apache.org/documentation/programming-guide/"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 15,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You have historical data covering the last three years in BigQuery and a data pipeline that delivers new data to BigQuery daily. You have noticed that when the Data Science team runs a query filtered on a date column and limited to 30-90 days of data, the query scans the entire table. You also noticed that your bill is increasing more quickly than you expected. You want to resolve the issue as cost-effectively as possible while maintaining the ability to conduct SQL queries. What should you do?",
    "options": [
      "A. Re-create the tables using DDL. Partition the tables by a column containing a TIMESTAMP or DATE Type.",
      "B. Recommend that the Data Science team export the table to a CSV file on Cloud Storage and use Cloud Datalab to explore the data by reading the files directly.",
      "C. Modify your pipeline to maintain the last 30-90 days of data in one table and the longer history in a different table to minimize full table scans over the entire history.",
      "D. Write an Apache Beam pipeline that creates a BigQuery table per day. Recommend that the Data Science team use wildcards on the table name suffixes to select the data they need."
    ],
    "correct": 0,
    "explanation": "Re-create the tables using DDL This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "Answer: A\nDescription: Partition is the solution for reducing cost and time"
      },
      {
        "user": "arghya13",
        "text": "I will go with Option A"
      },
      {
        "user": "SteelWarrior",
        "text": "Should be A. With partitions the performance will improve for selecting 30-90 days data. Also the storage cost will reduce as the old partitions (not updated in last 90 days) will qualify for Long-Term storage rates."
      },
      {
        "user": "StefanoG",
        "text": "The D solution is obviously discarded.\nThe request NOT require ONLY LAST 30-90 days, so the C solution is not the right solution.\nIn addition to this, the request ask to keep the possibility to made queries, so B is wrost.\nIs not mandatory make the queries while you make the modify so the right answer is A"
      },
      {
        "user": "Cloud_Enthusiast",
        "text": "Answer is A. Recreating the DDL with new parition is easy and does not require any changes on applications that read data from it"
      },
      {
        "user": "tprashanth",
        "text": "No, if a seperate table is maintained for last 30-90 days data, we end up creating a table on daily basis"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 16,
    "topic": "Data Ingestion",
    "difficulty": 2,
    "question": "You operate a logistics company, and you want to improve event delivery reliability for vehicle-based sensors. You operate small data centers around the world to capture these events, but leased lines that provide connectivity from your event collection infrastructure to your event processing infrastructure are unreliable, with unpredictable latency. You want to address this issue in the most cost-effective way. What should you do?",
    "options": [
      "A. Deploy small Kafka clusters in your data centers to buffer events.",
      "B. Have the data acquisition devices publish data to Cloud Pub/Sub.",
      "C. Establish a Cloud Interconnect between all remote data centers and Google.",
      "D. Write a Cloud Dataflow pipeline that aggregates all data in session windows."
    ],
    "correct": 1,
    "explanation": "Have the data acquisition devices publish data to Cloud Pub/Sub This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "Ganshank",
        "text": "C.\nThis is a tricky one. The issue here is the unreliable connection between data collection and data processing infrastructure, and to resolve it in a cost-effective manner. However, it also mentions that the company is using leased lines. I think replacing the leased lines with Cloud InterConnect would solve the problem, and hopefully not be an added expense.\nhttps://cloud.google.com/interconnect/docs/concepts/overview"
      },
      {
        "user": "fire558787",
        "text": "Disagree. OK, the problem is between the data centers and Google's data centers. However, Cloud Interconnect costs money. If the devices write to PubSub instead, they would bypass their own data centers and write directly to Google. It seems that connectivity is not a problem for the collecting devices, since it says that data is collected in local data centers. So my guess goes towards PubSub rather than Interconnect."
      },
      {
        "user": "ayush_1995",
        "text": "B. Have the data acquisition devices publish data to Cloud Pub/Sub. This would provide a reliable messaging service for your event data, allowing you to ingest and process your data in a timely manner, regardless of the reliability of the leased lines. Cloud Pub/Sub also offers automatic retries and fault-tolerance, which would further improve the reliability of your event delivery. Additionally, using Cloud Pub/Sub would allow you to easily scale up or down your event processing infrastructu..."
      },
      {
        "user": "serg3d",
        "text": "Yea, this would definitely solve the issue, but it's not \"the most cost-effective way\". I think PubSub is the correct answer."
      },
      {
        "user": "awssp12345",
        "text": "DEFINITELY NOT COST EFFECT. C IS THE WORST CHOICE."
      },
      {
        "user": "MrCastro",
        "text": "\"leased lines that provide connectivity from your event collection infrastructure to your event processing infrastructure are unreliable.\"\nThe leased lines are used only when i'm sending the event to the datacenters. If i use cloud pub/sub, it will not be used or will be more reliable as Google datacenters are highly available. I also think having a cloud pub sub topic will be WAAAY cheaper than interconnecting some datacenters around the world so it's very cost effective.\nIMO the answer is B"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 17,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You are a retailer that wants to integrate your online sales capabilities with different in-home assistants, such as Google Home. You need to interpret customer voice commands and issue an order to the backend systems. Which solutions should you choose?",
    "options": [
      "A. Speech-to-Text API",
      "B. Cloud Natural Language API",
      "C. Dialogflow Enterprise Edition",
      "D. AutoML Natural Language"
    ],
    "correct": 2,
    "explanation": "Dialogflow Enterprise Edition This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "rickywck",
        "text": "should be C, since we need to recognize both voice and intent"
      },
      {
        "user": "Alasmindas",
        "text": "Option A - Cloud Speech-to-Text API.\nThe question is just asking to \" interpret customer voice commands\" .. it does not mention anything related to sentiment analysis so NLP is not required. DialogFlow is more of a chat bot services typically suited for a \"Service Desk\" kind of setup - where clients will call a centralized helpdesk and automation is achieved through Chat bot services like - google Dialog flow"
      },
      {
        "user": "hdmi_switch",
        "text": "Cloud Speech-to-Text API just converts speech to text. You will have text files as an output and then the requirement is to \"interpret customer voice commands and issue an order to the backend systems\". This is not achieved by having text files.\nI would go with option C, since Dialogflow can interpret the commands (intents) and integrates other applications e.g. backend systems."
      },
      {
        "user": "MaxNRG",
        "text": "C: Dialogflow Enterprise Edition is an end-to-end development suite for building conversational interfaces for websites, mobile applications, popular messaging platforms, and IoT devices. You can use it to build interfaces (e.g., chatbots) that are capable of natural and rich interactions between your users and your business. It is powered by machine learning to recognize the intent and context of what a user says, allowing your conversational interface to provide highly efficient and accurat..."
      },
      {
        "user": "odacir",
        "text": "I change my mind, it's C.\nhttps://cloud.google.com/blog/products/gcp/introducing-dialogflow-enterprise-edition-a-new-way-to-build-voice-and-text-conversational-apps"
      },
      {
        "user": "Rajuuu",
        "text": "Answer C.\nDialogflow is used to build interfaces (such as chatbots and conversational IVR) that enable natural and rich interactions between your users and your business."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 18,
    "topic": "Orchestration",
    "difficulty": 2,
    "question": "Your company has a hybrid cloud initiative. You have a complex data pipeline that moves data between cloud provider services and leverages services from each of the cloud providers. Which cloud-native service should you use to orchestrate the entire pipeline?",
    "options": [
      "A. Cloud Dataflow",
      "B. Cloud Composer",
      "C. Cloud Dataprep",
      "D. Cloud Dataproc"
    ],
    "correct": 1,
    "explanation": "Cloud Composer This provides reliable scheduling with error handling and retries.",
    "discussion": [
      {
        "user": "madhu1171",
        "text": "Answer should be B"
      },
      {
        "user": "Darlee",
        "text": "How come the `Correct Answer` so ridiculous WRONG?"
      },
      {
        "user": "MaxNRG",
        "text": "B:\nCloud Composer is a fully managed workflow orchestration service that empowers you to author, schedule, and monitor pipelines that span across clouds and on-premises data centers.\nhttps://cloud.google.com/composer/\nCloud Composer can help create workflows that connect data, processing, and services across clouds, giving you a unified data environment.\nBuilt on the popular Apache Airflow open source project and operated using the Python programming language, Cloud Composer is free from lock..."
      },
      {
        "user": "Alasmindas",
        "text": "there can not be any simple question like this to choose the right answer as \"Cloud Composer\". I really feel someone must have deliberately selecting the wrong answers in Exam topics to confuse people...."
      },
      {
        "user": "zellck",
        "text": "B is the answer.\nhttps://cloud.google.com/composer/docs/concepts/overview\nCloud Composer is a fully managed workflow orchestration service, enabling you to create, schedule, monitor, and manage workflows that span across clouds and on-premises data centers."
      },
      {
        "user": "daghayeghi",
        "text": "B:\nHybrid and multi-cloud\nEase your transition to the cloud or maintain a hybrid data environment by orchestrating workflows that cross between on-premises and the public cloud. Create workflows that connect data, processing, and services across clouds to give you a unified data environment.\nhttps://cloud.google.com/composer#section-2"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 19,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You use a dataset in BigQuery for analysis. You want to provide third-party companies with access to the same dataset. You need to keep the costs of data sharing low and ensure that the data is current. Which solution should you choose?",
    "options": [
      "A. Use Analytics Hub to control data access, and provide third party companies with access to the dataset.",
      "B. Use Cloud Scheduler to export the data on a regular basis to Cloud Storage, and provide third-party companies with access to the bucket.",
      "C. Create a separate dataset in BigQuery that contains the relevant data to share, and provide third-party companies with access to the new dataset.",
      "D. Create a Dataflow job that reads the data in frequent time intervals, and writes it to the relevant BigQuery dataset or Cloud Storage bucket for third-party companies to use."
    ],
    "correct": 0,
    "explanation": "Use Analytics Hub to control data access, and provide third party companies with acce This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "LP_PDE",
        "text": "I feel the answer really should be Create an authorized view on the BigQuery table to control data access, and provide third-party companies with access to that view."
      },
      {
        "user": "zellck",
        "text": "A is the answer.\nhttps://cloud.google.com/bigquery/docs/analytics-hub-introduction\nnalytics Hub is a data exchange platform that enables you to share data and insights at scale across organizational boundaries with a robust security and privacy framework.\nAs an Analytics Hub publisher, you can monetize data by sharing it with your partner network or within your own organization in real time. Listings let you share data without replicating the shared data. You can build a catalog of analytics-..."
      },
      {
        "user": "vamgcp",
        "text": "Option A: This option is correct because Analytics Hub is a managed service that provides a centralized repository for data assets. You can use Analytics Hub to share data with other Google Cloud Platform services, as well as with third-party companies"
      },
      {
        "user": "lool",
        "text": "Shared datasets are collections of tables and views in BigQuery defined by a data publisher and make up the unit of cross-project / cross-organizational sharing. Data subscribers get an opaque, read-only, linked dataset inside their project and VPC perimeter that they can combine with their own datasets and connect to solutions from Google Cloud or our partners. For example, a retailer might create a single exchange to share demand forecasts to the 1,000’s of vendors in their supply chain–hav..."
      },
      {
        "user": "odacir",
        "text": "https://cloud.google.com/analytics-hub"
      },
      {
        "user": "ajayrtk",
        "text": "no option is correct\nthis is correct answer -Create an authorised view on the BigQuery table to control data access, and provide third-party companies with access to that view."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 20,
    "topic": "BigQuery/CDC",
    "difficulty": 2,
    "question": "Your company is migrating its on-premises data warehousing solutions to BigQuery. The existing data warehouse uses trigger-based CDC to apply updates from multiple transactional database sources on a daily basis. With BigQuery, your company hopes to improve CDC handling so that changes are available in near-real time using log-based CDC streams, while optimizing performance. Which two steps should they take? (Choose two.)",
    "options": [
      "A. Perform a DML INSERT, UPDATE, or DELETE to replicate each individual CDC record in real time directly on the reporting table.",
      "B. Insert each new CDC record and corresponding operation type to a staging table in real time.",
      "C. Periodically DELETE outdated records from the reporting table.",
      "D. Periodically use a DML MERGE to perform several DML INSERT, UPDATE, and DELETE operations at the same time on the reporting table.",
      "E. Insert each new CDC record and corresponding operation type in real time to the reporting table, and use a materialized view to expose only the newest version of each unique record."
    ],
    "correct": [
      1,
      3
    ],
    "explanation": "Insert each new CDC record and corresponding operation type to a staging table in rea This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "YorelNation",
        "text": "To aim for minimal latency while reducing compute overhead:\nB. Insert each new CDC record and corresponding operation type to a staging table in real time.\nD. Periodically use a DML MERGE to perform several DML INSERT, UPDATE, and DELETE operations at the same time on the reporting table. (all statements comes from the staging table)"
      },
      {
        "user": "musumusu",
        "text": "B&D\nTricks here: Always choose google recommended approach, Use data first in Staging table then merge with original tables."
      },
      {
        "user": "NicolasN",
        "text": "The previous guidelines were here:\n🔗 https://cloud.google.com/architecture/database-replication-to-bigquery-using-change-data-capture#immediate_consistency_approach\nThere were two approaches:\n1️⃣ Immediate consistency approach\n2️⃣ Cost-optimized approach\nFor approach 1️⃣, which is the objective of this question, it proposes:\na. Insert CDC data into a delta table in BigQuery => that's answer [B]\nb. Create a BigQuery view that joins the main and delta tables and finds the most recent row => th..."
      },
      {
        "user": "zellck",
        "text": "BD is the answer.\nhttps://cloud.google.com/architecture/database-replication-to-bigquery-using-change-data-capture#overview_of_cdc_data_replication\nDelta tables contain all change events for a particular table since the initial load. Having all change events available can be valuable for identifying trends, the state of the entities that a table represents at a particular moment, or change frequency.\nThe best way to merge data frequently and consistently is to use a MERGE statement, which let..."
      },
      {
        "user": "NicolasN",
        "text": "Nowadays (Nov. 2022) I don't expect to confront this question in a real exam with this set of answers since the more recent documentation proposes the use of Datastream.\n🔗 https://cloud.google.com/blog/products/data-analytics/real-time-cdc-replication-bigquery"
      },
      {
        "user": "Wasss123",
        "text": "B and D\nhttps://cloud.google.com/architecture/database-replication-to-bigquery-using-change-data-capture"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 21,
    "topic": "Data Processing",
    "difficulty": 2,
    "question": "You are designing a data processing pipeline. The pipeline must be able to scale automatically as load increases. Messages must be processed at least once and must be ordered within windows of 1 hour. How should you design the solution?",
    "options": [
      "A. Use Apache Kafka for message ingestion and use Cloud Dataproc for streaming analysis.",
      "B. Use Apache Kafka for message ingestion and use Cloud Dataflow for streaming analysis.",
      "C. Use Cloud Pub/Sub for message ingestion and Cloud Dataproc for streaming analysis.",
      "D. Use Cloud Pub/Sub for message ingestion and Cloud Dataflow for streaming analysis."
    ],
    "correct": 3,
    "explanation": "Use Cloud Pub/Sub for message ingestion and Cloud Dataflow for streaming analysis This enables efficient transformation at scale with automatic resource management.",
    "discussion": [
      {
        "user": "madhu1171",
        "text": "Answer should be D"
      },
      {
        "user": "Chelseajcole",
        "text": "rule of thumb: If you see Kafka and Pub/Sub, always go with Pub/Sub in Google exam"
      },
      {
        "user": "hendrixlives",
        "text": "Careful doing that: I got a question where you had to choose between Kafka and Pub/Sub... and the solution required to be able to replay all messages without time limit. So no Pub/Sub there.\nThis being a Google cert does not mean that they always force Google solutions."
      },
      {
        "user": "Alasmindas",
        "text": "Indeed the correct answer is Option D.\nAgain, not sure why Exam topic answer is deliberately chosen for a wrong answer, for such simple question."
      },
      {
        "user": "MaxNRG",
        "text": "D: Pub/Sub + Dataflow\nhttps://cloud.google.com/solutions/stream-analytics/\nhttps://cloud.google.com/blog/products/data-analytics/streaming-analytics-now-simpler-more-cost-effective-cloud-dataflow"
      },
      {
        "user": "hendrixlives",
        "text": "D: \"at least once and must be ordered within windows\" means Pub/Sub (at least once) with Dataflow (windows)."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 22,
    "topic": "Security/IAM",
    "difficulty": 2,
    "question": "You need to set access to BigQuery for different departments within your company. Each department should have access only to their data. Each department will have one or more leads who need to be able to create and update tables. Each department has data analysts who need to be able to query but not modify data. How should you set access?",
    "options": [
      "A. Create a dataset for each department. Assign the department leads the role of OWNER, and assign the data analysts the role of WRITER on their dataset.",
      "B. Create a dataset for each department. Assign the department leads the role of WRITER, and assign the data analysts the role of READER on their dataset.",
      "C. Create a table for each department. Assign the department leads the role of Owner, and assign the data analysts the role of Editor on the project.",
      "D. Create a table for each department. Assign the department leads the role of Editor, and assign the data analysts the role of Viewer on the project."
    ],
    "correct": 1,
    "explanation": "Create a dataset for each department This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "juliobs",
        "text": "Old question. It's done using IAM nowadays: bigquery.dataEditor and bigquery.dataViewer"
      },
      {
        "user": "AWSandeep",
        "text": "B. Create a dataset for each department. Assign the department leads the role of WRITER, and assign the data analysts the role of READER on their dataset."
      },
      {
        "user": "jkhong",
        "text": "Dude, I know there are updates to IAM, but the key point of the question is to have the leads have table creation and update roles... So they already need roles at the dataset level and hence C and D is out. We wouldn't be able to memorise all the roles, but clearly we cannot provide access on a table level..."
      },
      {
        "user": "Remi2021",
        "text": "Sorry but you are wrong. There is WRITER and READER role for dataset see them in this documentation. I was also confused at the beginning:\nhttps://cloud.google.com/bigquery/docs/access-control-basic-roles"
      },
      {
        "user": "musumusu",
        "text": "Answer B:\nWhy not D, mentioned in question: Data lead will create tables in dataset. Imagine, other department leads are creating unnecessory tables in shared dataset and you are struggling to find your tables as everyday there are some new tables. Headache right ? better to give them seperate dataset and do whatever you want in that dataset."
      },
      {
        "user": "nwk",
        "text": "Vote D, there is only Viewer, Editor and Owner roles for BQ\nhttps://cloud.google.com/bigquery/docs/access-control-basic-roles"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 23,
    "topic": "Bigtable",
    "difficulty": 2,
    "question": "You operate a database that stores stock trades and an application that retrieves average stock price for a given company over an adjustable window of time. The data is stored in Cloud Bigtable where the datetime of the stock trade is the beginning of the row key. Your application has thousands of concurrent users, and you notice performance is starting to degrade as more stocks are added. What should you do?",
    "options": [
      "A. Change the row key syntax to begin with the stock symbol.",
      "B. Change the row key syntax to begin with a random number per second.",
      "C. Change the data pipeline to use BigQuery for storing stock trades, and update your application.",
      "D. Use Cloud Dataflow to write a summary of each day's stock trades to an Avro file on Cloud Storage."
    ],
    "correct": 0,
    "explanation": "Change the row key syntax to begin with the stock symbol This NoSQL wide-column store optimized for time-series and analytical workloads with millisecond latency, automatic scaling, and replication.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "Answer: A\nDescription: Timestamp at starting of rowkey causes bottleneck issues"
      },
      {
        "user": "kichukonr",
        "text": "Stock symbol will be similar for most of the records, so it's better to start with random number.. Answer should be B"
      },
      {
        "user": "Abhi16820",
        "text": "You never use something called random number in bigtable rowkey because it gives you no use in querying possibilities, since we can't run sql querys in bigtable we should not randomise rowkeys in bigtable.\nDon't confuse the above point with the hotspot logic, both are different if you think so.\nAnd another thing is, what you said can be good choice if we are using cloud spanner and trying to comeup with primary key situation, since there we can always run sql query.\nI think you got the point ..."
      },
      {
        "user": "musumusu",
        "text": "Answer A:\nTrick to remember: Row-key adjustment always be like in decending order.\n#<<Least value>>#<<Lesser value>>\nFor example:\n1. #<<Earth>>#<<continents>>#<<countries>>#<<cities>> and so on..\n2. #<<Stock>>#<<users>>#timestamp..\nin 99% cases timestamp will be in the end, as its smallest division..."
      },
      {
        "user": "karthik89",
        "text": "it can start with stock symbol concated with timestamp can be a good row key design"
      },
      {
        "user": "zellck",
        "text": "A is the answer.\nhttps://cloud.google.com/bigtable/docs/schema-design#row-keys\nIt's important to create a row key that makes it possible to retrieve a well-defined range of rows. Otherwise, your query requires a table scan, which is much slower than retrieving specific rows.\nhttps://cloud.google.com/bigtable/docs/schema-design#row-keys-avoid\nSome types of row keys can make it difficult to query your data, and some result in poor performance. This section describes some types of row keys that ..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 24,
    "topic": "Security/IAM",
    "difficulty": 2,
    "question": "Your company handles data processing for a number of different clients. Each client prefers to use their own suite of analytics tools. You need to secure the data so that clients cannot see each other's data. Which three steps should you take? (Choose three.)",
    "options": [
      "A. Load data into different partitions.",
      "B. Load data into a different dataset for each client.",
      "C. Put each client's BigQuery dataset into a different table.",
      "D. Restrict a client's dataset to approved users.",
      "E. Only allow a service account to access the datasets.",
      "F. Use the appropriate IAM roles for each client's users."
    ],
    "correct": [
      1,
      3,
      5
    ],
    "explanation": "Load data into a different dataset for each client This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "saurabh1805",
        "text": "My vota also goes for B,D,F"
      },
      {
        "user": "sumanshu",
        "text": "Some voted for 'E' i.e. E. Only allow a service account to access the datasets.\nNot sure why ?\nif we gave access ONLY to service account - Does not it mean - we need to access BigQuery using Some Code (by mentioning Service account credentials there) OR using some other resource like VM)\nIn this case - i think person can't even access the Big Query Service via UI (if we give access only to Service account). Correct me if there is option on UI as well"
      },
      {
        "user": "awssp12345",
        "text": "yes, that is precisely why we need to eliminate E."
      },
      {
        "user": "rtcpost",
        "text": "B. Load data into a different dataset for each client: Organize the data into separate datasets for each client. This ensures data isolation and simplifies access control.\nD. Restrict a client's dataset to approved users: Implement access controls by specifying which users or groups are allowed to access each client's dataset. This restricts data access to approved users only.\nF. Use the appropriate identity and access management (IAM) roles for each client's users: Assign IAM roles based on ..."
      },
      {
        "user": "jackjackington",
        "text": "These questions rock!! They helped me pass the exam on the first attempt!! Make sure you study all of these questions carefully with their associated documentation."
      },
      {
        "user": "samdhimal",
        "text": "B. Load data into a different dataset for each client.\nD. Restrict a client's dataset to approved users.\nF. Use the appropriate identity and access management (IAM) roles for each client's users.\nBy loading each client's data into a separate dataset, you ensure that each client's data is isolated from the data of other clients. Restricting access to each client's dataset to only approved users, as specified in D, further enhances data security by ensuring that only authorized users can access..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 25,
    "topic": "Monitoring",
    "difficulty": 3,
    "question": "You are operating a Cloud Dataflow streaming pipeline. The pipeline aggregates events from a Cloud Pub/Sub subscription source, within a window, and sinks the resulting aggregation to a Cloud Storage bucket. You want to monitor an alert on behavior of the pipeline with Cloud Stackdriver to ensure that it is processing data. Which Stackdriver alerts should you create?",
    "options": [
      "A. An alert based on a decrease of subscription/num_undelivered_messages for the source and a rate of change increase of instance/storage/used_bytes for the destination.",
      "B. An alert based on an increase of subscription/num_undelivered_messages for the source and a rate of change decrease of instance/storage/used_bytes for the destination.",
      "C. An alert based on a decrease of instance/storage/used_bytes for the source and a rate of change increase of subscription/num_undelivered_messages for the destination.",
      "D. An alert based on an increase of instance/storage/used_bytes for the source and a rate of change decrease of subscription/num_undelivered_messages for the destination."
    ],
    "correct": 1,
    "explanation": "An alert based on an increase of subscription/num_undelivered_messages for the source This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "dambilwa",
        "text": "You would want to get alerted only if Pipeline fails & not if it is running fine. I think Option [B] is correct, because in event of Pipeline failure :\n1) subscription/ num_undelivered_messages would pile up at a constant rate as the source has consistent throughput\n2) instance/storage/ used_bytes will get closer to zero. Hence need to monitor it's rate of change"
      },
      {
        "user": "midgoo",
        "text": "For those who may get confuse at the start by the term 'subscription/num_undelivered_messages', it is not a division. It is the full path of the metric. So we should just read it as 'num_undelivered_messages'. The same for 'used_bytes'.\nSo if we see the source have more backlog (more num_undelivered_messages), or the destination ultilization going down, that is the indicator of something going wrong"
      },
      {
        "user": "Callumr",
        "text": "no. You don't need to be alerted when its working fine"
      },
      {
        "user": "szefco",
        "text": "\"rate of change decrease of instance/storage/ used_bytes\" - if rate of instance/storage/ used_bytes decreases that means less data is written - so something is wrong with the pipeline.\nIt's not used bytes that decreases - it's rate of change decreases.\nExample: if everything works fine your pipeline writes 5MB/s to the sink. If it decreases to 0.1MB/s it means something is wrong"
      },
      {
        "user": "Barniyah",
        "text": "There is a BIG TRICK here .\nyour mission is to monitor that the pipieline (IS PROCESSING THE DATA) , and not to monitor errors\nSo, The decrease of subscription/num_undelivered_messages for the source, and the increase of instance/storage/ used_bytes for the destination tells you clearly that this pipeline is working fine .\nThe answer is A :"
      },
      {
        "user": "Barniyah",
        "text": "Yes, you are right, it should be B:\nI thought there was a trick in the question, Sorry & Thank you"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 26,
    "topic": "IoT/Architecture",
    "difficulty": 2,
    "question": "You currently have a single on-premises Kafka cluster in us-east that ingests messages from IoT devices globally. Because large parts of the globe have poor internet connectivity, messages sometimes batch at the edge and cause spikes. This is becoming difficult to manage. What is the Google-recommended cloud native architecture?",
    "options": [
      "A. Edge TPUs as sensor devices for storing and transmitting the messages.",
      "B. Cloud Dataflow connected to the Kafka cluster to scale the processing of incoming messages.",
      "C. An IoT gateway connected to Cloud Pub/Sub, with Cloud Dataflow to read and process the messages from Cloud Pub/Sub.",
      "D. A Kafka cluster virtualized on Compute Engine in us-east with Cloud Load Balancing."
    ],
    "correct": 2,
    "explanation": "An IoT gateway connected to Cloud Pub/Sub, with Cloud Dataflow to read and process th This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "zellck",
        "text": "C is the answer.\nhttps://cloud.google.com/architecture/iot-overview#cloud-pubsub\nPub/Sub can act like a shock absorber and rate leveller for both incoming data streams and application architecture changes. Many devices have limited ability to store and retry sending telemetry data. Pub/Sub scales to handle data spikes that can occur when swarms of devices respond to events in the physical world, and buffers these spikes to help isolate them from applications monitoring the data."
      },
      {
        "user": "Rajokkiyam",
        "text": "Answer C - Cloud Native = Pub/Sub + DataFlow"
      },
      {
        "user": "daghayeghi",
        "text": "C is correct:\nthe main trick come from A, and response is that TPU only use when we have a deployed machine learning model that we don't have now."
      },
      {
        "user": "Alasmindas",
        "text": "Easy Question : ANswer is Option C.\nAlterative to Kafka in google cloud native service is Pub/Sub and Dataflow punched with Pub/Sub is the google recommended option"
      },
      {
        "user": "Rajuuu",
        "text": "Answer is C. Pub/Sub is the messaging tool for Global."
      },
      {
        "user": "ivanhsiav",
        "text": "Answer c\nkafka cluster in on-premise for streaming msgs\npub/sub for streaming msgs in cloud"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 27,
    "topic": "Storage/Backup",
    "difficulty": 2,
    "question": "You decided to use Cloud Datastore to ingest vehicle telemetry data in real time. You want to build a storage system that accounts for long-term data growth while keeping costs low. You also want to create snapshots periodically for PIT recovery. You want to archive these snapshots for a long time. Which two methods can accomplish this? (Choose two.)",
    "options": [
      "A. Use managed export, and store the data in a Cloud Storage bucket using Nearline or Coldline class.",
      "B. Use managed export, and then import to Cloud Datastore in a separate project under a unique namespace.",
      "C. Use managed export, and then import the data into a BigQuery table created just for that export.",
      "D. Write an application that uses Cloud Datastore client libraries to read all the entities and stream to BigQuery.",
      "E. Write an application that uses Cloud Datastore client libraries to read all entities, format to JSON, compress, and store in Cloud Source Repositories."
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "Importing backups into Datastore (B) incurs high storage costs. Cloud Storage (A) and BigQuery (C) are cheaper for long-term archival of Datastore exports.",
    "discussion": [
      {
        "user": "Ganshank",
        "text": "A,B\nhttps://cloud.google.com/datastore/docs/export-import-entities"
      },
      {
        "user": "atnafu2020",
        "text": "AC\nhttps://cloud.google.com/datastore/docs/export-import-entities\nC: To import only a subset of entities or to import data into BigQuery, you must specify an entity filter in your export.\nB: Not correct since you want to store in a different environment than Datastore. Tho this statment is true: Data exported from one Datastore mode database can be imported into another Datastore mode database, even one in another project.\nA is correct\nBilling and pricing for managed exports and imports in Da..."
      },
      {
        "user": "NicolasN",
        "text": "A rather complicated question, of a kind I wish I won't face in the exam. My opinion:\n✅ [A] A valid and cost-effective solution satisfying the requirement for PIT recovery\n✅ [B] A valid solution but far from ideal for archiving. It satisfies the requirement part \"you can … clone a copy of the data for Cloud Datastore in a different environment\" (an objection to the word \"namespace\", I think it should be just \"name\")"
      },
      {
        "user": "NicolasN",
        "text": "❌[C] There is the limitation \"Data exported without specifying an entity filter cannot be loaded into BigQuery\". The entity filter for this case should contain all the kinds of entities but there is another limitation of \"100 entity filter combinations\". We have no knowledge of the kinds or the namespaces of the entities.\nSources:\n🔗 https://cloud.google.com/datastore/docs/export-import-entities#import-into-bigquery\n🔗 https://cloud.google.com/datastore/docs/export-import-entities#exporting_s..."
      },
      {
        "user": "MrCastro",
        "text": "Big query streaming inserts ARE NOT cheap"
      },
      {
        "user": "fire558787",
        "text": "A for sure. Then I was undecided between B and C; B has high costs and C has low costs (storage is more expensive in Datastore). However the question says that you want data to be used for Datastore. There is no native way to export data from BigQuery to Datastore, hence the only two options that allow data to be restored to Datastore are A and B."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 28,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You need to create a data pipeline that copies time-series transaction data so that it can be queried from within BigQuery. Every hour, thousands of transactions are updated with a new status. The size of the initial dataset is 1.5 PB. The data is heavily structured, and your team will build ML models. You want to maximize performance and usability. Which two strategies should you adopt? (Choose two.)",
    "options": [
      "A. Denormalize the data as much as possible.",
      "B. Preserve the structure of the data as much as possible.",
      "C. Use BigQuery UPDATE to further reduce the size of the dataset.",
      "D. Develop a data pipeline where status updates are appended to BigQuery instead of updated.",
      "E. Copy a daily snapshot of transaction data to Cloud Storage and store it as an Avro file. Use BigQuery's support for external data sources to query."
    ],
    "correct": [
      0,
      3
    ],
    "explanation": "Denormalize the data as much as possible This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "rickywck",
        "text": "I think AD is the answer. E will not improve performance."
      },
      {
        "user": "[Removed]",
        "text": "Answer: A, D\nDescription: Denormalization will help in performance by reducing query time, update are not good with bigquery"
      },
      {
        "user": "odacir",
        "text": "A and D:\nA- Improve performance\nD- Is better for DS have all the history and not the last update..."
      },
      {
        "user": "WillemHendr",
        "text": "Shouting data-science teams are not part of question, this is more about what is exam correct, not what it the best for your own situation"
      },
      {
        "user": "devaid",
        "text": "Is not about the quota. You should avoid using UPDATE because it makes a big scan of the table, and is not efficient or high performant. Usually prefer appends and merges instead, and using the optimized schema approach of Big Query that denormalizes the table to avoid joins and leverages nested and repeated fields."
      },
      {
        "user": "sumanshu",
        "text": "A - correct (denormlization will help)\nB - data already heavily structured (no use and no impact)\nC - more than 1500 Updates not possible\nD - Not sure..(because appending will increase size and cost)\nE - Does not look good (increase cost..also we are storing for all days....again for query we need to issue mutiple query for all days....)\nSo, A & D (left out of 5)"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 29,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You are designing a cloud-native historical data processing system. The data is in CSV, Avro, and PDF formats and will be accessed by multiple tools including Dataproc, BigQuery, and Compute Engine. A batch pipeline moves daily data. Performance is not a factor. The solution should maximize availability. How should you design data storage?",
    "options": [
      "A. Create a Dataproc cluster with high availability. Store the data in HDFS.",
      "B. Store the data in BigQuery. Access the data using the BigQuery Connector on Dataproc and Compute Engine.",
      "C. Store the data in a regional Cloud Storage bucket.",
      "D. Store the data in a multi-regional Cloud Storage bucket. Access the data directly using Dataproc, BigQuery, and Compute Engine."
    ],
    "correct": 3,
    "explanation": "Store the data in a multi-regional Cloud Storage bucket This IaaS offering with granular control over instances, custom machine types, and preemptible VMs for cost optimization.",
    "discussion": [
      {
        "user": "jkhong",
        "text": "Problem: How to store data?\nConsiderations: High availability, performance not an issue\nA → avoid HDFS\nC → multi-regional > regional in terms of availability\nB could be the answer but we’re dealing with PDF documents, we need blob storage (cloud storage). If we only have csv or Avro, this may be the answer"
      },
      {
        "user": "zellck",
        "text": "D is the answer."
      },
      {
        "user": "serch_engine",
        "text": "D is the answer"
      },
      {
        "user": "kenanars",
        "text": "D is the correct answer"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 30,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You have a petabyte of analytics data and need to design a storage and processing platform. You must be able to perform data warehouse-style analytics on the data in Google Cloud and expose the dataset as files for batch analysis tools in other cloud providers. What should you do?",
    "options": [
      "A. Store and process the entire dataset in BigQuery.",
      "B. Store and process the entire dataset in Bigtable.",
      "C. Store the full dataset in BigQuery, and store a compressed copy of the data in a Cloud Storage bucket.",
      "D. Store the warm data as files in Cloud Storage, and store the active data in BigQuery. Keep this ratio as 80% warm and 20% active."
    ],
    "correct": 2,
    "explanation": "Store the full dataset in BigQuery, and store a compressed copy of the data in a Clou This optimizes data access patterns and minimizes egress costs.",
    "discussion": [
      {
        "user": "AJKumar",
        "text": "A and B can be eliminated right away as they do not talk about providing for other cloud providers. between C and D. The question says nothing about warm or cold data-rather that data should be made available for other providers--C--can fulfill this condition. Answer C."
      },
      {
        "user": "Smaks",
        "text": "ignore this comment, please"
      },
      {
        "user": "sumanshu",
        "text": "Vote for 'C'\nA - Only Half requirement fulfil, expose as a file not getting fulfiled\nB - Not a warehouse\nC. Both requirements fulfiled...Bigquery and GCS\nD. Both requirement fulfiled...but what if other cloud provider wants to analysis on rest 80% of the data. -\nSo out of 4 options, C looks okay"
      },
      {
        "user": "medeis_jar",
        "text": "\"You must be able to perform data warehouse-style analytics on the data in Google Cloud and expose the dataset as files for batch analysis tools in other cloud providers?\"\nAnalytics -> BQ\nExposing -> GCS"
      },
      {
        "user": "dambilwa",
        "text": "Option [C] is most appropriate. Option [D] is too specific - i.e. ratio of hot & cold data which is nowhere mentioned in the question. Hence option [D] can be eliminated"
      },
      {
        "user": "spicebits",
        "text": "If you export data from BQ to GCS then you will have two copies and you will be in the same architecture as answer C."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 31,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You work for a manufacturing company that sources up to 750 different components, each from a different supplier. You've collected a labeled dataset with on average 1000 examples for each unique component. Your team wants to implement an app to help warehouse workers recognize incoming components based on a photo. You want to implement the first working version within a few working days. What should you do?",
    "options": [
      "A. Use Cloud Vision AutoML with the existing dataset.",
      "B. Use Cloud Vision AutoML, but reduce your dataset twice.",
      "C. Use Cloud Vision API by providing custom labels as recognition hints.",
      "D. Train your own image recognition model leveraging transfer learning techniques."
    ],
    "correct": 0,
    "explanation": "Use Cloud Vision AutoML with the existing dataset This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "Callumr",
        "text": "B - You only need a PoC and it has be done quickly"
      },
      {
        "user": "odacir",
        "text": "First I think in Vision API, but that is a pre-trained AI, will not recognize my labels, so because you have 1000 samples per item, AUTO ML is perfect. B cannot be because have not sensed to reduce your dataset if you have the recommended number of info.\nhttps://cloud.google.com/vision/automl/docs/beginners-guide#include_enough_labeled_examples_in_each_category\nThe bare minimum required by AutoML Vision training is 100 image examples per category/label. The likelihood of successfully recogniz..."
      },
      {
        "user": "techtitan",
        "text": "A - https://cloud.google.com/vertex-ai/docs/beginner/beginners-guide Target at least 1000 examples per target"
      },
      {
        "user": "Cloud_Enthusiast",
        "text": "A:\nhttps://cloud.google.com/vision/automl/docs/beginners-guide\n\"The bare minimum required by AutoML Vision training is 100 image examples per category/label. The likelihood of successfully recognizing a label goes up with the number of high quality examples for each; in general, the more labeled data you can bring to the training process, the better your model will be. Target at least 1000 examples per label.\""
      },
      {
        "user": "Bhawantha",
        "text": "Ans B\nVision API is giving just a rough idea about the image. Not exactly what we want. Because of that, we can exclude C. Since D is time-consuming D also can exclude.\nFight between A and B. For Auto, ML minimum is required 100 images per label. Even we get half or full the dataset is completely OK. But remember this is POC. In industry after POC most of the time we add new features or there are some changes. We just need to verify that by using this dataset and technologies we can implement..."
      },
      {
        "user": "dragon123",
        "text": "The bare minimum required by AutoML Vision training is 100 image examples per category/label. So it should be B"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 32,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You are working on a niche product in the image recognition domain. Your team has developed a model that is dominated by custom C++ TensorFlow ops performing bulky matrix multiplications. It takes days to train. You want to decrease this time significantly and keep cost low by using an accelerator on Google Cloud. What should you do?",
    "options": [
      "A. Use Cloud TPUs without any additional adjustment to your code.",
      "B. Use Cloud TPUs after implementing GPU kernel support for your custom ops.",
      "C. Use Cloud GPUs after implementing GPU kernel support for your custom ops.",
      "D. Stay on CPUs, and increase the size of the cluster you're training your model on."
    ],
    "correct": 2,
    "explanation": "Use Cloud GPUs after implementing GPU kernel support for your custom ops This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "dhs227",
        "text": "The correct answer is C\nTPU does not support custom C++ tensorflow ops\nhttps://cloud.google.com/tpu/docs/tpus#when_to_use_tpus"
      },
      {
        "user": "aiguy",
        "text": "D:\nCloud TPUs are not suited to the following workloads: [...] Neural network workloads that contain custom TensorFlow operations written in C++. Specifically, custom operations in the body of the main training loop are not suitable for TPUs."
      },
      {
        "user": "gopinath_k",
        "text": "B:\n1. You need to provide support for the matrix multiplication - TPU\n2. You need to provide support for the Custom TF written in C++ - GPU"
      },
      {
        "user": "Azlijaffar",
        "text": "CPUs\n-Quick prototyping that requires maximum flexibility\n-Simple models that do not take long to train\n-Small models with small effective batch sizes\n-Models that are dominated by custom TensorFlow operations written in C++\n-Models that are limited by available I/O or the networking bandwidth of the host system\nGPUs\n-Models for which source does not exist or is too onerous to change\n-Models with a significant number of custom TensorFlow operations that must run at least partially on CPUs\n-Mo..."
      },
      {
        "user": "zellck",
        "text": "D is the answer.\nhttps://cloud.google.com/tpu/docs/tpus#when_to_use_tpus\nCloud TPUs are optimized for specific workloads. In some situations, you might want to use GPUs or CPUs on Compute Engine instances to run your machine learning workloads. In general, you can decide what hardware is best for your workload based on the following guidelines:\nCPUs\n- Models that are dominated by custom TensorFlow operations written in C++"
      },
      {
        "user": "MaxNRG",
        "text": "D:\nhttps://cloud.google.com/tpu/docs/tpus\nCloud TPUs are optimized for specific workloads. In some situations, you might want to use GPUs or CPUs on Compute Engine instances to run your machine learning workloads. In general, you can decide what hardware is best for your workload based on the following guidelines:"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 33,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You work on a regression problem in NLP domain, with 100M labeled examples. You split your dataset into train and test samples (90/10 ratio). After training, the RMSE of your model is twice as high on the train set as on the test set. How should you improve the performance of your model?",
    "options": [
      "A. Increase the share of the test sample in the train-test split.",
      "B. Try to collect more data and increase the size of your dataset.",
      "C. Try out regularization techniques (e.g., dropout or batch normalization) to avoid overfitting.",
      "D. Increase the complexity of your model by introducing an additional layer or increasing the size of vocabularies."
    ],
    "correct": 3,
    "explanation": "Increase the complexity of your model by introducing an additional layer or increasin This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "Callumr",
        "text": "This is a case of underfitting - not overfitting (for over fitting the model will have extremely low training error but a high testing error) - so we need to make the model more complex - answer is D"
      },
      {
        "user": "AJKumar",
        "text": "small RMS Error means--overfitting--fits well--so make it complex by dropping features.\nbig RMS Error means--underfitting--not good fit--so increase complexity by adding layers/features. Answer D."
      },
      {
        "user": "snamburi3",
        "text": "D. this question is in the sample exam and the correct answer shows as D."
      },
      {
        "user": "midgoo",
        "text": "I have checked and verified that the answer is C. There is a trick here about overfit and underfit. Depends on how high the RMSE of training set comparing to test set, we may have different meaning.\nIf the RMSE is higher on the training set than on the test set, but only by a small amount, this usually means that the model is UNDERFITTING the data. This means that the model is not complex enough to learn the underlying patterns in the data. To improve the performance of the model, you can try..."
      },
      {
        "user": "MaxNRG",
        "text": "D:\nA is incorrect since test sample is large enough.\nB is incorrect since dataset is pretty large already, and having more data typically helps with overfitting and not with underfitting.\nC is incorrect since regularization helps to avoid overfitting and we have a clear underfitting case.\nD is correct since increasing model complexity generally helps when you have an underfitting problem."
      },
      {
        "user": "lifebegins",
        "text": "RMSE of test > RMSE of train => OVER FITTING of the data.\nRMSE of test < RMSE of train => UNDER FITTING of the data."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 34,
    "topic": "BigQuery/DR",
    "difficulty": 2,
    "question": "You use BigQuery as your centralized analytics platform. New data is loaded every day, and an ETL pipeline modifies the original data. This ETL pipeline is regularly modified and can generate errors, but sometimes the errors are detected only after 2 weeks. You need to provide a method to recover from these errors, and your backups should be optimized for storage costs. How should you organize your data in BigQuery?",
    "options": [
      "A. Organize your data in a single table, export, and compress and store the BigQuery data in Cloud Storage.",
      "B. Organize your data in separate tables for each month, and export, compress, and store the data in Cloud Storage.",
      "C. Organize your data in separate tables for each month, and duplicate your data on a separate dataset in BigQuery.",
      "D. Organize your data in separate tables for each month, and use snapshot decorators to restore the table to a time prior to the corruption."
    ],
    "correct": 1,
    "explanation": "Organize your data in separate tables for each month, and export, compress, and store This managed ETL/ELT service with low-code visual interface; prebuilt connectors simplify data pipeline creation.",
    "discussion": [
      {
        "user": "Ganshank",
        "text": "B\nThe questions is specifically about organizing the data in BigQuery and storing backups."
      },
      {
        "user": "Poojaji",
        "text": "Decorators can only correct the data unto 7 days. Hence Option B"
      },
      {
        "user": "Lanro",
        "text": "From BigQuery documentation - Benefits of using table snapshots include the following:\n- Keep a record for longer than seven days. With BigQuery time travel, you can only access a table's data from seven days ago or more recently. With table snapshots, you can preserve a table's data from a specified point in time for as long as you want.\n- Minimize storage cost. BigQuery only stores bytes that are different between a snapshot and its base table, so a table snapshot typically uses less storag..."
      },
      {
        "user": "MaxNRG",
        "text": "B seems the best solution (but C is also good candidate)\nD is incorrect - table decorators allow time travel back only up to 7 days (see https://cloud.google.com/bigquery/table-decorators) - if you want to keep older snapshots, you would have to save them into separate table yourself (and pay for storage)."
      },
      {
        "user": "ABM9",
        "text": "Should be B\nUsing snapshot decorators , recovery is valid only for a period of 7 days. Here it says 2 weeks so \"D\" is ruled out.\nYou can undelete a table within seven days of deletion, including explicit deletions and implicit deletions due to table expiration. After seven days, it is not possible to undelete a table using any method, including opening a support ticket.\nhttps://cloud.google.com/bigquery/docs/managing-tables"
      },
      {
        "user": "Bahubali1988",
        "text": "90% of questions are having multiple answers and its very hard to get into every discussion where the conclusion is not there"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 35,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You want to process payment transactions in a point-of-sale application that will run on Google Cloud. Your user base could grow exponentially, but you do not want to manage infrastructure scaling. Which Google database service should you use?",
    "options": [
      "A. Cloud SQL",
      "B. BigQuery",
      "C. Cloud Bigtable",
      "D. Cloud Datastore"
    ],
    "correct": 3,
    "explanation": "Cloud Datastore This system ability to handle increased load by adding resources; horizontal (add servers) vs vertical (more powerful server).",
    "discussion": [
      {
        "user": "DeepakKhattar",
        "text": "Initially, thinking D is the best answer but when question is re-re-read, A seems to be correct answer for following reasons\n1. Is payment TRANSACTION -- DB should able to perform full blown transaction (updating inventory, sales info etc, though not specified) , not just ATOMIC which DataStore provides\n2. Its point-of-sale application, not ONLINE STORE where HIGH number of concurrent users ordering stuff.\n3. User Base could grow exponentially - again more users does mot mean concurrent users..."
      },
      {
        "user": "jvg637",
        "text": "D seems to be the right one. Cloud SQL doesn't automatically scale"
      },
      {
        "user": "Radhika7983",
        "text": "D seems to be the answer. This is what I think based on my analysis below.\nPOS is OLTP system but now a days NOSQL with ACID properties also are used for OLTP,\nCloud sql is good for relational database and it would have been an option here but it clearly says that \"you do not want to manage infrastructure scaling\". In cloud SQL, which is managed service and not server less, you need to manually do vertical scaling(scale up and scale down).\nHence I believe CLOUD SQL is not the option here.\nI a..."
      },
      {
        "user": "canon123",
        "text": "CloudSql does not auto scale."
      },
      {
        "user": "Chelseajcole",
        "text": "D. Looking at doc from Google:\nWhat it's good for\nDatastore is ideal for applications that rely on highly available structured data at scale. You can use Datastore to store and query all of the following types of data:\nProduct catalogs that provide real-time inventory and product details for a retailer.\nUser profiles that deliver a customized experience based on the user’s past activities and preferences.\nTransactions based on ACID properties, for example, transferring funds from one bank acc..."
      },
      {
        "user": "retep007",
        "text": "D - the question is even example use-case mentioned here https://cloud.google.com/datastore/docs/concepts/transactions#uses_for_transactions"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 36,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "The marketing team provides regular updates of a segment of your customer dataset. They gave you a CSV with 1 million records that must be updated in BigQuery. When you use the UPDATE statement, you receive a quotaExceeded error. What should you do?",
    "options": [
      "A. Reduce the number of records updated each day to stay within the BigQuery UPDATE DML statement limit.",
      "B. Increase the BigQuery UPDATE DML statement limit in the Quota management section.",
      "C. Split the source CSV file into smaller CSV files in Cloud Storage to reduce the number of BigQuery UPDATE DML statements per BigQuery job.",
      "D. Import the new records from the CSV file into a new BigQuery table. Create a BigQuery job that merges the new records with the existing records and writes the results to a new BigQuery table."
    ],
    "correct": 3,
    "explanation": "Import the new records from the CSV file into a new BigQuery table This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "rickywck",
        "text": "Should be D.\nhttps://cloud.google.com/blog/products/gcp/performing-large-scale-mutations-in-bigquery"
      },
      {
        "user": "[Removed]",
        "text": "Should be D\nhttps://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#merge_statement\nhttps://cloud.google.com/blog/products/gcp/performing-large-scale-mutations-in-bigquery"
      },
      {
        "user": "dambilwa",
        "text": "Option [D] is the most appropriate answer. However DMLs now longer have any limits in BigQuery - https://cloud.google.com/blog/products/data-analytics/dml-without-limits-now-in-bigquery"
      },
      {
        "user": "madhu1171",
        "text": "No dml limits from 3rd march 2020"
      },
      {
        "user": "haroldbenites",
        "text": "D is correct.\nhttps://cloud.google.com/bigquery/quotas#queries.\nThe error is because of the number of statements over the table , but not because of the number of records."
      },
      {
        "user": "haroldbenites",
        "text": "D is correct. Obviously."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 37,
    "topic": "Security/IAM",
    "difficulty": 2,
    "question": "As your organization expands its usage of GCP, many teams have started to create their own projects. The central IT team needs to have access to all projects. Data from Cloud Storage buckets and BigQuery datasets must be shared. You want to simplify access control management by minimizing the number of policies. Which two steps should you take? (Choose two.)",
    "options": [
      "A. Use Cloud Deployment Manager to automate access provision.",
      "B. Introduce resource hierarchy to leverage access control policy inheritance.",
      "C. Create distinct groups for various teams, and specify groups in Cloud IAM policies.",
      "D. Only use service accounts when sharing data for Cloud Storage buckets and BigQuery datasets.",
      "E. For each Cloud Storage bucket or BigQuery dataset, decide which projects need access. Find all the active members and create a Cloud IAM policy to grant access."
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "Introduce resource hierarchy to leverage access control policy inheritance This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "Answer: B, C\nDescription: Google suggests that we should provide access by following google hierarchy and groups for users with similar roles"
      },
      {
        "user": "AJKumar",
        "text": "C is one option for sure, also C eliminates B as C includes groups and teams hierarchy, A can be eliminated as A talks about only deployment. From Remaining D and E, i find E most relevant to question--as E matches users with teams/groups and projects. Answer C and E."
      },
      {
        "user": "sipsap",
        "text": "\"Each project requires unique access control configurations\" rules out hirearchy"
      },
      {
        "user": "hellofrnds",
        "text": "Answer:- C, D\nC is used as best practice to create group and assign IAM roles\nD \"data from Cloud Storage buckets and BigQuery datasets must be shared for use in other projects in an ad hoc way\" is mentioned in question. When 2 project communicate, service account should be used"
      },
      {
        "user": "MaxNRG",
        "text": "B & C\nGoogle Cloud resources are organized hierarchically, where the organization node is the root node in the hierarchy, the projects are the children of the organization, and the other resources are descendents of projects.\nYou can set Cloud Identity and Access Management (Cloud IAM) policies at different levels of the resource hierarchy. Resources inherit the policies of the parent resource. The effective policy for a resource is the union of the policy set at that resource and the policy ..."
      },
      {
        "user": "FrankT2L",
        "text": "1. Define your resource hierarchy: Google Cloud resources are organized hierarchically. This hierarchy allows you to map your enterprise's operational structure to Google Cloud, and to manage access control and permissions for groups of related resources.\n2. Delegate responsibility with groups and service accounts: we recommend collecting users with the same responsibilities into groups and assigning IAM roles to the groups rather than to individual users.\nhttps://cloud.google.com/docs/enterp..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 38,
    "topic": "Storage",
    "difficulty": 2,
    "question": "Your US-based company has created an application for assessing and responding to user actions. The primary table's data volume grows by 250,000 records per second. APIs should comply with: Single global endpoint, ANSI SQL support, Consistent access to the most up-to-date data. What should you do?",
    "options": [
      "A. Implement BigQuery with no region selected for storage or processing.",
      "B. Implement Cloud Spanner with the leader in North America and read-only replicas in Asia and Europe.",
      "C. Implement Cloud SQL for PostgreSQL with the master in North America and read replicas in Asia and Europe.",
      "D. Implement Bigtable with the primary cluster in North America and secondary clusters in Asia and Europe."
    ],
    "correct": 1,
    "explanation": "Implement Cloud Spanner with the leader in North America and read-only replicas in As This optimizes data access patterns and minimizes egress costs.",
    "discussion": [
      {
        "user": "sumanshu",
        "text": "A - BigQuery with NO Region ? (Looks wrong)\nB - Spanner (SQL support and Scalable and have replicas ) - Looks correct\nC - SQL (can't store so many records) (wrong)\nD - Bigtable - NO SQL (wrong)\nVote for B"
      },
      {
        "user": "Tanmoyk",
        "text": "B is correct, Bigquery cannot support 250K data ingestion/second , as ANSI SQL support is required , no other options left except Spanner."
      },
      {
        "user": "MaxNRG",
        "text": "B: Cloud Spanner is the first scalable, enterprise-grade, globally-distributed, and strongly consistent database service built for the cloud specifically to combine the benefits of relational database structure with non-relational horizontal scale.\nhttps://cloud.google.com/spanner/\nCloud Spanner is a fully managed, mission-critical, relational database service that offers transactional consistency at global scale, schemas, SQL (ANSI 2011 with extensions), and automatic, synchronous replicatio..."
      },
      {
        "user": "Archy",
        "text": "B, as Cloud Spanner has three types of replicas: read-write replicas, read-only replicas, and witness replicas."
      },
      {
        "user": "Remi2021",
        "text": "Guys, read documentation well. A is wrong, BigQuery has Maximum rows per request (50,000).\nhttps://cloud.google.com/bigquery/quotas\nIt is B"
      },
      {
        "user": "vaga1",
        "text": "A - NO - BigQuery with must have a selected regional or multi-regional file storage\nB - YES - Spanner is specifically designed for this high and consistent throughput\nC - NO - I am not sure about what many said in this discussion as Cloud SQL can store this amount of records if u have just a few columns. Anyway, for sure Spanner is better and it is a GCP product.\nD - Bigtable - it's a NoSQL solution, no ANSI"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 39,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "A data scientist has created a BigQuery ML model and asks you to create an ML pipeline to serve predictions. You have a REST API application with the requirement to serve predictions for an individual user ID with latency under 100 milliseconds. How should you create the ML pipeline?",
    "options": [
      "A. Add a WHERE clause to the query, and grant the BigQuery Data Viewer role to the application service account.",
      "B. Create an Authorized View with the provided query. Share the dataset that contains the view with the application service account.",
      "C. Create a Dataflow pipeline using BigQueryIO to read results from the query. Grant the Dataflow Worker role to the application service account.",
      "D. Create a Dataflow pipeline using BigQueryIO to read predictions for all users from the query. Write the results to Bigtable using BigtableIO. Grant the Bigtable Reader role to the application service account."
    ],
    "correct": 3,
    "explanation": "Create a Dataflow pipeline using BigQueryIO to read predictions for all users from th This SQL interface to ML models enabling predictions directly from BigQuery without data export; simplifies ML workflows.",
    "discussion": [
      {
        "user": "rickywck",
        "text": "I think the key reason for pick D is the 100ms requirement."
      },
      {
        "user": "MaxNRG",
        "text": "The key requirements are serving predictions for individual user IDs with low (sub-100ms) latency.\nOption D meets this by batch predicting for all users in BigQuery ML, writing predictions to Bigtable for fast reads, and allowing the application access to query Bigtable directly for low latency reads.\nSince the application needs to serve low-latency predictions for individual user IDs, using Dataflow to batch predict for all users and write to Bigtable allows low-latency reads. Granting the B..."
      },
      {
        "user": "sumanshu",
        "text": "Vote for D, requirement to serve predictions with in 100 ms"
      },
      {
        "user": "Tanmoyk",
        "text": "D is correct , 100ms is most critical factor here."
      },
      {
        "user": "midgoo",
        "text": "One of the way to improve the efficient of ML pipeline is to generate cache (store predictions). In this question, only D is doing that."
      },
      {
        "user": "f839",
        "text": "Predictions are computed in advance for all users and written to BigTable for low-latency serving."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 40,
    "topic": "Architecture",
    "difficulty": 3,
    "question": "You are building an application to share financial market data with consumers. Data is collected from the markets in real time. Consumers will receive the data in the following ways: Real-time event stream, ANSI SQL access to real-time stream and historical data, Batch historical exports. Which solution should you use?",
    "options": [
      "A. Cloud Dataflow, Cloud SQL, Cloud Spanner",
      "B. Cloud Pub/Sub, Cloud Storage, BigQuery",
      "C. Cloud Dataproc, Cloud Dataflow, BigQuery",
      "D. Cloud Pub/Sub, Cloud Dataproc, Cloud SQL"
    ],
    "correct": 1,
    "explanation": "Cloud Pub/Sub, Cloud Storage, BigQuery This balances scalability, cost, and performance requirements.",
    "discussion": [
      {
        "user": "itche_scratche",
        "text": "D, not ideal but only option that work. You need pubsub, then a processing layer (dataflow or dataproc), then storage (some sql database)."
      },
      {
        "user": "medeis_jar",
        "text": "✑ Real-time event stream -> Pub/Sub\n✑ ANSI SQL access to real-time stream and historical data -> BigQuery\n✑ Batch historical exports -> Cloud Storage"
      },
      {
        "user": "VishalB",
        "text": "Correct Answer: B\nStreaming Data -- Pub/Sub\nANSI SQL access -- Big Query\nBatch historical exports -- Cloud Storage"
      },
      {
        "user": "Rajokkiyam",
        "text": "Answer B.\nStreaming Data - Pub/Sub.\nQuery Batch and Live Streaming Data - BigQuery."
      },
      {
        "user": "jalk",
        "text": "because of the requirement: Batch historical exports\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      },
      {
        "user": "barnac1es",
        "text": "B. Cloud Pub/Sub, Cloud Storage, BigQuery.\nHere's how this solution aligns with your requirements:\nReal-time Event Stream: Cloud Pub/Sub is a managed messaging service that can handle real-time event streams efficiently. You can use Pub/Sub to ingest and publish real-time market data to consumers.\nANSI SQL Access: BigQuery supports ANSI SQL queries, making it suitable for both real-time and historical data analysis. You can stream data into BigQuery tables from Pub/Sub and provide ANSI SQL ac..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 41,
    "topic": "Architecture",
    "difficulty": 3,
    "question": "You are building a new application that you need to collect data from in a scalable way. Data arrives continuously. You expect to generate approximately 150 GB of JSON data per day by the end of the year. Requirements: Decoupling producer from consumer, space and cost-efficient storage, near real-time SQL query, maintain at least 2 years of historical data. Which pipeline should you use?",
    "options": [
      "A. Create an application that provides an API. Write a tool to poll the API and write data to Cloud Storage as gzipped JSON files.",
      "B. Create an application that writes to a Cloud SQL database. Set up periodic exports of the database to write to Cloud Storage and load into BigQuery.",
      "C. Create an application that publishes events to Cloud Pub/Sub, and create Spark jobs on Cloud Dataproc to convert the JSON data to Avro format, stored on HDFS.",
      "D. Create an application that publishes events to Cloud Pub/Sub, and create a Cloud Dataflow pipeline that transforms the JSON event payloads to Avro, writing the data to Cloud Storage and BigQuery."
    ],
    "correct": 3,
    "explanation": "Create an application that publishes events to Cloud Pub/Sub, and create a Cloud Data This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "JG123",
        "text": "Why there are so many wrong answers? Examtopics.com are you enjoying paid subscription by giving random answers from people?\nAns: D"
      },
      {
        "user": "AJKumar",
        "text": "A and B can be eliminated righaway. between C and D; C has no bigquery , Answer D."
      },
      {
        "user": "MaxNRG",
        "text": "D:\nCloud Pub/Sub, Cloud Dataflow, Cloud Storage, BigQuery https://cloud.google.com/solutions/stream-analytics/"
      },
      {
        "user": "sandipk91",
        "text": "Answer is D for sure"
      },
      {
        "user": "barnac1es",
        "text": "Here's how this option aligns with your requirements:\nDecoupling Producer from Consumer: Cloud Pub/Sub provides a decoupled messaging system where the producer publishes events, and consumers (like Dataflow) can subscribe to these events. This decoupling ensures flexibility and scalability.\nSpace and Cost-Efficient Storage: Storing data in Avro format is more space-efficient than JSON, and Cloud Storage is a cost-effective storage solution. Additionally, Cloud Pub/Sub and Dataflow allow you t..."
      },
      {
        "user": "daghayeghi",
        "text": "D:\nbecause we have to be able to query over historical 2 years data only BigQuery address this issue."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 42,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You are running a pipeline in Dataflow that receives messages from a Pub/Sub topic and writes results to a BigQuery dataset in the EU. Currently in europe-west4 with max 3 workers (n1-standard-1). During peak periods, all 3 workers are at maximum CPU utilization. Which two actions can you take to increase performance? (Choose two.)",
    "options": [
      "A. Increase the number of max workers",
      "B. Use a larger instance type for your Dataflow workers",
      "C. Change the zone of your Dataflow pipeline to run in us-central1",
      "D. Create a temporary table in Bigtable that will act as a buffer for new data.",
      "E. Create a temporary table in Cloud Spanner that will act as a buffer for new data."
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "Increase the number of max workers This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "A & B\ninstance n1-standard-1 is low configuration and hence need to be larger configuration, definitely B should be one of the option.\nIncrease max workers will increase parallelism and hence will be able to process faster given larger CPU size and multi core processor instance type is chosen. Option A can be a better step."
      },
      {
        "user": "sumanshu",
        "text": "A & B.\nWith autoscaling enabled, the Dataflow service does not allow user control of the exact number of worker instances allocated to your job. You might still cap the number of workers by specifying the --max_num_workers option when you run your pipeline. Here as per question CAP is 3, So we can change that CAP.\nFor batch jobs, the default machine type is n1-standard-1. For streaming jobs, the default machine type for Streaming Engine-enabled jobs is n1-standard-2 and the default machine ty..."
      },
      {
        "user": "haroldbenites",
        "text": "A , E is correct"
      },
      {
        "user": "MaxNRG",
        "text": "A & B, other options don't make sense"
      },
      {
        "user": "AJKumar",
        "text": "D and E can be eliminated right away as the question does not talk abt spanner or bigtable, C is also eliminated as changing time zones is irrelevant. Answer A&B."
      },
      {
        "user": "barnac1es",
        "text": "A. Increase the number of max workers:\nBy increasing the number of maximum workers, you allow Dataflow to allocate more computing resources to handle the peak load of incoming data. This can help improve processing speed and reduce CPU utilization per worker.\nB. Use a larger instance type for your Dataflow workers:\nUsing a larger instance type with more CPU and memory resources can help your Dataflow workers handle a higher volume of data and processing tasks more efficiently. It can address ..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 43,
    "topic": "Dataflow/Bigtable",
    "difficulty": 2,
    "question": "You have a data pipeline with a Dataflow job that aggregates and writes time series metrics to Bigtable. You notice that data is slow to update in Bigtable. This data feeds a dashboard used by thousands of users. You need to support additional concurrent users and reduce the amount of time required to write the data. Which two actions should you take? (Choose two.)",
    "options": [
      "A. Configure your Dataflow pipeline to use local execution",
      "B. Increase the maximum number of Dataflow workers by setting maxNumWorkers in PipelineOptions",
      "C. Increase the number of nodes in the Bigtable cluster",
      "D. Modify your Dataflow pipeline to use the Flatten transform before writing to Bigtable",
      "E. Modify your Dataflow pipeline to use the CoGroupByKey transform before writing to Bigtable"
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "Increase the maximum number of Dataflow workers by setting maxNumWorkers in PipelineO This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "arpitagrawal",
        "text": "It should be B and C"
      },
      {
        "user": "ducc",
        "text": "BC is correct\nWhy the comments is deleted?"
      },
      {
        "user": "BlehMaks",
        "text": "B - opportunity to parallelise the process\nC - increase throughput"
      },
      {
        "user": "barnac1es",
        "text": "B. Increase the maximum number of Dataflow workers by setting maxNumWorkers in PipelineOptions:\nIncreasing the number of Dataflow workers can help parallelize the processing of your data, which can result in faster data updates to Bigtable and improved concurrency. You can set maxNumWorkers to a higher value to achieve this.\nC. Increase the number of nodes in the Bigtable cluster:\nIncreasing the number of nodes in your Bigtable cluster can improve the overall throughput and reduce latency whe..."
      },
      {
        "user": "emmylou",
        "text": "The \"Correct Answers\" are just put in with a random generator :-) B and C"
      },
      {
        "user": "ckanaar",
        "text": "C definetely is correct, as it improves the read and write performance of Bigtable.\nHowever, I do think that the second option is actually D instead of B, because the question specifically states that the pipeline aggregates data. Flatten merges multiple PCollection objects into a single logical PCollection, allowing for faster aggregation of time series data."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 44,
    "topic": "Orchestration",
    "difficulty": 2,
    "question": "You have several Spark jobs that run on a Cloud Dataproc cluster on a schedule. Some of the jobs run in sequence, and some run concurrently. You need to automate this process. What should you do?",
    "options": [
      "A. Create a Cloud Dataproc Workflow Template",
      "B. Create an initialization action to execute the jobs",
      "C. Create a Directed Acyclic Graph in Cloud Composer",
      "D. Create a Bash script that uses the Cloud SDK to create a cluster, execute jobs, and then tear down the cluster"
    ],
    "correct": 2,
    "explanation": "Create a Directed Acyclic Graph in Cloud Composer This provides reliable scheduling with error handling and retries.",
    "discussion": [
      {
        "user": "LP_PDE",
        "text": "Correct answer is A. https://cloud.google.com/dataproc/docs/concepts/workflows/using-workflows"
      },
      {
        "user": "captainbu",
        "text": "I've would've gone for Workflow Templates as well. But those are lacking the scheduling capability. Hence you would need to use Cloud Composer (or Cloud Functions or Cloud Scheduler) anyway. Hence C seems to be the better solution.\nPls see here:\nhttps://cloud.google.com/dataproc/docs/concepts/workflows/workflow-schedule-solutions"
      },
      {
        "user": "devaid",
        "text": "C.\nComposer fits better to schedule Dataproc Workflows, check the documentation:\nhttps://cloud.google.com/dataproc/docs/concepts/workflows/workflow-schedule-solutions\nAlso A is not enough. Dataproc Workflow Template itself don't has a native schedule option."
      },
      {
        "user": "MaxNRG",
        "text": "The best option for automating your scheduled Spark jobs on Cloud Dataproc, considering sequential and concurrent execution, is:\nC. Create a Directed Acyclic Graph (DAG) in Cloud Composer."
      },
      {
        "user": "MaxNRG",
        "text": "While the other options have some merit, they fall short in certain aspects:\nA. Cloud Dataproc Workflow Templates: While workflow templates can automate job submission on a cluster, they lack the ability to define dependencies and coordinate concurrent execution effectively.\nB. Initialization action: An initialization action can only run a single script before a Dataproc cluster starts, not suitable for orchestrating multiple scheduled jobs with dependencies.\nD. Bash script: A Bash script mig..."
      },
      {
        "user": "AzureDP900",
        "text": "C. Create a Directed Acyclic Graph in Cloud Composer"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 45,
    "topic": "Pub/Sub",
    "difficulty": 2,
    "question": "You are building a new data pipeline to share data between two different types of applications: jobs generators and job runners. Your solution must scale to accommodate increases in usage and must accommodate the addition of new applications without negatively affecting the performance of existing ones. What should you do?",
    "options": [
      "A. Create an API using App Engine to receive and send messages to the applications",
      "B. Use a Cloud Pub/Sub topic to publish jobs, and use subscriptions to execute them",
      "C. Create a table on Cloud SQL, and insert and delete rows with the job information",
      "D. Create a table on Cloud Spanner, and insert and delete rows with the job information"
    ],
    "correct": 1,
    "explanation": "Use a Cloud Pub/Sub topic to publish jobs, and use subscriptions to execute them This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "jkhong",
        "text": "Job generators (they would be the publishers).\nJob runners = subscribers\nQuestion mentions that it must scale (of which push subscription has automatic scaling) and can accommodate additional new applications (this can be solved by having multiple subscriptions, with each relating to a unique application) to a central topic"
      },
      {
        "user": "AzureDP900",
        "text": "Yes it is\nB. Use a Cloud Pub/Sub topic to publish jobs, and use subscriptions to execute them"
      },
      {
        "user": "barnac1es",
        "text": "B. Use a Cloud Pub/Sub topic to publish jobs, and use subscriptions to execute them.\nScalability: Cloud Pub/Sub is a highly scalable messaging service that can handle a significant volume of messages and subscribers. It can easily accommodate increases in usage as your data pipeline scales.\nDecoupling: Using Pub/Sub decouples the job generators from the job runners, which is a good architectural choice for flexibility and scalability. Job generators publish messages to a topic, and job runner..."
      },
      {
        "user": "musumusu",
        "text": "key words here: job generators (pushlish message on pub/sub) and job runners(subscribe message for further analysis). You may add as much as pushlishing job and subscribing job to same topic. So Answer B.\nUsing API , app engine is also good approach but its more complex than pub/sub."
      },
      {
        "user": "zellck",
        "text": "B is the answer."
      },
      {
        "user": "YorelNation",
        "text": "I would tend to think B , one of the use of pub/sub is decoupling app"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 46,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You want to use a database of information about tissue samples to classify future tissue samples as either normal or mutated. You are evaluating an unsupervised anomaly detection method. Which two characteristics support this method? (Choose two.)",
    "options": [
      "A. There are very few occurrences of mutations relative to normal samples.",
      "B. There are roughly equal occurrences of both normal and mutated samples in the database.",
      "C. You expect future mutations to have different features from the mutated samples in the database.",
      "D. You expect future mutations to have similar features to the mutated samples in the database.",
      "E. You already have labels for which samples are mutated and which are normal in the database."
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "There are very few occurrences of mutations relative to normal samples This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "I think that AD makes more sense. D is the explanation you gave. In the rest, A makes more sense, in any anomaly detection algorithm it is assumed a priori that you have much more \"normal\" samples than mutated ones, so that you can model normal patterns and detect patterns that are \"off\" that normal pattern. For that you will always need the no. of normal samples to be much bigger than the no. of mutated samples."
      },
      {
        "user": "szefco",
        "text": "I don't agree on C. Anomaly detection assumes \"Their features differ from the NORMAL INSTANCES significantly\" and in the C option you have:\n\"You expect future mutations to have different features from the MUTATED SAMPLES IN THE DATABASE\".\nIMHO Answer D fits better: \"D. You expect future mutations to have similar features to the mutated samples in the database.\" - in other words: Expect future anomalies to be similar to the anomalies that we already have in database"
      },
      {
        "user": "BigQuery",
        "text": "Guys its A & C.\nAnomaly detection has two basic assumptions:\n->Anomalies only occur very rarely in the data. (a)\n->Their features differ from the normal instances significantly. (c)\nlink -> https://towardsdatascience.com/anomaly-detection-for-dummies-15f148e559c1#:~:text=Unsupervised%20Anomaly%20Detection%20for%20Univariate%20%26%20Multivariate%20Data.&text=Anomaly%20detection%20has%20two%20basic,from%20the%20normal%20instances%20significantly."
      },
      {
        "user": "jvg637",
        "text": "A instead of B:\n\"anomaly detection (also outlier detection[1]) is the identification of rare items, events or observations which raise suspicions by differing significantly from the majority of the data"
      },
      {
        "user": "Ganshank",
        "text": "A,C.\nA - The intent is to perform anomaly detection. Mutated samples are generally a very small fraction, compared to the normal samples.\nC - Mutations by definition do not follow a set pattern, as such we may expect to see future samples with different features."
      },
      {
        "user": "MauryaSushil",
        "text": "AD : Mutation of cells is not a common phenomena it's very rare phenomena like Cancer tissues are mutated. So Chances of getting Mutated samples is very low.\nSo getting enough labelled dataset for prediction is not practical so must go for unsupervised method rather than classification. So answer A is correct.\nNo Matter what machine learning and AI is pattern based techonology so future samples should show similar traits as earlier dataset for it to work. So answer D should be correct."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 47,
    "topic": "Spanner",
    "difficulty": 2,
    "question": "You need to create a new transaction table in Cloud Spanner that stores product sales data. You are deciding what to use as a primary key. From a performance perspective, which strategy should you choose?",
    "options": [
      "A. The current epoch time",
      "B. A concatenation of the product name and the current epoch time",
      "C. A random universally unique identifier number (version 4 UUID)",
      "D. The original order identification number from the sales system, which is a monotonically increasing integer"
    ],
    "correct": 2,
    "explanation": "A random universally unique identifier number (version 4 UUID) This horizontally scalable relational database with strong consistency and global transactions; ideal for distributed applications.",
    "discussion": [
      {
        "user": "Remi2021",
        "text": "According to the documentation:\nUse a Universally Unique Identifier (UUID)\nYou can use a Universally Unique Identifier (UUID) as defined by RFC 4122 as the primary key. Version 4 UUID is recommended, because it uses random values in the bit sequence. Version 1 UUID stores the timestamp in the high order bits and is not recommended.\nhttps://cloud.google.com/spanner/docs/schema-design"
      },
      {
        "user": "barnac1es",
        "text": "For a transaction table in Cloud Spanner that stores product sales data, from a performance perspective, it is generally recommended to choose a primary key that allows for even distribution of data across nodes and minimizes hotspots. Therefore, option C, which suggests using a random universally unique identifier number (version 4 UUID), is the preferred choice."
      },
      {
        "user": "odacir",
        "text": "A and D are not valid, because they monotonically increase.\nC avoid hotspots for sure, but It's nor relate with querys. So for writing performance it's perfect that the reason for chose this: “You need to create a new transaction table in Cloud Spanner that stores product sales data”. They only ask you to store product data, its a writing ops.\nIf the question had spoken about query the info or hard performance read, the best option would be B, because it has the balance of writing/reading bes..."
      },
      {
        "user": "vaga1",
        "text": "B might work if you say timestamp instead than epoch. PK of sales should contain the exact purchase date or timestamp, not the time when the transaction was processed. I personally associate the term epoch in this context to the process timestamp instead than the purchase timestamp."
      },
      {
        "user": "midgoo",
        "text": "B may cause error if same product ID came at the same time (same id + same epoch)\nSo C is the correct answer here"
      },
      {
        "user": "jkhong",
        "text": "A and D are invalid because they monotonically increases.\nB would work, but in terms of pure performance UUID 4 is the fastest because it virtually will not cause hotspots"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 48,
    "topic": "Security/Logging",
    "difficulty": 2,
    "question": "Data Analysts in your company have the Cloud IAM Owner role in their projects. Your organization requires that all BigQuery data access logs be retained for 6 months. You need to ensure that only audit personnel can access the data access logs for all projects. What should you do?",
    "options": [
      "A. Enable data access logs in each Data Analyst's project. Restrict access to Stackdriver Logging via Cloud IAM roles.",
      "B. Export the data access logs via a project-level export sink to a Cloud Storage bucket in the Data Analysts' projects.",
      "C. Export the data access logs via a project-level export sink to a Cloud Storage bucket in a newly created project for audit logs.",
      "D. Export the data access logs via an aggregated export sink to a Cloud Storage bucket in a newly created project for audit logs. Restrict access to the project that contains the exported logs."
    ],
    "correct": 3,
    "explanation": "Export the data access logs via an aggregated export sink to a Cloud Storage bucket i This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "SteelWarrior",
        "text": "Answer D is correct. Aggregated log sink will create a single sink for all projects, the destination can be a google cloud storage, pub/sub topic, bigquery table or a cloud logging bucket. without aggregated sink this will be required to be done for each project individually which will be cumbersome.\nhttps://cloud.google.com/logging/docs/export/aggregated_sinks"
      },
      {
        "user": "[Removed]",
        "text": "Correct: D\nhttps://cloud.google.com/iam/docs/roles-audit-logging#scenario_external_auditors"
      },
      {
        "user": "sumanshu",
        "text": "A - eliminated , because logs needs to be retained for 6 months (So, some storage require)\nB - eliminated, because if we store in same project then, Data Analyst can also access (But in question it's mention, ONLY audit personnel needs access)\nC - Wrong (No need to restrict project as well as logs separately) - wording does not look okay.\nD - Correct (If we restrict the project, then all resources get restricted)\nVote for D"
      },
      {
        "user": "VishalB",
        "text": "Ans : D\nAggregated Exports, which allows you to set up a sink at the Cloud IAM organization or folder level, and export logs from all the projects inside the organization or folder."
      },
      {
        "user": "MaxNRG",
        "text": "D: https://cloud.google.com/logging/docs/export/aggregated_exports\nYou can create an aggregated export sink that can export log entries from all the projects, folders, and billing accounts of an organization. As an example, you might use this feature to export audit log entries from an organization's projects to a central location."
      },
      {
        "user": "Chelseajcole",
        "text": "The auditor needs to audit data analyst's behaviors (how they access multiple projects in BQ ). So, the key is, multiple projects. According to Google doc project-level sinks:\nhttps://cloud.google.com/logging/docs/export/configure_export_v2\nHowever, the Cloud Console can only create or view sinks in Cloud projects. To create sinks in organizations, folders, or billing accounts using the gcloud command-line tool or Cloud Logging API, see Aggregated sinks.\nObviously, the auditor needs to check ..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 49,
    "topic": "Monitoring",
    "difficulty": 3,
    "question": "Each analytics team in your organization is running BigQuery jobs in their own projects. You want to enable each team to monitor slot usage within their projects. What should you do?",
    "options": [
      "A. Create a Cloud Monitoring dashboard based on the BigQuery metric query/scanned_bytes",
      "B. Create a Cloud Monitoring dashboard based on the BigQuery metric slots/allocated_for_project",
      "C. Create a log export for each project, capture the BigQuery job execution logs, create a custom metric based on the totalSlotMs, and create a Cloud Monitoring dashboard based on the custom metric",
      "D. Create an aggregated log export at the organization level, capture the BigQuery job execution logs, create a custom metric based on the totalSlotMs, and create a Cloud Monitoring dashboard based on the custom metric"
    ],
    "correct": 1,
    "explanation": "Create a Cloud Monitoring dashboard based on the BigQuery metric slots/allocated_for_ This provides visibility into system performance and enables proactive alerting.",
    "discussion": [
      {
        "user": "saurabhsingh4k",
        "text": "The correct answer is B. You should create a Cloud Monitoring dashboard based on the BigQuery metric slots/allocated_for_project.\nThis metric represents the number of BigQuery slots allocated for a project. By creating a Cloud Monitoring dashboard based on this metric, you can monitor the slot usage within each project in your organization. This will allow each team to monitor their own slot usage and ensure that they are not exceeding their allocated quota.\nOption A is incorrect because the ..."
      },
      {
        "user": "John_Pongthorn",
        "text": "B ,the another is related to the question as well.\nhttps://cloud.google.com/bigquery/docs/reservations-monitoring#viewing-slot-usage"
      },
      {
        "user": "John_Pongthorn",
        "text": "B the below is related to the question.\nhttps://cloud.google.com/blog/topics/developers-practitioners/monitoring-bigquery-reservations-and-slot-utilization-information_schema"
      },
      {
        "user": "barnac1es",
        "text": "The slots/allocated_for_project metric provides information about the number of slots allocated to each project. It directly reflects the slot usage, making it a relevant and accurate metric for monitoring slot allocation within each project.\nOptions A, C, and D involve log exports and custom metrics, but they may not be as straightforward or provide the same level of detail as the built-in metric slots/allocated_for_project:"
      },
      {
        "user": "MaxNRG",
        "text": "Viewing project and reservation slot usage in Stackdriver Monitoring\nInformation is available from the \"Slots Allocated\" metric in Stackdriver Monitoring. This metric information includes a per-reservation and per-job breakdown of slot usage. The information can also be visualized by using the custom charts metric explorer.\nhttps://cloud.google.com/bigquery/docs/reservations-monitoring\nhttps://cloud.google.com/monitoring/api/metrics_gcp"
      },
      {
        "user": "ckanaar",
        "text": "The naming is quite misleading in this case, but it actually seems from the documentation that slots/allocated_for_project indicates the \"slots used by project\", in which case answer B is correct: https://cloud.google.com/monitoring/api/metrics_gcp#:~:text=slots/allocated_for_project%20GA%0ASlots%20used%20by%20project"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 50,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You are operating a streaming Cloud Dataflow pipeline. Your engineers have a new version with a different windowing algorithm and triggering strategy. You want to update the running pipeline with the new version. You want to ensure that no data is lost. What should you do?",
    "options": [
      "A. Update the pipeline inflight by passing the --update option with the --jobName set to the existing job name",
      "B. Update the pipeline inflight by passing the --update option with the --jobName set to a new unique job name",
      "C. Stop the pipeline with the Cancel option. Create a new Cloud Dataflow job with the updated code",
      "D. Stop the pipeline with the Drain option. Create a new Cloud Dataflow job with the updated code"
    ],
    "correct": 3,
    "explanation": "Stop the pipeline with the Drain option This windowing groups streaming data into logical windows (tumbling, sliding, session) to aggregate time-series data and detect patterns.",
    "discussion": [
      {
        "user": "odacir",
        "text": "It's D. → Your engineers have a new version of the pipeline with a different windowing algorithm and triggering strategy.\nNew version is mayor changes. Stop and drain and then launch the new code is a lot is the safer way.\nWe recommend that you attempt only smaller changes to your pipeline's windowing, such as changing the duration of fixed- or sliding-time windows. Making major changes to windowing or triggers, like changing the windowing algorithm, might have unpredictable results on your p..."
      },
      {
        "user": "jkhong",
        "text": "agree with odacir"
      },
      {
        "user": "devaid",
        "text": "D of course. Also you can only update for minor changes on windowing/triggering. Question say a different strategy."
      },
      {
        "user": "josrojgra",
        "text": "The answer is A.\nThe question says \"update\", and on the documentation (https://cloud.google.com/dataflow/docs/guides/updating-a-pipeline#UpdateMechanics) says explicitly on the second paragraph this:\nThe replacement job preserves any intermediate state data from the prior job, as well as any buffered data records or metadata currently \"in-flight\" from the prior job. For example, some records in your pipeline might be buffered while waiting for a window to resolve.\nSo the update process preven..."
      },
      {
        "user": "midgoo",
        "text": "A is not recommeded for major changes in pipeline."
      },
      {
        "user": "musumusu",
        "text": "Answer D: as per latest documents 02/2023 google has removed update flag."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 51,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "You need to move 2 PB of historical data from an on-premises storage appliance to Cloud Storage within six months, and your outbound network capacity is constrained to 20 Mb/sec. How should you migrate this data?",
    "options": [
      "A. Use Transfer Appliance to copy the data to Cloud Storage",
      "B. Use gsutil cp -J to compress the content being uploaded to Cloud Storage",
      "C. Create a private URL for the historical data, and then use Storage Transfer Service to copy the data to Cloud Storage",
      "D. Use trickle or ionice along with gsutil cp to limit the amount of bandwidth"
    ],
    "correct": 0,
    "explanation": "Use Transfer Appliance to copy the data to Cloud Storage This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "sumanshu",
        "text": "Vote for A\nA - Correct , Transfer Appliance for moving offline data, large data sets, or data from a source with limited bandwidth\nhttps://cloud.google.com/storage-transfer/docs/overview\nB - Eliminated (Not recommended for large storage). recommended for < 1TB\nC - Its ONLINE, but we have bandwidth issue - So eliminated.\nD - Eliminated (Not recommended for large storage). recommended for < 1TB"
      },
      {
        "user": "jkhong",
        "text": "Problem: Transferring 2 peta data to Cloud Storage\nConsiderations: Bad network speed\nBad network = cannot initiate from client’s end through network. So, B, C is out\nD will still be super slow. At this speed it will take 27,777 hours to transfer the data"
      },
      {
        "user": "SteelWarrior",
        "text": "Correct answer is A. with little calculation we know the kind of data will require approx 19 months to transfer on 20Mbps bandwidth. Also, google recommends Transfer appliance for petabytes of data."
      },
      {
        "user": "arien_chen",
        "text": "it would take 34 years.\nOption A no doubt.\nhttps://cloud.google.com/static/architecture/images/big-data-transfer-how-to-get-started-transfer-size-and-speed.png"
      },
      {
        "user": "AzureDP900",
        "text": "This is no brainer question, A is right"
      },
      {
        "user": "zellck",
        "text": "A is the answer.\nhttps://cloud.google.com/transfer-appliance/docs/4.0/overview\nTransfer Appliance is a high-capacity storage device that enables you to transfer and securely ship your data to a Google upload facility, where we upload your data to Cloud Storage."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 52,
    "topic": "Data Processing",
    "difficulty": 2,
    "question": "You receive data files in CSV format monthly from a third party. You need to cleanse this data, but every third month the schema of the files changes. Requirements: Executing on a schedule, enabling non-developer analysts to modify transformations, providing a graphical tool. What should you do?",
    "options": [
      "A. Use Dataprep by Trifacta to build and maintain the transformation recipes, and execute them on a scheduled basis",
      "B. Load each month's CSV data into BigQuery, and write a SQL query to transform the data to a standard schema.",
      "C. Help the analysts write a Dataflow pipeline in Python to perform the transformation.",
      "D. Use Apache Spark on Dataproc to infer the schema of the CSV file before creating a Dataframe."
    ],
    "correct": 0,
    "explanation": "Use Dataprep by Trifacta to build and maintain the transformation recipes, and execut This enables efficient transformation at scale with automatic resource management.",
    "discussion": [
      {
        "user": "madhu1171",
        "text": "A should be the answer"
      },
      {
        "user": "atnafu2020",
        "text": "A\nyou can use dataprep for continuously changing target schema\nIn general, a target consists of the set of information required to define the expected data in a dataset. Often referred to as a \"schema,\" this target schema information can include:\nNames of columns\nOrder of columns\nColumn data types\nData type format\nExample rows of data\nA dataset associated with a target is expected to conform to the requirements of the schema. Where there are differences between target schema and dataset schem..."
      },
      {
        "user": "JG123",
        "text": "Why there are so many wrong answers? Examtopics.com are you enjoying paid subscription by giving random answers from people?\nAns: A"
      },
      {
        "user": "sumanshu",
        "text": "Vote for 'A', because of requirement - Enabling non-developer analysts to modify transformations"
      },
      {
        "user": "Archy",
        "text": "spark is not graphical tool."
      },
      {
        "user": "vaga1",
        "text": "Providing a graphical tool for designing transformations is enough for A"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 53,
    "topic": "Dataproc",
    "difficulty": 2,
    "question": "You want to migrate an on-premises Hadoop system to Cloud Dataproc. Hive is the primary tool, and the data format is ORC. All ORC files have been copied to a Cloud Storage bucket. You need to replicate some data to the cluster's local HDFS to maximize performance. What are two ways to start using Hive in Cloud Dataproc? (Choose two.)",
    "options": [
      "A. Run gsutil to transfer all ORC files from Cloud Storage to HDFS. Mount the Hive tables locally.",
      "B. Run gsutil to transfer all ORC files from Cloud Storage to any node of the Dataproc cluster. Mount the Hive tables locally.",
      "C. Run gsutil to transfer all ORC files from Cloud Storage to the master node. Then run the Hadoop utility to copy them to HDFS. Mount the Hive tables from HDFS.",
      "D. Leverage Cloud Storage connector for Hadoop to mount the ORC files as external Hive tables. Replicate external Hive tables to the native ones.",
      "E. Load the ORC files into BigQuery. Leverage BigQuery connector for Hadoop to mount the BigQuery tables as external Hive tables."
    ],
    "correct": [
      2,
      3
    ],
    "explanation": "Run gsutil to transfer all ORC files from Cloud Storage to the master node This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "Sid19",
        "text": "Answer is C and D 100%.\nI know it says to transfer all the files but with the options provided c is the best choice.\nExplaination\nA and B cannot be true as gsutil can copy data to master node and the to hdfs from master node.\nC -> works\nD->works Recommended by google\nE-> Will work but as the question says maximize performance this is not a case. As bigquery hadoop connecter stores all the BQ data to GCS as temp and then processes it to HDFS. As data is already in GCS we donot need to load it ..."
      },
      {
        "user": "haroldbenites",
        "text": "D , E is correct"
      },
      {
        "user": "BigQuery",
        "text": "Guys Listen. Here's how you solve this problem. In Question \"You need to replicate some data to the cluster's local Hadoop Distributed File System\" So, Reading all options in process of elimination. A,B,C are out Since they transfer all ORC Files from GCS to DataProc. So D is best ans because its possible and data is in GCS. 2nd best is E. So, Ans is D and E. Upvote if you agree."
      },
      {
        "user": "LORETOGOMEZ",
        "text": "I vote for A, D"
      },
      {
        "user": "apnu",
        "text": "D and E are externam table which will have performance issue and which wil not fullfill the reqt, so D and E are eliminated. in ABC , A is eliminated because we cannot copy data directly from GCS bucket to HDFS through utility. so A is also eliminated. so only B and C are correct answer."
      },
      {
        "user": "sh2020",
        "text": "C, D is correct"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 54,
    "topic": "Orchestration",
    "difficulty": 2,
    "question": "You are implementing several batch jobs that must be executed on a schedule. These jobs have many interdependent steps that must be executed in a specific order. Portions involve executing shell scripts, running Hadoop jobs, and running queries in BigQuery. The jobs are expected to run for many minutes up to several hours. If the steps fail, they must be retried a fixed number of times. Which service should you use?",
    "options": [
      "A. Cloud Scheduler",
      "B. Cloud Dataflow",
      "C. Cloud Functions",
      "D. Cloud Composer"
    ],
    "correct": 3,
    "explanation": "Cloud Composer This provides reliable scheduling with error handling and retries.",
    "discussion": [
      {
        "user": "mario_ordinola",
        "text": "if someone are not sure that D is the answer, I suggest to don't take the exam"
      },
      {
        "user": "madhu1171",
        "text": "D should be the answer"
      },
      {
        "user": "lgdantas",
        "text": "D!\n\"Cloud Scheduler is a fully managed enterprise-grade cron job scheduler\"\nhttps://cloud.google.com/scheduler"
      },
      {
        "user": "Alasmindas",
        "text": "The correct answer is Option A : Cloud Scheduler .\nAlthough at first instance, I thought it should be Cloud Composer but then looking at the question and reading it few times - it concluded me to go for Option A.\nCloud Scheduler has built in retry handling so you can set a fixed number of times and doesn't have time limits for requests. The functionality is much simpler than Cloud Composer. Cloud Composer is managed Apache Airflow that \"helps you create, schedule, monitor and manage workflows..."
      },
      {
        "user": "zellck",
        "text": "D is the answer.\nhttps://cloud.google.com/composer/docs/concepts/overview\nCloud Composer is a fully managed workflow orchestration service, enabling you to create, schedule, monitor, and manage workflows that span across clouds and on-premises data centers."
      },
      {
        "user": "daghayeghi",
        "text": "D:\nthe main point is that Cloud Composer should be used when there is inter-dependencies between the job, e.g. we need the output of a job to start another whenever the first finished, and use dependencies coming from first job."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 55,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You work for a shipping company that wants to add cameras to delivery lines to detect and track any visual damage to packages in transit. You need to create a way to automate the detection of damaged packages and flag them for human review in real time while the packages are in transit. Which solution should you choose?",
    "options": [
      "A. Use BigQuery machine learning to train the model at scale, so you can analyze the packages in batches.",
      "B. Train an AutoML model on your corpus of images, and build an API around that model to integrate with the package tracking applications.",
      "C. Use the Cloud Vision API to detect for damage, and raise an alert through Cloud Functions.",
      "D. Use TensorFlow to create a model trained on your corpus of images. Create a Python notebook in Cloud Datalab."
    ],
    "correct": 1,
    "explanation": "Train an AutoML model on your corpus of images, and build an API around that model to This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "AutoML is used to train model and do damage detection\nAuto Vision is used is a pre trained model used to detect objects in images"
      },
      {
        "user": "dambilwa",
        "text": "Option [B] - looks to be correct"
      },
      {
        "user": "jvg637",
        "text": "I think B. C can't be because vision api cannot detect damage."
      },
      {
        "user": "nehaxlpb",
        "text": "Answer is B.\nCloud Vision API detects lot of things for not damages. The description of Damages can be different for each business . So we need to train the model with test and training data to give our definition of Damages, so we need ML capabilities so answer is B, AutoML."
      },
      {
        "user": "Archy",
        "text": "AutoML is the way to go 'B'"
      },
      {
        "user": "arien_chen",
        "text": "Keywords: realtime, camera streaming\nhttps://cloud.google.com/vision#:~:text=where%20you%20are-,Vertex%20AI%20Vision,-Vertex%C2%A0AI%20Vision\nOption B AutoML would be too complex and not time efficient.\nUsing Vision AI(Vertex AI Vision) first + AutoML\nOption D is better than B (just AutoML)."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 56,
    "topic": "Security/IAM",
    "difficulty": 2,
    "question": "You are migrating your data warehouse to BigQuery. Multiple users from your organization will be using the data. They should only see certain tables based on their team membership. How should you set user permissions?",
    "options": [
      "A. Assign the users/groups data viewer access at the table level for each table",
      "B. Create SQL views for each team in the same dataset, and assign the users/groups data viewer access to the SQL views",
      "C. Create authorized views for each team in the same dataset, and assign the users/groups data viewer access to the authorized views",
      "D. Create authorized views for each team in datasets created for each team. Assign the authorized views data viewer access to the dataset in which the data resides. Assign the users/groups data viewer access to the datasets in which the authorized views reside."
    ],
    "correct": 3,
    "explanation": "Create authorized views for each team in datasets created for each team This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "someshsehgal",
        "text": "Correct A: A . Now it is feasible to provide table level access to user by allowing user to query single table and no other table will be visible to user in same dataset."
      },
      {
        "user": "madhu1171",
        "text": "D should be the answer"
      },
      {
        "user": "hdmi_switch",
        "text": "Back then D, now A. Question is, if the exam is already up to date."
      },
      {
        "user": "jits1984",
        "text": "Should still be D.\nQuestion states - \"They should only see certain tables based on their team membership\"\nOption A states - Assign the users/groups data viewer access at the table level for each table\nWith A, everyone will see every table. Hence D."
      },
      {
        "user": "rickywck",
        "text": "Yes, should be D:\nhttps://cloud.google.com/bigquery/docs/share-access-views"
      },
      {
        "user": "squishy_fishy",
        "text": "It is possible for about a year now. https://cloud.google.com/bigquery/docs/table-access-controls-intro#example_use_case"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 57,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You need to store and analyze social media postings in BigQuery at a rate of 10,000 messages per minute in near real-time. Initially, design the application to use streaming inserts. Your application also performs data aggregations right after the streaming inserts. You discover that the queries do not exhibit strong consistency. How can you adjust your application design?",
    "options": [
      "A. Re-write the application to load accumulated data every 2 minutes.",
      "B. Convert the streaming insert code to batch load for individual messages.",
      "C. Load the original message to Google Cloud SQL, and export the table every hour to BigQuery via streaming inserts.",
      "D. Estimate the average latency for data availability after streaming inserts, and always run queries after waiting twice as long."
    ],
    "correct": 0,
    "explanation": "Waiting based on average latency is unreliable. Batch loading every 2 minutes (720/day) guarantees strong consistency and stays within BigQuery's 1,500 load jobs/table/day limit.",
    "discussion": [
      {
        "user": "noob_master",
        "text": "Answer: D. The only that describe a way to resolve the problem, with buffering the data.\n(the question is possible old, the best approach would be Pub/Sub + Dataflow Streaming + Bigquery for streaming data instead near-real time)"
      },
      {
        "user": "MaxNRG",
        "text": "B. Streams data into BigQuery one record at a time without needing to run a load job: https://cloud.google.com/bigquery/docs/reference/rest/v2/tabledata/insertAll\nInstead of using a job to load data into BigQuery, you can choose to stream your data into BigQuery one record at a time by using the tabledata.insertAll method. This approach enables querying data without the delay of running a load job:\nhttps://cloud.google.com/bigquery/streaming-data-into-bigquery\nThe BigQuery Storage Write API i..."
      },
      {
        "user": "[Removed]",
        "text": "if you convert the individual messages to batch load at 10k per min. you'll get in 10 min. to the limit of load jobs per day (100k).\nSource: https://cloud.google.com/bigquery/quotas#load_jobs"
      },
      {
        "user": "fire558787",
        "text": "\"D\" seems to use the typical approximate terminology of a wrong answer. \"estimate the time\" (how do you do that? do you do that over different times of the day?) and \"wait twice as long\" (who tells you that there are not a lot of cases when lag is twice as long?). Instead, \"A\" seems good. You don't need to show the exact results, but an approximation thereof, but you still want consistency. So an aggregation of the data every 2 minutes is a viable thing."
      },
      {
        "user": "musumusu",
        "text": "Answer: D\nWhat to learn or look for\n1. In-Flight data = (Real Time data, i.e still in streaming pipeline and not landed in BigQuery)\n2. Dataflow (assume in best case) streaming pipeline is running to send data to Bigquery.\nWhy not option B: change streaming to batch upload is not business requirement, we have to stuck to streaming and real time analysis.\nOption D: make bigquery run after waiting for sometime (twice here), How will you do it?\n- there is not setting in BQ to do it, right!. So, ..."
      },
      {
        "user": "ckanaar",
        "text": "I'd argue that this question became outdated with the introduction of the BigQuery Storage Write API: https://cloud.google.com/bigquery/docs/write-api"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 58,
    "topic": "Dataproc",
    "difficulty": 2,
    "question": "You want to build a managed Hadoop system as your data lake. The data transformation process is composed of a series of Hadoop jobs. You decided to use the Cloud Storage connector. However, you noticed that one Hadoop job runs very slowly with Cloud Dataproc compared with the on-premises bare-metal Hadoop environment. Analysis shows that this particular Hadoop job is disk I/O intensive. What should you do?",
    "options": [
      "A. Allocate sufficient memory to the Hadoop cluster, so that the intermediary data can be held in memory",
      "B. Allocate sufficient persistent disk space to the Hadoop cluster, and store the intermediate data on native HDFS",
      "C. Allocate more CPU cores of the virtual machine instances so that the networking bandwidth can scale up",
      "D. Allocate additional network interface card (NIC), and configure link aggregation"
    ],
    "correct": 1,
    "explanation": "Allocate sufficient persistent disk space to the Hadoop cluster, and store the interm This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "Rajokkiyam",
        "text": "Answer B\nIts google recommended approach to use LocalDisk/HDFS to store Intermediate result and use Cloud Storage for initial and final results."
      },
      {
        "user": "[Removed]",
        "text": "Could be B - As the job is I/O intensive"
      },
      {
        "user": "Alasmindas",
        "text": "Correct Answer is Option B - Adding persistent disk space, reasons:-\n- The question mentions that the particular job is \"disk I/O intensive - so the word \"disk\" is explicitly mentioned.\n- Option B also mentions about local HDFS storage, which is ideally a good option of general I/O intensive work.\n-"
      },
      {
        "user": "zellck",
        "text": "B is the answer.\nhttps://cloud.google.com/architecture/hadoop/hadoop-gcp-migration-jobs#choosing_primary_disk_options\nIf your job is disk-intensive and is executing slowly on individual nodes, you can add more primary disk space. For particularly disk-intensive jobs, especially those with many individual read and write operations, you might be able to improve operation by adding local SSDs. Add enough SSDs to contain all of the space you need for local execution. Your local execution director..."
      },
      {
        "user": "Archy",
        "text": "B, this job is high on I/O, local HDFS on dish is best option"
      },
      {
        "user": "PRC",
        "text": "B is correct answer. For I/O intensive jobs, increasing the disk size resolves the issue. In case the issue is with compute capacity then increasing CPUs may help."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 59,
    "topic": "Dataproc/ML",
    "difficulty": 2,
    "question": "You work for an advertising company and have developed a Spark ML model to predict click-through rates. You've been developing at your on-premises data center, and now migrating to Google Cloud. You need to migrate existing training pipelines to Google Cloud quickly. The data will be in BigQuery. What should you do?",
    "options": [
      "A. Use Vertex AI for training existing Spark ML models",
      "B. Rewrite your models on TensorFlow, and start using Vertex AI",
      "C. Use Dataproc for training existing Spark ML models, but start reading data directly from BigQuery",
      "D. Spin up a Spark cluster on Compute Engine, and train Spark ML models on the data exported from BigQuery"
    ],
    "correct": 2,
    "explanation": "Use Dataproc for training existing Spark ML models, but start reading data directly f This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "vamgcp",
        "text": "Option C : It is the most rapid way to migrate your existing training pipelines to Google Cloud.\nIt allows you to continue using your existing Spark ML models.\nIt allows you to take advantage of the scalability and performance of Dataproc.\nIt allows you to read data directly from BigQuery, which is a more efficient way to process large datasets"
      },
      {
        "user": "vaga1",
        "text": "the question is: is it faster to move a SparkML job to a Vertex AI or to Dataproc? I am personally not sure, I would go for Dataproc as notebooks are not mentioned, but reading the Google article:\nhttps://cloud.google.com/blog/topics/developers-practitioners/announcing-serverless-spark-components-vertex-ai-pipelines/\n\"Dataproc Serverless components for Vertex AI Pipelines that further simplify MLOps for Spark, Spark SQL, PySpark and Spark jobs.\""
      },
      {
        "user": "MaxNRG",
        "text": "Use Cloud Dataproc, BigQuery, and Apache Spark ML for Machine Learning\nhttps://cloud.google.com/dataproc/docs/tutorials/bigquery-sparkml\nUsing Apache Spark with TensorFlow on Google Cloud Platform\nhttps://cloud.google.com/blog/products/gcp/using-apache-spark-with-tensorflow-on-google-cloud-platform"
      },
      {
        "user": "ckanaar",
        "text": "The updated answer seems A based on the following article:\nhttps://cloud.google.com/blog/topics/developers-practitioners/announcing-serverless-spark-components-vertex-ai-pipelines/"
      },
      {
        "user": "KC_go_reply",
        "text": "It is obviously C) Dataproc, since we don't want to rewrite the training from scratch, highly prefer Dataproc for anything Hadoop/Spark ecosystem, and Vertex AI doesn't support *training* with SparkML (but deploying existing models)."
      },
      {
        "user": "Prudvi3266",
        "text": "The new answer is Vertix AI which has the feature run spark ML workloads."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 60,
    "topic": "BigQuery/ML",
    "difficulty": 2,
    "question": "You work for a global shipping company. You want to train a model on 40 TB of data to predict which ships in each geographic region are likely to cause delivery delays. Telemetry data including location in GeoJSON format will be pulled from each ship. You want to use a storage solution that has native functionality for prediction and geospatial processing. Which storage solution should you use?",
    "options": [
      "A. BigQuery",
      "B. Cloud Bigtable",
      "C. Cloud Datastore",
      "D. Cloud SQL for PostgreSQL"
    ],
    "correct": 0,
    "explanation": "BigQuery This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "musumusu",
        "text": "answer A: You are just looking for a storage solution not a workflow"
      },
      {
        "user": "barnac1es",
        "text": "Here's why BigQuery is a good choice:\nScalable Data Storage: BigQuery is a fully managed, highly scalable data warehouse that can handle large volumes of data, including your 40 TB dataset. It allows you to store and manage your data efficiently.\nSQL for Predictive Analytics: BigQuery supports standard SQL and has built-in machine learning capabilities through BigQuery ML. You can easily build predictive models using SQL queries, which aligns with your goal of predicting ship delays.\nGeospati..."
      },
      {
        "user": "Chihhanyu",
        "text": "GeoJson + Native functionality for prediction -> BigQuery"
      },
      {
        "user": "PM17",
        "text": "This is more of a question that an answer but: How much data can Bigquery handle?\n40TB seems to be a lot and bigtable can handle that, but of course Bigquery is better when it comes to ML and GIS."
      },
      {
        "user": "FARR",
        "text": "A\nhttps://cloud.google.com/bigquery/docs/gis-intro"
      },
      {
        "user": "zellck",
        "text": "A is the answer.\nhttps://cloud.google.com/bigquery/docs/geospatial-intro\nIn a data warehouse like BigQuery, location information is very common. Many critical business decisions revolve around location data. For example, you may record the latitude and longitude of your delivery vehicles or packages over time. You may also record customer transactions and join the data to another table with store location data.\nYou can use this type of location data to determine when a package is likely to ar..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 61,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You operate an IoT pipeline built around Apache Kafka that normally receives around 5000 messages per second. You want to create an alert as soon as the moving average over 1 hour drops below 4000 messages per second. What should you do?",
    "options": [
      "A. Consume the stream in Dataflow using Kafka IO. Set a sliding time window of 1 hour every 5 minutes. Compute the average when the window closes, and send an alert if less than 4000.",
      "B. Consume the stream in Dataflow using Kafka IO. Set a fixed time window of 1 hour. Compute the average when the window closes.",
      "C. Use Kafka Connect to link to Pub/Sub. Use a Dataflow template to write messages to Bigtable. Use Cloud Scheduler to count rows hourly.",
      "D. Use Kafka Connect to link to Pub/Sub. Use a Dataflow template to write messages to BigQuery. Use Cloud Scheduler to run a script every five minutes."
    ],
    "correct": 0,
    "explanation": "Consume the stream in Dataflow using Kafka IO This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "Alasmindas",
        "text": "Option A is the correct answer. Reasons:-\na) Kafka IO and Dataflow is a valid option for interconnect (needless where Kafka is located - On Prem/Google Cloud/Other cloud)\nb) Sliding Window will help to calculate average.\nOption C and D are overkill and complex, considering the scenario in the question,\nhttps://cloud.google.com/solutions/processing-messages-from-kafka-hosted-outside-gcp"
      },
      {
        "user": "Alasmindas",
        "text": "Option A is the correct answer. Reasons:-\na) Kafka IO and Dataflow is a valid option for interconnect (needless where Kafka is located - On Prem/Google Cloud/Other cloud)\nb) Sliding Window will help to calculate average.\nOption C and D are overkill and complex, considering the scenario in the question,"
      },
      {
        "user": "mrkuul1",
        "text": "Why not C? It uses the Google cloud platform and that is what the question states i believe?"
      },
      {
        "user": "zellck",
        "text": "A is the answer.\nhttps://cloud.google.com/dataflow/docs/concepts/streaming-pipelines#windows\nWindowing functions divide unbounded collections into logical components, or windows. Windowing functions group unbounded collections by the timestamps of the individual elements. Each window contains a finite number of elements.\nYou set the following windows with the Apache Beam SDK or Dataflow SQL streaming extensions:\n- Hopping windows (called sliding windows in Apache Beam)\nA hopping window repres..."
      },
      {
        "user": "kino2020",
        "text": "\"You operate an IoT pipeline built around Apache Kafka\"\nThe statement in question states. Therefore, building with kafka is the requirement definition for this problem.\nJust in case you are wondering, a case along with this problem is listed on google by the architects.\n\"Using Cloud Dataflow to Process Outside-Hosted Messages from Kafka\"\nhttps://cloud.google.com/solutions/processing-messages-from-kafka-hosted-outside-gcp\nTherefore, A is the correct answer."
      },
      {
        "user": "ashuchip",
        "text": "yes A is correct , because sliding window can only help here."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 62,
    "topic": "Cloud SQL",
    "difficulty": 2,
    "question": "You plan to deploy Cloud SQL using MySQL. You need to ensure high availability in the event of a zone failure. What should you do?",
    "options": [
      "A. Create a Cloud SQL instance in one zone, and create a failover replica in another zone within the same region.",
      "B. Create a Cloud SQL instance in one zone, and create a read replica in another zone within the same region.",
      "C. Create a Cloud SQL instance in one zone, and configure an external read replica in a zone in a different region.",
      "D. Create a Cloud SQL instance in a region, and configure automatic backup to a Cloud Storage bucket in the same region."
    ],
    "correct": 0,
    "explanation": "Create a Cloud SQL instance in one zone, and create a failover replica in another zon This managed relational database with automated backups, replication, and patch management; supports MySQL, PostgreSQL, SQL Server.",
    "discussion": [
      {
        "user": "madhu1171",
        "text": "A should be correct answer"
      },
      {
        "user": "hdmi_switch",
        "text": "Seems to depend on the date the question was published.\nA) is mentioned in legacy config \"The legacy configuration for high availability used a failover replica instance.\" https://cloud.google.com/sql/docs/mysql/configure-legacy-ha\nB) Read replica is mentioned here https://cloud.google.com/sql/docs/mysql/high-availability scroll down to the diagrams\nC) external read replica seems to be wrong, never heard of it\nD) Aligns which Google steps, but automatic backup is not mentioned for HA https://..."
      },
      {
        "user": "MaxNRG",
        "text": "A (failover replicas) as this is an old question:\nIn a legacy HA configuration, a Cloud SQL for MySQL instance uses a failover replica to add high availability to the instance. This functionality isn't available in Google Cloud console.\nThe new configuration doesn't use failover replicas. Instead, it uses Google's regional persistent disks, which synchronously replicate data at the block-level between two zones in a region.\nhttps://cloud.google.com/sql/docs/mysql/configure-legacy-ha"
      },
      {
        "user": "wjtb",
        "text": "Failover replica's are a legacy feature. This question is outdated: https://cloud.google.com/sql/docs/mysql/configure-ha"
      },
      {
        "user": "StelSen",
        "text": "ANSWER-D. I Logged in GCP Console and Attempted to create Cloud SQL and all I could see is Single Zone and High Availability (Regional). There is no way I can specify failover replica."
      },
      {
        "user": "tycho",
        "text": "yes A is correct, whe creating ne cloud sql instance there is an option\n\"Multiple zones (Highly available)\nAutomatic failover to another zone within your selected region. Recommended for production instances. Increases cost.\""
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 63,
    "topic": "Data Ingestion",
    "difficulty": 2,
    "question": "Your company is selecting a system to centralize data ingestion and delivery. Key requirements: ability to seek to a particular offset, support publish/subscribe semantics on hundreds of topics, retain per-key ordering. Which system should you choose?",
    "options": [
      "A. Apache Kafka",
      "B. Cloud Storage",
      "C. Dataflow",
      "D. Firebase Cloud Messaging"
    ],
    "correct": 0,
    "explanation": "Apache Kafka This handles streaming data with proper ordering and delivery semantics.",
    "discussion": [
      {
        "user": "YorelNation",
        "text": "A I think it's the only technology that met the requirements"
      },
      {
        "user": "dn_mohammed_data",
        "text": "vote for A: topics, offsets --> apache kafka"
      },
      {
        "user": "barnac1es",
        "text": "Ability to Seek to a Particular Offset: Kafka allows consumers to seek to a specific offset in a topic, enabling you to read data from a specific point, including back to the start of all data ever captured. This is a fundamental capability of Kafka.\nSupport for Publish/Subscribe Semantics: Kafka supports publish/subscribe semantics through topics. You can have hundreds of topics in Kafka, and consumers can subscribe to these topics to receive messages in a publish/subscribe fashion.\nRetain P..."
      },
      {
        "user": "musumusu",
        "text": "Answer A: Apache Kafka\nKey words: Ingestion and Delivery together ( it is combination of pub/sub for ingestion, and delivery = dataflow+any database in gcp)\nOffset of a topic = Partition of a topic and reprocess specific part of topic, its not possible in pub/sub as it is designed for as come and go for 1 topic.\nPer key ordering. means message with same key can be process or assigned to a user in kafka."
      },
      {
        "user": "mothkuri",
        "text": "Only Kafka can support publish/subscribe semantics on hundreds of topics"
      },
      {
        "user": "aquevedos91",
        "text": "deberia ser la C, debido a que siempre es mejor escoger los servicios de google"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 64,
    "topic": "Dataproc",
    "difficulty": 2,
    "question": "You are planning to migrate your current on-premises Apache Hadoop deployment to the cloud. You need to ensure fault-tolerance and cost-effectiveness for long-running batch jobs. You want to use a managed service. What should you do?",
    "options": [
      "A. Deploy a Dataproc cluster. Use a standard persistent disk and 50% preemptible workers. Store data in Cloud Storage, change references from hdfs:// to gs://",
      "B. Deploy a Dataproc cluster. Use an SSD persistent disk and 50% preemptible workers. Store data in Cloud Storage.",
      "C. Install Hadoop and Spark on a 10-node Compute Engine instance group with standard instances.",
      "D. Install Hadoop and Spark on a 10-node Compute Engine instance group with preemptible instances. Store data in HDFS."
    ],
    "correct": 0,
    "explanation": "Deploy a Dataproc cluster This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "Confused between A and B. For r/w intensive jobs need to use SSDs. But questions doesnt state anything about the nature of the jobs. So better to start with a default option.\nChoose A"
      },
      {
        "user": "Rajuuu",
        "text": "Answer is A…Cloud Dataproc for Managed Cloud native application and HDD for cost-effective solution."
      },
      {
        "user": "Raangs",
        "text": "https://cloud.google.com/solutions/migration/hadoop/migrating-apache-spark-jobs-to-cloud-dataproc\nAs per this, SSD is only recommended if it is high IO intensive. In this question no where mentioned its high IO intensive, and asks for cost effective (as much as possible), so no need to use SSD.\nI will go with A."
      },
      {
        "user": "StelSen",
        "text": "Look at this link. https://cloud.google.com/bigtable/docs/choosing-ssd-hdd\nAt the First look I chose Option-B as they mentioned SSD is cost-effective on most cases. But after reading the whole page, they also mentioned that for batch workloads, HDD is suggested as long as not heavy read. So I changed my mind to Option-A (I assumed this is not ready heavy process?)."
      },
      {
        "user": "Alasmindas",
        "text": "Option B - SSD disks, reasons:-\nThe question asks \"fault-tolerant and cost-effective as possible for long-running batch job\".\n3 Key words are - fault tolerant / cost effective / long running batch jobs..\nThe cost efficiency part mentioned in the question could be addressed by 50% preemptible disks and storing the data in cloud storage than HDFS.\nFor long running batch jobs and as standard approach for Dataproc - we should always go with SSD disk types as per google recommendations."
      },
      {
        "user": "baubaumiaomiao",
        "text": "\"You need to ensure that the deployment is as cost-effective as possible\"\nhence, no SSD unless stated otherwise"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 65,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "Your team is working on a binary classification problem. You have trained an SVM classifier with default parameters, and received an AUC of 0.87 on the validation set. You want to increase the AUC. What should you do?",
    "options": [
      "A. Perform hyperparameter tuning",
      "B. Train a classifier with deep neural networks, because neural networks would always beat SVMs",
      "C. Deploy the model and measure the real-world AUC",
      "D. Scale predictions you get out of the model (tune a scaling factor as a hyperparameter)"
    ],
    "correct": 0,
    "explanation": "Perform hyperparameter tuning This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "aadaisme",
        "text": "Seems to be A. Preprocessing/scaling should be done with input features, instead of predictions (output)"
      },
      {
        "user": "FARR",
        "text": "A\nDeep LEarning is not always the best solution\nD talks about fudgin the output which is wrong"
      },
      {
        "user": "saurabh1805",
        "text": "A for me, read below link for more details.\nhttps://towardsdatascience.com/understanding-hyperparameters-and-its-optimisation-techniques-f0debba07568"
      },
      {
        "user": "MaxNRG",
        "text": "https://www.quora.com/How-can-I-improve-Precision-Recall-AUC-under-Imbalanced-Classification"
      },
      {
        "user": "Spider7",
        "text": "0.89 it's already not bad but by performing tuning rather then using the model default parameters there's a way to increase the overall model performance --> A."
      },
      {
        "user": "hdmi_switch",
        "text": "Not C because real-world AUC value falls between 0.5 and 1.0 usually, this wouldn't help.\nA seems the most straigh forward."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 66,
    "topic": "Dataproc",
    "difficulty": 2,
    "question": "You need to deploy additional dependencies to all nodes of a Cloud Dataproc cluster at startup using an existing initialization action. Company security policies require that nodes do not have access to the Internet. What should you do?",
    "options": [
      "A. Deploy the Cloud SQL Proxy on the Cloud Dataproc master",
      "B. Use an SSH tunnel to give the Cloud Dataproc cluster access to the Internet",
      "C. Copy all dependencies to a Cloud Storage bucket within your VPC security perimeter",
      "D. Use Resource Manager to add the service account used by the Cloud Dataproc cluster to the Network User role"
    ],
    "correct": 2,
    "explanation": "Copy all dependencies to a Cloud Storage bucket within your VPC security perimeter This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "Correct: C\nIf you create a Dataproc cluster with internal IP addresses only, attempts to access the Internet in an initialization action will fail unless you have configured routes to direct the traffic through a NAT or a VPN gateway. Without access to the Internet, you can enable Private Google Access, and place job dependencies in Cloud Storage; cluster nodes can download the dependencies from Cloud Storage from internal IPs."
      },
      {
        "user": "rickywck",
        "text": "Should be C:\nhttps://cloud.google.com/dataproc/docs/concepts/configuring-clusters/init-actions"
      },
      {
        "user": "jvg637",
        "text": "I think the correct answer might be C instead, due to https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/network#create_a_cloud_dataproc_cluster_with_internal_ip_address_only"
      },
      {
        "user": "barnac1es",
        "text": "Security Compliance: This option aligns with your company's security policies, which prohibit public Internet access from Cloud Dataproc nodes. Placing the dependencies in a Cloud Storage bucket within your VPC security perimeter ensures that the data remains within your private network.\nVPC Security: By placing the dependencies within your VPC security perimeter, you maintain control over network access and can restrict access to the necessary nodes only.\nDataproc Initialization Action: You ..."
      },
      {
        "user": "Prabusankar",
        "text": "When creating a Dataproc cluster, you can specify initialization actions in executables or scripts that Dataproc will run on all nodes in your Dataproc cluster immediately after the cluster is set up. Initialization actions often set up job dependencies, such as installing Python packages, so that jobs can be submitted to the cluster without having to install dependencies when the jobs are run"
      },
      {
        "user": "musumusu",
        "text": "Answer C,\nIt needs practical experience to understand this question. You create cluster with some package/software i.e dependencies such as python packages that you store in .zip file, then you save a jar file to run the cluster as an application such as you need java while running spark session. and some config yaml file.\nThese dependencies you can save in bucket and can use to configure cluster from external window , sdk or api. without going into UI.\nThen you need to use VPC to access thes..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 67,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You need to choose a database for a new project: Fully managed, able to automatically scale up, transactionally consistent, able to scale up to 6 TB, able to be queried using SQL. Which database do you choose?",
    "options": [
      "A. Cloud SQL",
      "B. Cloud Bigtable",
      "C. Cloud Spanner",
      "D. Cloud Datastore"
    ],
    "correct": 0,
    "explanation": "Cloud SQL This optimizes data access patterns and minimizes egress costs.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "Correct: A\nIt asks for scaling up which can be done in cloud sql, horizontal scaling is not possible in cloud sql\nAutomatic storage increase\nIf you enable this setting, Cloud SQL checks your available storage every 30 seconds. If the available storage falls below a threshold size, Cloud SQL automatically adds additional storage capacity. If the available storage repeatedly falls below the threshold size, Cloud SQL continues to add storage until it reaches the maximum of 30 TB."
      },
      {
        "user": "dem2021",
        "text": "Have you really worked on GCP?"
      },
      {
        "user": "google_learner123",
        "text": "C - CloudSQL does not scale automatically."
      },
      {
        "user": "gcp_k",
        "text": "Answer could be : A\nBoth Cloud Spanner and Cloud SQL does not have auto scaling feature natively. You need to build automation around it based on metrics.\nBoth Cloud SQL and Cloud Spanner supports SQL.\nWith Cloud SQL, you can go up to 10 TB of storage which also satisfies the other requirement.\nConsistency - Of course, with Cloud SQL, you have single master and read replicas. So technically the data will be consistent across all instances so to speak.\nThe reason why I didn't choose Spanner is..."
      },
      {
        "user": "Gcpyspark",
        "text": "Google documentation says \"Cloud SQL is a fully-managed database service that helps you set up, maintain, manage, and administer your relational databases on Google Cloud Platform.\""
      },
      {
        "user": "droogie",
        "text": "The number is 6TB, so the answer should be A (according to your logic)"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 68,
    "topic": "Security",
    "difficulty": 3,
    "question": "Your startup has never implemented a formal security policy. Currently, everyone has access to BigQuery datasets. You have been asked to secure the data warehouse. You need to discover what everyone is doing. What should you do first?",
    "options": [
      "A. Use Google Stackdriver Audit Logs to review data access.",
      "B. Get the IAM policy of each table",
      "C. Use Stackdriver Monitoring to see the usage of BigQuery query slots.",
      "D. Use the Google Cloud Billing API to see what account the warehouse is being billed to."
    ],
    "correct": 0,
    "explanation": "Use Google Stackdriver Audit Logs to review data access This enforces least-privilege access control and reduces unauthorized data exposure.",
    "discussion": [
      {
        "user": "Radhika7983",
        "text": "Table access control is now possible in big query. However, before even checking table access control permission which is not set by the company as a formal security policy yet, we need to first understand by looking at the big query immutable audit logs as who is accessing what DAT sets and tables. Based on the information, access control policy at dataset and table level can be set.\nSo the correct answer is A"
      },
      {
        "user": "Cloud_Student",
        "text": "A - need to check first who is accessing which table"
      },
      {
        "user": "rtcpost",
        "text": "To begin securing your data warehouse in Google BigQuery and gain insights into what everyone is doing with the datasets, the first step you should take is:\nA. Use Google Stackdriver Audit Logs to review data access.\nReviewing the audit logs provides visibility into who is accessing your data, when they are doing so, and what actions they are taking within BigQuery. This is crucial for understanding current data usage and potential security risks.\nOption B (getting the IAM policy of each tabl..."
      },
      {
        "user": "ML_Novice",
        "text": "Are you sure\nin the documentation it says: BigQuery table ACL lets you set table-level permissions on resources like tables and views. Table-level permissions determine the users, groups, and service accounts that can access a table or view\nsource:\nhttps://cloud.google.com/bigquery/docs/table-access-controls-intro"
      },
      {
        "user": "naga",
        "text": "Sorry not C , correct answer A"
      },
      {
        "user": "arghya13",
        "text": "Correct answer is A"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 69,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You work for a mid-sized enterprise that needs to move its operational system transaction data from an on-premises database to GCP. The database is about 20 TB in size. Which database should you choose?",
    "options": [
      "A. Cloud SQL",
      "B. Cloud Bigtable",
      "C. Cloud Spanner",
      "D. Cloud Datastore"
    ],
    "correct": 2,
    "explanation": "Cloud Spanner This optimizes data access patterns and minimizes egress costs.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "A. Cloud SQL (30TB)"
      },
      {
        "user": "dagoat",
        "text": "65 TB now in Sept 2021"
      },
      {
        "user": "Rajokkiyam",
        "text": "Limit for Cloud SQL changed from 10 to 30 TB. So answer A"
      },
      {
        "user": "arnabbis4u",
        "text": "A - After Further Study. Cloud SQL can now Scale upto 30 TB."
      },
      {
        "user": "vindahake",
        "text": "Up to 30,720 GB, depending on the machine type. This looks like correct choice.\nhttps://cloud.google.com/sql/docs/quotas#fixed-limits"
      },
      {
        "user": "Rajuuu",
        "text": "A as limit is now 30 TB for Cloud SQL"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 70,
    "topic": "Bigtable",
    "difficulty": 2,
    "question": "You need to choose a database to store time series CPU and memory usage for millions of computers at one-second intervals. Analysts will perform real-time, ad hoc analytics. You want to avoid being charged for every query and ensure schema allows future growth. Which database and data model should you choose?",
    "options": [
      "A. Create a table in BigQuery, and append the new samples for CPU and memory to the table",
      "B. Create a wide table in BigQuery, create a column for the sample value at each second",
      "C. Create a narrow table in Bigtable with a row key that combines the computer identifier with the sample time at each second",
      "D. Create a wide table in Bigtable with a row key that combines the computer identifier with the sample time at each minute, and combine the values for each second as column data."
    ],
    "correct": 3,
    "explanation": "Create a wide table in Bigtable with a row key that combines the computer identifier This enables fast access patterns with proper row key design.",
    "discussion": [
      {
        "user": "psu",
        "text": "Answer C\nA tall and narrow table has a small number of events per row, which could be just one event, whereas a short and wide table has a large number of events per row. As explained in a moment, tall and narrow tables are best suited for time-series data.\nFor time series, you should generally use tall and narrow tables. This is for two reasons: Storing one event per row makes it easier to run queries against your data. Storing many events per row makes it more likely that the total row size..."
      },
      {
        "user": "madhu1171",
        "text": "C correct answer"
      },
      {
        "user": "Sumanth09",
        "text": "Should be A\nquestion did not talk about latency\nwithout query cost -- BigQuery Cache\nflexible schema - BigQuery (nested and repeated)"
      },
      {
        "user": "[Removed]",
        "text": "Correct: C\nNarrow and tall table for single event and good for timeseries data\nShort and Wide table for data over a month, multiple events"
      },
      {
        "user": "rickywck",
        "text": "should be C:\nhttps://cloud.google.com/bigtable/docs/schema-design-time-series\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      },
      {
        "user": "safiyu",
        "text": "C is the correct answer. If you consider wide table, then 60 columns for cpu usage and 60 columns for memory usage. in future, if you need to add a new kpi to the table, then the schema changes. you will have to add 60 more columns for the new feature. this is not so future proof.. so D is out of the picture."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 71,
    "topic": "Security",
    "difficulty": 3,
    "question": "You want to archive data in Cloud Storage. Because some data is very sensitive, you want to use the Trust No One (TNO) approach to encrypt your data to prevent cloud provider staff from decrypting your data. What should you do?",
    "options": [
      "A. Use gcloud kms keys create to create a symmetric key. Then use gcloud kms encrypt to encrypt each file with the key and unique AAD. Use gsutil cp to upload. Keep the AAD outside of Google Cloud.",
      "B. Use gcloud kms keys create to create a symmetric key. Then use gcloud kms encrypt to encrypt each file. Use gsutil cp to upload. Manually destroy the key and rotate once.",
      "C. Specify CSEK in the .boto configuration file. Use gsutil cp to upload. Save the CSEK in Cloud Memorystore.",
      "D. Specify CSEK in the .boto configuration file. Use gsutil cp to upload. Save the CSEK in a different project that only the security team can access."
    ],
    "correct": 0,
    "explanation": "Use gcloud kms keys create to create a symmetric key This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "dhs227",
        "text": "The correct answer must be D\nA and B can be eliminated immediately since kms generated keys are considered potentially accessible by CSP.\nC is incorrect because memory store is essentially a cache service.\nAdditional authenticated data (AAD) acts as a \"salt\", it is not a cipher."
      },
      {
        "user": "[Removed]",
        "text": "Answer: A\nDescription: AAD is used to decrypt the data so better to keep it outside GCP for safety"
      },
      {
        "user": "zellck",
        "text": "A is the answer.\nhttps://cloud.google.com/kms/docs/additional-authenticated-data\nAdditional authenticated data (AAD) is any string that you pass to Cloud Key Management Service as part of an encrypt or decrypt request. AAD is used as an integrity check and can help protect your data from a confused deputy attack. The AAD string must be no larger than 64 KiB.\nCloud KMS will not decrypt ciphertext unless the same AAD value is used for both encryption and decryption.\nAAD is bound to the encrypte..."
      },
      {
        "user": "VishalB",
        "text": "Ans is D as CSEK are more secured and stored at Customer end and\nOne example of using AAD is when your application serves as a wrap/unwrap proxy with a single key and an unbounded number of clients, with each client in distinct security boundaries. For example, the application could be a diary application that allows users to maintain a private diary. When a user needs to view a private diary entry, the application can use the unique user name as the AAD in the unwrap (decrypt) request to exp..."
      },
      {
        "user": "SteelWarrior",
        "text": "Should be A. As the question says Trust No One, this is the only approach where the additional authenticated data (AAD) is not available in GCP without which the files can not be decrypted."
      },
      {
        "user": "squishy_fishy",
        "text": "The answer is A. In answer D, the security team can access the encryption key stored in the project, the requirement is trust no one."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 72,
    "topic": "Monitoring",
    "difficulty": 3,
    "question": "You have data pipelines running on BigQuery, Dataflow, and Dataproc. You need to perform health checks and monitor their behavior, then notify the team if they fail. You need to work across multiple projects. What should you do?",
    "options": [
      "A. Export the information to Cloud Monitoring, and set up an Alerting policy",
      "B. Run a VM in Compute Engine with Airflow, and export the information to Cloud Monitoring",
      "C. Export the logs to BigQuery, and set up App Engine to read that information and send emails if failure found",
      "D. Develop an App Engine application to consume logs using GCP API calls, and send emails if failure found"
    ],
    "correct": 0,
    "explanation": "Export the information to Cloud Monitoring, and set up an Alerting policy This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "John_Pongthorn",
        "text": "A . Your preference is to use managed products or features of the platform"
      },
      {
        "user": "barnac1es",
        "text": "Cloud Monitoring (formerly known as Stackdriver) is a fully managed monitoring service provided by GCP, which can collect metrics, logs, and other telemetry data from various GCP services, including BigQuery, Dataflow, and Dataproc.\nAlerting Policies: Cloud Monitoring allows you to define alerting policies based on specific conditions or thresholds, such as pipeline failures, latency spikes, or other custom metrics. When these conditions are met, Cloud Monitoring can trigger notifications (e...."
      },
      {
        "user": "AWSandeep",
        "text": "A. Export the information to Cloud Monitoring, and set up an Alerting policy"
      },
      {
        "user": "sergiomujica",
        "text": "use managed products"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 73,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You are working on a linear regression model on BigQuery ML to predict a customer's likelihood of purchasing products. Your model uses a city name variable as a key predictive component. You want to prepare your data using the least amount of coding while maintaining the predictable variables. What should you do?",
    "options": [
      "A. Create a new view with BigQuery that does not include a column with city information.",
      "B. Use SQL in BigQuery to transform the state column using a one-hot encoding method, and make each city a column with binary values.",
      "C. Use TensorFlow to create a categorical variable with a vocabulary list.",
      "D. Use Cloud Data Fusion to assign each city to a region that is labeled as 1, 2, 3, 4, or 5."
    ],
    "correct": 1,
    "explanation": "Use SQL in BigQuery to transform the state column using a one-hot encoding method, an This SQL interface to ML models enabling predictions directly from BigQuery without data export; simplifies ML workflows.",
    "discussion": [
      {
        "user": "cajica",
        "text": "If we're rigorous, as we should because it's a professional exam, I think option B is incorrect because it's one-hot-encoding the \"state\" column, if the answer was \"city\" column, then I'd go for B. As this is not the case and I do not accept an spelling error like this in an official question, I would go for D."
      },
      {
        "user": "MaxNRG",
        "text": "One-hot encoding is a common technique used to handle categorical data in machine learning. This approach will transform the city name variable into a series of binary columns, one for each city. Each row will have a \"1\" in the column corresponding to the city it represents and \"0\" in all other city columns. This method is effective for linear regression models as it enables the model to use city data as a series of numeric, binary variables. BigQuery supports SQL operations that can easily i..."
      },
      {
        "user": "barnac1es",
        "text": "One-Hot Encoding: One-hot encoding is a common technique for handling categorical variables like city names in machine learning models. It transforms categorical data into a binary matrix, where each city becomes a separate column with binary values (0 or 1) indicating the presence or absence of that city.\nLeast Amount of Coding: One-hot encoding in BigQuery is straightforward and can be accomplished with SQL. You can use SQL expressions to pivot the city names into separate columns and assig..."
      },
      {
        "user": "blathul",
        "text": "One-hot encoding is a common technique used to represent categorical variables as binary columns. In this case, you can transform the city variable into multiple binary columns, with each column representing a specific city. This allows you to maintain the predictive city information while organizing the data in columns suitable for training and serving the linear regression model.\nBy using SQL in BigQuery, you can perform the necessary transformations to implement one-hot encoding."
      },
      {
        "user": "leandrors",
        "text": "Cloud Datafusion: least amount of coding"
      },
      {
        "user": "juliobs",
        "text": "D uses the least amount of coding... even if the model is not good.\nB encodes the \"state\", not the \"city\"."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 74,
    "topic": "Spanner",
    "difficulty": 2,
    "question": "You work for a large bank that operates in locations throughout North America. You need a data storage system for bank account transactions. You require ACID compliance and the ability to access data with SQL. Which solution is appropriate?",
    "options": [
      "A. Store transaction data in Cloud Spanner. Enable stale reads to reduce latency.",
      "B. Store transactions in Cloud Spanner. Use locking read-write transactions.",
      "C. Store transaction data in BigQuery. Disable the query cache to ensure consistency.",
      "D. Store transaction data in Cloud SQL. Use a federated query BigQuery for analysis."
    ],
    "correct": 1,
    "explanation": "Store transactions in Cloud Spanner. Use locking read-write transactions This meeting regulatory requirements like HIPAA, GDPR, PCI-DSS through security controls, audit logging, and data residency.",
    "discussion": [
      {
        "user": "Jay_Krish",
        "text": "I wonder if you understood the meaning of ACID. This is an inherent property of any relational DB. Cloud SQL is fully ACID complaint"
      },
      {
        "user": "devaid",
        "text": "I'd say B as the documentation primarily says ACID compliance for Spanner, not Cloud SQL.\nhttps://cloud.google.com/blog/topics/developers-practitioners/your-google-cloud-database-options-explained\nAlso, spanner supports read-write transactions for use cases, as handling bank transactions:\nhttps://cloud.google.com/spanner/docs/transactions#read-write_transactions"
      },
      {
        "user": "juliobs",
        "text": "\"locations throughout North America\" implies multi-region (northamerica-northeast1, us-central1, us-south1, us-west4, us-east5, etc.)\nCloud SQL can only do read replicas in other regions."
      },
      {
        "user": "jkhong",
        "text": "The question is hinting a requirement for global consistency, i.e. being available for NA region, which does not just include US but also Mexico, Argentina etc.\nLarge bank = priority over consistency over read-write"
      },
      {
        "user": "cajica",
        "text": "This is definitely a tricky question because both B and D are \"appropriate\" as the question suggests, of course we can make assumptions with the \"large bank\" sentence but there are other questions here where making assumptions is not accepted by the community so I wonder when can we make assumptions and when we can't. I think the real problem here is the ambiguous question. This is one of the few questions where the community accept that both (B and D) answers are appropriate but some comment..."
      },
      {
        "user": "desertlotus1211",
        "text": "Argentina is South America..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 75,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "A shipping company has live package-tracking data sent to Apache Kafka in real time, loaded into BigQuery. The table was originally created with ingest-date partitioning. Over time, query processing time has increased. You need to implement a change to improve query performance. What should you do?",
    "options": [
      "A. Implement clustering in BigQuery on the ingest date column.",
      "B. Implement clustering in BigQuery on the package-tracking ID column.",
      "C. Tier older data onto Cloud Storage files and create a BigQuery table using Cloud Storage as an external data source.",
      "D. Re-create the table using data partitioning on the package delivery date."
    ],
    "correct": 3,
    "explanation": "Re-create the table using data partitioning on the package delivery date This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "zellck",
        "text": "B is the answer.\nhttps://cloud.google.com/bigquery/docs/clustered-tables\nClustered tables in BigQuery are tables that have a user-defined column sort order using clustered columns. Clustered tables can improve query performance and reduce query costs.\nIn BigQuery, a clustered column is a user-defined table property that sorts storage blocks based on the values in the clustered columns. The storage blocks are adaptively sized based on the size of the table. A clustered table maintains the sort..."
      },
      {
        "user": "kcl10",
        "text": "D is the correct answer\nrequirements: analyze geospatial trends in the lifecycle of a package\ncuz the data of the lifecycle of the package would span across ingest-date-based partition table, it would degrade the performance.\nhence, re-partitoning by package delivery date, which is the package initially delivered, would improve the performance when querying such table."
      },
      {
        "user": "sdi_studiers",
        "text": "I vote D\nQueries to analyze the package lifecycle will cross partitions when using ingest date. Changing this to delivery date will allow a query to full a package's full lifecycle in a single partition."
      },
      {
        "user": "John_Pongthorn",
        "text": "D is not correct becsuse This Is problem Is The Real Time so ingested date is the same as delivery date."
      },
      {
        "user": "AlizCert",
        "text": "Though I almost fell for D, but the delivery date information is only available on the event(s) that happen after the delivery, but not on the ones before where it will be NULL I guess. The only other option that can make some sense is B, though high cardinality is not recommended for clustering."
      },
      {
        "user": "Aman47",
        "text": "Package Tracking mostly contains, geospatial prefixes, Like HK0011, US0022, etc, this can help in clustering."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 76,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "Your company currently runs a large on-premises cluster using Spark, Hive, and HDFS. They are eager to move to the cloud to reduce overhead and benefit from cost savings. They have only 2 months for their initial migration. How would you recommend they approach the migration strategy?",
    "options": [
      "A. Migrate the workloads to Dataproc plus HDFS; modernize later.",
      "B. Migrate the workloads to Dataproc plus Cloud Storage; modernize later.",
      "C. Migrate the Spark workload to Dataproc plus HDFS, and modernize the Hive workload for BigQuery.",
      "D. Modernize the Spark workload for Dataflow and the Hive workload for BigQuery."
    ],
    "correct": 1,
    "explanation": "Migrate the workloads to Dataproc plus Cloud Storage; modernize later This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "zellck",
        "text": "B is the answer.\nhttps://cloud.google.com/architecture/hadoop/migrating-apache-spark-jobs-to-cloud-dataproc#overview\nWhen you want to move your Apache Spark workloads from an on-premises environment to Google Cloud, we recommend using Dataproc to run Apache Spark/Apache Hadoop clusters. Dataproc is a fully managed, fully supported service offered by Google Cloud. It allows you to separate storage and compute, which helps you to manage your costs and be more flexible in scaling your workloads...."
      },
      {
        "user": "MaxNRG",
        "text": "Option A still requires managing HDFS.\nOption C and D require full modernization of workloads in 2 months which is likely infeasible.\nTherefore, migrating to Dataproc with Cloud Storage fast tracks the migration within 2 months while realizing immediate cost savings, enabling the flexibility to iteratively modernize and optimize the workloads over time."
      },
      {
        "user": "John_Pongthorn",
        "text": "B is most likely\n1. migrate job and infrastructure to dataproc on clound\n2. any data, move from hdfs on-premise to google cloud storage ( one of them is Hive)\nIf you want to modernize Hive to Bigquery , you are need to move it into GCS(preceding step) first and load it into bigquery\nthat is all.\nhttps://cloud.google.com/blog/products/data-analytics/apache-hive-to-bigquery\nhttps://cloud.google.com/architecture/hadoop/migrating-apache-spark-jobs-to-cloud-dataproc\nhttps://cloud.google.com/archit..."
      },
      {
        "user": "GyaneswarPanigrahi",
        "text": "D isn't feasible, within 2 months. Anyone who has worked in a Hadoop/ Big Data data warehousing or data lake project, knows how less time 2 months is, given the amount of data and associated complexities abound.\nIt should be B to begin with. And then gradually move towards D."
      },
      {
        "user": "MaxNRG",
        "text": "Based on the time constraint of 2 months and the goal to maximize cost savings, I would recommend option B - Migrate the workloads to Dataproc plus Cloud Storage; modernize later.\nThe key reasons are:\n• Dataproc provides a fast, native migration path from on-prem Spark and Hive to the cloud. This allows meeting the 2 month timeline.\n• Using Cloud Storage instead of HDFS avoids managing clusters for variable workloads and provides cost savings.\n• Further optimizations and modernization to serv..."
      },
      {
        "user": "TNT87",
        "text": "Ans B\n-cost saving\n-time factor\n-Spark -Data proc"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 77,
    "topic": "Security/DLP",
    "difficulty": 2,
    "question": "You work for a financial institution. As new customers register, their data is sent to Pub/Sub before being ingested into BigQuery. You decide to redact the Government issued Identification Number while allowing customer service reps to view the original values when necessary. What should you do?",
    "options": [
      "A. Use BigQuery's built-in AEAD encryption to encrypt the SSN column. Save the keys to a new table only viewable by permissioned users.",
      "B. Use BigQuery column-level security. Set the table permissions so only members of the Customer Service group can see the SSN column.",
      "C. Before loading into BigQuery, use Cloud DLP to replace input values with a cryptographic hash.",
      "D. Before loading into BigQuery, use Cloud DLP to replace input values with a cryptographic format-preserving encryption token."
    ],
    "correct": 3,
    "explanation": "Before loading into BigQuery, use Cloud DLP to replace input values with a cryptograp This Google's managed pub/sub messaging service enabling asynchronous communication with built-in ordering guarantees and at-least-once delivery semantics.",
    "discussion": [
      {
        "user": "AWSandeep",
        "text": "B. While C and D are intriguing, they don't specify how to enable customer service representatives to receive access to the encryption token."
      },
      {
        "user": "Lanro",
        "text": "I don't see why we should use DLP since we know exactly the column that should be locked or encrypted. On the other hand having a cryptographic representation of SSN helps to aggregate/analyse entries. So I will vote for D, but B is much more easy to implement. Garbage question indeed."
      },
      {
        "user": "mialll",
        "text": "https://cloud.google.com/dlp/docs/classification-redaction"
      },
      {
        "user": "zellck",
        "text": "D is the answer.\nhttps://cloud.google.com/dlp/docs/pseudonymization#supported-methods\nCloud DLP supports three pseudonymization techniques, all of which use cryptographic keys. Following are the available methods:\n- Format preserving encryption: An input value is replaced with a value that has been encrypted using the FPE-FFX encryption algorithm with a cryptographic key, and then prepended with a surrogate annotation, if specified. By design, both the character set and the length of the inpu..."
      },
      {
        "user": "clouditis",
        "text": "Its D, B does not make sense, they are asking to redact, not hide it away completely"
      },
      {
        "user": "MaxNRG",
        "text": "The best option is D - Before loading the data into BigQuery, use Cloud Data Loss Prevention (DLP) to replace input values with a cryptographic format-preserving encryption token.\nThe key reasons are:\nDLP allows redacting sensitive PII like SSNs before loading into BigQuery. This provides security by default for the raw SSN values.\nUsing format-preserving encryption keeps the column format intact while still encrypting, allowing business logic relying on SSN format to continue functioning.\nTh..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 78,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are migrating a table to BigQuery. The table stores purchase information including time of transaction, items, store ID, and city/state of store location. You frequently query for items sold over the past 30 days and look at purchasing trends by state, city, and store. How would you model this table for best performance?",
    "options": [
      "A. Partition by transaction time; cluster by state first, then city, then store ID.",
      "B. Partition by transaction time; cluster by store ID first, then city, then state.",
      "C. Top-level cluster by state first, then city, then store ID.",
      "D. Top-level cluster by store ID first, then city, then state."
    ],
    "correct": 0,
    "explanation": "Partition by transaction time; cluster by state first, then city, then store ID This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "AWSandeep",
        "text": "A. Partition by transaction time; cluster by state first, then city, then store ID."
      },
      {
        "user": "Atnafu",
        "text": "A\nPartitioning is obvious\nClustering is already mentioned in the question\npast 30 days and to look at purchasing trends by\nstate,\ncity, and\nindividual store"
      },
      {
        "user": "vaga1",
        "text": "Partitioning for time is obvious to improve performance and costs of querying only the last 30 days of the table.\nSo, the answer is A or B.\nhttps://cloud.google.com/bigquery/docs/querying-clustered-tables\n\"... To get the benefits of clustering, include all of the clustered columns or a subset of the columns in left-to-right sort order, starting with the first column.\"\nThis means that it is a better choice to sort the table rows by region-province-city (region-state-city in the US case).\nSo, t..."
      },
      {
        "user": "zellck",
        "text": "A is the answer.\nhttps://cloud.google.com/bigquery/docs/partitioned-tables\nThis page provides an overview of partitioned tables in BigQuery. A partitioned table is a special table that is divided into segments, called partitions, that make it easier to manage and query your data. By dividing a large table into smaller partitions, you can improve query performance, and you can control costs by reducing the number of bytes read by a query.\nYou can partition BigQuery tables by:\n- Time-unit colum..."
      },
      {
        "user": "MaxNRG",
        "text": "over the past 30 days -> partitioning\nby state, city, and individual store -> cluster order"
      },
      {
        "user": "ducc",
        "text": "A\nThe question mention that the query is 30 days recently"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 79,
    "topic": "Dataproc",
    "difficulty": 2,
    "question": "Your company is migrating their 30-node Apache Hadoop cluster to the cloud. They want to re-use Hadoop jobs and minimize cluster management. They also want to persist data beyond the life of the cluster. What should you do?",
    "options": [
      "A. Create a Google Cloud Dataflow job to process the data.",
      "B. Create a Google Cloud Dataproc cluster that uses persistent disks for HDFS.",
      "C. Create a Hadoop cluster on Google Compute Engine that uses persistent disks.",
      "D. Create a Cloud Dataproc cluster that uses the Google Cloud Storage connector.",
      "E. Create a Hadoop cluster on Google Compute Engine that uses Local SSD disks."
    ],
    "correct": 3,
    "explanation": "Create a Cloud Dataproc cluster that uses the Google Cloud Storage connector This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "MaxNRG",
        "text": "D is correct because it uses managed services, and also allows for the data to persist on GCS beyond the life of the cluster.\nA is not correct because the goal is to re-use their Hadoop jobs and MapReduce and/or Spark jobs cannot simply be moved to Dataflow.\nB is not correct because the goal is to persist the data beyond the life of the ephemeral clusters, and if HDFS is used as the primary attached storage mechanism, it will also disappear at the end of the cluster’s life.\nC is not correct b..."
      },
      {
        "user": "Radhika7983",
        "text": "The correct answer is D. Here is the explanation to why Data proc and why not Data flow.\nWhen a company wants to move their existing Hadoop jobs on premise to cloud, we can simply move the jobs in cloud data prod and replace hdfs with gs:// which is google storage. This way you are keeping compute and storage separately. Hence the correct answer is D. However, if the company wants to complete create a new jobs and don’t want to use the existing Hadoop jobs running on premise, the option is to..."
      },
      {
        "user": "balseron99",
        "text": "minimize the management of the cluster as much as possible. They also want to be able to persist data beyond the life of the cluster.\nIn Dataproc, best practice is as soon as the job is done, the cluster is shutdown/deleted which will remove the data also in the cluster. They want storage beyond the life of the cluster which B option won't provide."
      },
      {
        "user": "sumanshu",
        "text": "Because in Question it's mentioned - They also want to be able to persist data beyond the life of the cluster.\nIf we use 'Persistent disk of cluster' - So once cluster get stopped or deleted - data get lost"
      },
      {
        "user": "atnafu2020",
        "text": "so it should be D, Dataproc + GCS via GCS connector"
      },
      {
        "user": "GregDT",
        "text": "This quote is from the Official Google Cloud Certified Professional Data Engineer Study Guide by Dan Sullivan: \"Cloud Dataproc is a good choice for implementing ETL processes if you are migrating existing Hadoop or Spark programs. Cloud Dataflow is the recommended tool for developing new ETL processes.\" This would seem to support the use of Dataproc instead of Dataflow. Answer D does seem to be the best choice."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 80,
    "topic": "Pub/Sub",
    "difficulty": 2,
    "question": "You are updating the code for a subscriber to a Pub/Sub feed. You are concerned that upon deployment the subscriber may erroneously acknowledge messages, leading to message loss. Your subscriber is not set up to retain acknowledged messages. What should you do?",
    "options": [
      "A. Set up the Pub/Sub emulator on your local machine. Validate the behavior of your new subscriber logic before deploying.",
      "B. Create a Pub/Sub snapshot before deploying new subscriber code. Use a Seek operation to re-deliver messages that became available after the snapshot was created.",
      "C. Use Cloud Build for your deployment. If an error occurs, use a Seek operation to locate a timestamp logged by Cloud Build.",
      "D. Enable dead-lettering on the Pub/Sub topic to capture messages that aren't successfully acknowledged."
    ],
    "correct": 1,
    "explanation": "Create a Pub/Sub snapshot before deploying new subscriber code This Google's managed pub/sub messaging service enabling asynchronous communication with built-in ordering guarantees and at-least-once delivery semantics.",
    "discussion": [
      {
        "user": "AWSandeep",
        "text": "B. Create a Pub/Sub snapshot before deploying new subscriber code. Use a Seek operation to re-deliver messages that became available after the snapshot was created.\nAccording to the second reference in the list below, a concern with deploying new subscriber code is that the new executable may erroneously acknowledge messages, leading to message loss. Incorporating snapshots into your deployment process gives you a way to recover from bugs in new subscriber code.\nAnswer cannot be C because To ..."
      },
      {
        "user": "wjtb",
        "text": "Dead letter queue would help if the messages would not get acknowledged, however here they are talking about messages being erroneously acknowledged. Pub/Sub would interpret the message as being succesfully processed -> they would not end up in the dead-letter queue -> D is wrong"
      },
      {
        "user": "cetanx",
        "text": "Q: You are concerned that upon deployment the subscriber may erroneously acknowledge messages, leading to message loss.\n-> So the message is mistakenly acked and removed from topic/subscription. This means even if you have a snapshot of pre-deployment but you don't have a backup or copy of post-deployment messages.\nQ: Your subscriber is not set up to retain acknowledged messages.\n-> To seek to a time in the past and replay previously-acknowledged messages, \"you must first configure message re..."
      },
      {
        "user": "zellck",
        "text": "B is the answer.\nhttps://cloud.google.com/pubsub/docs/replay-overview\nThe Seek feature extends subscriber functionality by allowing you to alter the acknowledgement state of messages in bulk. For example, you can replay previously acknowledged messages or purge messages in bulk. In addition, you can copy the state of one subscription to another by using seek in combination with a Snapshot."
      },
      {
        "user": "MaxNRG",
        "text": "Taking a snapshot allows redelivering messages that were published while any faulty subscriber logic was running.\nThe seek timestamp would come after deployment so even erroneously acknowledged messages could be recovered.\nhttps://cloud.google.com/pubsub/docs/replay-overview#seek_use_cases\nBy creating a snapshot of the subscription before deploying new code, you can preserve the state of unacknowledged messages. If after deployment you find that the new subscriber code is erroneously acknowle..."
      },
      {
        "user": "vamgcp",
        "text": "pls correct me if I am wrong , option B Option B only allows you to re-deliver messages that were available before the snapshot was created. If an error occurs after the snapshot was created, you will not be able to re-deliver those messages."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 81,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You work for a large real estate firm preparing 6 TB of home sales data for ML. You plan to use BigQuery's TRANSFORM clause. You want to prevent skew at prediction time. What should you do?",
    "options": [
      "A. When creating your model, use BigQuery's TRANSFORM clause. At prediction time, use ML.EVALUATE without specifying transformations.",
      "B. When creating your model, use BigQuery's TRANSFORM clause. Before requesting predictions, use a saved query to transform raw input data.",
      "C. Use a BigQuery view to define preprocessing logic. When creating your model, use the view as training data. At prediction time, use ML.EVALUATE without transformations.",
      "D. Preprocess all data using Dataflow. At prediction time, use ML.EVALUATE without further transformations."
    ],
    "correct": 0,
    "explanation": "When creating your model, use BigQuery's TRANSFORM clause This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "AWSandeep",
        "text": "A. When creating your model, use BigQuery's TRANSFORM clause to define preprocessing steps. At prediction time, use BigQuery's ML.EVALUATE clause without specifying any transformations on the raw input data.\nUsing the TRANSFORM clause, you can specify all preprocessing during model creation. The preprocessing is automatically applied during the prediction and evaluation phases of machine learning.\nReference: https://cloud.google.com/bigquery-ml/docs/bigqueryml-transform"
      },
      {
        "user": "zellck",
        "text": "A is the answer.\nhttps://cloud.google.com/bigquery-ml/docs/bigqueryml-transform\nUsing the TRANSFORM clause, you can specify all preprocessing during model creation. The preprocessing is automatically applied during the prediction and evaluation phases of machine learning"
      },
      {
        "user": "TNT87",
        "text": "https://cloud.google.com/bigquery-ml/docs/bigqueryml-transform\nAns A"
      },
      {
        "user": "Prudvi3266",
        "text": "A is correct answer if we use TRANSFORM clause in BigQuery no need to use any transform while evaluating and predicting https://cloud.google.com/bigquery/docs/bigqueryml-transform"
      },
      {
        "user": "jkhong",
        "text": "Problem: Skew\nOne thing that I overlooked when answering previously is that B, C does not address skew. When we preprocess our training data, we need to save our scaled factors somewhere, and when performing predictions on our test data, we need to use the scaling factors of our training data to predict the results.\nML.EVALUATE already incorporates preprocessing steps for our test data using the saved scaled factors."
      },
      {
        "user": "Lenifia",
        "text": "The key to preventing skew in machine learning models is to ensure that the same data preprocessing steps are applied consistently to both the training data and the prediction data. In option B, the TRANSFORM clause in BigQuery ML is used to define preprocessing steps during model creation, and a saved query is used to apply the same transformations to the raw input data before making predictions. This ensures consistency and prevents skew. The ML.EVALUATE function is then used to evaluate th..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 82,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You are analyzing stock prices. Every 5 seconds, you need to compute a moving average of the past 30 seconds. You are reading data from Pub/Sub and using DataFlow. How should you set up your windowed pipeline?",
    "options": [
      "A. Use a fixed window with duration of 5 seconds. Emit results with AfterProcessingTime trigger with 30 seconds delay.",
      "B. Use a fixed window with duration of 30 seconds. Emit results with AfterWatermark trigger with 5 seconds delay.",
      "C. Use a sliding window with duration of 5 seconds. Emit results with AfterProcessingTime trigger.",
      "D. Use a sliding window with duration of 30 seconds and a period of 5 seconds. Emit results with AfterWatermark.pastEndOfWindow()."
    ],
    "correct": 3,
    "explanation": "Use a sliding window with duration of 30 seconds and a period of 5 seconds This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "vamgcp",
        "text": "Option D: Sliding Window: Since you need to compute a moving average of the past 30 seconds' worth of data every 5 seconds, a sliding window is appropriate. A sliding window allows overlapping intervals and is well-suited for computing rolling aggregates.\nWindow Duration: The window duration should be set to 30 seconds to cover the required 30 seconds' worth of data for the moving average calculation.\nWindow Period: The window period or sliding interval should be set to 5 seconds to move the ..."
      },
      {
        "user": "AWSandeep",
        "text": "D. Use a sliding window with a duration of 30 seconds and a period of 5 seconds. Emit results by setting the following trigger: AfterWatermark.pastEndOfWindow ()\nReveal Solution"
      },
      {
        "user": "pluiedust",
        "text": "Moving average ——> sliding window"
      },
      {
        "user": "Kimich",
        "text": "AfterWatermark is an essential triggering condition in Dataflow that allows computations to be triggered based on event time rather than processing time. Then eliminate A&C. Comparing B&D, B will generate outcome every 30 seconds which is not what we want\nD. Using a sliding window with a duration of 30 seconds and a period of 5 seconds, and setting the trigger as AfterWatermark.pastEndOfWindow(), is a sliding window that generates results every 5 seconds, and each result includes data from th..."
      },
      {
        "user": "zellck",
        "text": "D is the answer.\nhttps://cloud.google.com/dataflow/docs/concepts/streaming-pipelines#hopping-windows\nYou set the following windows with the Apache Beam SDK or Dataflow SQL streaming extensions:\nHopping windows (called sliding windows in Apache Beam)\nA hopping window represents a consistent time interval in the data stream. Hopping windows can overlap, whereas tumbling windows are disjoint.\nFor example, a hopping window can start every thirty seconds and capture one minute of data. The frequen..."
      },
      {
        "user": "Anudeep58",
        "text": "Option D is the correct configuration because it uses a sliding window of 30 seconds with a period of 5 seconds, ensuring that the moving average is computed every 5 seconds based on the past 30 seconds of data. The trigger AfterWatermark.pastEndOfWindow() ensures timely and accurate results are emitted as the watermark progresses."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 83,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You are designing a pipeline that publishes application events to a Pub/Sub topic. You need to aggregate events across disjoint hourly intervals before loading to BigQuery. What technology should you use to process and load this data while ensuring it scales?",
    "options": [
      "A. Create a Cloud Function that executes using the Pub/Sub trigger.",
      "B. Schedule a Cloud Function to run hourly, pulling all available messages.",
      "C. Schedule a batch Dataflow job to run hourly, pulling all available messages.",
      "D. Create a streaming Dataflow job that reads continually from the Pub/Sub topic and uses tumbling windows."
    ],
    "correct": 3,
    "explanation": "Create a streaming Dataflow job that reads continually from the Pub/Sub topic and use This Google's managed pub/sub messaging service enabling asynchronous communication with built-in ordering guarantees and at-least-once delivery semantics.",
    "discussion": [
      {
        "user": "Atnafu",
        "text": "D\nTUMBLE=> fixed windows.\nHOP=> sliding windows.\nSESSION=> session windows."
      },
      {
        "user": "musumusu",
        "text": "why not c ? as data is arriving hourly why we can use batch processing rather than streaming with 1 hour fixed window?"
      },
      {
        "user": "baimus",
        "text": "Just to provide clarity to people asking \"why not C\" - the source is a pub/sub. Pub/Sub has a limit of 10 MB or 1000 messages for a single batch publish request, which means that batch dataflow will not necessarily be able to retrieve all messages. If the question had said \"there will always be less than 1000 messages and less than 10mb\", only then would batch be acceptable."
      },
      {
        "user": "zellck",
        "text": "D is the answer.\nhttps://cloud.google.com/dataflow/docs/concepts/streaming-pipelines#tumbling-windows"
      },
      {
        "user": "MrMone",
        "text": "\"you need to be able to aggregate events across disjoint hourly intervals\" does not means data is arriving hourly. however, it's tricky! Answer D"
      },
      {
        "user": "ga8our",
        "text": "I second your question. Noone who suggests Dataflow streaming (D) has given an explanation why an hourly batch job is insufficient."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 84,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You work for a large financial institution planning to use Dialogflow to create a chatbot. About 70% of customer requests are simple requests solved within 10 intents. The remaining 30% require longer, more complicated requests. Which intents should you automate first?",
    "options": [
      "A. Automate the 10 intents that cover 70% of the requests so that live agents can handle more complicated requests.",
      "B. Automate the more complicated requests first because those require more of the agents' time.",
      "C. Automate a blend of the shortest and longest intents to be representative.",
      "D. Automate intents where common words such as 'payment' appear only once."
    ],
    "correct": 0,
    "explanation": "Automate the 10 intents that cover 70% of the requests so that live agents can handle This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "zellck",
        "text": "A is the answer.\nhttps://cloud.google.com/dialogflow/cx/docs/concept/agent-design#build-iteratively\nIf your agent will be large or complex, start by building a dialog that only addresses the top level requests. Once the basic structure is established, iterate on the conversation paths to ensure you're covering all of the possible routes an end-user may take."
      },
      {
        "user": "SMASL",
        "text": "Correct answer: A\nAs it states in the documentation: \"If your agent will be large or complex, start by building a dialog that only addresses the top level requests. Once the basic structure is established, iterate on the conversation paths to ensure you're covering all of the possible routes an end-user may take.\" (https://cloud.google.com/dialogflow/cx/docs/concept/agent-design#build-iteratively)\nTherefore, you should initally automate the 70 % of the requests that are simpler before automat..."
      },
      {
        "user": "MaxNRG",
        "text": "This is the best approach because it follows the Pareto principle (80/20 rule). By automating the most common 10 intents that address 70% of customer requests, you free up the live agents to focus their time and effort on the more complex 30% of requests that likely require human insight/judgement. Automating the simpler high-volume requests first allows the chatbot to handle those easily, efficiently routing only the trickier cases to agents. This makes the best use of automation for high-vo..."
      },
      {
        "user": "vamgcp",
        "text": "Option A : : By automating the intents that cover a significant majority (70%) of customer requests, you target the areas with the highest volume of interactions. This helps reduce the load on live agents, enabling them to focus on more complicated and time-consuming inquiries that require their expertise."
      },
      {
        "user": "Takshashila",
        "text": "A is the answer."
      },
      {
        "user": "AWSandeep",
        "text": "A. Automate the 10 intents that cover 70% of the requests so that live agents can handle more complicated requests."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 85,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "Your company is implementing a data warehouse using BigQuery. You notice performance issues when querying the data of the past 30 days with a star data schema. Based on Google's recommended practices, what should you do to speed up the query without increasing storage costs?",
    "options": [
      "A. Denormalize the data.",
      "B. Shard the data by customer ID.",
      "C. Materialize the dimensional data in views.",
      "D. Partition the data by transaction date."
    ],
    "correct": 3,
    "explanation": "Denormalizing increases storage costs via data duplication. Partitioning by transaction date optimizes performance for recent data while keeping storage costs unchanged.",
    "discussion": [
      {
        "user": "waiebdi",
        "text": "D is the right answer because it does not increase storage costs.\nA is not correct because denormalization typically increases the amount of storage needed."
      },
      {
        "user": "pcadolini",
        "text": "I think better option is [A] considering GCP Documentation: https://cloud.google.com/bigquery/docs/migration/schema-data-overview#denormalization \"BigQuery supports both star and snowflake schemas, but its native schema representation is neither of those two. It uses nested and repeated fields instead for a more natural representation of the data ..... Changing your schema to use nested and repeated fields is an excellent evolutionary choice. It reduces the number of joins required for your q..."
      },
      {
        "user": "NicolasN",
        "text": "A sneaky question.\n[D] Yes - Since data is queried with date criteria, partitioning by transaction date will surely speed it up without further cost.\n[A] Yes? - Star schema is a denormalized model but as user Reall01 pointed out, the option to use nested and repeated fields can be considered a further denormalization. And if the model hasn't frequently changing dimensions, this kind of denormalization will result in increased performance, according to https://cloud.google.com/bigquery/docs/lo..."
      },
      {
        "user": "zellck",
        "text": "D is the answer.\nhttps://cloud.google.com/bigquery/docs/partitioned-tables\nA partitioned table is a special table that is divided into segments, called partitions, that make it easier to manage and query your data. By dividing a large table into smaller partitions, you can improve query performance, and you can control costs by reducing the number of bytes read by a query."
      },
      {
        "user": "AWSandeep",
        "text": "D. Partition the data by transaction date.\nStar schema is already denormalized."
      },
      {
        "user": "Aman47",
        "text": "Bro, you are playing with words now. Gotta read the question fully."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 86,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You have uploaded 5 years of log data to Cloud Storage. Some data points are outside expected ranges. You need to address this issue and be able to run the process again while keeping the original data for compliance. What should you do?",
    "options": [
      "A. Import the data into BigQuery. Create a new table, and skip rows with errors.",
      "B. Create a Compute Engine instance and create a new copy of the data in Cloud Storage. Skip rows with errors.",
      "C. Create a Dataflow workflow that reads from Cloud Storage, checks for values outside expected range, sets to appropriate default, and writes to a new dataset in Cloud Storage.",
      "D. Create a Dataflow workflow that reads from Cloud Storage, checks for values, sets to default, and writes to the same dataset."
    ],
    "correct": 2,
    "explanation": "Create a Dataflow workflow that reads from Cloud Storage, checks for values outside e This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "AWSandeep",
        "text": "C. Create a Dataflow workflow that reads the data from Cloud Storage, checks for values outside the expected range, sets the value to an appropriate default, and writes the updated records to a new dataset in Cloud Storage.\nYou can't filter out data using BQ load commands. You must imbed the logic to filter out data (i.e. time ranges) in another decoupled way (i.e. Dataflow, Cloud Functions, etc.). Therefore, A and B add additional complexity and deviates from the Data Lake design paradigm. D..."
      },
      {
        "user": "FP77",
        "text": "Strange answers... Since when does cloud storage have datasets? Lol\nKeeping this in mind, the answer must be C, but none is really correcg"
      },
      {
        "user": "MaxNRG",
        "text": "Option C is the best approach in this situation. Here is why:\nOption A would remove data which may be needed for compliance reasons. Keeping the original data is preferred.\nOption B makes a copy of the data but still removes potentially useful records. Additional storage costs would be incurred as well.\nOption C uses Dataflow to clean the data by setting out of range values while keeping the original data intact. The fixed records are written to a new location for further analysis. This meets..."
      },
      {
        "user": "zellck",
        "text": "C is the answer."
      },
      {
        "user": "AzureDP900",
        "text": "C. Create a Dataflow workflow that reads the data from Cloud Storage, checks for values outside the expected range, sets the value to an appropriate default, and writes the updated records to a new dataset in Cloud Storage."
      },
      {
        "user": "Ben_oso",
        "text": "with C the user dont see the data with errors, all clean"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 87,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You want to rebuild your batch pipeline for structured data on Google Cloud. You are using PySpark with pipelines taking over twelve hours. You want to use a serverless tool and SQL syntax. You have already moved raw data to Cloud Storage. How should you build the pipeline?",
    "options": [
      "A. Convert PySpark commands into SparkSQL queries and run on Dataproc to write to BigQuery.",
      "B. Ingest data into Cloud SQL, convert PySpark to SparkSQL, and use federated queries from BigQuery.",
      "C. Ingest data into BigQuery from Cloud Storage, convert PySpark commands into BigQuery SQL queries, and write transformations to a new table.",
      "D. Use Apache Beam Python SDK to build transformation pipelines, and write data into BigQuery."
    ],
    "correct": 2,
    "explanation": "Ingest data into BigQuery from Cloud Storage, convert PySpark commands into BigQuery This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "devaid",
        "text": "The question is C but not because the SQL Syntax, as you can perfectly use SparkSQL on Dataproc reading files from GCS. It's because the \"serverless\" requirement."
      },
      {
        "user": "TNT87",
        "text": "This same question is there on Google's Professional Machine Learning Engineer,"
      },
      {
        "user": "MaxNRG",
        "text": "Option C is the best approach to meet the stated requirements. Here's why:\nBigQuery SQL provides a fast, scalable, and serverless method for transforming structured data, easier to develop than PySpark.\nDirectly ingesting the raw Cloud Storage data into BigQuery avoids needing an intermediate processing cluster like Dataproc.\nTransforming the data via BigQuery SQL queries will be faster than PySpark, especially since the data is already loaded into BigQuery.\nWriting the transformed results to..."
      },
      {
        "user": "MoeHaydar",
        "text": "Note: Dataproc by itself is not serverless\nhttps://cloud.google.com/dataproc-serverless/docs/overview"
      },
      {
        "user": "Prudvi3266",
        "text": "because of serverless nature"
      },
      {
        "user": "GCP001",
        "text": "A) Looks more suitable , serverless approach for handling and performance."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 88,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You are testing a Dataflow pipeline to ingest and transform compressed gzip text files. Errors are written to a dead-letter queue, and you are using SideInputs to join data. The pipeline is taking longer than expected. What should you do to expedite the job?",
    "options": [
      "A. Switch to compressed Avro files.",
      "B. Reduce the batch size.",
      "C. Retry records that throw an error.",
      "D. Use CoGroupByKey instead of the SideInput."
    ],
    "correct": 3,
    "explanation": "Use CoGroupByKey instead of the SideInput This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "John_Pongthorn",
        "text": "D: it is most likely.\nThere are a lot of reference doc to tell about comparison between them\nhttps://cloud.google.com/architecture/building-production-ready-data-pipelines-using-dataflow-developing-and-testing#choose_correctly_between_side_inputs_or_cogroupbykey_for_joins\nhttps://cloud.google.com/blog/products/data-analytics/guide-to-common-cloud-dataflow-use-case-patterns-part-2\nhttps://stackoverflow.com/questions/58080383/sideinput-i-o-kills-performance"
      },
      {
        "user": "zellck",
        "text": "D is the answer.\nhttps://cloud.google.com/architecture/building-production-ready-data-pipelines-using-dataflow-developing-and-testing#choose_correctly_between_side_inputs_or_cogroupbykey_for_joins\nThe CoGroupByKey transform is a core Beam transform that merges (flattens) multiple PCollection objects and groups elements that have a common key. Unlike a side input, which makes the entire side input data available to each worker, CoGroupByKey performs a shuffle (grouping) operation to distribute..."
      },
      {
        "user": "AWSandeep",
        "text": "B. Reduce the batch size."
      },
      {
        "user": "KC_go_reply",
        "text": "Avro requires the data to be at least semi-structured, because it wants a fixed schema. Text files are unstructured data, therefore it doesn't make sense to use Avro files for them"
      },
      {
        "user": "YorelNation",
        "text": "D probably, side inputs have to fit in memory. If the p-collection in the side input doesn't fit well in memory it's better to use CoGroupByKey."
      },
      {
        "user": "TNT87",
        "text": "When optimizing for load speed, Avro file format is preferred. Avro is a binary row-based format which can be split and read in parallel by multiple slots including compressed files."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 89,
    "topic": "Security/DLP",
    "difficulty": 2,
    "question": "You are building a real-time prediction engine that streams files containing PII into Cloud Storage and eventually BigQuery. You want to ensure sensitive data is masked but maintains referential integrity (names and emails are often used as join keys). How should you use the DLP API?",
    "options": [
      "A. Create a pseudonym by replacing the PII data with cryptogenic tokens, and store the non-tokenized data in a locked-down bucket.",
      "B. Redact all PII data, and store a version of the unredacted data in a locked-down bucket.",
      "C. Scan every table in BigQuery, and mask the data it finds that has PII.",
      "D. Create a pseudonym by replacing PII data with a cryptographic format-preserving token."
    ],
    "correct": 3,
    "explanation": "Create a pseudonym by replacing PII data with a cryptographic format-preserving token This discovers and classifies sensitive data using infoTypes, then applies de-identification techniques like masking, hashing, or encryption to protect PII.",
    "discussion": [
      {
        "user": "zellck",
        "text": "D is the answer.\nhttps://cloud.google.com/dlp/docs/pseudonymization#supported-methods\nFormat preserving encryption: An input value is replaced with a value that has been encrypted using the FPE-FFX encryption algorithm with a cryptographic key, and then prepended with a surrogate annotation, if specified. By design, both the character set and the length of the input value are preserved in the output value. Encrypted values can be re-identified using the original cryptographic key and the enti..."
      },
      {
        "user": "loicrichonnier",
        "text": "You shouldn't use ChatGPT as a source, the data used are not up to date and for such complex question a predicting text chatbot can help but, it's better to refer to the google documentation."
      },
      {
        "user": "Atnafu",
        "text": "D is the answer\nPseudonymization is a de-identification technique that replaces sensitive data values with cryptographically generated tokens.\nKeywords: You want to ensure that the sensitive data is masked but still maintains referential integrity\nPart1- data is masked-Create a pseudonym by replacing PII data with a cryptographic token\nPart 2 still maintains referential integrity- with a cryptographic format-preserving token\nA Not an answer because\nthe locked-down button does not seem to goog..."
      },
      {
        "user": "AWSandeep",
        "text": "A. Create a pseudonym by replacing the PII data with cryptogenic tokens, and store the non-tokenized data in a locked-down button."
      },
      {
        "user": "Prudvi3266",
        "text": "here catch is \"cryptographic\" key"
      },
      {
        "user": "cloudmon",
        "text": "It's D.\n\"You want to ensure that the sensitive data is masked but still maintains referential integrity.\"\nThey don't ask you to also keep the original data (which answer A relates to).\nAlso, format-preservation is important in this case."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 90,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "Business owners have given you a database of bank transactions. Each row contains the user ID, transaction type, location, and amount. They ask you to investigate what type of ML can be applied. Which three ML applications can you use? (Choose three.)",
    "options": [
      "A. Supervised learning to determine which transactions are most likely to be fraudulent.",
      "B. Unsupervised learning to determine which transactions are most likely to be fraudulent.",
      "C. Clustering to divide the transactions into N categories based on feature similarity.",
      "D. Supervised learning to predict the location of a transaction.",
      "E. Reinforcement learning to predict the location of a transaction.",
      "F. Unsupervised learning to predict the location of a transaction."
    ],
    "correct": [
      0,
      2,
      3
    ],
    "explanation": "Supervised learning to determine which transactions are most likely to be fraudulent This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "BCD makes more sense to me. Its for sure not unsupervised, since locations are in the data already. Reinforcement also doesn't fit, as there no AI and no interactions with data from the observer."
      },
      {
        "user": "StefanoG",
        "text": "As wrote by RP123\nB - Not labelled as Fraud or not. So Unsupervised.\nC - Clustering can be done based on location, amount etc.\nD - Location is already given. So labelled. Hence supervised."
      },
      {
        "user": "Bulleen",
        "text": "BCD makes sense, but I now agree that BCE is the correct answer.\nSay the model predict a location, guessing US or Sweden are both wrong when the answer is Canada. But US is closer, the distance from the correct location can be used to calculate a reward. Through reinforcement learning (E) the model could guess a location with better accuracy than supervised (D)."
      },
      {
        "user": "Toto2020",
        "text": "A would be fine if we have a column saying if the transaction is fraudulent or not. Without a label column we cannot do Supervised learning, in this case. BCD I think."
      },
      {
        "user": "zonc",
        "text": "But we may suppose that a fraud is an anomaly so we can use an anomaly detection which is unsupervised learning technique."
      },
      {
        "user": "RP123",
        "text": "BCD.\nB - Not labelled as Fraud or not. So Unsupervised.\nC - Clustering can be done based on location, amount etc.\nD - Location is already given. So labelled. Hence supervised."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 91,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are migrating an application that tracks library books from an on-premises data warehouse to BigQuery. In your current relational database, the author information is kept in a separate table. Based on Google's recommended practice for schema design, how would you structure the data?",
    "options": [
      "A. Keep the schema the same, maintain the different tables for the book and each attribute.",
      "B. Create a table that is wide and includes a column for each attribute.",
      "C. Create a table that includes information about the books and authors, but nest the author fields inside the author column.",
      "D. Keep the schema the same, create a view that joins all of the tables, and always query the view."
    ],
    "correct": 2,
    "explanation": "Create a table that includes information about the books and authors, but nest the au This managed relational database with automated backups, replication, and patch management; supports MySQL, PostgreSQL, SQL Server.",
    "discussion": [
      {
        "user": "musumusu",
        "text": "C\nif data is time based or sequential, find partition and cluster option\nif data is not time based,\nalways look for denomalize / nesting option."
      },
      {
        "user": "zellck",
        "text": "C is the answer.\nhttps://cloud.google.com/bigquery/docs/best-practices-performance-nested\nBest practice: Use nested and repeated fields to denormalize data storage and increase query performance.\nDenormalization is a common strategy for increasing read performance for relational datasets that were previously normalized. The recommended way to denormalize data in BigQuery is to use nested and repeated fields. It's best to use this strategy when the relationships are hierarchical and frequently..."
      },
      {
        "user": "Atnafu",
        "text": "C\nBest practice: Use nested and repeated fields to denormalize data storage and increase query performance."
      },
      {
        "user": "dish11dish",
        "text": "Use nested and repeated fields to denormalize data storage which will increase query performance.BigQuery doesn't require a completely flat denormalization. You can use nested and repeated fields to maintain relationships"
      },
      {
        "user": "AWSandeep",
        "text": "C. Create a table that includes information about the books and authors, but nest the author fields inside the author column."
      },
      {
        "user": "AzureDP900",
        "text": "C. Create a table that includes information about the books and authors, but nest the author fields inside the author column."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 92,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You need to give new website users a globally unique identifier (GUID) using a service that takes data points and returns a GUID. There will be tens of thousands of messages per second and can be multi-threaded. You worry about backpressure. How should you design your pipeline to minimize backpressure?",
    "options": [
      "A. Call out to the service via HTTP.",
      "B. Create the pipeline statically in the class definition.",
      "C. Create a new object in the startBundle method of DoFn.",
      "D. Batch the job into ten-second increments."
    ],
    "correct": 2,
    "explanation": "Create a new object in the startBundle method of DoFn This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "John_Pongthorn",
        "text": "D: I have insisted on this choice all aling.\nplease read find the keyword massive backpressure\nhttps://cloud.google.com/blog/products/data-analytics/guide-to-common-cloud-dataflow-use-case-patterns-part-1\nif the call takes on average 1 sec, that would cause massive backpressure on the pipeline. In these circumstances you should consider batching these requests, instead."
      },
      {
        "user": "John_Pongthorn",
        "text": "D\nAll guys ,pls read carefully on Pattern: Calling external services for data enrichment\nhttps://cloud.google.com/blog/products/data-analytics/guide-to-common-cloud-dataflow-use-case-patterns-part-1\nA , B , C all of them are solution for norma case but if you need to stand for backpressure,\nin last sector in Note : Note: When using this pattern, be sure to plan for the load that's placed on the external service and any associated backpressure. For example, imagine a pipeline that's processing..."
      },
      {
        "user": "NicolasN",
        "text": "Thanks for sharing, you found exactly the same problem!\nThe document defitely proposes batching for this scenario.\nI'm quoting another part from the same example that would be useful for a similar question with different conditions:\n- If you're using a client in the DoFn that has heavy instantiation steps, rather than create that object in each DoFn call:\n* If the client is thread-safe and serializable, create it statically in the class definition of the DoFn.\n* If it's not thread-safe, creat..."
      },
      {
        "user": "maci_f",
        "text": "I was hesitating between C and D, but then I realised this: https://cloud.google.com/blog/products/data-analytics/guide-to-common-cloud-dataflow-use-case-patterns-part-1\nHere is says \"If it's not thread-safe, create a new object in the startBundle method of DoFn.\" The task explicitly says \"There will be tens of thousands of messages per second and that can be multi-threaded.\"\nCorrect me if I'm wrong, but multi-threaded == thread-safe. Therefore, no need to go for the C approach."
      },
      {
        "user": "zellck",
        "text": "D is the answer.\nhttps://cloud.google.com/blog/products/data-analytics/guide-to-common-cloud-dataflow-use-case-patterns-part-1\nFor example, imagine a pipeline that's processing tens of thousands of messages per second in steady state. If you made a callout per element, you would need the system to deal with the same number of API calls per second. Also, if the call takes on average 1 sec, that would cause massive backpressure on the pipeline. In these circumstances you should consider batchin..."
      },
      {
        "user": "Atnafu",
        "text": "By the way if you see the shared Pseudocode, it's talking about start bundle and finish bundle of DoFn. The question is which one to choose to avoid back pressure?\nyou can see why you need to choose bundle instead of batching in below link\nBatching introduces some processing overhead as well as the need for a magic number to determine the key space.\nInstead, use the StartBundle and FinishBundle lifecycle elements to batch your data. With these options, no shuffling is needed.\nhttps://cloud.go..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 93,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "You are migrating your data warehouse to Google Cloud. The files being transferred are not large in number, but each is 90 GB. You want your transactional systems to continually update the warehouse in real time. What tools should you use to migrate and ensure continued writes?",
    "options": [
      "A. Storage Transfer Service for migration; Pub/Sub and Cloud Data Fusion for real-time updates",
      "B. BigQuery Data Transfer Service for migration; Pub/Sub and Dataproc for real-time updates",
      "C. gsutil for migration; Pub/Sub and Dataflow for real-time updates",
      "D. gsutil for both the migration and the real-time updates"
    ],
    "correct": 2,
    "explanation": "gsutil for migration; Pub/Sub and Dataflow for real-time updates This ensures data integrity and compliance during transfer.",
    "discussion": [
      {
        "user": "zellck",
        "text": "C is the answer.\nhttps://cloud.google.com/architecture/migration-to-google-cloud-transferring-your-large-datasets#gsutil_for_smaller_transfers_of_on-premises_data\nThe gsutil tool is the standard tool for small- to medium-sized transfers (less than 1 TB) over a typical enterprise-scale network, from a private data center to Google Cloud."
      },
      {
        "user": "AWSandeep",
        "text": "C. gsutil for the migration; Pub/Sub and Dataflow for the real-time updates\nUse Gsutil when there is enough bandwidth to meet your project deadline for less than 1 TB of data. Storage Transfer Service is for much larger volumes for migration. Moreover, Cloud Data Fusion and Dataproc are not ideal for real-time updates. BigQuery Data Transfer Service does not support all on-prem sources."
      },
      {
        "user": "TNT87",
        "text": "https://cloud.google.com/architecture/migration-to-google-cloud-transferring-your-large-datasets#gsutil_for_smaller_transfers_of_on-premises_data\nAnswer C"
      },
      {
        "user": "shangning007",
        "text": "According to the latest documentation, \"Generally, you should use gcloud storage commands instead of gsutil commands. The gsutil tool is a legacy Cloud Storage CLI and minimally maintained.\"\nWe should remove the presence of gsutil in the questions."
      },
      {
        "user": "MaxNRG",
        "text": "Option A is incorrect because Storage Transfer Service is better for scheduled batch transfers, not ad hoc large migrations.\nOption B is incorrect because BigQuery Data Transfer Service is more focused on scheduled replication jobs, not ad hoc migrations.\nOption D would not work well for real-time updates after migration is complete.\nSo option C leverages the right Google cloud services for the one-time migration and ongoing real-time processing."
      },
      {
        "user": "AzureDP900",
        "text": "Agreed\nthx for sharing link"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 94,
    "topic": "Bigtable",
    "difficulty": 2,
    "question": "You are using Bigtable to persist and serve stock market data. You need to access only the most recent stock prices that are streaming in. How should you design your row key and tables?",
    "options": [
      "A. Create one unique table for all indices, use index and timestamp as row key.",
      "B. Create one unique table for all indices, use a reverse timestamp as row key.",
      "C. For each index, have a separate table and use a timestamp as row key.",
      "D. For each index, have a separate table and use a reverse timestamp as row key."
    ],
    "correct": 1,
    "explanation": "A separate table per metric is a Bigtable anti-pattern. Use a single table with a reverse timestamp in the row key to sort most recent data at the top.",
    "discussion": [
      {
        "user": "John_Pongthorn",
        "text": "This is special case , plese Take a look carefully the below link and read at last paragraph at the bottom of this comment, let everyone share idea, We will go with B, C\nhttps://cloud.google.com/bigtable/docs/schema-design#time-based\nDon't use a timestamp by itself or at the beginning of a row key, because this will cause sequential writes to be pushed onto a single node, creating a hotspot.\nIf you usually retrieve the most recent records first, you can use a reversed timestamp in the row key..."
      },
      {
        "user": "zellck",
        "text": "B is the answer.\nhttps://cloud.google.com/bigtable/docs/schema-design#time-based\nIf you usually retrieve the most recent records first, you can use a reversed timestamp in the row key by subtracting the timestamp from your programming language's maximum value for long integers (in Java, java.lang.Long.MAX_VALUE). With a reversed timestamp, the records will be ordered from most recent to least recent."
      },
      {
        "user": "Wasss123",
        "text": "Answer B :\nYou can read in the same resource you provided :\nIf you usually retrieve the most recent records first, you can use a reversed timestamp in the row key by subtracting the timestamp from your programming language's maximum value for long integers (in Java, java.lang.Long.MAX_VALUE). With a reversed timestamp, the records will be ordered from most recent to least recent.\nSo B is correct"
      },
      {
        "user": "iooj",
        "text": "Row keys that start with a timestamp (irrespective reversed or not) causes sequential writes to be pushed onto a single node, creating a hotspot. If you put a timestamp in a row key, precede it with a high-cardinality value (index in our case) to avoid hotspots.\nThe ideal option would be: \"use the index and reversed timestamp as the row key design\"."
      },
      {
        "user": "arien_chen",
        "text": "Option B using reverse timestamp only, this is not the answer.\nthe right answer should be using the index and revers timestamp as the row key.\nSo, Option D is the only answer, because not A,B,C ."
      },
      {
        "user": "datapassionate",
        "text": "B is a correct answer because \"you need to access only the most recent stock prices\"\n\"If you usually retrieve the most recent records first, you can use a reversed timestamp in the row key by subtracting the timestamp from your programming language's maximum value for long integers (in Java, java.lang.Long.MAX_VALUE). With a reversed timestamp, the records will be ordered from most recent to least recent.\"\nhttps://cloud.google.com/bigtable/docs/schema-design#time-based"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 95,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are building a report-only data warehouse where data is streamed into BigQuery via the streaming API. Following Google's best practices, you have staging and production tables. How should you design your data loading to ensure only one master dataset without affecting performance?",
    "options": [
      "A. Have a staging table that is append-only, then update production every three hours.",
      "B. Have a staging table that is append-only, then update production every ninety minutes.",
      "C. Have a staging table that moves the staged data to production and deletes staging contents every three hours.",
      "D. Have a staging table that moves the staged data to production and deletes staging contents every thirty minutes."
    ],
    "correct": 0,
    "explanation": "Have a staging table that is append-only, then update production every three hours This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "NicolasN",
        "text": "[C]\nI found the correct answer based on a real case, where Google's Solutions Architect team decided to move an internal process to use BigQuery.\nThe related doc is here: https://cloud.google.com/blog/products/data-analytics/moving-a-publishing-workflow-to-bigquery-for-new-data-insights"
      },
      {
        "user": "NicolasN",
        "text": "The interesting excerpts:\n\"Following common extract, transform, load (ETL) best practices, we used a staging table and a separate production table so that we could load data into the staging table without impacting users of the data. The design we created based on ETL best practices called for first deleting all the records from the staging table, loading the staging table, and then replacing the production table with the contents.\"\n\"When using the streaming API, the BigQuery streaming buffer..."
      },
      {
        "user": "nwk",
        "text": "Vote B - \"Some recently streamed rows might not be available for table copy typically for a few minutes. In rare cases, this can take up to 90 minutes\"\nhttps://cloud.google.com/bigquery/docs/streaming-data-into-bigquery#dataavailability"
      },
      {
        "user": "zellck",
        "text": "C is the answer.\nhttps://cloud.google.com/blog/products/data-analytics/moving-a-publishing-workflow-to-bigquery-for-new-data-insights\nFollowing common extract, transform, load (ETL) best practices, we used a staging table and a separate production table so that we could load data into the staging table without impacting users of the data. The design we created based on ETL best practices called for first deleting all the records from the staging table, loading the staging table, and then repl..."
      },
      {
        "user": "SamuelTsch",
        "text": "deleting data from my point of view is not a good practice to build datawarehouse solutions. So, C and D are excluded.\naccording to the official documentation, the updating/merging process could last till 90 minutes. 3 hours could be enough."
      },
      {
        "user": "TVH_Data_Engineer",
        "text": "An append-only staging table ensures that all incoming data is captured without risk of data loss or overwrites, which is crucial for maintaining data integrity in a streaming ingestion scenario.\nThree-Hour Update Interval:\nUpdating the production table every three hours strikes a good balance between minimizing the latency of data availability for reporting and reducing the frequency of potentially resource-intensive update operations.\nThis interval is frequent enough to keep the production ..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 96,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You issue a new batch job to Dataflow. The job starts successfully, processes a few elements, and then suddenly fails. You find errors related to a particular DoFn. What is the most likely cause?",
    "options": [
      "A. Job validation",
      "B. Exceptions in worker code",
      "C. Graph or pipeline construction",
      "D. Insufficient permissions"
    ],
    "correct": 1,
    "explanation": "Exceptions in worker code This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "AWSandeep",
        "text": "B. Exceptions in worker code\nWhile your job is running, you might encounter errors or exceptions in your worker code. These errors generally mean that the DoFns in your pipeline code have generated unhandled exceptions, which result in failed tasks in your Dataflow job.\nExceptions in user code (for example, your DoFn instances) are reported in the Dataflow monitoring interface.\nReference (Lists all answer choices and when to pick each one):\nhttps://cloud.google.com/dataflow/docs/guides/troubl..."
      },
      {
        "user": "zellck",
        "text": "B is the answer.\nhttps://cloud.google.com/dataflow/docs/guides/troubleshooting-your-pipeline#detect_an_exception_in_worker_code\nWhile your job is running, you might encounter errors or exceptions in your worker code. These errors generally mean that the DoFns in your pipeline code have generated unhandled exceptions, which result in failed tasks in your Dataflow job.\nExceptions in user code (for example, your DoFn instances) are reported in the Dataflow monitoring interface."
      },
      {
        "user": "vaga1",
        "text": "A. Job validation - since it started successfully, it must have been validated.\nB. Exceptions in worker code - possible\nC. Graph or pipeline construction - same as A.\nD. Insufficient permissions - no elements to say that, and it should led to invalidation."
      },
      {
        "user": "MaxNRG",
        "text": "The most likely cause of the errors you're experiencing in Dataflow, particularly if they are related to a particular DoFn (Dataflow's parallel processing operation), is B. Exceptions in worker code.\nWhen a Dataflow job processes a few elements successfully before failing, it suggests that the overall job setup, permissions, and pipeline graph are likely correct, as the job was able to start and initially process data. However, if it fails during execution and the errors are associated with a..."
      },
      {
        "user": "MaxNRG",
        "text": "To resolve these issues, you should:\n1. Inspect the stack traces and error messages in the Dataflow monitoring interface for details on the exception.\n2. Test the DoFn with a variety of data inputs, especially edge cases, to ensure robust error handling.\n3. Review the resource usage and performance characteristics of the DoFn if the issue is related to resource constraints."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 97,
    "topic": "Monitoring",
    "difficulty": 3,
    "question": "Your new customer has requested daily reports that show net consumption of Google Cloud compute resources and who used the resources. You need to quickly and efficiently generate these reports. What should you do?",
    "options": [
      "A. Do daily exports of Cloud Logging data to BigQuery. Create views filtering by project, log type, resource, and user.",
      "B. Filter data in Cloud Logging by project, resource, and user; then export the data in CSV format.",
      "C. Filter data in Cloud Logging by project, log type, resource, and user, then import into BigQuery.",
      "D. Export Cloud Logging data to Cloud Storage in CSV format. Cleanse the data using Dataprep."
    ],
    "correct": 0,
    "explanation": "Do daily exports of Cloud Logging data to BigQuery This provides visibility into system performance and enables proactive alerting.",
    "discussion": [
      {
        "user": "AWSandeep",
        "text": "A. Do daily exports of Cloud Logging data to BigQuery. Create views filtering by project, log type, resource, and user.\nYou cannot import custom or filtered billing criteria into BigQuery. There are three types of Cloud Billing data tables with a fixed schema that must further drilled-down via BigQuery views.\nReference:\nhttps://cloud.google.com/billing/docs/how-to/export-data-bigquery#setup"
      },
      {
        "user": "devaid",
        "text": "2nd tought: Definitely A. If you go to google documentation for export billing, you see a message that \"Exporting to JSON or CSV is obsolet. Use Big Query instead\".\nAlso why A? Look\nhttps://cloud.google.com/billing/docs/how-to/export-data-bigquery\nhttps://cloud.google.com/billing/docs/how-to/bq-examples#total-costs-on-invoice\nYou can make a fast report template al Data Studio that read a Big Query view."
      },
      {
        "user": "maci_f",
        "text": "B and D do not consider the log type field.\nC looks good and I would go for it.\nHowever, A looks equally good and I've found a CloudSkillsBoost lab that is exactly describing what answer A does, i.e. exporting logs to BQ and then creating a VIEW. https://www.cloudskillsboost.google/focuses/6100?parent=catalog I think the advantage of exporting complete logs (i.e. filtering them after they reach BQ) is that in case we would want to adjust the reporting in the future, we would have the complete..."
      },
      {
        "user": "TNT87",
        "text": "Ans is C\nhttps://cloud.google.com/logging/docs/export/aggregated_sinks\nD isn't correct because Cloud storage is used as a sink when logs are in json format not csv. https://cloud.google.com/logging/docs/export/aggregated_sinks#supported-destinations"
      },
      {
        "user": "vaga1",
        "text": "B, C, D do no generate a daily scalable solution."
      },
      {
        "user": "Siant_137",
        "text": "I see A as quite inefficient as you are exporting ALL logs (hundreds of thousands) to bq and the filtering them with views. I would go for C, assuming that it does not involve doing it manually but rather creating a SINK with the correct filters and then using BQ Dataset as sink destination. But a lot of assumptions are taking place here as I believe the questions does not provide much context."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 98,
    "topic": "Security/IAM",
    "difficulty": 2,
    "question": "The Development and External teams have the project viewer IAM role in a folder named Visualization. You want Development to read from both Cloud Storage and BigQuery, but External should only read from BigQuery. What should you do?",
    "options": [
      "A. Remove Cloud Storage IAM permissions to the External Team on the acme-raw-data project.",
      "B. Create VPC firewall rules on the acme-raw-data project that deny all ingress traffic from the External Team CIDR range.",
      "C. Create a VPC Service Controls perimeter containing both projects and BigQuery as a restricted API. Add External Team users to the perimeter's Access Level.",
      "D. Create a VPC Service Controls perimeter containing both projects and Cloud Storage as a restricted API. Add the Development Team users to the perimeter's Access Level."
    ],
    "correct": 3,
    "explanation": "Create a VPC Service Controls perimeter containing both projects and Cloud Storage as This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "AWSandeep",
        "text": "D. Create a VPC Service Controls perimeter containing both projects and Cloud Storage as a restricted API. Add the Development Team users to the perimeter's Access Level.\nReveal Solution"
      },
      {
        "user": "maci_f",
        "text": "\"The grouping of GCP Project(s) and Service API(s) in the Service Perimeter result in restricting unauthorized access outside of the Service Perimeter to Service API endpoint(s) referencing resources inside of the Service Perimeter.\"\nhttps://scalesec.com/blog/vpc-service-controls-in-plain-english/\nDevelopment team: needs to access both Cloud Storage and BQ -> therefore we put the Development team inside a perimeter so it can access both the Cloud Storage and the BQ\nExternal team: allowed to a..."
      },
      {
        "user": "soichirokawa",
        "text": "A. can not be correct. Roles are always inherited, and there is no way to explicitly remove a permission for a lower-level resource that is granted at a higher level in the resource hierarchy. Given the above example, even if you were to remove the Project Editor role from Bob on the \"Test project\", he would still inherit that role from the \"Department Y\" folder, so he would still have the permissions for that role on \"Test project\".\nhttps://cloud.google.com/resource-manager/docs/cloud-platfo..."
      },
      {
        "user": "Wasss123",
        "text": "Shoud be C\nhttps://cloud.google.com/vpc-service-controls/docs/vpc-accessible-services\nWhen configuring VPC accessible services for a perimeter, you can specify a list of individual services, as well as include the RESTRICTED-SERVICES value, which automatically includes all of the services protected by the perimeter.\nTo ensure access to the expected services is fully limited, you must:\nConfigure the perimeter to protect the same set of services that you want to make accessible.\nConfigure VPCs ..."
      },
      {
        "user": "techabhi2_0",
        "text": "A - Simple and straight forward"
      },
      {
        "user": "josech",
        "text": "It is not a network issue but a IAM permissions issue.\nhttps://cloud.google.com/iam/docs/deny-overview#inheritance"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 99,
    "topic": "Storage",
    "difficulty": 2,
    "question": "Your startup serves customers out of a single region in Asia. You are targeting funding to serve globally. Current goal is optimize for cost; post-funding goal is optimize for global presence and performance. You must use a native JDBC driver. What should you do?",
    "options": [
      "A. Use Cloud Spanner to configure a single region initially, then configure multi-region after securing funding.",
      "B. Use Cloud SQL for PostgreSQL HA first, and Bigtable with US, Europe, and Asia replication after funding.",
      "C. Use Cloud SQL for PostgreSQL zonal first, and Bigtable with US, Europe, and Asia after funding.",
      "D. Use Cloud SQL for PostgreSQL zonal first, and Cloud SQL for PostgreSQL with HA configuration after funding."
    ],
    "correct": 0,
    "explanation": "Use Cloud Spanner to configure a single region initially, then configure multi-region This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "AWSandeep",
        "text": "A. Use Cloud Spanner to configure a single region instance initially, and then configure multi-region Cloud Spanner instances after securing funding.\nWhen you create a Cloud Spanner instance, you must configure it as either regional (that is, all the resources are contained within a single Google Cloud region) or multi-region (that is, the resources span more than one region).\nYou can change the instance configuration to multi-regional (or global) at anytime."
      },
      {
        "user": "izekc",
        "text": "Although A is good, but concerning about the cost. Then D will be much more suitable"
      },
      {
        "user": "odacir",
        "text": "B and C has no sense because of the driver.\nD looks like a good option, but HA it's not to improve performance or global presence:\nThe purpose of an HA configuration is to reduce downtime when a zone or instance becomes unavailable. This might happen during a zonal outage, or when an instance runs out of memory. With HA, your data continues to be available to client applications.\nSo the best option is A."
      },
      {
        "user": "MaxNRG",
        "text": "A - This option allows for optimization for cost initially with a single region Cloud Spanner instance, and then optimization for global presence and performance after funding with multi-region instances.\nCloud Spanner supports native JDBC drivers and is horizontally scalable, providing very high performance. A single region instance minimizes costs initially. After funding, multi-region instances can provide lower latency and high availability globally.\nCloud SQL does not scale as well and h..."
      },
      {
        "user": "TNT87",
        "text": "https://cloud.google.com/spanner/docs/jdbc-drivers\nAns A\nhttps://cloud.google.com/spanner/docs/instance-configurations#tradeoffs_regional_versus_multi-region_configurations\nThe last part of the question makes it easy"
      },
      {
        "user": "lucaluca1982",
        "text": "Spanner has some limitations with JDBC. Maybe the quetion wants to help us tp choose Cloud SQL"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 100,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "You need to migrate 1 PB of data from on-premises to Google Cloud. Data transfer time should take only a few hours. You want to follow Google-recommended practices for a secure connection. What should you do?",
    "options": [
      "A. Establish a Cloud Interconnect connection and then use the Storage Transfer Service.",
      "B. Use a Transfer Appliance and have engineers manually encrypt, decrypt, and verify the data.",
      "C. Establish a Cloud VPN connection, start gcloud compute scp jobs in parallel, and run checksums.",
      "D. Reduce the data into 3 TB batches, transfer using gsutil, and run checksums."
    ],
    "correct": 0,
    "explanation": "Establish a Cloud Interconnect connection and then use the Storage Transfer Service This ensures data integrity and compliance during transfer.",
    "discussion": [
      {
        "user": "devaid",
        "text": "Well it doesn't mentions anything about not enough bandwidth to meet your project deadline. I guess you can assume they have 200GBps+ of bandwith, otherwise it shouldn't take only a few hours."
      },
      {
        "user": "Atnafu",
        "text": "B\nIt takes 30hrs with 100Gbps bandwidth- more than a day to transfer\nhttps://cloud.google.com/architecture/migration-to-google-cloud-transferring-your-large-datasets#:~:text=addresses%20or%20NATs.-,Online%20versus%20offline%20transfer,A%20certain%20amount%20of%20management%20overhead%20is%20built%20into%20these%20calculations.,-As%20noted%20earlier"
      },
      {
        "user": "nwk",
        "text": "Vote A\nQuestions states \"transfer over a secure connection\" , not offline with Transfer Appliance"
      },
      {
        "user": "iooj",
        "text": "One who wanted to use Transfer Appliance to migrate data in a few hours, you should live near Google office and run really fast :D"
      },
      {
        "user": "arien_chen",
        "text": "A\nhttps://cloud.google.com/storage-transfer/docs/transfer-options#:~:text=Transferring%20more%20than%201%20TB%20from%20on%2Dpremises"
      },
      {
        "user": "vaga1",
        "text": "1 PB and \"few hours\". It is clearly referring to Transfer Appliance\nhttps://cloud.google.com/architecture/migration-to-google-cloud-transferring-your-large-datasets#time"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 101,
    "topic": "Dataproc",
    "difficulty": 2,
    "question": "Your company's on-premises Apache Hadoop servers are approaching end-of-life. Migration to Dataproc would require 50 TB of Persistent Disk per node. The CIO is concerned about cost. What should you do to minimize storage cost?",
    "options": [
      "A. Put the data into Google Cloud Storage.",
      "B. Use preemptible VMs for the Dataproc cluster.",
      "C. Tune the Dataproc cluster so that there is just enough disk for all data.",
      "D. Migrate some cold data into Cloud Storage, keep only hot data in Persistent Disk."
    ],
    "correct": 0,
    "explanation": "Put the data into Google Cloud Storage This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "MadHolm",
        "text": "That would be correct if we wanted to maximize performance without sacrificing cost too much, but we want to minimize the cost. That's the only requirement, hence answer A."
      },
      {
        "user": "anji007",
        "text": "Ans: A\nB: Wrong eVM wont solve the problem of larger storage prices.\nC: May be, but nothing mentioned in terms of what to tune in the question, also this is like-for-like migration so tuning may not be part of the migration.\nD: Again, this is like-for-like so need to define what is hot data and which is cold data, also persistent disk costlier than cloud storage."
      },
      {
        "user": "sumanshu",
        "text": "A is correct because Google recommends using Cloud Storage instead of HDFS as it is much more cost effective especially when jobs aren’t running.\nB is not correct because this will decrease the compute cost but not the storage cost.\nC is not correct because while this will reduce cost somewhat, it will not be as cost effective as using Cloud Storage.\nD is not correct because while this will reduce cost somewhat, it will not be as cost effective as using Cloud Storage."
      },
      {
        "user": "AaronLee",
        "text": "Because the cluster is going to end-of-life. So maybe don't need to put hot data in the disk. All can be put in the Cloud Storage. The answer is A."
      },
      {
        "user": "aadaisme",
        "text": "I would go for D. First rule of dataproc is to keep data in GCS. Use persistant disk for high I/O data (hot data)."
      },
      {
        "user": "imran79",
        "text": "Option A: Put the data into Google Cloud Storage.\nThis is the best option. Google Cloud Dataproc is designed to work well with Google Cloud Storage. Using GCS instead of Persistent Disk can save money, and GCS offers advantages such as higher durability and the ability to share data across multiple clusters."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 102,
    "topic": "Data Processing",
    "difficulty": 2,
    "question": "You are loading CSV files from Cloud Storage to BigQuery. The files have data quality issues including mismatched data types and inconsistent formatting. You need to maintain data quality and perform cleansing. What should you do?",
    "options": [
      "A. Use Data Fusion to transform the data before loading.",
      "B. Use Data Fusion to convert CSV to Avro before loading.",
      "C. Load CSV into a staging table with desired schema, perform transformations with SQL, then write results to final table.",
      "D. Create a table with desired schema, load CSV files into the table, perform transformations in place using SQL."
    ],
    "correct": 2,
    "explanation": "Load CSV into a staging table with desired schema, perform transformations with SQL, This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "saurabhsingh4k",
        "text": "I'm kinda inclined towards C as SQL seems a powerful option to treat this kind of use case.\nAlso, I didn't get how the transformations mentioned on this page will help to clean the data (https://cloud.google.com/data-fusion/docs/concepts/transformation-pushdown#supported_transformations)\nBut I guess using Wrangler plugin, this kind of stuff can be done on DataFusion, also the question talks about an pipeline, so A is the final choice."
      },
      {
        "user": "squishy_fishy",
        "text": "The answer is C. That is what we do at work. We have landing/staging table, sort table and deliver table,"
      },
      {
        "user": "squishy_fishy",
        "text": "Okay, second thought, it is asking for a pipeline, so the answer should be A. At work, we use dataflow inside the composer to build a pipeline injecting data into landing/staging table, then transform/clean data in the sort table, then send the cleaned data to deliver table."
      },
      {
        "user": "phidelics",
        "text": "Keyword: Data Pipeline"
      },
      {
        "user": "Adswerve",
        "text": "C is the right answer. Do ELT in BigQuery. Data Fusion is not the right too for this job."
      },
      {
        "user": "musumusu",
        "text": "Answer C,\nDatafusion is costly and current transformation is just a cast transformation in a column.\nI guess no one wanna pay for datafusion for this little transformation and Staging table processing handles such minor cleaning."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 103,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You are developing a new deep learning model that predicts a customer's likelihood to buy on your ecommerce site. After evaluation, you find your model is overfitting. You want to improve accuracy when predicting new data. What should you do?",
    "options": [
      "A. Increase the size of the training dataset, and increase the number of input features.",
      "B. Increase the size of the training dataset, and decrease the number of input features.",
      "C. Reduce the size of the training dataset, and increase the number of input features.",
      "D. Reduce the size of the training dataset, and decrease the number of input features."
    ],
    "correct": 1,
    "explanation": "Increase the size of the training dataset, and decrease the number of input features This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "John_Pongthorn",
        "text": "There 2 parts and they are relevant to each other\n1. Overfit is fixed by decreasing the number of input features (select only essential features)\n2. Accuracy is improved by increasing the amount of training data examples."
      },
      {
        "user": "TNT87",
        "text": "Answer B\nhttps://machinelearningmastery.com/impact-of-dataset-size-on-deep-learning-model-skill-and-performance-estimates/"
      },
      {
        "user": "HarshKothari21",
        "text": "Option B\nFeature selection is the one the ways to resolve overfitting. Which means reducing the features\nwhen the size of the training data is small, then the network tends to have greater control over the training data. so increasing the size of data would help."
      },
      {
        "user": "John_Pongthorn",
        "text": "https://docs.aws.amazon.com/machine-learning/latest/dg/model-fit-underfitting-vs-overfitting.html"
      },
      {
        "user": "Matt_108",
        "text": "Option B, the model learned to listen to too much stuff/noise. We need to reduce it, by decreasing the number of input feature, and we need to give the model more data, by increasing the amount of training data"
      },
      {
        "user": "NeoNitin",
        "text": "Increase the size of the training dataset: By adding more diverse examples of customers and their buying behavior to the training data, the model will have a broader understanding of different scenarios and be better equipped to generalize to new customers.\nIncrease the number of input features: Providing the model with more relevant information about customers can help it identify meaningful patterns and make better predictions. These input features could include things like the customer's a..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 104,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You are implementing a chatbot to help an online retailer streamline customer service. The chatbot must respond to both text and voice. You want a low-code/no-code option. What should you do?",
    "options": [
      "A. Use Speech-to-Text API to build a Python application in App Engine.",
      "B. Use Speech-to-Text API to build a Python application in Compute Engine.",
      "C. Use Dialogflow for simple queries and Speech-to-Text API for complex queries.",
      "D. Use Dialogflow to implement the chatbot, defining intents based on the most common queries."
    ],
    "correct": 3,
    "explanation": "Use Dialogflow to implement the chatbot, defining intents based on the most common qu This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "PhuocT",
        "text": "D is correct:\nhttps://cloud.google.com/dialogflow/es/docs/how/detect-intent-tts#:~:text=Dialogflow%20can%20use%20Cloud%20Text,to%2Dspeech%2C%20or%20TTS."
      },
      {
        "user": "zellck",
        "text": "D is the answer.\nhttps://cloud.google.com/dialogflow/docs\nDialogflow is a natural language understanding platform that makes it easy to design and integrate a conversational user interface into your mobile app, web application, device, bot, interactive voice response system, and so on. Using Dialogflow, you can provide new and engaging ways for users to interact with your product.\nDialogflow can analyze multiple types of input from your customers, including text or audio inputs (like from a p..."
      },
      {
        "user": "devaid",
        "text": "D definitely, as the documentation says (specially that you can call the detect Intect method for audio inputs):\nhttps://cloud.google.com/dialogflow/es/docs/how/detect-intent-tts\nAlso Speech-To-Text API does nothing more than translate."
      },
      {
        "user": "TNT87",
        "text": "Answer D\nhttps://cloud.google.com/dialogflow/es/docs/how/detect-intent-tts"
      },
      {
        "user": "ducc",
        "text": "C. Use Dialogflow for simple queries and the Cloud Speech-to-Text API for complex queries.\nThis seem the best answer here but not the best answer in real world.\nBut with the Question, the answer must be the combination of both Diagflow and Speech API"
      },
      {
        "user": "MaxNRG",
        "text": "The best option would be to use Dialogflow to implement the chatbot, defining the intents based on the most common queries collected.\nDialogflow is a conversational AI platform that allows for easy implementation of chatbots without needing to code. It has built-in integration for both text and voice input via APIs like Cloud Speech-to-Text. Defining intents and entity types allows you to map common queries and keywords to responses. This would provide a low/no-code way to quickly build and i..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 105,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "An aerospace company uses a proprietary data format. You need to connect this new data source to BigQuery and stream the data efficiently while consuming as few resources as possible. What should you do?",
    "options": [
      "A. Write a shell script that triggers a Cloud Function that performs periodic ETL batch jobs.",
      "B. Use a standard Dataflow pipeline to store the raw data in BigQuery, then transform later.",
      "C. Use Apache Hive to write a Dataproc job that streams data in CSV format.",
      "D. Use an Apache Beam custom connector to write a Dataflow pipeline that streams data in Avro format."
    ],
    "correct": 3,
    "explanation": "Use an Apache Beam custom connector to write a Dataflow pipeline that streams data in This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "beanz00",
        "text": "This has to be D. How could it even be B? The source is a proprietary format. Dataflow wouldn't have a built-in template to ead the file. You will have to create something custom."
      },
      {
        "user": "devaid",
        "text": "For me it's clearly D\nIt's between B and D, but read B, store raw data in Big Query? Use a Dataflow pipeline just to store raw data into Big Query, and transform later? You'd need to do another pipeline for that, and is not efficient."
      },
      {
        "user": "MaxNRG",
        "text": "Option D is the best approach given the constraints - use an Apache Beam custom connector to write a Dataflow pipeline that streams the data into BigQuery in Avro format.\nThe key reasons:\n• Dataflow provides managed resource scaling for efficient stream processing\n• Avro format has schema evolution capabilities and efficient serialization for flight telemetry data\n• Apache Beam connectors avoid having to write much code to integrate proprietary data sources\n• Streaming inserts data efficientl..."
      },
      {
        "user": "knith66",
        "text": "Between B and D. Firstly transformation is not mentioned in the question, So B is less probable. Then Efficient import is mentioned in the question, Converting to Avro will consume less space. I am going with D"
      },
      {
        "user": "zellck",
        "text": "D is the answer."
      },
      {
        "user": "AWSandeep",
        "text": "D. Use an Apache Beam custom connector to write a Dataflow pipeline that streams the data into BigQuery in Avro format.\nReveal Solution"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 106,
    "topic": "Architecture",
    "difficulty": 3,
    "question": "An online brokerage company requires high volume trade processing. You need to create a secure queuing system that triggers jobs calling a Python API. What should you do?",
    "options": [
      "A. Use a Pub/Sub push subscription to trigger a Cloud Function to pass the data to the Python API.",
      "B. Write an application hosted on Compute Engine that makes a push subscription to the Pub/Sub topic.",
      "C. Write an application that makes a queue in a NoSQL database.",
      "D. Use Cloud Composer to subscribe to a Pub/Sub topic and call the Python API."
    ],
    "correct": 0,
    "explanation": "Use a Pub/Sub push subscription to trigger a Cloud Function to pass the data to the P This balances scalability, cost, and performance requirements.",
    "discussion": [
      {
        "user": "lucaluca1982",
        "text": "A and D are both good. I go for A because we have high volume and easy to scale and optmize cost"
      },
      {
        "user": "musumusu",
        "text": "Answer A:\nassume, Company wants to buy immediately in same second if stock goes down or up.\nSomehow, it is connected to PubSub as SINK connector, then immediately there is PUSH to subcriber (cloud function) that is connected to their python API (internal application) that makes the purchase."
      },
      {
        "user": "GCPCloudArchitectUse",
        "text": "Because trading platform requires securely transmission to queuing\nIf you use cloud compose then we need some other job to trigger composer … would that be cloud composer api or cloud function …"
      },
      {
        "user": "TNT87",
        "text": "Ans A\nhttps://cloud.google.com/functions/docs/calling/pubsub#deployment"
      },
      {
        "user": "AWSandeep",
        "text": "A. Use a Pub/Sub push subscription to trigger a Cloud Function to pass the data to the Python API."
      },
      {
        "user": "squishy_fishy",
        "text": "Answer is D, at work we use solution A for low volume of Pub/Sub messages and Cloud function, and using D Composer for high volume Pub/Sub messages."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 107,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "Your company wants to retrieve large result sets of medical information (over 10 TBs) and store the data in new tables for further query. The database must have a low-maintenance architecture and be accessible via SQL. What should you do?",
    "options": [
      "A. Use Cloud SQL, organize the data into tables. Use JOIN in queries.",
      "B. Use BigQuery as a data warehouse. Set output destinations for caching large queries.",
      "C. Use a MySQL cluster on a Compute Engine managed instance group.",
      "D. Use Cloud Spanner to replicate data across regions. Normalize the data."
    ],
    "correct": 1,
    "explanation": "Use BigQuery as a data warehouse. Set output destinations for caching large queries This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "AWSandeep",
        "text": "B. Use BigQuery as a data warehouse. Set output destinations for caching large queries."
      },
      {
        "user": "TNT87",
        "text": "Answer B.\nhttps://cloud.google.com/bigquery/docs/query-overview"
      },
      {
        "user": "MaxNRG",
        "text": "Option B is the best approach - use BigQuery as a data warehouse, and set output destinations for caching large queries.\nThe key reasons why BigQuery fits the requirements:\nIt is a fully managed data warehouse built to scale to handle massive datasets and perform fast SQL analytics\nIt has a low maintenance architecture with no infrastructure to manage\nSQL capabilities allow easy querying of the medical data\nOutput destinations allow configurable caching for fast retrieval of large result sets..."
      },
      {
        "user": "zellck",
        "text": "B is the answer."
      },
      {
        "user": "AzureDP900",
        "text": "B. Use BigQuery as a data warehouse. Set output destinations for caching large queries. Most Voted"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 108,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "You have 15 TB of data on-premises that changes weekly in a POSIX-compliant source. You have 500 Mbps bandwidth. You want to reliably transfer data to Google Cloud weekly. What should you do?",
    "options": [
      "A. Use Cloud Scheduler to trigger gsutil command. Use the -m parameter for optimal parallelism.",
      "B. Use Transfer Appliance and configure a weekly transfer job.",
      "C. Install Storage Transfer Service for on-premises data in your data center, and configure a weekly transfer job.",
      "D. Install Storage Transfer Service for on-premises data on a Google Cloud VM, and configure a weekly transfer job."
    ],
    "correct": 2,
    "explanation": "Install Storage Transfer Service for on-premises data in your data center, and config This ensures data integrity and compliance during transfer.",
    "discussion": [
      {
        "user": "zellck",
        "text": "C is the answer.\nhttps://cloud.google.com/architecture/migration-to-google-cloud-transferring-your-large-datasets#storage-transfer-service-for-large-transfers-of-on-premises-data\nLike gsutil, Storage Transfer Service for on-premises data enables transfers from network file system (NFS) storage to Cloud Storage. Although gsutil can support small transfer sizes (up to 1 TB), Storage Transfer Service for on-premises data is designed for large-scale transfers (up to petabytes of data, billions of..."
      },
      {
        "user": "musumusu",
        "text": "answer C,\nTo avoid confustion: Install Storage Transfer Service is always on EXTERNAL OR NON GOOGLE service or data centre to connect google service."
      },
      {
        "user": "Prudvi3266",
        "text": "C is the Answer as we need weekly run Storage transfer service has the feature to schedule."
      },
      {
        "user": "NicolasN",
        "text": "The fact that it's about a POSIX source makes necessary the set up of Storage Transfer Service agents.\nThis detail limits [C] to be the correct answer, since it's the data center hosting the files where the agent must be installed.\n--\nSome excerpts:\n(an older version of documentation was definite)\n\"The following is a high-level overview of how Transfer service for on-premises data works:\n1.Install Docker and run a small piece of software, called an agent, in your private data center. \"\nSource..."
      },
      {
        "user": "MounicaN",
        "text": "can you help with difference between c and d ?"
      },
      {
        "user": "Atnafu",
        "text": "C\nStorage Transfer Service agents are applications running inside a Docker container, that coordinate with Storage Transfer Service to read data from POSIX file system sources, and/or write data to POSIX file system sinks.\nhttps://cloud.google.com/storage-transfer/docs/managing-on-prem-agents#:~:text=Storage%20Transfer%20Service%20agents,agents%20on%20your%20servers."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 109,
    "topic": "Cloud SQL",
    "difficulty": 2,
    "question": "You are designing a system that requires an ACID-compliant database. You must ensure minimal human intervention in case of failure. What should you do?",
    "options": [
      "A. Configure a Cloud SQL for MySQL instance with point-in-time recovery enabled.",
      "B. Configure a Cloud SQL for PostgreSQL instance with high availability enabled.",
      "C. Configure a Bigtable instance with more than one cluster.",
      "D. Configure a BigQuery table with a multi-region configuration."
    ],
    "correct": 1,
    "explanation": "Configure a Cloud SQL for PostgreSQL instance with high availability enabled This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "NicolasN",
        "text": "We exclude [C[ as non ACID and [D] for being invalid (location is configured on Dataset level, not Table).\nThen, let's focus on \"minimal human intervention in case of a failure\" requirement in order to eliminate one answer among [A] and [B].\nBasically, we have to compare point-in-time recovery with high availability. It doesn't matter whether it's about MySQL or PostgreSQL since both databases support those features.\n- Point-in-time recovery logs are created automatically, but restoring an in..."
      },
      {
        "user": "zellck",
        "text": "B is the answer.\nhttps://cloud.google.com/sql/docs/postgres/high-availability#HA-configuration\nThe purpose of an HA configuration is to reduce downtime when a zone or instance becomes unavailable. This might happen during a zonal outage, or when an instance runs out of memory. With HA, your data continues to be available to client applications."
      },
      {
        "user": "squishy_fishy",
        "text": "Will you change your answer if the answer D says dataset instead of table?"
      },
      {
        "user": "Mcloudgirl",
        "text": "Your explanation is perfect, thanks"
      },
      {
        "user": "MaxNRG",
        "text": "The best option to meet the ACID compliance and minimal human intervention requirements is to configure a Cloud SQL for PostgreSQL instance with high availability enabled.\nKey reasons:\nCloud SQL for PostgreSQL provides full ACID compliance, unlike Bigtable which provides only atomicity and consistency guarantees.\nEnabling high availability removes the need for manual failover as Cloud SQL will automatically failover to a standby replica if the leader instance goes down.\nPoint-in-time recovery..."
      },
      {
        "user": "[Removed]",
        "text": "I vote for D - BigQuery with multi region configuration.\nAccording to https://cloud.google.com/bigquery/docs/introduction , BigQuery support ACID and automatically replicated for high availability.\n\"\"\"BigQuery stores data using a columnar storage format that is optimized for analytical queries. BigQuery presents data in tables, rows, and columns and provides full support for database transaction semantics (ACID). BigQuery storage is automatically replicated across multiple locations to provid..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 110,
    "topic": "Orchestration",
    "difficulty": 2,
    "question": "You are implementing workflow pipeline scheduling using open source-based tools and GKE. You want a Google managed service and need to accommodate Shared VPC networking. What should you do?",
    "options": [
      "A. Use Dataflow for your workflow pipelines. Use Cloud Run triggers for scheduling.",
      "B. Use Dataflow for your workflow pipelines. Use shell scripts to schedule workflows.",
      "C. Use Cloud Composer in a Shared VPC configuration. Place resources in the host project.",
      "D. Use Cloud Composer in a Shared VPC configuration. Place resources in the service project."
    ],
    "correct": 3,
    "explanation": "Use Cloud Composer in a Shared VPC configuration. Place resources in the service project This central VPC administration across multiple projects enabling security policies and efficient resource sharing without cross-project complexity.",
    "discussion": [
      {
        "user": "AWSandeep",
        "text": "D. Use Cloud Composer in a Shared VPC configuration. Place the Cloud Composer resources in the service project.\nShared VPC requires that you designate a host project to which networks and subnetworks belong and a service project, which is attached to the host project. When Cloud Composer participates in a Shared VPC, the Cloud Composer environment is in the service project.\nReference:\nhttps://cloud.google.com/composer/docs/how-to/managing/configuring-shared-vpc"
      },
      {
        "user": "zellck",
        "text": "D is the answer.\nhttps://cloud.google.com/composer/docs/how-to/managing/configuring-shared-vpc\nShared VPC enables organizations to establish budgeting and access control boundaries at the project level while allowing for secure and efficient communication using private IPs across those boundaries. In the Shared VPC configuration, Cloud Composer can invoke services hosted in other Google Cloud projects in the same organization without exposing services to the public internet."
      },
      {
        "user": "ToiToi",
        "text": "The recommended approach is to place Cloud Composer resources in the host project of the Shared VPC. This centralizes network management, simplifies connectivity, and enhances security by adhering to the principle of least privilege."
      },
      {
        "user": "TVH_Data_Engineer",
        "text": "Placing Cloud Composer resources in the service project can lead to more complex network configurations and management overhead compared to placing them in the host project, which is designed to manage Shared VPC resources."
      },
      {
        "user": "vamgcp",
        "text": "Please correct if I am wrong.. I think it is Option C coz I feel Option D is incorrect because placing the Cloud Composer resources in the service project would not allow you to access resources in the host project."
      },
      {
        "user": "ckanaar",
        "text": "That's answer D though."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 111,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are using BigQuery and Data Studio for a customer-facing dashboard with large quantities of aggregated data. You expect high volume of concurrent users. You need to optimize for quick visualizations with minimal latency. What should you do?",
    "options": [
      "A. Use BigQuery BI Engine with materialized views.",
      "B. Use BigQuery BI Engine with logical views.",
      "C. Use BigQuery BI Engine with streaming data.",
      "D. Use BigQuery BI Engine with authorized views."
    ],
    "correct": 0,
    "explanation": "Use BigQuery BI Engine with materialized views This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "AWSandeep",
        "text": "A. Use BigQuery BI Engine with materialized views."
      },
      {
        "user": "zellck",
        "text": "A is the answer.\nhttps://cloud.google.com/bigquery/docs/materialized-views-intro\nIn BigQuery, materialized views are precomputed views that periodically cache the results of a query for increased performance and efficiency. BigQuery leverages precomputed results from materialized views and whenever possible reads only delta changes from the base tables to compute up-to-date results. Materialized views can be queried directly or can be used by the BigQuery optimizer to process queries to the b..."
      },
      {
        "user": "LPIT",
        "text": "A.\nhttps://cloud.google.com/bigquery/docs/materialized-views-intro\nIn BigQuery, materialized views are precomputed views that periodically cache the results of a query for increased performance and efficiency"
      },
      {
        "user": "MounicaN",
        "text": "use materialized views is better option here"
      },
      {
        "user": "vamgcp",
        "text": "Materialized views are precomputed query results that are stored in memory, allowing for faster retrieval of aggregated data. When you create a materialized view in BigQuery, it stores the results of a query as a table, and subsequent queries that can leverage this materialized view can be significantly faster compared to computing them on the fly."
      },
      {
        "user": "Julionga",
        "text": "I vote A\nhttps://cloud.google.com/bigquery/docs/bi-engine-intro#:~:text=Materialized%20views%20%2D%20Materialized%20views%20in%20BigQuery%20perform%20precomputation%2C%20thereby%20reducing%20query%20time.%20You%20should%20create%20materialized%20views%20to%20improve%20performance%20and%20to%20reduce%20processed%20data%20by%20using%20aggregations%2C%20filters%2C%20inner%20joins%2C%20and%20unnests."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 112,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You are building a model to make clothing recommendations. You know a user's fashion preference is likely to change over time, so you build a data pipeline to stream new data back to the model. How should you use this data to train the model?",
    "options": [
      "A. Continuously retrain the model on just the new data.",
      "B. Continuously retrain the model on a combination of existing data and the new data.",
      "C. Train on the existing data while using the new data as your test set.",
      "D. Train on the new data while using the existing data as your test set."
    ],
    "correct": 1,
    "explanation": "Continuously retrain the model on a combination of existing data and the new data This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "serg3d",
        "text": "I think it should be B because we have to use a combination of old and new test data as well as training data"
      },
      {
        "user": "jagadamba",
        "text": "B, as we need to train the data with new data, so that it will keep learning, and as well as used for test"
      },
      {
        "user": "kino2020",
        "text": "Quoted from that article because it says to build the PiPeLine.\nProducing evaluation metric values using the trained model on a test dataset to assess the model's predictive quality.\nComparing the evaluation metric values produced by your newly trained model to the current model, for example, production model, baseline model, or other business-requirement models. You make sure that the new model produces better performance than the current model before promoting it to production.\nhttps://clou..."
      },
      {
        "user": "samdhimal",
        "text": "B. Continuously retrain the model on a combination of existing data and the new data.\nThis approach will help to ensure that the model remains up-to-date with the latest fashion preferences of the users, while also leveraging the historical data to provide context and improve the accuracy of the recommendations. Retraining the model on a combination of existing and new data will help to prevent the model from being overly influenced by the new data and losing its ability to generalize to user..."
      },
      {
        "user": "GregDT",
        "text": "This article seems to support answer B. https://medium.com/codait/keeping-your-machine-learning-models-up-to-date-f1ead546591b. Here's a quote from this article: \"If you see the accuracy of your model degrading over time, use the new data, or a combination of the new data and old training data to build and deploy a new model.\""
      },
      {
        "user": "Archy",
        "text": "B, continuous training is needed to keep your model upto date"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 113,
    "topic": "Pub/Sub",
    "difficulty": 2,
    "question": "You work for a car manufacturer and have a push subscription in Cloud Pub/Sub that calls a custom HTTPS endpoint. Your custom endpoint keeps getting duplicate messages. What is the most likely cause?",
    "options": [
      "A. The message body for the sensor event is too large.",
      "B. Your custom endpoint has an out-of-date SSL certificate.",
      "C. The Cloud Pub/Sub topic has too many messages published to it.",
      "D. Your custom endpoint is not acknowledging messages within the acknowledgement deadline."
    ],
    "correct": 3,
    "explanation": "Your custom endpoint is not acknowledging messages within the acknowledgement deadline This subscriptions model fan-out and load-balancing patterns; push subscriptions deliver to HTTP endpoints while pull subscriptions provide backpressure control.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "The Answer should be D. The custom endpoint is not acknowledging the message, that is the reason for Pub/Sub to send the message again and again. Not B."
      },
      {
        "user": "MauryaSushil",
        "text": "D : Doubt should be only between B & D. But B is not possible because if SSL is expired then endpoint URL will not receive any messages forget about duplicates. So It should be D for Duplicates."
      },
      {
        "user": "Radhika7983",
        "text": "The correct answer is D. Look for the link\nhttps://cloud.google.com/pubsub/docs/faq\nWhy are there too many duplicate messages?\nPub/Sub guarantees at-least-once message delivery, which means that occasional duplicates are to be expected. However, a high rate of duplicates may indicate that the client is not acknowledging messages within the configured ack_deadline_seconds, and Pub/Sub is retrying the message delivery. This can be observed in the monitoring metrics pubsub.googleapis.com/subscri..."
      },
      {
        "user": "atnafu2020",
        "text": "D\nWhy are there too many duplicate messages?\nPub/Sub guarantees at-least-once message delivery, which means that occasional duplicates are to be expected. However, a high rate of duplicates may indicate that the client is not acknowledging messages within the configured ack_deadline_seconds, and Pub/Sub is retrying the message delivery. This can be observed in the monitoring metrics pubsub.googleapis.com/subscription/pull_ack_message_operation_count for pull subscriptions, and pubsub.googleap..."
      },
      {
        "user": "ganesh2121",
        "text": "D is correct\nAs per google docs- When you do not acknowledge a message before its acknowledgement deadline has expired, Pub/Sub resends the message. As a result, Pub/Sub can send duplicate messages. Use Google Cloud's operations suite to monitor acknowledge operations with the expired response code to detect this condition"
      },
      {
        "user": "FP77",
        "text": "It should be D\nhttps://cloud.google.com/pubsub/docs/troubleshooting#dupes"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 114,
    "topic": "Security",
    "difficulty": 3,
    "question": "Government regulations mandate the protection of clients' PII. You want to follow Google-recommended practices and use service accounts to control access to PII. What should you do?",
    "options": [
      "A. Assign the required IAM roles to every employee, and create a single service account.",
      "B. Use one service account to access Cloud SQL, and use separate service accounts for each human user.",
      "C. Use Cloud Storage. Use one service account shared by all users.",
      "D. Use Cloud Storage. Use multiple service accounts attached to IAM groups to grant appropriate access to each group."
    ],
    "correct": 3,
    "explanation": "Use Cloud Storage This non-human identities for application-to-application authentication and authorization with key management and delegation options.",
    "discussion": [
      {
        "user": "NicolasN",
        "text": "✅[A] is the only acceptable answer.\n❌[B] rejected (no need to elaborate)\n❌[C] and [D] rejected. Why should we be obliged to use Cloud Storage? Other storage options in Google Cloud aren't compliant with \"major data protection standards\"?\n=============================================\n❗[D] has another rejection reason, the following quotes:\n🔸From <https://cloud.google.com/iam/docs/service-accounts>: \"You can add service accounts to a Google group, then grant roles to the group. However, adding..."
      },
      {
        "user": "cetanx",
        "text": "for A: please refer to this link below which suggests \"Sharing a single service account across multiple applications can complicate the management of the service account\" - meaning it's not a best practice.\nhttps://cloud.google.com/iam/docs/best-practices-service-accounts#single-purpose\nAlso, what if we have hundreds of users, does it really make sense to manage each user's IAM individually?\nfor D: it's indeed not one of the best practices but I believe it's much more managable and better than A"
      },
      {
        "user": "juliobs",
        "text": "Why are so many questions like this?\nNone of the answers is best practice."
      },
      {
        "user": "KC_go_reply",
        "text": "Rejecting C + D solely based on Cloud Storage, which CAN be used in this scenario, is not sound reasoning."
      },
      {
        "user": "SuperVee",
        "text": "I could be wrong but I think the wording in D caused this confusion, so it is an English problem. -- \"Use multiple service accounts attached to IAM groups to grant the appropriate access to each group\"\nI believe what D really means is that you can create a group for a bunch of people who only need access to resource A, so attach a Service account to the group and service account only have access to A.\nThen you create another group for another bunch of people who only need access to resource B..."
      },
      {
        "user": "MaxNRG",
        "text": "A single shared service account or granting every employee direct access violates security best practices, so not [A]."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 115,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "You need to migrate a Redis database from on-premises to Memorystore for Redis. You want to follow Google-recommended practices for minimal cost, time and effort. What should you do?",
    "options": [
      "A. Make an RDB backup, use gsutil to copy the RDB file to Cloud Storage, then import into Memorystore.",
      "B. Make a secondary instance on Compute Engine and perform a live cutover.",
      "C. Create a Dataflow job to read the Redis database and write to Memorystore.",
      "D. Write a shell script to migrate the Redis data and create a new Memorystore instance."
    ],
    "correct": 0,
    "explanation": "Make an RDB backup, use gsutil to copy the RDB file to Cloud Storage, then import int This managed Redis and Memcached service improving performance through in-memory caching; sub-millisecond latency.",
    "discussion": [
      {
        "user": "AWSandeep",
        "text": "A. Make an RDB backup of the Redis database, use the gsutil utility to copy the RDB file into a Cloud Storage bucket, and then import the RDB file into the Memorystore for Redis instance.\nThe import and export feature uses the native RDB snapshot feature of Redis to import data into or export data out of a Memorystore for Redis instance. The use of the native RDB format prevents lock-in and makes it very easy to move data within Google Cloud or outside of Google Cloud. Import and export uses ..."
      },
      {
        "user": "zellck",
        "text": "A is the answer.\nhttps://cloud.google.com/memorystore/docs/redis/about-importing-exporting\nThe import and export feature uses the native RDB snapshot feature of Redis to import data into or export data out of a Memorystore for Redis instance. The use of the native RDB format prevents lock-in and makes it very easy to move data within Google Cloud or outside of Google Cloud. Import and export uses Cloud Storage buckets to store RDB files."
      },
      {
        "user": "Atnafu",
        "text": "A\nImport and export uses Cloud Storage buckets to store RDB files.\nhttps://cloud.google.com/memorystore/docs/redis/about-importing-exporting#:~:text=Import%20and%20export%20uses%20Cloud%20Storage%20buckets%20to%20store%20RDB%20files."
      },
      {
        "user": "ducc",
        "text": "A\nhttps://cloud.google.com/memorystore/docs/redis/general-best-practices\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      },
      {
        "user": "AzureDP900",
        "text": "A. Make an RDB backup of the Redis database, use the gsutil utility to copy the RDB file into a Cloud Storage bucket, and then import the RDB file into the Memorystore for Redis instance."
      },
      {
        "user": "gudiking",
        "text": "A\nhttps://cloud.google.com/memorystore/docs/redis/import-data"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 116,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "Your platform generates 100 GB of data daily in millions of structured JSON text files. Your on-premises environment cannot be accessed from the public internet. You want to query and explore the data. What should you do?",
    "options": [
      "A. Use Cloud Scheduler to copy data daily to Cloud Storage. Use BigQuery Data Transfer Service to import.",
      "B. Use a Transfer Appliance to copy data to Cloud Storage. Use BigQuery Data Transfer Service.",
      "C. Use Transfer Service for on-premises data to copy to Cloud Storage. Use BigQuery Data Transfer Service to import.",
      "D. Use BigQuery Data Transfer Service dataset copy to transfer all data into BigQuery."
    ],
    "correct": 2,
    "explanation": "Use Transfer Service for on-premises data to copy to Cloud Storage This ensures data integrity and compliance during transfer.",
    "discussion": [
      {
        "user": "muhusman",
        "text": "Therefore, the correct option is C. Use Transfer Service for on-premises data to copy data from your on-premises environment to Cloud Storage. Use the BigQuery Data Transfer Service to import data into BigQuery.\nOption A is incorrect because Cloud Scheduler is not designed for data transfer, but rather for scheduling the execution of Cloud Functions, Cloud Run, or App Engine applications.\nOption B is incorrect because Transfer Appliance is designed for large-scale data transfers from on-premi..."
      },
      {
        "user": "cetanx",
        "text": "\"Your on-premises environment cannot be accessed from the public internet\" statement suggests that inbound traffic from internet is NOT allowed however, it doesn't mean that outbound internet connectivity from on-prem resources is not possible. Any on-prem system with outbound internet access can copy/transfer the CSV files.\nCSV files are located on a filesystem, therefore you cannot copy them with BQ Transfer Service.\nLeaving only possible option;\nfirst copy CSVs to cloud storage\nthen run BQ..."
      },
      {
        "user": "wjtb",
        "text": "I would say B. It is the ONLY option that is possible without data being accessible over the public (unless we assume that a direct interconnect is already set up, which seems farfetched). Also, nowhere does it say how up-to-date the data needs to be that we are querying or how often we need to query, only that the data increases in size by 100gb per day (indicating that its going to be a lot of data)"
      },
      {
        "user": "zellck",
        "text": "C is the answer.\nhttps://cloud.google.com/architecture/migration-to-google-cloud-transferring-your-large-datasets#storage-transfer-service-for-large-transfers-of-on-premises-data\nStorage Transfer Service for on-premises data enables transfers from network file system (NFS) storage to Cloud Storage.\nhttps://cloud.google.com/bigquery/docs/cloud-storage-transfer-overview\nThe BigQuery Data Transfer Service for Cloud Storage lets you schedule recurring data loads from Cloud Storage buckets to BigQ..."
      },
      {
        "user": "Wasss123",
        "text": "I will go with C"
      },
      {
        "user": "Takshashila",
        "text": "the correct option is C"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 117,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "A TensorFlow ML model on Compute Engine VMs (n2-standard-32) takes two days to train. The model has custom TensorFlow operations that must run partially on a CPU. You want to reduce training time cost-effectively. What should you do?",
    "options": [
      "A. Change the VM type to n2-highmem-32.",
      "B. Change the VM type to e2-standard-32.",
      "C. Train the model using a VM with a GPU hardware accelerator.",
      "D. Train the model using a VM with a TPU hardware accelerator."
    ],
    "correct": 2,
    "explanation": "Train the model using a VM with a GPU hardware accelerator This IaaS offering with granular control over instances, custom machine types, and preemptible VMs for cost optimization.",
    "discussion": [
      {
        "user": "MaxNRG",
        "text": "The best way to reduce the TensorFlow training time in a cost-effective manner is to use a VM with a GPU hardware accelerator. TensorFlow can take advantage of GPUs to significantly speed up training time for many models.\nSpecifically, option C is the best choice.\nChanging the VM to another standard type like n2-highmem-32 or e2-standard-32 (options A and B) may provide some improvement, but likely not a significant speedup.\nUsing a TPU (option D) could speed up training, but TPUs are more co..."
      },
      {
        "user": "jkhong",
        "text": "Cost effective - among the choices, it is cheaper to have a temporary accelerator instead of increasing our VM cost for an indefinite amount of time\nD -> TPU accelerator cannot support custom operations"
      },
      {
        "user": "spicebits",
        "text": "https://cloud.google.com/tpu/docs/intro-to-tpu#when_to_use_tpus"
      },
      {
        "user": "zellck",
        "text": "C is the answer.\nhttps://cloud.google.com/tpu/docs/tpus#when_to_use_tpus\nGPUs\n- Models with a significant number of custom TensorFlow operations that must run at least partially on CPUs"
      },
      {
        "user": "Atnafu",
        "text": "The model has custom TensorFlow operations that must run partially on a CPU. is the key for GPU"
      },
      {
        "user": "wences",
        "text": "key pjrse is \"run partially on a CPU\" from https://cloud.google.com/tpu/docs/intro-to-tpu#when_to_use_tpus refers to GPU"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 118,
    "topic": "ML/Architecture",
    "difficulty": 2,
    "question": "You want to create a ML model using BigQuery ML and create an endpoint using Vertex AI. This will process continuous streaming data in near-real time from multiple vendors. The data may contain invalid values. What should you do?",
    "options": [
      "A. Create a new BigQuery dataset and use streaming inserts from multiple vendors. Configure BigQuery ML model to use the ingestion dataset.",
      "B. Use BigQuery streaming inserts where your BigQuery ML model is deployed.",
      "C. Create a Pub/Sub topic and send all vendor data. Connect a Cloud Function to process data and store in BigQuery.",
      "D. Create a Pub/Sub topic and send all vendor data. Use Dataflow to process and sanitize data and stream to BigQuery."
    ],
    "correct": 3,
    "explanation": "Create a Pub/Sub topic and send all vendor data This SQL interface to ML models enabling predictions directly from BigQuery without data export; simplifies ML workflows.",
    "discussion": [
      {
        "user": "987af6b",
        "text": "The discussion is where the real answer is."
      },
      {
        "user": "vamgcp",
        "text": "Option D -Dataflow provides a scalable and flexible way to process and clean the incoming data in real-time before loading it into BigQuery."
      },
      {
        "user": "odacir",
        "text": "D is the best option to sanitize the data to its D"
      },
      {
        "user": "jkhong",
        "text": "Better to use pubsub for streaming and reading message data\nDataflow ParDo can perform filtering of data"
      },
      {
        "user": "anyone_99",
        "text": "Why is the answer A? After paying $44 I am getting wrong answers."
      },
      {
        "user": "AzureDP900",
        "text": "D. Create a Pub/Sub topic and send all vendor data to it. Use Dataflow to process and sanitize the Pub/Sub data and stream it to BigQuery."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 119,
    "topic": "Architecture",
    "difficulty": 3,
    "question": "You have a data processing application on GKE. Containers need latest configurations from a container registry. GKE nodes need GPUs, local SSDs, and 8 Gbps bandwidth. You want to efficiently provision infrastructure. What should you do?",
    "options": [
      "A. Use Compute Engine startup scripts to pull container images, and use gcloud commands.",
      "B. Use Cloud Build to schedule a job using Terraform to provision infrastructure and launch with current container images.",
      "C. Use GKE to autoscale containers, and use gcloud commands.",
      "D. Use Dataflow to provision the data pipeline, and use Cloud Scheduler."
    ],
    "correct": 1,
    "explanation": "Use Cloud Build to schedule a job using Terraform to provision infrastructure and lau This managed Kubernetes service handling upgrades, security patches, and auto-scaling of node pools; simplifies container orchestration.",
    "discussion": [
      {
        "user": "MaxNRG",
        "text": "B is the best option to efficiently provision and manage the deployment process for this data processing application on GKE:"
      },
      {
        "user": "hauhau",
        "text": "Maybe B\nref: https://cloud.google.com/architecture/managing-infrastructure-as-code"
      },
      {
        "user": "Atnafu",
        "text": "Sorry I meant B"
      },
      {
        "user": "MaxNRG",
        "text": "• Cloud Build allows you to automate the building, testing, and deployment of your application using Docker containers.\n• Using Terraform with Cloud Build provides Infrastructure as Code capabilities to provision the GKE cluster with GPUs, SSDs, and network bandwidth.\n• Terraform can be configured to pull the latest container images from the registry when deploying.\n• Cloud Build triggers provide event-based automation to rebuild and redeploy when container images are updated.\n• This provides..."
      },
      {
        "user": "MaxNRG",
        "text": "So using Cloud Build with Terraform templates provides the most efficient way to provision and deploy this data processing application on GKE."
      },
      {
        "user": "anyone_99",
        "text": "another wrong answer?"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 120,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You need ads data to serve AI models and historical data for analytics. Longtail and outlier data points need to be identified. You want to cleanse data in near-real time before running through AI models. What should you do?",
    "options": [
      "A. Use Cloud Storage as a data warehouse, shell scripts for processing, and BigQuery to create views.",
      "B. Use Dataflow to identify longtail and outlier data points programmatically, with BigQuery as a sink.",
      "C. Use BigQuery to ingest, prepare, and then analyze the data, and run queries to create views.",
      "D. Use Cloud Composer to identify longtail and outlier data points, then output to BigQuery."
    ],
    "correct": 1,
    "explanation": "Use Dataflow to identify longtail and outlier data points programmatically, with BigQ This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "Y___ash",
        "text": "Dataflow for Real-Time Processing: Dataflow allows you to process data in near-real time, making it well-suited for identifying longtail and outlier data points as they occur. You can use Dataflow to implement custom data cleansing and outlier detection algorithms that operate on streaming data.\nBigQuery as a Sink: Using BigQuery as a sink allows you to store the cleaned and processed data efficiently for further analysis or use in AI models. Dataflow can write the cleaned data to BigQuery ta..."
      },
      {
        "user": "MaxNRG",
        "text": "B is the best option for cleansing the ads data in near real-time before running it through AI models.\nThe key reasons are:\n• Dataflow allows for stream processing of data in near real-time. This allows you to identify and cleanse longtail and outlier data points as the data is streamed in.\n• Dataflow has built-in capabilities for detecting and handling outliers and anomalies in streaming data. This makes it well-suited for programmatically identifying longtail and outlier data points.\n• Usin..."
      },
      {
        "user": "JyoGCP",
        "text": "B. Use Dataflow to identify longtail and outlier data points programmatically, with BigQuery as a sink."
      },
      {
        "user": "datapassionate",
        "text": "B. Use Dataflow to identify longtail and outlier data points programmatically, with BigQuery as a sink."
      },
      {
        "user": "Matt_108",
        "text": "B: Dataflow, solves exactly the use case described"
      },
      {
        "user": "MaxNRG",
        "text": "So B is the best architecture here to meet the needs of near real-time cleansing, identification of longtail/outlier data points, and integration with BigQuery for serving AI models."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 121,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are collecting IoT sensor data from millions of devices. Your access pattern is based on recent data, filtered by location_id and device_version. You want to optimize queries for cost and performance. How should you structure your data?",
    "options": [
      "A. Partition by create_date, location_id, and device_version.",
      "B. Partition by create_date, cluster by location_id, and device_version.",
      "C. Cluster by create_date, location_id, and device_version.",
      "D. Cluster by create_date, partition by location_id, and device_version."
    ],
    "correct": 1,
    "explanation": "Partition by create_date, cluster by location_id, and device_version This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "MaxNRG",
        "text": "1. Partitioning the data by create_date will allow BigQuery to prune partitions that are not relevant to the query by date.\n2. Clustering the data by location_id and device_version within each partition will keep related data close together and optimize the performance of filters on those columns.\nThis provides both the pruning benefits of partitioning and locality benefits of clustering for filters on multiple columns.\nThe query provided indicates that the access pattern is primarily based o..."
      },
      {
        "user": "Matt_108",
        "text": "B: Partitioning makes date-related querying efficient, clustering will keep relevant data close together and optimize the performance of filters for the cluster columns"
      },
      {
        "user": "Smakyel79",
        "text": "Only correct answer is B, you can only partition by one field, and you can only cluster on partitioned tables"
      },
      {
        "user": "raaad",
        "text": "Answer is B:\n- Partitioning the table by create_date allows us to efficiently query data based on time, which is common in access patterns that prioritize recent data.\n- Clustering the table by location_id and device_version further organizes the data within each partition, making queries filtered by these columns more efficient and cost-effective."
      },
      {
        "user": "e70ea9e",
        "text": "The best answer is B. Partition table data by create_date, cluster table data by location_id, and device_version.\nHere's a breakdown of why this structure is optimal:\nPartitioning by create_date:\nAligns with query pattern: Filters for recent data based on create_date, so partitioning by this column allows BigQuery to quickly narrow down the data to scan, reducing query costs and improving performance.\nManages data growth: Partitioning effectively segments data by date, making it easier to man..."
      },
      {
        "user": "JyoGCP",
        "text": "B. Partition table data by create_date, cluster table data by location_id, and device_version."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 122,
    "topic": "Architecture",
    "difficulty": 3,
    "question": "A live TV show asks viewers to cast votes during a 3-minute period. You must ensure the platform can handle the load and all votes are processed. You must display partial results while voting is open and count votes exactly once after voting closes while optimizing cost. What should you do?",
    "options": [
      "A. Create a Memorystore instance with HA configuration.",
      "B. Create a Cloud SQL for PostgreSQL database with HA and multiple read replicas.",
      "C. Write votes to a Pub/Sub topic and have Cloud Functions subscribe to it and write votes to BigQuery.",
      "D. Write votes to a Pub/Sub topic and load into both Bigtable and BigQuery via a Dataflow pipeline. Query Bigtable for real-time results and BigQuery for later analysis."
    ],
    "correct": 3,
    "explanation": "Write votes to a Pub/Sub topic and load into both Bigtable and BigQuery via a Dataflo This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "MaxNRG",
        "text": "Since cost optimization and minimal latency are key requirements, option D is likely the best choice to meet all the needs:\nThe key reasons option D works well:\nUsing Pub/Sub to ingest votes provides scalable, reliable transport.\nLoading into Bigtable and BigQuery provides both:\nLow latency reads from Bigtable for real-time results.\nCost effective storage in BigQuery for longer term analysis.\nShutting down Bigtable after voting concludes reduces costs.\nBigQuery remains available for cost-opti..."
      },
      {
        "user": "e70ea9e",
        "text": "Handling High-Volume Data Ingestion:\nPub/Sub: Decouples vote collection from processing, ensuring scalability and resilience under high load.\nDataflow: Efficiently ingests and processes large data streams, scaling as needed.\nReal-Time Results with Exactly-Once Processing:\nBigtable: Optimized for low-latency, high-throughput reads and writes, ideal for real-time partial results.\nExactly-Once Semantics: Dataflow guarantees each vote is processed only once, ensuring accurate counts.\nCost Optimiz..."
      },
      {
        "user": "f74ca0c",
        "text": "Modern Capabilities: BigQuery’s advancements make it suitable for both real-time and historical querying.\nCost Efficiency: No need to spin up and shut down a Bigtable instance.\nSimplified Workflow: Real-time and post-event data are stored in the same system, reducing the need to synchronize or transfer data between systems."
      },
      {
        "user": "raaad",
        "text": "Answer is D:\n- Google Cloud Pub/Sub can manage the high-volume data ingestion.\n- Google Cloud Dataflow can efficiently process and route data to both Bigtable and BigQuery.\n- Bigtable is excellent for handling high-throughput writes and reads, making it suitable for real-time vote tallying.\n- BigQuery is ideal for exact vote counting and deeper analysis once voting concludes."
      },
      {
        "user": "JyoGCP",
        "text": "D. Write votes to a Pub/Sub topic and load into both Bigtable and BigQuery via a Dataflow pipeline. Query Bigtable for real-time results and BigQuery for later analysis. Shut down the Bigtable instance when voting concludes."
      },
      {
        "user": "Matt_108",
        "text": "D, i do agree with everything MaxNRG said."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 123,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "A shipping company has live package-tracking data sent to Kafka in real time loaded into BigQuery. The table was created with ingest-date partitioning. You need to copy all the data to a new clustered table. What should you do?",
    "options": [
      "A. Re-create the table using data partitioning on the package delivery date.",
      "B. Implement clustering in BigQuery on the package-tracking ID column.",
      "C. Implement clustering in BigQuery on the ingest date column.",
      "D. Tier older data onto Cloud Storage files and create an external BigQuery table."
    ],
    "correct": 1,
    "explanation": "Option A changes partitioning but doesn't create a clustered table. Option B correctly clusters on the high-cardinality package-tracking ID column.",
    "discussion": [
      {
        "user": "e70ea9e",
        "text": "Query Focus: Analysts are interested in geospatial trends within individual package lifecycles. Clustering by package-tracking ID physically co-locates related data, significantly improving query performance for these analyses.\nAddressing Slow Queries: Clustering addresses the query slowdown issue by optimizing data organization for the specific query patterns.\nPartitioning vs. Clustering:\nPartitioning: Divides data into segments based on a column's values, primarily for managing large datase..."
      },
      {
        "user": "MaxNRG",
        "text": "This looks like Question #166\nOption B, implementing clustering in BigQuery on the package-tracking ID column, seems the most appropriate. It directly addresses the query slowdown issue by reorganizing the data in a way that aligns with the analysts' query patterns, leading to more efficient and faster query execution."
      },
      {
        "user": "desertlotus1211",
        "text": "Almost the same at #166:"
      },
      {
        "user": "apoio.certificacoes.",
        "text": "You don't need to recreate a table to cluster it, contrary to partitioning, where you have to create a new table with the old data (migration)\n> If you alter an existing non-clustered table to be clustered, the existing data is not automatically clustered. Only new data that's stored using the clustered columns is subject to automatic reclustering.\nhttps://cloud.google.com/bigquery/docs/clustered-tables#limitations"
      },
      {
        "user": "JyoGCP",
        "text": "B. Implement clustering in BigQuery on the package-tracking ID column."
      },
      {
        "user": "datapassionate",
        "text": "B. Implement clustering in BigQuery on the package-tracking ID column."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 124,
    "topic": "Data Processing",
    "difficulty": 2,
    "question": "Your company uses a proprietary system to send inventory data every 6 hours. Transmitted data includes a payload and timestamp. If there are concerns, the system re-transmits. How should you deduplicate the data most efficiently?",
    "options": [
      "A. Assign GUIDs to each data entry.",
      "B. Compute the hash value of each data entry, and compare with all historical data.",
      "C. Store each entry as primary key in a separate database and apply an index.",
      "D. Maintain a database table to store the hash value and other metadata for each data entry."
    ],
    "correct": 3,
    "explanation": "Maintain a database table to store the hash value and other metadata for each data entry This enables efficient transformation at scale with automatic resource management.",
    "discussion": [
      {
        "user": "dg63",
        "text": "The best answer is \"A\".\nAnswer \"D\" is not as efficient or error-proof due to two reasons\n1. You need to calculate hash at sender as well as at receiver end to do the comparison. Waste of computing power.\n2. Even if we discount the computing power, we should note that the system is sending inventory information. Two messages sent at different can denote same inventory level (and thus have same hash). Adding sender time stamp to hash will defeat the purpose of using hash as now retried messages..."
      },
      {
        "user": "[Removed]",
        "text": "Answer: D\nDescription: Using Hash values we can remove duplicate values from a database. Hashvalues will be same for duplicate data and thus can be easily rejected."
      },
      {
        "user": "retax",
        "text": "If the goal is to ensure at least ONE of each pair of entries is inserted into the db, then how is assigning a GUID to each entry resolving the duplicates? Keep in mind if the 1st entry fails, then hopefully the 2nd (duplicate) is successful."
      },
      {
        "user": "ralf_cc",
        "text": "A - In D, same message with different timestamp will have different hash, though the message content is the same."
      },
      {
        "user": "omakin",
        "text": "Strong Answer is A - in another question on the gcp sample questions: the correct answer to that particular question was \"You are building a new real-time data warehouse for your company and will use BigQuery streaming inserts. There is no guarantee that data will only be sent in once but you do have a unique ID for each row of data and an event timestamp. You want to ensure that duplicates are not included while interactively querying data. Which query type should you use?\"\nThis means you ne..."
      },
      {
        "user": "medeis_jar",
        "text": "Transmitted data includes fields and timestamp of transmission.\nSo, hash value changes with re-transmission ==> Option B & D are wrong."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 125,
    "topic": "Dataplex",
    "difficulty": 2,
    "question": "You are designing a data mesh on Google Cloud with multiple data engineering teams. The typical pattern is landing files in Cloud Storage, transforming in Cloud Storage and BigQuery, and storing curated data in BigQuery. You need to configure Dataplex. What should you do?",
    "options": [
      "A. Create a single Dataplex virtual lake and a single zone.",
      "B. Create a single Dataplex virtual lake and a single zone. Build separate assets for each data product.",
      "C. Create a Dataplex virtual lake for each data product, and create a single zone for landing, raw, and curated data.",
      "D. Create a Dataplex virtual lake for each data product, and create multiple zones for landing, raw, and curated data."
    ],
    "correct": 3,
    "explanation": "Create a Dataplex virtual lake for each data product, and create multiple zones for l This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "MaxNRG",
        "text": "The best approach is to create a Dataplex virtual lake for each data product, with multiple zones for landing, raw, and curated data. Then provide the data engineering teams with access only to the zones they need within the virtual lake assigned to their product.\nTo enable teams to easily share curated data products, you should use cross-lake sharing in Dataplex. This allows curated zones to be shared across virtual lakes while maintaining data isolation for other zones."
      },
      {
        "user": "MaxNRG",
        "text": "So the steps would be:\n1. Create a Dataplex virtual lake for each data product.\n2. Within each lake, create separate zones for landing, raw, and curated data.\n3. Provide each data engineering team with access only to the zones they need within their assigned virtual lake.\n4. Configure cross-lake sharing on the curated data zones to share curated data products between teams.\nThis provides isolation and access control between teams for raw data while enabling easy sharing of curated data produc..."
      },
      {
        "user": "Smakyel79",
        "text": "I believe the answer is B, but there is a misspelling in the answer, should say \"create multiple zones\""
      },
      {
        "user": "tibuenoc",
        "text": "Because it's the best practice is separated zones. One zone for landing, raw and curated.\nThe answer B - has this part that excluded it \"create a single zone to contain landing\"\nThe correct awser is D"
      },
      {
        "user": "Ed_Kim",
        "text": "The answer is D"
      },
      {
        "user": "e70ea9e",
        "text": "Virtual Lake per Data Product: Each virtual lake acts as a self-contained domain for a specific data product, aligning with the data mesh principle of decentralized ownership and responsibility.\nTeam Autonomy: Teams have full control over their virtual lake, enabling independent development, management, and sharing of their data products.\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 126,
    "topic": "BigQuery/DR",
    "difficulty": 2,
    "question": "You are using BigQuery with a regional dataset that includes a table with the daily sales volumes. This table is updated multiple times per day. You need to protect your sales table in case of regional failures with a recovery point objective (RPO) of less than 24 hours, while keeping costs to a minimum. What should you do?",
    "options": [
      "A. Schedule a daily export of the table to a Cloud Storage dual or multi-region bucket.",
      "B. Schedule a daily copy of the dataset to a backup region.",
      "C. Schedule a daily BigQuery snapshot of the table.",
      "D. Modify ETL job to load the data into both the current and another backup region."
    ],
    "correct": 0,
    "explanation": "A is correct. Exporting to a dual/multi-region GCS bucket provides regional failure protection at minimal cost (GCS storage is much cheaper than BQ storage). A daily export meets the <24h RPO requirement. C fails because snapshots stay in the same region. D is overkill — dual-region ETL doubles compute and storage costs for near-real-time RPO that was never required. B works but costs more than GCS.",
    "discussion": [
      {
        "user": "22c1725",
        "text": "Not 'C' snapchot are stored in the same region."
      },
      {
        "user": "desertlotus1211",
        "text": "almost the same as 211, 211 says multi-region vs regional..."
      },
      {
        "user": "Parandhaman_Margan",
        "text": "Meets the RPO requirement (< 24 hours)\nCost-effective solution\nQuick recovery from regional failures"
      },
      {
        "user": "MarcoPellegrino",
        "text": "https://cloud.google.com/blog/topics/developers-practitioners/backup-disaster-recovery-strategies-bigquery\nGoogle presents both A and D\nWhy A:\n- Cost: Lower. GCS storage is significantly cheaper than BigQuery storage. You pay for storage in GCS and minimal egress charges when exporting.\n- Complexity: Simpler. You schedule a daily export job. Restoring involves importing from GCS to BigQuery in another region.\n- Consistency: Easier to manage. The export process creates a consistent snapshot of the data at the time of export. You might have some latency (up to 24 hours in this scenario), but the data within the export is consistent.\n- RPO: Meets the requirement. A daily export ensures an RPO of less than 24 hours.\n- RTO: Depends on the restore process from GCS to BigQuery. You can pre-provision slots in the backup region to minimize restore time."
      },
      {
        "user": "FireAtMe",
        "text": "Both A and B works. But it is cheaper to save data in GCS."
      },
      {
        "user": "joelcaro",
        "text": "Opción D: Modify ETL job to load the data into both the current and another backup region\nEvaluación:\nAjustar el ETL para escribir en dos tablas (una en la región principal y otra en una región de respaldo) asegura que los datos estén disponibles en ambas ubicaciones casi en tiempo real.\nEsto garantiza un RPO de menos de 24 horas, ya que las actualizaciones intradía se reflejan en ambas regiones.\nAunque podría aumentar los costos de almacenamiento por duplicar los datos, es la solución más efectiva y directa para proteger contra fallos regionales."
      }
    ],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 318,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Opción D: Modify ETL job to load the data into both the current and another backup region\nEvaluación:\nAjustar el ETL para escribir en dos tablas (una en la región principal y otra en una región de respaldo) asegura que los datos estén disponibles en ambas ubicaciones casi en tiem"
  },
  {
    "id": 127,
    "topic": "Dataflow/Networking",
    "difficulty": 2,
    "question": "You are troubleshooting your Dataflow pipeline. Workers cannot communicate with one another. Your networking team relies on network tags to define firewall rules. What should you do?",
    "options": [
      "A. Determine whether your Dataflow pipeline has a custom network tag set.",
      "B. Determine whether there is a firewall rule to allow traffic on TCP ports 12345 and 12346 for the Dataflow network tag.",
      "C. Determine whether there is a firewall rule for TCP ports 12345 and 12346 on the subnet used by Dataflow workers.",
      "D. Determine whether your Dataflow pipeline is deployed with external IP address option enabled."
    ],
    "correct": 1,
    "explanation": "Determine whether there is a firewall rule to allow traffic on TCP ports 12345 and 12 This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "MaxNRG",
        "text": "The best approach would be to check if there is a firewall rule allowing traffic on TCP ports 12345 and 12346 for the Dataflow network tag.\nDataflow uses TCP ports 12345 and 12346 for communication between worker nodes. Using network tags and associated firewall rules is a Google-recommended security practice for controlling access between Compute Engine instances like Dataflow workers.\nSo the key things to check would be:\n1. Ensure your Dataflow pipeline is using the Dataflow network tag on ..."
      },
      {
        "user": "Smakyel79",
        "text": "Because network tags are used and Dataflow uses TCP ports 12345 and 12346 as stated on\nhttps://cloud.google.com/dataflow/docs/guides/routes-firewall"
      },
      {
        "user": "raaad",
        "text": "This option focuses directly on ensuring that the firewall rules are set up correctly for the network tags used by Dataflow worker nodes. It specifically addresses the potential issue of worker nodes not being able to communicate due to restrictive firewall rules blocking the necessary ports."
      },
      {
        "user": "e70ea9e",
        "text": "Focus on Network Tags:\nAdheres to the recommended practice of using network tags for firewall configuration, enhancing security and flexibility.\nAvoids targeting specific subnets, which can be less secure and harder to manage."
      },
      {
        "user": "JyoGCP",
        "text": "B. Determine whether there is a firewall rule set to allow traffic on TCP ports 12345 and 12346 for the Dataflow network tag."
      },
      {
        "user": "Matt_108",
        "text": "B, check if there is a firewall rule allowing traffic on TCP ports 12345 and 12346 for the Dataflow network tag."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 128,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "Your company's BigQuery customer_order table has 10 PB of data. You need a dashboard with country_name and username filters. The dashboard is slow. How should you redesign the table?",
    "options": [
      "A. Cluster the table by country and username fields.",
      "B. Cluster by country field, and partition by username field.",
      "C. Partition by country and username fields.",
      "D. Partition by _PARTITIONTIME."
    ],
    "correct": 0,
    "explanation": "Cluster the table by country and username fields This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "datapassionate",
        "text": "Correct answer: A. Cluster the table by country and username fields.\nWhy not B and C - > Intiger is required for partitioning\nhttps://cloud.google.com/bigquery/docs/partitioned-tables#integer_range"
      },
      {
        "user": "raaad",
        "text": "- Clustering organizes the data based on the specified columns (in this case, country_name and username).\n- When a query filters on these columns, BigQuery can efficiently scan only the relevant parts of the table"
      },
      {
        "user": "JyoGCP",
        "text": "If country is represented by an integer code, then partition by country and cluster by username would be a better solution. As country code is a string, available best solution is \"A. Cluster the table by country and username fields.\""
      },
      {
        "user": "Matt_108",
        "text": "A: the fields are both strings, which are not supported for partitioning. Moreover, the fields are regularly used in filters, which is where clustering really improves performance"
      },
      {
        "user": "e70ea9e",
        "text": "country and username --> cluster"
      },
      {
        "user": "chambg",
        "text": "Yes but the partition is done on username field which has 10 million values. Since a BQ table can only have 4000 it is not suitable"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 129,
    "topic": "Memorystore",
    "difficulty": 2,
    "question": "You have a Standard Tier Memorystore for Redis instance in production. You need to simulate a failover in the most accurate DR situation with no impact on production data. What should you do?",
    "options": [
      "A. Create a Standard Tier Memorystore in dev environment. Initiate manual failover using limited-data-loss mode.",
      "B. Create a Standard Tier Memorystore in dev environment. Initiate manual failover using force-data-loss mode.",
      "C. Increase one replica in production. Initiate manual failover using force-data-loss mode.",
      "D. Initiate manual failover using limited-data-loss mode on the production instance."
    ],
    "correct": 1,
    "explanation": "Create a Standard Tier Memorystore in dev environment This managed Redis and Memcached service improving performance through in-memory caching; sub-millisecond latency.",
    "discussion": [
      {
        "user": "MaxNRG",
        "text": "The best option is B - Create a Standard Tier Memorystore for Redis instance in a development environment. Initiate a manual failover by using the force-data-loss data protection mode.\nThe key points are:\n• The failover should be tested in a separate development environment, not production, to avoid impacting real data.\n• The force-data-loss mode will simulate a full failover and restart, which is the most accurate test of disaster recovery.\n• Limited-data-loss mode only fails over reads whic..."
      },
      {
        "user": "tibuenoc",
        "text": "https://cloud.google.com/memorystore/docs/redis/about-manual-failover"
      },
      {
        "user": "desertlotus1211",
        "text": "Answer A is best suited for an 'accurate disaster recovery' scenario...\nlimited-data-loss mode is Google’s recommended failover simulation mode:\nPromotes the replica.\nAttempts to minimize data loss (vs. force failover).\nMimics a realistic Redis failover due to a zonal outage or instance crash."
      },
      {
        "user": "Parandhaman_Margan",
        "text": "Initiate a manual failover by using the limited-data-loss data protection mode to the Memorystore for Redis instance in the production environment."
      },
      {
        "user": "desertlotus1211",
        "text": "did you read this part? ' ensure that the failover has no impact on production data'....\nAnswer D is wrong."
      },
      {
        "user": "SamuelTsch",
        "text": "The question says \"no impact on production data\" Thus, the best practice is about simulating in a different environment. force-data-loss mode covers the most accurate disaster recovery situation. (https://cloud.google.com/memorystore/docs/redis/about-manual-failover)"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 130,
    "topic": "Security",
    "difficulty": 3,
    "question": "You are administering a BigQuery dataset that uses a CMEK. You need to share the dataset with a partner organization that does not have access to your CMEK. What should you do?",
    "options": [
      "A. Provide the partner organization a copy of your CMEKs to decrypt the data.",
      "B. Export the tables to parquet files to a Cloud Storage bucket and grant storageinsights.viewer role.",
      "C. Copy the tables to a dataset without CMEKs. Create an Analytics Hub listing for this dataset.",
      "D. Create an authorized view that contains the CMEK to decrypt the data."
    ],
    "correct": 2,
    "explanation": "Copy the tables to a dataset without CMEKs This enforces least-privilege access control and reduces unauthorized data exposure.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Create a copy of the necessary tables into a new dataset that doesn't use CMEK, ensuring the data is accessible without requiring the partner to have access to the encryption key.\n- Analytics Hub can then be used to share this data securely and efficiently with the partner organization, maintaining control and governance over the shared data."
      },
      {
        "user": "e70ea9e",
        "text": "Preserves Key Confidentiality:\nAvoids sharing your CMEK with the partner, upholding key security and control.\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 131,
    "topic": "Dataflow/Networking",
    "difficulty": 2,
    "question": "You are developing an Apache Beam pipeline to extract data from a Cloud SQL instance using JdbcIO. The Cloud SQL instance in Project B has no public IP. After deploying, the pipeline failed due to connection failure. You want to resolve this without going through the public internet. What should you do?",
    "options": [
      "A. Set up VPC Network Peering between Project A and Project B. Add a firewall rule to allow the peered subnet range.",
      "B. Turn off the external IP addresses on the Dataflow worker. Enable Cloud NAT in Project A.",
      "C. Add the external IP addresses of the Dataflow worker as authorized networks in the Cloud SQL instance.",
      "D. Set up VPC Network Peering between Project A and Project B. Create a Compute Engine instance without external IP in Project B as a proxy."
    ],
    "correct": 3,
    "explanation": "VPC Peering is non-transitive. Project A cannot route through Project B's peering to the Google-managed Cloud SQL VPC. A proxy VM in Project B is the standard workaround.",
    "discussion": [
      {
        "user": "aoifneofi_ef",
        "text": "It is a tie between A and D.\nOption A will definitely provide necessary connectivity but is less secure as access is enabled to \"all instances\". Which i feel is unnecessary considering industry best practices.\nOption D provides the necessary connectivity but brings in the unnecessary overhead of managing an extra VM and introduces a bit of extra complexity.\nSince the question emphasises on data not going through public internet(which is satisfied in both options), i would prioritise security ..."
      },
      {
        "user": "clouditis",
        "text": "A looks to be the best out of the 4, D is complicated involving Compute Engine which is unnecessary making it cumbersome to address the problem"
      },
      {
        "user": "chrissamharris",
        "text": "A - The requirement for a proxy is un-necessary:\nhttps://cloud.google.com/sql/docs/mysql/private-ip#multiple_vpc_connectivity"
      },
      {
        "user": "MaxNRG",
        "text": "D is the correct solution.\nTo allow the Dataflow workers in Project A to connect to the private Cloud SQL instance in Project B, you need to set up VPC Network Peering between the two projects.\nThen create a Compute Engine instance without external IP in Project B on the peered subnet. This instance can serve as a proxy server to connect to the private Cloud SQL instance.\nThe Dataflow workers can connect through the peered network to the proxy instance, which then connects to Cloud SQL. This ..."
      },
      {
        "user": "BIGQUERY_ALT_ALT",
        "text": "Option D is the correct answer. The reason is you cannot access cloud sql or alloydb instances from a peered vpc connection as they will be hosted in service project not in Project B. The VPC Peering doesn't give transitive routing so accessing cloud sql directly is not possible without a proxy vm. https://cloud.google.com/vpc/docs/vpc-peering#spec-general"
      },
      {
        "user": "71083a7",
        "text": "\"all instances\" freaks me out"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 132,
    "topic": "Security",
    "difficulty": 3,
    "question": "You have a BigQuery table with customer data including sensitive information. You need to share data with analytics and consumer support teams. Analytics needs all data but not sensitive columns. Consumer support needs all columns but not inactive customers. After implementing policy tags, analytics team still has access to sensitive columns. What should you do? (Choose two.)",
    "options": [
      "A. Create two separate authorized datasets.",
      "B. Ensure analytics team members do not have the Data Catalog Fine-Grained Reader role for the policy tags.",
      "C. Replace the authorized dataset with an authorized view.",
      "D. Remove the bigquery.dataViewer role from the analytics team on the authorized datasets.",
      "E. Enforce access control in the policy tag taxonomy."
    ],
    "correct": [
      1,
      4
    ],
    "explanation": "Ensure analytics team members do not have the Data Catalog Fine-Grained Reader role f This enforces least-privilege access control and reduces unauthorized data exposure.",
    "discussion": [
      {
        "user": "datapassionate",
        "text": "B& E\nhttps://cloud.google.com/bigquery/docs/column-level-security-intro"
      },
      {
        "user": "GCP001",
        "text": "B & E\nB - It will ensure they don't have access to secure columns\nE- It will allow to enforce column level security\nRef - https://cloud.google.com/bigquery/docs/column-level-security-intro"
      },
      {
        "user": "MaxNRG",
        "text": "A & B\nThe current setup is not effective because the data analytics team still has access to the sensitive columns despite using an authorized dataset and policy tags. This indicates that the policy tags are not being enforced properly, and the data analytics team members are able to view the tags and gain access to the sensitive data.\nSeparating the data into two distinct authorized datasets is a better approach because it isolates the sensitive data from the non-sensitive data. This prevent..."
      },
      {
        "user": "Matt_108",
        "text": "Max I feel like it's more B&E.\nI do agree on the revoking Data Catalog Fine-grained reader role to avoid the data analytics team to read policy tags metadata, but if the tags are setup as stated, it's just missing the enforcement of the policy tags themselves.\nCreating 2 auth dataset is not efficient on big datasets and Data catalog+ policy tags are built to manage these situations. Don't you agree?"
      },
      {
        "user": "raaad",
        "text": "- The Data Catalog Fine-Grained Reader role allows users to read metadata that is restricted by policy tags.\n- If members of the data analytics team have this role, they might bypass the restrictions set by policy tags.\n- Ensuring they do not have this role will help enforce the restrictions intended by the policy tags."
      },
      {
        "user": "Lenifia",
        "text": "the correct options are:\nA. Create two separate authorized datasets; one for the data analytics team and another for the consumer support team.\nC. Replace the authorized dataset with an authorized view. Use row-level security and apply filter_expression to limit data access."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 133,
    "topic": "Cloud SQL/DR",
    "difficulty": 2,
    "question": "You have a Cloud SQL for PostgreSQL instance in Region1 with one read replica in Region2 and another in Region3. An unexpected event in Region1 requires disaster recovery by promoting a read replica in Region2. You need to ensure the same database capacity before switching connections. What should you do?",
    "options": [
      "A. Enable zonal HA on the primary instance. Create a new read replica in a new region.",
      "B. Create a cascading read replica from the existing read replica in Region3.",
      "C. Create two new read replicas from the new primary instance, one in Region3 and one in a new region.",
      "D. Create a new read replica in Region1, promote it to primary, and enable zonal HA."
    ],
    "correct": 2,
    "explanation": "Create two new read replicas from the new primary instance, one in Region3 and one in This automatic failover replica promotion ensuring availability during primary outages; enables read replicas for scaling.",
    "discussion": [
      {
        "user": "raaad",
        "text": "After promoting the read replica in Region2 to be the new primary instance, creating additional read replicas from it can help distribute the read load and maintain or increase the database's total capacity."
      },
      {
        "user": "CGS22",
        "text": "The best option here is C. Create two new read replicas from the new primary instance, one in Region3 and one in a new region.\nHere's the breakdown:\nCapacity Restoration: Promoting the Region2 replica makes it the new primary. You need to replicate from this new primary to maintain redundancy and capacity. Creating two replicas (Region3, new region) accomplishes this.\nGeographic Distribution: Distributing replicas across regions ensures availability if another regional event occurs.\nSpeed: Cr..."
      },
      {
        "user": "josech",
        "text": "https://cloud.google.com/sql/docs/mysql/replication#cross-region-read-replicas"
      },
      {
        "user": "nadavw",
        "text": "requires 2 new read replicas as the read replica that wasn't promoted isn't capable to be a replica any more as the primary isa gone"
      },
      {
        "user": "e70ea9e",
        "text": "Immediate Failover:\nPromoting the read replica in Region2 quickly restores database operations in a different region, aligning with disaster recovery goals.\nCapacity Restoration:\nCreates two new read replicas from the promoted primary instance (formerly the read replica in Region2).\nThis replaces the lost capacity in Region1 and adds a read replica in a new region for further redundancy."
      },
      {
        "user": "skhaire",
        "text": "Corrected answer: C\nIf the primary instance (db-a-0) becomes unavailable, you can promote the replica in region B to become the primary. To again have additional replicas in regions A and C, delete the old instances (the former primary instance in A, and the replica in C), and create new read replicas from the new primary instance in B."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 134,
    "topic": "Orchestration",
    "difficulty": 2,
    "question": "You orchestrate ETL pipelines using Cloud Composer. One task relies on a third-party service. You want to be notified when the task does not succeed. What should you do?",
    "options": [
      "A. Assign a function with notification logic to the on_retry_callback parameter.",
      "B. Configure a Cloud Monitoring alert on the sla_missed metric.",
      "C. Assign a function with notification logic to the on_failure_callback parameter.",
      "D. Assign a function with notification logic to the sla_miss_callback parameter."
    ],
    "correct": 2,
    "explanation": "Assign a function with notification logic to the on_failure_callback parameter This managed ETL/ELT service with low-code visual interface; prebuilt connectors simplify data pipeline creation.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- The on_failure_callback is a function that gets called when a task fails.\n- Assigning a function with notification logic to this parameter is a direct way to handle task failures.\n- When the task fails, this function can trigger a notification, making it an appropriate solution for the need to be alerted on task failures."
      },
      {
        "user": "e70ea9e",
        "text": "Direct Trigger:\nThe on_failure_callback parameter is specifically designed to invoke a function when a task fails, ensuring immediate notification.\nCustomizable Logic:\nYou can tailor the notification function to send emails, create alerts, or integrate with other notification systems, providing flexibility."
      },
      {
        "user": "datapassionate",
        "text": "on_failure_callback is invoked when the task fails\nhttps://airflow.apache.org/docs/apache-airflow/stable/administration-and-deployment/logging-monitoring/callbacks.html"
      },
      {
        "user": "Anudeep58",
        "text": "https://airflow.apache.org/docs/apache-airflow/stable/administration-and-deployment/logging-monitoring/callbacks.html"
      },
      {
        "user": "JyoGCP",
        "text": "on_failure_callback"
      },
      {
        "user": "jonty4gcp",
        "text": "What is Task is long-running and in between stuck?"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 135,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "Your company has hired a data scientist who wants to perform analyses across very large datasets in Cloud Storage and a Cassandra cluster on Compute Engine. She primarily wants to create labelled data sets for ML and do visualization tasks. Her laptop is not powerful enough. What should you do?",
    "options": [
      "A. Run a local version of Jupyter on the laptop.",
      "B. Grant the user access to Google Cloud Shell.",
      "C. Host a visualization tool on a VM on Compute Engine.",
      "D. Deploy Google Cloud Datalab to a VM on Compute Engine."
    ],
    "correct": 3,
    "explanation": "Deploy Google Cloud Datalab to a VM on Compute Engine This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "Rajokkiyam",
        "text": "Answer should be D."
      },
      {
        "user": "dem2021",
        "text": "Datalab runs as a container inside a VM !!\nhttps://cloud.google.com/datalab/docs/concepts/key-concepts"
      },
      {
        "user": "Atnafu",
        "text": "D\nDatalab before it get deprecated now Vertex AI\nhttps://cloud.google.com/datalab/docs#:~:text=Datalab%20is%20deprecated,Google%20Charts%20APIs"
      },
      {
        "user": "daghayeghi",
        "text": "The correct answer to this question is B. Here is why:-\nOption A : Not correct, running a local version of Jupiter will not help her to work with the existing Casandra DB hosted in a VM in Google Cloud\nOption B : This is the correct answer, you can access google cloud SHELL either by installing local SDK's or you can access through Web. Go to the console page, login with your credential and access cloud shell. Cloud shell will allow you to create a Data Studio for visualization or any other m..."
      },
      {
        "user": "rickywck",
        "text": "Obviously the answer is D\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      },
      {
        "user": "Acocado",
        "text": "typo- should NOT appear in the exam"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 136,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "You are migrating your on-premises data warehouse to BigQuery. One upstream data source is a MySQL database with no public IP addresses. You want to ensure data ingestion is secure and does not go through the public internet. What should you do?",
    "options": [
      "A. Update your existing on-premises ETL tool to write to BigQuery by using the ODBC driver.",
      "B. Use Datastream to replicate data. Set up Cloud Interconnect. Use Private connectivity and Server-only encryption.",
      "C. Use Datastream with Forward-SSH tunnel. Use None as encryption type.",
      "D. Use Datastream. Gather public IP addresses. Use IP Allowlisting and Server-only encryption."
    ],
    "correct": 1,
    "explanation": "Use Datastream to replicate data This ensures data integrity and compliance during transfer.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Datastream is a serverless change data capture and replication service, which can be used to replicate data changes from MySQL to BigQuery.\n- Using Cloud Interconnect provides a private, secure connection between your on-premises environment and Google Cloud ==> This method ensures that data doesn't go through the public internet and is a recommended approach for secure, large-scale data migrations.\n- Setting up private connectivity with Datastream allows for secure and direct data transfer."
      },
      {
        "user": "josech",
        "text": "https://cloud.google.com/datastream/docs/network-connectivity-options"
      },
      {
        "user": "e70ea9e",
        "text": "Secure Private Connection:\nCloud Interconnect establishes a direct, private connection between your on-premises network and Google Cloud, bypassing the public internet and ensuring data confidentiality.\nDatastream Integration:\nDatastream seamlessly replicates data from your MySQL database to BigQuery, handling the complexities of data transfer and synchronization."
      },
      {
        "user": "datapassionate",
        "text": "Datastream is a seamless replication from relational databases directly to BigQuery. The source database can be hosted on-premises, on Google Cloud services such as Cloud SQL or Bare Metal Solution for Oracle, or anywhere else on any cloud.\nhttps://cloud.google.com/datastream-for-bigquery#benefits"
      },
      {
        "user": "datapassionate",
        "text": "It is required that the data ingestion into BigQuery is done securely and does not go through the public internet. It can be done by Interconnect."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 137,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You store and analyze data in BigQuery (US regions). You also have object stores across Azure and AWS (US regions). You want to query all data daily in BigQuery with minimal data movement. What should you do?",
    "options": [
      "A. Use BigQuery Data Transfer Service to load files from Azure and AWS.",
      "B. Create a Dataflow pipeline to ingest files.",
      "C. Load files from AWS and Azure to Cloud Storage with gsutil rsync.",
      "D. Use BigQuery Omni and BigLake tables to query files in Azure and AWS."
    ],
    "correct": 3,
    "explanation": "Use BigQuery Omni and BigLake tables to query files in Azure and AWS This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- BigQuery Omni allows us to analyze data stored across Google Cloud, AWS, and Azure directly from BigQuery without having to move or copy the data.\n- It extends BigQuery's data analysis capabilities to other clouds, enabling cross-cloud analytics."
      },
      {
        "user": "e70ea9e",
        "text": "Direct Querying:\nBigQuery Omni allows you to query data in Azure and AWS object stores directly without physically moving it to BigQuery, reducing data transfer costs and delays.\nBigLake Tables:\nProvide a unified view of both BigQuery tables and external object storage files, enabling seamless querying across multi-cloud data."
      },
      {
        "user": "josech",
        "text": "https://cloud.google.com/blog/products/data-analytics/introducing-bigquery-omni\nhttps://cloud.google.com/bigquery/docs/omni-introduction"
      },
      {
        "user": "Ramon98",
        "text": "Option A, B, and C all involve moving data, which is described as something that shouldn't happen."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 138,
    "topic": "Data Processing",
    "difficulty": 2,
    "question": "You have files in Cloud Storage that data science team wants to use. Currently, users don't have a method to explore, cleanse, and validate data. You need a low-code solution for quick data cleansing and exploration. What should you do?",
    "options": [
      "A. Provide access to Dataflow to create a pipeline.",
      "B. Create an external table in BigQuery and use SQL to transform.",
      "C. Load data into BigQuery and use SQL to transform.",
      "D. Provide the data science team access to Dataprep to prepare, validate, and explore the data."
    ],
    "correct": 3,
    "explanation": "Provide the data science team access to Dataprep to prepare, validate, and explore th This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Dataprep is a serverless, no-code data preparation tool that allows users to visually explore, cleanse, and prepare data for analysis.\n- It's designed for business analysts, data scientists, and others who want to work with data without writing code.\n- Dataprep can directly access and transform data in Cloud Storage, making it a suitable choice for a team that prefers a low-code, user-friendly solution."
      },
      {
        "user": "e70ea9e",
        "text": "Low-Code Interface:\nOffers a visual, drag-and-drop interface that empowers users with varying technical skills to cleanse and explore data without extensive coding, aligning with the low-code requirement.\nData Cleaning and Validation:\nProvides built-in tools for data profiling, cleaning, transformation, and validation, ensuring data quality and accuracy before model training.\nDirect Cloud Storage Access:\nConnects directly to Cloud Storage, allowing users to work with data in place without add..."
      },
      {
        "user": "Matt_108",
        "text": "The \"Reveal Answer\" button contains 90% of the time an incorrect answer. You should always check the community and the discussion during studying :)"
      },
      {
        "user": "JimmyBK",
        "text": "Goes without say"
      },
      {
        "user": "Matt_108",
        "text": "Option D - Low code and efficient way to explore and prep data"
      },
      {
        "user": "Alex3551",
        "text": "why you message wrong answers\ncorrect is C"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 139,
    "topic": "Dataform",
    "difficulty": 2,
    "question": "You are building an ELT solution in BigQuery using Dataform. You need to perform uniqueness and null value checks on your final tables. What should you do?",
    "options": [
      "A. Build BigQuery user-defined functions (UDFs).",
      "B. Create Dataplex data quality tasks.",
      "C. Build Dataform assertions into your code.",
      "D. Write a Spark-based stored procedure."
    ],
    "correct": 2,
    "explanation": "Build Dataform assertions into your code This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Dataform provides a feature called \"assertions,\" which are essentially SQL-based tests that you can define to verify the quality of your data.\n- Assertions in Dataform are a built-in way to perform data quality checks, including checking for uniqueness and null values in your tables."
      },
      {
        "user": "tibuenoc",
        "text": "https://cloud.google.com/dataform/docs/assertions"
      },
      {
        "user": "e70ea9e",
        "text": "Native Integration:\nDataform assertions are designed specifically for data quality checks within Dataform pipelines, ensuring seamless integration and compatibility.\nThey leverage Dataform's execution model and configuration, aligning with the existing workflow.\nDeclarative Syntax:\nAssertions are defined using a simple, declarative syntax within Dataform code, making them easy to write and understand, even for users with less SQL expertise."
      },
      {
        "user": "JyoGCP",
        "text": "https://docs.dataform.co/guides/assertions"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 140,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "A web server sends click events to Pub/Sub with an eventTimestamp attribute. Your Dataflow streaming job reads and transforms, writing results to another Pub/Sub topic. The advertising department needs messages within 30 seconds of click occurrence but reports late messages. System lag is 5 seconds, data freshness is 40 seconds. What is the problem?",
    "options": [
      "A. The advertising department is causing delays when consuming.",
      "B. Messages in your Dataflow job are taking more than 30 seconds to process.",
      "C. Messages are processed in less than 30 seconds, but your job cannot keep up with the backlog in the Pub/Sub subscription.",
      "D. The web server is not pushing messages fast enough to Pub/Sub."
    ],
    "correct": 2,
    "explanation": "Messages are processed in less than 30 seconds, but your job cannot keep up with the This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "e70ea9e",
        "text": "Selected Answer: G\nSystem Lag vs. Data Freshness: System lag is low (5 seconds), indicating that individual messages are processed quickly. However, data freshness is high (40 seconds), suggesting a backlog in the pipeline.\nNot Advertising's Fault: The issue is upstream of their consumption, as they're already receiving delayed messages.\nNot Web Server's Fault: The lag between eventTimestamp and publishTime is minimal (1 second), meaning the server is publishing messages promptly."
      },
      {
        "user": "raaad",
        "text": "Selected Answer: G\n- It suggest a backlog problem.\n- It indicates that while individual messages might be processed quickly once they're handled, the job overall cannot keep up with the rate of incoming messages, causing a delay in processing the backlog."
      },
      {
        "user": "Matt_108",
        "text": "Selected Answer: G\nOption C - low system lag (which identifies fast processing) but high data freshness (which identifies that the messages sit in the backlog a lot)"
      },
      {
        "user": "datapassionate",
        "text": "Why not B than?"
      },
      {
        "user": "RenePetersen",
        "text": "I guess that's because it says in the text that \"Your Dataflow job's system lag is about 5 seconds\"."
      },
      {
        "user": "4a8ffd7",
        "text": "I don't know why you guys got the processing time is less than 30 sec. But I would consider the processing time with 40(freshness) - 5(system lag) = 35 sec. Even minus the publish time of Pub/sub which is less than 1 sec. The processing time still larger than 30 sec. I believe inspecting a few messages show no more than 1 sec lag is about pub/sub processing time. Not inspecting a few messages for dataflow. So I would choose B."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 141,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "Your organization stores customer data in on-premises Apache Hadoop cluster in Parquet format. Data is processed daily by Spark jobs. You are migrating to Google Cloud. BigQuery will be used for future transformation pipelines. You want managed services, minimize ETL changes and overhead costs. What should you do?",
    "options": [
      "A. Migrate data to Cloud Storage and metadata to Dataproc Metastore (DPMS). Refactor Spark pipelines. Run on Dataproc Serverless.",
      "B. Migrate data to Cloud Storage and register as a Dataplex asset. Refactor Spark pipelines. Run on Dataproc Serverless.",
      "C. Migrate data to BigQuery. Refactor Spark pipelines. Run on Dataproc Serverless.",
      "D. Migrate data to BigLake. Refactor Spark pipelines. Run on Dataproc on Compute Engine."
    ],
    "correct": 0,
    "explanation": "Migrate data to Cloud Storage and metadata to Dataproc Metastore (DPMS) This managed ETL/ELT service with low-code visual interface; prebuilt connectors simplify data pipeline creation.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- This option involves moving Parquet files to Cloud Storage, which is a common and cost-effective storage solution for big data and is compatible with Spark jobs.\n- Using Dataproc Metastore to manage metadata allows us to keep Hadoop ecosystem's structural information.\n- Running Spark jobs on Dataproc Serverless takes advantage of managed Spark services without managing clusters.\n- Once the data is in Cloud Storage, you can also easily load it into BigQuery for further analysis."
      },
      {
        "user": "skhaire",
        "text": "BigQuery Integration: The requirement is to make data available in BigQuery. Dataplex has built-in integration with BigQuery. It can automatically discover data in Cloud Storage and create external tables in BigQuery, making the data readily queryable. DPMS doesn't have this direct integration with BigQuery."
      },
      {
        "user": "Ramon98",
        "text": "A tricky one, because of \"you need to ensure that your data is available in BigQuery\". The easiest and most straight forward migration seems answer A to me, and then you can use external tables to make the parquet data directly available in BigQuery.\nhttps://cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet\nHowever creating the external tables is an extra step? So therefore maybe C is the answer?"
      },
      {
        "user": "hrishi19",
        "text": "The question states that the data should be available on BigQuery and only option C meets this requirement."
      },
      {
        "user": "Anudeep58",
        "text": "Option B: Registering the bucket as a Dataplex asset adds an additional layer of data governance and management. While useful, it may not be necessary for your immediate migration needs and can introduce additional complexity.\nOption C: Migrating data directly to BigQuery would require significant changes to your Spark pipelines since they would need to be refactored to read from and write to BigQuery instead of Parquet files. This approach could introduce higher costs due to BigQuery storage..."
      },
      {
        "user": "52ed0e5",
        "text": "Migrate your data directly to BigQuery.\nRefactor Spark pipelines to read from and write to BigQuery.\nRun the Spark jobs on Dataproc Serverless.\nThe best choice for ensuring data availability in BigQuery. It allows seamless integration with BigQuery and minimizes ETL changes."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 142,
    "topic": "Security",
    "difficulty": 3,
    "question": "Your organization has two Google Cloud projects. In project A, you have a Pub/Sub topic receiving confidential data. Only project A resources should access this data. You want to ensure project B and any future project cannot access it. What should you do?",
    "options": [
      "A. Add firewall rules in project A so only traffic from the VPC is permitted.",
      "B. Configure VPC Service Controls in the organization with a perimeter around project A.",
      "C. Use IAM conditions to ensure only users and service accounts in project A can access resources.",
      "D. Configure VPC Service Controls with a perimeter around the VPC of project A."
    ],
    "correct": 1,
    "explanation": "Configure VPC Service Controls in the organization with a perimeter around project A This Google's managed pub/sub messaging service enabling asynchronous communication with built-in ordering guarantees and at-least-once delivery semantics.",
    "discussion": [
      {
        "user": "datapassionate",
        "text": "And I would agree with GPT. The question is about that who can do what within GCP environment. It's all about permissions and access management, not about networking."
      },
      {
        "user": "raaad",
        "text": "Option B:\n-It allows us to create a secure boundary around all resources in Project A, including the Pub/Sub topic.\n- It prevents data exfiltration to other projects and ensures that only resources within the perimeter (Project A) can access the sensitive data.\n- VPC Service Controls are specifically designed for scenarios where you need to secure sensitive data within a specific context or boundary in Google Cloud."
      },
      {
        "user": "fabiogoma",
        "text": "Setting up a perimeter around project A is future proof, the question asks to \"ensure that project B and any future project cannot access data in the project A topic\", IAM is not future proof.\nReference: https://cloud.google.com/vpc-service-controls/docs/overview#isolate\np.s: VPC Service Controls is not the same thing as VPC, instead its a security layer on top of a VPC and it should be used together with IAM, not one or the other (https://cloud.google.com/vpc-service-controls/docs/overview#h..."
      },
      {
        "user": "e70ea9e",
        "text": "VPC Service Controls enforce a security perimeter around entire projects, ensuring that resources within project A (including the Pub/Sub topic) are inaccessible from any other project, including project B and future projects.\nThis aligns with the requirement to prevent cross-project access."
      },
      {
        "user": "MithunDesai",
        "text": "The best solution to prevent project B and any future projects from accessing data in project A&#x27;s Pub/Sub topic is B. Configure VPC Service Controls in the organization with a perimeter around project A."
      },
      {
        "user": "meh_33",
        "text": "B is correct Raaad is always right"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 143,
    "topic": "Memorystore",
    "difficulty": 2,
    "question": "You stream order data by using Dataflow and write to Memorystore (Basic Tier, 4 GB, used by 40 clients for read-only). You expect read-only clients to increase to hundreds. You want to ensure read and write availability is not impacted. What should you do?",
    "options": [
      "A. Create a new Memorystore for Redis instance with Standard Tier. Set capacity to 4 GB and no read replicas.",
      "B. Create a new Memorystore for Redis instance with Standard Tier. Set capacity to 5 GB and create multiple read replicas.",
      "C. Create a new Memorystore for Memcached instance. Set minimum 3 nodes, 4 GB per node.",
      "D. Create multiple new Memorystore for Redis instances with Basic Tier (4 GB)."
    ],
    "correct": 1,
    "explanation": "Create a new Memorystore for Redis instance with Standard Tier This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Upgrading to the Standard Tier and adding read replicas is an effective way to scale and manage increased read load.\n- The additional capacity (5 GB) provides more space for data, and read replicas help distribute the read load across multiple instances."
      },
      {
        "user": "datapassionate",
        "text": "Descrived here:\nhttps://cloud.google.com/memorystore/docs/redis/redis-tiers"
      },
      {
        "user": "e70ea9e",
        "text": "Scalability for Read-Only Clients: Read replicas distribute read traffic across multiple instances, significantly enhancing read capacity to support a large number of clients without impacting write performance.\nHigh Availability: Standard Tier ensures high availability with automatic failover, minimizing downtime in case of instance failure.\nMinimal Code Changes: Redis clients can seamlessly connect to read replicas without requiring extensive code modifications, enabling a quick deployment."
      },
      {
        "user": "SamuelTsch",
        "text": "I don't like any answer. It seems Option B makes more senses due to read replicas."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 144,
    "topic": "Pub/Sub",
    "difficulty": 2,
    "question": "You have a streaming pipeline that ingests from Pub/Sub in production. You need to update with improved business logic and ensure the updated pipeline reprocesses the previous two days of delivered Pub/Sub messages. What should you do? (Choose two.)",
    "options": [
      "A. Use the Pub/Sub subscription clear-retry-policy flag",
      "B. Use Pub/Sub Snapshot capture two days before deployment.",
      "C. Create a new Pub/Sub subscription two days before deployment.",
      "D. Use the Pub/Sub subscription retain-acked-messages flag.",
      "E. Use Pub/Sub Seek with a timestamp."
    ],
    "correct": [
      3,
      4
    ],
    "explanation": "To seek to a past timestamp (E), the subscription must first retain acknowledged messages (D). Creating a new subscription days prior (C) is a manual anti-pattern.",
    "discussion": [
      {
        "user": "tibuenoc",
        "text": "DE\nAnother way to replay messages that have been acknowledged is to seek to a timestamp. To seek to a timestamp, you must first configure the subscription to retain acknowledged messages using retain-acked-messages. If retain-acked-messages is set, Pub/Sub retains acknowledged messages for 7 days.\nYou only need to do this step if you intend to seek to a timestamp, not to a snapshot.\nhttps://cloud.google.com/pubsub/docs/replay-message"
      },
      {
        "user": "GCP001",
        "text": "B and E, already tested at cloud console."
      },
      {
        "user": "raaad",
        "text": "- Pub/Sub Snapshots allow you to capture the state of a subscription's unacknowledged messages at a particular point in time.\n- By creating a snapshot two days before deploying the updated pipeline, you can later use this snapshot to replay the messages from that point.\n=============\nOption E:\n- Pub/Sub Seek allows us to alter the acknowledgment state of messages in bulk.\n- So we can rewind a subscription to a point in time or a snapshot.\n- Using Seek with a timestamp corresponding to two day..."
      },
      {
        "user": "task_7",
        "text": "DE\nSet the retain-acked-messages flag to true for the subscription.\nThis instructs Pub/Sub to store acknowledged messages for a specified retention period.\nE Use Pub/Sub Seek with a timestamp.\nAfter deploying the updated pipeline, use the Seek feature to replay messages.\nSpecify a timestamp that's two days before the current time.\nThis rewinds the subscription's message cursor, making it redeliver messages from that point onward."
      },
      {
        "user": "datapassionate",
        "text": "This case is described here.\nhttps://cloud.google.com/pubsub/docs/replay-message\nAnd according to this D &E would be correct."
      },
      {
        "user": "datapassionate",
        "text": "nother way to replay messages that have been acknowledged is to seek to a timestamp. To seek to a timestamp, you must first configure the subscription to retain acknowledged messages using retain-acked-messages. If retain-acked-messages is set, Pub/Sub retains acknowledged messages for 7 days."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 145,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You currently use a SQL-based tool to visualize data in BigQuery. Visualizations require outer joins and analytic functions. Visualizations must be based on data no less than 4 hours old. Users complain visualizations are too slow. You want to improve performance while minimizing maintenance. What should you do?",
    "options": [
      "A. Create materialized views with allow_non_incremental_definition option set to true. Specify max_staleness to 4 hours and enable_refresh to true.",
      "B. Create views for the visualization queries.",
      "C. Create a Cloud Function to export results as parquet files every 4 hours.",
      "D. Create materialized views using BigQuery's incremental updates capability."
    ],
    "correct": 0,
    "explanation": "Create materialized views with allow_non_incremental_definition option set to true This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "Jordan18",
        "text": "A seems right but whats wrong with option D, can anybody please explain?"
      },
      {
        "user": "ricardovazz",
        "text": "A\nhttps://cloud.google.com/bigquery/docs/materialized-views-create#non-incremental\nIn scenarios where data staleness is acceptable, for example for batch data processing or reporting, non-incremental materialized views can improve query performance and reduce cost.\nallow_non_incremental_definition option. This option must be accompanied by the max_staleness option. To ensure a periodic refresh of the materialized view, you should also configure a refresh policy."
      },
      {
        "user": "raaad",
        "text": "- Materialized views in BigQuery precompute and store the result of a base query, which can speed up data retrieval for complex queries used in visualizations.\n- The max_staleness parameter allows us to specify how old the data can be, ensuring that the visualizations are based on data no less than 4 hours old.\n- The enable_refresh parameter ensures that the materialized view is periodically refreshed.\n- The allow_non_incremental_definition is used for enabling the creation of non-incremental..."
      },
      {
        "user": "e70ea9e",
        "text": "Precomputed Results: Materialized views store precomputed results of complex queries, significantly accelerating subsequent query performance, addressing the slow visualization issue.\nAllow Non-Incremental Views: Using allow_non_incremental_definition circumvents the limitation of incremental updates for outer joins and analytic functions, ensuring views can be created for the specified queries.\nNear-Real-Time Data: Setting max_staleness to 4 hours guarantees data freshness within the accepta..."
      },
      {
        "user": "JamesKarianis",
        "text": "Unfortunately the correct answer is B due to the limitations of materialized views, doesn't support any other join than inner and no analytical function is supported"
      },
      {
        "user": "Matt_108",
        "text": "Option A is better than D, since it accounts for data staleness and is better suited for heavy querying, thanks to the allow_non_incremental_definition"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 146,
    "topic": "IoT/Architecture",
    "difficulty": 2,
    "question": "You are deploying 10,000 new IoT devices to collect temperature data globally. You need to process, store and analyze these datasets in real time. What should you do?",
    "options": [
      "A. Send data to Cloud Datastore and then export to BigQuery.",
      "B. Send data to Cloud Pub/Sub, stream to Cloud Dataflow, and store in BigQuery.",
      "C. Send data to Cloud Storage and spin up a Hadoop cluster on Dataproc whenever analysis is required.",
      "D. Export logs in batch to Cloud Storage and then spin up a Cloud SQL instance."
    ],
    "correct": 1,
    "explanation": "Send data to Cloud Pub/Sub, stream to Cloud Dataflow, and store in BigQuery This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "DataExpert",
        "text": "B is more correct than other options so B is the answer. But if this is actual use case you have to deal with use Cloud BigTable instead of bigquery. So the pipeline will be like this. IOT-Devices -> Cloud Pub/Sub -> Cloud BigTable -> Cloud Data Studio (For real-time analytics)"
      },
      {
        "user": "arghya13",
        "text": "B is the answer"
      },
      {
        "user": "Maurilio_Cardoso",
        "text": "PubSub for queue in real time, Dataflow for processing (pipeline) and Bigquery for analyses."
      },
      {
        "user": "samdhimal",
        "text": "correct answer is Cloud Pub/Sub ---> Dataflow ---> Bigquery\nCollected messages containing temperature values will be published to a topic on Cloud Pub/Sub, Messages will be read in streaming mode by Cloud Dataflow, a simplified stream and batch data processing solution, Cloud Datastore will save data to be displayed directly into the UI of the App Engine application, while BigQuery will act as a data warehouse that will enable the execution of more in depth analysis.\nReference:\nhttps://cloud...."
      },
      {
        "user": "anji007",
        "text": "Ans: B\nAll options are speaking about cloud storage, but need pub/sub in between to take streaming (IoT) data till storage/ into the cloud."
      },
      {
        "user": "Radhika7983",
        "text": "B is the right answer. You can use cloud data flow for both batch and streaming pipelines. Pub sub will be used to stream data into cloud data flow."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 147,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "You need to modernize your on-premises data strategy: Apache Hadoop clusters for processing, HDFS for replication, Apache Airflow for hundreds of ETL pipelines. You need to handle Hadoop workloads with minimal changes to orchestration processes. What should you do?",
    "options": [
      "A. Use Bigtable for large workloads, Cloud Storage for HDFS use cases. Orchestrate with Cloud Composer.",
      "B. Use Dataproc to migrate Hadoop clusters, Cloud Storage for HDFS use cases. Orchestrate with Cloud Composer.",
      "C. Use Dataproc to migrate Hadoop clusters, Cloud Storage for HDFS use cases. Convert ETL pipelines to Dataflow.",
      "D. Use Dataproc to migrate Hadoop clusters, Cloud Storage for HDFS use cases. Use Cloud Data Fusion for ETL."
    ],
    "correct": 1,
    "explanation": "Use Dataproc to migrate Hadoop clusters, Cloud Storage for HDFS use cases This managed ETL/ELT service with low-code visual interface; prebuilt connectors simplify data pipeline creation.",
    "discussion": [
      {
        "user": "raaad",
        "text": "Straight forward"
      },
      {
        "user": "scaenruy",
        "text": "Cloud Composer -> Airflow"
      },
      {
        "user": "cuadradobertoliniseb",
        "text": "Airflow -> composer\nMinimum changes -> Dataproc"
      },
      {
        "user": "datasmg",
        "text": "You can use Dataproc for doing Apache Hadoop process, then Cloud Storage to replace the HDFS, and using Cloud Composer (built in Apache Airflow) for orchestrator."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 148,
    "topic": "Cloud Composer",
    "difficulty": 2,
    "question": "You recently deployed data processing jobs into Cloud Composer 2. You notice tasks failing, increased total workers memory usage, and worker pod evictions. You need to resolve these errors. What should you do? (Choose two.)",
    "options": [
      "A. Increase the DAG file parsing interval.",
      "B. Increase the Cloud Composer 2 environment size from medium to large.",
      "C. Increase the maximum number of workers and reduce worker concurrency.",
      "D. Increase the memory available to the Airflow workers.",
      "E. Increase the memory available to the Airflow triggerer."
    ],
    "correct": [
      2,
      3
    ],
    "explanation": "Increase the maximum number of workers and reduce worker concurrency This orchestrates complex data workflows with error handling and monitoring.",
    "discussion": [
      {
        "user": "ML6",
        "text": "If an Airflow worker pod is evicted, all task instances running on that pod are interrupted, and later marked as failed by Airflow. The majority of issues with worker pod evictions happen because of out-of-memory situations in workers.\nYou might want to:\n- (D) Increase the memory available to workers.\n- (C) Reduce worker concurrency. In this way, a single worker handles fewer tasks at once. This provides more memory or storage to each individual task. If you change worker concurrency, you mig..."
      },
      {
        "user": "GCP001",
        "text": "C and D\nCheck ref for memory optimization - https://cloud.google.com/composer/docs/composer-2/optimize-environments"
      },
      {
        "user": "AllenChen123",
        "text": "Agree. Straightforward.\nhttps://cloud.google.com/composer/docs/composer-2/optimize-environments#monitor-scheduler\n-> Figure 3. Graph that displays worker pod evictions"
      },
      {
        "user": "raaad",
        "text": "B&D:\nB :\n- Scaling up the environment size can provide more resources, including memory, to the Airflow workers. If worker pod evictions are occurring due to insufficient memory, increasing the environment size to allocate more resources could alleviate the problem and improve the stability of your data processing jobs.\nD:\n- Increase the memory available to the Airflow workers. - Directly increasing the memory allocation for Airflow workers can address the issue of high memory usage and worke..."
      },
      {
        "user": "taka5094",
        "text": "CD\nOn the Monitoring dashboard, in the Workers section, observe the Worker Pods evictions graphs for your environment.\nThe Total workers memory usage graph shows a total perspective of the environment. A single worker can still exceed the memory limit, even if the memory utilization is healthy at the environment level.\nAccording to your observations, you might want to:\n- Increase the memory available to workers.\n- Reduce worker concurrency.\nIn this way, a single worker handles fewer tasks at ..."
      },
      {
        "user": "ML6",
        "text": "If an Airflow worker pod is evicted, all task instances running on that pod are interrupted, and later marked as failed by Airflow. The majority of issues with worker pod evictions happen because of out-of-memory situations in workers.\nYou might want to:\n- Increase the memory available to workers.\n- Reduce worker concurrency. In this way, a single worker handles fewer tasks at once. This provides more memory or storage to each individual task. If you change worker concurrency, you might also ..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 149,
    "topic": "Security",
    "difficulty": 3,
    "question": "You are implementing security requirements to deploy resources. You need to ensure that resources are limited to only the europe-west3 region. You want to follow Google-recommended practices. What should you do?",
    "options": [
      "A. Set the constraints/gcp.resourceLocations organization policy constraint to in:europe-west3-locations.",
      "B. Deploy resources with Terraform and implement a variable validation rule.",
      "C. Set the constraints/gcp.resourceLocations organization policy constraint to in:eu-locations.",
      "D. Create a Cloud Function to monitor all resources created and automatically destroy ones outside europe-west3."
    ],
    "correct": 0,
    "explanation": "Set the constraints/gcp.resourceLocations organization policy constraint to in:europe This enforces least-privilege access control and reduces unauthorized data exposure.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- The constraints/gcp.resourceLocations organization policy constraint is used to define where resources in the organization can be created.\n- Setting it to in:europe-west3-locations would specify that resources can only be created in the europe-west3 region."
      },
      {
        "user": "SanjeevRoy91",
        "text": "I am new to this forum. In almost all the questions, the reveal solution is different than the once's discussed here??"
      },
      {
        "user": "b3e59c2",
        "text": "https://cloud.google.com/resource-manager/docs/organization-policy/defining-locations#location_types"
      },
      {
        "user": "hrishi19",
        "text": "this comment is for previous question, not this one."
      },
      {
        "user": "scaenruy",
        "text": "Set the constraints/gcp.resourceLocations organization policy constraint to in:europe-west3-locations."
      },
      {
        "user": "chrissamharris",
        "text": "B, D\nB - Increase the Cloud Composer 2 environment size from medium to large.\nIncreasing the environment size will provide more resources (including memory) to the entire environment, which should help mitigate memory usage issues. This will also support scaling if the jobs demand more resources.\nD. Increase the memory available to the Airflow workers.\nIncreasing memory for Airflow workers will directly address the memory usage issue that's causing the pod evictions. By allocating more memory..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 150,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are a BigQuery admin supporting a team with ad hoc queries and Looker reports. All users are in a single project with 2000 slot reservation. You notice slowness and want to troubleshoot job queuing or slot contention. What should you do?",
    "options": [
      "A. Use slot reservations to ensure enough capacity.",
      "B. Use Cloud Monitoring to view BigQuery metrics and set up alerts.",
      "C. Use available administrative resource charts to determine how slots are being used. Run a query on INFORMATION_SCHEMA to review performance.",
      "D. Use Cloud Logging to determine if users are changing access grants."
    ],
    "correct": 2,
    "explanation": "Use available administrative resource charts to determine how slots are being used This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- BigQuery provides administrative resource charts that show slot utilization and job performance, which can help identify patterns of heavy usage or contention.\n- Additionally, querying the INFORMATION_SCHEMA with the JOBS or JOBS_BY_PROJECT view can provide detailed information about specific queries, including execution time, slot usage, and whether they were queued."
      },
      {
        "user": "datapassionate",
        "text": "descrived here:\nhttps://cloud.google.com/blog/products/data-analytics/troubleshoot-bigquery-performance-with-these-dashboards"
      },
      {
        "user": "ToiToi",
        "text": "Without doubt, C!"
      },
      {
        "user": "JyoGCP",
        "text": "https://cloud.google.com/blog/topics/developers-practitioners/monitor-analyze-bigquery-performance-using-information-schema"
      },
      {
        "user": "scaenruy",
        "text": "C. Use available administrative resource charts to determine how slots are being used and how jobs are performing over time. Run a query on the INFORMATION_SCHEMA to review query performance.\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 151,
    "topic": "Architecture",
    "difficulty": 3,
    "question": "You migrated a data backend that serves 10 PB of historical data. Only the last known state (about 10 GB) needs to be served through an API (up to 1000 QPS with less than 1 second latency). What should you do?",
    "options": [
      "A. Store historical data in BigQuery for analytics. Use a materialized view. Serve last state directly from BigQuery.",
      "B. Store products as a collection in Firestore.",
      "C. Store historical data in Cloud SQL for analytics. Store last state in a separate table. Serve from Cloud SQL.",
      "D. Store historical data in BigQuery for analytics. Store last state in Cloud SQL table. Serve from Cloud SQL."
    ],
    "correct": 3,
    "explanation": "Store historical data in BigQuery for analytics This balances scalability, cost, and performance requirements.",
    "discussion": [
      {
        "user": "einchkrein",
        "text": "Serve the last state data directly from Cloud SQL to the API.\nHere's why this option is most suitable:\nBigQuery for Analytics: BigQuery is an excellent choice for storing and analyzing large datasets like your 10 PB of historical product data. It is designed for handling big data analytics efficiently and cost-effectively.\nCloud SQL for Last State Data: Cloud SQL is a fully managed relational database that can effectively handle the storage of the last known state of products. Storing this su..."
      },
      {
        "user": "datapassionate",
        "text": "D. 1. Store the historical data in BigQuery for analytics.\n2. In a Cloud SQL table, store the last state of the product after every product change.\n3. Serve the last state data directly from Cloud SQL to the AP\nThis approach leverages BigQuery's scalability and efficiency for handling large datasets for analytics. BigQuery is well-suited for managing the 10 PB of historical product data. Meanwhile, Cloud SQL provides the necessary performance to handle the API queries with the required low la..."
      },
      {
        "user": "Matt_108",
        "text": "Option D is the right one, compared to option A, Cloud SQL is more efficient and cost effective for the amount of time the data needs to be accessed by the api"
      },
      {
        "user": "clouditis",
        "text": "A is the most plausible option - Cloud SQL can not retrieve results out with 1 second latency as the requirement here is, with BQ MV\"s that could be a possibility as its pre-computed."
      },
      {
        "user": "scaenruy",
        "text": "A. 1. Store the historical data in BigQuery for analytics.\n2. Use a materialized view to precompute the last state of a product.\n3. Serve the last state data directly from BigQuery to the API."
      },
      {
        "user": "RenePetersen",
        "text": "I believe the latency of BigQuery is too high to accommodate the sub-second latency requirement."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 152,
    "topic": "Orchestration",
    "difficulty": 2,
    "question": "You want to schedule sequential load and transformation jobs. Data files arrive at unpredictable times to Cloud Storage. Dataproc job transforms and writes to BigQuery. Additional BigQuery transformations follow. You need the most efficient and maintainable workflow for hundreds of tables. What should you do?",
    "options": [
      "A. Create an Airflow DAG in Cloud Composer. Use a single shared DAG. Schedule hourly.",
      "B. Create a separate DAG for each table. Schedule hourly.",
      "C. Create an Airflow DAG with Dataproc and BigQuery operators. Use a single shared DAG. Use Cloud Storage object trigger to launch a Cloud Function that triggers the DAG.",
      "D. Create a separate DAG for each table. Use a Cloud Storage object trigger to launch a Cloud Function that triggers the DAG."
    ],
    "correct": 2,
    "explanation": "A single parameterized shared DAG triggered by a Cloud Function is more maintainable for hundreds of identical workflows than managing hundreds of separate DAGs.",
    "discussion": [
      {
        "user": "cuadradobertoliniseb",
        "text": "D\n* Transformations are in Dataproc and BigQuery. So you don't need operators for GCS (A and B can be discard)\n* \"There is no fixed schedule for when the new data arrives.\" so you trigger the DAG when a file arrives\n* \"The transformation jobs are different for every table. \" so you need a DAG for each table.\nThen, D is the most suitable answer"
      },
      {
        "user": "AllenChen123",
        "text": "Same question, why not use single DAG to manage as there are hundreds of tables."
      },
      {
        "user": "f74ca0c",
        "text": "A single shared DAG is efficient to manage, and table-specific transformations can be handled using parameters (e.g., passing table names and configurations dynamically).\nTriggering the DAG using a Cloud Storage object notification and a Cloud Function ensures the workflow starts immediately upon data arrival.\nEvent-driven architecture minimizes delays and provides the freshest data to users.\nEfficient, maintainable, and event-driven."
      },
      {
        "user": "8ad5266",
        "text": "This explains why it's not D:\nmaintainable workflow to process hundreds of tables and provide the freshest data to your end users\nHow is creating a DAG for each of the hundreds of tables maintainable?"
      },
      {
        "user": "Matt_108",
        "text": "Option D, which gets triggered when the data comes in and accounts for the fact that each table has its own set of transformations"
      },
      {
        "user": "cuadradobertoliniseb",
        "text": "It says that the transformations for each table are very different"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 153,
    "topic": "Cloud SQL/DR",
    "difficulty": 2,
    "question": "You are deploying a MySQL database workload onto Cloud SQL. It must scale up to support readers from various geographic regions. It must be highly available and meet low RTO and RPO requirements. You need to minimize interruptions to readers during failover. What should you do?",
    "options": [
      "A. Create a highly available Cloud SQL instance in region A. Create a highly available read replica in region B. Scale up with cascading read replicas. Backup to multi-regional Cloud Storage. Restore backup when Region A is down.",
      "B. Create a highly available Cloud SQL instance in region A. Scale up with read replicas in multiple regions. Promote one read replica when region A is down.",
      "C. Create a highly available Cloud SQL instance in region A. Create a highly available read replica in region B. Scale up with cascading read replicas. Promote the read replica in region B when region A is down.",
      "D. Create a highly available Cloud SQL instance in region A. Scale up with read replicas in the same region. Failover to the standby when primary fails."
    ],
    "correct": 2,
    "explanation": "Create a highly available Cloud SQL instance in region A This managed relational database with automated backups, replication, and patch management; supports MySQL, PostgreSQL, SQL Server.",
    "discussion": [
      {
        "user": "rohan.sahi",
        "text": "Option C: Because HA read replica in multiple regions.\nNotA: Coz restore from back up is time taking\nNotB: No HA in Multiple regions read replica\nNot D: Only one region mentioned."
      },
      {
        "user": "raaad",
        "text": "- Combines high availability with geographic distribution of read workloads.\n- Promoting a highly available read replica can provide a quick failover solution, potentially meeting low RTO and RPO requirements.\n=====\nWhy not A:\nRestoring from backup to a new instance in another region during a regional outage might not meet low RTO and RPO requirements due to the time it takes to perform a restore."
      },
      {
        "user": "datapassionate",
        "text": "Why not B:\nWhile B option scales up read workloads across multiple regions, it doesn't specify high availability for the read replica in another region. In the event of a regional outage, promoting a non-highly available read replica might not provide the desired uptime and reliability."
      },
      {
        "user": "Matt_108",
        "text": "Ignore my previous messages, it's C :D"
      },
      {
        "user": "mi_yulai",
        "text": "Why C? Is it possible to have HA enable in different regions? How the synchronization in disk will wokr for HA?"
      },
      {
        "user": "tibuenoc",
        "text": "https://cloud.google.com/sql/docs/mysql/replication\nThis option involves having read replicas in multiple regions, allowing you to promote one of them in the event of a failure in region A. While there may still be a brief interruption during the failover, it is likely to be less than the time required for the synchronization of cascading read replicas."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 154,
    "topic": "Data Processing",
    "difficulty": 2,
    "question": "You are planning to load on-premises data into BigQuery. You want to either stream or batch-load data depending on use case. You want to mask some sensitive data programmatically while keeping costs minimum. What should you do?",
    "options": [
      "A. Use Cloud Data Fusion to design your pipeline with the Cloud DLP plug-in.",
      "B. Use BigQuery Data Transfer Service. After data is populated, use Cloud DLP API.",
      "C. Create your pipeline with Dataflow through the Apache Beam SDK for Python, customizing options for streaming, batch processing, and Cloud DLP. Select BigQuery as sink.",
      "D. Set up Datastream to replicate your on-premise data on BigQuery."
    ],
    "correct": 2,
    "explanation": "Create your pipeline with Dataflow through the Apache Beam SDK for Python, customizin This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Programmatic Flexibility: Apache Beam provides extensive control over pipeline design, allowing for customization of data transformations, including integration with Cloud DLP for sensitive data masking.\n- Streaming and Batch Support: Beam seamlessly supports both streaming and batch data processing modes, enabling flexibility in data loading patterns.\n- Cost-Effective Processing: Dataflow offers a serverless model, scaling resources as needed, and only charging for resources used, helping ..."
      },
      {
        "user": "qq589539483084gfrgrg",
        "text": "In correct Option is A because you want a programatic way whereas datafusion is codeless solution and also dataflow is cost effective"
      },
      {
        "user": "AllenChen123",
        "text": "You are saying Option C"
      },
      {
        "user": "tibuenoc",
        "text": "C is correct. Using Dataflow as Python as programming and BQ as sink.\nA is incorrect - DataFusion is Code-free as the main propose"
      },
      {
        "user": "scaenruy",
        "text": "A.\nUse Cloud Data Fusion to design your pipeline, use the Cloud DLP plug-in to de-identify data within your pipeline, and then move the data into BigQuery."
      },
      {
        "user": "ggg24",
        "text": "Data Fusion support only Batch and Streaming is required"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 155,
    "topic": "Security",
    "difficulty": 3,
    "question": "You want to encrypt the customer data stored in BigQuery. You need to implement per-user crypto-deletion. You want to adopt native Google Cloud features. What should you do?",
    "options": [
      "A. Implement AEAD BigQuery functions while storing data in BigQuery.",
      "B. Create a CMEK in Cloud KMS. Associate the key to the table while creating the table.",
      "C. Create a CMEK in Cloud KMS. Use the key to encrypt data before storing in BigQuery.",
      "D. Encrypt data during ingestion by using a cryptographic library."
    ],
    "correct": 0,
    "explanation": "Implement AEAD BigQuery functions while storing data in BigQuery This enforces least-privilege access control and reduces unauthorized data exposure.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- AEAD cryptographic functions in BigQuery allow for encryption and decryption of data at the column level.\n- You can encrypt specific data fields using a unique key per user and manage these keys outside of BigQuery (for example, in your application or using a key management system).\n- By \"deleting\" or revoking access to the key for a specific user, you effectively make their data unreadable, achieving crypto-deletion.\n- This method provides fine-grained encryption control but requires caref..."
      },
      {
        "user": "JyoGCP",
        "text": "https://cloud.google.com/bigquery/docs/aead-encryption-concepts\nhttps://cloud.google.com/bigquery/docs/reference/standard-sql/aead_encryption_functions"
      },
      {
        "user": "scaenruy",
        "text": "A.\nImplement Authenticated Encryption with Associated Data (AEAD) BigQuery functions while storing your data in BigQuery.\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 156,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "The data analyst team uses BigQuery with a 2000 slot reservation. With hundreds of new non time-sensitive SQL pipelines, the team encounters frequent quota errors. Approximately 1500 queries are triggered concurrently during peak time. What should you do?",
    "options": [
      "A. Increase slot capacity with baseline 0 and maximum reservation size 3000.",
      "B. Update SQL pipelines to run as batch query, and ad-hoc queries as interactive.",
      "C. Increase slot capacity with baseline 2000 and maximum reservation size 3000.",
      "D. Update SQL pipelines and ad-hoc queries to run as interactive query jobs."
    ],
    "correct": 1,
    "explanation": "Update SQL pipelines to run as batch query, and ad-hoc queries as interactive This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- BigQuery allows you to specify job priority as either BATCH or INTERACTIVE.\n- Batch queries are queued and then started when idle resources are available, making them suitable for non-time-sensitive workloads.\n- Running ad-hoc queries as interactive ensures they have prompt access to resources."
      },
      {
        "user": "josech",
        "text": "You already have a 2000 slots consumption and sudden peaks, so you should use a baseline of 2000 slots and a maximum of 3000 to tackle the peak concurrent activity.\nhttps://cloud.google.com/bigquery/docs/slots-autoscaling-intro"
      },
      {
        "user": "ToiToi",
        "text": "This question has nothing to do with increasing slots, it is just confusing and misleading, therefore A and C do not make sense.\nD (All interactive queries): Running all queries as interactive would prioritize speed over cost-efficiency and might not be necessary for your non-time-sensitive SQL pipelines."
      },
      {
        "user": "CGS22",
        "text": "Why A is the best choice:\nAddresses Concurrency: Increasing the maximum reservation size to 3000 slots directly addresses the concurrency issue by providing more capacity for simultaneous queries. Since the current peak usage is 1500 queries, this increase ensures sufficient headroom.\nCost Optimization: Setting the baseline to 0 means you only pay for the slots actually used, avoiding unnecessary costs for idle capacity. This is ideal for non-time-sensitive workloads where flexibility is more..."
      },
      {
        "user": "scaenruy",
        "text": "B.\nUpdate SQL pipelines to run as a batch query, and run ad-hoc queries as interactive query jobs."
      },
      {
        "user": "LP_PDE",
        "text": "By updating your SQL pipelines to run as batch queries you can reduce concurrency, avoid quota errors, and ensure that your analysts have the resources they need for their interactive queries."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 157,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You have been loading data from CSV files into BigQuery table CLICK_STREAM. The column DT stores the epoch time as STRING type. Now you want to change DT to TIMESTAMP with minimal migration effort without making future queries expensive. What should you do?",
    "options": [
      "A. Delete the table and re-create it with DT as TIMESTAMP. Reload the data.",
      "B. Add a column TS of TIMESTAMP type and populate from DT.",
      "C. Create a view where strings from DT are cast into TIMESTAMP values.",
      "D. Add two columns TS and IS_NEW. Reload all data in append mode.",
      "E. Construct a query to return every row, cast DT into TIMESTAMP. Run into a destination table NEW_CLICK_STREAM."
    ],
    "correct": 4,
    "explanation": "Construct a query to return every row, cast DT into TIMESTAMP This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "\"E\" looks better. For D, the database will be double in size (which increases the storage price) and the user has to spend some more days reloading all the data."
      },
      {
        "user": "[Removed]",
        "text": "E - more simple and reasonable. Also recommended if not concerned about cost but simplicity.\nhttps://cloud.google.com/bigquery/docs/manually-changing-schemas#changing_a_columns_data_type"
      },
      {
        "user": "NicolasN",
        "text": "We are interested in query performance (\"without making future queries computationally expensive\") so a common view (not materialized) will have the computational cost of performing the cast every time it is queried."
      },
      {
        "user": "Tanzu",
        "text": "A does the job. Exporting from bq to gcs is free but storage costs. Sending from computer to bq, again, is ok but it is still hard to eliminate. A few days ... sounds like that way is not possible some how way.\nB, adding a column w/o deleting the old one increases storage and computation costs further ops. Not valid\nC, creating a view (means source table has to remain) is increasing storage and computation costs, too.\nD, adding 2 column is non sense.\nSo E is much more sense. More complicated ..."
      },
      {
        "user": "StelSen",
        "text": "I would go for Option.E\nReason:\n1. Question says, I want to change data type to the TIMESTAMP. So there is change required\n2. To minimize migration effort without making future queries computationally expensive: No view required as I will run this query again and again. In order to convert string to Timestamp we need to use CAST function for sure. Simple copy of numeric value won't work. https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_rules\nOption-A: I don't want to r..."
      },
      {
        "user": "jkhong",
        "text": "Also D doesn't make sense since we're filtering IS_NEW to true to only consider future data, which disregards our previously loaded data"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 158,
    "topic": "Dataplex",
    "difficulty": 2,
    "question": "You are designing a data mesh using Dataplex. You are creating a customer virtual lake with data engineers (full access) and analytic users (curated data only). What should you do?",
    "options": [
      "A. Grant dataplex.dataOwner to data engineers on the customer data lake. Grant dataplex.dataReader to analytic users on the customer curated zone.",
      "B. Grant dataplex.dataReader to data engineers on the customer data lake. Grant dataplex.dataOwner to analytic users on the curated zone.",
      "C. Grant bigquery.dataOwner and storage.objectCreator to data engineers. Grant bigquery.dataViewer and storage.objectViewer to analytic users.",
      "D. Grant bigquery.dataViewer and storage.objectViewer to data engineers. Grant bigquery.dataOwner and storage.objectEditor to analytic users."
    ],
    "correct": 0,
    "explanation": "Grant dataplex.dataOwner to data engineers on the customer data lake This organizes data assets with metadata management and unified discovery.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- dataplex.dataOwner: Grants full control over data assets, including reading, writing, managing, and granting access to others.\n- dataplex.dataReader: Allows users to read data but not modify it."
      },
      {
        "user": "AllenChen123",
        "text": "Yes, https://cloud.google.com/dataplex/docs/lake-security#data-roles\nDataplex maps its roles to the data roles for each underlying storage resource (Cloud Storage, BigQuery).\n^ simplify the permissions."
      },
      {
        "user": "qq589539483084gfrgrg",
        "text": "A correct answer"
      },
      {
        "user": "Matt_108",
        "text": "Option A clearly correct"
      },
      {
        "user": "josech",
        "text": "The quetion is for BigQuery AND Cloud Storage for a Data Lake, so you should assign IAM permissions for both of them. C is correct."
      },
      {
        "user": "scaenruy",
        "text": "A.\n1. Grant the dataplex.dataOwner role to the data engineer group on the customer data lake.\n2. Grant the dataplex.dataReader role to the analytic user group on the customer curated zone."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 159,
    "topic": "Storage/DR",
    "difficulty": 2,
    "question": "You are designing Cloud Storage architecture for resilience against regional failure. You want to minimize RPO with no impact on applications. What should you do?",
    "options": [
      "A. Adopt multi-regional Cloud Storage buckets.",
      "B. Adopt two regional buckets, update application to write to both.",
      "C. Adopt a dual-region Cloud Storage bucket and enable turbo replication.",
      "D. Adopt two regional buckets and create a daily task to copy from one to the other."
    ],
    "correct": 2,
    "explanation": "Adopt a dual-region Cloud Storage bucket and enable turbo replication This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Dual-region buckets are a specific type of storage that automatically replicates data between two geographically distinct regions.\n- Turbo replication is an enhanced feature that provides faster replication between the two regions, thus minimizing RPO.\n- This option ensures that your data is resilient to regional failures and is replicated quickly, meeting the needs for low RPO and no impact on application performance."
      },
      {
        "user": "CGS22",
        "text": "A. Adopt multi-regional Cloud Storage buckets in your architecture.\nWhy A is the best choice:\nAutomatic Cross-Region Replication: Multi-regional buckets automatically replicate data across multiple geographically separated regions within a selected multi-region location (e.g., us). This ensures data redundancy and availability even if one region experiences an outage.\nMinimal RPO: Data written to a multi-regional bucket is synchronously replicated to at least two regions. This means that in t..."
      },
      {
        "user": "Matt_108",
        "text": "Option C: https://cloud.google.com/storage/docs/dual-regions + https://cloud.google.com/storage/docs/managing-turbo-replication"
      },
      {
        "user": "therealsohail",
        "text": "Turbo replication provides faster redundancy across regions for data in your dual-region buckets, which reduces the risk of data loss exposure and helps support uninterrupted service following a regional outage."
      },
      {
        "user": "datapassionate",
        "text": "Whereas with multi-region \" it can also introduce unpredictable latency into the response time and higher network egress charges for cloud workloads when multi-region data is read from remote regions\"\nhttps://cloud.google.com/blog/products/storage-data-transfer/choose-between-regional-dual-region-and-multi-region-cloud-storage"
      },
      {
        "user": "ricardovazz",
        "text": "https://cloud.google.com/storage/docs/availability-durability#turbo-replication\n\"Default replication in Cloud Storage is designed to provide redundancy across regions for 99.9% of newly written objects within a target of one hour and 100% of newly written objects within a target of 12 hours\"\n\"When enabled, turbo replication is designed to replicate 100% of newly written objects to both regions that constitute the dual-region within the recovery point objective of 15 minutes, regardless of obj..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 160,
    "topic": "Dataflow/DR",
    "difficulty": 2,
    "question": "You have designed an Apache Beam pipeline that reads from a Pub/Sub topic (message retention 1 day) and writes to Cloud Storage. You need to prevent data loss with RPO of 15 minutes. What should you do?",
    "options": [
      "A. Use a dual-region bucket. Seek subscription back 15 minutes. Start Dataflow in secondary region.",
      "B. Use a multi-regional bucket. Seek back 60 minutes. Start Dataflow in secondary region.",
      "C. Use a regional bucket. Seek back one day. Start Dataflow in secondary region.",
      "D. Use a dual-region bucket with turbo replication. Seek back 60 minutes. Start Dataflow in secondary region."
    ],
    "correct": 3,
    "explanation": "Use a dual-region bucket with turbo replication This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "datapassionate",
        "text": "D. 1. Use a dual-region Cloud Storage bucket with turbo replication enabled.\n2. Monitor Dataflow metrics with Cloud Monitoring to determine when an outage occurs.\n3. Seek the subscription back in time by 60 minutes to recover the acknowledged messages.\n4. Start the Dataflow job in a secondary region.\nRPO of 15 minutes is guaranteed when turbo replication is used\nhttps://cloud.google.com/storage/docs/availability-durability"
      },
      {
        "user": "JyoGCP",
        "text": "Option D is correct.\nNot A, because dual-region bucket WITHOUT turbo replication takes atleast 1 hour to sync data between regions. SLA for 100% data sync is 12 hours as per google."
      },
      {
        "user": "lipa31",
        "text": "https://cloud.google.com/storage/docs/availability-durability#turbo-replication says : \"When enabled, turbo replication is designed to replicate 100% of newly written objects to both regions that constitute the dual-region within the recovery point objective of 15 minutes, regardless of object size.\"\nso seems D to me"
      },
      {
        "user": "qq589539483084gfrgrg",
        "text": "why not D then, if turbo replication improves RPO??"
      },
      {
        "user": "ashdam",
        "text": "Why multi-region is not correct. There is no downtime in case a region goes down."
      },
      {
        "user": "0dd4e0c",
        "text": "it's D, keyword \"Turbo replication\" for RPO recovery"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 161,
    "topic": "BigQuery/ML",
    "difficulty": 2,
    "question": "You are preparing data for ML with BigQuery ML. You want to replace nulls with zeros in feature1. Which query should you use?",
    "options": [
      "A. SELECT * REPLACE(IFNULL(feature1, 0) AS feature1) FROM table",
      "B. SELECT * REPLACE(NULLIF(feature1, 0) AS feature1) FROM table",
      "C. SELECT * REPLACE(IF(feature1 = 0, NULL, feature1) AS feature1) FROM table",
      "D. SELECT * REPLACE(COALESCE(feature1, '') AS feature1) FROM table"
    ],
    "correct": 0,
    "explanation": "SELECT * REPLACE(IFNULL(feature1, 0) AS feature1) FROM table This SQL interface to ML models enabling predictions directly from BigQuery without data export; simplifies ML workflows.",
    "discussion": [
      {
        "user": "52ed0e5",
        "text": "Option A is the correct choice because it retains all the original columns and specifically addresses the issue of null values in ‘feature1’ by replacing them with zeros, without altering any other columns or performing unnecessary calculations. This makes the data ready for use in BigQueryML without losing any important information.\nOption C is not the best choice because it includes the EXCEPT clause for the price and square_feet columns, which would exclude these columns from the results. ..."
      },
      {
        "user": "datapassionate",
        "text": "Correct answer is C.\nIt both replace NULL with 0 and pass price per square foot of real estate."
      },
      {
        "user": "George_Zhu",
        "text": "Option C isn't a good practice. What if any 0 value is contained in the column of squre_feet, then price / 0 will throw an exception. IF(IFNULL(squre_feet, 0) = 0, 0, price/squre_feet)."
      },
      {
        "user": "raaad",
        "text": "Straight forward"
      },
      {
        "user": "oleg25",
        "text": "I didn't get why they mentioned in the task price and square feet columns. Just to irritate us? Do we need to do something with these columns or just with column feature1?"
      },
      {
        "user": "baimus",
        "text": "I think the assumption here is that no houses are zero feet in size. If they are, that should be caught in preprocessing, which is outside the short scope of this question. If the answer isn't C, then it's A, which would mean the question is suggesting you need an ML model to calculate price per square for data where you already have both price and square feet as features. In that instance you clearly need to only divide one by the other. Those columns must be intended to be the target, or th..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 162,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "Different teams store customer and performance data in BigQuery. Each team needs full control, to query their projects, and to exchange data with other teams. You need an organization-wide solution minimizing operational tasks and costs. What should you do?",
    "options": [
      "A. Ask each team to create authorized views. Grant bigquery.jobUser role.",
      "B. Create a BigQuery scheduled query to replicate all customer data.",
      "C. Ask each team to publish their data in Analytics Hub. Direct other teams to subscribe.",
      "D. Enable each team to create materialized views of the data they need."
    ],
    "correct": 2,
    "explanation": "Ask each team to publish their data in Analytics Hub. Direct other teams to subscribe This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Analytics Hub allows organizations to create and manage exchanges where producers can publish their data and consumers can discover and subscribe to data products.\n- Asking each team to publish their data in Analytics Hub and having other teams subscribe to them is a scalable and controlled way of sharing data.\n- It minimizes operational tasks because data doesn't need to be duplicated or manually managed after setup, and teams can maintain full control over their datasets."
      },
      {
        "user": "chickenwingz",
        "text": "Analytics hub to reduce operational overhead of creating/maintaining views permissions etc"
      },
      {
        "user": "Matt_108",
        "text": "that's what analytics hub is designed for"
      },
      {
        "user": "CGS22",
        "text": "Why C is the best choice:\nCentralized Data Exchange: Analytics Hub provides a unified platform for data sharing across teams and organizations. It simplifies the process of publishing, discovering, and subscribing to datasets, reducing operational overhead.\nData Ownership and Control: Each team retains full control over their data, deciding which datasets to publish and who can access them. This ensures data governance and security.\nCross-Project Querying: Once a team subscribes to a dataset ..."
      },
      {
        "user": "JyoGCP",
        "text": "C. Analytics Hub"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 163,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You are developing a model to identify factors that lead to sales conversions. You have completed processing your data. What should you do next?",
    "options": [
      "A. Use your model to run predictions on fresh customer input data.",
      "B. Monitor your model performance and make adjustments.",
      "C. Delineate what data will be used for testing and what for training.",
      "D. Test and evaluate your model on your curated data."
    ],
    "correct": 2,
    "explanation": "Delineate what data will be used for testing and what for training This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Before you can train a model, you need to decide how to split your dataset."
      },
      {
        "user": "Matt_108",
        "text": "Option C - you've just concluded processing data, ending up with clean and prepared data for the model. Now you need to decide how to split the data for testing and for training. Only afterwards, you can train the model, evaluate it, fine tune it and, eventually, predict with it"
      },
      {
        "user": "chickenwingz",
        "text": "Model doesn't seem to be trained yet"
      },
      {
        "user": "meh_33",
        "text": "First ever time Exam Topic answers matching with users answer yoooo hoooooo.\nC"
      },
      {
        "user": "desertlotus1211",
        "text": "Anwser D is correct:\nthe next step in the machine learning lifecycle is to evaluate the model\nDelineate test/train data should have been done BEFORE or during data processing"
      },
      {
        "user": "desertlotus1211",
        "text": "The machine learning life cycle typically involves planning, data preparation, model engineering, model evaluation, model deployment, and monitoring/maintenance."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 164,
    "topic": "Security/DLP",
    "difficulty": 2,
    "question": "You have a BigQuery dataset with customers' street addresses. You want to retrieve all occurrences. What should you do?",
    "options": [
      "A. Write a SQL query using REGEXP_CONTAINS on all tables to find rows where 'street' appears.",
      "B. Create a deep inspection job on each table with Cloud DLP with the STREET_ADDRESS infoType.",
      "C. Create a discovery scan configuration with Cloud DLP with the STREET_ADDRESS infoType.",
      "D. Create a de-identification job in Cloud DLP and use masking transformation."
    ],
    "correct": 2,
    "explanation": "Create a discovery scan configuration with Cloud DLP with the STREET_ADDRESS infoType This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Cloud Data Loss Prevention (Cloud DLP) provides powerful inspection capabilities for sensitive data, including predefined detectors for infoTypes such as STREET_ADDRESS.\n- By creating a deep inspection job for each table with the STREET_ADDRESS infoType, you can accurately identify and retrieve rows that contain street addresses."
      },
      {
        "user": "datapassionate",
        "text": "In the question we need to retrieve all occurances of street adresses from the dataset. In C you create discovery confiuration plan on whole organization. Its not needed."
      },
      {
        "user": "Matt_108",
        "text": "Option B - you want to retrieve ALL occurrences within the dataset"
      },
      {
        "user": "josech",
        "text": "https://cloud.google.com/sensitive-data-protection/docs/learn-about-your-data#inspection"
      },
      {
        "user": "scaenruy",
        "text": "B. Create a deep inspection job on each table in your dataset with Cloud Data Loss Prevention and create an inspection template that includes the STREET_ADDRESS infoType."
      },
      {
        "user": "AllenChen123",
        "text": "Why not C? Discovery scan configuration can also help to identify risk/sensitivity fields."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 165,
    "topic": "Dataplex",
    "difficulty": 2,
    "question": "Your company operates in three domains: airlines, hotels, and ride-hailing. Each domain has analytics and data science teams. The central data platform team is becoming a bottleneck. You need to design a data mesh architecture using Dataplex. What should you do?",
    "options": [
      "A. Create one lake for each team. Inside each lake, create one zone for each domain. Have central team manage.",
      "B. Create one lake for each team. Inside each lake, create one zone for each domain. Direct each domain to manage their own zone.",
      "C. Create one lake for each domain. Inside each lake, create one zone for each team. Direct each domain to manage their own lake.",
      "D. Create one lake for each domain. Inside each lake, create one zone for each team. Have central team manage."
    ],
    "correct": 2,
    "explanation": "Create one lake for each domain This organizes data assets with metadata management and unified discovery.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- each domain should manage their own lake’s data assets"
      },
      {
        "user": "AllenChen123",
        "text": "Agree. https://cloud.google.com/dataplex/docs/introduction#a_domain-centric_data_mesh"
      },
      {
        "user": "Matt_108",
        "text": "Option C - create a lake for each domain, each team manages its own assets"
      },
      {
        "user": "task_7",
        "text": "Separate lakes for each team\nZones within each lake dedicated to different domains"
      },
      {
        "user": "scaenruy",
        "text": "C.\n1. Create one lake for each domain. Inside each lake, create one zone for each team.\n2. Attach each of the BigQuery datasets created by the individual teams as assets to the respective zone.\n3. Direct each domain to manage their own lake’s data assets.\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 166,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You have a BigQuery table with VM data. You want to prepare data for regular reporting excluding VM rows with fewer than 8 vCPU in the most cost-effective way. What should you do?",
    "options": [
      "A. Create a view with a filter to drop rows with fewer than 8 vCPU, and use the UNNEST operator.",
      "B. Create a materialized view with a filter and use the WITH common table expression.",
      "C. Create a view with a filter and use the WITH common table expression.",
      "D. Use Dataflow to batch process and write the result to another BigQuery table."
    ],
    "correct": 0,
    "explanation": "Create a view with a filter to drop rows with fewer than 8 vCPU, and use the UNNEST o This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- The table structure shows that the vCPU data is stored in a nested field within the components column.\n- Using the UNNEST operator to flatten the nested field and apply the filter."
      },
      {
        "user": "Krauser59",
        "text": "A seems to be the correct answer because of the table structure and the UNNEST operator.\nHowever, i don’t understand why wouldn’t we chose a materialized view"
      },
      {
        "user": "Matt_108",
        "text": "Option A - The regular reporting doesn't justify a materialized view, since the frequency of access is not so high; a simple view would do the trick. Moreover, the vcpu data is in a nested field and requires Unnest."
      },
      {
        "user": "scaenruy",
        "text": "A. Create a view with a filter to drop rows with fewer than 8 vCPU, and use the UNNEST operator."
      },
      {
        "user": "JyoGCP",
        "text": "Option A - UNNEST"
      },
      {
        "user": "Positron75",
        "text": "Materialized views increase cost, which would go against the \"most cost-effective way\" part of the question."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 167,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You are planning to store raw data in Cloud Storage. You expect 25 GB/day. Requirements: old data can be deleted anytime, no predefined access pattern, available instantly when accessed, no charges for data retrieval. What should you do to optimize cost?",
    "options": [
      "A. Create the bucket with the Autoclass storage class feature.",
      "B. Create an Object Lifecycle Management policy to modify storage class: 30d to nearline, 90d to coldline, 365d to archive.",
      "C. Create an Object Lifecycle Management policy to modify: 30d to coldline, 90d to nearline, 365d to archive.",
      "D. Create an Object Lifecycle Management policy to modify: 30d to nearline, 45d to coldline, 60d to archive."
    ],
    "correct": 0,
    "explanation": "Create the bucket with the Autoclass storage class feature This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "Smakyel79",
        "text": "https://cloud.google.com/storage/docs/autoclass"
      },
      {
        "user": "raaad",
        "text": "- Autoclass automatically moves objects between storage classes without impacting performance or availability, nor incurring retrieval costs.\n- It continuously optimizes storage costs based on access patterns without the need to set specific lifecycle management policies."
      },
      {
        "user": "CGS22",
        "text": "Why B is the best choice:\nCost Optimization: This option leverages Cloud Storage's different storage classes to significantly reduce costs for storing older data. Nearline, coldline, and archive storage classes are progressively cheaper than the standard storage class, with trade-offs in availability and retrieval times.\nMeets Requirements:\nOld data deletion: You can manually delete old data whenever needed, fulfilling the first requirement.\nNo predefined access pattern: The policy automatica..."
      },
      {
        "user": "Sofiia98",
        "text": "For sure A, read the documentation"
      },
      {
        "user": "therealsohail",
        "text": "Create an Object Lifecycle Management policy to modify the storage class for data older than 30 days to nearline, 90 days to coldline, and 365 days to archive storage class. Delete old data as needed."
      },
      {
        "user": "nadavw",
        "text": "A one-time pay isn't considered a retrieval charge. A is correct"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 168,
    "topic": "Monitoring",
    "difficulty": 3,
    "question": "You want to use Google Stackdriver Logging to monitor BigQuery usage. You need instant notification when new data is appended to a certain table using an insert job, but not for other tables. What should you do?",
    "options": [
      "A. Make a call to the Stackdriver API to list all logs, and apply an advanced filter.",
      "B. In the Stackdriver logging admin interface, enable a log sink export to BigQuery.",
      "C. In the Stackdriver logging admin interface, enable a log sink export to Pub/Sub, and subscribe from your monitoring tool.",
      "D. Using the Stackdriver API, create a project sink with advanced log filter to export to Pub/Sub, and subscribe."
    ],
    "correct": 3,
    "explanation": "Using the Stackdriver API, create a project sink with advanced log filter to export t This centralized log aggregation from compute, applications, and security; enables analysis and retention policies.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "I would choose D.\nA and B are wrong since don't notify anything to the monitoring tool.\nC has no filter on what will be notified. We want only some tables."
      },
      {
        "user": "MaxNRG",
        "text": "D as the key requirement is to have notification on a particular table. It can be achieved using advanced log filter to filter only the table logs and create a project sink to Cloud Pub/Sub for notification.\nRefer GCP documentation - Advanced Logs Filters: https://cloud.google.com/logging/docs/view/advanced-queries\nA is wrong as advanced filter will help in filtering. However, there is no notification sends.\nB is wrong as it would send all the logs and BigQuery does not provide notifications...."
      },
      {
        "user": "rickywck",
        "text": "I also prefer D. While C should also works, but the subscriber needs to do filtering on its own and not sure the monitoring tool can do that."
      },
      {
        "user": "Cloud_Enthusiast",
        "text": "Answer is D.\nhttps://cloud.google.com/logging/docs/export\nAll logs, including audit logs, platform logs, and user logs, are sent to the Cloud Logging API where they pass through the Logs Router. The Logs Router checks each log entry against existing rules to determine which log entries to ingest (store), which log entries to include in exports, and which log entries to discard. For more details, see Logs Router overview.\nExporting involves writing a filter that selects the log entries you wan..."
      },
      {
        "user": "fire558787",
        "text": "It's definitely D. From: https://cloud.google.com/logging/docs/reference/v2/rest/v2/projects.sinks \"a sink used to export log entries to one of the following destinations in any project: a Cloud Storage bucket, a BigQuery dataset, a Pub/Sub topic or a Cloud Logging log bucket. A logs filter controls which log entries are exported\".\nB is wrong because why would you export to BigQuery again if you want to be notified by your monitoring tool?"
      },
      {
        "user": "Radhika7983",
        "text": "The correct answer is D. please check the link https://cloud.google.com/blog/products/management-tools/automate-your-response-to-a-cloud-logging-event\nUsing a Logging sink, you can build an event-driven system to detect and respond to log events in real time. Cloud Logging can help you to build this event-driven architecture through its integration with Cloud Pub/Sub and a serverless computing service such as Cloud Functions or Cloud Run.\nHowever as we need to create an alert only for certain..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 169,
    "topic": "Security/DLP",
    "difficulty": 2,
    "question": "Your company's data platform ingests CSV file dumps of booking and user profile data. The data analyst team wants to join these datasets on the email field. However, PII should not be accessible to the analysts. You need to de-identify the email field while maintaining referential integrity. What should you do?",
    "options": [
      "A. Create a pipeline to de-identify the email field using Cloud DLP with masking.",
      "B. Create a pipeline to de-identify the email field using Cloud DLP with format-preserving encryption with FFX.",
      "C. Load CSV files into BigQuery with dynamic data masking. Create a policy tag with email mask.",
      "D. Load CSV files into BigQuery with dynamic data masking. Create a policy tag with default masking value."
    ],
    "correct": 1,
    "explanation": "Create a pipeline to de-identify the email field using Cloud DLP with format-preservi This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "lipa31",
        "text": "Format-preserving encryption (FPE) with FFX in Cloud DLP is a strong choice for de-identifying PII like email addresses. FPE maintains the format of the data and ensures that the same input results in the same encrypted output consistently. This means the email fields in both datasets can be encrypted to the same value, allowing for accurate joins in BigQuery while keeping the actual email addresses hidden."
      },
      {
        "user": "Smakyel79",
        "text": "As it states \"You need to de-identify the email field in both the datasets before loading them into BigQuery for analysts\" data masking should not be an option as the data would stored unmasked in BigQuery?"
      },
      {
        "user": "task_7",
        "text": "A wouldn't preserve the email format\nC&D maskedReader roles still grant access to the underlying values.\nthe only option is B"
      },
      {
        "user": "Anudeep58",
        "text": "Option A:\nMasking: Simple masking might not preserve the uniqueness and joinability of the email field, making it difficult to perform accurate joins between datasets.\nOption C and D:\nDynamic Data Masking: These options involve masking the email field dynamically within BigQuery, which does not address the requirement to de-identify data before loading into BigQuery. Additionally, dynamic masking does not prevent access to the actual email data before it is loaded into BigQuery, potentially e..."
      },
      {
        "user": "ML6",
        "text": "A) masking = replace with a surrogate character like # or * = output not unique, so cannot apply joins\nC and D) question specifies to de-identify BEFORE loading into BQ, whereas these options perform dynamic masking IN BigQuery.\nTherefore, only valid option is B."
      },
      {
        "user": "JyoGCP",
        "text": "Option B\nhttps://cloud.google.com/sensitive-data-protection/docs/pseudonymization"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 170,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You have important legal hold documents in Cloud Storage that must not be deleted or modified. What should you do?",
    "options": [
      "A. Set a retention policy. Lock the retention policy.",
      "B. Set a retention policy. Set the default storage class to Archive.",
      "C. Enable Object Versioning. Add a lifecycle rule.",
      "D. Enable Object Versioning. Create a copy in a different region."
    ],
    "correct": 0,
    "explanation": "Set a retention policy. Lock the retention policy This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Setting a retention policy on a Cloud Storage bucket prevents objects from being deleted for the duration of the retention period.\n- Locking the policy makes it immutable, meaning that the retention period cannot be reduced or removed, thus ensuring that the documents cannot be deleted or overwritten until the retention period expires."
      },
      {
        "user": "AllenChen123",
        "text": "Agree. https://cloud.google.com/storage/docs/bucket-lock#overview"
      },
      {
        "user": "Matt_108",
        "text": "Option A - set retention policy to prevent deletion, lock it to make it immutable (not subject to edits)"
      },
      {
        "user": "scaenruy",
        "text": "A. Set a retention policy. Lock the retention policy.\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 171,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are designing a data warehouse in BigQuery for sales data for a telecom provider. You need historical record of all data. You want a simple, easy-to-use, and cost-effective model. What should you do?",
    "options": [
      "A. Create a normalized model. Use snapshots before updates.",
      "B. Create a normalized model. Keep all input files in Cloud Storage.",
      "C. Create a denormalized model with nested and repeated fields. Update the table and use snapshots.",
      "D. Create a denormalized, append-only model with nested and repeated fields. Use the ingestion timestamp to track historical data."
    ],
    "correct": 3,
    "explanation": "Create a denormalized, append-only model with nested and repeated fields This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- A denormalized, append-only model simplifies query complexity by eliminating the need for joins.\n- Adding data with an ingestion timestamp allows for easy retrieval of both current and historical states.\n- Instead of updating records, new records are appended, which maintains historical information without the need to create separate snapshots."
      },
      {
        "user": "scaenruy",
        "text": "D. Create a denormalized, append-only model with nested and repeated fields. Use the ingestion timestamp to track historical data."
      },
      {
        "user": "JimmyBK",
        "text": "Straight forward, good for costs"
      },
      {
        "user": "Sofiia98",
        "text": "D looks logical"
      },
      {
        "user": "GCP001",
        "text": "Easy, cost effective and no cpmpexity"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 172,
    "topic": "Dataflow/Networking",
    "difficulty": 2,
    "question": "You are deploying a batch pipeline in Dataflow. The security team requires all Compute Engine instances to use only internal IP addresses. What should you do?",
    "options": [
      "A. Ensure workers have network tags to access Cloud Storage and BigQuery.",
      "B. Ensure firewall rules allow access to Cloud Storage and BigQuery.",
      "C. Create a VPC Service Controls perimeter with Dataflow, Cloud Storage, and BigQuery.",
      "D. Ensure that Private Google Access is enabled in the subnetwork. Use Dataflow with only internal IPs."
    ],
    "correct": 3,
    "explanation": "Ensure that Private Google Access is enabled in the subnetwork This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Private Google Access for services allows VM instances with only internal IP addresses in a VPC network or on-premises networks (via Cloud VPN or Cloud Interconnect) to reach Google APIs and services.\n- When you launch a Dataflow job, you can specify that it should use worker instances without external IP addresses if Private Google Access is enabled on the subnetwork where these instances are launched.\n- This way, your Dataflow workers will be able to access Cloud Storage and BigQuery with..."
      },
      {
        "user": "GCP001",
        "text": "Even if you create VPC service control, your dataflow worker will run on google compute engine instances with private ips only after policy enforcement.\nWithout external IP addresses, you can still perform administrative and monitoring tasks.\nYou can access your workers by using SSH through the options listed in the preceding list. However, the pipeline cannot access the internet, and internet hosts cannot access your Dataflow workers."
      },
      {
        "user": "GCP001",
        "text": "ref - https://cloud.google.com/dataflow/docs/guides/routes-firewall"
      },
      {
        "user": "GCP001",
        "text": "https://cloud.google.com/dataflow/docs/guides/routes-firewall"
      },
      {
        "user": "BIGQUERY_ALT_ALT",
        "text": "VPC Service Controls are typically used to define and enforce security perimeters around APIs and services, restricting their access to a specified set of Google Cloud projects. In this scenario, the security constraint is focused on Compute Engine instances used by Dataflow, and VPC Service Controls might be considered a bit heavy-handed for just addressing the internal IP address requirement."
      },
      {
        "user": "Matt_108",
        "text": "Missclicked the answer <.<"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 173,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You are running a Dataflow streaming pipeline with Streaming Engine and Horizontal Autoscaling. The pipeline only uses 10 workers and autoscaler is not spinning up additional workers. What should you do?",
    "options": [
      "A. Enable Vertical Autoscaling.",
      "B. Change the pipeline code and introduce a Reshuffle step to prevent fusion.",
      "C. Update the job to increase the maximum number of workers.",
      "D. Use Dataflow Prime and enable Right Fitting."
    ],
    "correct": 1,
    "explanation": "Change the pipeline code and introduce a Reshuffle step to prevent fusion This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Fusion optimization in Dataflow can lead to steps being \"fused\" together, which can sometimes hinder parallelization.\n- Introducing a Reshuffle step can prevent fusion and force the distribution of work across more workers.\n- This can be an effective way to improve parallelism and potentially trigger the autoscaler to increase the number of workers."
      },
      {
        "user": "ML6",
        "text": "Fusion occurs when multiple transformations are fused into a single stage, which can limit parallelism and hinder performance, especially in streaming pipelines. By introducing a Reshuffle step, you break fusion and allow for better parallelism."
      },
      {
        "user": "GCP001",
        "text": "Problem is performnace and not using all workers properly, https://cloud.google.com/dataflow/docs/pipeline-lifecycle#fusion_optimization"
      },
      {
        "user": "srivastavas08",
        "text": "https://cloud.google.com/dataflow/docs/guides/right-fitting"
      },
      {
        "user": "meh_33",
        "text": "https://cloud.google.com/dataflow/docs/pipeline-lifecycle#prevent_fusion"
      },
      {
        "user": "Lestrang",
        "text": "Right fitting is for declaration, declaring the correct resources will not help. Reshuffling step is what can prevent fusion which can lead to unused workers."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 174,
    "topic": "Datastream",
    "difficulty": 2,
    "question": "You have an Oracle database deployed in a VM as part of a VPC network. You want to replicate and continuously synchronize 50 tables to BigQuery while minimizing infrastructure management. What should you do?",
    "options": [
      "A. Deploy Apache Kafka in the same VPC, use Kafka Connect Oracle CDC, and Dataflow to stream to BigQuery.",
      "B. Create a Pub/Sub subscription. Deploy Debezium Oracle connector.",
      "C. Deploy Apache Kafka with Kafka Connect Oracle CDC, and BigQuery Sink Connector.",
      "D. Create a Datastream service from Oracle to BigQuery, use a private connectivity configuration."
    ],
    "correct": 3,
    "explanation": "Create a Datastream service from Oracle to BigQuery, use a private connectivity confi This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Datastream is a serverless and easy-to-use change data capture (CDC) and replication service.\n- You would create a Datastream service that sources from your Oracle database and targets BigQuery, with private connectivity configuration to the same VPC.\n- This option is designed to minimize the need to manage infrastructure and is a fully managed service."
      },
      {
        "user": "scaenruy",
        "text": "D. Create a Datastream service from Oracle to BigQuery, use a private connectivity configuration to the same VPC network, and a connection profile to BigQuery."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 175,
    "topic": "Cloud Composer",
    "difficulty": 2,
    "question": "You are deploying an Airflow DAG in Cloud Composer 2 in a subnetwork with no Internet access. You want to run the DAG reactively when a new file arrives in Cloud Storage. What should you do?",
    "options": [
      "A. Enable Private Google Access. Set up Cloud Storage notifications to Pub/Sub. Create a push subscription pointing to the web server URL.",
      "B. Enable Cloud Composer API. Set up Cloud Storage notifications to trigger a Cloud Function. Write Cloud Function to call DAG using Cloud Composer API and web server URL. Use VPC Serverless Access.",
      "C. Enable Airflow REST API. Set up Cloud Storage notifications to trigger a Cloud Function. Create a Private Service Connect endpoint.",
      "D. Enable Airflow REST API. Set up Cloud Storage notifications to trigger a Cloud Function. Write Cloud Function to call DAG using Airflow REST API and web server URL. Use VPC Serverless Access."
    ],
    "correct": 3,
    "explanation": "Enable Airflow REST API This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Enable Airflow REST API: In Cloud Composer, enable the \"Airflow web server\" option.\n- Set Up Cloud Storage Notifications: Create a notification for new files, routing to a Cloud Function.\n- Create PSC Endpoint: Establish a PSC endpoint for Cloud Composer.\n- Write Cloud Function: Code the function to use the Airflow REST API (via PSC endpoint) to trigger the DAG.\n========\nWhy not Option D\n- Using the web server URL directly wouldn't work without internet access or a direct path to the web se..."
      },
      {
        "user": "STEVE_PEGLEG",
        "text": "This is the guidance how to use method in A:\nhttps://cloud.google.com/composer/docs/composer-2/triggering-gcf-pubsub\n\"In this specific example, you create a Cloud Function and deploy two DAGs. The first DAG pulls Pub/Sub messages and triggers the second DAG according to the Pub/Sub message content.\"\nFor C & D, this guidance says it can't be done when you have Private or VPS Service Controls set up:\nhttps://cloud.google.com/composer/docs/composer-2/triggering-with-gcf#check_your_environments_n..."
      },
      {
        "user": "AllenChen123",
        "text": "Why not B, use Cloud Composer API"
      },
      {
        "user": "Pime13",
        "text": "Why Option D is the Best Choice:\nAirflow REST API: Enabling the Airflow REST API allows you to programmatically trigger DAG runs, which is essential for a reactive setup.\nCloud Storage Notifications: Setting up notifications ensures that your DAG is triggered every time a new file is received in the Cloud Storage bucket.\nVPC Serverless Access: This allows your Cloud Function to securely access the Cloud Composer web server URL without needing external IP addresses, complying with your subnetw..."
      },
      {
        "user": "josech",
        "text": "C is not correct because \"this solution does not work in Private IP and VPC Service Controls configurations because it is not possible to configure connectivity from Cloud Functions to the Airflow web server in these configurations\".\nhttps://cloud.google.com/composer/docs/how-to/using/triggering-with-gcf\nThe correct answer is A using Pub/Sub https://cloud.google.com/composer/docs/composer-2/triggering-gcf-pubsub"
      },
      {
        "user": "chrissamharris",
        "text": "Why not Option C? C involves creating a Private Service Connect (PSC) endpoint, which, while viable for creating private connections to Google services, adds complexity and might not be required when simpler solutions like VPC Serverless Access (as in Option D) can suffice."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 176,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You are planning to use Cloud Storage as part of your data lake. Objects will be ingested once, access patterns are random. You want to minimize cost and ensure optimization is transparent. What should you do?",
    "options": [
      "A. Create a Cloud Storage bucket with Autoclass enabled.",
      "B. Create a bucket with Object Lifecycle Management policy to transition from Standard to Coldline after 30 days.",
      "C. Create a bucket with Object Lifecycle Management policy to transition from Standard to Coldline if not live.",
      "D. Create two buckets. Use Standard for first, Coldline for second. Migrate objects after 30 days."
    ],
    "correct": 0,
    "explanation": "Create a Cloud Storage bucket with Autoclass enabled This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Autoclass automatically analyzes access patterns of objects and automatically transitions them to the most cost-effective storage class within Standard, Nearline, Coldline, or Archive.\n- This eliminates the need for manual intervention or setting specific age thresholds.\n- No user or application interaction is required, ensuring transparency."
      },
      {
        "user": "iooj",
        "text": "Thanks to you guys, I found out about this feature :D\nThe feature was released on November 3, 2023. Note that enabling Autoclass on an existing bucket incurs additional charges."
      },
      {
        "user": "desertlotus1211",
        "text": "By chance is this a repeat question?"
      },
      {
        "user": "scaenruy",
        "text": "A. Create a Cloud Storage bucket with Autoclass enabled."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 177,
    "topic": "Data Processing",
    "difficulty": 2,
    "question": "You have several different file type data sources (Parquet and CSV). You want to store data in Cloud Storage with your own encryption keys. You want a GUI-based solution. What should you do?",
    "options": [
      "A. Use Storage Transfer Service to move files.",
      "B. Use Cloud Data Fusion to move files into Cloud Storage.",
      "C. Use Dataflow to move files.",
      "D. Use BigQuery Data Transfer Service to move files into BigQuery."
    ],
    "correct": 1,
    "explanation": "Use Cloud Data Fusion to move files into Cloud Storage This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Cloud Data Fusion is a fully managed, code-free, GUI-based data integration service that allows you to visually connect, transform, and move data between various sources and sinks. - It supports various file formats and can write to Cloud Storage.\n- You can configure it to use Customer-Managed Encryption Keys (CMEK) for the buckets where it writes data."
      },
      {
        "user": "Helinia",
        "text": "Even though storage transfer service can be used in GUI, it does not support CMEK which is required in this question.\n\"Storage Transfer Service does not encrypt data on your behalf, such as in customer-managed encryption keys (CMEK). We only encrypt data in transit.\"\nRef: https://cloud.google.com/storage-transfer/docs/on-prem-security"
      },
      {
        "user": "AllenChen123",
        "text": "Agree. https://cloud.google.com/data-fusion/docs/how-to/customer-managed-encryption-keys#create-instance"
      },
      {
        "user": "task_7",
        "text": "A. Use Storage Transfer Service to move files into Cloud Storage.\nmove files into Cloud Storage should be Storage Transfer Service\nCloud Data Fusion is like using a tank to kill an ant"
      },
      {
        "user": "aaaaaaaasdasdasfs",
        "text": "A. Use Storage Transfer Service\n• ✅ GUI-based: Yes, can be set up in the Google Cloud Console.\n• ✅ Can move data from on-premises, AWS, or even between GCS buckets.\n• ✅ Works with different file types, including CSV, Parquet.\n• ✅ Supports writing into buckets protected with CMEK.\n• ✅ Best suited when you’re moving or syncing raw files into Cloud Storage"
      },
      {
        "user": "vishavpreet",
        "text": "Cloud Data Fusion is a fully-managed, cloud native, enterprise data integration service for quickly building and managing data pipelines.\nGraphically, no coding solution."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 178,
    "topic": "Data Processing",
    "difficulty": 2,
    "question": "Your business users need to clean and prepare data before analysis. They prefer GUIs and want to analyze results in a spreadsheet. What should you do?",
    "options": [
      "A. Use Dataprep to clean the data, write results to BigQuery. Analyze with Connected Sheets.",
      "B. Use Dataprep to clean the data, write results to BigQuery. Analyze with Looker Studio.",
      "C. Use Dataflow to clean the data, write results to BigQuery. Analyze with Connected Sheets.",
      "D. Use Dataflow to clean the data, write results to BigQuery. Analyze with Looker Studio."
    ],
    "correct": 0,
    "explanation": "Use Dataprep to clean the data, write results to BigQuery. Analyze with Connected Sheets This enables efficient transformation at scale with automatic resource management.",
    "discussion": [
      {
        "user": "Sofiia98",
        "text": "If only all the questions were like this..."
      },
      {
        "user": "raaad",
        "text": "- Allow business users to perform their analysis in a familiar spreadsheet interface via Connected Sheets."
      },
      {
        "user": "josech",
        "text": "https://cloud.google.com/bigquery/docs/connected-sheets\nhttps://cloud.google.com/dataprep"
      },
      {
        "user": "scaenruy",
        "text": "A. Use Dataprep to clean the data, and write the results to BigQuery. Analyze the data by using Connected Sheets."
      },
      {
        "user": "Matt_108",
        "text": "Clearly option A"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 179,
    "topic": "Security",
    "difficulty": 3,
    "question": "You are working on a sensitive project involving private user data. An external consultant is going to assist with coding a Dataflow pipeline. How should you maintain users' privacy?",
    "options": [
      "A. Grant the consultant the Viewer role on the project.",
      "B. Grant the consultant the Cloud Dataflow Developer role on the project.",
      "C. Create a service account and allow the consultant to log on with it.",
      "D. Create an anonymized sample of the data for the consultant to work with in a different project."
    ],
    "correct": 3,
    "explanation": "Create an anonymized sample of the data for the consultant to work with in a differen This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "The Answer should be B. The Dataflow developer role will not provide access to the underlying data."
      },
      {
        "user": "Rajuuu",
        "text": "Service account is between applications and non human entry."
      },
      {
        "user": "[Removed]",
        "text": "Answer: B\nDescription: Provides the permissions necessary to execute and manipulate Dataflow jobs."
      },
      {
        "user": "beowulf_kat",
        "text": "The consultant will need access to the underlying data and transformed data to see if the transformation logic is coded correctly. This can be best handled by anonymizing the data."
      },
      {
        "user": "Anirkent",
        "text": "Not sure who it could be anything apart from D. if I put myself in developer shoes then without seeing the data how can I develop any logic let alone the complex one. and if I have access thru any means (ex. service account) then I can just print the logs and see the data in the logs anyway. So option D appears to be the only option."
      },
      {
        "user": "Asheesh1909",
        "text": "I think it should be D, if we give the consultant developer role he can print the data while developing jobs so he can have indirect access to the data so D sounds to be a good option."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 180,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You have two projects: one for production jobs with strict SLAs (300 slot baseline, spike to additional 500 slots) and one for ad-hoc queries (up to 200 slots, billed by data scanned). You need to ensure appropriate compute resources. What should you do?",
    "options": [
      "A. Create a single Enterprise Edition reservation for both projects. Baseline 300 slots. Autoscaling up to 700.",
      "B. Create two reservations. SLA project: Enterprise Edition baseline 300, autoscaling 500. Ad-hoc project: on-demand billing.",
      "C. Create two Enterprise Edition reservations. SLA project: baseline 300, autoscaling 500. Ad-hoc project: baseline 0, ignore idle slots False.",
      "D. Create two Enterprise Edition reservations. SLA project: baseline 800. Ad-hoc project: autoscaling up to 200."
    ],
    "correct": 1,
    "explanation": "Create two reservations This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- The SLA project gets a dedicated reservation with autoscaling to handle spikes, ensuring it meets its strict completion time SLAs.\n- The ad-hoc project uses on-demand billing, which means it will be billed based on the amount of data scanned rather than slot capacity, fitting the billing preference for ad-hoc queries."
      },
      {
        "user": "JyoGCP",
        "text": "Option B.\nNot D because \"In Project-2, ad-hoc queries need to be billed based on how much data users scan rather than by slot capacity.\""
      },
      {
        "user": "CGS22",
        "text": "Separate Reservations: This approach provides tailored resource allocation and billing models to match the distinct needs of each project.\nSLA Project Reservation:\nEnterprise Edition: Guarantees consistent slot availability for your production jobs.\nBaseline of 300 slots: Ensures resources are always available to meet your core usage at a predictable cost.\nAutoscaling up to 500 slots: Accommodates bursts in workload while controlling costs.\nAd-hoc Project On-demand:\nOn-demand billing: Charges..."
      },
      {
        "user": "chrissamharris",
        "text": "Scratch this - Option B: https://cloud.google.com/bigquery/docs/slots-autoscaling-intro#using_reservations_with_baseline_and_autoscaling_slots\nBaseline Slots and AutoScaling Slots are treated as two different entities in the documentation. Therefore B is right despite the horrific wording of the answers."
      },
      {
        "user": "potatoKiller",
        "text": "\"You want these ad-hoc queries to be billed based on how much data users scan rather than by slot capacity.\" So D is out. Choose B"
      },
      {
        "user": "Matt_108",
        "text": "Option B - first project works well with dedicated reservation and autoscaling. The second one requires on demand billing, as per question requires."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 181,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "You want to migrate your existing Teradata data warehouse to BigQuery. You want the most efficient method requiring least amount of programming. Local storage space on your existing data warehouse is limited. What should you do?",
    "options": [
      "A. Use BigQuery Data Transfer Service using the JDBC driver with FastExport connection.",
      "B. Create a TPT export script and import to BigQuery using the bq command-line tool.",
      "C. Use BigQuery Data Transfer Service with the TPT tbuild utility.",
      "D. Create a script to export historical data, upload in batches to Cloud Storage, set up BigQuery Data Transfer Service."
    ],
    "correct": 2,
    "explanation": "Use BigQuery Data Transfer Service with the TPT tbuild utility This ensures data integrity and compliance during transfer.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Reduced Local Storage: By using FastExport, data is directly streamed from Teradata to BigQuery without the need for local storage, addressing your storage limitations.\n- Minimal Programming: BigQuery Data Transfer Service offers a user-friendly interface, eliminating the need for extensive scripting or coding."
      },
      {
        "user": "AllenChen123",
        "text": "Agree. https://cloud.google.com/bigquery/docs/migration/teradata-overview#extraction_method\nExtraction using a JDBC driver with FastExport connection. If there are constraints on the local storage space available for extracted files, or if there is some reason you can't use TPT, then use this extraction method."
      },
      {
        "user": "chickenwingz",
        "text": "https://cloud.google.com/bigquery/docs/migration/teradata-overview#extraction_method\nLack of local storage pushes this to JDBC driver"
      },
      {
        "user": "Parandhaman_Margan",
        "text": "Use BigQuery Data Transfer Service with the Teradata Parallel Transporter (TPT) tbuild utility...minimal coding"
      },
      {
        "user": "ToiToi",
        "text": "BigQuery Data Transfer Service (DTS): DTS automates data movement from various sources (including Teradata) to BigQuery. It handles schema conversion, data transfer, and scheduling, minimizing manual effort and programming.\nTeradata Parallel Transporter (TPT) tbuild: TPT is a powerful utility for high-performance data extraction from Teradata. The tbuild operator specifically creates optimized external data files.\nEfficiency: Combining DTS with TPT tbuild allows you to efficiently extract lar..."
      },
      {
        "user": "kurayish",
        "text": "Using TPT with the tbuild utility ensures that you can efficiently move large volumes of data directly from Teradata to BigQuery without requiring significant local storage space or extensive custom programming. This method leverages Teradata’s optimized export capabilities and integrates with Google Cloud's tools for seamless data transfer.\nJDBC driver with FastExport can be used, it typically requires more programming and manual setup compared to the TPT solution, and may not be as optimize..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 182,
    "topic": "Security",
    "difficulty": 3,
    "question": "You need to encrypt all data in BigQuery using an encryption key managed by your team. You must implement a mechanism to generate and store encryption material only on your on-premises HSM. You want Google managed solutions. What should you do?",
    "options": [
      "A. Create the key in the on-premises HSM, import it into Cloud KMS key. Associate the Cloud KMS key with BigQuery resources.",
      "B. Create the key in the on-premises HSM, link it to Cloud External Key Manager (Cloud EKM) key. Associate the Cloud KMS key with BigQuery resources.",
      "C. Create the key in the on-premises HSM, import it into Cloud HSM key. Associate the Cloud HSM key with BigQuery resources.",
      "D. Create the key in the on-premises HSM. Create BigQuery resources and encrypt data during ingestion."
    ],
    "correct": 1,
    "explanation": "Create the key in the on-premises HSM, link it to Cloud External Key Manager (Cloud E This managed encryption key service with HSM-backed keys, automatic rotation, and audit logging for regulatory compliance.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Cloud EKM allows you to use encryption keys managed in external key management systems, including on-premises HSMs, while using Google Cloud services.\n- This means that the key material remains in your control and environment, and Google Cloud services use it via the Cloud EKM integration.\n- This approach aligns with the need to generate and store encryption material only on your on-premises HSM and is the correct way to integrate such keys with BigQuery.\n======\nWhy not Option C\n- Cloud HSM..."
      },
      {
        "user": "f74ca0c",
        "text": "https://cloud.google.com/kms/docs/ekm#ekm-management-mode"
      },
      {
        "user": "scaenruy",
        "text": "C. Create the encryption key in the on-premises HSM, and import it into Cloud Key Management Service (Cloud HSM) key. Associate the created Cloud HSM key while creating the BigQuery resources."
      },
      {
        "user": "Matt_108",
        "text": "Option B, I agree with Raaad on the approach"
      },
      {
        "user": "Pime13",
        "text": "check raaad's comment."
      },
      {
        "user": "meh_33",
        "text": "Option B, I agree with Raaad on the approach"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 183,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You notice a streaming Dataflow pipeline is taking a long time to process incoming data. The pipeline graph was automatically optimized and merged into one step. You want to identify the bottleneck. What should you do?",
    "options": [
      "A. Insert a Reshuffle operation after each processing step, and monitor execution details.",
      "B. Insert output sinks after each key processing step, and observe throughput.",
      "C. Log debug information in each ParDo function, and analyze logs.",
      "D. Verify that Dataflow service accounts have appropriate permissions."
    ],
    "correct": 0,
    "explanation": "Insert a Reshuffle operation after each processing step, and monitor execution details This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- The Reshuffle operation is used in Dataflow pipelines to break fusion and redistribute elements, which can sometimes help improve parallelization and identify bottlenecks.\n- By inserting Reshuffle after each processing step and observing the pipeline's performance in the Dataflow console, you can potentially identify stages that are disproportionately slow or stalled.\n- This can help in pinpointing the step where the bottleneck might be occurring."
      },
      {
        "user": "Sofiia98",
        "text": "From the Dataflow documentation: \"There are a few cases in your pipeline where you may want to prevent the Dataflow service from performing fusion optimizations. These are cases in which the Dataflow service might incorrectly guess the optimal way to fuse operations in the pipeline, which could limit the Dataflow service's ability to make use of all available workers.\nYou can insert a Reshuffle step. Reshuffle prevents fusion, checkpoints the data, and performs deduplication of records. Reshu..."
      },
      {
        "user": "scaenruy",
        "text": "A. Insert a Reshuffle operation after each processing step, and monitor the execution details in the Dataflow console."
      },
      {
        "user": "srivastavas08",
        "text": "ince we don't know for sure if fusion is the culprit, detailed debug logging is still the top choice to find the precise slow operation(s)."
      },
      {
        "user": "Blackstile",
        "text": "Reshuffle is the key."
      },
      {
        "user": "m_a_p_s",
        "text": "Looks like A. However, this option does not provide any option of identifying the underlying cause. https://cloud.google.com/dataflow/docs/pipeline-lifecycle#prevent_fusion"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 184,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are running BigQuery in on-demand billing mode executing a CDC process. The CDC process loads 1 GB every 10 minutes into a temporary table, then merges into a 10 TB target table. You want predictable cost. What should you do?",
    "options": [
      "A. Create a BigQuery reservation for the dataset.",
      "B. Create a BigQuery reservation for the job.",
      "C. Create a BigQuery reservation for the service account running the job.",
      "D. Create a BigQuery reservation for the project."
    ],
    "correct": 3,
    "explanation": "Create a BigQuery reservation for the project This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "Matt_108",
        "text": "Option D, reservation can't be applied to resources lower than projects (only to Org, folders or projects)"
      },
      {
        "user": "task_7",
        "text": "Reserve assignments\nTo use the slot capacity you purchased, assign projects, folders, or organizations to a reservation. When a job in a project runs, it uses slots from the assigned reservation. Resources can inherit roles from their parents in the resource hierarchy. Even if a project is not assigned to a reservation, it inherits the assignment from the parent folder or organization, if any. If a project does not have an assigned or inherited reservation, the job uses on-demand pricing. For..."
      },
      {
        "user": "AllenChen123",
        "text": "Seems correct. https://cloud.google.com/bigquery/docs/reservations-intro#understand_workload_management"
      },
      {
        "user": "Positron75",
        "text": "https://cloud.google.com/bigquery/docs/reservations-intro#assignments"
      },
      {
        "user": "Anudeep58",
        "text": "https://cloud.google.com/blog/products/data-analytics/manage-bigquery-costs-with-custom-quotas.\nQuotas can be applied on Project or User Level"
      },
      {
        "user": "f74ca0c",
        "text": "D- choose the correct project and apply the task type background:https://cloud.google.com/bigquery/docs/reservations-intro?hl=fr#assignments"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 185,
    "topic": "BigQuery/DR",
    "difficulty": 2,
    "question": "You are designing a fault-tolerant architecture to store data in a regional BigQuery dataset. You need to recover from corruption within the past seven days. You want the lowest RPO and most cost-effective solution. What should you do?",
    "options": [
      "A. Access historical data by using time travel in BigQuery.",
      "B. Export the data from BigQuery into a new table excluding corrupted data.",
      "C. Create a BigQuery table snapshot on a daily basis.",
      "D. Migrate your data to multi-region BigQuery buckets."
    ],
    "correct": 0,
    "explanation": "Access historical data by using time travel in BigQuery This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Lowest RPO: Time travel offers point-in-time recovery for the past seven days by default, providing the shortest possible recovery point objective (RPO) among the given options. You can recover data to any state within that window.\n- No Additional Costs: Time travel is a built-in feature of BigQuery, incurring no extra storage or operational costs.\n- Managed Service: BigQuery handles time travel automatically, eliminating manual backup and restore processes."
      },
      {
        "user": "Matt_108",
        "text": "Option A, raaad explanation is perfect"
      },
      {
        "user": "srivastavas08",
        "text": "BigQuery's time travel feature typically retains history up to 7 days. However, if the corruption affects the underlying data for an extended period, the 7-day window might not be long enough."
      },
      {
        "user": "CGS22",
        "text": "Meets Recovery Needs: Table snapshots provide point-in-time copies of your data, allowing you to restore data from any point within the last seven days, effectively addressing the corruption event recovery requirement.\nLow RPO: With daily snapshots, your Recovery Point Objective (RPO) is at most 24 hours, satisfying the need for a low RPO.\nManaged Service: Table snapshots are a fully managed service within BigQuery, aligning with your preference.\nCost-Effective: Snapshots only store the chang..."
      },
      {
        "user": "scaenruy",
        "text": "A. Access historical data by using time travel in BigQuery.\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 186,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You are building a streaming Dataflow pipeline that ingests noise level data from hundreds of sensors. You need to detect the average noise level when data is received for more than 30 minutes, but the window ends when no data has been received for 15 minutes. What should you do?",
    "options": [
      "A. Use session windows with a 15-minute gap duration.",
      "B. Use session windows with a 30-minute gap duration.",
      "C. Use hopping windows with a 15-minute window and 30-minute period.",
      "D. Use tumbling windows with a 15-minute window and 15-minute .withAllowedLateness operator."
    ],
    "correct": 0,
    "explanation": "Use session windows with a 15-minute gap duration This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "datapassionate",
        "text": "to detect average noise levels from sensors, the best approach is to use session windows with a 15-minute gap duration (Option A). Session windows are ideal for cases like this where the events (sensor data) are sporadic. They group events that occur within a certain time interval (15 minutes in your case) and a new window is started if no data is received for the duration of the gap. This matches your requirement to end the window when no data is received for 15 minutes, ensuring that the av..."
      },
      {
        "user": "saschak94",
        "text": "You need a window that start when data for a sensor arrives and end when there's a gap in data. That would rule out hopping and tumbling windows.\n- > Windows need to stay open as long as there's data arriving - 30+ mins\n-> Window Should close when no data has been received for 15 mins -> Gap 15 mins"
      },
      {
        "user": "ashdam",
        "text": "But you are not fulfilling this requirement \"You need to detect the average noise level from a sensor when data is received for a duration of more than 30 minutes\". I would say C"
      },
      {
        "user": "shanks_t",
        "text": "The problem requires detecting average noise levels when data is received for more than 30 minutes, but the window should end when no data has been received for 15 minutes.\nSession windows are ideal for this scenario because:\nThey are designed to capture bursts of activity followed by periods of inactivity.\nThey dynamically size based on the data received, which fits well with the variable duration of noise events.\nThe gap duration can be set to define when a session ends.\nThe 15-minute gap d..."
      },
      {
        "user": "JamesKarianis",
        "text": "Without a doubt A: https://cloud.google.com/dataflow/docs/concepts/streaming-pipelines#session-windows"
      },
      {
        "user": "josech",
        "text": "Correct answer: A.\nUse a session Window to cature data and create an aggregation when the Session is larger than 30 minutes.\nhttps://cloud.google.com/dataflow/docs/concepts/streaming-pipelines#session-windows\nhttps://beam.apache.org/releases/javadoc/2.6.0/org/apache/beam/sdk/transforms/windowing/Sessions.html"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 187,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are creating a data model in BigQuery for retail transactions. sales_transaction_header and sales_transaction_line have a tightly coupled immutable relationship. They are rarely modified after load and frequently joined. What should you do?",
    "options": [
      "A. Create a sales_transaction table with header info as rows and line rows as nested and repeated fields.",
      "B. Create a sales_transaction table with header and line info as rows, duplicating header data for each line.",
      "C. Create a sales_transaction table storing both data as JSON data type.",
      "D. Create separate tables and specify sales_transaction_line first in the WHERE clause."
    ],
    "correct": 0,
    "explanation": "Create a sales_transaction table with header info as rows and line rows as nested and This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- In BigQuery, nested and repeated fields can significantly improve performance for certain types of queries, especially joins, because the data is co-located and can be read efficiently. - - This approach is often used in data warehousing scenarios where query performance is a priority, and the data relationships are immutable and rarely modified."
      },
      {
        "user": "josech",
        "text": "Option A https://cloud.google.com/bigquery/docs/best-practices-performance-nested"
      },
      {
        "user": "scaenruy",
        "text": "A. Create a sales_transaction table that holds the sales_transaction_header information as rows and the sales_transaction_line rows as nested and repeated fields."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 188,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You created a new version of a Dataflow streaming pipeline that reads from Pub/Sub and writes to BigQuery. The previous version uses a 5-minute window. You need to deploy without losing data or increasing latency by more than 10 minutes. What should you do?",
    "options": [
      "A. Update the old pipeline with the new pipeline code.",
      "B. Snapshot the old pipeline, stop it, and start the new pipeline from the snapshot.",
      "C. Drain the old pipeline, then start the new pipeline.",
      "D. Cancel the old pipeline, then start the new pipeline."
    ],
    "correct": 0,
    "explanation": "In-place update preserves window state and replaces the job without stopping ingestion, avoiding latency spikes associated with draining.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Graceful Data Transition: Draining the old pipeline ensures it processes all existing data in its buffers and watermarks before shutting down, preventing data loss or inconsistencies.\n- Minimal Latency Increase: The latency increase will be limited to the amount of time it takes to drain the old pipeline, typically within the acceptable 10-minute threshold."
      },
      {
        "user": "AlizCert",
        "text": "I don't think C is correct, as it will immediately fire the window:\n\"Draining can result in partially filled windows. In that case, if you restart the drained pipeline, the same window might fire a second time, which can cause issues with your data. \"\nhttps://cloud.google.com/dataflow/docs/guides/stopping-a-pipeline#effects\nMaybe \"A\" means launching a replacement job?\nhttps://cloud.google.com/dataflow/docs/guides/updating-a-pipeline#Launching"
      },
      {
        "user": "d11379b",
        "text": "So why not B it is the better choice to save intermediate state and easy to use"
      },
      {
        "user": "Ouss_123",
        "text": "- Draining the old pipeline ensures that it finishes processing all in-flight data before stopping, which prevents data loss and inconsistencies.\n- After draining, you can start the new pipeline, which will begin processing new data from where the old pipeline left off.\n- This approach maintains a smooth transition between the old and new versions, minimizing latency increases and avoiding data gaps or overlaps.\n==> Other options, such as updating, snapshotting, or canceling, might not provid..."
      },
      {
        "user": "d11379b",
        "text": "I would choose B as mentioned by Alizcert, a simple drain may cause problem\nDataflow snapshots save the state of a streaming pipeline, which lets you start a new version of your Dataflow job without losing state. Snapshots are useful for backup and recovery, testing and rolling back updates to streaming pipelines, and other similar scenarios."
      },
      {
        "user": "scaenruy",
        "text": "C. Drain the old pipeline, then start the new pipeline."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 189,
    "topic": "Data Catalog",
    "difficulty": 2,
    "question": "Your organization's data assets are stored in BigQuery, Pub/Sub, and a PostgreSQL instance on Compute Engine. Teams are unable to discover existing data assets. You need to improve data discoverability with minimal development. What should you do?",
    "options": [
      "A. Use Data Catalog to automatically catalog BigQuery datasets. Use Data Catalog APIs to manually catalog Pub/Sub topics and PostgreSQL tables.",
      "B. Use Data Catalog to automatically catalog BigQuery datasets and Pub/Sub topics. Use Data Catalog APIs to manually catalog PostgreSQL tables.",
      "C. Use Data Catalog to automatically catalog BigQuery datasets and Pub/Sub topics. Use custom connectors to manually catalog PostgreSQL tables.",
      "D. Use custom connectors to manually catalog BigQuery datasets, Pub/Sub topics, and PostgreSQL tables."
    ],
    "correct": 2,
    "explanation": "Google provides open-source custom connectors for PostgreSQL in Data Catalog, requiring less custom development than writing scripts using APIs manually.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- It utilizes Data Catalog's native support for both BigQuery datasets and Pub/Sub topics.\n- For PostgreSQL tables running on a Compute Engine instance, you'd use Data Catalog APIs to create custom entries, as Data Catalog does not automatically discover external databases like PostgreSQL."
      },
      {
        "user": "datapassionate",
        "text": "Data Catalog is the best choice. But for catalogging PostgreSQL it is better to use a connector when available, instead of using API.\nhttps://cloud.google.com/data-catalog/docs/integrate-data-sources#integrate_unsupported_data_sources"
      },
      {
        "user": "AllenChen123",
        "text": "Agree. https://cloud.google.com/data-catalog/docs/concepts/overview#catalog-non-google-cloud-assets"
      },
      {
        "user": "ML6",
        "text": "Google Recommendation: If you can't find a connector for your data source, you can still manually integrate it by creating entry groups and custom entries. To do that, you can:\n- Use one of the Data Catalog Client Libraries in one of the following languages: C#, Go, Java, Node.js, PHP, Python, or Ruby.\n- Or manually build on the Data Catalog API.\nHowever, there is a connector for PostgreSQL, so option C."
      },
      {
        "user": "tibuenoc",
        "text": "Agree. If it doesn't have a connector, it must be manually built on the Data Catalog API.\nAs PostgreSQL already has a connector it's the best option is C"
      },
      {
        "user": "fitri001",
        "text": "BigQuery Datasets and Pub/Sub Topics: Google Data Catalog can automatically catalog metadata from BigQuery and Pub/Sub, making it easy to discover and manage these data assets without additional development effort.\nPostgreSQL Tables: While Data Catalog does not have built-in connectors for PostgreSQL, you can use the Data Catalog APIs to manually catalog the PostgreSQL tables. This requires some custom development but is manageable compared to creating custom connectors for everything."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 190,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You are building a model to predict whether it will rain. You have thousands of input features and want to improve training speed by removing some features with minimum effect on accuracy. What can you do?",
    "options": [
      "A. Eliminate features that are highly correlated to the output labels.",
      "B. Combine highly co-dependent features into one representative feature.",
      "C. Instead of feeding each feature individually, average their values in batches of 3.",
      "D. Remove features that have null values for more than 50% of training records."
    ],
    "correct": 1,
    "explanation": "Combine highly co-dependent features into one representative feature This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "anji007",
        "text": "Ans: B\nA: correlated to output means that feature can contribute a lot to the model. so not a good idea.\nC: you need to run with almost same number, but you will iterate twice, once for averaging and second time to feed the averaged value.\nD: removing features even if it 50% nulls is not good idea, unless you prove that it is not at all correlated to output. But this is nowhere so can remove."
      },
      {
        "user": "pamepadero",
        "text": "Trying to find a reason why it is B and not D, found this and it seems the answer is D.\nhttps://cloud.google.com/architecture/data-preprocessing-for-ml-with-tf-transform-pt1\nFeature selection. Selecting a subset of the input features for training the model, and ignoring the irrelevant or redundant ones, using filter or wrapper methods. This can also involve simply dropping features if the features are missing a large number of values."
      },
      {
        "user": "rtcpost",
        "text": "B. Combine highly co-dependent features into one representative feature.\nCombining highly correlated features into a single representative feature can reduce the dimensionality of your dataset, making the training process faster while preserving relevant information. This approach often helps eliminate redundancy in the input data.\nOption A (eliminating features that are highly correlated to the output labels) can be counterproductive, as you want to maintain features that are informative for..."
      },
      {
        "user": "sumanshu",
        "text": "Vote for 'B'\ncombining features to createte a new feature is a step of \"Feature construction\"\nor\ndecomposing or splitting features to create new features.\nIdeally, PCA should be apply if we want to reduce the dimension.\nRemoving those columns / features - where Data is miss > 50% (may improve the speed) - but will decrease the accuracy as well. So instead of dropping features where we have missing data, we need to impute something"
      },
      {
        "user": "exnaniantwort",
        "text": "B\nnull values can have many meanings and need different approach to handle, otherwise it causes inaccurate model, so not D"
      },
      {
        "user": "Mushuskath",
        "text": "Should be B. Remember that combining three features doesn’t necessarily mean taking an average. While option number D is quite tempting, we must remember that null values do not mean missing values."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 191,
    "topic": "Orchestration",
    "difficulty": 2,
    "question": "You need to create a SQL pipeline that runs an aggregate SQL transformation on a BigQuery table every two hours and appends the result. You need retry on errors and email notification after three consecutive failures. What should you do?",
    "options": [
      "A. Use the BigQueryUpsertTableOperator in Cloud Composer, set retry to 3, email_on_failure to true.",
      "B. Use the BigQueryInsertJobOperator in Cloud Composer, set retry to 3, email_on_failure to true.",
      "C. Create a BigQuery scheduled query that repeats every 2 hours, and enable email notifications.",
      "D. Create a BigQuery scheduled query that repeats every 2 hours, enable Pub/Sub topic. Use Pub/Sub and Cloud Functions to send email after 3 failures."
    ],
    "correct": 1,
    "explanation": "Use the BigQueryInsertJobOperator in Cloud Composer, set retry to 3, email_on_failure This provides reliable scheduling with error handling and retries.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- It provides a direct and controlled way to manage the SQL pipeline using Cloud Composer (Apache Airflow).\n- The BigQueryInsertJobOperator is well-suited for running SQL jobs in BigQuery, including aggregate transformations and handling of results.\n- The retry and email_on_failure parameters align with the requirements for error handling and notifications.\n- Cloud Composer requires more setup than using BigQuery's scheduled queries directly, but it offers robust workflow management, retry lo..."
      },
      {
        "user": "SuperVan",
        "text": "The prompt wants an email notification sent after three failed attempts. Is there any concern that the retry parameter is set to 3, wouldn't this mean that the email is sent after 4 failed attempts (1 original + 3 retries)?"
      },
      {
        "user": "plum21",
        "text": "\"You want the pipeline to send an email notification after three consecutive failures\" - it is not about retries which are configurable via Composer operator - it is about 3 consecutive executions which could be for different hours."
      },
      {
        "user": "RenePetersen",
        "text": "Option D mentions nothing about how the job retrying is put in place, so for that reason I don't think this is the correct option."
      },
      {
        "user": "MarcoPellegrino",
        "text": "A) Wrong, Upsert is not for appending\nB) Wrong, doesn't mention the 2 hours scheduling\nC) Wrong, doesn't mention the emailing\nD) Correct"
      },
      {
        "user": "datapassionate",
        "text": "D. Create a BigQuery scheduled query to run the SQL transformation with schedule options that repeats every two hours, and enable notification to Pub/Sub topic. Use Pub/Sub and Cloud Functions to send an email after three failed executions\nThis method utilizes BigQuery's native scheduling capabilities for running the SQL job and leverages Pub/Sub and Cloud Functions for customized notification handling, including the specific requirement of sending an email after three consecutive failures."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 192,
    "topic": "Monitoring",
    "difficulty": 3,
    "question": "You are monitoring your data lake on BigQuery. Ingestion pipelines read from Pub/Sub. After a new version, daily stored data increased by 50% but Pub/Sub volumes remained the same. Only some tables had partition data size doubled. What should you do?",
    "options": [
      "A. Check for duplicates. Schedule daily SQL deduplication jobs.",
      "B. Check for code errors. Check for multiple writing. Check Cloud Logging errors. Restore tables using time travel.",
      "C. Check for duplicates. Check BigQuery Audit logs. Use Cloud Monitoring to determine when Dataflow jobs started. Stop all versions except the latest.",
      "D. Roll back deployment. Restore tables using time travel. Restart Dataflow jobs and replay messages."
    ],
    "correct": 2,
    "explanation": "Check for duplicates This Google's managed pub/sub messaging service enabling asynchronous communication with built-in ordering guarantees and at-least-once delivery semantics.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Detailed Investigation of Logs and Jobs Checking for duplicate rows targets the potential immediate cause of the issue.\n- Checking the BigQuery Audit logs helps identify which jobs might be contributing to the increased data volume.\n- Using Cloud Monitoring to correlate job starts with pipeline versions helps identify if a specific version of the pipeline is responsible.\n- Managing multiple versions of pipelines ensures that only the intended version is active, addressing any versioning err..."
      },
      {
        "user": "RenePetersen",
        "text": "This does not fix the error, it basically assumes that the error is not really there."
      },
      {
        "user": "SamuelTsch",
        "text": "No idea which one to choose. Option C miss a step - to restore the tables."
      },
      {
        "user": "task_7",
        "text": "B. Check for code errors in the deployed pipelines, multiple writing to pipeline BigQuery sink, errors in Cloud Logging, and if necessary, restore tables using time travel.\nCheck for code errors\nCheck for multiple writes\nCheck Cloud Logging\nRestore tables if necessary:"
      },
      {
        "user": "Ryannn23",
        "text": "\" You need to investigate and fix the cause of the data increase. \" - fixing the target tables was not required."
      },
      {
        "user": "Matt_108",
        "text": "Option C - agree with Raaad on the reasons"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 193,
    "topic": "Data Catalog",
    "difficulty": 2,
    "question": "You have a BigQuery dataset named 'customers'. All tables will be tagged using a 'gdpr' Data Catalog tag template. All employees must be able to find tables by the 'has_sensitive_data' field. Only HR should see data where has_sensitive_data is true. What should you do?",
    "options": [
      "A. Create the gdpr tag template with private visibility. Assign bigquery.dataViewer to HR group on tables with sensitive data.",
      "B. Create the gdpr tag template with private visibility. Assign datacatalog.tagTemplateViewer to all employees. Assign bigquery.dataViewer to HR group.",
      "C. Create the gdpr tag template with public visibility. Assign bigquery.dataViewer to HR group on tables with sensitive data.",
      "D. Create the gdpr tag template with public visibility. Assign datacatalog.tagTemplateViewer to all employees. Assign bigquery.dataViewer to HR group."
    ],
    "correct": 1,
    "explanation": "Public visibility requires data access to view tags. Private visibility allows all employees to search tags via tagTemplateViewer without needing BigQuery dataViewer access.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- The most straightforward solution with minimal configuration overhead.\n- By creating the \"gdpr\" tag template with public visibility, you ensure that all employees can search and find tables based on the \"has_sensitive_data\" field.\n- Assigning the bigquery.dataViewer role to the HR group on tables with sensitive data ensures that only they can view the actual data in these tables."
      },
      {
        "user": "tibuenoc",
        "text": "If you working with PII, We can't granted public access. So Private Visibility for the Tag Template its the best option.\nCheck it https://cloud.google.com/data-catalog/docs/tags-and-tag-templates"
      },
      {
        "user": "scaenruy",
        "text": "D. Create the “gdpr” tag template with public visibility. Assign the datacatalog.tagTemplateViewer role on this tag to the all employees group, and assign the bigquery.dataViewer role to the HR group on the tables that contain sensitive data."
      },
      {
        "user": "ML6",
        "text": "Wouldn't employees still need the roles/datacatalog.tagTemplateViewer role to view private AND public tags?\nTo get the permissions that you need to view public and private tags on Bigtable resources, ask your administrator to grant you the following IAM roles:\n- roles/datacatalog.tagTemplateViewer\n- roles/bigtable.viewer\nSource: https://cloud.google.com/bigtable/docs/manage-data-assets-using-data-catalog#permissions-view-tags"
      },
      {
        "user": "meh_33",
        "text": "This Guy Raasd is mostly correct with explanation thanks mate."
      },
      {
        "user": "d11379b",
        "text": "While D works well, it is not obligated to give all employees the role of tagTemplateViewer, as it will give them the view permission for tag templates as well as the tags created by the template.\nHowever, Tags are a type of business metadata. Adding tags to a data entry helps provide meaningful context to anyone who needs to use the asset.And public tags provide less strict access control for searching and viewing the tag as compared to private tags. Any user who has the required view permis..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 194,
    "topic": "Cloud Composer",
    "difficulty": 2,
    "question": "You are creating the CI/CD cycle for Cloud Composer DAGs. Your team has dev and prod instances. You use Git. You want to deploy DAGs automatically when a certain tag is pushed. What should you do?",
    "options": [
      "A. Use Cloud Build to copy DAG code to the dev Cloud Storage bucket. If tests pass, copy to the prod bucket.",
      "B. Use Cloud Build to build a container. Use KubernetesPodOperator to deploy to dev GKE cluster. If tests pass, use KubernetesPodOperator to deploy to prod GKE.",
      "C. Use Cloud Build to build a container and KubernetesPodOperator to deploy to dev GKE. If tests pass, copy code to prod Cloud Storage bucket.",
      "D. Use Cloud Build to copy DAG code to dev bucket. If tests pass, build a container and use KubernetesPodOperator to deploy to prod GKE."
    ],
    "correct": 0,
    "explanation": "Use Cloud Build to copy DAG code to the dev Cloud Storage bucket This orchestrates complex data workflows with error handling and monitoring.",
    "discussion": [
      {
        "user": "BIGQUERY_ALT_ALT",
        "text": "The Answer is A. Given that there are two instances (development and production) already available, and the goal is to deploy DAGs to Cloud Composer not entire composer infra build.\nExplanation:\n- This approach leverages Cloud Build to manage the deployment process.\n- It first deploys the code to the Cloud Storage bucket of the development instance for testing purposes.\n- If the tests are successful in the development environment, the same Cloud Build process is used to copy the code to the C..."
      },
      {
        "user": "Matt_108",
        "text": "Option A, DAGs are routinely stored in cloud storage buckets, Cloud Build act as a trigger for both the deployment process to test env and the test itslef\nhttps://cloud.google.com/composer/docs/dag-cicd-integration-guide"
      },
      {
        "user": "meh_33",
        "text": "Most confusing question to confuse us why GKE needed its already mentioned they have 2 composer environment"
      },
      {
        "user": "Smakyel79",
        "text": "This approach is straightforward and leverages Cloud Build to automate the deployment process. It doesn't require containerization, making it simpler and possibly quicker."
      },
      {
        "user": "GCP001",
        "text": "C.\nIt looks the correct choice, first build, test and verify everything on dev enviornment and then just copy the files on prod bucket.\nhttps://cloud.google.com/composer/docs/dag-cicd-integration-guide"
      },
      {
        "user": "Sofiia98",
        "text": "But why do we need the Google Kubernetes Engine (GKE) cluster for this?"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 195,
    "topic": "Security",
    "difficulty": 3,
    "question": "You have a BigQuery table that ingests data directly from a Pub/Sub subscription encrypted with Google-managed key. A new policy requires CMEK. What should you do?",
    "options": [
      "A. Use Cloud KMS key with Dataflow to ingest the existing Pub/Sub subscription to the existing table.",
      "B. Create a new BigQuery table using CMEK, migrate data from the old table.",
      "C. Create a new Pub/Sub topic with CMEK and use the existing BigQuery table.",
      "D. Create a new BigQuery table and Pub/Sub topic using CMEK, and migrate the data."
    ],
    "correct": 1,
    "explanation": "Create a new BigQuery table using CMEK, migrate data from the old table This Google's managed pub/sub messaging service enabling asynchronous communication with built-in ordering guarantees and at-least-once delivery semantics.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- New BigQuery Table with CMEK: This option involves creating a new BigQuery table configured to use a CMEK from Cloud KMS. It directly addresses the need to use a CMEK for data at rest in BigQuery.\n- Migrate Data: Migrating data from the old table (encrypted with a Google-managed key) to the new table (encrypted with CMEK) ensures that all existing data complies with the new policy."
      },
      {
        "user": "Matt_108",
        "text": "But also pub/sub has some data at rest, e.g. messages with retention period.\nTo comply with the organisation policy, we need to adapt also pub/sub"
      },
      {
        "user": "ML6",
        "text": "Correct, but the question states 'use keys from a centralized Cloud KMS project', so only D is correct."
      },
      {
        "user": "Anudeep58",
        "text": "D. Create a new BigQuery table and Pub/Sub topic by using customer-managed encryption keys (CMEK), and migrate the data from the old BigQuery table.\nThis approach comprehensively addresses the requirement to use CMEK from a centralized Cloud KMS project for encrypting data at rest:\nCreate a new Pub/Sub topic configured to use CMEK from the centralized Cloud KMS project.\nCreate a new BigQuery table with CMEK enabled, using the same centralized Cloud KMS project.\nUpdate the ingestion process to..."
      },
      {
        "user": "josech",
        "text": "BigQuery and Pub/Sub shall be encrypted using CMEK using new versions of each one.\nhttps://cloud.google.com/pubsub/docs/encryption#using-cmek"
      },
      {
        "user": "Izzyt99",
        "text": "D - 'as new organization policy that requires you to use keys from a centralized Cloud Key Management Service (Cloud KMS) project to encrypt data at rest.' Therefore, the Pub/Sub default Google-managed encryption key is not sufficient as the organization requires it's own CMEK that is to be generated from a centralized Cloud KMS project."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 196,
    "topic": "Dataproc",
    "difficulty": 2,
    "question": "You created an analytics environment. The data in the on-premises HDFS cluster is in ORC format. The data scientist team needs to explore the data with SQL on Hive. You need the most cost-effective solution. What should you do?",
    "options": [
      "A. Import the ORC files to Bigtable tables.",
      "B. Import the ORC files to BigQuery tables.",
      "C. Copy the ORC files on Cloud Storage, then deploy a Dataproc cluster.",
      "D. Copy the ORC files on Cloud Storage, then create external BigQuery tables."
    ],
    "correct": 3,
    "explanation": "Copy the ORC files on Cloud Storage, then create external BigQuery tables This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- It leverages the strengths of BigQuery for SQL-based exploration while avoiding additional costs and complexity associated with data transformation or migration.\n- The data remains in ORC format in Cloud Storage, and BigQuery's external tables feature allows direct querying of this data."
      },
      {
        "user": "kaisarfarel",
        "text": "I think C is the correct answer, DS want to explore the data in a \"similar way as they used the on-premises HDFS cluster with SQL on the Hive query engine\". Dataproc can help to create clusters quickly with the Hadoop cluster. CMIIW"
      },
      {
        "user": "0725f1f",
        "text": "it is talking about partition as well"
      },
      {
        "user": "Smakyel79",
        "text": "This approach leverages BigQuery's powerful analytics capabilities without the overhead of data transformation or maintaining a separate cluster, while also allowing your team to use SQL for data exploration, similar to their experience with the on-premises Hadoop/Hive environment."
      },
      {
        "user": "apoio.certificacoes.",
        "text": "I think \"Similar\" is doing a lot of heavy lift on the confusion. If it was equal, I'd say C. Since it similar, it can be GoogleSQL (Bigquery)."
      },
      {
        "user": "Matt_108",
        "text": "Option D - leverages BigQuery for SQL-based exploration on direct querying to cloud storage"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 197,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You are designing a Dataflow pipeline for a batch processing job. You want to mitigate multiple zonal failures at job submission time. What should you do?",
    "options": [
      "A. Submit duplicate pipelines in two different zones.",
      "B. Set the pipeline staging location as a regional Cloud Storage bucket.",
      "C. Specify a worker region by using the --region flag.",
      "D. Create an Eventarc trigger to resubmit the job in case of zonal failure."
    ],
    "correct": 2,
    "explanation": "Specify a worker region by using the --region flag This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "Matt_108",
        "text": "Option C: https://cloud.google.com/dataflow/docs/guides/pipeline-workflows#zonal-failures"
      },
      {
        "user": "raaad",
        "text": "- Specifying a worker region (instead of a specific zone) allows Google Cloud's Dataflow service to manage the distribution of resources across multiple zones within that region"
      },
      {
        "user": "scaenruy",
        "text": "C. Specify a worker region by using the --region flag."
      },
      {
        "user": "Pime13",
        "text": "C. Specify a worker region by using the --region flag.\nThis ensures that your Dataflow job is submitted to a region rather than a specific zone, providing higher availability and resilience against zonal failures\nhttps://cloud.google.com/dataflow/docs/guides/pipeline-workflows#zonal-failures"
      },
      {
        "user": "Sofiia98",
        "text": "https://cloud.google.com/dataflow/docs/guides/pipeline-workflows#zonal-failures"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 198,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You are designing a real-time system for a ride hailing app that identifies areas with high demand. The data processing involves real-time aggregation of the last 30 seconds every 2 seconds, storing results in a low-latency system. What should you do?",
    "options": [
      "A. Group data using a tumbling window in Dataflow, write to Memorystore.",
      "B. Group data using a hopping window in Dataflow, write to Memorystore.",
      "C. Group data using a session window in Dataflow, write to BigQuery.",
      "D. Group data using a hopping window in Dataflow, write to BigQuery."
    ],
    "correct": 1,
    "explanation": "Group data using a hopping window in Dataflow, write to Memorystore This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Hopping Window: Hopping windows are fixed-sized, overlapping intervals.\n- Aggregate data over the last 30 seconds, every 2 seconds, as hopping windows allow for overlapping data analysis.\n- Memorystore: Ideal for low-latency access required for real-time visualization and analysis."
      },
      {
        "user": "anushree09",
        "text": "Hopping windows are sliding windows. It makes sense to use that over tumbling (fixed) window because the ask is to collect last 30 seconds of data every 5 second"
      },
      {
        "user": "scaenruy",
        "text": "B. Group the data by using a hopping window in a Dataflow pipeline, and write the aggregated data to Memorystore."
      },
      {
        "user": "Jeyaraj",
        "text": "OPTION A. (IGNORE MY Previous Comment)\nTumbling windows are the best choice for this ride-hailing app because they provide accurate 2-second aggregations without the complexities of overlapping data. This is crucial for real-time decision-making and ensuring accurate visualization of supply and demand.\nHopping windows introduce potential inaccuracies and complexity, making them less suitable for this scenario. While they can be useful in other situations, they are not the optimal choice for r..."
      },
      {
        "user": "Jeyaraj",
        "text": "Option B.\nTumbling windows are the best choice for this ride-hailing app because they provide accurate 2-second aggregations without the complexities of overlapping data. This is crucial for real-time decision-making and ensuring accurate visualization of supply and demand.\nHopping windows introduce potential inaccuracies and complexity, making them less suitable for this scenario. While they can be useful in other situations, they are not the optimal choice for real-time aggregation with str..."
      },
      {
        "user": "ashdam",
        "text": "hopping window is clear but memorystore vs bigquery?? Why memorystore and not bigquery?"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 199,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "Your car factory is pushing machine measurements to Pub/Sub topic. A Dataflow streaming job reads these messages, applies business logic in a DoFn, and writes to BigQuery. You want to ensure that if business logic fails on a message, the message will be sent to a Pub/Sub topic for monitoring. What should you do?",
    "options": [
      "A. Enable retaining of acknowledged messages. Use Cloud Monitoring to monitor the metric.",
      "B. Use exception handling in Dataflow's DoFn code to push failed messages through a side output to a new Pub/Sub topic.",
      "C. Enable dead lettering in your Pub/Sub pull subscription.",
      "D. Create a snapshot of your Pub/Sub pull subscription."
    ],
    "correct": 1,
    "explanation": "Use exception handling in Dataflow's DoFn code to push failed messages through a side This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Exception Handling in DoFn: Implementing an exception handling block within DoFn in Dataflow to catch failures during processing is a direct way to manage errors.\n- Side Output to New Topic: Using a side output to redirect failed messages to a new Pub/Sub topic is an effective way to isolate and manage these messages.\n- Monitoring: Monitoring the num_unacked_messages_by_region on the new topic can alert you to the presence of failed messages."
      },
      {
        "user": "chrissamharris",
        "text": "Option C - dead letter topic is built in and requires no changes https://cloud.google.com/pubsub/docs/handling-failures\nEnable dead lettering in your Pub/Sub pull subscription, and specify a new Pub/Sub topic as the dead letter topic. Use Cloud Monitoring to monitor the subscription/dead_letter_message_count metric on your pull subscription."
      },
      {
        "user": "Positron75",
        "text": "Dead lettering is used to handle messages that have not been acknowledged, but that's unrelated to the processing that Dataflow does, which takes place later in the chain. A message could still be acknowledged and fail processing for whatever reason, so it would not be sent to the dead letter topic.\nAlso, Google advises against using dead lettering with Dataflow anyway: https://cloud.google.com/dataflow/docs/concepts/streaming-with-cloud-pubsub#dead-letter-topics\nCorrect answer is B. The erro..."
      },
      {
        "user": "joao_01",
        "text": "I think that C is not right anyways: In order to use dead_letter feature, the message CANNOT be acknowledge (somehow) by the subscriber. In this question it says that the messages are first acknowledge and then applied the business logic. So, if there are error in the business logic we cannot use the feature dead_letter, beacuse the message was already acknowledge. Thus, option B is the right one."
      },
      {
        "user": "7787de3",
        "text": "See here:\nhttps://cloud.google.com/dataflow/docs/concepts/streaming-with-cloud-pubsub#unsupported-features\nIt's not recommended to use Pub/Sub dead-letter topics with Dataflow (...) Instead, implement the dead-letter pattern explicitly in the pipeline"
      },
      {
        "user": "Jeyaraj",
        "text": "Option B.\nHere's why:\nSide Output for Failed Messages: Dataflow allows you to use side outputs to handle messages that fail processing. In your DoFn , you can catch exceptions and write the failed messages to a separate PCollection . This PCollection can then be written to a new Pub/Sub topic.\nNew Pub/Sub Topic for Monitoring: Creating a dedicated Pub/Sub topic for failed messages allows you to monitor it specifically for alerting purposes. This provides a clear view of any issues with your b..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 200,
    "topic": "Security/IAM",
    "difficulty": 2,
    "question": "You want to store your team's shared tables in a single dataset readable but unmodifiable by analysts. Analysts should have individual workspaces not accessible by other analysts. What should you do?",
    "options": [
      "A. Give analysts BigQuery Data Viewer role at project level. Create one other dataset, give editors on that dataset.",
      "B. Give analysts Data Viewer at project level. Create a dataset for each analyst, give Data Editor at project level.",
      "C. Give analysts Data Viewer on the shared dataset. Create a dataset for each analyst, give each analyst Data Editor at the dataset level for their assigned dataset.",
      "D. Give analysts Data Viewer on the shared dataset. Create one other dataset and give analysts Data Editor on that dataset."
    ],
    "correct": 2,
    "explanation": "Give analysts Data Viewer on the shared dataset This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Data Viewer on Shared Dataset: Grants read-only access to the shared dataset.\n- Data Editor on Individual Datasets: Giving each analyst Data Editor role on their respective dataset creates private workspaces where they can create and store personal tables without exposing them to other analysts."
      },
      {
        "user": "Sofiia98",
        "text": "option C, because analysts can not see the individual datasets of other analysts"
      },
      {
        "user": "scaenruy",
        "text": "C. Give analysts the BigQuery Data Viewer role on the shared dataset. Create a dataset for each analyst, and give each analyst the BigQuery Data Editor role at the dataset level for their assigned dataset.\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 201,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "Your company is performing data preprocessing for ML in Cloud Dataflow. Numerous data logs are generated. Data scientists wrote code to read data. You want to improve performance of data read. What should you do?",
    "options": [
      "A. Specify the TableReference object in the code.",
      "B. Use .fromQuery operation to read specific fields from the table.",
      "C. Use both Google BigQuery TableSchema and TableFieldSchema classes.",
      "D. Call a transform that returns TableRow objects."
    ],
    "correct": 1,
    "explanation": "Use .fromQuery operation to read specific fields from the table This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "arthur2385",
        "text": "B BigQueryIO.read.fromQuery() executes a query and then reads the results received after the query execution. Therefore, this function is more time-consuming, given that it requires that a query is first executed (which will incur in the corresponding economic and computational costs)."
      },
      {
        "user": "maxdataengineer",
        "text": "Since we want to be able to analyze data from a new ML feature (column) we only need to check values from that column. By doing a fromQuery(SELECT featueColum FROM table)\nwe are optimizing costs and performance since we are not checking all columns.\nhttps://cloud.google.com/bigquery/docs/best-practices-costs#avoid_select_"
      },
      {
        "user": "gcm7",
        "text": "reading only relevant cols"
      },
      {
        "user": "rtcpost",
        "text": "B. Use the .fromQuery operation to read specific fields from the table.\nUsing the .fromQuery operation allows you to specify the exact fields you need to read from the table, which can significantly improve performance by reducing the amount of data that needs to be processed. This is particularly important when dealing with large and growing datasets.\nOption A (specifying the TableReference object) provides information about the table but doesn't inherently improve the performance of reading..."
      },
      {
        "user": "kelvintoys93",
        "text": "Guys, how is B the answer? Like all the justifications given here, BigQueryIO.read.fromQuery() is time consuming and the question asked for a better performance solution."
      },
      {
        "user": "cetanx",
        "text": "According to Chat GPT, it is also B\nIn general, if your \"primary goal is to reduce the amount of data read and transferred\", and the downstream processing mainly focuses on a subset of fields, using .fromQuery to select specific fields would be a good choice.\nOn the other hand, if you need to simplify downstream processing and optimize resource utilization, transforming data into TableRow objects might be more suitable."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 202,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You are running a streaming pipeline with Dataflow and hopping windows. Some late data is not being marked as late. You need to capture late data in the appropriate window. What should you do?",
    "options": [
      "A. Use watermarks to define expected data arrival window. Allow late data.",
      "B. Change to tumbling windows.",
      "C. Change to session windows.",
      "D. Expand your hopping window."
    ],
    "correct": 0,
    "explanation": "Use watermarks to define expected data arrival window. Allow late data This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Watermarks: Watermarks in a streaming pipeline are used to specify the point in time when Dataflow expects all data up to that point to have arrived.\n- Allow Late Data: configure the pipeline to accept and correctly process data that arrives after the watermark, ensuring it's captured in the appropriate window."
      },
      {
        "user": "Matt_108",
        "text": "Option A - https://cloud.google.com/dataflow/docs/concepts/streaming-pipelines#watermarks"
      },
      {
        "user": "Sofiia98",
        "text": "https://cloud.google.com/dataflow/docs/concepts/streaming-pipelines#watermarks"
      },
      {
        "user": "Pime13",
        "text": "https://cloud.google.com/dataflow/docs/concepts/streaming-pipelines#watermarks\nA watermark is a threshold that indicates when Dataflow expects all of the data in a window to have arrived. If the watermark has progressed past the end of the window and new data arrives with a timestamp within the window, the data is considered late data. For more information, see Watermarks and late data in the Apache Beam documentation.\nDataflow tracks watermarks because of the following reasons:\nData is not g..."
      },
      {
        "user": "m_a_p_s",
        "text": "A - https://cloud.google.com/dataflow/docs/concepts/streaming-pipelines#watermarks"
      },
      {
        "user": "scaenruy",
        "text": "A. Use watermarks to define the expected data arrival window. Allow late data as it arrives."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 203,
    "topic": "Bigtable",
    "difficulty": 2,
    "question": "You work for an ecommerce company using Bigtable with garbage collection set to delete data after 30 days (versions=1). Data analysts sometimes see data older than 30 days. What should you do?",
    "options": [
      "A. Set expiring values of column families to 29 days, keep versions to 1.",
      "B. Use a timestamp range filter in the query to fetch data for a specific range.",
      "C. Schedule a daily job to scan and delete data older than 30 days.",
      "D. Set expiring values to 30 days and set versions to 2."
    ],
    "correct": 1,
    "explanation": "Use a timestamp range filter in the query to fetch data for a specific range This NoSQL wide-column store optimized for time-series and analytical workloads with millisecond latency, automatic scaling, and replication.",
    "discussion": [
      {
        "user": "AllenChen123",
        "text": "Agree. https://cloud.google.com/bigtable/docs/garbage-collection#data-removed\n\"Because it can take up to a week for expired data to be deleted, you should never rely solely on garbage collection policies to ensure that read requests return the desired data. Always apply a filter to your read requests that excludes the same values as your garbage collection rules. You can filter by limiting the number of cells per column or by specifying a timestamp range.\""
      },
      {
        "user": "Matt_108",
        "text": "Agree with others https://cloud.google.com/bigtable/docs/garbage-collection"
      },
      {
        "user": "cuadradobertoliniseb",
        "text": "Agree with MAtt_108 and AllenChen 123.\n\"Garbage collection is a continuous process in which Bigtable checks the rules for each column family and deletes expired and obsolete data accordingly. In general, it can take up to a week from the time that data matches the criteria in the rules for the data to actually be deleted. You are not able to change the timing of garbage collection.\"\n\"Always apply a filter to your read requests that exclude the same values as your garbage collection rules. \"\nR..."
      },
      {
        "user": "GCP001",
        "text": "B. Use a timestamp range filter in the query to fetch the customer's data for a specific range.\nAlways use query filter as garbage collectore runs on it's way - https://cloud.google.com/bigtable/docs/garbage-collection"
      },
      {
        "user": "Ben_oso",
        "text": "Its \"B\", but the filter responsability transfer to user, so, this dont ensure that him filter the data."
      },
      {
        "user": "Pime13",
        "text": "Because it can take up to a week for expired data to be deleted, you should never rely solely on garbage collection policies to ensure that read requests return the desired data. Always apply a filter to your read requests that excludes the same values as your garbage collection rules. You can filter by limiting the number of cells per column or by specifying a timestamp range."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 204,
    "topic": "Dataflow/BigQuery",
    "difficulty": 2,
    "question": "You are using a Dataflow streaming job to read from a message bus that does not support exactly-once delivery. You want to ensure exactly-once delivery to BigQuery. You expect throughput of about 1.5 GB per second. What should you do?",
    "options": [
      "A. Use the BigQuery Storage Write API and ensure table is regional.",
      "B. Use the BigQuery Storage Write API and ensure table is multiregional.",
      "C. Use the BigQuery Streaming API and ensure table is regional.",
      "D. Use the BigQuery Streaming API and ensure table is multiregional."
    ],
    "correct": 0,
    "explanation": "Use the BigQuery Storage Write API and ensure table is regional This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "AlizCert",
        "text": "It should B, Storage Write API has \"3 GB per second throughput in multi-regions; 300 MB per second in regions\""
      },
      {
        "user": "raaad",
        "text": "- BigQuery Storage Write API: This API is designed for high-throughput, low-latency writing of data into BigQuery. It also provides tools to prevent data duplication, which is essential for exactly-once delivery semantics.\n- Regional Table: Choosing a regional location for the BigQuery table could potentially provide better performance and lower latency, as it would be closer to the Dataflow job if they are in the same region."
      },
      {
        "user": "AllenChen123",
        "text": "Agree.\nhttps://cloud.google.com/bigquery/docs/write-api#advantages"
      },
      {
        "user": "Siahara",
        "text": "A. Implement the BigQuery Storage Write API and guarantee that the target BigQuery table is regional.\nHere's the breakdown:\nWhy Option A is Superior\nExactly-Once Delivery: The BigQuery Storage Write API intrinsically supports exactly-once delivery using stream offsets. This guarantees that each message is written to BigQuery exactly one time, even in the case of retries due to the lack of native exactly-once support in your message bus.\nHigh Throughput: The Storage Write API is optimized for ..."
      },
      {
        "user": "SamuelTsch",
        "text": "looking for this documentation https://cloud.google.com/bigquery/quotas#write-api-limits. 3 GB/s in multi-regions; 300MB/s in regions"
      },
      {
        "user": "Smakyel79",
        "text": "This option leverages the BigQuery Storage Write API's capability for exactly-once delivery semantics and a regional table setting that can meet compliance and data locality needs without impacting the delivery semantics. The BigQuery Storage Write API is more suitable for your high-throughput requirements compared to the BigQuery Streaming API."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 205,
    "topic": "BigLake",
    "difficulty": 2,
    "question": "You have created an external table for Apache Hive partitioned data in Cloud Storage with a large number of files. Queries are slow. You want to improve performance. What should you do?",
    "options": [
      "A. Change storage class from Coldline to Standard.",
      "B. Create individual external tables for each Hive partition using wildcard table queries.",
      "C. Upgrade the external table to a BigLake table. Enable metadata caching.",
      "D. Migrate the Hive partitioned data to a multi-region Cloud Storage bucket."
    ],
    "correct": 2,
    "explanation": "Upgrade the external table to a BigLake table. Enable metadata caching This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- BigLake Table: BigLake allows for more efficient querying of data lakes stored in Cloud Storage. It can handle large datasets more effectively than standard external tables.\n- Metadata Caching: Enabling metadata caching can significantly improve query performance by reducing the time taken to read and process metadata from a large number of files."
      },
      {
        "user": "AllenChen123",
        "text": "And https://cloud.google.com/bigquery/docs/external-data-cloud-storage#upgrade-external-tables-to-biglake-tables"
      },
      {
        "user": "AllenChen123",
        "text": "Agree. https://cloud.google.com/bigquery/docs/biglake-intro#metadata_caching_for_performance"
      },
      {
        "user": "GCP001",
        "text": "C. Upgrade the external table to a BigLake table. Enable metadata caching for the table.\nCheck ref - https://cloud.google.com/bigquery/docs/biglake-intro\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 206,
    "topic": "Bigtable/BigQuery",
    "difficulty": 2,
    "question": "You have 1000 sensors generating time series data. You need to retrieve metrics for a specific sensor at a specific timestamp with millisecond latency, and run complex analytic queries daily. How should you store this data?",
    "options": [
      "A. Store in BigQuery. Concatenate sensor ID and timestamp as primary key.",
      "B. Store in Bigtable. Concatenate sensor ID and timestamp as row key. Export to BigQuery daily.",
      "C. Store in Bigtable. Concatenate sensor ID and metric as row key. Export to BigQuery daily.",
      "D. Store in BigQuery. Use the metric as a primary key."
    ],
    "correct": 1,
    "explanation": "Store in Bigtable This observability service collecting metrics from GCP resources and custom applications; enables alerting and dashboards.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Bigtable excels at incredibly fast lookups by row key, often reaching single-digit millisecond latencies.\n- Constructing the row key with sensor ID and timestamp enables efficient retrieval of specific sensor readings at exact timestamps.\n- Bigtable's wide-column design effectively stores time series data, allowing for flexible addition of new metrics without schema changes.\n- Bigtable scales horizontally to accommodate massive datasets (petabytes or more), easily handling the expected data..."
      },
      {
        "user": "Smakyel79",
        "text": "Based on your requirements, Option B seems most suitable. Bigtable's design caters to the low-latency access of time-series data (your first requirement), and the daily export to BigQuery enables complex analytics (your second requirement). The use of sensor ID and timestamp as the row key in Bigtable would facilitate efficient access to specific sensor data at specific times."
      },
      {
        "user": "scaenruy",
        "text": "B. Store your data in Bigtable. Concatenate the sensor ID and timestamp and use it as the row key. Perform an export to BigQuery every day."
      },
      {
        "user": "fitri001",
        "text": "agree with raaad"
      },
      {
        "user": "22c1725",
        "text": "If anyone in the future answers other then B I wouldn't be suprise."
      },
      {
        "user": "Matt_108",
        "text": "Option B - agree with raaad"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 207,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You have 100 GB of outdated data in BigQuery that will only be accessed once or twice a year for analytics. For backup, you want to store this data immutably for 3 years. You want to minimize storage costs. What should you do?",
    "options": [
      "A. Create a BigQuery table clone. Query the clone when needed.",
      "B. Create a BigQuery table snapshot. Restore the snapshot when needed.",
      "C. Export to a Cloud Storage bucket with archive storage class. Enable versioning. Create an external table.",
      "D. Export to a Cloud Storage bucket with archive storage class. Set a locked retention policy. Create an external table."
    ],
    "correct": 3,
    "explanation": "Export to a Cloud Storage bucket with archive storage class This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "raaad",
        "text": "Straight Forward"
      },
      {
        "user": "fitri001",
        "text": "For data keeping till last 3 years, use bucket lock with rentention policy"
      },
      {
        "user": "Matt_108",
        "text": "Option D, clearly"
      },
      {
        "user": "GCP001",
        "text": "D.\nFor data keeping till last 3 years, use bucket lock with rentention policy"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 208,
    "topic": "Dataproc",
    "difficulty": 2,
    "question": "You have thousands of Apache Spark jobs running on-premises on Hadoop. You want to migrate to Google Cloud using managed services with minimal code changes. What should you do?",
    "options": [
      "A. Move data to BigQuery. Convert Spark scripts to SQL.",
      "B. Rewrite jobs in Apache Beam. Run on Dataflow.",
      "C. Copy data to Compute Engine disks. Run jobs directly on those instances.",
      "D. Move data to Cloud Storage. Run jobs on Dataproc."
    ],
    "correct": 3,
    "explanation": "Move data to Cloud Storage. Run jobs on Dataproc This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "ML6",
        "text": "D) That is what Dataproc is made for. It is a fully managed and highly scalable service for running Apache Hadoop, Apache Spark, etc."
      },
      {
        "user": "GCP001",
        "text": "D. Move your data to Cloud Storage. Run your jobs on Dataproc.\nDataproc is managed service and not needed much code changes."
      },
      {
        "user": "scaenruy",
        "text": "D. Move your data to Cloud Storage. Run your jobs on Dataproc."
      },
      {
        "user": "hanoverquay",
        "text": "option D, minimum code changes"
      },
      {
        "user": "hussain.sain",
        "text": "D is correct.\nDataproc is the most suitable choice for migrating your existing Apache Spark jobs to Google Cloud because it is a fully managed service that supports Apache Spark and Hadoop workloads with minimal changes to your existing code. Moving your data to Cloud Storage and running jobs on Dataproc offers a fast, efficient, and scalable solution for your needs."
      },
      {
        "user": "meh_33",
        "text": "option D, minimum code changes"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 209,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are administering shared BigQuery datasets. The marketing team is concerned about variability of their monthly BigQuery analytics spend using on-demand billing. You need to help establish consistent spend each month. What should you do?",
    "options": [
      "A. Create a BigQuery Enterprise reservation with baseline 250 slots and autoscaling to 500.",
      "B. Establish a BigQuery quota limiting maximum bytes scanned each day.",
      "C. Create a BigQuery reservation with baseline 500 slots with no autoscaling.",
      "D. Create a BigQuery Standard pay-as-you-go reservation with baseline 0 slots and autoscaling to 500."
    ],
    "correct": 2,
    "explanation": "Create a BigQuery reservation with baseline 500 slots with no autoscaling This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "raaad",
        "text": "Reservations guarantee a fixed number of slots (computational resources) for BigQuery queries, ensuring a predictable monthly cost, addressing the marketing team's concern about variability."
      },
      {
        "user": "saschak94",
        "text": "If you use B - the marketing team wouldn't be able to run their queries when the quota is reached, which could harm the business.\nHaving a reservation for 500 slots and no autoscaling gives you exact predictable cost for each month without harming the business or have variable cost with autoscaling\nSo C should be the right answer"
      },
      {
        "user": "8284a4c",
        "text": "The correct answer is:\nA. Create a BigQuery Enterprise reservation with a baseline of 250 slots and autoscaling set to 500 for the marketing team, and bill them back accordingly.\nHere's the rationale:\nConsistent Spend with Reservation: Creating a BigQuery Enterprise reservation provides the marketing team with dedicated slots, which can help stabilize and predict their monthly costs. By having a reservation baseline of 250 slots, they are guaranteed a certain level of performance and cost eac..."
      },
      {
        "user": "Anudeep58",
        "text": "The question clearly mentions, that team is using the on-demand billing mode in BiqQuery, which charges for the number of bytes processed by each query. So limiting the bytes processed will be the solution.\nhttps://cloud.google.com/blog/products/data-analytics/manage-bigquery-costs-with-custom-quotas"
      },
      {
        "user": "Sofiia98",
        "text": "https://cloud.google.com/blog/products/data-analytics/manage-bigquery-costs-with-custom-quotas"
      },
      {
        "user": "AllenChen123",
        "text": "But seems only C makes sense.\nhttps://cloud.google.com/bigquery/quotas#query_jobs\n\"There is no limit to the number of bytes that can be processed by queries in a project.\""
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 210,
    "topic": "Dataplex",
    "difficulty": 2,
    "question": "You are part of a healthcare organization with decentralized data. You need to implement: data management and discovery, data lineage tracking, data quality validation. How should you build the solution?",
    "options": [
      "A. Use BigLake to convert to a data lake architecture.",
      "B. Build a new data discovery tool on GKE.",
      "C. Use BigQuery to track data lineage, Dataprep for data quality validation.",
      "D. Use Dataplex to manage data, track data lineage, and perform data quality validation."
    ],
    "correct": 3,
    "explanation": "Use Dataplex to manage data, track data lineage, and perform data quality validation This organizes data assets with metadata management and unified discovery.",
    "discussion": [
      {
        "user": "raaad",
        "text": "Straight forward"
      },
      {
        "user": "fitri001",
        "text": "Option D, no doubt"
      },
      {
        "user": "hanoverquay",
        "text": "Option D, no doubt"
      },
      {
        "user": "Sofiia98",
        "text": "Agree with Dataplex option"
      },
      {
        "user": "scaenruy",
        "text": "D. Use Dataplex to manage data, track data lineage, and perform data quality validation.\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 211,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You have data in BigQuery used for reports. Some weekly executive report fields do not correspond to company format standards. You need a recurring job to normalize data with no coding. What should you do?",
    "options": [
      "A. Use Cloud Data Fusion and Wrangler. Set up a recurring job.",
      "B. Use Dataflow SQL to create a job, then schedule the pipeline.",
      "C. Create a Spark job on Dataproc Serverless.",
      "D. Use BigQuery and GoogleSQL to normalize the data, and schedule recurring queries."
    ],
    "correct": 0,
    "explanation": "GoogleSQL requires writing code. Cloud Data Fusion with Wrangler provides a visual, no-code interface for data preparation and normalization.",
    "discussion": [
      {
        "user": "Matt_108",
        "text": "Definitely A, cloud data fusion and wrangler to setup the clean up pipeline with no coding required"
      },
      {
        "user": "RenePetersen",
        "text": "Wouldn't writing the SQL transformation be considered coding? The question specifically states that a solution requiring no coding is needed."
      },
      {
        "user": "marlon.andrei",
        "text": "The question say \"You want a quick solution that requires no coding.\". The data is in BQ, then is most easy normalize the data, and schedule recurring queries in BigQuery."
      },
      {
        "user": "987af6b",
        "text": "A. Use Cloud Data Fusion and Wrangler to normalize the data, and set up a recurring job.\nExplanation\nNo Coding Required: Cloud Data Fusion's Wrangler offers a no-code interface for data transformation tasks. You can visually design data normalization workflows without writing any code.\nRecurring Jobs: Cloud Data Fusion allows you to schedule these data normalization tasks to run on a recurring basis, meeting your need for automation."
      },
      {
        "user": "carmltekai",
        "text": "The best solution here is D. Use BigQuery and GoogleSQL to normalize the data, and schedule recurring queries in BigQuery.\nHere's why:\n* No-code solution: BigQuery's built-in capabilities and GoogleSQL offer a no-code way to transform and standardize data. You can leverage functions like REGEXP_REPLACE to normalize phone numbers and FORMAT to ensure consistent formatting across fields.\n* Recurring jobs: BigQuery allows you to schedule queries to run regularly, which is perfect for maintaining..."
      },
      {
        "user": "fitri001",
        "text": "https://cloud.google.com/data-fusion/docs"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 212,
    "topic": "Bigtable",
    "difficulty": 2,
    "question": "Your company is streaming real-time sensor data from their factory floor into Bigtable and noticed extremely poor performance. How should the row key be redesigned?",
    "options": [
      "A. Use a row key of the form <timestamp>.",
      "B. Use a row key of the form <sensorid>.",
      "C. Use a row key of the form <timestamp>#<sensorid>.",
      "D. Use a row key of the form <sensorid>#<timestamp>."
    ],
    "correct": 3,
    "explanation": "Use a row key of the form <sensorid>#<timestamp> This NoSQL wide-column store optimized for time-series and analytical workloads with millisecond latency, automatic scaling, and replication.",
    "discussion": [
      {
        "user": "samdhimal",
        "text": "A. Use a row key of the form <timestamp>.\n---> Incorrect, because google says don't use a timestamp by itself or at the beginning of a row key.\nB. Use a row key of the form <sensorid>.\n--->Incorrect, because google says Include a timestamp as part of your row key.\nC. Use a row key of the form <timestamp>#<sensorid>.\n---> Incorrect, because google says don't use a timestamp by itself or at the beginning of a row key.\nD. Use a row key of the form >#<sensorid>#<timestamp>.\n---> Correct answer, b..."
      },
      {
        "user": "sumanshu",
        "text": "Vote for 'D' - Store multiple delimited values in each row key. (But avoid starting with Timestamp)\n\"Row keys to avoid\"\nhttps://cloud.google.com/bigtable/docs/schema-design"
      },
      {
        "user": "sumanshu",
        "text": "A is not correct because this will cause most writes to be pushed to a single node (known as hotspotting)\nB is not correct because this will not allow for multiple readings from the same sensor as new readings will overwrite old ones.\nC is not correct because this will cause most writes to be pushed to a single node (known as hotspotting)\nD is correct because it will allow for retrieval of data based on both sensor id and timestamp but without causing hotspotting."
      },
      {
        "user": "Nirca",
        "text": "#<sensorid>#<timestamp> ------> low cardinality # high cardinality\nThis is current Bigtable Best Practice (to avoid Hotspots on the inserts)"
      },
      {
        "user": "ch3n6",
        "text": "correct: D\nwhy not C? Using the timestamp by itself as the row key is not recommended, as most writes would be pushed onto a single node. For the same reason, avoid placing a timestamp at the start of the row key. https://cloud.google.com/bigtable/docs/schema-design#row-keys"
      },
      {
        "user": "NamitSehgal",
        "text": "Should be D\nReverse of timestamp even better but no options for that.\nAlso changing sensor ID if they are in sequential to hash or changing data to bits even better.\nIdea is not to use timestamp or sequential ID as first key."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 213,
    "topic": "Pub/Sub",
    "difficulty": 2,
    "question": "You are designing a messaging system with Pub/Sub using a push subscription. You need reliability for temporary downtime, need to store failed messages and retry gradually, and store failed messages after 10 retries. How should you configure the subscription?",
    "options": [
      "A. Increase the acknowledgement deadline to 10 minutes.",
      "B. Use immediate redelivery as retry policy, configure dead lettering to a different topic with max 10 attempts.",
      "C. Use exponential backoff as retry policy, configure dead lettering to the same source topic with max 10 attempts.",
      "D. Use exponential backoff as retry policy, configure dead lettering to a different topic with max 10 attempts."
    ],
    "correct": 3,
    "explanation": "Use exponential backoff as retry policy, configure dead lettering to a different topi This subscriptions model fan-out and load-balancing patterns; push subscriptions deliver to HTTP endpoints while pull subscriptions provide backpressure control.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Exponential Backoff: This retry policy gradually increases the delay between retries, which helps to avoid overloading the consumer app.\n- Dead Lettering to a Different Topic: Configuring dead lettering sends messages that couldn't be processed after the specified number of delivery attempts (10 in this case) to a separate topic. This allows for handling of failed messages without interrupting the regular flow of new messages.\n- Maximum Delivery Attempts Set to 10: This setting ensures that..."
      },
      {
        "user": "GCP001",
        "text": "D. Use exponential backoff as the subscription retry policy, and configure dead lettering to a different topic with maximum delivery attempts set to 10\nBest suitable options for graceful retry and storing failed messages"
      },
      {
        "user": "scaenruy",
        "text": "D. Use exponential backoff as the subscription retry policy, and configure dead lettering to a different topic with maximum delivery attempts set to 10."
      },
      {
        "user": "Smakyel79",
        "text": "Exponential backoff will help in managing the load on the consumer app by gradually increasing the delay between retries. Configuring dead lettering to a different topic after a maximum of 10 delivery attempts ensures that undeliverable messages are stored separately, preventing them from being retried endlessly and cluttering the main message flow."
      },
      {
        "user": "Pime13",
        "text": "https://cloud.google.com/pubsub/docs/subscription-overview\nD. Use exponential backoff as the subscription retry policy, and configure dead lettering to a different topic with maximum delivery attempts set to 10.\nExponential Backoff: This retry policy helps to avoid overloading the consumer app by gradually increasing the time between retries, which is more efficient than immediate redelivery.\nDead Lettering: Configuring dead lettering to a different topic ensures that messages that cannot be ..."
      },
      {
        "user": "Matt_108",
        "text": "Option D - agree with other comments explanation"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 214,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You designed a data warehouse in BigQuery. You want a self-serving, low-maintenance, cost-effective solution to share the sales dataset to other business units. What should you do?",
    "options": [
      "A. Create an Analytics Hub private exchange and publish the sales dataset.",
      "B. Enable the other business units' projects to access authorized views.",
      "C. Create and share views with the users in the other business units.",
      "D. Use BigQuery Data Transfer Service to create a schedule that copies the dataset."
    ],
    "correct": 0,
    "explanation": "Create an Analytics Hub private exchange and publish the sales dataset This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "raaad",
        "text": "Analytics Hub offers a centralized platform for managing data sharing and access within the organization. This simplifies access control management."
      },
      {
        "user": "Ryannn23",
        "text": "I assume \"low-maintenance\" is the main problem on B"
      },
      {
        "user": "cloud_rider",
        "text": "What is wrong with the option B?"
      },
      {
        "user": "987af6b",
        "text": "A. is the answer I select"
      },
      {
        "user": "scaenruy",
        "text": "A. Create an Analytics Hub private exchange, and publish the sales dataset."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 215,
    "topic": "Datastream",
    "difficulty": 2,
    "question": "You have terabytes of customer behavioral data in BigQuery daily from Google Analytics. Customer info is hosted on Cloud SQL for MySQL and CRM is on Cloud SQL for PostgreSQL. Marketing wants to use this data for campaigns (100-300 times a day). You want to minimize load on Cloud SQL databases. What should you do?",
    "options": [
      "A. Create BigQuery connections to both Cloud SQL databases. Use federated queries.",
      "B. Create a job on Apache Spark with Dataproc Serverless.",
      "C. Create streams in Datastream to replicate required tables from both Cloud SQL databases to BigQuery.",
      "D. Create a Dataproc cluster with Trino to connect to both Cloud SQL databases and BigQuery."
    ],
    "correct": 2,
    "explanation": "Create streams in Datastream to replicate required tables from both Cloud SQL databas This managed relational database with automated backups, replication, and patch management; supports MySQL, PostgreSQL, SQL Server.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Datastream: It's a fully managed, serverless service for real-time data replication. It allows to stream data from various sources, including Cloud SQL, into BigQuery.\n- Reduced Load on Cloud SQL: By replicating the required tables from both Cloud SQL databases into BigQuery, you minimize the load on the Cloud SQL instances. The marketing team's queries will be run against BigQuery, which is designed to handle high-volume analytics workloads.\n- Frequency of Queries: BigQuery can easily hand..."
      },
      {
        "user": "987af6b",
        "text": "Initially I said A, but this question was how I learned about Datastream, which I think would be the better solution in this scenario. So my answer is C"
      },
      {
        "user": "scaenruy",
        "text": "C. Create streams in Datastream to replicate the required tables from both Cloud SQL databases to BigQuery for these queries."
      },
      {
        "user": "Smakyel79",
        "text": "Datastream is a serverless, easy-to-use change data capture (CDC) and replication service. By replicating the necessary tables from the Cloud SQL databases to BigQuery, you can offload the query load from the Cloud SQL databases. The marketing team can then run their queries directly on BigQuery, which is designed for large-scale data analytics. This approach seems to balance both efficiency and performance, minimizing load on the Cloud SQL instances.\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      },
      {
        "user": "SanjeevRoy91",
        "text": "Why not A ? Federrated queries will downgrade Cloud SQL perf?"
      },
      {
        "user": "Blackstile",
        "text": "To Replication data, use datastream"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 216,
    "topic": "Dataplex",
    "difficulty": 2,
    "question": "You need to organize data in Cloud Storage and BigQuery. You need to enable a data mesh approach to share data between departments. What should you do?",
    "options": [
      "A. Create a project for each department. Create user groups for authorized readers. Enable IT to administer.",
      "B. Create multiple projects for each department. Enable each to create buckets and datasets. Publish data in Analytics Hub.",
      "C. Create a single project. Create a central bucket with three folders. Create a central dataset with table prefixes.",
      "D. Create multiple projects. In Dataplex, map each department to a data lake. Enable each department to own and share their data."
    ],
    "correct": 3,
    "explanation": "Create multiple projects This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Decentralized ownership: Each department controls its data lake, aligning with the core principle of data ownership in a data mesh.\n- Self-service data access: Departments can create and manage their own Cloud Storage buckets and BigQuery datasets within their data lakes, enabling self-service data access.\n- Interdepartmental sharing: Dataplex facilitates data sharing by enabling departments to publish their data products from their data lakes, making it easily discoverable and usable by ot..."
      },
      {
        "user": "987af6b",
        "text": "For a straightforward data mesh approach where the focus is on decentralizing data management while enabling easy data sharing and discovery, Analytics Hub is often the more appropriate choice due to its simplicity and directness. It facilitates the core objectives of a data mesh—decentralized data ownership and accessible data sharing—without the added complexity of managing data lakes and advanced governance features."
      },
      {
        "user": "marlon.andrei",
        "text": "In \"a data mesh approach to share the data between sales, product design, and marketing departments\", Analytics Hub is the solution."
      },
      {
        "user": "Nandababy",
        "text": "B is better option as organization is migrating to google cloud, that means teams doesnt have much hands on, analytical hub is more ease to use and solved the purpose as compared to dataplex were setup itself if very complex."
      },
      {
        "user": "joao_01",
        "text": "I think its B. I know since we are talking about Datamesh we want to go to the Dataplex service suddenly. However, in Dataplex a Lake can only have assets (bq tables etc) that are in the same project as the Dataplex service.\nExample: There is bq table in project A and B. I want to to create a Lake in Dataplex in Project A that contains tables of project B. I can´t do that, i can only host tables of the Project A, since the Lake is in project A.\nWith this said, I think the best option is B, be..."
      },
      {
        "user": "joao_01",
        "text": "I was wrong in my explanation guys. Look at this link:\nhttps://cloud.google.com/dataplex/docs/add-zone\n\"A lake can include one or more zones. While a zone can only be part of one lake, it may contain assets that point to resources that are part of projects outside of its parent project.\"\nSo, option D seems good."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 217,
    "topic": "Pub/Sub",
    "difficulty": 2,
    "question": "You are using Pub/Sub for clickstream data. When a new subscriber connects to an existing topic, they cannot subscribe to older data. For an upcoming sale event, you need any new subscriber to read the last 30 days of data. What should you do?",
    "options": [
      "A. Create a new topic and publish the last 30 days of data each time.",
      "B. Set the topic retention policy to 30 days.",
      "C. Set the subscriber retention policy to 30 days.",
      "D. Ask the source system to re-push the data to Pub/Sub."
    ],
    "correct": 1,
    "explanation": "Set the topic retention policy to 30 days This Google's managed pub/sub messaging service enabling asynchronous communication with built-in ordering guarantees and at-least-once delivery semantics.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Topic Retention Policy: This policy determines how long messages are retained by Pub/Sub after they are published, even if they have not been acknowledged (consumed) by any subscriber.\n- 30 Days Retention: By setting the retention policy of the topic to 30 days, all messages published to this topic will be available for consumption for 30 days. This means any new subscriber connecting to the topic can access and analyze data from the past 30 days."
      },
      {
        "user": "Sofiia98",
        "text": "https://cloud.google.com/blog/products/data-analytics/pubsub-gains-topic-retention-feature"
      },
      {
        "user": "hussain.sain",
        "text": "B is correct.\nBy setting the topic retention policy to 30 days, any new subscriber will be able to access the data for the past 30 days, regardless of when they connect. This solution is both cost-effective and efficient for your use case."
      },
      {
        "user": "romain773",
        "text": "Option B is wrong i think (topic retention) because it only makes unconsumed messages available for 30 days. I propose option A\nOption A (creating a new topic and republishing the last 30 days of data for each new subscriber) is actually a better solution to ensure that new subscribers have access to the full 30-day history."
      },
      {
        "user": "romain773",
        "text": "Option B is wrong (topic retention) because it only makes unconsumed messages available for 30 days.\nOption A (creating a new topic and republishing the last 30 days of data for each new subscriber) is actually a better solution to ensure that new subscribers have access to the full 30-day history."
      },
      {
        "user": "joao_01",
        "text": "Its B. It could be C as well because subscription has message retention. However, in the subscription there is a maximum value for it: 7 days.\nLink:https://cloud.google.com/pubsub/docs/subscription-properties"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 218,
    "topic": "Dataflow/Networking",
    "difficulty": 2,
    "question": "You are designing the architecture to process data from Cloud Storage to BigQuery by using Dataflow. The network team provided a Shared VPC network and subnetwork. What should you do to enable deployment?",
    "options": [
      "A. Assign compute.networkUser role to the Dataflow service agent.",
      "B. Assign compute.networkUser role to the service account that executes the Dataflow pipeline.",
      "C. Assign dataflow.admin role to the Dataflow service agent.",
      "D. Assign dataflow.admin role to the service account that executes the Dataflow pipeline."
    ],
    "correct": 0,
    "explanation": "Assign compute.networkUser role to the Dataflow service agent This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Dataflow service agent is the one responsible for setting up and managing the network resources that Dataflow requires.\n- By granting the compute.networkUser role to this service agent, we are enabling it to provision the necessary network resources within the Shared VPC for your Dataflow job."
      },
      {
        "user": "saschak94",
        "text": "All projects that have used the resource Dataflow Job have a Dataflow Service Account, also known as the Dataflow service agent.\nMake sure the Shared VPC subnetwork is shared with the Dataflow service account and has the Compute Network User role assigned on the specified subnet."
      },
      {
        "user": "ach5",
        "text": "service account - it's B"
      },
      {
        "user": "Preetmehta1234",
        "text": "If you see in the comments, A was answer by people around 8 months ago but recent ones have answered B with the documentation. The GCP documentation evolves with time"
      },
      {
        "user": "extraego",
        "text": "Dataflow service agent is a role that is assigned to a service account. So is compute.networkUser.\nhttps://cloud.google.com/dataflow/docs/concepts/access-control#example"
      },
      {
        "user": "josech",
        "text": "Option B https://cloud.google.com/knowledge/kb/dataflow-job-in-shared-vpc-xpn-permissions-000004261"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 219,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "Your infrastructure team has set up an interconnect link. You are designing a high-throughput streaming pipeline from on-premises Apache Kafka to BigQuery with minimal latency. What should you do?",
    "options": [
      "A. Setup Kafka Connect bridge to Pub/Sub. Use a Google-provided Dataflow template.",
      "B. Use a proxy host in the VPC connecting to Kafka. Write a Dataflow pipeline.",
      "C. Use Dataflow, write a pipeline that reads from Kafka and writes to BigQuery.",
      "D. Setup Kafka Connect bridge to Pub/Sub. Write a Dataflow pipeline."
    ],
    "correct": 2,
    "explanation": "Use Dataflow, write a pipeline that reads from Kafka and writes to BigQuery This dedicated network connection for consistent high throughput; lower latency and higher reliability than VPN but requires physical provisioning.",
    "discussion": [
      {
        "user": "saschak94",
        "text": "but Option A introduces additional replication into Pub/Sub and the question states with minimal latency. In my opinion subscribing to Kafka via Dataflow has a lower latency than replicating the messages first to Pub/Sub and subscribing with Dataflow to it."
      },
      {
        "user": "Matt_108",
        "text": "Option A, leverage dataflow template for Kafka https://cloud.google.com/dataflow/docs/kafka-dataflow"
      },
      {
        "user": "scaenruy",
        "text": "C. Use Dataflow, write a pipeline that reads the data from Kafka, and writes the data to BigQuery."
      },
      {
        "user": "SanjeevRoy91",
        "text": "You are adding an intermediate hop in between on prem kafka and Dataflow ( pubsub ). Why won't this add additional latency."
      },
      {
        "user": "T2Clubber",
        "text": "Option C makes more sense to me because of the \"minimal latency as possible\".\nI would have chosen option A if it were \"less CODING as possible\"."
      },
      {
        "user": "chickenwingz",
        "text": "Dataflow has templates to read from Kafka. Other options are too complicated\nhttps://cloud.google.com/dataflow/docs/kafka-dataflow"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 220,
    "topic": "BigLake",
    "difficulty": 2,
    "question": "You migrated your HDFS data lake to Cloud Storage. Data science team needs to process with Apache Spark and SQL. Security policies need column-level enforcement. You need a cost-effective solution that can scale into a data mesh. What should you do?",
    "options": [
      "A. Deploy a long-living Dataproc cluster with Hive and Ranger. Configure Ranger for column level security.",
      "B. Define a BigLake table. Create a taxonomy of policy tags in Data Catalog. Add policy tags to columns.",
      "C. Load data to BigQuery tables. Create a taxonomy of policy tags in Data Catalog.",
      "D. Apply IAM policy at file level in Cloud Storage. Define a BigQuery external table."
    ],
    "correct": 1,
    "explanation": "Define a BigLake table This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- BigLake Integration: BigLake allows you to define tables on top of data in Cloud Storage, providing a bridge between data lake storage and BigQuery's powerful analytics capabilities. This approach is cost-effective and scalable.\n- Data Catalog for Governance: Creating a taxonomy of policy tags in Google Cloud's Data Catalog and applying these tags to specific columns in your BigLake tables enables fine-grained, column-level access control.\n- Processing with Spark and SQL: The Spark-BigQuery..."
      },
      {
        "user": "Jordan18",
        "text": "BigLake leverages existing Cloud Storage infrastructure, eliminating the need for a dedicated Dataproc cluster, reducing costs significantly."
      },
      {
        "user": "JyoGCP",
        "text": "Going with 'B' based on the comments"
      },
      {
        "user": "Matt_108",
        "text": "Option B, agree with comments explanation"
      },
      {
        "user": "scaenruy",
        "text": "C.\n1. Load the data to BigQuery tables.\n2. Create a taxonomy of policy tags in Data Catalog.\n3. Add policy tags to columns.\n4. Process with the Spark-BigQuery connector or BigQuery SQL.\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 221,
    "topic": "Security",
    "difficulty": 3,
    "question": "One of your Cloud KMS encryption keys was exposed. You need to re-encrypt all CMEK-protected Cloud Storage data and reduce the risk of objects written without CMEK protection. What should you do?",
    "options": [
      "A. Rotate the Cloud KMS key version. Continue using the same bucket.",
      "B. Create a new Cloud KMS key. Set the default CMEK key on the existing bucket to the new one.",
      "C. Create a new Cloud KMS key. Create a new bucket. Copy all objects specifying the new key.",
      "D. Create a new Cloud KMS key. Create a new bucket configured with the new key as default CMEK. Copy all objects without specifying a key."
    ],
    "correct": 3,
    "explanation": "Create a new Cloud KMS key This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- New Key Creation: A new Cloud KMS key ensures a secure replacement for the compromised one.\n- New Bucket: A separate bucket prevents potential conflicts with existing objects and configurations.\n- Default CMEK: Setting the new key as default enforces encryption for all objects in the bucket, reducing the risk of unencrypted data.\n- Copy Without Key Specification: Copying objects without specifying a key leverages the default key, simplifying the process and ensuring consistent encryption.\n-..."
      },
      {
        "user": "chickenwingz",
        "text": "Wrong:\nA - rotating external key doesn't trigger re-encryption of data already in GCS: https://cloud.google.com/kms/docs/rotate-key#rotate-external-coordinated\nC - Setting key during copy doesn't take care of objects that are later uploaded to the bucket, that will still use the default key"
      },
      {
        "user": "ML6",
        "text": "The correct answer is D. Rotating the key does not seem to re-encrypt:\nIn the event that a key is compromised, regular rotation (!!) limits the number of actual messages vulnerable to compromise (!!).\nIf you suspect that a key version is compromised, disable it and revoke access to it as soon as possible.\nSource: https://cloud.google.com/kms/docs/key-rotation#why_rotate_keys"
      },
      {
        "user": "ML6",
        "text": "Note: When you rotate a key, data encrypted with previous key versions is not automatically re-encrypted with the new key version. You can learn more about re-encrypting data.\nSource: https://cloud.google.com/kms/docs/key-rotation#how_often_to_rotate_keys"
      },
      {
        "user": "Medmah",
        "text": "I don't understand why only Matt select A\nhttps://cloud.google.com/sdk/gcloud/reference/kms/keys/update\nThis seems to do the job, am I wrong ?"
      },
      {
        "user": "desertlotus1211",
        "text": "If no key is specified, and the bucket's default CMEK key is used, there's a risk that some objects might fall back to Google-managed encryption, especially if misconfigured"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 222,
    "topic": "Storage/DR",
    "difficulty": 2,
    "question": "You have an upstream process that writes data to Cloud Storage. A Spark job runs on Dataproc in us-central1. You need recovery with RPO=15 mins. You want to minimize latency when reading data. What should you do?",
    "options": [
      "A. Create two regional buckets. Use Storage Transfer Service to copy hourly. Redeploy to us-south1 if failure.",
      "B. Create a US multi-region bucket. Redeploy Dataproc to us-central2 if failure.",
      "C. Create a dual-region bucket with turbo replication. Read from us-south1 region. Redeploy if failure.",
      "D. Create a dual-region bucket with turbo replication. Read from us-central1. Redeploy to us-south1 if failure."
    ],
    "correct": 3,
    "explanation": "Create a dual-region bucket with turbo replication This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Rapid Replication: Turbo replication ensures near-real-time data synchronization between regions, achieving an RPO of 15 minutes or less.\n- Minimal Latency: Dataproc clusters can read from the bucket in the same region, minimizing data transfer latency and optimizing performance.\n- Disaster Recovery: In case of regional failure, Dataproc clusters can seamlessly redeploy to the other region and continue reading from the same bucket, ensuring business continuity."
      },
      {
        "user": "scaenruy",
        "text": "D.\n1. Create a dual-region Cloud Storage bucket in the us-central1 and us-south1 regions.\n2. Enable turbo replication.\n3. Run the Dataproc cluster in a zone in the us-central1 region, reading from the bucket in the same region.\n4. In case of a regional failure, redeploy the Dataproc clusters to the us-south1 region and read from the same bucket."
      },
      {
        "user": "Matt_108",
        "text": "Option D, answers all needs from the request"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 223,
    "topic": "Database Design",
    "difficulty": 2,
    "question": "You designed a database for patient records as a pilot project. Your design used a single database table for all patients and visits. Now the scope has expanded 100x and you can no longer run reports. How should you adjust the design?",
    "options": [
      "A. Add capacity (memory and disk) by 200x.",
      "B. Shard tables based on date ranges.",
      "C. Normalize the master table into patient table and visits table.",
      "D. Partition the table by clinic. Run queries against smaller tables, use unions for consolidated reports."
    ],
    "correct": 2,
    "explanation": "Normalize the master table into patient table and visits table This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "MaxNRG",
        "text": "C is correct because this option provides the least amount of inconvenience over using pre-specified date ranges or one table per clinic while also increasing performance due to avoiding self-joins.\nA is not correct because adding additional compute resources is not a recommended way to resolve database schema problems.\nB is not correct because this will reduce the functionality of the database and make running reports more difficult.\nD is not correct because this will likely increase the num..."
      },
      {
        "user": "balseron99",
        "text": "A is incorrect because adding space won't solve the problem of query performance.\nB is incorrect because there is nothing related to the report generation which is specified and sharding tables on date ranges is not a good option as it will create many tables.\nC is CORRECT because the statement says \"the scope of the project has expanded. The database must now store 100 times more patient records\". As the data increases there would be difficulty in managing the tables and querying it. Hence c..."
      },
      {
        "user": "rocky48",
        "text": "Normalization is a technique used to organize data in a relational database to reduce data redundancy and improve data integrity. Breaking the patient records into separate tables (patient and visits) and eliminating self-joins will make the database more scalable and improve query performance. It also helps maintain data integrity and makes it easier to manage large datasets efficiently.\nOptions A, B, and D may provide some benefits in specific cases, but for a scenario where the project sco..."
      },
      {
        "user": "rtcpost",
        "text": "Normalization is a technique used to organize data in a relational database to reduce data redundancy and improve data integrity. Breaking the patient records into separate tables (patient and visits) and eliminating self-joins will make the database more scalable and improve query performance. It also helps maintain data integrity and makes it easier to manage large datasets efficiently.\nOptions A, B, and D may provide some benefits in specific cases, but for a scenario where the project sco..."
      },
      {
        "user": "samdhimal",
        "text": "correct answer -> Normalize the master patient-record table into the patient table and the visits table, and create other necessary tables to avoid self-join.\nAvoid self-join at all cost because that's what google says.\nReference:\nhttps://cloud.google.com/bigquery/docs/best-practices-performance-patterns"
      },
      {
        "user": "samdhimal",
        "text": "Normalizing the database design will help to minimize data redundancy and improve the efficiency of the queries. By separating the patient and visit information into separate tables, the database will be able to handle the increased number of records and generate reports more efficiently, because the self-joins will no longer be required.\nOption A is not a good solution because adding more capacity to the server will not address the underlying problem of the database design, and it may not be..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 224,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "Your company's customer and order databases are often under heavy load making analytics difficult. The databases are MySQL cluster with nightly backups. You want to perform analytics with minimal impact on operations. What should you do?",
    "options": [
      "A. Add a node to the MySQL cluster and build an OLAP cube.",
      "B. Use an ETL tool to load data from MySQL into BigQuery.",
      "C. Connect an on-premises Hadoop cluster to MySQL and perform ETL.",
      "D. Mount the backups to Cloud SQL, then process data using Dataproc."
    ],
    "correct": 1,
    "explanation": "Use an ETL tool to load data from MySQL into BigQuery This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "HectorLeon2099",
        "text": "It is a GOOGLE exam. The answer won't be on-premise or OLAP cubes even if it is the easiest. The answer is B"
      },
      {
        "user": "[Removed]",
        "text": "Answer: D\nDescription: Easy and it won’t affect processing"
      },
      {
        "user": "[Removed]",
        "text": "27 up vote for a wrong ans!!\nWhy do you need dataproc for MySQL dump?!"
      },
      {
        "user": "Alexej_123",
        "text": "I think it is B and not D:\n1) There are no info regarding date freshness required for analytics. So nightly backup might be not enough as a source because it will only provide info one tie a day.\n2) Dataproc is recommended as easiest way for migration of hadoop processes. SO no reason to use Dataproc for designing a new analytics processes.\n3) The solution is really very limited if you will extend it in the future and add new data sources or create new aggregate tables. Where they should be c..."
      },
      {
        "user": "dg63",
        "text": "D is best answer. Goal is to minimize analytics query load on live OLTP operations.\nA. Add a node to the MySQL cluster and build an OLAP cube there.\nThis will not help. Cluster nodes will have identical data.\nB. Use an ETL tool to load the data from MySQL into Google BigQuery.\nThis approach still puts a query load on SQL server.\nC. Connect an on-premises Apache Hadoop cluster to MySQL and perform ETL.\nThis approach also puts a query load on SQL server.\nhttps://www.examtopics.com/exams/google/..."
      },
      {
        "user": "Tanzu",
        "text": "choose dataproc over hadoop cluster\nchose bigquery over all..\nthere is no special customer requirement that gonna drive us to hadoop or dataproc."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 225,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You currently have transactional data on-premises in PostgreSQL. You want to run transactional workloads and support analytics with a single database. You need to move to Google Cloud without changing database management systems, minimizing cost and complexity. What should you do?",
    "options": [
      "A. Migrate and modernize with Cloud Spanner.",
      "B. Migrate workloads to AlloyDB for PostgreSQL.",
      "C. Migrate to BigQuery to optimize analytics.",
      "D. Migrate to Cloud SQL for PostgreSQL."
    ],
    "correct": 1,
    "explanation": "Migrate workloads to AlloyDB for PostgreSQL This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "8ad5266",
        "text": "Minimize cost. https://cloud.google.com/alloydb?hl=en\nAlloyDB offers superior performance, 4x faster than standard PostgreSQL for transactional workloads. That does not come without cost."
      },
      {
        "user": "baimus",
        "text": "In real life clearly how performant it needed to be would be a massive factor. AlloyDB is more expensive (see https://cloud.google.com/alloydb/pricing, vs https://cloud.google.com/sql/pricing), but when they say \"minimise cost\" is that per query, or is it per year assuming similar instance size. There's no way for us to know, we have to guess. I'm guessing AlloyDB, as the question seem to be telegraphing that, but it could just as easily be CloudSQL postgres based on the cheaper costs. We sim..."
      },
      {
        "user": "Antmal",
        "text": "Because AlloyDB is optimised for hybrid transactional and analytical processing (HTAP), meaning you can run both transactional workloads and analytics on the same database with excellent performance."
      },
      {
        "user": "omkarr24",
        "text": "They currently have transactional data stored on-premises in a PostgreSQL database and they want to modernize their database that supports transactional workloads and analytics .If they select cloud Sql (postgreSQL) it will minimize the cost and complexity.\nand for analytics purpose they can create federated queries over cloudSql(postgreSql)\nhttps://cloud.google.com/bigquery/docs/federated-queries-intro\nThis approach will minimze the cost"
      },
      {
        "user": "MaxNRG",
        "text": "minimize cost and complexity"
      },
      {
        "user": "JyoGCP",
        "text": "Considering the cost factor, I'll go with D.\nIf \"minimize cost\" is not present in the question, then I'd go with 'B' AlloyDB.\nCloud SQL for PostgreSQL: Generally less expensive than AlloyDB.\nAlloyDB: Can be significantly more expensive due to its advanced features and high performance capabilities."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 226,
    "topic": "Dataform",
    "difficulty": 2,
    "question": "You are architecting a data transformation solution for BigQuery. Your developers are proficient with SQL and want ELT development. They need intuitive coding environment and ability to manage SQL as code. What should you do?",
    "options": [
      "A. Use Dataform to build, manage, and schedule SQL pipelines.",
      "B. Use Dataflow jobs to read from Pub/Sub, transform, and load to BigQuery.",
      "C. Use Data Fusion to build and execute ETL pipelines.",
      "D. Use Cloud Composer to load data and run SQL pipelines by using BigQuery job operators."
    ],
    "correct": 0,
    "explanation": "Use Dataform to build, manage, and schedule SQL pipelines This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Aligns with ELT Approach: Dataform is designed for ELT (Extract, Load, Transform) pipelines, directly executing SQL transformations within BigQuery, matching the developers' preference.\n-SQL as Code: It enables developers to write and manage SQL transformations as code, promoting version control, collaboration, and testing.\n- Intuitive Coding Environment: Dataform provides a user-friendly interface and familiar SQL syntax, making it easy for SQL-proficient developers to adopt.\n- Scheduling ..."
      },
      {
        "user": "scaenruy",
        "text": "A. Use Dataform to build, manage, and schedule SQL pipelines."
      },
      {
        "user": "Pime13",
        "text": "Dataform is designed specifically for building, managing, and scheduling SQL pipelines in BigQuery. It allows developers to use SQL for data transformations, supports version control, and integrates with GitHub and GitLab for managing SQL as code"
      },
      {
        "user": "chickenwingz",
        "text": "Dataform = transformations in SQL"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 227,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You have a 500 MB sensors table with 5000 sensors updated hourly. Each sensor generates one metric every 30 seconds. You want to run analytical queries weekly and minimize costs. What data model should you use?",
    "options": [
      "A. Create a metrics column in sensors table (RECORD/REPEATED). Use UPDATE every 30 seconds.",
      "B. Create a metrics column in sensors table (RECORD/REPEATED). Use INSERT every 30 seconds.",
      "C. Create a metrics table partitioned by timestamp with sensorId column. Use INSERT every 30 seconds. Join when querying.",
      "D. Create a metrics table partitioned by timestamp with sensorId column. Use UPDATE every 30 seconds. Join when querying."
    ],
    "correct": 2,
    "explanation": "Create a metrics table partitioned by timestamp with sensorId column This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "raaad",
        "text": "Partitioned Metrics Table: Creating a separate metrics table partitioned by timestamp is a standard practice for time-series data like sensor readings. Partitioning by timestamp allows for more efficient querying, especially when you're only interested in a specific time range (like weekly monitoring).\nReference to Sensors Table: Including a sensorId column that references the id column in the sensors table allows you to maintain a relationship between the metrics and the sensors without dupl..."
      },
      {
        "user": "vbrege",
        "text": "Here's my logic (some people have already said same thing)\nCannot be C and D\n- Total 5000 sensors are sending new timestamp every 30 seconds. If you partition this table with timestamp, you are getting partitions above 4000 (single job) or 10000 (partition limit) so option C and D don't look correct\n- For C and D, also need to consider that BigQuery best practices advise to avoid JOINs and use STRUCT and RECORD types to solve the parent-child join issue.\nNow coming back to A and B, we will be..."
      },
      {
        "user": "anushree09",
        "text": "I'm in favor of Option B\nReason: BQ has nested columns feature specifically to address these scenarios where a join would be needed in a traditional/ relational data model. Nesting field will reduce the need to join tables, performance will be high and design will be simple"
      },
      {
        "user": "dac9215",
        "text": "Option C will not violate partitioning limit of 4000 as the lowest grain of partitioning is hourly"
      },
      {
        "user": "Gloups",
        "text": "Since BigQuery tables are limited to 4000 partitions, options C & D are discarded. Option B is wrong as insertion is invalid too. So option A."
      },
      {
        "user": "SanjeevRoy91",
        "text": "Why C. Partitioning by timestamp could breach the 4000 cap of number of partitions easily. And with soo much less data, why partitioning is required in the first place. Ans should be B"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 228,
    "topic": "Dataplex",
    "difficulty": 2,
    "question": "You are managing a Dataplex environment with raw and curated zones. JSON and CSV files uploaded to a bucket asset in the curated zone are not being discovered. What should you do?",
    "options": [
      "A. Move the JSON and CSV files to the raw zone.",
      "B. Enable auto-discovery of files for the curated zone.",
      "C. Use the bq command-line tool to load the files into BigQuery tables.",
      "D. Grant object level access to the CSV and JSON files in Cloud Storage."
    ],
    "correct": 0,
    "explanation": "Move the JSON and CSV files to the raw zone This organizes data assets with metadata management and unified discovery.",
    "discussion": [
      {
        "user": "GCP001",
        "text": "Should be A. Curated zone need Parquet, Avro, ORC format not CSV or JSON. Check the ref - https://cloud.google.com/dataplex/docs/add-zone#curated-zones"
      },
      {
        "user": "raaad",
        "text": "- Auto-Discovery Feature: Dataplex has an auto-discovery feature that, when enabled, automatically discovers and catalogs data assets within a zone.\n- Appropriate for Both Raw and Curated Zones: This feature is applicable to both raw and curated zones, and it should be tailored to the specific data governance and cataloging needs of the organization."
      },
      {
        "user": "Anudeep58",
        "text": "While none of the original options (A, B, C, or D) directly address the issue, the closest solution is:\nMove the JSON and CSV files to a raw zone. (This was previously marked as the most voted option, but it's not ideal due to data organization disruption)\nHere's why this approach might be necessary (but not ideal):\nDataplex curated zones currently don't support native processing of JSON and CSV formats. They are designed for structured data formats like Parquet, Avro, or ORC."
      },
      {
        "user": "dungct",
        "text": "Discovery raises the following administrator actions whenever data-related issues are detected during scans : Inconsistent data format in a table. For example, files of different formats exist with the same table prefix. Inconsistent data format in a table. For example, files of different formats exist with the same table prefix."
      },
      {
        "user": "Matt_108",
        "text": "I'd go for Option B, auto-discovery is enabled by default for any zone, including curated ones, so if a file is not automatically discovered it's due to the disabled auto-discovery"
      },
      {
        "user": "Pime13",
        "text": "Auto-discovery needs to be enabled for the curated zone to ensure that Dataplex can scan and register the files. You can configure this setting at the zone or asset level.\nOption A, moving the JSON and CSV files to the raw zone, would not solve the issue of automatic discovery in the curated zone. The problem lies in the configuration of the curated zone, not the location of the files."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 229,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You have a table with millions of rows of sales data partitioned by date. You need aggregations (AVG, MAX, SUM) over the past year, but must retain full historical data. You want to reduce computation cost. What should you do?",
    "options": [
      "A. Create a materialized view to aggregate. Include a filter clause to specify the last year of partitions.",
      "B. Create a materialized view. Configure partition expiration on the base table.",
      "C. Create a view to aggregate. Include a filter clause.",
      "D. Create a new table that aggregates. Set up a scheduled query to recreate hourly."
    ],
    "correct": 0,
    "explanation": "Create a materialized view to aggregate This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Materialized View: Materialized views in BigQuery are precomputed views that periodically cache the result of a query for increased performance and efficiency. They are especially beneficial for heavy and repetitive aggregation queries.\n- Filter for Recent Data: Including a clause to focus on the last year of partitions ensures that the materialized view is only storing and updating the relevant data, optimizing storage and refresh time.\n- Always Up-to-date: Materialized views are maintaine..."
      },
      {
        "user": "Sofiia98",
        "text": "Don't agree, it is said thad that we need to store the historical data, so answer A is correct"
      },
      {
        "user": "raaad",
        "text": "Why not B\n- Configuring partition expiration on the BASE TABLE is a way to manage storage and costs by automatically dropping old data. However, the question specifies the need to retain full historical data, making this approach not suitable since it doesnt keep all historical records."
      },
      {
        "user": "et2137",
        "text": "materialized view requires refreshing so it might not fulfill the requirement: \"results always include the latest data from the tables\". Opt. C will give you the newest data every time you execute the query but it will have to be computed every time"
      },
      {
        "user": "d11379b",
        "text": "But materialized view always returns fresh data\nFresh data. Materialized views return fresh data. If changes to base tables might invalidate the materialized view, then data is read directly from the base tables. If the changes to the base tables don't invalidate the materialized view, then rest of the data is read from the materialized view and only the changes are read from the base tables.\nhttps://cloud.google.com/bigquery/docs/materialized-views-intro"
      },
      {
        "user": "Matt_108",
        "text": ". Create a materialized view to aggregate the base table data. Include a filter clause to specify the last one year of partitions."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 230,
    "topic": "BigQuery/BigLake",
    "difficulty": 2,
    "question": "Your organization uses multi-cloud storage (Cloud Storage and AWS S3) in US regions. You want to query up-to-date data from BigQuery without giving direct access to storage buckets. What should you do?",
    "options": [
      "A. Setup BigQuery Omni connection to AWS S3. Create BigLake tables over Cloud Storage and S3 data.",
      "B. Setup BigQuery Omni connection. Create external tables over Cloud Storage and S3 data.",
      "C. Use Storage Transfer Service to copy from AWS S3 to Cloud Storage. Create BigLake tables.",
      "D. Use Storage Transfer Service to copy from AWS S3. Create external tables."
    ],
    "correct": 0,
    "explanation": "Setup BigQuery Omni connection to AWS S3 This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- BigQuery Omni: This is an extension of BigQuery that allows you to analyze data across Google Cloud, AWS, and Azure without having to manage the infrastructure or move data across clouds. It's suitable for querying data stored in AWS S3 buckets directly.\n- BigLake: Allows you to create a logical abstraction (table) over data stored in Cloud Storage and S3, so you can query data using BigQuery without moving it.\n- Unified Querying: By setting up BigQuery Omni to connect to AWS S3 and creatin..."
      },
      {
        "user": "AllenChen123",
        "text": "Agree. https://cloud.google.com/bigquery/docs/omni-introduction\n\"To run BigQuery analytics on your external data, you first need to connect to Amazon S3 or Blob Storage. If you want to query external data, you would need to create a BigLake table that references Amazon S3 or Blob Storage data.\""
      },
      {
        "user": "ML6",
        "text": "I wonder, why BigLake tables (A) over external tables (B)?"
      },
      {
        "user": "chickenwingz",
        "text": "A - BigLake tables work for S3 and GCS"
      },
      {
        "user": "Matt_108",
        "text": "Option A - clearly explained in comments"
      },
      {
        "user": "chickenwingz",
        "text": "https://cloud.google.com/bigquery/docs/external-data-sources#external_data_source_feature_comparison\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 231,
    "topic": "Security/DLP",
    "difficulty": 2,
    "question": "You need to preprocess customer data stored in a restricted Cloud Storage bucket. You need to comply with data privacy requirements. What should you do?",
    "options": [
      "A. Use Dataflow and Cloud DLP API to mask sensitive data. Write to BigQuery.",
      "B. Use CMEK to encrypt data in Cloud Storage. Use federated queries from BigQuery.",
      "C. Use Cloud DLP API and Dataflow to detect and remove sensitive fields. Write to BigQuery.",
      "D. Use Dataflow and Cloud KMS to encrypt sensitive fields and write to BigQuery."
    ],
    "correct": 0,
    "explanation": "Use Dataflow and Cloud DLP API to mask sensitive data. Write to BigQuery This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Prioritizes Data Privacy: It protects sensitive information by masking it, reducing the risk of exposure in case of unauthorized access or accidental leaks.\n- Reduces Data Sensitivity: Masking renders sensitive data unusable for attackers, even if they gain access to it.\n- Preserves Data Utility: Masked data can still be used for consumer analyses, as patterns and relationships are often preserved, allowing meaningful insights to be derived."
      },
      {
        "user": "AlizCert",
        "text": "What made me decide on A instead of C was the \"The data will be used to create consumer analyses\" sentence. Having all the PIIs completely redacted from the records, we were unable to distinguish between the individual customers."
      },
      {
        "user": "ML6",
        "text": "Data in Cloud Storage is encrypted by default."
      },
      {
        "user": "scaenruy",
        "text": "A. Use Dataflow and the Cloud Data Loss Prevention API to mask sensitive data. Write the processed data in BigQuery."
      },
      {
        "user": "22c1725",
        "text": "this is repeated question."
      },
      {
        "user": "desertlotus1211",
        "text": "If I had to choose...\nI choose C or A... A can still leave partial sensitive data available."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 232,
    "topic": "Cloud SQL",
    "difficulty": 2,
    "question": "You need to connect multiple applications with dynamic public IP addresses to a Cloud SQL instance. You configured users with strong passwords and enforced SSL. You want to ensure secured connections with public IP. What should you do?",
    "options": [
      "A. Add CIDR 0.0.0.0/0 to Authorized Network. Use IAM to add users.",
      "B. Add all application networks to Authorized Network and regularly update them.",
      "C. Leave Authorized Network empty. Use Cloud SQL Auth proxy on all applications.",
      "D. Add CIDR 0.0.0.0/0 to Authorized Network. Use Cloud SQL Auth proxy on all applications."
    ],
    "correct": 2,
    "explanation": "Leave Authorized Network empty. Use Cloud SQL Auth proxy on all applications This managed relational database with automated backups, replication, and patch management; supports MySQL, PostgreSQL, SQL Server.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- Using the Cloud SQL Auth proxy is a recommended method for secure connections, especially when dealing with dynamic IP addresses.\n- The Auth proxy provides secure access to your Cloud SQL instance without the need for Authorized Networks or managing IP addresses.\n- It works by encapsulating database traffic and forwarding it through a secure tunnel, using Google's IAM for authentication.\n- Leaving the Authorized Networks empty means you're not allowing any direct connections based on IP add..."
      },
      {
        "user": "Sofiia98",
        "text": "https://stackoverflow.com/questions/27759356/how-to-authorize-my-dynamic-ip-network-address-in-google-cloud-sql\nhttps://stackoverflow.com/questions/24749810/how-to-make-a-google-cloud-sql-instance-accessible-for-any-ip-address"
      },
      {
        "user": "JyoGCP",
        "text": "Links also say not to go with option D.\n0.0.0.0/0 which includes all possible IP Addresses is not recommended for security reasons. You have to keep access as restricted as possible."
      },
      {
        "user": "Pukapuiz",
        "text": "The Cloud SQL Auth Proxy is a Cloud SQL connector that provides secure access to your instances without a need for Authorized networks or for configuring SSL.\nhttps://cloud.google.com/sql/docs/mysql/sql-proxy"
      },
      {
        "user": "FreshMind",
        "text": "In question \"You want to use Cloud SQL public IP\", how this could be if \"Leaving the Authorized Networks empty means you're not allowing any direct connections based on IP addresses\" ?"
      },
      {
        "user": "Matt_108",
        "text": "always use Cloud SQL Auth proxy if possible"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 233,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "You are migrating a large number of files from a public HTTPS endpoint with signed URLs. The transfer job failed due to HTTP 403 errors on remaining files. You verified no changes to the source system. What should you do?",
    "options": [
      "A. Set up Cloud Storage FUSE. Remove completed files from TSV. Use shell script to download remaining.",
      "B. Renew the TLS certificate. Remove completed files and rerun.",
      "C. Create a new TSV file for remaining files by generating signed URLs with a longer validity period. Split into smaller files and submit parallel jobs.",
      "D. Update file checksums in TSV from MD5 to SHA256. Remove completed files and rerun."
    ],
    "correct": 2,
    "explanation": "Create a new TSV file for remaining files by generating signed URLs with a longer val This ensures data integrity and compliance during transfer.",
    "discussion": [
      {
        "user": "raaad",
        "text": "- It addresses the likely issue: that the signed URLs have expired or are otherwise invalid. By creating a new TSV file with freshly generated signed URLs (with a longer validity period), you're ensuring that the Storage Transfer Service has valid authorization to access the files.\n- Splitting the TSV file and running parallel jobs might help in managing the workload more efficiently and overcoming any limitations related to the number of files or transfer speed."
      },
      {
        "user": "srivastavas08",
        "text": "C. Create a new TSV file for the remaining files by generating signed URLs with a longer validity period. Split the TSV file into multiple smaller files and submit them as separate Storage Transfer Service jobs in parallel.\nHere's why:\nHTTP 403 errors: These errors indicate unauthorized access, but since you verified the source system and signed URLs, the issue likely lies with expired signed URLs. Renewing the URLs with a longer validity period prevents this issue for the remaining files.\nSe..."
      },
      {
        "user": "Matt_108",
        "text": "Option C - agree with Raaad"
      },
      {
        "user": "iooj",
        "text": "got this one on the exam, aug 2024, passed"
      },
      {
        "user": "scaenruy",
        "text": "C. Create a new TSV file for the remaining files by generating signed URLs with a longer validity period. Split the TSV file into multiple smaller files and submit them as separate Storage Transfer Service jobs in parallel."
      },
      {
        "user": "Pime13",
        "text": "C. Create a new TSV file for the remaining files by generating signed URLs with a longer validity period. Split the TSV file into multiple smaller files and submit them as separate Storage Transfer Service jobs in parallel.\nThe HTTP 403 errors likely occurred because the signed URLs expired before the transfer could complete. By generating new signed URLs with a longer validity period, you can ensure that the URLs remain valid for the duration of the transfer. Splitting the TSV file into smal..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 234,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You work for an airline and need to store weather data for ML in BigQuery. The model only uses the last 30 days. You want to avoid storing unnecessary data and minimize costs. What should you do?",
    "options": [
      "A. Create a table with ingestion timestamp. Run a scheduled query to delete rows older than 30 days.",
      "B. Create a table partitioned by datetime value of the weather date. Set up partition expiration to 30 days.",
      "C. Create a table partitioned by ingestion time. Set up partition expiration to 30 days.",
      "D. Create a table with a datetime column. Run a scheduled query to delete rows older than 30 days."
    ],
    "correct": 1,
    "explanation": "Create a table partitioned by datetime value of the weather date This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "iooj",
        "text": "got this one on the exam, aug 2024, passed"
      },
      {
        "user": "joao_01",
        "text": "It's not a good point. The granularity goes to DAYs, not SECONDs. So, the right answer is B."
      },
      {
        "user": "AllenChen123",
        "text": "Partitioned based on weather date, with partition expiration set"
      },
      {
        "user": "d11379b",
        "text": "https://cloud.google.com/bigquery/docs/partitioned-tables\nHere it mentions “ For TIMESTAMP and DATETIME columns, the partitions can have either hourly, daily, monthly, or yearly granularity.l\nSo you should not calculate the amount of partitions on second granularity"
      },
      {
        "user": "Sofiia98",
        "text": "We need the last 30 days, we don't care about ingestion time"
      },
      {
        "user": "desertlotus1211",
        "text": "Partitioning by ingestion time is simpler and sufficient if data retention is based on load time, not the data’s internal timestamp"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 235,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You have a streaming Dataflow pipeline with a Pub/Sub subscription as source. You need to update the code making the pipeline incompatible with the current version. You do not want to lose data. What should you do?",
    "options": [
      "A. Update the current pipeline and use the drain flag.",
      "B. Update the current pipeline and provide the transform mapping JSON object.",
      "C. Create a new pipeline with the same Pub/Sub subscription and cancel the old pipeline.",
      "D. Create a new pipeline with a new Pub/Sub subscription and cancel the old pipeline."
    ],
    "correct": 0,
    "explanation": "Update the current pipeline and use the drain flag This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "VishalB",
        "text": "Correct Option : A\nExplanation:-This option is correct as the key requirement is not to lose\nthe data, the Dataflow pipeline can be stopped using the Drain option.\nDrain options would cause Dataflow to stop any new processing, but would\nalso allow the existing processing to complete"
      },
      {
        "user": "BigQuery",
        "text": "To all the New Guys Here. Please don't get confused with all the people's fight over here. Just google the question and you will get the correct ans in many website. Still I recommend to refer this website for question. for this Particular problem ans is A. Reason is here --> https://cloud.google.com/dataflow/docs/guides/updating-a-pipeline#python\nhave time to read the full page when to use Update using Json mapping and when to use Drain. (you will have question following for Drain option tho..."
      },
      {
        "user": "[Removed]",
        "text": "Correct B - https://cloud.google.com/dataflow/docs/guides/updating-a-pipeline#preventing_compatibility_breaks"
      },
      {
        "user": "arnabbis4u",
        "text": "The job can be incompatible for reasons other than transformation changes. Since it is clearly mentioned that the change job is incompatible, I think we have to create a new job and D should be correct."
      },
      {
        "user": "IKGx1iGetOWGSjAQDD2x",
        "text": "Answer is D.\n* A and B are not possible, since the new job is not compatible.\n* C might lead to lost data.\n* D might lead to data being processed twice, but no data will be lost.\nBetter would usually be to drain and start a new pipeline."
      },
      {
        "user": "Radhika7983",
        "text": "At first glance, I thought the answer was A but after after reading more of google cloud documentation, I go with answer B.\nSee below documentation,\n\"When you launch your replacement job, the Dataflow service performs a compatibility check between your replacement job and your prior job. If the compatibility check passes, your prior job will be stopped. Your replacement job will then launch on the Dataflow service while retaining the same job name. If the compatibility check fails, your prior..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 236,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You need to look at BigQuery data from a specific table multiple times a day. The underlying table is several petabytes. You want to run queries faster and get up-to-date insights quicker. What should you do?",
    "options": [
      "A. Run a scheduled query to pull necessary data at specific intervals.",
      "B. Use a cached query to accelerate time to results.",
      "C. Limit the query columns being pulled.",
      "D. Create a materialized view based off of the query being run."
    ],
    "correct": 3,
    "explanation": "Create a materialized view based off of the query being run This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "AllenChen123",
        "text": "Create a materialized view as query source.\nMaterialized views are precomputed views that periodically cache the results of a query for increased performance and efficiency."
      },
      {
        "user": "Shenbasekhar",
        "text": "Option D. Materialized view"
      },
      {
        "user": "Sofiia98",
        "text": "materialized view"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 237,
    "topic": "Pub/Sub",
    "difficulty": 2,
    "question": "Your chemical company needs to manually check documentation for customer orders. You use a pull subscription in Pub/Sub. You must ensure no duplicate processing without adding complexity. What should you do?",
    "options": [
      "A. Use a Deduplicate PTransform in Dataflow before sending to agents.",
      "B. Create a transactional database that monitors pending messages.",
      "C. Use Pub/Sub exactly-once delivery in your pull subscription.",
      "D. Create a new Pub/Sub push subscription to monitor orders."
    ],
    "correct": 2,
    "explanation": "Use Pub/Sub exactly-once delivery in your pull subscription This subscriptions model fan-out and load-balancing patterns; push subscriptions deliver to HTTP endpoints while pull subscriptions provide backpressure control.",
    "discussion": [
      {
        "user": "meh_33",
        "text": "Believe me all questions were from Exam topic all were there yesterday in exam. But yes dont go with starting questions mainly focus questions after 200 and latest questions are at last page."
      },
      {
        "user": "JimmyBK",
        "text": "I remember seeing this in the exam."
      },
      {
        "user": "AllenChen123",
        "text": "Straightforward.\nhttps://cloud.google.com/pubsub/docs/exactly-once-delivery"
      },
      {
        "user": "Jordan18",
        "text": "how many questions were from here?"
      },
      {
        "user": "iooj",
        "text": "also got this one. about 70%"
      },
      {
        "user": "22c1725",
        "text": "\"that you do not add more complexity to this workflow\".\nI would go with C"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 238,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are migrating your on-premises data warehouse to BigQuery. You want to facilitate cross-team collaboration to share, discover, and subscribe to read-only data in a self-service manner while minimizing costs and maximizing data freshness. What should you do?",
    "options": [
      "A. Use Analytics Hub to facilitate data sharing.",
      "B. Create authorized datasets to publish shared data in the subscribing team's project.",
      "C. Create a new dataset for sharing in each team's project. Grant bigquery.dataViewer.",
      "D. Use BigQuery Data Transfer Service to copy datasets to a centralized project."
    ],
    "correct": 0,
    "explanation": "Use Analytics Hub to facilitate data sharing This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "FireAtMe",
        "text": "Analytics Hub is a fully managed data sharing platform provided by Google Cloud. It allows organizations to publish, discover, and subscribe to datasets securely and efficiently. It facilitates collaboration across teams or even across organizations by enabling self-service access to shared data without duplicating or moving it."
      },
      {
        "user": "22c1725",
        "text": "Analytics Hub is designed to enable secure and scalable data sharing across organizational boundaries"
      },
      {
        "user": "Pime13",
        "text": "Analytics Hub is designed to enable secure and scalable data sharing across organizational boundaries. It allows teams to publish, discover, and subscribe to datasets without the need to replicate data, ensuring data freshness and minimizing cost\nhttps://cloud.google.com/blog/products/data-analytics/bigquery-analytics-hub-for-data-sharing\nhttps://cloud.google.com/bigquery/docs/analytics-hub-introduction"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 239,
    "topic": "Dataproc",
    "difficulty": 2,
    "question": "You want to migrate an Apache Spark 3 batch job from on-premises. You need to read from Cloud Storage and write to BigQuery. You want to be able to choose executor settings (8 vCPU, 16 GB). You want to minimize installation and management. What should you do?",
    "options": [
      "A. Execute the job on a new GKE cluster.",
      "B. Execute the job from a new Compute Engine VM.",
      "C. Execute the job in a new Dataproc cluster.",
      "D. Execute as a Dataproc Serverless job."
    ],
    "correct": 3,
    "explanation": "Dataproc Serverless eliminates cluster provisioning entirely while still allowing customization of executor cores and memory via Spark properties.",
    "discussion": [
      {
        "user": "chicity_de",
        "text": "Priority is \"minimize installation and management effort\" which is done via Dataproc Serverless. Furthermore, with Dataproc serverless you can still specify resource settings for your job, such as the number of vCPUs and memory per executor (https://cloud.google.com/dataproc-serverless/docs/concepts/properties)"
      },
      {
        "user": "a494e30",
        "text": "Needs to be able to configure \"similar settings\""
      },
      {
        "user": "plum21",
        "text": "It's not possible to specify a machine type using Dataproc Serverless"
      },
      {
        "user": "marlon.andrei",
        "text": "I choice \"C\", just: \"where each executor has 8 vCPU and 16 GB memory, and you want to be able to choose similar settings\""
      },
      {
        "user": "22c1725",
        "text": "I would go with (C) : \"and you want to be able to choose similar settings\" not applicable for (D)"
      },
      {
        "user": "Positron75",
        "text": "Dataproc Serverless allows configuring those parameters: https://cloud.google.com/dataproc-serverless/docs/concepts/properties"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 240,
    "topic": "Dataflow/Networking",
    "difficulty": 2,
    "question": "You are configuring networking for a Dataflow job with custom container images. The pipeline reads from Cloud Storage and writes to BigQuery. You need cost-effective and secure communication. What should you do?",
    "options": [
      "A. Disable external IP addresses and enable Private Google Access.",
      "B. Leave external IP addresses. Enforce firewall rules.",
      "C. Disable external IP addresses and establish a Private Service Connect endpoint.",
      "D. Enable Cloud NAT for outbound internet while enforcing firewall rules."
    ],
    "correct": 0,
    "explanation": "Disable external IP addresses and enable Private Google Access This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "Pime13",
        "text": "A. Disable external IP addresses from worker VMs and enable Private Google Access.\nThis approach ensures that your worker VMs can access Google APIs and services securely without using external IP addresses, which reduces costs and enhances security by keeping the traffic within Google's network"
      },
      {
        "user": "m_a_p_s",
        "text": "While option C is technically implementable, option A is a straightforward and a simpler solution.\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 241,
    "topic": "Architecture",
    "difficulty": 3,
    "question": "You are using Workflows to call an API, apply complex business logic on the response, and load from Cloud Storage to BigQuery. The Workflows standard library is insufficient. You want to use Python. You want simplicity and speed. What should you do?",
    "options": [
      "A. Create a Cloud Composer environment and run the logic.",
      "B. Create a Dataproc cluster with PySpark.",
      "C. Invoke a Cloud Function instance that uses Python.",
      "D. Invoke a subworkflow in Workflows."
    ],
    "correct": 2,
    "explanation": "Invoke a Cloud Function instance that uses Python This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "Pime13",
        "text": "C. Invoke a Cloud Function instance that uses Python to apply the logic on your JSON file.\nUsing a Cloud Function allows you to run your Python code in a serverless environment, which simplifies deployment and management. It also ensures quick execution and scalability, as Cloud Functions can handle the processing of your JSON response efficiently"
      },
      {
        "user": "FireAtMe",
        "text": "Cloud Functions is a serverless compute service ideal for executing lightweight, event-driven tasks with low latency."
      },
      {
        "user": "22c1725",
        "text": "\"A\" not possible since you will be runing the same logic inside of airflow nothing else.\ndataproc is unneeded."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 242,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are administering BigQuery on-demand. Your BI tool submits hundreds of queries daily aggregating a 50 TB table. You want to decrease response time, lower costs, and minimize maintenance. What should you do?",
    "options": [
      "A. Build authorized views to aggregate data.",
      "B. Enable BI Engine and add sales table as preferred table.",
      "C. Build materialized views to aggregate data at day and month level.",
      "D. Create a scheduled query to build aggregate tables hourly."
    ],
    "correct": 2,
    "explanation": "Build materialized views to aggregate data at day and month level This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "Pime13",
        "text": "C. Build materialized views on top of the sales table to aggregate data at the day and month level.\nMaterialized views are precomputed views that cache the results of a query, which can significantly improve query performance and reduce costs by avoiding repeated computation. They automatically update with changes to the base table, ensuring data freshness without additional maintenance.\nhttps://cloud.google.com/bigquery/docs/materialized-views-intro"
      },
      {
        "user": "hussain.sain",
        "text": "C is the answer.\nMaterialized Views:\nMaterialized views in BigQuery are precomputed views that store the results of a query, allowing for much faster query execution because BigQuery doesn’t need to recompute the results each time the query is run. The results are stored in a persistent table, which significantly improves performance for repeated queries that aggregate the same data.\nIn this case, you can create materialized views that aggregate the sales data at the day and month levels. Thi..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 243,
    "topic": "Data Processing",
    "difficulty": 2,
    "question": "You have several different unstructured data sources on-premises and in the cloud (Parquet, CSV). You want to centralize in Cloud Storage with your own encryption keys. You want a GUI-based solution. What should you do?",
    "options": [
      "A. Use BigQuery Data Transfer Service to move files into BigQuery.",
      "B. Use Storage Transfer Service to move files into Cloud Storage.",
      "C. Use Dataflow to move files into Cloud Storage.",
      "D. Use Cloud Data Fusion to move files into Cloud Storage."
    ],
    "correct": 1,
    "explanation": "Storage Transfer Service is purpose-built for transferring files to Cloud Storage with GUI and CMEK support. Data Fusion is an ETL tool, overkill and expensive for simple file centralization.",
    "discussion": [
      {
        "user": "m_a_p_s",
        "text": "D - only Cloud Data Fusion is a GUI-based solution."
      },
      {
        "user": "noiz",
        "text": "Is B incorrect?\nTransfer service + CloudKMS"
      },
      {
        "user": "skycracker",
        "text": "data fusion allows encryption"
      },
      {
        "user": "22c1725",
        "text": "I would go with \"D\" since GUI is required."
      },
      {
        "user": "Pime13",
        "text": "Cloud Data Fusion is a fully managed, cloud-native data integration service that provides a graphical interface for building and managing data pipelines. It supports various data formats and allows you to use your own encryption keys for secure data transfer"
      },
      {
        "user": "apoio.certificacoes.",
        "text": "I have read in previous questions that Transfer Services only uses CMEK in-transit.\nhttps://cloud.google.com/storage-transfer/docs/on-prem-security#in-flight"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 244,
    "topic": "BigQuery/DR",
    "difficulty": 2,
    "question": "You are using BigQuery with a regional dataset. Your sales table is updated multiple times per day. You need to protect against regional failures with RPO less than 24 hours while minimizing costs. What should you do?",
    "options": [
      "A. Schedule a daily export to a Cloud Storage dual or multi-region bucket.",
      "B. Schedule a daily copy of the dataset to a backup region.",
      "C. Schedule a daily BigQuery snapshot of the table.",
      "D. Modify ETL job to load data into both current and another backup region."
    ],
    "correct": 0,
    "explanation": "Schedule a daily export to a Cloud Storage dual or multi-region bucket This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "HectorLeon2099",
        "text": "Option A is the most cost efficient: https://cloud.google.com/blog/topics/developers-practitioners/backup-disaster-recovery-strategies-bigquery"
      },
      {
        "user": "gabbferreira",
        "text": "snapshots are stored in the same region, so it dont protect from regional failure"
      },
      {
        "user": "joelcaro",
        "text": "Opción D: Modify ETL job to load the data into both the current and another backup region\nEvaluación:\nAjustar el ETL para escribir en dos tablas (una en la región principal y otra en una región de respaldo) asegura que los datos estén disponibles en ambas ubicaciones casi en tiempo real.\nEsto garantiza un RPO de menos de 24 horas, ya que las actualizaciones intradía se reflejan en ambas regiones.\nAunque podría aumentar los costos de almacenamiento por duplicar los datos, es la solución más ef..."
      },
      {
        "user": "22c1725",
        "text": "Not 'C' snapchot are stored in the same region."
      },
      {
        "user": "desertlotus1211",
        "text": "almost the same as 211, 211 says multi-region vs regional..."
      },
      {
        "user": "Parandhaman_Margan",
        "text": "Meets the RPO requirement (< 24 hours)\nCost-effective solution\nQuick recovery from regional failures"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 245,
    "topic": "Security/DLP",
    "difficulty": 2,
    "question": "You need to preprocess customer data stored in a restricted bucket. You need to follow data privacy requirements including protecting certain sensitive data elements, while retaining all data for potential future use cases. What should you do?",
    "options": [
      "A. Use Cloud DLP API and Dataflow to detect and remove sensitive fields.",
      "B. Use CMEK to encrypt data in Cloud Storage. Use federated queries.",
      "C. Use Dataflow and Cloud DLP API to mask sensitive data. Write to BigQuery.",
      "D. Use Dataflow and Cloud KMS to encrypt sensitive fields and write to BigQuery."
    ],
    "correct": 3,
    "explanation": "Masking permanently replaces original values. Encrypting fields with Cloud KMS allows authorized decryption later, satisfying the requirement to retain data for future use.",
    "discussion": [
      {
        "user": "HectorLeon2099",
        "text": "It's C. \"A\" removes data and retaining all is a requirement."
      },
      {
        "user": "Pime13",
        "text": "C. Use Dataflow and the Cloud Data Loss Prevention API to mask sensitive data. Write the processed data in BigQuery.\nThis approach ensures that sensitive data elements are protected through masking, which meets data privacy requirements. At the same time, it retains the data in a usable form for future analyses\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      },
      {
        "user": "22c1725",
        "text": "Not A since \"while also retaining all of the data\" is required."
      },
      {
        "user": "22c1725",
        "text": "Removing data will lead to unability to do study & consumer analyses. since it's likely all of consumer data is under PII."
      },
      {
        "user": "Nagamanikanta",
        "text": "option C\nwe can simply mask the data and process in biguery"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 246,
    "topic": "Bigtable",
    "difficulty": 2,
    "question": "Your company is running a dynamic campaign. Data scientists are collecting terabytes that grow every hour. They are using Dataflow to preprocess and store features in Bigtable. They observe suboptimal performance with reads and writes of 10 TB. They want to improve while minimizing cost. What should they do?",
    "options": [
      "A. Redefine the schema by evenly distributing reads and writes across the row space.",
      "B. The performance should resolve over time as the Bigtable cluster size is increased.",
      "C. Redesign the schema to use a single row key to identify frequently updated values.",
      "D. Redesign the schema to use row keys based on numeric IDs that increase sequentially."
    ],
    "correct": 0,
    "explanation": "Redefine the schema by evenly distributing reads and writes across the row space This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "IsaB",
        "text": "I hate it when I read the question, than I think oh easy and I KNOW the answer, then I look at the choices and the answer I thought of is just not there at all... and I realize I absolutely have no idea :'D"
      },
      {
        "user": "[Removed]",
        "text": "https://cloud.google.com/bigtable/docs/performance#troubleshooting\nIf you find that you're reading and writing only a small number of rows, you might need to redesign your schema so that reads and writes are more evenly distributed."
      },
      {
        "user": "MaxNRG",
        "text": "A as the schema needs to be redesigned to distribute the reads and writes evenly across each table.\nRefer GCP documentation - Bigtable Performance:\nhttps://cloud.google.com/bigtable/docs/performance\nThe table's schema is not designed correctly. To get good performance from Cloud Bigtable, it's essential to design a schema that makes it possible to distribute reads and writes evenly across each table. See Designing Your Schema for more information.\nhttps://cloud.google.com/bigtable/docs/schema..."
      },
      {
        "user": "[Removed]",
        "text": "Answer: A\nDescription: Cloud Bigtable performs best when reads and writes are evenly distributed throughout your table, which helps Cloud Bigtable distribute the workload across all of the nodes in your cluster. If reads and writes cannot be spread across all of your Cloud Bigtable nodes, performance will suffer.\nIf you find that you're reading and writing only a small number of rows, you might need to redesign your schema so that reads and writes are more evenly distributed."
      },
      {
        "user": "hkris909",
        "text": "Guys, how relevant are these questions, as of Aug 14, 2023 Could we clear the PDE exam with these set of questions?"
      },
      {
        "user": "Brillianttyagi",
        "text": "A -\nMake sure you're reading and writing many different rows in your table. Bigtable performs best when reads and writes are evenly distributed throughout your table, which helps Bigtable distribute the workload across all of the nodes in your cluster. If reads and writes cannot be spread across all of your Bigtable nodes, performance will suffer.\nhttps://cloud.google.com/bigtable/docs/performance#troubleshooting"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 247,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "Your software uses JSON messages published to Pub/Sub then processed with Dataflow. During testing some messages are missing in the dashboard. All messages are being published to Pub/Sub successfully. What should you do?",
    "options": [
      "A. Check the dashboard application.",
      "B. Run a fixed dataset through the Dataflow pipeline and analyze the output.",
      "C. Use Stackdriver Monitoring on Pub/Sub to find missing messages.",
      "D. Switch Dataflow to pull messages from Pub/Sub."
    ],
    "correct": 1,
    "explanation": "Run a fixed dataset through the Dataflow pipeline and analyze the output This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "Answer: C\nDescription: Stackdriver can be used to check the error like number of unack messages, publisher pushing messages faster"
      },
      {
        "user": "tprashanth",
        "text": "B.\nStack driver monitoring is for performance, not logging of missing data."
      },
      {
        "user": "kubosuke",
        "text": "messages sent successfully to Topic, but not Subscription.\nin this case, if Dataflow cannot handle messages correctly it might not return acknowledgments to the Pub/Sub, and these errors can be seen from Monitoring.\nhttps://cloud.google.com/pubsub/docs/monitoring#monitoring_exp"
      },
      {
        "user": "dakk",
        "text": "Guys,Its confusing with so many discussion and the actual suggested answers being wrong, did anyone take an exam recently and if you think you got this question right, can you mark the confirmed answer"
      },
      {
        "user": "snamburi3",
        "text": "All messages are being published to Cloud Pub/Sub successfully. so Stackdriver might not help."
      },
      {
        "user": "MaxNRG",
        "text": "B as the issue can be debugged by running a fixed dataset and checking the output.\nRefer GCP documentation - Dataflow logging:\nhttps://cloud.google.com/dataflow/docs/guides/logging\nA is wrong as the Dashboard uses data provided by Dataflow, the input source for Dashboard seems to be the issue\nC is wrong as Monitoring will not help find missing messages in Cloud Pub/Sub\nD is wrong as Dataflow cannot be configured as Push endpoint with Cloud Pub/Sub."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 248,
    "topic": "Architecture",
    "difficulty": 3,
    "question": "Flowlogistic Case Study: They want to use BigQuery as primary analysis system, but still have Hadoop and Spark workloads. They don't know how to store common data. What should they do?",
    "options": [
      "A. Store the common data in BigQuery as partitioned tables.",
      "B. Store the common data in BigQuery and expose authorized views.",
      "C. Store the common data encoded as Avro in Google Cloud Storage.",
      "D. Store the common data in the HDFS storage for a Dataproc cluster."
    ],
    "correct": 2,
    "explanation": "Store the common data encoded as Avro in Google Cloud Storage This balances scalability, cost, and performance requirements.",
    "discussion": [
      {
        "user": "rtcpost",
        "text": "C. Store the common data encoded as Avro in Google Cloud Storage.\nThis approach allows for interoperability between BigQuery and Hadoop/Spark as Avro is a commonly used data serialization format that can be read by both systems. Data stored in Google Cloud Storage can be accessed by both BigQuery and Dataproc, providing a bridge between the two environments. Additionally, you can set up data transformation pipelines in Dataproc to work with this data."
      },
      {
        "user": "JOKKUNO",
        "text": "Given the scenario described for Flowlogistic's requirements and technical environment, the most suitable option for storing common data that is used by both Google BigQuery and Apache Hadoop/Spark workloads is:\nC. Store the common data encoded as Avro in Google Cloud Storage."
      },
      {
        "user": "midgoo",
        "text": "C should be the correct answer. However, please note that Google just released the BigQuery Connector for Hadoop, so if they ask the same question today, B will be the correct answer.\nA could be correct too, but I cannot see why it has to be partitioned"
      },
      {
        "user": "vishal0202",
        "text": "C is ans...avro data can be accessed by spark as well"
      },
      {
        "user": "nescafe7",
        "text": "To simplify the question, Apache Hadoop and Spark workloads that cannot be moved to BigQuery can be handled by DataProc. So the correct answer is D."
      },
      {
        "user": "res3",
        "text": "If you check the https://cloud.google.com/dataproc/docs/concepts/connectors/bigquery, it unloads the BQ data to GCS, utilizes it, and then deletes it from the GCS. Storing common data twice (at BQ and GCS) will not be the best option compared to 'C' (using GCS as the main common dataset)."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 249,
    "topic": "Architecture",
    "difficulty": 3,
    "question": "Flowlogistic Case Study: Management determined that Kafka servers cannot handle the data volume for real-time inventory tracking. You need to build a new system on GCP that can ingest data from global sources, process and query in real-time, and store reliably. Which products should you choose?",
    "options": [
      "A. Cloud Pub/Sub, Cloud Dataflow, and Cloud Storage",
      "B. Cloud Pub/Sub, Cloud Dataflow, and Local SSD",
      "C. Cloud Pub/Sub, Cloud SQL, and Cloud Storage",
      "D. Cloud Load Balancing, Cloud Dataflow, and Cloud Storage"
    ],
    "correct": 0,
    "explanation": "Cloud Pub/Sub, Cloud Dataflow, and Cloud Storage This balances scalability, cost, and performance requirements.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "I would say A.\nI think Pub/Sub can't directly send data to Cloud SQL."
      },
      {
        "user": "Dhamsl",
        "text": "This site make me feel that it intends to make users to be involved in discussion by suggesting wrong answer"
      },
      {
        "user": "SteelWarrior",
        "text": "Answer should be A.\n. Ingest data from variety of sources -> Cloud Pub/Sub\n. Real-time processing - Cloud DataFlow\n. Store Reliably - Google Cloud Storage"
      },
      {
        "user": "itche_scratche",
        "text": "A; pub/sub->dataflow (where you can do real-time analytic)->BQ/GCS"
      },
      {
        "user": "michaelkhan3",
        "text": "What???\nHow does the data get from Pub/Sub to CloudSQL? What is the point of Cloud storage if you are going to store the data in CloudSQL?\nWho comes up with these answers?"
      },
      {
        "user": "Radhika7983",
        "text": "The answer is A. Cloud pub sub for real time processing, cloud data flow for real time streaming data processing and loading data into cloud storage."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 250,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "Flowlogistic Case Study: CEO wants rapid insight into customer base. The sales team purchased a visualization tool but is overwhelmed by data and spending a lot on queries. You want the most cost-effective solution. What should you do?",
    "options": [
      "A. Export the data into a Google Sheet.",
      "B. Create an additional table with only the necessary columns.",
      "C. Create a view on the table to present to the visualization tool.",
      "D. Create IAM roles on the appropriate columns."
    ],
    "correct": 1,
    "explanation": "Logical views run the underlying query and don't reduce bytes scanned. A smaller physical table physically reduces bytes scanned, minimizing query costs.",
    "discussion": [
      {
        "user": "Radhika7983",
        "text": "Answer is C. A logical view can be created with only the required columns which is required for visualization. B is not the right option as you will create a table and make it static. What happens when the original data is updated. This new table will not have the latest data and hence view is the best possible option here."
      },
      {
        "user": "Dan137",
        "text": "I go with B becase according to views documentation: https://cloud.google.com/bigquery/docs/views-intro#view_pricing \"BigQuery's views are logical views, not materialized views. Because views are not materialized, the query that defines the view is run each time the view is queried. Queries are billed according to the total amount of data in all table fields referenced directly or indirectly by the top-level query. For more information, see query pricing.\""
      },
      {
        "user": "jin0",
        "text": "I don't think so because in question they worried about spending money for query but, using view could not make money safe because logical view scan all of the data in the table. so, for saving money for query then Answer B is more suitable"
      },
      {
        "user": "rtcpost",
        "text": "C. Create a view on the table to present to the virtualization tool.\nCreating a view in BigQuery allows you to define a virtual table that is a subset of the original data, containing only the necessary columns or filtered data that the sales team requires for their reports. This approach is cost-effective because it doesn't involve exporting data to external tools or creating additional tables, and it ensures that the sales team is working with the specific data they need without running exp..."
      },
      {
        "user": "CedricLP",
        "text": "As already said :\nA. Data is too big to be virtualized using Google Sheets.\nB. Creating the new table won't be able to keep up with the new data inserts.\nC. This will help to select appropriate columns as well as will be able to deal with new data inserts.\nD. You cannot restrict access to selected columns using IAM. Views should be used to do that."
      },
      {
        "user": "humza",
        "text": "Answer: B\nA. Data is too big to be virtualized using Google Sheets.\nB. Creating the new table won't be able to keep up with the new data inserts.\nC. This will help to select appropriate columns as well as will be able to deal with new data inserts.\nD. You cannot restrict access to selected columns using IAM. Views should be used to do that."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 251,
    "topic": "Pub/Sub",
    "difficulty": 2,
    "question": "Flowlogistic Case Study: Rolling out real-time inventory tracking. Tracking devices will send messages to a single Pub/Sub topic instead of Kafka. You want to ensure package data can be analyzed over time. Which approach should you take?",
    "options": [
      "A. Attach the timestamp in the Pub/Sub subscriber application as they are received.",
      "B. Attach the timestamp and Package ID on the outbound message from each publisher device.",
      "C. Use the NOW() function in BigQuery to record the event's time.",
      "D. Use the automatically generated timestamp from Cloud Pub/Sub to order the data."
    ],
    "correct": 1,
    "explanation": "Attach the timestamp and Package ID on the outbound message from each publisher device This Google's managed pub/sub messaging service enabling asynchronous communication with built-in ordering guarantees and at-least-once delivery semantics.",
    "discussion": [
      {
        "user": "Manue",
        "text": "\"However, they are unable to deploy it because their technology stack, based on Apache Kafka, cannot support the processing volume.\"\nSure man, Kafka is not performing, let's use PubSub instead hahaha..."
      },
      {
        "user": "ralf_cc",
        "text": "lol this is a vendor exam..."
      },
      {
        "user": "humza",
        "text": "Answer: B\nA. There is no indication that the application can do this. Moreover, due to networking problems, it is possible that Pub/Sub doesn't receive messages in order. This will analysis difficult.\nB. This makes sure that you have access to publishing timestamp which provides you with the correct ordering of messages.\nC. If timestamps are already messed up, BigQuery will get wrong results anyways.\nD. The timestamp we are interested in is when the data was produced by the publisher, not whe..."
      },
      {
        "user": "rtcpost",
        "text": "B. Attach the timestamp and Package ID on the outbound message from each publisher device as they are sent to Cloud Pub/Sub.\nHere's why this approach is the most suitable:\nBy attaching a timestamp and Package ID at the point of origin (publisher device), you ensure that each message has a clear and consistent timestamp associated with it from the moment it is generated. This provides a reliable and accurate record of when each package-tracking message was created, which is crucial for analyzi..."
      },
      {
        "user": "Radhika7983",
        "text": "The answer is B.\nJSON representation\n{\n\"data\": string,\n\"attributes\": {\nstring: string,\n...\n},\n\"messageId\": string,\n\"publishTime\": string,\n\"orderingKey\": string\n}\nIn the attribute, we can have package id and timestamp."
      },
      {
        "user": "sraakesh95",
        "text": "https://cloud.google.com/pubsub/docs/reference/rest/v1/PubsubMessage"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 252,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "MJTelco Case Study: Dataflow pipeline is ready to receive data from 50,000 installations. You want to allow Dataflow to scale its compute power up as required. Which configuration setting should you update?",
    "options": [
      "A. The zone",
      "B. The number of workers",
      "C. The disk size per worker",
      "D. The maximum number of workers"
    ],
    "correct": 3,
    "explanation": "The maximum number of workers This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "Radhika7983",
        "text": "The correct answer is D. Please look for the details in below\nhttps://cloud.google.com/dataflow/docs/guides/specifying-exec-params\nWe need to specify and set execution parameters for cloud data flow .\nAlso, to enable autoscaling, set the following execution parameters when you start your pipeline:\n--autoscaling_algorithm=THROUGHPUT_BASED\n--max_num_workers=N\nThe objective of autoscaling streaming pipelines is to minimize backlog while maximizing worker utilization and throughput, and quickly r..."
      },
      {
        "user": "jvg637",
        "text": "D. The maximum number of workers answers to the scale question"
      },
      {
        "user": "maurodipa",
        "text": "Answer is A: Dataflow is serverless, so no need to specify neither the number of workers, nor the max number of workers. https://cloud.google.com/dataflow"
      },
      {
        "user": "atnafu2020",
        "text": "D\nnumWorkers- int- The initial number of Google Compute Engine instances to use when executing your pipeline. This option determines how many workers the Dataflow service starts up when your job begins. If unspecified, the Dataflow service determines an appropriate number of workers.\nmaxNumWorkers-int-The maximum number of Compute Engine instances to be made available to your pipeline during execution. Note that this can be higher than the initial number of workers (specified by numWorkers to..."
      },
      {
        "user": "tprashanth",
        "text": "D, Max Workers can be changed as needed"
      },
      {
        "user": "Lodu_Lalit",
        "text": "D, thats because scalability is directly corerlated to max number of workers, size determines the speed of functioning"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 253,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "MJTelco Case Study: You need visualizations for operations teams. The report must include telemetry from all 50,000 installations for the most recent 6 weeks. Response time must be <5 seconds. Which approach meets the requirements?",
    "options": [
      "A. Load into Google Sheets. Use formulas to calculate metrics.",
      "B. Load into BigQuery tables. Write Google Apps Script that queries the data.",
      "C. Load into Cloud Datastore tables. Write an App Engine Application.",
      "D. Load into BigQuery tables. Write a Google Data Studio 360 report."
    ],
    "correct": 3,
    "explanation": "Load into BigQuery tables. Write a Google Data Studio 360 report This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "itche_scratche",
        "text": "D; dataflow doesn't connect to datastore, and not really for reporting. BQ, and data studio is a better choice."
      },
      {
        "user": "willymac2",
        "text": "I believe the answer is C.\nFirst requirement is that it must be a visualisation with, so A and B do not work (create a table and a spreadsheet).\nNow the second constraint which I believe is important is that the report MUST load in less than 5 seconds. But we do not know how complex the metric computation is, thus I cannot assume that we can compute it when we want to load the report, making me think that it be must be pre-computed. Thus option D cannot work as it create the metric AFTER quer..."
      },
      {
        "user": "JayZeeLee",
        "text": "D.\nA and B are incorrect, because Google Sheets are not the best fit to handle large amount of data.\nC may work, but it requires building an application which equates to more work.\nD is more efficient, therefore a better option."
      },
      {
        "user": "Radhika7983",
        "text": "The correct answer is D. Data studio is best to accelerate data exploration and analysis.\nAlso once the data is loaded in big query the data can be easily visualized in data studio."
      },
      {
        "user": "yoRob",
        "text": "D. .. App Engine is too much work"
      },
      {
        "user": "theseawillclaim",
        "text": "Why bother with a custom GAE app when you have Data Studio?"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 254,
    "topic": "Monitoring",
    "difficulty": 3,
    "question": "You create a report in Google Data Studio 360 using BigQuery as data source. Visualizations are not showing data less than 1 hour old. What should you do?",
    "options": [
      "A. Disable caching by editing the report settings.",
      "B. Disable caching in BigQuery by editing table details.",
      "C. Refresh your browser tab.",
      "D. Clear your browser history for the past hour."
    ],
    "correct": 0,
    "explanation": "Disable caching by editing the report settings This provides visibility into system performance and enables proactive alerting.",
    "discussion": [
      {
        "user": "Khaled_Rashwan",
        "text": "A. Disable caching by editing the report settings.\nBy default, Google Data Studio 360 caches data to improve performance and reduce the amount of queries made to the data source. However, this can cause visualizations to not show data that is less than 1 hour old, as the cached data is not up-to-date.\nTo resolve this, you should disable caching by editing the report settings. This can be done by following these steps:\nOpen the report in Google Data Studio 360.\nClick on the \"File\" menu in the ..."
      },
      {
        "user": "samdhimal",
        "text": "A. Disable caching by editing the report settings.\nData Studio 360 uses caching to speed up report loading times. When caching is enabled, Data Studio 360 will only show the data that was present in the data source at the time the report was loaded. To ensure that the visualizations in your report are always up-to-date, you should disable caching by editing the report settings. This will force Data Studio 360 to retrieve the latest data from the data source (in this case BigQuery) every time ..."
      },
      {
        "user": "AWSandeep",
        "text": "A. Disable caching by editing the report settings."
      },
      {
        "user": "rocky48",
        "text": "A. Disable caching by editing the report settings.\nBy default, Google Data Studio 360 caches data to improve performance and reduce the amount of queries made to the data source. However, this can cause visualizations to not show data that is less than 1 hour old, as the cached data is not up-to-date."
      },
      {
        "user": "beowulf_kat",
        "text": "Refreshing the web browser does not refresh the data behind the viz's in Data Studio. You have to click the 'refresh data source' button."
      },
      {
        "user": "max_c",
        "text": "Same question from a Cloud guru and answer was C. The wording is slightly different in the documentation but still, the idea is that you can trigger a manual refresh"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 255,
    "topic": "Security/IAM",
    "difficulty": 2,
    "question": "MJTelco Case Study: Data Studio 360 report uses BigQuery. Company policy ensures employees view only data associated with their region. You create a table for each region. Which two actions should you take? (Choose two.)",
    "options": [
      "A. Ensure all the tables are included in a global dataset.",
      "B. Ensure each table is included in a dataset for a region.",
      "C. Adjust settings for each table to allow a related region-based security group view access.",
      "D. Adjust settings for each view.",
      "E. Adjust settings for each dataset to allow a related region-based security group view access."
    ],
    "correct": [
      1,
      4
    ],
    "explanation": "Ensure each table is included in a dataset for a region This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "shanjin14",
        "text": "C is correct starting 2020, as BigQuery come with table level access control\nhttps://cloud.google.com/blog/products/data-analytics/introducing-table-level-access-controls-in-bigquery"
      },
      {
        "user": "samstar4180",
        "text": "Yes, the correct answer should be BC - since we can have table-level access and each region represents a table."
      },
      {
        "user": "hendrixlives",
        "text": "B/E: Even if now BQ offers table level access control, since the number of tables can be expected to be high, controlling access at the dataset level would ease operations. That is why I would still go for E instead of C."
      },
      {
        "user": "MisuLava",
        "text": "if you create table-level access control and grant it to different groups for different tables, what is the point of putting tables in different datasets and different regions?\nSo i choose BE"
      },
      {
        "user": "Chelseajcole",
        "text": "Some newer answers support Table level control as Google launched new table level control last year. But do we need table-level control? We only need dataset-level control. So create different region data as different dataset, make sure all table belong to that region included in the regional dataset, grant access on dataset. Answer is BE."
      },
      {
        "user": "niru12376",
        "text": "BE... If we've already split the tables into regions via datasets then why give regional access through tables again.. If not, then AC but definitely not BC.. Please help"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 256,
    "topic": "Bigtable",
    "difficulty": 2,
    "question": "MJTelco Case Study: You need to create a schema in Bigtable for historical analysis of the last 2 years. Records are sent every 15 minutes with a device ID and data record. The most common query is for all data for a given device for a given day. Which schema should you use?",
    "options": [
      "A. Rowkey: date#device_id Column: data_point",
      "B. Rowkey: date Column: device_id, data_point",
      "C. Rowkey: device_id Column: date, data_point",
      "D. Rowkey: data_point Column: device_id, date",
      "E. Rowkey: date#data_point Column: device_id"
    ],
    "correct": 2,
    "explanation": "Rowkey: device_id Column: date, data_point This NoSQL wide-column store optimized for time-series and analytical workloads with millisecond latency, automatic scaling, and replication.",
    "discussion": [
      {
        "user": "itche_scratche",
        "text": "None, rowkey should be Device_Id+Date(reverse)"
      },
      {
        "user": "Jlozano",
        "text": "A - \"Date#Device_Id\" is not the same that \"Timestamp#Device_Id\". If you want to query historical data, rowkey as \"2021-12-09#12345device\" is optimal design. Nevertheless, \"2021-12-09:09:10:47:2000#12345device\" isn't it. Each record has a date (2021-12-09) and unique devide id (12345, 12346, 12347...)."
      },
      {
        "user": "jvg637",
        "text": "think is A, since “The most common query is for all the data for a given device for a given day”, rowkey should have info for both devcie and date."
      },
      {
        "user": "Ankit267",
        "text": "A - Key should be less granular item first to more granular item, there are more devices than date key (every 15 min)"
      },
      {
        "user": "maxdataengineer",
        "text": "Actually it depends. You will only have 365 x 2 dates unique dates at a given tame, since is a 2 year history, while most likely have more devices than that. So it will make more sence to start with the date first instead of the the device"
      },
      {
        "user": "michaelkhan3",
        "text": "Google specifically mentions that it's a bad idea to use a timestamp at the start of a rowkey\nhttps://cloud.google.com/bigtable/docs/schema-design#row-keys-avoid\nThe answer really should be Device_id#Timestamp but with the answers we were given you would be better off leaving the timestamp out all together"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 257,
    "topic": "Dataproc",
    "difficulty": 2,
    "question": "Your company has grown rapidly and Hadoop batch jobs are falling behind. You were asked to recommend ways to increase responsiveness without increasing costs. What should you recommend?",
    "options": [
      "A. Rewrite the job in Pig.",
      "B. Rewrite the job in Apache Spark.",
      "C. Increase the size of the Hadoop cluster.",
      "D. Decrease the size of the Hadoop cluster but rewrite the job in Hive."
    ],
    "correct": 1,
    "explanation": "Rewrite the job in Apache Spark This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "I would say B since Apache Spark is faster than Hadoop/Pig/MapReduce"
      },
      {
        "user": "ler_mp",
        "text": "Wow, a question that does not recommend to use Google product"
      },
      {
        "user": "itsmynickname",
        "text": "None. Being a GCP exam, it must be either Dataflow or BigQuery :D"
      },
      {
        "user": "Whoswho",
        "text": "looks like he's trying to spark the company up."
      },
      {
        "user": "KHAN0007",
        "text": "I would like to take a moment to thank you all guys\nYou guys are awesome!!!"
      },
      {
        "user": "Krish6488",
        "text": "Both Pig & Spark requires rewriting the code so its an additional overhead, but as an architect I would think about a long lasting solution. Resizing Hadoop cluster can resolve the problem statement for the workloads at that point in time but not on longer run. So Spark is the right choice, although its a cost to start with, it will certainly be a long lasting solution"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 258,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You work for a large fast food restaurant chain. You need to provide a FullName field consisting of FirstName concatenated with LastName for each employee. How can you make that data available while minimizing cost?",
    "options": [
      "A. Create a view in BigQuery that concatenates the FirstName and LastName.",
      "B. Add a new column called FullName and run UPDATE statements.",
      "C. Create a Dataflow job that queries BigQuery, concatenates, and loads into a new table.",
      "D. Export to CSV, create a Dataproc job, and load the new CSV into BigQuery."
    ],
    "correct": 0,
    "explanation": "Create a view in BigQuery that concatenates the FirstName and LastName This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "Answer will be A because when you create View it does not store extra space and its a logical representation, for rest of the option you need to write large code and extra processing for dataflow/dataproc"
      },
      {
        "user": "BhupiSG",
        "text": "Correct: B\nBigQuery has no quota on the DML statements. (Search Google - does bigquery have quota for update).\nWhy not C: This is a one time activity and SQL is the easiest way to program it. DataFlow is way overkill for this. You will need to find an engineer who can develop DataFlow pipelines. Whereas, SQL is so much more widely known and easier. One of the great features about BigQuery is its SQL interface. Even for BigQueryML services."
      },
      {
        "user": "funtoosh",
        "text": "cannot be 'A'as it clearly says that you need to change the schema and data."
      },
      {
        "user": "exnaniantwort",
        "text": "Your primary task is to \"make data available\".\nChanging the schema is just the request from the member \"A member of IT is building an application and ***asks you to modify the schema and data*** in BigQuery\". You don't have to follow it if it does not make sense."
      },
      {
        "user": "[Removed]",
        "text": "Because views are not materialized, the query that defines the view is run each time the view is queried. Queries are billed according to the total amount of data in all table fields referenced directly or indirectly by the top-level query"
      },
      {
        "user": "yoshik",
        "text": "You are asked to modify the schema and data. By using a view, the underlined table remains intact."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 259,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You are deploying a new storage system on Cloud Datastore. You have entities with multiple properties, some with multiple values. You want to avoid a combinatorial explosion in indexes. Which entity options should you set?",
    "options": [
      "A. Manually configure the index in your index config as shown (A).",
      "B. Manually configure the index in your index config as shown (B).",
      "C. Set exclude_from_indexes = 'actors, tags'",
      "D. Set exclude_from_indexes = 'date_published'"
    ],
    "correct": 2,
    "explanation": "Combinatorial explosion in Datastore is caused by indexing multiple array properties. Exclude the array properties (like actors, tags), not single-value fields like date_published.",
    "discussion": [
      {
        "user": "Wasss123",
        "text": "Correct answer is A\nRead in reference : https://cloud.google.com/datastore/docs/concepts/indexes#index_limits\nn this case, you can circumvent the exploding index by manually configuring an index in your index configuration file:\nindexes:\n- kind: Task\nproperties:\n- name: tags\n- name: created\n- kind: Task\nproperties:\n- name: collaborators\n- name: created\nThis reduces the number of entries needed to only (|tags| * |created| + |collaborators| * |created|), or 6 entries instead of 9"
      },
      {
        "user": "Krish6488",
        "text": "Tempted to go with D as the syntax in Option A seems incorrect. D is still a possible answer because one of the ways to get rid of index errors is to remove the entities that are causing the index to explode. In this case its date_released and hence D appears right to me"
      },
      {
        "user": "DGames",
        "text": "Option B & D reject because mention date_publised in question date_released is column\nOption C also not correct, I would go with option A."
      },
      {
        "user": "Ender_H",
        "text": "Correct Answer D:\nThis is the way the DB is typically queried:\n- movies with actor=<actorname> ordered by date_released\n- movies with tag=Comedy ordered by date_released\nso it seems that we need indices in actor,tag and date_released for sorting.\n❌ A: this would be the correct answer, however, the format is incorrect, the correct format would be '- name: date_released' correctly indented.\n❌ B: This seems to be unnecessary, since typically actor and tag are not queried together. also, there is..."
      },
      {
        "user": "Ender_H",
        "text": "And here is the correct way to configure indices:\nhttps://cloud.google.com/datastore/docs/tools/indexconfig\nso this would be the best answer:\nindexes:\n- kind: Movie\nproperties:\n- name: actors\n- name: date_released\ndirection: asc. <This could be left out, it defaults to direction: asc if excluded>\n- kind: Movie\nproperties:\n- name: tag\n- name: date_released\ndirection: asc. <This could be left out, it defaults to direction: asc if excluded>"
      },
      {
        "user": "jkhong",
        "text": "you can circumvent the exploding index by manually configuring an index in your index configuration file:\nhttps://cloud.google.com/datastore/docs/concepts/indexes#index_limits"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 260,
    "topic": "Orchestration",
    "difficulty": 2,
    "question": "You work for a manufacturing plant that batches application log files once a day at 2:00 AM. You need to process the log file once per day as inexpensively as possible. What should you do?",
    "options": [
      "A. Change to use Cloud Dataproc instead.",
      "B. Manually start the Dataflow job each morning.",
      "C. Create a cron job with Google App Engine Cron Service to run the Dataflow job.",
      "D. Configure the Dataflow job as a streaming job."
    ],
    "correct": 2,
    "explanation": "Create a cron job with Google App Engine Cron Service to run the Dataflow job This provides reliable scheduling with error handling and retries.",
    "discussion": [
      {
        "user": "captainbu",
        "text": "C was correct but nowadays you'd schedule a Dataflow job with Cloud Scheduler: https://cloud.google.com/community/tutorials/schedule-dataflow-jobs-with-cloud-scheduler"
      },
      {
        "user": "itsmynickname",
        "text": "C. For a modern solution, Cloud Scheduler"
      },
      {
        "user": "Radhika7983",
        "text": "Answer is C. https://cloud.google.com/appengine/docs/flexible/nodejs/scheduling-jobs-with-cron-yaml"
      },
      {
        "user": "haroldbenites",
        "text": "C Correct\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      },
      {
        "user": "Chelseajcole",
        "text": "I know probably this question is testing on if you know corn.yaml and its function in App Engine. But why B will be more expensive? Human capital cost? Let's say if hiring a person click the button will be cheaper than launch an app engine, should we reconsider B?"
      },
      {
        "user": "AmirN",
        "text": "Would you rather pay someone $100,000 a year to click 'run' on jobs all day, or have them automate it and do more cutting edge work? This would be opportunity cost."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 261,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You work for an economic consulting firm. You correlate customer data with average prices of goods updated every 30 minutes. You want to keep this data up to date in BigQuery as cheaply as possible. What should you do?",
    "options": [
      "A. Load the data every 30 minutes into a new partitioned table in BigQuery.",
      "B. Store and update data in a regional Cloud Storage bucket and create a federated data source in BigQuery.",
      "C. Store data in Cloud Datastore. Use Dataflow to query BigQuery and combine.",
      "D. Store data in a file in regional Cloud Storage. Use Dataflow to query BigQuery and combine."
    ],
    "correct": 1,
    "explanation": "Store and update data in a regional Cloud Storage bucket and create a federated data This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "mmarulli",
        "text": "this is one of the sample exam questions that google has on their website. The correct answer is B"
      },
      {
        "user": "[Removed]",
        "text": "Answer: B\nDescription: B is correct because regional storage is cheaper than BigQuery storage."
      },
      {
        "user": "funtoosh",
        "text": "it's not only cheaper but the requirement is that the data keep updating every 30 min and you need to combine the data in bigquery, use external tables to do that is the recommended practice"
      },
      {
        "user": "BhupiSG",
        "text": "Correct B\nAs per google docs on BigQuery:\nUse cases for external data sources include:\nLoading and cleaning your data in one pass by querying the data from an external data source (a location external to BigQuery) and writing the cleaned result into BigQuery storage.\nHaving a small amount of frequently changing data that you join with other tables. As an external data source, the frequently changing data does not need to be reloaded every time it is updated."
      },
      {
        "user": "IsaB",
        "text": "Yes, very misleading. Always look for the right answer based on comments, never based on the 'correct' answer indicated."
      },
      {
        "user": "yoga9993",
        "text": "we can't implement A, it's because biquery partition table can only be done minimun in range 1 hour, the requirement said it must be update every 30 minutes, so A is imposible option as the minimum partition is in hour level"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 262,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You are designing a database schema for an ML-based food ordering service. You need to store user profile, account information, and order information. You want to optimize the data schema for transactional data. Which product should you use?",
    "options": [
      "A. BigQuery",
      "B. Cloud SQL",
      "C. Cloud Bigtable",
      "D. Cloud Datastore"
    ],
    "correct": 1,
    "explanation": "Cloud SQL This optimizes data access patterns and minimizes egress costs.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "You want to optimize the data schema + Machine Learning --> Bigquery. So A"
      },
      {
        "user": "yoshik",
        "text": "BigQuery is a datawarehouse, not a transactional db. You need to store transactional data as a requirement."
      },
      {
        "user": "[Removed]",
        "text": "Answer: Should be D - Datastore"
      },
      {
        "user": "GeeBeeEl",
        "text": "There is SQLML with BigQuery, you know that?\nYou cannot optimize a schema in datastore, it is a NoSQL document database built for automatic scaling, high performance, and ease of application development. It does not work based on schemas!"
      },
      {
        "user": "alexmirmao",
        "text": "In my opinion transactional data doesnt mean transactions they could be grouped so there is no need to write register by register."
      },
      {
        "user": "gcper",
        "text": "B\nI think the initial sentences are there to trick the test taker... They go on to say \"The database will be used to store all the transactional data of the product. You want to optimize the data schema.\"\nNote: store transactional data. BQ isn't a transactional database. Datastore is schemaless document NoSQL database and BigTable is rowkey NoSQL database."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 263,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "Your company is loading CSV files into BigQuery. The data is imported successfully but doesn't match byte-to-byte to the source file. What is the most likely cause?",
    "options": [
      "A. The CSV data loaded is not flagged as CSV.",
      "B. The CSV data has invalid rows that were skipped on import.",
      "C. The CSV data is not using BigQuery's default encoding.",
      "D. The CSV data has not gone through ETL before loading."
    ],
    "correct": 2,
    "explanation": "The CSV data is not using BigQuery's default encoding This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "YAS007",
        "text": "Answer : C :\n\" If you don't specify an encoding, or if you specify UTF-8 encoding when the CSV file is not UTF-8 encoded, BigQuery attempts to convert the data to UTF-8. Generally, your data will be loaded successfully, but it may not match byte-for-byte what you expect.\"\nhttps://cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#details_of_loading_csv_data"
      },
      {
        "user": "saurabh1805",
        "text": "C is correct answer, Refer below link for more informaiton.\nhttps://cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#details_of_loading_csv_data"
      },
      {
        "user": "medeis_jar",
        "text": "A is not correct because if another data format other than CSV was selected then the data would not import successfully.\nB is not correct because the data was fully imported meaning no rows were skipped.\nC is correct because this is the only situation that would cause successful import.\nD is not correct because whether the data has been previously transformed will not affect whether the source file will match the BigQuery table."
      },
      {
        "user": "samdhimal",
        "text": "SITUATION:\n- Your company is loading comma-separated values (CSV) files into Google BigQuery.\n- Data is fully imported successfully.\nPROBLEM:\n- Imported data is not matching byte-to-byte to the source file. Reason?"
      },
      {
        "user": "samdhimal",
        "text": "A. The CSV data loaded in BigQuery is not flagged as CSV.\nSince BigQuery support multiple formats it could be that maybe avro or json was selected.\nBut the file import was successful hence csv was selected. Either manually or it was left as is since the default file type is csv. Lastly, this is WRONG.\nB. The CSV data has invalid rows that were skipped on import.\n-> Since the data was successfully imported there were no invalid rows. Hence, This is wrong answer too."
      },
      {
        "user": "samdhimal",
        "text": "C. The CSV data loaded in BigQuery is not using BigQuery's default encoding.\n-> \"BigQuery supports UTF-8 encoding for both nested or repeated and flat data. BigQuery supports ISO-8859-1 encoding for flat data only for CSV files.\"\nSource: https://cloud.google.com/bigquery/docs/loading-data\nDefault BQ Encoding: UTF-8\nThis is probably the correct answer because if the csv file encoding was not UTF-8 and instead it was ISO-8859-1 then we would have to tell bigquery that orelse it will assume it i..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 264,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "Your company produces 20,000 files every hour, each less than 4 KB. You have 200ms latency to Google Cloud and 50 Mbps bandwidth. The system is barely keeping up and files will double next three months. Which two actions should you take? (Choose two.)",
    "options": [
      "A. Introduce data compression for each file.",
      "B. Increase maximum bandwidth to at least 100 Mbps.",
      "C. Redesign the data ingestion process to use gsutil in parallel.",
      "D. Assemble 1,000 files into a TAR file.",
      "E. Create an S3-compatible endpoint and use Cloud Storage Transfer Service."
    ],
    "correct": [
      2,
      3
    ],
    "explanation": "Redesign the data ingestion process to use gsutil in parallel This ensures data integrity and compliance during transfer.",
    "discussion": [
      {
        "user": "Toto2020",
        "text": "E cannot be: Transfer Service is recommended for 300mbps or faster\nhttps://cloud.google.com/storage-transfer/docs/on-prem-overview\nBandwidth is not an issue, so B is not an answer\nCloud Storage loading gets better throughput the larger the files are. Therefore making them smaller with compression does not seem a solution. -m option to do parallel work is recommended. Therefore A is not and C is an answer.\nhttps://medium.com/@duhroach/optimizing-google-cloud-storage-small-file-upload-performan..."
      },
      {
        "user": "ch3n6",
        "text": "C, D\nC: use gsutil to upload in parallel, improve upload speed.\nD: tar many small files into one: more efficient for network transfer. 4kB is too small for TCP connection. see: tcp slow start\nWhy not A: \" bandwidth utilization is rather low.\".\nWhy not B: same as A. Why not E: transfer service it not for on-premises."
      },
      {
        "user": "serg3d",
        "text": "CD - and compress files and use gsutil -m instead of sftp"
      },
      {
        "user": "hendrixlives",
        "text": "CD is correct.\nSee: https://jbrojbrojbro.medium.com/parallel-uploads-for-smaller-files-387ff86afc74\nA: size is small enough that compressing each file will not help (indeed, it may even add overhead).\nB: bandwidth is not a problem, no need to increase.\nC: Parallel uploading the files with -m will increase speed in general.\nD: many individual small files are a problem, since each file adds overhead to the processing and upload to GCS, and the upload sped of GCS is proportional to the size. If ..."
      },
      {
        "user": "BhupiSG",
        "text": "Thank you! From this doc:\nFollow these rules of thumb when deciding whether to use gsutil or Storage Transfer Service:\nTransfer scenario Recommendation\nTransferring from another cloud storage provider Use Storage Transfer Service.\nTransferring less than 1 TB from on-premises Use gsutil.\nTransferring more than 1 TB from on-premises Use Transfer service for on-premises data.\nTransferring less than 1 TB from another Cloud Storage region Use gsutil.\nTransferring more than 1 TB from another Cloud ..."
      },
      {
        "user": "anji007",
        "text": "Ans: C & D.\nA: Compressing, reduces the file size hence bandwidth utilization will comedown, but as per the question Bandwidth utilization is already low. So doesnt make difference.\nB: Not required.\nE: Size is fairly lesser than 1TB, so gsutil suffice for this problem."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 265,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "An external customer provides daily CSV file dumps to Cloud Storage for BigQuery. The data could have incorrectly formatted or corrupted rows. How should you build the pipeline?",
    "options": [
      "A. Use federated data sources and check data in SQL query.",
      "B. Enable BigQuery monitoring in Stackdriver and create an alert.",
      "C. Import data into BigQuery using gcloud CLI and set max_bad_records to 0.",
      "D. Run a Cloud Dataflow batch pipeline to import into BigQuery, push errors to a dead-letter table."
    ],
    "correct": 3,
    "explanation": "Run a Cloud Dataflow batch pipeline to import into BigQuery, push errors to a dead-le This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "Radhika7983",
        "text": "The answer is D. An ETL pipeline will be implemented for this scenario. Check out handling invalid inputs in cloud data flow\nhttps://cloud.google.com/blog/products/gcp/handling-invalid-inputs-in-dataflow\nParDos . . . and don’ts: handling invalid inputs in Dataflow using Side Outputs as a “Dead Letter” file"
      },
      {
        "user": "jkhong",
        "text": "The sources you've provided cannot be accessed. Here is an updated best practice. https://cloud.google.com/architecture/building-production-ready-data-pipelines-using-dataflow-developing-and-testing#use_dead_letter_queues"
      },
      {
        "user": "rocky48",
        "text": "Option A is incorrect because federated data sources do not provide any data validation or cleaning capabilities and you'll have to do it on the SQL query, which could slow down the performance.\nOption B is incorrect because Stackdriver monitoring can only monitor the performance of the pipeline, but it can't handle corrupted or incorrectly formatted data.\nOption C is incorrect because using gcloud CLI and setting max_bad_records to 0 will ignore the corrupted or incorrectly formatted data an..."
      },
      {
        "user": "samdhimal",
        "text": "Option A is incorrect because federated data sources do not provide any data validation or cleaning capabilities and you'll have to do it on the SQL query, which could slow down the performance.\nOption B is incorrect because Stackdriver monitoring can only monitor the performance of the pipeline, but it can't handle corrupted or incorrectly formatted data.\nOption C is incorrect because using gcloud CLI and setting max_bad_records to 0 will ignore the corrupted or incorrectly formatted data an..."
      },
      {
        "user": "fire558787",
        "text": "Disagree a bit here. Could well be A. In one Coursera video course (https://www.coursera.org/learn/batch-data-pipelines-gcp/lecture/SkDus/how-to-carry-out-operations-in-bigquery), they do have a video about when to just use an SQL query to find wrong data without creating a Dataflow pipeline. The question says \"SQL\" as a language, not Cloud SQL as a service. Federated Sources is great because you can federate a CSV file in GCS with BigQuery. From the video: \"In this section, we'll take a look..."
      },
      {
        "user": "sumanshu",
        "text": "A. Use federated data sources, and check data in the SQL query. - WRONG (Because we are changing source itself, i.e. SQL, MySQL, PstgresSQL) instead of correcting the problem\nB. Enable BigQuery monitoring in Google Stackdriver and create an alert. (WRONG - Because setting and creating an alert will not solve the corrupted data problem)\nC. Import the data into BigQuery using the gcloud CLI and set max_bad_records to 0. (wrong - here we are saying set max_bad_records = 0 (i.e let's load all bad..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 266,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You are choosing a NoSQL database to handle telemetry data from millions of IoT devices. Volume is growing at 100 TB per year. No ACID needed. High availability and low latency required. Which three databases meet your requirements? (Choose three.)",
    "options": [
      "A. Redis",
      "B. HBase",
      "C. MySQL",
      "D. MongoDB",
      "E. Cassandra",
      "F. HDFS with Hive"
    ],
    "correct": [
      1,
      3,
      4
    ],
    "explanation": "HBase This automatic switching to backup resources when primary fails; ensures business continuity with minimal downtime.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "BDE. Hive is not for NoSQL"
      },
      {
        "user": "awssp12345",
        "text": "Answer is BDE -\nA. Redis - Redis is an in-memory non-relational key-value store. Redis is a great choice for implementing a highly available in-memory cache to decrease data access latency, increase throughput, and ease the load off your relational or NoSQL database and application. Since the question does not ask cache, A is discarded.\nB. HBase - Meets reqs\nC. MySQL - they do not need ACID, so not needed.\nD. MongoDB - Meets reqs\nE. Cassandra - Apache Cassandra is an open source NoSQL distrib..."
      },
      {
        "user": "hendrixlives",
        "text": "BDE:\nA. Redis is a key-value store (and in many cases used as in-memory and non persistent cache). It is not designed for \"100TB per year\" of highly available storage.\nB. HBase is similar to Google Bigtable, fits the requirements perfectly: highly available, scalable and with very low latency.\nC. MySQL is a relational DB, designed precisely for ACID transactions and not for the stated requirements. Also, growth may be an issue.\nD. MongoDB is a document-db used for high volume data and maintai..."
      },
      {
        "user": "Manue",
        "text": "Hive is not for low latency queries. It is for analytics."
      },
      {
        "user": "ch3n6",
        "text": "BDE: https://db-engines.com/en/system/Cassandra%3BHive"
      },
      {
        "user": "vholti",
        "text": "Redis is limited to 1 TB capacity quota per region. So it doesn't satisfy the requirement.\nhttps://cloud.google.com/memorystore/docs/redis/quotas"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 267,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You are training a spam classifier and notice overfitting. Which three actions can you take? (Choose three.)",
    "options": [
      "A. Get more training examples",
      "B. Reduce the number of training examples",
      "C. Use a smaller set of features",
      "D. Use a larger set of features",
      "E. Increase the regularization parameters",
      "F. Decrease the regularization parameters"
    ],
    "correct": [
      0,
      2,
      4
    ],
    "explanation": "Get more training examples This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "madhu1171",
        "text": "it should be ACE"
      },
      {
        "user": "TVH_Data_Engineer",
        "text": "To address the problem of overfitting in training a spam classifier, you should consider the following three actions:\nA. Get more training examples:\nWhy: More training examples can help the model generalize better to unseen data. A larger dataset typically reduces the chance of overfitting, as the model has more varied examples to learn from.\nC. Use a smaller set of features:\nWhy: Reducing the number of features can help prevent the model from learning noise in the data. Overfitting often occ..."
      },
      {
        "user": "JG123",
        "text": "Why there are so many wrong answers? Examtopics.com are you enjoying paid subscription by giving random answers from people?\nAns: ACE"
      },
      {
        "user": "medeis_jar",
        "text": "As MaxNRG wrote:\nThe tools to prevent overfitting: less variables, regularization, early ending on the training.\n- Adding more training data will increase the complexity of the training set and help with the variance problem.\n- Reducing the feature set will ameliorate the overfitting and help with the variance problem.\n- Increasing the regularization parameter will reduce overfitting and help with the variance problem."
      },
      {
        "user": "MaxNRG",
        "text": "ACE\nThe tools to prevent overfitting: less variables, regularization, early ending on the training…\nOverfitting means that the classifier knows too well the data and fails to generalize. We should use a smaller number of features to help the classifier generalize, and more examples so that it can have more variety.\nThe gap in errors between training and test suggests a high variance problem in which the algorithm has overfit the training set.\n- Adding more training data will increase the comp..."
      },
      {
        "user": "daghayeghi",
        "text": "ACE:\nhttps://towardsdatascience.com/deep-learning-3-more-on-cnns-handling-overfitting-2bd5d99abe5d\nhttps://cloud.google.com/bigquery-ml/docs/preventing-overfitting"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 268,
    "topic": "Security",
    "difficulty": 3,
    "question": "You are implementing security best practices on your data pipeline. Currently manually executing jobs as Project Owner. You want to automate nightly batch jobs securely. How should you run this workload?",
    "options": [
      "A. Restrict the Cloud Storage bucket so only you can see the files.",
      "B. Grant Project Owner role to a service account.",
      "C. Use a service account with ability to read batch files and write to BigQuery.",
      "D. Use a user account with Project Viewer role on Dataproc to read batch files and write to BigQuery."
    ],
    "correct": 2,
    "explanation": "Use a service account with ability to read batch files and write to BigQuery This enforces least-privilege access control and reduces unauthorized data exposure.",
    "discussion": [
      {
        "user": "digvijay",
        "text": "A is wrong, if only I can see the bucket no automation is possible, besides, also needs launch the dataproc job\nB is too much, does not follow the security best practices\nC has one point missing…you need to submit dataproc jobs.\nIn D viewer role will not be able to submit dataproc jobs, the rest is ok\nThus….the only one that would work is B! BUT this service account has too many permissions. Should have dataproc editor, write big query and read from bucket"
      },
      {
        "user": "dambilwa",
        "text": "Hence - Contextually, Option [C] looks to be the right fit"
      },
      {
        "user": "JG123",
        "text": "Why there are so many wrong answers? Examtopics.com are you enjoying paid subscription by giving random answers from people?\nAns: C"
      },
      {
        "user": "alek6dj",
        "text": "A, C and D don't mention permission for the Dataproc job. The answer is B. Also because the user is executing jobs manually as the Project Owner, if the service account is not a Project Owner too, there could be permission issues with the resources."
      },
      {
        "user": "retep007",
        "text": "C doesn't need permission to submit dataproc jobs, it's workload SA. Job can be submitted by any other identity"
      },
      {
        "user": "Rajokkiyam",
        "text": "Given Project owner role It might provide additional privileges to the ServiceAccounts liek deleting the files etc. Basic Priv needed for this type of action is to read source file and write into Bquery."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 269,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "A simple BigQuery query on country, state, city columns is running very slowly. The Read section of Stage:1 in the query plan shows the issue. What is the most likely cause?",
    "options": [
      "A. Users are running too many concurrent queries.",
      "B. The table has too many partitions.",
      "C. State or city columns have too many NULL values.",
      "D. Most rows have the same value in the country column, causing data skew."
    ],
    "correct": 3,
    "explanation": "Most rows have the same value in the country column, causing data skew This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "itche_scratche",
        "text": "D; Purple is reading, Blue is writing. so majority is reading."
      },
      {
        "user": "Paul_Oprea",
        "text": "BTW, how is the query even syntactically valid? It has non aggregated columns in the SELECT part of the query. That query will not run in the first place, unless I'm missing something."
      },
      {
        "user": "arpitagrawal",
        "text": "The query would throw the error because you're using a group by clause on country but not aggregating city or state."
      },
      {
        "user": "timolo",
        "text": "Correct is D: https://cloud.google.com/bigquery/docs/best-practices-performance-patterns\nPartition skew, sometimes called data skew, is when data is partitioned into very unequally sized partitions. This creates an imbalance in the amount of data sent between slots. You can't share partitions between slots, so if one partition is especially large, it can slow down, or even crash the slot that processes the oversized partition."
      },
      {
        "user": "cosmidumi",
        "text": "Option D - ref https://cloud.google.com/bigquery/docs/best-practices-performance-patterns#data_skew\nBest practice: If your query processes keys that are heavily skewed to a few values, filter your data as early as possible."
      },
      {
        "user": "GHN74",
        "text": "B is incorrect as the question clearly states “whenever they run the query” which means its a constant problem not adhoc. Option B is talking about a specific situation which means when (supposedly) fewer users have an active connection query should run faster but the question rules it out saying you always face performance problem.\nIn this case we have a Design issue hence option D sounds correct."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 270,
    "topic": "Architecture",
    "difficulty": 3,
    "question": "Your globally distributed auction application allows users to bid on items. You want to collate bid events in real time to determine who bid first. What should you do?",
    "options": [
      "A. Create a file on a shared file server. Process with Hadoop.",
      "B. Have each application server write bid events to Cloud Pub/Sub. Push events from Pub/Sub to Cloud SQL.",
      "C. Set up MySQL for each server. Periodically query and update a master MySQL database.",
      "D. Have each server write to Pub/Sub. Use a pull subscription with Cloud Dataflow."
    ],
    "correct": 3,
    "explanation": "Pub/Sub cannot push data directly into Cloud SQL. Dataflow natively integrates with Pub/Sub and provides event-time processing and windowing for real-time bid ordering.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "I'd go with B: real-time is requested, and the only scenario for real time (in the 4 presented) is the use of pub/sub with push."
      },
      {
        "user": "Ganshank",
        "text": "D\nThe need is to collate the messages in real-time. We need to de-dupe the messages based on timestamp of when the event occurred. This can be done by publishing ot Pub-Sub and consuming via Dataflow."
      },
      {
        "user": "[Removed]",
        "text": "i would go with option B, Cause option D states \"Give the bid for each item to the user in the bid event that is processed first\" . The requirement is to get the first bid based on event time not processed first in dataflow."
      },
      {
        "user": "StelSen",
        "text": "Both Option D & B are correct. But we don't need to store the data persistently, we just need to process it. So, I would go with Option-D. Also if I use Cloud SQL, I will have to store then I need to run query to find the first user bid, then I will have to action. Whereas in DataFlow I can simply perform these actions immediately. I know push is immediate, but Pull mechanism is not bad, we can make near real time."
      },
      {
        "user": "Bhawantha",
        "text": "This is so tricky. A and C is out since it does not give the real-time feature. The battle is between B and D.\nIf we think about the business scenario we need to give the bid to who published it first. D is given to the who processed first. Technically it can be implemented bcz DataFlow is only support pull subscription with cloud pub-sub.\nIn answer B, events are pushed to the endpoint. Explicitly they haven't mentioned that it pushes to the \"Cloud Data Flow\". It may be a custom API endpoint...."
      },
      {
        "user": "ralf_cc",
        "text": "Yep, Pub/Sub doesn't have FIFO yet, B is the one that keeps the right order"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 271,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "Your organization has been collecting BigQuery data for 6 months. The view events queries only the last 14 days in legacy SQL. Next month, applications will connect via ODBC. You need to ensure they can connect. Which two actions? (Choose two.)",
    "options": [
      "A. Create a new view over events using standard SQL",
      "B. Create a new partitioned table using a standard SQL query",
      "C. Create a new view over events_partitioned using standard SQL",
      "D. Create a service account for the ODBC connection for authentication",
      "E. Create an IAM role for the ODBC connection"
    ],
    "correct": [
      2,
      3
    ],
    "explanation": "Create a new view over events_partitioned using standard SQL This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "C = A standard SQL query cannot reference a view defined using legacy SQL syntax.\nD = For the ODBC drivers is needed a service account which will get a standard Bigquery role."
      },
      {
        "user": "JG123",
        "text": "Why there are so many wrong answers? Examtopics.com are you enjoying paid subscription by giving random answers from people?\nAns: C,D"
      },
      {
        "user": "MaxNRG",
        "text": "A standard SQL query cannot reference a view defined using legacy SQL syntax. In order to connect through ODBC connection, we need to use standard SQL. So, we need to create a new view over events_partitioned table using standard SQL which is C. Need service account to connect through ODBC which is option D. Check the links below.\nI am not sure about A whether we can create a view over another view which was built using legacy SQL\nhttps://cloud.google.com/bigquery/docs/views\nhttps://cloud.goo..."
      },
      {
        "user": "Ganshank",
        "text": "This is very confusing.\nGoogle documentation mentions that Simba ODBC driver leverages Standard SQL (https://cloud.google.com/bigquery/providers/simba-drivers), whereas Simba documentation mentions it supports both Legacy SQL and Standard SQL (https://www.simba.com/products/BigQuery/doc/ODBC_InstallGuide/win/content/odbc/bq/windows/advanced.htm).\nAlso, the Simba ODBC supports authentication using Service Account and User Account.\nDepending on how you interpret the question, any 2 amongst C,D,..."
      },
      {
        "user": "PolyMoe",
        "text": "D. Create a service account for the ODBC connection to use for authentication. This service account will be used to authenticate the ODBC connection, and will be granted specific permissions to access the BigQuery resources.\nE. Create a Cloud IAM role for the ODBC connection and shared events. This role will be used to grant permissions to the service account created in step D, and will allow the applications to access the events view in BigQuery.\nCreating a new view over events using standar..."
      },
      {
        "user": "Smaks",
        "text": "1. Create Services account from IAM & Admin\n2. Add Services account permission Roles as \"BigQuery Admin\" or any custom Role.\nOther options are not related ' to ensure the applications can connect'"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 272,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You have enabled Firebase Analytics and BigQuery integration. Tables are created daily (app_events_YYYYMMDD). You want to query all tables for the past 30 days in legacy SQL. What should you do?",
    "options": [
      "A. Use the TABLE_DATE_RANGE function",
      "B. Use the WHERE_PARTITIONTIME pseudo column",
      "C. Use WHERE date BETWEEN YYYY-MM-DD AND YYYY-MM-DD",
      "D. Use SELECT IF date >= YYYY-MM-DD AND date <= YYYY-MM-DD"
    ],
    "correct": 0,
    "explanation": "Use the TABLE_DATE_RANGE function This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "damaldon",
        "text": "A. is correct according to this link:\nhttps://cloud.google.com/bigquery/docs/reference/legacy-sql"
      },
      {
        "user": "Nirca",
        "text": "The TABLE_DATE_RANGE function in BigQuery is a table wildcard function that can be used to query a range of daily tables. It takes two arguments: a table prefix and a date range. The table prefix is the beginning of the table names, and the date range is the start and end dates of the tables to be queried.\nThe TABLE_DATE_RANGE function will expand to cover all tables in the dataset that match the table prefix and are within the date range. For example, if you have a dataset that contains dail..."
      },
      {
        "user": "mark1223jkh",
        "text": "We actually have, look at the documentation,\nhttps://cloud.google.com/bigquery/docs/reference/legacy-sql"
      },
      {
        "user": "samdhimal",
        "text": "A Is correct.\nTABLE_DATE_RANGE() : Queries multiple daily tables that span a date range."
      },
      {
        "user": "samdhimal",
        "text": "Example:\nSELECT *\nFROM TABLE_DATE_RANGE(app_events_, TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY), CURRENT_TIMESTAMP())"
      },
      {
        "user": "baimus",
        "text": "https://cloud.google.com/bigquery/docs/reference/legacy-sql#table-date-range"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 273,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "Your company is setting up data pipelines for streaming data. Engineers want to use windowing and transformation in Dataflow. However, the Dataflow job fails for all streaming inserts. What is the most likely cause?",
    "options": [
      "A. They have not assigned the timestamp.",
      "B. They have not set triggers for late data.",
      "C. They have not applied a global windowing function.",
      "D. They have not applied a non-global windowing function."
    ],
    "correct": 3,
    "explanation": "They have not applied a non-global windowing function This windowing groups streaming data into logical windows (tumbling, sliding, session) to aggregate time-series data and detect patterns.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "Answer: D\nDescription: Caution: Beam’s default windowing behavior is to assign all elements of a PCollection to a single, global window and discard late data, even for unbounded PCollections. Before you use a grouping transform such as GroupByKey on an unbounded PCollection, you must do at least one of the following:\n—->>>>>>Set a non-global windowing function. See Setting your PCollection’s windowing function.\nSet a non-default trigger. This allows the global window to emit results under oth..."
      },
      {
        "user": "jvg637",
        "text": "Global windowing is the default behavior, so I don't think C is right.\nAn error can occur if a non-global window or a non-default trigger is not set.\nI would say D.\n(https://beam.apache.org/documentation/programming-guide/#windowing)"
      },
      {
        "user": "VishalB",
        "text": "Correct Answer: D\nExplanation:-This option is correct as with unbounded (Streaming) Pub/Sub collection\nyou need to apply the non-global windowing function."
      },
      {
        "user": "itche_scratche",
        "text": "D, global is default and for batch not streaming."
      },
      {
        "user": "39405bb",
        "text": "The most likely cause of this problem is A. They have not assigned the timestamp, which causes the job to fail.\nHere's why:\nImportance of Timestamps in Windowing: Windowing in Dataflow relies on timestamps to group elements into windows. If timestamps are not explicitly assigned or extracted from the data, Dataflow cannot determine which elements belong to which windows, leading to failures in the job.\nLet's look at the other options:\nB. They have not set the triggers to accommodate the data ..."
      },
      {
        "user": "zxing233",
        "text": "Why not A? D can still work if you add a trigger"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 274,
    "topic": "Data Processing",
    "difficulty": 2,
    "question": "You architect a system to analyze seismic data. Your ETL process takes days. You discover a sensor calibration step has been omitted. How should you change your ETL process?",
    "options": [
      "A. Modify the transform MapReduce jobs to apply sensor calibration first.",
      "B. Introduce a new MapReduce job to apply sensor calibration to raw data, chain all other jobs after.",
      "C. Add calibration data to the output and document users need to apply it.",
      "D. Develop an algorithm to predict variance and apply correction to all data."
    ],
    "correct": 0,
    "explanation": "Chaining a new MapReduce job forces massive disk I/O. Modifying the existing job to calibrate in-memory first is the most performant solution.",
    "discussion": [
      {
        "user": "SteelWarrior",
        "text": "Should go with B. Two reasons, it is a cleaner approach with single job to handle the calibration before the data is used in the pipeline. Second, doing this step in later stages can be complex and maintenance of those jobs in the future will become challenging."
      },
      {
        "user": "[Removed]",
        "text": "Answer: A\nDescription: My take on this is for sensor calibration you just need to update the transform function, rather than creating a whole new mapreduce job and storing/passing the values to next job"
      },
      {
        "user": "Jphix",
        "text": "It's B. A would involving changing every single job (notice it said jobS, plural, not a single job). If that is computationally intensive, which it is, you're repeating a computationally intense process needlessly several times. SteelWarrior and YuriP are right on this one."
      },
      {
        "user": "Yiouk",
        "text": "B. different MR jobs execute in series, adding 1 more job makes sense in this case."
      },
      {
        "user": "sumanshu",
        "text": "Vote for 'B' (introduce new job) over 'A', (instead of modifying existing job)"
      },
      {
        "user": "YuriP",
        "text": "Should be B. It's a Data Quality step which has to go right after Raw Ingest. Otherwise you repeat the same step unknown (see \"job_s_\" in A) number of times, possibly for no reason, therefore extending ETL time."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 275,
    "topic": "Storage",
    "difficulty": 2,
    "question": "An online retailer has built their application on Google App Engine. They want to manage shopping transactions and analyze combined data using only a single database with SQL. Which Google Cloud database should they choose?",
    "options": [
      "A. BigQuery",
      "B. Cloud SQL",
      "C. Cloud BigTable",
      "D. Cloud Datastore"
    ],
    "correct": 1,
    "explanation": "Cloud SQL This optimizes data access patterns and minimizes egress costs.",
    "discussion": [
      {
        "user": "PolyMoe",
        "text": "B. Cloud SQL would be the most appropriate choice for the online retailer in this scenario. Cloud SQL is a fully-managed relational database service that allows for easy management and analysis of data using SQL. It is well-suited for applications built on Google App Engine and can handle the transactional workload of an e-commerce application, as well as the analytical workload of a BI tool."
      },
      {
        "user": "Aaronn14",
        "text": "A. \"They want to use only a single database for this purpose\" is a key requirement. You can use BigQuery for transactions, though it is not efficient. You can not use CloudSQL for analytics. So it is probably BQ."
      },
      {
        "user": "Siddhesh05",
        "text": "Big Query because of analysis"
      },
      {
        "user": "juliobs",
        "text": "I think BigQuery makes sense here. It works for transactions too."
      },
      {
        "user": "DipT",
        "text": "It needs support for transaction so cloud sql is the choice of database and with Bigquery we can still analyze cloud sql data via federated queries https://cloud.google.com/bigquery/docs/reference/legacy-sql"
      },
      {
        "user": "zellck",
        "text": "B is the answer.\nhttps://cloud.google.com/bigquery/docs/cloud-sql-federated-queries\nBigQuery Cloud SQL federation enables BigQuery to query data residing in Cloud SQL in real time, without copying or moving data. Query federation supports both MySQL (2nd generation) and PostgreSQL instances in Cloud SQL."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 276,
    "topic": "Architecture",
    "difficulty": 3,
    "question": "Your weather app queries a database every 15 minutes for the current temperature. How should you design the frontend to respond to a database failure?",
    "options": [
      "A. Issue a command to restart the database servers.",
      "B. Retry the query with exponential backoff, up to a cap of 15 minutes.",
      "C. Retry the query every second until it comes back online.",
      "D. Reduce the query frequency to once every hour."
    ],
    "correct": 1,
    "explanation": "Retry the query with exponential backoff, up to a cap of 15 minutes This balances scalability, cost, and performance requirements.",
    "discussion": [
      {
        "user": "Radhika7983",
        "text": "Correct answer is B. App engine create applications that use Cloud SQL database connections effectively. Below is what is written in google cloud documnetation.\nIf your application attempts to connect to the database and does not succeed, the database could be temporarily unavailable. In this case, sending too many simultaneous connection requests might waste additional database resources and increase the time needed to recover. Using exponential backoff prevents your application from sending..."
      },
      {
        "user": "llamaste",
        "text": "https://cloud.google.com/sql/docs/mysql/manage-connections#backoff"
      },
      {
        "user": "yafsong",
        "text": "Truncated exponential backoff is a standard error-handling strategy for network applications. In this approach, a client periodically retries a failed request with increasing delays between requests"
      },
      {
        "user": "Nidie",
        "text": "https://cloud.google.com/sql/docs/mysql/manage-connections"
      },
      {
        "user": "rtcpost",
        "text": "Exponential backoff is a commonly used technique to handle temporary failures, such as a database server becoming temporarily unavailable. This approach retries the query, initially with a short delay and then with increasingly longer intervals between retries. Setting a cap of 15 minutes ensures that you don't excessively burden your system with constant retries.\nOption C (retrying the query every second) can be too aggressive and may lead to excessive load on the server when it comes back o..."
      },
      {
        "user": "sumanshu",
        "text": "Vote for B.\nhttps://cloud.google.com/iot/docs/how-tos/exponential-backoff"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 277,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You have been uploading log files to separate BigQuery tables with the format LOGS_yyyymmdd. Using table wildcard functions for reports exceeds the 1,000 tables limit. How can you resolve this?",
    "options": [
      "A. Convert all daily log tables into date-partitioned tables",
      "B. Convert the sharded tables into a single partitioned table",
      "C. Enable query caching to cache data from previous months",
      "D. Create separate views to cover each month, and query from these views"
    ],
    "correct": 1,
    "explanation": "Convert the sharded tables into a single partitioned table This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "should be B\nhttps://cloud.google.com/bigquery/docs/creating-partitioned-tables#converting_date-sharded_tables_into_ingestion-time_partitioned_tables"
      },
      {
        "user": "[Removed]",
        "text": "Answer: B\nDescription: Google says that when you have multiple wildcard tables, best option is to shard it into single partitioned table. Time and cost efficient"
      },
      {
        "user": "Chelseajcole",
        "text": "you are right.\nPartitioning versus sharding\nTable sharding is the practice of storing data in multiple tables, using a naming prefix such as [PREFIX]_YYYYMMDD.\nPartitioning is recommended over table sharding, because partitioned tables perform better. With sharded tables, BigQuery must maintain a copy of the schema and metadata for each table. BigQuery might also need to verify permissions for each queried table. This practice also adds to query overhead and affects query performance.\nIf you ..."
      },
      {
        "user": "Tumri",
        "text": "https://cloud.google.com/bigquery/docs/partitioned-tables#dt_partition_shard"
      },
      {
        "user": "g2000",
        "text": "keyword is single"
      },
      {
        "user": "Rajuuu",
        "text": "The above link does mention about shard ing benefits but only about partition tables.\nA is correct."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 278,
    "topic": "Dataproc",
    "difficulty": 2,
    "question": "Your analytics team wants to run a Spark ML workload on Dataproc. Testing shows it can run in 30 minutes on a 15-node cluster. It runs weekly. How should you optimize the cluster for cost?",
    "options": [
      "A. Migrate the workload to Dataflow",
      "B. Use pre-emptible VMs for the cluster",
      "C. Use a higher-memory node",
      "D. Use SSDs on the worker nodes"
    ],
    "correct": 1,
    "explanation": "Use pre-emptible VMs for the cluster This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "B. (Hadoop/Spark jobs are run on Dataproc, and the pre-emptible machines cost 80% less)"
      },
      {
        "user": "rickywck",
        "text": "I think the answer should be B:\nhttps://cloud.google.com/dataproc/docs/concepts/compute/preemptible-vms"
      },
      {
        "user": "abi01a",
        "text": "I believe Exam Topics ought to provide brief explanation or supporting link to picked correct answers such as this one. Option A may be correct from the view point that Dataflow is a Serverless service that is fast, cost-effective and the fact that Preemptible VMs though can give large price discount may not always be available. It will be great to know the reason(s) behind Exam Topic selected option."
      },
      {
        "user": "samdhimal",
        "text": "B. Use pre-emptible virtual machines (VMs) for the cluster\nUsing pre-emptible VMs allows you to take advantage of lower-cost virtual machine instances that may be terminated by Google Cloud after a short period of time, typically after 24 hours. These instances can be a cost-effective way to handle workloads that can be interrupted, such as batch processing jobs like the one described in the question.\nOption A is not ideal, as it would require you to migrate the workload to Google Cloud Dataf..."
      },
      {
        "user": "Remi2021",
        "text": "B is teh right answer. examtopics update your answers or make your site free again."
      },
      {
        "user": "OmJanmeda",
        "text": "B is right answer.\nmy experience is not good with Examtopics, so many wrong answers."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 279,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "Your company receives both batch and stream-based event data. You want to process data using Dataflow over a predictable time period. Some data can arrive late or out of order. How should you design the pipeline?",
    "options": [
      "A. Set a single global window to capture all the data.",
      "B. Set sliding windows to capture all the lagged data.",
      "C. Use watermarks and timestamps to capture the lagged data.",
      "D. Ensure every datasource type has a timestamp, and use timestamps to define the logic."
    ],
    "correct": 2,
    "explanation": "Use watermarks and timestamps to capture the lagged data This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "samdhimal",
        "text": "C: Use watermarks and timestamps to capture the lagged data.\nWatermarks are a way to indicate that some data may still be in transit and not yet processed. By setting a watermark, you can define a time period during which Dataflow will continue to accept late or out-of-order data and incorporate it into your processing. This allows you to maintain a predictable time period for processing while still allowing for some flexibility in the arrival of data.\nTimestamps, on the other hand, are used ..."
      },
      {
        "user": "jvg637",
        "text": "We need a combination of window + watermark (timestamps) + trigger to treat the late data. So D."
      },
      {
        "user": "FrankT2L",
        "text": "delete this answer. The answer belongs to another question"
      },
      {
        "user": "safiyu",
        "text": "Answer should be C. sliding windows are meant for calculating running average and not lagging data. Watermark is best for this purpose"
      },
      {
        "user": "haroldbenites",
        "text": "Although, C appear to be better. I think that Igo for the C."
      },
      {
        "user": "saurabh1805",
        "text": "C seems to be correct one:\nhttps://cloud.google.com/dataflow/docs/concepts/streaming-pipelines#watermarks"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 280,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You have data with X and Y dimensions and you want to classify it accurately using a linear algorithm. You need to add a synthetic feature. What should its value be?",
    "options": [
      "A. X2+Y2",
      "B. X2",
      "C. Y2",
      "D. cos(X)"
    ],
    "correct": 0,
    "explanation": "X2+Y2 This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "For fitting a linear classifier when the data is in a circle use A."
      },
      {
        "user": "xs91",
        "text": "I think it's A as explai ned here https://medium.com/@sachinkun21/using-a-linear-model-to-deal-with-nonlinear-dataset-c6ed0f7f3f51"
      },
      {
        "user": "sumanshu",
        "text": "If you draw a circle, its circle equation, x^2 + y ^2\nVote for A"
      },
      {
        "user": "medeis_jar",
        "text": "The 2 variables that make a circle in http://playground.tensorflow.org are x1^2 and x2^2.\nSin(x) or cos(x) would just make horizontal stripes.\nTo do this you’d use those 2 variables, learning rate 0,3 for example, classification type, no regularization needed and any activation function will work fine."
      },
      {
        "user": "StefanoG",
        "text": "I think the right answer is B, we have 3 shades that are specular on Y axis so the classificatin for -x is the same for +x so i think that we must use the tuple(X^2 , y) to classify the value"
      },
      {
        "user": "DarkMatterOne",
        "text": "Think it's D. It gives nice linear regression around (x,y)"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 281,
    "topic": "Security",
    "difficulty": 3,
    "question": "You are integrating an internal IT application with BigQuery. You do not want individual users to authenticate to BigQuery. You need to securely access BigQuery from your IT application. What should you do?",
    "options": [
      "A. Create groups for users and give those groups access.",
      "B. Integrate with SSO and pass each user's credentials.",
      "C. Create a service account and grant dataset access to that account. Use the service account's private key.",
      "D. Create a dummy user and store credentials in a file on the filesystem."
    ],
    "correct": 2,
    "explanation": "Create a service account and grant dataset access to that account This enforces least-privilege access control and reduces unauthorized data exposure.",
    "discussion": [
      {
        "user": "samdhimal",
        "text": "C. Create a service account and grant dataset access to that account. Use the service account's private key to access the dataset.\nCreating a service account and granting dataset access to that account is the most secure way to access BigQuery from an IT application. Service accounts are designed for use in automated systems and do not require user interaction, eliminating the need for individual users to authenticate to BigQuery. Additionally, by using the private key of the service account ..."
      },
      {
        "user": "samdhimal",
        "text": "Option A: Create groups for your users and give those groups access to the dataset, is not the best option because it still requires users to authenticate to BigQuery\nOption B: Integrate with a single sign-on (SSO) platform, and pass each user's credentials along with the query request is not the best option because it still requires users to authenticate to BigQuery.\nOption D: Create a dummy user and grant dataset access to that user. Store the username and password for that user in a file o..."
      },
      {
        "user": "ave4000",
        "text": "Granting access to the app through a service account would mean all of the users that access the app have access to the BQ. Question was to filter it out, so I believe each user would have to be added to a group that does or doesn't have access to the dataset."
      },
      {
        "user": "kavs",
        "text": "Yes A seems to be right"
      },
      {
        "user": "daghayeghi",
        "text": "C:\nIt says \"do not want individual users to authenticate to BigQuery and you do not want to give them access to the dataset\", then C is the best choice."
      },
      {
        "user": "kavs",
        "text": "It says individually don't want to authorise service account could be right too"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 282,
    "topic": "Data Processing",
    "difficulty": 2,
    "question": "You are building a data pipeline on Google Cloud. You need to prepare data for ML, supporting logistic regression. You need to monitor and adjust for null values that must remain real-valued. What should you do?",
    "options": [
      "A. Use Cloud Dataprep to find null values. Convert nulls to 'none' using Cloud Dataproc.",
      "B. Use Cloud Dataprep to find null values. Convert nulls to 0 using Cloud Dataprep.",
      "C. Use Cloud Dataflow to find null values. Convert nulls to 'none' using Dataprep.",
      "D. Use Cloud Dataflow to find null values. Convert nulls to 0 using a custom script."
    ],
    "correct": 1,
    "explanation": "Use Cloud Dataprep to find null values. Convert nulls to 0 using Cloud Dataprep This enables efficient transformation at scale with automatic resource management.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "real-valued can not be null N/A or empty, have to be “0”, so it has to be B."
      },
      {
        "user": "Snobid",
        "text": "Instead of having to write the custom script from scratch (option D), dataprep already has preconfigured tools for your use to perform the necessary data wrangling. As mentioned by jvg637, real-values have to be \"0\". Considering both points above, answer should be 'B'"
      },
      {
        "user": "dg63",
        "text": "Key phrases are \"casual method\", \"need to replace null with real values\", \"logistic regression\". Logistic regression works on numbers. Null need to be replaced with a number. And Cloud dataprep is best casual tool out of given options.\nAnswer should be \"B\" -"
      },
      {
        "user": "Tanmoyk",
        "text": "Casual approach Dataprep ...and convert null value to numerical value to 0 ...answer B"
      },
      {
        "user": "NamitSehgal",
        "text": "Should be B\nDataPrep runs a dataflow job at background."
      },
      {
        "user": "AzureDP900",
        "text": "Answer is Use Cloud Dataprep to find null values in sample source data. Convert all nulls to 0 using a Cloud Dataprep job.\nKey phrases are \"casual method\", \"need to replace null with real values\", \"logistic regression\". Logistic regression works on numbers. Null need to be replaced with a number. And Cloud dataprep is best casual tool out of given options."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 283,
    "topic": "Security",
    "difficulty": 3,
    "question": "You set up streaming data insert into a Redis cluster via Kafka on Compute Engine. You need to encrypt data at rest with keys you can create, rotate, and destroy. What should you do?",
    "options": [
      "A. Create a dedicated service account and use encryption at rest.",
      "B. Create encryption keys in Cloud KMS. Use those keys to encrypt data in all Compute Engine instances.",
      "C. Create encryption keys locally. Upload to Cloud KMS. Use those keys to encrypt.",
      "D. Create encryption keys in Cloud KMS. Reference those keys in API service calls."
    ],
    "correct": 1,
    "explanation": "Create encryption keys in Cloud KMS This IaaS offering with granular control over instances, custom machine types, and preemptible VMs for cost optimization.",
    "discussion": [
      {
        "user": "SonuKhan1",
        "text": "Dear Admin, almost every answer is incorrect . Please check the comments and update your website."
      },
      {
        "user": "MaxNRG",
        "text": "A makes no sense, you need to use your own keys.\nYou don’t create keys locally and upload them, you should import it to make it work..using the kms public key…not just “uploading” it. C is also out.\nIT’s between B and D\nCloud KMS is a cloud-hosted key management service that lets you manage cryptographic keys for your cloud services the same way you do on-premises, You can generate, use, rotate, and destroy cryptographic keys from there.\nSince you want to encrypt data at rest, is B, you don’t..."
      },
      {
        "user": "AJKumar",
        "text": "Question says - need to encrypt data at rest with encryption keys that you can create, rotate, and destroy as needed means local keys. Option C is correct."
      },
      {
        "user": "Ganshank",
        "text": "B.\nhttps://cloud.google.com/compute/docs/disks/customer-managed-encryption"
      },
      {
        "user": "[Removed]",
        "text": "https://cloud.google.com/security/encryption-at-rest/"
      },
      {
        "user": "tprashanth",
        "text": "Based on the info at the link you referred, it seems C is the right answer"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 284,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You are developing a recommendation engine. You need to generate labels for entities in videos and provide very fast filtering based on customer preferences on several TB of data. What should you do?",
    "options": [
      "A. Build and train a complex classification model with Spark MLlib. Deploy using Dataproc.",
      "B. Build and train two classification models with Spark MLlib. Deploy using Dataproc.",
      "C. Build an application that calls the Cloud Video Intelligence API. Store data in Cloud Bigtable.",
      "D. Build an application that calls the Cloud Video Intelligence API. Store data in Cloud SQL."
    ],
    "correct": 2,
    "explanation": "Build an application that calls the Cloud Video Intelligence API This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "Answer: C\nA & B - Need to build your own model, so discarded as options C D can do the job here using Cloud Video Intelligence API. BigTable is better option. So C is correct"
      },
      {
        "user": "Alasmindas",
        "text": "Option C is the correct answer.\n1. Rather than building a new model - it is better to use Google provide APIs, here - Google Video Intelligence.\nSo option A and B rules out\n2) Between SQL and Bigtable - Bigtable is the better option as Bigtable support row-key filtering. Joining the filters is not required."
      },
      {
        "user": "daghayeghi",
        "text": "answer C:\nIf we presume that use label of video as a rowkey, Bigtable will be the best option. because it can store several TB, but Cloud SQL is limited to 30TB."
      },
      {
        "user": "Ganshank",
        "text": "C.\nThe recommendation requires filtering based on several TB of data, therefore BigTable is the recommended option vs Cloud SQL which is limited to 10TB."
      },
      {
        "user": "Surjit24",
        "text": "There are no joins but filtering based on condition."
      },
      {
        "user": "tprashanth",
        "text": "Yes, if its part of the rowkey"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 285,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You are selecting services to write and transform JSON messages from Pub/Sub to BigQuery. You want to minimize costs and accommodate varying input data volume with minimal manual intervention. What should you do?",
    "options": [
      "A. Use Cloud Dataproc. Monitor CPU utilization. Resize the number of workers.",
      "B. Use Cloud Dataproc. Use the diagnose command.",
      "C. Use Cloud Dataflow. Monitor system lag with Stackdriver. Use default autoscaling.",
      "D. Use Cloud Dataflow. Monitor total execution time. Configure non-default machine types."
    ],
    "correct": 2,
    "explanation": "Use Cloud Dataflow. Monitor system lag with Stackdriver. Use default autoscaling This Google's managed pub/sub messaging service enabling asynchronous communication with built-in ordering guarantees and at-least-once delivery semantics.",
    "discussion": [
      {
        "user": "madhu1171",
        "text": "Answer should be C"
      },
      {
        "user": "odacir",
        "text": "@admin why all the answers are wrong. I paid 30 euros for this web and its garbage.\nDataproc has no sense in this scenario, because you want to have minimal intervention/operation. D is not a good practice, the answer is C."
      },
      {
        "user": "VishalB",
        "text": "Correct Answer: C\nExplanation:-This option is correct as Dataflow, provides a cost-effective solution to perform transformations on the streaming data, with autoscaling provides scaling without any intervention. System lag with\nStackdriver provides monitoring for the streaming data. With autoscaling enabled, the Cloud Dataflow service automatically chooses the appropriate number of worker instances required to run your job."
      },
      {
        "user": "zellck",
        "text": "you need to look at community vote distribution and comments, and not the suggested answer."
      },
      {
        "user": "MaxNRG",
        "text": "C.\nDataproc does not seem to be a good solution in this case as it always require a manual intervention to adjust resources.\nAutoscaling with dataflow will automatically handle changing data volumes with no manual intervention, and monitoring through Stackdriver can be used to spot bottleneck. Total execution time is not good there as it does not provide a precise view on potential bottleneck."
      },
      {
        "user": "medeis_jar",
        "text": "C only as referred by MaxNRG"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 286,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "You need to send YouTube channel data to Google Cloud for ANSI SQL analysis worldwide. How should you set up the transfer?",
    "options": [
      "A. Use Storage Transfer Service to a Multi-Regional storage bucket.",
      "B. Use Storage Transfer Service to a Regional bucket.",
      "C. Use BigQuery Data Transfer Service to a Multi-Regional storage bucket.",
      "D. Use BigQuery Data Transfer Service to a Regional storage bucket."
    ],
    "correct": 2,
    "explanation": "Use BigQuery Data Transfer Service to a Multi-Regional storage bucket This ensures data integrity and compliance during transfer.",
    "discussion": [
      {
        "user": "VishalB",
        "text": "Correct Answer: A\nDestination is GCS and having multi-regional so A is the best option available.\nEven since BigQuery Data Transfer Service initially supports Google application sources like Google Ads, Campaign Manager, Google Ad Manager and YouTube but it does not support destination anything other than bq data set"
      },
      {
        "user": "triipinbee",
        "text": "all the option clearly says \"storage bucket\", once you master that, you'll realize the correct option is A"
      },
      {
        "user": "Ganshank",
        "text": "None of the answers make any sense.\nBigQuery Transfer Service is for moving data from various sources (S3, Youtube etc) into BigQuery, not Google Cloud Storage.\nFurther, how are we supposed to use SQL to query data if it is stored in Cloud Storage?"
      },
      {
        "user": "asksathvik",
        "text": "Kindly re-read the question,the question says Google Cloud not Cloud storage...once you master that you will understand the whole question and be able to pick the right answer which is C"
      },
      {
        "user": "tainangao",
        "text": "Currently, you cannot use the BigQuery Data Transfer Service to transfer data out of BigQuery.\nhttps://cloud.google.com/bigquery-transfer/docs/introduction"
      },
      {
        "user": "TNT87",
        "text": "Kindly re-read the question,the question says Google Cloud not Cloud storage...once you master that you will understand the whole question and be able to pick the right answer which is C"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 287,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You are creating a model to predict housing prices on a single resource-constrained VM. Which learning algorithm should you use?",
    "options": [
      "A. Linear regression",
      "B. Logistic classification",
      "C. Recurrent neural network",
      "D. Feedforward neural network"
    ],
    "correct": 0,
    "explanation": "Linear regression This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "Radhika7983",
        "text": "Correct answer is A. A tip here to decide when a liner regression should be used or logistics regression needs to be used. If you are forecasting that is the values in the column that you are predicting is numeric, it is always liner regression. If you are classifying, that is buy or no buy, yes or no, you will be using logistics regression."
      },
      {
        "user": "muzammilnxs",
        "text": "Neural Networks(Feed Forward or Recurrent) require resource intensive machines(i.e GPU's) whereas Linear regression can be done on ordinary CPU's"
      },
      {
        "user": "Anirkent",
        "text": "Liner Regression is correct but this is one aspect of the question, how does it relates to resource constrained machines? or that could be just a distraction?"
      },
      {
        "user": "samdhimal",
        "text": "correct answer -> Linear Regression\nLinear regression is a statistical method that allows to summarize and study relationships between two continuous (quantitative) variables: One variable, denoted X, is regarded as the independent variable. The other variable denoted y is regarded as the dependent variable. Linear regression uses one independent variable X to explain or predict the outcome of the dependent variable y.\nWhenever you are told to predict some future value of a process which is c..."
      },
      {
        "user": "saurabh1805",
        "text": "Correct Answer is A, refer below link for more information."
      },
      {
        "user": "rtcpost",
        "text": "Linear regression is a simple and resource-efficient algorithm for predicting continuous values like housing prices. It's computationally lightweight and well-suited for single machines with limited resources. It doesn't require the extensive computational power or specialized hardware that more complex algorithms like neural networks (options C and D) might need.\nOption B (Logistic classification) is used for binary classification tasks, not for predicting continuous values like housing pric..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 288,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are designing storage for very large text files for a data pipeline. You want to support ANSI SQL queries and compression and parallel load. What should you do?",
    "options": [
      "A. Transform text files to compressed Avro using Dataflow. Use BigQuery for storage and query.",
      "B. Transform text files to compressed Avro using Dataflow. Use Cloud Storage and BigQuery permanent linked tables.",
      "C. Compress text files to gzip. Use BigQuery for storage and query.",
      "D. Compress text files to gzip. Use Cloud Storage, import into Bigtable for query."
    ],
    "correct": 0,
    "explanation": "Transform text files to compressed Avro using Dataflow This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "Ganshank",
        "text": "B.\nThe question is focused on designing storage for very large files, with support for compression, ANSI SQL queries, and parallel loading from the input locations. This can be met using GCS for storage and Bigquery permanent tables with external data source in GCS."
      },
      {
        "user": "atnafu2020",
        "text": "A seems correct for me"
      },
      {
        "user": "atnafu2020",
        "text": "why GCS as external since Bigquery can be used as storage as well?"
      },
      {
        "user": "tavva_prudhvi",
        "text": "Not A : Importing data into BigQuery may take more time compared to creating external tables on data. Additional storage costs by BigQuery is another issue which can be more expensive than Google Storage."
      },
      {
        "user": "forepick",
        "text": "Answer is B.\nThe requirements are:\n- storage for compressed text files\n- parallel loads to SQL tool\nAVRO is a compressed format for text files, which makes it possible to load chunks of a very large file in parallel to BigQuery.\ngzip files are seamless in GCS though, but cannot load in parallel to BQ."
      },
      {
        "user": "Chelseajcole",
        "text": "Should be A since there is no advantage using cloud storage vs Bigquery from a costing perspective. Other than that, only concern is are we able to load Avro directly to BigQuery, I think the answer is yes.\nStreaming Avro records into BigQuery using Dataflow\nhttps://cloud.google.com/architecture/streaming-avro-records-into-bigquery-using-dataflow"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 289,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You are developing an application that automatically generates subject labels for blog posts. You are under competitive pressure and have no ML experience. What should you do?",
    "options": [
      "A. Call the Cloud Natural Language API. Process the generated Entity Analysis as labels.",
      "B. Call the Cloud Natural Language API. Process the generated Sentiment Analysis as labels.",
      "C. Build and train a text classification model using TensorFlow. Deploy using ML Engine.",
      "D. Build and train a text classification model using TensorFlow. Deploy on GKE."
    ],
    "correct": 0,
    "explanation": "Call the Cloud Natural Language API. Process the generated Entity Analysis as labels This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "VishalB",
        "text": "Correct Answer : A\nEntity analysis -> Identify entities within documents receipts, invoices, and contracts and label them by types such as date, person, contact information, organization, location, events, products, and media.\nSentiment analysis -> Understand the overall opinion, feeling, or attitude sentiment expressed in a block of text.\n-- Avoid Custom models"
      },
      {
        "user": "Az900Exam2021",
        "text": "For the first time, the answer in exam topics matches community vote :-)."
      },
      {
        "user": "AmmarFasih",
        "text": "Of course the answer is A. Since the problem already states that you don't have time, resources or expertise. So the best solution in the case is to utilize the available API. Also since we need to extract the labels and not the sentiment of the text, we'll go for option A and not B"
      },
      {
        "user": "NicolasN",
        "text": "Apparently, there is unanimity on answer [A]\nE. Call the Cloud Natural Language API from your application. Process the generated Content Classification as labels\nWhat would you choose, A or E?\nMy opinion is that Content Classification is more suitable for detecting subject."
      },
      {
        "user": "AzureDP900",
        "text": "https://cloud.google.com/natural-language/docs/analyzing-entities\nhttps://cloud.google.com/natural-language/docs/analyzing-sentiment"
      },
      {
        "user": "Ratikl",
        "text": "Call the Cloud Natural Language API from your application. Process the generated Entities Analysis as labels.\nThe Cloud Natural Language API is a pre-trained machine learning model that can be used for natural language processing tasks such as entity recognition, sentiment analysis, and syntax analysis. The API can be called from your application using a simple API call, and it can generate entities analysis that can be used as labels for the user's blog posts. This would be the quickest and ..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 290,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You are designing storage for 20 TB of text files in CSV format. You want to minimize the cost of querying aggregate values for multiple users. Which storage service and schema design should you use?",
    "options": [
      "A. Use Cloud Bigtable. Install HBase shell on Compute Engine.",
      "B. Use Cloud Bigtable. Link as permanent tables in BigQuery.",
      "C. Use Cloud Storage. Link as permanent tables in BigQuery.",
      "D. Use Cloud Storage. Link as temporary tables in BigQuery."
    ],
    "correct": 2,
    "explanation": "Use Cloud Storage. Link as permanent tables in BigQuery This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "daghayeghi",
        "text": "answer C:\nBigQuery can access data in external sources, known as federated sources. Instead of first\nloading data into BigQuery, you can create a reference to an external source. External\nsources can be Cloud Bigtable, Cloud Storage, and Google Drive.\nWhen accessing external data, you can create either permanent or temporary external\ntables. Permanent tables are those that are created in a dataset and linked to an external\nsource. Dataset-level access controls can be applied to these tables. ..."
      },
      {
        "user": "Rajokkiyam",
        "text": "A and B ruled out because Users would like to run Aggregate query on the data.\nTo Minimize the cost, its best to create the table as permanent table that can make use of caching feature. External(Federated) table add's additional cost and performance issue while running analytics query. So C."
      },
      {
        "user": "rivua",
        "text": "The 'correct' answers on this platform are ridiculous"
      },
      {
        "user": "MaxNRG",
        "text": "Not A or B\nBig table is expensive, que initial data is in csv format, besides, if others are going to query data with multiple engines… GCS is the storage. Between c and D is all about permanent or temorary.\nPermanent table is a table that is created in a dataset and is linked to your external data source. Because the table is permanent, you can use dataset-level access controls to share the table with others who also have access to the underlying external data source, and you can query the t..."
      },
      {
        "user": "tprashanth",
        "text": "The limit is for loading data into BQ, not to query. So I would go with C."
      },
      {
        "user": "gcp_learner",
        "text": "Interesting options. For me, A & B ruled out because BigTable doesn’t fit this use case, leaves us with C & D. C will incur additional cost of storing data in GCS & BigQuery because it mentions linking.\nSo I would go with D ie store the data in GCS and create external tables in BigQuery."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 291,
    "topic": "Spanner",
    "difficulty": 2,
    "question": "You are designing storage for two relational tables that are part of a 10-TB database. You want transactions that scale horizontally and to optimize for range queries on non-key columns. What should you do?",
    "options": [
      "A. Use Cloud SQL. Add secondary indexes.",
      "B. Use Cloud SQL. Use Dataflow to transform data.",
      "C. Use Cloud Spanner. Add secondary indexes.",
      "D. Use Cloud Spanner. Use Dataflow to transform data."
    ],
    "correct": 2,
    "explanation": "Use Cloud Spanner. Add secondary indexes This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "sumanshu",
        "text": "A is not correct because Cloud SQL does not natively scale horizontally.\nB is not correct because Cloud SQL does not natively scale horizontally.\nC is correct because Cloud Spanner scales horizontally, and you can create secondary indexes for the range queries that are required.\nD is not correct because Dataflow is a data pipelining tool to move and transform data, but the use case is centered around querying."
      },
      {
        "user": "samdhimal",
        "text": "C. Use Cloud Spanner for storage. Add secondary indexes to support query patterns.\nCloud Spanner is a fully-managed, horizontally scalable relational database service that supports transactions and allows you to optimize data for range queries on non-key columns. By using Cloud Spanner for storage, you can ensure that your database can scale horizontally to meet the needs of your application.\nTo optimize data for range queries on non-key columns, you can add secondary indexes, this will allow..."
      },
      {
        "user": "PolyMoe",
        "text": "Cloud Spanner is a fully-managed, horizontally scalable relational database service that supports transactions and allows you to optimize data for range queries on non-key columns. By using Cloud Spanner for storage, you can ensure that your database can scale horizontally to meet the needs of your application.\nTo optimize data for range queries on non-key columns, you can add secondary indexes, this will allow you to perform range scans on non-key columns, which can improve the performance o..."
      },
      {
        "user": "samdhimal",
        "text": "- Option A, Using Cloud SQL for storage and adding secondary indexes to support query patterns, may not be the best option as Cloud SQL is a relational database service that does not support horizontal scaling and may not be able to handle the large amount of data and the number of queries required by your application."
      },
      {
        "user": "samdhimal",
        "text": "- Option B, Using Cloud SQL for storage and using Cloud Dataflow to transform data to support query patterns, may not be the best option as Cloud SQL is a relational database service that does not support horizontal scaling and may not be able to handle the large amount of data and the number of queries required by your application. Additionally, Cloud Dataflow is a data processing service and not a storage service, so it may not be the best fit for this use case.\n- Option D, Using Cloud Span..."
      },
      {
        "user": "Mathew106",
        "text": "Cloud SQL does support replicas to increase availability. Why is that not considered horizontal scaling?"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 292,
    "topic": "Bigtable",
    "difficulty": 2,
    "question": "Your financial services company wants to store 50 TB of financial time-series data in the cloud with frequent updates and streaming. They also want to move Hadoop jobs to the cloud. Which product should they use to store the data?",
    "options": [
      "A. Cloud Bigtable",
      "B. Google BigQuery",
      "C. Google Cloud Storage",
      "D. Google Cloud Datastore"
    ],
    "correct": 0,
    "explanation": "Cloud Bigtable This enables fast access patterns with proper row key design.",
    "discussion": [
      {
        "user": "zellck",
        "text": "A is the answer.\nhttps://cloud.google.com/dataproc/docs/concepts/connectors/cloud-bigtable\nBigtable is Google's NoSQL Big Data database service. It's the same database that powers many core Google services, including Search, Analytics, Maps, and Gmail. Bigtable is designed to handle massive workloads at consistent low latency and high throughput, so it's a great choice for both operational and analytical applications, including IoT, user analytics, and financial data analysis.\nBigtable is an ..."
      },
      {
        "user": "cloudmon",
        "text": "On 2nd thought, it’s Bigtable: https://cloud.google.com/dataproc/docs/concepts/connectors/cloud-bigtable"
      },
      {
        "user": "philli1011",
        "text": "Every time you hear financial, time series, fast reads and write data, Any of that combinations, think Big Table first.\nSo A."
      },
      {
        "user": "AWSandeep",
        "text": "A. Cloud Bigtable"
      },
      {
        "user": "YorelNation",
        "text": "A but not sure about the existing hadoop jobs"
      },
      {
        "user": "Yazar97",
        "text": "Time series data = Bigtable... So it's A"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 293,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "An organization maintains a BigQuery dataset with user-level data. They want to expose aggregates to other projects while controlling access and ensuring analysis cost is assigned to those projects. What should they do?",
    "options": [
      "A. Create and share an authorized view that provides aggregate results.",
      "B. Create and share a new dataset and view.",
      "C. Create and share a new dataset and table with aggregate results.",
      "D. Create dataViewer IAM roles on the dataset."
    ],
    "correct": 0,
    "explanation": "Create and share an authorized view that provides aggregate results This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "midgoo",
        "text": "A is the answer. Don't be confused by the documentation saying \"Authorized views should be created in a different dataset\". It is a best practice but not a technical requirement. And we don't create a new dataset for each authorized view. If you are not clear on this, try in the system, don't just read the documentation without understanding.\nB is wrong when saying we must SHARE Dataset. Although creating a dataset and view in it will not incur extra cost, but sharing dataset is something we ..."
      },
      {
        "user": "zellck",
        "text": "B is the answer.\nhttps://cloud.google.com/bigquery/docs/share-access-views#create_a_dataset_where_you_can_store_your_view\nAfter creating your source dataset, you create a new, separate dataset to store the authorized view that you share with your data analysts. In a later step, you grant the authorized view access to the data in the source dataset. Your data analysts then have access to the authorized view, but not direct access to the source data.\nAuthorized views should be created in a diff..."
      },
      {
        "user": "Gudwin",
        "text": "That's ambiguous. While A is correct, B is the recommended approach:\n\"Authorized views should be created in a different dataset from the source data. That way, data owners can give users access to the authorized view without simultaneously granting access to the underlying data. The source data dataset and authorized view dataset must be in the same regional location.\"\nBit it doesn't say \"authorised view\" in B."
      },
      {
        "user": "Mathew106",
        "text": "Did you even read the answer in the SO link you shared?\nPart of the answer is below:\n\"\"\"After a deeper investigation and some test scenarios, I have confirmed that the billing charges related to the query jobs are applied to the Billing account associated to the project that executes the query; however, the view owner keeps getting the charges related to the storage of the source data.\"\"\"\nSoo, if you create an authorized view, the users from the other project that has access to the view will ..."
      },
      {
        "user": "Yiouk",
        "text": "Have to consider where the billing goes to:\nhttps://stackoverflow.com/questions/52201034/bigquery-authorized-view-cost-billing-account\nhence anwer is B"
      },
      {
        "user": "MrMone",
        "text": "\"they need to minimize their overall storage cost\". Also, you are sharing the aggregate's results, not the underlying table"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 294,
    "topic": "Security",
    "difficulty": 3,
    "question": "Government regulations mandate you maintain an auditable record of access to certain data. Where should you store this mandated data?",
    "options": [
      "A. Encrypted on Cloud Storage with user-supplied keys.",
      "B. In a BigQuery dataset viewable only by authorized personnel, with Data Access log for auditability.",
      "C. In Cloud SQL with separate database users. Admin activity logs for auditability.",
      "D. In a Cloud Storage bucket accessible only by an AppEngine service that logs access."
    ],
    "correct": 1,
    "explanation": "In a BigQuery dataset viewable only by authorized personnel, with Data Access log for This meeting regulatory requirements like HIPAA, GDPR, PCI-DSS through security controls, audit logging, and data residency.",
    "discussion": [
      {
        "user": "Mitra123",
        "text": "Keywords here are\n1. \"Archived\": Immutable and hence, BQ and Cloud SQL are ruled out\n2. \"Auditable\": Means track any changes done.\nOnly D can provide the audibility piece!\nI will go with D"
      },
      {
        "user": "[Removed]",
        "text": "Answer: B\nDescription: Bigquery is used to analyse access logs, data access logs capture the details of the user that accessed the data"
      },
      {
        "user": "awssp12345",
        "text": "The question has no mention of ANALYZE.. BQ is not correct. I would go with D."
      },
      {
        "user": "Jarek7",
        "text": "I have no idea why so many upvotes on this answer:\n1) archived doesn't mean immutable and cloud storage is not immutable too.\n2) auditable means viewable for authorized personel - and in this case not changes need to be monitored but any access.\n3) with option D it is easy to go around logging - you can add another access to the bucket read the data remove the access and no one will ever know that you accessed the data.\n4) option D is much more difficult - you need to application on AppEngine..."
      },
      {
        "user": "Jarek7",
        "text": "If you are going for option D, why do you eliminate option B? The only REAL difference is that for opption D you need to develop an app for storing log data and providing bucket link and in option B you have it all done BETTER by GCP. You might also pay a bit more for BQ storage, but the question never mentions about cost optimization.\nBTW in the D option the bucket is accessible only by AppEngine service, so what will the user do with the provided link? he has no access anyway... And if he e..."
      },
      {
        "user": "Jambalaja",
        "text": "The questions says:\n1. You need to \"maintain an auditable record of access to certain types of data\" => you need to be able to access and audit that data\n2. \"Assuming that all expiring logs will be archived correctly\" => means that all expired logs are \"already\" being archived correctly (e.g. in Google Cloud Storage).\n3. \"where should you store data that is subject to that mandate?\" => where do you store the data **that you can audit to answer the question regarding data access logs (who acce..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 295,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "Your neural network model takes days to train. You want to increase training speed. What can you do?",
    "options": [
      "A. Subsample your test dataset.",
      "B. Subsample your training dataset.",
      "C. Increase the number of input features.",
      "D. Increase the number of layers."
    ],
    "correct": 1,
    "explanation": "Subsample your training dataset This ensures better model generalization and prevents overfitting on unseen data.",
    "discussion": [
      {
        "user": "mantwosmart",
        "text": "Answer: B. Subsample your training dataset.\nSubsampling your training dataset can help increase the training speed of your neural network model. By reducing the size of your training dataset, you can speed up the process of updating the weights in your neural network. This can help you quickly test and iterate your model to improve its accuracy.\nSubsampling your test dataset, on the other hand, can lead to inaccurate evaluation of your model's performance and may result in overfitting. It is ..."
      },
      {
        "user": "slade_wilson",
        "text": "By SubSampling the training data, you will reduce the training time.\nIn case of D, if you increase the number of layers, then the model's accuracy will be increased. But it will not reduce the time required to train the model."
      },
      {
        "user": "pluiedust",
        "text": "It is B. D would improve the accuracy, not speed."
      },
      {
        "user": "jkhong",
        "text": "Increasing D will increase training time"
      },
      {
        "user": "juliobs",
        "text": "Reduce training time and probably accuracy too."
      },
      {
        "user": "samdhimal",
        "text": "B. Subsampling your training dataset can decrease the amount of data the model needs to process and can speed up training time. However, it can lead to decrease in the model's accuracy.\nAlthough it shouldn't matter since we are not even in testing phase yet and we aren't looking for accuracy."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 296,
    "topic": "Data Processing",
    "difficulty": 2,
    "question": "You are writing ETL pipelines to run on Apache Hadoop. The pipeline requires checkpointing and splitting. Which method should you use?",
    "options": [
      "A. PigLatin using Pig",
      "B. HiveQL using Hive",
      "C. Java using MapReduce",
      "D. Python using MapReduce"
    ],
    "correct": 2,
    "explanation": "Java using MapReduce provides low-level API control for custom data splitting (InputSplits) and explicit checkpointing, which higher-level abstractions like Pig don't support.",
    "discussion": [
      {
        "user": "IsaB",
        "text": "Is this really a question that could appear in Google Cloud Professional Data Engineer Exam? What does it have to do with Google Cloud? I would use DataProc no?"
      },
      {
        "user": "dg63",
        "text": "A, C and D - all are valid answers. You can do checkpointing, splitting pipelines and merging pipelines with all three options."
      },
      {
        "user": "musumusu",
        "text": "This answer depends which language you are comfortable with.\nHadoop is your framework, where mapReduce is your Native programming model in JAVA, which is designed to scale, parallel processing, restart pipeline from any checkpoint etc. , So if you are comfortable with JAVA, you can customize your checkpoint at lowlevel in better way. otherwise, choose PIG which is another programming concept run over JAVA but then you need to learn this also, if not choose python as it can be deployed with ha..."
      },
      {
        "user": "samdhimal",
        "text": "C. Java using MapReduce or D. Python using MapReduce\nApache Hadoop is a distributed computing framework that allows you to process large datasets using the MapReduce programming model. There are several options for writing ETL pipelines to run on a Hadoop cluster, but the most common are using Java or Python with the MapReduce programming model."
      },
      {
        "user": "samdhimal",
        "text": "A. PigLatin using Pig is a high-level data flow language that is used to create ETL pipelines. Pig is built on top of Hadoop, and it allows you to write scripts in PigLatin, a SQL-like language that is used to process data in Hadoop. Pig is a simpler option than MapReduce but it lacks some capabilities like the control over low-level data manipulation operations.\nB. HiveQL using Hive is a SQL-like language for querying and managing large datasets stored in Hadoop's distributed file system. Hi..."
      },
      {
        "user": "maddy5835",
        "text": "Pig is just a scripting language, how pig can be used in creation of pipelines, should be answer from c & D"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 297,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "Your company maintains a hybrid deployment with GCP. Daily transfers take too long. You want to maximize transfer speeds. Which action should you take?",
    "options": [
      "A. Increase the CPU size on your server.",
      "B. Increase the size of the Persistent Disk on your server.",
      "C. Increase your network bandwidth from your datacenter to GCP.",
      "D. Increase your network bandwidth from Compute Engine to Cloud Storage."
    ],
    "correct": 2,
    "explanation": "Increase your network bandwidth from your datacenter to GCP This ensures data integrity and compliance during transfer.",
    "discussion": [
      {
        "user": "Jarek7",
        "text": "Please stop using GPT as knowledge source. v3.5 is usually wrong even in simple cases. v4 is much better, but it is not designed to be knowledge source. Looking at the answer you must have used v3.5. The question says nothing about cost-effectivness. The issue is data transfer. No any data processing is done on the data while it is transferred. Simple transfer doesn't need much processing power - the real bottleneck even on slowest machines available on GCP must be data transfer - it is obvio..."
      },
      {
        "user": "snamburi3",
        "text": "I am going with C as I found a doc: https://cloud.google.com/solutions/migration-to-google-cloud-transferring-your-large-datasets#increasing_network_bandwidth. still a confusing question..."
      },
      {
        "user": "Kiroo",
        "text": "To be honest this question is incomplete, I would go increasing the bandwidth, but first I would analyze why it’s taking long time maybe I’m uploading many files so I could compress and agregate then and upload just one, maybe the target cpu is overloaded at the time of the upload, maybe the target disk reaching the max iops,"
      },
      {
        "user": "samdhimal",
        "text": "C. Increase your network bandwidth from your datacenter to GCP.\nThis will likely have the most impact on transfer speeds as it addresses the bottleneck in the transfer between your data center and GCP. Increasing the CPU size or the size of the Google Persistent Disk on the server may help with processing the data once it has been transferred, but will not address the bottleneck in the transfer itself. Increasing the network bandwidth from Compute Engine to Cloud Storage would also help with ..."
      },
      {
        "user": "rr4444",
        "text": "\"The data are imported to Cloud Storage from your data center through parallel uploads to a data transfer server running on GCP. \"\nThis makes zero sense. Is it to GCS or GCE? Question had to make up its mind. Nonsense, literally."
      },
      {
        "user": "sumanshu",
        "text": "Vote for 'C'\nYou want to maximize transfer speeds."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 298,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are building a real-time data warehouse using BigQuery streaming inserts. You have a unique ID and event timestamp. You want to ensure duplicates are not included while querying interactively. Which query type should you use?",
    "options": [
      "A. Include ORDER BY DESC on timestamp column and LIMIT to 1.",
      "B. Use GROUP BY on unique ID and timestamp columns and SUM on values.",
      "C. Use the LAG window function with PARTITION by unique ID.",
      "D. Use the ROW_NUMBER window function with PARTITION by unique ID along with WHERE row equals 1."
    ],
    "correct": 3,
    "explanation": "Use the ROW_NUMBER window function with PARTITION by unique ID along with WHERE row e This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "Ender_H",
        "text": "I personally don't think any answer is correct,\nD is the closest one but it's missing a \"ORDER BY timestamp DESC\" to ensure to get only the latest record based in the timestamp"
      },
      {
        "user": "daghayeghi",
        "text": "D:\nhttps://cloud.google.com/bigquery/streaming-data-into-bigquery#manually_removing_duplicates"
      },
      {
        "user": "Radhika7983",
        "text": "Correct answer is D. Group by column us used to check for the duplicates where you can have the count(*) for each of the unique id column. If the count is greater than 1, we will know duplicate exists.The easiest way to remove duplicates while streaming inserts is to use row_number. Use GROUP BY on the unique ID column and timestamp column and SUM on the values will not remove duplicates.\nI also executed LAG function and LAG function will return NULL on unique id when no previous records with..."
      },
      {
        "user": "Davijde13",
        "text": "The question mention only duplicated data and nothing about taking only the latest ones. Therefore I assume there is no need to always take the latest, we should ensure we take only one record for each ID."
      },
      {
        "user": "MaxNRG",
        "text": "D is correct because it will just pick out a single row for each set of duplicates.\nA is not correct because this will just return one row.\nB is not correct because this doesn’t get you the latest value, but will get you a sum of the same event over time which doesn’t make too much sense if you have duplicates.\nC is not correct because if you have events that are not duplicated, it will be excluded."
      },
      {
        "user": "wyextay",
        "text": "https://cloud.google.com/bigquery/streaming-data-into-bigquery#manually_removing_duplicates"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 299,
    "topic": "Architecture",
    "difficulty": 3,
    "question": "MJTelco Case Study: Building a custom interface to share data. They need aggregations over petabyte-scale datasets and scan specific time range rows with millisecond response time. Which products should you recommend?",
    "options": [
      "A. Cloud Datastore and Cloud Bigtable",
      "B. Cloud Bigtable and Cloud SQL",
      "C. BigQuery and Cloud Bigtable",
      "D. BigQuery and Cloud Storage"
    ],
    "correct": 2,
    "explanation": "BigQuery and Cloud Bigtable This balances scalability, cost, and performance requirements.",
    "discussion": [
      {
        "user": "atnafu2020",
        "text": "C\nBigquery and Big table =PB storage capacity\nBigtable=to read scan rows Big query select row to read"
      },
      {
        "user": "daghayeghi",
        "text": "C:\nThey need to do aggregations over their petabyte-scale datasets: Bigquery\nThey need to scan specific time range rows with a very fast response time (milliseconds): Bigtable"
      },
      {
        "user": "ga8our",
        "text": "Why not A? If we're already using Bigtable, what's the use of another, slower analytic solution, like BigQuery? Wouldn't Datastore be more useful to store our data than BigQuery?"
      },
      {
        "user": "Gcpyspark",
        "text": "With GCS you can only scan the rows from BigQuery using External federated Datasources, with that millisecond latency is not possible. Also \"scan specific time range rows with a very fast response time\" is a natural fit use case for Cloud Bigtable."
      },
      {
        "user": "09878d5",
        "text": "Why not A? Can someone please explain"
      },
      {
        "user": "baht",
        "text": "Response C => Bigquery and bigtable"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 300,
    "topic": "Monitoring",
    "difficulty": 3,
    "question": "MJTelco Case Study: You need to compose visualization that always shows the latest data across multiple date ranges, geographic regions, and installation types, without creating new visualizations each month. What should you do?",
    "options": [
      "A. Compose a series of charts for each possible combination of criteria.",
      "B. Compose a small set of generalized charts bound to criteria filters that allow value selection.",
      "C. Export to spreadsheet with series of charts across multiple tabs.",
      "D. Load into relational database, write an App Engine application."
    ],
    "correct": 1,
    "explanation": "Compose a small set of generalized charts bound to criteria filters that allow value This provides visibility into system performance and enables proactive alerting.",
    "discussion": [
      {
        "user": "Jarek7",
        "text": "First I thought B, as D seems too complex with writing app for AppEngine. But B is too simple - just look through the data doesnt seem right.\nIt must be very old question. Today you would load the data to BQ, optionally you can use Dataprep for simple data cleaning or a Dataflow job for more complex data processing, and finally use Looker to create tables and charts."
      },
      {
        "user": "cloudmon",
        "text": "It's B. All the other choices are unreasonable."
      },
      {
        "user": "hauhau",
        "text": "B\nBut can someone explain the question and selection clearly?"
      },
      {
        "user": "sw52099",
        "text": "Vote D.\nSince B just uses \"current data\", which means if new data enters, you need to re-run those charts again."
      },
      {
        "user": "ManojT",
        "text": "Answer D: Data in SQL so querying becomes easier on any pattern. create mutiple charts, graphs to fulfill your requirements."
      },
      {
        "user": "reima990",
        "text": "Yes agreed. B seems to be the only reasonable choice here.\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 301,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "MJTelco Case Study: Given the record streams, they are concerned about BigQuery cost. They require a single large table called tracking_table with streaming ingestion and want to minimize daily query costs. What should you do?",
    "options": [
      "A. Create a table called tracking_table and include a DATE column.",
      "B. Create a partitioned table called tracking_table and include a TIMESTAMP column.",
      "C. Create sharded tables for each day following the pattern tracking_table_YYYYMMDD.",
      "D. Create a table called tracking_table with a TIMESTAMP column to represent the day."
    ],
    "correct": 1,
    "explanation": "Create a partitioned table called tracking_table and include a TIMESTAMP column This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "lammingtons",
        "text": "They're using BigQuery so partitioning is the better choice here. B"
      },
      {
        "user": "sandipk91",
        "text": "Option B for sure"
      },
      {
        "user": "awssp12345",
        "text": "https://cloud.google.com/bigquery/docs/partitioned-tables#dt_partition_shard - Supports B"
      },
      {
        "user": "SamuelTsch",
        "text": "partitioned table is more performancer than sharded tables"
      },
      {
        "user": "sspsp",
        "text": "B, Partition tables in BQ have different cost. If a partition is not modified (DML) for 90 days then cost will be less by 50%, while querying will be efficient since its single large table."
      },
      {
        "user": "piotrpiskorski",
        "text": "always partion large tables"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 302,
    "topic": "Architecture",
    "difficulty": 3,
    "question": "Flowlogistic Case Study: The current Apache Kafka servers cannot handle the data volume for real-time inventory tracking. You need a system to ingest data from global sources, process and query in real-time, and store reliably. Which GCP products?",
    "options": [
      "A. Cloud Pub/Sub, Cloud Dataflow, and Cloud Storage",
      "B. Cloud Pub/Sub, Cloud Dataflow, and Local SSD",
      "C. Cloud Pub/Sub, Cloud SQL, and Cloud Storage",
      "D. Cloud Load Balancing, Cloud Dataflow, and Cloud Storage",
      "E. Cloud Dataflow, Cloud SQL, and Cloud Storage"
    ],
    "correct": 0,
    "explanation": "Cloud Pub/Sub, Cloud Dataflow, and Cloud Storage This balances scalability, cost, and performance requirements.",
    "discussion": [
      {
        "user": "digvijay",
        "text": "Seems like A..Data should ingest from multiple sources which might be real time or batch ."
      },
      {
        "user": "mikey007",
        "text": "Repeated Question see ques 35"
      },
      {
        "user": "ch3n6",
        "text": "A; need dataflow"
      },
      {
        "user": "kino2020",
        "text": "A\nI don't expect this question to come up, but if I had to write the answer, it would be A.\nThe problem statement \"Flowlogistic's management has determined that the current Apache Kafka servers cannot handle the\ndata volume for their real-time inventory tracking system.\nAs it says, \"we cannot determine the data volume\", but it doesn't say that we can't calculate it either.\nRequirement definition: The system must be able to\ningest data from a variety of global sources\nprocess and query in real..."
      },
      {
        "user": "navemula",
        "text": "How is it possible to query in real time with option A. It needs Dataflow"
      },
      {
        "user": "vakati",
        "text": "A. SQL queries can be written in Dataflow too.\nhttps://cloud.google.com/dataflow/docs/guides/sql/dataflow-sql-intro#running-queries"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 303,
    "topic": "Data Processing",
    "difficulty": 2,
    "question": "After migrating ETL jobs to BigQuery, you need to verify output matches the original. Tables do not contain a primary key for comparison. What should you do?",
    "options": [
      "A. Select random samples using RAND() and compare.",
      "B. Select random samples using HASH() and compare.",
      "C. Use a Dataproc cluster with BigQuery Hadoop connector to calculate a hash from non-timestamp columns after sorting. Compare hashes.",
      "D. Create stratified random samples using OVER() and compare."
    ],
    "correct": 2,
    "explanation": "Use a Dataproc cluster with BigQuery Hadoop connector to calculate a hash from non-ti This managed ETL/ELT service with low-code visual interface; prebuilt connectors simplify data pipeline creation.",
    "discussion": [
      {
        "user": "rickywck",
        "text": "C is the only way which all records will be compared."
      },
      {
        "user": "[Removed]",
        "text": "Answer: C\nDescription: Full comparison with this option, rest are comparison on sample which doesnot ensure all the data will be ok"
      },
      {
        "user": "dambilwa",
        "text": "Option [C] is most appropriate"
      },
      {
        "user": "midgoo",
        "text": "In practice, I will do B. That means it may have error due to randomness. But that is how we normally do validation/QA in general, i.e. we test random samples\nIn this question, I will do C."
      },
      {
        "user": "u_t_s",
        "text": "Since there is no PK and it is possible that set of values is commons in some records which result in same hashkey for those records. But still Anwer is C"
      },
      {
        "user": "daghayeghi",
        "text": "B:\nBecause said migrated to BigQuery, then we don't need Dataproc, and samples don't mean you don't compare all of data."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 304,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are head of BI at a large enterprise. You use on-demand pricing with 2K concurrent slots per project. Users sometimes don't get slots. You want to avoid introducing new projects. What should you do?",
    "options": [
      "A. Convert batch BQ queries into interactive BQ queries.",
      "B. Create an additional project to overcome the 2K on-demand quota.",
      "C. Switch to flat-rate pricing and establish a hierarchical priority model.",
      "D. Increase concurrent slots per project at the Quotas page."
    ],
    "correct": 2,
    "explanation": "Switch to flat-rate pricing and establish a hierarchical priority model This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "sedado77",
        "text": "I got this question on sept 2022. Answer is C"
      },
      {
        "user": "samdhimal",
        "text": "Switching to flat-rate pricing would allow you to ensure a consistent level of service and avoid running into the on-demand slot quota per project. Additionally, by establishing a hierarchical priority model for your projects, you could allocate resources based on the specific needs and priorities of each business unit, ensuring that the most critical queries are executed first. This approach would allow you to balance the needs of each business unit while maximizing the use of your BigQuery ..."
      },
      {
        "user": "samdhimal",
        "text": "C. Switch to flat-rate pricing and establish a hierarchical priority model for your projects."
      },
      {
        "user": "zellck",
        "text": "C is the answer.\nhttps://cloud.google.com/bigquery/docs/reservations-intro\nThe benefits of using BigQuery Reservations include:\n- Workload management. After you purchase slots, you can allocate them to workloads. That way, a workload has a dedicated pool of BigQuery computational resources available for use. At the same time, if a workload doesn't use all of its allocated slots, any unused slots are shared automatically across your other workloads.\n- Centralized purchasing: You can purchase a..."
      },
      {
        "user": "grshankar9",
        "text": "In BigQuery, \"on-demand pricing\" means you pay based on the amount of data your queries scan (bytes processed), essentially paying for what you use, while \"flat-rate pricing\" involves purchasing a set number of \"slots\" (virtual CPUs) and paying a fixed fee regardless of how much data you query, essentially providing a predictable monthly cost for dedicated processing power; on-demand is best for occasional users with variable query needs, while flat-rate is better for predictable high-volume ..."
      },
      {
        "user": "midgoo",
        "text": "This question is interesting.\nMy friend works as the TAM in Google and he said we could request for Quota increase if the customer is premium customer instead of changing to Flat-rate\nOtherwise, need to choose C"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 305,
    "topic": "Data Ingestion",
    "difficulty": 2,
    "question": "You have an Apache Kafka cluster on-prem with web application logs. You need to replicate to Google Cloud for BigQuery and Cloud Storage. Preferred method is mirroring to avoid deploying Kafka Connect plugins. What should you do?",
    "options": [
      "A. Deploy a Kafka cluster on GCE. Configure on-prem to mirror topics. Use Dataproc or Dataflow to read from Kafka and write to GCS.",
      "B. Deploy a Kafka cluster on GCE with Pub/Sub Kafka connector as Sink. Use Dataproc or Dataflow.",
      "C. Deploy Pub/Sub Kafka connector to on-prem cluster. Configure Pub/Sub as Source connector. Use Dataflow.",
      "D. Deploy Pub/Sub Kafka connector to on-prem cluster. Configure Pub/Sub as Sink connector. Use Dataflow."
    ],
    "correct": 0,
    "explanation": "Deploy a Kafka cluster on GCE This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "Ganshank",
        "text": "A.\nhttps://cwiki.apache.org/confluence/pages/viewpage.action?pageId=27846330\nThe solution specifically mentions mirroring and minimizing the use of Kafka Connect plugin.\nD would be the more Google Cloud-native way of implementing the same, but the requirement is better met by A."
      },
      {
        "user": "hendrixlives",
        "text": "\"A\" is the answer which complies with the requirements (specifically, \"The preferred replication method is mirroring to avoid deployment of Kafka Connect plugins\"). Indeed, one of the uses of what is called \"Geo-Replication\" (or Cross-Cluster Data Mirroring) in Kafka is precisely cloud migrations: https://kafka.apache.org/documentation/#georeplication\nHowever I agree with Ganshank, and the optimal \"Google way\" way would be \"D\", installing the Pub/Sub Kafka connector to move the data from on-p..."
      },
      {
        "user": "Rajokkiyam",
        "text": "Correct Answer : D."
      },
      {
        "user": "Qix",
        "text": "Pub/Sub Kafka connector requires Kafka Connect, as described here https://cloud.google.com/pubsub/docs/connect_kafka\nDeployment of Kafka Connect is explicitly excluded by the requirements. So the only option available is A"
      },
      {
        "user": "Tanmoyk",
        "text": "D should be the correct answer. Configure pub/sub as sink"
      },
      {
        "user": "samdhimal",
        "text": "Option A: Deploy a Kafka cluster on GCE VM Instances. Configure your on-prem cluster to mirror your topics to the cluster running in GCE. Use a Dataproc cluster or Dataflow job to read from Kafka and write to GCS.\nThis option involves setting up a separate Kafka cluster in Google Cloud, and then configuring the on-prem cluster to mirror the topics to this cluster. The data from the Google Cloud Kafka cluster can then be read using either a Dataproc cluster or a Dataflow job and written to Clo..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 306,
    "topic": "Dataproc",
    "difficulty": 2,
    "question": "You migrated a Hadoop job to Dataproc and GCS. Spark job has many shuffling operations. You see performance degradation with Dataproc using preemptibles (2 non-preemptible workers). What should you do?",
    "options": [
      "A. Increase parquet file sizes to 1 GB minimum.",
      "B. Switch to TFRecords format.",
      "C. Switch from HDDs to SSDs, copy initial data from GCS to HDFS, run Spark, copy results back to GCS.",
      "D. Switch from HDDs to SSDs, override preemptible VMs configuration to increase boot disk size."
    ],
    "correct": 2,
    "explanation": "Switch from HDDs to SSDs, copy initial data from GCS to HDFS, run Spark, copy results This approach meets the stated requirements.",
    "discussion": [
      {
        "user": "rickywck",
        "text": "Should be A:\nhttps://stackoverflow.com/questions/42918663/is-it-better-to-have-one-large-parquet-file-or-lots-of-smaller-parquet-files\nhttps://www.dremio.com/tuning-parquet/\nC & D will improve performance but need to pay more $$"
      },
      {
        "user": "jvg637",
        "text": "D: # By default, preemptible node disk sizes are limited to 100GB or the size of the non-preemptible node disk sizes, whichever is smaller. However you can override the default preemptible disk size to any requested size. Since the majority of our cluster is using preemptible nodes, the size of the disk used for caching operations will see a noticeable performance improvement using a larger disk. Also, SSD's will perform better than HDD. This will increase costs slightly, but is the best opti..."
      },
      {
        "user": "madhu1171",
        "text": "Answer should be D"
      },
      {
        "user": "raf2121",
        "text": "Point for discussion - Another reason why it can't be C or D.\nSSD's are not available on pre-emptible Worker nodes (answers didn't say whether they wanted to switch from HDD to SDD for Master nodes)\nhttps://cloud.google.com/architecture/hadoop/hadoop-gcp-migration-jobs"
      },
      {
        "user": "gdc56",
        "text": "It is definitely D\na) \"To get optimal performance, split your data in Cloud Storage into files with sizes from 128 MB to 1 GB.\"\nhttps://cloud.google.com/architecture/hadoop/migrating-apache-spark-jobs-to-cloud-dataproc#optimize_performance\nFiles are already within this size range, so increasing to 1GB or over would worsen performance.\nb) Same as a) - changing file type would not affect performance.\nc) \"Your Dataproc cluster needs non-HDFS local disk space for shuffling.\"\nhttps://cloud.google...."
      },
      {
        "user": "fire558787",
        "text": "ATTENTION: It's D, not A! From GCP Documentation:\n1) \"As a default, preemptible VMs are created with a smaller boot disk size, and you might want to override this configuration if you are running shuffle-heavy workloads\"\n2) If you perform many shuffling operations or partitioned writes, switch to SSDs to boost performance.\nReference: https://cloud.google.com/architecture/hadoop/migrating-apache-spark-jobs-to-cloud-dataproc#optimize_performance"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 307,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "Your Dataflow job is failing because of errors in input data. You need to improve reliability and be able to reprocess all failing data. What should you do?",
    "options": [
      "A. Add a filtering step to skip these types of errors.",
      "B. Add a try-catch block to your DoFn, extract erroneous rows from logs.",
      "C. Add a try-catch block, write erroneous rows to Pub/Sub directly from the DoFn.",
      "D. Add a try-catch block, use a sideOutput to create a PCollection that can be stored to Pub/Sub later."
    ],
    "correct": 3,
    "explanation": "Add a try-catch block, use a sideOutput to create a PCollection that can be stored to This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "midgoo",
        "text": "C is a big NO. Writing to PubSub in DoFn will cause bottleneck in the pipeline. For IO, we should always use those IO lib (e.g PubsubIO)\nUsing sideOutput is the correct answer here. There is a Qwiklab about this. It is recommended to do that lab to understand more."
      },
      {
        "user": "jonathanthezombieboy",
        "text": "Based on the given scenario, option D would be the best approach to improve the reliability of the pipeline.\nAdding a try-catch block to the DoFn that transforms the data would allow you to catch and handle errors within the pipeline. However, storing erroneous rows in Pub/Sub directly from the DoFn (Option C) could potentially create a bottleneck in the pipeline, as it adds additional I/O operations to the data processing.\nOption A of filtering the erroneous data would not allow the pipeline..."
      },
      {
        "user": "nickyshil",
        "text": "The error records are directly written to PubSub from the DoFn (it’s equivalent in python).\nYou cannot directly write a PCollection to PubSub. You have to extract each record and write one at a time. Why do the additional work and why not write it using PubSubIO in the DoFn itself?\nYou can write the whole PCollection to Bigquery though, as explained in\nReference:\nhttps://medium.com/google-cloud/dead-letter-queues-simple-implementation-strategy-for-cloud-pub-sub-80adf4a4a800"
      },
      {
        "user": "musumusu",
        "text": "Option D is right approach to use to get errors as sideOutput. Apache beam has a special scripting docs not dynamic as python itself. So lets follow standard sideOutput(withoutputs in the code)\nsyntax be like in pipeline:\n'ProcessData' >> beam.ParDo(DoFn).with_outputs"
      },
      {
        "user": "abwey",
        "text": "blahblahblahblahblahblahblahblah"
      },
      {
        "user": "Atnafu",
        "text": "D\nSide output is a great manner to branch the processing. Let's take the example of an input data source that contains both valid and invalid values. Valid values must be written in place #1 and the invalid ones in place#2. A naive solution suggests to use a filter and write 2 distinct processing pipelines. However this approach has one main drawback - the input dataset is read twice. If for the mentioned problem we use side outputs, we can still have 1 ParDo transform that internally dispatc..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 308,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You're training a model to predict housing prices. The dataset contains latitude and longitude. Location is highly influential. You want to engineer a feature incorporating physical dependency. What should you do?",
    "options": [
      "A. Provide latitude and longitude as input vectors.",
      "B. Create a numeric column from a feature cross of latitude and longitude.",
      "C. Create a feature cross, bucketize at minute level, and use L1 regularization.",
      "D. Create a feature cross, bucketize at minute level, and use L2 regularization."
    ],
    "correct": 2,
    "explanation": "Feature crosses of geographical coordinates create sparse data. L1 regularization drives irrelevant weights to zero, recommended by Google for sparse feature crosses unlike L2.",
    "discussion": [
      {
        "user": "AHUI",
        "text": "Ans C, use L1 regularization becuase we know the feature is a strong feature. L2 will evenly distribute weights"
      },
      {
        "user": "dish11dish",
        "text": "Option C is correct\nUse L1 regularization when you need to assign greater importance to more influential features. It\nshrinks less important feature to 0.\nL2 regularization performs better when all input features influence the output & all with the\nweights are of equal size."
      },
      {
        "user": "AWSandeep",
        "text": "C. Create a feature cross of latitude and longitude, bucketize it at the minute level and use L1 regularization during optimization."
      },
      {
        "user": "Surely1987",
        "text": "Coordinates are written with Degrees, minutes and seconds (one minute being equal to about 1.8 km). So you group your coordinates in buckets with a miute precision"
      },
      {
        "user": "crismo04",
        "text": "So it's B option"
      },
      {
        "user": "SamuelTsch",
        "text": "I would like choose D. L1 will ignore the irrelevant features. However, we know that lat and long are cruial for this model. We can't take away their influences. L2 helps in preventing overfitting."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 309,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "Your company is using WILDCARD tables to query data across multiple tables. The SQL statement is failing. Which table name will make the SQL statement work correctly?",
    "options": [
      "A. 'bigquery-public-data.noaa_gsod.gsod'",
      "B. bigquery-public-data.noaa_gsod.gsod*",
      "C. 'bigquery-public-data.noaa_gsod.gsod'*",
      "D. `bigquery-public-data.noaa_gsod.gsod*`"
    ],
    "correct": 3,
    "explanation": "`bigquery-public-data.noaa_gsod.gsod*` This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "Ender_H",
        "text": "None, the actual `bigquery-public-data.noaa_gsod.gsod*`\nwith back ticks at the beginning and at the end."
      },
      {
        "user": "Davijde13",
        "text": "I suspect there has been some typo with copy-paste of the option D"
      },
      {
        "user": "jitvimol",
        "text": "yes, I see from another source that actually ans D has to be backtick. Probably a problem when this web do data ingestion."
      },
      {
        "user": "ABKR1300",
        "text": "Few might go with the Option B which will be a blunder because of the below reason.\nWhile querying the tables or views with the name, it is optional to surround with the backticks. But while querying the list of tables with Wild card character, it is must to surround with the backticks.\nWe can get the Syntax error: Expected end of input but got \"*\" with the below query\nSELECT * FROM bigquery-public-data.noaa_gsod.gsod*\nWHERE _TABLE_SUFFIX = \"2024\"\nSo, option D might be the correct one, provid..."
      },
      {
        "user": "dsyouness",
        "text": "bigquery-public-data.noaa_gsod.gsod* also works"
      },
      {
        "user": "Pavaan",
        "text": "Answer is 'D'\nReference : https://cloud.google.com/bigquery/docs/wildcard-table-reference\nEnclose table names with wildcards in backticks\nThe wildcard table name contains the special character (*), which means that you must enclose the wildcard table name in backtick (`) characters."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 310,
    "topic": "Monitoring",
    "difficulty": 3,
    "question": "You are deploying MariaDB SQL on GCE VMs and need monitoring with minimal development effort using Stackdriver. What should you do?",
    "options": [
      "A. Install the OpenCensus Agent and create a custom metric collection application.",
      "B. Place MariaDB instances in an Instance Group with a Health Check.",
      "C. Install the Stackdriver Logging Agent and configure fluentd in_tail plugin.",
      "D. Install the Stackdriver Agent and configure the MySQL plugin."
    ],
    "correct": 3,
    "explanation": "Install the Stackdriver Agent and configure the MySQL plugin This IaaS offering with granular control over instances, custom machine types, and preemptible VMs for cost optimization.",
    "discussion": [
      {
        "user": "Barniyah",
        "text": "Answer : A\nMariaDB needs costume metrics , and stackdriver built-in monitoring tools will not provide these metrics . Opencensus Agent will do this for you\nFor more info , refer to :\nhttps://cloud.google.com/monitoring/custom-metrics/open-census"
      },
      {
        "user": "fire558787",
        "text": "It is definitely A.\nB: can't be because Health Checks just checks that machine is online\nC: StackDriver Logging is for Logging. Here we talk of Monitoring / Alerting\nD: StackDriver Agent monitors default metrics of VMs and some Database stuff with the MySQL Plugin. Here you want to monitor some more custom stuff like Replication of MariaDB (I didn't find anything of this sort in the plugin page), and you may want to use Custom Metrics rather than default metrics. \"Cloud Monitoring automatical..."
      },
      {
        "user": "[Removed]",
        "text": "Answer: C\nDescription: The GitHub repository named google-fluentd-catch-all-config which includes the configuration files for the Logging agent for ingesting the logs from various third-party software packages."
      },
      {
        "user": "zellck",
        "text": "D is the answer.\nhttps://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/third-party/mariadb"
      },
      {
        "user": "SteelWarrior",
        "text": "Should be D. MySQL plugin should be compatible for MariaDB."
      },
      {
        "user": "bnikunj",
        "text": "I believe it should be D as MariaDb is just an extension of MySQL and the mysql plugin should work with sytacjdriver monitoring"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 311,
    "topic": "ML/AI",
    "difficulty": 3,
    "question": "You work for a bank. You have a labelled dataset of granted loan applications and default status. You need to train a model to predict default rates. What should you do?",
    "options": [
      "A. Increase the size of the dataset by collecting additional data.",
      "B. Train a linear regression to predict a credit default risk score.",
      "C. Remove the bias from the data and collect declined applications.",
      "D. Match loan applicants with their social profiles for feature engineering."
    ],
    "correct": 2,
    "explanation": "Training only on granted applications introduces severe selection bias. The model must account for this bias by analyzing declined applications to accurately predict defaults.",
    "discussion": [
      {
        "user": "GHN74",
        "text": "A is incorrect as you need to work with the data you have available\nC is an optimisation not a solution\nD is ethically incorrect and invasion to privacy, there could be several legal implications with this\nB although oversimplified but is a workable solution"
      },
      {
        "user": "szefco",
        "text": "Question says: \"to predict default RATES for credit applicants\".\nIt is not binary classification, so Linear Regression would work here.\nI think B is correct answer."
      },
      {
        "user": "sumanshu",
        "text": "We have labelled data that contains whether a loan application is accepted or defaulted - So Classification Problem Data.\nWe need to predict (Default Rates for applicants) - I think whether application will be granted or defaulted. - So Binary Classification.\nNo option matches the answer. - if we mark 'B' - It should be Logistic Regression, Instead of Linear Regression"
      },
      {
        "user": "woyaolai",
        "text": "I used to be a Credit Risk modeler and I think this question is stupid."
      },
      {
        "user": "JayZeeLee",
        "text": "D.\nA - Incorrect. There's no indication that size was the problem.\nB - Incorrect. The model is likely to be a classification model. So linear is not the best fit.\nC - Incorrect. You wouldn't need declined applications. How can you default without getting an approved application. It's not relevant."
      },
      {
        "user": "dambilwa",
        "text": "Question not worded properly. Option [B] looks closest"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 312,
    "topic": "Storage",
    "difficulty": 2,
    "question": "You need to migrate a 2TB relational database to GCP. You do not have resources to significantly refactor. Cost to operate is primary concern. Which service?",
    "options": [
      "A. Cloud Spanner",
      "B. Cloud Bigtable",
      "C. Cloud Firestore",
      "D. Cloud SQL"
    ],
    "correct": 3,
    "explanation": "Cloud SQL This managed relational database with automated backups, replication, and patch management; supports MySQL, PostgreSQL, SQL Server.",
    "discussion": [
      {
        "user": "taepyung",
        "text": "At this moment, Cloud SQL is providing up to 30,720GB(about 30TB)\nSo I think it's D."
      },
      {
        "user": "Abhi16820",
        "text": "64TB AS OF TODAY"
      },
      {
        "user": "xrun",
        "text": "Another consideration is that Cloud SQL uses standard databases like MySQL, PostgreSQL and now MS SQL. Cloud Spanner is a proprietary product of Google and does some things differently than typical databases (no stored procedures and triggers). So migrating to Cloud Spanner makes application refactoring necessary. So Cloud SQL is the answer."
      },
      {
        "user": "Barniyah",
        "text": "Sorry , I think it's D\nhttps://cloud.google.com/sql/docs/features\n(Cloud SQL supports MySQL 5.6 or 5.7, and provides up to 416 GB of RAM and 30 TB of data storage, with the option to automatically increase the storage size as needed.)"
      },
      {
        "user": "GypsyMonkey",
        "text": "D, cloud SQL is a relational database; if > 10tb, then choose spanner"
      },
      {
        "user": "atnafu2020",
        "text": "D\nCloud SQL supports MySQL 5.6 or 5.7, and provides up to 624 GB of RAM and 30 TB of data storage, with the option to automatically increase the storage size as needed."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 313,
    "topic": "Bigtable",
    "difficulty": 2,
    "question": "You're using Bigtable for a real-time application with a heavy mix of reads and writes. You also need to perform hourly analytical jobs. You need to ensure both reliability of production and analytical workload. What should you do?",
    "options": [
      "A. Export Bigtable dump to GCS and run analytical job on top of exported files.",
      "B. Add a second cluster with multi-cluster routing, use live-traffic app profile for regular workload and batch-analytics profile for analytics.",
      "C. Add a second cluster with single-cluster routing.",
      "D. Increase the size of existing cluster twice and execute analytics workload."
    ],
    "correct": 2,
    "explanation": "Multi-cluster routing routes to the nearest cluster and cannot guarantee workload isolation. Single-cluster routing on App Profiles directs each workload to a specific cluster.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "Answer is C\nWhen you use a single cluster to run a batch analytics job that performs numerous large reads alongside an application that performs a mix of reads and writes, the large batch job can slow things down for the application's users. With replication, you can use app profiles with single-cluster routing to route batch analytics jobs and application traffic to different clusters, so that batch jobs don't affect your applications' users.\nhttps://cloud.google.com/bigtable/docs/replicatio..."
      },
      {
        "user": "aewis",
        "text": "It was actually illustrated here\nhttps://cloud.google.com/bigtable/docs/replication-settings#batch-vs-serve"
      },
      {
        "user": "MisuLava",
        "text": "how can you use multi-cluster routing when you want to go to old instance with the regular load and to the new one with the analytical node ? MULTI will go to the nearest one...\nMulti-cluster routing automatically routes requests to the nearest cluster in an instance. If the cluster becomes unavailable, traffic automatically fails over to the nearest cluster that is available. Bigtable considers clusters in a single region to be equidistant, even though they are in different zones. You can co..."
      },
      {
        "user": "carbino",
        "text": "IIt is C:\n\"Workload isolation:\nUsing separate app profiles lets you use different routing policies for different purposes. For example, consider a situation when you want to prevent a batch read job (workload A) from increasing CPU usage on clusters that handle an application's steady reads and writes (workload B). You can create an app profile for workload B that routes to a cluster group that excludes one cluster. Then you create an app profile for workload A that specifies single-cluster r..."
      },
      {
        "user": "DevShah",
        "text": "https://cloud.google.com/bigtable/docs/replication-settings#batch-vs-serve"
      },
      {
        "user": "juliobs",
        "text": "C. This is exactly the example in the documentation.\nhttps://cloud.google.com/bigtable/docs/replication-settings#batch-vs-serve"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 314,
    "topic": "Dataflow",
    "difficulty": 2,
    "question": "You are designing an Apache Beam pipeline to enrich data from Pub/Sub with static reference data from BigQuery. The reference data fits in memory on a single worker. Results go to BigQuery. Which job type and transforms should this pipeline use?",
    "options": [
      "A. Batch job, PubSubIO, side-inputs",
      "B. Streaming job, PubSubIO, JdbcIO, side-outputs",
      "C. Streaming job, PubSubIO, BigQueryIO, side-inputs",
      "D. Streaming job, PubSubIO, BigQueryIO, side-outputs"
    ],
    "correct": 2,
    "explanation": "Streaming job, PubSubIO, BigQueryIO, side-inputs This Google's fully managed streaming and batch data processing service that provides exactly-once semantics with auto-scaling and low latency.",
    "discussion": [
      {
        "user": "rickywck",
        "text": "Why not C? Without BigQueryIO how can data be written back to BigQuery?"
      },
      {
        "user": "xq",
        "text": "C should be right"
      },
      {
        "user": "pals_muthu",
        "text": "Answer is C,\nYou need pubsubIO and BigQueryIO for streaming data and writing enriched data back to BigQuery. side-inputs are a way to enrich the data\nhttps://cloud.google.com/architecture/e-commerce/patterns/slow-updating-side-inputs"
      },
      {
        "user": "medeis_jar",
        "text": "I vote for C, because data will come from Pub/Sub, so it should be streaming, we'll need PubSubIO to be able to read from PubSub and BigQueryIO to be able to write to BigQuery, finally the side-inputs pattern let us enrich data"
      },
      {
        "user": "zellck",
        "text": "C is the answer.\nhttps://cloud.google.com/dataflow/docs/tutorials/ecommerce-java#side-input-pattern\nIn streaming analytics applications, data is often enriched with additional information that might be useful for further analysis. For example, if you have the store ID for a transaction, you might want to add information about the store location. This additional information is often added by taking an element and bringing in information from a lookup table."
      },
      {
        "user": "MaxNRG",
        "text": "Static reference data from BigQuery will go as side-inputs and data from pub-sub will go as streaming data using PubSubIO and finally BigQueryIO is required to push the final data to BigQuery"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 315,
    "topic": "Bigtable",
    "difficulty": 2,
    "question": "You have a data pipeline that writes to Bigtable with well-designed row keys. You want to monitor your pipeline to determine when to increase the Bigtable cluster. Which two actions? (Choose two.)",
    "options": [
      "A. Review Key Visualizer metrics. Increase when Read pressure index above 100.",
      "B. Review Key Visualizer metrics. Increase when Write pressure index above 100.",
      "C. Monitor latency of write operations. Increase when there is sustained increase.",
      "D. Monitor storage utilization. Increase when above 70% of max capacity.",
      "E. Monitor latency of read operations. Increase if reads take longer than 100 ms."
    ],
    "correct": [
      2,
      3
    ],
    "explanation": "Monitor latency of write operations. Increase when there is sustained increase This NoSQL wide-column store optimized for time-series and analytical workloads with millisecond latency, automatic scaling, and replication.",
    "discussion": [
      {
        "user": "jvg637",
        "text": "Answer is C & D.\nC –> Adding more nodes to a cluster (not replication) can improve the write performance https://cloud.google.com/bigtable/docs/performance\nD –> since Google recommends adding nodes when storage utilization is > 70% https://cloud.google.com/bigtable/docs/modifying-instance#nodes"
      },
      {
        "user": "ch3n6",
        "text": "No. it is C, D. \"You have a data pipeline that writes data to Cloud Bigtable using well-designed row keys.\"\nwhy are you monitoring read anyway? you are just writing."
      },
      {
        "user": "Barniyah",
        "text": "Key visualizer is bigtable metric , So A and B incorrect\nstorage utilization also bigtable metric , So D incorrect\nThe question want you to monitor pipeline metrics (which is dataflow metrics) , in our case we can only monitor latency .\nThe answer will be : C & E"
      },
      {
        "user": "Rajokkiyam",
        "text": "Well Defined RowKey So A & B out of scope.\nWith Increase in cluster Size you can only reduce the latency of Write operations. Read latency doesn't have any impact with increasing the cluster size. Ready latency attributes to Cluster replication so Option E is also ruled out. Answer C & D"
      },
      {
        "user": "Rajokkiyam",
        "text": "B is out of Scope because KeyVisualizer is used to identify the skew in data and help us to re-deisgn the rowkey. Since its already confirmed \"Well Defined Rowkey\" KeyViz is out of scope.\nFirst\nNext\nLast\nExamPrepper\n\nReiniciar"
      },
      {
        "user": "dabrat",
        "text": "Storage utilization (% max)\nThe percentage of the cluster's storage capacity that is being used. The capacity is based on the number of nodes in your cluster.\nIn general, do not use more than 70% of the hard limit on total storage, so you have room to add more data. If you do not plan to add significant amounts of data to your instance, you can use up to 100% of the hard limit.\nImportant: If any cluster in an instance exceeds the hard limit on the amount of storage per node, writes to all clu..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 316,
    "topic": "Architecture",
    "difficulty": 3,
    "question": "You want to analyze hundreds of thousands of social media posts daily at lowest cost. You will batch-load posts and run through Natural Language API. You need to store raw posts for archiving and create dashboards. What should you do?",
    "options": [
      "A. Store social media posts and extracted data in BigQuery.",
      "B. Store social media posts and extracted data in Cloud SQL.",
      "C. Store raw posts in Cloud Storage, write extracted data into BigQuery.",
      "D. Feed posts into the API directly from the source, write extracted data into BigQuery."
    ],
    "correct": 2,
    "explanation": "Store raw posts in Cloud Storage, write extracted data into BigQuery This reducing GCP spend through resource right-sizing, committed use discounts, and preemptible instances.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "Answer: C\nDescription: Social media posts can images/videos which cannot be stored in bigquery"
      },
      {
        "user": "psu",
        "text": "Answer should be C, becose they ask you to save a copy of the raw posts for archival, which may not be possible if you directly feed the posts to the API."
      },
      {
        "user": "sedado77",
        "text": "I got this question on sept 2022. Answer is C"
      },
      {
        "user": "Devx198912233",
        "text": "but the posts are fed into cloud natural language api. which means we have to consider the posts to be text only"
      },
      {
        "user": "MaxNRG",
        "text": "You must store the raw posts for archiving and reprocessing, Store the raw social media posts in Cloud Storage.\nB is expensive\nD is not valid since you have to store the raw posts for archiving\nBetween A and C I’s say C, since we’re going to make dashboards and Data Studio will connect well with big query.\nand besides A would probably be more expensive."
      },
      {
        "user": "Alasmindas",
        "text": "I will go with Option C, because of the following reasons:-\na) Social media posts are \"raw\" - which means - it can be of any format (blob/object storage) is preferred.\nb) The output from the application (assuming the application is Cloud NLP) is to be future stored for archival purpose - and hence again Google Cloud storage is the best option - so option C\nOption A &C - Incorrect, although Option D fulfils the requirement of \"fewest step\" but storing data in big query for archival purpose is ..."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 317,
    "topic": "Data Processing",
    "difficulty": 2,
    "question": "You store historic data in Cloud Storage. You need to perform analytics to detect invalid data entries and perform data transformations with no programming or SQL knowledge. What should you do?",
    "options": [
      "A. Use Cloud Dataflow with Beam to detect errors and perform transformations.",
      "B. Use Cloud Dataprep with recipes to detect errors and perform transformations.",
      "C. Use Cloud Dataproc with a Hadoop job.",
      "D. Use federated tables in BigQuery with queries."
    ],
    "correct": 1,
    "explanation": "Use Cloud Dataprep with recipes to detect errors and perform transformations This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "cleroy",
        "text": "Use Dataprep ! It's THE tool for this"
      },
      {
        "user": "rickywck",
        "text": "Yes B.\nHonest speaking, sometime I thought the answers being posted here were intentionally to mislead people whose do not have proper knowledge on the subject, but just memorizing answers to pass the exam."
      },
      {
        "user": "Wudihero2",
        "text": "...Did you even read through the question? It says \"not require programming or knowledge of SQL\". YOU are the one who's clumsy, not dataprep."
      },
      {
        "user": "Rajokkiyam",
        "text": "Options B.(considering no SQL skill i needed)\nNext closest option is Federated source and transform the data to the permanent table"
      },
      {
        "user": "MaxNRG",
        "text": "B, “Cloud Dataprep by Trifacta is an intelligent data service for visually exploring, cleaning, and preparing structured and unstructured data for analysis, reporting, and machine learning”\nhttps://cloud.google.com/dataprep/"
      },
      {
        "user": "sedado77",
        "text": "I got this question on sept 2022."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 318,
    "topic": "Data Migration",
    "difficulty": 1,
    "question": "Your company needs to upload historic data to Cloud Storage. Security rules don't allow access from external IPs. After initial upload, they will add new data daily. What should they do?",
    "options": [
      "A. Execute gsutil rsync from the on-premises servers.",
      "B. Use Dataflow to write data to Cloud Storage.",
      "C. Write a job template in Dataproc to perform the data transfer.",
      "D. Install an FTP server on a Compute Engine VM."
    ],
    "correct": 0,
    "explanation": "Execute gsutil rsync from the on-premises servers This Google Cloud Storage provides object storage with strong consistency, lifecycle policies, and versioning; regional buckets optimize for single-region performance.",
    "discussion": [
      {
        "user": "itche_scratche",
        "text": "should be A, dataflow is on cloud is external; \"don't allow access from external IPs to their on-premises resources\" so no dataflow."
      },
      {
        "user": "MaxNRG",
        "text": "A is the better and most simple IF there is no problem in having gsutil in our servers.\nB and C no way, the comms will go GCP–Home, which sais is not allowed.\nD is valid, we can send the files with http://ftp…BUT ftp is not secure, and we’ll need to move them to the cloud storage afterwards, which is not detailed in the answer.\nhttps://cloud.google.com/storage/docs/gsutil/commands/rsync"
      },
      {
        "user": "VishalB",
        "text": "Ans : A\nThe gsutil rsync command makes the contents under dst_url the same as the contents under src_url, by copying any missing files/objects (or those whose data has changed), and (if the -d option is specified) deleting any extra files/objects. src_url must specify a directory, bucket, or bucket subdirectory"
      },
      {
        "user": "zellck",
        "text": "A is the answer.\nhttps://cloud.google.com/architecture/migration-to-google-cloud-transferring-your-large-datasets#gsutil_for_smaller_transfers_of_on-premises_data\nThe gsutil tool is the standard tool for small- to medium-sized transfers (less than 1 TB) over a typical enterprise-scale network, from a private data center to Google Cloud. We recommend that you include gsutil in your default path when you use Cloud Shell. It's also available by default when you install the Google Cloud CLI. It's..."
      },
      {
        "user": "manocha_01887",
        "text": "How rsynch will handle private network?\n\"..The security rules don't allow access from external IPs to their on-premises resources..\""
      },
      {
        "user": "daghayeghi",
        "text": "A:\nhttps://cloud.google.com/solutions/migration-to-google-cloud-transferring-your-large-datasets#options_available_from_google"
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 319,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You have a query that filters a BigQuery table using WHERE clause on timestamp and ID columns. The query triggers a full scan of the table. You want to reduce data scanned with minimal changes to existing SQL queries. What should you do?",
    "options": [
      "A. Create a separate table for each ID.",
      "B. Use the LIMIT keyword to reduce the number of rows returned.",
      "C. Recreate the table with a partitioning column and clustering column.",
      "D. Use the bq query --maximum_bytes_billed flag to restrict bytes billed."
    ],
    "correct": 2,
    "explanation": "Recreate the table with a partitioning column and clustering column This optimizes query performance through data organization and indexing.",
    "discussion": [
      {
        "user": "rickywck",
        "text": "should be C:\nhttps://cloud.google.com/bigquery/docs/best-practices-costs"
      },
      {
        "user": "Crudgey",
        "text": "Are they having a laugh at us by giving so many bad answers?"
      },
      {
        "user": "MaxNRG",
        "text": "https://cloud.google.com/bigquery/docs/best-practices-costs\nApplying a LIMIT clause to a SELECT * query does not affect the amount of data read. You are billed for reading all bytes in the entire table, and the query counts against your free tier quota.\nA and D doesnt make sense\nIts C, when you want to select by a partition you should write something like:\nCREATE TABLE `blablabla.partitioned`\nPARTITION BY\nDATE(timestamp)\nCLUSTER BY id\nAS\nSELECT * FROM `blablabla`"
      },
      {
        "user": "ceak",
        "text": "recreating table will not affect existing sql queries as they will still be selecting the same table name, but the scan will hugely decrease. so, option C is the correct answer."
      },
      {
        "user": "zellck",
        "text": "C is the answer.\nhttps://cloud.google.com/bigquery/docs/partitioned-tables\nA partitioned table is a special table that is divided into segments, called partitions, that make it easier to manage and query your data. By dividing a large table into smaller partitions, you can improve query performance, and you can control costs by reducing the number of bytes read by a query.\nhttps://cloud.google.com/bigquery/docs/clustered-tables\nlustered tables in BigQuery are tables that have a user-defined c..."
      },
      {
        "user": "felixwtf",
        "text": "LIMIT keyword is applied only at the end, i.e., only to limit the results already calculated. Therefore, a full table scan will have already happened. The where clause on the other hand would provide the desired filtering depending on the case. So, C is the correct answer."
      }
    ],
    "source": "examprepper",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": null,
    "isRecent": false,
    "importBatch": null,
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": ""
  },
  {
    "id": 320,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "Your company uses Looker Studio connected to BigQuery for reporting. Users are experiencing slow dashboard load times due to complex queries on a large table. The queries involve aggregations and filtering on several columns. You need to optimize query performance to decrease the dashboard load times. What should you do?",
    "options": [
      "A. Configure Looker Studio to use a shorter data refresh interval to ensure fresh data is always displayed.",
      "B. Create a materialized view in BigQuery that pre-calculates the aggregations and filters used in the Looker Studio dashboards.",
      "C. Implement row-level security in BigQuery to restrict data access and reduce the amount of data processed by the queries.",
      "D. Use BigQuery BI Engine to accelerate query performance by caching frequently accessed data."
    ],
    "correct": 3,
    "explanation": "It is D",
    "discussion": [
      {
        "user": "5523042",
        "text": "It is D"
      }
    ],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 320,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "low",
    "conflict": true,
    "discussionSummary": "It is D"
  },
  {
    "id": 323,
    "topic": "Security/IAM",
    "difficulty": 2,
    "question": "Your company uses separate Google Cloud projects for development, staging, and production. Developers need edit access in the development project, read-only access in the staging project, and no access in the production project. You need an effective and manageable solution to assign and enforce these permissions according to Google-recommended practices. What should you do?",
    "options": [
      "A. Create separate VPC Service Controls perimeters for each project and use access levels.",
      "B. Grant individual developers specific IAM roles directly on each project.",
      "C. Configure firewall rules within each project’s VPC to block traffic from unauthorized developer machines.",
      "D. Create Google Groups for access levels, assign developers to groups, and grant the groups the appropriate IAM roles on each project."
    ],
    "correct": 3,
    "explanation": "Respuesta sugerida: D.",
    "discussion": [],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 323,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "low",
    "conflict": false,
    "discussionSummary": "Respuesta sugerida: D."
  },
  {
    "id": 326,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "Your team runs a complex analytical query daily that processes terabytes of data. Recently, after running for 20 minutes, the query fails with a “Resources exceeded” error. You need to resolve this issue. What should you do?",
    "options": [
      "A. Move from BigQuery on-demand to slot reservations.",
      "B. Analyze the SQL syntax for errors.",
      "C. Increase the maximum table size limit.",
      "D. Increase your project’s BigQuery API request quota."
    ],
    "correct": 0,
    "explanation": "Respuesta sugerida: A.",
    "discussion": [],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 326,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "low",
    "conflict": false,
    "discussionSummary": "Respuesta sugerida: A."
  },
  {
    "id": 327,
    "topic": "ML/AI",
    "difficulty": 2,
    "question": "Your company wants to implement a Retrieval-Augmented Generation (RAG) system to allow employees to query an extensive knowledge base of internal documents, such as policy manuals and project reports. You need to prepare this unstructured text for embedding to be used in the RAG system. What should you do to ensure the system can retrieve the most relevant information?",
    "options": [
      "A. Use Cloud Data Loss Prevention (Cloud DLP) to scan and redact sensitive information within the documents before processing.",
      "B. Store the documents as compressed files in a traditional relational database to enable more efficient storage and retrieval.",
      "C. Convert the unstructured documents into high-dimensional numerical vectors that capture the semantic meaning and relationships of the text.",
      "D. Index each word from the documents into a search engine to enable keyword-based search."
    ],
    "correct": 2,
    "explanation": "Respuesta sugerida: C.",
    "discussion": [],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 327,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "low",
    "conflict": false,
    "discussionSummary": "Respuesta sugerida: C."
  },
  {
    "id": 328,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You need to load a dataset with multiple terabytes of clickstream data into BigQuery. The data arrives each day as compressed JSON files in a Cloud Storage bucket. You need a low-cost, programmatic, and scalable solution to load the data into BigQuery. What should you do?",
    "options": [
      "A. Create an external table in BigQuery pointing to the Cloud Storage bucket and run the INSERT INTO ... SELECT * FROM external_table command.",
      "B. Use the BigQuery Data Transfer Service from Cloud Storage.",
      "C. Create a Cloud Run function to run a Python script to read and parse each JSON file, and use the BigQuery streaming insert API.",
      "D. Use Cloud Data Fusion to create a pipeline to load the JSON files into BigQuery."
    ],
    "correct": 1,
    "explanation": "B is correct. DTS uses free load jobs — you only pay for storage. Option A uses INSERT INTO...SELECT which is a query and charges per bytes scanned, making it expensive at multi-TB scale.",
    "discussion": [
      {
        "user": "hola_prep",
        "text": "why option A is correct\nLow-cost\nScalable\nProgrammatic"
      },
      {
        "user": "NickForDiscussions",
        "text": "Should be B. When you use BigQuery Data Transfer Service you don't pay for the load job, you only pay for the storage in BigQuery. If you go with Option A you are paying for the query plus the storage."
      }
    ],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 328,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "why option A is correct\nLow-cost\nScalable\nProgrammatic"
  },
  {
    "id": 329,
    "topic": "Storage",
    "difficulty": 2,
    "question": "Your Cloud Storage data lake has raw, processed, and historical data in different buckets. Data older than two years is rarely accessed, and all data must be retained for no longer than seven years. You are concerned about rising storage costs. How should you control costs for the historical data bucket?",
    "options": [
      "A. Write a script on a Compute Engine instance, triggered daily by Cloud Scheduler, to scan all objects and delete any older than seven years.",
      "B. Configure an Object Lifecycle Management rule to transition objects older than two years to the Archive storage class and eventually delete them after seven years.",
      "C. Enable the Autoclass feature on your Cloud Storage buckets and select Opt-in to object transitions to Coldline and Archive storage classes.",
      "D. Replicate the buckets to a different region with lower storage costs and configure an Object Lifecycle Management rule to delete objects after seven years."
    ],
    "correct": 1,
    "explanation": "Respuesta sugerida: B.",
    "discussion": [],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 329,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "low",
    "conflict": false,
    "discussionSummary": "Respuesta sugerida: B."
  },
  {
    "id": 332,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "You are designing BigQuery tables for large volumes of clickstream event data. Your data analyst team will most frequently query by specific event date ranges and filter by the user ID UUID. You want to optimize table structure for query cost and performance. What should you do?",
    "options": [
      "A. Partition the table by the user ID column and cluster the table by the event date column.",
      "B. Create an ingestion-time partitioned table and cluster it by the user ID column.",
      "C. Cluster the table by both the event date and the user ID columns.",
      "D. Partition the table by the event date column and cluster the table by user ID column."
    ],
    "correct": 3,
    "explanation": "Respuesta sugerida: D.",
    "discussion": [],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 332,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "low",
    "conflict": false,
    "discussionSummary": "Respuesta sugerida: D."
  },
  {
    "id": 338,
    "topic": "Security/DLP",
    "difficulty": 2,
    "question": "Your organization stores highly personal data in BigQuery and needs to comply with strict data privacy regulations. You need to ensure that sensitive data values are rendered unreadable whenever an employee leaves the organization. What should you do?",
    "options": [
      "A. Use column-level access controls with policy tags and revoke viewer permissions when employees leave the organization.",
      "B. Use dynamic data masking and revoke viewer permissions when employees leave the organization.",
      "C. Use customer-managed encryption keys (CMEK) and delete keys when employees leave the organization.",
      "D. Use AEAD functions and delete keys when employees leave the organization."
    ],
    "correct": 3,
    "explanation": "C is too complex",
    "discussion": [
      {
        "user": "DerfelCardarn",
        "text": "C is too complex"
      }
    ],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 338,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "C is too complex"
  },
  {
    "id": 344,
    "topic": "Spanner",
    "difficulty": 1,
    "question": "You are building a system to process financial transactions. The system must handle a high throughput of concurrent user operations and each operation requires low-latency reads and writes to individual records. You need to identify a storage solution that guarantees ACID compliance for the processed transactions. You want a Google Cloud managed service. What should you do?",
    "options": [
      "A. Select Bigtable.",
      "B. Select BigQuery.",
      "C. Select Cloud Storage.",
      "D. Select Spanner."
    ],
    "correct": 3,
    "explanation": "D: High performance for concurrent user operations: Capable of handling many operations simultaneously.",
    "discussion": [
      {
        "user": "jreale64",
        "text": "D: High performance for concurrent user operations: Capable of handling many operations simultaneously.\nLow-latency reads and writes to individual records: Optimized for fast transactional operations on specific records.\nEnsures ACID compliance: This is crucial for financial transactions (Atomicity, Consistency, Isolation, Durability).\nGoogle Cloud managed service: A serverless solution with minimal user management."
      }
    ],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 344,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "D: High performance for concurrent user operations: Capable of handling many operations simultaneously."
  },
  {
    "id": 345,
    "topic": "ML/AI",
    "difficulty": 2,
    "question": "You are preparing data to serve a sales demand prediction model. The training data undergoes several pre-processing steps, including scaling numerical features and one-hot encoding categorical features. The model is deployed on Vertex AI Endpoints. You need to prevent training-serving skew and ensure accurate predictions in production. You want a solution that is easy to implement. What should you do?",
    "options": [
      "A. Implement a custom handler within the Vertex AI Endpoint to automatically perform data transformations before the model makes a prediction.",
      "B. Replicate the exact same pre-processing logic in the inference pipeline that was used during model training.",
      "C. Store the raw, unprocessed data in a separate Cloud Storage bucket exclusively for serving.",
      "D. Ensure the serving data is a smaller, random sample of the training data."
    ],
    "correct": 0,
    "explanation": "Manually replicating preprocessing logic causes training-serving skew. A Custom Prediction Routine packages the exact transformations with the model to prevent this.",
    "discussion": [
      {
        "user": "jreale64",
        "text": "B: Training-serving skew occurs when the data used to train your model differs in its characteristics or processing from the data used for making predictions in production. The problem explicitly mentions preprocessing steps like scaling numerical features and one-hot encoding categorical features. If these transformations are not applied identically during inference as they were during training, the model will receive inconsistent input, leading to inaccurate predictions."
      }
    ],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 345,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "B: Training-serving skew occurs when the data used to train your model differs in its characteristics or processing from the data used for making predictions in production."
  },
  {
    "id": 346,
    "topic": "BigQuery",
    "difficulty": 2,
    "question": "Your retail company is concerned about their BigQuery analytics spend. The company runs several queries that require the use of the same aggregation for the store ID and real-time sales volume. You need to implement the optimal solution that minimizes analytics spend and returns faster results. What should you do?",
    "options": [
      "A. Create a new table from a CSV file with the repeated aggregation for the other queries to reference for faster processing.",
      "B. Create a materialized view to minimize repetitive computations.",
      "C. Use join acceleration with primary and foreign keys to increase query joining to live data.",
      "D. Leverage partitioning to minimize the number of bytes read."
    ],
    "correct": 1,
    "explanation": "B: Materialized views in BigQuery store the precomputed results of a query.",
    "discussion": [
      {
        "user": "jreale64",
        "text": "B: Materialized views in BigQuery store the precomputed results of a query. Unlike logical views, which execute the query every time they are referenced, materialized views store the result set and automatically update as data in the base tables changes."
      }
    ],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 346,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "B: Materialized views in BigQuery store the precomputed results of a query."
  },
  {
    "id": 348,
    "topic": "Dataplex",
    "difficulty": 2,
    "question": "You are designing a data lake on Google Cloud to store vast amounts of customer interaction data from various sources, such as websites, mobile apps, and social media. You need to ensure that this data, which arrives in different formats, is consistently cataloged and easy for data analysts to discover and use. You also want to perform basic data quality checks and transformations before the data is consumed by downstream applications. You need an automated and managed data governance solution. What should you do?",
    "options": [
      "A. Use Cloud Storage as the central repository. Use Vertex AI to classify and process the data and perform data quality checks.",
      "B. Stream all the data directly into BigQuery, where it is automatically cataloged and governed.",
      "C. Use Cloud Storage and BigQuery as repositories. Use Dataplex Universal Catalog for metadata discovery, data quality checks, and transformations.",
      "D. Use Cloud Storage as the central repository. Use a Cloud Run function to catalog, transform the data, and perform data quality checks."
    ],
    "correct": 2,
    "explanation": "C: Dataplex: It is a fully managed Google Cloud data fabric platform, specifically designed to unify data management, governance, and analytics across a data lake environment.",
    "discussion": [
      {
        "user": "jreale64",
        "text": "C: Dataplex: It is a fully managed Google Cloud data fabric platform, specifically designed to unify data management, governance, and analytics across a data lake environment. It automates data classification, metadata discovery, data quality, and provides a consistent governance layer."
      }
    ],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 348,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "C: Dataplex: It is a fully managed Google Cloud data fabric platform, specifically designed to unify data management, governance, and analytics across a data lake environment."
  },
  {
    "id": 349,
    "topic": "Data Migration",
    "difficulty": 2,
    "question": "You have several different unstructured data sources, within your on-premises data center as well as in the cloud. The data is in various formats, such as Apache Parquet and CSV. You want to centralize this data in Cloud Storage. You need to set up an object sink for your data that allows you to use your own encryption keys. You want to use a GUI-based solution. What should you do?",
    "options": [
      "A. Use BigQuery Data Transfer Service to move files into BigQuery.",
      "B. Use Storage Transfer Service to move files into Cloud Storage",
      "C. Use Dataflow to move files into Cloud Storage",
      "D. Use Cloud Data Fusion to move files into Cloud Storage."
    ],
    "correct": 1,
    "explanation": "Storage Transfer Service is purpose-built for transferring files to Cloud Storage with GUI and CMEK support. Data Fusion is an ETL tool, overkill and expensive for simple file centralization.",
    "discussion": [
      {
        "user": "22c1725",
        "text": "I would go with \"D\" since GUI is required."
      },
      {
        "user": "apoio.certificacoes.closer",
        "text": "I have read in previous questions that Transfer Services only uses CMEK in-transit.\nhttps://cloud.google.com/storage-transfer/docs/on-prem-security#in-flight"
      },
      {
        "user": "m_a_p_s",
        "text": "D - only Cloud Data Fusion is a GUI-based solution."
      },
      {
        "user": "skycracker",
        "text": "data fusion allows encryption"
      },
      {
        "user": "noiz",
        "text": "Is B incorrect?\nTransfer service + CloudKMS"
      }
    ],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 317,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "D - only Cloud Data Fusion is a GUI-based solution."
  },
  {
    "id": 350,
    "topic": "Security/DLP",
    "difficulty": 2,
    "question": "You are preparing an organization-wide dataset. You need to preprocess customer data stored in a restricted bucket in Cloud Storage. The data will be used to create consumer analyses. You need to follow data privacy requirements, including protecting certain sensitive data elements, while also retaining all of the data for potential future use cases. What should you do?",
    "options": [
      "A. Use the Cloud Data Loss Prevention API and Dataflow to detect and remove sensitive fields from the data in Cloud Storage. Write the filtered data in BigQuery.",
      "B. Use customer-managed encryption keys (CMEK) to directly encrypt the data in Cloud Storage. Use federated queries from BigQuery. Share the encryption key by following the principle of least privilege.",
      "C. Use Dataflow and the Cloud Data Loss Prevention API to mask sensitive data. Write the processed data in BigQuery.",
      "D. Use Dataflow and Cloud KMS to encrypt sensitive fields and write the encrypted data in BigQuery. Share the encryption key by following the principle of least privilege."
    ],
    "correct": 3,
    "explanation": "Data masking permanently replaces original values. Encrypting fields with Cloud KMS protects privacy while allowing authorized decryption later, retaining data for future use.",
    "discussion": [
      {
        "user": "HectorLeon2099",
        "text": "It's C. \"A\" removes data and retaining all is a requirement."
      },
      {
        "user": "22c1725",
        "text": "Not A since \"while also retaining all of the data\" is required."
      },
      {
        "user": "22c1725",
        "text": "Removing data will lead to unability to do study & consumer analyses. since it's likely all of consumer data is under PII."
      },
      {
        "user": "Nagamanikanta",
        "text": "option C\nwe can simply mask the data and process in biguery"
      }
    ],
    "source": "merged",
    "sourceExam": "professional-data-engineer",
    "sourceQuestionNumber": 319,
    "isRecent": true,
    "importBatch": "examtopics-2026-04",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "It's C."
  }
];
