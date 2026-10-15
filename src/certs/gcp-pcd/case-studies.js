// PCD case study, recovered from the ExamTopics question bank (the questions
// embed the case text verbatim; the official PDF is no longer published for
// this exam). HipLocal belonged to the previous Professional Cloud Developer
// exam guide — the current guide has no case studies.

export const CASE_STUDIES = {
  hiplocal: {
    id: "hiplocal",
    name: "HipLocal",
    officialUrl: null,
    verbatim: false,
    legacy: true,
    retiredNote:
      "HipLocal belonged to the previous Professional Cloud Developer exam guide; the current guide has no case studies.",
    context: `Company Overview
HipLocal is a community application designed to facilitate communication between people in close proximity. It is used for event planning and organizing sporting
events, and for businesses to connect with their local communities. HipLocal launched recently in a few neighborhoods in Dallas and is rapidly growing into a
global phenomenon. Its unique style of hyper-local community communication and business outreach is in demand around the world.
Executive Statement
We are the number one local community app; it's time to take our local community services global. Our venture capital investors want to see rapid growth and the
same great experience for new local and virtual communities that come online, whether their members are 10 or 10000 miles away from each other.
Solution Concept
HipLocal wants to expand their existing service, with updated functionality, in new regions to better serve their global customers. They want to hire and train a new
team to support these regions in their time zones. They will need to ensure that the application scales smoothly and provides clear uptime data.
Existing Technical Environment
HipLocal's environment is a mix of on-premises hardware and infrastructure running in Google Cloud Platform. The HipLocal team understands their application
well, but has limited experience in global scale applications. Their existing technical environment is as follows:
* Existing APIs run on Compute Engine virtual machine instances hosted in GCP.
* State is stored in a single instance MySQL database in GCP.
* Data is exported to an on-premises Teradata/Vertica data warehouse.
* Data analytics is performed in an on-premises Hadoop environment.
* The application has no logging.
* There are basic indicators of uptime; alerts are frequently fired when the APIs are unresponsive.
Business Requirements
HipLocal's investors want to expand their footprint and support the increase in demand they are seeing. Their requirements are:
* Expand availability of the application to new regions.
* Increase the number of concurrent users that can be supported.
* Ensure a consistent experience for users when they travel to different regions.
* Obtain user activity metrics to better understand how to monetize their product.
* Ensure compliance with regulations in the new regions (for example, GDPR).
* Reduce infrastructure management time and cost.
* Adopt the Google-recommended practices for cloud computing.
Technical Requirements
* The application and backend must provide usage metrics and monitoring.
* APIs require strong authentication and authorization.
* Logging must be increased, and data should be stored in a cloud analytics platform.
* Move to serverless architecture to facilitate elastic scaling.
* Provide authorized access to internal apps in a secure manner.`,
  },
};

export function getCaseStudy(id) {
  return id ? (CASE_STUDIES[id] ?? null) : null;
}
