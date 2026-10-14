export const QUESTIONS = [
  {
    "id": 107,
    "topic": "Mobile Devices",
    "difficulty": 2,
    "question": "Your organization wants to launch a bring-your-own-device (BYOD) program to allow users to access corporate data on their personal devices in a secure way. You need to ensure that if a user’s personal device is lost or stolen, an unauthorized user is unable to access corporate data, including data stored locally on the device. What should you do?",
    "options": [
      "A. Enable advanced mobile management for all users in your organization participating in the BYOD program.",
      "B. Allow only users who have devices with full device encryption to join the BYOD program.",
      "C. Deploy device certificates for all users participating in the BYOD program.",
      "D. Enable basic mobile management for users in your organization participating in the BYOD program, and require the users to complete an updated security training program."
    ],
    "correct": 0,
    "explanation": "Advanced mobile management can require device encryption and a strong passcode and lets admins remotely wipe the device or its work profile, so corporate data stored locally stays protected on a lost device.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 107,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Protecting locally stored corporate data on lost or stolen BYOD devices.",
    "correctRationale": "The key phrase is \"including data stored locally on the device\". Basic mobile management only offers a basic passcode and a remote account wipe, which never runs if the thief keeps the device offline. Advanced mobile management adds enforced device encryption, strong passcode requirements and remote wipe of the device (or of the Android work profile on a personal device), so local corporate data stays unreadable even before a wipe reaches the device. Compare questions 51 and 62, where only removing the work account is required and basic management is enough.",
    "optionRationales": [
      "Correct: Advanced management enforces encryption and strong passcodes and supports remote device or work-profile wipe, protecting locally stored corporate data on a lost device.",
      "Wrong: Admitting only encrypted devices is a one-time eligibility check; nothing enforces that encryption stays on, and it gives no way to wipe or block a lost device.",
      "Wrong: Device certificates authenticate devices to networks and apps; they do not protect or remove data already stored on a lost device.",
      "Wrong: Basic management only provides a basic passcode and remote account wipe, and security training does not technically protect local data on a stolen device."
    ]
  },
  {
    "id": 105,
    "topic": "Meet, Chat & Calendar",
    "difficulty": 2,
    "question": "Your company wants to improve the security of online meetings. You need to prevent unauthorized access to Google Meet meetings and protect sensitive information that is being shared during these meetings. What should you do?",
    "options": [
      "A. Enable and configure the Meet safety settings for the Google Workspace environment.",
      "B. Enable Meet Gemini settings for additional security.",
      "C. Use the Meet audit log to set up alerts when an external participant has joined a meeting.",
      "D. Instruct employees to only use the dial-in phone numbers."
    ],
    "correct": 0,
    "explanation": "Meet safety settings (access controls, host controls, in-meeting protections) are the admin-side configuration for secure meetings.",
    "discussion": [
      {
        "user": "Frank_2022",
        "text": "Selected Answer: A. Meet Safety Settings (also referred to as Host Controls or Safety Measures) are the primary defense against \"meeting bombing\" and data leaks during live sessions."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 105,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community chooses the safety settings.",
    "conceptSummary": "Hardening Google Meet against unauthorized access.",
    "correctRationale": "The Meet Admin console safety settings control who can join, present and access meetings — the built-in way to prevent unauthorized access and protect shared content.",
    "optionRationales": [
      "Correct: Meet safety settings are the purpose-built admin controls for meeting access and protection.",
      "Wrong: Gemini settings govern AI features, not meeting security.",
      "Wrong: Alerts on external joiners notify but don't prevent unauthorized access.",
      "Wrong: Dial-ins are an access channel, not a protection measure."
    ]
  },
  {
    "id": 104,
    "topic": "DLP & Classification",
    "difficulty": 3,
    "question": "Your organization has business operations worldwide in the Americas, Europe, and Asia Pacific regions. Your data compliance officer told you that it is preferable that the data is stored in a location within the region where the user resides. You need to configure the Data Regions feature in the Admin console. What should you do?",
    "options": [
      "A. Create groups for the three regions. Add the users to their respective group. Select ‘United States’ for the Americas group, ‘Europe’ for the Europe group, and ‘Asia Pacific’ for the Asia Pacific group.",
      "B. Select ‘United States’ for the Americas OU, ‘Europe’ for the Europe OU, and ‘No Preference’ for the Asia Pacific OU.",
      "C. Select ‘United States’ for the parent OU.",
      "D. Select ‘United States’ for the Americas OU, ‘Europe’ for the Europe OU, and ‘Asia Pacific’ for the Asia Pacific OU."
    ],
    "correct": 1,
    "explanation": "Data regions offer US and Europe; Americas→US, Europe→Europe, APAC→'No preference' since no APAC region exists.",
    "discussion": [
      {
        "user": "Frank_2022",
        "text": "Selected Answer: B. There is no \"Asia Pacific\" option in the Data Regions dropdown menu.\"No Preference\" is the Standard for APAC"
      },
      {
        "user": "gulfinfotech",
        "text": "Selected Answer: B. \"Asia Pacific\" is not an available selection in the Google Admin console dropdown menu. You cannot select a setting that does not exist."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 104,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community notes APAC isn't a real data-region option, so 'No preference' is the only valid choice there.",
    "conceptSummary": "Assigning data regions across Americas/Europe/APAC OUs.",
    "correctRationale": "Google's data region options are United States and Europe (plus no preference). The achievable mapping is US for the Americas OU and Europe for the Europe OU; no Asia Pacific region exists, so that OU correctly takes 'No preference'.",
    "optionRationales": [
      "Wrong: Region policies are set per OU, not via groups, and a single 'United States' choice can't serve three regions.",
      "Correct: US for Americas and Europe for Europe are real options; APAC must take 'No preference' because no APAC region is offered.",
      "Wrong: Setting the parent OU to US pushes all data to the US, violating the regional preference.",
      "Wrong: 'Asia Pacific' is not a selectable data region."
    ]
  },
  {
    "id": 103,
    "topic": "DLP & Classification",
    "difficulty": 2,
    "question": "You work for a global organization that has offices in the United States and the European Union (EU). There is an organizational unit (OU) for employees in the United States and a separate OU for employees in the EU. Your company regulations need you to ensure that your users' data is located in the same region as their physical office. What should you do?",
    "options": [
      "A. Set the OU data location to No preference.",
      "B. Turn on advanced settings and select Enable features that may process data across multiple regions.",
      "C. Turn on advanced settings and select Disable features that may process data across multiple regions.",
      "D. Set a data region policy for each region’s OU."
    ],
    "correct": 3,
    "explanation": "Setting a data region policy per OU keeps each office's data in its own region.",
    "discussion": [
      {
        "user": "zanhsieh",
        "text": "Selected Answer: D. A: No. Setting data location to \"No preference\" allows Google to store data in any region, which violates the regulation requiring regional data residency. B: No. Enabling features that process data across multiple regions explicitly allows data to move between regions, again violating compliance requirements. C: No. Disabling cross-region processing features helps limit movement but doesn't actually enforce region-specific storage. D: Yes. Setting a data region policy for each organizational unit (OU) ensures that user data for EU employees stays in EU data centers and..."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 103,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees on per-OU data region policies.",
    "conceptSummary": "Per-OU data residency matching office locations.",
    "correctRationale": "Data region policies can be assigned per OU; setting the US region on the US OU and Europe on the EU OU keeps each population's data in the corresponding region.",
    "optionRationales": [
      "Wrong: 'No preference' removes residency control entirely.",
      "Wrong: Cross-region processing features relate to feature processing, not the primary data residency guarantee.",
      "Wrong: Disabling cross-region features doesn't assign storage regions per OU.",
      "Correct: A data region policy per OU maps storage location to each office's region."
    ]
  },
  {
    "id": 102,
    "topic": "Domains & Resources",
    "difficulty": 3,
    "question": "Your organization has acquired another company that used another email provider. Employees from the newly acquired company need to be able to send and receive emails from two domain names-your organization’s domain name and their former company’s domain name. You need to identify the best approach. What should you do?",
    "options": [
      "A. Add the acquired company’s domain name as a Secondary Domain, and create user accounts with the new domain name.",
      "B. Add the acquired company's domain name as an alias domain.",
      "C. Change the MX records of the old domain to point to the new domain.",
      "D. Create a mail routing rule in the new domain to route messages addressed to the old domain."
    ],
    "correct": 1,
    "explanation": "An alias domain gives every user an automatic alias at the acquired company's domain — one mailbox, two addresses.",
    "discussion": [
      {
        "user": "zanhsieh",
        "text": "Selected Answer: B. A: No. Adding the domain as a Secondary Domain creates a separate set of users and mailboxes, meaning users would need two separate accounts — not ideal for unified email management. B: Yes. Adding the acquired company's domain as an Alias Domain allows existing users in your organization to send and receive emails using both domains seamlessly (e.g., and ), which is Google's recommended practice. C: No. Changing MX records alone just redirects incoming mail and doesn't allow users to send using both domain addresses. D: No. Mail routing rules can forward or redirect mai..."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 102,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community explains secondary domain would double accounts; alias domain is correct.",
    "conceptSummary": "Users sending/receiving at two domains on one mailbox.",
    "correctRationale": "Adding the acquired domain as a domain (user) alias automatically gives each user a matching alias address at that domain, so they send and receive under both names without extra accounts.",
    "optionRationales": [
      "Wrong: A secondary domain creates a second set of user accounts/mailboxes — users would manage two identities.",
      "Correct: The alias domain maps each user's second address onto their existing mailbox automatically.",
      "Wrong: MX changes alone don't create Workspace-side address handling.",
      "Wrong: Routing rules alone don't give users the second-domain identity for sending."
    ]
  },
  {
    "id": 101,
    "topic": "Admin Roles & App Access",
    "difficulty": 3,
    "question": "Your organization has detected a significant rise in unauthorized access to applications from personal devices. This poses a critical security risk and could lead to data loss. To mitigate this risk, you must immediately restrict user access to these applications. What should you do?",
    "options": [
      "A. Enable data loss prevention rules.",
      "B. Limit apps access to company-issued devices by using context-aware access.",
      "C. Configure apps data access to Limited to only allow access to unrestricted services.",
      "D. Enable multi-factor authentication for application access."
    ],
    "correct": 1,
    "explanation": "Context-aware access can limit app access to company-issued devices, blocking personal devices immediately.",
    "discussion": [
      {
        "user": "zanhsieh",
        "text": "Selected Answer: B. A: No. Data loss prevention (DLP) protects sensitive content but does not stop unauthorized devices from accessing apps. B: Yes. The most effective and Google-recommended solution is to enforce context-aware access so that apps can only be accessed from company-issued (compliant) devices. Context-aware access evaluates device attributes such as device policy compliance, IP, and identity to restrict unauthorized personal devices instantly without impacting approved ones. C: No. Limiting app access to \"unrestricted services\" does not enforce device-based restrictions and d..."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 101,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees context-aware device restriction is the fix.",
    "conceptSummary": "Restricting app access to company devices.",
    "correctRationale": "Context-aware access rules can require a company-owned device (via device attributes/access levels) for application access — directly denying personal-device access to the apps.",
    "optionRationales": [
      "Wrong: DLP protects content, not which device may sign in.",
      "Correct: Context-aware access levels scoped to company devices block personal-device access immediately.",
      "Wrong: 'Limited access' service settings change data-access granularity, not device restriction.",
      "Wrong: MFA strengthens sign-in but still permits access from personal devices."
    ]
  },
  {
    "id": 100,
    "topic": "Chrome & Endpoints",
    "difficulty": 1,
    "question": "Your organization wants to ensure that all employees who use Chrome browsers for work adhere to specific security and configuration settings. You need to manage and control the Chrome browsers used within the company while using the least expensive solution. What should you do?",
    "options": [
      "A. Remotely wipe all employee devices to ensure that they are using the latest Chrome browser version.",
      "B. Enroll the Chrome browsers in your organization's domain and apply Chrome browser policies.",
      "C. Use a third-party software deployment solution to manage the Chrome browser.",
      "D. Disable all extensions on employee Chrome browsers to prevent any potential security risks."
    ],
    "correct": 1,
    "explanation": "Chrome browser cloud management: enrolling the browsers applies org policies for security and configuration.",
    "discussion": [
      {
        "user": "zanhsieh",
        "text": "Selected Answer: B. A: No. Remotely wiping devices is extreme, expensive, and doesn't ensure ongoing browser policy enforcement. B: Yes. Enrolling Chrome browsers in your organization's domain allows centralized management through the Google Admin console, where you can enforce security and configuration policies (e.g., extensions, updates, passwords) — it's also the least expensive and Google-recommended approach. C: No. Third-party management tools add cost and complexity without tighter integration with Google Workspace. D: No. Disabling all extensions is overly restrictive and doesn't p..."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 100,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees on browser enrollment + policies.",
    "conceptSummary": "Enforcing security/config policy on work Chrome browsers.",
    "correctRationale": "Enrolling Chrome browsers into the organization's cloud management lets admins push Chrome browser policies (security, extensions, configuration) to all company browsers.",
    "optionRationales": [
      "Wrong: Remote wipe is destructive and unrelated to policy enforcement.",
      "Correct: Enrolling browsers and applying Chrome browser policies is the built-in management path.",
      "Wrong: Third-party deployment is unnecessary when browser cloud management exists.",
      "Wrong: Blanket-disabling extensions is one policy dimension, not general browser management."
    ]
  },
  {
    "id": 99,
    "topic": "Reports, Alerts & Investigation",
    "difficulty": 2,
    "question": "You recently noticed a suspicious trend in your organization's Google Drive usage. Several users have shared sensitive documents outside the organization, potentially violating your company's data security policy. You need to identify the responsible users and the extent of the unauthorized sharing. What should you do?",
    "options": [
      "A. Create an activity rule in the Security Center to alert you of future external sharing events.",
      "B. Use the security health page to identify misconfigured sharing settings in Drive.",
      "C. Review the organization's sharing policies in the Admin console, and update the policies to prevent external sharing.",
      "D. Use the security investigation tool to analyze Drive logs and identify the users."
    ],
    "correct": 3,
    "explanation": "The security investigation tool analyzes Drive log events to identify which users shared documents externally.",
    "discussion": [
      {
        "user": "zanhsieh",
        "text": "Selected Answer: D. A: No. Creating an activity rule alerts you about future sharing events but doesn't help you investigate the current incident. B: No. The security health page helps identify general misconfigurations, not user-level sharing activity or detailed audit data. C: No. Updating sharing policies helps prevent recurrence but doesn't identify who already shared documents. D: Yes. The Security Investigation Tool allows you to query Drive audit logs to see which users shared files externally, when, and with whom — making it the correct and Google-recommended way to investigate the..."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 99,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees on the investigation tool for attribution.",
    "conceptSummary": "Identifying users behind suspicious external sharing.",
    "correctRationale": "Drive audit events in the security investigation tool can be searched and filtered for external-sharing actions, directly identifying the responsible users for remediation.",
    "optionRationales": [
      "Wrong: Activity rules alert on future events; they do not identify past violators.",
      "Wrong: Security health reviews settings posture, not individual sharing events.",
      "Wrong: Changing policy is remediation, not identification of who already shared.",
      "Correct: The investigation tool's Drive log analysis identifies the users who shared externally."
    ]
  },
  {
    "id": 98,
    "topic": "Admin Roles & App Access",
    "difficulty": 2,
    "question": "A team of employees in your organization is collaborating on a project with an external organization. Employees of the external organization need access to project documents in your Google Workspace domain, however they don't currently have a Google account. You need to enable secure file sharing while preventing unauthorized access. What should you do?",
    "options": [
      "A. Enable external sharing for the organizational unit (OU) that is created for the external organization.",
      "B. Add the external organization's domain to the trusted domain allowlist.",
      "C. Create and assign user accounts to the external users of your Workspace domain.",
      "D. Enable visitor sharing for the organizational unit (OU) in your Workspace domain."
    ],
    "correct": 3,
    "explanation": "Visitor sharing lets external non-Workspace users collaborate on Drive documents with PIN verification, no Workspace account needed.",
    "discussion": [
      {
        "user": "zanhsieh",
        "text": "Selected Answer: D. A: No. Enabling external sharing for an OU allows sharing with any external users but doesn't help if those users don't have Google accounts. B: No. Adding the external domain to a trusted allowlist only works if the external users already have Google accounts in that domain. C: No. Creating accounts for external users in your domain adds administrative overhead and licensing costs, and it's not necessary for collaboration. D: Yes. Visitor sharing allows external collaborators without Google accounts to securely access shared files via PIN-based identity verification. Th..."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 98,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees visitor sharing is the designed feature.",
    "conceptSummary": "Collaborating with externals who have no Workspace accounts.",
    "correctRationale": "Visitor sharing (visitor sessions) allows external users without Google accounts to access shared Drive content using identity verification — purpose-built for this scenario.",
    "optionRationales": [
      "Wrong: Enabling external sharing alone still requires the visitors to authenticate into an account.",
      "Wrong: Trusted-domain allowlisting eases sharing between Workspace domains, not account-less visitors.",
      "Wrong: Issuing Workspace accounts to externals consumes licenses and admin overhead unnecessarily.",
      "Correct: Visitor sharing gives the external collaborators verified access without Workspace accounts."
    ]
  },
  {
    "id": 97,
    "topic": "Admin Roles & App Access",
    "difficulty": 2,
    "question": "Your company recently installed a free email marketing platform from the Google Workspace Marketplace. The marketing team is unable to access customer contact information or send emails through the platform. You need to identify the cause of the problem. What should you do first?",
    "options": [
      "A. Use the security investigation tool to review Gmail logs.",
      "B. Confirm that the \"Manage Third-Party App Access\" setting in the Admin console is enabled.",
      "C. Check the OAuth scopes that are granted to the email marketing platform and ensure the platform has access to Contacts and Gmail.",
      "D. Verify that the email marketing platform's subscription is active and up-to-date."
    ],
    "correct": 2,
    "explanation": "The installed app's granted OAuth scopes determine whether it can read contacts and send mail — verify and grant the scopes.",
    "discussion": [
      {
        "user": "zanhsieh",
        "text": "Selected Answer: C. Goal: Determine why a newly installed Workspace Marketplace email marketing app cannot access contacts or send emails. A: No. Reviewing Gmail logs with the Security Investigation Tool won't show whether the Marketplace app has the correct access scopes. B: No. \"Manage Third-Party App Access\" controls whether apps can connect at all, not what permissions they're actually using. C: Yes. The most likely cause is that the app lacks proper OAuth scopes for Contacts and Gmail. Checking and ensuring it has the correct API access (scopes) lets it read customer contact data and s..."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 97,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees OAuth scopes in app access control are the blocker.",
    "conceptSummary": "Fixing a Marketplace app that can't access data or send mail.",
    "correctRationale": "Marketplace apps access Workspace data through OAuth scopes. If the platform can't read contacts or send email, the fix is to verify the OAuth scopes granted in Admin console app access settings and ensure the needed ones are allowed.",
    "optionRationales": [
      "Wrong: Gmail logs show mail flow, not app authorization.",
      "Wrong: App access is already on — the app installed; the issue is scope authorization.",
      "Correct: Checking and granting the app's OAuth scopes in Manage Third-Party App Access fixes blocked capabilities.",
      "Wrong: The platform's subscription is outside your Workspace authorization controls."
    ]
  },
  {
    "id": 96,
    "topic": "Reports, Alerts & Investigation",
    "difficulty": 2,
    "question": "Your security team is concerned about disgruntled employees downloading large amounts of intellectual property. You need to create an automatic notification if any user downloads more than 500 files from Google Drive within a one-hour period. What should you do?",
    "options": [
      "A. Configure a Data Loss Prevention (DLP) rule for Drive.",
      "B. Use the alert center to review Drive audit logs for instances where users download a large number of files.",
      "C. Create an activity rule in the security investigation tool to monitor Drive download events. Set a threshold to trigger an alert.",
      "D. Set up an alert within Google Cloud Monitoring to track the number of Drive API calls and trigger a notification when a user makes an excessive number of download requests."
    ],
    "correct": 2,
    "explanation": "An activity rule on Drive download events with a threshold of more than 500 downloads in one hour creates the automatic notification.",
    "discussion": [
      {
        "user": "zanhsieh",
        "text": "Selected Answer: C. A: No. DLP rules in Drive detect sensitive content exposure, not excessive download activity. B: No. The Alert Center can show Drive-related alerts but cannot define custom thresholds or automatic notifications for specific download counts. C: Yes. The Security Investigation Tool in Google Workspace lets you create activity rules that monitor Drive download events. You can set conditions such as \">500 file downloads within 1 hour\" and automatically trigger alerts or emails to admins. D: No. Cloud Monitoring does not monitor Google Workspace (Drive) user-level activities...."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 96,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community picks the activity rule with a download threshold.",
    "conceptSummary": "Alerting on mass Drive downloads.",
    "correctRationale": "Activity rules in the security investigation tool evaluate events against thresholds; targeting Drive download events at more than 500 in one hour produces exactly the requested automatic notification.",
    "optionRationales": [
      "Wrong: Drive DLP acts on content rules, not a count of download events.",
      "Wrong: Manual review of audit logs is reactive, not an automatic notification.",
      "Correct: An activity rule on download events with a 500-per-hour threshold auto-notifies — built for this.",
      "Wrong: Cloud Monitoring tracks infrastructure metrics, not Workspace audit-event thresholds."
    ]
  },
  {
    "id": 95,
    "topic": "Vault & Retention",
    "difficulty": 2,
    "question": "The human resources department notified you of a legal investigation that was started for an employee in the finance department. You need to ensure that this employee's Google Drive data is preserved for at least one year and does not get deleted by the user or by other means. The Google Vault default retention rules for Drive are set for five years. What should you do?",
    "options": [
      "A. Create a hold in Vault for the employee's Drive.",
      "B. Place the employee into a separate organizational unit (OU). Create a custom one-year retention rule for this OU.",
      "C. Change the Vault default retention rule to one year instead of five.",
      "D. Confirm that the Vault default retention rule is set for five years."
    ],
    "correct": 0,
    "explanation": "A Vault hold preserves the employee's Drive data for the required year regardless of deletion or retention settings.",
    "discussion": [
      {
        "user": "zanhsieh",
        "text": "Selected Answer: A. A: Yes. The correct approach is to create a hold in Google Vault for the employee's Drive data. A hold overrides any existing retention rule and ensures the data is preserved indefinitely (or until the hold is removed), regardless of user deletion or default policies. B: No. Moving the user to a separate OU and setting a one-year rule would shorten retention, not preserve data beyond deletion attempts. C: No. Changing the default retention rule to one year affects everyone, not just this employee, and reduces protection. D: No. The existing five-year rule already applies..."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 95,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees a Vault hold is the legal-preservation mechanism.",
    "conceptSummary": "Preserving one employee's Drive for a legal investigation.",
    "correctRationale": "A hold in Vault targeted at the custodian's Drive preserves the data for the duration of the investigation — the direct legal-hold mechanism for a single employee.",
    "optionRationales": [
      "Correct: A Vault hold on the employee's Drive preserves exactly that data for the investigation period.",
      "Wrong: A one-year OU retention rule changes retention globally for the OU and doesn't guarantee legal-hold immutability the same way.",
      "Wrong: Lowering the default retention to one year would weaken, not ensure, preservation.",
      "Wrong: The default five-year rule alone doesn't create a legal hold scoped to the employee."
    ]
  },
  {
    "id": 85,
    "topic": "Reports, Alerts & Investigation",
    "difficulty": 1,
    "question": "Your organization is about to conduct its biannual risk assessment. You need to help identify security risks by quickly reviewing all security settings for Gmail, Drive, and Calendar. What should you do?",
    "options": [
      "A. In the reporting section of the Admin console, review the Gmail, Drive, and Calendar reports.",
      "B. In the alert center, review all of the alerts.",
      "C. In each individual organizational unit (OU), review the security settings.",
      "D. In the Google Admin console, review the security health page."
    ],
    "correct": 3,
    "explanation": "The security health page in the Admin console summarizes all Workspace security settings (Gmail, Drive, Calendar) with recommendations — purpose-built for risk review.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 85,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; number estimated from when the question first appeared on other sites (unknown date).",
    "discussionSummary": "Mirror consensus on the security health page.",
    "conceptSummary": "Quick review of all core-service security settings.",
    "correctRationale": "Security health provides a consolidated view of security-relevant settings across Gmail, Drive, Calendar and more, with risk indications — the fastest way to review posture for an assessment.",
    "optionRationales": [
      "Wrong: Usage reports show activity metrics, not security configuration review.",
      "Wrong: The alert center lists incidents, not a consolidated settings review.",
      "Wrong: Per-OU manual review is slow and misses the consolidated posture view.",
      "Correct: The security health page is the built-in consolidated security-settings review."
    ]
  },
  {
    "id": 84,
    "topic": "Gemini & AppSheet",
    "difficulty": 1,
    "question": "Your company is streamlining workflows by creating custom applications for tasks like filing expense reports or requesting time off. You need to identify a Google Workspace solution to develop these applications. Your development team has only basic coding knowledge. What should you do?",
    "options": [
      "A. Enable Gemini for Workspace. Direct users to use generative Al across Gmail and Drive to simplify the submission of expense reports.",
      "B. Direct employees to use Google Forms to collect data and create basic workflows.",
      "C. Enable AppSheet for your organization.",
      "D. Enable AppScript for your organization and allow employees to build add-ons to existing Workspace solutions."
    ],
    "correct": 2,
    "explanation": "AppSheet is Google's no-code app platform — ideal for simple workflow apps built by a team with only basic coding knowledge.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 84,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; number estimated from when the question first appeared on other sites (unknown date).",
    "discussionSummary": "Mirror consensus on AppSheet.",
    "conceptSummary": "No-code workflow apps for expense reports / time off.",
    "correctRationale": "AppSheet builds custom business apps (approvals, requests, workflows) on Workspace data without real coding — the right tool for a team with only basic coding knowledge.",
    "optionRationales": [
      "Wrong: Gemini generative AI writes text; it does not produce workflow applications.",
      "Wrong: Forms collects submissions but is not an application platform for workflows.",
      "Correct: AppSheet is the no-code Workspace app platform — exactly this use case.",
      "Wrong: Apps Script add-ons require real scripting, exceeding 'basic coding knowledge'."
    ]
  },
  {
    "id": 83,
    "topic": "Reports, Alerts & Investigation",
    "difficulty": 2,
    "question": "An employee at your organization may be sharing confidential documents with unauthorized external parties. You must quickly determine if any sensitive information has been leaked. What should you do?",
    "options": [
      "A. Review the employee's Drive log events in the security investigation tool.",
      "B. Audit Drive access by using the Admin SDK Reports API.",
      "C. Review the employee's user log events within the security investigation tool.",
      "D. Create a custom report of the user's external sharing by using the security dashboard."
    ],
    "correct": 0,
    "explanation": "Drive log events in the security investigation tool show what the employee shared externally — the quickest leak check.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 83,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; number estimated from when the question first appeared on other sites (unknown date).",
    "discussionSummary": "Mirror consensus on Drive log events.",
    "conceptSummary": "Checking whether an employee leaked files via Drive.",
    "correctRationale": "The security investigation tool's Drive log events enumerate sharing, download and permission-change actions by the employee, immediately revealing whether sensitive files were shared externally.",
    "optionRationales": [
      "Correct: Drive log events in the investigation tool give the direct, quick view of the employee's external sharing.",
      "Wrong: The Reports API requires custom integration work — not the fastest path.",
      "Wrong: User log events cover sign-in/identity events, not Drive sharing actions.",
      "Wrong: The security dashboard shows posture summaries, not an individual's sharing events."
    ]
  },
  {
    "id": 82,
    "topic": "Mail Flow & Troubleshooting",
    "difficulty": 3,
    "question": "A user is experiencing intermittent issues accessing their Gmail inbox. Sometimes their Gmail loads slowly, and other times the user encounters error messages that haven't been documented. You need to effectively troubleshoot this recurring problem. What should you do?",
    "options": [
      "A. Check the Google Workspace Status Dashboard for any reported service disruptions.",
      "B. Instruct the user to generate a HAR file the next time they experience slowness or an error.",
      "C. Instruct the user to try to access Gmail from another device or network to see if the issue persists.",
      "D. Instruct the user to clear their browser cache and cookies."
    ],
    "correct": 1,
    "explanation": "A HAR file captures the browser's network activity during the intermittent failures — the evidence support and engineering need to diagnose undocumented errors.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 82,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; number estimated from when the question first appeared on other sites (unknown date).",
    "discussionSummary": "Mirror answer B matches Google's HAR-based troubleshooting path.",
    "conceptSummary": "Troubleshooting intermittent, undocumented Gmail errors.",
    "correctRationale": "For intermittent slowness plus undocumented errors, Google support troubleshooting asks for a HAR file captured during the failure: it records requests, timings and error responses, enabling root-cause analysis of a transient problem.",
    "optionRationales": [
      "Wrong: The Status Dashboard covers service-wide outages, not a single user's intermittent errors.",
      "Correct: Capturing a HAR during the failure gives the diagnostic data needed for undocumented errors.",
      "Wrong: Trying another device isolates scope but produces no diagnostic data for the recurring failure.",
      "Wrong: Clearing cache is a guess-and-check fix, not effective troubleshooting of a recurring issue."
    ]
  },
  {
    "id": 81,
    "topic": "Admin Roles & App Access",
    "difficulty": 2,
    "question": "You are configuring data governance policies for your organization's Google Drive. You need to ensure that employees in the Research and Development department can share files with external users, while employees in the Finance department are blocked from sharing any files externally. What should you do?",
    "options": [
      "A. Create a Drive trust rule that allows external sharing for the Research and Development organizational unit (OU) and another rule that blocks external sharing for the Finance OU.",
      "B. Enable Vault for the Finance organizational unit (OU) to ensure that all files shared externally are retained and auditable.",
      "C. Apply an organization-wide data loss prevention (DLP) rule that scans for sensitive information and prevents external sharing of those files. Apply that rule to the Finance organizational unit (OU).",
      "D. Create a separate Google Workspace domain for the Finance organizational unit (OU) and disable external sharing for that domain."
    ],
    "correct": 0,
    "explanation": "Drive trust rules apply sharing allow/block per OU — allow external for R&D, block external for Finance.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 81,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; number estimated from when the question first appeared on other sites (May 2026).",
    "discussionSummary": "Mirror consensus on trust rules.",
    "conceptSummary": "Per-OU external sharing policy via trust rules.",
    "correctRationale": "Drive trust rules scope sharing permissions to organizational units: one rule allowing external sharing for the R&D OU and another blocking it for the Finance OU implements the split policy directly.",
    "optionRationales": [
      "Correct: Trust rules are the granular, OU-scoped control for external Drive sharing.",
      "Wrong: Vault preserves data for audit; it does not prevent sharing.",
      "Wrong: A content-driven DLP rule blocks only files with sensitive content, not all external sharing for Finance.",
      "Wrong: A separate domain is a heavy, unnecessary workaround for an OU-level policy."
    ]
  },
  {
    "id": 80,
    "topic": "Reports, Alerts & Investigation",
    "difficulty": 1,
    "question": "Your organization is increasingly concerned about its environmental impact. You want to assess the environmental impact of using Google Workspace services. Which report should you use?",
    "options": [
      "A. Accounts report",
      "B. Google Environmental Report",
      "C. Carbon footprint report",
      "D. Apps Monthly Uptime report"
    ],
    "correct": 2,
    "explanation": "The Carbon footprint report in the Admin console reports the environmental impact of Workspace usage.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 80,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; number estimated from when the question first appeared on other sites (Dec 2025).",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "The mirror chose the marketing 'Google Environmental Report'; the in-console Carbon footprint report is the actual admin report. An independent Gemini review also picked C.",
    "conceptSummary": "Measuring Workspace's environmental impact.",
    "correctRationale": "Google Workspace has a built-in carbon footprint report: in the Admin console, go to Reporting > Carbon footprint (requires the Reports administrator privilege). It estimates the emissions from your organization's use of Gmail, Drive, Docs, Meet, Chat, Calendar and Admin services, month by month, which is exactly the assessment the question asks for (support.google.com/a/answer/13761003).",
    "optionRationales": [
      "Wrong: The Accounts report lists account status and licensing, not environmental data.",
      "Wrong: Google publishes corporate environmental reports, but the per-organization Workspace usage view is the Carbon footprint report.",
      "Correct: The Carbon footprint report quantifies the org's Workspace-related emissions.",
      "Wrong: The Apps Monthly Uptime report tracks service reliability, unrelated to environment."
    ]
  },
  {
    "id": 79,
    "topic": "DLP & Classification",
    "difficulty": 2,
    "question": "Your organization handles a significant amount of sensitive customer data and must follow strict industry regulations. To meet an upcoming compliance deadline, you need to quickly implement a solution that automatically classifies files stored in Google Drive based on the content of files.\nWhat should you do?",
    "options": [
      "A. Add users into organizational units (OUs). Configure default file classification in Drive for the desired OUs.",
      "B. Implement a third-party data governance tool that integrates with Drive and provides advanced classification capabilities.",
      "C. Apply Drive labels based on content. Use Google Vault to create retention rules based on Drive labels, ensuring that data is kept for the required duration.",
      "D. Create data loss prevention (DLP) rules for Drive. Configure the rules to apply Drive labels based on content."
    ],
    "correct": 3,
    "explanation": "Drive DLP rules can automatically apply Drive labels based on detected content — the built-in auto-classification path.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 79,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; number estimated from when the question first appeared on other sites (Dec 2025).",
    "discussionSummary": "Mirror answer D matches the DLP-to-label auto-classification feature.",
    "conceptSummary": "Auto-classifying Drive files by content via DLP rules.",
    "correctRationale": "Google Drive DLP supports rules whose condition is file content (detectors) and whose action applies Drive labels — automated content-based classification with no third-party tool and no manual labeling.",
    "optionRationales": [
      "Wrong: There is no per-OU 'default file classification' setting; classification needs content rules.",
      "Wrong: A third-party governance tool adds cost and delay when the capability is built in.",
      "Wrong: Content-based Drive labels can't be applied manually for auto-classification; Vault retention is a downstream use, not the classifier.",
      "Correct: A Drive DLP rule with content detectors + apply-label action performs automated classification natively."
    ]
  },
  {
    "id": 78,
    "topic": "Drive & Docs",
    "difficulty": 3,
    "question": "Your company's sales team writes many business proposals in Google Docs. They want to streamline the proposal process by using templates. You need to create a document template with pre-populated sections that the sales team can access. What should you do?",
    "options": [
      "A. Create the templates in Google Drive and download the files as PDFs. Upload PDF files to a drive shared with your sales team.",
      "B. Enable organization branding in the Admin console. Create the templates in Google Drive. Add the templates to default themes and templates for the entire organization.",
      "C. Create the templates in Google Drive. Make a copy for each sales representative. Transfer ownership of each template to the sales representatives.",
      "D. Create the templates in Google Drive. Grant edit access to the sales team."
    ],
    "correct": 1,
    "explanation": "Workspace's Docs template gallery lets an org publish shared templates users pick from a 'from template' flow.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 78,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; number estimated from when the question first appeared on other sites (Dec 2025).",
    "discussionSummary": "Mirror answer B matches Google's org-template-gallery feature.",
    "conceptSummary": "Publishing org-wide Docs templates for the sales team.",
    "correctRationale": "Google Workspace supports a custom template gallery: admins enable it and curated templates become available to the organization. Creating the templates in Drive and adding them to the org's template gallery gives the sales team shared, pre-populated proposal docs.",
    "optionRationales": [
      "Wrong: PDFs are static exports — sales reps couldn't edit them as living proposals.",
      "Correct: The org template gallery (enabled via the Admin console templates setting) shares pre-populated templates to everyone — the documented approach.",
      "Wrong: Making a copy per rep creates disconnected duplicates that can't be updated centrally.",
      "Wrong: Sharing edit access on one doc risks the master template being modified or corrupted."
    ]
  },
  {
    "id": 77,
    "topic": "Mail Flow & Troubleshooting",
    "difficulty": 3,
    "question": "Your company has recently migrated from an on-premises email solution to Google Workspace. You have successfully added and verified the new primary domain. However, you also want to continue receiving emails sent to your former on-premises email server for a transitional period. You need to ensure that emails sent to your former domain are still delivered to your on-premises server, even though your primary email system is now Google Workspace. What should you do?",
    "options": [
      "A. Add the former domain as a domain alias for the primary domain.",
      "B. Adjust the TTL (Time-to-Live) for the former domain to ensure a smooth transition.",
      "C. Configure MX records for the former domain to point to your on-premises email servers.",
      "D. Add the former domain as a secondary domain in your Google Workspace settings and verify the domain."
    ],
    "correct": 2,
    "explanation": "Keeping the former domain's MX records pointed at the on-prem server keeps delivering its mail there during the transition — nothing else is needed.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 77,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; number estimated from when the question first appeared on other sites (Dec 2025).",
    "discussionSummary": "Mirror answer C aligns with standard split-delivery/migration docs.",
    "conceptSummary": "Coexistence: old domain mail keeps flowing to on-prem while primary runs on Workspace.",
    "correctRationale": "MX records decide where a domain's mail is delivered. Leaving the former domain's MX pointed at the on-premises servers preserves delivery there; Workspace only claims domains you add and verify, so no Workspace-side change is required for this requirement.",
    "optionRationales": [
      "Wrong: Adding it as a domain alias would route its mail to Workspace mailboxes — the opposite of continuing on-prem delivery.",
      "Wrong: TTL affects propagation timing of a DNS change, not the delivery destination.",
      "Correct: Pointing the former domain's MX at the on-prem servers keeps mail going there — exactly the transitional need.",
      "Wrong: Adding it as a secondary domain and verifying would move delivery toward Workspace."
    ]
  },
  {
    "id": 76,
    "topic": "Domains & Resources",
    "difficulty": 3,
    "question": "Your company has offices in several different countries and is deploying Google Workspace. You're setting up Google Calendar and need to ensure that, when a user is creating a Google Calendar event, rooms are suggested in a nearby office. What should you do?",
    "options": [
      "A. Add your users to organizational units (OUs) by location. Add room resources to the corresponding OUs.",
      "B. Restrict room sharing to a dynamic group based on user location.",
      "C. Assign building ID, floor name, and floor section to define users' work locations based on defined buildings and rooms.",
      "D. Add your users to Google Groups by location. Add room resources to the corresponding groups."
    ],
    "correct": 2,
    "explanation": "Calendar suggests rooms near participants based on each user's assigned work location, which admins define through buildings/floors in structured resources.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 76,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; number estimated from when the question first appeared on other sites (Dec 2025).",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "The mirror suggests OU-based assignment, but Google's room-suggestion docs key off buildings and user work locations. An independent Gemini review also picked C: room suggestions use buildings plus each user's work location.",
    "conceptSummary": "Location-aware room suggestions in Calendar.",
    "correctRationale": "Google's room-suggestion feature relies on structured resources: defining buildings (building ID, floor, floor section) and assigning users' work locations lets Calendar suggest rooms in the user's own office when creating an event.",
    "optionRationales": [
      "Wrong: OUs organize users and resources for admin settings; they do not drive Calendar's 'nearby room' suggestions.",
      "Wrong: Dynamic-group restrictions govern sharing, not room suggestion proximity.",
      "Correct: Defining buildings and user work locations is what makes Calendar suggest nearby rooms — the documented mechanism.",
      "Wrong: Groups add members to resources for sharing; suggestions aren't group-based."
    ]
  },
  {
    "id": 75,
    "topic": "Mail Flow & Troubleshooting",
    "difficulty": 1,
    "question": "You work for a multinational organization. Employees in several office buildings are experiencing issues with Google Voice, including dropped calls and poor call quality. You need to quickly determine whether this is a localized issue or a broader Google Voice service disruption. What should you do?",
    "options": [
      "A. Check the Google Workspace Updates blog for announcements about Google Voice issues.",
      "B. Use the security investigation tool to search user log events for \"Call failed\", and analyze packet loss data.",
      "C. Check the Google Workspace Status Dashboard for reported service outages or disruptions.",
      "D. Verify whether users in the affected buildings have been assigned Google Voice licenses."
    ],
    "correct": 2,
    "explanation": "The Workspace Status Dashboard shows whether Voice is experiencing a service disruption — the fastest way to distinguish local from global issues.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 75,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; number estimated from when the question first appeared on other sites (Dec 2025).",
    "discussionSummary": "Mirror answer is the Status Dashboard.",
    "conceptSummary": "First check when users report a Voice service problem.",
    "correctRationale": "Google's documented first step for a suspected service problem is the Workspace Status Dashboard: if Google Voice shows a disruption, it's the service; if it's green, the issue is local to those offices. That directly answers localized-vs-broader.",
    "optionRationales": [
      "Wrong: The Updates blog announces features and incidents after the fact; it is not the real-time status surface.",
      "Wrong: Log-event searches are a deep dive, not the quick first determination the question asks for.",
      "Correct: The Status Dashboard immediately shows whether Google Voice has a reported outage — the fastest localized-vs-broad check.",
      "Wrong: License checks explain missing functionality for users, not dropped calls on a working service."
    ]
  },
  {
    "id": 74,
    "topic": "Gemini & AppSheet",
    "difficulty": 2,
    "question": "A department at your company wants access to the latest AI-powered features in Google Workspace. You know that Gemini offers advanced capabilities and you need to provide the department with immediate access to Gemini's features while retaining control over its deployment to ensure that corporate data is not available for human review. What should you do?",
    "options": [
      "A. Monitor Gemini adoption through the administrator console and wait for wider user adoption before assigning licenses.",
      "B. Enable Gemini for the department's organizational unit and assign Gemini licenses to users in the department.",
      "C. Enable Alpha features for the organization and assign Gemini licenses to all users.",
      "D. Enable Gemini for non-licensed users in that department so they have immediate access to the free service."
    ],
    "correct": 1,
    "explanation": "Gemini for Workspace is enabled per OU and licensed per user; scoping both to the department gives immediate access with admin control, and Workspace-side Gemini never exposes corporate data for human review.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 74,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Not found on ExamTopics' public pages; number estimated from when the question first appeared on other sites (Dec 2025).",
    "discussionSummary": "Mirror consensus on OU-scoped enablement + license assignment.",
    "conceptSummary": "Scoped Gemini enablement for one department with data-privacy guarantees.",
    "correctRationale": "Google's documented rollout path is to turn Gemini on for a specific OU and assign Gemini licenses to those users. This gives immediate access, keeps deployment admin-controlled, and Google's Workspace Gemini commitments mean prompts/content are not human-reviewed.",
    "optionRationales": [
      "Wrong: Monitoring adoption first delays the department's immediate access and does nothing to grant it.",
      "Correct: Enabling Gemini on the department's OU plus assigning licenses is the documented scoped rollout that keeps deployment controlled and data private.",
      "Wrong: Alpha features and org-wide licensing exceed the requested scope and control.",
      "Wrong: 'Gemini for non-licensed users' refers to the consumer app, which lacks the Workspace data protections the requirement calls for."
    ]
  },
  {
    "id": 73,
    "topic": "DLP & Classification",
    "difficulty": 2,
    "question": "Per regulatory requirements, your company is required to keep the data of employees located in Germany within Europe and the data of employees located in the US within the US. The employees in Germany are in a separate organizational unit (OU) than employees in the US. You need to ensure that where employee data is stored is in compliance with the location regulations.\nWhat should you do?",
    "options": [
      "A. Instruct employees to use Drive for desktop to keep documents on their corporate computers.",
      "B. Create two Groups. Assign employees into the Germany or US Group based on their location. Use Google Drive trust rules to prevent sharing between the Groups.",
      "C. Navigate to the Data Regions function in the Admin console. Select the Europe region for employees in Germany, and select the US region for US employees.",
      "D. Navigate to the Data Regions function in the Admin console. Select “No preference.”"
    ],
    "correct": 2,
    "explanation": "Data Regions assigns storage locations per OU — Europe for the Germany OU, US for the US OU.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: C. C is the obvious choice as none of the other options address the Issue."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 73,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees on per-OU Data Regions.",
    "conceptSummary": "Per-OU data residency for Germany vs US employees.",
    "correctRationale": "The Data Regions feature lets admins choose a storage region per OU. Selecting Europe for the Germany OU and US for the US OU keeps each population's covered data in the required jurisdiction.",
    "optionRationales": [
      "Wrong: Drive for desktop stores copies on devices, unrelated to cloud data-residency guarantees.",
      "Wrong: Trust rules govern sharing, not the physical storage region of data.",
      "Correct: Data Regions with per-OU region selection enforces the residency requirements.",
      "Wrong: 'No preference' declines any residency control — the opposite of compliance."
    ]
  },
  {
    "id": 71,
    "topic": "Admin Roles & App Access",
    "difficulty": 3,
    "question": "You’ve noticed an increase in phishing emails that contain links to malicious files hosted on external Google Drives. These files often mimic legitimate documents and trick users into granting access to their accounts. You need to prevent users from accessing these malicious external Drive files, but allow them to access legitimate external files. What should you do? (Choose two.)",
    "options": [
      "A. Enforce stricter password policies.",
      "B. Conduct regular security awareness training to educate users.",
      "C. Create a Drive trust rule that blocks all external domains except for a pre-approved list of trusted partners.",
      "D. Deploy advanced malware detection software on all user devices to scan and block malicious files.",
      "E. Implement two-factor authentication for all users."
    ],
    "correct": [
      1,
      2
    ],
    "explanation": "User awareness training reduces phishing success, and a Drive trust rule limiting external domains cuts off the malicious-file vector.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: BC. B and C. Security training is always important and a pre-approved list of trusted domains is a nice safeguard."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 71,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Voters converge on the training + trust-rule pair.",
    "conceptSummary": "Two-pronged defense against external-Drive phishing (Choose two).",
    "correctRationale": "The attack relies on (a) users granting access and (b) external Drive content. Training addresses the human vector, while a trust rule allowing only approved external domains removes the hostile-file vector — the two controls matching the scenario.",
    "optionRationales": [
      "Wrong: Password policy does not address OAuth-consent-style or Drive-sharing phishing.",
      "Correct: Security awareness training directly reduces users granting access to the malicious files.",
      "Correct: A trust rule allowlisting trusted domains blocks the external-Drive delivery vector itself.",
      "Wrong: Endpoint malware scanning doesn't stop web-hosted Drive docs or consent phishing.",
      "Wrong: 2FA protects credentials but the attack path is granted access, not password theft."
    ]
  },
  {
    "id": 70,
    "topic": "Mail Flow & Troubleshooting",
    "difficulty": 1,
    "question": "Your company wants to start using Google Workspace for email. Your domain is verified through a third-party provider. You need to route the email to Google Workspace. What should you do?",
    "options": [
      "A. Change your domain’s A record to point to Google’s mail servers.",
      "B. Configure a forwarding rule in your current email system to redirect all messages to Gmail.",
      "C. Update your domain’s MX records to the Google Workspace MX records provided in the setup instructions.",
      "D. Create a CNAME record that maps your domain to “gmail.com.”"
    ],
    "correct": 2,
    "explanation": "Pointing the domain's MX records at Google's servers routes inbound mail to Workspace.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: C. Answer C: you update your MX records"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 70,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees on MX records.",
    "conceptSummary": "Switching mail delivery to Workspace via MX records.",
    "correctRationale": "With the domain verified, the only remaining step for inbound delivery is updating MX records to the Workspace values shown in setup — the documented go-live step.",
    "optionRationales": [
      "Wrong: A records map hostnames to IPs for web traffic, not mail routing.",
      "Wrong: Forwarding rules keep the old provider in the path; proper migration changes MX.",
      "Correct: Updating MX records to Google's servers is the documented way to route the domain's email to Workspace.",
      "Wrong: gmail.com is not a CNAME target for a custom domain."
    ]
  },
  {
    "id": 69,
    "topic": "Meet, Chat & Calendar",
    "difficulty": 2,
    "question": "You are configuring Google Chat for your organization. Using the Adin console, you want to enable employees to view their chat history by default and allow employees to turn off chat history. What should you do?",
    "options": [
      "A. Configure Google Vault to retain all Chat messages, and exclude organizational units (OUs) with users who want to turn Chat history off.",
      "B. Set the space history setting to OFF and chat history to ON.",
      "C. Set the top-level default conversation history setting to ON and allow users to change their history setting.",
      "D. Set the top-level default conversation history settings to OFF and allow users in each organizational unit (OU) to change their history setting."
    ],
    "correct": 2,
    "explanation": "Set the top-level default conversation history ON while allowing users to turn it off — matches both requirements.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: C. The answer is C, set it on at top level and allow users to turn it off"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 69,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees on default ON plus user override.",
    "conceptSummary": "Default-on but user-changeable Chat history.",
    "correctRationale": "Chat history is controlled per OU with a default plus a user-override option: default ON with 'allow users to change' gives history by default and lets employees switch it off.",
    "optionRationales": [
      "Wrong: Vault retention governs compliance storage, not the user's in-app history view.",
      "Wrong: Turning space history OFF contradicts the default-on requirement.",
      "Correct: Top-level default history ON with the user-change option enabled implements exactly the stated behavior.",
      "Wrong: Defaulting OFF means employees start without history — the opposite of the default requirement."
    ]
  },
  {
    "id": 68,
    "topic": "Mobile Devices",
    "difficulty": 2,
    "question": "You are onboarding a new employee who will use a company-provided Android device. Your company requires the ability to enforce strong security policies on mobile devices, including password complexity requirements and remote device wipe capabilities. You need to choose the appropriate Google Workspace mobile device management solution. What should you do?",
    "options": [
      "A. Use a third-party mobile device management (MDM) solution to manage the device.",
      "B. Allow the employee to use their personal device without enrolling it in any mobile device management (MDM) solution.",
      "C. Implement Google’s basic management solution for the mobile device.",
      "D. Implement Google’s advanced management solution for the mobile device."
    ],
    "correct": 3,
    "explanation": "Advanced management on a company-provided device gives full policy enforcement including passcode complexity and remote wipe.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: D. Answer D: for device wipe, we require the advanced management"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 68,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees advanced management fits company-owned devices.",
    "conceptSummary": "Full policy enforcement on a company-owned Android device.",
    "correctRationale": "Company-provided devices warrant advanced mobile management — it enforces strong password requirements and remote device wipe, capabilities basic management lacks.",
    "optionRationales": [
      "Wrong: Third-party MDM duplicates Google's built-in capability at extra cost.",
      "Wrong: The device is company-provided; not enrolling it leaves corporate data unmanaged.",
      "Wrong: Basic management cannot enforce device passwords or full remote wipe.",
      "Correct: Advanced management delivers required policy enforcement on the company device."
    ]
  },
  {
    "id": 67,
    "topic": "DLP & Classification",
    "difficulty": 3,
    "question": "Your company operates several primary care clinics where employees routinely work with protected health information (PHI). You are in the process of transitioning the organization to Google Workspace from a legacy communication and collaboration system. After you sign the Business Associate Agreement (BAA), you need to ensure that data is handled in compliance with regulations when using Google Workspace. What should you do?",
    "options": [
      "A. Implement a third-party backup service that is also compliant with Google Workspace core services.",
      "B. Create a label for Google Drive content to help employees identify sensitive data.",
      "C. Instruct the staff to not store any PHI in Google Workspace core services, including Google Drive, Docs, Sheets, and Keep.",
      "D. Disable integrations with third-party apps and turn off non-core Google services."
    ],
    "correct": 3,
    "explanation": "Reducing the compliance surface — disabling third-party app integrations and non-core services — aligns a PHI environment with covered core services.",
    "discussion": [
      {
        "user": "schamorroa",
        "text": "Selected Answer: D. Once your organization has signed the Business Associate Agreement (BAA) with Google, only Google Workspace core services (like Gmail, Drive, Docs, Sheets, etc.) are covered under HIPAA compliance. To remain compliant, you must: Disable non-core services (like YouTube or Blogger) that aren't covered by the BAA. Block third-party apps unless they also enter into a BAA with your organization and meet HIPAA requirements. This ensures PHI is only stored and processed in services governed by the BAA. (5 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 67,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community leans toward restricting integrations/services for a PHI environment.",
    "conceptSummary": "Minimizing PHI exposure in the Workspace transition.",
    "correctRationale": "For regulated health data, limiting the environment to covered core services and blocking third-party integrations reduces where PHI can flow — a defensible compliance posture during the transition.",
    "optionRationales": [
      "Wrong: A third-party backup adds another processor for PHI without addressing the service scope.",
      "Wrong: Labels help identification but don't by themselves control where PHI can go.",
      "Wrong: Banning PHI storage is impractical for clinics that must collaborate on it.",
      "Correct: Disabling third-party integrations and non-core services minimizes the PHI data surface."
    ]
  },
  {
    "id": 66,
    "topic": "Authentication & SSO",
    "difficulty": 2,
    "question": "Your organization has experienced a recent increase in unauthorized access attempts to your company’s Google Workspace instance. You need to enhance the security of user accounts while following Google-recommended practices. What should you do?",
    "options": [
      "A. Disable password recovery options to prevent unauthorized individuals from accessing user accounts.",
      "B. Implement a strong password policy and enable text messages as the 2-Step Verification (2SV) using text messages.",
      "C. Enforce the use of physical security keys as the 2-Step Verification (2SV) method for all users.",
      "D. Enforce a strong password policy that requires users to include special characters, numbers, and uppercase letters."
    ],
    "correct": 2,
    "explanation": "Security keys are the phishing-resistant, Google-recommended 2SV method — enforcing them raises account security most.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: C. Physical security keys are more secure than text messages"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 66,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community picks security keys as the Google-recommended 2SV.",
    "conceptSummary": "Google-recommended strongest account protection.",
    "correctRationale": "Google's recommended strongest 2-Step Verification is physical security keys (FIDO2). Enforcing security-key 2SV is phishing-resistant and the documented best practice for elevated account security.",
    "optionRationales": [
      "Wrong: Disabling password recovery can lock out users and isn't Google's primary recommendation.",
      "Wrong: SMS 2SV is vulnerable to SIM-swap/phishing — Google recommends stronger methods.",
      "Correct: Enforcing security keys gives phishing-resistant 2SV — Google's recommended practice.",
      "Wrong: A strong password policy alone leaves accounts phishable; the question asks for enhanced security per Google's recommendation."
    ]
  },
  {
    "id": 64,
    "topic": "Gemini & AppSheet",
    "difficulty": 1,
    "question": "You need to create an automated application or process that includes connectors to external data, leverages Google Sheets data, and is easily shared as a mobile application. What should you do?",
    "options": [
      "A. Create an application by using App Engine. Connect the application to your Workspace environment",
      "B. Copy the external data to BigQuery. Use a Connected Sheet to interact with the data.",
      "C. Create an AppSheet application to connect the different data sources. Set up the mobile application.",
      "D. Create an automation process by using Apps Script. Run the process through Google Sheets."
    ],
    "correct": 2,
    "explanation": "AppSheet connects multiple data sources (including Sheets and external connectors) and ships the result as a shareable mobile app.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: C. AppSheet is best suited for that"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 64,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community unanimously chooses AppSheet.",
    "conceptSummary": "Connected Sheets+external data mobile app with no code.",
    "correctRationale": "AppSheet natively supports connectors to external data sources and Google Sheets, and its apps are shareable mobile applications — matching all three requirements with zero coding.",
    "optionRationales": [
      "Wrong: App Engine requires developers and infrastructure work — not the no-code fit.",
      "Wrong: Connected Sheets expose BigQuery data for analysis, not a shareable mobile app.",
      "Correct: AppSheet delivers the connectors, Sheets data and mobile application in one no-code platform.",
      "Wrong: Apps Script automation runs in Workspace; it doesn't produce a mobile app or connectors."
    ]
  },
  {
    "id": 63,
    "topic": "Users & Licensing",
    "difficulty": 2,
    "question": "An employee is leaving your company and has numerous files stored in My Drive. Their manager wants to retain access to these files. You need to offboard the departing employee’s Google Workspace account while ensuring that the manager can still access the files while following Google-recommended practices. What should you do?",
    "options": [
      "A. Use Google Vault to establish a retention policy for the organizational unit (OU) of the departing employee. Assign the Google Archived User license.",
      "B. Instruct the departing employee to share their My Drive folder with the manager before leaving. Delete the Google Workspace account on the departing employee’s last day.",
      "C. Download the departing employee’s Drive data by using Google Takeout. Upload the data to the manager’s Drive before deleting the departing employee’s Google Workspace account.",
      "D. Transfer ownership of the departing employee’s files to the manager during the user deletion process."
    ],
    "correct": 3,
    "explanation": "During user deletion the Admin console offers to transfer Drive ownership — the built-in offboarding path.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: D. Transfer the ownership at deletion"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 63,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community backs the ownership-transfer option in the deletion flow.",
    "conceptSummary": "Preserving file access when deleting a departing employee.",
    "correctRationale": "When deleting a user, the Admin console prompts to transfer ownership of their files to another account — the supported, single-step offboarding that keeps the manager's access.",
    "optionRationales": [
      "Wrong: Vault retention preserves data for e-discovery, not working access for the manager.",
      "Wrong: Relying on the departing employee is fragile and gives folder-level rather than ownership transfer.",
      "Wrong: Takeout download/upload is manual, breaks sharing metadata, and is far more work.",
      "Correct: The delete-user flow's ownership transfer is the built-in way to hand the files to the manager."
    ]
  },
  {
    "id": 62,
    "topic": "Mobile Devices",
    "difficulty": 2,
    "question": "Your organization allows employees to use their personal devices for work purposes. You want to ensure these devices follow the company’s security policies. You need to choose a mobile management solution that provides minimal passcode enforcement and allows for an admin to remotely wipe a user’s account from the device. You also want to avoid having to install agents on employees’ personal devices. What should you do?",
    "options": [
      "A. Implement Google’s advanced management on mobile devices.",
      "B. Implement Google’s basic management on mobile devices.",
      "C. Enforce a strong password policy, and enforce the password policy at the next sign-in.",
      "D. Deploy a third-party mobile device management (MDM) solution."
    ],
    "correct": 1,
    "explanation": "Basic management applies passcode/wipe policies to personal devices without enrolling them into full company management.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: B. The basic management is enough for account wipes"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 62,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community aligns on basic management for BYOD.",
    "conceptSummary": "Securing personal (BYOD) devices for work access.",
    "correctRationale": "For personal devices, Google's basic mobile management enforces screen-lock/account policies and remote account wipe on the Workspace profile — proportionate management for BYOD.",
    "optionRationales": [
      "Wrong: Advanced management is for company-owned devices needing full control — inappropriate for personal devices.",
      "Correct: Basic management is Google's BYOD tier, enforcing security on the work profile only.",
      "Wrong: Password policy secures the account, not the device holding the data.",
      "Wrong: Third-party MDM adds cost and full-device management for devices you don't own."
    ]
  },
  {
    "id": 61,
    "topic": "Vault & Retention",
    "difficulty": 1,
    "question": "Your company’s legal department has issued a litigation hold that requires you to preserve all data related to a specific project. You need to ensure that all data for this project, including emails, documents, and chats, are preserved indefinitely and cannot be deleted by users. What should you do?",
    "options": [
      "A. Create a hold in Google Vault that includes all users and data sources associated with the project.",
      "B. Assign an Archived User license to all users involved in the project.",
      "C. Set up a retention rule in Google Vault that retains all data from Gmail and Drive indefinitely.",
      "D. Export all project related data from Google Workspace and store the data in a separate, secure location."
    ],
    "correct": 0,
    "explanation": "A Vault hold over all custodians and data sources preserves the project's email, Drive files and chats for litigation.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: A. Answer A: creating a hold in google vault."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 61,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees on the Vault hold.",
    "conceptSummary": "Litigation hold over all project data types.",
    "correctRationale": "A Vault hold applies to users and data sources (Gmail, Drive, Chat) and preserves all covered data indefinitely until released — the direct litigation-hold mechanism.",
    "optionRationales": [
      "Correct: A hold on all project users and data sources preserves every covered data type for litigation.",
      "Wrong: Archived licenses preserve departed users' data but don't scope preservation to a project.",
      "Wrong: A retention rule retains broadly by time, not by a legal-matter scope across all sources.",
      "Wrong: External export removes data from the governed system and is not required by a litigation hold."
    ]
  },
  {
    "id": 60,
    "topic": "Authentication & SSO",
    "difficulty": 3,
    "question": "Your company is transitioning to Google Workspace from legacy communication and collaboration applications. User accounts are managed in Active Directory and synced to Google Workspace by using Google Cloud Directory Sync (GCDS). Your company is implementing a new security policy for all accounts that requires complex passwords. Passwords must be at least 20 characters long, contain 3 symbols, 4 numbers, and 2 capital letters.\nYou need to enforce the new password policy in Google Workspace. What should you do?",
    "options": [
      "A. Share the instructions for changing a Google account password with your users. Monitor password strength in the Google Admin console as users change their passwords.",
      "B. Enable strong password enforcement and require a minimum length of 20 characters at the top-level organizational unit.",
      "C. Create a password policy in Active Directory. Install Password Sync on the global catalog servers for Active Directory and require a password change for your users.",
      "D. Create a password policy in Active Directory. Enable password synchronization in GCDS."
    ],
    "correct": 2,
    "explanation": "Password Sync on the AD domain/global-catalog servers pushes password changes to Workspace, keeping a single password experience.",
    "discussion": [
      {
        "user": "749dcf2",
        "text": "Selected Answer: C. Correct answer is C. D doesn't work because GCDS doesn't allow for password syncing. You need to utilize Google's separate Password Sync to accomplish that. (2 votes)"
      },
      {
        "user": "Frank_2022",
        "text": "Selected Answer: C. C is the correct answer; the scenario uses Google Cloud Directory Sync (GCDS) to provision users, but GCDS does not sync passwords."
      },
      {
        "user": "erh4n",
        "text": "Selected Answer: C. C is the correct answer; the scenario uses Google Cloud Directory Sync (GCDS) to provision users, but GCDS does not sync passwords. A separate tool, Password Sync (also known as Google Workspace Password Sync or GWPS), is required. This tool is installed on your domain controllers (or global catalog servers) to securely capture password changes in AD and sync them to Google Workspace in real-time.. B is incorrect because Google Workspace password policies only apply to users created natively in Google. They are ignored for accounts synced from an external identity provid..."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 60,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community notes GCDS doesn't sync passwords; Password Sync does.",
    "conceptSummary": "Keeping AD and Workspace passwords unified.",
    "correctRationale": "Google's Password Sync tool installs on Active Directory (global catalog/domain controllers) and syncs AD password changes to Google Workspace, so users keep one password managed by AD policy.",
    "optionRationales": [
      "Wrong: Asking users to change passwords in both places breaks the unified-password goal.",
      "Wrong: Enforcing a Workspace-side length does not sync AD passwords; users would still have two passwords.",
      "Correct: Password Sync on the global catalog servers propagates AD password changes to Workspace automatically.",
      "Wrong: GCDS does not synchronize passwords — that is exactly what Password Sync adds."
    ]
  },
  {
    "id": 59,
    "topic": "Admin Roles & App Access",
    "difficulty": 3,
    "question": "Your organization wants to prevent a group of users from logging into their Google Drive when they are traveling internationally for business.\nYou have added these users to an organizational unit (OU). You need to secure the users’ access to the Google Drive app to meet this requirement.\nWhat should you do?",
    "options": [
      "A. Disable Google Drive for users in the OU.",
      "B. Define location-based access levels. Assign the levels to the Google Drive app for the OU.",
      "C. Require 2-step verification (2SV) when users in the OU sign in.",
      "D. Define user-based access levels. Assign the levels to the Google Drive app for the OU."
    ],
    "correct": 1,
    "explanation": "Context-aware access levels based on location restrict Drive sign-in for the traveling users' OU.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: B. Define location-based access levels"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 59,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community picks context-aware location levels.",
    "conceptSummary": "Blocking Drive access while users travel internationally.",
    "correctRationale": "Context-aware access lets you define location-based access levels and assign them to an app (Drive) for a specific OU — blocking sign-in from restricted locations.",
    "optionRationales": [
      "Wrong: Disabling Drive outright also blocks them domestically and removes the service entirely.",
      "Correct: Location-based context-aware access levels applied to Drive for the OU implement exactly this conditional block.",
      "Wrong: 2SV strengthens authentication but does not prevent login from a location.",
      "Wrong: Access levels are not 'user-based'; the relevant dimension here is location."
    ]
  },
  {
    "id": 58,
    "topic": "Reports, Alerts & Investigation",
    "difficulty": 2,
    "question": "During a recent Google Meet video conference, several employees reported that they could not hear the presenters. The presenters confirmed that their laptops’ microphones were working. The affected employees were all using company-issued laptops. You need to quickly diagnose the source of the issue. What should you do first?",
    "options": [
      "A. Verify that the audio drivers on the affected laptops are up-to-date and functioning correctly.",
      "B. Check the Admin console to determine whether there are recent Meet-related notifications or alerts.",
      "C. Check if Context-Aware access rules were set to prevent Meet access from the user’s network location.",
      "D. Use the Meet quality tool for each affected user to analyze their microphone settings and configurations during the meeting."
    ],
    "correct": 3,
    "explanation": "The Meet quality tool surfaces per-user audio diagnostics for the affected sessions.",
    "discussion": [
      {
        "user": "SteveSJSResearch",
        "text": "Selected Answer: D. Question states that microphones were working, so it's not audio drivers. https://support.google.com/a/answer/9204857?hl=en#zippy=%2Creview-meeting-statistics-details suggests that the Meet quality tool might be the place to start troubleshooting. (3 votes)"
      },
      {
        "user": "409fcc6",
        "text": "Selected Answer: D. Option D is the correct solution. Option A is time consuming, Option B doesn't provide sufficient information and Option C is an unlikely cause"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 58,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community converges on the Meet quality tool.",
    "conceptSummary": "Diagnosing Meet audio issues for affected users.",
    "correctRationale": "The Meet quality tool in the Admin console gives per-meeting, per-user diagnostics (mic state, network, device) — the purpose-built tool to see why those employees couldn't hear the presenters.",
    "optionRationales": [
      "Wrong: Driver checks are plausible locally but don't scale or show the Meet-session context.",
      "Wrong: Admin notifications/Meet alerts would flag service-wide issues, not individual users' audio problems.",
      "Wrong: Context-aware access blocks access entirely; it doesn't cause in-meeting audio loss.",
      "Correct: The Meet quality tool analyzes each affected user's session including audio/device configuration."
    ]
  },
  {
    "id": 56,
    "topic": "Chrome & Endpoints",
    "difficulty": 3,
    "question": "Your company provides shared Chromebook workstations for employees to access sensitive company data. You must configure the devices to ensure no sensitive data is stored locally and that browsing data is cleared after each use. What should you do?",
    "options": [
      "A. Force ephemeral mode in Chrome. Disable offline access for sensitive Workspace apps like Docs, Sheets, and Drive.",
      "B. Enable the Manage Guest Session functionality, and set the maximum user session length.",
      "C. Force ephemeral mode in Chrome. Allow offline access for all Workspace apps with strict expiration times.",
      "D. Disable offline access for all Workspace apps. Enable incognito mode for Chrome browsing sessions."
    ],
    "correct": 0,
    "explanation": "Ephemeral mode wipes the Chrome profile at sign-out; disabling offline access stops sensitive data persisting on shared Chromebooks.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: A. Answer A: ephemeral mode is the google recommended way for using shared devices"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 56,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees on ephemeral mode plus disabled offline access.",
    "conceptSummary": "No local data persistence on shared Chromebooks.",
    "correctRationale": "Forcing ephemeral mode deletes the user's profile data (including browsing data) after each session, and turning off offline access for sensitive apps prevents files caching locally — both requirements.",
    "optionRationales": [
      "Correct: Ephemeral mode plus disabled offline access guarantees nothing sensitive persists between sessions.",
      "Wrong: Managed guest sessions limit duration but don't necessarily clear Workspace app data or disable offline caching.",
      "Wrong: Allowing offline access, even with expirations, keeps sensitive data cached locally between windows of time.",
      "Wrong: Incognito helps browsing privacy but doesn't disable app-level offline storage; disabling offline for all apps still needs the ephemeral/profile wipe to clear other data."
    ]
  },
  {
    "id": 52,
    "topic": "Admin Roles & App Access",
    "difficulty": 3,
    "question": "External sharing at your company is only permitted for the sales and marketing department. Engineering is not allowed to share externally. You need to configure the sharing settings to comply with this policy. What should you do?",
    "options": [
      "A. Use a data loss prevention (DLP) solution to control external sharing based on user groups.",
      "B. Create separate shared drives for each department with different external sharing settings.",
      "C. Create organizational units (OUs) for each department. Configure different external sharing settings for each OU.",
      "D. Configure Drive trust rules to restrict the engineering department from sharing externally."
    ],
    "correct": 3,
    "explanation": "Drive trust rules apply granular sharing policies to specific users, groups, or OUs — restricting engineering while leaving sales/marketing open.",
    "discussion": [
      {
        "user": "iwork",
        "text": "Selected Answer: D. With trust rules, you can create granular policies to control who can get access to Google Drive files. Your policies can apply to individual users, groups, organizational units, and domains to specify: Which users' files can be shared with internal or external users Which users can receive files from internal or external users Which internal or external users can be invited and add items to shared drives (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 52,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "discussionSummary": "Community favors trust rules as the granular modern control. An independent Gemini review leaned C (per-OU sharing settings) while noting both C and D work; D is kept because the policy is a per-department sharing rule, which is what trust rules are built for, and C first requires restructuring OUs.",
    "conceptSummary": "Department-scoped external sharing via Drive trust rules.",
    "correctRationale": "Drive trust rules were built for exactly this: scoped sharing policies applied to specific OUs/groups. A rule blocking external sharing for engineering while leaving sales/marketing's sharing in place satisfies the policy with least disruption.",
    "optionRationales": [
      "Wrong: User-group DLP is not the mechanism for allowing one department external sharing while denying another.",
      "Wrong: Separate shared drives reorganize data but don't enforce who may share.",
      "Wrong: Per-OU external sharing settings would also work technically, but the option starts by creating new OUs per department (a structural change), and once trust rules are turned on they replace the per-OU Drive sharing settings, so trust rules are the intended control.",
      "Correct: A trust rule restricting engineering OU from external sharing implements the policy precisely."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 51,
    "topic": "Mobile Devices",
    "difficulty": 2,
    "question": "Your organization allows employees to use their personal mobile devices to check their work emails. You need to remove the employee’s work email data from their phone when they leave the organization. What should you do?",
    "options": [
      "A. Set up basic mobile management on the devices.",
      "B. Set up advanced mobile management on the devices.",
      "C. Set up data protection rules to prevent data sharing externally.",
      "D. Set up 2SV authentication on the devices."
    ],
    "correct": 0,
    "explanation": "Basic management lets an admin wipe the Workspace account (work data) from a personal device on departure.",
    "discussion": [
      {
        "user": "SteveSJSResearch",
        "text": "Selected Answer: A. https://support.google.com/a/answer/7400753 suggests basic mobile device management is sufficient. (2 votes)"
      },
      {
        "user": "409fcc6",
        "text": "Selected Answer: A. Once again SteveSJSResearch is correct: Option A is sufficient to remote wipe *Accounts* which removes google Workspace account data and does not wipe the user's personal data. This can be used for BYOD scnearios without affecting personal data. In comparison to that, Advanced Mobile Management (Option B) can do both Account and Full Device Wipe, but this is more expensive. The question doesn't explicitly ask for this, so principle it would be a valid answer, but the more expensive one. Both Options C & D do nothing for remote wiping"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 51,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees basic management is sufficient for account wipe on BYOD.",
    "conceptSummary": "Removing work email data from BYOD phones at offboarding.",
    "correctRationale": "Basic mobile management supports remote account wipe of the Workspace profile/data on a personal device without managing the whole device — exactly what offboarding requires.",
    "optionRationales": [
      "Correct: Basic management's account wipe removes work data from the personal device.",
      "Wrong: Advanced management targets company-owned devices with full control — overkill for personal phones.",
      "Wrong: DLP prevents sharing; it cannot remove work data from the device.",
      "Wrong: 2SV secures sign-in but cannot wipe work data."
    ]
  },
  {
    "id": 50,
    "topic": "Domains & Resources",
    "difficulty": 2,
    "question": "You are managing the buildings and resources for your organization. You need to create several conference rooms with a capacity of 10 people each, equipped with a whiteboard and projector, and wheelchair accessible. You want to ensure the process is efficient. What should you do?",
    "options": [
      "A. Automate room creation by using a third-party app from the Google Workspace Marketplace.",
      "B. Create a CSV file and add all resources. Write a script using the Workspace API to reference the CSV file and create all the resources.",
      "C. Create each conference room individually in the Google Admin console. Add the features for each room.",
      "D. Use the Google Admin console to bulk upload the rooms. Create a resource with the specified features and apply the features to that resource."
    ],
    "correct": 3,
    "explanation": "Admin console bulk upload creates all rooms at once with features like capacity, whiteboard, projector, accessibility.",
    "discussion": [
      {
        "user": "409fcc6",
        "text": "Selected Answer: D. The correct answer is D. Option A relies on third party tools, Option B is complex and creates extra effort, Option C is labor intensive. Answer therefore is Option D (2 votes)"
      },
      {
        "user": "cbrnrndo",
        "text": "Selected Answer: D. D is the correct answer. The feature attributes for each room need to be set in some way. Implementing an API script from scratch will take a lot more time and effort compared to a bulk upload."
      },
      {
        "user": "vinut",
        "text": "Selected Answer: B. Using a CSV file to list all the conference rooms and a script to automate their creation via the Workspace API is the most efficient solution. This approach allows you to batch-create the rooms with the specified attributes (capacity, whiteboard, projector, wheelchair accessible) without manually inputting each room individually. It minimizes manual effort and ensures consistency across all room configurations."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 50,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Majority picks bulk upload; the B voters' API/script route works but is not the efficient in-console path.",
    "conceptSummary": "Bulk-creating calendar resources with features.",
    "correctRationale": "The Admin console's bulk-upload for resources accepts a CSV containing room name, capacity and features (whiteboard, projector, wheelchair access) — creating all rooms consistently in one step.",
    "optionRationales": [
      "Wrong: A Marketplace app adds third-party cost/risk for a built-in capability.",
      "Wrong: Custom API scripting is unnecessary when bulk upload exists in the console.",
      "Wrong: Creating each room individually is slower and error-prone for several rooms.",
      "Correct: Bulk upload creates all the rooms with their features in one pass."
    ]
  },
  {
    "id": 48,
    "topic": "Users & Licensing",
    "difficulty": 2,
    "question": "You need to ensure that data owned by former employees remains available in Google Vault. You want to use the most cost-effective solution.\nWhat should you do?",
    "options": [
      "A. Migrate the former employees’ Gmail to their manager(s) by using the data migration service during the deletion process. Transfer the former employees’ Google Drive files to a new owner.",
      "B. Change the Google account passwords of the former employees.",
      "C. Suspend the former employees’ Google accounts. Create an organizational unit (OU). Move the former employees into that OU.",
      "D. Assign an Archived User license to the former employees’ Google accounts."
    ],
    "correct": 3,
    "explanation": "Archived User licenses preserve former employees' data for Vault at the lowest cost.",
    "discussion": [
      {
        "user": "409fcc6",
        "text": "Selected Answer: D. Agreed, it's option D. Using Archived User licenses is more economical then maintaining active users. Option A is complex and creates effort, Option B doesn't adress the need to retain data and Option C raises complexitiy of account management and doesn't describe retaining data in Google Vault. (3 votes)"
      },
      {
        "user": "SteveSJSResearch",
        "text": "Selected Answer: D. You have to keep the user account around (can't delete), so question is how to do that with the \"most cost-effective solution.\" https://support.google.com/vault/answer/2539616?hl=en#zippy=%2Cif-a-users-managed-google-account-is-deleted-is-any-data-retained-by-vault-for-this-user-also-deleted suggests an archive license. Choice D. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 48,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community strongly backs Archived User licenses.",
    "conceptSummary": "Cheapest way to keep ex-employees' data in Vault.",
    "correctRationale": "An Archived User license keeps the account's data retained and searchable in Vault without paying for an active seat — the cost-effective preservation option.",
    "optionRationales": [
      "Wrong: Migrating mail to managers costs effort and does not preserve the account's full dataset in Vault context.",
      "Wrong: A password change does not affect data preservation or licensing.",
      "Wrong: Suspension keeps paying the full active license — not most cost-effective.",
      "Correct: Archived User licenses keep the data available in Vault at minimal license cost."
    ]
  },
  {
    "id": 45,
    "topic": "Chrome & Endpoints",
    "difficulty": 1,
    "question": "You manage Chrome Enterprise browsers for your large organization. You want to ensure that specific extensions are automatically installed on all managed Chrome Enterprise browsers. What should you do?",
    "options": [
      "A. Allowlist the specific Chrome browser extensions.",
      "B. Configure a script to deploy the extensions upon user login.",
      "C. Publish the extensions in the Chrome Web Store.",
      "D. Force-install the extensions through Chrome browser policies."
    ],
    "correct": 3,
    "explanation": "Force-install policies push the required extensions to every managed Chrome browser automatically.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 45,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Number inferred from CertLibrary's ordering, which runs 30 behind ExamTopics; not confirmed on ExamTopics.",
    "discussionSummary": "",
    "conceptSummary": "Automatically deploying required extensions to managed Chrome.",
    "correctRationale": "Chrome browser cloud management supports force-installed extensions: list them in policy and every managed browser installs them automatically with no user action.",
    "optionRationales": [
      "Wrong: Allowlisting only permits installation; it does not auto-install.",
      "Wrong: A login script is fragile and unnecessary when Chrome policies do this natively.",
      "Wrong: Publishing to the Web Store makes extensions available, not installed.",
      "Correct: Force-install via Chrome browser policies installs the extensions everywhere automatically."
    ]
  },
  {
    "id": 44,
    "topic": "OUs & Groups",
    "difficulty": 3,
    "question": "Your organization has enabled Google Groups for Business to let employees create and manage their own email distribution lists and web forums. You need to ensure that users cannot join external Google Groups with their Google Workspace accounts without interrupting internal group usage. What should you do?",
    "options": [
      "A. Set the setting for Google Groups for Business called Accessing groups from outside this organization to Private.",
      "B. In Additional Google Services, turn Google Groups OFF at the root organizational unit.",
      "C. Use the Directory API to change the settings of user-created groups to disable features that allow external users to access, view, or post on groups.",
      "D. Set the setting for Google Groups for Business called Default for permission to view conversations to All organization users."
    ],
    "correct": 0,
    "explanation": "Setting 'Accessing groups from outside this organization' to Private stops users joining external Groups without touching internal use.",
    "discussion": [
      {
        "user": "SteveSJSResearch",
        "text": "Selected Answer: A. Question is mistyped. Pretty sure the question is supposed to be how can an administrator prevent external users from joining the organization's Google Groups for Business, not how can internal users be prevented from joining external Google Groups (which cannot be prevented to my knowledge). (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 44,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees; some note the question wording is loose but the intended control is the outside-access setting.",
    "conceptSummary": "Blocking membership in external Google Groups only.",
    "correctRationale": "The Groups for Business setting 'Accessing groups from outside this organization' controls whether users can join groups outside your domain; setting it Private removes external-group access while internal group usage continues.",
    "optionRationales": [
      "Correct: The dedicated setting targets exactly external-group access, leaving internal usage intact.",
      "Wrong: Turning Groups off at the root kills internal groups too — explicitly not wanted.",
      "Wrong: Per-group Directory API changes cannot stop users from joining external groups.",
      "Wrong: Conversation-visibility defaults control viewing of group archives, not external membership."
    ]
  },
  {
    "id": 43,
    "topic": "OUs & Groups",
    "difficulty": 3,
    "question": "Your organization is implementing a new customer support process that uses Gmail. You need to create a cost-effective solution that allows external customers to send support request emails to the customer support team. The requests must be evenly distributed among the customer support agents. What should you do?",
    "options": [
      "A. Create a Google Group, enable collaborative inbox settings, set posting permissions to “Anyone on the web”, and add the customer support agents as group members.",
      "B. Use delegated access for a specific email address that represents the customer support group, and add the customer support team as delegates for that email address.",
      "C. Create a Google Group, add the support agents to the group, and set the posting permissions to “Public.”",
      "D. Set up an inbox for the customer support team. Provide the login credentials to the customer support team."
    ],
    "correct": 0,
    "explanation": "A Google Group with collaborative inbox features and public posting gives external senders an address the support team shares — free.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 43,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Number inferred from CertLibrary's ordering, which runs 30 behind ExamTopics; not confirmed on ExamTopics.",
    "discussionSummary": "",
    "conceptSummary": "Cost-effective shared support inbox receiving external email.",
    "correctRationale": "A Google Group configured as a collaborative inbox accepts posts from anyone on the web, giving external customers a single support address while all agents read and assign tickets — no extra licenses needed.",
    "optionRationales": [
      "Correct: Collaborative-inbox group + public posting = free shared support address that external customers can email.",
      "Wrong: Delegated access shares a real mailbox internally but still needs a licensed mailbox and manual triage.",
      "Wrong: Restricting posting to the group blocks external customers entirely.",
      "Wrong: Sharing mailbox credentials is insecure and still consumes a license."
    ]
  },
  {
    "id": 42,
    "topic": "Reports, Alerts & Investigation",
    "difficulty": 2,
    "question": "You are investigating a potential data breach. You need to see which devices are accessing corporate data and the applications used. What should you do?",
    "options": [
      "A. Analyze the audit log in the Admin console for device and application activity.",
      "B. Analyze the security investigation tool to access device log data.",
      "C. Analyze the Google Workspace reporting section of the Admin console.",
      "D. Analyze the User Accounts section in the Google Admin console."
    ],
    "correct": 1,
    "explanation": "Device log data in the security investigation tool shows which devices and apps touched corporate data.",
    "discussion": [
      {
        "user": "stringvox",
        "text": "Selected Answer: B. Security investigation tool is the answer not the audit log."
      },
      {
        "user": "schamorroa",
        "text": "Selected Answer: B. • The Security Investigation Tool in Google Workspace (available in Enterprise editions) provides advanced, real-time visibility into device access, user activity, and app usage. • It allows you to query device logs, filter by user, app, and timeframe, and investigate suspicious behavior, making it the most powerful tool for data breach investigations."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 42,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community aligns on the device log data in the investigation tool.",
    "conceptSummary": "Identifying devices/apps accessing corporate data during a breach.",
    "correctRationale": "The security investigation tool exposes device log events — device, app, user, time — which directly answers which devices accessed corporate data and with what applications.",
    "optionRationales": [
      "Wrong: The generic audit log does not provide the consolidated device-and-application view needed.",
      "Correct: The investigation tool's device log data shows exactly which devices and apps accessed corporate data.",
      "Wrong: The reporting section aggregates usage metrics, not per-device access detail.",
      "Wrong: The User Accounts section manages users, not device access forensics."
    ]
  },
  {
    "id": 41,
    "topic": "DLP & Classification",
    "difficulty": 2,
    "question": "Your organization collects credit card information in customer files. You need to implement a policy for your organization’s Google Drive data that prevents the accidental sharing of files that contain credit card numbers with external users. You also need to record any sharing incidents for reporting. What should you do?",
    "options": [
      "A. Create a data loss prevention (DLP) rule that uses the predefined credit card number detector, sets the action to “block external sharing”, and enables the “Log event” option.",
      "B. Enable Gmail content compliance, and create a rule to block email attachments containing credit card numbers from being sent to external recipients.",
      "C. Implement a third-party data loss prevention solution to integrate with Drive and provide advanced content detection capabilities.",
      "D. Configure a data retention policy to automatically delete files containing credit card numbers after a specified period."
    ],
    "correct": 0,
    "explanation": "A Drive DLP rule with the credit-card detector, 'block external sharing', and logging satisfies both prevention and reporting.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 41,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Number inferred from CertLibrary's ordering, which runs 30 behind ExamTopics; not confirmed on ExamTopics.",
    "discussionSummary": "Three independent sources agree on the Drive DLP rule.",
    "conceptSummary": "Preventing external sharing of credit-card files with incident logging.",
    "correctRationale": "Drive DLP ships a predefined credit-card-number detector; a rule using it with the 'block external sharing' action plus 'Log event' prevents accidental sharing and records each incident — both stated requirements in one control.",
    "optionRationales": [
      "Correct: Predefined credit-card detector + block-external-sharing + Log event covers prevention and reporting natively.",
      "Wrong: Gmail content compliance governs email attachments, not files shared from Drive.",
      "Wrong: A third-party DLP is unnecessary when the capability is built into Drive.",
      "Wrong: Deleting files on a schedule destroys data rather than preventing sharing, and loses the records."
    ]
  },
  {
    "id": 40,
    "topic": "OUs & Groups",
    "difficulty": 3,
    "question": "You work at a large organization that prohibits employees from using Google Sites. However, a task force comprised of three people from five different departments has recently been formed to work on a project assigned by the Office of the CIO. You need to allow the users in this task force to temporarily use Google Sites. You want to use the least disruptive and most efficient approach. What should you do?",
    "options": [
      "A. Turn Google Sites access on for each of the 15 users in the task force.",
      "B. Create a configuration group for the task force’s 15 users. Grant Google Sites access to the group.",
      "C. Place the 15 task force users into a new organizational unit (OU). Turn on Google Sites access for the OU.",
      "D. Create an access group for the task force’s 15 users. Grant Google Sites access to the group."
    ],
    "correct": 3,
    "explanation": "An access group lets you turn a service (Sites) on for a defined set of users across OUs without moving anyone.",
    "discussion": [
      {
        "user": "749dcf2",
        "text": "Selected Answer: D. A configuration group allows you to CONFIGURE the settings in a given service. Access groups are used to allow access to specific services (like Sites). As this question is asking how to enable a service, D is the correct answer. (3 votes)"
      },
      {
        "user": "SteveSJSResearch",
        "text": "Selected Answer: B. https://support.google.com/a/answer/33329 suggests a \"configuration group\" will achieve the required outcome. A large organization would not do well to move people to a special OU if the people are from different departments. The question is clearly written to make an OU answer inappropriate. (2 votes)"
      },
      {
        "user": "Frank_2022",
        "text": "Selected Answer: D. In Google Workspace, the most efficient and least disruptive way to enable a service like Google Sites for a small subset of users across multiple departments is to use an access group."
      },
      {
        "user": "pulkit0627",
        "text": "Selected Answer: B. Shouldn't it be \"B\" as C will not be least disruptive."
      },
      {
        "user": "binny86",
        "text": "Selected Answer: B. You can use configuration groups to customize settings for various Google Workspace services, such as turning on/off specific apps or features for certain users"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 40,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Voters split between access group and configuration group; Google's own terminology makes the service-access grant an access group, so D is loaded. An independent Gemini review also picked D, citing Google's access group documentation.",
    "conceptSummary": "Enabling a service for a cross-department subset via an access group.",
    "correctRationale": "Workspace supports turning services on/off for access groups. Creating an access group containing the 15 task-force users and granting it Sites access is the least-disruptive scoping — no OU moves, no per-user toggles.",
    "optionRationales": [
      "Wrong: Turning Sites on for 15 individual accounts is more disruptive and harder to maintain.",
      "Wrong: A configuration group customizes service settings; it is not the mechanism Google documents for granting service access (that's an access group).",
      "Wrong: A dedicated OU forces moves that alter inherited policies — more disruptive than a group.",
      "Correct: An access group grants Sites access to exactly the 15 users across departments with no moves."
    ]
  },
  {
    "id": 39,
    "topic": "Reports, Alerts & Investigation",
    "difficulty": 2,
    "question": "A user in your organization received a spam email that they reported for further investigation. You need to find out more details and the scope of this incident as quickly as possible. What should you do?",
    "options": [
      "A. Conduct a Vault search to find this email and identify if additional users were affected.",
      "B. Conduct a search to find all emails sent by the sender by using the Gmail API.",
      "C. Conduct an Email reports search to find this email and all of the email’s recipients.",
      "D. Conduct a search in the security investigation tool to find this email, and identify whether additional users were affected."
    ],
    "correct": 3,
    "explanation": "The security investigation tool finds the reported email and enumerates every recipient — fastest incident scoping.",
    "discussion": [
      {
        "user": "schamorroa",
        "text": "Selected Answer: D. The Security Investigation Tool (available in Google Workspace Enterprise and some other editions) is the fastest and most effective way to: Search across your domain for specific messages (e.g., by subject, sender, or message ID) Identify all recipients of a suspicious or malicious email Take immediate action, such as deleting or quarantining the email from users’ inboxes This tool is specifically designed for real-time incident response and investigation."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 39,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community picks the investigation tool for scoping.",
    "conceptSummary": "Scoping a reported spam/phishing incident quickly.",
    "correctRationale": "Searching the reported message in the security investigation tool shows its details and all recipients across the organization in one pass — the fastest way to determine scope.",
    "optionRationales": [
      "Wrong: Vault finds mail but is slower for scope enumeration and not designed for incident triage.",
      "Wrong: The Gmail API is a development interface, not an admin triage tool.",
      "Wrong: 'Email reports search' is not the scoped-investigation feature Google provides for this.",
      "Correct: The security investigation tool finds the email and all affected recipients in one search."
    ]
  },
  {
    "id": 38,
    "topic": "Mail Flow & Troubleshooting",
    "difficulty": 2,
    "question": "Your company’s help desk is receiving technical support tickets from employees who report that messages from known external contacts are being sent to the spam label in Gmail. You need to correct the issue and ensure delivery of legitimate emails without introducing additional risk as soon as possible. What should you do?",
    "options": [
      "A. Ask employees to select the messages in Gmail that are being delivered to spam and mark them as Not spam.",
      "B. Contact the external senders, and tell them to authenticate their sent mail by using domain-based message authentication, reporting, and conformance (DMARC).",
      "C. Turn off more aggressive spam filtering in spam policies that are applied to the users’ organizational unit and add the senders’ mail system IP addresses to the email allowlist.",
      "D. Create an address list of approved senders so messages from these users bypass Gmail’s spam filters and recipients can decide whether they are spam or not."
    ],
    "correct": 3,
    "explanation": "Adding the known contacts to an approved-sender address list makes their mail bypass Gmail's spam filter.",
    "discussion": [
      {
        "user": "erh4n",
        "text": "Selected Answer: D. D is the most secure and effective way to do it. A. can not be true: Ask employees to mark as \"Not spam\": This is a weak solution. It relies on every single employee to do it, and it only trains the filter for that individual user. It doesn't guarantee a fix and is not an efficient administrative response."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 38,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees the allowlist is the reliable fix.",
    "conceptSummary": "Guaranteed delivery for known external senders.",
    "correctRationale": "Gmail supports address lists of approved senders whose messages bypass spam filtering — the deterministic admin-side fix for known contacts being spam-foldered.",
    "optionRationales": [
      "Wrong: 'Not spam' clicks help Gmail learn but are per-user and non-deterministic.",
      "Wrong: Asking senders to authenticate improves reputation but cannot be forced and does not guarantee delivery for this symptom.",
      "Wrong: Weakening aggressive filtering reduces protection for everyone rather than fixing the known-sender case.",
      "Correct: An approved-sender address list makes these contacts' mail bypass the spam filter — a guaranteed fix."
    ]
  },
  {
    "id": 37,
    "topic": "Chrome & Endpoints",
    "difficulty": 3,
    "question": "You are configuring Chrome browser security policies for your organization. These policies must restrict certain Chrome apps and extensions.\nYou need to ensure that these policies are applied on the devices regardless of which user logs into the device. What should you do?",
    "options": [
      "A. Configure the allowed list of apps in the Devices page in the apps and extensions settings.",
      "B. Configure the Chrome user setting to require users to sign in to use Chrome apps and extensions.",
      "C. Configure the Policy Precedence to override the domain-wide policy applied for apps and extensions.",
      "D. Require 2SV for user logins."
    ],
    "correct": 0,
    "explanation": "Setting allowed apps/extensions at device level in Apps & extensions applies policy regardless of who signs in.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 37,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "medium",
    "conflict": true,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Number inferred from CertLibrary's ordering, which runs 30 behind ExamTopics; not confirmed on ExamTopics.",
    "discussionSummary": "An independent Gemini review leaned C (Policy Precedence) but rated it medium and called the options poorly worded; A is kept because Policy Precedence only resolves conflicts between machine and user policies, it does not itself apply a restriction to the device.",
    "conceptSummary": "Device-level Chrome app/extension restrictions.",
    "correctRationale": "Configuring the allowed apps/extensions list on the Devices page of Chrome Apps & extensions policy enforces the restriction on the device itself, independent of which user is signed in.",
    "optionRationales": [
      "Correct: Apps & extensions settings applied to devices enforce the restriction regardless of user sign-in.",
      "Wrong: Requiring sign-in adds a login requirement, not an app restriction for unmanaged sessions.",
      "Wrong: Policy precedence resolves conflicting policies but does not itself restrict apps at device level.",
      "Wrong: 2SV governs authentication strength, not app/extension policy application."
    ],
    "resolvedBy": "devin-2026-10"
  },
  {
    "id": 36,
    "topic": "Domains & Resources",
    "difficulty": 2,
    "question": "The names and capacities of several conference rooms have been updated. You need to use the most efficient way to update these details.\nWhat should you do?",
    "options": [
      "A. Export the resource list to a CSV file, make the changes, and re-import the updated file.",
      "B. Edit each resource in the Google Admin console.",
      "C. Add the modified rooms as new resources. Tell employees not to use old rooms.",
      "D. Delete the existing resources and recreate the resources with the updated information."
    ],
    "correct": 0,
    "explanation": "Export the resource list to CSV, edit names/capacities, and re-import — the standard bulk-update path.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 36,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Number inferred from CertLibrary's ordering, which runs 30 behind ExamTopics; not confirmed on ExamTopics.",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Mirrors disagree (A vs D); CSV bulk update preserves existing bookings and is Google's documented bulk-edit path. An independent Gemini review also picked A.",
    "conceptSummary": "Bulk-updating calendar resource details via CSV.",
    "correctRationale": "Google supports bulk-updating resources by exporting the CSV, editing fields like name and capacity, and re-uploading — the most efficient method for several rooms while preserving their identities and bookings.",
    "optionRationales": [
      "Correct: CSV export/edit/re-import updates all rooms in one pass while keeping resource IDs and bookings intact.",
      "Wrong: Editing each room one at a time is less efficient for several resources.",
      "Wrong: Duplicate rooms create stale, confusing resources instead of updating the real ones.",
      "Wrong: Deleting and recreating destroys bookings and resource history."
    ]
  },
  {
    "id": 35,
    "topic": "Mail Flow & Troubleshooting",
    "difficulty": 3,
    "question": "Multiple users in your organization are reporting that Calendar invitations sent from a specific department are not being received. You verified that the invitations are being sent and there are no error messages in the sender’s logs. You want to troubleshoot the issue. What should you do?",
    "options": [
      "A. Analyze the message headers of the sent invitations by using the Google Admin Toolbox to identify any delivery issues.",
      "B. Verify that the senders in the specific department have the necessary permissions to share their calendars externally and send invitations outside of the organization.",
      "C. Disable and re-enable the Calendar service for the affected users to refresh their connection.",
      "D. Check the affected users’ Calendar settings to confirm whether they have accidentally blocked invitations from the specific department."
    ],
    "correct": 0,
    "explanation": "The Admin Toolbox messageheader/header analysis shows where the invitation delivery actually failed.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 35,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Number inferred from CertLibrary's ordering, which runs 30 behind ExamTopics; not confirmed on ExamTopics.",
    "resolvedBy": "gemini-2026-10",
    "discussionSummary": "Mirrors disagree (A vs B); headers analysis is the correct diagnostic since the question states invites were sent successfully. An independent Gemini review also picked A.",
    "conceptSummary": "Diagnosing sent-but-not-received Calendar invitations.",
    "correctRationale": "With sending confirmed and no errors, the next step is to analyze a real message header (e.g. via Google Admin Toolbox) to trace where delivery failed — spam filtering, recipient server rejection, or header anomalies.",
    "optionRationales": [
      "Correct: Header analysis traces the actual delivery path and reveals where the invitation was lost.",
      "Wrong: Sharing permissions affect calendar visibility, not delivery of email invitations that were already sent.",
      "Wrong: Toggling the service is a guess that does not diagnose the missing invitations.",
      "Wrong: User-side blocking is plausible but is checked after establishing where delivery failed via headers."
    ]
  },
  {
    "id": 34,
    "topic": "Reports, Alerts & Investigation",
    "difficulty": 2,
    "question": "Your compliance team has observed that employees at your organization are frequently resetting their passwords and is concerned about account hijacking. You need to create a solution to notify the compliance team whenever a user updates or resets their password. What should you do?",
    "options": [
      "A. Create and enforce a new password policy for all users in your organization.",
      "B. Move all compliance team members into a separate organizational unit (OU). Create and enforce a new password policy for the members of this OU.",
      "C. Create an activity rule that is triggered by the User’s password changed event. Add compliance team members as email recipients.",
      "D. Create a new alert by using user log events. Check that the challenge type is “Password”, and add the compliance team as email recipients."
    ],
    "correct": 2,
    "explanation": "An activity rule on the 'User's password changed' event can alert the compliance team on every reset.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 34,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Number inferred from CertLibrary's ordering, which runs 30 behind ExamTopics; not confirmed on ExamTopics.",
    "discussionSummary": "Mirror suggested answer (certlibrary) agrees with the activity-rule approach.",
    "conceptSummary": "Alerting on password-reset events for hijack detection.",
    "correctRationale": "Security Center activity rules fire on a chosen event; selecting 'User's password changed' and adding the compliance team as recipients produces the automatic notification solution asked for.",
    "optionRationales": [
      "Wrong: A password policy changes password strength; it does not notify anyone about resets.",
      "Wrong: Moving the compliance team to an OU and applying policy still produces no notifications.",
      "Correct: An activity rule on 'User's password changed' directly notifies the compliance team of every reset.",
      "Wrong: A log-based report is reviewed manually; it is not an automatic notification."
    ]
  },
  {
    "id": 33,
    "topic": "Mail Flow & Troubleshooting",
    "difficulty": 1,
    "question": "Your organization is migrating their current on-premises email solution to Google Workspace. You need to ensure that emails sent to your domain are correctly routed to Gmail. What should you do?",
    "options": [
      "A. Change the Mail Exchange (MX) records in your current email domain’s DNS settings to point to Google’s mail servers.",
      "B. Set up email forwarding from your on-premises email provider to Gmail.",
      "C. Create a content compliance rule to filter and route incoming emails.",
      "D. Configure SPF, DKIM, and DMARC records in your current email domain’s DNS settings."
    ],
    "correct": 0,
    "explanation": "Point the domain's MX records at Google's mail servers to route inbound mail to Gmail.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 33,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Number inferred from CertLibrary's ordering, which runs 30 behind ExamTopics; not confirmed on ExamTopics.",
    "discussionSummary": "",
    "conceptSummary": "Routing inbound mail to Gmail via MX records.",
    "correctRationale": "Mail delivery to a domain is controlled by its MX records; updating them to Google's published MX hosts routes all inbound mail to Gmail.",
    "optionRationales": [
      "Correct: Changing MX records to Google's servers is the standard way to deliver the domain's mail to Gmail.",
      "Wrong: Forwarding keeps the old system in the path and is a workaround, not a migration.",
      "Wrong: Content compliance rules act on mail that already reached Gmail; they cannot deliver the domain's mail there.",
      "Wrong: SPF/DKIM/DMARC are anti-spoofing records; they do not change the delivery destination."
    ]
  },
  {
    "id": 32,
    "topic": "Domains & Resources",
    "difficulty": 2,
    "question": "You are migrating your organization’s email to Google Workspace. Your organization uses the terramearth.com email domain. You need to configure Google Workspace to receive emails sent to terramearth.com. What should you do?",
    "options": [
      "A. Add terramearth.com as a primary, secondary, or alias domain in Google Workspace. Update the Mail Exchange (MX) records with your domain registrar to direct mail flow to Google’s mail servers.",
      "B. Establish a Transport Layer Security (TLS) connection between your company’s existing mail servers and Google’s mail servers",
      "C. Configure an email address in Google Workspace to capture emails sent to unverified domains, including terramearth.com.",
      "D. Create a domain alias for terramearth.com in Google Workspace. Configure email forwarding to redirect emails to the new Google Workspace accounts."
    ],
    "correct": 0,
    "explanation": "Add terramearth.com to the Workspace account (primary/secondary/alias) and point its MX records to Google.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 32,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Number inferred from CertLibrary's ordering, which runs 30 behind ExamTopics; not confirmed on ExamTopics.",
    "discussionSummary": "",
    "conceptSummary": "Preparing a domain to receive mail in Workspace.",
    "correctRationale": "To receive mail for terramearth.com in Workspace you must first register the domain on the account, then update the domain's MX records to Google's servers — the standard two steps.",
    "optionRationales": [
      "Correct: Register the domain on the Workspace account, then update its MX records to Google — the complete, standard flow.",
      "Wrong: A TLS link between servers secures transport but does not route the domain's mail to Google.",
      "Wrong: Catch-all addresses do not make an unregistered domain deliver to Workspace.",
      "Wrong: Email forwarding alone keeps the domain unregistered and is a partial workaround, not proper configuration."
    ]
  },
  {
    "id": 31,
    "topic": "Drive & Docs",
    "difficulty": 3,
    "question": "You work for a healthcare provider that uses an external medical billing company to manage patient records and invoices. Your organization’s employees need to share patient documents with the billing company’s employees for processing. You need to configure access so the medical billing company’s employees can view and edit the documents, but they cannot delete the documents. What should you do?",
    "options": [
      "A. Create a shared drive that is managed by your organization’s employees. Grant Contributor access to the billing company’s staff.",
      "B. Create a shared drive. Grant Content Manager access to your organization’s employees and the billing company.",
      "C. Create a group, and add the employees from your organization and the billing company. Create a shared folder on Google Drive. Grant Editor access to the group",
      "D. Restrict access for the medical billing company’s employees by using Data Loss Prevention (DLP) policies."
    ],
    "correct": 0,
    "explanation": "A shared drive with Contributor access lets the billing company view and edit but not delete documents.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 31,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "sourceNumberConfirmed": false,
    "sourceNumberNote": "Number inferred from CertLibrary's ordering, which runs 30 behind ExamTopics; not confirmed on ExamTopics.",
    "discussionSummary": "Two independent mirrors agree on the shared-drive + Contributor answer.",
    "conceptSummary": "External partner needs edit-but-not-delete access to shared documents.",
    "correctRationale": "Shared drives support external members; the Contributor role allows viewing, creating and editing files but not deleting them — precisely the access level required, managed by your organization.",
    "optionRationales": [
      "Correct: A shared drive you manage plus Contributor access for the partner gives view/edit without delete rights.",
      "Wrong: Content Manager allows moving/deleting files — more than permitted.",
      "Wrong: A personal Drive folder shared with a group leaves ownership with a user and offers no managed, delete-restricted role.",
      "Wrong: DLP restricts content sharing but does not grant the partner the required view/edit access."
    ]
  },
  {
    "id": 30,
    "topic": "Domains & Resources",
    "difficulty": 2,
    "question": "The innovation team at your organization has a dedicated room with prototype equipment. You need to make the room bookable, add the equipment, and ensure that there are no booking conflicts. Only the innovation team and the sales directors can access this room. What should you do?",
    "options": [
      "A. Create a separate Google Calendar resource for the room. Manually manage booking requests from both teams.",
      "B. Create a Google Group for the innovation team and another Google Group for sales directors. Share the room’s calendar with both groups.",
      "C. Create a Google Calendar event for the room. Share the event with the innovation team and sales directors.",
      "D. Edit the Google Calendar settings for the room resource. Adjust the permission settings so only the innovation team and sales director group can view and book time on this calendar."
    ],
    "correct": 3,
    "explanation": "A Calendar resource for the room plus permission-scoped sharing books it without conflicts for exactly the two groups.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 30,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Bookable, access-restricted calendar resource for a room.",
    "correctRationale": "Creating the room as a Calendar resource enables booking with conflict handling; editing the resource's calendar sharing so only the innovation-team and sales-directors groups can see and book satisfies the access restriction.",
    "optionRationales": [
      "Wrong: Manual request management defeats automated booking and does not prevent conflicts.",
      "Wrong: Groups alone organize people; the room still needs a bookable resource, and sharing the calendar broadly is less controlled than resource permissions.",
      "Wrong: A one-off event is not a bookable room and manages nothing about future conflicts.",
      "Correct: Resource-calendar permissions give both groups booking ability with conflict prevention, scoped to exactly them."
    ]
  },
  {
    "id": 29,
    "topic": "Gmail",
    "difficulty": 1,
    "question": "An executive at your organization asked you to give their executive administrator access to their Workspace account. You need to ensure that this executive administrator can manage emails in the executive’s account. You need to maintain security and privacy of the executive’s account. What should you do?",
    "options": [
      "A. Assist the executive in setting up email forwarding to their executive administrator.",
      "B. Instruct the executive to share their password with their executive administrator.",
      "C. Create a Google Group, and add all executive administrators. Enable delegated access to the Group.",
      "D. Grant delegated access to the executive’s Gmail account, and assign access to their executive administrator in Gmail settings."
    ],
    "correct": 3,
    "explanation": "Gmail delegated access lets the assistant manage the executive's mail without password sharing.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 29,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Proper delegation of an executive mailbox.",
    "correctRationale": "Gmail delegation grants an assistant read/send/manage rights on the executive's mailbox with the executive's own settings, preserving security (no shared password) and privacy (no blanket forwarding of all mail).",
    "optionRationales": [
      "Wrong: Forwarding all mail exposes every message, not just the ones the assistant must manage, and is a privacy problem.",
      "Wrong: Sharing passwords is a fundamental security violation.",
      "Wrong: Delegated access is granted per mailbox in Gmail settings; a Google Group cannot hold a Gmail delegate.",
      "Correct: Gmail delegated access is the built-in, secure mechanism for assistant-managed mail."
    ]
  },
  {
    "id": 28,
    "topic": "OUs & Groups",
    "difficulty": 2,
    "question": "You are designing a group structure for your company that will be used to grant access to a specific shared drive. You need this solution to automatically add and remove employees based on their job role. What should you do?",
    "options": [
      "A. Create a security group. Add all employees with the desired job role. Grant the security group access to the shared drive.",
      "B. Create a distribution list. Add all employees with the desired job role. Grant the distribution list access to the shared drive.",
      "C. Create a dynamic group. Set the membership criteria to the desired job role. Grant the dynamic group access to the shared drive.",
      "D. Create a configuration group. Add users on an exception basis. Grant the configuration group access to the shared drive."
    ],
    "correct": 2,
    "explanation": "A dynamic group keyed on the job-role attribute adds and removes members automatically.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 28,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Automatic membership by job role for shared-drive access.",
    "correctRationale": "Dynamic groups maintain membership automatically from user attributes: set the condition to the job role and members join/leave as roles change. Granting that group access to the shared drive satisfies the automation requirement.",
    "optionRationales": [
      "Wrong: A security group has static membership — no automatic add/remove by role.",
      "Wrong: A distribution list is for mailing, has manual membership, and is not the access vehicle.",
      "Correct: A dynamic group with a job-role membership condition automates the lifecycle exactly as required.",
      "Wrong: Configuration groups apply settings; they do not grant resource access and are static anyway."
    ]
  },
  {
    "id": 27,
    "topic": "Mail Flow & Troubleshooting",
    "difficulty": 3,
    "question": "Users at your company are reporting that they are not receiving some emails in their corporate Gmail account. You have checked the Google Workspace Status Dashboard and you found no service disruptions. You need to identify the root cause of the problem and resolve the mail delivery issues. What should you do? (Choose two.)",
    "options": [
      "A. Use Email Log Search (ELS) to identify specific delivery failures.",
      "B. Verify whether the organization’s Mail Exchange (MX) records are correctly configured.",
      "C. Check the users’ spam folders to determine whether emails are being misdirected.",
      "D. Investigate the Gmail log events for error messages or unusual patterns.",
      "E. Check the senders’ IP addresses in the inbound mail gateway."
    ],
    "correct": [
      0,
      1
    ],
    "explanation": "With no service disruption, verify MX routing is correct and use Email Log Search to see whether the messages reached Google at all.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 27,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "First two checks when users miss inbound email.",
    "correctRationale": "After ruling out a service outage, the two foundational checks are MX records (is mail routed to Google at all) and Email Log Search (did Gmail receive and where did it deliver the specific missing messages).",
    "optionRationales": [
      "Correct: Email Log Search traces individual messages to see if they arrived and where they were delivered.",
      "Correct: Misconfigured MX records are a top cause of missing inbound mail and must be verified.",
      "Wrong: Spam folders explain some cases but are a user-side check, not an admin root-cause investigation.",
      "Wrong: Gmail log events show security audit data, not delivery tracing for missing messages.",
      "Wrong: There is no standard 'inbound mail gateway IP check' step for this symptom at the admin level."
    ]
  },
  {
    "id": 26,
    "topic": "Admin Roles & App Access",
    "difficulty": 2,
    "question": "Your company’s security team should be able to investigate unauthorized external file sharing. You need to ensure that the security team can use the security investigation tool and you must follow the principle of least privilege. What should you do?",
    "options": [
      "A. Grant the super admin role to a delegate from the security team.",
      "B. Create a pre-built reporting role. Assign the role to the security team alias.",
      "C. Share the Drive audit log with the security team.",
      "D. Create a custom admin role with security center privileges. Assign the role to the individual security team members."
    ],
    "correct": 3,
    "explanation": "A custom admin role with Security Center privileges is least-privilege access to the investigation tool.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 26,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Least-privilege delegation of security investigation.",
    "correctRationale": "Only an administrator role carrying Security Center privileges grants access to the security investigation tool; a custom role with just that privilege, assigned to the individual team members, satisfies least privilege.",
    "optionRationales": [
      "Wrong: Super admin grants far more than investigation access — violates least privilege.",
      "Wrong: The pre-built reporting role surfaces reports, not the Security Center investigation tool.",
      "Wrong: Sharing Drive audit logs exposes raw data without the tool and is not a least-privilege security capability.",
      "Correct: Custom admin role with Security Center privileges, assigned per member, is least privilege."
    ]
  },
  {
    "id": 25,
    "topic": "Drive & Docs",
    "difficulty": 3,
    "question": "The current data storage limit for the sales organizational unit (OU) at your company is set at 10GB per user. A subset of sales representatives in that OU need 100GB of storage across shared services. You need to increase the storage for only the subset of sales representatives by using the least disruptive approach and the fewest configuration steps. What should you do?",
    "options": [
      "A. Move the subset of users to a sub-OU, and assign a 100GB storage limit to that sub-OU.",
      "B. Instruct the subset of users to store their documents in a Shared Drive with a 100GB limit.",
      "C. Change the storage limit of the sales OU to 100GB.",
      "D. Create a configuration group, and add the subset of users to that group. Set the group storage limit to 100GB."
    ],
    "correct": 3,
    "explanation": "Storage limits can be applied per group; a configuration group carrying the subset gets 100GB with one setting and no moves.",
    "discussion": [
      {
        "user": "erh4n",
        "text": "Selected Answer: A. A is the correct answer, creating a sub organisational unit is way more easier and tracable than creating a gorup and serve the same purpose. Also we dont need to recreate the substructure for a sub-OU, its inheritated from the parent OU (2 votes)"
      },
      {
        "user": "409fcc6",
        "text": "Selected Answer: D. Option A is more complex: moving users to a sub-OU involves reorganizing existing structure and adds complexity to the organizational structure. Option C gets it done, but is adds more users then just the select subset. Option D is the correct answer. (2 votes)"
      },
      {
        "user": "MasterPepito",
        "text": "Selected Answer: D. Create a configuration group, and add the subset of users to that group. Set the group storage limit to 100GB. https://support.google.com/a/answer/12033430?hl=en&sjid=17981756415114270077-EU (2 votes)"
      },
      {
        "user": "zanhsieh",
        "text": "Selected Answer: D. Goal: Increase storage capacity for a subset of users within the sales OU without affecting others or adding unnecessary complexity. A: No. Creating a sub-OU works but requires directory restructuring and additional admin overhead—more disruptive than necessary. B: No. Shared Drives have their own storage management and ownership rules; this doesn't directly expand individual storage limits. C: No. Raising the entire sales OU's limit to 100 GB gives excessive storage to all users, not just the subset. D: Yes. Create a configuration group for those sales representatives a..."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 25,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Site and majority back the configuration group; sub-OU voters miss that storage limits apply per group.",
    "conceptSummary": "Raising storage for a subset of an OU with least disruption.",
    "correctRationale": "Workspace lets admins set different storage limits per configuration group. Creating a group for just the subset and setting its limit to 100GB changes only those users with no OU moves — least disruptive, fewest steps.",
    "optionRationales": [
      "Wrong: Moving users to a sub-OU changes their OU context, potentially altering other applied policies — more disruptive.",
      "Wrong: A shared drive stores shared files, not personal 100GB quotas, and changes how the reps work.",
      "Wrong: Raising the whole OU gives the full sales team 100GB, not just the subset.",
      "Correct: A configuration group with a 100GB storage limit scopes the increase to exactly the subset."
    ]
  },
  {
    "id": 24,
    "topic": "Domains & Resources",
    "difficulty": 3,
    "question": "Your organization acquired a small agency. You need to create user accounts for these new employees. The new users must be able to use their new organization’s email address and their email address with the sub-agency domain name. What should you do?",
    "options": [
      "A. Redirect the acquired domain to Google’s MX records and add the account as a “send as” address.",
      "B. Set up the acquired agency as a secondary domain from the Manage domains page.",
      "C. Set up the acquired agency as a user alias domain from the Manage domains page.",
      "D. Set up the acquired agency as a secondary domain and swap it to the primary domain."
    ],
    "correct": 2,
    "explanation": "A user alias domain automatically gives every user an email alias at the acquired domain while keeping one mailbox.",
    "discussion": [
      {
        "user": "erh4n",
        "text": "Selected Answer: B. If we set up as alias domain users cant send emails but only receive. User alias domain would be reflected to all users, not only the sub agency users. (3 votes)"
      },
      {
        "user": "MasterPepito",
        "text": "Selected Answer: C. la \"C\" te pone ese dominio de alias para todos y no es lo que se busca (2 votes)"
      },
      {
        "user": "barDa",
        "text": "Selected Answer: C. An alias domain is the most suitable solution when we want users to be able to receive and send emails from two different addresses (the organization's main domain and the agency's old domain), but from the same inbox and under the same user account."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 24,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Site and most voters choose the user alias domain; secondary-domain votes conflate 'two user populations' with 'two addresses per user'.",
    "conceptSummary": "Giving acquired employees addresses in both domains on one mailbox.",
    "correctRationale": "A domain (user) alias adds a second email address at the other domain to every existing account at zero cost and no extra mailboxes — users send/receive as either address, which fits 'use their new org address and their sub-agency domain address'.",
    "optionRationales": [
      "Wrong: MX redirection plus send-as handles sending only and still requires the domain relationship to be configured properly.",
      "Wrong: A secondary domain creates a separate set of users/addresses, doubling account management.",
      "Correct: A user alias domain gives each user both addresses on a single mailbox with no extra seats.",
      "Wrong: Swapping primary domain discards the original primary identity rather than keeping both addresses."
    ]
  },
  {
    "id": 23,
    "topic": "Meet, Chat & Calendar",
    "difficulty": 1,
    "question": "Your company wants to minimize distractions and inappropriate content in their Google Chat spaces. You need to give trusted employees the ability to remove messages and ban users from specific Chat spaces. What should you do?",
    "options": [
      "A. Assign the trusted employees as moderators for the relevant Chat spaces.",
      "B. Create a data loss prevention (DLP) rule that blocks inappropriate content from being shared",
      "C. Use the security investigation tool to audit and monitor Chat messages.",
      "D. Disable all Chat spaces except those specifically approved by management."
    ],
    "correct": 0,
    "explanation": "Chat space moderators can remove messages and ban users — the built-in role for exactly this.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 23,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Delegating message removal/bans in Chat spaces.",
    "correctRationale": "Google Chat supports space managers/moderators who can remove messages and remove (ban) members — assign the trusted employees as moderators of those spaces.",
    "optionRationales": [
      "Correct: Space moderators are the built-in mechanism to remove messages and ban users in a Chat space.",
      "Wrong: DLP blocks policy-violating content; it does not give humans moderation powers over arbitrary messages.",
      "Wrong: The investigation tool audits messages but confers no in-space moderation ability on the employees.",
      "Wrong: Disabling all spaces removes the collaboration channel rather than moderating it."
    ]
  },
  {
    "id": 22,
    "topic": "Drive & Docs",
    "difficulty": 2,
    "question": "Your organization has a Shared Drive with 150 users organized as a group. All users of the group need to be able to add and edit files, but the ability to move, delete, and share content must be limited to a single user. You need to configure the shared drive to meet these requirements efficiently. What should you do?",
    "options": [
      "A. Create a folder inside the shared drive. Share the files with the group by using the share function.",
      "B. Create a folder inside the shared drive. Share the folder link with the group.",
      "C. In the Admin console, assign Contributor access for the shared drive to each user. Assign Content Manager access for the shared drive to the single user.",
      "D. In the Admin console, assign Contributor access for the shared drive to the group. Assign Content Manager access for the shared drive to the single user."
    ],
    "correct": 3,
    "explanation": "Contributor access on the shared drive for the group gives add/edit; Content Manager for the single user adds move/delete/share control.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 22,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Role split between group Contributors and one Content Manager on a shared drive.",
    "correctRationale": "Assigning the whole group Contributor access grants add/edit at drive level; granting the single user Content Manager adds the move/delete/organize rights — one group assignment instead of 150 individual ones.",
    "optionRationales": [
      "Wrong: Sharing a folder/files individually bypasses shared-drive roles and does not grant group-wide add/edit consistently.",
      "Wrong: A shared folder link confers viewer/editor link access, not managed shared-drive roles with restricted move/delete.",
      "Wrong: Correct role split but assigning 150 users individually is inefficient vs one group assignment.",
      "Correct: Group-level Contributor plus a single Content Manager meets the permissions split with the fewest assignments."
    ]
  },
  {
    "id": 21,
    "topic": "Gmail",
    "difficulty": 1,
    "question": "You are configuring email for your company’s Google Workspace account. The company wants to prevent certain types of files from being sent or received as email attachments in the simplest and most cost-effective way. What should you do?",
    "options": [
      "A. Adjust the maximum message size limit to prevent large files from being sent or received.",
      "B. Enable the Security Sandbox in Gmail to automatically quarantine emails with suspicious attachments.",
      "C. Scan all incoming and outgoing emails for malicious attachments by using an industry standard third-party email security solution.",
      "D. Configure an attachment compliance rule in Gmail settings to block specific file types."
    ],
    "correct": 3,
    "explanation": "A Gmail attachment compliance rule blocks the specified file types on send and receive — simplest and built-in.",
    "discussion": [
      {
        "user": "SteveSJSResearch",
        "text": "Selected Answer: D. https://support.google.com/a/answer/2364580 seems to indicate that you can block attachments according to file type using an Attachment compliance setting rule in the Gmail compliance section. (3 votes)"
      },
      {
        "user": "zanhsieh",
        "text": "Selected Answer: D. Goal: Block specific file types from being sent or received via Gmail in a simple and cost-effective way. A: No. Adjusting message size limits only restricts file size, not file type. B: No. Security Sandbox detects threats but doesn't block specific attachment types. C: No. A third-party solution adds cost and complexity, which violates the requirement. D: Yes. Configuring a Gmail attachment compliance rule lets you specify disallowed file types and automatically block or reject those messages — simple, native, and cost-effective. https://support.google.com/a/answer/159..."
      },
      {
        "user": "409fcc6",
        "text": "Selected Answer: D. The objective is to prevent certain types of files from being sent in a most cost-effective way. Automatically quarantining does nothing of the fashion. Option D"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 21,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Site answer and 100% of votes agree.",
    "conceptSummary": "Blocking file types in email attachments.",
    "correctRationale": "Gmail's attachment compliance setting is purpose-built to block attachments by file type or file extension for incoming and outgoing mail — the simplest, zero-cost solution.",
    "optionRationales": [
      "Wrong: A size limit stops large files, not specific file types.",
      "Wrong: Security Sandbox targets malware analysis in quarantine, not a blanket file-type block, and is an Enterprise-tier feature.",
      "Wrong: Buying a third-party scanner is neither simplest nor most cost-effective.",
      "Correct: An attachment compliance rule blocks chosen file types in both directions with built-in settings."
    ]
  },
  {
    "id": 20,
    "topic": "Meet, Chat & Calendar",
    "difficulty": 3,
    "question": "Your organization uses live-streaming to host large Google Meet meetings. You need to limit the participation to affiliated Google Workspace domains by using the Admin console. What should you do?",
    "options": [
      "A. Add the Trusted Workspace domain names in the Stream dialog box.",
      "B. Turn off live streaming to Youtube.",
      "C. Add participants to an organizational unit (OU). Turn on live streaming.",
      "D. Turn on in-house live streaming. Invite users from affiliated domains."
    ],
    "correct": 0,
    "explanation": "Meet's live stream settings let you add trusted Workspace domains, restricting stream viewers to affiliated domains.",
    "discussion": [
      {
        "user": "SteveSJSResearch",
        "text": "Selected Answer: A. https://support.google.com/a/answer/9055446 points to \"A\" as the correct answer. (3 votes)"
      },
      {
        "user": "409fcc6",
        "text": "Selected Answer: A. Option A is correct - direct control allows you do directly specify which domains can access the live stream. Option C is complex and might not effectively limit participation to specific domains. It also requires ongoing management of the OU"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 20,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Voters cite Google's live-stream settings doc for the trusted-domains option.",
    "conceptSummary": "Restricting a Meet live stream to trusted Workspace domains.",
    "correctRationale": "In the Meet Admin console settings for live streaming you can specify trusted Workspace domains; adding the affiliated domains there limits participation to exactly those domains (per support.google.com/a/answer/9055446).",
    "optionRationales": [
      "Correct: Adding the affiliated domains under trusted Workspace domains in the stream settings restricts viewers to those domains.",
      "Wrong: Turning off YouTube live streaming disables the stream rather than scoping its audience.",
      "Wrong: OUs contain your own users, not affiliated external domains, and do not scope stream viewership by domain.",
      "Wrong: In-house streaming limits to your own domain only, excluding the affiliated domains that must attend."
    ]
  },
  {
    "id": 19,
    "topic": "Reports, Alerts & Investigation",
    "difficulty": 3,
    "question": "Your organization's employees frequently collaborate with external clients and vendors by using Google Meet. There are active instances of unsupervised meetings within your organization that do not have a host, and unsupervised meetings that continue after an event has completed. You want to end all meetings that are being used inappropriately as quickly as possible. What should you do?",
    "options": [
      "A. End all unsupervised meetings by using the Google Meet APIs.",
      "B. Enable Host Management for Google Meet, and train internal host employees how to end meetings for everyone.",
      "C. Turn off Google Meet in the Admin console for your organization. Turn Google Meet back on after two minutes.",
      "D. Identify and end all unsupervised meetings by using the security investigation tool."
    ],
    "correct": 3,
    "explanation": "The Meet investigation tool (via the security investigation tool) lists unsupervised meetings and lets an admin end them.",
    "discussion": [
      {
        "user": "SteveSJSResearch",
        "text": "Selected Answer: D. https://support.google.com/a/answer/11028503 suggests using the security investigation tool to achieve the desired outcome, though it's not clear from that KB how one identifies which meetings should be ended (how can one tell which meetings are unsupervised?). (3 votes)"
      },
      {
        "user": "409fcc6",
        "text": "Selected Answer: D. Option A requires technical expertise and is therefore not straightforward. The approach also doesn't scale compared to the security investigation tool. Option B requires training employees and isn't as reliable. Option C disrupts the use of Google Meets for users and doesn't resolve the toot cause. It is as the other poster said: Option D which is quick and can help setup rules to prevent future unsupervised meetings. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 19,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community strongly favors the investigation tool's end-meeting action.",
    "conceptSummary": "Finding and ending hostless Meet meetings quickly.",
    "correctRationale": "The Meet investigation tool in the Admin console identifies active meetings including unsupervised ones and gives admins a direct 'end meeting' action — the purpose-built, fastest remediation.",
    "optionRationales": [
      "Wrong: Scripting the Meet API is a development project, not a quick admin action.",
      "Wrong: Host Management training is a long-term fix; it cannot end the currently active unsupervised meetings quickly.",
      "Wrong: Toggling Meet off is disruptive to every user and does not surgically end the offending meetings.",
      "Correct: The security/Meet investigation tool identifies unsupervised meetings and ends them directly."
    ]
  },
  {
    "id": 18,
    "topic": "Users & Licensing",
    "difficulty": 2,
    "question": "An employee using a Workspace Enterprise Standard license was terminated from your organization. You need to ensure that the former employee no longer has access to their Workspace account and preserve access to the former employee’s documents for the manager and the team. You want to minimize license cost. What should you do?",
    "options": [
      "A. Delete the former employee’s Workspace account.",
      "B. Suspend former employee’s Workspace account.",
      "C. Reset the password of the former employee and keep their Workspace license active.",
      "D. Switch the license type of the former employee’s Workspace account to an Archived User license."
    ],
    "correct": 3,
    "explanation": "An Archived User license blocks all account access, preserves the data, and costs less than keeping an Enterprise Standard seat.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 18,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Lowest-cost way to revoke access yet preserve a departed employee's data.",
    "correctRationale": "Switching the account to an Archived User license immediately denies the former employee access while preserving their Workspace data (mail, Drive) for the manager and team — and the AU license is far cheaper than an active Enterprise seat.",
    "optionRationales": [
      "Wrong: Deleting the account removes the data along with it unless you first migrate it — more work and data-preservation risk.",
      "Wrong: Suspension preserves access revocation but keeps the full Enterprise Standard license cost — not minimal.",
      "Wrong: Resetting the password and keeping the active seat is the most expensive option.",
      "Correct: An Archived User license revokes access, preserves all data, and minimizes license spend."
    ]
  },
  {
    "id": 17,
    "topic": "Reports, Alerts & Investigation",
    "difficulty": 3,
    "question": "Your organization is concerned about unauthorized access attempts. You want to implement a security measure that makes users change their password if there are twenty or more failed login attempts within one hour. You want to use the most effective and efficient approach. What should you do?",
    "options": [
      "A. Set up a Chrome action rule to restrict users from defined ChromeOS actions after twenty failed password attempts.",
      "B. Create an activity rule for user log events, define a time period and threshold, and select an Action for the rule to force a password change.",
      "C. Create an activity rule for live-state data sources that meets the required time period and threshold to identify users who need to change their password.",
      "D. Enable email alerts to notify users that they need to change their password."
    ],
    "correct": 1,
    "explanation": "An activity rule on user log events with a 1-hour threshold of 20 failures can trigger a forced password change automatically.",
    "discussion": [],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 17,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "",
    "conceptSummary": "Auto-enforcing password change after 20 failed logins in one hour.",
    "correctRationale": "Security Center activity rules evaluate a data source (user log events) against a threshold (20 events in 1 hour) and can run an Action such as forcing a password change — the most effective and efficient automated enforcement.",
    "optionRationales": [
      "Wrong: Chrome action rules gate ChromeOS browsing actions, not Workspace account passwords.",
      "Correct: An activity rule on user log events with the right threshold can automatically force a password change.",
      "Wrong: Live-state data sources report current posture, not a count of failed login events over time.",
      "Wrong: Email alerts merely notify users; nothing forces the password change."
    ]
  },
  {
    "id": 16,
    "topic": "Gemini & AppSheet",
    "difficulty": 1,
    "question": "Your organization needs an approval application for purchases where a user can enter information on the purchase required and then submit it for management approval. You need to suggest a solution to create the application that must be available on both the web and mobile devices. Your organization does not have software developers or the budget to hire a third party. What should you do?",
    "options": [
      "A. Suggest that the organization develop an application internally with a database, a backend service for data retrieval, and a frontend service for the application’s user interface.",
      "B. Suggest that the organization continue to approve requests manually until budget is available to use a third-party application provider.",
      "C. Suggest the organization use AppSheet to create the application.",
      "D. Suggest that the organization use AppScript to create forms linked to a Google Sheet to store the purchase data."
    ],
    "correct": 2,
    "explanation": "AppSheet builds no-code web and mobile apps on Workspace data — no developers needed.",
    "discussion": [
      {
        "user": "iwork",
        "text": "Selected Answer: C. AppSheet ix good choice to create application with no code and for several platforms: https://cloud.google.com/appsheet?hl=en"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 16,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Unanimous on AppSheet.",
    "conceptSummary": "No-code approval app for web and mobile.",
    "correctRationale": "AppSheet is Google's no-code app platform: it turns Sheets data into a working approval app that runs on web and mobile with no software developers required — matching the no-budget, no-dev constraint.",
    "optionRationales": [
      "Wrong: Building a custom app requires the developers the organization does not have.",
      "Wrong: Staying manual does not deliver the required application.",
      "Correct: AppSheet creates a functional web+mobile approval app with no code and no developers.",
      "Wrong: Apps Script plus a Sheet can approximate a form but is still scripting and is not a managed approval application."
    ]
  },
  {
    "id": 15,
    "topic": "Mobile Devices",
    "difficulty": 3,
    "question": "Your company’s security team has requested two requirements to secure employees’ mobile devices-enforcement of a passcode and remote account wipe functionality. The security team does not want an agent to be installed on the mobile devices or to purchase additional licenses. Employees have a mix of iOS and Android devices. You need to ensure that these requirements are met. What should you do?",
    "options": [
      "A. Implement a third-party enterprise mobility management (EMM) provider.",
      "B. Set up advanced mobile management for iOS devices and basic mobile management for Android devices.",
      "C. Set up basic management for both iOS and Android devices.",
      "D. Set up advanced management for both iOS and Android devices."
    ],
    "correct": 2,
    "explanation": "Basic mobile management enforces a passcode and supports account wipe on both iOS and Android without installing an agent or extra licenses.",
    "discussion": [
      {
        "user": "SteveSJSResearch",
        "text": "Selected Answer: C. Looks like basic management will allow enforcement of password (https://support.google.com/a/answer/6328679) and wiping an account from a device (https://support.google.com/a/answer/173390). C is good enough (and is supported on even standard licensing levels) (3 votes)"
      },
      {
        "user": "binny86",
        "text": "Selected Answer: C. In Google Workspace, basic mobile management provides core security features for both Android and iOS devices, including password requirements, app management (Android only), and the ability to wipe corporate accounts (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 15,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community converges on basic management as the agent-free answer.",
    "conceptSummary": "Passcode + remote account wipe with no agent on personal devices.",
    "correctRationale": "Google basic mobile management requires no agent or MDM app, no additional licenses, and supports passcode enforcement plus remote account wipe of the Workspace data on both iOS and Android — every stated constraint.",
    "optionRationales": [
      "Wrong: A third-party EMM installs an agent and costs licenses — explicitly ruled out.",
      "Wrong: Splitting advanced/basic by platform is unnecessary complexity; basic alone meets both requirements on both platforms.",
      "Correct: Basic management gives passcode enforcement and remote account wipe on iOS and Android with no agent and no extra license.",
      "Wrong: Advanced management goes beyond the stated needs and for iOS requires an MDM profile/app provisioning."
    ]
  },
  {
    "id": 14,
    "topic": "Reports, Alerts & Investigation",
    "difficulty": 2,
    "question": "You’ve received multiple reports about a suspicious email from someone who is pretending to be from your organization’s human resources department. The email is prompting employees to click a link for a password update. You want to remediate this sender’s emails. What should you do?",
    "options": [
      "A. Use the security investigation tool to search for users who received the suspicious email, and select Mark message as phishing.",
      "B. Use the security investigation tool to action the suspicious email and select Mark message as spam.",
      "C. Create an activity rule to alert administrators to similar emails from that sender.",
      "D. Notify all employees and request that they report this email as spam."
    ],
    "correct": 0,
    "explanation": "The security investigation tool can list every recipient of the phishing email, and 'Mark message as phishing' remediates it.",
    "discussion": [
      {
        "user": "KinMoney",
        "text": "Selected Answer: A. Remediate is A"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 14,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees on investigate-then-mark-phishing.",
    "conceptSummary": "Remediating a phishing email impersonating HR.",
    "correctRationale": "Searching for the suspicious message in the security investigation tool enumerates all users who received it, and marking the message as phishing is the remediation action that removes/neutralizes it.",
    "optionRationales": [
      "Correct: Find all recipients in the security investigation tool and mark the message as phishing — identify plus remediate.",
      "Wrong: 'Mark as spam' is weaker than phishing remediation for a targeted credential-harvesting email.",
      "Wrong: An activity rule only alerts on future similar mail; it does not remediate the delivered copies.",
      "Wrong: Notifying employees does not remove the malicious emails."
    ]
  },
  {
    "id": 13,
    "topic": "Drive & Docs",
    "difficulty": 1,
    "question": "An end user has thousands of files stored in Google Drive. Their files are well organized with Drive labels. You need to advise the end user on how to quickly identify all files that are contracts. What should you do?",
    "options": [
      "A. Advise the user to use the Google Drive API to search for files with the keyword “contracts”",
      "B. Advise the user to search in Drive for files with the keyword “contracts”, and use the “modified by me” filter.",
      "C. Advise the user to search for files that are labeled as “contracts”.",
      "D. Advise the user to use the Investigation tool to search for files with the keyword “contracts” and updated by you."
    ],
    "correct": 2,
    "explanation": "Drive search supports label-based queries; searching for files labeled 'contracts' is the fastest way for the user.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: C. Answer C: since the files are already labelled, just look for labels instead of keywords"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 13,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees label search is the answer.",
    "conceptSummary": "Finding labeled files quickly in Drive.",
    "correctRationale": "Because the files are already organized with Drive labels, the user can simply search by the 'contracts' label in Drive — no API scripting or admin tooling needed.",
    "optionRationales": [
      "Wrong: Calling the Drive API is needless scripting for a built-in search capability.",
      "Wrong: A keyword search on 'contracts' matches content/names, not the label; the 'modified by me' filter is unrelated.",
      "Correct: Searching for files labeled 'contracts' uses the existing labeling directly and is the quickest method.",
      "Wrong: The investigation tool is an admin security tool, not an end-user file search."
    ]
  },
  {
    "id": 12,
    "topic": "Gmail",
    "difficulty": 3,
    "question": "Your organization requires enhanced privacy and security when sending messages to banks and other financial institutions. Your organization uses Gmail, but the banks use various other email providers. You need to maximize privacy and limit access to messages sent and received between your organization and the banks. What should you do?",
    "options": [
      "A. Set up Transport Layer Security (TLS) compliance for inbound and outbound messages with a list of the banks’ email domains. Validate the TLS connections.",
      "B. Configure Sender Policy Framework (SPF) and DomainKeys Identified Mail (DKIM) authentication for your email domains.",
      "C. Enable Protect against unauthenticated emails in Gmail Safety.",
      "D. Enable confidential mode for Gmail. Instruct employees to use confidential mode when sending messages to the banks."
    ],
    "correct": 0,
    "explanation": "A TLS compliance rule for the banks' domains forces encrypted transport for mail in both directions between the organizations.",
    "discussion": [
      {
        "user": "learnfux",
        "text": "Selected Answer: A. Confidential mode restricts forward/copy/download features and sets expiration dates, but it does not guarantee end-to-end transport encryption enforcement required for external enterprise-to-enterprise regulatory compliance (and relies on manual user action for outbound messages)."
      },
      {
        "user": "pirate84",
        "text": "Selected Answer: A. Transport Layer Security (TLS) ensures that emails are encrypted in transit between your organization and the banks, thereby enhancing privacy and security. By se ting up TLS compliance and validating TLS connections for the banks' email domains, you ensure that the communication is secure and protected from interception, even if the banks use various email providers. This approach provides the highest level of privacy for sensitive financial communications."
      },
      {
        "user": "jcloud965",
        "text": "Selected Answer: D. Option A is generic and quite standard nowadays Option B is a good way to prove that the organization sent the information, but it requires that recipients take it into account, which is not guaranteed and reject unauthenticated messages. neither DKIM nor SPF encrypt the data. Option C will protect against receiving unauthenticated emails. Option D is the only way to ensure emails remain confidential, with control from the sender."
      },
      {
        "user": "erh4n",
        "text": "Selected Answer: D. TLS is not sth that you configure, its already implemented in all plans. It cant be A. SPF and DKIM configuration should be in every e mail configuration, so it doesn't bring any privacy or access limitation as mentioned in the question. Protection agains unauthenticated e mails protects only you for the received phishing e mails. Despite that D option is based on user actions, confidetial e mails the only option that brings extra privacy and access limitations."
      },
      {
        "user": "409fcc6",
        "text": "Selected Answer: A. Option A is the correct answer. Option B are SPAM protection and don't maximize privacy, Option C is a feature to enhance eMail ecurity by flagging emails that can't be authenticated but does nothing when sending, Option D is dependent on recipients supporting the restriction. Therefor it can only be A"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 12,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Majority picks TLS enforcement. D voters argue TLS is default — but the compliance rule makes it *mandatory and validated* for those domains, which default opportunistic TLS is not.",
    "conceptSummary": "Guaranteeing encrypted mail transport to specific external partners.",
    "correctRationale": "A secure transport (TLS) compliance setting can require a validated TLS connection for inbound and outbound mail to the listed bank domains, guaranteeing encryption in transit and failing delivery when it cannot be validated — directly maximizing privacy for those exchanges.",
    "optionRationales": [
      "Correct: A TLS compliance setting enforces encrypted, validated transport specifically for the banks' domains in both directions.",
      "Wrong: SPF and DKIM authenticate your sending domain; they do not encrypt content in transit or limit message access at the banks.",
      "Wrong: 'Protect against unauthenticated emails' flags inbound spoofing, not privacy of the exchange.",
      "Wrong: Confidential mode restricts forwarding/copying inside Gmail only; it does nothing for mail delivered to external bank providers."
    ]
  },
  {
    "id": 11,
    "topic": "Admin Roles & App Access",
    "difficulty": 2,
    "question": "Your company handles sensitive client data and needs to maintain a high level of security to comply with strict industry regulations. You need to allow your company’s security team to investigate potential security breaches by using the security investigation tool in the Google Admin console.\nWhat should you do?",
    "options": [
      "A. Create an activity rule that triggers email notifications to the security team whenever a high-risk security event occurs.",
      "B. Assign the User Management Admin role to the security team.",
      "C. Assign the super admin role to the security team",
      "D. Create an administrator role with Security Center access. Assign the role to the security team."
    ],
    "correct": 3,
    "explanation": "A custom admin role with Security Center privileges gives the security team investigation access under least privilege.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: D. Always following the concept of least privilege is a best practice. (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 11,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees on the custom Security Center role.",
    "conceptSummary": "Least-privilege access to the security investigation tool.",
    "correctRationale": "Security Center privileges are granted through administrator roles. A custom role containing only Security Center access lets the team run investigations without super admin or unrelated privileges.",
    "optionRationales": [
      "Wrong: Activity rules only alert on events; they do not grant the team access to investigate.",
      "Wrong: The User Management Admin role manages users and grants no Security Center access.",
      "Wrong: Super admin violates least privilege for a read/investigate-only need.",
      "Correct: A custom admin role with Security Center privileges is the least-privilege way to open the investigation tool to the team."
    ]
  },
  {
    "id": 10,
    "topic": "Chrome & Endpoints",
    "difficulty": 3,
    "question": "Your organization’s security team has published a list of vetted third-party apps and extensions that can be used by employees. All other apps are prohibited unless a business case is presented and approved. The Chrome Web Store policy applied at the top-level organization allows all apps and extensions with an admin blocklist. You need to disable any unapproved apps that have already been installed and prevent employees from installing unapproved apps. What should you do?",
    "options": [
      "A. Change the Chrome Web Store allow/block mode setting to allow all apps, admin manages blocklist, In the App access control card, block any existing web app that is not on the security team’s vetted list.",
      "B. Change the Chrome Web Store allow/block mode setting to block all apps, admin manages allowlist. Add the apps on the security team’s vetted list to the allowlist.",
      "C. Disable Extensions and Chrome packaged apps as Allowed types of apps and extensions for the top-level organizational unit. Selectively enable the appropriate extension types for each suborganization",
      "D. Disable the Chrome Web Store service for the top-level organizational unit. Enable the Chrome Web Store service for organizations that require Chrome apps and extensions."
    ],
    "correct": 1,
    "explanation": "Chrome Web Store 'block all, admin manages allowlist' enforces the vetted-apps policy while letting only approved apps/extensions be installed.",
    "discussion": [
      {
        "user": "Melodie",
        "text": "Selected Answer: B. It's B, an allowlist offers a proactive way to manage apps and extensions."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 10,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community agrees the allowlist mode is the enforceable control.",
    "conceptSummary": "Enforcing a vetted-apps-only policy in the Chrome Web Store.",
    "correctRationale": "Setting the Web Store allow/block mode to 'block all apps, admin manages allowlist' blocks every unapproved app or extension and unblocks exactly the vetted list — matching the stated policy without disabling the store.",
    "optionRationales": [
      "Wrong: 'Allow all, manage blocklist' lets any unlisted app through — the opposite of a vetted-only policy.",
      "Correct: Block-all with an admin allowlist permits only the vetted apps and prevents installing unapproved ones.",
      "Wrong: Disabling extension/app types removes functionality instead of enforcing the approved list.",
      "Wrong: Turning the Web Store service off for the top-level OU prevents use of vetted apps too."
    ]
  },
  {
    "id": 9,
    "topic": "Mail Flow & Troubleshooting",
    "difficulty": 2,
    "question": "Your organization’s users are reporting that a large volume of legitimate emails are being misidentified as spam in Gmail. You want to troubleshoot this problem while following Google-recommended practices. What should you do?",
    "options": [
      "A. Adjust the organization’s mail content compliance settings in the Admin console.",
      "B. Advise users to individually allowlist senders.",
      "C. Disable spam filtering for all users.",
      "D. Contact Google Workspace support and report a suspected system-wide spam filter malfunction."
    ],
    "correct": 0,
    "explanation": "Google's recommended first step for false-positive spam is to review and adjust the organization's mail compliance/spam settings in the Admin console.",
    "discussion": [
      {
        "user": "AsakuraYoh",
        "text": "Selected Answer: A. Best way to troubleshoot within the admin console. (3 votes)"
      },
      {
        "user": "S4mW3ll",
        "text": "Selected Answer: B. Gemini's answer: Why Option A is Wrong: Mail Content Compliance is designed for internal policy enforcement (e.g., DLP, keyword scanning), not spam management. Overriding spam filters at the content level bypasses core security controls and exposes the organization to spoofing and phishing attacks. Why Option B is Preferred: Teaching Gmail's machine learning model through user feedback (marking \"Not Spam\" or adding senders to contacts) helps calibrate the spam filter. At an administrative level, the official fix is implementing an Email Allowlist or enforcing proper SPF/..."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 9,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Site and most voters choose adjusting the compliance settings; B votes are the per-user workaround that misses the admin cause.",
    "conceptSummary": "Troubleshooting legitimate mail going to spam.",
    "correctRationale": "Mass false positives usually trace back to admin-side settings (content compliance rules, aggressive spam filters). Google recommends checking and adjusting those Admin console settings before changing user behavior or disabling protection.",
    "optionRationales": [
      "Correct: Reviewing and adjusting the organization's content compliance / spam settings is Google's recommended first step for false-positive spam.",
      "Wrong: Per-user allowlisting does not scale and ignores the admin-side cause.",
      "Wrong: Disabling spam filtering removes all protection to fix a false-positive problem.",
      "Wrong: Contacting support before checking your own misconfigured rules skips the recommended troubleshooting order."
    ]
  },
  {
    "id": 8,
    "topic": "Reports, Alerts & Investigation",
    "difficulty": 2,
    "question": "Several employees at your company received messages with links to malicious websites. The messages appear to have been sent by your company’s human resources department. You need to identify which users received the emails and prevent a recurrence of similar incidents in the future. What should you do?",
    "options": [
      "A. Search the sender’s email address by using Email Log Search. Identify the users that received the messages. Instruct them to mark them as spam in Gmail, delete the messages, and empty the trash.",
      "B. Search for the sender’s email address by using the security investigation tool. Mark the messages as phishing. Add the sender’s email address to the Blocked senders list in the Spam, Phishing and Malware setting in Gmail to automatically reject future messages.",
      "C. Collect a list of users who received the messages. Search the recipients’ email addresses in Google Vault. Export and download the malicious emails in PST file format. Add the sender’s email address to a quarantine list setting in Gmail to quarantine any future emails from the sender.",
      "D. Search for the sender’s email address by using the security investigation tool. Delete the messages. Turn on the safety options for spoofing and authentication protection in Gmail settings."
    ],
    "correct": 3,
    "explanation": "The security investigation tool finds every recipient of the spoofed HR messages and lets you delete them in one action.",
    "discussion": [
      {
        "user": "SteveSJSResearch",
        "text": "Selected Answer: D. Question is not 100% clear if the sender's email is external and only has the HR department as a fraudulent display name. If so, B will work. But if emails are actually from the internal HR address, you can't block the HR email address since it presumably is needed for legitimate internal emailing. In that (more likely the question's intent) case, spoofing and authentication protection settings will need tuning. (5 votes)"
      },
      {
        "user": "Akunator",
        "text": "Selected Answer: B. To address the phishing incident, immediately contain the damage, identify affected users, investigate the root cause, and implement preventative measures including enhanced security awareness training and technical safeguards."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 8,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Site and majority choose delete via the investigation tool; B voters stop at marking phishing, which leaves delivered copies in place.",
    "conceptSummary": "Finding and deleting malicious HR-spoof emails at scale.",
    "correctRationale": "Searching by the fake sender in the security investigation tool enumerates all affected users' copies, and the bulk 'delete messages' action removes them from every inbox — identification plus remediation in one step.",
    "optionRationales": [
      "Wrong: Email Log Search identifies recipients but cannot remove the messages.",
      "Wrong: Marking as phishing affects future delivery/labels rather than removing the copies already delivered.",
      "Wrong: Vault search finds the emails but deletion requires a separate hold/delete workflow and is not the remediation path.",
      "Correct: The security investigation tool both lists all recipients' copies and deletes them in bulk."
    ]
  },
  {
    "id": 7,
    "topic": "DLP & Classification",
    "difficulty": 3,
    "question": "Your organization has hired temporary employees to work on a sensitive internal project. You need to ensure that the sensitive project data in Google Drive is limited to only internal domain sharing. You do not want to be overly restrictive. What should you do?",
    "options": [
      "A. Configure the Drive sharing options for the domain to internal only.",
      "B. Restrict the Drive sharing options for the domain to allowlisted domains.",
      "C. Create a Drive DLP rule, and use the sensitive internal Project name as the detector.",
      "D. Turn off the Drive sharing setting from the Team dashboard."
    ],
    "correct": 2,
    "explanation": "A Drive DLP rule keyed on the project detector restricts only the sensitive project's files, avoiding an overly broad domain-wide sharing ban.",
    "discussion": [
      {
        "user": "SteveSJSResearch",
        "text": "Selected Answer: A. Don't love these choices. A should be applied to an OU that only has the temporary employees in it. OR the words of A should be to a Shared Drive for the project, not to the whole \"domain\" (3 votes)"
      },
      {
        "user": "Matias_dlb",
        "text": "Selected Answer: C. These options are not ideal. Creating an organizational unit (OU) for the temporary employees and applying custom sharing settings would be the best approach. However, for the sake of this excersise, since it specifies not to be overly restrictive, configuring the Drive sharing settings for the entire domain to internal only would not be ideal. Therefore, creating a DLP rule to track and target specific sensitive content would be the most appropriate solution in this case. (2 votes)"
      },
      {
        "user": "taka5094",
        "text": "Selected Answer: C. DLP rules allow to restrict access to specific sensitive project data, helping prevent confidential data from leaking while avoiding unnecessary restrictions. (2 votes)"
      },
      {
        "user": "bdsetacct",
        "text": "Selected Answer: C. A will affect all users and \" You do not want to be overly restrictive.\""
      },
      {
        "user": "cbrnrndo",
        "text": "Selected Answer: C. \" You do not want to be overly restrictive.\" - A is too restrictive since it impacts the entire domain from sharing externally. C is the most correct answer."
      },
      {
        "user": "409fcc6",
        "text": "Selected Answer: A. It's Option A. Option C is more complex to setup and maintain. They require careful planning and ongoing management. Furthermore, DLP might not cover all aspects o finternal domain sharing, whereas the drive sharing options to internal ensure that all data regardless of content is restricted to your organizations domain."
      },
      {
        "user": "Akunator",
        "text": "Selected Answer: A. By configuring the Drive sharing options for your domain to \"internal only,\" you ensure that sensitive project data is restricted to your organization's internal users. This prevents any external sharing while allowing your team members to collaborate freely within the organization. It strikes the right balance between maintaining security and avoiding unnecessary restrictions on collaboration."
      },
      {
        "user": "MasterPepito",
        "text": "Selected Answer: C. Opción C (Regla DLP): Cumple ambos requisitos. Se enfoca solo en los archivos identificados como \"sensitive internal project\". Aplica la acción (bloquear compartición externa) solo a esos archivos específicos. No interfiere con la capacidad de los usuarios de compartir otros archivos externamente si la política general lo permite."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 7,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Majority favors the scoped DLP rule; A voters argue simplicity but ignore the 'not overly restrictive' requirement.",
    "conceptSummary": "Restricting sharing of only the sensitive project's Drive data without blocking all external sharing.",
    "correctRationale": "The question says the data must stay internal but you must not be overly restrictive. A Drive DLP rule with a detector matching the sensitive project (e.g. the project name) blocks external sharing of just that data while normal sharing continues.",
    "optionRationales": [
      "Wrong: 'Internal only' for the whole domain blocks every user from all external sharing — far too restrictive.",
      "Wrong: Allowlisting external domains still changes sharing for every Drive file in the domain, not just the project data.",
      "Correct: A DLP rule scoped by a project detector blocks external sharing of only the sensitive project's content.",
      "Wrong: Turning off Drive sharing on a dashboard is not a per-data control and would again affect all sharing."
    ]
  },
  {
    "id": 6,
    "topic": "Gmail",
    "difficulty": 2,
    "question": "Your company distributes an internal newsletter that contains sensitive information to all employees by email. You’ve noticed unauthorized forwarding of this newsletter to external addresses, potentially leading to data leaks. To prevent this, you need to implement a solution that automatically detects and blocks such forwarding while allowing legitimate internal sharing. What should you do?",
    "options": [
      "A. Add a banner to the newsletter that warns users that external sharing is prohibited.",
      "B. Create a Gmail content compliance rule that targets the internal newsletter, identifying instances of external forwarding. Configure the rule to reject the message when such forwarding is detected",
      "C. Develop an Apps Script project by using the Gmail API to scan sent emails for the newsletter content and external recipients. Automatically revoke access for violating users.",
      "D. Create a content compliance rule to modify the newsletter subject line, adding a warning against external forwarding."
    ],
    "correct": 1,
    "explanation": "A content compliance rule that matches the newsletter's identifying content and rejects externally forwarded copies blocks leaks automatically.",
    "discussion": [
      {
        "user": "Akunator",
        "text": "Selected Answer: B. Configure Content Compliance is under Gmail compliance (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 6,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Community and site agree on the content compliance rule.",
    "conceptSummary": "Blocking unauthorized external forwarding of an internal newsletter.",
    "correctRationale": "Gmail content compliance can match messages by content (subject/body patterns unique to the newsletter) and reject deliveries to external recipients while leaving internal mail untouched — automated detection and blocking with zero user action.",
    "optionRationales": [
      "Wrong: A warning banner relies on user compliance; it detects and blocks nothing.",
      "Correct: A content compliance rule can identify newsletter content and reject external forwarding automatically.",
      "Wrong: A custom Apps Script/Gmail API scanner is a heavy, brittle build for a feature Gmail compliance already provides.",
      "Wrong: Modifying the subject line only labels the message; it does not detect or block forwarding."
    ]
  },
  {
    "id": 5,
    "topic": "Vault & Retention",
    "difficulty": 2,
    "question": "The legal department at your organization is working on a time-critical merger and acquisition (M&A) deal. They urgently require access to specific email communications from an employee who is currently on leave. The organization’s current retention policy is set to indefinite. You need to retrieve the required emails for the legal department in a manner that ensures data privacy. What should you do?",
    "options": [
      "A. Instruct the IT department to directly access and forward the relevant emails to the legal department.",
      "B. Temporarily grant the legal department access to the employee’s email account with a restricted scope that is limited to the M&A-related emails.",
      "C. Ask a colleague with delegate access to the employee's mailbox to identify and forward the relevant emails to the legal department.",
      "D. Use Google Vault to create a matter specific to the M&A deal. Search for relevant emails within the employee's mailbox. Export and share relevant emails with your legal department."
    ],
    "correct": 3,
    "explanation": "Vault lets you search the employee's mail under a legal matter and export only the relevant messages — auditable and least intrusive.",
    "discussion": [
      {
        "user": "Akunator",
        "text": "Selected Answer: D. A matter serves as a container for all data related to a specific topic, like a legal case or investigation (2 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 5,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Site and community agree the Vault matter workflow is the proper channel.",
    "conceptSummary": "Authorized legal access to an absent employee's email via Vault.",
    "correctRationale": "Creating a Vault matter for the M&A case and searching the custodian's mail produces a defensible, logged e-discovery workflow that surfaces exactly the relevant communications without handing anyone mailbox access.",
    "optionRationales": [
      "Wrong: IT staff directly browsing and forwarding mail is ad-hoc, unaudited, and exposes far more than the legal request requires.",
      "Wrong: Temporarily granting mailbox access hands the legal team the whole mailbox with no scoping or audit trail.",
      "Wrong: Relying on a delegate's manual search is unverifiable and leaks unrelated personal mail to a colleague.",
      "Correct: A Vault matter scopes the search to the M&A deal, produces an exportable result set, and keeps a full audit trail."
    ]
  },
  {
    "id": 4,
    "topic": "Users & Licensing",
    "difficulty": 2,
    "question": "A team of temporary employees left your organization after completing a shared project. Per company policy, you need to disable their Google Workspace accounts while preserving all project data and related communications in Google Vault for a minimum of two years. You want to comply with this policy while minimizing cost. What should you do?",
    "options": [
      "A. Purchase and assign Archived User licenses to the former employees.",
      "B. Transfer the former employees’ files and data to active user accounts. Delete the former employees’ Workspace accounts.",
      "C. Purchase additional user licenses and suspend the former employees’ accounts.",
      "D. Move the former employees to their own organizational unit (OU) and disable access to Google services for that OU."
    ],
    "correct": 0,
    "explanation": "Archived User (AU) licenses keep the departed users' data intact for Vault retention and reference at minimal cost while accounts are disabled.",
    "discussion": [
      {
        "user": "Akunator",
        "text": "Selected Answer: A. Assign \"Archived User\" licenses to these suspended accounts. These licenses are designed to retain data while minimizing costs compared to fully licensed accounts. (3 votes)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 4,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Unanimous — site and community choose Archived User licenses.",
    "conceptSummary": "Cheapest compliant way to retain leavers' data and disable their accounts.",
    "correctRationale": "Assigning an Archived User license preserves all user data (mail, Drive) under retention rules and keeps it searchable in Vault, while the account is disabled and the license costs far less than an active seat.",
    "optionRationales": [
      "Correct: Archived User licenses preserve all project data and communications at minimal cost with the account disabled — exactly the stated requirements.",
      "Wrong: Deleting the accounts destroys the identities; migrating data is extra work and the deleted account data is no longer held under the user context for Vault.",
      "Wrong: Buying additional active licenses to suspend accounts costs more than Archived User licenses for no benefit.",
      "Wrong: Disabling services in an OU does not disable the accounts or stop the license cost."
    ]
  },
  {
    "id": 3,
    "topic": "Domains & Resources",
    "difficulty": 2,
    "question": "Today your company signed up for Google Workspace Business Starter with an existing domain name. You want to add team members and manage their access to email and other services. However, you are unable to create new user accounts or change user settings. You need to fix this problem. What should you do?",
    "options": [
      "A. Run the Transfer tool to bring unmanaged users to your Workspace account.",
      "B. Check domain ownership in the DNS settings.",
      "C. Wait 24 hours after signing up for the features to become active.",
      "D. Upgrade to a Google Workspace Enterprise edition."
    ],
    "correct": 1,
    "explanation": "User creation fails when the domain is not yet verified/claimed in the Workspace account; verifying domain ownership unblocks provisioning.",
    "discussion": [
      {
        "user": "SteveSJSResearch",
        "text": "Selected Answer: B. https://support.google.com/a/answer/9122284 (2 votes)"
      },
      {
        "user": "airraid2010",
        "text": "Selected Answer: B. Once domain ownership is verified, you can unlock features such as the ability to create users."
      },
      {
        "user": "Akunator",
        "text": "Selected Answer: B. Verify your domain to unlock features (for business email accounts)"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 3,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": false,
    "discussionSummary": "Site and community agree the unverified domain is the blocker.",
    "conceptSummary": "Why you cannot create users right after signing up — unverified domain.",
    "correctRationale": "Google Workspace requires the domain to be verified (or the subscription to be attached to that domain) before you can provision users with addresses in it. Checking and completing domain ownership verification in DNS resolves the block.",
    "optionRationales": [
      "Wrong: The Transfer tool is for moving consumer-account users under management, unrelated to creating brand-new users.",
      "Correct: Without verified domain ownership Workspace will not let you create users in that domain — verify it in DNS.",
      "Wrong: Waiting does nothing; user creation is blocked by verification, not a propagation delay.",
      "Wrong: User creation is a basic feature available on Business Starter; no upgrade is required."
    ]
  },
  {
    "id": 2,
    "topic": "OUs & Groups",
    "difficulty": 2,
    "question": "Several employees from your finance department are collaborating on a long-term, multi-phase project. You need to create a confidential group for this project as quickly as possible. You also want to minimize management overhead. What should you do?",
    "options": [
      "A. Create a Google Group by using Google Cloud Directory Sync (GCDS) to automatically sync the members.",
      "B. Create a dynamic group and define the Department user attribute as a condition for membership with the value as the finance department.",
      "C. Create a Google Group and update the settings to allow anyone in the organization to join the group.",
      "D. Create a Google Group and appoint a group admin to manage the membership of this group."
    ],
    "correct": 3,
    "explanation": "The fastest way to stand up a confidential project group is a Google Group with an appointed group admin who controls membership.",
    "discussion": [
      {
        "user": "86590ba",
        "text": "Selected Answer: D. B is working but not the answer. Create a dynamic group and define the Department user attribute as a condition for membership with the value as the finance department. Dynamic groups are excellent for automatically managing membership based on user attributes. However, this project involves several employees from the finance department, not necessarily all of them. A dynamic group based solely on the \"finance department\" attribute would include everyone in finance, which might not be desirable for a confidential, specific project. It also might not be as quick to set up..."
      },
      {
        "user": "Jarkko666",
        "text": "Selected Answer: D. \"Several employees\" not all of them (3 votes)"
      },
      {
        "user": "airraid2010",
        "text": "Selected Answer: D. The group admin can manage the membership and permission directly. (2 votes)"
      },
      {
        "user": "cretunicolae",
        "text": "Selected Answer: D. some from the department"
      },
      {
        "user": "Akunator",
        "text": "Selected Answer: B. manage memberships based on a query of user attributes, like department or location, making it easy to manage policies and access for specific groups of users."
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 2,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Community and site agree on D; the minority B votes argue dynamic groups reduce management but miss the 'as quickly as possible' constraint.",
    "conceptSummary": "Creating a confidential project group quickly with minimal management overhead.",
    "correctRationale": "Creating a standard Google Group and appointing a group admin takes minutes and offloads membership management to that admin. A dynamic group needs an attribute-based rule (more setup, and members must already carry the Department value), and an open-anyone group is not confidential.",
    "optionRationales": [
      "Wrong: GCDS syncs users and groups from an external directory; it is heavy infrastructure for a single ad-hoc project group.",
      "Wrong: A dynamic group requires configuring a membership condition on user attributes — slower to set up and members only qualify if the attribute is populated.",
      "Wrong: Letting anyone in the organization join defeats the requirement that the group be confidential.",
      "Correct: A regular Google Group with an appointed group admin is the quickest way to create the group and delegate membership management."
    ]
  },
  {
    "id": 1,
    "topic": "Vault & Retention",
    "difficulty": 1,
    "question": "Your company is undergoing a regulatory compliance audit. As part of the audit, you are required to demonstrate that you can preserve all electronic communications related to a specific project for a potential legal discovery process. You need to configure Google Vault to accomplish this goal. What should you do?",
    "options": [
      "A. Use the security investigation report to show Vault log events.",
      "B. Use the search and export functionality to identify all relevant communications within the project timeframe.",
      "C. Create a matter and a hold on all project-related data sources such as Email, Chat, and Drive within Google Workspace.",
      "D. Create a custom retention policy for the project data. Ensure that the policy covers the required retention period."
    ],
    "correct": 2,
    "explanation": "Google Vault preserves data for legal discovery through matters and holds; a hold prevents deletion of all project-related messages and files until released.",
    "discussion": [
      {
        "user": "Akunator",
        "text": "Selected Answer: C. A matter serves as a container for all data related to a specific topic, like a legal case or investigation. (2 votes)"
      },
      {
        "user": "2084de8",
        "text": "Selected Answer: C. I took the exam today, but unfortunately, none of the questions matched the practice set you provided."
      },
      {
        "user": "e894dd9",
        "text": "Selected Answer: A. i think A is correct"
      },
      {
        "user": "airraid2010",
        "text": "Selected Answer: C. To meet the legal and compliance requirements of a regulatory audit, you must ensure that all relevant data is preserved and protected from deletion or modification. Google's 'matter' and 'hold' features are specifically designed for the purpose."
      },
      {
        "user": "Luca1003",
        "text": "Selected Answer: C. c is ok"
      }
    ],
    "source": "devin-validated",
    "sourceExam": "associate-google-workspace-administrator",
    "sourceQuestionNumber": 1,
    "isRecent": true,
    "importBatch": "examtopics-2026-10",
    "confidence": "high",
    "conflict": true,
    "discussionSummary": "Strong community and site consensus on the Vault hold; the few A votes confuse Vault audit logging with data preservation.",
    "conceptSummary": "Preserving all project communications for an audit via a Vault matter + hold.",
    "correctRationale": "A Vault matter groups the investigation, and a hold on every relevant data source (Gmail, Chat, Drive) preserves all current and future content regardless of retention rules or user deletions — exactly what a compliance audit needs to demonstrate.",
    "optionRationales": [
      "Wrong: Vault log events record admin actions inside Vault, not the preserved communications themselves.",
      "Wrong: Search and export produces a one-time copy; it does not preserve data against later deletion or edits.",
      "Correct: A matter plus a hold on all project data sources preserves every related communication for as long as the hold stands.",
      "Wrong: A retention policy changes deletion behavior globally for matching data; it cannot demonstrate that specific project communications were preserved for this audit."
    ]
  }
];
