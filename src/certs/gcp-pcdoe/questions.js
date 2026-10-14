export const QUESTIONS = [
  {
    "id": 233,
    "topic": "Org & IAM",
    "difficulty": 2,
    "question": "Your company is creating a new cloud-native Google Cloud organization. You expect this Google Cloud organization to first be used by a small number of departments and then expand to be used by a large number of departments. Each department has a large number of applications varying in size. You need to design the VPC network architecture. Your solution must minimize the amount of management required while remaining flexible enough for development teams to quickly adapt to their evolving needs. What should you do?",
    "options": [
      "A. Create a separate VPC for each department and connect the VPCs with VPC Network Peering.",
      "B. Create a separate VPC for each department and use Private Service Connect to connect the VPCs.",
      "C. Create a separate VPC for each application and use Private Service Connect to connect the VPCs.",
      "D. Create a separate VPC for each department and connect the VPCs with Cloud VPN."
    ],
    "correct": 0,
    "explanation": "VPC Network Peering between per-department VPCs gives private connectivity with minimal management and scales as departments grow.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 233,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; taken from validtests (2026) and slotted into the 226/231–239 gap.",
    "discussionSummary": "Shared VPC would be the textbook answer but is not offered; among the options, per-department VPCs joined by VPC Network Peering is the lowest-management full-mesh connectivity (Private Service Connect publishes individual services rather than connecting networks, and Cloud VPN adds gateways and tunnels to run).",
    "conceptSummary": "Org VPC design: per-department VPCs joined by peering.",
    "correctRationale": "Separate VPC per department provides isolation, and VPC Network Peering gives low-latency private connectivity between them — the lowest-management option offered (A). Shared VPC would be the textbook answer but is not among the options; Private Service Connect publishes individual services rather than connecting whole networks (B, C), and Cloud VPN adds gateways/tunnels to run (D).",
    "optionRationales": [
      "Correct: Per-department VPCs + Network Peering balances isolation, scale, and minimal management among the options offered.",
      "Wrong: Private Service Connect exposes individual services, not whole-network connectivity between VPCs.",
      "Wrong: A VPC per application multiplies management as the app count grows.",
      "Wrong: Cloud VPN is for hybrid/on-prem connectivity and adds tunnels to maintain."
    ]
  },
  {
    "id": 232,
    "topic": "Deployment Strategies",
    "difficulty": 2,
    "question": "You are designing a continuous delivery (CD) strategy for a new serverless application. The application is packaged as a container image, stored in Artifact Registry, and deployed to Cloud Run. Your design requires a staging environment, a fully-managed Google Cloud service, mandatory manual approval for production deployments, and a phased rollout to production. Your solution should minimize administrative overhead. What should you do?",
    "options": [
      "A. Use Cloud Deploy to define a single delivery pipeline that promotes a release between a staging target and a production target. Configure the production target to require approval and to automatically execute a phased rollout that incrementally shifts traffic.",
      "B. Use a Cloud Build trigger to initiate a GitOps workflow. Configure the trigger to update a manifest in a Git repository, which a controller on a GKE Autopilot cluster then synchronizes to manage a phased traffic rollout to the new revision.",
      "C. Use a Cloud Build trigger to create a multi-stage pipeline. Configure the trigger to require approval before starting the build. Use the deploy command with the --traffic flag to incrementally shift traffic to the new revision in production.",
      "D. Define two separate Cloud Deploy pipelines. Configure the first pipeline to deploy to staging, and configure the second pipeline to trigger and execute a phased, canary rollout to the production Cloud Run service."
    ],
    "correct": 0,
    "explanation": "A single Cloud Deploy pipeline with staging→production targets, an approval requirement, and a phased rollout is the managed, low-overhead design.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 232,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; taken from myexamcollection (2026) and slotted into the 226/231–239 gap.",
    "discussionSummary": "",
    "conceptSummary": "Cloud Deploy delivery pipeline: approval gate + phased rollout for Cloud Run.",
    "correctRationale": "The requirements — staging, fully-managed service, manual approval, phased rollout — are all native Cloud Deploy features: one pipeline promotes the release between a staging and a production target, the prod target requires approval, and a phased rollout shifts traffic incrementally (A). GitOps via Cloud Build+GKE controller (B) or a custom multi-stage Cloud Build pipeline (C) is more admin overhead; two separate pipelines (D) is unnecessary duplication.",
    "optionRationales": [
      "Correct: One Cloud Deploy pipeline with an approval-gated production target and phased rollout meets every requirement natively.",
      "Wrong: A GitOps controller on GKE adds infrastructure the question's 'fully-managed' requirement rules out.",
      "Wrong: Trigger approval happens before the build, not before production promotion, and the --traffic flag rollouts are manual.",
      "Wrong: Two pipelines split one lifecycle into two for no benefit."
    ]
  },
  {
    "id": 231,
    "topic": "Monitoring & Alerting",
    "difficulty": 2,
    "question": "You recently configured an App Hub application. You are able to see the managed instance group, backend service, and URL map listed in App Hub, but you do not see the forwarding rule. You must ensure that the forwarding rule is listed. What should you do?",
    "options": [
      "A. Attach the project containing the forwarding rule as an App Hub service project.",
      "B. Enable the App Hub API in the project containing the forwarding rule.",
      "C. Configure the forwarding rule to forward to the correct target proxy.",
      "D. Register the forwarding rule as a service in the application configuration."
    ],
    "correct": 3,
    "explanation": "App Hub treats load-balancer components like forwarding rules as services that must be registered into the application — registration makes it visible.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 231,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; taken from certshero, p2pexams, freecram and testpassed (2026) and slotted into the 226/231–239 gap.",
    "discussionSummary": "App Hub lists load-balancer components (forwarding rules, backend services, URL maps) as services, and each must be registered in the application; attaching the project would only apply if the forwarding rule lived in an unattached project, which the stem does not say.",
    "conceptSummary": "App Hub: forwarding rule must be registered as a service.",
    "correctRationale": "App Hub discovers some resources automatically but load-balancer components such as forwarding rules appear in the application only once registered as services in the application configuration (D). Attaching the project as a service project (A) applies only when the resource lives in an unattached project — the stem does not say that; enabling the API (B) would fail to list anything at all; reconfiguring the target proxy (C) changes traffic flow, not App Hub registration.",
    "optionRationales": [
      "Wrong: Attaching the project only helps if the forwarding rule lives in a project that is not already attached — not stated here.",
      "Wrong: Without the App Hub API enabled, nothing would be listed; the managed instance group, backend service, and URL map are already visible.",
      "Wrong: Repointing the target proxy changes the load balancer's behavior, not its registration in App Hub.",
      "Correct: Forwarding rules are registered as services in the App Hub application configuration — that is what makes them listed."
    ]
  },
  {
    "id": 230,
    "topic": "CI/CD Pipelines",
    "difficulty": 2,
    "question": "You are designing a containerized CI pipeline to minimize reliance on public upstream container registries and improve build reproducibility and security. You need to design a pipeline to cache all containerized dependencies while minimizing the required amount of manual effort and maintenance. What should you do?",
    "options": [
      "A. Step 1: Create a remote Docker repository for each upstream registry in Artifact Registry.\nStep 2: Access the container images in the CI pipeline through the remote repository.",
      "B. Step 1: Create a standard Docker repository for each upstream registry in Artifact Registry.\nStep 2: Upload the containers used in the build pipelines to the appropriate repositories.",
      "C. Step 1: Create a standard Docker repository for each upstream registry in Artifact Registry.\nStep 2: Create a central virtual Docker repository to serve the standard repositories.\nStep 3: Access the container images in the CI pipeline through the central repository.",
      "D. Step 1: Create a remote Docker repository for each upstream registry in Artifact Registry.\nStep 2: Create a central virtual Docker repository to serve the remote repositories.\nStep 3: Access the container images in the CI pipeline through the central repository."
    ],
    "correct": 3,
    "explanation": "Remote repos in Artifact Registry cache each upstream registry, and a virtual repo fronts them all — the pipeline hits one managed endpoint.",
    "discussion": [
      {
        "user": "BlackCoffee",
        "text": "Selected Answer: D. B & C use standard repositories. Standard repositories are for artifacts you build yourself. To use them as a cache, you would have to write manual scripts to pull public images, tag them, and upload them yourself—violating the requirement to \"minimize the required amount of manual effort.\" (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 230,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Caching upstream registries via remote + virtual repositories.",
    "correctRationale": "Artifact Registry remote repositories proxy and cache each upstream registry, and a virtual repository aggregates them behind one endpoint — the pipeline pulls everything through a single managed, cached source with no manual mirroring. Standard repositories (B, C) hold artifacts you build yourself, so using them as caches means manually pulling and re-pushing every dependency.",
    "optionRationales": [
      "Wrong: Without the virtual repo the pipeline still hits each remote repository separately.",
      "Wrong: Standard repos don't cache upstream — you'd hand-mirror every dependency into them.",
      "Wrong: Same standard-repo problem — the virtual layer doesn't fix the wrong repo type underneath.",
      "Correct: Remote repos cache upstreams and a virtual repo serves them through one endpoint — fully managed."
    ]
  },
  {
    "id": 229,
    "topic": "Supply Chain Security",
    "difficulty": 2,
    "question": "You have a CI/CD pipeline set up in Cloud Build that builds container images. These containers are stored in Artifact Registry. You need to ensure that only images built by the Cloud Build pipeline in your production project are deployed to your Google Kubernetes Engine (GKE) cluster. You want to minimize the amount of manual effort required for implementation and maintenance. What should you do?",
    "options": [
      "A. Enable Binary Authorization on the GKE cluster. Create a Cloud Run function triggered by Artifact Registry INSERT events to verify that pushed containers have the projects/PROJECT_ID/attestors/built-by-cloud-build attestor.",
      "B. Configure Artifact Registry to only allow the Cloud Build service account to push containers.",
      "C. Enable Binary Authorization on the GKE cluster. Create a Cloud Key Management Service (Cloud KMS) keyring and the built-by-cloud-build attestor. After Cloud Build pushes the container, use the key to create an attestation. Update the Binary Authorization policy to require the projects/PROJECT_ID/attestors/built-by-cloud-build attestor.",
      "D. Enable Binary Authorization on the GKE cluster. Configure the Binary Authorization policy to require the projects/PROJECT_ID/attestors/built-by-cloud-build attestor."
    ],
    "correct": 3,
    "explanation": "Cloud Build automatically creates the built-by-cloud-build attestor and signs attestations on push, so requiring that attestor in the Binary Authorization policy is all that's needed.",
    "discussion": [
      {
        "user": "nbeeckx",
        "text": "Selected Answer: C. D is incorrect. imply updating the Binary Authorization policy without creating the Cloud KMS key, configuring the attestor, and signing the built images via Cloud Build will cause all deployments to fail because no valid attestations exist for Binary Authorization to verify. (1 vote)"
      },
      {
        "user": "rage99",
        "text": "Selected Answer: D. D. Enable Binary Authorization on the GKE cluster. Configure the Binary Authorization policy to require the projects/PROJECT_ID/attestors/built-by-cloud-build attestor. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 229,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Community split C/D 50/50. Cloud Build natively generates attestations for the Google-managed built-by-cloud-build attestor when a build pushes an image, so the only setup is enabling Binary Authorization and requiring that attestor; C rebuilds the same thing by hand with your own KMS key and signing step, which is the extra manual effort the question rules out.",
    "conceptSummary": "Enforce pipeline-built images with the built-in built-by-cloud-build attestor.",
    "correctRationale": "To require only Cloud Build–produced images with minimal effort: Binary Authorization's built-by-cloud-build attestor is created automatically and Cloud Build signs the attestation when it pushes an image — enabling Binary Authorization and requiring that attestor in the policy is sufficient. Building your own KMS keyring and signing step (C) reimplements what Cloud Build does natively, the INSERT-trigger function (A) is DIY verification, and push restrictions (B) don't verify provenance at deploy time.",
    "optionRationales": [
      "Wrong: A Cloud Run function on INSERT events is self-built verification for a managed feature.",
      "Wrong: Restricting who can push does not attest which images were built by the pipeline at deploy time.",
      "Wrong: Creating your own keyring, attestor, and signing step duplicates what Cloud Build generates automatically.",
      "Correct: The built-by-cloud-build attestor is automatic; requiring it in the policy is the minimal-effort answer."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 228,
    "topic": "SLOs & Error Budgets",
    "difficulty": 1,
    "question": "Your team manages a critical service with a 99.9% availability SLO. The error budget for the quarter has been nearly depleted due to several incidents. Your team is planning on releasing new features next week. You need to ensure that you do not exceed the error budget while following Google-recommended practices. What should you do?",
    "options": [
      "A. Release the features but implement an automatic rollback if new errors occur.",
      "B. Release the features sequentially for each subset of users to minimize potential impact on the SLO.",
      "C. Postpone the feature release and focus on reliability improvements until the error budget refreshes.",
      "D. Postpone the feature release and focus on building a backlog of features to deploy until the error budget refreshes."
    ],
    "correct": 2,
    "explanation": "A nearly spent error budget means the policy kicks in: hold feature releases and spend engineering on reliability until the budget refreshes.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 228,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Error-budget freeze: reliability work until budget resets.",
    "correctRationale": "Google's error-budget model pre-commits to consequences: when the budget is nearly exhausted, the team stops feature launches and redirects effort to reliability until the budget renews. Rolling out anyway — even sequentially or with auto-rollback — still spends budget the service doesn't have; backlog-building (D) is the same launch delayed, without the reliability work.",
    "optionRationales": [
      "Wrong: Releasing with auto-rollback still consumes error budget on each incident.",
      "Wrong: Phased rollout reduces blast radius but still ships during a freeze.",
      "Correct: The error-budget policy's point is holding launches and pivoting to reliability work.",
      "Wrong: Stockpiling features does not address reliability — the budget problem stays."
    ]
  },
  {
    "id": 227,
    "topic": "Supply Chain Security",
    "difficulty": 2,
    "question": "Your company is implementing supply chain security controls for its containerized applications running in Google Kubernetes Engine (GKE). You need to be able to trace container images used in production back to their source and build processes. Your solution must follow Google-recommended practices for software supply chain security. What should you do?",
    "options": [
      "A. Store all build artifacts in Artifact Registry, and enable automatic vulnerability scanning.",
      "B. Enable the Container Analysis API. Configure Cloud Build to use only official base images, and enable automatic vulnerability scanning.",
      "C. Use Container-Optimized OS for all GKE node pools, enable Binary Authorization in the GKE cluster, and enable automatic security updates.",
      "D. Enable the Container Analysis API. Configure Cloud Build to generate and sign provenance attestations for each build. Configure Binary Authorization to verify the attestations before deployment."
    ],
    "correct": 3,
    "explanation": "Provenance attestations signed at build time and verified by Binary Authorization give traceability from deployed image back to source and build.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 227,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Image provenance: Container Analysis + signed attestations + Binary Authorization.",
    "correctRationale": "Tracing production images back to source and build process is what provenance attestations provide: Cloud Build generates and signs SLSA-style provenance for each build, Artifact Analysis stores it, and Binary Authorization verifies attestations at deploy time. Options A/B only store/scan artifacts, and C is about node security posture — none links an image to its source and build.",
    "optionRationales": [
      "Wrong: Artifact storage plus scanning gives no provenance linking image to source/build.",
      "Wrong: Official base images + scanning is hygiene, not build provenance or traceability.",
      "Wrong: COS nodes + Binary Authorization is cluster hardening; it does not trace images to their build.",
      "Correct: Generated+signed provenance plus Binary Authorization verification establishes the source-to-deploy chain."
    ]
  },
  {
    "id": 225,
    "topic": "Supply Chain Security",
    "difficulty": 1,
    "question": "You are designing a secure Cloud Build pipeline for a web application that requires access to a package manager. The package manager credentials are highly sensitive and need to be protected from unauthorized access. You need to design a solution to securely retrieve credentials at build time following Google-recommended practices. You also want to keep maintenance overhead to a minimum. What should you do?",
    "options": [
      "A. Grant the roles/cloudkms.cryptoKeyDecrypter role to the Cloud Build service account. Store Cloud Key Management Service (Cloud KMS) encrypted data in a build config file. Specify the secret under the secrets field.",
      "B. Grant the roles/cloudkms.cryptoKeyDecrypter role to the Cloud Build service account. Store Cloud Key Management Service (Cloud KMS) encrypted data in a build config file. Specify the secret under the availableSecrets.inline field.",
      "C. Grant the roles/secretmanager.secretAccessor role to the Cloud Build service account used for the build. Specify the secret under the availableSecrets.secretManager field.",
      "D. Use base64-encrypted data in a web application's source control repository. Decrypt and use the secret during the build."
    ],
    "correct": 2,
    "explanation": "Secret Manager via availableSecrets.secretManager is the current Google-recommended way to inject secrets into Cloud Build — no ciphertext in the config.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 225,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Build-time secrets via Secret Manager integration.",
    "correctRationale": "The recommended pattern: store the credentials in Secret Manager, grant the build's service account secretAccessor, and reference the secret under availableSecrets.secretManager — nothing sensitive lands in the config file. The KMS/inline patterns (A, B) are the older mechanism and keep ciphertext in the repo; base64 in source control (D) is not encryption and is a serious leak vector.",
    "optionRationales": [
      "Wrong: The 'secrets' field is the legacy KMS-in-config mechanism — ciphertext still lives in the build config.",
      "Wrong: availableSecrets.inline embeds KMS ciphertext in the config; Secret Manager is cleaner and the recommended path.",
      "Correct: secretAccessor + availableSecrets.secretManager references the secret without storing it anywhere sensitive.",
      "Wrong: Base64 is encoding, not encryption — credentials in source control are exposed."
    ]
  },
  {
    "id": 224,
    "topic": "CI/CD Pipelines",
    "difficulty": 2,
    "question": "You are configuring a Cloud Deploy pipeline to deploy an application to Google Kubernetes Engine (GKE). The application is deployed as a Deployment. You need to configure the Deployment so that there are two replicas in the development environment and five replicas in the production environment. You must ensure that all other configuration parameters are consistent between environments. You also need to minimize developmental overhead when updating the manifests in the future. How should you configure the skaffold.yaml file?",
    "options": [
      "A. Create multiple profiles, and configure the manifests.kustomize section.",
      "B. Create a single profile, and configure the manifests.kustomize section.",
      "C. Create multiple profiles, and configure the manifests.rawYaml section.",
      "D. Create a single profile, and configure the manifests.rawYaml section."
    ],
    "correct": 0,
    "explanation": "Multiple Skaffold profiles select a per-environment kustomize overlay that sets replica counts while the shared base keeps everything else consistent.",
    "discussion": [
      {
        "user": "BlackCoffee",
        "text": "Selected Answer: A. multiple profiles for dev and prod, manifests.kustomize to change the replicas count for development and production (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 224,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Per-env replica counts via Skaffold profiles + kustomize overlays.",
    "correctRationale": "Two environments need different replica counts but otherwise identical manifests — Skaffold profiles let each Cloud Deploy stage activate a different kustomize overlay (dev=2, prod=5 replicas) while the base stays shared, so future manifest edits happen once. A single profile cannot vary by environment, and rawYaml serves unrendered manifests with no per-env parameterization.",
    "optionRationales": [
      "Correct: One profile per environment plus manifests.kustomize overlays varies replicas while keeping the base manifest shared.",
      "Wrong: A single profile produces the same manifests for both environments — no per-env replica count.",
      "Wrong: rawYaml lists manifests verbatim; it gives no per-environment parameterization.",
      "Wrong: rawYaml with one profile both lacks parameterization and cannot differ across environments."
    ]
  },
  {
    "id": 223,
    "topic": "Monitoring & Alerting",
    "difficulty": 1,
    "question": "Your company has applications running in a private VPC without internet access. There are internal APIs that are only accessible within your VPC network. You need to monitor the availability of these internal APIs with a solution that follows Google-recommended practices to minimize the amount of manual effort and maintenance required. What should you do?",
    "options": [
      "A. Deploy the application on a Google Kubernetes Engine (GKE) instance configured with a liveness and readiness probe.",
      "B. Configure private uptime checks.",
      "C. Create a Cloud Run function with a VPC connector to ping the internal endpoints. Configure public uptime checks against the Cloud Run function.",
      "D. Create a synthetic monitor, and use Cloud VPN to access the private endpoints."
    ],
    "correct": 1,
    "explanation": "Private uptime checks are Cloud Monitoring's managed way to probe resources reachable only inside a VPC — no self-built machinery.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 223,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Managed internal availability monitoring via private uptime checks.",
    "correctRationale": "The requirement — availability monitoring of VPC-internal APIs with minimal manual effort — is exactly what private uptime checks provide: Cloud Monitoring probes the internal endpoints using Private Service Connect, with no internet exposure and nothing to maintain. Probes (A) cover one workload's health, a Cloud Run function proxy (C) is a DIY shim plus a public exposure, and a synthetic monitor over Cloud VPN (D) adds VPN infrastructure to run.",
    "optionRationales": [
      "Wrong: Liveness/readiness probes cover a single GKE workload, not availability of arbitrary internal APIs.",
      "Correct: Private uptime checks monitor VPC-internal endpoints as a managed feature — minimal effort.",
      "Wrong: Routing a public uptime check through a Cloud Run function exposes an endpoint publicly and adds a component to maintain.",
      "Wrong: A synthetic monitor plus Cloud VPN adds connectivity infrastructure to operate where a native feature exists."
    ]
  },
  {
    "id": 222,
    "topic": "Troubleshooting & APM",
    "difficulty": 2,
    "question": "You are investigating slow Apigee responses for API calls to the orders proxy in the Production environment. The proxy uses multiple services running in Google Kubernetes Engine (GKE) with Cloud Service Mesh. You need to determine the root cause of the latency issues without impacting the performance of the other exposed services. What should you do?",
    "options": [
      "A. Enable distributed tracing in the Production environment. Use Cloud Trace to check each span, and identify the service causing increased latency.",
      "B. Use Cloud Monitoring with the Apigee target latencies metric to identify the service causing increased latency.",
      "C. Use Cloud Logging to view the logs from different backends to identify the service causing increased latency.",
      "D. Enable distributed tracing on Apigee with the configuration to trace only the orders proxy. Use Cloud Trace to check each span, and identify the service causing increased latency."
    ],
    "correct": 3,
    "explanation": "Scoped distributed tracing on just the orders proxy isolates the slow service without touching the other services' performance.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 222,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Per-proxy tracing in Apigee to localize GKE latency.",
    "correctRationale": "The requirement is to find the slow service while not impacting the other proxies: enable Apigee's distributed tracing scoped to the orders proxy only, then inspect spans in Cloud Trace. Tracing all of production (A) impacts every proxy; the Apigee target-latency metric (B) shows latency by target but not the per-service root cause; logs (C) require manual correlation.",
    "optionRationales": [
      "Wrong: Enabling tracing environment-wide adds overhead to every service, violating the no-impact constraint.",
      "Wrong: The Apigee latency metric identifies which service is slow only at a coarse level — no per-service spans.",
      "Wrong: Correlating backend logs manually is slow and does not give the causal span breakdown.",
      "Correct: Tracing only the orders proxy gives a per-span latency breakdown with no impact to other services."
    ]
  },
  {
    "id": 221,
    "topic": "Monitoring & Alerting",
    "difficulty": 3,
    "question": "You are establishing a centralized platform to monitor your applications. Your applications are currently running on Kubernetes clusters on-premises and in the cloud across multiple Google Cloud projects. You want to enable developers to monitor both infrastructure and application metrics using OpenTelemetry across on-premises and Google Cloud environments. At the same time, you want to keep the operation easy to support and integrate all metrics into a single place. What should you do?",
    "options": [
      "A. Implement a sidecar OpenTelemetry Collector alongside each Pod in all Kubernetes clusters (on-premises and GKE). Configure these collectors to export Prometheus-formatted metrics. Use dedicated Prometheus instances in each Kubernetes cluster and Thanos in a central GKE cluster. Install Grafana on a GKE cluster, and use Grafana to monitor the applications.",
      "B. Create a scoping project and add all the Google Cloud projects to it. Use Bindplane to streamline OpenTelemetry metric collection for the on-premises Kubernetes clusters into Cloud Monitoring.",
      "C. Create a new Google Cloud project to use as a scoping project and add all the other Google Cloud projects to it. Instrument the applications running on-premises to export the metrics to Cloud Monitoring as user-defined metrics. Use Cloud Monitoring to monitor the applications.",
      "D. Enable Google Cloud Managed Service for Prometheus collections by using the OpenTelemetry Collector on the Google Kubernetes Engine (GKE) clusters, and enable non-managed Prometheus for the on-premises Kubernetes clusters. Install Grafana on a GKE cluster, and use Grafana to monitor the applications."
    ],
    "correct": 1,
    "explanation": "A scoping project plus Bindplane centralizes OpenTelemetry metrics from on-prem and cloud Kubernetes into Cloud Monitoring with the least ops.",
    "discussion": [
      {
        "user": "BlackCoffee",
        "text": "Selected Answer: B. BindPlane is built natively on the OpenTelemetry standard and Google's preferred option. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 221,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Centralized OTel metrics across hybrid Kubernetes via Bindplane + metrics scope.",
    "correctRationale": "The requirements — OpenTelemetry across on-prem and cloud Kubernetes, easy to operate, one place for all metrics — fit a Cloud Monitoring metrics scope (a scoping project gathering the GCP projects) plus Bindplane, Google's managed OTel collector control plane, streaming the on-prem metrics into Cloud Monitoring. Per-cluster sidecars + Thanos/Grafana or self-managed Prometheus stack is the heavy DIY path; user-defined metrics only cover the on-prem side awkwardly.",
    "optionRationales": [
      "Wrong: Sidecars + per-cluster Prometheus + Thanos + Grafana is a large self-operated stack — the opposite of easy operations.",
      "Correct: Scoping project centralizes the GCP side and Bindplane manages the OTel collection from on-prem into Cloud Monitoring.",
      "Wrong: Writing on-prem metrics as user-defined metrics loses Prometheus/OTel semantics and adds custom mapping work.",
      "Wrong: GMP for GKE plus separate non-managed Prometheus on-prem leaves you running a second stack and Grafana yourself."
    ]
  },
  {
    "id": 220,
    "topic": "Performance & Cost",
    "difficulty": 1,
    "question": "You are onboarding your company's marketing department to Google Cloud. The marketing department is managing the development, but you want to monitor all spending and be alerted if the marketing budget is exceeded. What should you do?",
    "options": [
      "A. Create all Google Cloud projects. Create one budget alert for each project with the total budget split by the number of projects as the limit.",
      "B. Create all Google Cloud projects under a new marketing folder. Create one budget alert for each project with the total budget as the limit.",
      "C. Create all Google Cloud projects under a new marketing folder. Create one budget alert at folder level with the total budget as the limit.",
      "D. Create all the Google Cloud projects. Create one budget alert for each project with the total budget as the limit."
    ],
    "correct": 2,
    "explanation": "A folder groups the marketing projects and a single folder-level budget alert fires when the department's combined spend exceeds the limit.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 220,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Department-wide spend alerting via a folder-level budget.",
    "correctRationale": "To monitor total marketing spend across projects, group them under a folder and set one budget at folder level with the total as the limit — one alert covers the whole department. Per-project budgets split (A) or duplicated (B, D) the limit and cannot fire on combined spend.",
    "optionRationales": [
      "Wrong: Splitting the limit across projects lets the department overspend without tripping any single alert.",
      "Wrong: A per-project budget set to the full total fires only when one project exceeds the entire limit.",
      "Correct: One folder-level budget with the total limit covers all marketing projects' combined spend.",
      "Wrong: Without the folder grouping, a single alert cannot aggregate across projects."
    ]
  },
  {
    "id": 219,
    "topic": "Supply Chain Security",
    "difficulty": 3,
    "question": "You have an external application that sends encrypted files to a Cloud Storage bucket. These files are encrypted with an HMAC-SHA256 key, and contain sensitive data that needs to be loaded into BigQuery for analysis every day after midnight. You need to build a secure and automated solution to decrypt these files and load them into BigQuery. You want to follow Google-recommended practices, while minimizing the required development effort. What should you do?",
    "options": [
      "A. Step 1: Import the encryption key into the same Cloud Storage bucket.\nStep 2: Create a Cloud Build pipeline that decrypts the file before loading the file into BigQuery.\nStep 3: Create a Cloud Scheduler trigger that runs every day at the required time.",
      "B. Step 1: Create a Cloud Key Management Service (Cloud KMS) key ring and import the encryption key.\nStep 2: Create an Artifact Registry repository, and push the image containing the script to the Artifact Registry repository.\nStep 3: Create a Cloud Run job that executes the image on a schedule.\nStep 4: Grant the Cloud Run service agent the Cloud KMS CryptoKey Encrypter/Decrypter role.",
      "C. Step 1: Create a Cloud Key Management Service (Cloud KMS) key ring and import the encryption key.\nStep 2: Create a Cloud Build trigger that uses Cloud KMS to decrypt the file before loading the file into BigQuery.\nStep 3: Create a Cloud Scheduler trigger that runs every day at the required time.",
      "D. Step 1: Import the encryption key into the same Cloud Storage bucket.\nStep 2: Create a script that pulls the key from Cloud Storage and decrypts the file.\nStep 3: Create an Artifact Registry repository containerize the script and push the container to the Artifact Registry repository.\nStep 4: Create a Cloud Run job that executes on a schedule."
    ],
    "correct": 1,
    "explanation": "Despite the flawed wording, B is the only option keeping the key in Cloud KMS and running the job serverlessly on a schedule.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 219,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Flawed premise: HMAC-SHA256 is a signing algorithm, not an encryption cipher; read it as 'a key imported into Cloud KMS'. In B the role should go to the Cloud Run job's runtime service account rather than the service agent, but it is still the only option that keeps the key in KMS and runs the job serverlessly on a schedule.",
    "conceptSummary": "KMS + scheduled Cloud Run job for automated decrypt-and-load.",
    "correctRationale": "HMAC-SHA256 is a signing algorithm, not an encryption cipher — read it as 'a key imported into Cloud KMS'. B is the only fully secure pattern: KMS holds the key, a containerized Cloud Run job runs on a schedule, and the CryptoKey Encrypter/Decrypter role grants the decrypt permission. A and C put the key into Cloud Storage; A/C also add a Cloud Build stage for a runtime task. (Note: the role ideally goes to the job's runtime service account, not the service agent.)",
    "optionRationales": [
      "Wrong: Storing the key in the same bucket as the ciphertext defeats the encryption.",
      "Correct: Key in KMS + scheduled Cloud Run job is the only design that keeps the key protected and automates the pipeline serverlessly.",
      "Wrong: Cloud Build decrypting on a trigger keeps key material in a CI tool and skips KMS custody.",
      "Wrong: Storing the key in the bucket and pulling it in a script is plaintext-adjacent and insecure."
    ]
  },
  {
    "id": 218,
    "topic": "Monitoring & Alerting",
    "difficulty": 1,
    "question": "You are investigating an ongoing anomaly involving a high number of requests. You created a custom dashboard on Cloud Monitoring and identified that the requests are originating by a single type of client. You want to enable your company's development team to further investigate the issue by using your custom dashboard. You want to follow Google-recommended practices. What should you do?",
    "options": [
      "A. Export the custom dashboard as a JSON file and share the file with the development team.",
      "B. Export the dashboard time series data in CSV format. Instruct the development team to use BigQuery to analyze the data.",
      "C. Grant the development team the roles/monitoringViewer IAM role at the project level and share the custom dashboard URL with the development team.",
      "D. Grant the development team the roles/viewer IAM role at the project level and share the custom dashboard URL with the development team."
    ],
    "correct": 2,
    "explanation": "Share the dashboard URL and give the devs Monitoring Viewer on the project — the supported way to let them use the dashboard.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 218,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Sharing a Cloud Monitoring dashboard with IAM read access.",
    "correctRationale": "To let the development team investigate with the dashboard: grant roles/monitoringViewer at the project level (least privilege for viewing Monitoring) and share the dashboard URL. JSON export (A) is a static copy; CSV + BigQuery (B) is a different workflow; roles/viewer (D) is broader than needed.",
    "optionRationales": [
      "Wrong: A JSON export gives a static snapshot the devs would have to import — heavier than URL + IAM.",
      "Wrong: CSV + BigQuery changes the analysis workflow entirely.",
      "Correct: monitoringViewer + dashboard URL gives them live access with least privilege.",
      "Wrong: roles/viewer grants broader read than monitoringViewer — not least-privilege."
    ]
  },
  {
    "id": 217,
    "topic": "Performance & Cost",
    "difficulty": 2,
    "question": "You recently created a project to deploy multiple applications on Compute Engine VM instances, across multiple regions. While you expect the total number of instances will not decrease, you anticipate that you might need to alter the allocation of instances across regions in the future. You want to minimize running costs for this multi-year project. What should you do?",
    "options": [
      "A. Create a resource-based committed use discount for a 3-year term.",
      "B. Create a compute flexible committed use discount for a 3-year term with reservations.",
      "C. Create a compute flexible committed use discount for a 3-year term.",
      "D. Create a resource-based committed use discount for a 1-year term."
    ],
    "correct": 2,
    "explanation": "A compute flexible committed use discount for 3 years covers any region/machine mix — the multi-year commitment gets the deepest savings while keeping regional flexibility.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 217,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Multi-year, region-flexible CUDs for shifting regional allocation.",
    "correctRationale": "The project is multi-year with a fixed total count but variable regional allocation — a compute flexible CUD for 3 years applies to any machine family and region, getting maximum savings without region lock-in. Resource-based CUDs (A, D) bind to a specific machine family/region; flexible with reservations (B) adds unnecessary reservation machinery.",
    "optionRationales": [
      "Wrong: Resource-based CUDs bind to one region/machine type — wrong when allocation shifts between regions.",
      "Wrong: Adding reservations is unnecessary machinery for a count-stable pool.",
      "Correct: A 3-year compute flexible CUD applies across regions and machine families — the flexible, cheap fit.",
      "Wrong: A 1-year resource-based CUD gives less savings and less flexibility than a 3-year flexible one."
    ]
  },
  {
    "id": 216,
    "topic": "Infrastructure as Code",
    "difficulty": 2,
    "question": "Your company uses a Google Kubernetes Engine (GKE) cluster for each environment staging and production. You need to configure cluster release channels following Google-recommended practices. You want to maximize cluster stability over availability of the latest features. What should you do?",
    "options": [
      "A. Configure the production cluster to use the Stable release channel, and configure the staging cluster to use the Regular release channel.",
      "B. Configure the production cluster to use the Extended release channel, and configure the staging cluster to use the Rapid release channel.",
      "C. Configure the production cluster to use the Stable release channel, and configure the staging cluster to use the Stable release channel.",
      "D. Configure the production cluster to use the Regular release channel, and configure the staging cluster to use the Regular release channel."
    ],
    "correct": 2,
    "explanation": "Current guidance: enroll both environments in the same channel (Stable for stability) and rely on rollout sequencing to qualify versions before production.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 216,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Current GKE upgrade best practices recommend enrolling every environment in the same release channel and using rollout sequencing so staging qualifies each version before production; Stable maximizes stability. Older guidance of running staging one channel ahead (A) is no longer the recommendation.",
    "conceptSummary": "GKE release channels: same Stable channel, rollout sequencing.",
    "correctRationale": "Current GKE best practice is to enroll all environments in the same release channel and use rollout sequencing so a version is soaked in staging before production adopts it. Stable maximizes stability over newest features, matching the requirement — the older 'staging one channel ahead' pattern (A) is no longer recommended.",
    "optionRationales": [
      "Wrong: Staging-on-Regular is the older practice; same channel with rollout sequencing is now recommended.",
      "Wrong: Extended/Rapid prioritize feature availability over the stated stability goal.",
      "Correct: Both clusters on Stable plus rollout sequencing maximizes stability per current guidance.",
      "Wrong: Regular prioritizes newer features over maximum stability."
    ]
  },
  {
    "id": 215,
    "topic": "Monitoring & Alerting",
    "difficulty": 3,
    "question": "Your company is trying to centralize all monitoring and alerting capabilities. Your VPC network has an internally exposed webhook you can call to trigger alerts. You need to integrate your Google Cloud alerts to call this webhook. You want to minimize costs while following Google-recommended practices. What should you do?",
    "options": [
      "A. Configure a new Pub/Sub notification channel with a new topic. Create a pull subscription to consume the events.",
      "B. Configure a new Pub/Sub notification channel with a new topic. Create a push subscription with the webhook as a subscriber to get the events.",
      "C. Configure a new webhook notification channel. Edit your alerting policies to use the new notification channel to propagate the events.",
      "D. Configure a new Pub/Sub notification channel with a new topic. Create a new Cloud Run function with direct VPC egress to write the events to the internal endpoint. Create a push subscription with the Cloud Run function as a subscriber to get the events."
    ],
    "correct": 3,
    "explanation": "Webhook channels and Pub/Sub push can only reach public HTTPS endpoints — a Cloud Run function with VPC egress is the internal relay.",
    "discussion": [
      {
        "user": "a36df5b",
        "text": "Selected Answer: D. D. Configure a new Pub/Sub notification channel with a new topic. Create a new Cloud Run function with direct VPC egress to write the events to the internal endpoint. Create a push subscription with the Cloud Run function as a subscriber to get the events. (2 votes)"
      },
      {
        "user": "keerthi08",
        "text": "Selected Answer: D. The correct answer is *D*. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 215,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Routing alert notifications to an internal VPC webhook.",
    "correctRationale": "Notification channels (webhook, Pub/Sub push) only call publicly reachable HTTPS endpoints — an internal VPC webhook cannot be reached directly. The minimal-cost bridge: Pub/Sub notification channel → push subscription → a Cloud Run function with direct VPC egress that POSTs to the internal endpoint. Pull subscription needs a poller; a webhook channel cannot reach inside the VPC.",
    "optionRationales": [
      "Wrong: A pull subscription requires something to run and poll it — no delivery to the webhook happens by itself.",
      "Wrong: A push subscription can only call a publicly reachable HTTPS endpoint — not an internal VPC webhook.",
      "Wrong: Webhook notification channels likewise require a public endpoint.",
      "Correct: Pub/Sub → push → Cloud Run function with VPC egress relays the alert into the internal network at minimal cost."
    ]
  },
  {
    "id": 214,
    "topic": "Deployment Strategies",
    "difficulty": 1,
    "question": "You have an application deployed to Cloud Run. A new version of the application has recently been deployed using the canary deployment strategy. Your Site Reliability Engineering (SRE) teammate informs you that an SLO has been exceeded for this application. You need to make the application healthy as quickly as possible. What should you do first?",
    "options": [
      "A. Configure traffic splitting to send 100% of the traffic to the latest revision.",
      "B. Configure traffic splitting to send 100% of the traffic to the previous revision.",
      "C. Create a new revision using the last known good version of the application.",
      "D. Identify the cause of the latency by using Cloud Trace."
    ],
    "correct": 1,
    "explanation": "The canary is failing the SLO — send 100% of traffic back to the previous revision immediately.",
    "discussion": [
      {
        "user": "BlackCoffee",
        "text": "Selected Answer: B. y updating Cloud Run's traffic splitting configuration to route 100% of traffic back to the previous stable revision, you instantly remove the faulty canary version from the traffic pool. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 214,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Fastest mitigation for a bad canary: full rollback via traffic split.",
    "correctRationale": "To make the application healthy as quickly as possible, restore the known-good revision: move traffic splitting to 100% previous revision. Sending all traffic to the latest revision (A) worsens it; creating a new revision (C) is slower; Cloud Trace investigation (D) is diagnosis, not mitigation.",
    "optionRationales": [
      "Wrong: 100% on the latest revision maximizes exposure to the failing version.",
      "Correct: 100% traffic to the previous revision restores healthy behavior immediately.",
      "Wrong: A new revision of the known-good code is slower than repointing traffic.",
      "Wrong: Diagnosis comes after mitigation — traffic must move first."
    ]
  },
  {
    "id": 213,
    "topic": "Monitoring & Alerting",
    "difficulty": 2,
    "question": "You have multiple applications exposed on a load balancer, and you are monitoring blocked requests by Google Cloud Armor. You need to create a dashboard to monitor requests for https://mountkirk.com/api only. You want to identify the parameters that are being blocked. What should you do?",
    "options": [
      "A. Step 1: Create a log-based counter metric with filters for configuredAction=ALLOW and requestUrl=~\"^https://mountkirk.com/api\".\nStep 2: Create a dashboard in Cloud Monitoring with the new metric, with an aggregation on matchedFieldName.",
      "B. Step 1: Create a log-based metric with the Boolean metric type with the filter configuredAction=BLOCKED.\nStep 2: Create a dashboard in Cloud Monitoring with the new metric, with an aggregation on matchedFieldName.",
      "C. Step 1: Create a log-based counter metric with filters for configuredAction=BLOCKED and requestUrl=~\"^https://mountkirk.com/api\".\nStep 2: Create a dashboard in Cloud Monitoring with the new metric, with an aggregation on matchedFieldName.",
      "D. Step 1: Create a dashboard in Cloud Monitoring by using the networksecurity.googleapis.com metric with the https/request_count type.\nStep 2: Filter the blocked parameter as true."
    ],
    "correct": 2,
    "explanation": "A log-based counter filtered to BLOCKED requests on the API URL, aggregated by matchedFieldName, shows which parameters are being blocked.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 213,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Cloud Armor blocked-request analysis via a filtered log-based counter.",
    "correctRationale": "To see which parameters are blocked for one URL: filter logs to configuredAction=BLOCKED plus the requestUrl regex for mountkirk.com/api, count them with a counter log-based metric, then dashboard with an aggregation on matchedFieldName to break out the parameter responsible. Boolean metrics (B) don't count; ALLOW (A) monitors the wrong direction; the Cloud Armor metric (D) lacks per-field attribution.",
    "optionRationales": [
      "Wrong: Filtering on ALLOW would monitor permitted requests, not the blocked ones.",
      "Wrong: A Boolean metric records true/false, not a countable series.",
      "Correct: Counter metric filtered on BLOCKED + the URL regex, aggregated by matchedFieldName — shows the blocked parameters.",
      "Wrong: The Cloud Armor metric gives counts but not the matched field/parameter detail."
    ]
  },
  {
    "id": 212,
    "topic": "Supply Chain Security",
    "difficulty": 2,
    "question": "You are setting up a CI/CD pipeline to containerize an application. You must ensure that you only push containers to Artifact Registry if there are no critical vulnerabilities. You also want to reduce the effort required to maintain the pipeline. What should you do?",
    "options": [
      "A. Create a script using a VM to build and push the container to Artifact Registry. After pushing the container, use automatic scanning in Artifact Analysis to check for critical vulnerabilities. Delete the container if critical vulnerabilities are detected.",
      "B. Use Cloud Build to build the container. Use On-Demand Scanning in Artifact Analysis to check for critical vulnerabilities before pushing the image to Artifact Registry.",
      "C. Install Jenkins on a VM and create a pipeline to build the container. Use On-Demand Scanning in Artifact Analysis to check for critical vulnerabilities before pushing the container to Artifact Registry.",
      "D. Use Cloud Build to build the container. After pushing the container to Artifact Registry, use automatic scanning in Artifact Analysis to check for critical vulnerabilities. Delete the container if critical vulnerabilities are detected."
    ],
    "correct": 1,
    "explanation": "Cloud Build builds the image and Artifact Analysis On-Demand Scanning scans it before push — nothing reaches the registry unvetted.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 212,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Pre-push vulnerability gating with On-Demand Scanning.",
    "correctRationale": "The requirement is to push only clean images, so scanning must happen before the push — On-Demand Scanning in Artifact Analysis does exactly that, with Cloud Build keeping the pipeline managed and low-maintenance. Post-push automatic scanning (A, D) lets vulnerable images into the registry; Jenkins (C) adds pipeline maintenance effort.",
    "optionRationales": [
      "Wrong: Scanning after push lets vulnerable images into the registry and a VM script adds upkeep.",
      "Correct: On-Demand Scanning before push gates the image; Cloud Build keeps the pipeline managed.",
      "Wrong: Right scanning pattern but Jenkins adds exactly the maintenance effort being minimized.",
      "Wrong: Automatic scanning after push still admits vulnerable images temporarily."
    ]
  },
  {
    "id": 211,
    "topic": "CI/CD Pipelines",
    "difficulty": 2,
    "question": "You are using Jenkins to orchestrate your CI/CD pipelines deploying your applications to GKE and on-premises VMs. After expanding your on-premises infrastructure, all resource utilization is normal but you notice that initiating on-premises deployments is taking longer than expected. You need to accelerate the initiation of on-premises deployments. What should you do?",
    "options": [
      "A. Upgrade your on-premises VMs to have faster CPUs and more memory.",
      "B. Implement a blue-green deployment strategy for your on-premises VMs.",
      "C. Increase the number of Jenkins executor threads.",
      "D. Configure Jenkins to use an artifact repository in your on-premises environment."
    ],
    "correct": 2,
    "explanation": "Normal resource utilization with slow deployment start points to executor starvation — increase Jenkins executors so jobs don't queue.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 211,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Resource utilization is normal and the slowdown started when more on-premises targets were added — the jobs are queueing for free Jenkins executors; a local artifact repository speeds artifact transfer, not job start.",
    "conceptSummary": "Slow job initiation = executor queueing; scale executors, not hardware.",
    "correctRationale": "Resource utilization is normal and the slowdown appeared when more on-prem targets were added — jobs are queueing waiting for free executors. Raising the executor thread count (C) shortens queue time. Faster VMs (A) speed execution, not initiation; blue-green (B) is a deployment pattern unrelated to scheduling latency; an artifact repository (D) speeds artifact transfer, not job start.",
    "optionRationales": [
      "Wrong: Faster hardware speeds job execution, not the wait to start it.",
      "Wrong: Blue-green changes how deployments happen, not how fast they begin.",
      "Correct: More executors mean queued on-prem deployment jobs start immediately.",
      "Wrong: An artifact repository speeds artifact download during the job, not initiation."
    ]
  },
  {
    "id": 210,
    "topic": "SLOs & Error Budgets",
    "difficulty": 1,
    "question": "You are responsible for the reliability of a custom-built, distributed file storage service that your company uses internally. This service handles thousands of file uploads and downloads daily. You need to define a service level indicator (SLI) to measure the reliability of your service usage and configure alerts to be notified of potential issues. Which SLI should you use to measure the reliability of the service?",
    "options": [
      "A. Average request latency of API calls (e.g., get, put, list)",
      "B. Number of successful file uploads and downloads per minute",
      "C. Average size of objects stored in your service",
      "D. Ratio of successful API calls to the total number of attempted API calls"
    ],
    "correct": 3,
    "explanation": "Availability/reliability is a ratio of successful calls to total calls — an SLI that captures service health directly.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 210,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Correct SLI form for a file-storage API: success ratio.",
    "correctRationale": "The proper SLI for request reliability is the proportion of successful requests out of all attempted ones — measurable, user-facing, and SLO-ready. Average latency (A) is a performance signal, per-minute volume (B) measures throughput not reliability, and object size (C) is unrelated.",
    "optionRationales": [
      "Wrong: Latency is a performance SLI, not the reliability of request success.",
      "Wrong: Request count is volume — it does not measure reliability.",
      "Wrong: Object size says nothing about whether requests succeed.",
      "Correct: Successful calls / total calls is the canonical request-based availability SLI."
    ]
  },
  {
    "id": 209,
    "topic": "Supply Chain Security",
    "difficulty": 2,
    "question": "You are deploying a containerized application to Cloud Run. The application needs a password to connect to the database to fetch data. The password must be rotated each week to meet your company's security requirements. You need to implement an easy- to-manage password rotation policy. What should you do?",
    "options": [
      "A. Step 1: Deploy the container to Cloud Run.\nStep 2: Create a new container each week with the new database password set as an environment variable in a Dockerfile.\nStep 3: Deploy the new container to Cloud Run, and migrate the traffic to the new version.",
      "B. Step 1: Create a secret in Secret Manager to hold the password.\nStep 2: Deploy the container to Cloud Run, and use the latest version of the secret as an environment variable.\nStep 3: Create a new version of the secret with the new password in Secret Manager each week.",
      "C. Step 1: Deploy the container to Cloud Run.\nStep 2: Create a new container each week with the new database password set as a secret during the build phase.\nStep 3: Deploy the new container to Cloud Run, and migrate the traffic to the new version.",
      "D. Step 1: Create a secret in Secret Manager to hold the password.\nStep 2: Deploy the container to Cloud Run, and use the latest version of the secret as a mounted volume.\nStep 3: Create a new version of the secret in Secret Manager each week."
    ],
    "correct": 3,
    "explanation": "Mounting the secret as a volume keeps Cloud Run reading the latest version — weekly rotations need no redeploy.",
    "discussion": [
      {
        "user": "BlackCoffee",
        "text": "Selected Answer: D. D - mount as volume A and C are incorrect: Baking passwords directly into Dockerfiles or hardcoding secrets during the image build phase is a severe security vulnerability. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 209,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Same idea as question 150: env vars resolve the secret once at instance start; a mounted volume reads the current version, so weekly rotation needs no redeploy.",
    "conceptSummary": "Secret rotation on Cloud Run via volume-mounted Secret Manager.",
    "correctRationale": "The password rotates weekly, so the mount mode matters: an environment variable is resolved when the instance starts, while a volume-mounted secret always reads the current version — no redeploy needed. Baking the password into a Dockerfile or build-time secret (A, C) embeds it in artifacts; env-var mode (B) requires a redeploy on every rotation.",
    "optionRationales": [
      "Wrong: The password inside a Dockerfile lands in image layers — a security and rebuild burden.",
      "Wrong: An env-var secret is fixed at instance start; each rotation needs a redeploy.",
      "Wrong: Build-phase secrets still embed the password into the container and force weekly rebuilds.",
      "Correct: Secret Manager volume mount reads the latest secret version continuously — rotation without redeploy."
    ]
  },
  {
    "id": 208,
    "topic": "Infrastructure as Code",
    "difficulty": 1,
    "question": "Your company is building an AI-powered Java web application. You need to create a secure and managed cloud-based Java integrated development environment (IDE) for your company's developers. You must ensure that the required GPUs are attached to their development instances, and you want to follow Google-recommended practices. What should you do?",
    "options": [
      "A. Create a dedicated Google Cloud project for development with sufficient GPU quota. Grant developers access to use Cloud Shell Editor within the project.",
      "B. Use Cloud Workstations to create a dedicated workstation with an attached GPU for each developer. Grant the Cloud Workstations User role to the users.",
      "C. Create a separate Google Cloud project with a GPU-equipped VM for each developer, and grant each developer Editor access to their project.",
      "D. Deploy a GKE cluster with GPUs attached. Create a namespace for each developer, and grant the namespace access to the corresponding developer."
    ],
    "correct": 1,
    "explanation": "Cloud Workstations gives managed, secure, GPU-attached developer environments with per-developer isolation.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 208,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Managed cloud IDEs with GPUs via Cloud Workstations.",
    "correctRationale": "Cloud Workstations provisions dedicated, managed, customizable dev workstations — including GPU-attached ones — with the Cloud Workstations User role for developers. Cloud Shell Editor (A) has no GPUs; a project+Editor-per-developer (C) hands each dev broad project rights and is unmaintained; GKE namespaces (D) are not IDEs.",
    "optionRationales": [
      "Wrong: Cloud Shell Editor cannot attach GPUs and is not a dedicated managed dev environment.",
      "Correct: Cloud Workstations provides managed, GPU-equipped, per-developer workstations — the recommended answer.",
      "Wrong: A VM per project with Editor access is heavyweight and over-permissioned.",
      "Wrong: A GKE cluster with namespaces is container orchestration, not a developer IDE environment."
    ]
  },
  {
    "id": 207,
    "topic": "Monitoring & Alerting",
    "difficulty": 2,
    "question": "You are building an ecommerce web application that will be deployed to Google Cloud. You need to periodically test the checkout process in production to ensure its functionality and confirm that you are receiving automated notifications for failures. You also want to minimize administrative effort and follow Google-recommended practices. What should you do?",
    "options": [
      "A. Use Workflows to create a workflow verifying the functionality, and trigger the workflow periodically by using Cloud Tasks.",
      "B. Implement a Cloud Run function for synthetic monitoring with an alerting policy.",
      "C. Create an alerting policy in Cloud Logging to monitor for failed logs during the checkout process.",
      "D. Configure an uptime check with an alerting policy."
    ],
    "correct": 1,
    "explanation": "A Cloud Run function doing synthetic requests on a schedule with an alerting policy is the Google-recommended, low-admin synthetic monitor.",
    "discussion": [
      {
        "user": "a36df5b",
        "text": "Selected Answer: B. B. Implement a Cloud Run function for synthetic monitoring with an alerting policy. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 207,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Synthetic monitoring of checkout via scheduled Cloud Run function + alert.",
    "correctRationale": "Periodically exercising the real checkout flow and getting notified on failure is synthetic monitoring: a scheduled Cloud Run function performs the transaction and an alerting policy fires when it fails — minimal admin. Workflows+Tasks adds orchestration without the check logic, log-based alerts only see real traffic failures, and uptime checks probe a simple endpoint, not a multi-step checkout.",
    "optionRationales": [
      "Wrong: Workflows + Cloud Tasks schedules work but you still have to build the check; heavier than needed.",
      "Correct: A scheduled function performing synthetic checkout plus an alerting policy is the recommended low-effort synthetic monitor.",
      "Wrong: Alerting on failed real-user logs detects only actual customer failures, not proactive synthetic coverage.",
      "Wrong: An uptime check hits a single endpoint; it cannot exercise the multi-step checkout process."
    ]
  },
  {
    "id": 206,
    "topic": "Logging",
    "difficulty": 1,
    "question": "You have multiple applications running on Google Kubernetes Engine (GKE) and Cloud Run. You plan to use BigQuery as your central log repository. You need to centralize log collection and analysis to gain a comprehensive view of your system's health and performance, while minimizing configuration complexity and costs. What should you do?",
    "options": [
      "A. Configure each application to write logs directly to BigQuery by using the BigQuery API.",
      "B. Use Datadog to collect logs from GKE and Cloud Run, then forward the logs to BigQuery.",
      "C. Configure Cloud Logging to collect logs from GKE and Cloud Run, and create a sink to export the logs to BigQuery.",
      "D. Manually download log files from GKE and Cloud Run, then upload them to BigQuery by using the Google Cloud console."
    ],
    "correct": 2,
    "explanation": "GKE and Cloud Run already log to Cloud Logging — a sink to BigQuery centralizes analysis with zero extra collection machinery.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 206,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Central log analysis via a Cloud Logging sink to BigQuery.",
    "correctRationale": "Cloud Logging natively collects from both GKE and Cloud Run; creating an aggregated sink exports the entries into BigQuery for analysis — minimal complexity, no agents, no third parties. Writing directly via the BigQuery API (A) bypasses Logging and adds code, Datadog (B) is an extra vendor, and manual downloads (D) are toil.",
    "optionRationales": [
      "Wrong: Writing straight to BigQuery from each app adds custom code and loses Cloud Logging's collection features.",
      "Wrong: Datadog adds a third-party system when a native sink does the job.",
      "Correct: Logging already collects from GKE and Cloud Run; a BigQuery sink is the minimal-effort centralization.",
      "Wrong: Manual download/upload is pure toil and not a continuous solution."
    ]
  },
  {
    "id": 205,
    "topic": "Monitoring & Alerting",
    "difficulty": 1,
    "question": "You manage applications deployed on Google Kubernetes Engine (GKE) clusters across multiple Google Cloud projects. You require a centralized and scalable solution to collect and query Prometheus metrics from these clusters by using a flexible query language. You want to follow Google-recommended practices. What should you do?",
    "options": [
      "A. Install Prometheus server on an admin cluster with cluster autoscaler enabled, and expose the Prometheus endpoint for queries.",
      "B. Configure the Ops Agent to collect metrics, and run queries in Metrics Explorer.",
      "C. Configure Google Cloud Managed Service for Prometheus with managed collection, and run queries in Metrics Explorer.",
      "D. Deploy a Prometheus server as a sidecar to your applications on each cluster, and run queries in Cloud Monitoring."
    ],
    "correct": 2,
    "explanation": "Managed Service for Prometheus with managed collection centralizes Prometheus metrics and exposes PromQL in Metrics Explorer.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 205,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Centralized PromQL querying across GKE clusters via GMP.",
    "correctRationale": "The need is centralized, scalable Prometheus metrics across projects with a flexible query language — Managed Service for Prometheus is the managed answer: managed collection on each cluster, queried with PromQL in Metrics Explorer. Self-hosted Prometheus on an admin cluster or sidecars is more ops; the Ops Agent + Metrics Explorer does not give the Prometheus query experience.",
    "optionRationales": [
      "Wrong: A self-run Prometheus on an admin cluster is not centralized across projects and adds scaling work.",
      "Wrong: The Ops Agent collects into Cloud Monitoring metrics, not Prometheus-style collection/query.",
      "Correct: Managed collection + Metrics Explorer gives centralized, Google-run Prometheus metrics with PromQL.",
      "Wrong: Per-cluster sidecar Prometheus is decentralized and higher overhead."
    ]
  },
  {
    "id": 204,
    "topic": "Monitoring & Alerting",
    "difficulty": 2,
    "question": "You use Google Cloud Managed Service for Prometheus with managed collection to gather metrics from your service running on Google Kubernetes Engine (GKE). After deploying the service, there is no metric data appearing in Cloud Monitoring and you have not encountered any error messages. You need to troubleshoot this issue. What should you do?",
    "options": [
      "A. Determine if your service has exceeded its quota for writes to the Cloud Monitoring API.",
      "B. Verify that your PodMonitoring configuration references a valid port.",
      "C. Check if the Grafana service is installed on your GKE cluster.",
      "D. Confirm that your service has the monitoring.servicesViewer IAM role."
    ],
    "correct": 1,
    "explanation": "No metrics with no errors usually means PodMonitoring never scraped — check that it references a valid port first.",
    "discussion": [
      {
        "user": "BlackCoffee",
        "text": "Selected Answer: B. Under the Google Cloud Managed Service for Prometheus (GMP) managed collection model, target discovery relies entirely on custom Kubernetes resources called PodMonitoring (or ClusterPodMonitoring). (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 204,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Managed Service for Prometheus: verify PodMonitoring's port.",
    "correctRationale": "With managed collection, a PodMonitoring that references a non-existent or wrong port scrapes nothing and surfaces no error — exactly the silent 'no data' symptom here. Quota and IAM failures would produce errors; Grafana is irrelevant to whether data reaches Cloud Monitoring.",
    "optionRationales": [
      "Wrong: A write-quota breach produces errors — the question says none appeared.",
      "Correct: A PodMonitoring pointing at an invalid port silently scrapes nothing — the most likely cause of error-free missing data.",
      "Wrong: Grafana presence does not affect whether managed collection exports metrics to Cloud Monitoring.",
      "Wrong: A missing monitoring role would also surface as an error, and servicesViewer is a read role anyway."
    ]
  },
  {
    "id": 203,
    "topic": "CI/CD Pipelines",
    "difficulty": 2,
    "question": "Your team has an application built by using a Dockerfile. The build is executed from Cloud Build, and the resulting artifacts are stored in Artifact Registry. Your team is reporting that builds are slow. You need to increase build speed, while following Google-recommended practices. What should you do?",
    "options": [
      "A. Use the --cache-from parameter, and point to Artifact Registry. Add the most frequently modified files to the later stages of the build process.",
      "B. Use the --cache-from parameter, and point to Artifact Registry. Add the most frequently modified files to the earlier stages of the build process.",
      "C. Cache the container layers of the build process to Cloud Storage. Add the most frequently modified files to the earlier stages of the build process.",
      "D. Cache the container layers of the build process to Cloud Storage. Add the most frequently modified files to the later stages of the build process."
    ],
    "correct": 0,
    "explanation": "--cache-from pointed at Artifact Registry reuses prior layers, and moving frequently-modified files later preserves cache hits.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 203,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Faster Docker builds: registry layer cache + layer ordering.",
    "correctRationale": "Docker layer caching works when unchanged layers hit cache: pointing --cache-from at the Artifact Registry repo reuses pushed layers across builds, and moving the most frequently modified files to later stages keeps the cacheable early layers stable. Cloud Storage does not serve as a Docker layer cache source for cache-from, and early placement of churning files busts the cache every build.",
    "optionRationales": [
      "Correct: --cache-from to Artifact Registry plus late placement of volatile files maximizes layer reuse — the Google-recommended speedup.",
      "Wrong: Frequently modified files early in the Dockerfile invalidate every layer after them on every build.",
      "Wrong: Cloud Storage is not a Docker image layer cache for --cache-from, and volatile files early still bust caching.",
      "Wrong: Same Cloud Storage problem — the correct cache source is the registry."
    ]
  },
  {
    "id": 202,
    "topic": "CI/CD Pipelines",
    "difficulty": 2,
    "question": "Your company uses a CI/CD pipeline with Cloud Build and Artifact Registry to deploy container images to Google Kubernetes Engine (GKE). Images are tagged with the latest commit hash and promoted to production after successful testing in the development and pre-production environments. A recent production deployment caused the application to fail due to untested integration functionality, requiring a disruptive manual rollback. During the rollback, you noticed many old and unused container images accumulating in Artifact Registry. You need to improve rollout and rollback management and clean up the old container images. What should you do?",
    "options": [
      "A. Set up a rollback pipeline in Cloud Build, and implement an Artifact Registry cleanup policy.",
      "B. Adopt Cloud Deploy for managing deployments, and implement an Artifact Registry cleanup policy.",
      "C. Deploy Cloud Service Mesh across the GKE clusters, and manually clean up Artifact Registry images.",
      "D. Adopt Cloud Deploy for managing deployments, and schedule a Cloud Build job for container image cleanup."
    ],
    "correct": 1,
    "explanation": "Cloud Deploy gives managed release promotion and one-command rollback; an Artifact Registry cleanup policy removes stale images automatically.",
    "discussion": [
      {
        "user": "BlackCoffee",
        "text": "Selected Answer: B. Native Rollout and Rollback Management with Cloud Deploy. Artifact Registry cleanup policies are the Google-recommended, zero-overhead solution. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 202,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Managed rollout/rollback with Cloud Deploy + image lifecycle policy.",
    "correctRationale": "Both problems have managed solutions: Cloud Deploy handles promotion across dev/pre-prod/prod with built-in rollback (reducing rollout/rollback management effort), and Artifact Registry cleanup policies delete old images on rules you set once. A custom Cloud Build rollback pipeline (A) is more effort; service mesh (C) is unrelated to release management; manual or scheduled-script cleanup (C/D) is less maintainable than a policy.",
    "optionRationales": [
      "Wrong: A hand-rolled rollback pipeline in Cloud Build works but adds pipeline machinery where Cloud Deploy is the managed tool.",
      "Correct: Cloud Deploy gives managed promotion and rollback; a cleanup policy removes old images automatically.",
      "Wrong: Cloud Service Mesh is traffic/observability infrastructure, not a rollout manager; manual cleanup is toil.",
      "Wrong: A scheduled Cloud Build cleanup job is more effort than a native cleanup policy."
    ]
  },
  {
    "id": 201,
    "topic": "Incident Management",
    "difficulty": 2,
    "question": "Your company is actively developing a new web service following site reliability engineering (SRE) practices. You are leading the company's SRE team and preparing the service for production. You must ensure that the team follows Google-recommended SRE practices during this productionalization process. Which two actions should you take next? (Choose two.)",
    "options": [
      "A. Establish monitoring and alerting systems.",
      "B. Start to document infrastructure system guidelines.",
      "C. Collaborate with the product team to design the service.",
      "D. Implement redundancy measures.",
      "E. Provide early engagement consulting to discuss architecture and design choices in detail."
    ],
    "correct": [
      0,
      4
    ],
    "explanation": "The service is already built and heading to production — monitoring/alerting plus early-engagement SRE consulting on architecture are the next productionalization steps.",
    "discussion": [
      {
        "user": "GP123123",
        "text": "Selected Answer: AE. A: SRE always need E: can include CD (4 votes)"
      },
      {
        "user": "gaurav517",
        "text": "Selected Answer: AE. E: The SRE team's highest leverage point is during the design phase. By engaging early, the SRE lead can guide the product team toward architectures that are inherently reliable, scalable, and observable. This ensures that the service is designed with resilience, not just patched later. Fixing fundamental architectural flaws after deployment is extremely expensive and time-consuming. A :The foundation of all SRE practices is observability. You cannot manage what you cannot measure. Establishing monitoring (metrics, logs, traces) and alerting is essential for SLIs, SLOs... (2 votes)"
      },
      {
        "user": "3fbd032",
        "text": "Selected Answer: CE. https://sre.google/sre-book/evolving-sre-engagement-model/ (2 votes)"
      },
      {
        "user": "kleranti",
        "text": "Selected Answer: AD. AD is right (2 votes)"
      },
      {
        "user": "maurer",
        "text": "The two best next actions, according to Google SRE productionalization practices, are: C. Collaborate with the product team to design the service. E. Provide early engagement consulting to discuss architecture and design choices in detail. These steps ensure that all subsequent technical work (including monitoring, alerting, and redundancy) is grounded in a shared understanding of reliability goals and operational realities. This is the foundation of Google's SRE approach to production readiness. (2 votes)"
      },
      {
        "user": "a36df5b",
        "text": "Selected Answer: AE. A. Establish monitoring and alerting systems. E. Provide early engagement consulting to discuss architecture and design choices in detail. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 201,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Minority C,E: the service is already in development and being prepared for production, so design collaboration (C) has passed; early-engagement consulting on architecture plus establishing monitoring/alerting are the productionalization steps.",
    "conceptSummary": "SRE productionalization for a service already in development.",
    "correctRationale": "The service is already in development and being prepared for production, so designing it with the product team (C) is past; what remains is establishing monitoring and alerting (A) and early-engagement consulting on architecture/design choices (E) — the SRE productionalization activities. Documenting guidelines and adding redundancy are useful but secondary to observability and design input.",
    "optionRationales": [
      "Correct: Observability (monitoring + alerting) is the foundation of SRE and a production-readiness requirement.",
      "Wrong: Documenting guidelines is useful but not the highest-leverage productionalization step here.",
      "Wrong: The design phase has passed — the service is already being prepared for production.",
      "Wrong: Redundancy is one technique; the question asks for the SRE practices to establish next.",
      "Correct: Early engagement consulting lets SRE shape architecture before production locks it in."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 200,
    "topic": "Performance & Cost",
    "difficulty": 1,
    "question": "You are deploying a new web application on Cloud Run in your Google Cloud project. You expect traffic to range from 10 requests per second during off-peak hours to 1000 requests per second during peak hours. You want to use autoscaling to efficiently handle the changes in traffic while ensuring that the autoscaler does not exceed your project's resource quotas. What should you do?",
    "options": [
      "A. Manually adjust the number of instances based on observed traffic patterns throughout the day.",
      "B. Define appropriate resource limits for the Cloud Run service, and ensure your project has sufficient resource quotas to accommodate the desired scaling range.",
      "C. Configure the autoscaler to scale based on CPU utilization with a target of 80%.",
      "D. Configure the autoscaler to scale based on request count, with a target of 500 requests per instance."
    ],
    "correct": 1,
    "explanation": "Cloud Run autoscales on its own — the real work is setting instance limits and confirming the project quota covers the peak scaling range.",
    "discussion": [
      {
        "user": "odinson",
        "text": "Selected Answer: B. question specifically mentions RESPECT PROJECT QUOTAS. Hence B (3 votes)"
      },
      {
        "user": "Tartaruga1234",
        "text": "Selected Answer: B. Answer b (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 200,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Cloud Run autoscaling bounded by instance limits and project quota.",
    "correctRationale": "Cloud Run scales instance count automatically with traffic; the operator's job is to bound that range with min/max instance limits and ensure project quotas allow the desired peak — exactly what B says. Manual scaling (A) defeats autoscaling; Cloud Run does not offer CPU or request-count autoscaling targets like C and D describe.",
    "optionRationales": [
      "Wrong: Manual instance adjustment defeats autoscaling and cannot react to 10x-100x traffic swings efficiently.",
      "Correct: Instance limits plus sufficient project quota bound the autoscaler — the real configuration needed.",
      "Wrong: Cloud Run scales on request concurrency, not a CPU-utilization target.",
      "Wrong: There is no 'requests per instance' autoscaling target to configure on Cloud Run."
    ]
  },
  {
    "id": 199,
    "topic": "Incident Management",
    "difficulty": 2,
    "question": "Your company is migrating its production systems to Google Cloud. You need to implement site reliability engineering (SRE) practices during the migration to minimize customer impact from potential future incidents. Which two SRE practices should you implement? (Choose two.)",
    "options": [
      "A. Create up-to-date playbooks with instructions for debugging and mitigating issues.",
      "B. Ensure that all teams can modify the production environment to resolve issues.",
      "C. Create an alerting mechanism for your SRE team based on your system's internal behavior.",
      "D. Automate common tasks to analyze key impact information and intelligently suggest mitigating actions for the on-call team.",
      "E. Ensure that full autonomy and permissions are only granted to the on-call team."
    ],
    "correct": [
      0,
      3
    ],
    "explanation": "Playbooks (runbooks) and toil-reducing automation are the two SRE practices that most cut customer impact during a migration.",
    "discussion": [
      {
        "user": "Tartaruga1234",
        "text": "Selected Answer: AD. Answer a and d (3 votes)"
      },
      {
        "user": "gaurav517",
        "text": "Selected Answer: AD. A. Create up-to-date playbooks with instructions for debugging and mitigating issues. Rationale: Playbooks (or runbooks) are essential SRE documentation. In a new environment (like a cloud migration), playbooks minimize the time-to-resolution (MTTR), which is the most critical factor in minimizing customer impact. D. Automate common tasks to analyze key impact information and intelligently suggest mitigating actions for the on-call team. Rationale: This practice automates the reduction of toil during an incident. This dramatically speeds up the incident response time,... (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 199,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "SRE practices for a migration: playbooks and automation.",
    "correctRationale": "For minimizing incident impact in a new environment, the highest-value SRE practices are up-to-date playbooks for debugging/mitigation (A) and automation that analyzes impact and suggests mitigations for on-call (D). Universal prod write access (B) and on-call-only autonomy (E) are anti-patterns; internal-behavior alerting (C) is fine but less direct than playbooks+automation.",
    "optionRationales": [
      "Correct: Current playbooks cut time-to-mitigate in an unfamiliar environment — the biggest lever on customer impact.",
      "Wrong: Letting all teams modify production increases incident risk rather than reducing impact.",
      "Wrong: Internal-behavior alerting helps, but user-facing symptom alerting plus mitigation tooling matters more here.",
      "Correct: Automating toil and suggesting mitigations shortens incidents — direct impact reduction.",
      "Wrong: Restricting all autonomy to on-call bottlenecks response and does not follow SRE's shared-responsibility model."
    ]
  },
  {
    "id": 198,
    "topic": "Reliability Design",
    "difficulty": 2,
    "question": "You manage a microservice that provides a public-facing API (Service A). Service A is time-critical and has a response SLO of 500 ms. Service A makes synchronous calls to internal API (Service B) that is known to become unreliable under heavy load, resulting in connection timeout errors or 500 errors. Service B is used to collect request information for the transactions processed by Service A. You need to mitigate the impact of Service B issues on your Service A users. What should you do?",
    "options": [
      "A. Increase the size of the queue in front of the thread pool used by Service A instances.",
      "B. Implement retry logic with exponential back-offs when calling Service B.",
      "C. Implement a circuit breaker to store the request data in a database.",
      "D. Implement rate limiting in Service A to limit the number of requests to Service B."
    ],
    "correct": 2,
    "explanation": "A circuit breaker fails fast on Service B's overload and parks request data for later — protecting Service A's 500 ms SLO.",
    "discussion": [
      {
        "user": "Tartaruga1234",
        "text": "Selected Answer: C. C is correct (4 votes)"
      },
      {
        "user": "gaurav517",
        "text": "Selected Answer: C. C. Implement a circuit breaker to store the request data in a database. Isolation (Circuit Breaker): The circuit breaker pattern monitors calls to Service B. If the error rate (timeouts or 500 exceeds a threshold, the circuit opens and immediately prevents Service A from calling Service B. This prevents Service B's unreliability from consuming resources (threads) and latency budget in Service A. Graceful Degradation (Fallback): Instead of immediately returning a 500 error to the client (which would breach the SLO), Service A executes a fallback action. The most appropriate... (2 votes)"
      },
      {
        "user": "BlackCoffee",
        "text": "Selected Answer: C. Implementing a circuit breaker isolates Service A from Service B's failures and store the data in a database. (1 vote)"
      },
      {
        "user": "katayoonnt",
        "text": "Selected Answer: B. https://cloud.google.com/storage/docs/retry-strategy (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 198,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority B chose retry with exponential backoff; retries still make Service A wait on a struggling Service B and amplify its overload, blowing the 500 ms SLO — a circuit breaker fails fast and parks the request data for later.",
    "conceptSummary": "Isolating an unreliable synchronous dependency with a circuit breaker.",
    "correctRationale": "Service A must stay under its 500 ms SLO while Service B is flaky under load. A circuit breaker detects B's failure rate, stops calling it immediately (fail fast), and stores the request data for later processing — so A keeps responding on time. Retries make A wait on the struggling B and amplify its overload; bigger queues just delay the timeout; rate limiting starves A's own callers.",
    "optionRationales": [
      "Wrong: A bigger queue just delays the timeout — requests still wait on a struggling Service B.",
      "Wrong: Retries with backoff make A block on B and amplify B's overload — the SLO still breaks.",
      "Correct: The breaker opens on B's failures, A stops waiting, and the request data is stored for later — protecting the SLO.",
      "Wrong: Rate limiting A's callers reduces legitimate traffic instead of isolating the failing dependency."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 197,
    "topic": "CI/CD Pipelines",
    "difficulty": 1,
    "question": "You recently created a Cloud Build pipeline for deploying Terraform code stored in a GitHub repository. You make Terraform code changes in short-lived branches and sometimes use tags during development. You tag releases with a semantic version when they are ready for deployment. You require your pipeline to apply the Terraform code whenever there is a new release, and you need to minimize operational overhead. What should you do?",
    "options": [
      "A. Create a build trigger with the \\d+\\.\\d+\\.\\d+ tag pattern.",
      "B. Create a build trigger with the \\d+\\.\\d+\\.\\d+ branch pattern.",
      "C. Create a build trigger with the .* tag pattern.",
      "D. Create a build trigger with the .* branch pattern."
    ],
    "correct": 0,
    "explanation": "A tag-pattern trigger on \\d+\\.\\d+\\.\\d+ fires exactly on semantic-version release tags and nowhere else.",
    "discussion": [
      {
        "user": "mT3",
        "text": "Selected Answer: A. The requirement is to use semantic versioning tags (e.g., 1.2.3) in releases and to apply Terraform when those tags are created. By specifying the tag pattern as a regular expression `\\d+\\.\\d+\\.\\d+` in the Cloud Build trigger, deployments based on Semantic Versioning tags are possible. (2 votes)"
      },
      {
        "user": "BlackCoffee",
        "text": "Selected Answer: A. A is the right one based on semantic version format and tags (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 197,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Cloud Build trigger firing on semver release tags.",
    "correctRationale": "Releases are marked by semver tags, so the trigger should match tag events, not branch events — and the \\d+\\.\\d+\\.\\d+ regex matches only MAJOR.MINOR.PATCH tags, avoiding dev-time tags like 'test' or 'wip'. The .* tag pattern fires on every tag, and branch patterns never fire on tag pushes.",
    "optionRationales": [
      "Correct: Tag event + \\d+\\.\\d+\\.\\d+ matches only semantic-version release tags — minimal, precise automation.",
      "Wrong: A branch pattern with the semver regex fires on branches named like versions — tags are the event type you need.",
      "Wrong: .* tag pattern triggers on any tag, including non-release dev tags.",
      "Wrong: A .* branch pattern fires on every branch push — far too broad and still not tag-driven."
    ]
  },
  {
    "id": 196,
    "topic": "Logging",
    "difficulty": 2,
    "question": "You are deploying a new application on Google Kubernetes Engine (GKE) that processes personally identifiable information (PII). You need to configure Cloud Logging to collect logs from your application while ensuring that sensitive user information is not exposed. What should you do?",
    "options": [
      "A. Implement log sampling to reduce the volume of logs collected.",
      "B. Configure Cloud Data Loss Prevention to scan logs in real-time and redact PII before it's stored in Cloud Logging.",
      "C. Disable Cloud Logging for the application to prevent sensitive data from being logged.",
      "D. Store all logs in an encrypted Cloud Storage bucket with restricted access."
    ],
    "correct": 1,
    "explanation": "Scan and redact PII with Sensitive Data Protection (formerly Cloud DLP) before the entries are stored in Cloud Logging.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: B. B. Configure Cloud Data Loss Prevention to scan logs in real-time and redact PII before it's stored in Cloud Logging. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 196,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "PII redaction before logs land in Cloud Logging.",
    "correctRationale": "To keep PII out of stored logs, redact it in transit — Sensitive Data Protection (Cloud DLP) scans the log content and masks sensitive fields before entries persist. Sampling still leaks a fraction, disabling logging loses needed telemetry, and encrypted storage protects data at rest but still stores the PII.",
    "optionRationales": [
      "Wrong: Sampling only reduces volume — sampled-through entries still contain PII.",
      "Correct: DLP/Sensitive Data Protection redaction removes PII before entries are stored in Cloud Logging.",
      "Wrong: Disabling logging removes the telemetry entirely rather than sanitizing it.",
      "Wrong: Encrypted storage still stores the PII — it protects access, not content."
    ],
    "legacyNote": "Cloud DLP is now Sensitive Data Protection; in practice the redaction runs in the pipeline or via the API before entries are written."
  },
  {
    "id": 195,
    "topic": "Troubleshooting & APM",
    "difficulty": 2,
    "question": "Your team is preparing to launch a new API in Cloud Run. The API uses an OpenTelemetry agent to send distributed tracing data to Cloud Trace to monitor the time each request takes. The team has noticed inconsistent trace collection. You need to resolve the issue. What should you do?",
    "options": [
      "A. Use an HTTP health check.",
      "B. Configure CPU to be always-allocated.",
      "C. Increase the CPU limit in Cloud Run from 2 to 4.",
      "D. Configure CPU to be allocated only during request processing."
    ],
    "correct": 1,
    "explanation": "Tracing agents only collect between requests when CPU is always allocated — request-time-only CPU starves the background exporter.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: B. B. Configure CPU to be always-allocated. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 195,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "The 'CPU always allocated' billing mode is now called instance-based billing.",
    "conceptSummary": "Reliable Cloud Run trace export needs always-allocated CPU.",
    "correctRationale": "With CPU allocated only during request processing, the OpenTelemetry agent gets no CPU between requests and its background export becomes unreliable — inconsistent traces. Setting CPU to always-allocated (now called instance-based billing) keeps the agent running. Health checks, more CPU, or request-only CPU do not address the between-request starvation.",
    "optionRationales": [
      "Wrong: A health check does not help the agent export spans between requests.",
      "Correct: Always-allocated CPU keeps the agent alive between requests so traces are exported consistently.",
      "Wrong: More CPU during requests does not fix the off-time starvation.",
      "Wrong: Request-only CPU is exactly the cause — the agent cannot export outside request processing."
    ]
  },
  {
    "id": 194,
    "topic": "Infrastructure as Code",
    "difficulty": 2,
    "question": "You are developing a Node.js utility on a workstation in Cloud Workstations by using Code OSS. The utility is a simple web page, and you have already confirmed that all necessary firewall rules are in place. You tested the application by starting it on port 3000 on your workstation in Cloud Workstations, but you need to be able to access the web page from your local machine. You need to follow Google-recommended security practices. What should you do?",
    "options": [
      "A. Use a browser running on a bastion host VM.",
      "B. Run the gcloud compute start-iap-tunnel command to the Cloud Workstations VM.",
      "C. Allow public IP addresses in the Cloud Workstations configuration.",
      "D. Click the preview link in the Code OSS panel."
    ],
    "correct": 3,
    "explanation": "The Code OSS preview link opens the workstation's authenticated port URL in your local browser — the documented, no-exposure path.",
    "discussion": [
      {
        "user": "soady",
        "text": "Selected Answer: B. I'm going with B, identity aware proxy. Suggested answer D isn't really accessing it from your local machine since you're still on the cloud workstation. (1 vote)"
      },
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: D. D. Click the preview link in the Code OSS panel. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 194,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority B: gcloud compute start-iap-tunnel targets Compute Engine VMs, not workstations (the workstation equivalent is gcloud workstations start-tcp-tunnel); the Code OSS preview link is the documented path.",
    "conceptSummary": "Reaching a Cloud Workstations dev server via the Code OSS preview.",
    "correctRationale": "Cloud Workstations' Code OSS provides a port-preview link that opens the workstation's forwarded port (e.g. 3000-<workstation-host>) through the authenticated workstation URL — the Google-recommended way to reach a dev server without public exposure. gcloud compute start-iap-tunnel targets Compute Engine VMs, not workstations (the equivalent is gcloud workstations start-tcp-tunnel), and allowing public IPs violates the security guidance.",
    "optionRationales": [
      "Wrong: A bastion browser adds a hop and an extra VM when the preview link exists.",
      "Wrong: start-iap-tunnel targets Compute Engine VMs, not workstations — the workstation equivalent is workstations start-tcp-tunnel.",
      "Wrong: Public IPs expose the workstation contrary to recommended security practice.",
      "Correct: The Code OSS preview link is the documented way to reach the dev server's port through the authenticated workstation URL."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 193,
    "topic": "Org & IAM",
    "difficulty": 2,
    "question": "You work for a company that manages highly sensitive user data. You are designing the Google Kubernetes Engine (GKE) infrastructure for your company, including several applications that will be deployed in development and production environments. Your design must protect data from unauthorized access from other applications, while minimizing the amount of management overhead required. What should you do?",
    "options": [
      "A. Create one cluster for the organization with separate namespaces for each application and environment combination.",
      "B. Create one cluster for each application with separate namespaces for production and development environments.",
      "C. Create one cluster for each environment (development and production) with each application in its own namespace within each cluster.",
      "D. Create one cluster for the organization with separate namespaces for each application."
    ],
    "correct": 2,
    "explanation": "One cluster per environment (dev, prod) with a namespace per application isolates environments and contains each app — minimal overhead.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: C. C. Create one cluster for each environment (development and production) with each application in its own namespace within each cluster. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 193,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Cluster-per-env + namespace-per-app for sensitive-data isolation.",
    "correctRationale": "Sensitive data requires environment-level isolation (dev vs prod), which means separate clusters; within each cluster, namespaces isolate applications from each other. Cluster-per-app or all-in-one mixes concerns and either multiplies overhead or weakens isolation; namespaces per application within env clusters is the balanced answer.",
    "optionRationales": [
      "Wrong: One cluster hosting dev and prod mixes environments, weakening isolation for sensitive data.",
      "Wrong: A cluster per app still shares dev and prod inside it and multiplies clusters.",
      "Correct: Dev cluster + prod cluster, each app in its own namespace — env isolation plus app separation at minimal overhead.",
      "Wrong: One cluster for everything removes both environment and application separation."
    ]
  },
  {
    "id": 192,
    "topic": "SLOs & Error Budgets",
    "difficulty": 2,
    "question": "You manage your company's primary revenue-generating application. You have an error budget policy in place that freezes production deployments when the application is close to breaching its SLO. A number of issues have recently occurred, and the application has exhausted its error budget. You need to deploy a new release to the application that includes a feature urgently required by your largest customer. You have been told that the release has passed all unit tests. What should you do?",
    "options": [
      "A. Delay the deployment of the feature until the error budget is replenished.",
      "B. Re-run the unit tests, and start the deployment of the feature if the tests pass.",
      "C. Start the deployment of the feature immediately.",
      "D. Deploy the feature to a subset of users, and gradually roll out to all users if there are no errors reported."
    ],
    "correct": 0,
    "explanation": "Error budget exhausted → the policy's freeze applies; delay the feature until the budget replenishes.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: A. A. Delay the deployment of the feature until the error budget is replenished. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 192,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Honoring the error-budget deployment freeze.",
    "correctRationale": "The budget is spent and the policy freezes deployments — customer urgency does not suspend it (that is the point of the policy). Re-running tests, shipping anyway, or a gradual rollout all still deploy during the freeze; the correct action is to delay until budget recovers (or negotiate an explicit exception through the policy, which none of the other options does).",
    "optionRationales": [
      "Correct: The policy exists for exactly this moment — hold the deploy until the budget is replenished.",
      "Wrong: Test status is irrelevant; the freeze is about reliability budget, not correctness.",
      "Wrong: Deploying immediately violates the freeze entirely.",
      "Wrong: A gradual rollout is still a deployment during the freeze."
    ]
  },
  {
    "id": 191,
    "topic": "Deployment Strategies",
    "difficulty": 2,
    "question": "Your company wants to implement a CD pipeline in Cloud Deploy for a web service deployed to GKE. The web service currently does not have any automated testing. The Quality Assurance team must manually verify any new releases of the web service before any production traffic is processed. You need to design the CD pipeline. What should you do?",
    "options": [
      "A. Create a single pipeline stage, and use a standard deployment strategy.",
      "B. Create a single pipeline stage, and use a canary deployment strategy.",
      "C. Create two pipeline stages, and use a canary deployment strategy.",
      "D. Create two pipeline stages, and use a standard deployment strategy."
    ],
    "correct": 3,
    "explanation": "Two stages (test → prod) with a standard strategy + manual approval gate before production gives QA the checkpoint they need.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: D. D. Create two pipeline stages, and use a standard deployment strategy. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 191,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Cloud Deploy pipeline with a manual-approval gate before prod.",
    "correctRationale": "QA must verify releases before any production traffic — a two-stage pipeline (staging then production) using a standard strategy plus a required manual approval on promotion into prod gives that gate. A single stage has no pre-prod environment, and canary sends live traffic before QA's manual check, violating the requirement.",
    "optionRationales": [
      "Wrong: A single stage gives no environment for QA to verify before production.",
      "Wrong: Single-stage canary would send real production traffic before QA verifies.",
      "Wrong: Canary pushes a slice of live traffic to the new release — but QA must verify before any production traffic flows.",
      "Correct: Two stages with standard deployment let QA sign off in stage one; prod only gets traffic after approval."
    ]
  },
  {
    "id": 190,
    "topic": "Monitoring & Alerting",
    "difficulty": 1,
    "question": "Your company has recently experienced several production service issues. You need to create a Cloud Monitoring dashboard to troubleshoot the issues, and you want to use the dashboard to distinguish between failures in your own service and those caused by a Google Cloud service that you use. What should you do?",
    "options": [
      "A. Create a log-based metric to track cloud service errors, and display the metric on the dashboard.",
      "B. Create a logs widget to display system errors from Cloud Logging on the dashboard.",
      "C. Create an alerting policy for the system error metrics.",
      "D. Enable Personalized Service Health annotations on the dashboard."
    ],
    "correct": 3,
    "explanation": "Personalized Service Health annotations overlay Google Cloud service incidents on your dashboard, separating Google-caused failures from your own.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: D. D. Enable Personalized Service Health annotations on the dashboard. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 190,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Distinguishing Google-side failures with Service Health annotations.",
    "correctRationale": "The need is distinguishing your service's failures from Google Cloud service failures — Personalized Service Health annotates dashboards with Google service incidents affecting your projects, which is exactly that. Log-based metrics, logs widgets, and alert policies show your own signals only.",
    "optionRationales": [
      "Wrong: A log-based metric on your logs cannot show failures in Google's services.",
      "Wrong: A logs widget shows your logs, not Google-side service health.",
      "Wrong: Alerting on system error metrics is still your own telemetry.",
      "Correct: Personalized Service Health annotations mark Google-side incidents on your metrics, cleanly separating cause."
    ]
  },
  {
    "id": 189,
    "topic": "Org & IAM",
    "difficulty": 2,
    "question": "Your company uses Cloud Deploy with multiple delivery pipelines for deploying applications to different environments. Your development team currently lacks access to any of these pipelines. You need to grant the team access to only the development delivery pipeline, while following Google-recommended practices. What should you do?",
    "options": [
      "A. In the Google Cloud console, grant the development team the roles/clouddeploy.operator role. Add deny conditions to all pipelines other than the development delivery pipeline.",
      "B. In the Google Cloud console, create a custom IAM role with all clouddeploy.automations.* permissions and an allow policy for only the development delivery pipeline. Grant this IAM role to the development team.",
      "C. Grant the development team the roles/clouddeploy.operator role in a policy file. Apply the policy file to the development target.",
      "D. Grant the development team the roles/clouddeploy.developer role in a policy file. Apply this policy file to the development delivery pipeline."
    ],
    "correct": 3,
    "explanation": "Grant clouddeploy.developer scoped to just the development delivery pipeline — the predefined role at the narrowest resource scope.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: D. D. Grant the development team the roles/clouddeploy.developer role in a policy file. Apply this policy file to the development delivery pipeline. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 189,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Per-pipeline Cloud Deploy access via scoped IAM binding.",
    "correctRationale": "The requirement is access to only the development pipeline — grant the team the predefined roles/clouddeploy.developer role bound to that specific delivery pipeline. operator is broader, custom roles are unnecessary when a predefined one fits, and deny conditions on all other pipelines is fragile.",
    "optionRationales": [
      "Wrong: The operator role is broader than needed, and deny rules on all other pipelines is fragile reverse logic.",
      "Wrong: A custom role over all automations.* is excessive scope and bypasses the predefined role.",
      "Wrong: Binding operator to a target still grants more than the development pipeline needs.",
      "Correct: developer role scoped to the development delivery pipeline is least-privilege and Google-recommended."
    ]
  },
  {
    "id": 188,
    "topic": "Infrastructure as Code",
    "difficulty": 2,
    "question": "You are responsible for creating development environments for your company's development team. You want to create environments with identical IDEs for all developers while ensuring that these environments are not exposed to public networks. You need to choose the most cost-effective solution without impacting developer productivity. What should you do?",
    "options": [
      "A. Create multiple Compute Engine VM instances with a public IP address and use a Public NAT gateway. Configure an instance schedule to shut down the VMs.",
      "B. Create multiple Compute Engine VM instances without a public IP address. Configure an instance schedule to shut down the VMs.",
      "C. Create a Cloud Workstations private cluster. Create a workstation configuration with an idleTimeout parameter.",
      "D. Create a Cloud Workstations private cluster. Create a workstation configuration with a runningTimeout parameter."
    ],
    "correct": 2,
    "explanation": "idleTimeout stops idle workstations only — saving cost without interrupting developers mid-work (runningTimeout kills sessions outright).",
    "discussion": [
      {
        "user": "soady",
        "text": "Selected Answer: C. I choose C Why not D? runningTimeout will shut down the workstation whether or not it's still in use, while idleTimeout will only shut down if the machine is not being used. (2 votes)"
      },
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: D. D. Create a Cloud Workstations private cluster. Create a workstation configuration with a runningTimeout parameter. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 188,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "ExamTopics key says D but the community answer is C (67%): runningTimeout shuts a workstation down after a fixed time even mid-session; idleTimeout only stops unused workstations — the cost saving without the productivity hit. (Source typo 'idieTimeour' = idleTimeout.)",
    "conceptSummary": "Cost control on Cloud Workstations via idleTimeout.",
    "correctRationale": "A private Cloud Workstations cluster gives identical managed IDEs not exposed to public networks, and idleTimeout suspends workstations only when unused — cost savings without hurting productivity. runningTimeout shuts down workstations after a fixed duration even mid-session, impacting developers; Compute Engine VMs with schedules lack managed identical IDEs.",
    "optionRationales": [
      "Wrong: Public-IP VMs plus NAT expose the environments to public networks — against the requirement.",
      "Wrong: Scheduled shutdowns on plain VMs do not give managed identical IDEs and can cut off active work.",
      "Correct: Private workstation cluster + idleTimeout stops only idle workstations — cost saving without productivity impact.",
      "Wrong: runningTimeout kills workstations after a fixed time even mid-work — hurts productivity."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 187,
    "topic": "Org & IAM",
    "difficulty": 2,
    "question": "You work for a healthcare company and regulations require you to create all resources in a United States-based region. You attempted to create a secret in Secret Manager but received the following error message: Constraint constraints/gcp.resourceLocations violated for [orgpolicy:projects/000000] attempting to create a secret in [global] You need to resolve the error while remaining compliant with regulations. What should you do?",
    "options": [
      "A. Remove the organization policy referenced in the error message.",
      "B. Create the secret with an automatic replication policy.",
      "C. Create the secret with a user-managed replication policy.",
      "D. Add the global region to the organization policy referenced in the error message."
    ],
    "correct": 2,
    "explanation": "User-managed replication lets you pin the secret to US regions, satisfying the resourceLocations org constraint.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: C. C. Create the secret with a user-managed replication policy. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 187,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Secret Manager replication that complies with location constraints.",
    "correctRationale": "The error is the gcp.resourceLocations constraint rejecting the 'global' (automatic) replication. Creating the secret with a user-managed replication policy lets you specify US locations, satisfying the org policy. Removing or relaxing the policy breaks compliance, and automatic replication defaults to global.",
    "optionRationales": [
      "Wrong: Removing the org policy defeats the compliance requirement.",
      "Wrong: Automatic replication uses the global location — the exact thing the policy rejects.",
      "Correct: User-managed replication lets you constrain the secret to allowed US regions.",
      "Wrong: Adding 'global' to the allowed list removes the restriction the regulation requires."
    ]
  },
  {
    "id": 186,
    "topic": "Deployment Strategies",
    "difficulty": 2,
    "question": "You are deploying a new version of your application to a multi-zone Google Kubernetes Engine (GKE) cluster. The deployment is progressing smoothly, but you notice that some Pods in a specific zone are experiencing higher error rates. You need to selectively roll back the update for the Pods experiencing errors with minimal impact to users. What should you do?",
    "options": [
      "A. Scale down the Pods in the affected zone. Redeploy the new version of the application.",
      "B. Drain the affected nodes. Redeploy the new version of the application to the remaining nodes.",
      "C. Modify the Deployment to use the Pod template from the previous version of your application. Perform a rolling update to replace the Pods in the affected zone.",
      "D. Use the kubectl rollout undo command to roll back the entire deployment. Redeploy the new version of the application, excluding the affected zone."
    ],
    "correct": 2,
    "explanation": "Revert the pod template to the previous version and rolling-update — only bad pods are replaced progressively with minimal user impact.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: C. C. Modify the Deployment to use the Pod template from the previous version of your application. Perform a rolling update to replace the Pods in the affected zone. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 186,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Targeted rollback via pod-template revert + rolling update.",
    "correctRationale": "Rolling back the Deployment's pod template to the previous version lets the rolling update replace the failing pods progressively — minimal blast radius and no full deployment reversal. kubectl rollout undo would roll the entire deployment back (including healthy zones), and scaling/draining are zone-level infrastructure moves rather than an application rollback.",
    "optionRationales": [
      "Wrong: Scaling down in the zone removes capacity without restoring the working version.",
      "Wrong: Draining nodes is an infrastructure operation, not an application rollback.",
      "Correct: Reverting the pod template triggers a rolling update that progressively restores the good version.",
      "Wrong: rollout undo reverses the whole deployment, not just the affected zone."
    ]
  },
  {
    "id": 185,
    "topic": "CI/CD Pipelines",
    "difficulty": 1,
    "question": "You are configuring a CI pipeline. The build step for your CI pipeline integration testing requires access to APIs inside your private VPC network. Your security team requires that you do not expose API traffic publicly. You need to implement a solution that minimizes management overhead. What should you do?",
    "options": [
      "A. Use Cloud Build private pools to connect to the private VPC.",
      "B. Use Cloud Build to create a Compute Engine instance in the private VPC. Run the integration tests on the VM by using a startup script.",
      "C. Use Cloud Build as a pipeline runner. Configure a cross-region internal Application Load Balancer for API access.",
      "D. Use Cloud Build as a pipeline runner. Configure a global external Application Load Balancer with a Google Cloud Armor policy for API access."
    ],
    "correct": 0,
    "explanation": "Private pools put Cloud Build workers inside your VPC so builds reach private APIs without public exposure.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: A. A. Use Cloud Build private pools to connect to the private VPC. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 185,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Updated duplicate of question 162 — same scenario, refreshed product naming.",
    "conceptSummary": "Private VPC reach for Cloud Build (updated duplicate of Q162).",
    "correctRationale": "Private pools give the build workers a peered path into the private VPC — exactly the no-public-exposure, low-overhead requirement. Spinning up a VM inside the build is heavy, and internal/external load balancers still expose the API to a LB front rather than letting the build reach it privately. (Updated duplicate of question 162.)",
    "optionRationales": [
      "Correct: Private pools give the build direct VPC reach to private APIs — the least-overhead answer.",
      "Wrong: Creating a Compute Engine VM inside the build is extra machinery for what private pools already provide.",
      "Wrong: A cross-region internal ALB fronts the API but does not give Cloud Build network reach by itself.",
      "Wrong: A global external ALB exposes the API publicly — against the security requirement."
    ]
  },
  {
    "id": 184,
    "topic": "Performance & Cost",
    "difficulty": 2,
    "question": "You manage a retail website for your company. The website consists of several microservices running in a GKE Standard node pool with node autoscaling enabled. Each microservice has resource limits and a Horizontal Pod Autoscaler configured. During a busy period, you receive alerts for one of the microservices. When you check the Pods, half of them have the status OOMKilled, and the number of Pods is at the minimum autoscaling limit. You need to resolve the issue. What should you do?",
    "options": [
      "A. Update the node pool to use a machine type with more memory.",
      "B. Increase the maximum number of nodes in the node pool.",
      "C. Increase the maximum replica limit of the Horizontal Pod Autoscaler.",
      "D. Increase the memory resource limit of the microservice."
    ],
    "correct": 3,
    "explanation": "Pods at the replica floor are OOMKilled — the memory limit is too low; raise the pod's memory limit.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: D. D. Increase the memory resource limit of the microservice. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 184,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "OOMKilled pods = raise the pod memory limit.",
    "correctRationale": "OOMKilled means the kernel killed the container for exceeding its memory limit — the fix is raising the microservice's memory limit. The pod count is already at the HPA minimum (can't go lower), and node-level changes (machine type, max nodes) do not change the per-container limit being hit.",
    "optionRationales": [
      "Wrong: More node memory does not change the pod's own memory limit that triggers OOMKilled.",
      "Wrong: Pods are already at the minimum replica count; more nodes cannot add memory to each pod's limit.",
      "Wrong: The HPA is at its minimum — increasing its maximum does not relieve per-pod memory.",
      "Correct: Raising the container memory limit is the direct fix for OOMKilled pods."
    ]
  },
  {
    "id": 183,
    "topic": "Supply Chain Security",
    "difficulty": 1,
    "question": "You use Artifact Registry to store container images built with Cloud Build. You need to ensure that all existing and new images are continuously scanned for vulnerabilities. You also want to track who pushed each image to the registry. What should you do?",
    "options": [
      "A. Configure Artifact Registry to automatically scan new images and periodically re-scan all images. Use Cloud Audit Logs to track image uploads and identify the user who pushed each image.",
      "B. Configure Artifact Registry to send vulnerability scan results to a Cloud Storage bucket. Use a separate script to parse results and notify a security team.",
      "C. Configure Artifact Registry to automatically re-scan images daily. Enable Cloud Audit Logs to track these scans, and use Logs Explorer to identify vulnerabilities.",
      "D. Configure Artifact Registry to automatically trigger vulnerability scans for new image tags, and view scan results. Use Cloud Audit Logs to track image tag creation events."
    ],
    "correct": 0,
    "explanation": "Artifact Registry scanning (Artifact Analysis) scans on push and re-scans continuously; Cloud Audit Logs record who pushed each image.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: A. A. Configure Artifact Registry to automatically scan new images and periodically re-scan all images. Use Cloud Audit Logs to track image uploads and identify the user who pushed each image. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 183,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Continuous image scanning + pusher attribution via audit logs.",
    "correctRationale": "The two needs — continuous scanning of existing and new images, and tracking pushers — are served by Artifact Registry's automatic scan-on-push plus periodic re-scanning, and Cloud Audit Logs' data access records of image pushes. Bucket exports and tag-scan variants either lose coverage or conflate audit trails.",
    "optionRationales": [
      "Correct: Automatic scanning plus periodic re-scans covers existing and new images, and audit logs attribute each push.",
      "Wrong: Exporting results to a bucket and parsing them is manual plumbing and still does not attribute pushes.",
      "Wrong: Daily re-scans miss new-image scanning on push, and logs of scans are not push attribution.",
      "Wrong: Tag-triggered scans do not cover untagged pushes and image-tag events are not the same as image pushes."
    ]
  },
  {
    "id": 182,
    "topic": "Supply Chain Security",
    "difficulty": 2,
    "question": "You are running a web application that connects to an AlloyDB cluster by using a private IP address in your default VPC. You need to run a database schema migration in your CI/CD pipeline by using Cloud Build before deploying a new version of your application. You want to follow Google-recommended security practices. What should you do?",
    "options": [
      "A. Set up a Cloud Build private pool to access the database through a static external IP address. Configure the database to only allow connections from this IP address. Execute the schema migration script in the private pool.",
      "B. Create a service account that has permission to access the database. Configure Cloud Build to use this service account and execute the schema migration script in a private pool.",
      "C. Add the database username and password to Secret Manager. When running the schema migration script, retrieve the username and password from Secret Manager.",
      "D. Add the database username and encrypted password to the application configuration file. Use these credentials in Cloud Build to execute the schema migration script."
    ],
    "correct": 1,
    "explanation": "A dedicated service account with DB access, run from a Cloud Build private pool, reaches AlloyDB privately and securely.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: B. B. Create a service account that has permission to access the database. Configure Cloud Build to use this service account and execute the schema migration script in a private pool. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 182,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Private, least-privilege schema migration from Cloud Build.",
    "correctRationale": "The pipeline must reach a private-IP AlloyDB and authenticate securely — a private pool gives VPC reachability, and a dedicated service account with DB permissions gives identity-based access. A static-IP allowlist is brittle network auth, credentials via Secret Manager are unnecessary for IAM-capable access, and creds in the config file expose them.",
    "optionRationales": [
      "Wrong: A static external IP allowlist exposes a public path to the DB and is brittle.",
      "Correct: Private pool for VPC reachability plus a service account with DB permissions is the secure pattern.",
      "Wrong: Retrieving DB username/password from Secret Manager still uses shared credentials rather than workload identity.",
      "Wrong: Credentials in the config file put secrets into the build's source/config."
    ]
  },
  {
    "id": 181,
    "topic": "SLOs & Error Budgets",
    "difficulty": 1,
    "question": "You manage a critical API running on Cloud Run that serves an average of 10,000 requests per minute. You need to define service level objectives (SLOs) for availability and latency to ensure that the API meets user expectations, which include 99.9% availability and a maximum latency of 200 milliseconds for 95% of requests. You also need to ensure these SLOs are actively monitored and measured. What should you do?",
    "options": [
      "A. Configure Cloud Monitoring to send alerts when average API latency exceeds 150 ms or the error rate surpasses 0.1%.",
      "B. Prioritize latency as the only SLO, targeting 100 ms for 99% of requests.",
      "C. Set SLOs for 99% availability at 99% and 500 ms latency for 90% of requests. Use Cloud Monitoring to track SLOs and alert on violations.",
      "D. Set SLOs for the API by using availability and latency service level indicators. Use Cloud Monitoring to track SLOs and alert on violations."
    ],
    "correct": 3,
    "explanation": "Define availability and latency SLOs on the right SLIs and monitor them in Cloud Monitoring with violation alerts.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: D. D. Set SLOs for the API by using availability and latency service level indicators. Use Cloud Monitoring to track SLOs and alert on violations. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 181,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "SLO definition and monitoring for a Cloud Run API.",
    "correctRationale": "The SLOs must reflect the stated targets — 99.9% availability and p95 latency ≤200 ms — so define availability and latency SLOs on proper SLIs and use Cloud Monitoring to track them and alert on violations. A uses average latency and wrong thresholds, B drops availability and tightens latency arbitrarily, and C's numbers do not match the stated objectives.",
    "optionRationales": [
      "Wrong: Average latency and a 0.1% error-rate alert do not express the stated 99.9%/p95-200ms SLOs.",
      "Wrong: Latency-only SLO at 100 ms ignores the availability requirement and the stated 200 ms p95 target.",
      "Wrong: 99% availability and 500 ms at p90 are weaker than the stated objectives.",
      "Correct: Proper SLI-based SLOs tracked in Cloud Monitoring with violation alerts is the correct approach."
    ]
  },
  {
    "id": 180,
    "topic": "Performance & Cost",
    "difficulty": 1,
    "question": "You work for a company that offers a free photo processing application. You are designing the infrastructure for the backend service that processes the photos. The service:\n• Uses Cloud Storage to store both unprocessed and processed photos.\n• Can resume processing photos in the event of a failure.\n• Is not suitable for containerization. There is no SLO for the time taken to process a photo. You need to choose the most cost-effective solution for running the service. What should you do?",
    "options": [
      "A. Deploy the service by using Cloud Run.",
      "B. Deploy the service by using standard VMs with a 3-year committed use discount.",
      "C. Deploy the service by using GKE.",
      "D. Deploy the service by using Spot VMs."
    ],
    "correct": 3,
    "explanation": "Fault-tolerant batch work with no latency SLO and resumable processing is the textbook Spot VM workload — cheapest per unit.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: D. D. Deploy the service by using Spot VMs. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 180,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Cheapest compute for interruptible, resumable batch work.",
    "correctRationale": "The service resumes after failure, has no time SLO, and cannot be containerized — so preemptible Spot VMs give the deepest discount with no downside that matters here. Cloud Run needs containers, a 3-year CUD overpays for fixed capacity you do not need, and GKE also implies containers plus orchestration overhead.",
    "optionRationales": [
      "Wrong: Cloud Run requires containerization, which the service is unsuitable for.",
      "Wrong: A 3-year committed-use discount pays for always-on capacity a fault-tolerant batch job does not need.",
      "Wrong: GKE implies containers and adds orchestration overhead for a simple batch job.",
      "Correct: Spot VMs are the cheapest option and preemption is harmless for a resumable, SLO-free workload."
    ]
  },
  {
    "id": 179,
    "topic": "CI/CD Pipelines",
    "difficulty": 1,
    "question": "You are troubleshooting a failed deployment in your CI/CD pipeline. The deployment logs indicate that the application container failed to start due to a missing environment variable. You need to identify the root cause and implement a solution within your CI/CD workflow to prevent this issue from recurring. What should you do?",
    "options": [
      "A. Use a canary deployment strategy.",
      "B. Implement static code analysis in the CI pipeline.",
      "C. Run integration tests in the CI pipeline.",
      "D. Enable Cloud Audit Logs for the deployment."
    ],
    "correct": 2,
    "explanation": "A missing env var is exactly what integration tests catch — running them in CI prevents this deployment failure class.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: C. C. Run integration tests in the CI pipeline. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 179,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Catching missing config in CI with integration tests.",
    "correctRationale": "The container failed to start because a required environment variable was missing — a defect integration tests expose by running the real component configured as in production. Canary would still deploy the broken config, static analysis does not check runtime env wiring, and audit logs record what happened rather than prevent it.",
    "optionRationales": [
      "Wrong: A canary still ships the misconfigured container; it just fails slower.",
      "Wrong: Static code analysis does not detect a missing runtime environment variable.",
      "Correct: Integration tests exercise the app in a realistic configuration and fail fast on the missing env var.",
      "Wrong: Audit Logs record access/config changes after the fact — they do not prevent the failure."
    ]
  },
  {
    "id": 178,
    "topic": "CI/CD Pipelines",
    "difficulty": 3,
    "question": "Your company has an application deployed on Google Kubernetes Engine (GKE) consisting of 12 microservices. Multiple teams are working concurrently on various features across three environments: Dev, Staging, and Prod. Developers report dependency test failures and delayed releases due to deployments from multiple feature branches in the shared Dev GKE cluster. You need to implement a cost-effective solution for developers to test their microservice features in a stable development environment isolated from other development activities. What should you do?",
    "options": [
      "A. Automate CI pipelines by using Cloud Build for container image creation and Kubernetes manifest updates from main branch merge requests. Integrate with Config Sync to test new images in dynamically created namespaces on the Dev GKE cluster with autoscaling enabled. Implement a post-test namespace cleanup routine.",
      "B. Automate CI pipelines by using Cloud Build to create container images and update Kubernetes manifests for each commit. Use Cloud Deploy for progressive delivery to Dev, Staging, and Prod GKE clusters. Enable Config Sync for consistent Kubernetes configurations across environments.",
      "C. Use Cloud Build to automate CI pipelines and update Kubernetes manifest files from feature branch commits. Integrate with Config Sync to test new images in dynamically created namespaces on the Dev GKE cluster with autoscaling enabled. Implement a post-test namespace cleanup routine.",
      "D. Use Cloud Build to automate CI pipelines and update Kubernetes manifest files from feature branch commits. Integrate with Config Sync to test new images in dynamically created GKE Dev clusters for each feature branch, which are deleted upon merge request."
    ],
    "correct": 2,
    "explanation": "Feature-branch builds into throwaway namespaces on the shared Dev cluster isolate each feature's tests cheaply; a cluster per branch is far costlier.",
    "discussion": [
      {
        "user": "f1aa100",
        "text": "Selected Answer: A. Answer A because \"updates from main branch merge requests\" sounds better than updates from feature branch commits. (1 vote)"
      },
      {
        "user": "soady",
        "text": "Selected Answer: A. I'll take A over C. Merges to main would be more stable for the developers compared to the feature branches. (1 vote)"
      },
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: C. C. Use Cloud Build to automate CI pipelines and update Kubernetes manifest files from feature branch commits. Integrate with Config Sync to test new images in dynamically created namespaces on the Dev GKE cluster with autoscaling enabled. Implement a post-test namespace cleanup routine. (1 vote)"
      },
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: C. C is good. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 178,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics' suggested A (community 50/50): A builds from main-branch merges so features are tested only post-merge; C builds from feature branches into throwaway namespaces on the shared Dev cluster — isolated and cheap, versus a cluster per branch in D. Hyphenation artifacts in the source stem/options were cleaned.",
    "conceptSummary": "Isolated feature testing via ephemeral namespaces on the shared Dev cluster.",
    "correctRationale": "The complaints — dependency test failures and delayed releases — come from multiple feature branches colliding in one shared environment. Building from feature-branch commits (not main merges, where features are only tested after they are already merged) into dynamically created namespaces on the autoscaled Dev cluster gives isolation at namespace cost, with cleanup after tests. A GKE cluster per feature branch (D) is much more expensive; B is progressive delivery rather than isolation.",
    "optionRationales": [
      "Wrong: Building from main-branch merges tests features only after they are already merged — the instability developers are complaining about.",
      "Wrong: Progressive delivery to Dev/Staging/Prod does not isolate concurrent feature work in the shared Dev cluster.",
      "Correct: Feature-branch commits into ephemeral namespaces on the shared autoscaled Dev cluster isolate features cheaply, with cleanup.",
      "Wrong: A dedicated cluster per feature branch works but is far costlier than namespaces."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 177,
    "topic": "Troubleshooting & APM",
    "difficulty": 1,
    "question": "You receive a Cloud Monitoring alert indicating potential malicious activity on a node in your Google Kubernetes Engine (GKE) cluster. The alert suggests a possible compromised container running on that node. You need to isolate this node to prevent further compromise while investigating the issue. You also want to minimize disruption to applications running on the cluster. What should you do?",
    "options": [
      "A. Taint the suspicious node to prevent Pods that have interacted with it from being scheduled on other nodes in the cluster",
      "B. Scale down the deployment associated with the compromised container to zero other nodes",
      "C. Restart the node to disrupt the malicious activity, and force all Pods to be restructured on other nodes.",
      "D. Cordon the node to prevent new Pods from being scheduled, the drain the node to safely remove existing Pods and reschedule them to other nodes."
    ],
    "correct": 3,
    "explanation": "Cordon stops new pods landing; drain evicts existing pods to healthy nodes — isolate the node with minimal app disruption.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: D. D. Cordon the node to prevent new Pods from being scheduled, the drain the node to safely remove existing Pods and reschedule them to other nodes. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 177,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Isolating a compromised node: cordon then drain.",
    "correctRationale": "Isolating a suspect node without disrupting apps is the standard cordon+drain: cordon prevents new scheduling, drain evicts running pods safely so they reschedule elsewhere. A taint without drain does not remove existing pods, scaling the deployment to zero kills the app, and restarting the node destroys evidence.",
    "optionRationales": [
      "Wrong: A taint prevents future scheduling but leaves the current pods — including the compromised one — running.",
      "Wrong: Scaling the deployment to zero disrupts the app and still does not isolate the node.",
      "Wrong: Restarting destroys forensic evidence and is more disruptive than draining.",
      "Correct: Cordon then drain isolates the node and safely reschedules its pods elsewhere."
    ]
  },
  {
    "id": 176,
    "topic": "CI/CD Pipelines",
    "difficulty": 2,
    "question": "You are configuring a CI pipeline in Cloud Build. When you test the pipeline, the following cloudbuild.yaml definition results in 5 minutes each on the foo step and bar step, as shown in the image. The foo step and bar step are independent of each other. The baz step needs both the foo and bar steps to be completed before starting. You want to use parallelism to reduce build times. What should you do?",
    "options": [
      "A. Modify the build script to add options: machineType: 'E2_HIGHCPU_8'",
      "B. Modify the build script to add options: machineType: 'E2_HIGHCPU_32'",
      "C. Change the build script to: steps: - name: foo, id: foo; - name: bar, id: bar, waitFor: ['foo']; - name: baz, id: baz, waitFor: ['-']",
      "D. Change the build script to: steps: - name: foo, id: foo; - name: bar, id: bar, waitFor: ['-']; - name: baz, id: baz, waitFor: ['foo', 'bar']"
    ],
    "correct": 3,
    "explanation": "waitFor: ['-'] starts foo and bar in parallel immediately; baz waits on both — cutting foo+bar from 10 min serial to ~5 min parallel.",
    "discussion": [
      {
        "user": "09bd94b",
        "text": "Selected Answer: D. D is correct (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 176,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Data fix: on ExamTopics options C and D are images of the cloudbuild.yaml; they are reconstructed from the thread/mirrors. Option D is the one where foo and bar run in parallel (waitFor: ['-']) and baz waits on both.",
    "conceptSummary": "Parallel Cloud Build steps via waitFor.",
    "correctRationale": "By default steps run sequentially. Setting waitFor: ['-'] on foo and bar starts both at build start (parallel), and baz waits on ['foo','bar'] — so the two 5-minute steps run concurrently, roughly halving that phase. Machine type bumps (E2_HIGHCPU_*) speed each step but keep the serial wait structure. (C/D were images in the source; reconstructed per the adjudication.)",
    "optionRationales": [
      "Wrong: A bigger machine speeds each step but foo and bar still run serially.",
      "Wrong: Same — more CPU, same serial execution.",
      "Wrong: This ordering has baz wait on '-' (start) rather than on both foo and bar — it can race ahead before they finish.",
      "Correct: waitFor ['-'] parallelizes foo and bar, and baz waits on both — the correct dependency graph."
    ],
    "images": [
      {
        "url": "/question-images/gcp-pcdoe/q176-cloudbuild-steps.png",
        "alt": "cloudbuild.yaml with three steps named foo, bar, baz, each with matching id and no waitFor field — all run sequentially."
      }
    ]
  },
  {
    "id": 175,
    "topic": "Org & IAM",
    "difficulty": 2,
    "question": "You are designing a new multi-tenant Google Kubernetes Engine (GKE) cluster for a customer. Your customer is concerned with the risks associated with long-lived credentials use. The customer requires that each GKE workload has the minimum Identity and Access Management (IAM) permissions set following the principle of least privilege (PoLP). You need to design an IAM impersonation solution while following Google-recommended practices. What should you do?",
    "options": [
      "A. Step 1: Create a Google service account.\nStep 2: Create a node pool, and set the Google service account as the default identity.\nStep 3: Ensure that workloads can only run on the designated node pool by using node selectors, taints, and tolerations.\nStep 4: Repeat for each workload.",
      "B. Step 1: Create a Google service account.\nStep 2: Create a node pool without taints, and set the Google service account as the default identity.\nStep 3: Grant IAM permissions to the Google service account.",
      "C. Step 1: Create a Google service account.\nStep 2: Create a Kubernetes service account in a Workload Identity-enabled cluster.\nStep 3: Link the Google service account with the Kubernetes service account by using the roles/iam.workloadIdentityUser role and iam.gke.io/gcp-service-account annotation.\nStep 4: Map the Kubernetes service account to the workload.\nStep 5: Repeat for each workload.",
      "D. Step 1: Create a Google service account.\nStep 2: Create a service account key for the Google service account.\nStep 3: Create a Kubernetes secret with a service account key.\nStep 4: Ensure that workload mounts the secret and set the GOOGLE_APPLICATION_CREDENTIALS environment variable to point at the mount path.\nStep 5: Repeat for each workload."
    ],
    "correct": 2,
    "explanation": "Workload Identity links each Kubernetes service account to a Google service account — least-privilege, no keys, per-workload.",
    "discussion": [
      {
        "user": "cachopo",
        "text": "Selected Answer: C. The recommended solution is to create a Google service account, create a Kubernetes service account in a Workload Identity-enabled cluster, and link the Google service account with the Kubernetes service account using the roles/iam.workloadIdentityUser role and the iam.gke.io/gcp-service-account annotation. By following these steps, workloads can impersonate the Google service account with the minimum IAM permissions required, ensuring the principle of least privilege (PoLP) is followed. This approach is the most secure and efficient method for enabling workload IAM... (1 vote)"
      },
      {
        "user": "Mileke",
        "text": "Selected Answer: C. This is the correct order of steps to be taken to perform service account impersonation using Workload Identity. Doc: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 175,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Per-workload GCP identity via Workload Identity.",
    "correctRationale": "Workload Identity maps each workload's Kubernetes service account to its own Google service account (via roles/iam.workloadIdentityUser and the iam.gke.io/gcp-service-account annotation) — per-workload least privilege with no long-lived keys. Node-pool identities share one SA per node, and JSON-key secrets are the credential risk to eliminate.",
    "optionRationales": [
      "Wrong: A Google SA as the node-pool identity shares one identity across all pods on those nodes.",
      "Wrong: Same shared-identity problem — all workloads on the pool get the node's SA.",
      "Correct: Workload Identity binds KSA→GSA per workload with no keys — the recommended impersonation model.",
      "Wrong: A JSON key in a mounted secret is exactly the long-lived credential risk to avoid."
    ]
  },
  {
    "id": 174,
    "topic": "Deployment Strategies",
    "difficulty": 1,
    "question": "You have an application running in production on Cloud Run. Your team recently finished developing a new version (revision B) of the application. You want to test the new revision on 10% of your clients by using the least amount of effort. What should you do?",
    "options": [
      "A. Deploy the new revision to the existing service without traffic allocated. Tag the revision and share the URL with 10% of your clients.",
      "B. Create a new service, and deploy the new revisions on the new service. Deploy a new revision of the old application where the application routes a percentage of the traffic to the new service.",
      "C. Create a new service, and deploy the new revision on that new service. Create a load balancer to split the traffic between the old service and the new service.",
      "D. Deploy the new revision to the existing service without traffic allocated. Split the traffic between the old revision and the new revision."
    ],
    "correct": 3,
    "explanation": "Deploy the new revision with no traffic, then split a 10% slice to it — the built-in Cloud Run canary mechanism.",
    "discussion": [
      {
        "user": "LONGBOW_RA",
        "text": "Selected Answer: D. Split traffic between revisions has the least amount of effort (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 174,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Cloud Run traffic splitting for a 10% rollout.",
    "correctRationale": "Deploy revision B to the existing service with no traffic, then use traffic splitting to send it 10% — Cloud Run's minimal-effort per-revision traffic control. A tag URL only reaches users you explicitly share it with, a new service duplicates config, and a load balancer between services is needless machinery.",
    "optionRationales": [
      "Wrong: A tagged revision URL requires sharing it with 10% of clients by hand — not a traffic split.",
      "Wrong: A separate service plus in-app routing is custom work for a built-in feature.",
      "Wrong: A load balancer between two services is extra infrastructure for what Cloud Run does natively.",
      "Correct: Deploy with no traffic, then split traffic between revisions — the least-effort 10% rollout."
    ]
  },
  {
    "id": 173,
    "topic": "Logging",
    "difficulty": 3,
    "question": "Your company stores a large volume of infrequently used data in Cloud Storage. The projects in your company's CustomerService folder access Cloud Storage frequently, but store very little data. You want to enable Data Access audit logging across the company to identify data usage patterns. You need to exclude the CustomerService folder projects from Data Access audit logging. What should you do?",
    "options": [
      "A. Enable Data Access audit logging for Cloud Storage at the organization level, and configure exempted principals to include users of the CustomerService folder.",
      "B. Enable Data Access audit logging for Cloud Storage at the organization level, with no additional configuration.",
      "C. Enable Data Access audit logging for Cloud Storage for all projects and folders other than the CustomerService folder.",
      "D. Enable Data Access audit logging for Cloud Storage for all projects and folders, and configure exempted principals to include users of the CustomerService folder."
    ],
    "correct": 2,
    "explanation": "Enable Data Access auditing on every folder/project except CustomerService — the only option that actually excludes those projects.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: C. C. Enable Data Access audit logging for Cloud Storage for all projects and folders other than the CustomerService folder. (2 votes)"
      },
      {
        "user": "GCP001",
        "text": "Selected Answer: D. A and B is wrong as you can enable data access logs on organisation level than you can not disable folder or project level, https://cloud.google.com/logging/docs/audit/configure-data-access. D) Looks more feasible and uniform way. (2 votes)"
      },
      {
        "user": "exam987_654",
        "text": "Selected Answer: A. Question says across company, so Organisation and we need to excule the CustomerService folder (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 173,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "ExamTopics key says C while its community tally showed D/C/A tied. The note stands: audit configs inherit additively, and exempted principals exclude users, not projects — so per-folder/project enablement everywhere except CustomerService is the only option that excludes those projects.",
    "conceptSummary": "Excluding a folder from additive audit-config inheritance.",
    "correctRationale": "Audit configs inherit additively down the hierarchy: enabling Data Access at the org level cannot be switched off on the CustomerService folder, and exempted principals exclude users, not projects — so A and D leak CustomerService projects' data-access entries. Enabling on every project/folder except CustomerService (C) is the only option that truly excludes them.",
    "optionRationales": [
      "Wrong: Org-level enable cannot be turned off on a folder, and exempted principals exclude users, not projects.",
      "Wrong: Org-level enable with no exceptions logs CustomerService too.",
      "Correct: Enabling everywhere except the CustomerService folder is the only configuration that actually excludes it.",
      "Wrong: Same problem as A — exemptions are per-principal, not per-project."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 172,
    "topic": "Monitoring & Alerting",
    "difficulty": 1,
    "question": "Your organization is running multiple Google Kubernetes Engine (GKE) clusters in a project. You need to design a highly-available solution to collect and query both domain-specific workload metrics and GKE default metrics across all clusters, while minimizing operational overhead. What should you do?",
    "options": [
      "A. Use Prometheus operator to install Prometheus in every cluster and scrape the metrics. Configure remote-write to one central Prometheus. Query the central Prometheus instance.",
      "B. Enable managed collection on every GKE cluster. Query the metrics in BigQuery.",
      "C. Use Prometheus operator to install Prometheus in every cluster and scrape the metrics. Ensure that a Thanos sidecar is enabled on every Prometheus instance. Configure Thanos in the central cluster. Query the central Thanos instance.",
      "D. Enable managed collection on every GKE cluster. Query the metrics in Cloud Monitoring."
    ],
    "correct": 3,
    "explanation": "Managed Service for Prometheus collection on every cluster + querying in Cloud Monitoring gives HA metrics with the least ops.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: D. D. Enable managed collection on every GKE cluster. Query the metrics in Cloud Monitoring. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 172,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Fleet-wide Prometheus metrics via managed collection.",
    "correctRationale": "Managed collection on each GKE cluster feeds all workload and default metrics into Managed Service for Prometheus, queryable centrally in Cloud Monitoring — Google runs the HA collection layer. Self-run Prometheus with remote-write or Thanos means operating extra infrastructure; BigQuery is not the metrics query plane here.",
    "optionRationales": [
      "Wrong: Self-managed Prometheus plus remote-write adds servers to run and a HA story to build yourself.",
      "Wrong: BigQuery is not the Prometheus/GKE metrics query surface.",
      "Wrong: Thanos federation is exactly the operational overhead the question wants to minimize.",
      "Correct: Managed collection feeds everything into Cloud Monitoring for central querying with no infrastructure to run."
    ]
  },
  {
    "id": 171,
    "topic": "Logging",
    "difficulty": 2,
    "question": "Your company runs an ecommerce business. The application responsible for payment processing has structured JSON logging with the following schema, as shown in the image. Capture and access of logs from the payment processing application is mandatory for operations, but the jsonPayload.user_email field contains personally identifiable information (PII). Your security team does not want the entire engineering team to have access to PII. You need to stop exposing PII to the engineering team and restrict access to security team members only. What should you do?",
    "options": [
      "A. Apply the conditional role binding resource.name.extract(\"locations/global/buckets/{bucket}/\") == \"_Default\" to the _Default bucket.",
      "B. Apply a jsonPayload.user_email restricted field to the _Default bucket. Grant the Log Field Accessor role to the security team members.",
      "C. Apply a jsonPayload.user_email exclusion filter to the _Default bucket.",
      "D. Modify the application to toggle inclusion of user_email when the LOG_USER_EMAIL environment variable is set to true. Restrict the engineering team members who can change the production environment variable by using the CODEOWNERS file."
    ],
    "correct": 1,
    "explanation": "A restricted log field on jsonPayload.user_email hides it from everyone except holders of the Log Field Accessor role — the security team.",
    "discussion": [
      {
        "user": "GCP001",
        "text": "Selected Answer: B. B. This is right approach. Check the doc - https://cloud.google.com/logging/docs/field-level-acl (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 171,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Field-level PII protection in Cloud Logging via restricted fields.",
    "correctRationale": "Cloud Logging supports restricting specific JSON payload fields on a bucket: the field stays stored but is hidden from readers lacking Log Field Accessor. That keeps ops visibility for everything else while PII is readable only by security. An exclusion filter drops the field entirely (ops lose it), a conditional binding grants bucket access rather than field masking, and an env-var toggle is a fragile app-level hack.",
    "optionRationales": [
      "Wrong: A conditional binding on the bucket controls bucket access, not field visibility — engineers with access still see the PII field.",
      "Correct: A restricted field masks user_email for everyone except Log Field Accessor holders — exactly the requirement.",
      "Wrong: An exclusion filter drops the field for everyone, including the security team that must retain access.",
      "Wrong: An env-var flag plus CODEOWNERS is an application workaround that is fragile and does not protect logs already written."
    ],
    "images": [
      {
        "url": "/question-images/gcp-pcdoe/q171-payment-log-schema.png",
        "alt": "Log entry JSON with logName, resource, httpRequest, and jsonPayload fields user_email, method, and code."
      }
    ]
  },
  {
    "id": 170,
    "topic": "Org & IAM",
    "difficulty": 2,
    "question": "Your company allows teams to self-manage Google Cloud projects, including project-level Identity and Access Management (IAM). You are concerned that the team responsible for the Shared VPC project might accidentally delete the project, so a lien has been placed on the project. You need to design a solution to restrict Shared VPC project deletion to those with the resourcemanager.projects.updateLiens permission at the organization level. What should you do?",
    "options": [
      "A. Instruct teams to only perform IAM permission management as code with Terraform.",
      "B. Enable VPC Service Controls for the container.googleapis.com API service.",
      "C. Revoke the resourcemanager.projects.updateLiens permission from all users associated with the project.",
      "D. Enable the compute.restrictXpnProjectLienRemoval organization policy constraint."
    ],
    "correct": 3,
    "explanation": "The compute.restrictXpnProjectLienRemoval org constraint limits lien removal — the deed that unblocks Shared VPC project deletion — to org-level holders of updateLiens.",
    "discussion": [
      {
        "user": "kitaharazyl",
        "text": "Selected Answer: D. D. Enable the compute.restrictXpnProjectLienRemoval organization policy constraint. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 170,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Org-policy guardrail on Shared VPC host-project liens.",
    "correctRationale": "Deletion is blocked by the lien; restricting lien removal is exactly what the compute.restrictXpnProjectLienRemoval organization policy does — only principals holding resourcemanager.projects.updateLiens at the org level can lift it. Terraform-only IAM is a process rule, VPC Service Controls is a perimeter feature unrelated to liens, and revoking updateLiens per-user does not scale.",
    "optionRationales": [
      "Wrong: A team process rule does not technically prevent lien removal by anyone holding the permission.",
      "Wrong: VPC Service Controls guard data-plane API access, not project deletion mechanics.",
      "Wrong: Revoking the permission from project users still leaves anyone else with org-level permission able to remove the lien.",
      "Correct: The org-policy constraint is the mechanism that restricts Shared VPC lien removal to org-level permission holders."
    ]
  },
  {
    "id": 169,
    "topic": "Logging",
    "difficulty": 1,
    "question": "Your company runs services on Google Cloud. Each team runs their applications in a dedicated project. New teams and projects are created regularly. Your security team requires that all logs are processed by a security information and event management (SIEM) system. The SIEM ingests logs by using Pub/Sub. You must ensure that all existing and future logs are scanned by the SIEM. What should you do?",
    "options": [
      "A. Create an organization-level aggregated sink with a siem log bucket as the destination. Set an inclusion filter to include all logs.",
      "B. Create a folder-level aggregated sink with a siem Pub/Sub topic as the destination. Set an inclusion filter to include all logs. Repeat for each folder.",
      "C. Create an organization-level aggregated sink with a siem Pub/Sub topic as the destination. Set an inclusion filter to include all logs.",
      "D. Create a project-level logging sink with a siem Pub/Sub topic as the destination. Set an inclusion filter to include all logs. Repeat for each project."
    ],
    "correct": 2,
    "explanation": "One org-level aggregated sink to a Pub/Sub topic covers all current and future projects — the SIEM consumes from the topic.",
    "discussion": [
      {
        "user": "roaming_panda",
        "text": "Selected Answer: C. since we are using another app/system , so best to use queue solution in between it i.e pubsub so C (2 votes)"
      },
      {
        "user": "cachopo",
        "text": "Selected Answer: C. Creating an organization-level aggregated sink with a siem Pub/Sub topic as the destination and setting an inclusion filter to include all logs is the best approach. This will ensure that logs from all existing and future projects within the organization are automatically captured and sent to the SIEM system via Pub/Sub. By setting the sink at the organization level, you ensure that all logs, regardless of which team or project they belong to, are processed by the SIEM without requiring manual configuration for each new project or team. (1 vote)"
      },
      {
        "user": "LONGBOW_RA",
        "text": "Selected Answer: C. SIEM ingests logs by using Pub/Sub (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 169,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Org-wide log forwarding to a SIEM via Pub/Sub.",
    "correctRationale": "The SIEM ingests via Pub/Sub, and coverage must include future projects — an organization-level aggregated sink with a Pub/Sub topic destination captures every project's logs automatically. Folder-level sinks must be repeated per folder and miss projects outside folders; project-level sinks multiply endlessly; a log bucket is not a Pub/Sub feed.",
    "optionRationales": [
      "Wrong: A log bucket does not feed a Pub/Sub-ingesting SIEM.",
      "Wrong: Folder sinks miss non-foldered projects and must be replicated per folder.",
      "Correct: One org-level aggregated sink to Pub/Sub covers all existing and future projects in the org.",
      "Wrong: Per-project sinks must be created for every new project forever."
    ]
  },
  {
    "id": 168,
    "topic": "Infrastructure as Code",
    "difficulty": 1,
    "question": "Your company runs applications in Google Kubernetes Engine (GKE). Application developers frequently create cloud resources to support their applications. You need to give developers the ability to manage infrastructure as code while adhering to Google-recommended practices. You want to manage infrastructure as code through Kubernetes Custom Resource Definitions (CRDs) and ensure that your chosen setup can be supported by the Google Cloud Support Portal. What should you do?",
    "options": [
      "A. Configure Cloud Build with a Terraform builder to execute the terraform plan and terraform apply commands.",
      "B. Install and configure Crossplane in GKE.",
      "C. Configure a GitHub Action with a Terraform builder to execute the terraform plan and terraform apply commands as part of the pull request process.",
      "D. Install and configure Config Connector in GKE."
    ],
    "correct": 3,
    "explanation": "Config Connector exposes GCP resources as Kubernetes CRDs and is a Google product covered by Cloud Support.",
    "discussion": [
      {
        "user": "09bd94b",
        "text": "Selected Answer: D. D is the right choice (1 vote)"
      },
      {
        "user": "cachopo",
        "text": "Selected Answer: D. Installing and configuring Config Connector in GKE is the best option. Config Connector allows you to manage Google Cloud resources using Kubernetes Custom Resource Definitions (CRDs). It integrates tightly with GKE, enabling developers to define, deploy, and manage Google Cloud resources as Kubernetes resources. This aligns with Google-recommended practices for managing infrastructure as code, and it is supported by the Google Cloud Support Portal, ensuring that your organization can get the necessary support for any issues. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 168,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "CRD-based GCP resource management with support coverage.",
    "correctRationale": "The two requirements — manage infra as Kubernetes CRDs and have Google Cloud Support back the setup — point to Config Connector, Google's supported product that maps GCP resources to CRDs. Terraform builders and GitHub Actions are CLI pipelines, not CRDs; Crossplane is third-party and outside Google's support scope.",
    "optionRationales": [
      "Wrong: Terraform in Cloud Build is a pipeline runner, not CRD-based infra management.",
      "Wrong: Crossplane is third-party; it is not covered by Google Cloud Support.",
      "Wrong: A GitHub Action running Terraform is not a CRD model and adds a second CI surface.",
      "Correct: Config Connector manages GCP resources as CRDs and is a Google-supported product."
    ]
  },
  {
    "id": 167,
    "topic": "SLOs & Error Budgets",
    "difficulty": 2,
    "question": "You need to define SLOs for a high-traffic web application. Customers are currently happy with the application performance and availability. Based on current measurement, the 90th percentile of latency is 160 ms and the 95th percentile of latency is 300 ms over a 28-day window. What latency SLO should you publish?",
    "options": [
      "A. 90th percentile - 150 ms 95th percentile - 290 ms",
      "B. 90th percentile - 160 ms 95th percentile - 300 ms",
      "C. 90th percentile - 190 ms 95th percentile - 330 ms",
      "D. 90th percentile - 300 ms 95th percentile - 450 ms"
    ],
    "correct": 2,
    "explanation": "190/330 leaves headroom above the observed 160/300 — publish an SLO slightly looser than current performance.",
    "discussion": [
      {
        "user": "LONGBOW_RA",
        "text": "Selected Answer: C. When setting up SLO based on SLI, there should be some margin, but not too much. Therefore C (2 votes)"
      },
      {
        "user": "ricardovazz",
        "text": "Selected Answer: B. In B SLO makes sense because it pushes engineering teams to maintain strong performance. Then, a more relaxed SLA could be introduced to reduce financial risk, and so that consumers don´t assume current performance as the SLA. (2 votes)"
      },
      {
        "user": "cachopo",
        "text": "Selected Answer: B. The appropriate latency SLO to publish would be 90th percentile - 160 ms and 95th percentile - 300 ms, as these values reflect the current performance measurements over a 28-day window. These values are based on the actual data, and since customers are already happy with the application's performance and availability, it's reasonable to set the SLOs in line with the current performance metrics. (1 vote)"
      },
      {
        "user": "Mileke",
        "text": "Selected Answer: C. SLO should never be the same as current performance. You should always leave some room for error budget. (1 vote)"
      },
      {
        "user": "bartrek",
        "text": "Selected Answer: C. C since B does not provide any error budget at all and D seem too relaxed (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 167,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "ExamTopics key says B but the community answer is C (57%), consistent with question 65 — leave headroom above current performance instead of pinning the SLO to it.",
    "conceptSummary": "SLO slightly above observed latency, same as Q65.",
    "correctRationale": "Users are happy at p90=160 ms / p95=300 ms, so the publishable SLO should sit slightly looser than observed performance — 190/330 (C). Pinning it exactly at observed (B, the ExamTopics key) leaves no error budget; tighter (A) commits beyond what users need; much looser (D) fails to protect real experience.",
    "optionRationales": [
      "Wrong: Tighter than observed performance commits the team beyond what users already accept.",
      "Wrong: Setting the SLO exactly at the measurement leaves zero error budget for normal variance.",
      "Correct: 190/330 gives headroom above the observed 160/300 while still guarding user experience.",
      "Wrong: 300/450 is so loose it stops detecting meaningful degradation."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 166,
    "topic": "CI/CD Pipelines",
    "difficulty": 1,
    "question": "Your organization is starting to containerize with Google Cloud. You need a fully managed storage solution for container images and Helm charts. You need to identify a storage solution that has native integration into existing Google Cloud services, including Google Kubernetes Engine (GKE), Cloud Run, VPC Service Controls, and Identity and Access Management (IAM). What should you do?",
    "options": [
      "A. Use Docker to configure a Cloud Storage driver pointed at the bucket owned by your organization.",
      "B. Configure an open source container registry server to run in GKE with a restrictive role-based access control (RBAC) configuration.",
      "C. Configure Artifact Registry as an OCI-based container registry for both Helm charts and container images.",
      "D. Configure Container Registry as an OCI-based container registry for container images."
    ],
    "correct": 2,
    "explanation": "Artifact Registry is the managed OCI registry that stores both images and Helm charts with native GKE/Cloud Run/IAM/VPC-SC integration.",
    "discussion": [
      {
        "user": "koo_kai",
        "text": "Selected Answer: C. https://cloud.google.com/artifact-registry/docs/helm (4 votes)"
      },
      {
        "user": "activist",
        "text": "Answer C is correct to me. (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "C: Artifact Registry is a fully managed service in Google Cloud that supports OCI-based container images as well as Helm charts. It has native integration with Google Kubernetes Engine (GKE), Cloud Run, VPC Service Controls, and Identity and Access Management (IAM). https://cloud.google.com/artifact-registry/docs/supported-formats#container Eliminated Options: A: would require additional management overhead and wouldn't provide native integration with the mentioned Google Cloud services. B: Configuring an open source container registry server to run in GKE would require more management... (1 vote)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: C. Artifact Registry is a fully managed, scalable, and secure artifact storage solution that integrates seamlessly with other Google Cloud services. It is designed for storing various artifacts, including container images and Helm charts. Here's why option C is the most suitable choice: Options A, B, and D might have their use cases, but none of them provide the same level of seamless integration with Google Cloud services, including GKE, Cloud Run, VPC Service Controls, and IAM, as Artifact Registry does. Additionally, Artifact Registry supports both container images and... (1 vote)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: C. Vote C (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 166,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "One managed registry for images and Helm charts.",
    "correctRationale": "Artifact Registry stores container images and OCI-format Helm charts in one fully managed service with native GKE, Cloud Run, IAM, and VPC Service Controls integration. A Docker+GCS driver is DIY and helm-only, a self-hosted registry on GKE adds ops, and Container Registry is legacy and does not cover Helm.",
    "optionRationales": [
      "Wrong: Docker with a GCS driver is self-managed plumbing, not a managed registry with native integrations.",
      "Wrong: Running your own OCI registry on GKE adds operations and lacks the managed integrations.",
      "Correct: Artifact Registry natively hosts images and Helm charts with all the required integrations.",
      "Wrong: Container Registry is deprecated and does not handle Helm charts."
    ]
  },
  {
    "id": 165,
    "topic": "Performance & Cost",
    "difficulty": 2,
    "question": "You are monitoring a service that uses n2-standard-2 Compute Engine instances that serve large files. Users have reported that downloads are slow. Your Cloud Monitoring dashboard shows that your VMs are running at peak network throughput. You want to improve the network throughput performance. What should you do?",
    "options": [
      "A. Add additional network interface controllers (NICs) to your VMs.",
      "B. Deploy a Cloud NAT gateway and attach the gateway to the subnet of the VMs.",
      "C. Change the machine type for your VMs to n2-standard-8.",
      "D. Deploy the Ops Agent to export additional monitoring metrics."
    ],
    "correct": 2,
    "explanation": "n2-standard-2 tops out on network bandwidth; n2-standard-8 quadruples the egress ceiling for the file-serving VMs.",
    "discussion": [
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: C. Network throughput performance is often associated with the compute power of the virtual machines. Upgrading your VM instance type to one with more CPU and memory resources, like n2-standard-8, can significantly improve the network performance (4 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: C. https://cloud.google.com/compute/docs/general-purpose-machines#n2-standard \"Neither additional virtual network interfaces (vNICs) nor additional IP addresses per vNIC increase ingress or egress bandwidth for a VM. For example, a C3 VM with 22 vCPUs is limited to 23 Gbps total egress bandwidth. If you configure the C3 VM with two vNICs, the VM is still limited to 23 Gbps total egress bandwidth, not 23 Gbps bandwidth per vNIC.\" https://cloud.google.com/compute/docs/network-bandwidth#vm-out-baseline:~:text=Neither%20additional%20virtual,bandwidth%20per%20vNIC. (3 votes)"
      },
      {
        "user": "Jay09812",
        "text": "C Increasing the VM from standard-2 to standard-8 will increase egress. The VM is serving files (egress) so will benefit from larger egress (2 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: C. Choose C. Changing the machine type to a higher-capacity will increases the available resources, including CPU, memory, and potentially network bandwidth. Options A and B are not directly related to improving network throughput for the existing VMs. Adding additional network interface controllers (NICs) (Option A) may not necessarily address network throughput limitations, and deploying a Cloud NAT gateway (Option B) is more relevant for outbound internet traffic rather than internal network communication. Option D (Deploy the Ops Agent to export additional monitoring... (1 vote)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: C. Vote C (1 vote)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: C. https://cloud.google.com/compute/docs/network-bandwidth (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 165,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Raising VM network throughput via a larger machine type.",
    "correctRationale": "The VMs are already at peak network throughput — the cap is per-machine-type egress bandwidth on Compute Engine. Moving to n2-standard-8 raises that cap substantially. Extra NICs do not increase per-VM egress quota, Cloud NAT is for outbound connectivity not throughput to users, and more metrics do not add bandwidth.",
    "optionRationales": [
      "Wrong: Additional NICs on the same machine type do not raise the per-VM network bandwidth limit.",
      "Wrong: Cloud NAT serves outbound-to-internet connectivity, not download throughput to users.",
      "Correct: A larger machine type raises the egress bandwidth ceiling — the actual bottleneck.",
      "Wrong: More metrics only measure the same capped bandwidth better."
    ]
  },
  {
    "id": 164,
    "topic": "Performance & Cost",
    "difficulty": 1,
    "question": "You recently migrated an ecommerce application to Google Cloud. You now need to prepare the application for the upcoming peak traffic season. You want to follow Google-recommended practices. What should you do first to prepare for the busy season?",
    "options": [
      "A. Migrate the application to Cloud Run, and use autoscaling.",
      "B. Create a Terraform configuration for the application's underlying infrastructure to quickly deploy to additional regions.",
      "C. Load test the application to profile its performance for scaling.",
      "D. Pre-provision the additional compute power that was used last season, and expect growth."
    ],
    "correct": 2,
    "explanation": "Load test first — profiling under load tells you how the app scales before you pick any scaling or provisioning move.",
    "discussion": [
      {
        "user": "activist",
        "text": "Answer C is my choice. (5 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: C. C should be Answer. (3 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: C. Choose C. Google-recommended practices often involve load testing applications to understand their performance characteristics and determine appropriate scaling strategies. By load testing the ecommerce application, you can simulate peak traffic scenarios and identify potential bottlenecks or areas for optimization. This allows you to make informed decisions about scaling strategies, such as setting up auto-scaling policies based on the observed performance metrics. Load testing helps ensure that the application can handle the expected peak traffic efficiently and... (2 votes)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: C. Vote C (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 164,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Peak-prep starts with a load test.",
    "correctRationale": "Before preparing for peak traffic you must measure how the application performs — a load test produces the scaling profile that drives every later decision. Migrating to Cloud Run, writing Terraform, or pre-provisioning last season's capacity are all actions taken before measuring.",
    "optionRationales": [
      "Wrong: Migrating to Cloud Run is a replatforming decision made without data.",
      "Wrong: Terraform for multi-region deploys is premature until the load profile is known.",
      "Correct: Load testing first gives the measured scaling profile that everything else depends on.",
      "Wrong: Copying last season's provisioning is a guess, not a measured plan."
    ]
  },
  {
    "id": 163,
    "topic": "Incident Management",
    "difficulty": 2,
    "question": "You are leading a DevOps project for your organization. The DevOps team is responsible for managing the service infrastructure and being on-call for incidents. The Software Development team is responsible for writing, submitting, and reviewing code. Neither team has any published SLOs. You want to design a new joint-ownership model for a service between the DevOps team and the Software Development team. Which responsibilities should be assigned to each team in the new joint-ownership model?",
    "options": [
      "A. DevOps team: manage the service infrastructure, be on-call for incidents, perform code reviews. Software Development team: submit code to be reviewed by the DevOps team, publish the SLOs that the DevOps team must meet.",
      "B. DevOps team: manage the service infrastructure, perform code reviews. Software Development team: submit code to be reviewed by the DevOps team, be on-call for incidents, publish the SLOs that the DevOps team must meet.",
      "C. DevOps team: manage the service infrastructure. Shared: be on-call for incidents on a rotation basis, adopt and publish SLOs for the service, perform code reviews. Software Development team: submit code to be reviewed.",
      "D. DevOps team: manage the service infrastructure, be on-call for incidents. Shared: adopt and publish SLOs for the service, perform code reviews. Software Development team: submit code to be reviewed."
    ],
    "correct": 2,
    "explanation": "Joint ownership: DevOps keeps infra, on-call and SLOs become shared, and code review is shared with the devs submitting code.",
    "discussion": [
      {
        "user": "kish18",
        "text": "C, D same, found the right option for D, which says Devops team responsibility Manage the service infrastructure Be on call for incidents Shared responsibilities adopt and publish SLOs for the service Software development team responsibilities Submit code to be reviewed perform code reviews (4 votes)"
      },
      {
        "user": "nhiguchi",
        "text": "C and D look the same. (4 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: C. In a joint-ownership model for a service between the DevOps and Software Development teams, option C & D is more suitable. The DevOps team manages the infrastructure, while both teams share responsibilities for code reviews, on-call duties, and defining SLOs. The Software Development team contributes by submitting code changes. This approach promotes collaboration, accountability, and a shared commitment to service reliability and performance goals. (2 votes)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: C. Vote C D (1 vote)"
      },
      {
        "user": "lelele2023",
        "text": "C and D need to be updated. Basically this question emphasises a culture of more shared responsibilities between dev and ops. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 163,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": false,
    "discussionSummary": "Data fix: on ExamTopics the four options were images with empty text; they are reconstructed from the discussion thread and mirrors. Commenters note C and D render almost identically — the distinguishing point is that on-call is shared in C.",
    "conceptSummary": "Sharing on-call, SLOs, and review between DevOps and Dev teams.",
    "correctRationale": "A joint-ownership model shares the operational load: DevOps keeps managing service infrastructure, while on-call rotation, adopting/publishing SLOs, and code reviews are shared, and developers submit code for review (C). A keeps everything operational on DevOps and has devs publishing SLOs for DevOps — backwards; B puts on-call on devs while leaving reviews asymmetric; D keeps on-call solely with DevOps. (C and D render almost identically in the source; on-call sharing distinguishes C.)",
    "optionRationales": [
      "Wrong: Leaves on-call and ops solely on DevOps and makes devs publish SLOs for DevOps to meet — inverts ownership.",
      "Wrong: Puts on-call on the devs alone while DevOps still reviews all code — not joint ownership.",
      "Correct: Infra stays with DevOps; on-call, SLOs, and reviews are shared — true joint ownership.",
      "Wrong: Almost identical to C, but on-call stays only with DevOps — the shared rotation is what makes it joint."
    ]
  },
  {
    "id": 162,
    "topic": "CI/CD Pipelines",
    "difficulty": 1,
    "question": "You are configuring a CI pipeline. The build step for your CI pipeline integration testing requires access to APIs inside your private VPC network. Your security team requires that you do not expose API traffic publicly. You need to implement a solution that minimizes management overhead. What should you do?",
    "options": [
      "A. Use Cloud Build private pools to connect to the private VPC.",
      "B. Use Spinnaker for Google Cloud to connect to the private VPC.",
      "C. Use Cloud Build as a pipeline runner. Configure Internal HTTP(S) Load Balancing for API access.",
      "D. Use Cloud Build as a pipeline runner. Configure External HTTP(S) Load Balancing with a Google Cloud Armor policy for API access."
    ],
    "correct": 0,
    "explanation": "Cloud Build private pools peer into your VPC so build steps reach private APIs without exposing anything publicly.",
    "discussion": [
      {
        "user": "koo_kai",
        "text": "Selected Answer: A. A https://cloud.google.com/build/docs/private-pools/private-pools-overview (3 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. To implement a solution that minimizes management overhead and allows the CI pipeline integration testing to access APIs inside your private VPC network without exposing API traffic publicly, the appropriate (choice is A). Cloud Build private pools allow you to run builds in a Google Cloud environment with access to your private VPC network. This ensures that the build step for your CI pipeline can access APIs inside the private VPC without exposing API traffic to the public internet. Private pools minimize management overhead by providing a secure and controlled... (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: A. The default pool has limits on how much you can customize the environment, particularly around private network access. Private pools are private, dedicated pools of workers that offer greater customization over the build environment, including the ability to access resources in a private network. (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: A. \"Private pools are private, dedicated pools of workers that offer greater customization over the build environment, including the ability to access resources in a private network. Private pools, similar to default pools, are hosted and fully-managed by Cloud Build and scale up and down to zero, with no infrastructure to set up, upgrade, or scale. Because private pools are customer-specific resources, you can configure them in more ways.\" https://cloud.google.com/build/docs/private-pools/private-pools-overview#overview_of_default_pools_and_private_pools (1 vote)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: A. Vote A (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 162,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Private VPC access from Cloud Build via private pools.",
    "correctRationale": "Integration tests must reach APIs inside the VPC with no public exposure — Cloud Build private pools are workers that run inside your private network (peered), reaching private APIs directly. Spinnaker is a deploy tool, and internal/external load balancers expose the API to a LB rather than giving the build VPC reachability.",
    "optionRationales": [
      "Correct: Private pools put the build workers inside your VPC — private reach to the APIs, minimal overhead.",
      "Wrong: Spinnaker is a delivery platform, not a mechanism for private-API access from CI.",
      "Wrong: An internal LB fronts the API for clients, but Cloud Build still cannot reach it without network access.",
      "Wrong: An external LB + Cloud Armor still exposes the API publicly, which the security team forbids."
    ]
  },
  {
    "id": 161,
    "topic": "Infrastructure as Code",
    "difficulty": 1,
    "question": "Your company recently migrated to Google Cloud. You need to design a fast, reliable, and repeatable solution for your company to provision new projects and basic resources in Google Cloud. What should you do?",
    "options": [
      "A. Use the Google Cloud console to create projects.",
      "B. Write a script by using the gcloud CLI that passes the appropriate parameters from the request. Save the script in a Git repository.",
      "C. Write a Terraform module and save it in your source control repository. Copy and run the terraform apply command to create the new project.",
      "D. Use the Terraform repositories from the Cloud Foundation Toolkit. Apply the code with appropriate parameters to create the Google Cloud project and related resources."
    ],
    "correct": 3,
    "explanation": "Cloud Foundation Toolkit provides Google's reference Terraform modules for project factory — fast, repeatable provisioning.",
    "discussion": [
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: D. Fast , relaible and repeatable solution , It is terraform (4 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: D. https://cloud.google.com/docs/terraform/blueprints/terraform-blueprints#:~:text=Creates%20an%20opinionated%20Google%20Cloud%20project%20by%20using%20Shared%20VPC%2C%20IAM%2C%20and%20Google%20Cloud%20APIs https://github.com/terraform-google-modules/terraform-google-project-factory (1 vote)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. Choose D. Using Terraform and the Cloud Foundation Toolkit ensures that you have a structured and version-controlled approach to provisioning resources. It also facilitates automation and scalability, making it easier to manage projects and resources across different environments. Options A and B may lack the repeatability and version control benefits provided by IaC solutions like Terraform. While option C mentions Terraform, it doesn't specify using a toolkit or best practices for cloud foundation setup. In summary, option D with Terraform and the Cloud Foundation... (1 vote)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: D. Vote D (1 vote)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: D. The Cloud Foundation Toolkit provides a series of reference templates for Deployment Manager and Terraform which reflect Google Cloud best practices. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 161,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Project provisioning via Cloud Foundation Toolkit modules.",
    "correctRationale": "CFT's curated Terraform modules (like the Project Factory) are Google's supported, repeatable blueprint for creating projects and base resources — faster and more reliable than hand-rolled console clicks, gcloud scripts, or writing your own module from scratch.",
    "optionRationales": [
      "Wrong: Console clicks are manual and not repeatable or reviewable.",
      "Wrong: A hand-written gcloud script is bespoke and fragile compared to the maintained modules.",
      "Wrong: A self-written module works but duplicates what CFT already provides and maintains.",
      "Correct: CFT Terraform repositories give supported, reusable project-provisioning code you apply with parameters."
    ]
  },
  {
    "id": 160,
    "topic": "Performance & Cost",
    "difficulty": 1,
    "question": "Your company is planning a large marketing event for an online retailer during the holiday shopping season. You are expecting your web application to receive a large volume of traffic in a short period. You need to prepare your application for potential failures during the event. What should you do? (Choose two.)",
    "options": [
      "A. Configure Anthos Service Mesh on the application to identify issues on the topology map.",
      "B. Ensure that relevant system metrics are being captured with Cloud Monitoring, and create alerts at levels of interest.",
      "C. Review your increased capacity requirements and plan for the required quota management.",
      "D. Monitor latency of your services for average percentile latency.",
      "E. Create alerts in Cloud Monitoring for all common failures that your application experiences."
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "For a traffic surge: have metrics + alerts ready for detection, and pre-plan capacity/quota so scaling is not blocked mid-event.",
    "discussion": [
      {
        "user": "alpha_canary",
        "text": "Selected Answer: BC. Why? B: Monitoring system metrics and setting up alerts can help you detect and respond to issues quickly, minimizing potential downtime during periods of high traffic. C: Reviewing your capacity requirements and planning for quota management ensures that your application has the necessary resources to handle the expected increase in traffic. Not. A: While Anthos Service Mesh can provide valuable insights into service interactions, it's not directly related to preparing for potential failures during high-traffic events. Also, it's not mentioned which tool we are using, so... (3 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: BC. Having proper metrics plus alerts, also prepare for resource quota (3 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: BC. Choose B & C. B. Capturing system metrics with Cloud Monitoring allows you to monitor the health and performance of your application. Creating alerts based on these metrics enables proactive detection and quick response to anomalies or issues, ensuring the reliability of your application during the expected surge in traffic. C. Anticipating the increased capacity requirements during the event is crucial. Proper capacity planning, including scaling resources and managing quotas, ensures that your infrastructure can handle the high volume of traffic, preventing potential... (2 votes)"
      },
      {
        "user": "Billbalaji",
        "text": "Selected Answer: BE. Creating alerts for failures is important (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: BC. Come up to these options by skipping other options. (2 votes)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: BC. Vote BC (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 160,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Holiday-traffic readiness: alerting plus quota planning.",
    "correctRationale": "Preparing for a huge, short traffic event means two things: detect failures fast (B — ensure metrics are captured and alert at meaningful thresholds) and guarantee you can scale (C — review capacity and request quota ahead of the event). A mesh topology map is diagnosis tooling, not preparation; average latency hides tail issues; alerting on 'all common failures' is noisy and unactionable.",
    "optionRationales": [
      "Wrong: A service-mesh topology map helps visualize issues but is not a failure-preparation step.",
      "Correct: Monitoring with alerts at meaningful levels ensures failures are caught early during the event.",
      "Correct: Quota and capacity review upfront prevents scaling from being blocked during the surge.",
      "Wrong: Average latency hides tail latency where user pain lives; percentiles matter more.",
      "Wrong: Alerting on every conceivable failure creates noise; alert on meaningful SLO-level conditions."
    ]
  },
  {
    "id": 159,
    "topic": "Logging",
    "difficulty": 2,
    "question": "Your Cloud Run application writes unstructured logs as text strings to Cloud Logging. You want to convert the unstructured logs to JSON-based structured logs. What should you do?",
    "options": [
      "A. Modify the application to use Cloud Logging software development kit (SDK), and send log entries with a jsonPayload field.",
      "B. Install a Fluent Bit sidecar container, and use a JSON parser.",
      "C. Install the log agent in the Cloud Run container image, and use the log agent to forward logs to Cloud Logging.",
      "D. Configure the log agent to convert log text payload to JSON payload."
    ],
    "correct": 0,
    "explanation": "Structured logs come from the app: write JSON to stdout or send jsonPayload entries via the Cloud Logging client library.",
    "discussion": [
      {
        "user": "Mar_Mar",
        "text": "Selected Answer: D. https://cloud.google.com/logging/docs/agent/logging/configuration#process-payload (4 votes)"
      },
      {
        "user": "cachopo",
        "text": "Selected Answer: A. - Cloud Logging supports structured logging by using the jsonPayload field, which allows you to log data in JSON format. - Modifying the application to log in a structured JSON format ensures that the logs are parsed correctly by Cloud Logging without additional processing. Why not D? Configuring a log agent to convert logs from text to JSON adds unnecessary overhead. If you control the application, it's better to directly emit logs in structured JSON format using the SDK. (2 votes)"
      },
      {
        "user": "6a8c7ad",
        "text": "Selected Answer: A. Not an instance (2 votes)"
      },
      {
        "user": "Rosek93",
        "text": "Selected Answer: A. This is Cloud Run not VM -> A (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: D. The Cloud Logging agent can be configured to convert log text payload to JSON payload by setting the process.payload parameter to json. This will cause the agent to parse the log text and convert it to a JSON object before forwarding it to Cloud Logging. (2 votes)"
      },
      {
        "user": "mohan999",
        "text": "Cloud run doesnt use log agent, it has to be A or B (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 159,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics' suggested D (community 60% D): D links to the legacy VM agent docs and Cloud Run has no Logging agent to configure — structured logs come from the app writing JSON to stdout or sending jsonPayload entries via the client library.",
    "conceptSummary": "Producing structured logs from Cloud Run.",
    "correctRationale": "Cloud Run has no logging agent to configure — it captures stdout/stderr. Converting to structured logs means changing the application: emit JSON objects to stdout, or use the Cloud Logging client library to send jsonPayload entries. Options describing 'install/configure the log agent' reference the legacy VM agent docs and do not apply to Cloud Run.",
    "optionRationales": [
      "Correct: Emitting jsonPayload entries via the Cloud Logging SDK produces structured logs directly from the app.",
      "Wrong: A sidecar Fluent Bit container is unnecessary machinery on Cloud Run, which already forwards stdout.",
      "Wrong: Cloud Run has no in-platform log agent to install — logs come from stdout.",
      "Wrong: There is no agent to reconfigure; Cloud Run forwards container output verbatim."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 158,
    "topic": "Deployment Strategies",
    "difficulty": 1,
    "question": "You are designing a deployment technique for your applications on Google Cloud. As part of your deployment planning, you want to use live traffic to gather performance metrics for new versions of your applications. You need to test against the full production load before your applications are launched. What should you do?",
    "options": [
      "A. Use A/B testing with blue/green deployment.",
      "B. Use canary testing with continuous deployment.",
      "C. Use canary testing with rolling updates deployment.",
      "D. Use shadow testing with continuous deployment."
    ],
    "correct": 3,
    "explanation": "Shadow testing mirrors full production traffic to the new version without serving it — full-load testing pre-launch.",
    "discussion": [
      {
        "user": "mshafa",
        "text": "Selected Answer: D. Shadow testing is a technique where you deploy a new version of your application alongside the existing production version, but you don't route live traffic to it. Instead, you route a copy of the live traffic to the new version (the \"shadow\" version) while the production version continues to serve real user traffic. This allows you to gather performance metrics and test the new version under real-world conditions without affecting the end users' experience. (3 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. Choose option D. Shadow testing allows the deployment and execution of a new version alongside the current one, but in a manner that is hidden from users. This approach ensures zero production impact, as the incoming requests are mirrored and replayed in a test environment. By duplicating traffic, it enables comprehensive testing of new features and improvements against the full production load without affecting end-users. Additionally, the continuous deployment aspect ensures that the deployment process remains ongoing, allowing for iterative testing and refinement based... (2 votes)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: D. Vote D (2 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: D. https://cloud.google.com/architecture/application-deployment-and-testing-strategies#shadow_test_pattern (2 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: D. Option A is literally for spilting traffic between versions , Canary is gradually allowing traffic to production, D is right answer (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: D. https://cloud.google.com/architecture/application-deployment-and-testing-strategies#shadow_test_pattern With shadow testing, you deploy and run a new version alongside the current version, but in such a way that the new version is hidden from the users, as the following diagram shows. An incoming request is mirrored and replayed in a test environment. This process can happen either in real time or asynchronously after a copy of the previously captured production traffic is replayed against the newly deployed service. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 158,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Full-production-load testing via shadow traffic.",
    "correctRationale": "Testing against the full production load before launch, without exposing users, is shadow testing: real traffic is mirrored to the new version while responses are discarded. Canary only sends a small slice, and A/B + blue/green expose real users to the unlaunched version.",
    "optionRationales": [
      "Wrong: A/B testing splits live users between versions — not a shadowed full-load test.",
      "Wrong: Canary + CD exposes a portion of real traffic, not a mirrored full load.",
      "Wrong: Canary with rolling updates still only tests a subset of real traffic.",
      "Correct: Shadow testing replays the full production load to the new version with zero user exposure."
    ]
  },
  {
    "id": 157,
    "topic": "Org & IAM",
    "difficulty": 1,
    "question": "You are designing a new Google Cloud organization for a client. Your client is concerned with the risks associated with long-lived credentials created in Google Cloud. You need to design a solution to completely eliminate the risks associated with the use of JSON service account keys while minimizing operational overhead. What should you do?",
    "options": [
      "A. Apply the constraints/iam.disableServiceAccountKevCreation constraint to the organization.",
      "B. Use custom versions of predefined roles to exclude all iam.serviceAccountKeys.* service account role permissions.",
      "C. Apply the constraints/iam.disableServiceAccountKeyUpload constraint to the organization.",
      "D. Grant the roles/iam.serviceAccountKeyAdmin IAM role to organization administrators only."
    ],
    "correct": 0,
    "explanation": "iam.disableServiceAccountKeyCreation as an org constraint eliminates JSON SA keys org-wide with one policy.",
    "discussion": [
      {
        "user": "mshafa",
        "text": "Selected Answer: A. You can use the iam.disableServiceAccountCreation boolean constraint to disable the creation of new service accounts. This allows you to centralize management of service accounts while not restricting the other permissions your developers have on projects. (3 votes)"
      },
      {
        "user": "koo_kai",
        "text": "Selected Answer: A. constraints/iam.disableServiceAccountKeyCreation (3 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. Correct answer is A. By applying the constraints/iam.disableServiceAccountKeyCreation constraint to the organization, you can prevent the creation of JSON service account keys, thus minimizing the risk associated with long-lived credentials. This constraint disables the ability to create new service account keys, reducing the potential for misuse or compromise of credentials. (2 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: A. \"You can use the iam.disableServiceAccountKeyCreation boolean constraint to disable the creation of new external service account keys. This allows you to control the use of unmanaged long-term credentials for service accounts. When this constraint is set, user-managed credentials cannot be created for service accounts in projects affected by the constraint.\" https://cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts#disable_service_account_key_creation (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: A. https://cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts#disable_service_account_key_creation (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 157,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Org-wide SA-key elimination via org policy.",
    "correctRationale": "Completely eliminating JSON service-account keys at minimal overhead is a one-constraint job: constraints/iam.disableServiceAccountKeyCreation blocks new key creation everywhere in the org. Custom roles remove permissions but do not stop creation paths; the Upload variant only blocks uploading external keys; granting KeyAdmin to admins still allows keys to exist.",
    "optionRationales": [
      "Correct: The org policy constraint forbids key creation org-wide — the complete, low-overhead fix.",
      "Wrong: Custom roles only restrict who can call the API; they do not eliminate the capability.",
      "Wrong: disableServiceAccountKeyUpload blocks uploading external keys, not creating them.",
      "Wrong: Restricting KeyAdmin still permits key creation — the risk is keys existing at all."
    ]
  },
  {
    "id": 156,
    "topic": "Troubleshooting & APM",
    "difficulty": 2,
    "question": "Your company runs applications in Google Kubernetes Engine (GKE). Several applications rely on ephemeral volumes. You noticed some applications were unstable due to the DiskPressure node condition on the worker nodes. You need to identify which Pods are causing the issue, but you do not have execute access to workloads and nodes. What should you do?",
    "options": [
      "A. Check the node/ephemeral_storage/used_bytes metric by using Metrics Explorer.",
      "B. Check the container/ephemeral_storage/used_bytes metric by using Metrics Explorer.",
      "C. Locate all the Pods with emptyDir volumes. Use the df -h command to measure volume disk usage.",
      "D. Locate all the Pods with emptyDir volumes. Use the df -sh * command to measure volume disk usage."
    ],
    "correct": 1,
    "explanation": "container/ephemeral_storage/used_bytes in Metrics Explorer shows per-pod ephemeral usage — no exec access needed.",
    "discussion": [
      {
        "user": "YushiSato",
        "text": "Selected Answer: B. I think the answer is B. You need to use container/ephemeral_storage/used_bytes because you need to identify the pod that is causing the problem. pod/ephemeral_storage/used_bytes also exists, but it is still in beta. https://cloud.google.com/monitoring/api/metrics_kubernetes (3 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: B. https://cloud.google.com/monitoring/api/metrics_kubernetes#:~:text=container/ephemeral_storage/used_bytes The container/ephemeral_storage/used_bytes metric can help you identify which pods are consuming ephemeral storage and potentially causing the DiskPressure condition. why not A? The node/ephemeral_storage/used_bytes metric would show the total ephemeral storage used on a node, but it wouldn't help you identify which pods are consuming the storage. (2 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: B. To identify which Pods are causing the DiskPressure node condition due to ephemeral volumes, you should check the container/ephemeral_storage/used_bytes metric using Metrics Explorer. Therefore, the correct answer is B. This metric provides information about the ephemeral storage usage of containers within Pods. By examining this metric, you can identify the specific Pods that are contributing to the DiskPressure condition on the worker nodes. Metrics Explorer allows you to visualize and analyze metrics data, making it a suitable tool for investigating resource usage and... (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: B. This approach provides the necessary detail to identify which Pods are causing the DiskPressure condition without the need for direct access to the nodes or the ability to execute commands on them. Metrics Explorer in Google Cloud's operations suite (formerly Stackdriver) allows you to query and visualize metrics from your GKE environment, making it a powerful tool for this kind of diagnostic task. (2 votes)"
      },
      {
        "user": "dija123",
        "text": "Selected Answer: B. The container/ephemeral_storage/used_bytes metric seems correct. (1 vote)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: B. Vote B (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 156,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Finding pods causing DiskPressure via per-container metrics.",
    "correctRationale": "Node DiskPressure comes from pods consuming ephemeral storage; the GKE metric container/ephemeral_storage/used_bytes breaks that usage down per container, viewable in Metrics Explorer without shell access. The node-level metric only shows the aggregate, and df requires exec access you do not have.",
    "optionRationales": [
      "Wrong: The node-level metric shows total usage, not which pods caused it.",
      "Correct: Per-container ephemeral-storage usage is the metric that identifies the offending Pods without any exec access.",
      "Wrong: df -h needs exec into pods/nodes, which you do not have.",
      "Wrong: Same problem — df is shell access you lack."
    ]
  },
  {
    "id": 155,
    "topic": "Infrastructure as Code",
    "difficulty": 1,
    "question": "You are deploying a Cloud Build job that deploys Terraform code when a Git branch is updated. While testing, you noticed that the job fails. You see the following error in the build logs: Initializing the backend...\nError: Failed to get existing workspaces: querying Cloud Storage failed: googleapi: Error 403 You need to resolve the issue by following Google-recommended practices. What should you do?",
    "options": [
      "A. Change the Terraform code to use local state.",
      "B. Create a storage bucket with the name specified in the Terraform configuration.",
      "C. Grant the roles/owner Identity and Access Management (IAM) role to the Cloud Build service account on the project.",
      "D. Grant the roles/storage.objectAdmin Identity and Access Management (1AM) role to the Cloud Build service account on the state file bucket."
    ],
    "correct": 3,
    "explanation": "403 querying the state bucket = missing permission; grant the Cloud Build service account roles/storage.objectAdmin on the state bucket.",
    "discussion": [
      {
        "user": "activist",
        "text": "Answer D seems to be correct. (3 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. To resolve that issue, you should ensure that the Cloud Build service account has the necessary permissions to access the Cloud Storage bucket used for storing Terraform state. The recommended practice is to grant the roles/storage.objectAdmin Identity and Access Management (IAM) role to the Cloud Build service account on the state file bucket. Therefore, the correct answer is (option D) This permission grants the necessary access for Cloud Build to read and write objects (which include Terraform state files) in the specified Cloud Storage bucket, resolving the 403 error.... (2 votes)"
      },
      {
        "user": "dija123",
        "text": "Selected Answer: D. Agree with D (1 vote)"
      },
      {
        "user": "kish18",
        "text": "Selected Answer: D. this is regarding the permission, hence providing the correct role will resolve this (1 vote)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: D. Vote D (1 vote)"
      },
      {
        "user": "activist",
        "text": "https://cloud.google.com/storage/docs/access-control/iam-roles (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 155,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Terraform backend 403 = grant objectAdmin on the state bucket.",
    "correctRationale": "The error is an authorization failure reading the Terraform state bucket — the fix is granting the Cloud Build service account roles/storage.objectAdmin on that bucket. Local state removes collaboration, recreating the bucket does not grant access, and roles/owner is over-broad.",
    "optionRationales": [
      "Wrong: Local state loses the shared, locked remote backend the pipeline needs.",
      "Wrong: The bucket exists — the error is permission denial (403), not 'not found'.",
      "Wrong: roles/owner on the whole project violates least privilege.",
      "Correct: objectAdmin on the state-file bucket is the narrow permission needed to read/write state."
    ]
  },
  {
    "id": 154,
    "topic": "Troubleshooting & APM",
    "difficulty": 2,
    "question": "As a Site Reliability Engineer, you support an application written in Go that runs on Google Kubernetes Engine (GKE) in production. After releasing a new version of the application, you notice the application runs for about 15 minutes and then restarts. You decide to add Cloud Profiler to your application and now notice that the heap usage grows constantly until the application restarts. What should you do?",
    "options": [
      "A. Increase the CPU limit in the application deployment.",
      "B. Add high memory compute nodes to the cluster.",
      "C. Increase the memory limit in the application deployment.",
      "D. Add Cloud Trace to the application, and redeploy."
    ],
    "correct": 2,
    "explanation": "Heap growing until restart = leak; raise the memory limit to stop the OOM restarts while the leak is fixed.",
    "discussion": [
      {
        "user": "koo_kai",
        "text": "Selected Answer: C. insufficient memory (5 votes)"
      },
      {
        "user": "pharao89",
        "text": "Selected Answer: C. That's what I do at work :-) (3 votes)"
      },
      {
        "user": "cachopo",
        "text": "Selected Answer: D. D. Cloud Trace can help identify inefficient memory usage and pinpoint the root cause of the memory leak. Since Cloud Profiler already showed that heap usage is constantly increasing, the next step is to analyze memory allocations in detail. Cloud Trace provides visibility into request execution and can highlight which functions are consuming excessive memory or not releasing it properly. This helps in debugging and fixing the leak instead of just mitigating its effects. C. Increasing the memory limit in the deployment would provide a temporary workaround by delaying the... (2 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: D. D) I would add Cloud Trace to find the root cause of the heap usage growth. Adding more memory will only solve the issue temporarily, and you might now see a restart in 30 minutes. (2 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: C. Given the scenario where the heap usage of the application grows constantly until it restarts, the issue is likely related to memory consumption. Therefore, the appropriate action to take is to address the memory-related problem. In this context, option C is the recommended. By increasing the memory limit in the application deployment configuration, you provide more memory resources to the application, potentially preventing it from exhausting its memory and triggering restarts. Options A and B may not directly address the underlying memory problem. Option D, adding Cloud... (1 vote)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: C. Vote C (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 154,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority D proposed Cloud Trace, but Trace measures request latency, not memory. Raising the memory limit is the only option that stops the OOM restarts while developers fix the leak Profiler revealed.",
    "conceptSummary": "Mitigating a memory leak's OOM restarts.",
    "correctRationale": "Cloud Profiler already revealed the cause — steadily growing heap leading to OOM restarts. Until developers ship the fix, the only option that stops the crash loop is raising the deployment's memory limit (C). CPU and node upgrades do not help a heap leak, and Cloud Trace measures request latency, not memory.",
    "optionRationales": [
      "Wrong: CPU has nothing to do with heap exhaustion.",
      "Wrong: Bigger nodes add capacity, but the pod's own memory limit is what is being hit.",
      "Correct: Raising the pod memory limit stops the OOM kills while the leak is fixed — mitigation, not root cause.",
      "Wrong: Cloud Trace measures request latency; it cannot detect or fix a memory leak."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 153,
    "topic": "Logging",
    "difficulty": 1,
    "question": "You are configuring Cloud Logging for a new application that runs on a Compute Engine instance with a public IP address. A user-managed service account is attached to the instance. You confirmed that the necessary agents are running on the instance but you cannot see any log entries from the instance in Cloud Logging. You want to resolve the issue by following Google-recommended practices. What should you do?",
    "options": [
      "A. Export the service account key and configure the agents to use the key.",
      "B. Update the instance to use the default Compute Engine service account.",
      "C. Add the Logs Writer role to the service account.",
      "D. Enable Private Google Access on the subnet that the instance is in."
    ],
    "correct": 2,
    "explanation": "The attached service account lacks permission to write logs — grant it roles/logging.logWriter (Logs Writer).",
    "discussion": [
      {
        "user": "khoukha",
        "text": "answer is C. For B, they specified that a user manager service account is attached to the instance, so the default one will not gonna be used. (5 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: C. Same reason as KHOUKHA. (4 votes)"
      },
      {
        "user": "activist",
        "text": "I think answer C is correct in granting the existing service account the least privilege to write logs. (3 votes)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: C. Vote C (2 votes)"
      },
      {
        "user": "Mar_Mar",
        "text": "B is correct : https://cloud.google.com/logging/docs/agent/logging/troubleshooting#verify_default_service_account_permission (2 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: C. The issue described suggests that the service account associated with the Compute Engine instance may not have the necessary permissions to write logs to Cloud Logging. To resolve this issue following Google-recommended practices, you should choose option C: Add the Logs Writer role to the service account. By adding the Logs Writer role to the service account, you grant the necessary permissions to write logs to Cloud Logging. This role provides the required access for the agents running on the instance to send log entries to Cloud Logging. Make sure to follow the... (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 153,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Missing logs from a VM: grant the SA Logs Writer.",
    "correctRationale": "The agents are running, so the likely failure is authorization: the user-managed service account has no logs-writing permission, so entries are rejected. Adding the Logs Writer role fixes it. Exporting a key is discouraged, swapping to the default SA loses the dedicated identity, and Private Google Access is irrelevant since the instance has a public IP.",
    "optionRationales": [
      "Wrong: Exporting a service account key is the discouraged long-lived-credential path.",
      "Wrong: Switching to the default Compute Engine service account abandons your purpose-built identity and may grant more than needed.",
      "Correct: The missing piece is the Logs Writer role on the attached service account.",
      "Wrong: The instance already has a public IP, so Private Google Access is unnecessary."
    ]
  },
  {
    "id": 152,
    "topic": "Infrastructure as Code",
    "difficulty": 3,
    "question": "You are designing a system with three different environments: development, quality assurance (QA), and production. Each environment will be deployed with Terraform and has a Google Kubernetes Engine (GKE) cluster created so that application teams can deploy their applications. Anthos Config Management will be used and templated to deploy infrastructure level resources in each GKE cluster. All users (for example, infrastructure operators and application owners) will use GitOps. How should you structure your source control repositories for both Infrastructure as Code (IaC) and application code?",
    "options": [
      "A. • Cloud Infrastructure (Terraform) repository is shared: different directories are different environments\n• GKE Infrastructure (Anthos Config Management Kustomize manifests) repository is shared: different overlay directories are different environments\n• Application (app source code) repositories are separated: different branches are different features",
      "B. • Cloud Infrastructure (Terraform) repository is shared: different directories are different environments\n• GKE Infrastructure (Anthos Config Management Kustomize manifests) repositories are separated: different branches are different environments\n• Application (app source code) repositories are separated: different branches are different features",
      "C. • Cloud Infrastructure (Terraform) repository is shared: different branches are different environments\n• GKE Infrastructure (Anthos Config Management Kustomize manifests) repository is shared: different overlay directories are different environments\n• Application (app source code) repository is shared: different directories are different features",
      "D. • Cloud Infrastructure (Terraform) repositories are separated: different branches are different environments\n• GKE Infrastructure (Anthos Config Management Kustomize manifests) repositories are separated: different overlay directories are different environments\n• Application (app source code) repositories are separated: different branches are different"
    ],
    "correct": 0,
    "explanation": "Shared repos with directory/overlay-per-environment for infra, separate app repos with feature branches — the GitOps repo layout.",
    "discussion": [
      {
        "user": "YushiSato",
        "text": "Selected Answer: A. I think A is correct. In both Terraform and Kustomize, it would be common to represent the environment by a directory. (3 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: B. Not sure, but I think it's better option. (3 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: A. Why? \"Cloud Infrastructure (Terraform) repository is shared: different directories are different environments\" For GitOps, Google recommends: Use folders for variants of the configuration instead of branches. With folders, you can use the tree command to see variants. For example, with branches, you can't tell if the delta between a prod and stage branch is an upcoming change in configuration or a permanent difference between what stage and prod should look like. https://cloud.google.com/anthos-config-management/docs/concepts/gitops-best-practices#use-folders \"GKE... (2 votes)"
      },
      {
        "user": "kish18",
        "text": "Selected Answer: A. this is the logial folder structure when dealing with multiple environments of tf, gke creating folders for separate environments, creating branches for releases (2 votes)"
      },
      {
        "user": "Afonya",
        "text": "Selected Answer: A. https://cloud.google.com/anthos-config-management/docs/concepts/gitops-best-practices#use-folders (2 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: C. It is recommended to use kustomize+ACM to manage multi environments using overlay+share-repo approach hence this narrows down to be either A or C. https://cloud.google.com/anthos-config-management/docs/tutorials/multiple-environments-config-sync#repository_architecture For app repo it should be shared therefore C is the right answer. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 152,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority B modeled environments as branches in separate repos; Google's GitOps guidance is environments as directories/overlays in shared repos — branches drift and are hard to promote between.",
    "conceptSummary": "GitOps repository structure: directories for environments, branches for features.",
    "correctRationale": "Google's GitOps guidance is to model environments as directories/overlays within shared repos — one Terraform repo with directories per environment, one Config Sync (Anthos Config Management) repo with Kustomize overlays per environment — while app code lives in separate repos with branches per feature. Long-lived per-environment branches drift and are hard to promote between; per-app directory repos merge unrelated codebases.",
    "optionRationales": [
      "Correct: Shared IaC repos with env-as-directories/overlays and separate app repos with feature branches is the recommended layout.",
      "Wrong: Splitting GKE infra into separate repos with environment branches invites drift between environments.",
      "Wrong: Environment-per-branch for Terraform and app repos organized by feature directories invert the recommended model.",
      "Wrong: Separating the Terraform repos and mixing branch/overlay roles gets both layers wrong."
    ],
    "legacyNote": "Anthos Config Management is now Config Sync (plus Policy Controller).",
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 151,
    "topic": "Infrastructure as Code",
    "difficulty": 2,
    "question": "Your company runs applications in Google Kubernetes Engine (GKE) that are deployed following a GitOps methodology. Application developers frequently create cloud resources to support their applications. You want to give developers the ability to manage infrastructure as code, while ensuring that you follow Google-recommended practices. You need to ensure that infrastructure as code reconciles periodically to avoid configuration drift. What should you do?",
    "options": [
      "A. Install and configure Config Connector in Google Kubernetes Engine (GKE).",
      "B. Configure Cloud Build with a Terraform builder to execute terraform plan and terraform apply commands.",
      "C. Create a Pod resource with a Terraform docker image to execute terraform plan and terraform apply commands.",
      "D. Create a Job resource with a Terraform docker image to execute terraform plan and terraform apply commands."
    ],
    "correct": 0,
    "explanation": "Config Connector reconciles Kubernetes CRDs that describe GCP resources continuously — GitOps with drift correction.",
    "discussion": [
      {
        "user": "mshafa",
        "text": "Selected Answer: A. Config Connector's controllers eventually reconcile your environment with your desired state. https://cloud.google.com/config-connector/docs/overview (3 votes)"
      },
      {
        "user": "Xoxoo",
        "text": "Selected Answer: A. Config Connector allows you to manage Google Cloud resources through Kubernetes-style declarative configuration. By installing and configuring Config Connector in GKE, you can define and manage cloud resources using Kubernetes manifests, ensuring that infrastructure configurations are reconciled periodically to avoid configuration drift (2 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. Option A is the recommended approach for managing infrastructure as code and avoiding configuration drift in a Google Kubernetes Engine (GKE) environment while following Google-recommended practices. Config Connector is a Kubernetes extension that allows you to manage Google Cloud resources as Kubernetes objects. By installing and configuring Config Connector in GKE, you can declare your cloud resources as Kubernetes CustomResourceDefinitions (CRDs) and have them managed by Kubernetes controllers. This ensures that the desired state of your infrastructure is continuously... (2 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: A. Why not A? https://cloud.google.com/blog/products/containers-kubernetes/anthos-config-management-config-controller-available-on-gke Config controller leverages config connector, config controller includes config-synct/gcp-cloud-resource-creation/policy-sync, it 'gitops', 'reconcile', 'taking-care-of-gcp-cloud-resource' (2 votes)"
      },
      {
        "user": "activist",
        "text": "I think the answer B is correct. (2 votes)"
      },
      {
        "user": "poplot321",
        "text": "Selected Answer: B. B is the correct answer here because it talks about GitOps and Infrastructure as Code without Kubernetes CRDs: https://cloud.google.com/docs/terraform/resource-management/managing-infrastructure-as-code If CRDs are mentioned, then it would be Config Connector: https://cloud.google.com/config-connector/docs/overview (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 151,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Developer-managed IaC on GKE via Config Connector.",
    "correctRationale": "The requirements — developers manage infra as code via Kubernetes CRDs, periodic reconciliation against drift — are exactly Config Connector: it maps GCP resources to KRM objects and continuously reconciles them to the declared state. Terraform-in-pipeline options are push-style, do not continuously reconcile drift, and are not exposed as CRDs.",
    "optionRationales": [
      "Correct: Config Connector exposes GCP resources as CRDs and reconciles them continuously — drift included.",
      "Wrong: Cloud Build + Terraform runs on triggers, not continuous reconciliation against drift.",
      "Wrong: A one-shot Pod running terraform apply has no reconciliation loop.",
      "Wrong: A Job also runs once; neither provides periodic drift correction or a CRD model."
    ]
  },
  {
    "id": 150,
    "topic": "Supply Chain Security",
    "difficulty": 1,
    "question": "You are deploying an application to Cloud Run. The application requires a password to start. Your organization requires that all passwords are rotated every 24 hours, and your application must have the latest password. You need to deploy the application with no downtime. What should you do?",
    "options": [
      "A. Store the password in Secret Manager and send the secret to the application by using environment variables.",
      "B. Store the password in Secret Manager and mount the secret as a volume within the application.",
      "C. Use Cloud Build to add your password into the application container at build time. Ensure that Artifact Registry is secured from public access.",
      "D. Store the password directly in the code. Use Cloud Build to rebuild and deploy the application each time the password changes."
    ],
    "correct": 1,
    "explanation": "Mount the secret as a volume — rotation updates the mounted value, and the app can re-read it with no redeploy.",
    "discussion": [
      {
        "user": "lelele2023",
        "text": "Selected Answer: B. Answer is B: https://cloud.google.com/run/docs/configuring/services/secrets \"Mount each secret as a volume, which makes the secret available to the container as files. Reading a volume always fetches the secret value from Secret Manager, so it can be used with the latest version. This method also works well with secret rotation.\" (10 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: B. You can make a secret available to your containers in either of two ways: Mount each secret as a volume, which makes the secret available to the container as files. Reading a volume always fetches the secret value from Secret Manager, so it can be used with the latest version. This method also works well with secret rotation. Pass a secret using environment variables. Environment variables are resolved at instance startup time, so if you use this method, Google recommends that you pin the secret to a particular version rather than using latest.... (3 votes)"
      },
      {
        "user": "ABZ10",
        "text": "Selected Answer: B. Answer is B https://cloud.google.com/run/docs/configuring/services/secrets (3 votes)"
      },
      {
        "user": "TereRolon",
        "text": "I think is B for this \"Mount each secret as a volume, which makes the secret available to the container as files. Reading a volume always fetches the secret value from Secret Manager, so it can be used with the latest version. This method also works well with secret rotation. Pass a secret using environment variables. Environment variables are resolved at instance startup time, so if you use this method, Google recommends that you pin the secret to a particular version rather than using latest.\" https://cloud.google.com/run/docs/configuring/services/secrets (2 votes)"
      },
      {
        "user": "Billbalaji",
        "text": "Selected Answer: A. Answer is A The best solution is to store the password in Secret Manager and send the secret to the application by using environment variables. This will allow you to rotate the password without having to rebuild and deploy the application each time. (2 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: B. (Option B) By storing the password in Secret Manager and mounting the secret as a volume within the application, you can achieve password rotation without causing downtime. This allows you to update the password in Secret Manager, and Cloud Run can dynamically mount the latest version of the secret without requiring a redeployment of the application. This approach ensures that the application always has access to the latest password without interrupting its availability, providing a seamless and secure way to manage password rotation in a Cloud Run environment. Storing... (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 150,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Live secret rotation on Cloud Run via volume-mounted secrets.",
    "correctRationale": "Env vars are fixed at deploy time, so a daily-rotating password needs the mounted-volume mode: Secret Manager volumes reflect updated secret versions without redeploying, letting the app pick up the latest password with no downtime. Baking the secret into the image or code violates security and forces rebuilds.",
    "optionRationales": [
      "Wrong: Env-var secrets are captured at instance start; rotation would require a redeploy.",
      "Correct: A mounted secret volume can expose the latest version to the running app without redeploying.",
      "Wrong: Baking the password into the image embeds it in every layer and requires rebuild+redeploy each rotation.",
      "Wrong: Secrets in source code are a breach vector and still require rebuilds to rotate."
    ]
  },
  {
    "id": 149,
    "topic": "Supply Chain Security",
    "difficulty": 2,
    "question": "You are configuring your CI/CD pipeline natively on Google Cloud. You want builds in a pre-production Google Kubernetes Engine (GKE) environment to be automatically load-tested before being promoted to the production GKE environment. You need to ensure that only builds that have passed this test are deployed to production. You want to follow Google-recommended practices. How should you configure this pipeline with Binary Authorization?",
    "options": [
      "A. Create an attestation for the builds that pass the load test by requiring the lead quality assurance engineer to sign the attestation by using their personal private key.",
      "B. Create an attestation for the builds that pass the load test by using a private key stored in Cloud Key Management Service (Cloud KMS) with a service account JSON key stored as a Kubernetes Secret.",
      "C. Create an attestation for the builds that pass the load test by using a private key stored in Cloud Key Management Service (Cloud KMS) authenticated through Workload Identity.",
      "D. Create an attestation for the builds that pass the load test by requiring the lead quality assurance engineer to sign the attestation by using a key stored in Cloud Key Management Service (Cloud KMS)."
    ],
    "correct": 2,
    "explanation": "Attestations signed with a Cloud KMS key, called via Workload Identity — no personal or JSON service-account keys anywhere.",
    "discussion": [
      {
        "user": "koo_kai",
        "text": "Selected Answer: C. Workload Identity https://cloud.google.com/iam/docs/best-practices-for-using-workload-identity-federation (3 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: C. Vote (option C). This option involves creating an attestation for the builds that pass the load test using a private key stored in Cloud Key Management Service (Cloud KMS) authenticated through Workload Identity. Workload Identity allows you to securely authenticate to Google Cloud services from your GKE clusters without the need for storing and managing service account keys. By using Cloud KMS for key storage and Workload Identity for authentication, you enhance the security of your pipeline. This approach aligns with Google's best practices for managing cryptographic... (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: C. Workload Identity allows workloads in your GKE clusters to impersonate Identity and Access Management (IAM) service accounts to access Google Cloud services. https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity (2 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: C. \"you're configuring your CI/CD pipeline natively on Google Cloud\", natively hints to use workload identity which is similar to ec2 instance profile. (2 votes)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: C. Vote C (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 149,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Keyless Binary Authorization attestation: KMS + Workload Identity.",
    "correctRationale": "The load-test attestor should sign with a Cloud KMS key (keys never leave KMS) and the pipeline should authenticate via Workload Identity — no downloadable secrets. Personal private keys tie the control to a person, and storing a service-account JSON key in a Kubernetes Secret reintroduces the long-lived credential problem.",
    "optionRationales": [
      "Wrong: Requiring an engineer's personal key makes the approval depend on one person's key custody.",
      "Wrong: A service-account JSON key in a K8s Secret is a long-lived, extractable credential — the anti-pattern to avoid.",
      "Correct: KMS-held key + Workload Identity is the recommended keyless attestation path.",
      "Wrong: Still routes signing through a person rather than the automated pipeline."
    ]
  },
  {
    "id": 148,
    "topic": "Incident Management",
    "difficulty": 2,
    "question": "You are the Operations Lead for an ongoing incident with one of your services. The service usually runs at around 70% capacity. You notice that one node is returning 5xx errors for all requests. There has also been a noticeable increase in support cases from customers. You need to remove the offending node from the load balancer pool so that you can isolate and investigate the node. You want to follow Google-recommended practices to manage the incident and reduce the impact on users. What should you do?",
    "options": [
      "A. Step 1: Communicate your intent to the incident team.\nStep 2: Perform a load analysis to determine if the remaining nodes can handle the increase in traffic offloaded from the removed node, and scale appropriately.\nStep 3: When any new nodes report healthy, drain traffic from the unhealthy node, and remove the unhealthy node from service.",
      "B. Step 1: Communicate your intent to the incident team.\nStep 2: Add a new node to the pool, and wait for the new node to report as healthy.\nStep 3: When traffic is being served on the new node, drain traffic from the unhealthy node, and remove the old node from service.",
      "C. Step 1: Drain traffic from the unhealthy node and remove the node from service.\nStep 2: Monitor traffic to ensure that the error is resolved and that the other nodes in the pool are handling the traffic appropriately.\nStep 3: Scale the pool as necessary to handle the new load.\nStep 4: Communicate your actions to the incident team.",
      "D. Step 1: Drain traffic from the unhealthy node and remove the old node from service.\nStep 2: Add a new node to the pool, wait for the new node to report as healthy, and then serve traffic to the new node.\nStep 3: Monitor traffic to ensure that the pool is healthy and is handling traffic appropriately.\nStep 4: Communicate your actions to the incident team."
    ],
    "correct": 0,
    "explanation": "Announce intent, verify the remaining nodes can absorb the load and scale if needed, then drain — communicate first, act second.",
    "discussion": [
      {
        "user": "activist",
        "text": "Answer A seems to be correct. (6 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: A. The service usually run 70% of the capacity, hence even one node is out of order you'd always want to see if the rest of the computing resource are enough to support the stress before arbitrarily adding any new nodes. (4 votes)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: A. Vote A (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: D. Option A and option B do not add a new node to the pool to handle the increased load, which may leave the remaining nodes overburdened and unable to handle the traffic adequately. Option C starts with draining traffic from the unhealthy node, which is a good step, but it doesn't immediately add a new node to the pool to handle the load. It also lacks the step of explicitly communicating the actions to the incident team. (2 votes)"
      },
      {
        "user": "heftjustice",
        "text": "C Ref: https://sre.google/sre-book/effective-troubleshooting/ (1 vote)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. Choosing option A. First, communicating your intent to the incident team ensures transparency and collaboration. Performing a load analysis is crucial to determine if the remaining nodes can handle the increased traffic after offloading from the unhealthy node. Scaling appropriately is essential to maintain the overall capacity. Once new nodes report as healthy, draining traffic from the unhealthy node ensures a gradual transition without disrupting user experience. Removing the unhealthy node from service comes after ensuring that the other nodes can handle the load... (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 148,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority C/D drain first and communicate last; pulling the node before checking headroom risks overloading the remaining nodes, and the OL should announce intent first rather than report after the fact.",
    "conceptSummary": "OL playbook: communicate → analyze capacity → drain the bad node.",
    "correctRationale": "At ~70% capacity, pulling a node before checking headroom risks overloading the survivors. The recommended sequence is to tell the incident team your intent first, load-test whether the rest can absorb the traffic (scaling up if needed), then drain and remove the bad node. Options that drain first (C, D) act before communicating and before capacity analysis; B adds a node but never verifies the rest of the pool.",
    "optionRationales": [
      "Correct: Communicate → analyze remaining capacity and scale → drain is the safe, recommended sequence.",
      "Wrong: Adding one node blindly and draining skips verifying that the rest can actually carry the load.",
      "Wrong: Draining first and communicating last acts before the team knows — and before checking headroom.",
      "Wrong: Same out-of-order pattern: action before communication, plus an unnecessary new node."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 147,
    "topic": "Infrastructure as Code",
    "difficulty": 2,
    "question": "You need to enforce several constraint templates across your Google Kubernetes Engine (GKE) clusters. The constraints include policy parameters, such as restricting the Kubernetes API. You must ensure that the policy parameters are stored in a GitHub repository and automatically applied when changes occur. What should you do?",
    "options": [
      "A. Set up a GitHub action to trigger Cloud Build when there is a parameter change. In Cloud Build, run a gcloud CLI command to apply the change.",
      "B. When there is a change in GitHub. use a web hook to send a request to Anthos Service Mesh, and apply the change.",
      "C. Configure Anthos Config Management with the GitHub repository. When there is a change in the repository, use Anthos Config Management to apply the change.",
      "D. Configure Config Connector with the GitHub repository. When there is a change in the repository, use Config Connector to apply the change."
    ],
    "correct": 2,
    "explanation": "Anthos Config Management (now Config Sync + Policy Controller) watches the GitHub repo and applies constraint changes automatically.",
    "discussion": [
      {
        "user": "lelele2023",
        "text": "Selected Answer: C. C is the answe: using policy-controller to govern the policies. https://cloud.google.com/anthos-config-management/docs/concepts/policy-controller (2 votes)"
      },
      {
        "user": "activist",
        "text": "Answer C seems to be correct. https://medium.com/@kasiarun/introduction-to-anthos-config-management-1a43917c26ae (2 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: C. Choosing option C Configuring Anthos Config Management with the GitHub repository, is the recommended approach for enforcing constraint templates across Google Kubernetes Engine (GKE) clusters. Anthos Config Management allows you to declaratively manage configurations using Kubernetes-style manifests, making it well-suited for policy enforcement in a Kubernetes environment. By configuring Anthos Config Management with the GitHub repository, any changes made to the policy parameters, stored in the repository, can be automatically applied to the GKE clusters. This ensures... (1 vote)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: C. Vote C (1 vote)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: C. Anthos for consistently enforce security and compliance policies across your fleet. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 147,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Git-driven policy enforcement via Config Sync.",
    "correctRationale": "The ask — constraint templates in Git, applied automatically on change — is Config Sync's model: configure Anthos Config Management (today Config Sync plus Policy Controller) against the GitHub repo and it reconciles the cluster's policies on every commit. GitHub Actions/Cloud Build work but are DIY; Anthos Service Mesh is traffic management, and Config Connector manages GCP resources, not constraint templates.",
    "optionRationales": [
      "Wrong: GitHub Action + Cloud Build is a hand-rolled sync loop for what Config Sync does natively.",
      "Wrong: Anthos Service Mesh manages service traffic, not policy constraint application.",
      "Correct: Config Sync watches the repo and applies constraint changes automatically — the GitOps model for policies.",
      "Wrong: Config Connector manages Google Cloud resources as KRM; it is not the policy-from-Git mechanism here."
    ],
    "legacyNote": "Anthos Config Management is now Config Sync plus Policy Controller (part of GKE Enterprise / fleets)."
  },
  {
    "id": 146,
    "topic": "Incident Management",
    "difficulty": 1,
    "question": "You need to introduce postmortems into your organization. You want to ensure that the postmortem process is well received. What should you do? (Choose two.)",
    "options": [
      "A. Encourage new employees to conduct postmortems to team through practice.",
      "B. Create a designated team that is responsible for conducting all postmortems.",
      "C. Encourage your senior leadership to acknowledge and participate in postmortems.",
      "D. Ensure that writing effective postmortems is a rewarded and celebrated practice.",
      "E. Provide your organization with a forum to critique previous postmortems."
    ],
    "correct": [
      2,
      3
    ],
    "explanation": "Postmortem culture sticks when leadership visibly participates and the practice is rewarded.",
    "discussion": [
      {
        "user": "khoukha",
        "text": "C & D are the answer. https://cloud.google.com/blog/products/devops-sre/how-lowes-improved-incident-response-processes-with-sre (3 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: CD. https://sre.google/sre-book/postmortem-culture/#:~:text=Make%20sure%20that,value%20of%20postmortems! (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: CD. Should be C & D. (2 votes)"
      },
      {
        "user": "activist",
        "text": "Answers C, D seem correct. https://sre.google/sre-book/postmortem-culture/ (2 votes)"
      },
      {
        "user": "Dharini1",
        "text": "Selected Answer: CD. C. Encourage your senior leadership to acknowledge and participate in postmortems: This option is correct because when senior leadership acknowledges and participates in postmortems, it shows that they value the process and are committed to learning from mistakes. This can help in creating a culture where postmortems are well received and taken seriously by the organization. D. Ensure that writing effective postmortems is a rewarded and celebrated practice: This option is also correct because when effective postmortems are rewarded and celebrated, it creates a positive... (1 vote)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: CD. Choosing options C and D is a strategic approach to introducing and fostering a positive postmortem culture within an organization. - In option C, encouraging senior leadership to acknowledge and participate in postmortems sets a precedent for the importance of the process throughout the organization. It signals that the postmortem process is not solely about assigning blame but is a collaborative effort to learn and improve. - In option D, rewarding and celebrating the practice of writing effective postmortems further reinforces a positive culture around the process.... (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 146,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Adopting postmortems: leadership buy-in + positive incentives.",
    "correctRationale": "For a new postmortem practice to be accepted, Google SRE guidance emphasizes cultural enablers: senior leadership acknowledging and participating (C) and the work being rewarded and celebrated (D). Practice-only drills for new hires (A), a designated postmortem team (B), and a critique forum (E) either limit ownership or frame postmortems as oversight rather than a celebrated practice.",
    "optionRationales": [
      "Wrong: Limiting authorship to new-employee practice keeps real incidents out of the culture.",
      "Wrong: A designated team silos postmortem work instead of making it an org-wide practice.",
      "Correct: Visible leadership participation legitimizes and normalizes the process.",
      "Correct: Rewarding postmortem work makes people want to do it well.",
      "Wrong: A critique forum frames postmortems as something to attack rather than a learning tool."
    ]
  },
  {
    "id": 145,
    "topic": "SLOs & Error Budgets",
    "difficulty": 1,
    "question": "You recently noticed that one of your services has exceeded the error budget for the current rolling window period. Your company's product team is about to launch a new feature. You want to follow Site Reliability Engineering (SRE) practices. What should you do?",
    "options": [
      "A. Notify the team about the lack of error budget and ensure that all their tests are successful so the launch will not further risk the error budget",
      "B. Notify the team that their error budget is used up. Negotiate with the team for a launch freeze or tolerate a slightly worse user experience.",
      "C. Escalate the situation and request additional error budget.",
      "D. Look through other metrics related to the product and find SLOs with remaining error budget. Reallocate the error budgets and allow the feature launch."
    ],
    "correct": 1,
    "explanation": "Budget exhausted → tell the team the budget is gone and negotiate a launch freeze or accept slightly worse UX.",
    "discussion": [
      {
        "user": "lelele2023",
        "text": "Selected Answer: B. Only B seems to make a bit sense although I don't like the idea to tolerate a worse user experience. (3 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: B. This is SRE-friendly approach. (2 votes)"
      },
      {
        "user": "koo_kai",
        "text": "Selected Answer: B. Negotiate with the team for a launch freeze or tolerate a slightly worse user experience. (2 votes)"
      },
      {
        "user": "activist",
        "text": "Answer C seems to be correct per Google docs: https://sre.google/workbook/error-budget-policy/ (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: B. If the service has exceeded its error budget for the preceding four-week window, we will halt all changes and releases other than P01 issues or security fixes until the service is back within its SLO. https://sre.google/workbook/error-budget-policy/#:~:text=If%20the%20service%20has,exceed%20the%20error%20budget.. (1 vote)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: B. Choosing (option B) aligns with Site Reliability Engineering (SRE) principles, emphasizing the importance of maintaining system reliability and availability. By notifying the team that the error budget has been exhausted, the SRE team is proactively communicating the potential risks associated with launching the new feature during a period of heightened error rates. The suggestion to negotiate for a launch freeze or tolerate a slightly degraded user experience demonstrates a commitment to preserving the system's reliability and ensuring that user impact is minimized. This... (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 145,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Acting on an exhausted error budget.",
    "correctRationale": "When the error budget is spent, the error-budget policy kicks in: notify stakeholders that budget is used up and negotiate either a launch freeze or tolerating a temporarily worse experience. 'Run the tests and launch anyway' ignores the policy, escalation is not the mechanism, and borrowing budgets across SLOs is not how error budgets work.",
    "optionRationales": [
      "Wrong: 'Tests pass' is unrelated to budget; the policy exists to gate launches when budget is gone.",
      "Correct: Communicate the exhausted budget and negotiate freeze vs. tolerating degraded UX — the SRE practice.",
      "Wrong: Error budgets are not granted by escalation; they are defined by the SLO.",
      "Wrong: Reallocating budget across unrelated SLOs defeats each service's accountability for its reliability."
    ]
  },
  {
    "id": 144,
    "topic": "Deployment Strategies",
    "difficulty": 2,
    "question": "You have an application that runs on Cloud Run. You want to use live production traffic to test a new version of the application, while you let the quality assurance team perform manual testing. You want to limit the potential impact of any issues while testing the new version, and you must be able to roll back to a previous version of the application if needed. How should you deploy the new version? (Choose two.)",
    "options": [
      "A. Deploy the application as a new Cloud Run service.",
      "B. Deploy a new Cloud Run revision with a tag and use the --no-traffic option.",
      "C. Deploy a new Cloud Run revision without a tag and use the --no-traffic option.",
      "D. Deploy the new application version and use the --no-traffic option. Route production traffic to the revision's URL.",
      "E. Deploy the new application version, and split traffic to the new version."
    ],
    "correct": [
      1,
      4
    ],
    "explanation": "A tagged --no-traffic revision gives QA a private URL, and a small traffic split sends real traffic to the new revision with instant rollback.",
    "discussion": [
      {
        "user": "activist",
        "text": "A&E seem correct for using live production traffic. The question states \"You want to use live production traffic to test a new version of the application,\" (5 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: BD. Looks like just only (option B) is the most reasonable. But after thinking harder on this question, maybe choosing (option B & D) its okey to involves deploying the new version of the application on Cloud Run by creating a new revision with a tag and using the --no-traffic option. This approach allows the isolation of the new revision from live production traffic initially. Once the deployment is complete, extensive testing can be conducted without affecting users. Subsequently, when confident in the new version's stability, production traffic can be gradually directed to... (3 votes)"
      },
      {
        "user": "Angel_O",
        "text": "Selected Answer: AE. keyword: You want to use live production traffic (3 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: B. https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration#tags B is correct which targets to utilise the cloud run tag feature without serving traffic first, the idea is once tested adequately, then migrate traffic to the tagged revision. But not sure what is another answer given it is multi-choice, none of them apart from B looks reasonable. (3 votes)"
      },
      {
        "user": "6a8c7ad",
        "text": "Selected Answer: BE. Definitely E for prod traffic. And B for developer only end. (2 votes)"
      },
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: BD. I would go for BD (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 144,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics' suggested B,D (community B,D 42% / B,E 21%): a tagged revision with --no-traffic gives QA a private URL, and a traffic split sends a small share of live production traffic to the new revision with instant rollback; D contradicts itself by combining --no-traffic with routing production traffic to the revision URL.",
    "conceptSummary": "Cloud Run canary-by-traffic-split plus private tagged revision.",
    "correctRationale": "Two needs are combined: QA manual testing (tagged revision with --no-traffic → private URL, B) and limited live-traffic testing (traffic split to the new revision, E) — both keep rollback instant by flipping traffic back. A new service duplicates config, an untagged --no-traffic revision has no stable test URL, and D contradicts itself (--no-traffic, then routing prod traffic to its URL).",
    "optionRationales": [
      "Wrong: A whole new service duplicates configuration and traffic management unnecessarily.",
      "Correct: A tagged revision with --no-traffic gives QA a private, zero-prod-traffic URL for manual testing.",
      "Wrong: Without a tag the no-traffic revision has no dedicated URL to hand to testers.",
      "Wrong: --no-traffic then routing production traffic to the revision URL is self-contradictory.",
      "Correct: A traffic split sends a controlled slice of production traffic to the new revision with instant rollback."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 143,
    "topic": "SLOs & Error Budgets",
    "difficulty": 2,
    "question": "You need to create a Cloud Monitoring SLO for a service that will be published soon. You want to verify that requests to the service will be addressed in fewer than 300 ms at least 90% of the time per calendar month. You need to identify the metric and evaluation method to use. What should you do?",
    "options": [
      "A. Select a latency metric for a request-based method of evaluation.",
      "B. Select a latency metric for a window-based method of evaluation.",
      "C. Select an availability metric for a request-based method of evaluation.",
      "D. Select an availability metric for a window-based method of evaluation."
    ],
    "correct": 0,
    "explanation": "A 'X% of requests under Y ms' objective is a request-based SLI on a latency metric.",
    "discussion": [
      {
        "user": "activist",
        "text": "Answer B seems to be correct for latency and windows-based. \"service will be addressed in fewer than 300 ms at least 90% of the time per calendar month. \" (10 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: A. it asks to be fewer than 300ms hence it excludes C and D which are availability metrics. Then it cares about the percentage of requests(90%) but never mentioned windows requirements hence A. Actually mentioning calendar in the question is a trick, it misled you to think about a time range, but both request-metrics and windows-metrics would require a setting of compliance periods, this could be either calendar or rolling-windows https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring#compliance-period (6 votes)"
      },
      {
        "user": "YushiSato",
        "text": "Selected Answer: A. I think A is correct answer. Window-based metrics evaluate the percentage of time the condition is met. https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring#slo-types (4 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. To create a Cloud Monitoring Service Level Objective (SLO) for a service with the requirement of ensuring that requests are addressed in fewer than 300 ms at least 90% of the time per calendar month, the recommended approach is (option A). Select a latency metric for a request-based method of evaluation. Latency metrics, which measure the time it takes for requests to be processed, are appropriate for evaluating the specific performance requirements outlined in the scenario. By selecting a latency metric for a request-based method, such as P95 (percentile 95), you can... (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: A. https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring#slo-type-request (1 vote)"
      },
      {
        "user": "Xoxoo",
        "text": "Selected Answer: A. The request-based method of evaluation will calculate the percentage of requests that meet the latency threshold of 300 ms over the entire calendar month. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 143,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority B chose window-based, but '90% of requests under 300 ms' is a ratio of good requests to total requests — a request-based SLO; window-based counts good time slices instead.",
    "conceptSummary": "Request-based evaluation for a latency SLO.",
    "correctRationale": "The objective '90% of requests under 300 ms per month' is a ratio of good requests to total requests — a request-based evaluation. Window-based evaluation instead counts good time slices (e.g., minutes meeting the target). Since the metric is latency, request-based + latency is the match.",
    "optionRationales": [
      "Correct: '90% of requests < 300 ms' is a ratio over requests — request-based evaluation of a latency metric.",
      "Wrong: Window-based evaluation counts good time intervals, not the share of fast requests.",
      "Wrong: Availability metrics measure successful responses, not response-time thresholds.",
      "Wrong: Availability + window-based matches neither the metric nor the evaluation style."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 142,
    "topic": "Deployment Strategies",
    "difficulty": 2,
    "question": "You are investigating issues in your production application that runs on Google Kubernetes Engine (GKE). You determined that the source of the issue is a recently updated container image, although the exact change in code was not identified. The deployment is currently pointing to the latest tag. You need to update your cluster to run a version of the container that functions as intended. What should you do?",
    "options": [
      "A. Create a new tag called stable that points to the previously working container, and change the deployment to point to the new tag.",
      "B. Alter the deployment to point to the sha256 digest of the previously working container.",
      "C. Build a new container from a previous Git tag, and do a rolling update on the deployment to the new container.",
      "D. Apply the latest tag to the previous container image, and do a rolling update on the deployment."
    ],
    "correct": 1,
    "explanation": "Point the deployment at the previous image's immutable sha256 digest — tags are mutable, digests are not.",
    "discussion": [
      {
        "user": "lelele2023",
        "text": "Selected Answer: B. This question looks to tease out the knowledge of tag vs digest while deploying containers. The best approach is to figure out the previously functional digest and apply to deployment. Tag is mutable, using a tag like latest in deployment is confusing and prone to cause deployment inconsistency. https://cloud.google.com/kubernetes-engine/docs/concepts/about-container-images (3 votes)"
      },
      {
        "user": "koo_kai",
        "text": "Selected Answer: B. https://cloud.google.com/kubernetes-engine/docs/concepts/about-container-images (3 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: B. https://cloud.google.com/kubernetes-engine/docs/concepts/about-container-images#disadvantages_of_image_tags Because the code change is not known, it may be possible that the image was updated with same tag and now it's not working, so pointing using the tag won't solve the issue as it will always point to the latest digest sha256 (which is faulty). So we must point the deployment to the sha256 digest of the previously working container. (1 vote)"
      },
      {
        "user": "Xoxoo",
        "text": "Selected Answer: B. Using the SHA256 digest ensures that you specifically deploy the exact version of the container that was previously working as intended, regardless of any changes made to the latest tag. (1 vote)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: B. To update your Google Kubernetes Engine (GKE) cluster to run a version of the container that functions as intended, despite the unknown change in the latest container image, the recommended approach is (option B). Alter the deployment to point to the sha256 digest of the previously working container. Using the sha256 digest provides a precise and immutable reference to a specific version of the container image, ensuring that the exact image that was known to work is deployed. This approach eliminates any ambiguity associated with using tags like \"latest\" and provides a... (1 vote)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: B. Vote B (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 142,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Pinning to a known-good image by digest.",
    "correctRationale": "The deployment currently follows the mutable 'latest' tag, which moved to the broken build. The sha256 digest of the previously working image is immutable, so pointing the deployment at it restores exactly that container. New tags or re-applying 'latest' keep the same mutability problem; rebuilding from a Git tag is slower and unnecessary.",
    "optionRationales": [
      "Wrong: A new 'stable' tag is still a mutable tag — it can be moved again by a later push.",
      "Correct: The sha256 digest immutably identifies the working image, removing the moving-tag failure mode.",
      "Wrong: Rebuilding from a Git tag is slower and produces a new image rather than the proven-working one.",
      "Wrong: Re-tagging 'latest' to the old image mutates a shared tag and breaks other consumers."
    ]
  },
  {
    "id": 141,
    "topic": "Incident Management",
    "difficulty": 1,
    "question": "You are the Site Reliability Engineer responsible for managing your company's data services and products. You regularly navigate operational challenges, such as unpredictable data volume and high cost, with your company's data ingestion processes. You recently learned that a new data ingestion product will be developed in Google Cloud. You need to collaborate with the product development team to provide operational input on the new product. What should you do?",
    "options": [
      "A. Deploy the prototype product in a test environment, run a load test, and share the results with the product development team.",
      "B. When the initial product version passes the quality assurance phase and compliance assessments, deploy the product to a staging environment. Share error logs and performance metrics with the product development team.",
      "C. When the new product is used by at least one internal customer in production, share error logs and monitoring metrics with the product development team.",
      "D. Review the design of the product with the product development team to provide feedback early in the design phase."
    ],
    "correct": 3,
    "explanation": "Operational input is most valuable early: review the product's design with the team before it hardens.",
    "discussion": [
      {
        "user": "Xoxoo",
        "text": "Selected Answer: D. Engaging with the product development team early in the design phase allows you to provide valuable input based on your operational experience (2 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. To provide operational input on the new data ingestion product in Google Cloud, the recommended approach is (option D) Review the design of the product with the product development team to provide feedback early in the design phase. By engaging in the design phase, you can contribute valuable insights from an operational perspective, helping to identify potential challenges and considerations related to data volume, cost, and overall operability. This early collaboration allows for proactive discussions on scalability, reliability, and cost-effectiveness, leading to a more... (2 votes)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: D. Vote D (1 vote)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: D. D: early collaboration is a good practice (1 vote)"
      },
      {
        "user": "activist",
        "text": "Why Answer D? Operations and product development teams collaborate early in the design phase. (1 vote)"
      },
      {
        "user": "activist",
        "text": "Answer D appears correct. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 141,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Early-engagement SRE input during the design phase.",
    "correctRationale": "SRE engagement is highest-leverage at design time — operational concerns (data volume, cost, failure modes) are cheap to address before architecture is set. Load tests, staging metrics, and post-launch logs all deliver input after key decisions are locked.",
    "optionRationales": [
      "Wrong: Load-testing a prototype is useful but comes after design choices are already made.",
      "Wrong: Waiting until QA/compliance gates pass means operational feedback arrives too late to shape design.",
      "Wrong: Production-era metrics are the latest possible input.",
      "Correct: Reviewing the design with the team provides operational input when it is cheapest to act on."
    ]
  },
  {
    "id": 140,
    "topic": "Org & IAM",
    "difficulty": 1,
    "question": "You have deployed a fleet of Compute Engine instances in Google Cloud. You need to ensure that monitoring metrics and logs for the instances are visible in Cloud Logging and Cloud Monitoring by your company's operations and cyber security teams. You need to grant the required roles for the Compute Engine service account by using Identity and Access Management (IAM) while following the principle of least privilege. What should you do?",
    "options": [
      "A. Grant the logging.logWriter and monitoring.metricWriter roles to the Compute Engine service accounts.",
      "B. Grant the logging.admin and monitoring.editor roles to the Compute Engine service accounts.",
      "C. Grant the logging.editor and monitoring.metricWriter roles to the Compute Engine service accounts.",
      "D. Grant the logging.logWriter and monitoring.editor roles to the Compute Engine service accounts."
    ],
    "correct": 0,
    "explanation": "Grant only logging.logWriter and monitoring.metricWriter to the service accounts — the minimum roles for writing telemetry.",
    "discussion": [
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: A. Remove admin role from the options and there is no such role as logging.editor, so it is A (4 votes)"
      },
      {
        "user": "activist",
        "text": "Answer A seems to be correct as the two \"writer\" roles are least privilege granted to the service account. (3 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. Choose option A Grant the logging.logWriter and monitoring.metricWriter roles to the Compute Engine service accounts. These roles provide the necessary permissions for writing logs and metrics to Cloud Logging and Cloud Monitoring, respectively, without granting overly broad access. This aligns with the principle of least privilege, ensuring that the Compute Engine service accounts have the specific permissions needed for monitoring tasks without unnecessary additional privileges. This approach enables effective visibility for both operations and cyber security teams while... (2 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: A. Logs Writer (roles/logging.logWriter): Provides the permissions to write log entries. Monitoring Metric Writer (roles/monitoring.metricWriter): Provides write-only access to metrics. This provides exactly the permissions needed by the Cloud Monitoring agent and other systems that send metrics. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 140,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Least-privilege roles for writing logs and metrics.",
    "correctRationale": "Compute Engine service accounts only need to write telemetry: logging.logWriter writes log entries and monitoring.metricWriter writes metrics — the least-privilege pair. The editor/admin roles add broad modify permissions the VMs do not need.",
    "optionRationales": [
      "Correct: logWriter + metricWriter grant exactly the write permissions needed — nothing more.",
      "Wrong: logging.admin and monitoring.editor grant delete/manage rights far beyond writing telemetry.",
      "Wrong: logging.editor is broader than needed for writing entries.",
      "Wrong: monitoring.editor exceeds the write-only need."
    ]
  },
  {
    "id": 139,
    "topic": "Logging",
    "difficulty": 3,
    "question": "Your company runs services by using Google Kubernetes Engine (GKE). The GKE clusters in the development environment run applications with verbose logging enabled. Developers view logs by using the kubectl logs command and do not use Cloud Logging. Applications do not have a uniform logging structure defined. You need to minimize the costs associated with application logging while still collecting GKE operational logs. What should you do?",
    "options": [
      "A. Run the gcloud container clusters update --logging=SYSTEM command for the development cluster.",
      "B. Run the gcloud container clusters update --logging=WORKLOAD command for the development cluster.",
      "C. Run the gcloud logging sinks update _Default --disabled command in the project associated with the development environment.",
      "D. Add the severity >= DEBUG resource.type = \"k8s_container\" exclusion filter to the _Default logging sink in the project associated with the development environment."
    ],
    "correct": 0,
    "explanation": "--logging=SYSTEM keeps GKE system logs but stops workload log collection — the real cost cut while kubectl logs still works.",
    "discussion": [
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: D. right answer (4 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: D. D The idea is to prevent/minimize container logs from getting sent to the sink, (3 votes)"
      },
      {
        "user": "asdasdfczxhjkvz",
        "text": "Selected Answer: A. A is correct (2 votes)"
      },
      {
        "user": "cachopo",
        "text": "Selected Answer: A. - The --logging=SYSTEM option disables workload logging (application logs) while keeping GKE system logs (like node, control plane, and Kubernetes system logs). - This helps reduce costs by not storing verbose application logs while still collecting critical GKE operational logs for monitoring. - Since developers use kubectl logs, they can still see logs without needing Cloud Logging. (1 vote)"
      },
      {
        "user": "SahandJ",
        "text": "Selected Answer: B. Not sure I agree with any answers. But I disagree the least with A. A) Would send all the logs, including memory, CPU, and other system information. This is too verbose. B) WORKLOAD logs should be sufficient I believe C) Not sure disabling _Default helps here D) An exclusion filter of \"severity >= DEBUG...\" would literally exclude *all* logs? (1 vote)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. To minimize costs associated with application logging in Google Kubernetes Engine (GKE) while still collecting operational logs, the recommended approach is (option D). Add the severity >= DEBUG resource.type = \"k8s_container\" exclusion filter to the _Default logging sink in the project associated with the development environment. This filter excludes logs with a severity level of DEBUG or lower for the specified resource type, \"k8s_container,\" effectively reducing the volume of verbose application logs being ingested into Cloud Logging. This allows you to focus on... (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 139,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics' suggested D (community 67% D): unstructured logs get severity DEFAULT, which sorts below DEBUG, so the severity >= DEBUG exclusion lets most of these non-uniform application logs through; --logging=SYSTEM stops workload log collection while keeping GKE system logs, and kubectl logs keeps working.",
    "conceptSummary": "Cutting workload log-ingestion cost on GKE without losing system logs.",
    "correctRationale": "Developers use kubectl logs, not Cloud Logging, so workload log ingestion is paying for unused signal. Setting --logging=SYSTEM collects only GKE system/operational logs — cutting application-log costs entirely. The ExamTopics exclusion-filter answer is wrong: unstructured app logs land at severity DEFAULT, which sorts below DEBUG, so a 'severity >= DEBUG' exclusion would let most of the non-uniform logs through anyway. A WORKLOAD value keeps the costly application logs; disabling _Default would kill needed logs.",
    "optionRationales": [
      "Correct: --logging=SYSTEM keeps cluster operational logs while stopping workload log collection — the actual cost cut, and kubectl logs is unaffected.",
      "Wrong: --logging=WORKLOAD does the opposite — keeps app logs and drops the system logs you need.",
      "Wrong: Disabling the _Default sink stops all logs including the operational ones the question requires.",
      "Wrong: Unstructured logs get severity DEFAULT (below DEBUG), so a severity>=DEBUG exclusion would still let most app logs through."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 138,
    "topic": "Troubleshooting & APM",
    "difficulty": 1,
    "question": "Your company processes IoT data at scale by using Pub/Sub, App Engine standard environment, and an application written in Go. You noticed that the performance inconsistently degrades at peak load. You could not reproduce this issue on your workstation. You need to continuously monitor the application in production to identify slow paths in the code. You want to minimize performance impact and management overhead. What should you do?",
    "options": [
      "A. Use Cloud Monitoring to assess the App Engine CPU utilization metric.",
      "B. Install a continuous profiling tool into Compute Engine. Configure the application to send profiling data to the tool.",
      "C. Periodically run the go tool pprof command against the application instance. Analyze the results by using flame graphs.",
      "D. Configure Cloud Profiler, and initialize the cloud.google.com/go/profiler library in the application."
    ],
    "correct": 3,
    "explanation": "Cloud Profiler with the Go library continuously profiles production with tiny overhead — built for spotting slow code paths.",
    "discussion": [
      {
        "user": "khoukha",
        "text": "answer is D: https://cloud.google.com/profiler/docs/profiling-go#app-engine (7 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. Choose option D Configure Cloud Profiler and initialize the cloud.google.com/go/profiler library in the application. Cloud Profiler is designed for low-overhead continuous profiling in production environments. By configuring Cloud Profiler and initializing the corresponding library in the Go application, you can collect detailed performance data without significantly impacting the application's performance. This approach allows you to analyze profiling information, identify slow paths in the code, and gain insights into performance bottlenecks, providing a powerful and... (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: D. D is the answer. (2 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: D. // appengine is an example of starting cloud.google.com/go/profiler on // App Engine. package main import ( \"cloud.google.com/go/profiler\" ) (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 138,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Continuous low-overhead production profiling.",
    "correctRationale": "Intermittent slowness that will not reproduce locally needs always-on production profiling — Cloud Profiler initialized via cloud.google.com/go/profiler does continuous CPU/heap profiling with minimal overhead. CPU metrics will not show slow code paths, Compute Engine tools do not apply to App Engine, and ad-hoc pprof misses intermittent issues.",
    "optionRationales": [
      "Wrong: CPU utilization metrics show resource pressure, not which code paths are slow.",
      "Wrong: The app runs on App Engine, not Compute Engine — installing a profiling tool there is not applicable.",
      "Wrong: Periodic manual pprof runs will miss the intermittent degradation and are not continuous.",
      "Correct: The Profiler library gives continuous low-overhead production profiling that surfaces slow code paths."
    ]
  },
  {
    "id": 137,
    "topic": "CI/CD Pipelines",
    "difficulty": 1,
    "question": "You are developing reusable infrastructure as code modules. Each module contains integration tests that launch the module in a test project. You are using GitHub for source control. You need to continuously test your feature branch and ensure that all code is tested before changes are accepted. You need to implement a solution to automate the integration tests. What should you do?",
    "options": [
      "A. Use a Jenkins server for CI/CD pipelines. Periodically run all tests in the feature branch.",
      "B. Ask the pull request reviewers to run the integration tests before approving the code.",
      "C. Use Cloud Build to run the tests. Trigger all tests to run after a pull request is merged.",
      "D. Use Cloud Build to run tests in a specific folder. Trigger Cloud Build for every GitHub pull request."
    ],
    "correct": 3,
    "explanation": "Cloud Build triggered on each GitHub pull request runs the integration tests before merge — automated pre-merge verification.",
    "discussion": [
      {
        "user": "Jay09812",
        "text": "Wouldnt it be D considering you would want to run the tests when the PR is created and not after the code is already merged (3 votes)"
      },
      {
        "user": "pharao89",
        "text": "Selected Answer: D. D is what I do at work for this scenario and it works well. (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: D. This approach automates the testing process, integrates well with your existing tools (GitHub and GCP), and ensures that code is tested in the most relevant part of the development lifecycle - before merging into the main branch. (2 votes)"
      },
      {
        "user": "koo_kai",
        "text": "Selected Answer: D. all code is tested before changes are accepted (2 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: C. I would go with C (2 votes)"
      },
      {
        "user": "activist",
        "text": "Answer C is correct. https://cloud.google.com/build/docs/automating-builds/create-manage-triggers (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 137,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "PR-triggered integration tests with Cloud Build.",
    "correctRationale": "The ask is automation that tests code before acceptance: a Cloud Build trigger on every GitHub pull request runs the tests on the feature branch ahead of merge. Periodic Jenkins runs do not gate PRs, asking reviewers to run tests manually is not automation, and triggering post-merge is too late.",
    "optionRationales": [
      "Wrong: Periodic Jenkins runs are not tied to PRs and can miss the pre-merge window entirely.",
      "Wrong: Manual reviewer-run tests are not automation and are inconsistent.",
      "Wrong: Testing after merge means untested code is already accepted.",
      "Correct: A Cloud Build trigger per pull request automates integration tests before any change is merged."
    ]
  },
  {
    "id": 136,
    "topic": "Incident Management",
    "difficulty": 2,
    "question": "Your CTO has asked you to implement a postmortem policy on every incident for internal use. You want to define what a good postmortem is to ensure that the policy is successful at your company. What should you do? (Choose two.)",
    "options": [
      "A. Ensure that all postmortems include what caused the incident, identify the person or team responsible for causing the incident, and how to prevent a future occurrence of the incident.",
      "B. Ensure that all postmortems include what caused the incident, how the incident could have been worse, and how to prevent a future occurrence of the incident.",
      "C. Ensure that all postmortems include the severity of the incident, how to prevent a future occurrence of the incident, and what caused the incident without naming internal system components.",
      "D. Ensure that all postmortems include how the incident was resolved and what caused the incident without naming customer information.",
      "E. Ensure that all postmortems include all incident participants in postmortem authoring and share postmortems as widely as possible."
    ],
    "correct": [
      1,
      4
    ],
    "explanation": "Good postmortems cover cause, a 'where we got lucky' analysis, and prevention — and should be shared broadly with all participants contributing.",
    "discussion": [
      {
        "user": "activist",
        "text": "I think the answers are B & D. (8 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: CE. Option B is incorrect because it states that the postmortem should include how the incident could have been worse.The focus of the postmortem should be on identifying the root cause of the incident and developing recommendations for preventing future occurrences. (7 votes)"
      },
      {
        "user": "pharao89",
        "text": "Selected Answer: CE. A. We don't blame B. I can't imagine a postmortem with information on how the incident could have been worse. C. Correct answer. D. It's nearly the same as C but doesn't include recommendations for the future, so I go with C. E. Correct, include all participants of the incident in authoring postmortem to not miss something important. (4 votes)"
      },
      {
        "user": "khoukha",
        "text": "B & D is the answer (4 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: CE. Choose C & E Option C emphasizes including the severity of the incident, prevention strategies for future occurrences, and an analysis of what caused the incident without necessarily naming internal system components. This approach ensures a balance between transparency and security, providing valuable insights without exposing sensitive internal details. Option E, which advocates involving all incident participants in postmortem authoring and sharing postmortems widely, promotes a collaborative and inclusive culture. Involving all relevant stakeholders ensures a... (3 votes)"
      },
      {
        "user": "TereRolon",
        "text": "I thing is CE https://sre.google/workbook/postmortem-culture/ (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 136,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics' suggested C,E (community 86% C,E): C forbids naming internal system components, which makes a technical root cause impossible to describe; B covers cause, a 'where we got lucky' analysis, and prevention, matching Google's postmortem template.",
    "conceptSummary": "Contents of a good blameless postmortem.",
    "correctRationale": "A strong postmortem states what caused the incident, analyzes how it could have been worse (the 'where we got lucky' thinking in Google's template), and defines prevention (B); it also includes all incident participants in authoring and circulates widely (E). Options that forbid naming internal components make a technical root cause impossible, and naming the responsible person is blame, not blameless.",
    "optionRationales": [
      "Wrong: Naming the responsible person or team is blame assignment — the opposite of blameless culture.",
      "Correct: Cause + 'how it could have been worse' + prevention matches Google's postmortem template.",
      "Wrong: Forbidding internal component names makes a technical root cause impossible to describe.",
      "Wrong: This option avoids naming components and omits the prevention/learning element fully.",
      "Correct: Broad authorship by participants and wide sharing are hallmarks of the SRE postmortem practice."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 135,
    "topic": "Supply Chain Security",
    "difficulty": 1,
    "question": "Your company operates in a highly regulated domain. Your security team requires that only trusted container images can be deployed to Google Kubernetes Engine (GKE). You need to implement a solution that meets the requirements of the security team while minimizing management overhead. What should you do?",
    "options": [
      "A. Configure Binary Authorization in your GKE clusters to enforce deploy-time security policies.",
      "B. Grant the roles/artifactregistry.writer role to the Cloud Build service account. Confirm that no employee has Artifact Registry write permission.",
      "C. Use Cloud Run to write and deploy a custom validator. Enable an Eventarc trigger to perform validations when new images are uploaded.",
      "D. Configure Kritis to run in your GKE clusters to enforce deploy-time security policies."
    ],
    "correct": 0,
    "explanation": "Binary Authorization is the managed deploy-time policy enforcer for trusted images on GKE — least management overhead.",
    "discussion": [
      {
        "user": "koo_kai",
        "text": "Selected Answer: A. https://cloud.google.com/binary-authorization/docs/overview (3 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. Choose Ooption A: Configure Binary Authorization in your GKE clusters to enforce deploy-time security policies. Binary Authorization allows you to define and enforce policies that determine which container images can be deployed based on image signatures. By configuring Binary Authorization, you can enforce deploy-time security policies, ensuring that only trusted and verified container images are allowed to run in your GKE clusters. This approach provides a robust security mechanism without requiring additional custom validators or complex configurations, minimizing... (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "A is the answer. (2 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: A. using binary-authorization (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 135,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Managed trusted-image enforcement on GKE.",
    "correctRationale": "The requirement — only trusted images on GKE with minimal overhead — is Binary Authorization's purpose: deploy-time policy that admits only attested/approved images. Restricting registry writes does not stop untrusted images already stored or from elsewhere, a custom validator is self-built machinery, and Kritis is the lower-level signer project rather than the managed control.",
    "optionRationales": [
      "Correct: Binary Authorization enforces the trusted-image policy at deploy time as a managed GKE feature.",
      "Wrong: Tightening Artifact Registry write access does not prove which images are trusted or stop deploys of existing images.",
      "Wrong: A custom Cloud Run validator is self-managed machinery with more overhead than the built-in control.",
      "Wrong: Kritis is the lower-level signing/attestation plumbing, not the managed policy enforcement point."
    ]
  },
  {
    "id": 134,
    "topic": "Supply Chain Security",
    "difficulty": 1,
    "question": "As part of your company's initiative to shift left on security, the InfoSec team is asking all teams to implement guard rails on all the Google Kubernetes Engine (GKE) clusters to only allow the deployment of trusted and approved images. You need to determine how to satisfy the InfoSec team's goal of shifting left on security. What should you do?",
    "options": [
      "A. Enable Container Analysis in Artifact Registry, and check for common vulnerabilities and exposures (CVEs) in your container images",
      "B. Use Binary Authorization to attest images during your CI/CD pipeline",
      "C. Configure Identity and Access Management (IAM) policies to create a least privilege model on your GKE clusters.",
      "D. Deploy Falco or Twistlock on GKE to monitor for vulnerabilities on your running Pods"
    ],
    "correct": 1,
    "explanation": "Binary Authorization attestation in the pipeline is the shift-left guard rail that admits only trusted, approved images to GKE.",
    "discussion": [
      {
        "user": "koo_kai",
        "text": "Selected Answer: B. https://cloud.google.com/binary-authorization/docs/overview (3 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: B. To satisfy the goal of shifting left on security and implement guardrails to only allow the deployment of trusted and approved images on Google Kubernetes Engine (GKE) clusters, the recommended approach is (option B) Use Binary Authorization to attest images during your CI/CD pipeline. Binary Authorization allows you to define and enforce policies that determine which container images can run in your GKE environment based on image signatures. By integrating Binary Authorization into your CI/CD pipeline, you can ensure that only trusted and approved images, with the correct... (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "B is the answer. (2 votes)"
      },
      {
        "user": "mzansikiller",
        "text": "Question 134 is question 119. (1 vote)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: B. using binary authorization (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 134,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Same stem as the corrected question 119 — the source had mistakenly shown Q118's text there; this entry carries the real stem.",
    "conceptSummary": "Deploy-time image trust enforcement (same stem as corrected Q119).",
    "correctRationale": "Only allowing trusted and approved images on GKE is an admission-control problem: Binary Authorization with the CI/CD pipeline as attestor blocks any image that lacks the pipeline's attestation. CVE scanning informs but does not gate, IAM least privilege does not verify images, and runtime monitors act after deployment. (Same stem as the corrected question 119.)",
    "optionRationales": [
      "Wrong: CVE scanning reports vulnerabilities but does not enforce trusted-image admission.",
      "Correct: Binary Authorization attestations make the cluster itself refuse untrusted images — the guard rail.",
      "Wrong: IAM restricts who can act, not which images may deploy.",
      "Wrong: Falco/Twistlock watch running pods; they do not gate deployment."
    ]
  },
  {
    "id": 133,
    "topic": "Monitoring & Alerting",
    "difficulty": 1,
    "question": "You encounter a large number of outages in the production systems you support. You receive alerts for all the outages, the alerts are due to unhealthy systems that are automatically restarted within a minute. You want to set up a process that would prevent staff burnout while following Site Reliability Engineering (SRE) practices. What should you do?",
    "options": [
      "A. Eliminate alerts that are not actionable",
      "B. Redefine the related SLO so that the error budget is not exhausted",
      "C. Distribute the alerts to engineers in different time zones",
      "D. Create an incident report for each of the alerts"
    ],
    "correct": 0,
    "explanation": "Self-healing systems should not page humans — eliminate alerts that demand no action.",
    "discussion": [
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: A. Right answer (4 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. Choose option A. Eliminating alerts that are not actionable helps streamline the alerting process and ensures that engineers are only notified when their intervention is necessary. This approach aligns with the SRE principle of reducing alert fatigue and focuses the attention of the engineering team on meaningful and actionable alerts. By eliminating non-actionable alerts, you not only prevent unnecessary disruptions to the team but also allow them to concentrate on addressing critical issues, contributing to a more efficient and sustainable incident response process. (2 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: A. A prevent administrators from burnout (2 votes)"
      },
      {
        "user": "enter_co",
        "text": "Duplicate question (1 vote)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: A (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 133,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Duplicate of question 59 — same scenario and answer.",
    "conceptSummary": "Only actionable alerts should page.",
    "correctRationale": "Systems that restart themselves within a minute do not need a human; paging on them is pure alert noise that causes burnout. SRE guidance is to delete or demote unactionable alerts. Redefining the SLO hides the signal, spreading alerts across time zones shares the burnout, and per-alert incident reports multiply toil. (This duplicates question 59.)",
    "optionRationales": [
      "Correct: Removing alerts that need no human action is the direct fix for alert-driven burnout.",
      "Wrong: Loosening the SLO just to silence pages hides real signal.",
      "Wrong: Sending the same noise to more engineers spreads burnout instead of eliminating it.",
      "Wrong: An incident report per alert creates more toil, not less."
    ]
  },
  {
    "id": 132,
    "topic": "Infrastructure as Code",
    "difficulty": 2,
    "question": "Your company uses Jenkins running on Google Cloud VM instances for CI/CD. You need to extend the functionality to use infrastructure as code automation by using Terraform. You must ensure that the Terraform Jenkins instance is authorized to create Google Cloud resources. You want to follow Google-recommended practices. What should you do?",
    "options": [
      "A. Confirm that the Jenkins VM instance has an attached service account with the appropriate Identity and Access Management (IAM) permissions.",
      "B. Use the Terraform module so that Secret Manager can retrieve credentials.",
      "C. Create a dedicated service account for the Terraform instance. Download and copy the secret key value to the GOOGLE_CREDENTIALS environment variable on the Jenkins server.",
      "D. Add the gcloud auth application-default login command as a step in Jenkins before running the Terraform commands."
    ],
    "correct": 0,
    "explanation": "Attach a properly-permissioned service account to the Jenkins VM — Terraform's Google provider picks it up via Application Default Credentials, no keys needed.",
    "discussion": [
      {
        "user": "shashankrathore",
        "text": "Selected Answer: A. Downloading and setting Env Variable has potential to expose such high-level access to users . where as a dedicated SA attached to VM does not expose any credentials at all. running tf by default would use SA attached to VM. (5 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: A. Not chosing C because this works, but involves manually managing the key, which can be error-prone and less secure compared to using attached service accounts. (5 votes)"
      },
      {
        "user": "pharao89",
        "text": "Selected Answer: C. C is the correct answer. A can't be since the terraform doesn't use the instance's service account for such operations. Think of it as running terraform on your local PC. You still need to somehow provide credentials to the cloud and envariable can be one of the solutions. (3 votes)"
      },
      {
        "user": "mshafa",
        "text": "A is the answer. (3 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: A. I go for A as it looks to be the fundamental thing at least. (3 votes)"
      },
      {
        "user": "ccpmad",
        "text": "Selected Answer: A. Is not C: \"Download and copy the secret key value...\" lol (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 132,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority C (service-account key download) works but is exactly what Google recommends avoiding; the attached service account + ADC is the recommended path.",
    "conceptSummary": "Keyless Terraform auth via the VM's attached service account.",
    "correctRationale": "On a Google Cloud VM the recommended pattern is an attached service account with the right IAM roles; the Terraform Google provider authenticates through Application Default Credentials automatically. Downloading a JSON key (C) works but is exactly the long-lived-credential practice to avoid; Secret Manager 'credential retrieval' is not a Terraform module, and gcloud auth application-default login is an interactive developer login, not a server flow.",
    "optionRationales": [
      "Correct: The VM's attached service account with proper IAM roles gives Terraform ADC-based auth — no keys, least overhead.",
      "Wrong: Secret Manager is not a Terraform credential provider; this adds machinery without solving auth.",
      "Wrong: Downloaded JSON keys are long-lived credentials — the pattern Google recommends avoiding.",
      "Wrong: gcloud auth application-default login is an interactive user login, not a service auth mechanism."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 131,
    "topic": "Logging",
    "difficulty": 2,
    "question": "Your organization stores all application logs from multiple Google Cloud projects in a central Cloud Logging project. Your security team wants to enforce a rule that each project team can only view their respective logs and only the operations team can view all the logs. You need to design a solution that meets the security team s requirements while minimizing costs. What should you do?",
    "options": [
      "A. Grant each project team access to the project _Default view in the central logging project. Grant logging viewer access to the operations team in the central logging project.",
      "B. Create Identity and Access Management (IAM) roles for each project team and restrict access to the _Default log view in their individual Google Cloud project. Grant viewer access to the operations team in the central logging project.",
      "C. Create log views for each project team and only show each project team their application logs. Grant the operations team access to the _AllLogs view in the central logging project.",
      "D. Export logs to BigQuery tables for each project team. Grant project teams access to their tables. Grant logs writer access to the operations team in the central logging project."
    ],
    "correct": 2,
    "explanation": "Per-team log views in the central bucket expose only each team's logs; _AllLogs view for ops sees everything — minimal cost.",
    "discussion": [
      {
        "user": "koo_kai",
        "text": "Selected Answer: C. maybe https://cloud.google.com/logging/docs/logs-views (4 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: C. Choose (option C). Creating log views for each project team allows you to tailor access to only show each team their relevant application logs. This fine-grained control ensures that project teams can access their own logs while maintaining isolation from logs of other teams. Granting the operations team access to the _AllLogs view in the central logging project provides them with the necessary visibility across all logs. This approach not only satisfies the security requirements but also minimizes costs by efficiently organizing and restricting access to the logs based on... (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "C is the answer. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 131,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Row-level log access with Cloud Logging views.",
    "correctRationale": "Cloud Logging log views slice a bucket's contents so each project team sees only its own logs, while the ops team gets the _AllLogs view — exactly the required split with no data duplication or extra storage. _Default views do not distinguish per-team access, project-scoped views leave the logs outside the central project, and BigQuery exports duplicate data at extra cost.",
    "optionRationales": [
      "Wrong: The _Default view shows all logs in the central project — it does not isolate a team's logs.",
      "Wrong: Restricting views in each team's own project leaves logs outside the central project and does not give ops a single pane.",
      "Correct: Log views per team plus _AllLogs for ops gives exactly the required visibility at minimal cost.",
      "Wrong: Exporting per-team tables to BigQuery duplicates the data and adds pipeline cost."
    ]
  },
  {
    "id": 130,
    "topic": "Troubleshooting & APM",
    "difficulty": 3,
    "question": "You are analyzing Java applications in production. All applications have Cloud Profiler and Cloud Trace installed and configured by default. You want to determine which applications need performance tuning. What should you do? (Choose two.)",
    "options": [
      "A. Examine the wall-clock time and the CPU time of the application. If the difference is substantial increase the CPU resource allocation.",
      "B. Examine the wall-clock time and the CPU time of the application. If the difference is substantial, increase the memory resource allocation.",
      "C. Examine the wall-clock time and the CPU time of the application. If the difference is substantial, increase the local disk storage allocation.",
      "D. Examine the latency time the wall-clock time and the CPU time of the application. If the latency time is slowly burning down the error budget, and the difference between wall-clock time and CPU time is minimal mark the application for optimization.",
      "E. Examine the heap usage of the application. If the usage is low, mark the application for optimization."
    ],
    "correct": [
      3,
      4
    ],
    "explanation": "The intended pair: D (latency/wall-vs-CPU signal for optimization) and E (heap usage); an admitted low-quality item.",
    "discussion": [
      {
        "user": "alpha_canary",
        "text": "Selected Answer: DE. I asked Google's Gemini AI and this is what it answered. Here's why these options are correct: D: Latency time: High latency directly impacts user experience and can negatively affect your error budget. Wall-clock time: This represents the elapsed time from start to finish of a request. A large difference with CPU time indicates bottlenecks outside the CPU, requiring optimization. CPU time: This represents the actual CPU processing time used by the application. Minimal difference with wall-clock time suggests inefficient use of CPU, potentially needing optimization. E:... (3 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: DE. A conflicts with D hence A gets excluded. B and C don't have direct relation with CPU time/wall time hence excluded either. Answers are D and E. (2 votes)"
      },
      {
        "user": "cachopo",
        "text": "Selected Answer: DE. https://cloud.google.com/profiler/docs/concepts-profiling D. When you examine the latency time along with the wall‐clock and CPU times, a minimal difference between wall‐clock and CPU times indicates that the code is CPU‑intensive (i.e. it isn't waiting on I/O). If at the same time the latency is eroding the error budget, this signals that the application isn't keeping up with user expectations and is a candidate for performance tuning. E. Low heap usage implies that the application isn't heavily utilizing its available memory. In Java applications, if the heap usage... (1 vote)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: DE. Choose options D and E. - Option D suggests examining the latency time, wall-clock time, and CPU time of the application. If the latency time is consistently burning down the error budget and the difference between wall-clock time and CPU time is minimal, it indicates potential areas for optimization. This helps identify performance bottlenecks that may be impacting the user experience. - Option E suggests examining the heap usage of the application, and if the usage is low, marking the application for optimization. Low heap usage may indicate that the application is not... (1 vote)"
      },
      {
        "user": "xhilmi",
        "text": "Choose options D and E. - Option D suggests examining the latency time, wall-clock time, and CPU time of the application. If the latency time is consistently burning down the error budget and the difference between wall-clock time and CPU time is minimal, it indicates potential areas for optimization. This helps identify performance bottlenecks that may be impacting the user experience. - Option E suggests examining the heap usage of the application, and if the usage is low, marking the application for optimization. Low heap usage may indicate that the application is not fully utilizing... (1 vote)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: D. D for sure, since \"If the CPU time is similar to the wall time, then that indicates the code is CPU intensive; almost all the time it takes to run is spent by the CPU. Long-running CPU-intensive blocks of code might be candidates for optimization.\" (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 130,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "low",
    "conflict": true,
    "discussionSummary": "Low-quality item: options are oddly worded and the 'correct' logic is not textbook. Minority A argued the opposite — a large wall-clock vs CPU gap means the code is waiting, so adding CPU would not help. Confidence: low.",
    "conceptSummary": "Flagging apps for tuning via Profiler/Trace signals.",
    "correctRationale": "The accepted answers read the telemetry: D marks an app for optimization when latency is burning the error budget while wall-clock≈CPU (compute-bound), and E uses heap usage as the profiling signal worth flagging. A assumes a wall-vs-CPU gap means 'add CPU' — actually it means the code is waiting (I/O, locks), so more CPU does not help. B and C swap in unrelated resources.",
    "optionRationales": [
      "Wrong: A big wall-clock vs CPU gap means the process is waiting (I/O, locks) — adding CPU will not help.",
      "Wrong: Same misdiagnosis, now applied to memory.",
      "Wrong: Disk storage is unrelated to a wall-vs-CPU latency gap.",
      "Correct: Latency burning the error budget with wall≈CPU marks the app as genuinely CPU-bound and worth optimizing.",
      "Correct: Heap usage is the Profiler signal for memory-pressure problems worth flagging for tuning."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 129,
    "topic": "Performance & Cost",
    "difficulty": 1,
    "question": "You need to deploy a new service to production. The service needs to automatically scale using a managed instance group and should be deployed across multiple regions. The service needs a large number of resources for each instance and you need to plan for capacity. What should you do?",
    "options": [
      "A. Monitor results of Cloud Trace to determine the optimal sizing.",
      "B. Use the n2-highcpu-96 machine type in the configuration of the managed instance group.",
      "C. Deploy the service in multiple regions and use an internal load balancer to route traffic.",
      "D. Validate that the resource requirements are within the available project quota limits of each region."
    ],
    "correct": 3,
    "explanation": "Confirm the resource needs fit each region's quota — capacity planning is a quota question, not a machine-type guess.",
    "discussion": [
      {
        "user": "koo_kai",
        "text": "Selected Answer: D. Question #37 (4 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: D. D, then C (1 vote)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. The recommended approach for deploying a new service to production that requires automatic scaling across multiple regions with a managed instance group and has high resource requirements is (option D). Validating that the resource requirements are within the available project quota limits for each region is crucial to avoid issues during deployment. Each Google Cloud region has specific quota limits for various resources, such as CPU, memory, and instances. Ensuring that the planned capacity aligns with the allocated quotas prevents unexpected scaling limitations and... (1 vote)"
      },
      {
        "user": "Andrei_Z",
        "text": "Weird question, you need both C and D in order to have a proper solution... (1 vote)"
      },
      {
        "user": "mshafa",
        "text": "D is the answer. (1 vote)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: C. Valid answer (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 129,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Duplicate of question 37 with updated product names (n2 machine types, etc.).",
    "conceptSummary": "Multi-region MIG capacity = verify quotas first.",
    "correctRationale": "Large, multi-region instances are limited by per-region quota; validating that the requirements fit the quota limits is the correct capacity-planning step. Picking n2-highcpu-96 or leaning on Trace guesses at the answer, and an internal LB does not create capacity. (This is a modernized duplicate of question 37.)",
    "optionRationales": [
      "Wrong: Cloud Trace measures request latency, not available capacity/quota.",
      "Wrong: Choosing a machine type upfront skips the actual question — whether quota exists for it in each region.",
      "Wrong: An internal load balancer routes traffic but does not create the resources the deployment needs.",
      "Correct: Validating requirements against per-region quota limits is the real capacity-planning step."
    ]
  },
  {
    "id": 128,
    "topic": "Performance & Cost",
    "difficulty": 1,
    "question": "You deployed an application into a large Standard Google Kubernetes Engine (GKE) cluster. The application is stateless and multiple pods run at the same time. Your application receives inconsistent traffic. You need to ensure that the user experience remains consistent regardless of changes in traffic and that the resource usage of the cluster is optimized. What should you do?",
    "options": [
      "A. Configure a cron job to scale the deployment on a schedule",
      "B. Configure a Horizontal Pod Autoscaler.",
      "C. Configure a Vertical Pod Autoscaler",
      "D. Configure cluster autoscaling on the node pool."
    ],
    "correct": 1,
    "explanation": "HPA adjusts pod replicas to actual traffic — consistent UX and optimized usage for a stateless app.",
    "discussion": [
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: B. Inconsistent traffic .. HPA (6 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: B. The recommended approach to ensure a consistent user experience and optimize resource usage for a stateless application with inconsistent traffic in a large Standard Google Kubernetes Engine (GKE) cluster is (option B) Configure a Horizontal Pod Autoscaler (HPA). HPA automatically adjusts the number of replica pods based on observed CPU utilization or other custom metrics. In the context of varying traffic patterns, HPA dynamically scales the number of pods to meet demand, ensuring that there are enough instances to handle increased traffic and scaling down during periods... (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "B is the answer. (2 votes)"
      },
      {
        "user": "kish18",
        "text": "HPA will take care of the traffic flow, will scale the pods which will maintain consistent performance (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 128,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Traffic-driven scaling for stateless GKE pods.",
    "correctRationale": "A stateless service with inconsistent traffic should scale replicas with demand — exactly what a Horizontal Pod Autoscaler does. A cron schedule guesses at patterns, VPA resizes pod resources rather than count, and the cluster autoscaler only adds nodes once pod demand exists.",
    "optionRationales": [
      "Wrong: Scheduled scaling only matches predictable traffic; the traffic here is inconsistent.",
      "Correct: HPA scales pod count with live demand — consistent experience and efficient usage.",
      "Wrong: VPA tunes resource requests per pod, not replica count against load.",
      "Wrong: Cluster autoscaling adjusts nodes; it does not itself add pods to serve the load."
    ]
  },
  {
    "id": 127,
    "topic": "Performance & Cost",
    "difficulty": 1,
    "question": "You work for a global organization and are running a monolithic application on Compute Engine. You need to select the machine type for the application to use that optimizes CPU utilization by using the fewest number of steps. You want to use historical system metrics to identify the machine type for the application to use. You want to follow Google-recommended practices. What should you do?",
    "options": [
      "A. Use the Recommender API and apply the suggested recommendations.",
      "B. Create an Agent Policy to automatically install Ops Agent in all VMs.",
      "C. Install the Ops Agent in a fleet of VMs by using the gcloud CLI.",
      "D. Review the Cloud Monitoring dashboard for the VM and choose the machine type with the lowest CPU utilization."
    ],
    "correct": 0,
    "explanation": "The Recommender API surfaces machine-type sizing suggestions derived from historical metrics — fewest steps, Google-recommended.",
    "discussion": [
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. The recommended approach for optimizing CPU utilization based on historical system metrics in a global organization running a monolithic application on Compute Engine is (option A). Utilizing the Recommender API allows you to leverage Google Cloud's machine learning algorithms to analyze historical data and provide specific recommendations for resource optimization. This method is proactive and can automatically suggest appropriate changes to improve efficiency, aligning with Google-recommended practices. By incorporating the insights provided by the Recommender API, you... (3 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: A. It should be A (3 votes)"
      },
      {
        "user": "mshafa",
        "text": "A is the answer. (2 votes)"
      },
      {
        "user": "nhiguchi",
        "text": "Selected Answer: A. Answer should be A https://cloud.google.com/recommender/docs/overview (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 127,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Rightsizing VMs with the Recommender API.",
    "correctRationale": "Compute Engine's Recommender analyzes historical utilization and emits machine-type recommendations — applying them is the fewest-steps, Google-recommended path. Agent installs gather metrics but do not recommend sizing, and eyeballing a dashboard is manual analysis.",
    "optionRationales": [
      "Correct: Recommender already computes machine-type suggestions from history — just apply them.",
      "Wrong: Agent policies collect metrics; they do not produce machine-type recommendations.",
      "Wrong: Installing the Ops Agent gathers data but leaves the sizing analysis to you.",
      "Wrong: Picking the 'lowest CPU' machine from a dashboard is manual guesswork, not a recommendation."
    ]
  },
  {
    "id": 126,
    "topic": "CI/CD Pipelines",
    "difficulty": 2,
    "question": "You are reviewing your deployment pipeline in Google Cloud Deploy. You must reduce toil in the pipeline, and you want to minimize the amount of time it takes to complete an end-to-end deployment. What should you do? (Choose two.)",
    "options": [
      "A. Create a trigger to notify the required team to complete the next step when manual intervention is required.",
      "B. Divide the automation steps into smaller tasks.",
      "C. Use a script to automate the creation of the deployment pipeline in Google Cloud Deploy.",
      "D. Add more engineers to finish the manual steps.",
      "E. Automate promotion approvals from the development environment to the test environment."
    ],
    "correct": [
      0,
      4
    ],
    "explanation": "Automate dev→test promotion and add notifications when manual steps wait — both remove idle, manual waiting from the pipeline.",
    "discussion": [
      {
        "user": "koo_kai",
        "text": "Selected Answer: AE. Chose A, E (5 votes)"
      },
      {
        "user": "pharao89",
        "text": "Selected Answer: AE. imho: A. Create a trigger to notify the required team to complete the next step when manual intervention is required. We want to reduce the time for end-to-end deployment. Notification of required manual intervention can reduce this time. B. Divide the automation steps into smaller tasks. This doesn't reduce toil or time, but maybe I miss something here? C. Use a script to automate the creation of the deployment pipeline in Google Cloud Deploy. We would rather use a webhook to create a deployment or pub/sub message. Doesn't sound like an answer to this question. D. Add... (4 votes)"
      },
      {
        "user": "nqthien041292",
        "text": "Selected Answer: BE. Vote BE (3 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: BE. The recommended approaches to reduce toil and minimize deployment time in Google Cloud Deploy are (options B and E). - Option B, dividing automation steps into smaller tasks, allows for better manageability and flexibility in the deployment process. This enables parallel execution of smaller tasks, speeding up the overall deployment. - Option E, automating promotion approvals, eliminates manual intervention and streamlines the progression from development to test environments, further reducing delays and potential errors associated with manual approval processes. Both... (3 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: BE. Chose based on eliminating other options (3 votes)"
      },
      {
        "user": "manishk39",
        "text": "Selected Answer: CE. main purpose of toil is to reduce the CICD build, deploy time. Not to break the work in pieces. B is not toil, it is good to troubleshoot the code or cicd configuration (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 126,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics' suggested B,E (community B,E 52% / A,E 40%): automating dev-to-test promotion removes a manual gate and automatic notifications cut idle waiting; splitting steps into smaller tasks reduces neither toil nor end-to-end time.",
    "conceptSummary": "Cutting deployment toil: automated promotion + manual-step notifications.",
    "correctRationale": "Toil and end-to-end time are cut by removing waits: automating the dev→test promotion approval removes a manual gate (E), and a trigger that notifies the responsible team the moment a manual step is pending removes dead time between steps (A). Splitting tasks smaller just reframes the same work; scripting pipeline creation is setup, not run-time toil; more engineers add bodies not speed.",
    "optionRationales": [
      "Correct: Notifying the team the instant a manual step is needed removes the idle waiting between stages.",
      "Wrong: Smaller tasks still take the same total manual effort and do not shorten the end-to-end path.",
      "Wrong: Automating pipeline creation is a one-time setup gain, not a reduction in per-deployment toil.",
      "Wrong: Adding people to do manual steps addresses staffing, not the toil or latency itself.",
      "Correct: Automating dev→test promotion removes a manual approval gate entirely."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 125,
    "topic": "Performance & Cost",
    "difficulty": 2,
    "question": "Your team is building a service that performs compute-heavy processing on batches of data. The data is processed faster based on the speed and number of CPUs on the machine. These batches of data vary in size and may arrive at any time from multiple third-party sources. You need to ensure that third parties are able to upload their data securely. You want to minimize costs, while ensuring that the data is processed as quickly as possible. What should you do?",
    "options": [
      "A. Provide a secure file transfer protocol (SFTP) server on a Compute Engine instance so that third parties can upload batches of data, and provide appropriate credentials to the server. Create a Cloud Function with a google.storage.object.finalize Cloud Storage trigger. Write code so that the function can scale up a Compute Engine autoscaling managed instance group Use an image pre-loaded with the data processing software that terminates the instances when processing completes.",
      "B. Provide a Cloud Storage bucket so that third parties can upload batches of data, and provide appropriate Identity and Access Management (IAM) access to the bucket. Use a standard Google Kubernetes Engine (GKE) cluster and maintain two services: one that processes the batches of data, and one that monitors Cloud Storage for new batches of data. Stop the processing service when there are no batches of data to process.",
      "C. Provide a Cloud Storage bucket so that third parties can upload batches of data, and provide appropriate Identity and Access Management (IAM) access to the bucket. Create a Cloud Function with a google.storage.object.finalize Cloud Storage trigger. Write code so that the function can scale up a Compute Engine autoscaling managed instance group. Use an image pre-loaded with the data processing software that terminates the instances when processing completes.",
      "D. Provide a Cloud Storage bucket so that third parties can upload batches of data, and provide appropriate Identity and Access Management (IAM) access to the bucket. Use Cloud Monitoring to detect new batches of data in the bucket and trigger a Cloud Function that processes the data. Set a Cloud Function to use the largest CPU possible to minimize the runtime of the processing."
    ],
    "correct": 2,
    "explanation": "Bucket uploads for third parties, a Cloud Function triggered on object finalize to scale a MIG, and self-terminating workers — fast, cheap, secure.",
    "discussion": [
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: C. I would go with C , using GCS is cost effective and secure compared to other options. D. Cloud function with large CPU results in high cost. (3 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: C. The recommended solution is (option C) Provide a Cloud Storage bucket for third parties to upload batches of data, and utilize a Cloud Function with a google.storage.object.finalize trigger to scale up a Compute Engine autoscaling managed instance group. This approach ensures secure data uploads to a Cloud Storage bucket with proper IAM access controls. The Cloud Function, triggered upon new object finalization in the bucket, scales up a managed instance group with pre-loaded data processing software, optimizing for compute-heavy tasks. The instances terminate upon... (2 votes)"
      },
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: C. I would say C. GCS is not that expensive and you can set rules to archive old data. GCE is optimal for compute heavy batch jobs compared to cloud functions. (2 votes)"
      },
      {
        "user": "mouthwash",
        "text": "D is best. C says writing code and all that could take time. Speed is key with using as much instant cloud services as possible. (1 vote)"
      },
      {
        "user": "6a8c7ad",
        "text": "Selected Answer: D. D over C (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 125,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Secure uploads + event-driven autoscaling compute for batch jobs.",
    "correctRationale": "IAM-scoped Cloud Storage gives third parties secure uploads; a Cloud Function on google.storage.object.finalize scales an autoscaling MIG up the moment a batch lands; pre-imaged workers terminate when done, so you pay only for work. SFTP adds a server to run, GKE services run continuously, and triggering a max-CPU function for compute-heavy processing is slower and pricier than scaling out.",
    "optionRationales": [
      "Wrong: An SFTP server on a VM is infrastructure to maintain and is less secure than IAM-controlled bucket uploads.",
      "Wrong: Two always-on GKE services (one polling Storage) run idle between batches — cost without benefit.",
      "Correct: Bucket + IAM for secure upload, finalize-triggered function to scale the MIG, self-terminating workers — minimal cost, fast processing.",
      "Wrong: A single Cloud Function cannot scale out compute-heavy work the way a MIG of purpose-built workers can, and 'largest CPU' ≠ fastest end-to-end."
    ]
  },
  {
    "id": 124,
    "topic": "Org & IAM",
    "difficulty": 1,
    "question": "Your company's security team needs to have read-only access to Data Access audit logs in the _Required bucket. You want to provide your security team with the necessary permissions following the principle of least privilege and Google-recommended practices. What should you do?",
    "options": [
      "A. Assign the roles/logging.viewer role to each member of the security team.",
      "B. Assign the roles/logging.viewer role to a group with all the security team members.",
      "C. Assign the roles/logging.privateLogViewer role to each member of the security team.",
      "D. Assign the roles/logging.privateLogViewer role to a group with all the security team members."
    ],
    "correct": 3,
    "explanation": "roles/logging.privateLogViewer on a group is the least-privilege way to expose Data Access (private) audit logs to the security team.",
    "discussion": [
      {
        "user": "activist",
        "text": "https://cloud.google.com/iam/docs/job-functions/auditing The logging.privateLogViewer role gives the ability to view the Data Access logs. { \"role\": \"roles/logging.privateLogViewer\", \"members\": [ \"group:security-team@example.com\" ] Answer D seems correct. (3 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: D. https://cloud.google.com/iam/docs/job-functions/auditing#:~:text=Admin%20Activity%20logs.-,logging.privateLogViewer,privateLogViewer%20role%20gives%20the%20ability%20to%20view%20the%20Data%20Access%20logs.,-Once%20log%20entries (2 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. The recommended solution is (option D) Assign the roles/logging.privateLogViewer role to a group with all the security team members. This approach follows the principle of least privilege by granting the specific role needed for read-only access to Data Access audit logs. The roles/logging.privateLogViewer role is more restrictive than roles/logging.viewer, providing access only to private logs, such as Data Access audit logs, and aligns with Google-recommended practices for securing sensitive data. By assigning this role to a group with all security team members, you can... (2 votes)"
      },
      {
        "user": "ogerber",
        "text": "the question is wrong, the _Required log bucket is exclusively for Admin Activity logs and is not configurable for other types of logs. so B would be good, there is no good answer here. (1 vote)"
      },
      {
        "user": "LaxmanTiwari",
        "text": "Selected Answer: D. The right one (1 vote)"
      },
      {
        "user": "pharao89",
        "text": "Selected Answer: D. D, no brainer, give access to private logs (so also access logs) to the team. Option C is partially correct, you should rather give access to a group than to individual members just to be future-proof. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 124,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Least-privilege access to Data Access audit logs via a group.",
    "correctRationale": "Data Access audit logs live in the _Required bucket and need roles/logging.privateLogViewer — Logs Viewer cannot see them. Granting to a Google Group is the recommended practice (membership changes instead of IAM edits). Per-user grants are harder to manage, and logging.viewer lacks Data Access.",
    "optionRationales": [
      "Wrong: roles/logging.viewer cannot read Data Access audit logs (the _Required bucket content).",
      "Wrong: Same insufficient role — and per-user grants are worse practice than a group binding.",
      "Wrong: Right role, wrong principal — grant to a group, not individual users.",
      "Correct: privateLogViewer on a group is least-privilege for Data Access logs and easiest to manage."
    ]
  },
  {
    "id": 123,
    "topic": "Monitoring & Alerting",
    "difficulty": 2,
    "question": "You are currently planning how to display Cloud Monitoring metrics for your organization's Google Cloud projects. Your organization has three folders and six projects, as shown in the image. You want to configure Cloud Monitoring dashboards to only display metrics from the projects within one folder. You need to ensure that the dashboards do not display metrics from projects in the other folders. You want to follow Google-recommended practices. What should you do?",
    "options": [
      "A. Create a single new scoping project.",
      "B. Create new scoping projects for each folder.",
      "C. Use the current app-one-prod project as the scoping project.",
      "D. Use the current app-one-dev, app-one-staging, and app-one-prod projects as the scoping project for each folder."
    ],
    "correct": 1,
    "explanation": "One scoping project per folder scopes each metrics scope to that folder's projects — per-folder dashboards with no bleed-through.",
    "discussion": [
      {
        "user": "florian_cartron",
        "text": "Selected Answer: B. Best practice is to use a new or empty project for scoping, so B rather than D: https://cloud.google.com/monitoring/settings#create-multi (8 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "B and D seems good answer , i would porbably go with B if the choice make me a millionaire. (3 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: B. The recommended solution is (option B) Create new scoping projects for each folder. Google Cloud Monitoring dashboards allow you to scope metrics based on projects, and by creating separate scoping projects for each folder, you can effectively isolate and display metrics only from the projects within that specific folder. This approach aligns with Google-recommended practices by providing a structured and organized way to manage and visualize metrics. Using dedicated scoping projects for each folder ensures a clean separation of monitoring data, allowing you to customize... (2 votes)"
      },
      {
        "user": "dija123",
        "text": "Selected Answer: B. Agree With B (1 vote)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: B. https://cloud.google.com/monitoring/settings#create-multi (1 vote)"
      },
      {
        "user": "TereRolon",
        "text": "I thing is A \"Example of scoping projects and monitored projects Assume that your Staging and Production projects contain Compute Engine virtual machine (VM) instances. To view the metrics for all of your VMs in a single view, you create another project, AllEnvironments, and then add the Staging and Production projects as monitored projects.\" https://cloud.google.com/monitoring/settings#create-multi (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 123,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Per-folder metrics visibility with dedicated scoping projects.",
    "correctRationale": "A metrics scope shows metrics from the projects attached to its scoping project. To have dashboards show only a folder's projects, create one scoping project per folder and attach just that folder's projects to it. A single scope mixes all folders, and reusing app projects as scopers couples monitoring to workload projects.",
    "optionRationales": [
      "Wrong: A single scoping project would see all folders' metrics together.",
      "Correct: A dedicated scoping project per folder limits each metrics scope to exactly that folder's projects.",
      "Wrong: Using an app project as scoper mixes monitoring config into a workload project and does not scale per folder.",
      "Wrong: Using one project per environment row does not isolate by folder and reuses workload projects."
    ],
    "images": [
      {
        "url": "/question-images/gcp-pcdoe/q123-folders-projects.png",
        "alt": "Resource hierarchy: folder Development contains projects app-one-dev and app-two-dev; folder Staging contains app-one-staging and app-two-staging; folder Production contains app-one-prod and app-two-prod."
      }
    ]
  },
  {
    "id": 122,
    "topic": "Supply Chain Security",
    "difficulty": 1,
    "question": "You are building an application that runs on Cloud Run. The application needs to access a third-party API by using an API key. You need to determine a secure way to store and use the API key in your application by following Google-recommended practices. What should you do?",
    "options": [
      "A. Save the API key in Secret Manager as a secret. Reference the secret as an environment variable in the Cloud Run application.",
      "B. Save the API key in Secret Manager as a secret key. Mount the secret key under the /sys/api_key directory, and decrypt the key in the Cloud Run application.",
      "C. Save the API key in Cloud Key Management Service (Cloud KMS) as a key. Reference the key as an environment variable in the Cloud Run application.",
      "D. Encrypt the API key by using Cloud Key Management Service (Cloud KMS), and pass the key to Cloud Run as an environment variable. Decrypt and use the key in Cloud Run."
    ],
    "correct": 0,
    "explanation": "Secret Manager + env-var reference is the documented way to give Cloud Run an API key without baking it into code or images.",
    "discussion": [
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. The recommended solution is (option A) Save the API key in Secret Manager as a secret and reference the secret as an environment variable in the Cloud Run application. This approach aligns with Google-recommended practices for securely managing sensitive information. Secret Manager provides a centralized and secure storage for secrets, allowing you to store and retrieve the API key. Referencing the secret as an environment variable in the Cloud Run application ensures that the key remains confidential and is easily accessible without exposing it directly in the code. It... (3 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: A. A is answer. B is wrong because: Cloud Run does not allow you to mount secrets at /dev, /proc and /sys, or on their subdirectories. (3 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: A. It should be A (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: A. https://cloud.google.com/run/docs/configuring/services/secrets#access-secrets:~:text=Pass%20a%20secret%20using%20environment%20variables.%20Environment%20variables%20are%20resolved%20at%20instance%20startup%20time%2C%20so%20if%20you%20use%20this%20method%2C%20Google%20recommends%20that%20you%20pin%20the%20secret%20to%20a%20particular%20version%20rather%20than%20using%20latest. (1 vote)"
      },
      {
        "user": "nhiguchi",
        "text": "Selected Answer: A. Answer should be A (1 vote)"
      },
      {
        "user": "PrayasMohanty",
        "text": "A is the right answer as per my openion (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 122,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Supplying a secret to Cloud Run via Secret Manager.",
    "correctRationale": "The API key is a secret, so Secret Manager is the right store — Cloud Run can mount it as a volume or inject it as an environment variable, and the platform handles decryption. KMS keys encrypt data but do not store/serve the secret as a retrievable value, and encrypt-then-pass makes you manage decryption in the app.",
    "optionRationales": [
      "Correct: Secret Manager stores the key securely and Cloud Run injects it as an env var — the recommended pattern.",
      "Wrong: Secret Manager handles decryption for you; there is no key to mount and decrypt manually.",
      "Wrong: Cloud KMS holds cryptographic keys, not retrievable secret values like an API key.",
      "Wrong: Passing encrypted material and decrypting it in the app adds code and key-management burden Secret Manager removes."
    ]
  },
  {
    "id": 121,
    "topic": "Monitoring & Alerting",
    "difficulty": 2,
    "question": "You want to share a Cloud Monitoring custom dashboard with a partner team. What should you do?",
    "options": [
      "A. Provide the partner team with the dashboard URL to enable the partner team to create a copy of the dashboard.",
      "B. Export the metrics to BigQuery. Use Looker Studio to create a dashboard, and share the dashboard with the partner team.",
      "C. Copy the Monitoring Query Language (MQL) query from the dashboard, and send the ML query to the partner team.",
      "D. Download the JSON definition of the dashboard, and send the JSON file to the partner team."
    ],
    "correct": 3,
    "explanation": "Dashboard URL sharing works inside your own org/project; for a partner team you export the dashboard's JSON definition and they import it into their project.",
    "discussion": [
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. The recommended solution is (Option A). Provide the partner team with the dashboard URL to enable them to create a copy of the dashboard. By sharing the dashboard URL, the partner team can access and duplicate the specific Cloud Monitoring custom dashboard easily. This method allows for a straightforward and efficient way to share the dashboard configuration without the need for additional manual steps or exporting/importing files. It ensures a seamless transfer of the custom dashboard to the partner team, enabling them to leverage the same monitoring setup for their needs. (3 votes)"
      },
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: A. In A they see your data and with D they their own data but using the same layout as in the dashboard you shared. So maybe A but the scope is not clear in the question... (3 votes)"
      },
      {
        "user": "surfer111",
        "text": "Unclear question, if you are sharing your dashboard with data in it, then you choose (A). However, if you are sharing the structure so they can create their own copy of the dashboard for their data then (D). https://cloud.google.com/monitoring/charts/dashboards#copy-dashboard (2 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: A. Should be A it looks like: https://cloud.google.com/monitoring/charts/share-dashboards#owner-rolesowner \"We recommend that you use Monitoring to send the URL of a dashboard to your recipients when you have that option. Monitoring identifies those recipients who might not have permission to view the dashboard and provides an option for you to grant the required permissions.\" (2 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: D. I will go with D , I have omitted B and C , Option A is fine but atlast it says copy the dashboard, we cant copy the dashboard when shared. (2 votes)"
      },
      {
        "user": "ManishKS",
        "text": "Answer should be D (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 121,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics A (community A 69% / D 31%); changed after a second review. Cloud Monitoring's share-by-URL flow is for people in your own organization who are granted access to your project; to give a partner team the dashboard for their own project, Google documents sharing the dashboard definition: copy or download the JSON and import it there.",
    "conceptSummary": "Sharing a dashboard across orgs: export the JSON definition.",
    "correctRationale": "Cloud Monitoring's share-by-URL flow gives people in your own organization access to your project — it doesn't let a partner team copy the dashboard into their own project. Google's documented path for that is sharing the definition: download the JSON and let the partner import it (D). BigQuery + Looker Studio (B) rebuilds the dashboard elsewhere; MQL alone (C) transfers a query, not the layout.",
    "optionRationales": [
      "Wrong: The dashboard URL grants access to your project's Monitoring — not a copy the partner can use in their project.",
      "Wrong: Rebuilding in Looker Studio from BigQuery exports is a different dashboard, not sharing this one.",
      "Wrong: An MQL query is a fragment, not the dashboard's charts and layout.",
      "Correct: Exporting the dashboard JSON lets the partner team import the full dashboard into their own project."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 120,
    "topic": "Troubleshooting & APM",
    "difficulty": 1,
    "question": "You have an application that runs in Google Kubernetes Engine (GKE). The application consists of several microservices that are deployed to GKE by using Deployments and Services. One of the microservices is experiencing an issue where a Pod returns 403 errors after the Pod has been running for more than five hours. Your development team is working on a solution, but the issue will not be resolved for a month. You need to ensure continued operations until the microservice is fixed. You want to follow Google-recommended practices and use the fewest number of steps. What should you do?",
    "options": [
      "A. Create a cron job to terminate any Pods that have been running for more than five hours.",
      "B. Add a HTTP liveness probe to the microservice's deployment.",
      "C. Monitor the Pods, and terminate any Pods that have been running for more than five hours.",
      "D. Configure an alert to notify you whenever a Pod returns 403 errors."
    ],
    "correct": 1,
    "explanation": "An HTTP liveness probe lets kubelet restart the pod automatically once it starts failing after five hours — zero manual steps.",
    "discussion": [
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: B. Liveness probes are used to monitor the health of containers inside pods. They can identify application instances that have failed, even if the pod appears to be operational, If a liveness probe detects an unhealthy state, Kubernetes kills the container and tries to redeploy it. If the probe succeeds, no action is taken and no events are logged. (8 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: B. The recommended solution is (option B) Add a HTTP liveness probe to the microservice's deployment. By implementing a liveness probe, the Kubernetes system periodically checks the specified endpoint of the microservice to determine its health. If the microservice becomes unresponsive or encounters the 403 errors, Kubernetes will automatically restart the Pod. This approach ensures continuous operations by proactively detecting and addressing issues, minimizing manual intervention. It aligns with Google-recommended practices for handling service health and availability in a... (2 votes)"
      },
      {
        "user": "ManishKS",
        "text": "Answer should be B (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 120,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Self-healing a buggy pod with a liveness probe.",
    "correctRationale": "The pod degrades predictably (403s after ~5 hours), the fix is a month away, and you want continued operation with fewest steps — a liveness probe makes kubelet restart the pod automatically when it fails its check, which resets it to a healthy state. Cron/manual kills and alerting keep a human in the loop.",
    "optionRationales": [
      "Wrong: A cron job is external machinery and less precise than a probe that fires on actual failures.",
      "Correct: A liveness probe restarts the pod automatically when it returns errors — self-healing with no manual steps.",
      "Wrong: Manual monitoring and termination is ongoing toil and slower than automatic restart.",
      "Wrong: An alert notifies a human who still has to act — not continued operations."
    ]
  },
  {
    "id": 119,
    "topic": "Supply Chain Security",
    "difficulty": 1,
    "question": "As part of your company's initiative to shift left on security, the InfoSec team is asking all teams to implement guard rails on all the Google Kubernetes Engine (GKE) clusters to only allow the deployment of trusted and approved images. You need to determine how to satisfy the InfoSec team's goal of shifting left on security. What should you do?",
    "options": [
      "A. Deploy Falco or Twistlock on GKE to monitor for vulnerabilities on your running Pods.",
      "B. Configure Identity and Access Management (IAM) policies to create a least privilege model on your GKE clusters.",
      "C. Use Binary Authorization to attest images during your CI/CD pipeline.",
      "D. Enable Container Analysis in Artifact Registry, and check for common vulnerabilities and exposures (CVEs) in your container images."
    ],
    "correct": 2,
    "explanation": "Binary Authorization attestation in CI/CD is the guard rail that lets only trusted, approved images deploy to the GKE clusters.",
    "discussion": [
      {
        "user": "florian_cartron",
        "text": "it seems that the question doesn't match the answers. (10 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: C. Maybe this is the correct question for them: As part of your company's initiative to shift left on security, the InfoSec team is asking all teams to implement guard rails on all the Google Kubernetes Engine (GKE) clusters to only allow the deployment of trusted and approved images. You need to determine how to satisfy the InfoSec team's goal of shifting left on security. What should you do? And the answer should be option C: Binary Authorization allows you to define and enforce policies that determine which container images can run in your GKE environment based on image... (5 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "It seems like questions doesnt match with the answers given (4 votes)"
      },
      {
        "user": "activist",
        "text": "Question 119 is a duplicate of question 118. (3 votes)"
      },
      {
        "user": "[Removed]",
        "text": "As part of your company's initiative to shift left on security, the InfoSec team is asking all teams to implement guard rails on all the Google Kubernetes Engine (GKE) clusters to only allow the deployment of trusted and approved images. You need to determine how to satisfy the InfoSec team's goal of shifting left on security. What should you do? (2 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Maybe this is the correct question for them: As part of your company's initiative to shift left on security, the InfoSec team is asking all teams to implement guard rails on all the Google Kubernetes Engine (GKE) clusters to only allow the deployment of trusted and approved images. You need to determine how to satisfy the InfoSec team's goal of shifting left on security. What should you do? (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 119,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Data fix: ExamTopics displayed question 118's stem for this item by mistake; the real stem (quoted by commenters) is the InfoSec/GKE trusted-images text used here. Container Analysis is now Artifact Analysis.",
    "conceptSummary": "Shift-left image trust with Binary Authorization attestations.",
    "correctRationale": "InfoSec's ask — only trusted and approved images deploy to GKE — is a deploy-time admission problem, and Binary Authorization enforcing attestations produced during the CI/CD pipeline is the exact mechanism. IAM least privilege does not vet images, CVE scanning finds issues but does not gate deployment, and Falco/Twistlock are runtime monitors, not admission controls. (Note: the source showed question 118's stem by mistake; this uses the real stem.)",
    "optionRationales": [
      "Wrong: Falco/Twistlock monitor running workloads; they do not gate which images are admitted.",
      "Wrong: Least-privilege IAM restricts who can do what but does not verify image trust at deploy time.",
      "Correct: Binary Authorization attestations created in CI/CD enforce that only approved images ever deploy — the shift-left guard rail.",
      "Wrong: Artifact Analysis CVE scanning surfaces vulnerabilities but does not enforce 'trusted and approved' admission."
    ]
  },
  {
    "id": 118,
    "topic": "Logging",
    "difficulty": 1,
    "question": "You are building and running client applications in Cloud Run and Cloud Functions. Your client requires that all logs must be available for one year so that the client can import the logs into their logging service. You must minimize required code changes. What should you do?",
    "options": [
      "A. Update all images in Cloud Run and all functions in Cloud Functions to send logs to both Cloud Logging and the client's logging service. Ensure that all the ports required to send logs are open in the VPC firewall.",
      "B. Create a Pub/Sub topic, subscription, and logging sink. Configure the logging sink to send all logs into the topic. Give your client access to the topic to retrieve the logs.",
      "C. Create a storage bucket and appropriate VPC firewall rules. Update all images in Cloud Run and all functions in Cloud Functions to send logs to a file within the storage bucket.",
      "D. Create a logs bucket and logging sink. Set the retention on the logs bucket to 365 days. Configure the logging sink to send logs to the bucket. Give your client access to the bucket to retrieve the logs."
    ],
    "correct": 3,
    "explanation": "A logs bucket with 365-day retention plus a sink keeps all logs in Cloud Logging; give the client access to read the bucket.",
    "discussion": [
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: D. Right answer (4 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. Choose Option D. Creating a logs bucket and logging sink, is the recommended approach to meet the client's requirement of retaining logs for one year while minimizing code changes. By configuring a logging sink to send logs to a bucket and setting the retention period on the bucket to 365 days, you leverage Google Cloud's managed logging and storage services. This approach abstracts the log storage from your applications running in Cloud Run and Cloud Functions, ensuring that logs are retained for the specified duration without requiring modifications to individual... (3 votes)"
      },
      {
        "user": "florian_cartron",
        "text": "Selected Answer: D. Answer D: sink logs in a bucket is the cleanest and quickest solution. (3 votes)"
      },
      {
        "user": "activist",
        "text": "Answer D is a secure solution. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 118,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "One-year log retention via a dedicated logs bucket and sink.",
    "correctRationale": "Cloud Run and Cloud Functions already write to Cloud Logging — the requirement is retention for one year and client access. A logs bucket with 365-day retention populated by a logging sink keeps everything managed, no code changes, and the client reads from the bucket. Pub/Sub pushes require the client to consume a stream; app-level file writes change code and firewalls.",
    "optionRationales": [
      "Wrong: Rewriting the apps to dual-write logs is exactly the code change the question wants to avoid.",
      "Wrong: A Pub/Sub topic delivers a live stream — the client must run a subscriber continuously, and it is not a one-year store.",
      "Wrong: Apps writing log files to a bucket adds code changes and VPC firewall plumbing.",
      "Correct: A dedicated logs bucket + sink gives managed one-year retention and a simple access point for the client."
    ]
  },
  {
    "id": 117,
    "topic": "Deployment Strategies",
    "difficulty": 1,
    "question": "You are building the CI/CD pipeline for an application deployed to Google Kubernetes Engine (GKE). The application is deployed by using a Kubernetes Deployment, Service, and Ingress. The application team asked you to deploy the application by using the blue/green deployment methodology. You need to implement the rollback actions. What should you do?",
    "options": [
      "A. Run the kubectl rollout undo command.",
      "B. Delete the new container image, and delete the running Pods.",
      "C. Update the Kubernetes Service to point to the previous Kubernetes Deployment.",
      "D. Scale the new Kubernetes Deployment to zero."
    ],
    "correct": 2,
    "explanation": "Blue/green rollback = repoint the Service at the previous Deployment — traffic switches back without touching Pods.",
    "discussion": [
      {
        "user": "florian_cartron",
        "text": "Selected Answer: C. The point of using blue/green deployment is to have both blue & green versions deployed, and we chose the active one at service level, so rollback should only consist of updating the service to serve the other version. (11 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: C. To implement rollback actions in a blue/green deployment methodology for an application deployed on Google Kubernetes Engine (GKE), the recommended approach is (Option C). Updating the Kubernetes Service to point to the previous Kubernetes Deployment effectively rolls back the service to the previous version. This action ensures that traffic is directed to the previous deployment, mitigating any issues introduced by the new version. It is a controlled and Kubernetes-native way to perform rollbacks, allowing for seamless transitions between different versions of the... (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: C. As seen in question 112, we can have blue & green deployments and just need to point the service to the correct deployment for rollback (1 vote)"
      },
      {
        "user": "PrayasMohanty",
        "text": "A appears correct answer (1 vote)"
      },
      {
        "user": "ManishKS",
        "text": "Answer should be A (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 117,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Blue/green rollback is a Service selector flip.",
    "correctRationale": "In blue/green the Service's selector routes traffic to one Deployment or the other, so rollback is updating the Service to point back to the previous Deployment — fast and clean. kubectl rollout undo is for rolling-update Deployments, deleting images/pods destroys capacity, and scaling the new Deployment to zero just removes the new version without restoring traffic explicitly.",
    "optionRationales": [
      "Wrong: rollout undo rewrites the Deployment's pod template — not how a two-Deployment blue/green switch works.",
      "Wrong: Deleting images and pods is destructive and does not restore the Service's pointer to the old version.",
      "Correct: Updating the Service selector back to the previous Deployment instantly restores the old version — the essence of blue/green rollback.",
      "Wrong: Scaling the new Deployment to zero leaves the Service possibly selecting nothing healthy and does not repoint traffic."
    ]
  },
  {
    "id": 116,
    "topic": "Logging",
    "difficulty": 1,
    "question": "Your company operates in a highly regulated domain that requires you to store all organization logs for seven years. You want to minimize logging infrastructure complexity by using managed services. You need to avoid any future loss of log capture or stored logs due to misconfiguration or human error. What should you do?",
    "options": [
      "A. Use Cloud Logging to configure an aggregated sink at the organization level to export all logs into a BigQuery dataset.",
      "B. Use Cloud Logging to configure an aggregated sink at the organization level to export all logs into Cloud Storage with a seven-year retention policy and Bucket Lock.",
      "C. Use Cloud Logging to configure an export sink at each project level to export all logs into a BigQuery dataset",
      "D. Use Cloud Logging to configure an export sink at each project level to export all logs into Cloud Storage with a seven-year retention policy and Bucket Lock."
    ],
    "correct": 1,
    "explanation": "An org-level aggregated sink to a Bucket-Locked Cloud Storage bucket with a 7-year retention policy guarantees immutable retention with managed simplicity.",
    "discussion": [
      {
        "user": "xhilmi",
        "text": "Selected Answer: B. To ensure long-term retention of logs and minimize complexity while complying with regulatory requirements, the recommended approach is (Option B). By using Cloud Logging to configure an aggregated sink at the organization level to export all logs into Cloud Storage with a seven-year retention policy and Bucket Lock, you establish a centralized and secure storage solution. This setup leverages Cloud Storage's features, such as retention policies and Bucket Lock, to prevent accidental or intentional deletion of logs, reducing the risk of data loss due to misconfiguration or... (5 votes)"
      },
      {
        "user": "mshafa",
        "text": "B should be Answer. (4 votes)"
      },
      {
        "user": "nhiguchi",
        "text": "Selected Answer: B. Answer should be B (4 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: B. Whole company: so organization level aggregated export For 7 years: minimize cost, so cloud storage Bucket lock will prevent delete for the duration of retention policy (1 vote)"
      },
      {
        "user": "PrayasMohanty",
        "text": "You need to store all organization logs for seven years for which B appears more appropiate (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 116,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Tamper-proof 7-year log archive via org sink + Bucket Lock.",
    "correctRationale": "Minimizing complexity means one aggregated sink at the organization level (covers everything, no per-project maintenance), and avoiding loss means a Cloud Storage bucket with a retention policy locked by Bucket Lock — nobody can shorten retention or delete the objects early. BigQuery is queryable but pricier and lacks the same immutability guarantee; per-project sinks multiply the config and the failure surface.",
    "optionRationales": [
      "Wrong: BigQuery stores logs but does not provide the same locked, tamper-evident retention guarantee, and costs more for pure archiving.",
      "Correct: One org-level aggregated sink to a retention-locked bucket is the simplest managed setup that cannot be misconfigured away.",
      "Wrong: Per-project sinks to BigQuery multiply the number of sinks to maintain and still lack Bucket-Lock immutability.",
      "Wrong: Project-level sinks recreate the config for every project — exactly the human-error surface to avoid."
    ]
  },
  {
    "id": 115,
    "topic": "Infrastructure as Code",
    "difficulty": 2,
    "question": "You use Terraform to manage an application deployed to a Google Cloud environment. The application runs on instances deployed by a managed instance group. The Terraform code is deployed by using a CI/CD pipeline. When you change the machine type on the instance template used by the managed instance group, the pipeline fails at the terraform apply stage with the following error message, as shown in the image. You need to update the instance template and minimize disruption to the application and the number of pipeline runs. What should you do?",
    "options": [
      "A. Delete the managed instance group, and recreate it after updating the instance template.",
      "B. Add a new instance template, update the managed instance group to use the new instance template, and delete the old instance template.",
      "C. Remove the managed instance group from the Terraform state file, update the instance template, and reimport the managed instance group.",
      "D. Set the create_before_destroy meta-argument to true in the lifecycle block on the instance template."
    ],
    "correct": 3,
    "explanation": "create_before_destroy makes Terraform build the new instance template before deleting the one the MIG still uses — avoiding the 'in use' apply failure.",
    "discussion": [
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: D. D is the best option (3 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: D. https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle#create_before_destroy https://cloud.google.com/build/docs/deploying-builds/deploy-compute-engine#:~:text=Note%20that%20this,version%20is%20destroyed (2 votes)"
      },
      {
        "user": "nhiguchi",
        "text": "Selected Answer: D. Answer should be D (2 votes)"
      },
      {
        "user": "ReachTango73",
        "text": "D. Check to docs (2 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. To update the instance template and minimize disruption to the application while resolving the error during the Terraform apply stage, the recommended approach is to use (Option D). By setting the create_before_destroy meta-argument to true in the lifecycle block on the instance template, Terraform will create a new instance template before destroying the old one. This ensures a smooth transition by allowing the managed instance group to gradually replace instances with the new template without causing downtime. This method optimizes the update process, reducing disruption... (1 vote)"
      },
      {
        "user": "ManishKS",
        "text": "B is correct Answer (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 115,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Terraform lifecycle fix for in-use instance templates.",
    "correctRationale": "Instance templates are immutable and a MIG holds a reference, so Terraform's default destroy-then-create fails with 'already being used by ... instanceGroupManagers'. Setting lifecycle { create_before_destroy = true } builds the replacement template first, updates the MIG, then deletes the old one — minimal disruption, one pipeline run. Deleting the MIG or state surgery are heavier and disruptive.",
    "optionRationales": [
      "Wrong: Deleting the MIG kills the running application — maximum disruption.",
      "Wrong: Manually juggling a second template works but adds steps and state complexity versus the lifecycle flag.",
      "Wrong: Removing and reimporting the MIG is state surgery — error-prone and unnecessary.",
      "Correct: create_before_destroy creates the new template before the old is removed, so the apply succeeds without disrupting the MIG."
    ],
    "images": [
      {
        "url": "/question-images/gcp-pcdoe/q115-instance-template-error.png",
        "alt": "Terraform error: 'Error waiting for Deleting Instance Template: The instance_template resource ... is already being used by projects/my-project/regions/us-central1/instanceGroupManagers/my-mig'."
      }
    ]
  },
  {
    "id": 114,
    "topic": "Supply Chain Security",
    "difficulty": 1,
    "question": "Your organization is using Helm to package containerized applications. Your applications reference both public and private charts. Your security team flagged that using a public Helm repository as a dependency is a risk. You want to manage all charts uniformly, with native access control and VPC Service Controls. What should you do?",
    "options": [
      "A. Store public and private charts in OCI format by using Artifact Registry.",
      "B. Store public and private charts by using GitHub Enterprise with Google Workspace as the identity provider.",
      "C. Store public and private charts by using Git repository. Configure Cloud Build to synchronize contents of the repository into a Cloud Storage bucket. Connect Helm to the bucket by using https://[bucket].storage-googleapis.com/[helmchart] as the Helm repository.",
      "D. Configure a Helm chart repository server to run in Google Kubernetes Engine (GKE) with Cloud Storage bucket as the storage backend."
    ],
    "correct": 0,
    "explanation": "Artifact Registry stores OCI Helm charts alongside containers with IAM and VPC Service Controls natively.",
    "discussion": [
      {
        "user": "nhiguchi",
        "text": "Selected Answer: A. Answer should be A https://cloud.google.com/artifact-registry/docs/helm (6 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. To address security concerns and maintain consistent access controls for Helm charts, it's recommended to store both public and private charts in the Open Container Initiative (OCI) format using Google Cloud's Artifact Registry, as suggested in (Option A). Artifact Registry provides a centralized, secure repository for Helm charts with native access control features and integration capabilities with VPC Service Controls. Storing charts in OCI format ensures a standardized approach to packaging, and Artifact Registry offers a robust solution for organizing and securing... (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 114,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Unified Helm chart storage with Artifact Registry OCI repos.",
    "correctRationale": "Modern Helm charts are OCI artifacts, and Artifact Registry hosts them with the same IAM access control and VPC Service Controls perimeter as container images — one managed store for public and private charts. GitHub Enterprise or self-hosted repo servers add infrastructure without VPC-SC-native controls.",
    "optionRationales": [
      "Correct: OCI-format charts in Artifact Registry get native IAM and VPC Service Controls with zero servers to run.",
      "Wrong: GitHub Enterprise storage lacks the native GCP access controls and service-perimeter integration required.",
      "Wrong: A Git repo plus Cloud Build sync to a bucket is a DIY pipeline with weaker access control than Artifact Registry.",
      "Wrong: Self-hosting a Helm repo server on GKE is infrastructure to run and is not the managed, controlled path."
    ]
  },
  {
    "id": 113,
    "topic": "Monitoring & Alerting",
    "difficulty": 2,
    "question": "You are running a web application deployed to a Compute Engine managed instance group. Ops Agent is installed on all instances. You recently noticed suspicious activity from a specific IP address. You need to configure Cloud Monitoring to view the number of requests from that specific IP address with minimal operational overhead. What should you do?",
    "options": [
      "A. Configure the Ops Agent with a logging receiver. Create a logs-based metric.",
      "B. Create a script to scrape the web server log. Export the IP address request metrics to the Cloud Monitoring API.",
      "C. Update the application to export the IP address request metrics to the Cloud Monitoring API.",
      "D. Configure the Ops Agent with a metrics receiver."
    ],
    "correct": 0,
    "explanation": "The Ops Agent's logging receiver plus a logs-based metric counting that IP's requests is the low-overhead Cloud Monitoring path.",
    "discussion": [
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. To efficiently monitor the number of requests from a specific IP address in a web application deployed to a Compute Engine managed instance group with Ops Agent installed, the recommended approach is to configure the Ops Agent with a logging receiver and create a logs-based metric, as outlined in (Option A). By configuring the Ops Agent with a logging receiver, it can collect and forward relevant log data to Cloud Monitoring. Subsequently, creating a logs-based metric allows you to define a metric based on the extracted information from the logs, specifically focusing on... (8 votes)"
      },
      {
        "user": "LaxmanTiwari",
        "text": "Selected Answer: A. https://cloud.google.com/monitoring/agent/ops-agent/configuration#logging-receivers fluent_forward section (3 votes)"
      },
      {
        "user": "pharao89",
        "text": "Selected Answer: A. As the question asks \"to view the number of requests,\" I would go with A since there is a crucial thing: \"Create a logs-based metric\". (3 votes)"
      },
      {
        "user": "Raz0r",
        "text": "Selected Answer: A. Exactly what user xhilmi said. (2 votes)"
      },
      {
        "user": "YushiSato",
        "text": "Selected Answer: A. メトリクスレシーバーでは、hostmetricsしか選択することができない。これにはIPアドレスはふくまれていない。よってDは候補から外れる。私はAを選択する。 https://cloud.google.com/monitoring/agent/ops-agent/configuration (2 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: D. Option D looks good for me (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 113,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Data fix: the source merged options A and B into one choice; they were split back into separate A and B options.",
    "conceptSummary": "IP-specific request counts from logs via Ops Agent + logs-based metric.",
    "correctRationale": "Ops Agent is already installed — configuring a logging receiver to read the web server log and creating a logs-based metric on the IP's entries turns them into a Monitoring metric with almost no code. A scrape script or app changes are more work, and a metrics receiver reads numeric telemetry, not the log lines containing IPs. (Note: the source merged A and B; options were split per the adjudication.)",
    "optionRationales": [
      "Correct: Logging receiver + logs-based metric counts requests from that IP using what is already deployed.",
      "Wrong: A custom scrape script is more code and upkeep than the agent's built-in receiver.",
      "Wrong: Updating the app to emit metrics is a code change where a logs-based metric needs none.",
      "Wrong: A metrics receiver collects numeric telemetry, not the IP strings inside the web server log."
    ]
  },
  {
    "id": 112,
    "topic": "Deployment Strategies",
    "difficulty": 2,
    "question": "You manage an application that runs in Google Kubernetes Engine (GKE) and uses the blue/green deployment methodology. Extracts of the Kubernetes manifests are shown below, as shown in the image. The Deployment app-green was updated to use the new version of the application. During post-deployment monitoring, you notice that the majority of user requests are failing. You did not observe this behavior in the testing environment. You need to mitigate the incident impact on users and enable the developers to troubleshoot the issue. What should you do?",
    "options": [
      "A. Update the Deployment app-blue to use the new version of the application.",
      "B. Update the Deployment app-green to use the previous version of the application.",
      "C. Change the selector on the Service app-svc to app: my-app.",
      "D. Change the selector on the Service app-svc to app: my-app, version: blue."
    ],
    "correct": 3,
    "explanation": "Repoint the Service selector to the blue deployment — instant rollback to the known-good version while green is debugged.",
    "discussion": [
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. To mitigate the impact of the incident on users and facilitate troubleshooting, the recommended action is to change the selector on the Service app-svc to app: my-app, version: blue, as stated in (Option D). This adjustment allows the Service to route traffic specifically to the previous version of the application (app-blue). By changing the selector to include the version label, you effectively roll back the traffic to the working version, providing a quick and effective solution to address the user request failures observed after the update to app-green. This enables... (4 votes)"
      },
      {
        "user": "pharao89",
        "text": "Selected Answer: D. It's a simplified question from CKAD exam. Answer D is the correct one since you need to point the service at the blue deployment and leave the green deployment for future analysis for developers. (4 votes)"
      },
      {
        "user": "ABZ10",
        "text": "Selected Answer: D. Option D https://blog.devgenius.io/blue-green-deployment-with-kubernetes-b7595b17fe17 (3 votes)"
      },
      {
        "user": "koo_kai",
        "text": "Selected Answer: D. I would go with D (3 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: B. I would go with B , If users are facing issues , it would be right to back to the previous version which is working fine. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 112,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Blue/green rollback via the Service selector.",
    "correctRationale": "In this manifest the Service selects app: my-app, version: green, so traffic flows to the newly updated app-green. Repointing the selector to version: blue sends all traffic back to the still-running previous version — immediate mitigation while developers keep the broken green for troubleshooting. Editing deployments is slower, and dropping the version selector would round-robin across both good and bad pods.",
    "optionRationales": [
      "Wrong: Updating blue to the new version spreads the broken code to the last healthy deployment.",
      "Wrong: Reverting the green Deployment destroys the running bad version developers need for troubleshooting.",
      "Wrong: Removing the version selector sends traffic to both blue and green pods — users still hit the broken version.",
      "Correct: Switching the Service selector back to version: blue restores the known-good version instantly and leaves green running for debugging."
    ],
    "images": [
      {
        "url": "/question-images/gcp-pcdoe/q112-blue-green-manifests.png",
        "alt": "Kubernetes manifests: Deployments app-green (selector app: my-app, version: green) and app-blue (version: blue); Service app-svc selecting app: my-app, version: green; Ingress with defaultBackend app-svc."
      }
    ]
  },
  {
    "id": 111,
    "topic": "Troubleshooting & APM",
    "difficulty": 2,
    "question": "You are configuring connectivity across Google Kubernetes Engine (GKE) clusters in different VPCs. You notice that the nodes in Cluster A are unable to access the nodes in Cluster B. You suspect that the workload access issue is due to the network configuration. You need to troubleshoot the issue but do not have execute access to workloads and nodes. You want to identify the layer at which the network connectivity is broken. What should you do?",
    "options": [
      "A. Install a toolbox container on the node in Cluster Confirm that the routes to Cluster B are configured appropriately.",
      "B. Use Network Connectivity Center to perform a Connectivity Test from Cluster A to Cluster B.",
      "C. Use a debug container to run the traceroute command from Cluster A to Cluster B and from Cluster B to Cluster A. Identify the common failure point.",
      "D. Enable VPC Flow Logs in both VPCs, and monitor packet drops."
    ],
    "correct": 1,
    "explanation": "Connectivity Tests (in Network Intelligence Center, despite the option's wrong product name) diagnose the broken layer without node access.",
    "discussion": [
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: B. I will got with B just to identify what happend in the network level (9 votes)"
      },
      {
        "user": "YushiSato",
        "text": "Selected Answer: B. I suspect that there is a mistake in the issue and that the Network Intelligence Center is correct, not the Network Connectivity Center. https://cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/overview (7 votes)"
      },
      {
        "user": "ReachTango73",
        "text": "B as the Q says but do not have execute access to workloads and nodes… so can't run toolbox (4 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: B. To identify and troubleshoot the network connectivity issue between Google Kubernetes Engine (GKE) clusters in different VPCs where nodes in Cluster A cannot access nodes in Cluster B, the recommended action is to use Network Connectivity Center, as stated in (Option B). By performing a Connectivity Test from Cluster A to Cluster B using Network Connectivity Center, you can assess the network path and identify potential issues affecting the connectivity. This diagnostic tool helps pinpoint where the connectivity breaks down, enabling you to analyze the network... (2 votes)"
      },
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: B. Network Connectivity Center is not the greatest tool but in this case we don't really have any options with the restrictions in the question so B (2 votes)"
      },
      {
        "user": "PrayasMohanty",
        "text": "Selected Answer: A. Vote for A Reference: https://cloud.google.com/container-optimized-os/docs/how-to/toolbox (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 111,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Connectivity Tests actually live in Network Intelligence Center, not Network Connectivity Center — the option's product name is wrong, but it is still the only choice that works without workload/node access.",
    "conceptSummary": "Diagnosing cross-VPC connectivity without host access.",
    "correctRationale": "Without exec access to workloads or nodes you cannot run traceroute or install debug containers. Connectivity Tests simulate the path through VPC config (routes, firewall, peering) and pinpoint the layer at which traffic is blocked — the only tool here that works hands-off. Note the option says Network Connectivity Center; the feature actually lives in Network Intelligence Center.",
    "optionRationales": [
      "Wrong: Installing a toolbox container requires exec/node access you do not have.",
      "Correct: A Connectivity Test analyzes the VPC path A→B without touching workloads or nodes.",
      "Wrong: Debug containers and traceroute need pod/node access, which is unavailable.",
      "Wrong: VPC Flow Logs show dropped flows after the fact but do not identify which config layer is broken."
    ]
  },
  {
    "id": 110,
    "topic": "Deployment Strategies",
    "difficulty": 1,
    "question": "Your company is using HTTPS requests to trigger a public Cloud Run-hosted service accessible at the https://booking-engine-abcdef.a.run.app URL. You need to give developers the ability to test the latest revisions of the service before the service is exposed to customers. What should you do?",
    "options": [
      "A. Run the gcloud run deploy booking-engine --no-traffic --tag dev command. Use the https://dev--booking-engine-abcdef.a.run.app URL for testing.",
      "B. Run the gcloud run services update-traffic booking-engine --to-revisions LATEST=1 command. Use the https://booking-engine-abcdef.a.run.app URL for testing.",
      "C. Pass the curl –H \"Authorization:Bearer $(gcloud auth print-identity-token)\" auth token. Use the https://booking-engine-abcdef.a.run.app URL to test privately.",
      "D. Grant the roles/run.invoker role to the developers testing the booking-engine service. Use the https://booking-engine-abcdef.private.run.app URL for testing."
    ],
    "correct": 0,
    "explanation": "Deploy the revision with --no-traffic and a dev tag, then use the tag's URL for private pre-release testing.",
    "discussion": [
      {
        "user": "florian_cartron",
        "text": "Selected Answer: A. A, as it is possible to accept a tagged revision as explained here: https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration#deploy-with-tags (7 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. To enable developers to test the latest revisions of a Cloud Run-hosted service before exposing it to customers, the recommended approach is to use the --no-traffic flag during deployment, as outlined in (Option A). By running the command gcloud run deploy booking-engine --no-traffic --tag dev, you deploy the service with no traffic routed to it initially. Subsequently, developers can test the latest revisions using the URL https://dev--booking-engine-abcdef.a.run.app. This allows for a controlled and private testing environment where developers can validate the service's... (4 votes)"
      },
      {
        "user": "PrayasMohanty",
        "text": "Selected Answer: A. It create a new deployment(revision) with no traffic to https://booking-engine-abcdef.a.run.app but the revision can be tested by developer at https://dev--booking-engine-abcdef.a.run.app as dev tag is associated with the deploymnet. Reference: https://cloud.google.com/sdk/gcloud/reference/run/deploy (4 votes)"
      },
      {
        "user": "mshafa",
        "text": "Answer is A. With option B: 100% of traffic will be route to the latest revision. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 110,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Testing a Cloud Run revision via its tag URL.",
    "correctRationale": "A tagged Cloud Run revision deployed with --no-traffic gets a stable preview URL (https://dev--booking-engine-...run.app) that serves no production traffic — developers test it freely before exposing customers. --to-revisions shifts real traffic, the auth-token option tests the live service, and .private.run.app is not a real URL scheme.",
    "optionRationales": [
      "Correct: The tag + --no-traffic pattern gives an isolated preview URL for testing the latest revision.",
      "Wrong: Pushing traffic to LATEST sends 1% of real users to the untested revision — the opposite of pre-release testing.",
      "Wrong: Auth tokens make the service privately callable but still hit the production-serving revision.",
      "Wrong: .private.run.app is not a valid Cloud Run URL pattern, and IAM gating alone does not isolate revisions."
    ]
  },
  {
    "id": 109,
    "topic": "Performance & Cost",
    "difficulty": 1,
    "question": "You built a serverless application by using Cloud Run and deployed the application to your production environment. You want to identify the resource utilization of the application for cost optimization. What should you do?",
    "options": [
      "A. Use Cloud Trace with distributed tracing to monitor the resource utilization of the application.",
      "B. Use Cloud Profiler with Ops Agent to monitor the CPU and memory utilization of the application.",
      "C. Use Cloud Monitoring to monitor the container CPU and memory utilization of the application.",
      "D. Use Cloud Ops to create logs-based metrics to monitor the resource utilization of the application."
    ],
    "correct": 2,
    "explanation": "Cloud Monitoring already records Cloud Run container CPU/memory utilization — query those built-in metrics for the cost analysis.",
    "discussion": [
      {
        "user": "YushiSato",
        "text": "Selected Answer: C. Cloud Run integrates automatically with Cloud Monitoring and requires no setup or configuration. https://cloud.google.com/run/docs/monitoring?hl=ja (7 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: C. Suits best for the question. (5 votes)"
      },
      {
        "user": "devops_man",
        "text": "As per documentation cloud profiler not supported for cloud run environment https://cloud.google.com/profiler/docs/about-profiler will go with C (5 votes)"
      },
      {
        "user": "khoukha",
        "text": "Selected Answer: B. Cloud Profiler provides continuous profiling of resource consumption in your production applications, helping you identify and eliminate potential performance issues. https://cloud.google.com/products/operations#all-features section:Performance and cost management (5 votes)"
      },
      {
        "user": "nhiguchi",
        "text": "Selected Answer: C. Answer should be C. (4 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: C. For identifying the resource utilization of a serverless application deployed on Cloud Run for cost optimization, the recommended approach is to use Cloud Monitoring, as indicated by (Option C). Cloud Monitoring provides comprehensive monitoring capabilities, allowing you to track container CPU and memory utilization effectively. Specifically tailored for containerized environments like Cloud Run, Cloud Monitoring provides insights into key metrics, enabling you to analyze resource consumption, identify potential bottlenecks, and optimize costs based on observed... (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 109,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Reading Cloud Run utilization from built-in Cloud Monitoring metrics.",
    "correctRationale": "Cloud Run emits container CPU and memory utilization metrics to Cloud Monitoring automatically — reading them is the no-work path to the resource-utilization view for cost optimization. Trace is for request latency, Profiler is for in-process CPU profiles, and logs-based metrics measure log content, not utilization.",
    "optionRationales": [
      "Wrong: Cloud Trace measures request latency spans, not resource utilization.",
      "Wrong: Profiler shows CPU/memory in code profiles; Ops Agent is for VMs, not Cloud Run.",
      "Correct: Cloud Run's built-in CPU and memory utilization metrics in Cloud Monitoring are the direct answer.",
      "Wrong: Logs-based metrics count log entries; they cannot measure resource utilization."
    ]
  },
  {
    "id": 108,
    "topic": "CI/CD Pipelines",
    "difficulty": 2,
    "question": "You are creating a CI/CD pipeline in Cloud Build to build an application container image. The application code is stored in GitHub. Your company requires that production image builds are only run against the main branch and that the change control team approves all pushes to the main branch. You want the image build to be as automated as possible. What should you do? (Choose two.)",
    "options": [
      "A. Create a trigger on the Cloud Build job. Set the repository event setting to 'Pull request'.",
      "B. Add the OWNERS file to the Included files filter on the trigger.",
      "C. Create a trigger on the Cloud Build job. Set the repository event setting to 'Push to a branch'",
      "D. Configure a branch protection rule for the main branch on the repository.",
      "E. Enable the Approval option on the trigger."
    ],
    "correct": [
      2,
      3
    ],
    "explanation": "A 'push to a branch' trigger fires on merges to main, and a branch protection rule enforces the change-control approval requirement.",
    "discussion": [
      {
        "user": "ManishKS",
        "text": "CD is the correct answer ,This will ensure that the image build is only triggered when a push is made to the main branch, and that the push is approved by the change control team. Explanation: Option C: Setting the repository event setting to 'Push to a branch' will trigger the Cloud Build job whenever a push is made to any branch in the repository. This is necessary because you want the image build to be triggered when a push is made to the main branch. Option D: Configuring a branch protection rule for the main branch on the repository will require that all pushes to the main branch be... (7 votes)"
      },
      {
        "user": "edd004",
        "text": "Selected Answer: CD. C) Triggers Only when pushing or merging into a branch in our case would be main branch D) Configuring branch protection, gives you the control over the branch and who can push to it, so any changes would need to be done over a pull request, and will need to be approved before merging. (4 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: CD. To ensure that production image builds are run only against the main branch and require approval from the change control team, the recommended actions are to configure a trigger on the Cloud Build job with the repository event setting set to 'Push to a branch' (Option C) and to configure a branch protection rule for the main branch on the repository (Option D). Configuring the trigger for 'Push to a branch' ensures that Cloud Build is triggered specifically when changes are pushed to the main branch. Additionally, setting up a branch protection rule for the main branch... (3 votes)"
      },
      {
        "user": "lelele2023",
        "text": "Selected Answer: CD. A push event to branches(including main) can then trigger an automated image build. Enabling branch protection will enforce a pull request, and it then involve ppl to review. (2 votes)"
      },
      {
        "user": "nhiguchi",
        "text": "Selected Answer: CD. Answer should be CD. (2 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "C is definetly the anaswer, I have slight confusion on D and E , Most probably will go with E since the questions says automated. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 108,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Trigger on main-branch pushes + branch protection for approvals.",
    "correctRationale": "Only main-branch pushes should build the production image — a Cloud Build trigger on 'Push to a branch' (main) does that (C), and a branch protection rule on main enforces the change-control team's approval (D). Pull-request triggers fire before merge (wrong scope), OWNERS-file filtering does not approve merges, and the trigger Approval option gates the build, not the push.",
    "optionRationales": [
      "Wrong: A pull-request trigger builds on PRs, not only on approved merges to main.",
      "Wrong: Filtering the trigger on the OWNERS file changes which builds run, not who must approve merges.",
      "Correct: 'Push to a branch' triggers the build exactly when approved code lands on main.",
      "Correct: Branch protection requires the change-control team's approval before any push to main.",
      "Wrong: The trigger Approval option pauses the build, adding a second gate instead of governing pushes to main."
    ]
  },
  {
    "id": 107,
    "topic": "Troubleshooting & APM",
    "difficulty": 1,
    "question": "Your application's performance in Google Cloud has degraded since the last release. You suspect that downstream dependencies might be causing some requests to take longer to complete. You need to investigate the issue with your application to determine the cause. What should you do?",
    "options": [
      "A. Configure Error Reporting in your application.",
      "B. Configure Google Cloud Managed Service for Prometheus in your application.",
      "C. Configure Cloud Profiler in your application.",
      "D. Configure Cloud Trace in your application."
    ],
    "correct": 3,
    "explanation": "Cloud Trace shows per-request latency through downstream dependencies — the direct tool for finding which dependency is slow.",
    "discussion": [
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: D. Trace is designed for performance analysis and monitoring of applications in GCP (3 votes)"
      },
      {
        "user": "nhiguchi",
        "text": "Selected Answer: D. I should be Cloud Trace. (3 votes)"
      },
      {
        "user": "LaxmanTiwari",
        "text": "Selected Answer: D. tracing is the solution to diagnose latency (2 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. To investigate performance degradation in your application and pinpoint potential causes related to downstream dependencies, the recommended approach is to configure Cloud Trace, as denoted by (Option D). Cloud Trace provides detailed insights into the end-to-end latency of requests, enabling you to trace the execution flow across various services and dependencies. By utilizing tracing, you can identify bottlenecks and delays, allowing for a comprehensive analysis of the application's performance. Cloud Trace offers valuable data, including latency information and detailed... (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: D. https://cloud.google.com/trace#:~:text=App%20Engine%20projects.-,Find%20performance%20bottlenecks,used%20at%20Google%20to%20keep%20our%20services%20running%20at%20extreme%20scale.,-Fast%2C%20automatic%20issue (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 107,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Latency across dependencies → Cloud Trace.",
    "correctRationale": "The suspicion is that downstream dependencies are making some requests slow — distributed tracing records a request's spans across services so the slow dependency is visible. Error Reporting tracks exceptions, Prometheus is metrics, and Profiler profiles code-level CPU/memory rather than per-request dependency latency.",
    "optionRationales": [
      "Wrong: Error Reporting aggregates exception events, not request latency through dependencies.",
      "Wrong: Managed Service for Prometheus is metrics collection, not per-request dependency tracing.",
      "Wrong: Profiler shows in-process resource usage, not where a request's time went downstream.",
      "Correct: Cloud Trace decomposes request latency across downstream calls, exposing the slow dependency."
    ]
  },
  {
    "id": 106,
    "topic": "CI/CD Pipelines",
    "difficulty": 1,
    "question": "You are implementing a CI/CD pipeline for your application in your company's multi-cloud environment. Your application is deployed by using custom Compute Engine images and the equivalent in other cloud providers. You need to implement a solution that will enable you to build and deploy the images to your current environment and is adaptable to future changes. Which solution stack should you use?",
    "options": [
      "A. Cloud Build with Packer",
      "B. Cloud Build with Google Cloud Deploy",
      "C. Google Kubernetes Engine with Google Cloud Deploy",
      "D. Cloud Build with kpt"
    ],
    "correct": 0,
    "explanation": "Packer (driven by Cloud Build) is the multi-cloud image builder — portable across Compute Engine images and other clouds.",
    "discussion": [
      {
        "user": "lelele2023",
        "text": "Selected Answer: A. the question asks for \"build and deploy\"(cloud build), plus it needs to support multi-cloud(packer). (4 votes)"
      },
      {
        "user": "PrayasMohanty",
        "text": "Selected Answer: A. Packer is an open source tool for creating identical Virtual Machine (VM) images for multiple platforms from a single source configuration. Reference: https://cloud.google.com/build/docs/building/build-vm-images-with-packer C and D is related to Kubernetes and B does not suitable for platfrom other then GCP. (3 votes)"
      },
      {
        "user": "LaxmanTiwari",
        "text": "Selected Answer: A. used packer in ongoing project. (2 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. The optimal solution stack for building and deploying custom Compute Engine images in a multi-cloud environment that is adaptable to future changes is Cloud Build with Packer, as indicated by (Option A). Cloud Build integrates seamlessly with Packer, a tool for creating machine images across various platforms. This combination provides a flexible and scalable solution for building custom images and deploying them across different cloud providers. Packer allows you to define infrastructure as code and supports multiple cloud providers, ensuring adaptability to future... (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "Answer is A Solution must be suitable for multi cloud environment. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 106,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Multi-cloud image builds with Cloud Build + Packer.",
    "correctRationale": "The deliverable is machine images on multiple clouds — Packer is the purpose-built, cloud-portable image builder and Cloud Build can drive it. Cloud Deploy targets GKE/Cloud Run deploys (not image builds), GKE is not an image pipeline, and kpt manages Kubernetes config packages, not VM images.",
    "optionRationales": [
      "Correct: Cloud Build orchestrating Packer builds Compute Engine images and the equivalent images on other clouds from one pipeline.",
      "Wrong: Cloud Deploy deploys to GKE/Cloud Run; it does not build VM images.",
      "Wrong: GKE + Cloud Deploy is a deploy stack for containers, not a multi-cloud image builder.",
      "Wrong: kpt manages Kubernetes configuration packages, not machine images."
    ]
  },
  {
    "id": 105,
    "topic": "Incident Management",
    "difficulty": 2,
    "question": "Your team is writing a postmortem after an incident on your external facing application. Your team wants to improve the postmortem policy to include triggers that indicate whether an incident requires a postmortem. Based on Site Reliability Engineering (SRE) practices, what triggers should be defined in the postmortem policy? (Choose two.)",
    "options": [
      "A. An external stakeholder asks for a postmortem",
      "B. Data is lost due to an incident.",
      "C. An internal stakeholder requests a postmortem.",
      "D. The monitoring system detects that one of the instances for your application has failed.",
      "E. The CD pipeline detects an issue and rolls back a problematic release."
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "Objective postmortem triggers: data loss, and a stakeholder's request — the SRE book says any stakeholder may request one.",
    "discussion": [
      {
        "user": "d78a2b9",
        "text": "Selected Answer: AB. A over D because An external stakeholder requesting a postmortem indicates a significant impact from their perspective. This highlights the need for a thorough investigation to understand the customer experience, mitigate future issues, and potentially regain trust. Not D because Instance failures often happen, and automated systems should handle them gracefully. A postmortem is warranted only if customer impact occurs despite the redundancy and recovery mechanisms. (3 votes)"
      },
      {
        "user": "ecece4d",
        "text": "should be A and B, SRE book says: common postmortem triggers include: User-visible downtime or degradation beyond a certain threshold (N/A) \"Data loss of any kind\" <----------------------------- (B) On-call engineer intervention (release rollback, rerouting of traffic, etc.) (N/A) A resolution time above some threshold (N/A) A monitoring failure (which usually implies manual incident discovery) (N/A) not manual incident discovery here It is important to define postmortem criteria before an incident occurs so that everyone knows when a postmortem is necessary. In addition to these objective... (3 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: BE. Choose B & E. In accordance with Site Reliability Engineering (SRE) practices, the triggers defined in a postmortem policy should be focused on incidents that have significant impact and provide valuable learning opportunities. Option B, \"Data is lost due to an incident,\" is a critical trigger as data loss is a severe consequence that necessitates a thorough examination to prevent future occurrences. Option E, \"The CD pipeline detects an issue and rolls back a problematic release,\" is a crucial trigger indicating that the continuous delivery (CD) pipeline has identified... (3 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: BE. Right answer (3 votes)"
      },
      {
        "user": "LaxmanTiwari",
        "text": "Selected Answer: BE. that's right. (2 votes)"
      },
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: AB. E is expected behaviour if you set up the pipelines properly so I would go for A and B. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 105,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics B,E (community B,E 63% / A,B 38%); changed after a second review. The SRE book lists data loss as an objective trigger and adds that any stakeholder may request a postmortem, which makes an internal stakeholder's request (C) a policy trigger; an automatic rollback by the CD pipeline (E) is the system working as designed, not the on-call intervention the book refers to.",
    "conceptSummary": "Postmortem triggers: data loss plus stakeholder request.",
    "correctRationale": "The SRE book's objective triggers include user-visible data loss (B) and note that any stakeholder may request a postmortem — so an internal stakeholder's request (C) is a policy trigger. An automatic CD-pipeline rollback (E) is the system working as designed, not the on-call intervention the book means; a single failed instance (D) is routine self-healing; external vs internal stakeholders (A) both count equally.",
    "optionRationales": [
      "Wrong: An external stakeholder request counts the same as an internal one — no distinguishing trigger on its own.",
      "Correct: Data loss is an explicit objective postmortem trigger in the SRE book.",
      "Correct: The SRE book states any stakeholder may request a postmortem — an internal request is a valid trigger.",
      "Wrong: A single failed instance is normal self-healing behavior, not a postmortem event.",
      "Wrong: An automatic rollback by the CD pipeline is the system working as designed, not on-call intervention."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 104,
    "topic": "Org & IAM",
    "difficulty": 2,
    "question": "A third-party application needs to have a service account key to work properly. When you try to export the key from your cloud project, you receive an error: \"The organization policy constraint iam.disableServiceAccounKeyCreation is enforced.\" You need to make the third-party application work while following Google-recommended security practices. What should you do?",
    "options": [
      "A. Enable the default service account key, and download the key.",
      "B. Remove the iam.disableServiceAccountKeyCreation policy at the organization level, and create a key.",
      "C. Disable the service account key creation policy at the project's folder, and download the default key.",
      "D. Add a rule to set the iam.disableServiceAccountKeyCreation policy to off in your project, and create a key."
    ],
    "correct": 3,
    "explanation": "Set an org policy exception at the project level (disableServiceAccountKeyCreation off for that project) so the app gets its key without weakening the org-wide rule.",
    "discussion": [
      {
        "user": "bhunias",
        "text": "Selected Answer: D. (D) is better choice, exemption of policy at Org level is always riskier than to exempt it at project level (B). But, for answer (D) - I'm assuming here rule means assigning tag. (5 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. To address the error caused by the organization policy constraint \"iam.disableServiceAccountKeyCreation,\" and to enable the third-party application to work while adhering to Google-recommended security practices, the recommended action is (Option D). By adding a rule to set the \"iam.disableServiceAccountKeyCreation\" policy to \"off\" specifically in your project, you can override the organization-level constraint temporarily for your project. This allows you to create the necessary service account key for the third-party application without compromising the organization-wide... (4 votes)"
      },
      {
        "user": "syslog",
        "text": "I think D is better, you can disable the Org Policy only on the project in which the key is. (4 votes)"
      },
      {
        "user": "mshafa",
        "text": "Correct answer is B If the iam.disableServiceAccountCreation constraint is applied, attempting to enable these services will fail because their default service accounts cannot be created. To resolve this issue: Temporarily remove the iam.disableServiceAccountCreation constraint. Enable the desired services. Create any other desired service accounts. Finally, re-apply the constraint. https://cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts#disable_service_account_key_creation (3 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: B. Right answer (3 votes)"
      },
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: D. The correct answer is D. Using service account keys is against best practices so if needed you only enable it only on one project. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 104,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Scoped org-policy exception for a required SA key.",
    "correctRationale": "The constraint is doing its job org-wide; the least-privilege fix is a scoped exception — turn the policy off only on this project so the third-party app's key can be created there while the rest of the org stays protected. Default-account keys, removing the policy at org level, or a folder-wide disable all weaken security beyond what the requirement needs.",
    "optionRationales": [
      "Wrong: 'Enable the default service account key' is not a thing — the org policy is what blocks key creation.",
      "Wrong: Removing the org-level policy exposes every project in the organization.",
      "Wrong: Disabling at the folder still relaxes every project under that folder — broader than needed.",
      "Correct: A project-scoped policy exception is the narrowest change that lets this app get its key."
    ]
  },
  {
    "id": 103,
    "topic": "SLOs & Error Budgets",
    "difficulty": 1,
    "question": "Your organization wants to increase the availability target of an application from 99.9% to 99.99% for an investment of $2,000. The application's current revenue is $1,000,000. You need to determine whether the increase in availability is worth the investment for a single year of usage. What should you do?",
    "options": [
      "A. Calculate the value of improved availability to be $900, and determine that the increase in availability is not worth the investment.",
      "B. Calculate the value of improved availability to be $1,000, and determine that the increase in availability is not worth the investment.",
      "C. Calculate the value of improved availability to be $1,000, and determine that the increase in availability is worth the investment.",
      "D. Calculate the value of improved availability to be $9,000, and determine that the increase in availability is worth the investment."
    ],
    "correct": 0,
    "explanation": "0.09% of $1,000,000 is $900 of annual value — less than the $2,000 cost, so the upgrade is not worth it.",
    "discussion": [
      {
        "user": "PrayasMohanty",
        "text": "Selected Answer: A. 1000000÷100×0.09=900, therefor the answer appears to be A (10 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: A. To assess the cost-effectiveness of investing in an availability increase from 99.9% to 99.99% for a single year, it's essential to calculate the additional revenue generated by the improved availability. Using the formula 1000000÷100×0.09, which represents 0.09% of the current revenue of $1,000,000, the calculated value is $900. This indicates that the potential increase in revenue due to the higher availability is $900. Given that the investment cost is $2,000, the gain falls short of covering the investment, making the decision not to pursue the availability increase... (4 votes)"
      },
      {
        "user": "khoukha",
        "text": "Selected Answer: A. Sorry the answer should be A. 99,99%-99,9%=0.09% 0.09% of 1.000.000 is 900 dollar (3 votes)"
      },
      {
        "user": "LaxmanTiwari",
        "text": "Selected Answer: A. 1000000÷100×0.09=900, therefor the answer appears to be A (2 votes)"
      },
      {
        "user": "ManishKS",
        "text": "Answer Should be A (2 votes)"
      },
      {
        "user": "khoukha",
        "text": "99,99%-99,9%=0.09% 0.09% of 1.000.000 is 900 dollar, answer is B (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 103,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Cost-benefit math on an availability-nines upgrade.",
    "correctRationale": "Going from 99.9% to 99.99% recovers 0.09 percentage points of availability; at $1,000,000 revenue that is worth $900/year. Spending $2,000 to gain $900 loses money, so the investment is not justified.",
    "optionRationales": [
      "Correct: $900 of recovered value is below the $2,000 cost — not worth it.",
      "Wrong: The value is $900, not $1,000, and either figure is below the $2,000 spend.",
      "Wrong: The math (and conclusion) is off — the value is below the investment.",
      "Wrong: $9,000 mis-multiplies the delta by a factor of ten."
    ]
  },
  {
    "id": 102,
    "topic": "Performance & Cost",
    "difficulty": 1,
    "question": "Your company runs an ecommerce website built with JVM-based applications and microservice architecture in Google Kubernetes Engine (GKE). The application load increases during the day and decreases during the night. Your operations team has configured the application to run enough Pods to handle the evening peak load. You want to automate scaling by only running enough Pods and nodes for the load. What should you do?",
    "options": [
      "A. Configure the Vertical Pod Autoscaler, but keep the node pool size static.",
      "B. Configure the Vertical Pod Autoscaler, and enable the cluster autoscaler.",
      "C. Configure the Horizontal Pod Autoscaler, but keep the node pool size static.",
      "D. Configure the Horizontal Pod Autoscaler, and enable the cluster autoscaler."
    ],
    "correct": 3,
    "explanation": "HPA scales Pods with load; the cluster autoscaler scales nodes to fit them — together they run only what the traffic needs.",
    "discussion": [
      {
        "user": "PrayasMohanty",
        "text": "Selected Answer: D. There is no Vertical Pod Autoscaler, and cluster autoscaler must be enabled. Therefor D appears the best answer. (4 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. To automate scaling for the JVM-based applications and microservices architecture in Google Kubernetes Engine (GKE), especially to handle varying loads throughout the day, the recommended approach is (Option D). This involves configuring the Horizontal Pod Autoscaler (HPA) to dynamically adjust the number of Pods based on application metrics. Additionally, enabling the cluster autoscaler allows for automatic scaling of the node pool, ensuring an adequate number of nodes to accommodate the varying workload. The HPA monitors resource utilization and adjusts the number of... (3 votes)"
      },
      {
        "user": "activist",
        "text": "You want to automate scaling by only running enough Pods and nodes for the load. Answer D answers this requirement. (3 votes)"
      },
      {
        "user": "ManishKS",
        "text": "Answer Should be D (3 votes)"
      },
      {
        "user": "LaxmanTiwari",
        "text": "Selected Answer: D. please read this how to use vertical pod autoscaler https://cloud.google.com/kubernetes-engine/docs/concepts/verticalpodautoscaler , so it suggest use Horizontal Pod Autoscaler (HPA) with the VPA to get the best of autoscaling. (2 votes)"
      },
      {
        "user": "TereRolon",
        "text": "D is correct https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-autoscaler?hl=es-419 https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-metrics-apis (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 102,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Matching pod and node count to fluctuating load.",
    "correctRationale": "Daily traffic swings call for HPA (pod count follows demand) plus cluster autoscaler (node count follows pod needs) so both layers shrink at night and grow for the evening peak. VPA right-sizes requests rather than replica counts, and freezing the node pool leaves paid-for nodes idle off-peak or starves the peak.",
    "optionRationales": [
      "Wrong: VPA adjusts pod resource requests, not replica count, and a static node pool wastes money at night.",
      "Wrong: VPA with cluster autoscaling still does not add/remove pods as load changes.",
      "Wrong: HPA alone cannot add capacity when the fixed node pool is full.",
      "Correct: HPA + cluster autoscaler scale pods and nodes together, matching capacity to load at minimum cost."
    ]
  },
  {
    "id": 101,
    "topic": "Logging",
    "difficulty": 2,
    "question": "You are managing an application that runs in Compute Engine. The application uses a custom HTTP server to expose an API that is accessed by other applications through an internal TCP/UDP load balancer. A firewall rule allows access to the API port from 0.0.0.0/0. You need to configure Cloud Logging to log each IP address that accesses the API by using the fewest number of steps. What should you do first?",
    "options": [
      "A. Enable Packet Mirroring on the VPC.",
      "B. Install the Ops Agent on the Compute Engine instances.",
      "C. Enable logging on the firewall rule.",
      "D. Enable VPC Flow Logs on the subnet."
    ],
    "correct": 2,
    "explanation": "Enabling logging on the firewall rule logs every connection the rule allows — including each caller's source IP — in one step.",
    "discussion": [
      {
        "user": "PrayasMohanty",
        "text": "Selected Answer: D. Option D uses fewest number of steps. (6 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. Choose option D. To configure Cloud Logging to log each IP address accessing the API with the fewest steps in a Compute Engine environment using an internal TCP/UDP load balancer, the first step would be to enable VPC Flow Logs on the subnet. That will allows you to capture network flow information, including source and destination IP addresses, as traffic passes through the load balancer. VPC Flow Logs provide detailed visibility into network activity without requiring modifications to individual instances or the installation of additional agents. Enabling VPC Flow Logs... (3 votes)"
      },
      {
        "user": "winston9",
        "text": "Selected Answer: C. C is correct. VPC Flows logs can show source IP addresses, but they sample packets, do not provide the level of detail about individual API calls compared to firewall rule logging. (2 votes)"
      },
      {
        "user": "ManishKS",
        "text": "D. Enable VPC Flow Logs on the subnet. This will capture the network traffic details you need for logging in Cloud Logging without requiring additional configurations on the instances or firewall rules. (2 votes)"
      },
      {
        "user": "soady",
        "text": "Selected Answer: C. IP's can be missed using flow logs. Right answer is C: VPC Flow Logs samples packets using a primary sampling rate. The primary sampling rate is dynamic and varies depending on the load of the physical host running the VM or gateway at the time of sampling. The probability of sampling any single IP connection increases with the volume of packets. You can't control the primary flow log sampling process or adjust the primary samplSource: https://cloud.google.com/vpc/docs/flow-logs#log-sampling (1 vote)"
      },
      {
        "user": "cachopo",
        "text": "Selected Answer: C. Since there is already a firewall rule allowing access from 0.0.0.0/0, enabling firewall rule logging will capture details of every incoming connection, including the source IP address. This is the simplest approach and requires only one step (enabling logging on the existing firewall rule). (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 101,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics' suggested D (community 53% D, most commenters argue C): VPC Flow Logs sample traffic and cannot guarantee each caller's IP is logged; Firewall Rules Logging records every allowed connection with source IP in one step.",
    "conceptSummary": "Firewall Rules Logging for per-source-IP access logging.",
    "correctRationale": "Firewall Rules Logging records every connection the rule permits, with source IP, in a single enable — the fewest steps to a guaranteed per-caller log. VPC Flow Logs (the ExamTopics key) sample traffic, so they cannot guarantee each caller's IP is captured. Packet Mirroring and Ops Agent are heavier and not needed.",
    "optionRationales": [
      "Wrong: Packet Mirroring copies full packets for inspection infrastructure — far more machinery than needed.",
      "Wrong: The Ops Agent collects OS/app logs and metrics; it does not log inbound network callers by itself.",
      "Correct: Firewall rule logging logs every allowed connection with source IP — one step, complete coverage.",
      "Wrong: VPC Flow Logs sample traffic, so intermittent callers can be missed entirely."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 100,
    "topic": "Deployment Strategies",
    "difficulty": 1,
    "question": "The new version of your containerized application has been tested and is ready to be deployed to production on Google Kubernetes Engine (GKE). You could not fully load-test the new version in your pre-production environment, and you need to ensure that the application does not have performance problems after deployment. Your deployment must be automated. What should you do?",
    "options": [
      "A. Deploy the application through a continuous delivery pipeline by using canary deployments. Use Cloud Monitoring to look for performance issues, and ramp up traffic as supported by the metrics.",
      "B. Deploy the application through a continuous delivery pipeline by using blue/green deployments. Migrate traffic to the new version of the application and use Cloud Monitoring to look for performance issues.",
      "C. Deploy the application by using kubectl and use Config Connector to slowly ramp up traffic between versions. Use Cloud Monitoring to look for performance issues.",
      "D. Deploy the application by using kubectl and set the spec.updateStrategy.type field to RollingUpdate. Use Cloud Monitoring to look for performance issues, and run the kubectl rollback command if there are any issues."
    ],
    "correct": 0,
    "explanation": "A canary deploy in the CD pipeline ramps traffic on real users gradually while Monitoring watches for the perf problems pre-prod could not catch.",
    "discussion": [
      {
        "user": "PrayasMohanty",
        "text": "Selected Answer: A. I vote for A as in Blue/Green deployment you can rollback quickly after facing the performance issue, but in Canary you can detect performance issue on partial deployment and rollback before the issue get affected. (15 votes)"
      },
      {
        "user": "xhilmi",
        "text": "The recommended approach to automate the deployment of the new version of a containerized application to production on Google Kubernetes Engine (GKE) while addressing potential performance issues is (Option A). Utilizing canary deployments within a continuous delivery pipeline allows for a controlled and gradual rollout of the new version. By monitoring performance metrics with Cloud Monitoring, the deployment process can be informed by real-time insights. The traffic can be incrementally increased as supported by the monitored metrics, minimizing the risk of performance problems. This... (2 votes)"
      },
      {
        "user": "BleHi",
        "text": "Selected Answer: A. After consideration, Canary approach is better in this specific scenario as it allows for monitoring the performance of the new version in production while minimizing the risk of widespread issues. (1 vote)"
      },
      {
        "user": "BleHi",
        "text": "Selected Answer: B. B. Blue/green deployments involve deploying the new version alongside the existing one, routing only a portion of the traffic to the new version initially. Once you verify that the new version is performing well and there are no issues, you can fully migrate traffic to the new version. This allows for a safe rollback if any issues arise. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 100,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Canary rollout for a version that could not be fully load-tested.",
    "correctRationale": "Because pre-production load testing was incomplete, real-traffic exposure must be gradual — a canary deployment in the automated CD pipeline sends a small traffic slice first and ramps it only while Cloud Monitoring shows healthy metrics. Blue/green cuts all traffic at once; kubectl+Config Connector or a raw RollingUpdate lack the metric-driven traffic control.",
    "optionRationales": [
      "Correct: Canary stages real-traffic exposure gradually under Cloud Monitoring, matching the unknown-performance risk.",
      "Wrong: Blue/green switches everything at once — bad when load behavior is unverified.",
      "Wrong: kubectl plus Config Connector is for managing infra, not progressive traffic rollout.",
      "Wrong: RollingUpdate replaces pods on a schedule but does not gate on performance metrics."
    ]
  },
  {
    "id": 99,
    "topic": "CI/CD Pipelines",
    "difficulty": 2,
    "question": "You need to build a CI/CD pipeline for a containerized application in Google Cloud. Your development team uses a central Git repository for trunk-based development. You want to run all your tests in the pipeline for any new versions of the application to improve the quality. What should you do?",
    "options": [
      "A. Step 1: Install a Git hook to require developers to run unit tests before pushing the code to a central repository.\nStep 2: Trigger Cloud Build to build the application container. Deploy the application container to a testing environment, and run integration tests.\nStep 3: If the integration tests are successful, deploy the application container to your production environment, and run acceptance tests.",
      "B. Step 1: Install a Git hook to require developers to run unit tests before pushing the code to a central repository. If all tests are successful, build a container.\nStep 2: Trigger Cloud Build to deploy the application container to a testing environment, and run integration tests and acceptance tests.\nStep 3: If all tests are successful, tag the code as production ready. Trigger Cloud Build to build and deploy the application container to the production environment.",
      "C. Step 1: Trigger Cloud Build to build the application container, and run unit tests with the container.\nStep 2: If unit tests are successful, deploy the application container to a testing environment, and run integration tests.\nStep 3: If the integration tests are successful, the pipeline deploys the application container to the production environment. After that, run acceptance tests.",
      "D. Step 1: Trigger Cloud Build to run unit tests when the code is pushed. If all unit tests are successful, build and push the application container to a central registry.\nStep 2: Trigger Cloud Build to deploy the container to a testing environment, and run integration tests and acceptance tests.\nStep 3: If all tests are successful, the pipeline deploys the application to the production environment and runs smoke tests"
    ],
    "correct": 3,
    "explanation": "Run tests at each stage — unit on push, integration+acceptance in test env, then promote to prod with a final smoke test.",
    "discussion": [
      {
        "user": "nhiguchi",
        "text": "Selected Answer: D. I think D (5 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. The optimal approach for establishing a CI/CD pipeline for a containerized application in Google Cloud is (Option D). In this method, unit tests are seamlessly integrated into the initial stages of the pipeline, automatically triggered when code is pushed. Successful unit tests then prompt Cloud Build to construct and push the application container to a central registry. The pipeline subsequently orchestrates the deployment of the container to a testing environment, where comprehensive integration and acceptance tests are executed. Only when all tests pass successfully... (3 votes)"
      },
      {
        "user": "florian_cartron",
        "text": "Selected Answer: D. I would chose D as question states that we want to run all tests in the pipeline, which is not the case with a hook for unit tests. Option D also adds smoke tests in production env. (3 votes)"
      },
      {
        "user": "ManishKS",
        "text": "Answer Should be B (2 votes)"
      },
      {
        "user": "surfer111",
        "text": "D, you need a container to be built so you can run the tests against it folks. D is the right answer. (1 vote)"
      },
      {
        "user": "PGontijo",
        "text": "You can use Cloud Build to build a container. A is correct. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 99,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "A test-gated pipeline: unit → integration/acceptance → prod smoke.",
    "correctRationale": "The requirement is to run all tests in the pipeline for every version. Option D runs unit tests on push, builds and pushes the container only when they pass, runs integration and acceptance tests in a test environment, and deploys to production only when all pass, finishing with smoke tests. The other options skip stages or run tests outside the pipeline (pre-push git hooks).",
    "optionRationales": [
      "Wrong: It skips acceptance testing before production and defers it after the prod deploy — wrong order.",
      "Wrong: It defers acceptance tests to pre-production only and gatekeeps on a local git hook rather than the pipeline running all tests.",
      "Wrong: Acceptance tests run after production deploy — the buggy version is already live.",
      "Correct: Every test stage runs inside the pipeline and production promotion happens only after all pass."
    ]
  },
  {
    "id": 98,
    "topic": "Monitoring & Alerting",
    "difficulty": 1,
    "question": "Your company runs services by using multiple globally distributed Google Kubernetes Engine (GKE) clusters. Your operations team has set up workload monitoring that uses Prometheus-based tooling for metrics, alerts, and generating dashboards. This setup does not provide a method to view metrics globally across all clusters. You need to implement a scalable solution to support global Prometheus querying and minimize management overhead. What should you do?",
    "options": [
      "A. Configure Prometheus cross-service federation for centralized data access.",
      "B. Configure workload metrics within Cloud Operations for GKE.",
      "C. Configure Prometheus hierarchical federation for centralized data access.",
      "D. Configure Google Cloud Managed Service for Prometheus."
    ],
    "correct": 3,
    "explanation": "Google Cloud Managed Service for Prometheus gives a global, managed query plane across all clusters with PromQL — minimal ops.",
    "discussion": [
      {
        "user": "Skadian",
        "text": "D options is looking more sutaible. https://cloud.google.com/stackdriver/docs/managed-prometheus (7 votes)"
      },
      {
        "user": "PrayasMohanty",
        "text": "Appear D is right (4 votes)"
      },
      {
        "user": "koo_kai",
        "text": "Selected Answer: D. https://cloud.google.com/stackdriver/docs/managed-prometheus (2 votes)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. The most effective solution for achieving scalable global Prometheus querying while minimizing management complexity is Option D, \"Configure Google Cloud Managed Service for Prometheus.\" This approach involves leveraging the fully managed service offered by Google Cloud for Prometheus, which streamlines the collection, querying, and alerting on metrics. With this service, you can effortlessly centralize metrics from various globally distributed GKE clusters, eliminating the need for intricate configurations or federation mechanisms. By opting for the Google Cloud Managed... (1 vote)"
      },
      {
        "user": "activist",
        "text": "Answer D is the best. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 98,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Global Prometheus querying with a managed service.",
    "correctRationale": "Managed Service for Prometheus collects Prometheus metrics from every cluster and exposes one global PromQL query interface — the managed, low-overhead way to get cross-cluster views. Self-managed federation (cross-service or hierarchical) means running and linking Prometheus yourself, and 'workload metrics in Cloud Operations' gives only GKE workload metrics, not a Prometheus query layer.",
    "optionRationales": [
      "Wrong: Cross-service federation is a hand-built topology you deploy and operate — not minimal overhead.",
      "Wrong: Cloud Operations for GKE workload metrics is a fixed dashboard view, not global Prometheus-style querying.",
      "Wrong: Hierarchical federation requires running central Prometheus infrastructure yourself.",
      "Correct: Managed Service for Prometheus provides global PromQL querying across clusters with Google running the backend."
    ]
  },
  {
    "id": 97,
    "topic": "Logging",
    "difficulty": 1,
    "question": "You are creating Cloud Logging sinks to export log entries from Cloud Logging to BigQuery for future analysis. Your organization has a Google Cloud folder named Dev that contains development projects and a folder named Prod that contains production projects. Log entries for development projects must be exported to dev_dataset, and log entries for production projects must be exported to prod_dataset. You need to minimize the number of log sinks created, and you want to ensure that the log sinks apply to future projects. What should you do?",
    "options": [
      "A. Create a single aggregated log sink at the organization level.",
      "B. Create a log sink in each project.",
      "C. Create two aggregated log sinks at the organization level, and filter by project ID.",
      "D. Create an aggregated log sink in the Dev and Prod folders."
    ],
    "correct": 3,
    "explanation": "One aggregated sink per folder (Dev → dev_dataset, Prod → prod_dataset) covers current and future projects with just two sinks.",
    "discussion": [
      {
        "user": "xhilmi",
        "text": "Selected Answer: D. To minimize the number of log sinks and ensure that the log sink configurations are applied to future projects, the optimal choice is Option D. By creating an aggregated log sink at the folder level for both the Dev and Prod folders, you can enforce consistent export configurations for all existing and forthcoming projects within each folder. This approach facilitates centralized management, eliminating the need for creating individual sinks for each project. It reduces complexity and ensures that any new projects added to the Dev or Prod folders will automatically adopt... (2 votes)"
      },
      {
        "user": "ManishKS",
        "text": "C. Create two aggregated log sinks at the organization level, and filter by project ID. By creating two aggregated log sinks at the organization level and applying filters based on project ID, you can achieve the desired log entry routing for both development and production projects. This approach allows for scalability and ensures that future projects in the respective folders will inherit the log sink configurations. (2 votes)"
      },
      {
        "user": "khoukha",
        "text": "Selected Answer: D. need to create two sinks at folder level. if there is new projects inside each folder, the rule will be applied to them too (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 97,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Minimum folder-scoped sinks for per-env BigQuery datasets.",
    "correctRationale": "Aggregated sinks at folder level capture all current and future projects under that folder — two sinks total, each landing in the right dataset. An org-level sink cannot split destinations by folder, project-level sinks multiply per project, and org-level filtered sinks still need per-project updates.",
    "optionRationales": [
      "Wrong: One org sink cannot route dev and prod logs to different datasets.",
      "Wrong: Per-project sinks must be recreated for every future project.",
      "Wrong: Org-level sinks filtered by project ID still need edits as projects are added, and the org scope is broader than needed.",
      "Correct: Folder-level aggregated sinks for Dev and Prod hit the right datasets and cover future projects automatically."
    ]
  },
  {
    "id": 96,
    "topic": "Infrastructure as Code",
    "difficulty": 2,
    "question": "You are using Terraform to manage infrastructure as code within a CI/CD pipeline. You notice that multiple copies of the entire infrastructure stack exist in your Google Cloud project, and a new copy is created each time a change to the existing infrastructure is made. You need to optimize your cloud spend by ensuring that only a single instance of your infrastructure stack exists at a time. You want to follow Google-recommended practices. What should you do?",
    "options": [
      "A. Create a new pipeline to delete old infrastructure stacks when they are no longer needed.",
      "B. Confirm that the pipeline is storing and retrieving the terraform.tfstate file from Cloud Storage with the Terraform gcs backend.",
      "C. Verify that the pipeline is storing and retrieving the terraform.tfstate file from a source control.",
      "D. Update the pipeline to remove any existing infrastructure before you apply the latest configuration."
    ],
    "correct": 1,
    "explanation": "Duplicated stacks mean state is not shared — store terraform.tfstate in Cloud Storage via the gcs backend so applies update one stack.",
    "discussion": [
      {
        "user": "nhiguchi",
        "text": "Selected Answer: B. B is correct. (3 votes)"
      },
      {
        "user": "PrayasMohanty",
        "text": "B appears correct to me. (3 votes)"
      },
      {
        "user": "Xoxoo",
        "text": "Selected Answer: B. The Terraform tfstate file contains the state of the infrastructure managed by Terraform. Storing this file in Cloud Storage with the Terraform Google Cloud Storage (GCS) backend ensures that it is shared across executions of the pipeline. (1 vote)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: B. https://cloud.google.com/docs/terraform/resource-management/managing-infrastructure-as-code#configuring_terraform_to_store_state_in_a_cloud_storage_bucket (1 vote)"
      },
      {
        "user": "kish18",
        "text": "B is correct, storing the state file to the gcs bucket maintains the state correctly (1 vote)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: B. Option B is the recommended approach to optimize cloud spending and ensure a single instance of your infrastructure stack exists at a time when using Terraform within a CI/CD pipeline. By storing and retrieving the terraform.tfstate file from Cloud Storage with the Terraform Google Cloud Storage (GCS) backend, you centralize the state management. This ensures that Terraform has a single source of truth for the infrastructure state, preventing the creation of redundant instances. The GCS backend enables state locking, consistency, and collaboration across the CI/CD... (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 96,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Single-stack Terraform via a shared remote state backend.",
    "correctRationale": "A new copy of the stack on every change is the signature of each run starting with empty/local state — Terraform cannot see what it already manages. The gcs backend in Cloud Storage keeps one shared, versioned state so applies update the existing stack. Source control is not a state store, deleting infrastructure is destructive, and a cleanup pipeline treats the symptom.",
    "optionRationales": [
      "Wrong: Deleting old stacks adds machinery around a problem that shared state prevents entirely.",
      "Correct: A shared gcs backend with terraform.tfstate in Cloud Storage makes every run see and update the same stack.",
      "Wrong: Committing tfstate to source control is discouraged (secrets, locking issues) and still lacks the gcs backend's locking/state features.",
      "Wrong: Destroying existing infra before apply causes downtime and is not the fix for missing shared state."
    ]
  },
  {
    "id": 95,
    "topic": "Infrastructure as Code",
    "difficulty": 3,
    "question": "Your team deploys applications to three Google Kubernetes Engine (GKE) environments: development, staging, and production. You use GitHub repositories as your source of truth. You need to ensure that the three environments are consistent. You want to follow Google-recommended practices to enforce and install network policies and a logging DaemonSet on all the GKE clusters in those environments. What should you do?",
    "options": [
      "A. Use Google Cloud Deploy to deploy the network policies and the DaemonSet. Use Cloud Monitoring to trigger an alert if the network policies and DaemonSet drift from your source in the repository.",
      "B. Use Google Cloud Deploy to deploy the DaemonSet and use Policy Controller to configure the network policies. Use Cloud Monitoring to detect drifts from the source in the repository and Cloud Functions to correct the drifts.",
      "C. Use Cloud Build to render and deploy the network policies and the DaemonSet. Set up Config Sync to sync the configurations for the three environments.",
      "D. Use Cloud Build to render and deploy the network policies and the DaemonSet. Set up a Policy Controller to enforce the configurations for the three environments."
    ],
    "correct": 2,
    "explanation": "Config Sync continuously reconciles all three clusters against the Git source, both installing the resources and reverting drift; Policy Controller can only gate, not deploy.",
    "discussion": [
      {
        "user": "ManishKS",
        "text": "Option C is not as effective as Option D because it does not enforce the network policies and DaemonSet configurations. This means that unauthorized changes could still be made to the configurations. Config Sync is a tool that can be used to synchronize Kubernetes configurations across multiple clusters. However, it does not prevent unauthorized changes from being made to the configurations. Policy Controller is a tool that can be used to enforce Kubernetes configurations. It does this by monitoring the Kubernetes API for changes to the configurations and automatically reverting unauthorized... (9 votes)"
      },
      {
        "user": "medox89",
        "text": "Option C is the right one.\" Cloud Build: Ideal for building and deploying software artifacts based on your GitHub repositories, your chosen source of truth. Renders your network policies and DaemonSet configurations, ensuring consistency before deployment. Config Sync: Designed for configuration management across GKE clusters. Continuously synchronizes your rendered configurations (network policies and DaemonSet) from GitHub to all three environments (development, staging, production). Provides automated drift detection and remediation, ensuring consistency remains enforced. (3 votes)"
      },
      {
        "user": "cachopo",
        "text": "Selected Answer: C. Why use Cloud Build? - Cloud Build allows you to automate rendering and deploying Kubernetes manifests. - It ensures that changes are version-controlled and applied consistently across all environments. Why use Config Sync? - Config Sync ensures that your GKE clusters stay in sync with the GitHub repository (source of truth). - It automatically detects and corrects drift, enforcing the desired state. - It is Google's recommended practice for managing multi-cluster configurations. (2 votes)"
      },
      {
        "user": "surfer111",
        "text": "Its a toss up here. C hits all the keywords in \"https://cloud.google.com/kubernetes-engine/enterprise/config-sync/docs/overview\" - source of truth, gitops, but does not talk about enforcement. However, policy controller is a subset of configsync and it does handle enforcement. \"Constraints can be applied directly to your clusters using the Kubernetes API, or distributed to a set of clusters from a centralized source, like a Git repository, by using Config Sync.\" https://cloud.google.com/kubernetes-engine/enterprise/policy-controller/docs/overview#constraints Really seems like a trick question... (2 votes)"
      },
      {
        "user": "manishk39",
        "text": "Selected Answer: C. Use Cloud Build to render and deploy the network policies and the DaemonSet. Set up Config Sync to sync the configurations for the three environments. This approach uses Cloud Build for CI/CD processes and leverages Config Sync for GitOps practices, ensuring that your GKE environments are consistent with the configurations defined in your GitHub repositories. Config Sync will continuously reconcile the cluster state with the desired state in the repository, and Policy Controller which is part of Config Sync will enforce the network policies. (1 vote)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: C. I will go for C. Cloud Build: Cloud Build is excellent for building and deploying configurations. It can be used to render your network policies and DaemonSet configurations from your GitHub repository. Config Sync: Config Sync is specifically designed for managing and synchronizing configurations across multiple Kubernetes clusters.1 It allows you to define your desired state in a Git repository (your GitHub repo) and then automatically applies those configurations to your GKE clusters (development, staging, and production).2 This ensures consistency across environments... (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 95,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics' suggested D (community split 50/50): Config Sync continuously reconciles every cluster against the Git source — it both installs the DaemonSet/network policies and reverts drift; Policy Controller only admits or rejects resources against constraints and cannot deploy a DaemonSet or keep environments identical.",
    "conceptSummary": "Cross-cluster config consistency with Config Sync.",
    "correctRationale": "Keeping three environments identical from a Git source is Config Sync's job: it continuously applies and reconciles the DaemonSet and network policies, correcting drift. Policy Controller is admission control — it can block non-compliant resources but cannot deploy a DaemonSet or restore consistency. Cloud Deploy is a release tool, not a reconciliation loop; and the question's note-overridden ExamTopics answer (D) relies on enforcement alone.",
    "optionRationales": [
      "Wrong: Cloud Deploy delivers releases; it does not continuously reconcile cluster config against the Git source.",
      "Wrong: This combines two tools awkwardly and still uses Cloud Monitoring + functions for the reconciliation loop Config Sync does natively.",
      "Correct: Cloud Build renders/deploys and Config Sync keeps all three environments continuously synced to the Git source — install plus drift correction.",
      "Wrong: Policy Controller admits or rejects resources; it cannot install a DaemonSet or reconcile environments back to the source."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 94,
    "topic": "Performance & Cost",
    "difficulty": 2,
    "question": "You are the on-call Site Reliability Engineer for a microservice that is deployed to a Google Kubernetes Engine (GKE) Autopilot cluster. Your company runs an online store that publishes order messages to Pub/Sub, and a microservice receives these messages and updates stock information in the warehousing system. A sales event caused an increase in orders, and the stock information is not being updated quickly enough. This is causing a large number of orders to be accepted for products that are out of stock. You check the metrics for the microservice and compare them to typical levels, as shown in the image. You need to ensure that the warehouse system accurately reflects product inventory at the time orders are placed and minimize the impact on customers. What should you do?",
    "options": [
      "A. Decrease the acknowledgment deadline on the subscription.",
      "B. Add a virtual queue to the online store that allows typical traffic levels.",
      "C. Increase the number of Pod replicas.",
      "D. Increase the Pod CPU and memory limits."
    ],
    "correct": 2,
    "explanation": "CPU is fine (30% of limit) but unacked message age and undelivered count exploded — add replicas so consumers drain the Pub/Sub backlog faster.",
    "discussion": [
      {
        "user": "activist",
        "text": "Selected Answer: C. Agree with C as answer. (6 votes)"
      },
      {
        "user": "piyu1515",
        "text": "Given the scenario where a sales event has caused an increase in orders and the stock information is not being updated quickly enough, leading to a large number of orders being accepted for out-of-stock products, the most appropriate action to ensure that the warehouse system accurately reflects product inventory at the time of order placement and minimize the impact on customers would be: C. Increase the number of Pod replicas. Increasing the number of Pod replicas can help scale out the microservice to handle the increased load efficiently. This will allow the microservice to process the... (1 vote)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: C. Increasing the number of Pod replicas (Option C) is a suitable solution as it allows the microservice deployed in the Google Kubernetes Engine (GKE) Autopilot cluster to efficiently handle a surge in orders during a sales event. By scaling horizontally, additional instances of the microservice are created, enabling parallel processing of order messages and reducing the backlog. This approach leverages the flexibility and automation of GKE Autopilot, ensuring that the infrastructure dynamically adapts to the increased load, providing a more responsive and scalable solution... (1 vote)"
      },
      {
        "user": "filipemotta",
        "text": "Selected Answer: C. Answer C. This action would help accommodate the increased load by parallelizing the work and should be implemented first to mitigate the issue. If after scaling the number of replicas the CPU or memory usage approaches the limits, then considering scaling up the resources (CPU and memory limits) for each Pod might be the next step. (1 vote)"
      },
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: C. The average acknowledgement latency from Pub/Sub has not significantly increased, which suggests that Pub/Sub is still able to handle the message load effectively. However, the significant increase in the oldest unacknowledged message age and the number of undelivered messages indicates that the pods are not processing the messages quickly enough. Increasing the number of Pod replicas would allow your microservice to process more messages concurrently, reducing the backlog and ensuring that stock information is updated more quickly. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 94,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Draining a Pub/Sub backlog by scaling out consumers.",
    "correctRationale": "The metrics show CPU and memory are healthy while oldest-unacked-message age and undelivered count ballooned — a throughput deficit, not a resource deficit. More pod replicas mean more parallel Pub/Sub consumers draining the backlog. A shorter ack deadline causes redelivery churn, a virtual queue throttles sales, and CPU/memory are not the bottleneck.",
    "optionRationales": [
      "Wrong: Decreasing the ack deadline makes unprocessed messages expire sooner and redeliver, amplifying backlog churn.",
      "Wrong: Queuing the store at typical levels silently caps order-taking during the sales event — worse customer impact.",
      "Correct: The consumer is throughput-bound (backlog exploding, CPU/memory fine), so more replicas drain Pub/Sub faster.",
      "Wrong: CPU and memory are well under limits; raising them does not add processing parallelism."
    ],
    "images": [
      {
        "url": "/question-images/gcp-pcdoe/q094-pubsub-backlog-metrics.png",
        "alt": "Metrics table comparing typical vs current values for the order-processing microservice: CPU 20% to 30% of Pod limit, memory steady at 10%, oldest unacked message age 347 ms to 8074 ms, undelivered messages 5 to 14705, ack latency 312 to 354 ms."
      }
    ]
  },
  {
    "id": 93,
    "topic": "Org & IAM",
    "difficulty": 2,
    "question": "You are creating a CI/CD pipeline to perform Terraform deployments of Google Cloud resources. Your CI/CD tooling is running in Google Kubernetes Engine (GKE) and uses an ephemeral Pod for each pipeline run. You must ensure that the pipelines that run in the Pods have the appropriate Identity and Access Management (IAM) permissions to perform the Terraform deployments. You want to follow Google-recommended practices for identity management. What should you do? (Choose two.)",
    "options": [
      "A. Create a new Kubernetes service account, and assign the service account to the Pods. Use Workload Identity to authenticate as the Google service account.",
      "B. Create a new JSON service account key for the Google service account, store the key as a Kubernetes secret, inject the key into the Pods, and set the GOOGLE_APPLICATION_CREDENTIALS environment variable.",
      "C. Create a new Google service account, and assign the appropriate IAM permissions.",
      "D. Create a new JSON service account key for the Google service account, store the key in the secret management store for the CI/CD tool, and configure Terraform to use this key for authentication.",
      "E. Assign the appropriate IAM permissions to the Google service account associated with the Compute Engine VM instances that run the Pods."
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "A Kubernetes service account with Workload Identity plus a correctly-permissioned Google service account is the recommended way to give Pods IAM permissions.",
    "discussion": [
      {
        "user": "xhilmi",
        "text": "Selected Answer: AC. Option A: Suggests creating a new Kubernetes service account and assigning it to the Pods. This service account is then associated with a Google service account using Workload Identity. This setup enables seamless authentication of Pods as the specified Google service account without relying on manual management of service account keys. Option C: Complements the approach by emphasizing the creation of a new Google service account and assigning the necessary IAM permissions. While the Kubernetes service account establishes the identity within the GKE cluster, the Google... (4 votes)"
      },
      {
        "user": "khoukha",
        "text": "Selected Answer: AC. A.for the pod to authenticate as service account with the necessary permissions without handling keys C.to perform operations on google cloud ressources (4 votes)"
      },
      {
        "user": "ldgomez",
        "text": "I think is A, C Workload Identity is the recommended way to authenticate to Google Cloud services from GKE. reference: https://cloud.google.com/kubernetes-engine/docs/tutorials/authenticating-to-cloud-platform (4 votes)"
      },
      {
        "user": "Jason_Cloud_at",
        "text": "Selected Answer: AC. I would go with A,C (3 votes)"
      },
      {
        "user": "activist",
        "text": "B, C are best answers per the URL link below. https://cloud.google.com/kubernetes-engine/docs/tutorials/authenticating-to-cloud-platform (2 votes)"
      },
      {
        "user": "activist",
        "text": "Why not answers C, D? (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 93,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Pod IAM permissions via Workload Identity (no SA keys).",
    "correctRationale": "Google-recommended identity for GKE workloads is Workload Identity: a Kubernetes service account bound to a Google service account, assigned to the Pods (A), and the Google service account itself granted only the needed IAM roles (C). Injecting JSON keys as secrets (B/D) is exactly the long-lived-credential anti-pattern to avoid, and node VM service accounts (E) give every pod on the node the same permissions.",
    "optionRationales": [
      "Correct: A dedicated Kubernetes service account bound via Workload Identity gives each pod its own Google identity — no keys.",
      "Wrong: Storing a JSON SA key as a secret and injecting it creates a long-lived, exfiltratable credential.",
      "Correct: The Google service account needs the IAM permissions for Terraform; Workload Identity then maps it to the pods.",
      "Wrong: A JSON key in the CI tool's secret store is still a long-lived key the recommendation avoids.",
      "Wrong: Node service accounts share one identity across all pods on the node — no per-workload least privilege."
    ]
  },
  {
    "id": 92,
    "topic": "Deployment Strategies",
    "difficulty": 1,
    "question": "You are developing the deployment and testing strategies for your CI/CD pipeline in Google Cloud. You must be able to:\n• Reduce the complexity of release deployments and minimize the duration of deployment rollbacks.\n• Test real production traffic with a gradual increase in the number of affected users. You want to select a deployment and testing strategy that meets your requirements. What should you do?",
    "options": [
      "A. Recreate deployment and canary testing",
      "B. Blue/green deployment and canary testing",
      "C. Rolling update deployment and A/B testing",
      "D. Rolling update deployment and shadow testing"
    ],
    "correct": 1,
    "explanation": "Blue/green gives near-instant rollback; canary testing ramps real production traffic gradually — the two requirements directly.",
    "discussion": [
      {
        "user": "activist",
        "text": "Selected Answer: B. B seems to be correct answer. (6 votes)"
      },
      {
        "user": "nhiguchi",
        "text": "Selected Answer: B. I think B (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: B. https://cloud.google.com/architecture/application-deployment-and-testing-strategies Blue Gree deployment because its instant rollback Canary testing because I can test on subset of users with gradual rollout (1 vote)"
      },
      {
        "user": "xhilmi",
        "text": "Selected Answer: B. B. Blue/green deployment and canary testing Explanation: - Blue/Green Deployment: In a blue/green deployment, you maintain two separate environments, one (blue) with the current version of your application in production and another (green) with the new version. You switch traffic from the blue environment to the green environment once testing is successful. - Canary Testing: Canary testing involves gradually rolling out a new version of the application to a small subset of users or traffic. This allows for real production traffic testing with minimal impact, and if issues... (1 vote)"
      },
      {
        "user": "filipemotta",
        "text": "Selected Answer: B. B should be Answer. (1 vote)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: B. B should be Answer. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 92,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Pairing blue/green deploys with canary testing.",
    "correctRationale": "Simple deployments with minimal rollback duration call for blue/green (traffic flips between environments). Testing with real production traffic ramping gradually is canary testing. Recreate gives hard downtime, rolling updates complicate instant rollback, and shadow/A-B tests do not match the ramp requirement.",
    "optionRationales": [
      "Wrong: Recreate takes the whole app down during deploys — no fast rollback and no traffic ramp.",
      "Correct: Blue/green for simple, fast rollback plus canary for gradual real-traffic testing covers both requirements.",
      "Wrong: Rolling update plus A/B is not a fast-rollback strategy; A/B is experimentation, not progressive rollout.",
      "Wrong: Shadow testing mirrors traffic rather than gradually exposing real users to the new version."
    ]
  },
  {
    "id": 91,
    "topic": "Incident Management",
    "difficulty": 2,
    "question": "You work for a global organization and run a service with an availability target of 99% with limited engineering resources. For the current calendar month, you noticed that the service has 99.5% availability. You must ensure that your service meets the defined availability goals and can react to business changes, including the upcoming launch of new features. You also need to reduce technical debt while minimizing operational costs. You want to follow Google-recommended practices. What should you do?",
    "options": [
      "A. Add N+1 redundancy to your service by adding additional compute resources to the service.",
      "B. Identify, measure, and eliminate toil by automating repetitive tasks.",
      "C. Define an error budget for your service level availability and minimize the remaining error budget.",
      "D. Allocate available engineers to the feature backlog while you ensure that the service remains within the availability target."
    ],
    "correct": 1,
    "explanation": "Eliminating toil frees limited engineers for upcoming features while cutting cost — the SRE-recommended investment here.",
    "discussion": [
      {
        "user": "xhilmi",
        "text": "Selected Answer: B. Option B suggests focusing on identifying, measuring, and eliminating toil through the automation of repetitive tasks. In the context of running a service with a 99% availability target and limited engineering resources, this approach aligns with Google's Site Reliability Engineering (SRE) principles. By automating manual and repetitive operational work, engineering teams can enhance efficiency, reduce the risk of human error, and free up valuable resources. The emphasis on eliminating toil not only contributes to meeting availability targets by minimizing the potential... (4 votes)"
      },
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: B. I would go for B as I think it will minimize ops costs and reduce technical debt (3 votes)"
      },
      {
        "user": "nhiguchi",
        "text": "Selected Answer: C. I think C. (2 votes)"
      },
      {
        "user": "[Removed]",
        "text": "C is the answer I think. (2 votes)"
      },
      {
        "user": "filipemotta",
        "text": "Selected Answer: B. Automating repetitive tasks (toil) is a key practice recommended by Google, especially for teams with limited engineering resources. By reducing toil, your team can focus more on high-value activities that improve the service and deliver new features. Automation not only improves efficiency but also helps maintain service reliability by reducing the likelihood of human error. (1 vote)"
      },
      {
        "user": "activist",
        "text": "You also need to reduce technical debt while minimizing operational costs. You want to follow Google-recommended practices. Answer C fits this criteria. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 91,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority C/D: with limited engineers and explicit goals of cutting technical debt and operating cost, eliminating toil is the investment that frees capacity for upcoming features while holding the 99% target.",
    "conceptSummary": "Reducing toil to free engineering capacity.",
    "correctRationale": "The service is already at 99.5% against a 99% target with limited engineers and explicit goals to cut technical debt and operating cost. Automating away toil is the one investment that frees sustained capacity for feature work while keeping the availability target. Adding hardware (A) raises cost, minimizing the error budget (C) is backwards, and dumping the backlog on engineers (D) ignores the stated debt/cost goals.",
    "optionRationales": [
      "Wrong: N+1 redundancy costs money and does not reduce toil or technical debt.",
      "Correct: Eliminating toil via automation frees engineering time for features and cuts operating cost — the SRE answer.",
      "Wrong: Minimizing remaining error budget means constraining yourself to less reliability headroom, which is not the stated goal.",
      "Wrong: Assigning engineers to the backlog without removing toil leaves the operational drag in place."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 90,
    "topic": "Deployment Strategies",
    "difficulty": 2,
    "question": "You are building and deploying a microservice on Cloud Run for your organization. Your service is used by many applications internally. You are deploying a new release, and you need to test the new version extensively in the staging and production environments. You must minimize user and developer impact. What should you do?",
    "options": [
      "A. Deploy the new version of the service to the staging environment. Split the traffic, and allow 1% of traffic through to the latest version. Test the latest version. If the test passes, gradually roll out the latest version to the staging and production environments.",
      "B. Deploy the new version of the service to the staging environment. Split the traffic, and allow 50% of traffic through to the latest version. Test the latest version. If the test passes, send all traffic to the latest version. Repeat for the production environment.",
      "C. Deploy the new version of the service to the staging environment with a new-release tag without serving traffic. Test the new-release version. If the test passes, gradually roll out this tagged version. Repeat for the production environment.",
      "D. Deploy a new environment with the green tag to use as the staging environment. Deploy the new version of the service to the green environment and test the new version. If the tests pass, send all traffic to the green environment and delete the existing staging environment. Repeat for the production environment."
    ],
    "correct": 2,
    "explanation": "Deploy the new revision tagged with --no-traffic, test on its private URL, then gradually shift traffic — staging first, then prod — with users never touching an untested revision.",
    "discussion": [
      {
        "user": "activist",
        "text": "Answers A and B split traffic, but C has a gradual rollout which doesn't have instant rollback. D with the blue/green deployment has instant rollback with no impact to either users or developers. I believe the answer is D. (7 votes)"
      },
      {
        "user": "filipemotta",
        "text": "Selected Answer: C. This approach allows you to deploy and test the new version without impacting users, as no traffic is directed to the new version initially. After thorough testing in the staging environment, you can confidently roll out the new version to a small percentage of users in the production environment, gradually increasing it while monitoring performance and stability. This method offers a controlled and safe way to introduce changes. (4 votes)"
      },
      {
        "user": "nhiguchi",
        "text": "Selected Answer: A. I think A. need a canary to reduce the sphere of influence. (4 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: C. https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration#:~:text=A%20common%20use,the%20tagged%20revision. (3 votes)"
      },
      {
        "user": "khoukha",
        "text": "Selected Answer: C. Deploy it without serving a traffic. this approach is the optimal since we need to test it intensively. this will avoid the negative impact (3 votes)"
      },
      {
        "user": "ABZ10",
        "text": "Selected Answer: D. D should be it (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 90,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority A/D: Cloud Run revision tags let you deploy with no traffic and test the tagged URL directly; A exposes real callers to an untested version and D duplicates environments for no benefit.",
    "conceptSummary": "Zero-impact Cloud Run testing via tagged, no-traffic revisions.",
    "correctRationale": "Revision tags give each Cloud Run revision a stable URL that serves no production traffic until you shift it — so the team can test extensively at the tagged URL in staging, then repeat in production, and only then ramp traffic gradually. Option A exposes a 1% slice of real callers to an untested version; B fronts 50% before any testing; D duplicates entire environments for no benefit.",
    "optionRationales": [
      "Wrong: Splitting 1% of traffic to the untested latest version exposes real users and dependent apps immediately.",
      "Wrong: Half of traffic to an untested version is a huge blast radius, and it still tests on live traffic.",
      "Correct: A tagged revision with --no-traffic is privately testable, then rolled out gradually — no user impact until proven.",
      "Wrong: Duplicating the whole environment as 'green' wastes infrastructure to solve what revision tags solve natively."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 89,
    "topic": "Deployment Strategies",
    "difficulty": 1,
    "question": "You recently deployed your application in Google Kubernetes Engine (GKE) and now need to release a new version of the application. You need the ability to instantly roll back to the previous version of the application in case there are issues with the new version. Which deployment model should you use?",
    "options": [
      "A. Perform a rolling deployment, and test your new application after the deployment is complete.",
      "B. Perform A/B testing, and test your application periodically after the deployment is complete.",
      "C. Perform a canary deployment, and test your new application periodically after the new version is deployed.",
      "D. Perform a blue/green deployment, and test your new application after the deployment is complete."
    ],
    "correct": 3,
    "explanation": "Blue/green keeps the old version fully deployed so rollback is a traffic switch — effectively instant.",
    "discussion": [
      {
        "user": "PhuocT",
        "text": "Selected Answer: D. instantly roll back, so I think it's D (2 votes)"
      },
      {
        "user": "ABZ10",
        "text": "Selected Answer: D. D is correct (2 votes)"
      },
      {
        "user": "ManishKS",
        "text": "D is correct Answer (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: D. https://cloud.google.com/architecture/application-deployment-and-testing-strategies#key_benefits_3 (1 vote)"
      },
      {
        "user": "filipemotta",
        "text": "Selected Answer: D. his method involves deploying the new version of your application alongside the old version (two separate but identical environments: blue for the old version and green for the new one). You then switch traffic from blue to green. If any issues arise with the green environment (the new version), you can instantly route traffic back to the blue environment (the old version). This approach offers the fastest rollback mechanism as it merely involves a change in the traffic routing. (1 vote)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: D. D is correct. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 89,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Instant rollback via blue/green deployment.",
    "correctRationale": "Instant rollback requires the previous version to stay running — that is blue/green: flip traffic back to the blue environment. Rolling and canary replace pods progressively (rollback is a re-deployment), and A/B testing is for comparing variants, not release rollback.",
    "optionRationales": [
      "Wrong: A rolling deployment replaces pods gradually; rollback means rolling back the whole fleet — not instant.",
      "Wrong: A/B testing compares versions for experiments; it is not a rollback mechanism.",
      "Wrong: Canary sends a slice of traffic to the new version; stopping it helps only the canary cohort, and full rollback is still a redeploy.",
      "Correct: Blue/green keeps both versions live; moving traffic back to green is near-instant."
    ]
  },
  {
    "id": 88,
    "topic": "Performance & Cost",
    "difficulty": 2,
    "question": "You are configuring the frontend tier of an application deployed in Google Cloud. The frontend tier is hosted in nginx and deployed using a managed instance group with an Envoy-based external HTTP(S) load balancer in front. The application is deployed entirely within the europe-west2 region, and only serves users based in the United Kingdom. You need to choose the most cost-effective network tier and load balancing configuration. What should you use?",
    "options": [
      "A. Premium Tier with a global load balancer",
      "B. Premium Tier with a regional load balancer",
      "C. Standard Tier with a global load balancer",
      "D. Standard Tier with a regional load balancer"
    ],
    "correct": 3,
    "explanation": "Single-region UK service: Standard Tier plus a regional load balancer is the cheapest combination that still works.",
    "discussion": [
      {
        "user": "SunyaCat",
        "text": "Selected Answer: D. I think D is correct for saving cost and single region (7 votes)"
      },
      {
        "user": "ManishKS",
        "text": "D is correct Answer (4 votes)"
      },
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: D. D is the cheapest and would work in this scenario (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: D. D is correct. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 88,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Cheapest tier+LB combo for a single-region workload.",
    "correctRationale": "Everything lives in europe-west2 and serves only UK users — no need for Premium Tier's global anycast backbone or a global load balancer. Standard Tier plus a regional load balancer meets the requirement at the lowest price. Premium buys performance/scope you do not use; Standard cannot run a global external ALB anyway.",
    "optionRationales": [
      "Wrong: Premium Tier with a global LB pays for global scope this single-region app does not need.",
      "Wrong: Premium Tier still charges more for backbone egress the UK-only traffic does not exploit.",
      "Wrong: Standard Tier does not support the global external Application Load Balancer.",
      "Correct: Standard Tier plus a regional load balancer is the lowest-cost config that fits a single-region, single-country service."
    ]
  },
  {
    "id": 87,
    "topic": "Logging",
    "difficulty": 3,
    "question": "Your company has a Google Cloud resource hierarchy with folders for production, test, and development. Your cyber security team needs to review your company's Google Cloud security posture to accelerate security issue identification and resolution. You need to centralize the logs generated by Google Cloud services from all projects only inside your production folder to allow for alerting and near-real time analysis. What should you do?",
    "options": [
      "A. Enable the Workflows API and route all the logs to Cloud Logging.",
      "B. Create a central Cloud Monitoring workspace and attach all related projects.",
      "C. Create an aggregated log sink associated with the production folder that uses a Pub/Sub topic as the destination.",
      "D. Create an aggregated log sink associated with the production folder that uses a Cloud Logging bucket as the destination."
    ],
    "correct": 3,
    "explanation": "An aggregated folder sink into a central log bucket keeps the logs in Cloud Logging where alerting and near-real-time Log Analytics run on them.",
    "discussion": [
      {
        "user": "ReachTango73",
        "text": "D is correct as when you use buckets you can do log analysis (11 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: C. It clearly mentions here that \"Sinks to Cloud Storage are processed hourly while other destination types are processed in real time.\" https://cloud.google.com/logging/docs/export/configure_export_v2#:~:text=New%20log%20sinks%20to%20Cloud%20Storage%20buckets%20might%20take%20several%20hours%20to%20start%20routing%20logs.%20Sinks%20to%20Cloud%20Storage%20are%20processed%20hourly%20while%20other%20destination%20types%20are%20processed%20in%20real%20time. D is eliminated (4 votes)"
      },
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: C. I would vote C because from a security perspective it would be better to stream the logs to a SIEM or SOAR for near-real time analysis and alerting. A SIEM is not really mentioned here but streaming them to a bucket and analysing them from stackdriver would be nuts (4 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: C. C seems an to be correct. (4 votes)"
      },
      {
        "user": "activist",
        "text": "Answer C seems to be correct. https://cloudplatform.googleblog.com/2015/06/Real-Time-Log-Streaming-and-Analysis-with-Google-Cloud-Platform-Logentries.html (4 votes)"
      },
      {
        "user": "lelele2023",
        "text": "C is the answer: sink is the native feature of GCP to route logs and this excludes A and B. Also being asked to achieve near-real time analysis, and the pub-sub works better then a bucket. (4 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 87,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics' suggested C (community C 56% / D 44%): a Pub/Sub topic is only a transport needing a downstream consumer the question never mentions; a folder sink to a central log bucket actually centralizes the logs where Log Analytics and log-based alerts work on them in near real time.",
    "conceptSummary": "Centralizing folder logs into a log bucket for analysis and alerting.",
    "correctRationale": "Centralizing for alerting and near-real-time analysis is best served by keeping the logs inside Cloud Logging: an aggregated sink on the production folder feeding a central log bucket supports Log Analytics queries and log-based alerts directly. The ExamTopics key's Pub/Sub destination is just transport — it only centralizes once a downstream SIEM consumes it, and the question names none.",
    "optionRationales": [
      "Wrong: Workflows orchestrates services; it is not a log-centralization mechanism.",
      "Wrong: A monitoring workspace (metrics scope) aggregates metrics, not logs.",
      "Wrong: A Pub/Sub sink is only transport — without a named downstream consumer it does not itself centralize logs for analysis.",
      "Correct: A folder-scoped aggregated sink into a Cloud Logging bucket centralizes prod logs where alerting and Log Analytics run natively."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 86,
    "topic": "Logging",
    "difficulty": 1,
    "question": "Your organization wants to collect system logs that will be used to generate dashboards in Cloud Operations for their Google Cloud project. You need to configure all current and future Compute Engine instances to collect the system logs, and you must ensure that the Ops Agent remains up to date. What should you do?",
    "options": [
      "A. Use the gcloud CLI to install the Ops Agent on each VM listed in the Cloud Asset Inventory,",
      "B. Select all VMs with an Agent status of Not detected on the Cloud Operations VMs dashboard. Then select Install agents.",
      "C. Use the gcloud CLI to create an Agent Policy.",
      "D. Install the Ops Agent on the Compute Engine image by using a startup script"
    ],
    "correct": 2,
    "explanation": "An Agent Policy keeps the Ops Agent installed and up to date across all current and future matching VMs automatically.",
    "discussion": [
      {
        "user": "PrayasMohanty",
        "text": "I vote for C as agent must install in current and feature VMs. https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/managing-agent-policies (5 votes)"
      },
      {
        "user": "florian_cartron",
        "text": "Selected Answer: C. Answer C is the only one that can keep agents up to date, if automatic updates are set. (4 votes)"
      },
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: C. Only C will ensure the installation will be done in the future as well. (3 votes)"
      },
      {
        "user": "ManishKS",
        "text": "Option A suggests using the gcloud CLI to install the Ops Agent on each VM manually, which can be time-consuming and error-prone, especially when dealing with a large number of instances. option B is the most efficient and appropriate choice for deploying and ensuring the continued use of the Ops Agent on both existing and future Compute Engine instances in your Google Cloud project. (2 votes)"
      },
      {
        "user": "6a8c7ad",
        "text": "Definitely not C (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 86,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Fleet-wide agent lifecycle with an Ops Agent policy.",
    "correctRationale": "The two requirements — cover all current and future instances and keep the agent updated — are exactly what an Agent Policy does: it declaratively manages Ops Agent install/upgrade for a scope of VMs. Per-VM gcloud installs, dashboard clicks, and image-baked agents do not handle future VMs or ongoing updates.",
    "optionRationales": [
      "Wrong: Per-VM gcloud installs cover only what exists today and do not keep the agent updated.",
      "Wrong: Dashboard installs are one-shot manual fixes; they neither cover future VMs nor maintain versions.",
      "Correct: An Agent Policy continuously installs and updates the Ops Agent across the current and future fleet.",
      "Wrong: Baking the agent into the image misses existing VMs and does not keep the agent updated afterward."
    ]
  },
  {
    "id": 85,
    "topic": "SLOs & Error Budgets",
    "difficulty": 2,
    "question": "Your team is running microservices in Google Kubernetes Engine (GKE). You want to detect consumption of an error budget to protect customers and define release policies. What should you do?",
    "options": [
      "A. Create SLIs from metrics. Enable Alert Policies if the services do not pass.",
      "B. Use the metrics from Anthos Service Mesh to measure the health of the microservices.",
      "C. Create a SLO. Create an Alert Policy on select_slo_burn_rate.",
      "D. Create a SLO and configure uptime checks for your services. Enable Alert Policies if the services do not pass."
    ],
    "correct": 2,
    "explanation": "Error budget consumption is measured by alerting on the SLO's burn rate — select_slo_burn_rate in a Cloud Monitoring alert policy.",
    "discussion": [
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: C. I am voting for C we need to detect consumption of an error budget. This is what SLO burn rate is. (3 votes)"
      },
      {
        "user": "ManishKS",
        "text": "using metrics from Anthos Service Mesh, which can be helpful for monitoring, but it lacks the explicit focus on SLOs, uptime checks, and Alert Policies for managing error budgets and protecting customers. Correct Answer is D. Create a SLO and configure uptime checks for your services. Enable Alert Policies if the services do not pass. (3 votes)"
      },
      {
        "user": "thewalker",
        "text": "Selected Answer: C. The best answer is C. Create a SLO. Create an Alert Policy on select_slo_burn_rate. Here's why: SLOs (Service Level Objectives): SLOs are crucial for defining the acceptable performance levels of your microservices. They help you set clear targets for things like latency, availability, and error rates. Error Budget: An error budget is a defined amount of \"acceptable\" errors or performance degradation within a given time period. It allows for some flexibility while still ensuring overall service health. Alerting on Burn Rate: The select_slo_burn_rate metric in Cloud... (2 votes)"
      },
      {
        "user": "koo_kai",
        "text": "Selected Answer: D. https://cloud.google.com/service-mesh/docs/observability/alert-policy-slo (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: C. https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/alerting-on-budget-burn-rate#:~:text=The%20burn%2Drate%20metric%20is%20retrieved%20by%20the%20time%2Dseries%20selector%20select_slo_burn_rate.%20A%20burn%2Drate%20alerting%20policy%20notifies%20you%20when%20your%20error%20budget%20is%20consumed%20faster%20than%20a%20threshold%20you%20define%2C%20measured%20over%20the%20alert%27s%20compliance%20period. (1 vote)"
      },
      {
        "user": "filipemotta",
        "text": "Selected Answer: C. This approach involves defining specific SLOs for your services, which are quantitative measures of the desired reliability of a service. Once you have these SLOs, you can set up Alert Policies based on the rate at which your error budget is consumed (burn rate). (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 85,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority D picked uptime checks; uptime checks measure reachability, not error-budget consumption — burn-rate alerting on the SLO is the purpose-built mechanism.",
    "conceptSummary": "Burn-rate alerting on an SLO.",
    "correctRationale": "Detecting error-budget consumption as it happens is exactly what burn-rate alerting does: define the SLO, then alert when the consumption rate (select_slo_burn_rate) threatens the budget. Uptime checks measure reachability, not budget; SLIs alone are raw signals; mesh metrics describe health but not budget burn against an SLO.",
    "optionRationales": [
      "Wrong: SLIs plus threshold alerts fire on raw values, not on the rate at which the error budget is burning.",
      "Wrong: Mesh metrics measure service health but do not by themselves tie to an error-budget policy.",
      "Correct: An SLO plus a burn-rate alert policy is the purpose-built mechanism for detecting budget consumption.",
      "Wrong: Uptime checks probe reachability; they cannot express burn rate against an SLO."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 84,
    "topic": "Deployment Strategies",
    "difficulty": 2,
    "question": "Your organization has a containerized web application that runs on-premises. As part of the migration plan to Google Cloud, you need to select a deployment strategy and platform that meets the following acceptance criteria:\n1. The platform must be able to direct traffic from Android devices to an Android-specific microservice.\n2. The platform must allow for arbitrary percentage-based traffic splitting\n3. The deployment strategy must allow for continuous testing of multiple versions of any microservice. What should you do?",
    "options": [
      "A. Deploy the canary release of the application to Cloud Run. Use traffic splitting to direct 10% of user traffic to the canary release based on the revision tag.",
      "B. Deploy the canary release of the application to App Engine. Use traffic splitting to direct a subset of user traffic to the new version based on the IP address.",
      "C. Deploy the canary release of the application to Compute Engine. Use Anthos Service Mesh with Compute Engine to direct 10% of user traffic to the canary release by configuring the virtual service.",
      "D. Deploy the canary release to Google Kubernetes Engine with Anthos Service Mesh. Use traffic splitting to direct 10% of user traffic to the new version based on the user-agent header configured in the virtual service."
    ],
    "correct": 3,
    "explanation": "GKE + Anthos Service Mesh (now Cloud Service Mesh) virtual services can split arbitrary traffic percentages by header — e.g., user-agent for Android.",
    "discussion": [
      {
        "user": "ManishKS",
        "text": "Option D allows for continuous testing of multiple versions of microservices, meets the traffic splitting requirements, and provides the necessary flexibility for controlling traffic based on user-agent headers, making it the most suitable choice based on the specified acceptance criteria. (9 votes)"
      },
      {
        "user": "emauart",
        "text": "Selected Answer: D. D is correct (2 votes)"
      },
      {
        "user": "6a8c7ad",
        "text": "Selected Answer: B. Why not B? (1 vote)"
      },
      {
        "user": "samirzubair",
        "text": "OPtion D This option offers a comprehensive solution that aligns well with your criteria. Anthos Service Mesh, integrated with Google Kubernetes Engine (GKE), supports advanced traffic management capabilities, including the ability to perform traffic splitting based on HTTP headers. This would allow you to use the user-agent header to identify Android devices and direct traffic accordingly. Additionally, it supports arbitrary percentage-based traffic splitting and allows for the testing of multiple versions of a microservice, meeting the requirement for continuous testing. (1 vote)"
      },
      {
        "user": "filipemotta",
        "text": "Selected Answer: D. This option provides a powerful combination for microservices deployment. Google Kubernetes Engine offers a robust environment for containerized applications, and Anthos Service Mesh (built on Istio) enables sophisticated traffic management. You can configure traffic splitting and direct traffic based on headers (like user-agent for Android devices), which aligns perfectly with your requirements. (1 vote)"
      },
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: D. Anthos Service Mesh allows for traffic routing based on HTTP headers such as the user-agent, which can be used to direct traffic from Android devices to an Android-specific microservice. Anthos Service Mesh supports arbitrary percentage-based traffic splitting. Google Kubernetes Engine with Anthos Service Mesh allows for continuous testing of multiple versions of any microservice. You can deploy different versions of your microservices as separate Kubernetes deployments and use Anthos Service Mesh to control the traffic between them. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 84,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Header-based traffic splitting for microservice canary testing.",
    "correctRationale": "The criteria demand header-based routing (Android user-agent → Android microservice) plus arbitrary percentage splits and multi-version testing. Cloud Service Mesh (formerly Anthos Service Mesh) on GKE gives exactly this through virtual services. Cloud Run revision tags and App Engine IP-based splitting cannot match on request headers, and the mesh on plain Compute Engine does not manage per-microservice traffic.",
    "optionRationales": [
      "Wrong: Cloud Run splits by revision, not by request headers like user-agent, so Android targeting is impossible.",
      "Wrong: App Engine splits by IP/cookie, not by user-agent, and is not a service mesh for microservice versions.",
      "Wrong: A service mesh over Compute Engine VMs does not give per-microservice traffic control the way mesh-on-GKE does.",
      "Correct: Mesh virtual services on GKE match the user-agent header and split arbitrary percentages across microservice versions."
    ],
    "legacyNote": "Anthos Service Mesh is now Cloud Service Mesh."
  },
  {
    "id": 83,
    "topic": "CI/CD Pipelines",
    "difficulty": 2,
    "question": "Your organization uses a change advisory board (CAB) to approve all changes to an existing service. You want to revise this process to eliminate any negative impact on the software delivery performance. What should you do? (Choose two.)",
    "options": [
      "A. Replace the CAB with a senior manager to ensure continuous oversight from development to deployment.",
      "B. Let developers merge their own changes, but ensure that the team's deployment platform can roll back changes if any issues are discovered.",
      "C. Move to a peer-review based process for individual changes that is enforced at code check-in time and supported by automated tests.",
      "D. Batch changes into larger but less frequent software releases.",
      "E. Ensure that the team's development platform enables developers to get fast feedback on the impact of their changes."
    ],
    "correct": [
      2,
      4
    ],
    "explanation": "Replace heavyweight CAB sign-off with peer review at check-in plus fast developer feedback — the DORA-backed way to keep speed and quality.",
    "discussion": [
      {
        "user": "ManishKS",
        "text": "Answer should be C and E To revise the change approval process and eliminate any negative impact on software delivery performance, you should consider the following approaches: C. Move to a peer-review based process for individual changes that is enforced at code check-in time and supported by automated tests: Implementing a peer-review process ensures that changes are reviewed by team members, which can catch issues early in the development process. Automated tests can provide additional confidence in the quality of changes. This approach encourages collaboration and reduces the need for a... (5 votes)"
      },
      {
        "user": "nhiguchi",
        "text": "Selected Answer: CE. C and E (3 votes)"
      },
      {
        "user": "tuanuv1",
        "text": "C and E seems correct https://cloud.google.com/architecture/devops/devops-process-streamlining-change-approval (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: CE. https://dora.dev/devops-capabilities/process/streamlining-change-approval/#:~:text=Use%20peer%20review,well%20as%20defects (1 vote)"
      },
      {
        "user": "filipemotta",
        "text": "Selected Answer: BC. Regarding E, it is important, but it doesn't directly address the bottleneck caused by the CAB process. (1 vote)"
      },
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: CE. I would go for C E (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 83,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Killing CAB drag: peer review at check-in + fast feedback loops.",
    "correctRationale": "DORA research shows heavyweight external change boards slow delivery without improving stability. Peer review enforced at code check-in with automated tests (C) keeps the approval rigor while removing the wait, and a platform that gives developers fast feedback on their changes (E) catches issues early. Manager approval is still a gate, developer self-merge alone skips review, and bigger batches slow everything.",
    "optionRationales": [
      "Wrong: Substituting one external approver for another keeps the bottleneck.",
      "Wrong: Letting developers merge without review trades the CAB drag for quality risk; rollback ability does not prevent bad changes.",
      "Correct: Peer review enforced at check-in with automated tests preserves quality gates without the CAB delay.",
      "Wrong: Larger, less-frequent batches increase risk and lengthen lead time — the opposite of the goal.",
      "Correct: Fast feedback on change impact lets developers fix issues before they reach production review."
    ]
  },
  {
    "id": 82,
    "topic": "Incident Management",
    "difficulty": 1,
    "question": "Your company follows Site Reliability Engineering principles. You are writing a postmortem for an incident, triggered by a software change that severely affected users. You want to prevent severe incident from happening in the future. What should you do?",
    "options": [
      "A. Identify engineers responsible for the incident and escalate to the senior management.",
      "B. Ensure that test cases that catch errors of this type are run successfully before new software releases.",
      "C. Follow up with the employees who reviewed the changes and prescribe practices they should follow in the future.",
      "D. Design a policy that will require on-call teams to immediately call engineers and management to discuss a plan of action if an incident occurs."
    ],
    "correct": 1,
    "explanation": "Prevent the recurrence class: add and require passing tests that catch this error type before every release.",
    "discussion": [
      {
        "user": "ManishKS",
        "text": "Answer Should B (8 votes)"
      },
      {
        "user": "Andrei_Z",
        "text": "Selected Answer: B. B makes the most sense (2 votes)"
      },
      {
        "user": "nhiguchi",
        "text": "Selected Answer: B. Answer is B (2 votes)"
      },
      {
        "user": "mshafa",
        "text": "Selected Answer: B. B is correct. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 82,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Duplicate of question 40 — same scenario and answer.",
    "conceptSummary": "Release-gating tests as the postmortem prevention.",
    "correctRationale": "The outage came from a software change, so the postmortem's preventive action is ensuring tests that catch that error type run (and pass) before releases. Naming engineers, coaching reviewers, or a call-in policy address people/process around the incident rather than the defect class itself. This question duplicates question 40.",
    "optionRationales": [
      "Wrong: Escalating responsible engineers to management is blame-seeking and prevents nothing.",
      "Correct: Release-blocking test cases for this error class prevent the same failure shipping again.",
      "Wrong: Prescribing practices to reviewers addresses people, not the missing automated check.",
      "Wrong: A mandatory call during incidents is a response procedure, not a prevention."
    ]
  },
  {
    "id": 81,
    "topic": "SLOs & Error Budgets",
    "difficulty": 2,
    "question": "You support a service with a well-defined Service Level Objective (SLO). Over the previous 6 months, your service has consistently met its SLO and customer satisfaction has been consistently high. Most of your service's operations tasks are automated and few repetitive tasks occur frequently. You want to optimize the balance between reliability and deployment velocity while following site reliability engineering best practices. What should you do? (Choose two.)",
    "options": [
      "A. Make the service's SLO more strict.",
      "B. Increase the service's deployment velocity and/or risk.",
      "C. Shift engineering time to other services that need more reliability.",
      "D. Get the product team to prioritize reliability work over new features.",
      "E. Change the implementation of your Service Level Indicators (SLIs) to increase coverage."
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "Reliability comfortably ahead of target and toil already low → spend the surplus on velocity and redirect engineers to needier services.",
    "discussion": [
      {
        "user": "NXD",
        "text": "BC https://sre.google/workbook/implementing-slos/#slo-decision-matrix A: wrong – SLO is already well-defined, customer satisfaction is high. E: wrong – change SLI means how SLO, which is already well-defined. CD are valid, but the best option is C because current product is already quite reliable. (24 votes)"
      },
      {
        "user": "TNT87",
        "text": "Selected Answer: BC. These are the correct answers. Thank me later. All the best guys (6 votes)"
      },
      {
        "user": "zygomar",
        "text": "Selected Answer: BC. as NXD 's link shows (https://sre.google/workbook/implementing-slos/#slo-decision-matrix) answer is B C. See link. (4 votes)"
      },
      {
        "user": "zellck",
        "text": "Selected Answer: BC. BC is the answer. https://sre.google/workbook/implementing-slos/#slo-decision-matrix Choose to (a) relax release and deployment processes and increase velocity, or (b) step back from the engagement and focus engineering time on services that need more reliability. (3 votes)"
      },
      {
        "user": "Sekierer",
        "text": "Selected Answer: BC. B and C (3 votes)"
      },
      {
        "user": "TNT87",
        "text": "After perusing the SRE book... D, E Is correct, there is a question that is almost this very question but the wording is different (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 81,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Over-healthy SLO: shift effort to velocity and other services.",
    "correctRationale": "The service meets its SLO consistently with happy customers and little toil — a classic sign of over-investment in this service's reliability. SRE guidance says spend the margin: take on more deployment velocity/risk (B) and shift engineering time to services that need it more (C). A stricter SLO or reliability-over-features stance would increase spend on something already exceeding need.",
    "optionRationales": [
      "Wrong: A stricter SLO increases reliability work on a service already exceeding its goal.",
      "Correct: More deployment velocity/risk converts the surplus reliability margin into delivery speed.",
      "Correct: Moving engineering time to less-reliable services uses the surplus where it produces value.",
      "Wrong: Prioritizing reliability over features is the opposite of spending an unused error budget.",
      "Wrong: Broader SLI coverage adds measurement, not value, when the current SLO is already comfortably met."
    ]
  },
  {
    "id": 80,
    "topic": "SLOs & Error Budgets",
    "difficulty": 3,
    "question": "You support a user-facing web application. When analyzing the application's error budget over the previous six months, you notice that the application has never consumed more than 5% of its error budget in any given time window. You hold a Service Level Objective (SLO) review with business stakeholders and confirm that the SLO is set appropriately. You want your application's SLO to more closely reflect its observed reliability. What steps can you take to further that goal while balancing velocity, reliability, and business needs? (Choose two.)",
    "options": [
      "A. Add more serving capacity to all of your application's zones.",
      "B. Have more frequent or potentially risky application releases.",
      "C. Tighten the SLO match the application's observed reliability.",
      "D. Implement and measure additional Service Level Indicators (SLIs) for the application.",
      "E. Announce planned downtime to consume more error budget, and ensure that users are not depending on a tighter SLO."
    ],
    "correct": [
      1,
      4
    ],
    "explanation": "The SLO is right and barely used — spend the surplus budget on faster, riskier releases, and use planned downtime so users don't depend on reliability you never promised.",
    "discussion": [
      {
        "user": "Trony",
        "text": "I would go for B+D: -A: no, there's no reason to add capacity if we are barely scratching error budget; -B: everything seems fine, so it's ok to dare with more innovative/risky releases; -C: no, stakeholders said SLO is ok; -D: adding additional SLIs (and so SLOs) might be a way to reflect observer reliability more closely; -E: put the servers down for no reason is a no-no. (26 votes)"
      },
      {
        "user": "Sekierer",
        "text": "Selected Answer: DE. I vote for D+E if you read \"The Global Chubby Planned Outage\" https://sre.google/sre-book/service-level-objectives/ (13 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: BE. B - You can increase the frequency of your releases and take higher risks as you have never exceeded your error budget. E - Planned downtime to use some of your error budget will help to make sure end users don't get use a higher availability of your service. (7 votes)"
      },
      {
        "user": "[Removed]",
        "text": "D+E You want the application's SLO to more closely reflect it's observed reliability. The key here is error budget never goes over 5%. This means they can have additional downtime and still stay within their budget. E is correct as per Google SRE handbook (https://sre.google/sre-book/service-level-objectives/) 'You can avoid over-dependence by deliberately taking the system offline occasionally (Google's Chubby service introduced planned outages in response to being overly available)' D is a good answer because with more SLI's, this may more accurately reflect the system's reliability. A is... (5 votes)"
      },
      {
        "user": "JayDeng",
        "text": "B and E. When you only consume 5% of your error budget consistently it means that you can take more risk by releasing features more often (B) and/or bring down service to set user expectation close to SLO (and business has confirmed that this SLO is appropriate) (4 votes)"
      },
      {
        "user": "eks4x",
        "text": "Selected Answer: BE. B+E B because this if you constantly have a lot of spare error budgets it is an indication that you are not taking enough risk ie releasing new features. And you are ultimately depriving the users of new functionalities by being too cautious. E: Everyone agrees on E as it was mentioned in the SRE book as part of the The Global Chubby Planned Outage Re: why not D) The review indicated that the existing SLOs are good. So adding more SLIs not useful here plus does nothing to the user perceived reliability. (4 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 80,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics D,E (community D,E 57% / B,E 33%): the SLO is confirmed correct and nearly unused, so the goal is spending budget — risky releases and planned downtime. Adding SLIs does not move observed reliability toward the existing target.",
    "conceptSummary": "Spending an oversized error budget: more risk, planned downtime.",
    "correctRationale": "With the SLO confirmed correct and under 5% budget consumption every window, the service is effectively more reliable than anyone needs — the surplus is spent by shipping more often and taking more risk (B), and by announcing planned downtime (the SRE book's Chubby example) so users do not come to depend on unpromised reliability (E). Adding SLIs or tightening the SLO changes measurement rather than bringing observed reliability in line; extra capacity just adds cost.",
    "optionRationales": [
      "Wrong: More capacity raises cost and widens the already-excess reliability margin.",
      "Correct: Frequent or riskier releases trade surplus reliability for velocity — the intended use of an unspent error budget.",
      "Wrong: Tightening the SLO re-moves the target rather than aligning observed reliability to the confirmed goal.",
      "Wrong: Additional SLIs measure more things but do not bring observed reliability closer to the existing SLO.",
      "Correct: Announced planned downtime deliberately consumes budget and prevents users depending on a de facto tighter SLO."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 79,
    "topic": "Incident Management",
    "difficulty": 1,
    "question": "You support a service that recently had an outage. The outage was caused by a new release that exhausted the service memory resources. You rolled back the release successfully to mitigate the impact on users. You are now in charge of the post-mortem for the outage. You want to follow Site Reliability Engineering practices when developing the post-mortem. What should you do?",
    "options": [
      "A. Focus on developing new features rather than avoiding the outages from recurring.",
      "B. Focus on identifying the contributing causes of the incident rather than the individual responsible for the cause.",
      "C. Plan individual meetings with all the engineers involved. Determine who approved and pushed the new release to production.",
      "D. Use the Git history to find the related code commit. Prevent the engineer who made that commit from working on production services."
    ],
    "correct": 1,
    "explanation": "Blameless postmortems analyze contributing causes — process, system, and conditions — rather than hunting the responsible individual.",
    "discussion": [
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: B. B. Focus on identifying the contributing causes of the incident rather than the individual responsible for the cause. According to Site Reliability Engineering (SRE) practices, the goal of a post-mortem is to identify the underlying causes of the incident in order to take steps to prevent it from happening again in the future. This involves looking for patterns and issues in the system rather than looking for a specific person to blame. It's important to have a focus on learning and continuous improvement, rather than assigning blame. (3 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: B. Option B (2 votes)"
      },
      {
        "user": "dobby_elf",
        "text": "Selected Answer: B. B is correct BBB (2 votes)"
      },
      {
        "user": "WhyIronMan",
        "text": "Selected Answer: B. B) Makes sense (1 vote)"
      },
      {
        "user": "ssmb",
        "text": "B is the correct answer. (1 vote)"
      },
      {
        "user": "zellck",
        "text": "Selected Answer: B. B is the answer. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 79,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Blameless postmortem focus: contributing causes, not culprits.",
    "correctRationale": "SRE postmortem culture is blameless: the release exhausted memory because contributing factors (tests, limits, monitoring) let it through, and identifying those systemic causes is what prevents recurrence. Meetings to identify the approver or banning the committer are blame exercises; focusing on features ignores the incident.",
    "optionRationales": [
      "Wrong: Shifting to feature work ignores the outage's contributing causes.",
      "Correct: Identifying contributing causes rather than a culprit is the core blameless-postmortem practice.",
      "Wrong: Per-engineer meetings to find who approved the release is blame assignment, not analysis.",
      "Wrong: Excluding the committing engineer punishes an individual for a systemic failure."
    ]
  },
  {
    "id": 78,
    "topic": "Logging",
    "difficulty": 3,
    "question": "You are running an application on Compute Engine and collecting logs through Stackdriver. You discover that some personally identifiable information (PII) is leaking into certain log entry fields. You want to prevent these fields from being written in new log entries as quickly as possible. What should you do?",
    "options": [
      "A. Use the filter-record-transformer Fluentd filter plugin to remove the fields from the log entries in flight.",
      "B. Use the fluent-plugin-record-reformer Fluentd output plugin to remove the fields from the log entries in flight.",
      "C. Wait for the application developers to patch the application, and then verify that the log entries are no longer exposing PII.",
      "D. Stage log entries to Cloud Storage, and then trigger a Cloud Function to remove the fields and write the entries to Stackdriver via the Stackdriver Logging API."
    ],
    "correct": 0,
    "explanation": "Fluentd's built-in record_transformer filter strips the PII fields in flight — the fastest, supported way to keep them out of new entries.",
    "discussion": [
      {
        "user": "MF2C",
        "text": "reformer is Fluentd plugin to add or replace fields of a event record, so ans is A (11 votes)"
      },
      {
        "user": "not_thanos",
        "text": "Selected Answer: A. Seems both A and B will work. However i will go with A, since it is included in the fluentd core and does not require installing a new plugin \"The filter_record_transformer filter plugin mutates/transforms incoming event streams in a versatile manner. If there is a need to add/delete/modify events, this plugin is the first filter to try. It is included in the Fluentd's core.\" https://docs.fluentd.org/filter/record_transformer (6 votes)"
      },
      {
        "user": "ric79",
        "text": "It's B. https://cloud.google.com/logging/docs/agent/logging/configuration#cloud-fluentd-config: is filter_record_transformer not filter-record-transformer. fluent-plugin-record-reformer is the right name (4 votes)"
      },
      {
        "user": "mudot",
        "text": "Selected Answer: B. Appeared in 07/11/2022 exam keys : Option-A has the filter name wrong. It should be filter_record_transformer not filter-record-transformer (3 votes)"
      },
      {
        "user": "mudot",
        "text": "Selected Answer: A. filter_record_transformer enables you to: - Add new fields to log entries - Update fields in log entries - Delete fields in log entries The fluent-plugin-record-reformer output plugin provides functionality similar to the filter_record_transformer filter plugin, except that it also allows you to modify log tags. We dont need to modify the filters here .. hence A (3 votes)"
      },
      {
        "user": "MBA_1",
        "text": "Yes, its A and not B as fluent-plugin-google-cloud from https://cloud.google.com/logging/docs/agent/logging/configuration#cloud-fluentd-config Besides the list of default logs that the Logging agent streams by default, you can customize the Logging agent to send additional logs to Logging or to adjust agent settings by adding input configurations. The configuration definitions in these sections apply to the fluent-plugin-google-cloud output plugin only and specify how logs are transformed and ingested into Cloud Logging. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 78,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority B argued record_reformer, but it is an output plugin that re-emits events and is no longer the recommended mutation mechanism; the built-in record_transformer filter removes fields in flight.",
    "conceptSummary": "In-flight field removal with the record_transformer filter.",
    "correctRationale": "The fields must stop being written immediately. The Fluentd record_transformer filter (the 'filter-record-transformer' plugin named in A) mutates records in flight and removes fields — deployed at the agent, it works today without app changes. record_reformer is an older output plugin that re-emits events and is not the recommended mutation mechanism; waiting on a code patch is not 'as quickly as possible'; staging through Cloud Storage is needless plumbing.",
    "optionRationales": [
      "Correct: A record_transformer filter removes the fields in flight at the agent — immediate and supported.",
      "Wrong: record_reformer is an output plugin that re-emits modified events; it is the older, less-recommended way to mutate records.",
      "Wrong: Waiting for a developer patch leaves PII leaking in the meantime.",
      "Wrong: Routing entries through Cloud Storage and a Cloud Function is fragile plumbing that still lands PII outside Logging first."
    ],
    "legacyNote": "This is the legacy fluentd-based Logging agent; the current Ops Agent uses Fluent Bit processors to modify records.",
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 77,
    "topic": "Incident Management",
    "difficulty": 2,
    "question": "Your development team has created a new version of their service's API. You need to deploy the new versions of the API with the least disruption to third-party developers and end users of third-party installed applications. What should you do?",
    "options": [
      "A. Introduce the new version of the API. Announce deprecation of the old version of the API. Deprecate the old version of the API. Contact remaining users of the old API. Provide best effort support to users of the old API. Turn down the old version of the API.",
      "B. Announce deprecation of the old version of the API. Introduce the new version of the API. Contact remaining users on the old API. Deprecate the old version of the API. Turn down the old version of the API. Provide best effort support to users of the old API.",
      "C. Announce deprecation of the old version of the API. Contact remaining users on the old API. Introduce the new version of the API. Deprecate the old version of the API. Provide best effort support to users of the old API. Turn down the old version of the API.",
      "D. Introduce the new version of the API. Contact remaining users of the old API. Announce deprecation of the old version of the API. Deprecate the old version of the API. Turn down the old version of the API. Provide best effort support to users of the old API."
    ],
    "correct": 0,
    "explanation": "Ship the new version first, then announce deprecation, deprecate, contact remaining users, offer best-effort support, and finally turn down the old API.",
    "discussion": [
      {
        "user": "Dreamingjin",
        "text": "A. Introduce new API ahead (17 votes)"
      },
      {
        "user": "KyubiBlaze",
        "text": "Selected Answer: A. Let's start with Eliminating, as I see a lot of you are confused here. You cannot deprecate or announce depreciation before introducing the newer version. This easily eliminates B and C options. Now between A and D, A fully follows the pattern of API deprecation. Deprecate, but have not stopped yet, trying to provide support till it is totally closed. No support after that. Go with A. Hope this helps all. (13 votes)"
      },
      {
        "user": "TNT87",
        "text": "Ans B https://httptoolkit.tech/blog/how-to-turn-off-your-old-apis/ (4 votes)"
      },
      {
        "user": "Wwhite44",
        "text": "It is not possible announce deprecation without introduce a new version, so B and C are not good. After new version introduction you cannot contact remaining old version user, you must before announce deprecation, so D is not good. My opinion, A is good (4 votes)"
      },
      {
        "user": "MF2C",
        "text": "https://cloud.google.com/migrate/compute-engine/support/lifecycle B is correct, announce must be first, best effort support to the last because after API sunset, no more patch to be released to support only based on best effort (4 votes)"
      },
      {
        "user": "Biden",
        "text": "A - Incorrect - No use contacting the users of the old API after depreciating B - Correct - since users are contacted before depreciation C & D: Sequence doesnt make sense (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 77,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "API version lifecycle ordering: introduce → deprecate → sunset.",
    "correctRationale": "The least-disruptive sequence introduces the new API first (users have somewhere to go), then announces deprecation, deprecates the old version, contacts remaining users, gives best-effort support, and finally turns it off. Announcing deprecation before the replacement exists leaves users with no migration target.",
    "optionRationales": [
      "Correct: New version ships first, then the deprecation clock runs — users always have a supported path.",
      "Wrong: Deprecating before the new version exists warns users away with nothing to move to.",
      "Wrong: Contacting users before the new API exists forces them to wait for a migration target.",
      "Wrong: Contacting old-API users before announcing deprecation scrambles the communication order."
    ]
  },
  {
    "id": 76,
    "topic": "Incident Management",
    "difficulty": 1,
    "question": "You are creating and assigning action items in a postmortem for an outage. The outage is over, but you need to address the root causes. You want to ensure that your team handles the action items quickly and efficiently. How should you assign owners and collaborators to action items?",
    "options": [
      "A. Assign one owner for each action item and any necessary collaborators.",
      "B. Assign multiple owners for each item to guarantee that the team addresses items quickly.",
      "C. Assign collaborators but no individual owners to the items to keep the postmortem blameless.",
      "D. Assign the team lead as the owner for all action items because they are in charge of the SRE team."
    ],
    "correct": 0,
    "explanation": "Exactly one owner per action item — shared ownership is how postmortem follow-ups die.",
    "discussion": [
      {
        "user": "Trony",
        "text": "A is correct. Each action item should have one owner. (13 votes)"
      },
      {
        "user": "TNT87",
        "text": "The fact that the the question STRESSES that the outage is OVER ust give you a clue. Check what google SRE book says Missing ownership Declaring official ownership results in accountability, which leads to action. Our example postmortem contains several examples of missing ownership: The postmortem lists four owners. Ideally, an owner is a single point of contact who is responsible for the postmortem, follow-up, and completion. The Action Items section has little or no ownership for its entries. Actions items without clear owners are less likely to be resolved. It's better to have a single... (4 votes)"
      },
      {
        "user": "job_search83",
        "text": "C, https://sre.google/sre-book/postmortem-culture/ (4 votes)"
      },
      {
        "user": "taqihurr",
        "text": "Selected Answer: A. A. Assign one owner for each action item and any necessary collaborators. It is important to have a clear ownership for each action item, so that there is no confusion about who is responsible for the task and it will be easier to track the progress and follow up if there is any delay. The owner should also be given the necessary authority and resources to carry out the task. The necessary collaborators should also be assigned to support the owner in completing the task efficiently. (2 votes)"
      },
      {
        "user": "zygomar",
        "text": "Selected Answer: A. TNT87 explains it well \"Actions items without clear owners are less likely to be resolved. It's better to have a single owner and multiple collaborators.\" (2 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: A. option A (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 76,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Action-item ownership: single accountable owner each.",
    "correctRationale": "Postmortem action items get done when each has one accountable owner (collaborators optional). Multiple owners diffuse responsibility, no owners means nobody is on the hook, and making the team lead own everything creates a bottleneck and detaches work from the people closest to it.",
    "optionRationales": [
      "Correct: One owner per item plus needed collaborators keeps accountability clear and work distributed.",
      "Wrong: Multiple owners mean no single person is accountable — items stall.",
      "Wrong: 'Blameless' applies to people, not to follow-through; ownerless items never get done.",
      "Wrong: Routing every item through the team lead bottlenecks follow-up and misassigns work."
    ]
  },
  {
    "id": 75,
    "topic": "Troubleshooting & APM",
    "difficulty": 1,
    "question": "You have an application running in Google Kubernetes Engine. The application invokes multiple services per request but responds too slowly. You need to identify which downstream service or services are causing the delay. What should you do?",
    "options": [
      "A. Analyze VPC flow logs along the path of the request.",
      "B. Investigate the Liveness and Readiness probes for each service.",
      "C. Create a Dataflow pipeline to analyze service metrics in real time.",
      "D. Use a distributed tracing framework such as OpenTelemetry or Stackdriver Trace."
    ],
    "correct": 3,
    "explanation": "Distributed tracing (Cloud Trace / OpenTelemetry) decomposes a request's time across the downstream services to find the slow one.",
    "discussion": [
      {
        "user": "job_search83",
        "text": "D, opentelemetry (22 votes)"
      },
      {
        "user": "junn8",
        "text": "Selected Answer: D. This is the major usecase for Cloud Trace (9 votes)"
      },
      {
        "user": "maddy94",
        "text": "Selected Answer: D. D is correct (3 votes)"
      },
      {
        "user": "cyrus86",
        "text": "Selected Answer: C. Correct answer is C. Check this link - https://cloud.google.com/architecture/processing-logs-at-scale-using-dataflow?hl=en D cannot be the answer because Strackdriver tracing is useful in troubleshooting a single application ( providing a lot of information). Here ques is about multiple services in the downstream. Read the ques carefully. (3 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: D. D. Use a distributed tracing framework such as OpenTelemetry or Stackdriver Trace. Distributed tracing allows you to trace the path of a request as it travels through multiple services and identify where delays may be occurring. This can provide detailed information about the request and response timings for each service, making it easier to pinpoint which services are causing delays in your application. OpenTelemetry and Stackdriver Trace are both available on GCP, and provide easy integration with Kubernetes and other GCP services. (2 votes)"
      },
      {
        "user": "zellck",
        "text": "Selected Answer: D. D is the answer. https://cloud.google.com/trace/docs/overview Cloud Trace, a distributed tracing system for Google Cloud, helps you understand how long it takes your application to handle incoming requests from users or other applications, and how long it takes to complete operations like RPC calls performed when handling the requests. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 75,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Finding the slow downstream service with distributed tracing.",
    "correctRationale": "A request fans out to multiple services and is slow overall — that is precisely what distributed tracing answers: each span records a downstream call's latency so the culprit service stands out. Flow logs show packets, not service latency; probes show health, not speed; a Dataflow build is heavy custom machinery for a solved problem.",
    "optionRationales": [
      "Wrong: VPC flow logs show network-level connections, not per-service application latency within a request.",
      "Wrong: Liveness/readiness probes say whether a service is up, not how much request time it consumes.",
      "Wrong: A custom Dataflow pipeline is a large engineering project for something tracing gives for free.",
      "Correct: A distributed tracing framework breaks each request into per-service spans, exposing the slow downstream service."
    ],
    "legacyNote": "Stackdriver Trace is now Cloud Trace; OpenTelemetry is the current instrumentation standard."
  },
  {
    "id": 74,
    "topic": "SLOs & Error Budgets",
    "difficulty": 1,
    "question": "You are responsible for the reliability of a high-volume enterprise application. A large number of users report that an important subset of the application's functionality — a data-intensive reporting feature — is consistently failing with an HTTP 500 error. When you investigate your application's dashboards, you notice a strong correlation between the failures and a metric that represents the size of an internal queue used for generating reports. You trace the failures to a reporting backend that is experiencing high I/O wait times. You quickly fix the issue by resizing the backend's persistent disk (PD). Now you need to create an availability Service Level Indicator (SLI) for the report generation feature. How would you define it?",
    "options": [
      "A. As the I/O wait times aggregated across all report generation backends",
      "B. As the proportion of report generation requests that result in a successful response",
      "C. As the application's report generation queue size compared to a known-good threshold",
      "D. As the reporting backend PD throughout capacity compared to a known-good threshold"
    ],
    "correct": 1,
    "explanation": "Availability SLI = successful report-generation responses over total requests — measured at the user-visible boundary, not the backend's internals.",
    "discussion": [
      {
        "user": "NXD",
        "text": "The question is: \"create an availability SLI for the report generation feature.\" => availability. B is correct. Others aren't availability SLI. (20 votes)"
      },
      {
        "user": "Shasha1",
        "text": "B is correct, availability = good time/ total time. (7 votes)"
      },
      {
        "user": "paul223344",
        "text": "Answer : B. the proportion of report generation requests that result in a successful response Question: create an AVAILABILITY SLI for the report generation feature According to SRE Workbook, one of potential SLI is as below: * Type of service: Request-driven * Type of SLI: Availability * Description: The proportion of requests that resulted in a successful response. https://sre.google/workbook/implementing-slos/ (4 votes)"
      },
      {
        "user": "KyubiBlaze",
        "text": "Eliminate A, Eliminate C and D. SLI are always based on facts, not on KNOWN GOOD Answer B : good/total (3 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: B. option B (2 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: B. B. As the proportion of report generation requests that result in a successful response is a valid availability Service Level Indicator (SLI) for the report generation feature. This indicator measures the percentage of requests for report generation that are successfully completed, and it is an indicator of the service availability. This SLI provides a clear and measurable way to track the availability of the report generation feature. It is a simple and easy to understand metric, that it can be easily monitored and reported. It can be used to track the performance of the... (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 74,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Availability SLI for one feature: good responses / total requests.",
    "correctRationale": "An availability SLI for the reporting feature is the proportion of its requests that return success — measured where the user sees the failure (the HTTP 500s). I/O wait, queue size, and PD throughput are useful diagnostic metrics that caused this incident, but they are internal signals, not the SLI of whether the feature is available to users.",
    "optionRationales": [
      "Wrong: I/O wait was this incident's cause; SLIs measure the user-facing result, not one backend symptom.",
      "Correct: Successful report requests over total report requests is the direct, user-facing availability SLI.",
      "Wrong: Queue size is a diagnostic proxy that happened to correlate here; it is not the definition of availability.",
      "Wrong: PD throughput capacity is infrastructure health, not whether users' requests succeed."
    ]
  },
  {
    "id": 73,
    "topic": "Deployment Strategies",
    "difficulty": 2,
    "question": "You are ready to deploy a new feature of a web-based application to production. You want to use Google Kubernetes Engine (GKE) to perform a phased rollout to half of the web server pods. What should you do?",
    "options": [
      "A. Use a partitioned rolling update.",
      "B. Use Node taints with NoExecute.",
      "C. Use a replica set in the deployment specification.",
      "D. Use a stateful set with parallel pod management policy."
    ],
    "correct": 0,
    "explanation": "A partitioned rolling update progresses a Deployment to a bounded fraction of Pods — exactly a phased rollout to half the pods.",
    "discussion": [
      {
        "user": "TNT87",
        "text": "I do agree to A as the answer. (12 votes)"
      },
      {
        "user": "zellck",
        "text": "Selected Answer: A. A is the answer. https://cloud.google.com/kubernetes-engine/docs/how-to/updating-apps#partitioning_a_rollingupdate Partitioning is useful if you want to stage an update, roll out a canary, or perform a phased roll out. (4 votes)"
      },
      {
        "user": "ramzez4815",
        "text": "Selected Answer: A. A is the clear answer (3 votes)"
      },
      {
        "user": "helg",
        "text": "A - the question is incomplete ! Nothing shows that we are using statefulsets .. (3 votes)"
      },
      {
        "user": "bob_builder",
        "text": "A => https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#partitions (3 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: A. option A (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 73,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Phased rollout with a partitioned rolling update.",
    "correctRationale": "Deployments' rolling update strategy accepts a partition parameter that caps how many Pods run the new version — giving a built-in phased rollout to (say) half the pods while the rest stay on the old version. Taints, replica sets, and StatefulSets do not express partial rollouts for stateless web pods.",
    "optionRationales": [
      "Correct: A partitioned rolling update natively rolls the Deployment out to a bounded fraction of Pods.",
      "Wrong: NoExecute taints evict pods from nodes; they are for node maintenance, not staged releases.",
      "Wrong: A ReplicaSet alone provides pod counts, not a controlled rollout split between versions.",
      "Wrong: StatefulSet parallel pod management controls ordering/identity for stateful pods, not phased rollout percentage for a web tier."
    ]
  },
  {
    "id": 72,
    "topic": "Incident Management",
    "difficulty": 1,
    "question": "You are writing a postmortem for an incident that severely affected users. You want to prevent similar incidents in the future. Which two of the following sections should you include in the postmortem? (Choose two.)",
    "options": [
      "A. An explanation of the root cause of the incident.",
      "B. A list of employees responsible for causing the incident",
      "C. A list of action items to prevent a recurrence of the incident",
      "D. Your opinion of the incident's severity compared to past incidents",
      "E. Copies of the design documents for all the services impacted by the incident"
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "A blameless postmortem needs the root cause and the action items that prevent recurrence.",
    "discussion": [
      {
        "user": "MF2C",
        "text": "A n C are correct (5 votes)"
      },
      {
        "user": "job_search83",
        "text": "A,C explanation + list of actions to prevent in the future (4 votes)"
      },
      {
        "user": "cyrus86",
        "text": "Selected Answer: AC. For a postmortem to be truly blameless, it must focus on identifying the contributing causes of the incident without indicting any individual or team for bad or inappropriate behavior. (3 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: AC. A. An explanation of the root cause of the incident. C. A list of action items to prevent a recurrence of the incident. (2 votes)"
      },
      {
        "user": "zellck",
        "text": "Selected Answer: AC. AC is the answer. (2 votes)"
      },
      {
        "user": "KyubiBlaze",
        "text": "Selected Answer: AC. Why it occurred? and How to avoid? Never choose an answer that blames a human. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 72,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Core postmortem sections: root cause and action items.",
    "correctRationale": "To prevent a repeat, the postmortem must explain the root cause (so the fix targets the real problem) and list concrete action items with owners (so prevention actually happens). Naming responsible employees violates blameless culture; severity opinions and design docs are not prevention mechanisms.",
    "optionRationales": [
      "Correct: Explaining the root cause is essential for targeting preventive work.",
      "Wrong: Listing responsible employees is blame-seeking and discouraged in SRE postmortems.",
      "Correct: Action items are the postmortem's mechanism for preventing recurrence.",
      "Wrong: A severity comparison is descriptive, not preventive.",
      "Wrong: Attaching design docs does not address what went wrong or what to change."
    ]
  },
  {
    "id": 71,
    "topic": "Incident Management",
    "difficulty": 1,
    "question": "You support a popular mobile game application deployed on Google Kubernetes Engine (GKE) across several Google Cloud regions. Each region has multiple Kubernetes clusters. You receive a report that none of the users in a specific region can connect to the application. You want to resolve the incident while following Site Reliability Engineering practices. What should you do first?",
    "options": [
      "A. Reroute the user traffic from the affected region to other regions that don't report issues.",
      "B. Use Stackdriver Monitoring to check for a spike in CPU or memory usage for the affected region.",
      "C. Add an extra node pool that consists of high memory and high CPU machine type instances to the cluster.",
      "D. Use Stackdriver Logging to filter on the clusters in the affected region, and inspect error messages in the logs."
    ],
    "correct": 0,
    "explanation": "Reroute traffic away from the failed region first — mitigate user impact before diagnosing cause.",
    "discussion": [
      {
        "user": "job_search83",
        "text": "A, reroute trafic to unblock access to site. (16 votes)"
      },
      {
        "user": "cyrus86",
        "text": "Selected Answer: A. Google always aims to first stop the impact of an incident, and then find the root cause (unless the root cause just happens to be identified early on). (4 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: A. My answer would be option A, to reroute user traffic from the affected region to other regions that don't report issues, in order to immediately resolve the problem for users and minimize impact, and then use option D, Stackdriver Logging, to investigate the root cause of the issue. This approach aligns with SRE best practices of resolving incidents quickly and then conducting a post-mortem analysis to prevent similar incidents from happening in the future. (3 votes)"
      },
      {
        "user": "MF2C",
        "text": "A - resume service first (3 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: A. option A (2 votes)"
      },
      {
        "user": "KyubiBlaze",
        "text": "Selected Answer: A. Issue is that one region is not serving requests. First thing to resolve is make the application responsive to users as soon as possible affected by this issue. Look into the error logs later. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 71,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Regional outage: shift traffic to healthy regions first.",
    "correctRationale": "An entire region cannot connect — this is a user-impact emergency, and SRE practice is mitigate first, diagnose after. Steering traffic to healthy regions restores service immediately. Checking metrics, adding capacity, or reading logs are diagnostic steps to do after users are back up.",
    "optionRationales": [
      "Correct: Rerouting to healthy regions restores connectivity immediately — the fastest mitigation.",
      "Wrong: Checking CPU/memory is diagnosis; users remain disconnected while you look.",
      "Wrong: Adding a node pool does not help if the failure is regional connectivity, and it is slow.",
      "Wrong: Log filtering is diagnostic; it does not restore service."
    ]
  },
  {
    "id": 70,
    "topic": "Supply Chain Security",
    "difficulty": 2,
    "question": "You use Cloud Build to build and deploy your application. You want to securely incorporate database credentials and other application secrets into the build pipeline. You also want to minimize the development effort. What should you do?",
    "options": [
      "A. Create a Cloud Storage bucket and use the built-in encryption at rest. Store the secrets in the bucket and grant Cloud Build access to the bucket.",
      "B. Encrypt the secrets and store them in the application repository. Store a decryption key in a separate repository and grant Cloud Build access to the repository.",
      "C. Use client-side encryption to encrypt the secrets and store them in a Cloud Storage bucket. Store a decryption key in the bucket and grant Cloud Build access to the bucket.",
      "D. Use Cloud Key Management Service (Cloud KMS) to encrypt the secrets and include them in your Cloud Build deployment configuration. Grant Cloud Build access to the KeyRing."
    ],
    "correct": 3,
    "explanation": "Encrypt secrets with Cloud KMS, embed the ciphertext in cloudbuild.yaml, and grant the build service account key access — minimal code, no plaintext at rest.",
    "discussion": [
      {
        "user": "zellck",
        "text": "Selected Answer: D. D is the answer. (2 votes)"
      },
      {
        "user": "ssmb",
        "text": "Answer should be D in this case. (2 votes)"
      },
      {
        "user": "FunkyB",
        "text": "Ans: D Using encrypted credentials from Cloud KMS https://cloud.google.com/build/docs/securing-builds/use-encrypted-credentials (2 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: D. option D (1 vote)"
      },
      {
        "user": "maxdanny",
        "text": "Selected Answer: D. https://cloud.google.com/build/docs/securing-builds/use-encrypted-credentials#configuring_builds_to_use_encrypted_data (1 vote)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: D. D. Use Cloud Key Management Service (Cloud KMS) to encrypt the secrets and include them in your Cloud Build deployment configuration. Grant Cloud Build access to the KeyRing. This option allows you to use Google-managed encryption and access controls, and it also minimizes the development effort required to securely incorporate the secrets into the build pipeline. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 70,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Secrets in Cloud Build via KMS-encrypted values in the build config.",
    "correctRationale": "The pre-Secret-Manager pattern this question targets is KMS-encrypted secrets declared in the Cloud Build configuration, with the build service account granted decrypt access on the key ring — no plaintext in the repo or bucket, minimal development effort. Plain buckets or split-repo keys scatter custody; storing the decryption key next to the ciphertext defeats encryption.",
    "optionRationales": [
      "Wrong: At-rest bucket encryption alone means anyone with bucket access reads the secrets, and rotation/decryption handling is on you.",
      "Wrong: A separate-repo decryption key still puts ciphertext in source control and splits custody awkwardly.",
      "Wrong: Storing the decryption key in the same bucket as the ciphertext makes the encryption meaningless.",
      "Correct: KMS-encrypted secrets in the build config with IAM-scoped decrypt access keeps secrets safe and requires almost no code."
    ],
    "legacyNote": "Cloud Build now integrates natively with Secret Manager via availableSecrets — the recommended approach today; the KMS-in-config pattern is the older mechanism."
  },
  {
    "id": 69,
    "topic": "Performance & Cost",
    "difficulty": 1,
    "question": "You manage several production systems that run on Compute Engine in the same Google Cloud Platform (GCP) project. Each system has its own set of dedicated Compute Engine instances. You want to know how must it costs to run each of the systems. What should you do?",
    "options": [
      "A. In the Google Cloud Platform Console, use the Cost Breakdown section to visualize the costs per system.",
      "B. Assign all instances a label specific to the system they run. Configure BigQuery billing export and query costs per label.",
      "C. Enrich all instances with metadata specific to the system they run. Configure Stackdriver Logging to export to BigQuery, and query costs based on the metadata.",
      "D. Name each virtual machine (VM) after the system it runs. Set up a usage report export to a Cloud Storage bucket. Configure the bucket as a source in BigQuery to query costs based on VM name."
    ],
    "correct": 1,
    "explanation": "Label instances per system and query the BigQuery billing export by label — the standard cost-attribution method.",
    "discussion": [
      {
        "user": "TNT87",
        "text": "https://cloud.google.com/billing/docs/how-to/export-data-bigquery; B (14 votes)"
      },
      {
        "user": "Manh",
        "text": "B. U NEED TO ADD LABELS TO INSTANCE FOR COST visibility (4 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: B. option B (2 votes)"
      },
      {
        "user": "maxdanny",
        "text": "Selected Answer: B. B is correct, it is the fastest solution and allows you to group by label (2 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: B. B. Assign all instances a label specific to the system they run. Configure BigQuery billing export and query costs per label. is the correct answer. Using labels to tag instances with the specific system they run allows you to easily filter and query costs by system in BigQuery. This allows you to see the costs associated with each system and make informed decisions about cost optimization. (2 votes)"
      },
      {
        "user": "zellck",
        "text": "Selected Answer: B. B is the answer. https://cloud.google.com/billing/docs/how-to/bq-examples#query-with-labels (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 69,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Per-system cost breakdown via labels + billing export.",
    "correctRationale": "GCP billing export to BigQuery carries resource labels, so tagging each instance with its system label lets a simple query report cost per system. The console cost breakdown does not segment by your arbitrary grouping, metadata is not in billing export, and usage-report-by-VM-name is a fragile naming hack.",
    "optionRationales": [
      "Wrong: The console cost breakdown cannot group costs by your custom per-system boundary.",
      "Correct: Labels ride through the BigQuery billing export, giving an exact per-system cost query.",
      "Wrong: Instance metadata does not appear in billing data; a Logging export records logs, not billing rows.",
      "Wrong: Encoding the system in VM names and parsing usage reports is brittle compared to labels + billing export."
    ]
  },
  {
    "id": 68,
    "topic": "CI/CD Pipelines",
    "difficulty": 1,
    "question": "Some of your production services are running in Google Kubernetes Engine (GKE) in the eu-west-1 region. Your build system runs in the us-west-1 region. You want to push the container images from your build system to a scalable registry to maximize the bandwidth for transferring the images to the cluster. What should you do?",
    "options": [
      "A. Push the images to Google Container Registry (GCR) using the gcr.io hostname.",
      "B. Push the images to Google Container Registry (GCR) using the us.gcr.io hostname.",
      "C. Push the images to Google Container Registry (GCR) using the eu.gcr.io hostname.",
      "D. Push the images to a private image registry running on a Compute Engine instance in the eu-west-1 region."
    ],
    "correct": 2,
    "explanation": "Push to eu.gcr.io so images live in the European multi-region close to the eu-west-1 cluster, maximizing pull bandwidth.",
    "discussion": [
      {
        "user": "Nik22",
        "text": "To maximize the bandwidth for transferring the images to the cluster, one needs the the registry to be closer to the production or system where it needs to be deployed. I would go with C, since the production system is in Europe. (18 votes)"
      },
      {
        "user": "mudot",
        "text": "Appeard in 7/11/2022 exam the answers were different in the exam. they are like a) us-docker.pkg.dev , b)europe-docker.pkg.dev c)europe-west1-docker.dev.pkg 4)private registry. answer : europe-docker.pkg.dev (4 votes)"
      },
      {
        "user": "MBA_1",
        "text": "It's C - because of GDPR compliance. Hostname Storage location gcr.io Stores images in data centers in the United States asia.gcr.io Stores images in data centers in Asia eu.gcr.io Stores images in data centers within member states of the European Union us.gcr.io Stores images in data centers in the United States (4 votes)"
      },
      {
        "user": "zellck",
        "text": "Selected Answer: C. C is the answer. https://cloud.google.com/container-registry/docs/pushing-and-pulling#add-registry - eu.gcr.io -> Stores images in data centers within member states of the European Union (3 votes)"
      },
      {
        "user": "giammydell",
        "text": "C could be correct, but also D is nearer because in the same zone. A and B are are both in US (3 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: C. C. Pushing the images to Google Container Registry (GCR) using the eu.gcr.io hostname will allow the images to be transferred to the GKE cluster in the eu-west-1 region with the best possible network performance. This will minimize the latency when the cluster pulls the images from the registry, maximizing the bandwidth for transferring the images to the cluster. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 68,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Co-locating the registry with the cluster region.",
    "correctRationale": "Pull bandwidth is best when the registry is geographically near the cluster. The GKE cluster is in Europe (eu-west-1), so the eu.gcr.io (European multi-region) GCR hostname stores images closest to it. gcr.io is US-default, us.gcr.io is US, and a self-hosted VM registry is neither managed nor scalable.",
    "optionRationales": [
      "Wrong: gcr.io defaults to storing in the US — far from the European cluster.",
      "Wrong: us.gcr.io pins storage to the US multi-region, the wrong side of the Atlantic.",
      "Correct: eu.gcr.io stores images in Europe, nearest the eu-west-1 cluster for fastest pulls.",
      "Wrong: A private registry on one VM is not the 'scalable registry' the question asks for and adds ops burden."
    ],
    "legacyNote": "Container Registry is deprecated; the modern equivalent is a regional or multi-regional Artifact Registry Docker repo in Europe (e.g. europe-docker.pkg.dev)."
  },
  {
    "id": 67,
    "topic": "Org & IAM",
    "difficulty": 2,
    "question": "Your company is developing applications that are deployed on Google Kubernetes Engine (GKE). Each team manages a different application. You need to create the development and production environments for each team, while minimizing costs. Different teams should not be able to access other teams' environments. What should you do?",
    "options": [
      "A. Create one GCP Project per team. In each project, create a cluster for Development and one for Production. Grant the teams IAM access to their respective clusters.",
      "B. Create one GCP Project per team. In each project, create a cluster with a Kubernetes namespace for Development and one for Production. Grant the teams IAM access to their respective clusters.",
      "C. Create a Development and a Production GKE cluster in separate projects. In each cluster, create a Kubernetes namespace per team, and then configure Identity Aware Proxy so that each team can only access its own namespace.",
      "D. Create a Development and a Production GKE cluster in separate projects. In each cluster, create a Kubernetes namespace per team, and then configure Kubernetes Role-based access control (RBAC) so that each team can only access its own namespace."
    ],
    "correct": 3,
    "explanation": "Two clusters (dev/prod) with a namespace per team and RBAC gives isolation at the lowest cluster count.",
    "discussion": [
      {
        "user": "TNT87",
        "text": "https://cloud.google.com/architecture/prep-kubernetes-engine-for-prod#roles_and_groups Ans D (16 votes)"
      },
      {
        "user": "CloudKida",
        "text": "Selected Answer: D. GKE has two access control systems: Identity and Access Management (IAM) and role-based access control (RBAC). IAM is Google Cloud's access control system for managing authentication and authorization for Google Cloud resources. You use IAM to grant users access to GKE and Kubernetes resources. RBAC is built into Kubernetes and grants granular permissions for specific resources and operations within your clusters. (3 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: D. D - Different project for Prod and UAT. RBAC to access each app team GKE area. (3 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: D. Option D (2 votes)"
      },
      {
        "user": "zellck",
        "text": "Selected Answer: D. D is the answer. (2 votes)"
      },
      {
        "user": "guid1984",
        "text": "The answer is D (enterprise multi-tenancy using GKE, reduce costs and control access by RBAC) (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 67,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Cheap team isolation: namespaces + RBAC on shared dev/prod clusters.",
    "correctRationale": "Minimizing cost means minimizing cluster count, and teams must not reach each other's environments — namespace-scoped Kubernetes RBAC does exactly that. One dev cluster and one prod cluster with a namespace per team is the standard multi-tenancy answer; a project per team adds billing/quota overhead, and IAP cannot scope namespace access.",
    "optionRationales": [
      "Wrong: A project per team multiplies project/cluster overhead and is unnecessary when RBAC can isolate namespaces.",
      "Wrong: Namespace-per-env inside a per-team project still doubles cluster count versus shared dev/prod clusters.",
      "Wrong: Identity-Aware Proxy gates user web/SSH access to GCP resources; it does not enforce per-namespace Kubernetes authorization.",
      "Correct: Two clusters total, namespace per team, RBAC restricting teams to their namespaces — cheapest layout meeting the isolation requirement."
    ]
  },
  {
    "id": 66,
    "topic": "SLOs & Error Budgets",
    "difficulty": 1,
    "question": "You support a large service with a well-defined Service Level Objective (SLO). The development team deploys new releases of the service multiple times a week. If a major incident causes the service to miss its SLO, you want the development team to shift its focus from working on features to improving service reliability. What should you do before a major incident occurs?",
    "options": [
      "A. Develop an appropriate error budget policy in cooperation with all service stakeholders.",
      "B. Negotiate with the product team to always prioritize service reliability over releasing new features.",
      "C. Negotiate with the development team to reduce the release frequency to no more than once a week.",
      "D. Add a plugin to your Jenkins pipeline that prevents new releases whenever your service is out of SLO."
    ],
    "correct": 0,
    "explanation": "An error budget policy agreed with stakeholders pre-decides the reliability-vs-features switch before an incident forces the argument.",
    "discussion": [
      {
        "user": "KyubiBlaze",
        "text": "Selected Answer: A. Reason : Incident has not occurred yet, even when development team is already pushing new features multiple times a week. The option A says, to define an error budget \"policy\", not to define error budget(It is already present). Just simple means to bring in all stakeholders, and decide how to consume the error budget effectively that could bring balance between feature deployment and reliability. (12 votes)"
      },
      {
        "user": "[Removed]",
        "text": "Selected Answer: A. The goals of this policy are to: -- Protect customers from repeated SLO misses -- Provide an incentive to balance reliability with other features https://sre.google/workbook/error-budget-policy/ (3 votes)"
      },
      {
        "user": "Sekierer",
        "text": "Selected Answer: A. I vote for A (3 votes)"
      },
      {
        "user": "sindra",
        "text": "I think it should be A (3 votes)"
      },
      {
        "user": "job_search83",
        "text": "A, error budget https://sre.google/sre-book/embracing-risk/#xref_risk-management_unreliability-budgets (3 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: A. A. Develop an appropriate error budget policy in cooperation with all service stakeholders. This will help to establish clear guidelines and expectations for service reliability, and ensure that the development team is aware of the importance of maintaining the SLO during periods of high traffic or other potential incidents. Additionally, the error budget policy will provide a clear framework for how to prioritize and respond to incidents, and ensure that the development team is able to quickly and effectively shift its focus to improving service reliability in the event... (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 66,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Pre-agreed error budget policy governs release freezes.",
    "correctRationale": "The goal is an agreed mechanism that redirects the team to reliability work when the SLO is breached — that is exactly what an error budget policy defines (e.g., freeze releases when the budget is exhausted). Making it with all stakeholders beforehand avoids negotiating during the incident. Always-prioritize-reliability is unrealistic, weekly caps do not react to budget, and a Jenkins plugin hardcodes a process decision.",
    "optionRationales": [
      "Correct: A stakeholder-agreed error budget policy defines the release-freeze consequence before an incident happens.",
      "Wrong: 'Always prioritize reliability' removes the flexibility the error budget is meant to provide.",
      "Wrong: A fixed weekly release cap ignores actual reliability signal — it is not tied to the SLO at all.",
      "Wrong: A pipeline plugin is an enforcement detail; the policy decision must exist first, agreed by stakeholders."
    ]
  },
  {
    "id": 65,
    "topic": "SLOs & Error Budgets",
    "difficulty": 2,
    "question": "You need to define Service Level Objectives (SLOs) for a high-traffic multi-region web application. Customers expect the application to always be available and have fast response times. Customers are currently happy with the application performance and availability. Based on current measurement, you observe that the 90th percentile of latency is 120 ms and the 95th percentile of latency is 275 ms over a 28-day window. What latency SLO would you recommend to the team to publish?",
    "options": [
      "A. 90th percentile – 100 ms, 95th percentile – 250 ms",
      "B. 90th percentile – 120 ms, 95th percentile – 275 ms",
      "C. 90th percentile – 150 ms, 95th percentile – 300 ms",
      "D. 90th percentile – 250 ms, 95th percentile – 400 ms"
    ],
    "correct": 2,
    "explanation": "150 ms / 300 ms leaves headroom above the observed 120/275 — an SLO users are already happy with, not a stretch goal.",
    "discussion": [
      {
        "user": "job_search83",
        "text": "C, https://sre.google/sre-book/service-level-objectives/ \"Don't pick a target based on current performance\" (25 votes)"
      },
      {
        "user": "Nik22",
        "text": "Picking an SLO based upon current performance can commit you to unnecessarily strict SLOs. Select slightly lower SLO. Will go wtih C (11 votes)"
      },
      {
        "user": "enter_co",
        "text": "Selected Answer: B. According to this material, if the users are happy with the current not that stellar performance, the SLOs should be achievable, based on the historical values: https://cloud.google.com/blog/products/management-tools/practical-guide-to-setting-slos \"It's important to set a target that is achievable so that alerts are meaningful. Normally, when choosing an SLO, it's best to start from historical trends and assume if enough people are happy with the service now, you're probably doing OK. Eventually, it's ideal to converge those numbers with aspirational targets that your... (2 votes)"
      },
      {
        "user": "joec",
        "text": "Selected Answer: C. Agree with C (2 votes)"
      },
      {
        "user": "buldas",
        "text": "Selected Answer: C. SLI != SLO (2 votes)"
      },
      {
        "user": "giammydell",
        "text": "SLO is selected well if User are happy. B is correct (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 65,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority B wanted the SLO set exactly at observed performance; SRE guidance is to set it slightly looser than what users are happy with so there is error budget to spend. Also note the mojibake formatting in the source was cleaned ('th th' removed).",
    "conceptSummary": "Setting an SLO slightly looser than current observed performance.",
    "correctRationale": "Customers are happy at p90=120 ms and p95=275 ms. An SLO should commit to slightly worse than observed performance to preserve error budget; pinning it exactly at observed latency leaves zero room and makes every normal wobble a breach. Tighter (100/250) commits the team to better than users need; much looser (250/400) abandons useful protection.",
    "optionRationales": [
      "Wrong: 100/250 is tighter than current performance — committing to better than what users already accept adds risk for no user benefit.",
      "Wrong: Pinning the SLO exactly at the measured 120/275 leaves no error budget; any small regression breaches it.",
      "Correct: 150/300 gives headroom above the observed 120/275 while still protecting the experience users value.",
      "Wrong: 250/400 is so loose it ceases to detect real degradation before users complain."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 64,
    "topic": "Troubleshooting & APM",
    "difficulty": 2,
    "question": "You support a trading application written in Python and hosted on App Engine flexible environment. You want to customize the error information being sent to Stackdriver Error Reporting. What should you do?",
    "options": [
      "A. Install the Stackdriver Error Reporting library for Python, and then run your code on a Compute Engine VM.",
      "B. Install the Stackdriver Error Reporting library for Python, and then run your code on Google Kubernetes Engine.",
      "C. Install the Stackdriver Error Reporting library for Python, and then run your code on App Engine flexible environment.",
      "D. Use the Stackdriver Error Reporting API to write errors from your application to ReportedErrorEvent, and then generate log entries with properly formatted error messages in Stackdriver Logging."
    ],
    "correct": 3,
    "explanation": "Customizing reported errors means writing ReportedErrorEvent payloads via the Error Reporting API — which is itself how the formatted log entry is produced.",
    "discussion": [
      {
        "user": "muk5658",
        "text": "@TNT87 - Answer is C, the link you shared has a pip install in the beginning which means Python requires installing library first. pip install --upgrade google-cloud-error-reporting (20 votes)"
      },
      {
        "user": "pradoUA",
        "text": "Selected Answer: D. The question ask: \"You want to customize the error information being sent\", hence for me the answer is D (4 votes)"
      },
      {
        "user": "iamzeah",
        "text": "Selected Answer: D. If you're using the Error Reporting API, you can report error events from your application by writing them to ReportedErrorEvent. Doing this generates log entries with properly formatted error messages in Cloud Logging. https://cloud.google.com/error-reporting/docs/formatting-error-messages (4 votes)"
      },
      {
        "user": "pddddd",
        "text": "D 100% https://cloud.google.com/error-reporting/docs/formatting-error-messages no need to install error reporting library on App Engine Flex. (4 votes)"
      },
      {
        "user": "Manh",
        "text": "Ans is C. the question is asking about \"You want to customize the error information being sent to Stackdriver Error Reporting.\" so you can use the instrumentation libraries available for a number of languages: https://cloud.google.com/error-reporting/docs/setup/app-engine-flexible-environment (4 votes)"
      },
      {
        "user": "job_search83",
        "text": "C, https://cloud.google.com/error-reporting/docs/setup/python (4 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 64,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority C: the client library is how you send errors, but installing it says nothing about customizing them; the Error Reporting API with ReportedErrorEvent is what lets you control the reported payload. Writing to ReportedErrorEvent through the API is itself what produces the properly formatted log entry (per the Error Reporting docs), so D describes one mechanism, not a duplicate second write.",
    "conceptSummary": "Custom error payloads via the Error Reporting API.",
    "correctRationale": "Installing the client library is how errors get reported, but it does not let you customize the content. The Error Reporting API's ReportedErrorEvent lets you construct the error payload yourself — and writing a ReportedErrorEvent is itself what produces the properly formatted log entry, so D is one mechanism, not a duplicate second write. The platform hosting the code (App Engine flex, GKE, VM) does not change what you can report.",
    "optionRationales": [
      "Wrong: The Python library on a VM reports errors but does not customize the reported payload.",
      "Wrong: Same library, different runtime — installing it on GKE still gives you only default reporting.",
      "Wrong: The client library can send errors, but installing it on the same App Engine flex app changes nothing about customization; the API's ReportedErrorEvent is what controls the payload.",
      "Correct: Writing to ReportedErrorEvent through the API is itself what produces the properly formatted log entry — D describes one mechanism, not a duplicate write."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 63,
    "topic": "Logging",
    "difficulty": 1,
    "question": "You are working with a government agency that requires you to archive application logs for seven years. You need to configure Stackdriver to export and store the logs while minimizing costs of storage. What should you do?",
    "options": [
      "A. Create a Cloud Storage bucket and develop your application to send logs directly to the bucket.",
      "B. Develop an App Engine application that pulls the logs from Stackdriver and saves them in BigQuery.",
      "C. Create an export in Stackdriver and configure Cloud Pub/Sub to store logs in permanent storage for seven years.",
      "D. Create a sink in Stackdriver, name it, create a bucket on Cloud Storage for storing archived logs, and then select the bucket as the log export destination."
    ],
    "correct": 3,
    "explanation": "A Logging sink to a Cloud Storage bucket archives logs cheaply for the required seven years.",
    "discussion": [
      {
        "user": "Manh",
        "text": "Answer D https://cloud.google.com/logging/docs/routing/overview (11 votes)"
      },
      {
        "user": "emdee202",
        "text": "Selected Answer: D. Ans: D (3 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: D. D. Create a sink in Stackdriver, name it, create a bucket on Cloud Storage for storing archived logs, and then select the bucket as the log export destination. This allows you to export logs from Stackdriver to a long-term storage bucket in Cloud Storage, which is a cost-effective option for long-term storage. Additionally, you can use Stackdriver's export feature to schedule regular exports and configure retention policies to keep the logs for the required seven years. (2 votes)"
      },
      {
        "user": "zellck",
        "text": "Selected Answer: D. D is the answer. https://cloud.google.com/logging/docs/routing/overview#destinations You can use the Logs Router to route certain logs to supported destinations in any Cloud project. Logging supports the following sink destinations: - Cloud Storage: JSON files stored in Cloud Storage buckets; provides inexpensive, long-term storage. (2 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: D. Option D (1 vote)"
      },
      {
        "user": "ramzez4815",
        "text": "Selected Answer: D. D is correct, it's actually explaining the steps to do what the question ask. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 63,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Long-term, low-cost log archival via a sink to Cloud Storage.",
    "correctRationale": "Cloud Logging sinks continuously export matching entries to a destination; a Cloud Storage bucket is the lowest-cost archive tier for seven-year retention and needs no code. Writing the app to send logs twice duplicates work, an App Engine puller is bespoke machinery, and Pub/Sub is a transport that does not itself retain logs.",
    "optionRationales": [
      "Wrong: Having the application write to the bucket bypasses Logging and doubles the application's write path.",
      "Wrong: A custom App Engine puller into BigQuery adds code to maintain and BigQuery is pricier for pure archiving.",
      "Wrong: Pub/Sub delivers messages to subscribers; it is not permanent seven-year storage.",
      "Correct: A named sink exporting to a Cloud Storage bucket gives managed, low-cost, seven-year log retention."
    ]
  },
  {
    "id": 62,
    "topic": "CI/CD Pipelines",
    "difficulty": 1,
    "question": "Your application runs on Google Cloud Platform (GCP). You need to implement Jenkins for deploying application releases to GCP. You want to streamline the release process, lower operational toil, and keep user data secure. What should you do?",
    "options": [
      "A. Implement Jenkins on local workstations.",
      "B. Implement Jenkins on Kubernetes on-premises.",
      "C. Implement Jenkins on Google Cloud Functions.",
      "D. Implement Jenkins on Compute Engine virtual machines."
    ],
    "correct": 3,
    "explanation": "Run Jenkins on Compute Engine VMs — a supported, secure home close to your GCP resources with minimal operational toil.",
    "discussion": [
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: D. D - Jenkins with Compute Engine in GCP. (4 votes)"
      },
      {
        "user": "TNT87",
        "text": "he Google Compute Engine (GCE) Plugin allows you to use GCE virtual machines (VMs) with Jenkins to execute build tasks. GCE VMs provision quickly, are destroyed by Jenkins when idle, and offer Preemptible VMs that run at a much lower price than regular VMs. (4 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: D. D. Implement Jenkins on Compute Engine virtual machines. This will allow you to leverage GCP's security and compliance features, and integrate with other GCP services such as Cloud Storage or Cloud SQL for storing build artifacts and user data. Additionally, using Compute Engine virtual machines for Jenkins will provide flexibility in terms of scaling and managing resources. (3 votes)"
      },
      {
        "user": "TNT87",
        "text": "Ans D https://plugins.jenkins.io/google-compute-engine/ (3 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: D. option D (2 votes)"
      },
      {
        "user": "muk5658",
        "text": "I am sorry ignore my previous comment, they are saying Kubernetes on Premise, not GKE (Google Managed), so I would go with GCE. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 62,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Hosting Jenkins on Compute Engine for GCP deployments.",
    "correctRationale": "Jenkins is a persistent server workload; Compute Engine VMs are the supported way to run it on Google Cloud, giving a managed-OS home near the resources it deploys, with service-account-based credential handling that keeps user data secure. Workstations lack capacity/persistence, on-prem Kubernetes adds operational overhead, and Cloud Functions cannot host a long-running Jenkins master.",
    "optionRationales": [
      "Wrong: Jenkins on personal workstations is fragile, insecure for user data, and tied to individual laptops.",
      "Wrong: Self-managed on-prem Kubernetes adds operational burden and distance from the GCP resources being deployed.",
      "Wrong: Cloud Functions is for short-lived event handlers, not a long-running Jenkins controller.",
      "Correct: Compute Engine VMs are the standard, supported host for Jenkins with attached service accounts and minimal toil."
    ]
  },
  {
    "id": 61,
    "topic": "Performance & Cost",
    "difficulty": 2,
    "question": "You support a web application that runs on App Engine and uses CloudSQL and Cloud Storage for data storage. After a short spike in website traffic, you notice a big increase in latency for all user requests, increase in CPU use, and the number of processes running the application. Initial troubleshooting reveals:\n• After the initial spike in traffic, load levels returned to normal but users still experience high latency.\n• Requests for content from the CloudSQL database and images from Cloud Storage show the same high latency.\n• No changes were made to the website around the time the latency increased.\n• There is no increase in the number of errors to the users. You expect another spike in website traffic in the coming days and want to make sure users don't experience latency. What should you do?",
    "options": [
      "A. Upgrade the GCS buckets to Multi-Regional.",
      "B. Enable high availability on the CloudSQL instances.",
      "C. Move the application from App Engine to Compute Engine.",
      "D. Modify the App Engine configuration to have additional idle instances."
    ],
    "correct": 3,
    "explanation": "Extra idle App Engine instances absorb the post-spike latency: requests hit warm instances instead of cold-starting new ones.",
    "discussion": [
      {
        "user": "ESP_SAP",
        "text": "Correct Answer is D: Scaling App Engine scales the number of instances automatically in response to processing volume. This scaling factors in the automatic_scaling settings that are provided on a per-version basis in the configuration file. A service with basic scaling is configured by setting the maximum number of instances in the max_instances parameter of the basic_scaling setting. The number of live instances scales with the processing volume. You configure the number of instances of each version in that service's configuration file. The number of instances usually corresponds to the... (10 votes)"
      },
      {
        "user": "MBA_1",
        "text": "D is correct - https://cloud.google.com/appengine/docs/standard/python/config/appref max_idle_instances Optional. The maximum number of idle instances that App Engine should maintain for this version. Specify a value from 1 to 1000. If not specified, the default value is automatic, which means App Engine will manage the number of idle instances. Keep the following in mind: A high maximum reduces the number of idle instances more gradually when load levels return to normal after a spike. This helps your application maintain steady performance through fluctuations in request load, but also... (6 votes)"
      },
      {
        "user": "Sekierer",
        "text": "Selected Answer: D. D is correct (4 votes)"
      },
      {
        "user": "NXD",
        "text": "D is correct to me. A: wrong – because increase in latency for all user requests, not for specific region. So B: wrong – problem affects both database and GCS C: wrong increase in CPU use, and the number of processes running the application => problem is that CPU is not enough to run application processes. (3 votes)"
      },
      {
        "user": "giammydell",
        "text": "B could be useful but does not solve latency problem on Cloud Storage side (3 votes)"
      },
      {
        "user": "ramzez4815",
        "text": "Selected Answer: D. Vote for D (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 61,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "App Engine latency after traffic spikes: keep idle instances warm.",
    "correctRationale": "The signature — latency up after the spike, normal load, same latency on Cloud SQL and Cloud Storage reads — points at App Engine scaling: new instances start cold under bursts and request queues back up. Configuring additional idle (resident) instances keeps warm capacity ready so the next spike does not trigger slow scale-up. Multi-region buckets and Cloud SQL HA address availability, not latency.",
    "optionRationales": [
      "Wrong: Multi-region buckets change availability/latency geography of object storage; the latency is uniform across DB and storage reads, pointing at the app tier.",
      "Wrong: Cloud SQL HA is failover protection, not a latency fix — and storage reads are equally slow, so the DB is not the bottleneck.",
      "Wrong: Replatforming to Compute Engine is a large migration, not a fix for warm-up latency.",
      "Correct: Additional idle instances give App Engine warm capacity, preventing cold-start and queuing latency on the next spike."
    ]
  },
  {
    "id": 60,
    "topic": "Performance & Cost",
    "difficulty": 1,
    "question": "You have migrated an e-commerce application to Google Cloud Platform (GCP). You want to prepare the application for the upcoming busy season. What should you do first to prepare for the busy season?",
    "options": [
      "A. Load test the application to profile its performance for scaling.",
      "B. Enable AutoScaling on the production clusters, in case there is growth.",
      "C. Pre-provision double the compute power used last season, expecting growth.",
      "D. Create a runbook on inflating the disaster recovery (DR) environment if there is growth."
    ],
    "correct": 0,
    "explanation": "Load test first: profile how the app scales so peak-season preparation is based on measured behavior, not guesses.",
    "discussion": [
      {
        "user": "NXD",
        "text": "https://cloud.google.com/architecture/black-friday-production-readiness#preparation_stage The objective of the preparation stage is to test the system's ability to scale for peak user traffic and to document the results. Completing the preparation stage results in architecture refinement to handle peak traffic more efficiently and increase system reliability. This stage also yields procedures for operations and support that help streamline processes for handling the peak event and any issues that might occur. Consider this stage as practice for the peak event from a system and operations... (18 votes)"
      },
      {
        "user": "KyubiBlaze",
        "text": "Selected Answer: A. Come on, no brainer. A is the answer. You load test to understand how your application perform under heavy load. \"Prepare for busy season\" B - No, Option A will give you insight in how your applications works under load, and how do you scale, if it cannot scale, autoscaling in meaningless. So first you test your application in controlled environment. Not wait for the busy time to come and then realise autoscaling is also unable to meet demand. Or Maybe you even reach your quotas. (5 votes)"
      },
      {
        "user": "tee_dee26",
        "text": "Passed exam a couple of days ago. Chose A (4 votes)"
      },
      {
        "user": "MBA_1",
        "text": "Should be A , To check how application performs with load (4 votes)"
      },
      {
        "user": "TNT87",
        "text": "Selected Answer: A. Set up load and performance testing Load testing is the process of deploying a test version of the system and creating requests to simulate high use of the system. Load testing normally focuses on testing for sustainable user-perceived behavior at some percentile below the absolute peak. Testing for peak requires hitting that top percentile with consistent good performance. (2 votes)"
      },
      {
        "user": "TNT87",
        "text": "Ans B https://cloud.google.com/architecture/black-friday-production-readiness (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 60,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Peak readiness starts with load testing.",
    "correctRationale": "Before scaling for a busy season you need to know how the application behaves under load — a load test profiles performance and exposes the real scaling bottlenecks. Autoscaling blind, doubling last year's capacity, or writing DR runbooks all act before measuring.",
    "optionRationales": [
      "Correct: Load testing profiles scaling behavior and is the first preparation step — everything else depends on its results.",
      "Wrong: Enabling autoscaling without knowing the profile risks scaling on the wrong signal or hitting limits.",
      "Wrong: Doubling last season's capacity is a guess that may overspend or still fall short.",
      "Wrong: A DR-inflation runbook is useful later but is not the first step before measuring capacity needs."
    ]
  },
  {
    "id": 59,
    "topic": "Monitoring & Alerting",
    "difficulty": 1,
    "question": "You encounter a large number of outages in the production systems you support. You receive alerts for all the outages that wake you up at night. The alerts are due to unhealthy systems that are automatically restarted within a minute. You want to set up a process that would prevent staff burnout while following Site Reliability Engineering practices. What should you do?",
    "options": [
      "A. Eliminate unactionable alerts.",
      "B. Create an incident report for each of the alerts.",
      "C. Distribute the alerts to engineers in different time zones.",
      "D. Redefine the related Service Level Objective so that the error budget is not exhausted."
    ],
    "correct": 0,
    "explanation": "If a system self-heals in a minute, the alert is unactionable — SRE practice is to eliminate pages that require no human action.",
    "discussion": [
      {
        "user": "AL12",
        "text": "I reckon its A, the reason is because it seems like the problem is automatically fixed with an restart of the service after a minute, therefore engineers don't really need to be woken up about these problems. If it failed multiple times or if the restart failed, then the engineer should be woken up (14 votes)"
      },
      {
        "user": "zygomar",
        "text": "Selected Answer: A. agree with kyubiblaze about having to remove unactionable items aka spam: \"good monitoring alerts on actionable problems\" @ https://cloud.google.com/blog/products/management-tools/meeting-reliability-challenges-with-sre-principles (4 votes)"
      },
      {
        "user": "TNT87",
        "text": "Ans D https://www.atlassian.com/incident-management/kpis/error-budget (4 votes)"
      },
      {
        "user": "KyubiBlaze",
        "text": "A - You have to remove \"unactionable\" alerts, these alerts are useless if you can't take any action. Simple reason, C might be following SRE practice, but it is distributing the problem, not solving it. B and D, totally No. (3 votes)"
      },
      {
        "user": "ESP_SAP",
        "text": "The team may continue to work on non-reliability features if: The outage was caused by a company-wide networking problem. The outage was caused by a service maintained by another team, who have themselves frozen releases to address their reliability issues. The error budget was consumed by users out of scope for the SLO (e.g., load tests or penetration testers). Miscategorized errors consume budget even though no users were impacted. https://sre.google/workbook/error-budget-policy/ (3 votes)"
      },
      {
        "user": "NXD",
        "text": "C follows the SRE. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 59,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Alert hygiene: only page on actionable conditions.",
    "correctRationale": "Alerts that wake engineers for issues that auto-resolve within a minute are unactionable noise — the definition of toil-generating alert fatigue and a burnout driver. SRE guidance: every page should require human action. Reports, redistribution across time zones, or redefining the SLO all treat the symptom rather than the unactionable-alert cause.",
    "optionRationales": [
      "Correct: Eliminating alerts that need no human action stops the burnout-inducing noise at the source.",
      "Wrong: Writing an incident report for every non-event multiplies toil instead of reducing it.",
      "Wrong: Spreading the same unactionable pages across time zones distributes the burnout rather than removing it.",
      "Wrong: Loosening the SLO to silence alerts hides signal and does not make the alerts actionable."
    ]
  },
  {
    "id": 58,
    "topic": "Supply Chain Security",
    "difficulty": 1,
    "question": "You are deploying an application that needs to access sensitive information. You need to ensure that this information is encrypted and the risk of exposure is minimal if a breach occurs. What should you do?",
    "options": [
      "A. Store the encryption keys in Cloud Key Management Service (KMS) and rotate the keys frequently",
      "B. Inject the secret at the time of instance creation via an encrypted configuration management system.",
      "C. Integrate the application with a Single sign-on (SSO) system and do not expose secrets to the application.",
      "D. Leverage a continuous build pipeline that produces multiple versions of the secret for each instance of the application."
    ],
    "correct": 0,
    "explanation": "KMS-managed keys with frequent rotation keep secrets encrypted and limit the blast radius of any single key compromise.",
    "discussion": [
      {
        "user": "ssmb",
        "text": "A should be the correct answer. (2 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: A. Option A (1 vote)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: A. A. Store the encryption keys in Cloud Key Management Service (KMS) and rotate the keys frequently. This ensures that the sensitive information is encrypted at rest and in transit, and that the encryption keys are regularly rotated to minimize the risk of exposure in the event of a breach. (1 vote)"
      },
      {
        "user": "WhyIronMan",
        "text": "Selected Answer: A. A) should be the correct answer. (1 vote)"
      },
      {
        "user": "ramzez4815",
        "text": "Selected Answer: A. The clear answer is A (1 vote)"
      },
      {
        "user": "emdee202",
        "text": "Selected Answer: A. Ans: A (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 58,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Minimizing secret exposure risk with managed keys and rotation.",
    "correctRationale": "Storing encryption keys in Cloud KMS centralizes key custody, enforces IAM-gated use, and frequent rotation limits exposure if a key or ciphertext leaks. Config-management injection still relies on keys somewhere; SSO does not encrypt application secrets; 'multiple versions of the secret' multiplies exposure rather than reducing it.",
    "optionRationales": [
      "Correct: Cloud KMS with frequent rotation gives managed encryption and shrinks the window any single key compromise is useful.",
      "Wrong: Injecting at instance creation still distributes secrets through config management and does not address key custody or rotation.",
      "Wrong: SSO governs user sign-in, not the encryption and storage of application secrets.",
      "Wrong: Producing multiple versions of the secret increases the copies an attacker could find — the opposite of minimal exposure."
    ]
  },
  {
    "id": 57,
    "topic": "Deployment Strategies",
    "difficulty": 1,
    "question": "You support a web application that is hosted on Compute Engine. The application provides a booking service for thousands of users. Shortly after the release of a new feature, your monitoring dashboard shows that all users are experiencing latency at login. You want to mitigate the impact of the incident on the users of your service. What should you do first?",
    "options": [
      "A. Roll back the recent release.",
      "B. Review the Stackdriver monitoring.",
      "C. Upsize the virtual machines running the login services.",
      "D. Deploy a new release to see whether it fixes the problem."
    ],
    "correct": 0,
    "explanation": "Roll back the release that introduced the login latency — fastest mitigation while you investigate.",
    "discussion": [
      {
        "user": "PJ_2021",
        "text": "A Rollback is needed to mitigate the impact. Once the is done review can be done (12 votes)"
      },
      {
        "user": "Nik22",
        "text": "First roll back and then use monitoring to review what went wrong. (4 votes)"
      },
      {
        "user": "giammydell",
        "text": "But the question is about mitigating the problema, with the rollback the system goes back to the old version. (3 votes)"
      },
      {
        "user": "Meyucho",
        "text": "Selected Answer: A. MITIGATE is the word here... increasing resources will no garantize the mitigation. Rolling back will do this (2 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: A. A - Rollback to previous stable version. Then you need to find what is causing the issue. (2 votes)"
      },
      {
        "user": "Sekierer",
        "text": "Selected Answer: A. A is correct (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 57,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "First mitigation for a bad release: roll it back.",
    "correctRationale": "All-user latency began with the recent release, so reverting it restores known-good behavior immediately. Reviewing monitoring, upsizing VMs, or shipping another release all take time while users keep suffering — mitigate first, diagnose after.",
    "optionRationales": [
      "Correct: Rolling back restores the previous working version and stops the user impact fastest.",
      "Wrong: Reviewing monitoring is diagnostic work; it does not mitigate the ongoing incident.",
      "Wrong: Resizing VMs guesses at a capacity cause without evidence, and takes longer than a rollback.",
      "Wrong: Deploying an unverified fix risks compounding the incident."
    ]
  },
  {
    "id": 56,
    "topic": "CI/CD Pipelines",
    "difficulty": 1,
    "question": "You use Cloud Build to build your application. You want to reduce the build time while minimizing cost and development effort. What should you do?",
    "options": [
      "A. Use Cloud Storage to cache intermediate artifacts.",
      "B. Run multiple Jenkins agents to parallelize the build.",
      "C. Use multiple smaller build steps to minimize execution time.",
      "D. Use larger Cloud Build virtual machines (VMs) by using the machine-type option."
    ],
    "correct": 0,
    "explanation": "Caching intermediate artifacts in Cloud Storage is the low-effort, low-cost way to speed repeated Cloud Build runs.",
    "discussion": [
      {
        "user": "TNT87",
        "text": "Ans A https://cloud.google.com/storage/docs/best-practices (14 votes)"
      },
      {
        "user": "bob_builder",
        "text": "A - https://cloud.google.com/build/docs/speeding-up-builds#caching_directories_with_google_cloud_storage (8 votes)"
      },
      {
        "user": "ESP_SAP",
        "text": "Correct Answer is (D): Using custom virtual machine sizes In addition to the standard machine type, Cloud Build provides four high-CPU virtual machine types to run your builds. To increase the speed of your build, select a virtual machine with a higher CPU. Requesting a high-CPU machine may increase the startup time of your build as Cloud Build only starts these machines on demand. https://cloud.google.com/build/docs/speeding-up-builds (6 votes)"
      },
      {
        "user": "job_search83",
        "text": "A, caching, https://cloud.google.com/build/docs/speeding-up-builds (5 votes)"
      },
      {
        "user": "TNT87",
        "text": "Selected Answer: A. Ans A and thats cheap and fast (3 votes)"
      },
      {
        "user": "TNT87",
        "text": "lets correct something fellows ok. A is not ok, why, we can ok only use intermediate artifacts in Kaniko cache, not in Cloud storage, in cloud storage we use results not intermediate artifacts \"You can copy the results of a previous build to a Google Cloud Storage bucket, use the results for faster calculation, and then copy the new results back to the bucket.\" go re-read the best practices and you will see what im talking about, then this leaves D as the correct answer. https://cloud.google.com/build/docs/speeding-up-builds (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 56,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Faster Cloud Build runs via artifact caching.",
    "correctRationale": "Caching intermediate artifacts (dependencies, layers) in Cloud Storage avoids re-downloading or rebuilding them on every run — a one-line-ish config change with near-zero added cost. Jenkins agents add infrastructure, splitting steps does not remove work, and bigger VMs raise cost which the question says to minimize.",
    "optionRationales": [
      "Correct: A Cloud Storage cache of intermediate artifacts removes repeated fetch/build work — the minimal-effort speedup.",
      "Wrong: Standing up Jenkins agents adds infrastructure and operational overhead that the question tells you to minimize.",
      "Wrong: More, smaller steps still do the same total work; they may even add per-step overhead.",
      "Wrong: Bigger machine types speed the build but raise cost, conflicting with the minimize-cost requirement."
    ]
  },
  {
    "id": 55,
    "topic": "Supply Chain Security",
    "difficulty": 1,
    "question": "Your organization recently adopted a container-based workflow for application development. Your team develops numerous applications that are deployed continuously through an automated build pipeline to the production environment. A recent security audit alerted your team that the code pushed to production could contain vulnerabilities and that the existing tooling around virtual machine (VM) vulnerabilities no longer applies to the containerized environment. You need to ensure the security and patch level of all code running through the pipeline. What should you do?",
    "options": [
      "A. Set up Container Analysis to scan and report Common Vulnerabilities and Exposures.",
      "B. Configure the containers in the build pipeline to always update themselves before release.",
      "C. Reconfigure the existing operating system vulnerability software to exist inside the container.",
      "D. Implement static code analysis tooling against the Docker files used to create the containers."
    ],
    "correct": 0,
    "explanation": "Container Analysis (now Artifact Analysis) scans stored images continuously and reports CVEs across the pipeline.",
    "discussion": [
      {
        "user": "giammydell",
        "text": "A is correct for me (10 votes)"
      },
      {
        "user": "zygomar",
        "text": "Selected Answer: A. all comments so far agree that A is indeed the answer (3 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: A. Option A (2 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: A. A. Set up Container Analysis to scan and report Common Vulnerabilities and Exposures. To ensure the security and patch level of all code running through the pipeline, you should set up Container Analysis to scan and report Common Vulnerabilities and Exposures. Container Analysis is a service on GCP that allows you to scan and analyze container images for vulnerabilities, malware and other issues. This will help you identify vulnerabilities in your container images and take appropriate action to address them. (2 votes)"
      },
      {
        "user": "WhyIronMan",
        "text": "Selected Answer: A. A) for sure (1 vote)"
      },
      {
        "user": "zellck",
        "text": "Selected Answer: A. A is the answer. https://cloud.google.com/container-analysis/docs/container-analysis Container Analysis is a service that provides vulnerability scanning and metadata storage for containers. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 55,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Vulnerability scanning for container images with Artifact Analysis.",
    "correctRationale": "Container Analysis — today's Artifact Analysis — is the managed scanner for images in the registry, reporting Common Vulnerabilities and Exposures on everything that flows through the pipeline. Self-updating containers are unpredictable, VM-era scanners do not fit containers, and Dockerfiles alone cannot reveal packaged CVEs.",
    "optionRationales": [
      "Correct: Container/Artifact Analysis scans images for CVEs and reports patch level — the managed fit for container security in the pipeline.",
      "Wrong: 'Always update themselves' inside containers makes builds non-reproducible and can introduce unverified changes.",
      "Wrong: Embedding a VM vulnerability scanner in the container is a kludge that misses registry-level coverage.",
      "Wrong: Static analysis of Dockerfiles cannot see the actual package versions inside built images."
    ],
    "legacyNote": "Container Analysis is now Artifact Analysis (with on-push scanning for Artifact Registry images)."
  },
  {
    "id": 54,
    "topic": "Logging",
    "difficulty": 1,
    "question": "You are using Stackdriver to monitor applications hosted on Google Cloud Platform (GCP). You recently deployed a new application, but its logs are not appearing on the Stackdriver dashboard. You need to troubleshoot the issue. What should you do?",
    "options": [
      "A. Confirm that the Stackdriver agent has been installed in the hosting virtual machine.",
      "B. Confirm that your account has the proper permissions to use the Stackdriver dashboard.",
      "C. Confirm that port 25 has been opened in the firewall to allow messages through to Stackdriver.",
      "D. Confirm that the application is using the required client library and the service account key has proper permissions."
    ],
    "correct": 0,
    "explanation": "First confirm the logging agent is actually installed on the VM — the most common reason application logs never reach Cloud Logging.",
    "discussion": [
      {
        "user": "KyubiBlaze",
        "text": "Why do you complicate stuff. A is the answer. Why not D, because if A is not there D is useless. Question says you are using Stackdriver monitoring, not saying you have an agent installed already. You need the agent to export logs. So first thing you'll always see in the agent is there, and running. Next service account, next client libraries. I hope this clears your doubts. (13 votes)"
      },
      {
        "user": "hfudjdn",
        "text": "D - The question states that you are already using Stackdriver for the GCE instance (assuming the agent is already installed). However, the \"new\" application has issues shipping the logs (6 votes)"
      },
      {
        "user": "not_thanos",
        "text": "Selected Answer: A. A and D seems correct. I think D is less correct because since you are hosting on GCP, best practice is to not add a service account to the application itself but instead leverage the native logging capabilities of GCP's offerings like GKE, GCP, etc. (5 votes)"
      },
      {
        "user": "hanweiCN",
        "text": "Selected Answer: A. service account key does not have permission. service account has permission. (3 votes)"
      },
      {
        "user": "eliC",
        "text": "Selected Answer: A. A is the answer ref.: https://cloud.google.com/monitoring/agent/monitoring/troubleshooting#checklist (3 votes)"
      },
      {
        "user": "NXD",
        "text": "Both A and D are valid. But the first step should be A. So answer A is better. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 54,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority D proposed checking the client library/service account key, but on Compute Engine the agent ships logs under the VM's attached service account; embedded keys are discouraged.",
    "conceptSummary": "Troubleshoot missing VM logs: check the agent first.",
    "correctRationale": "Logs not appearing at all points to the collection layer, so verifying the agent is installed on the VM is the first check. Your account already sees other apps; port 25 is SMTP and irrelevant; and on Compute Engine the agent ships logs with the VM's attached service account rather than an embedded client-library key.",
    "optionRationales": [
      "Correct: If the agent is absent, no application logs are collected — confirming installation is the first troubleshooting step.",
      "Wrong: Dashboard permissions affect viewing logs, not whether the VM's logs get written.",
      "Wrong: Port 25 is SMTP; the logging agent does not use it.",
      "Wrong: On Compute Engine the agent uses the VM's attached service account — embedding service account keys in the app is discouraged."
    ],
    "legacyNote": "The Stackdriver agent is the legacy Logging agent; new deployments use the Ops Agent.",
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 53,
    "topic": "Infrastructure as Code",
    "difficulty": 1,
    "question": "Your team of Infrastructure DevOps Engineers is growing, and you are starting to use Terraform to manage infrastructure. You need a way to implement code versioning and to share code with other team members. What should you do?",
    "options": [
      "A. Store the Terraform code in a version-control system. Establish procedures for pushing new versions and merging with the master.",
      "B. Store the Terraform code in a network shared folder with child folders for each version release. Ensure that everyone works on different files.",
      "C. Store the Terraform code in a Cloud Storage bucket using object versioning. Give access to the bucket to every team member so they can download the files.",
      "D. Store the Terraform code in a shared Google Drive folder so it syncs automatically to every team member's computer. Organize files with a naming convention that identifies each new version."
    ],
    "correct": 0,
    "explanation": "Terraform code belongs in version control with merge procedures — that is the sharing-and-versioning answer.",
    "discussion": [
      {
        "user": "TNT87",
        "text": "Ans A https://www.terraform.io/docs/cloud/guides/recommended-practices/part3.3.html (4 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: A. https://developer.hashicorp.com/terraform/cloud-docs/recommended-practices/part3.3#4-create-workspaces version-control systems like GitLab, GitHub, BitBucket, etc is the obvious choice, B, C, D are ridiculous (3 votes)"
      },
      {
        "user": "Sekierer",
        "text": "Selected Answer: A. A for sure (3 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: A. Option A (2 votes)"
      },
      {
        "user": "meeku16",
        "text": "For option C & D, downloading not at all recommended. For option B, hectic process So option A is the correct answer (2 votes)"
      },
      {
        "user": "Suraj2611",
        "text": "A is the guaranteed ans (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 53,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Version control as the home for shared Terraform code.",
    "correctRationale": "Code versioning and team sharing for Terraform is solved by storing the configuration in a VCS (e.g. Git) with push/merge procedures — history, branching, conflict handling included. Shared folders, buckets, and Drive give file copies but no merge semantics or review workflow.",
    "optionRationales": [
      "Correct: A version-control system plus merge procedures is the standard way to version and share Terraform code.",
      "Wrong: Shared folders with per-version child folders is manual copy management with no merge or conflict handling.",
      "Wrong: Object versioning in Cloud Storage keeps blobs, not an integrated source history, and gives no collaboration workflow.",
      "Wrong: Drive sync folders offer no locking or merge semantics — two engineers editing the same file corrupt each other's work."
    ]
  },
  {
    "id": 52,
    "topic": "Logging",
    "difficulty": 2,
    "question": "You are running a real-time gaming application on Compute Engine that has a production and testing environment. Each environment has their own Virtual Private Cloud (VPC) network. The application frontend and backend servers are located on different subnets in the environment's VPC. You suspect there is a malicious process communicating intermittently in your production frontend servers. You want to ensure that network traffic is captured for analysis. What should you do?",
    "options": [
      "A. Enable VPC Flow Logs on the production VPC network frontend and backend subnets only with a sample volume scale of 0.5.",
      "B. Enable VPC Flow Logs on the production VPC network frontend and backend subnets only with a sample volume scale of 1.0.",
      "C. Enable VPC Flow Logs on the testing and production VPC network frontend and backend subnets with a volume scale of 0.5. Apply changes in testing before production.",
      "D. Enable VPC Flow Logs on the testing and production VPC network frontend and backend subnets with a volume scale of 1.0. Apply changes in testing before production."
    ],
    "correct": 1,
    "explanation": "Enable VPC Flow Logs on the production subnets at full sampling — captures every connection from the suspect frontends.",
    "discussion": [
      {
        "user": "NXD",
        "text": "B https://cloud.google.com/vpc/docs/flow-logs#log-sampling (16 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: B. B. Enable VPC Flow Logs on the production VPC network frontend and backend subnets only with a sample volume scale of 1.0. VPC flow logs are a feature that allows you to capture network traffic data in your VPC network. To ensure that all network traffic is captured for analysis, you should enable VPC flow logs on the production VPC network frontend and backend subnets with a sample volume scale of 1.0. This will capture all network traffic data, including the potentially malicious process, for further analysis. Option A. Enable VPC Flow Logs on the production VPC network... (9 votes)"
      },
      {
        "user": "Suraj2611",
        "text": "The Answer for this is B (6 votes)"
      },
      {
        "user": "WhyIronMan",
        "text": "Selected Answer: B. question saying test envs can be eliminated (3 votes)"
      },
      {
        "user": "ramzez4815",
        "text": "Selected Answer: B. Correct answer is B (2 votes)"
      },
      {
        "user": "Ananda",
        "text": "Selected Answer: B. Submitted B (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 52,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Full-fidelity traffic capture on production subnets only.",
    "correctRationale": "Intermittent malicious traffic will slip through 50% sampling, so the sample volume must be 1.0 to capture every flow. Only the production frontend and backend subnets are implicated; enabling logging in the testing VPC adds noise and cost without helping the investigation.",
    "optionRationales": [
      "Wrong: Half-volume sampling can miss the intermittent malicious connections entirely.",
      "Correct: Full sampling on just the production subnets captures all the traffic in question without testing-environment noise.",
      "Wrong: Includes the testing VPC unnecessarily and still samples only half the traffic.",
      "Wrong: Testing first is fine practice, but the requirement is to capture the production traffic now; enabling everywhere doubles scope and cost."
    ]
  },
  {
    "id": 51,
    "topic": "SLOs & Error Budgets",
    "difficulty": 2,
    "question": "You support a stateless web-based API that is deployed on a single Compute Engine instance in the europe-west2-a zone. The Service Level Indicator (SLI) for service availability is below the specified Service Level Objective (SLO). A postmortem has revealed that requests to the API regularly time out. The time outs are due to the API having a high number of requests and running out memory. You want to improve service availability. What should you do?",
    "options": [
      "A. Change the specified SLO to match the measured SLI",
      "B. Move the service to higher-specification compute instances with more memory",
      "C. Set up additional service instances in other zones and load balance the traffic between all instances",
      "D. Set up additional service instances in other zones and use them as a failover in case the primary instance is unavailable"
    ],
    "correct": 2,
    "explanation": "Scale horizontally across zones with load balancing — more memory headroom per request and zone-level availability.",
    "discussion": [
      {
        "user": "ramzez4815",
        "text": "Selected Answer: C. C is the correct anwer, it is required to increase reliability (3 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: C. C. Set up additional service instances in other zones and load balance the traffic between all instances This option will provide redundancy and increase the availability of the service by distributing the traffic across multiple instances. Additionally, if one instance goes down, the load balancer will redirect the traffic to the other healthy instances, minimizing the impact on the service availability. (2 votes)"
      },
      {
        "user": "Ananda",
        "text": "Selected Answer: C. Submitted C (2 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: C. Option C (1 vote)"
      },
      {
        "user": "muk5658",
        "text": "C, this option will offer resilience and distribute the load, also provides ability to configure health checks at VM level and Load Balancer can send only to Healthy Instances. (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 51,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Fixing OOM timeouts on a single-zone API with horizontal scaling + LB.",
    "correctRationale": "Requests time out because one instance runs out of memory under load. Adding instances in other zones behind a load balancer spreads requests so no single instance is overwhelmed, and the multi-zone footprint removes the single point of failure that keeps availability below SLO. Larger VMs raise the ceiling but keep one failure domain; failover-only leaves idle capacity.",
    "optionRationales": [
      "Wrong: Lowering the SLO to match current failures is managing the metric, not the service.",
      "Wrong: A bigger instance raises capacity but remains a single zonal point of failure.",
      "Correct: Load-balanced instances across zones both absorb the request load and survive a zone loss — the two things hurting availability.",
      "Wrong: Failover-only instances sit idle until failure and do not relieve the memory pressure on the overloaded primary."
    ]
  },
  {
    "id": 50,
    "topic": "Supply Chain Security",
    "difficulty": 2,
    "question": "Your organization recently adopted a container-based workflow for application development. Your team develops numerous applications that are deployed continuously through an automated build pipeline to a Kubernetes cluster in the production environment. The security auditor is concerned that developers or operators could circumvent automated testing and push code changes to production without approval. What should you do to enforce approvals?",
    "options": [
      "A. Configure the build system with protected branches that require pull request approval.",
      "B. Use an Admission Controller to verify that incoming requests originate from approved sources.",
      "C. Leverage Kubernetes Role-Based Access Control (RBAC) to restrict access to only approved users.",
      "D. Enable binary authorization inside the Kubernetes cluster and configure the build pipeline as an attestor."
    ],
    "correct": 3,
    "explanation": "Binary Authorization with the build pipeline as attestor enforces that only tested, approved builds can be deployed — approvals can't be bypassed.",
    "discussion": [
      {
        "user": "francisco_guerra",
        "text": "this question is a little bit strange, but first we need to remove the invalid answers B: Incorrect An admission controller is a piece of code that intercepts requests to the Kubernetes API server prior to persistence of the object, but after the request is authenticated and authorized. (its for security but not \"enforce approvals\") C: Incorrect, we need to \"enforce approvals\" roles apply in the cluster and Ops always could push to production without approval. A: Incorrect, for me this answer sound well but this does not sound that an answer for a gcp exam and this do not enforce the use of... (27 votes)"
      },
      {
        "user": "francisco_guerra",
        "text": "I win the exam today so this questions help me a lot (15 votes)"
      },
      {
        "user": "zanhsieh",
        "text": "Agreed with D. The keywords here is \"developers or operators\". Option A the operators could push images to production without approval (operators could touch the cluster directly and the cluster cannot do any action against them). Rest same as francisco_guerra. (4 votes)"
      },
      {
        "user": "ramzez4815",
        "text": "Selected Answer: D. D is correct answer, binary auth is best practice (3 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: D. D - Binary authorisation (3 votes)"
      },
      {
        "user": "maddy94",
        "text": "Questions 51-55 is not available.. can someone please help me to get 51-55 questions? (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 50,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Enforcing pipeline approvals at deploy time with attestations.",
    "correctRationale": "The auditor's concern is that someone deploys code that skipped automated testing. Binary Authorization makes the cluster refuse any image lacking an attestation; configuring the pipeline as the attestor means only images that completed the approved path can run. Branch protection, admission by source, and RBAC either live before the cluster or are bypassable.",
    "optionRationales": [
      "Wrong: Protected branches gate code merge, not deployment — someone could still push an image and deploy it.",
      "Wrong: 'Approved sources' verification by a generic admission controller does not tie deployment to pipeline approval/attestation.",
      "Wrong: RBAC restricts who can deploy but says nothing about whether the deployed build passed required tests.",
      "Correct: Attestation-based Binary Authorization makes the cluster itself require proof the build came through the approved pipeline."
    ]
  },
  {
    "id": 49,
    "topic": "Performance & Cost",
    "difficulty": 2,
    "question": "You need to reduce the cost of virtual machines (VM) for your organization. After reviewing different options, you decide to leverage preemptible VM instances. Which application is suitable for preemptible VMs?",
    "options": [
      "A. A scalable in-memory caching system.",
      "B. The organization's public-facing website.",
      "C. A distributed, eventually consistent NoSQL database cluster with sufficient quorum.",
      "D. A GPU-accelerated video rendering platform that retrieves and stores videos in a storage bucket."
    ],
    "correct": 3,
    "explanation": "A batch GPU rendering job with state in Cloud Storage tolerates preemption — it restarts and resumes without losing correctness.",
    "discussion": [
      {
        "user": "eks4x",
        "text": "Selected Answer: A. Why not A? \"A scalable in-memory caching system.\" In general a caching system is not critical to the function of an application. If the cache is down it will cause requests to have cache miss and query the DB instead. User requests will still get served albeit slower. In addition the answer specifies that the caching system is \"scalable\" reducing further the impact of 1 VM getting preempted, ie traffic can be automatically redirected to other cache replicas. To me all other answers seem to have a more severe impact on the user in case the VM is preempted. (5 votes)"
      },
      {
        "user": "TNT87",
        "text": "D https://cloud.google.com/compute/docs/instances/preemptible (4 votes)"
      },
      {
        "user": "ralf_cc",
        "text": "D - external persistent storage (4 votes)"
      },
      {
        "user": "izekc",
        "text": "Selected Answer: C. C is more accurate (3 votes)"
      },
      {
        "user": "dneves",
        "text": "Selected Answer: C. Preemptible VMs are short-lived and can be terminated by Google Cloud at any time if resources are needed elsewhere, so they are ideal for fault-tolerant applications that can handle interruptions without significant impact on functionality. Option C describes a distributed, eventually consistent NoSQL database. Eventually consistent systems can tolerate temporary unavailability of some nodes and reconcile the data once nodes are back online. Quorum-based systems (like many NoSQL databases) can continue to operate even if some VMs are preempted, as long as the required... (2 votes)"
      },
      {
        "user": "6a8c7ad",
        "text": "Selected Answer: D. Has to be D. Definitely not A (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 49,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Community split D 38% / A 38% / C 23%: the cache loses its in-memory state on every preemption and the quorum DB risks losing quorum when several nodes are reclaimed together; the batch rendering job is the textbook preemptible workload. Preemptible VMs are now Spot VMs.",
    "conceptSummary": "Right workload for preemptible (Spot) VMs: stateless, restartable batch.",
    "correctRationale": "Preemptible/Spot VMs suit fault-tolerant, restartable work. A video rendering pipeline that reads from and writes to a bucket can lose a VM and simply reprocess — state lives in Cloud Storage. A cache loses its warm in-memory state on every preemption, a quorum database can lose quorum when several nodes die together, and a public website needs to stay up.",
    "optionRationales": [
      "Wrong: An in-memory cache loses its cached state on every preemption, forcing constant cold restarts.",
      "Wrong: A public-facing website needs continuous availability; preemptible VMs can disappear with 30 seconds notice.",
      "Wrong: A quorum-based cluster can lose quorum entirely if several preemptible nodes are reclaimed at once.",
      "Correct: Batch rendering with inputs and outputs in Cloud Storage is stateless, restartable, and unaffected by preemption."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 48,
    "topic": "Troubleshooting & APM",
    "difficulty": 2,
    "question": "Your team is designing a new application for deployment both inside and outside Google Cloud Platform (GCP). You need to collect detailed metrics such as system resource utilization. You want to use centralized GCP services while minimizing the amount of work required to set up this collection system. What should you do?",
    "options": [
      "A. Import the Stackdriver Profiler package, and configure it to relay function timing data to Stackdriver for further analysis.",
      "B. Import the Stackdriver Debugger package, and configure the application to emit debug messages with timing information.",
      "C. Instrument the code using a timing library, and publish the metrics via a health check endpoint that is scraped by Stackdriver.",
      "D. Install an Application Performance Monitoring (APM) tool in both locations, and configure an export to a central data storage location for analysis."
    ],
    "correct": 0,
    "explanation": "The Profiler library works inside and outside Google Cloud and reports function-level timing to Cloud Profiler with minimal setup.",
    "discussion": [
      {
        "user": "rinkeshgala1",
        "text": "may be A, as profiler works both inside and outside of GCP. (8 votes)"
      },
      {
        "user": "zellck",
        "text": "Selected Answer: A. A is the answer. https://cloud.google.com/profiler/docs/about-profiler Cloud Profiler is a statistical, low-overhead profiler that continuously gathers CPU usage and memory-allocation information from your production applications. (3 votes)"
      },
      {
        "user": "cloudbee",
        "text": "Selected Answer: A. Profiler can be used outside GCP also it is used to measure cpu utilization by the application. (3 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: A. A - Profiler for resource utilisation. (2 votes)"
      },
      {
        "user": "cyrus86",
        "text": "Selected Answer: A. Answer should be A (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: A. https://cloud.google.com/profiler/docs/profiling-external (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 48,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Cross-environment performance collection via the Profiler agent library.",
    "correctRationale": "The requirement is detailed resource/timing metrics, centrally collected, deployable inside and outside GCP, with minimal work. The Profiler (now Cloud Profiler) library runs anywhere and streams function timing to a central console — exactly fitting. Debugger (retired anyway) was for inspecting live code state; a custom timing library plus health endpoint is more work; a third-party APM is heavier still.",
    "optionRationales": [
      "Correct: The Profiler package instruments the app once and relays timing data centrally, working on and off Google Cloud.",
      "Wrong: Debugger emitted debug snapshots, not resource utilization metrics — and the product was shut down in 2023.",
      "Wrong: Hand-instrumenting timing plus a scrape endpoint is substantial custom work and reinvents Profiler.",
      "Wrong: A third-party APM in both locations is more setup and management than the native library."
    ],
    "legacyNote": "Stackdriver Profiler is now Cloud Profiler; Stackdriver Debugger was shut down in 2023."
  },
  {
    "id": 47,
    "topic": "Monitoring & Alerting",
    "difficulty": 2,
    "question": "You are managing an application that exposes an HTTP endpoint without using a load balancer. The latency of the HTTP responses is important for the user experience. You want to understand what HTTP latencies all of your users are experiencing. You use Stackdriver Monitoring. What should you do?",
    "options": [
      "A. • In your application, create a metric with a metricKind set to DELTA and a valueType set to DOUBLE. • In Stackdriver's Metrics Explorer, use a Stacked Bar graph to visualize the metric.",
      "B. • In your application, create a metric with a metricKind set to CUMULATIVE and a valueType set to DOUBLE. • In Stackdriver's Metrics Explorer, use a Line graph to visualize the metric.",
      "C. • In your application, create a metric with a metricKind set to GAUGE and a valueType set to DISTRIBUTION. • In Stackdriver's Metrics Explorer, use a Heatmap graph to visualize the metric.",
      "D. • In your application, create a metric with a metricKind set to METRIC_KIND_UNSPECIFIED and a valueType set to INT64. • In Stackdriver's Metrics Explorer, use a Stacked Area graph to visualize the metric."
    ],
    "correct": 2,
    "explanation": "Model latency as a GAUGE metric with DISTRIBUTION values and view it as a heatmap to see the full latency spread across users.",
    "discussion": [
      {
        "user": "raf2121",
        "text": "Answer C Reference : https://cloud.google.com/monitoring/api/v3/kinds-and-types?hl=en GAUGE Metric : In which value measures a specific instant in time DELTA Metric : In which the value measures the change since it was last recorded CUMULATIVE metric : In which the value constantly increases over time Question asks, \"Latency of HTTP responses\" - This needs to be specific instant in time , which is GAUGE, hence C (24 votes)"
      },
      {
        "user": "francisco_guerra",
        "text": "Ans C: A: Incorrect: Stacked bar could be but latency its used with distributions B: Incorrect: If we used a cumulative the latency would be increasing in the graph. C: Correct: Latency is commonly measured as a distribution. D: Incorrect: METRIC_KIND_UNSPECIFIED is not the answer that gcp wanted. Latency is commonly measured as a distribution. Given a distribution, you can measure various percentiles. For example, you might measure the number of requests that are slower than the historical 99th percentile. Latency histogram_quantile(0.9, rate(http_request_duration_seconds_bucket[7d])... (9 votes)"
      },
      {
        "user": "Ananda",
        "text": "Selected Answer: C. Submitted C (2 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: C. C - Gauge to see latency distribution (2 votes)"
      },
      {
        "user": "cloudbee",
        "text": "Selected Answer: C. It's guage metric as it is asking latency of http responses. (2 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: C. GAUGE metrics record a value at a particular point in time and DISTRIBUTION captures distribution statistics. A Heatmap is a good way to visualize latencies across all users. https://cloud.google.com/monitoring/api/v3/kinds-and-types?hl=en#metric-kinds (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 47,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Distribution-valued GAUGE metric + heatmap for user latency.",
    "correctRationale": "To understand the latencies all users experience you need the distribution of response times, not a single aggregate. A DISTRIBUTION valueType with GAUGE kind captures per-measurement latency buckets, and a heatmap in Metrics Explorer visualizes that distribution. DOUBLE/INT64 scalars and DELTA/CUMULATIVE kinds collapse the data into averages or counters.",
    "optionRationales": [
      "Wrong: A DELTA/DOUBLE metric stores point values, not a latency distribution, and a stacked bar will not show percentile spread.",
      "Wrong: CUMULATIVE/DOUBLE accumulates a scalar over time; it cannot represent the spread of user latencies.",
      "Correct: GAUGE + DISTRIBUTION records each measurement's bucket so a heatmap shows the true latency distribution across users.",
      "Wrong: An unspecified kind with INT64 is ill-defined and a stacked area shows volume, not latency distribution."
    ]
  },
  {
    "id": 46,
    "topic": "Monitoring & Alerting",
    "difficulty": 1,
    "question": "You support an application running on GCP and want to configure SMS notifications to your team for the most critical alerts in Stackdriver Monitoring. You have already identified the alerting policies you want to configure this for. What should you do?",
    "options": [
      "A. Download and configure a third-party integration between Stackdriver Monitoring and an SMS gateway. Ensure that your team members add their SMS/phone numbers to the external tool.",
      "B. Select the Webhook notifications option for each alerting policy, and configure it to use a third-party integration tool. Ensure that your team members add their SMS/phone numbers to the external tool.",
      "C. Ensure that your team members set their SMS/phone numbers in their Stackdriver Profile. Select the SMS notification option for each alerting policy and then select the appropriate SMS/phone numbers from the list.",
      "D. Configure a Slack notification for each alerting policy. Set up a Slack-to-SMS integration to send SMS messages when Slack messages are received. Ensure that your team members add their SMS/phone numbers to the external integration."
    ],
    "correct": 2,
    "explanation": "Set SMS numbers in each member's Stackdriver profile and pick SMS as the notification channel on the alerting policies.",
    "discussion": [
      {
        "user": "kubosuke",
        "text": "C https://cloud.google.com/monitoring/support/notification-options#creating_channels To configure SMS notifications, do the following: In the SMS section, click Add new and follow the instructions. Click Save. When you set up your alerting policy, select the SMS notification type and choose a verified phone number from the list. (18 votes)"
      },
      {
        "user": "TNT87",
        "text": "C https://cloud.google.com/monitoring/support/notification-options (6 votes)"
      },
      {
        "user": "pradoUA",
        "text": "Selected Answer: C. Had this question on exam 25.10.2022 and originally it says: C. Ensure that your team members set their SMS/phone numbers in their Cloud Monitoring. Select the SMS notification option for each alerting policy and then select the appropriate SMS/phone numbers from the list. Hence definitely C is the answer (3 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: C. C - Google Cloud Monitoring (previously known as Stackdriver) supports SMS notifications (3 votes)"
      },
      {
        "user": "Shasha1",
        "text": "i think answer is D There is no Stackdriver Profile exists to add their phone number. only possible to add the phone number in the notification channel under sms category (3 votes)"
      },
      {
        "user": "jeffersonkozak",
        "text": "Selected Answer: D. Option C suggests ensuring that team members set their SMS/phone numbers in their Stackdriver Profile. This approach is the simplest and most straightforward of the options presented. It requires no additional integration or configuration, and team members can easily manage their contact information in their Stackdriver profile. However, it does require team members to have access to and familiarity with Stackdriver, which may not be the case for all members of the team. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 46,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Native SMS alerting in Cloud Monitoring.",
    "correctRationale": "Cloud Monitoring has a built-in SMS notification channel: each user configures their phone number in their profile, and the alerting policy then selects those numbers. Third-party gateways, webhooks, and Slack bridges all add external dependencies for something the platform does natively.",
    "optionRationales": [
      "Wrong: A third-party SMS gateway adds an external dependency when a native SMS channel exists.",
      "Wrong: Webhooks to a third-party tool are a workaround; SMS is a first-class notification type.",
      "Correct: Native SMS notifications from the alerting policy use the phone numbers configured in each member's profile — least effort, no external tools.",
      "Wrong: Slack-to-SMS chaining introduces two external systems for a native feature."
    ]
  },
  {
    "id": 45,
    "topic": "Incident Management",
    "difficulty": 1,
    "question": "Your company follows Site Reliability Engineering practices. You are the Incident Commander for a new, customer-impacting incident. You need to immediately assign two incident management roles to assist you in an effective incident response. What roles should you assign? (Choose two.)",
    "options": [
      "A. Operations Lead",
      "B. Engineering Lead",
      "C. Communications Lead",
      "D. Customer Impact Assessor",
      "E. External Customer Communications Lead"
    ],
    "correct": [
      0,
      2
    ],
    "explanation": "SRE incident roles: the Operations Lead runs the hands-on mitigation and the Communications Lead owns stakeholder messaging.",
    "discussion": [
      {
        "user": "syslog",
        "text": "AC https://sre.google/workbook/incident-response/ \"The main roles in incident response are the Incident Commander (IC), Communications Lead (CL), and Operations or Ops Lead (OL).\" (34 votes)"
      },
      {
        "user": "Luvero",
        "text": "A, C - other roles are appropriate .. (3 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: AC. A - Operations lead: fixes the issue C - Communications lead: keeps stakeholders informed (2 votes)"
      },
      {
        "user": "Biden",
        "text": "Who gave AE as the correct answer ? why not this tool display/reveal the correct answer from the \"Highly Voted\" from the discussion thread for each Q? (2 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: AC. option A and C (1 vote)"
      },
      {
        "user": "maxdanny",
        "text": "Selected Answer: AC. AC Main Roles in Incident Response (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 45,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Standard incident command roles to assign first.",
    "correctRationale": "In the Google SRE incident command structure, the Incident Commander delegates two immediate roles: the Operations Lead (drives technical mitigation) and the Communications Lead (keeps stakeholders informed). Engineering Lead, Customer Impact Assessor, and External Customer Communications Lead are not standard incident-command roles.",
    "optionRationales": [
      "Correct: The Operations Lead is a core incident-command role responsible for operational response.",
      "Wrong: Engineering Lead is not one of the defined incident-management roles.",
      "Correct: The Communications Lead is a core incident-command role handling internal and external updates.",
      "Wrong: Customer Impact Assessor is not a defined role in the SRE incident framework.",
      "Wrong: External customer communication falls under the Communications Lead; there is no separate External Customer Communications Lead role."
    ]
  },
  {
    "id": 44,
    "topic": "Monitoring & Alerting",
    "difficulty": 3,
    "question": "Your team has recently deployed an NGINX-based application into Google Kubernetes Engine (GKE) and has exposed it to the public via an HTTP Google Cloud Load Balancer (GCLB) ingress. You want to scale the deployment of the application's frontend using an appropriate Service Level Indicator (SLI). What should you do?",
    "options": [
      "A. Configure the horizontal pod autoscaler to use the average response time from the Liveness and Readiness probes.",
      "B. Configure the vertical pod autoscaler in GKE and enable the cluster autoscaler to scale the cluster as pods expand.",
      "C. Install the Stackdriver custom metrics adapter and configure a horizontal pod autoscaler to use the number of requests provided by the GCLB.",
      "D. Expose the NGINX stats endpoint and configure the horizontal pod autoscaler to use the request metrics exposed by the NGINX deployment."
    ],
    "correct": 2,
    "explanation": "The Custom Metrics adapter lets the HPA scale on the GCLB's per-frontend request count — a real SLI-driven autoscaling signal.",
    "discussion": [
      {
        "user": "kubosuke",
        "text": "C is correct A. Configure the horizontal pod autoscaler to use the average response time from the Liveness and Readiness Probes. --> using health check as a trigger of scaling is weird. if the response time of the health check is delayed, it may be caused by resources issues such as CPU, memories, and so on. so you should use such values as SLIs. B. Configure the vertical pod autoscaler in GKE and enable the cluster autoscaler to scale the cluster as pods expand. --> it doesn't referred to pod autoscaling. D. Expose the NGINX stats endpoint and configure the horizontal pod autoscaler to use... (13 votes)"
      },
      {
        "user": "ralf_cc",
        "text": "C - https://cloud.google.com/kubernetes-engine/docs/tutorials/autoscaling-metrics You want to scale horizontally (4 votes)"
      },
      {
        "user": "Wael216",
        "text": "Selected Answer: C. C. Install the Stackdriver custom metrics adapter and configure a horizontal pod autoscaler to use the number of requests provided by the GCLB. To scale the deployment of the application's frontend using an appropriate Service Level Indicator (SLI), we need to monitor the traffic coming to the application. One way to do this is to install the Stackdriver custom metrics adapter, which provides visibility into GCLB metrics such as request counts, bytes sent and received, and active connections. We can then configure a horizontal pod autoscaler (HPA) to scale the number of... (3 votes)"
      },
      {
        "user": "Shasha1",
        "text": "B is correct front-end web applications Scale based on the number of incoming request. so need vertical scaling Back-end Batch Processing (Scale Horizontally) reference https://docs.rightscale.com/faq/What_is_auto-scaling.html (3 votes)"
      },
      {
        "user": "ramzez4815",
        "text": "Selected Answer: C. C is the correct answer as per Google documentation (2 votes)"
      },
      {
        "user": "Murty549",
        "text": "Selected Answer: C. Option B is incorrect because there will be no benefit in vertically scaling the front end if the requests are very high. Because in that case the network is the bottleneck and not the instance resources. In my opinion the Answer is C. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 44,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "HPA on an external SLI (load balancer requests) via the custom metrics adapter.",
    "correctRationale": "A meaningful scaling SLI for an HTTP frontend is request rate at the Google Cloud Load Balancer. The Stackdriver custom metrics adapter (Custom Metrics Stackdriver Adapter) exposes Cloud Monitoring metrics — including the load balancer's request count — to the Horizontal Pod Autoscaler. Probes and NGINX stub stats do not express the user-facing request SLI as directly.",
    "optionRationales": [
      "Wrong: Liveness/readiness probes are binary health signals, not an SLI the HPA can scale on.",
      "Wrong: VPA resizes pod resource requests; it does not scale replica count with traffic.",
      "Correct: The custom metrics adapter exposes the GCLB request count to the HPA, scaling the frontend on a genuine request-based SLI.",
      "Wrong: NGINX's own stats endpoint measures the server, not the request rate users experience through the load balancer."
    ],
    "legacyNote": "The Stackdriver custom metrics adapter is now the Custom Metrics Stackdriver Adapter for Kubernetes; GKE can also scale natively on load-balancer requests per second."
  },
  {
    "id": 43,
    "topic": "Supply Chain Security",
    "difficulty": 1,
    "question": "Your application services run in Google Kubernetes Engine (GKE). You want to make sure that only images from your centrally-managed Google Container Registry (GCR) image registry in the altostrat-images project can be deployed to the cluster while minimizing development time. What should you do?",
    "options": [
      "A. Create a custom builder for Cloud Build that will only push images to gcr.io/altostrat-images.",
      "B. Use a Binary Authorization policy that includes the whitelist name pattern gcr.io/altostrat-images/.",
      "C. Add logic to the deployment pipeline to check that all manifests contain only images from gcr.io/altostrat-images.",
      "D. Add a tag to each image in gcr.io/altostrat-images and check that this tag is present when the image is deployed."
    ],
    "correct": 1,
    "explanation": "A Binary Authorization allowlist name pattern gcr.io/altostrat-images/ gates deployments to only that registry, with no code changes.",
    "discussion": [
      {
        "user": "tycho",
        "text": "B) https://cloud.google.com/binary-authorization/docs/cloud-build (4 votes)"
      },
      {
        "user": "Shasha1",
        "text": "D https://cloud.google.com/container-registry/docs/using-with-google-cloud-platform (3 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: B. Option B (2 votes)"
      },
      {
        "user": "Halimb",
        "text": "Selected Answer: B. See https://cloud.google.com/binary-authorization/docs/example-policies (2 votes)"
      },
      {
        "user": "Ananda",
        "text": "Selected Answer: B. B is the answer (2 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: B. B - Binary authorisation is the answer… (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 43,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Image-source restriction via Binary Authorization name patterns.",
    "correctRationale": "Binary Authorization policies can exempt or admit images by registry path pattern — an allowlist pattern of gcr.io/altostrat-images/ permits only the centrally managed registry's images. This enforces at deploy time inside GKE, which pipeline-side checks cannot do, and needs no development work.",
    "optionRationales": [
      "Wrong: Restricting where the builder pushes does not stop someone deploying an outside image directly to the cluster.",
      "Correct: A Binary Authorization allowlist pattern for gcr.io/altostrat-images/ enforces the source restriction at deploy time with minimal work.",
      "Wrong: Pipeline manifest checks are bypassable by deploying outside the pipeline; enforcement must live in the cluster's admission path.",
      "Wrong: Tags are mutable labels anyone with push access can apply; they prove nothing about the image's trusted origin."
    ],
    "legacyNote": "Container Registry is deprecated in favor of Artifact Registry, and Binary Authorization now calls these allowlist 'name pattern' exempt images; the approach still applies."
  },
  {
    "id": 42,
    "topic": "Logging",
    "difficulty": 2,
    "question": "You manage an application that is writing logs to Stackdriver Logging. You need to give some team members the ability to export logs. What should you do?",
    "options": [
      "A. Grant the team members the IAM role of logging.configWriter on Cloud IAM.",
      "B. Configure Access Context Manager to allow only these members to export logs.",
      "C. Create and grant a custom IAM role with the permissions logging.sinks.list and logging.sink.get.",
      "D. Create an Organizational Policy in Cloud IAM to allow only these members to create log exports."
    ],
    "correct": 0,
    "explanation": "roles/logging.configWriter (Logs Configuration Writer) is the predefined role that can create and manage sinks/exports.",
    "discussion": [
      {
        "user": "Manh",
        "text": "It's should be C. least privilege The question is ask about export log and does not mention about read and write log Option A give too many permission Logs Configuration Writer (roles/logging.configWriter) Provides permissions to read and write the configurations of logs-based metrics and sinks for exporting logs. logging.buckets.create logging.buckets.delete logging.buckets.get logging.buckets.list logging.buckets.undelete logging.buckets.update logging.cmekSettings.* logging.exclusions.* logging.locations.* logging.logMetrics.* logging.logServiceIndexes.* logging.logServices.*... (7 votes)"
      },
      {
        "user": "not_thanos",
        "text": "Write answer is A as stated in the documentation here https://cloud.google.com/logging/docs/export/configure_export_v2#before-you-begin \"Note that this guide describes creating and managing sinks at the Cloud project level, but you can create sinks (non-aggregated) for billing accounts, folders, and organizations. As you get started, ensure the following: You have a Google Cloud project with logs that you can see in the Logs Explorer. You have one of the following IAM roles for the source Cloud project from which you're routing logs. Owner (roles/owner) Logging Admin (roles/logging.admin)... (4 votes)"
      },
      {
        "user": "sticky",
        "text": "A is correct Logs Configuration Writer (roles/logging.configWriter) - Provides permissions to read and write the configurations of logs-based metrics and sinks for exporting logs. https://cloud.google.com/logging/docs/access-control (4 votes)"
      },
      {
        "user": "Sreedharveluru",
        "text": "Selected Answer: A. There is no such thing called logging.sink.get (3 votes)"
      },
      {
        "user": "cloudbee",
        "text": "https://cloud.google.com/logging/docs/export/configure_export_v2#before-you-begin A is the answer (3 votes)"
      },
      {
        "user": "giammydell",
        "text": "but C could follow the least privilege priciple (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 42,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority C proposed a custom role with sinks.list/get, but those permissions only read sinks — they cannot create an export. Logs Configuration Writer is the predefined role for this.",
    "conceptSummary": "Predefined IAM role for managing log exports.",
    "correctRationale": "Granting Logs Configuration Writer gives the members the sink-management permissions needed to export logs — least-privilege and no custom machinery. A custom role with sinks.list/get can only read sinks, not create them. Access Context Manager and org policies control context/boundaries, not this permission grant.",
    "optionRationales": [
      "Correct: logging.configWriter is the predefined role covering creation and management of log sinks/exports.",
      "Wrong: Access Context Manager defines context-aware access levels, not which IAM permissions a user holds.",
      "Wrong: logging.sinks.list and logging.sinks.get are read-only; a custom role built on them cannot create an export.",
      "Wrong: Organization policies set guardrails for the hierarchy; they do not grant sink-creation permissions."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 41,
    "topic": "SLOs & Error Budgets",
    "difficulty": 2,
    "question": "You support a high-traffic web application that runs on Google Cloud Platform (GCP). You need to measure application reliability from a user perspective without making any engineering changes to it. What should you do? (Choose two.)",
    "options": [
      "A. Review current application metrics and add new ones as needed.",
      "B. Modify the code to capture additional information for user interaction.",
      "C. Analyze the web proxy logs only and capture response time of each request.",
      "D. Create new synthetic clients to simulate a user journey using the application.",
      "E. Use current and historic Request Logs to trace customer interaction with the application."
    ],
    "correct": [
      3,
      4
    ],
    "explanation": "Synthetic clients and existing request logs measure real user-facing reliability without touching the application's code.",
    "discussion": [
      {
        "user": "ralf_cc",
        "text": "DE - synthetic transactions (29 votes)"
      },
      {
        "user": "[Removed]",
        "text": "1.Based on \" without making any engineering changes to it\" , exclude A,B at first. 2. Based on following described, https://cloud.google.com/architecture/adopting-slos#choosing_a_measurement_method D & E should be better. (5 votes)"
      },
      {
        "user": "paul223344",
        "text": "Answer: CE A. Review current application metrics and add new ones as needed. ==> (x) \"add new ones\" needs engineering changes B. Modify the code to capture additional information for user interaction. ==> (x) \"Modify the code\" needs engineering changes C. Analyze the web proxy logs only and capture response time of each request. ==> (O) no engineering changes D. Create new synthetic clients to simulate a user journey using the application. => (x) \"Create new synthetic client\" needs engineering changes. E. Use current and historic Request Logs to trace customer interaction with the... (5 votes)"
      },
      {
        "user": "akg001",
        "text": "for me it looks like C,E the correct answer. E for sure. (5 votes)"
      },
      {
        "user": "enter_co",
        "text": "Selected Answer: DE. A - Adding metrics doesn't necessarily reflect reliability from a user perspective' B - Modifying the code is against the requirement C - Analyzing proxy logs doesn't connect the findings to a user perspective From the request logs, user journeys can be recreated (E) and the replays can be fed to synthetic clients to simulate/replay (D). (4 votes)"
      },
      {
        "user": "Freemiums",
        "text": "Selected Answer: CE. C and E should be the correct answer, since the question state that \"without making ANY engineering changes\" (4 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 41,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority C,E: analyzing web proxy logs only captures per-request latency but misses the end-to-end user journey; synthetic clients plus existing request logs measure user-visible reliability with no code changes.",
    "conceptSummary": "User-perspective reliability measurement with zero code changes.",
    "correctRationale": "The constraint is no engineering changes to the app, and the goal is reliability as users experience it. Synthetic clients that simulate the user journey exercise the real stack end to end, and existing request logs already record what users actually experienced. Web-proxy logs alone capture only per-request latency and miss the journey; new metrics or code changes violate the no-change constraint.",
    "optionRationales": [
      "Wrong: Adding metrics is an engineering change to instrumentation scope and stays an internal view, not the user's.",
      "Wrong: Modifying code directly violates the no-engineering-changes constraint.",
      "Wrong: Web proxy logs show per-request latency only; they miss the multi-step user journey and client-side experience.",
      "Correct: Synthetic clients replay real user journeys against production, measuring reliability exactly as users see it.",
      "Correct: Current and historic request logs already capture real user interactions — no changes needed to analyze them."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 40,
    "topic": "Incident Management",
    "difficulty": 1,
    "question": "Your company follows Site Reliability Engineering principles. You are writing a postmortem for an incident, triggered by a software change, that severely affected users. You want to prevent severe incidents from happening in the future. What should you do?",
    "options": [
      "A. Identify engineers responsible for the incident and escalate to their senior management.",
      "B. Ensure that test cases that catch errors of this type are run successfully before new software releases.",
      "C. Follow up with the employees who reviewed the changes and prescribe practices they should follow in the future.",
      "D. Design a policy that will require on-call teams to immediately call engineers and management to discuss a plan of action if an incident occurs."
    ],
    "correct": 1,
    "explanation": "Add test cases that catch this class of error and gate releases on them — prevention, not blame.",
    "discussion": [
      {
        "user": "devopsbatch",
        "text": "B make automation better (10 votes)"
      },
      {
        "user": "Vallal",
        "text": "c is the correct answer (4 votes)"
      },
      {
        "user": "kubosuke",
        "text": "I think D is correct. > you want to prevent severe incidents from happening in the future. we need to chose the answer that 'prevent severe incidents'. B: create test cases can reduce the possibility of incidents, but it doesn't ease the 'severe incidents'. to minimize the effect of incidents, we need to make a consensus to manage incidents. for these backgrounds, the answer is D. (4 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: B. B - Blameless port-mortens. Focus on the process and not in the people. (3 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: B. Answer is B (2 votes)"
      },
      {
        "user": "devOpsForFun",
        "text": "Selected Answer: D. D is correct. B is too narrow (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 40,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Postmortem action: prevent recurrence via release-gating tests.",
    "correctRationale": "To prevent a repeat of a software-change-caused outage, the postmortem action should ensure tests catching this error type run and pass before every release. Identifying engineers, lecturing reviewers, or mandating emergency calls all target people rather than the systemic gap.",
    "optionRationales": [
      "Wrong: Escalating individuals to management is the opposite of blameless culture and prevents nothing.",
      "Correct: Requiring release-blocking test cases for this failure class removes the systemic cause.",
      "Wrong: Prescribing practices to reviewers is blame-oriented and weaker than an automated gate.",
      "Wrong: Calling engineers during an incident is a response procedure, not a prevention of future bad releases."
    ]
  },
  {
    "id": 39,
    "topic": "CI/CD Pipelines",
    "difficulty": 1,
    "question": "You have a CI/CD pipeline that uses Cloud Build to build new Docker images and push them to Docker Hub. You use Git for code versioning. After making a change in the Cloud Build YAML configuration, you notice that no new artifacts are being built by the pipeline. You need to resolve the issue following Site Reliability Engineering practices. What should you do?",
    "options": [
      "A. Disable the CI pipeline and revert to manually building and pushing the artifacts.",
      "B. Change the CI pipeline to push the artifacts is Container Registry instead of Docker Hub.",
      "C. Upload the configuration YAML file to Cloud Storage and use Error Reporting to identify and fix the issue.",
      "D. Run a Git compare between the previous and current Cloud Build Configuration files to find and fix the bug."
    ],
    "correct": 3,
    "explanation": "The regression came from a config change — diff the cloudbuild.yaml against the previous version in Git and fix the bug.",
    "discussion": [
      {
        "user": "ralf_cc",
        "text": "D - find out what's changed in the build spec (12 votes)"
      },
      {
        "user": "Shasha1",
        "text": "B is correct artifact can not push to Docker hub only docker images possible. therefore, need to push the artifacts to google cloud container registry not to the public docker hub. https://cloud.google.com/build/docs/interacting-with-dockerhub-images (5 votes)"
      },
      {
        "user": "aswani",
        "text": "are these questions relevant yet? with the new exam version launched in may (3 votes)"
      },
      {
        "user": "vijaigcp",
        "text": "Selected Answer: D. Would go with D (3 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: D. Option D (2 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: D. D. Run a Git compare between the previous and current Cloud Build Configuration files to find and fix the bug. This option allow you to compare the previous and current Cloud Build Configuration files and find what has been changed and understand what could be causing the issue. After identifying the problem, you can fix it and ensure that the pipeline is working correctly again. This approach is based on the SRE practices of identifying and resolving issues quickly and effectively. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 39,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Debugging a broken pipeline by diffing the changed config in Git.",
    "correctRationale": "Builds stopped right after a change to the Cloud Build YAML, so the fastest and most SRE-aligned move is a Git compare between the old and new config to find the regression. Disabling CI, swapping registries, or uploading the file to Error Reporting do not address the changed-config root cause.",
    "optionRationales": [
      "Wrong: Reverting to manual builds abandons CI entirely instead of fixing the introduced bug.",
      "Wrong: The registry destination is unrelated; nothing suggests Docker Hub broke — the config edit did.",
      "Wrong: Error Reporting tracks runtime application exceptions, not build configuration mistakes.",
      "Correct: A Git compare between previous and current cloudbuild.yaml pinpoints exactly what broke and lets you fix it."
    ]
  },
  {
    "id": 38,
    "topic": "Logging",
    "difficulty": 3,
    "question": "You are running an application on Compute Engine and collecting logs through Stackdriver. You discover that some personally identifiable information (PII) is leaking into certain log entry fields. All PII entries begin with the text userinfo. You want to capture these log entries in a secure location for later review and prevent them from leaking to Stackdriver Logging. What should you do?",
    "options": [
      "A. Create a basic log filter matching userinfo, and then configure a log export in the Stackdriver console with Cloud Storage as a sink.",
      "B. Use a Fluentd filter plugin with the Stackdriver Agent to remove log entries containing userinfo, and then copy the entries to a Cloud Storage bucket.",
      "C. Create an advanced log filter matching userinfo, configure a log export in the Stackdriver console with Cloud Storage as a sink, and then configure a log exclusion with userinfo as a filter.",
      "D. Use a Fluentd filter plugin with the Stackdriver Agent to remove log entries containing userinfo, create an advanced log filter matching userinfo, and then configure a log export in the Stackdriver console with Cloud Storage as a sink."
    ],
    "correct": 2,
    "explanation": "An advanced filter routes the PII entries to the locked-down bucket sink, and the exclusion keeps them out of every Cloud Logging bucket — capture without exposure.",
    "discussion": [
      {
        "user": "DucLee3110",
        "text": "looks like it is B. https://medium.com/google-cloud/fluentd-filter-plugin-for-google-cloud-data-loss-prevention-api-42bbb1308e76 (19 votes)"
      },
      {
        "user": "francisco_guerra",
        "text": "Im not pretty sure but Ans B Prevent them form leaking to Stackdriver logging A: Incorrect, Leaking to Stackdriver B: Correct, not leaking to Stackdriver & fluentD C: Incorrect, Leaking D: If we removed why we need to create a filter matching there will not be logs with userinfo? (9 votes)"
      },
      {
        "user": "Shasha1",
        "text": "A question is about capture logs entries in a secure location for later review, not removing the log sensitive data before store then in a secure location. so answer is A (4 votes)"
      },
      {
        "user": "saiprasathdv",
        "text": "Selected Answer: B. Option B: https://cloud.google.com/logging/docs/agent/logging/configuration. Custom defined log entries has this structure \"[TAG_NAME]+Payload+timestamp+Severity+labels\". Here \"Userinfo\" is the TAG_NAME. Fluentd filter plugins used to filter out logs based on TAG_NAME. finally this could be stored in Cloud storage. (3 votes)"
      },
      {
        "user": "TNT87",
        "text": "B https://medium.com/google-cloud/fluentd-filter-plugin-for-google-cloud-data-loss-prevention-api-42bbb1308e76 (3 votes)"
      },
      {
        "user": "j3e",
        "text": "B. filter_record_transformer to be exact. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 38,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics B (community 86% B); changed after a second review. The Log Router evaluates sinks and exclusion filters before anything is stored: an advanced filter on userinfo routes those entries to a locked-down Cloud Storage bucket, and the exclusion keeps them out of every Cloud Logging bucket, so nobody can read them there. B is self-contradictory: a Fluentd filter that removes the entries drops them from the stream, so nothing remains to copy to Cloud Storage (that would need a copy or rewrite_tag_filter output, not a filter). D adds a log filter for entries that were already removed.",
    "conceptSummary": "Route PII to Cloud Storage and exclude it from Logging buckets at the sink layer.",
    "correctRationale": "Log Router evaluates sinks and exclusions before storage: an advanced filter on userinfo sends those entries to the Cloud Storage bucket sink, and the exclusion filter keeps them out of every Cloud Logging bucket — so they land only in the secure location (C). B is self-contradictory: a Fluentd filter that removes entries drops them from the stream, leaving nothing to copy (that would need copy/rewrite_tag_filter, not a filter). A only exports — the entries still land in Logging. D filters the PII away before the export, so the export sees nothing.",
    "optionRationales": [
      "Wrong: A basic filter plus export sends copies to the bucket but the entries still land in Cloud Logging — the leak persists.",
      "Wrong: A Fluentd filter that removes the entries drops them entirely; nothing remains to copy to Cloud Storage.",
      "Correct: Export via the advanced filter secures them in Cloud Storage, and the exclusion removes them from Cloud Logging entirely.",
      "Wrong: The agent-side filter already deleted the entries, so the downstream Logging filter and export have nothing to act on."
    ],
    "legacyNote": "The Stackdriver Logging agent (fluentd) is now the Ops Agent (Fluent Bit).",
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 37,
    "topic": "Performance & Cost",
    "difficulty": 1,
    "question": "You need to deploy a new service to production. The service needs to automatically scale using a Managed Instance Group (MIG) and should be deployed over multiple regions. The service needs a large number of resources for each instance and you need to plan for capacity. What should you do?",
    "options": [
      "A. Use the n1-highcpu-96 machine type in the configuration of the MIG.",
      "B. Monitor results of Stackdriver Trace to determine the required amount of resources.",
      "C. Validate that the resource requirements are within the available quota limits of each region.",
      "D. Deploy the service in one region and use a global load balancer to route traffic to this region."
    ],
    "correct": 2,
    "explanation": "Validate the per-region quota can fit the large instances before deploying — capacity planning is about quota, not a guessed machine type.",
    "discussion": [
      {
        "user": "TNT87",
        "text": "C https://cloud.google.com/compute/quotas (12 votes)"
      },
      {
        "user": "ralf_cc",
        "text": "C - it is asking for quota (4 votes)"
      },
      {
        "user": "DucLee3110",
        "text": "I think C is the answer. https://cloud.google.com/compute/quotas#understanding_quotas https://cloud.google.com/compute/quotas (4 votes)"
      },
      {
        "user": "kubosuke",
        "text": "absolutely C 'cause this service is deployed into MIG and you only have to take care of quota. (3 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: C. option c (2 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: C. C. Validate that the resource requirements are within the available quota limits of each region. It is important to ensure that the resource requirements are within the available quota limits in each region before deploying the service, to avoid exceeding the limits and causing problems. This is essential to ensure that the service is deployed correctly and has the necessary capacity to handle the load. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 37,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Capacity planning = verify quotas in every target region.",
    "correctRationale": "Each instance needs many resources and the MIG spans multiple regions, so the binding constraint is whether each region's quota can accommodate the instances — validate that first. Picking n1-highcpu-96 guesses at sizing without data, Trace measures request latency not capacity, and single-region deployment fails the multi-region requirement.",
    "optionRationales": [
      "Wrong: Choosing a machine type by name skips the actual capacity question: whether quota exists in each region.",
      "Wrong: Cloud Trace traces request latency; it tells you nothing about available resource quota for new instances.",
      "Correct: Verifying resource requirements against each region's quota limits is the correct capacity-planning step before deploying.",
      "Wrong: Deploying in one region contradicts the multi-region requirement."
    ]
  },
  {
    "id": 36,
    "topic": "Logging",
    "difficulty": 1,
    "question": "You support an application that stores product information in cached memory. For every cache miss, an entry is logged in Stackdriver Logging. You want to visualize how often a cache miss happens over time. What should you do?",
    "options": [
      "A. Link Stackdriver Logging as a source in Google Data Studio. Filter the logs on the cache misses.",
      "B. Configure Stackdriver Profiler to identify and visualize when the cache misses occur based on the logs.",
      "C. Create a logs-based metric in Stackdriver Logging and a dashboard for that metric in Stackdriver Monitoring.",
      "D. Configure BigQuery as a sink for Stackdriver Logging. Create a scheduled query to filter the cache miss logs and write them to a separate table."
    ],
    "correct": 2,
    "explanation": "A logs-based metric turns each cache-miss log entry into a time series you can chart on a Monitoring dashboard.",
    "discussion": [
      {
        "user": "syslog",
        "text": "I think C: https://cloud.google.com/logging/docs/logs-based-metrics#counter-metric (11 votes)"
      },
      {
        "user": "TNT87",
        "text": "C https://cloud.google.com/logging/docs/logs-based-metrics#counter-metric (4 votes)"
      },
      {
        "user": "floppino",
        "text": "Selected Answer: C. Ans: C Exam passed and taken on 19/12/2022, 50/50 from this dump without buying the full access and looking for 'devops' word here: https://www.examtopics.com/discussions/google/1/ (2 votes)"
      },
      {
        "user": "vijaigcp",
        "text": "Selected Answer: C. Answer C (2 votes)"
      },
      {
        "user": "habla2019pasta",
        "text": "Selected Answer: C. Option C (1 vote)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: C. Option C (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 36,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Visualizing log-event frequency with a logs-based metric.",
    "correctRationale": "Logs-based metrics count log entries matching a filter — here, cache-miss entries — and expose them as time series in Cloud Monitoring, where a dashboard plots frequency over time. That is the purpose-built, minimal path; Looker Studio cannot read Logging directly, Profiler profiles code, and BigQuery scheduled queries are a heavy detour for a simple counter chart.",
    "optionRationales": [
      "Wrong: Looker Studio/Data Studio cannot connect to Cloud Logging directly; you would need an export first anyway.",
      "Wrong: Profiler shows CPU/memory usage of code paths, not occurrences of a log event.",
      "Correct: A logs-based metric on the cache-miss filter plus a Monitoring dashboard visualizes exactly how often misses happen over time.",
      "Wrong: BigQuery export plus scheduled queries is workable but far more machinery than a logs-based metric for this need."
    ]
  },
  {
    "id": 35,
    "topic": "CI/CD Pipelines",
    "difficulty": 2,
    "question": "Your team uses Cloud Build for all CI/CD pipelines. You want to use the kubectl builder for Cloud Build to deploy new images to Google Kubernetes Engine (GKE). You need to authenticate to GKE while minimizing development effort. What should you do?",
    "options": [
      "A. Assign the Container Developer role to the Cloud Build service account.",
      "B. Specify the Container Developer role for Cloud Build in the cloudbuild.yaml file.",
      "C. Create a new service account with the Container Developer role and use it to run Cloud Build.",
      "D. Create a separate step in Cloud Build to retrieve service account credentials and pass these to kubectl."
    ],
    "correct": 0,
    "explanation": "Grant the Cloud Build service account the Container Developer role — the IAM fix that lets kubectl deploy to GKE with the least code.",
    "discussion": [
      {
        "user": "TNT87",
        "text": "A https://cloud.google.com/build/docs/securing-builds/configure-user-specified-service-accounts (11 votes)"
      },
      {
        "user": "cloudbee",
        "text": "Selected Answer: A. A should be the correct one. because assigning permission to cloud build service account will give permission to deploy while minimizing additional overhead. (4 votes)"
      },
      {
        "user": "akg001",
        "text": "User managed service account in the option C can be used only for manual builds. As CI/CD is being used so assigning the permission to default build service account could be good idea. so it seems best answer is A https://cloud.google.com/build/docs/securing-builds/configure-user-specified-service-accounts (4 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: C. Option C (3 votes)"
      },
      {
        "user": "felipeschossler",
        "text": "Selected Answer: A. 100% A and this is the doc the proves this: https://cloud.google.com/build/docs/deploying-builds/deploy-gke#required_iam_permissions (3 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: A. The best option for authenticating to GKE while minimizing development effort would be A. Assign the Container Developer role to the Cloud Build service account. Google Cloud Build uses a default service account to run the build, this service account is automatically created by Cloud Build and it has the necessary permissions to access the resources used by the build. By assigning the Container Developer role to this service account, it will have the necessary permissions to deploy new images to GKE. This way you don't need to create a new service account or specify the... (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 35,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Authenticating Cloud Build to GKE via the build service account's IAM role.",
    "correctRationale": "Cloud Build executes steps as a service account; giving that account roles/container.developer lets the kubectl builder authenticate to GKE with zero extra plumbing. Options that put roles in cloudbuild.yaml, mint a new service account, or add credential-fetching steps all add effort without changing the result.",
    "optionRationales": [
      "Correct: Granting Container Developer to the Cloud Build service account is the minimal, standard way to authorize kubectl deploys.",
      "Wrong: cloudbuild.yaml cannot assign IAM roles — permissions are granted through IAM, not build config.",
      "Wrong: A new service account adds identity-management overhead; the build already runs as a service account you can grant directly.",
      "Wrong: Fetching credentials in a build step is unnecessary complexity and pushes credential handling into the pipeline."
    ],
    "legacyNote": "Since 2024 new projects run Cloud Build as a user-specified or Compute Engine default service account rather than the legacy Cloud Build service account; grant the role to whichever account your builds actually use."
  },
  {
    "id": 34,
    "topic": "Incident Management",
    "difficulty": 1,
    "question": "Your company follows Site Reliability Engineering practices. You are the person in charge of Communications for a large, ongoing incident affecting your customer-facing applications. There is still no estimated time for a resolution of the outage. You are receiving emails from internal stakeholders who want updates on the outage, as well as emails from customers who want to know what is happening. You want to efficiently provide updates to everyone affected by the outage. What should you do?",
    "options": [
      "A. Focus on responding to internal stakeholders at least every 30 minutes. Commit to \"next update\" times.",
      "B. Provide periodic updates to all stakeholders in a timely manner. Commit to a \"next update\" time in all communications.",
      "C. Delegate the responding to internal stakeholder emails to another member of the Incident Response Team. Focus on providing responses directly to customers.",
      "D. Provide all internal stakeholder emails to the Incident Commander, and allow them to manage internal communications. Focus on providing responses directly to customers."
    ],
    "correct": 1,
    "explanation": "The Communications Lead should send periodic updates to all stakeholders and always commit to a next-update time.",
    "discussion": [
      {
        "user": "francisco_guerra",
        "text": "Ans: B (the communication lead CAN'T delegate) When disaster strikes, the person who declares the incident typically steps into the IC role and directs the high-level state of the incident. The IC concentrates on the 3Cs and does the following: Commands and coordinates the incident response, delegating roles as needed. By default, the IC assumes all roles that have not been delegated yet. Communicates effectively. Stays in control of the incident response. Works with other responders to resolve the incident. https://sre.google/workbook/incident-response/ (24 votes)"
      },
      {
        "user": "danchoif2",
        "text": "B is correct C is wrong. If CL want to delegate, s/he must talk with IC that we need another internal CL. IC will delegate if needed. (3 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: B. The best option for efficiently providing updates to everyone affected by the outage would be: B. Provide periodic updates to all stakeholders in a timely manner. Commit to a \"next update\" time in all communications. During an incident, it's important to keep all stakeholders informed about the current situation and any progress made towards resolving the problem. Providing periodic updates to all stakeholders, including internal stakeholders and customers, is the most effective way of ensuring everyone is informed. Additionally, by committing to a \"next update\" time in... (2 votes)"
      },
      {
        "user": "garmstrong",
        "text": "Selected Answer: B. B - providing updates to all stakeholders is your job as being in charge of communications. Incident Commander delegates. (2 votes)"
      },
      {
        "user": "meetplanet",
        "text": "Selected Answer: B. B is correct. everyone is saying B is correct. not sure why final answer is C!! (2 votes)"
      },
      {
        "user": "ralf_cc",
        "text": "B is most correct one, with quite a lot of details missing, but the direction is right (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 34,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Incident communications: cadence plus a promised next-update time.",
    "correctRationale": "SRE incident communications keep both internal stakeholders and external customers informed on a predictable cadence. Committing to a 'next update' time in every message stops the drip of inbound 'any news?' emails, letting the CL focus. Splitting internal vs external onto different people or triaging only internal asks fragments ownership.",
    "optionRationales": [
      "Wrong: Updating only internal stakeholders leaves customers — the people actually impacted — without communication.",
      "Correct: One channel of periodic updates to all stakeholders with a committed next-update time is the efficient, recommended pattern.",
      "Wrong: Delegating internal comms to a teammate while the CL handles customers fragments a role that is designed to own all incident messaging.",
      "Wrong: Making the IC write internal updates pulls the incident commander away from coordinating the response."
    ]
  },
  {
    "id": 33,
    "topic": "Supply Chain Security",
    "difficulty": 2,
    "question": "Your application artifacts are being built and deployed via a CI/CD pipeline. You want the CI/CD pipeline to securely access application secrets. You also want to more easily rotate secrets in case of a security breach. What should you do?",
    "options": [
      "A. Prompt developers for secrets at build time. Instruct developers to not store secrets at rest.",
      "B. Store secrets in a separate configuration file on Git. Provide select developers with access to the configuration file.",
      "C. Store secrets in Cloud Storage encrypted with a key from Cloud KMS. Provide the CI/CD pipeline with access to Cloud KMS via IAM.",
      "D. Encrypt the secrets and store them in the source code repository. Store a decryption key in a separate repository and grant your pipeline access to it."
    ],
    "correct": 2,
    "explanation": "Store secrets encrypted with a Cloud KMS key in Cloud Storage and grant the pipeline IAM access — centralized, encrypted, and easy to rotate.",
    "discussion": [
      {
        "user": "driftwood",
        "text": "C is the \"best\" from the choices given (13 votes)"
      },
      {
        "user": "akg001",
        "text": "C is the best option. (4 votes)"
      },
      {
        "user": "devopsbatch",
        "text": "answer C storing secrets in cloud is better option (4 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: C. The best option for securing application secrets while making it easier to rotate them in case of a security breach would be: C. Store secrets in Cloud Storage encrypted with a key from Cloud KMS. Provide the CI/CD pipeline with access to Cloud KMS via IAM. By storing secrets in Cloud Storage, you can take advantage of the security features provided by the platform and encrypt them using Cloud KMS, a GCP service that allows you to create, manage, and use encryption keys. This way you can control who has access to the secrets, and you can easily rotate the encryption keys... (2 votes)"
      },
      {
        "user": "vijaigcp",
        "text": "Selected Answer: C. Answer is C , https://cloud.google.com/security-key-management (2 votes)"
      },
      {
        "user": "habla2019pasta",
        "text": "Selected Answer: C. Option C (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 33,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Pre-Secret-Manager pattern for pipeline secrets: KMS + Cloud Storage.",
    "correctRationale": "Central storage in Cloud Storage with Cloud KMS encryption keeps secrets out of source control, and IAM-scoped access lets the CI/CD pipeline decrypt them on demand. Rotating a secret means replacing the object — one place, no code changes. (Today the idiomatic answer is Secret Manager, which did not exist as an option.)",
    "optionRationales": [
      "Wrong: Prompting developers at build time is manual, breaks automation, and teaches people to handle secrets.",
      "Wrong: A config file in Git puts secrets into source control history — a breach even for 'select' readers.",
      "Correct: KMS-encrypted secrets in Cloud Storage with IAM-gated decrypt access is secure, centralized, and easy to rotate.",
      "Wrong: Encrypted secrets in the repo still put ciphertext into history and split the key across another repo, adding risk and complexity."
    ],
    "legacyNote": "This predates Secret Manager. Today the expected answer is storing the secrets in Secret Manager; the KMS-encrypted Cloud Storage pattern is the older equivalent."
  },
  {
    "id": 32,
    "topic": "Incident Management",
    "difficulty": 1,
    "question": "You support a production service that runs on a single Compute Engine instance. You regularly need to spend time on recreating the service by deleting the crashing instance and creating a new instance based on the relevant image. You want to reduce the time spent performing manual operations while following Site Reliability Engineering principles. What should you do?",
    "options": [
      "A. File a bug with the development team so they can find the root cause of the crashing instance.",
      "B. Create a Managed instance Group with a single instance and use health checks to determine the system status.",
      "C. Add a Load Balancer in front of the Compute Engine instance and use health checks to determine the system status.",
      "D. Create a Stackdriver Monitoring dashboard with SMS alerts to be able to start recreating the crashed instance promptly after it was crashed."
    ],
    "correct": 1,
    "explanation": "A managed instance group with health checks recreates the crashed VM automatically, eliminating the manual delete-and-recreate toil.",
    "discussion": [
      {
        "user": "devopsbatch",
        "text": "B managed instance groups can be handled when a vm crashed and immediately created new one (25 votes)"
      },
      {
        "user": "kapara",
        "text": "Selected Answer: B. I think that the answer is B, Although SRE principles guide you to find the root cause and post-mortem, the question clearly asks you to: Reduce time spent on manual operations. Therefore the answer is B (Although deep in my heart I would personally combine A and B) (4 votes)"
      },
      {
        "user": "hantanbl",
        "text": "answer is A. If the root cause of crashing is not found and fixed, the crashing will still happen frequently even if we go MIG. Waste of money and time and does not follows SRE principles (4 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: B. The best option for reducing the time spent performing manual operations while following Site Reliability Engineering principles would be B. Create a Managed instance Group with a single instance and use health checks to determine the system status. A Managed Instance Group (MIG) is a GCP service that automatically creates, scales, and deletes instances based on the policies that you set. By creating a MIG with a single instance, you can set up health checks to automatically detect when the instance is crashing and replace it with a new instance, without manual... (3 votes)"
      },
      {
        "user": "cyrus86",
        "text": "Selected Answer: A. IMO - SRE practice should be to get the root cause of crashing of VM and fix it. MIG will not help here. (3 votes)"
      },
      {
        "user": "vijaigcp",
        "text": "Selected Answer: B. Answer B, SRE principles says remove the toil where ever possible. MIG will fit here by automating the VM creation. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 32,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Replacing manual VM recreation with a self-healing MIG.",
    "correctRationale": "The manual loop — notice a crash, delete the instance, recreate it from the image — is exactly what a MIG automates: a size-1 managed instance group with a health check continuously detects a crashed instance and recreates it. A load balancer adds a health check but no auto-recreation; dashboards and alerts still leave the human in the loop.",
    "optionRationales": [
      "Wrong: A bug report does not reduce the recurring operational toil described, and it fixes nothing today.",
      "Correct: A single-instance MIG with health checks detects a crash and recreates the VM automatically — toil eliminated.",
      "Wrong: A load balancer in front of one instance detects failure but cannot recreate the VM, so the manual work remains.",
      "Wrong: Alerts only tell you sooner that you still have to do the recreate-by-hand work."
    ]
  },
  {
    "id": 31,
    "topic": "Monitoring & Alerting",
    "difficulty": 2,
    "question": "Your team is designing a new application for deployment into Google Kubernetes Engine (GKE). You need to set up monitoring to collect and aggregate various application-level metrics in a centralized location. You want to use Google Cloud Platform services while minimizing the amount of work required to set up monitoring. What should you do?",
    "options": [
      "A. Publish various metrics from the application directly to the Stackdriver Monitoring API, and then observe these custom metrics in Stackdriver.",
      "B. Install the Cloud Pub/Sub client libraries, push various metrics from the application to various topics, and then observe the aggregated metrics in Stackdriver.",
      "C. Install the OpenTelemetry client libraries in the application, configure Stackdriver as the export destination for the metrics, and then observe the application's metrics in Stackdriver.",
      "D. Emit all metrics in the form of application-specific log messages, pass these messages from the containers to the Stackdriver logging collector, and then observe metrics in Stackdriver."
    ],
    "correct": 2,
    "explanation": "OpenTelemetry client libraries exporting to Cloud Monitoring give centralized metrics with the least instrumentation and operational work.",
    "discussion": [
      {
        "user": "giammydell",
        "text": "C is correct, for A the installing of stackdriver library in the application is missing, without the lbrary custom metric cannot be created by the application (19 votes)"
      },
      {
        "user": "Luvero",
        "text": "You want to use Google Cloud Platform services while minimizing the amount of work required to set up monitoring. Hence A (14 votes)"
      },
      {
        "user": "TNT87",
        "text": "A https://cloud.google.com/stackdriver/docs/solutions/gke (7 votes)"
      },
      {
        "user": "celia20200410",
        "text": "ANS: A https://cloud.google.com/kubernetes-engine/docs/concepts/custom-and-external-metrics#custom_metrics https://github.com/GoogleCloudPlatform/k8s-stackdriver/blob/master/custom-metrics-stackdriver-adapter/README.md Your application can report a custom metric to Cloud Monitoring. You can configure Kubernetes to respond to these metrics and scale your workload automatically. Before you can use custom metrics, you must enable Monitoring in your Google Cloud project and install the Stackdriver adapter on your cluster. After custom metrics are exported to Monitoring, they can trigger... (6 votes)"
      },
      {
        "user": "Charun",
        "text": "Based on my experience A (6 votes)"
      },
      {
        "user": "francisco_guerra",
        "text": "Ans: A Your application can report a custom metric to Cloud Monitoring. You can configure Kubernetes to respond to these metrics and scale your workload automatically. For example, you can scale your application based on metrics such as queries per second, writes per second, network performance, latency when communicating with a different application, or other metrics that make sense for your workload. https://cloud.google.com/kubernetes-engine/docs/concepts/custom-and-external-metrics (5 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 31,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics' suggested A (community A 54% / C 46%): direct Monitoring API writes mean hand-coding metric descriptors and write calls; instrumenting with OpenTelemetry and exporting to Cloud Monitoring is the current recommended least-effort, portable path.",
    "conceptSummary": "Least-effort app metrics pipeline: OpenTelemetry → Cloud Monitoring.",
    "correctRationale": "OpenTelemetry is Google's recommended, portable instrumentation layer: add the client libraries, point the exporter at Cloud Monitoring (or Managed Service for Prometheus), and application metrics are aggregated centrally without hand-rolled metric descriptors and API writes. Writing time series directly to the Monitoring API (the ExamTopics key) means crafting metric descriptors and managing write calls yourself — more work for the same result.",
    "optionRationales": [
      "Wrong: Publishing straight to the Monitoring API requires defining custom metric descriptors and managing write calls by hand — more work than OTel instrumentation.",
      "Wrong: Pub/Sub is a message transport; pushing metrics through topics still leaves you building the aggregation into Monitoring yourself.",
      "Correct: OpenTelemetry libraries with a Cloud Monitoring exporter give portable instrumentation and centralized metrics with minimal setup.",
      "Wrong: Emitting metrics as log lines forces you to parse logs into metrics later, which is fragile and extra work."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 30,
    "topic": "SLOs & Error Budgets",
    "difficulty": 2,
    "question": "You support a multi-region web service running on Google Kubernetes Engine (GKE) behind a Global HTTP/S Cloud Load Balancer (CLB). For legacy reasons, user requests first go through a third-party Content Delivery Network (CDN), which then routes traffic to the CLB. You have already implemented an availability Service Level Indicator (SLI) at the CLB level. However, you want to increase coverage in case of a potential load balancer misconfiguration, CDN failure, or other global networking catastrophe. Where should you measure this new SLI? (Choose two.)",
    "options": [
      "A. Your application servers' logs.",
      "B. Instrumentation coded directly in the client.",
      "C. Metrics exported from the application servers.",
      "D. GKE health checks for your application servers.",
      "E. A synthetic client that periodically sends simulated user requests."
    ],
    "correct": [
      1,
      4
    ],
    "explanation": "Measure where users actually experience the service: client instrumentation and a synthetic client both see failures the CLB-level SLI cannot.",
    "discussion": [
      {
        "user": "celia20200410",
        "text": "https://cloud.google.com/architecture/adopting-slos#choosing_a_measurement_method B > Using client instrumentation. E > Implementing synthetic testing. (23 votes)"
      },
      {
        "user": "rinkeshgala1",
        "text": "as there is an SLI already configured at LB level and they want to increase the coverage then I we need SLI which will detect CDN/LB failures as well. running health checks at application/server level wont cover this. so according to me option B & E are correct which are outside of the GCP infra, which give more coverage and resembles the use behavior (6 votes)"
      },
      {
        "user": "DucLee3110",
        "text": "B,E should be the answers as you better check it at user level (4 votes)"
      },
      {
        "user": "Bill831231",
        "text": "Selected Answer: BE. If need something beyong CDN and CLB, seems only option is on client side directly (3 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: BE. For me, B and E is correct (2 votes)"
      },
      {
        "user": "Pankul",
        "text": "Selected Answer: BE. For me, it is B and E (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 30,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "End-to-end SLI coverage beyond the load balancer.",
    "correctRationale": "An SLI at the Cloud Load Balancer cannot see failures in the CDN or the path between users and the CLB. Instrumentation inside the client reports the true user experience end to end, and a synthetic client periodically probes the whole path — both catch a CDN failure or LB misconfiguration that CLB-side metrics miss. Server logs, server metrics, and GKE health checks all sit behind the same load balancer blind spot.",
    "optionRationales": [
      "Wrong: Application server logs only see requests that already made it through the CDN and CLB — the exact failure modes you want to detect.",
      "Correct: Client-side instrumentation measures the real end-to-end user experience, including CDN and load balancer failures.",
      "Wrong: Server-side metrics share the same blind spot as the existing CLB SLI.",
      "Wrong: GKE health checks probe from inside Google's network to the servers, not the user-facing path through the CDN.",
      "Correct: A synthetic client sends simulated user requests over the full path and detects global failures exactly as users would see them."
    ]
  },
  {
    "id": 29,
    "topic": "SLOs & Error Budgets",
    "difficulty": 2,
    "question": "You support a high-traffic web application with a microservice architecture. The home page of the application displays multiple widgets containing content such as the current weather, stock prices, and news headlines. The main serving thread makes a call to a dedicated microservice for each widget and then lays out the homepage for the user. The microservices occasionally fail; when that happens, the serving thread serves the homepage with some missing content. Users of the application are unhappy if this degraded mode occurs too frequently, but they would rather have some content served instead of no content at all. You want to set a Service Level Objective (SLO) to ensure that the user experience does not degrade too much. What Service Level Indicator (SLI) should you use to measure this?",
    "options": [
      "A. A quality SLI: the ratio of non-degraded responses to total responses.",
      "B. An availability SLI: the ratio of healthy microservices to the total number of microservices.",
      "C. A freshness SLI: the proportion of widgets that have been updated within the last 10 minutes.",
      "D. A latency SLI: the ratio of microservice calls that complete in under 100 ms to the total number of microservice calls."
    ],
    "correct": 0,
    "explanation": "The degraded-mode experience is measured by a quality SLI: non-degraded responses over total responses.",
    "discussion": [
      {
        "user": "francisco_guerra",
        "text": "Ans: A Quality as an SLI Quality is a helpful SLI for complex services that are designed to fail gracefully by degrading when dependencies are slow or unavailable. The SLI for quality is defined as follows: The proportion of valid requests served without degradation of service. https://cloud.google.com/architecture/adopting-slos (34 votes)"
      },
      {
        "user": "not_thanos",
        "text": "Selected Answer: A. https://cloud.google.com/architecture/adopting-slos?hl=en#sli-quality Quality is a helpful SLI for complex services that are designed to fail gracefully by degrading when dependencies are slow or unavailable. The SLI for quality is defined as follows: The proportion of valid requests served without degradation of service. For example, a web page might load its main content from one datastore and load ancillary, optional assets from 100 other services and datastores. If one optional service is out of service or too slow, the page can still be rendered without the ancillary... (6 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: A. A - Quality SLI: Number of correct pages / Total number of pages served. (5 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: A. A. A quality SLI: the ratio of non-degraded responses to total responses. Explanation: An SLI (Service Level Indicator) is a metric that is used to measure the performance of a service against a specific SLO (Service Level Objective). To measure the user experience of the web application, which is the main concern in this scenario, the most appropriate SLI would be a quality SLI: the ratio of non-degraded responses to total responses. This will give you a clear indication of how often users are experiencing a degraded mode of the web application, and it will allow you to... (3 votes)"
      },
      {
        "user": "Ananda",
        "text": "Selected Answer: A. Submitted A (3 votes)"
      },
      {
        "user": "rajatjain12",
        "text": "I think D is the correct (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 29,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Choosing a quality SLI for partial-degradation UX.",
    "correctRationale": "Users accept missing-widget pages as long as they are rare — that is exactly a quality SLI: the proportion of responses served complete versus degraded. An availability SLI of healthy microservices measures backend health, not what users got; freshness and latency measure different properties entirely.",
    "optionRationales": [
      "Correct: The ratio of non-degraded to total responses directly measures the degraded-mode experience the SLO must bound.",
      "Wrong: Healthy microservice count is a backend availability view; the user-facing issue is responses missing content, not service health.",
      "Wrong: Widget freshness is unrelated to whether responses are degraded.",
      "Wrong: A latency SLI measures speed, not completeness of the served home page."
    ]
  },
  {
    "id": 28,
    "topic": "Infrastructure as Code",
    "difficulty": 1,
    "question": "You are responsible for creating and modifying the Terraform templates that define your Infrastructure. Because two new engineers will also be working on the same code, you need to define a process and adopt a tool that will prevent you from overwriting each other's code. You also want to ensure that you capture all updates in the latest version. What should you do?",
    "options": [
      "A. • Store your code in a Git-based version control system. • Establish a process that allows developers to merge their own changes at the end of each day. • Package and upload code to a versioned Cloud Storage bucket as the latest master version.",
      "B. • Store your code in a Git-based version control system. • Establish a process that includes code reviews by peers and unit testing to ensure integrity and functionality before integration of code. • Establish a process where the fully integrated code in the repository becomes the latest master version.",
      "C. • Store your code as text files in Google Drive in a defined folder structure that organizes the files. • At the end of each day, confirm that all changes have been captured in the files within the folder structure. • Rename the folder structure with a predefined naming convention that increments the version.",
      "D. • Store your code as text files in Google Drive in a defined folder structure that organizes the files. • At the end of each day, confirm that all changes have been captured in the files within the folder structure and create a new .zip archive with a predefined naming convention. • Upload the .zip archive to a versioned Cloud Storage bucket and accept it as the latest version."
    ],
    "correct": 1,
    "explanation": "Git with peer review and unit testing, where merged code is the master version, prevents overwrites and captures every update.",
    "discussion": [
      {
        "user": "devopsbatch",
        "text": "B peer review and source code management tool required (31 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: B. B. Store your code in a Git-based version control system. Establish a process that includes code reviews by peers and unit testing to ensure integrity and functionality before integration of code. Establish a process where the fully integrated code in the repository becomes the latest master version. Explanation: Using a Git-based version control system such as GitHub or GitLab is a best practice for managing code in a collaborative environment. It provides a central repository where all changes are tracked and versioned, and it also allows for concurrent development by... (4 votes)"
      },
      {
        "user": "Murty549",
        "text": "Selected Answer: B. B is correct. A is false because the code is already stored in a got repo, so there is no need to upload the code to the cloud storage bucket. (3 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: B. Option B (2 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: B. B - Git based repository + Peer review and Unit testing (2 votes)"
      },
      {
        "user": "habla2019pasta",
        "text": "Selected Answer: B. B. Terraform state should never be on a dev machine.. Instead it should be hosted on a sever that is access controlled and updated from latest git commit (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 28,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Team-scale IaC workflow: Git, reviews, tests, trunk as latest.",
    "correctRationale": "A Git-based VCS is the tool that prevents engineers from silently overwriting each other's work, and a process with peer code review plus unit tests keeps quality before integration. Treating the fully integrated repository state as the latest version guarantees all updates are captured — unlike daily merge free-for-alls or folder/zip versioning in Drive and Cloud Storage.",
    "optionRationales": [
      "Wrong: Letting developers merge their own changes daily without review loses the integrity checks, and pushing to a storage 'basket' duplicates the repo as a second source of truth.",
      "Correct: Git plus peer review and unit tests before integration makes the repository the single, reviewed, complete latest version.",
      "Wrong: Google Drive folders with naming conventions have no merge semantics, no review, and no protection against concurrent overwrites.",
      "Wrong: Daily zip archives in a bucket snapshot work but still provide no collaboration, review, or conflict handling."
    ]
  },
  {
    "id": 27,
    "topic": "Deployment Strategies",
    "difficulty": 1,
    "question": "You are running an experiment to see whether your users like a new feature of a web application. Shortly after deploying the feature as a canary release, you receive a spike in the number of 500 errors sent to users, and your monitoring reports show increased latency. You want to quickly minimize the negative impact on users. What should you do first?",
    "options": [
      "A. Roll back the experimental canary release.",
      "B. Start monitoring latency, traffic, errors, and saturation.",
      "C. Record data for the postmortem document of the incident.",
      "D. Trace the origin of 500 errors and the root cause of increased latency."
    ],
    "correct": 0,
    "explanation": "Roll back the canary immediately — that is the fastest way to stop the user-facing errors and latency.",
    "discussion": [
      {
        "user": "devopsbatch",
        "text": "A rollback experiment (30 votes)"
      },
      {
        "user": "Joey1",
        "text": "Why are there so many wrong answers listed as \"Correct Answers\" ? For example for this question A is obviously correct and the most voted. Why does it say D is correct? (3 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: A. A - Rollback the canary to bring back stability to production; then review logs to find out what caused the issues. (3 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: A. Option A (2 votes)"
      },
      {
        "user": "raghu09",
        "text": "Selected Answer: A. We need to rollback the current deployment so that user are not negatively impacted, then we can go with post-mortem, root cause alaysis and fixes. (2 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: A. A. Roll back the experimental canary release. Explanation: When you receive a spike in the number of 500 errors sent to users and increased latency after deploying a new feature, it is important to take immediate action to minimize the negative impact on users. The first step should be to roll back the experimental canary release. This will remove the new feature from production and revert the system to its previous state, which should reduce the number of errors and decrease latency. After rolling back the canary release, you can start monitoring latency, traffic, errors,... (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 27,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "First response to a failing canary: roll it back.",
    "correctRationale": "The canary is actively harming users (500s and latency). The first action is to remove the bad version by rolling back the canary release, restoring known-good behavior in one step. Monitoring, postmortem notes, and root-cause tracing all come after impact is stopped.",
    "optionRationales": [
      "Correct: Rolling back the canary instantly stops the errors and latency hitting users.",
      "Wrong: Starting to monitor the four golden signals is useful for diagnosis but does nothing to stop the ongoing impact.",
      "Wrong: Recording postmortem data is important later; it does not mitigate the live incident.",
      "Wrong: Tracing the root cause takes time while users keep failing; mitigate first, diagnose after."
    ]
  },
  {
    "id": 26,
    "topic": "SLOs & Error Budgets",
    "difficulty": 1,
    "question": "You are part of an organization that follows SRE practices and principles. You are taking over the management of a new service from the Development Team, and you conduct a Production Readiness Review (PRR). After the PRR analysis phase, you determine that the service cannot currently meet its Service Level Objectives (SLOs). You want to ensure that the service can meet its SLOs in production. What should you do next?",
    "options": [
      "A. Adjust the SLO targets to be achievable by the service so you can bring it into production.",
      "B. Notify the development team that they will have to provide production support for the service.",
      "C. Identify recommended reliability improvements to the service to be completed before handover.",
      "D. Bring the service into production with no SLOs and build them when you have collected operational data."
    ],
    "correct": 2,
    "explanation": "When a PRR shows the service can't meet its SLOs, the next step is to define the reliability improvements required before handover.",
    "discussion": [
      {
        "user": "devopsbatch",
        "text": "C identify improvements before handover with no meet SLO (10 votes)"
      },
      {
        "user": "francisco_guerra",
        "text": "I don't find anything about this but C its the only one that ensure that the service can meet its SLOs in production so I go with C (5 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: C. C. Identify recommended reliability improvements to the service to be completed before handover. Explanation: A Production Readiness Review (PRR) is an assessment of a service's readiness to be deployed in production. A service that cannot meet its Service Level Objectives (SLOs) is not ready to be deployed in production. The next step is to identify the recommended reliability improvements that should be made to the service before it can be handed over to the SRE team. (3 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: C. C - If the app doesn't meet the set SLOs, improvements need to be met or a revised SLO need to be agreed with relevant stakeholders. (3 votes)"
      },
      {
        "user": "habla2019pasta",
        "text": "Selected Answer: C. C should be correct (1 vote)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: C. Option C (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 26,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Production Readiness Review: fix gaps before taking over the service.",
    "correctRationale": "The PRR exists to catch exactly this: a service not ready for production SLOs. The correct follow-up is to identify the recommended reliability improvements and make them conditions of the handover, rather than watering down the SLO, punting support back to developers, or launching without objectives.",
    "optionRationales": [
      "Wrong: Lowering the SLO to whatever the service can do makes the objective meaningless and hides the readiness gap.",
      "Wrong: Pushing production support back to the dev team does not make the service meet its SLOs.",
      "Correct: The PRR outcome is a list of reliability improvements the service must complete before SRE takes it over.",
      "Wrong: Going to production with no SLOs removes the entire point of the review and leaves reliability unmeasured."
    ]
  },
  {
    "id": 25,
    "topic": "Performance & Cost",
    "difficulty": 1,
    "question": "You need to run a business-critical workload on a fixed set of Compute Engine instances for several months. The workload is stable with the exact amount of resources allocated to it. You want to lower the costs for this workload without any performance implications. What should you do?",
    "options": [
      "A. Purchase Committed Use Discounts.",
      "B. Migrate the instances to a Managed Instance Group.",
      "C. Convert the instances to preemptible virtual machines.",
      "D. Create an Unmanaged Instance Group for the instances used to run the workload."
    ],
    "correct": 0,
    "explanation": "Committed Use Discounts cut the cost of a stable, always-on VM fleet with zero performance impact.",
    "discussion": [
      {
        "user": "[Removed]",
        "text": "\"business-critical workload ....... for several months\", preemptible is not suitable in here. \"The workload is stable with the exact amount of resources allocated to it\" , exclude B. A should be OK. (4 votes)"
      },
      {
        "user": "devopsbatch",
        "text": "purchase commited discounts or unmanaged instance groups because stable load (4 votes)"
      },
      {
        "user": "ghadxx",
        "text": "Selected Answer: A. C. Since the requirement is to run \"business-critical workloads\", preemptible instances not ideal since they can be stopped randomly. (3 votes)"
      },
      {
        "user": "not_thanos",
        "text": "Selected Answer: A. Answer is A => several months can be up to or more than a year C is wrong because 1. Business critical workload, you don't want that stopped randomly 2. Preemptible requires the workload to be resumable -> not stated in the question (3 votes)"
      },
      {
        "user": "akg001",
        "text": "A is the correct answer. (3 votes)"
      },
      {
        "user": "devopsbatch",
        "text": "B managed instance groups and A also seems to be right (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 25,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Cost reduction for stable fixed workloads via Committed Use Discounts.",
    "correctRationale": "The workload is fixed, stable, and business-critical for months — the textbook case for Committed Use Discounts, which trade a 1- or 3-year spend commitment for a substantial discount with no change to the instances themselves. Preemptible VMs would kill performance predictability, and instance groups change nothing about price.",
    "optionRationales": [
      "Correct: CUDs discount the exact same fixed resources for a committed term — lower cost, no performance change.",
      "Wrong: A MIG is about autoscaling/self-healing, not pricing; migrating does not lower the cost of fixed instances.",
      "Wrong: Preemptible/Spot VMs can be reclaimed at any time, which is a performance and availability risk for a business-critical workload.",
      "Wrong: An unmanaged instance group provides no discount and no autoscaling; it is just a load-balancing grouping."
    ]
  },
  {
    "id": 24,
    "topic": "Logging",
    "difficulty": 1,
    "question": "You currently store the virtual machine (VM) utilization logs in Stackdriver. You need to provide an easy-to-share interactive VM utilization dashboard that is updated in real time and contains information aggregated on a quarterly basis. You want to use Google Cloud Platform solutions. What should you do?",
    "options": [
      "A. Step 1: Export VM utilization logs from Stackdriver to BigQuery.\nStep 2: Create a dashboard in Data Studio.\nStep 3: Share the dashboard with your stakeholders.",
      "B. Step 1: Export VM utilization logs from Stackdriver to Cloud Pub/Sub.\nStep 2: From Cloud Pub/Sub, send the logs to a Security Information and Event Management (SIEM) system.\nStep 3: Build the dashboards in the SIEM system and share with your stakeholders.",
      "C. Step 1: Export VM utilization logs from Stackdriver to BigQuery.\nStep 2: From BigQuery, export the logs to a CSV file.\nStep 3: Import the CSV file into Google Sheets.\nStep 4: Build a dashboard in Google Sheets and share it with your stakeholders.",
      "D. Step 1: Export VM utilization logs from Stackdriver to a Cloud Storage bucket.\nStep 2: Enable the Cloud Storage API to pull the logs programmatically.\nStep 3: Build a custom data visualization application.\nStep 4: Display the pulled logs in a custom dashboard."
    ],
    "correct": 0,
    "explanation": "Export logs to BigQuery and build a shareable, real-time-refreshing dashboard in Data Studio (now Looker Studio).",
    "discussion": [
      {
        "user": "floppino",
        "text": "Selected Answer: A. Ans: A Exam passed and taken on 19/12/2022, 50/50 from this dump without buying the full access and looking for 'devops' word here: https://www.examtopics.com/discussions/google/1/ (4 votes)"
      },
      {
        "user": "atkhan",
        "text": "A is correct because google cloud studio is build to provide real time metric data and it can be directly integrated with BigQuery (3 votes)"
      },
      {
        "user": "vijaigcp",
        "text": "Selected Answer: A. Answer - A B & C are ruled out straight away. Between A & D, as the ask is real time, D can be ruled out. https://cloud.google.com/logging/docs/export/configure_export_v2 (3 votes)"
      },
      {
        "user": "helg",
        "text": "A Stackdriver -- BQ -- DataStudio (3 votes)"
      },
      {
        "user": "devopsbatch",
        "text": "answer B. because SEIM helps realtime analysis of security and also export logs into pubsub is realtime transactions. (3 votes)"
      },
      {
        "user": "jomonkp",
        "text": "Selected Answer: A. option A (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 24,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Shareable quarterly dashboards: Logging export to BigQuery plus Looker Studio.",
    "correctRationale": "A BigQuery sink receives the VM utilization logs continuously, and Data Studio/Looker Studio connects natively to BigQuery to produce interactive dashboards that can be shared by link and aggregate quarterly. The other paths either require an external SIEM (not a GCP solution) or manual CSV/coding work that is neither real-time nor easy to share.",
    "optionRationales": [
      "Correct: Log export to BigQuery plus a Data Studio dashboard is all-Google-Cloud, real-time refreshable, quarterly aggregable, and trivially shareable.",
      "Wrong: Routing through Pub/Sub to an external SIEM is not a Google Cloud solution and adds unnecessary infrastructure.",
      "Wrong: CSV exports to Google Sheets are manual and do not update in real time.",
      "Wrong: Building a custom visualization app on Cloud Storage pulls is the most effort and still not real-time or easy to share."
    ],
    "legacyNote": "Data Studio is now called Looker Studio; the BigQuery + dashboard pattern is unchanged."
  },
  {
    "id": 23,
    "topic": "Monitoring & Alerting",
    "difficulty": 2,
    "question": "You are developing a strategy for monitoring your Google Cloud Platform (GCP) projects in production using Stackdriver Workspaces. One of the requirements is to be able to quickly identify and react to production environment issues without false alerts from development and staging projects. You want to ensure that you adhere to the principle of least privilege when providing relevant team members with access to Stackdriver Workspaces. What should you do?",
    "options": [
      "A. Grant relevant team members read access to all GCP production projects. Create Stackdriver workspaces inside each project.",
      "B. Grant relevant team members the Project Viewer IAM role on all GCP production projects. Create Stackdriver workspaces inside each project.",
      "C. Choose an existing GCP production project to host the monitoring workspace. Attach the production projects to this workspace. Grant relevant team members read access to the Stackdriver Workspace.",
      "D. Create a new GCP monitoring project and create a Stackdriver Workspace inside it. Attach the production projects to this workspace. Grant relevant team members read access to the Stackdriver Workspace."
    ],
    "correct": 3,
    "explanation": "A dedicated monitoring project hosting the workspace, with production projects attached, isolates prod signal and keeps access least-privilege.",
    "discussion": [
      {
        "user": "vijaigcp",
        "text": "Selected Answer: D. Answer - D When you want to manage metrics for multiple projects, we recommend that you create a project to be the scoping project for that metrics scope. https://cloud.google.com/monitoring/settings/multiple-projects (13 votes)"
      },
      {
        "user": "floppino",
        "text": "Selected Answer: D. Ans: D Exam passed and taken on 19/12/2022, 50/50 from this dump without buying the full access and looking for 'devops' word here: https://www.examtopics.com/discussions/google/1/ (2 votes)"
      },
      {
        "user": "habla2019pasta",
        "text": "Selected Answer: D. D because the recommendation is that you create a separate project for monitoring your GCP projects. (1 vote)"
      },
      {
        "user": "feholen210",
        "text": "Selected Answer: D. D for sure (1 vote)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: D. Answer is D. (1 vote)"
      },
      {
        "user": "singularis",
        "text": "Selected Answer: D. D 100% (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 23,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Isolating production monitoring in a dedicated metrics-scope project.",
    "correctRationale": "Creating a separate project to host the Stackdriver Workspace (today: Cloud Monitoring metrics scope) and attaching only the production projects to it keeps dev/staging noise out and means access to the workspace equals access to production signal. Granting read access to the workspace is far narrower than granting read access to every production project.",
    "optionRationales": [
      "Wrong: Per-project workspaces fragment monitoring and granting read access to all production projects exceeds least privilege.",
      "Wrong: Still creates one workspace per project (fragmented) and grants Project Viewer on every production project, which is broader than needed.",
      "Wrong: Hosting the workspace inside an existing production project mixes the monitoring plane into a workload project and is harder to reason about.",
      "Correct: A dedicated monitoring project with production projects attached gives a clean production-only view with minimal IAM surface."
    ],
    "legacyNote": "Stackdriver Workspaces are now Cloud Monitoring metrics scopes; the dedicated scoping project pattern is unchanged."
  },
  {
    "id": 22,
    "topic": "Incident Management",
    "difficulty": 2,
    "question": "You are on-call for an infrastructure service that has a large number of dependent systems. You receive an alert indicating that the service is failing to serve most of its requests and all of its dependent systems with hundreds of thousands of users are affected. As part of your Site Reliability Engineering (SRE) incident management protocol, you declare yourself Incident Commander (IC) and pull in two experienced people from your team as Operations Lead (OL) and Communications Lead (CL). What should you do next?",
    "options": [
      "A. Look for ways to mitigate user impact and deploy the mitigations to production.",
      "B. Contact the affected service owners and update them on the status of the incident.",
      "C. Establish a communication channel where incident responders and leads can communicate with each other.",
      "D. Start a postmortem, add incident information, circulate the draft internally, and ask internal stakeholders for input."
    ],
    "correct": 2,
    "explanation": "With IC, OL, and CL roles assigned, the IC's next step is to stand up the shared communication channel for the response team.",
    "discussion": [
      {
        "user": "Charun",
        "text": "C is the answer (15 votes)"
      },
      {
        "user": "francisco_guerra",
        "text": "Ans: C Prepare Beforehand In addition to incident response training, it helps to prepare for an incident beforehand. Use the following tips and strategies to be better prepared. Decide on a communication channel Decide and agree on a communication channel (Slack, a phone bridge, IRC, HipChat, etc.) beforehand. Keep your audience informed Unless you acknowledge that an incident is happening and actively being addressed, people will automatically assume nothing is being done to resolve the issue. Similarly, if you forget to call off the response once the issue has been mitigated or resolved,... (14 votes)"
      },
      {
        "user": "ESP_SAP",
        "text": "Correct Answer is A: Best Practices for Incident Management Prioritize.Stop the bleeding, restore service, and preserve the evidence for root-causing. Prepare.Develop and document your incident management procedures in advance, in consultation with incident participants. Trust.Give full autonomy within the assigned role to all incident participants. Introspect.Pay attention to your emotional state while responding to an incident. If you start to feel panicky or overwhelmed, solicit more support. Consider alternatives.Periodically consider your options and re-evaluate whether it still makes... (6 votes)"
      },
      {
        "user": "zygomar",
        "text": "Selected Answer: C. agree with rinkeshgala1: \"mitigating the issue is not the job of Incident commander but of Operation Lead. Incident commander should setup common communication channel , so option C\" (4 votes)"
      },
      {
        "user": "Wwhite44",
        "text": "Selected Answer: C. Ans A is not, cause it means:\"man solve the problem\", it is not your task solve it, you are IC not technician, C for sure (4 votes)"
      },
      {
        "user": "danchoif2",
        "text": "Check the example at https://sre.google/sre-book/managing-incidents/ you will find the sentence: mitigated the problem, closed the incident, and started work on the postmortem. So A is correct. (4 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 22,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority A: mitigation work belongs to the Operations Lead; with roles assigned, the IC establishes the communication channel next.",
    "conceptSummary": "SRE incident response: establish the communication channel after roles are assigned.",
    "correctRationale": "In the SRE incident command model, once the Incident Commander has delegated the Operations and Communications Lead roles, hands-on mitigation belongs to the OL. The IC's next responsibility is to establish the communication channel so the responders and leads can coordinate. Contacting stakeholders is the CL's job, and postmortem work comes after the incident.",
    "optionRationales": [
      "Wrong: Mitigating user impact is the Operations Lead's responsibility; the IC who jumps into production changes stops coordinating the response.",
      "Wrong: Updating service owners is the Communications Lead's job once the channel exists; it is not the IC's next step.",
      "Correct: Establishing a communication channel for the responders and leads is the IC's next step after delegating roles.",
      "Wrong: A postmortem is written after the incident is resolved, not while the outage is ongoing."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 21,
    "topic": "CI/CD Pipelines",
    "difficulty": 2,
    "question": "Your application images are built using Cloud Build and pushed to Google Container Registry (GCR). You want to be able to specify a particular version of your application for deployment based on the release version tagged in source control. What should you do when you push the image?",
    "options": [
      "A. Reference the image digest in the source control tag.",
      "B. Supply the source control tag as a parameter within the image name.",
      "C. Use Cloud Build to include the release version tag in the application image.",
      "D. Use GCR digest versioning to match the image to the tag in source control."
    ],
    "correct": 2,
    "explanation": "Configuring Cloud Build to tag the built image with the release version ties each deployed image back to the source tag.",
    "discussion": [
      {
        "user": "francisco_guerra",
        "text": "Ans C Cloud Build provides the following default substitutions: $TAG_NAME: build.Source.RepoSource.Revision.TagName (22 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: C. Both option B and C are valid ways to ensure that a specific version of an application is deployed based on the release version tagged in source control, but option C is likely to be the more robust and flexible solution for managing your application deployments. With option B, Supply the source control tag as a parameter within the image name, you have to manually include the source control tag when you push the image to GCR. This can make it more prone to human error and also could require more manual work to keep track of the different versions and their correspondance... (5 votes)"
      },
      {
        "user": "devopsbatch",
        "text": "C inside cloudbuil.yml file can include release version (5 votes)"
      },
      {
        "user": "guruguru",
        "text": "C. tag your images with the sourced code release version. (3 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: C. The correct answer is C (2 votes)"
      },
      {
        "user": "[Removed]",
        "text": "C should be right. https://cloud.google.com/build/docs/build-push-docker-image#build_an_image_using_a_build_config_file (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 21,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Linking container image versions to source-control release tags.",
    "correctRationale": "Cloud Build supports substituting the release version (e.g. $TAG_NAME or a substitution variable) as an image tag when pushing. That makes the image version selectable at deploy time directly from the registry, matching the source-control tag. Referencing digests works for pinning but does not map cleanly back to the tagged release name the team uses.",
    "optionRationales": [
      "Wrong: The digest is created at push time, so it cannot be written into the source tag beforehand.",
      "Wrong: Stuffing the source tag into the image name is a workaround; image tags are the mechanism designed for versioning.",
      "Correct: Using Cloud Build to tag the pushed image with the release version makes every deployable image identifiable by its source tag.",
      "Wrong: Digests are auto-generated content hashes; they cannot be made to match a human-chosen source tag."
    ],
    "legacyNote": "Container Registry is deprecated; use Artifact Registry for new repositories. The image-tagging approach is unchanged."
  },
  {
    "id": 20,
    "topic": "Troubleshooting & APM",
    "difficulty": 2,
    "question": "You support an application deployed on Compute Engine. The application connects to a Cloud SQL instance to store and retrieve data. After an update to the application, users report errors showing database timeout messages. The number of concurrent active users remained stable. You need to find the most probable cause of the database timeout. What should you do?",
    "options": [
      "A. Check the serial port logs of the Compute Engine instance.",
      "B. Use Stackdriver Profiler to visualize the resources utilization throughout the application.",
      "C. Determine whether there is an increased number of connections to the Cloud SQL instance.",
      "D. Use Cloud Security Scanner to see whether your Cloud SQL is under a Distributed Denial of Service (DDoS) attack."
    ],
    "correct": 2,
    "explanation": "Timeouts to Cloud SQL right after an update with flat user counts point at the new code leaking or opening connections — check the connection count.",
    "discussion": [
      {
        "user": "francisco_guerra",
        "text": "Ans: B I don't find anything about ddos attacks and Cloud security Scanner & databases; its most used with App engine and compute so. I go with Stackdriver profiler (24 votes)"
      },
      {
        "user": "ralf_cc",
        "text": "B - getting to know the app perf (10 votes)"
      },
      {
        "user": "Greg123123",
        "text": "I would go for C. C. Determine whether there is an increased number of connections to the Cloud SQL instance. 1. Because users report the error message saying \"database timeout\". If the errors is from the application then it wouldn't be \"database timeout\", so rather than running Profiler in your application, go check whether there is an increased number of connections is more intuitive. 2. Other than that, the question mentions \"After an update to the application\" which imply that there could be a bug regarding to SQL so that's why if \"concurrent active users remained stable\", the database... (8 votes)"
      },
      {
        "user": "paul223344",
        "text": "Answer B: Use Stackdriver Profiler to visualize the resources utilization throughout the application. High CPU usage can most definitely cause dropped or ignored connections. The database engine and underlying OS are fighting for resources and aren't able to respond to the connection in time. Finding out why the query is eating so much CPU usage and optimizing it. https://stackoverflow.com/questions/69919454/high-cpu-usage-on-cloud-sql-causing-timeouts # Cloud Profiler is a statistical, low-overhead profiler that continuously gathers CPU usage and memory-allocation information (supported... (5 votes)"
      },
      {
        "user": "[Removed]",
        "text": "For me it is first C) then if number of connections is normal than B). With the new version there is a bug performance that can for example not close connections to the base. So even if there is the same number of user of the application , in the base there can be lot of connections. If you have app reports time out database the first things to do is to check the database if there are slow queries but there is not answer for that. (5 votes)"
      },
      {
        "user": "07397",
        "text": "Selected Answer: B. I would go for B: As it says, \"The **number** of concurrent active users remained stable.\" Since users report database timeout errors, the newly deployed version can only service a particular load and that load is **lower than** expected number. It is likely that the new version has changes that lead to high CPU utilization or any other bottleneck, so we should use the profiler to locate the issue. (4 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 20,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics B (community 86% B); changed after a second review. Database timeouts that start right after an app update while user counts stay flat most likely come from the new code opening or leaking connections, which shows up directly as more Cloud SQL connections; Profiler shows CPU and heap hotspots in the app, not why database calls time out.",
    "conceptSummary": "Post-update DB timeouts: inspect Cloud SQL connection count first.",
    "correctRationale": "Database timeouts that begin immediately after an application update while user load stays flat most likely mean the new code opens or leaks connections — the Cloud SQL connections metric shows that directly (C). Profiler shows app CPU/heap hotspots, not DB connection timeouts; serial logs and a security scan don't address the regression.",
    "optionRationales": [
      "Wrong: Serial port logs cover the VM's boot/console output, not application-level database behavior.",
      "Wrong: Profiler surfaces CPU and heap hotspots in the app, not why database calls time out.",
      "Correct: An increased Cloud SQL connection count directly reveals connection leaks or bursts introduced by the update.",
      "Wrong: DDoS scanning is for external attack analysis — a post-update internal regression doesn't fit."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 19,
    "topic": "Monitoring & Alerting",
    "difficulty": 2,
    "question": "You support an application running on App Engine. The application is used globally and accessed from various device types. You want to know the number of connections. You are using Stackdriver Monitoring for App Engine. What metric should you use?",
    "options": [
      "A. flex/connections/current",
      "B. tcp_ssl_proxy/new_connections",
      "C. tcp_ssl_proxy/open_connections",
      "D. flex/instance/connections/current"
    ],
    "correct": 0,
    "explanation": "flex/connections/current is the App Engine flexible environment metric that reports the current connection count.",
    "discussion": [
      {
        "user": "francisco_guerra",
        "text": "Ans A A: Metric for App engine & for version B: NO, Metrics for Cloud Load Balancing. C: NO, Metrics for Cloud Load Balancing. D Metric for App engine & for instance An App Engine app is made up of a single application resource that consists of one or more services. Each service can be configured to use different runtimes and to operate with different performance settings. Within each service, you deploy versions of that service. Each version then runs within one or more instances, depending on how much traffic you configured it to handle. if the version runs within one or more instances we... (23 votes)"
      },
      {
        "user": "TNT87",
        "text": "A https://cloud.google.com/monitoring/api/metrics_gcp#gcp-appengine (5 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: A. A) Is the correct answer https://cloud.google.com/monitoring/api/metrics_gcp#gcp-appengine (3 votes)"
      },
      {
        "user": "zellck",
        "text": "Selected Answer: A. A is the answer. https://cloud.google.com/monitoring/api/metrics_gcp#gcp-appengine flex/connections/current - Number of current active connections per App Engine flexible environment version (2 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: A. The correct answer is \"A\" (2 votes)"
      },
      {
        "user": "maxdanny",
        "text": "Selected Answer: A. A is correct answer https://cloud.google.com/monitoring/api/metrics_gcp#gcp-appengine flex/connections/current show the current active connections for all instance in appengine (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 19,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Choosing the right App Engine connections metric.",
    "correctRationale": "Under the appengine.googleapis.com metric family, flex/connections/current reports the number of active connections to the App Engine flexible environment — the direct answer. The tcp_ssl_proxy metrics belong to the SSL/TCP proxy load balancers, not App Engine, and flex/instance/connections/current is not the connection-count metric.",
    "optionRationales": [
      "Correct: flex/connections/current reports current connections for App Engine flexible environment services.",
      "Wrong: tcp_ssl_proxy/new_connections counts new connections at the TCP/SSL proxy load balancer, not the App Engine application.",
      "Wrong: tcp_ssl_proxy/open_connections is also a proxy load balancer metric, unrelated to App Engine instances.",
      "Wrong: flex/instance/connections/current is not the metric that reports the application's current connection count."
    ]
  },
  {
    "id": 18,
    "topic": "CI/CD Pipelines",
    "difficulty": 1,
    "question": "Your company experiences bugs, outages, and slowness in its production systems. Developers use the production environment for new feature development and bug fixes. Configuration and experiments are done in the production environment, causing outages for users. Testers use the production environment for load testing, which often slows the production systems. You need to redesign the environment to reduce the number of bugs and outages in production and to enable testers to load test new features. What should you do?",
    "options": [
      "A. Create an automated testing script in production to detect failures as soon as they occur.",
      "B. Create a development environment with smaller server capacity and give access only to developers and testers.",
      "C. Secure the production environment to ensure that developers can't change it and set up one controlled update per year.",
      "D. Create a development environment for writing code and a test environment for configurations, experiments, and load testing."
    ],
    "correct": 3,
    "explanation": "Separate development and test environments keep production stable while giving developers and testers their own space.",
    "discussion": [
      {
        "user": "devopsbatch",
        "text": "D i think creating seperate env for dev and testers (22 votes)"
      },
      {
        "user": "akg001",
        "text": "Having a separate environment is a best practice. Answer is D. (5 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: D. D is the answer, keep production separated, dev environment to write the code, test environment to test functionality and load before deployments to prod (3 votes)"
      },
      {
        "user": "vijaigcp",
        "text": "Selected Answer: D. Creating Separate ENVs for DEV and QA is an age old best practice. Same applies here (3 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: D. D. Create a development environment for writing code and a test environment for configurations, experiments, and load testing. Creating separate environments for development, testing and production is a best practice for software development. This will enable the company to have control over the changes that are made in each environment and reduce the risk of bugs, outages and slowness in production. A development environment would be used by developers to write code, test new features and do initial debugging. This environment should be isolated from production so that... (2 votes)"
      },
      {
        "user": "floppino",
        "text": "Selected Answer: D. Ans: D Exam passed and taken on 19/12/2022, 50/50 from this dump without buying the full access and looking for 'devops' word here: https://www.examtopics.com/discussions/google/1/ (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 18,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Environment isolation: development and test separate from production.",
    "correctRationale": "Every symptom traces back to sharing production: developers deploying features, configuration experiments, and load tests all collide with users. Creating a dedicated development environment plus a test environment for configurations, experiments, and load testing removes all three failure modes while keeping production clean.",
    "optionRationales": [
      "Wrong: Automated failure detection in production still leaves all the risky activity running on production — it detects outages instead of preventing them.",
      "Wrong: A single shared smaller environment still mixes development with load testing, so testers' work would keep breaking developers' work.",
      "Wrong: Locking production to one update per year kills delivery velocity without addressing testing needs.",
      "Correct: Dedicated development and test environments remove every listed cause of production instability while letting testers load test freely."
    ]
  },
  {
    "id": 17,
    "topic": "Monitoring & Alerting",
    "difficulty": 2,
    "question": "You support an e-commerce application that runs on a large Google Kubernetes Engine (GKE) cluster deployed on-premises and on Google Cloud Platform. The application consists of microservices that run in containers. You want to identify containers that are using the most CPU and memory. What should you do?",
    "options": [
      "A. Use Stackdriver Kubernetes Engine Monitoring.",
      "B. Use Prometheus to collect and aggregate logs per container, and then analyze the results in Grafana.",
      "C. Use the Stackdriver Monitoring API to create custom metrics, and then organize your containers using groups.",
      "D. Use Stackdriver Logging to export application logs to BigQuery, aggregate logs per container, and then analyze CPU and memory consumption."
    ],
    "correct": 0,
    "explanation": "Stackdriver Kubernetes Engine Monitoring (now Cloud Operations for GKE) gives per-container CPU/memory metrics out of the box across hybrid clusters.",
    "discussion": [
      {
        "user": "danchoif2",
        "text": "* https://cloud.google.com/anthos/clusters/docs/on-prem GKE on-prem is also called Anthos clusters on VMware * https://cloud.google.com/anthos/clusters/docs/on-prem/concepts/logging-and-monitoring You have several logging and monitoring options for your Anthos clusters on VMware: + Cloud Logging and Cloud Monitoring, enabled by in-cluster agents deployed with Anthos clusters on VMware. + Prometheus and Grafana, disabled by default. + Validated configurations with third-party solutions. => it means, if not a special situation, the correct should be using the first option: Logging and... (22 votes)"
      },
      {
        "user": "ralf_cc",
        "text": "C - workload is only on GKE, https://cloud.google.com/anthos/clusters/docs/on-prem/1.0/concepts/logging-and-monitoring (6 votes)"
      },
      {
        "user": "holahola",
        "text": "A - because \"Cloud Monitoring monitors GKE on-prem clusters in a similar way as cloud-based GKE clusters.\" It includes CPU and RAM utilization. https://cloud.google.com/anthos/clusters/docs/on-prem/1.5/concepts/logging-and-monitoring. Prometheus and grafana - disabled by default. (5 votes)"
      },
      {
        "user": "mudot",
        "text": "Selected Answer: A. I work in the hybrid environment [anthos] and can confirm the required metric availability (4 votes)"
      },
      {
        "user": "francisco_guerra",
        "text": "Ans: C A: No, Cloud Operations for GKE (Stackdriver Kubernetes Engine Monitoring)only displays information for GKE clusters running on Google Cloud. It doesn't display information for GKE clusters running anywhere else, for example using on-premise or bare-metal servers. B: Google only recommed prometeus and Grafana if you have previous knowledge about it C: Correct its the Google's recommendation D: You want to monitoring https://cloud.google.com/stackdriver/docs/solutions/gke https://cloud.google.com/anthos/clusters/docs/on-prem/1.7/concepts/logging-and-monitoring (4 votes)"
      },
      {
        "user": "simbu1299",
        "text": "Selected Answer: A. Correct Answer is A (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 17,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Minority B argued Prometheus/Grafana, but the option text says it aggregates logs, not metrics, so it cannot identify CPU/memory usage as worded.",
    "conceptSummary": "Per-container resource metrics on hybrid GKE via Cloud Operations for GKE.",
    "correctRationale": "The question asks which containers use the most CPU and memory — a metrics question, and Stackdriver Kubernetes Engine Monitoring (today Cloud Operations for GKE / GKE Enterprise observability) collects per-container resource metrics automatically, including for Anthos/hybrid deployments. Prometheus could do it too, but the option as worded aggregates logs, not metrics.",
    "optionRationales": [
      "Correct: Stackdriver Kubernetes Engine Monitoring collects per-container CPU and memory metrics with no custom instrumentation, on-prem and on Google Cloud.",
      "Wrong: As worded, Prometheus collects and aggregates logs, which cannot answer a CPU/memory question; it would also need manual deployment.",
      "Wrong: Hand-creating custom metrics via the Monitoring API is the highest-effort path and reinvents what the built-in monitoring already collects.",
      "Wrong: Logs exported to BigQuery do not contain CPU and memory consumption metrics per container."
    ],
    "legacyNote": "Stackdriver Kubernetes Engine Monitoring is now part of Cloud Operations for GKE / GKE Enterprise observability.",
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 16,
    "topic": "Supply Chain Security",
    "difficulty": 1,
    "question": "You are managing the production deployment to a set of Google Kubernetes Engine (GKE) clusters. You want to make sure only images which are successfully built by your trusted CI/CD pipeline are deployed to production. What should you do?",
    "options": [
      "A. Enable Cloud Security Scanner on the clusters.",
      "B. Enable Vulnerability Analysis on the Container Registry.",
      "C. Set up the Kubernetes Engine clusters as private clusters.",
      "D. Set up the Kubernetes Engine clusters with Binary Authorization."
    ],
    "correct": 3,
    "explanation": "Binary Authorization enforces deploy-time attestation so only images signed by the trusted CI/CD pipeline can run on the GKE clusters.",
    "discussion": [
      {
        "user": "devopsbatch",
        "text": "D because binary authorization is deploy time security tool and it will allow only trusted and attested containers into GKE (28 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: D. D. Set up the Kubernetes Engine clusters with Binary Authorization. Binary Authorization is a feature of Google Kubernetes Engine that allows you to ensure that only containers that are verified to be from a trusted source are deployed to your clusters. It works by using a policy that checks the signatures of container images before they are deployed. You can configure Binary Authorization to require that all images are signed by a trusted certificate authority (CA) or that they are signed by a trusted key that you manage. This ensures that only images that have been... (5 votes)"
      },
      {
        "user": "exploregcp",
        "text": "D https://cloud.google.com/binary-authorization/docs/overview (4 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: D. D as Binary Authorisation enforces only trusted builds (3 votes)"
      },
      {
        "user": "WakandaF",
        "text": "erminology. Binary Authorization is a deploy time security service provided by Google that ensures that only trusted containers are deployed in our GKE cluster. It uses a policy driven model that allows us to configure security policies. Behind the scenes, this service talks to the Container Analysis service (3 votes)"
      },
      {
        "user": "trashbox",
        "text": "Selected Answer: D. Exam on 2024-04-26 (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 16,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Deploy-time image trust enforcement with Binary Authorization.",
    "correctRationale": "Binary Authorization is a deploy-time admission control for GKE: it only lets Pods run if the image carries an attestation from a configured attestor — here, your trusted CI/CD pipeline. That directly guarantees only pipeline-built images reach production, unlike scanning or network isolation.",
    "optionRationales": [
      "Wrong: Cloud Security Scanner (Web Security Scanner) scans App Engine/web apps for vulnerabilities; it does not gate image deployment.",
      "Wrong: Vulnerability analysis finds CVEs in stored images but does not prevent untrusted images from being deployed.",
      "Wrong: Private clusters remove public node endpoints, which is network isolation and says nothing about image provenance.",
      "Correct: Binary Authorization with the build pipeline as attestor blocks any image that was not attested by the trusted pipeline."
    ]
  },
  {
    "id": 15,
    "topic": "SLOs & Error Budgets",
    "difficulty": 2,
    "question": "Your product is currently deployed in three Google Cloud Platform (GCP) zones with your users divided between the zones. You can fail over from one zone to another, but it causes a 10-minute service disruption for the affected users. You typically experience a database failure once per quarter and can detect it within five minutes. You are cataloging the reliability risks of a new real-time chat feature for your product. You catalog the following information for each risk:\n* Mean Time to Detect (MTTD) in minutes\n* Mean Time to Repair (MTTR) in minutes\n* Mean Time Between Failure (MTBF) in days\n* User Impact Percentage The chat feature requires a new database system that takes twice as long to successfully fail over between zones. You want to account for the risk of the new database failing in one zone. What would be the values for the risk of database failover with the new system?",
    "options": [
      "A. MTTD: 5 MTTR: 10 MTBF: 90 Impact: 33%",
      "B. MTTD: 5 MTTR: 20 MTBF: 90 Impact: 33%",
      "C. MTTD: 5 MTTR: 10 MTBF: 90 Impact: 50%",
      "D. MTTD: 5 MTTR: 20 MTBF: 90 Impact: 50%"
    ],
    "correct": 1,
    "explanation": "MTTD stays 5, MTBF stays ~90 days, one-zone impact stays 33%; only MTTR doubles to 20 minutes because failover takes twice as long.",
    "discussion": [
      {
        "user": "rinkeshgala1",
        "text": "B MTR will increase to 20 (11 votes)"
      },
      {
        "user": "PhilipKoku",
        "text": "Selected Answer: B. B is the answer: MTTD: 5 minutes MTTR: 20 minutes (twice the time) Impact: 33% (1 of 3 zones impacted) (8 votes)"
      },
      {
        "user": "alpha_canary",
        "text": "Selected Answer: B. Pretty simple maths: MTTD stays 5 as no change in it MTTR doubles to 20 minutes because question says \"a new database system that takes twice as long to successfully fail over between zones.\" MTBF stays the same i.e., once per quarter (90 days) Impact: 33% because if one zone fails, only users in that zone is affeted and we have users spread over 3 zones. (4 votes)"
      },
      {
        "user": "Greg123123",
        "text": "I was struggling between B and D as I couldn't find any information that indicate the impact of users. After checking out the discussion here most of people say it's B because there are 3 zones. If this is the case, there is a typo in the question: \"Your product is currently deployed in three Google Cloud Platform (GCP) zones with your users divided between \"the\"(three) zones\". So it should be B. (4 votes)"
      },
      {
        "user": "[Removed]",
        "text": "Why there are so many questions using a wrong item as \"correct answer\" ? Where the value came from, so confuse :( (4 votes)"
      },
      {
        "user": "francisco_guerra",
        "text": "I think its B because the impacted users should be the same 33% (4 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 15,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Updating an MTTD/MTTR/MTBF risk entry for a slower-failover database.",
    "correctRationale": "Detection time and failure frequency do not change with the new database — MTTD is still 5 minutes and quarterly failure is ~90 days MTBF. Only the repair time doubles, from the 10-minute failover disruption to 20 minutes. User impact is still confined to one of three zones, so it stays 33%.",
    "optionRationales": [
      "Wrong: Keeps MTTR at the old 10 minutes even though the new database takes twice as long to fail over.",
      "Correct: MTTD 5, MTTR 20 (doubled), MTBF 90, Impact 33% reflects only the failover duration changing.",
      "Wrong: Keeps the old MTTR and inflates impact to 50%, but a single-zone failure still affects only a third of users.",
      "Wrong: Doubles MTTR correctly but also inflates impact to 50%, which a one-zone outage does not justify."
    ]
  },
  {
    "id": 14,
    "topic": "CI/CD Pipelines",
    "difficulty": 2,
    "question": "Your application images are built and pushed to Google Container Registry (GCR). You want to build an automated pipeline that deploys the application when the image is updated while minimizing the development effort. What should you do?",
    "options": [
      "A. Use Cloud Build to trigger a Spinnaker pipeline.",
      "B. Use Cloud Pub/Sub to trigger a Spinnaker pipeline.",
      "C. Use a custom builder in Cloud Build to trigger Jenkins pipeline.",
      "D. Use Cloud Pub/Sub to trigger a custom deployment service running in Google Kubernetes Engine (GKE)."
    ],
    "correct": 1,
    "explanation": "Container Registry published image-push events to Pub/Sub, which could trigger a Spinnaker deploy pipeline with minimal wiring.",
    "discussion": [
      {
        "user": "MF2C",
        "text": "B is correct : https://cloud.google.com/architecture/continuous-delivery-toolchain-spinnaker-cloud#triggering_a_spinnaker_pipeline_when_a_docker_image_is_pushed_to_container_registry (21 votes)"
      },
      {
        "user": "Luvero",
        "text": "Its B Google Cloud Build vs Spinnaker: What are the differences? What is Google Cloud Build? Continuously build, test, and deploy. Cloud Build lets you build software quickly across all languages. Get complete control over defining custom workflows for building, testing, and deploying across multiple environments such as VMs, serverless, Kubernetes, or Firebase. What is Spinnaker? Multi-cloud continuous delivery platform for releasing software changes with high velocity and confidence. Created at Netflix, it has been battle-tested in production by hundreds of teams over millions of... (7 votes)"
      },
      {
        "user": "Dark_Lord",
        "text": "B, the pub/sub can trigger any deployment tool(spinnaker, cloud Run etc), but in platform native approach is to use spinnnaker. You can also validate this, because they have only used platform native tools in the question like google container registry(instead of docker hub) (6 votes)"
      },
      {
        "user": "rfd",
        "text": "Selected Answer: B. most sensible choice (4 votes)"
      },
      {
        "user": "devopsbatch",
        "text": "A cloud build spinakker pipeline (4 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: B. B is correct (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 14,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Image-push-driven deployment via Pub/Sub notification.",
    "correctRationale": "At the time, Google Container Registry published notifications to a Cloud Pub/Sub topic whenever an image was pushed, and Spinnaker could listen to that topic to kick off a deployment pipeline. This requires only a subscription and a Spinnaker trigger — minimal development effort compared to custom builders or services.",
    "optionRationales": [
      "Wrong: Cloud Build only runs when something triggers it; nothing here connects an image push to a Cloud Build run, so this adds an unnecessary hop.",
      "Correct: GCR emitted Pub/Sub notifications on image push, and a Pub/Sub trigger on the Spinnaker pipeline deploys on update with the least code.",
      "Wrong: A custom Cloud Build builder to call Jenkins is bespoke plumbing when a managed Pub/Sub notification exists.",
      "Wrong: Running a custom deployment service on GKE is the most code and most operational overhead of the four."
    ],
    "legacyNote": "Container Registry is deprecated in favor of Artifact Registry, and current guidance favors Cloud Deploy over Spinnaker. Artifact Registry can also notify Pub/Sub, so the trigger pattern survives."
  },
  {
    "id": 13,
    "topic": "Performance & Cost",
    "difficulty": 2,
    "question": "You are performing a semi-annual capacity planning exercise for your flagship service. You expect a service user growth rate of 10% month-over-month over the next six months. Your service is fully containerized and runs on Google Cloud Platform (GCP), using a Google Kubernetes Engine (GKE) Standard regional cluster on three zones with cluster autoscaler enabled. You currently consume about 30% of your total deployed CPU capacity, and you require resilience against the failure of a zone. You want to ensure that your users experience minimal negative impact as a result of this growth or as a result of zone failure, while avoiding unnecessary costs. How should you prepare to handle the predicted growth?",
    "options": [
      "A. Verify the maximum node pool size, enable a horizontal pod autoscaler, and then perform a load test to verify your expected resource needs.",
      "B. Because you are deployed on GKE and are using a cluster autoscaler, your GKE cluster will scale automatically, regardless of growth rate.",
      "C. Because you are at only 30% utilization, you have significant headroom and you won't need to add any additional capacity for this rate of growth.",
      "D. Proactively add 60% more node capacity to account for six months of 10% growth rate, and then perform a load test to make sure you have enough capacity."
    ],
    "correct": 0,
    "explanation": "Validate the autoscaler ceilings, add pod-level autoscaling, and load test — instead of blindly over-provisioning or assuming autoscaling just works.",
    "discussion": [
      {
        "user": "francisco_guerra",
        "text": "A: Correct. The Horizontal Pod Autoscaler changes the shape of your Kubernetes workload by automatically increasing or decreasing the number of Pods in response to the workload's CPU or memory consumption B: Incorrect. It is not based on the CPU its based on the workload C: No, Hope is not an strategy D: No, have more resource than needed (25 votes)"
      },
      {
        "user": "akg001",
        "text": "The correct answer - A https://cloud.google.com/kubernetes-engine/docs/concepts/horizontalpodautoscaler (3 votes)"
      },
      {
        "user": "umesh0u",
        "text": "Selected Answer: A. i think A (2 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: A. Answer is A (2 votes)"
      },
      {
        "user": "burndayl",
        "text": "C for me: 30% of total deployed CPU consumption mean 10% of CUP on each zone; 10% of increment month-over-month mean at the beginning of the second mont you will have 11% of CPU, at the tird 12,1% and so on; you can easly accomodate a fault of a zone; you don't have additional cost (2 votes)"
      },
      {
        "user": "Kedar1234",
        "text": "Selected Answer: B. Examtopics suggest Ans B (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 13,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Capacity planning for growth plus zone-failure resilience on GKE.",
    "correctRationale": "10% month-over-month growth for six months roughly doubles demand, and losing a zone removes a third of capacity — so headroom must be verified, not assumed. Checking the node pool maximum ensures the cluster autoscaler can actually grow, the horizontal pod autoscaler scales pods with load, and a load test proves the plan before it is needed. This avoids both surprise failures and paying for 60% idle capacity.",
    "optionRationales": [
      "Correct: Verifying the node pool cap, enabling HPA, and load testing confirms the real scaling envelope while keeping cost proportional to demand.",
      "Wrong: The cluster autoscaler only adds nodes up to configured maximums and quota; assuming it scales 'regardless' ignores both limits and zone-loss headroom.",
      "Wrong: 30% utilization today still fails when growth doubles demand and a zone outage removes a third of capacity.",
      "Wrong: Adding 60% permanently pays for idle capacity and skips the verification that autoscaling actually works."
    ]
  },
  {
    "id": 12,
    "topic": "Incident Management",
    "difficulty": 1,
    "question": "You encountered a major service outage that affected all users of the service for multiple hours. After several hours of incident management, the service returned to normal, and user access was restored. You need to provide an incident summary to relevant stakeholders following the Site Reliability Engineering recommended practices. What should you do first?",
    "options": [
      "A. Call individual stakeholders to explain what happened.",
      "B. Develop a post-mortem to be distributed to stakeholders.",
      "C. Send the Incident State Document to all the stakeholders.",
      "D. Require the engineer responsible to write an apology email to all stakeholders."
    ],
    "correct": 1,
    "explanation": "SRE practice after a major outage is to produce a postmortem and distribute it to stakeholders.",
    "discussion": [
      {
        "user": "devopsbatch",
        "text": "B postmortem analysis report to stakeholders (25 votes)"
      },
      {
        "user": "francisco_guerra",
        "text": "A: No B: Correct C: No, Incident State document is used for consultation with incident participants. D: No, Blameless (7 votes)"
      },
      {
        "user": "chidambaram",
        "text": "Selected Answer: B. As per SRE culture, postmortem is the correct one. (5 votes)"
      },
      {
        "user": "abhishrek",
        "text": "why is A showing as correct ans. (4 votes)"
      },
      {
        "user": "skm4690",
        "text": "B postmortem report to be share with stakeholders as per SRE. (3 votes)"
      },
      {
        "user": "edner",
        "text": "Selected Answer: B. B, blameless postmortem https://sre.google/sre-book/postmortem-culture/ (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 12,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "First step in post-incident stakeholder communication: the postmortem.",
    "correctRationale": "Once service is restored, the SRE-recommended deliverable for stakeholder communication is the postmortem document — a formal, blameless record of what happened, impact, and follow-up actions. Individual calls and apology emails do not scale and assign blame; the Incident State Document is a live working artifact, not the summary.",
    "optionRationales": [
      "Wrong: Calling stakeholders one by one does not scale and produces inconsistent accounts of the incident.",
      "Correct: Writing and distributing a postmortem is the documented SRE practice for summarizing a major incident to stakeholders.",
      "Wrong: The Incident State Document is the live incident-tracking artifact used during the response, not the post-incident summary.",
      "Wrong: Requiring an apology email singles out an individual, which violates blameless postmortem culture."
    ]
  },
  {
    "id": 11,
    "topic": "Performance & Cost",
    "difficulty": 2,
    "question": "You support the backend of a mobile phone game that runs on a Google Kubernetes Engine (GKE) cluster. The application is serving HTTP requests from users. You need to implement a solution that will reduce the network cost. What should you do?",
    "options": [
      "A. Configure the VPC as a Shared VPC Host project.",
      "B. Configure your network services on the Standard Tier.",
      "C. Configure your Kubernetes cluster as a Private Cluster.",
      "D. Configure a Google Cloud HTTP Load Balancer as Ingress."
    ],
    "correct": 1,
    "explanation": "Standard Tier routes egress over the public internet instead of Google's premium backbone, which is the only option that actually lowers network cost.",
    "discussion": [
      {
        "user": "francisco_guerra",
        "text": "Ans is D A: No, Doest make sense B: Who says that we are using a premium tier? C: This does not help with the network cost? D: Ok :) Costs associated with a load balancer are charged to the project containing the load balancer components. Because of these benefits, container-native load balancing is the recommended solution for load balancing through Ingress. When NEGs are used with GKE Ingress, the Ingress controller facilitates the creation of all aspects of the L7 load balancer. This includes creating the virtual IP address, forwarding rules, health checks, firewall rules, and more.... (27 votes)"
      },
      {
        "user": "MF2C",
        "text": "Standard Tier offers a lower-cost alternative for the following use cases: You have applications that are not latency or performance sensitive. Mobile gaming cannot choose B (6 votes)"
      },
      {
        "user": "exploregcp",
        "text": "Ans is C. Private cluster has only private IP assigned to nodes. As this is backend service public IPs are not required. Public IPs are are chargable. https://cloud.google.com/architecture/prep-kubernetes-engine-for-prod#private_clusters D is not correct. Ingress traffic is not charged. Hence will not help in network cost saving. (6 votes)"
      },
      {
        "user": "ESP_SAP",
        "text": "Correct Answer is D: https://cloud.google.com/vpc/network-pricing Ingress pricing Traffic type Price Ingress No charge for ingress traffic. However there may be a charge for resource that processes ingress traffic. Services that process ingress traffic are as follows: Load balancers Cloud NAT Protocol forwarding Responses to requests count as egress are charged. (4 votes)"
      },
      {
        "user": "Omni_Omnom",
        "text": "Selected Answer: D. https://cloud.google.com/vpc/network-pricing (4 votes)"
      },
      {
        "user": "Manh",
        "text": "I think should be B Standard tier reduce cost than premium tier A no way C private cluster need additional resource for ingress and egress like NAT D configure HTTP LB, it's make more cost https://cloud.netapp.com/blog/gcp-cvo-blg-gcp-network-pricing-how-to-beat-the-hidden-fees (4 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 11,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Community split B 55% / D 43%. An HTTP load balancer as Ingress does not reduce network cost (and the global LB requires Premium Tier anyway); Standard Tier is the only option that lowers egress pricing.",
    "conceptSummary": "Cutting egress cost with Network Service Tiers Standard Tier.",
    "correctRationale": "Network cost is dominated by egress pricing, and Standard Tier is the only listed option that changes it — traffic egresses via transit ISPs at a lower per-GB price than Premium Tier. An HTTP load balancer as Ingress runs on Premium Tier for global anycast and does not reduce egress pricing. Shared VPC and private clusters change topology and security, not per-GB cost.",
    "optionRationales": [
      "Wrong: Shared VPC centralizes network administration for security and manageability; it does not change egress pricing.",
      "Correct: Standard Tier sends traffic out via public transit rather than Google's premium backbone, which directly lowers the network egress bill.",
      "Wrong: A private cluster only removes public IPs from nodes; it improves security posture, not network cost.",
      "Wrong: A global HTTP(S) load balancer requires Premium Tier and adds its own per-GB processing charges, so it increases rather than reduces network cost."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 10,
    "topic": "Logging",
    "difficulty": 1,
    "question": "You have a pool of application servers running on Compute Engine. You need to provide a secure solution that requires the least amount of configuration and allows developers to easily access application logs for troubleshooting. How would you implement the solution on GCP?",
    "options": [
      "A. • Deploy the Stackdriver logging agent to the application servers. • Give the developers the IAM Logs Viewer role to access Stackdriver and view logs.",
      "B. • Deploy the Stackdriver logging agent to the application servers. • Give the developers the IAM Logs Private Logs Viewer role to access Stackdriver and view logs.",
      "C. • Deploy the Stackdriver monitoring agent to the application servers. • Give the developers the IAM Monitoring Viewer role to access Stackdriver and view metrics.",
      "D. • Install the gsutil command line tool on your application servers. • Write a script using gsutil to upload your application log to a Cloud Storage bucket, and then schedule it to run via cron every 5 minutes. • Give the developers the IAM Object Viewer access to view the logs in the specified bucket."
    ],
    "correct": 0,
    "explanation": "Installing the logging agent on the VMs and granting Logs Viewer is the minimal-configuration, secure way to expose app logs.",
    "discussion": [
      {
        "user": "devopsbatch",
        "text": "A roles/logging.viewer (Logs Viewer) gives you read-only access to all features of Logging, except Access Transparency logs and Data Access audit logs. (27 votes)"
      },
      {
        "user": "danchoif2",
        "text": "https://cloud.google.com/logging/docs/audit#access-control A is correct. B is incorrect because developers only need to access application logs, not private logs. (4 votes)"
      },
      {
        "user": "buldas",
        "text": "Selected Answer: A. A. OK B. Logs Private Logs is for Data Logs C. Nope D. what? (3 votes)"
      },
      {
        "user": "roastc",
        "text": "Looks like answer A is correct. A logging agent is required to enable the custom logs pushed to Stackdriver https://cloud.google.com/logging/docs/agent/logging . Developers need only Log Viewer permission, which is enough in this case and Private Log viewer is a superset of log viewer permission with elevated permission to view the private data in logs. Which is not needed in this case. (3 votes)"
      },
      {
        "user": "mohan999",
        "text": "A is correct, Private Logs Viewer gives you extra access to Data access logs and the question was about viewing application logs. (2 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: A. The correct answer is \"A\" (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 10,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Minimal-effort developer access to Compute Engine application logs.",
    "correctRationale": "The logging agent (Ops Agent today, Stackdriver agent at the time) ships application logs to Cloud Logging, and the Logs Viewer role gives developers read-only access — secure and minimal. The private log viewer role is for Data Access audit logs, and gsutil cron uploads are a fragile hand-rolled pipeline.",
    "optionRationales": [
      "Correct: Agent on the servers plus the Logs Viewer role gets logs into Cloud Logging and read access for developers with the least configuration.",
      "Wrong: Logs Private Logs Viewer grants access to Data Access audit logs, which is not what application troubleshooting needs and exceeds least privilege.",
      "Wrong: The monitoring agent and Monitoring Viewer expose metrics, not the application log entries developers need.",
      "Wrong: A cron-driven gsutil script is fragile custom plumbing when the managed logging agent exists."
    ],
    "legacyNote": "The Stackdriver logging agent is deprecated; install the Ops Agent instead. Roles shown still exist (roles/logging.viewer, roles/logging.privateLogsViewer)."
  },
  {
    "id": 9,
    "topic": "Deployment Strategies",
    "difficulty": 1,
    "question": "You deploy a new release of an internal application during a weekend maintenance window when there is minimal user traffic. After the window ends, you learn that one of the new features isn't working as expected in the production environment. After an extended outage, you roll back the new release and deploy a fix. You want to modify your release process to reduce the mean time to recovery so you can avoid extended outages in the future. What should you do? (Choose two.)",
    "options": [
      "A. Before merging new code, require 2 different peers to review the code changes.",
      "B. Adopt the blue/green deployment strategy when releasing new code via a CD server.",
      "C. Integrate a code linting tool to validate coding standards before any code is accepted into the repository.",
      "D. Require developers to run automated integration tests on their local development environments before release.",
      "E. Configure a CI server. Add a suite of unit tests to your code and have your CI server run them on commit and verify any changes."
    ],
    "correct": [
      1,
      4
    ],
    "explanation": "Blue/green deployments plus CI unit tests shorten recovery: instant rollback to the green environment and earlier failure detection.",
    "discussion": [
      {
        "user": "francisco_guerra",
        "text": "Ans: B & E A: No, More peers to review dont automate anything B: Ok CD C: No, Linting is for code format D: No, Integration test are needed but its better automatically E: Ok CI CI/CD its OK (28 votes)"
      },
      {
        "user": "simbu1299",
        "text": "Selected Answer: BE. Answer is B & E (4 votes)"
      },
      {
        "user": "ralf_cc",
        "text": "Reduce MTTR - B Blue/Green, E tests on CI (4 votes)"
      },
      {
        "user": "PJ_2021",
        "text": "Selected Answer: BE. Answer is B E (3 votes)"
      },
      {
        "user": "carloscorreia",
        "text": "Selected Answer: BE. Ans: B and E A: I understand the importance, but is not it that will avoid errors because we are humans B: Blue/Green will ensure that part of the users were not affected by the bug C: Lint code is just one to validate a code format and indentation D: To avoid errors is important that tests be run in the pipeline E: CI it's a good moment to run all checks (2 votes)"
      },
      {
        "user": "Parteekbhardwaj",
        "text": "Selected Answer: BE. ANS IS (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 9,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Reducing MTTR with blue/green deploys and CI test gates.",
    "correctRationale": "The pain point is an extended outage caused by a bad release discovered after the maintenance window. Blue/green deployment keeps the previous environment running so rollback is near-instant, cutting MTTR. A CI server running unit tests on every commit catches broken features before release, reducing the chance an extended outage happens at all.",
    "optionRationales": [
      "Wrong: Extra peer reviews may improve quality marginally but do nothing to speed recovery once a bad release is live.",
      "Correct: Blue/green keeps the previous environment alive, so rollback to a known-good state is immediate — directly reducing mean time to recovery.",
      "Wrong: Linting enforces style, not correctness; it would not have caught a feature that does not work.",
      "Wrong: Local integration tests depend on developer discipline and local setups, unlike CI-run tests that gate every commit.",
      "Correct: CI-run unit tests on every commit catch regressions before release, reducing the frequency of outage-inducing deployments."
    ]
  },
  {
    "id": 8,
    "topic": "SLOs & Error Budgets",
    "difficulty": 1,
    "question": "You support a high-traffic web application and want to ensure that the home page loads in a timely manner. As a first step, you decide to implement a Service Level Indicator (SLI) to represent home page request latency with an acceptable page load time set to 100 ms. What is the Google-recommended way of calculating this SLI?",
    "options": [
      "A. Bucketize the request latencies into ranges, and then compute the percentile at 100 ms.",
      "B. Bucketize the request latencies into ranges, and then compute the median and 90th percentiles.",
      "C. Count the number of home page requests that load in under 100 ms, and then divide by the total number of home page requests.",
      "D. Count the number of home page request that load in under 100 ms, and then divide by the total number of all web application requests."
    ],
    "correct": 2,
    "explanation": "The recommended SLI is the proportion of home page requests served in under 100 ms out of all home page requests.",
    "discussion": [
      {
        "user": "Charun",
        "text": "I have submitted C answer (17 votes)"
      },
      {
        "user": "danchoif2",
        "text": "A, B and D: aren't specific to home page, so they are incorrect. C is correct. (9 votes)"
      },
      {
        "user": "akg001",
        "text": "Answer -C SLI = good events/valid events X 100 (5 votes)"
      },
      {
        "user": "francisco_guerra",
        "text": "Ans is B After a lot of research i find out this: The SLI for availability indicates whether the service is working. The SLI for availability is defined as follows: The proportion of valid requests served successfully. (good request / total request) The SLI for latency (sometimes called speed) indicates whether the service is fast enough. The proportion of valid requests served faster than a threshold. Latency is commonly measured as a distribution. Given a distribution, you can measure various percentiles. For example, you might measure the number of requests that are slower than the... (4 votes)"
      },
      {
        "user": "akg001",
        "text": "Answer -C SLI = good events/good events X 100 (4 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: C. The correct answer is 'C' (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 8,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Request-based latency SLI: good events over total events.",
    "correctRationale": "Google's SRE guidance defines an SLI as the ratio of good events to total events. Here that means counting home page requests that load under the 100 ms threshold and dividing by the total number of home page requests — a clean, directly interpretable reliability measure.",
    "optionRationales": [
      "Wrong: Computing a percentile at exactly 100 ms from buckets is not the recommended ratio-of-good-events formulation and loses precision.",
      "Wrong: Median and 90th-percentile latencies describe the distribution, not the proportion of requests meeting the 100 ms objective.",
      "Correct: Good home page requests (under 100 ms) divided by total home page requests is the standard ratio-based SLI.",
      "Wrong: Dividing by all web application requests mixes unrelated endpoints into the denominator and understates the home page SLI."
    ]
  },
  {
    "id": 7,
    "topic": "Deployment Strategies",
    "difficulty": 2,
    "question": "You use Spinnaker to deploy your application and have created a canary deployment stage in the pipeline. Your application has an in-memory cache that loads objects at start time. You want to automate the comparison of the canary version against the production version. How should you configure the canary analysis?",
    "options": [
      "A. Compare the canary with a new deployment of the current production version.",
      "B. Compare the canary with a new deployment of the previous production version.",
      "C. Compare the canary with the existing deployment of the current production version.",
      "D. Compare the canary with the average performance of a sliding window of previous production versions."
    ],
    "correct": 0,
    "explanation": "Compare the canary against a fresh deployment of the current production version so both sides warm their in-memory caches equally.",
    "discussion": [
      {
        "user": "francisco_guerra",
        "text": "Ans A https://spinnaker.io/guides/user/canary/best-practices/#compare-canary-against-baseline-not-against-production You might be tempted to compare the canary deployment against your current production deployment. Instead always compare the canary against an equivalent baseline, deployed at the same time. The baseline uses the same version and configuration that is currently running in production, but is otherwise identical to the canary: Same time of deployment Same size of deployment Same type and amount of traffic In this way, you control for version and configuration only, and you reduce... (10 votes)"
      },
      {
        "user": "Charun",
        "text": "I have submitted A (6 votes)"
      },
      {
        "user": "AzureDP900",
        "text": "A is right You might be tempted to compare the canary deployment against your current production deployment. Instead always compare the canary against an equivalent baseline, deployed at the same time. The baseline uses the same version and configuration that is currently running in production, but is otherwise identical to the canary: Same time of deployment Same size of deployment Same type and amount of traffic In this way, you control for version and configuration only, and you reduce factors that could affect the analysis, like the cache warmup time, the heap size, and so on. (2 votes)"
      },
      {
        "user": "RuchiMishra",
        "text": "Selected Answer: A. Explanation taking into account the in-memory cache: In-memory Cache Impact: The in-memory cache loading at start time means that both the canary and the current production version could have different data in their caches. This difference could skew the comparison if you compare the canary directly to the existing production version (Option C). Leveling the Playing Field: By deploying a fresh instance of the current production version (Option A), you ensure that both the canary and the comparison baseline have the same starting point in terms of cache data. This makes the... (1 vote)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: A. Answer A (1 vote)"
      },
      {
        "user": "floppino",
        "text": "Selected Answer: A. Ans: A (1 vote)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 7,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Canary analysis with a cache-warming baseline deployment.",
    "correctRationale": "The application loads objects into an in-memory cache at startup, so the long-running production deployment has a warm cache while the canary starts cold — comparing them directly is unfair. A new deployment of the current production version starts cold too, giving an apples-to-apples automated comparison.",
    "optionRationales": [
      "Correct: A fresh baseline deployment of the current production version starts with a cold cache just like the canary, making the automated comparison fair.",
      "Wrong: Deploying the previous production version compares the canary against code that is not actually serving users today.",
      "Wrong: The existing production deployment has a warm cache, so its metrics look artificially better than a cold-start canary.",
      "Wrong: A sliding-window average mixes metrics from multiple old versions and still reflects warm caches, not a like-for-like baseline."
    ]
  },
  {
    "id": 6,
    "topic": "CI/CD Pipelines",
    "difficulty": 1,
    "question": "You use a multiple step Cloud Build pipeline to build and deploy your application to Google Kubernetes Engine (GKE). You want to integrate with a third-party monitoring platform by performing a HTTP POST of the build information to a webhook. You want to minimize the development effort. What should you do?",
    "options": [
      "A. Add logic to each Cloud Build step to HTTP POST the build information to a webhook.",
      "B. Add a new step at the end of the pipeline in Cloud Build to HTTP POST the build information to a webhook.",
      "C. Use Stackdriver Logging to create a logs-based metric from the Cloud Build logs. Create an Alert with a Webhook notification type.",
      "D. Create a Cloud Pub/Sub push subscription to the Cloud Build cloud-builds PubSub topic to HTTP POST the build information to a webhook."
    ],
    "correct": 3,
    "explanation": "Cloud Build publishes build events to the cloud-builds Pub/Sub topic; a push subscription can POST them to any webhook with zero extra build code.",
    "discussion": [
      {
        "user": "Charun",
        "text": "I have submitted D answer (17 votes)"
      },
      {
        "user": "francisco_guerra",
        "text": "Ans: D Pub/Sub A: No becauseThere is not Structure attribute to create a http request in the steps and remember you want minimize the development effort. B: The same A C: minimize the development effort D: Its OK To receive messages from push subscriptions, use a webhook and process the POST requests that Pub/Sub sends to the push endpoint. For more information about processing these POST requests in App Engine, see Writing and responding to Pub/Sub messages. https://cloud.google.com/pubsub/docs/push https://cloud.google.com/build/docs/subscribe-build-notifications (17 votes)"
      },
      {
        "user": "zellck",
        "text": "Selected Answer: D. D is the answer. https://cloud.google.com/build/docs/subscribe-build-notifications Cloud Build publishes messages on a Google Pub/Sub topic when your build's state changes, such as when your build is created, when your build transitions to a working state, and when your build completes. The Pub/Sub topic to which Cloud Build publishes these build update messages is called cloud-builds. Each message contains a base64 JSON string representation of your Build resource in the message.data attribute. The build's unique ID and the build's status can be found in the... (6 votes)"
      },
      {
        "user": "pddddd",
        "text": "Not sure on D. Pub/Sub posts into specific format and the actual payload in is message.data. Third party system API (where you post status) will have its own POST format. I feel B is better - you add a step in CLoud Build to do the POST. (3 votes)"
      },
      {
        "user": "floppino",
        "text": "Selected Answer: D. Ans: D (2 votes)"
      },
      {
        "user": "akshay_jadhav",
        "text": "Selected Answer: D. Cloud Build -> Pubsub -> HTTP Builder.........SO ans is D (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 6,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Posting Cloud Build events to a third-party webhook via Pub/Sub.",
    "correctRationale": "Cloud Build natively publishes build state messages to the cloud-builds Pub/Sub topic. A push subscription on that topic delivers each message as an HTTP POST to your webhook endpoint, requiring no changes to the build pipeline itself — the minimum development effort.",
    "optionRationales": [
      "Wrong: Editing every build step to POST is invasive, duplicated effort and easy to forget on future steps.",
      "Wrong: An extra build step only fires if the build reaches it, and it still requires writing and maintaining POST logic in the pipeline.",
      "Wrong: A logs-based metric plus alerting webhook is a convoluted path that only fires on conditions you define, not a general build-information stream.",
      "Correct: Subscribing a push endpoint to the managed cloud-builds Pub/Sub topic POSTs build information to the webhook with no pipeline changes at all."
    ]
  },
  {
    "id": 5,
    "topic": "Logging",
    "difficulty": 2,
    "question": "You are running an application in a virtual machine (VM) using a custom Debian image. The image has the Stackdriver Logging agent installed. The VM has the cloud-platform scope. The application is logging information via syslog. You want to use Stackdriver Logging in the Google Cloud Platform Console to visualize the logs. You notice that syslog is not showing up in the \"All logs\" dropdown list of the Logs Viewer. What is the first thing you should do?",
    "options": [
      "A. Look for the agent's test log entry in the Logs Viewer.",
      "B. Install the most recent version of the Stackdriver agent.",
      "C. Verify the VM service account access scope includes the monitoring.write scope.",
      "D. SSH to the VM and execute the following commands on your VM: ps ax | grep fluentd."
    ],
    "correct": 3,
    "explanation": "First verify the fluentd logging agent is actually running on the VM — a missing agent process explains absent syslog entries.",
    "discussion": [
      {
        "user": "raf2121",
        "text": "Between C and D, I think D Reason : When an instance is created, we can specify which service account the instance uses when calling Google Cloud APIs. The instance is automatically configured with access scope and one such access scope is monitoring.write (Link : https://cloud.google.com/compute/docs/access/service- read is to publish metric data and logging.write is to write compute engine logs. Considering above, I believe D as the answer (check whether the agent is running) (12 votes)"
      },
      {
        "user": "francisco_guerra",
        "text": "Ans is C Why?: A: Does not make sense at all B: the version it's not possible? C: Its OK because both (scope and service account) need access to write to logging D: Really? the question clearly says: \"The image has the Stackdriver Logging agent installed.\" Explanation: Generally, you can just set the cloud-platform access scope to allow access to most of the Cloud APIs, then grant the service account only relevant IAM roles. The combination of access scopes granted to the virtual machine instance and the IAM roles granted to the service account determines the amount of access the service... (3 votes)"
      },
      {
        "user": "devopsbatch",
        "text": "C because vm need writer access and i feel D as well because fluent need to be available to export ,aggregate and process logs into stack driver monitoring tool... suggestions needed here (3 votes)"
      },
      {
        "user": "floppino",
        "text": "Selected Answer: D. Ans: D (2 votes)"
      },
      {
        "user": "DoodleDo",
        "text": "D. Check if fluentd is running is the right answer. C is incorrect as monitoring.write scope is for monitoring agent and not logging agent. (2 votes)"
      },
      {
        "user": "alexweberlopes",
        "text": "The VM has cloud-platform scope on the VM means Full access if you using the default compute account. I would say answer D is right check is the fluentd daemon running. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 5,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Minority C argued for checking scopes, but the relevant scope is logging.write (not monitoring.write) and cloud-platform already covers it, so the answer is checking the agent process.",
    "conceptSummary": "Troubleshooting a missing syslog feed from the legacy Logging agent.",
    "correctRationale": "If syslog entries never appear, the first check is whether the logging agent (fluentd) is running at all; ps ax | grep fluentd answers that directly. The cloud-platform scope already covers logging, and reinstalling the agent before confirming it is dead is premature.",
    "optionRationales": [
      "Wrong: The test log entry only tells you whether the agent ever wrote successfully; it is not the most direct check that the agent is running.",
      "Wrong: Reinstalling or upgrading the agent is pointless before confirming whether the agent process is even alive.",
      "Wrong: Logging uses the logging.write scope, not monitoring.write, and the cloud-platform scope already includes everything needed.",
      "Correct: Checking for the fluentd process with ps ax | grep fluentd is the first troubleshooting step — if the agent is not running, no syslog entries will reach Cloud Logging."
    ],
    "legacyNote": "This question targets the legacy Logging agent (fluentd). On current images you install the Ops Agent, which is based on Fluent Bit."
  },
  {
    "id": 4,
    "topic": "Logging",
    "difficulty": 3,
    "question": "You have a set of applications running on a Google Kubernetes Engine (GKE) cluster, and you are using Stackdriver Kubernetes Engine Monitoring. You are bringing a new containerized application required by your company into production. This application is written by a third party and cannot be modified or reconfigured. The application writes its log information to /var/log/app_messages.log, and you want to send these log entries to Stackdriver Logging. What should you do?",
    "options": [
      "A. Use the default Stackdriver Kubernetes Engine Monitoring agent configuration.",
      "B. Deploy a Fluentd daemonset to GKE. Then create a customized input and output configuration to tail the log file in the application's pods and write to Stackdriver Logging.",
      "C. Install Kubernetes on Google Compute Engine (GCE) and redeploy your applications. Then customize the built-in Stackdriver Logging configuration to tail the log file in the application's pods and write to Stackdriver Logging.",
      "D. Write a script to tail the log file within the pod and write entries to standard output. Run the script as a sidecar container with the application's pod. Configure a shared volume between the containers to allow the script to have read access to /var/log in the application container."
    ],
    "correct": 3,
    "explanation": "A Fluentd DaemonSet on the node can't read a file inside the container's own filesystem; a sidecar container tails the file into stdout, where the node's agent picks it up.",
    "discussion": [
      {
        "user": "francisco_guerra",
        "text": "Ans is B Besides the list of default logs that the Logging agent streams by default, you can customize the Logging agent to send additional logs to Logging or to adjust agent settings by adding input configurations. The configuration definitions in these sections apply to the fluent-plugin-google-cloud output plugin only and specify how logs are transformed and ingested into Cloud Logging. (6 votes)"
      },
      {
        "user": "WakandaF",
        "text": "I believe that is B, This tutorial describes how to customize Fluentd logging for a Google Kubernetes Engine cluster. You'll learn how to host your own configurable Fluentd daemonset to send logs to Cloud Logging, instead of selecting the cloud logging option when creating the Google Kubernetes Engine (GKE) cluster, which does not allow configuration of the Fluentd daemon (4 votes)"
      },
      {
        "user": "zellck",
        "text": "Selected Answer: B. B is the answer. https://cloud.google.com/stackdriver/docs/solutions/gke/managing-logs#custom_agents GKE's default logging agent provides a managed solution to deploy and manage the agents that send the logs for your clusters to Cloud Logging. Depending on your GKE cluster master version, either fluentd or fluentbit are used to collect logs. Common use cases include: - collecting additional logs not written to STDOUT or STDERR - customized log formatting (4 votes)"
      },
      {
        "user": "lakiluk",
        "text": "Selected Answer: D. D is the correct answer don't get fooled. (4 votes)"
      },
      {
        "user": "syslog",
        "text": "Selected Answer: B. Because Fluentd is created specifically for extracting logs. https://docs.fluentd.org/input/tail (4 votes)"
      },
      {
        "user": "singularis",
        "text": "Selected Answer: D. The answer is D. Fluent D cannot read logs from files. https://kubernetes.io/docs/concepts/cluster-administration/logging/#sidecar-container-with-logging-agent By having your sidecar containers write to their own stdout and stderr streams, you can take advantage of the kubelet and the logging agent that already run on each node. The sidecar containers read logs from a file, a socket, or journald. Each sidecar container prints a log to its own stdout or stderr stream. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 4,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Overrides ExamTopics B (community B 58% / D 42%); changed after a second review. A node-level Fluentd daemonset only sees what lands on the node (container stdout/stderr under /var/log/containers) and cannot read a file inside the container's own filesystem. A streaming sidecar that tails the file from a shared volume and writes it to stdout is the documented Kubernetes pattern for apps that log to files and cannot be changed, and it only touches the pod spec, not the third-party app.",
    "conceptSummary": "File-based app logs on GKE need a streaming sidecar, not a node agent.",
    "correctRationale": "The app can't be modified and writes to a file inside its container filesystem. A node-level Fluentd DaemonSet only sees container stdout/stderr under /var/log/containers — it cannot read the in-container file. The documented pattern is a streaming sidecar that tails the file from a shared volume and writes it to stdout (D). Options A and C leave the file unreadable to the agent; B reads only what the node sees.",
    "optionRationales": [
      "Wrong: The default agent collects container stdout/stderr only — /var/log/app_messages.log inside the container never reaches it.",
      "Wrong: A Fluentd DaemonSet runs at node level and sees container stdout/stderr files, not files inside the container's filesystem.",
      "Wrong: Re-platforming to self-managed Kubernetes on Compute Engine does not solve the in-container file access problem and adds huge overhead.",
      "Correct: A sidecar tailing the file to stdout is the documented Kubernetes pattern for apps that log to files and cannot change."
    ],
    "legacyNote": "Stackdriver Kubernetes Engine Monitoring is now Cloud Operations for GKE, and GKE ships its own managed logging agent.",
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 3,
    "topic": "Incident Management",
    "difficulty": 1,
    "question": "Your organization wants to implement Site Reliability Engineering (SRE) culture and principles. Recently, a service that you support had a limited outage. A manager on another team asks you to provide a formal explanation of what happened so they can action remediations. What should you do?",
    "options": [
      "A. Develop a postmortem that includes the root causes, resolution, lessons learned, and a prioritized list of action items. Share it with the manager only.",
      "B. Develop a postmortem that includes the root causes, resolution, lessons learned, and a prioritized list of action items. Share it on the engineering organization's document portal.",
      "C. Develop a postmortem that includes the root causes, resolution, lessons learned, the list of people responsible, and a list of action items for each person. Share it with the manager only.",
      "D. Develop a postmortem that includes the root causes, resolution, lessons learned, the list of people responsible, and a list of action items for each person. Share it on the engineering organization's document portal."
    ],
    "correct": 1,
    "explanation": "A blameless postmortem shared broadly is the SRE-standard way to give a formal explanation and drive remediation.",
    "discussion": [
      {
        "user": "devopsbatch",
        "text": "B it could be based on this In order to maintain a healthy postmortem culture within an organization, it's important to share postmortems as widely as possible. (25 votes)"
      },
      {
        "user": "Charun",
        "text": "I have submitted B answer (6 votes)"
      },
      {
        "user": "amanp",
        "text": "B is correct. C and D is wrong as it is against the SRE policy of Blameless postmortem. A is wrong as these actions cannot be shared with just manager (3 votes)"
      },
      {
        "user": "Ananda",
        "text": "Selected Answer: B. Submitted B in the exam. I cleared the exam today (3 votes)"
      },
      {
        "user": "GCP72",
        "text": "Selected Answer: B. The answer is B (2 votes)"
      },
      {
        "user": "lakiluk",
        "text": "Selected Answer: B. Selected B (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 3,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "SRE postmortem: blameless, actionable, and shared with the organization.",
    "correctRationale": "SRE practice calls for a postmortem containing root causes, resolution, lessons learned, and prioritized action items. Postmortems are blameless (no naming of responsible individuals) and are shared broadly across the engineering organization so everyone can learn, not just the requesting manager.",
    "optionRationales": [
      "Wrong: The content is right, but sharing only with the manager wastes the organizational learning value of a postmortem.",
      "Correct: Blameless postmortem content (root cause, resolution, lessons, action items) shared on the engineering portal is exactly the SRE-recommended practice.",
      "Wrong: Postmortems are blameless; listing the people responsible violates that core principle.",
      "Wrong: Naming responsible individuals is contrary to blameless postmortem culture, even though the sharing scope is right."
    ]
  },
  {
    "id": 2,
    "topic": "Monitoring & Alerting",
    "difficulty": 2,
    "question": "You created a Stackdriver chart for CPU utilization in a dashboard within your workspace project. You want to share the chart with your Site Reliability Engineering (SRE) team only. You want to ensure you follow the principle of least privilege. What should you do?",
    "options": [
      "A. Share the workspace Project ID with the SRE team. Assign the SRE team the Monitoring Viewer IAM role in the workspace project.",
      "B. Share the workspace Project ID with the SRE team. Assign the SRE team the Dashboard Viewer IAM role in the workspace project.",
      "C. Click \"Share chart by URL\" and provide the URL to the SRE team. Assign the SRE team the Monitoring Viewer IAM role in the workspace project.",
      "D. Click \"Share chart by URL\" and provide the URL to the SRE team. Assign the SRE team the Dashboard Viewer IAM role in the workspace project."
    ],
    "correct": 2,
    "explanation": "Sharing a chart by URL plus the Monitoring Viewer role gives the SRE team access to the chart's metric data with least privilege.",
    "discussion": [
      {
        "user": "syslog",
        "text": "I think it's C, because dashboard viewer \"Read-only access to dashboard configurations.\" SRE team wants to view data, not configurations. (18 votes)"
      },
      {
        "user": "danchoif2",
        "text": "I did a test and see that: The valid roles are: Monitoring Viewer and Monitoring Dashboard Configuration Viewer. You can only share chart by URL using Metrics explorer. With only Monitoring Dashboard Configuration Viewer role, user cannot see anything in Monitoring page. I create a custom role from Monitoring Dashboard Configuration Viewer role and add resourcemanager.projects.get permission. Now user can see list of custom dashboards and the charts in these custom dashboards. User cannot see standard GCP dashboards. User cannot see the the chart in Metrics explorer (using the shared URL).... (12 votes)"
      },
      {
        "user": "Charun",
        "text": "I have submitted D answer (6 votes)"
      },
      {
        "user": "francisco_guerra",
        "text": "Ans: C this question is kind of weird because the role is: roles/monitoring.dashboardViewer \"Monitoring Dashboard Configuration Viewer\" but monitoring viewer its too much access so I tested in console https://cloud.google.com/iam/docs/understanding-roles with Dashboard Viewer I would´nt be allowed to see the chart URL with monitoring works fine Dashboard Viewer Provides read-only access to get and list information about all monitoring data and configurations. (5 votes)"
      },
      {
        "user": "akg001",
        "text": "Correct answer should be D (4 votes)"
      },
      {
        "user": "devopsbatch",
        "text": "yes right one seems to be D (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 2,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Community was split C 65% / D 17%: C is correct because Dashboard Viewer only exposes dashboard configuration, while Monitoring Viewer is needed to view the chart's metric data.",
    "conceptSummary": "Least-privilege sharing of a Cloud Monitoring chart.",
    "correctRationale": "Sharing the chart by URL is the simplest way to expose exactly one chart. The Monitoring Viewer role (roles/monitoring.viewer) is required to read the underlying metric data that the chart renders. Dashboard Viewer only exposes dashboard definitions, not the metric data.",
    "optionRationales": [
      "Wrong: Sharing the workspace (scoping) project ID alone does not make the chart reachable; nothing here actually shares the chart itself.",
      "Wrong: Sharing the project ID does not share the chart, and Monitoring Dashboard Configuration Viewer only exposes dashboard configuration, not metric data.",
      "Correct: The share-by-URL link exposes this one chart, and Monitoring Viewer is the least-privilege role that lets recipients read the chart's metric data.",
      "Wrong: The URL is right, but Dashboard Viewer (Monitoring Dashboard Configuration Viewer) only shows dashboard configs; it cannot read the metric data the chart displays."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 1,
    "topic": "Troubleshooting & APM",
    "difficulty": 1,
    "question": "You support a Node.js application running on Google Kubernetes Engine (GKE) in production. The application makes several HTTP requests to dependent applications. You want to anticipate which dependent applications might cause performance issues. What should you do?",
    "options": [
      "A. Instrument all applications with Stackdriver Profiler.",
      "B. Instrument all applications with Stackdriver Trace and review inter-service HTTP requests.",
      "C. Use Stackdriver Debugger to review the execution of logic within each application to instrument all applications.",
      "D. Modify the Node.js application to log HTTP request and response times to dependent applications. Use Stackdriver Logging to find dependent applications that are performing poorly."
    ],
    "correct": 1,
    "explanation": "Distributed tracing with Cloud Trace shows the latency of each inter-service HTTP call, which is exactly what you need to spot which dependency is hurting performance.",
    "discussion": [
      {
        "user": "Manh",
        "text": "Answer is B. The keyword is \"make several requests to dependent app\". So you need trace for it. Cloud Trace Find performance bottlenecks in production. Cloud Profiler Continuous CPU and heap profiling to improve performance and reduce costs. (11 votes)"
      },
      {
        "user": "Charun",
        "text": "I have submitted B answer (6 votes)"
      },
      {
        "user": "ralf_cc",
        "text": "B - you want to find out latency info for dependent apps, Trace is the tool (5 votes)"
      },
      {
        "user": "akg001",
        "text": "After carefully reading the question and study, answer A is very close. Performance and cost management Cloud Profiler provides continuous profiling of resource consumption in your production applications, helping you identify and eliminate potential performance issues. Latency management Cloud Trace provides latency sampling and reporting for App Engine, including per-URL statistics and latency distributions please refer below URL : https://cloud.google.com/products/operations#all-features (5 votes)"
      },
      {
        "user": "JonathanSJ",
        "text": "Selected Answer: B. B. Instrument all applications with Stackdriver Trace and review inter-service HTTP requests. Stackdriver Trace allows you to collect and analyze performance data for all the applications that make up your system, including the applications running on GKE. By instrumenting your application with Stackdriver Trace, you can see detailed performance information for each request, including the time spent in each component of your system, as well as any inter-service HTTP requests. This will allow you to identify which dependent applications might be causing performance issues,... (4 votes)"
      },
      {
        "user": "WakandaF",
        "text": "You need to define Service Level Objectives (SLOs) for a high-traffic multi-region web application. Customers expect the application to always be available and have fast response times. Customers are currently happy with the application performance and availability. Based on current measurement, you observe that the 90th percentile of latency is 120ms and the 95th percentile of latency is 275ms over a 28-day window. What latency SLO would you recommend to the team to publish? A. 90th percentile - 100ms 95th percentile - 250ms B. 90th percentile - 120ms 95th percentile - 275ms C. 90th... (4 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "professional-cloud-devops-engineer",
    "sourceQuestionNumber": 1,
    "isRecent": false,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Identifying latency-causing dependencies with distributed tracing.",
    "correctRationale": "The application makes several HTTP calls to dependent services, so per-request visibility into each downstream call is required. Cloud Trace (formerly Stackdriver Trace) instruments inter-service requests and shows where time is spent, pinpointing the dependency that causes performance issues. Profiler shows code-level resource usage, not per-request dependency latency.",
    "optionRationales": [
      "Wrong: Cloud Profiler (formerly Stackdriver Profiler) profiles CPU and memory usage of code inside one service; it does not map latency across dependent HTTP calls.",
      "Correct: Stackdriver Trace, now Cloud Trace, traces each request through the dependent applications and reveals which one is responsible for the slowdown.",
      "Wrong: Cloud Debugger was shut down in 2023, and even when it existed it inspected live code state rather than inter-service request latency.",
      "Wrong: Logging request and response times only shows per-service duration and forces manual correlation; tracing gives the dependency view directly."
    ],
    "legacyNote": "The options use the old Stackdriver names: Stackdriver Trace is now Cloud Trace, Stackdriver Profiler is Cloud Profiler, and Stackdriver Debugger was shut down in 2023."
  }
];
