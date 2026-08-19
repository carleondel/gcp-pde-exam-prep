// PCA case studies, transcribed verbatim from the official Google Cloud
// Professional Cloud Architect exam guide (v6.1) case study PDFs.
//
// The four entries with `verbatim: true` are the case studies the CURRENT
// exam guide references. The three `legacy: true` entries belong to the
// older blueprint and are kept only because the ExamTopics question bank
// still refers to them; the UI flags them so you know they are outdated.
//
// Questions reference a case study via `caseStudy: "<id>"`.

export const CASE_STUDIES = {  "altostrat-media": {
    id: "altostrat-media",
    name: "Altostrat Media",
    officialUrl:
      "https://services.google.com/fh/files/misc/v6.1_pca_altostrat_media_case_study_english.pdf",
    verbatim: true,
    legacy: false,
    context: `Company Overview

Altostrat is a prominent player in the media industry, with an extensive collection of audio and
video content that comprises podcasts, interviews, news broadcasts, and documentaries. Their
success in delivering premium content to a diverse audience requires a content management
system that can keep pace with the dynamic media landscape.

Solution Concept

Altostrat seeks to modernize its content management and user engagement strategies using
Google Cloud's generative AI. They want a platform that empowers customers with
personalized recommendations, natural language interactions, and seamless self-service
support. Simultaneously, they want to drive revenue growth through dynamic pricing, targeted
marketing, and personalized product suggestions.

The seamless integration of AI-powered tools into their existing Google Cloud environment will
enable Altostrat to efficiently manage their vast media library, enhance user experiences, and
unlock new revenue streams. Google Cloud’s generative AI will solidify their leadership in the
media industry.

Existing Technical Environment

Altostrat's content management and delivery platform leverages GKE for scalability and high
availability, essential for handling their vast media library. Their extensive media library, spanning
various documents, audio and video formats, is stored in Cloud Storage. To gain valuable
insights into user behavior, content consumption patterns, and audience demographics,
Altostrat leverages BigQuery as their primary data warehouse. Additionally, they use Cloud Run
functions for serverless execution of event-driven tasks such as video transcoding, metadata
extraction, and personalized content recommendations.

While Altostrat has made significant strides in cloud adoption, they also maintain some legacy
on-premises systems for specific workflows like content ingestion and archival. These systems
are slated for modernization and migration to Google Cloud in the near future. User
management and authentication are currently handled through a combination of Google
Identity and third-party identity providers. For monitoring and observability, Altostrat relies on a
mix of native Google Cloud tools like Cloud Monitoring and open-source solutions like
Prometheus, with alerts primarily delivered via email notifications.

Business Requirements

● Accelerate and enhance the reliability of operational workflows across all environments.
[Google Cloud + On-premises]

● Simplify infrastructure management for rapid application deployment.

● Optimize cloud storage costs while maintaining high availability and scalability for media
content.

● Enable natural language interaction with the platform with 24/7 user support.

● Automatically generate concise summaries of media content.

● Extract rich metadata from media assets using NLP and computer vision.

● Detect and filter inappropriate content.

● Analyze media content to identify trends and extract insights.

● Inform content strategy and decision-making with data.

Technical Requirements

● Modernize CI/CD for containerized deployments with a centralized management
platform.

● Secure, high-performance hybrid cloud connectivity for data ingestion.

Altostrat Media Case Study 2

● Provide scalable, performant kubernetes environments both on-premises and in the
cloud.

● Optimize cloud storage costs for growing media volumes.

● Design AI-powered detection of harmful content.

● Ensure that AI systems are auditable and their decisions can be explained

● Leverage LLMs and conversational AI for personalized experiences and content virality.

● Develop advanced chatbots with natural language understanding to provide
personalized assistance.

● Automated summarization for diverse media.

Executive Statement

At Altostrat, we are embracing the next frontier of artificial intelligence to revolutionize our
content strategy. By harnessing the power of generative AI, we will create an unparalleled user
experience by empowering our audience with intelligent tools for content discovery,
personalized recommendations, and seamless interaction. Reliability and cost management
are our top priorities. This strategic initiative will deepen engagement, foster customer loyalty,
and unlock new revenue streams through targeted marketing and tailored content offerings.
We see a future where AI-driven innovation is central to our business, leading to greater
success for our company and delivering exceptional value to our customers.

Altostrat Media Case Study 3`,
  },
  "cymbal-retail": {
    id: "cymbal-retail",
    name: "Cymbal Retail",
    officialUrl:
      "https://services.google.com/fh/files/misc/v6.1_pca_cymbal_retail_case_study_english.pdf",
    verbatim: true,
    legacy: false,
    context: `Company Overview

Cymbal is an online retailer experiencing significant growth. The retailer specializes in a large
assortment of products spanning several retail sub-verticals, which makes managing their
extensive product catalog a constant challenge.

Solution Concept

Cymbal wants to modernize its operations and enhance the customer experience in three core
areas:

● Catalog and Content Enrichment: Cymbal wants to automate and improve the
accuracy of their product catalog by utilizing gen AI to generate product attributes,
descriptions, and images from supplier-provided information. This solution will
streamline their catalog management, reduce manual effort and errors, and ensure
information is consistent across all their sales channels.

● Conversational Commerce with Product Discovery: To enhance customer
engagement and drive sales conversion, Cymbal wants to implement a Conversational
Commerce solution. This solution will involve integrating AI-powered virtual agents into
their website and mobile app to provide customers with a personalized and intuitive
shopping experience through natural language conversations. These agents will utilize
Google Cloud's Discovery AI to process user requests and retrieve the most relevant
products based on each customer's needs and preferences, creating a more engaging
and satisfying shopping journey.

● Technical Stack Modernization: To streamline operations and reduce costs around
manual processes, data transfer, error handling and remediation, Cymbal wants to
modernize their technical stack with cloud-based infrastructure, secure and efficient
data handling, 3rd party integrations, and proactive monitoring and security.

Existing Technical Environment

Cymbal currently relies on the following environment:

● A mix of on-premises and cloud-based systems.
● A variety of databases, including MySQL, Microsoft SQL Server, Redis, and MongoDB, to
store and manage its vast product catalog and customer data.
● Kubernetes clusters to run containerized applications.
● Legacy file-based integrations with on-premises systems, including SFTP file transfers,
ETL batch processing.
● A custom-built web application which allows customers to browse the product catalog
by querying the relational databases for names and categories of products.
● An IVR (Interactive Voice Response) system to handle initial customer calls and route
them to the appropriate departments or agents.
● Call center agents who receive transferred calls from the IVR system and manually enter
orders into the system when a customer can’t complete a transaction on their own.
● Various open source tools for monitoring such as Grafana, Nagios, and Elastic.

The current technical environment has encountered significant challenges: manual processes
are time-consuming and error-prone, data silos limit a unified view of the customer journey,
and integrating new technologies is difficult.

Business Requirements

Cymbal has outlined these key business requirements for the gen AI solution:

● Automate Product Catalog Enrichment: Reduce manual effort, minimize errors, and
ensure accuracy and consistency across the product catalog.

● Improve Product Discoverability: Enhance search relevance and enable customers to
find products more efficiently.

● Increase Customer Engagement: Create a more interactive and personalized
shopping experience to improve customer satisfaction and potentially reduce product
returns.

● Drive Sales Conversion: Provide a more intuitive and helpful shopping experience to
improve sales conversion rates and drive revenue growth.

● Reduce costs: Reduce call center staffing costs and data-center hosting costs.
Cymbal Retail Case Study 2

Technical Requirements

● Attribute Generation: Accurately derive relevant product attributes from various
supplier data, including titles, descriptions, and images, ensuring the attributes align
with the product category and Cymbal's existing catalog structure.

● Image Generation and Enhancement: Generate different product image variations
from a base image (e.g., showcasing various colors). It should also support background
changes, product color adjustments, and the addition of text overlays.

● Automate Product Discovery: Process customer requests expressed in natural
language and return highly relevant product results.

● Scalability and Performance: The solution must handle Cymbal's extensive product
catalog and accommodate their anticipated growth without compromising
performance or user experience.

● Human-in-the-Loop (HITL) Review: Provide a user interface (UI) for associates to
review and manage gen AI-generated content, allowing them to approve, reject, or
modify suggestions before updating the product catalog.

● Data Security and Compliance: Ensure all customer data, including product
information and interactions with virtual agents, are handled securely and comply with
relevant industry regulations.

Cymbal Retail Case Study 3

Executive Statement

By implementing Google Cloud's Generative AI for Digital Commerce solutions, Cymbal can
transform its online retail operations to improve efficiency, enhance customer experience, and
drive revenue growth. Key benefits for Cymbal include:

● Reduced operational costs through automation of catalog management tasks.
● Increased efficiency and speed in onboarding new products and updating existing
ones.
● Improved accuracy and consistency of product information across all sales channels.
● A more engaging and personalized shopping experience that caters to modern
customer preferences for conversational commerce.
● Enhanced product discoverability leading to higher conversion rates and increased
sales.

This strategic investment in generative AI will position Cymbal to remain competitive and thrive
in the rapidly evolving landscape of online retail.

Cymbal Retail Case Study 4`,
  },
  "ehr-healthcare": {
    id: "ehr-healthcare",
    name: "EHR Healthcare",
    officialUrl:
      "https://services.google.com/fh/files/misc/v6.1_pca_ehr_healthcare_case_study_english.pdf",
    verbatim: true,
    legacy: false,
    context: `Company Overview

EHR Healthcare is a leading provider of electronic health record software to the medical
industry. EHR Healthcare provides their software as a service to multi-national medical offices,
hospitals, and insurance providers.

Solution Concept

Due to rapid changes in the healthcare and insurance industry, EHR Healthcare’s business has
been growing exponentially year over year. They need to be able to scale their environment,
adapt their disaster recovery plan, and roll out new continuous deployment capabilities to
update their software at a fast pace. Google Cloud has been chosen to replace their current
colocation facilities.

Existing Technical Environment

EHR’s software is currently hosted in multiple colocation facilities. The lease on one of the data
centers is about to expire.

Customer-facing applications are web-based, and many have recently been containerized to
run on a group of Kubernetes clusters. Data is stored in a mixture of relational and NoSQL
databases (MySQL, MS SQL Server, Redis, and MongoDB).

EHR is hosting several legacy file- and API-based integrations with insurance providers
on-premises. These systems are scheduled to be replaced over the next several years. There is
no plan to upgrade or move these systems at the current time.

Users are managed via Microsoft Active Directory. Monitoring is currently being done via
various open source tools. Alerts are sent via email and are often ignored.

Business Requirements

● On-board new insurance providers as quickly as possible.
● Provide a minimum 99.9% availability for all customer-facing systems.
● Provide centralized visibility and proactive action on system performance and usage.
● Increase ability to provide insights into healthcare trends.
● Reduce latency to all customers.
● Maintain regulatory compliance.
● Decrease infrastructure administration costs.
● Make predictions and generate reports on industry trends based on provider data.

Technical Requirements

● Maintain legacy interfaces to insurance providers with connectivity to both on-premises
systems and cloud providers.
● Provide a consistent way to manage customer-facing applications that are
container-based.
● Provide a secure and high-performance connection between on-premises systems and
Google Cloud.
● Provide consistent logging, log retention, monitoring, and alerting capabilities.
● Maintain and manage multiple container-based environments.
● Dynamically scale and provision new environments.
● Create interfaces to ingest and process data from new providers.

Executive Statement

Our on-premises strategy has worked for years but has required a major investment of time
and money in training our team on distinctly different systems, managing similar but separate
environments, and responding to outages. Many of these outages have been a result of
misconfigured systems, inadequate capacity to manage spikes in traffic, and inconsistent
monitoring practices. We want to use Google Cloud to leverage a scalable, resilient platform
that can span multiple environments seamlessly and provide a consistent and stable user
experience that positions us for future growth.

EHR Healthcare Case Study 2`,
  },
  "knightmotives-automotive": {
    id: "knightmotives-automotive",
    name: "KnightMotives Automotive",
    officialUrl:
      "https://services.google.com/fh/files/misc/v6.1_pca_knightmotives_automotive_case_study_english.pdf",
    verbatim: true,
    legacy: false,
    context: `Company Overview

KnightMotives is a car manufacturer specializing in autonomous, self-driving vehicles, including
Battery Electric Vehicles (BEVs), hybrids, and traditional internal combustion engine (ICE)
vehicles. While KnightMotives has made strides with the in-vehicle experience in their BEV fleet,
the hybrid and ICE vehicles have yet to implement these new systems and are viewed poorly by
critics and drivers. The lack of modern in-vehicle technology in hybrid and ICE vehicles has
resulted in declining sales and customer satisfaction.

KnightMotives wants to modernize the consumer experience across all vehicles within five
years. Artificial Intelligence offers a unique opportunity to revolutionize the in-vehicle
experience, as well as the shopping, buying, and service/maintenance experience. Investment
in this new technology will require a shift in financial priorities on a global scale.

KnightMotives also wants to improve their online ordering system, which is unreliable. Systems
for customers to build their vehicle online for acquisition through a dealer are not delivering the
data or reliability that dealers need, causing a strain in the relationship between KnightMotives
and dealers. Service technicians and sales staff need better tooling to enhance dealer
successes, including built-to-order vehicles.

Solution Concept

KnightMotives wants to shift from manufacturing cars to creating a complete and compelling
"automotive experience." Their strategy prioritizes delivering a consistent experience across all
models, developing AI-powered features, generating new revenue from data monetization,
adopting a digital focus to differentiate their brand from competitors, and developing better
tools for mechanics and salespeople.

Existing Technical Environment

KnightMotives's IT is largely on-premises with some applications on major cloud platforms.
Their supply chain runs on an outdated mainframe, and Enterprise Resource Planning (ERP) is
also outdated, making new promotions and dealer discounts difficult to implement. Dealers
have no budget for new equipment. There is fragmentation across vehicles with multiple code
bases, and significant technical debt from supporting backwards compatibility. Network
connectivity to manufacturing plants and vehicle connectivity in rural areas are challenges.

Business Requirements

Key business requirements include fostering a personalized relationship with the driver and
delivering a cohesive experience across all models. Creating a better build-to-order model will
reduce time on the lot and provide transparency for both dealers and customers. Additionally,
KnightMotives seeks to monetize corporate data to finance new technology investments, as
their current AI infrastructure is obsolete and corporate data remains siloed. Security is a
paramount concern due to past data breaches. Adherence to European Union (EU) data
protection regulations, especially for emerging autonomous platforms, is critical.

KnightMotives plans to make significant investments in fully autonomous driving capabilities,
with initial implementation targeting regions with favorable regulatory environments.
Prioritizing employee upskilling, attracting top-tier talent, and fostering better communication
between business and technical teams are also critical objectives.

Technical Requirements

● Modernizing the in-vehicle experience includes developing a consistent user
experience (UX) that seamlessly integrates AI-powered features across all models,
updating in-vehicle hardware and software in legacy models to support new UX
features and AI capabilities, and ensuring reliable network connectivity, especially in
rural areas, to support real-time AI features and data transmission.
● Network upgrades are necessary to support increased data traffic and improve
connectivity between plants and headquarters.
● IT infrastructure modernization requires adopting a hybrid cloud strategy to leverage
the benefits of both on-premises and cloud infrastructure, and gradually modernizing
or replacing legacy systems to improve efficiency and agility.
KnightMotives Automotive Case Study 2

● Autonomous vehicle development and testing requires investing in cutting-edge AI
and machine learning technologies, building a robust simulation environment, and
ensuring compliance with evolving regulations related to autonomous vehicles.
● Data monetization and insights requires implementing a robust data management
platform, strict data security and privacy measures, and a scalable AI/ML infrastructure.
● Increased focus on security and risk management involves implementing a
comprehensive security framework to protect against cyber threats and data breaches,
developing an incident response plan, and providing security awareness training to
employees.
● Providing a delightful experience for dealers and customers requires improving the
online build-to-order system; developing modern dealer tools to streamline dealer
operations, including sales, service, and inventory management; and implementing a
comprehensive Customer Relationship Management (CRM) system to track customer
interactions, personalize experiences, and improve customer satisfaction.

Executive Statement
KnightMotives is committed to enhancing safety and saving lives by leveraging an extensive
body of data—encompassing driving, road conditions, behavioral studies, and crash safety
statistics—to create compelling digital experiences for drivers. Our AI consistently outperforms
national safety statistics, ensuring the unique and coveted KnightMotives experience is aligned
across all our vehicle models.

Michael Knight, KnightMotives CEO

KnightMotives Automotive Case Study 3`,
  },
  // Older blueprint. Still referenced by the ExamTopics question bank, but
  // no longer part of the current exam guide.
  "helicopter-racing-league": {
    id: "helicopter-racing-league",
    name: "Helicopter Racing League",
    officialUrl:
      "https://services.google.com/fh/files/blogs/master_case_study_helicopter_racing_league.pdf",
    verbatim: false,
    legacy: true,
    context: null,
  },
  "mountkirk-games": {
    id: "mountkirk-games",
    name: "Mountkirk Games",
    officialUrl:
      "https://services.google.com/fh/files/blogs/master_case_study_mountkirk_games.pdf",
    verbatim: false,
    legacy: true,
    context: null,
  },
  "terramearth": {
    id: "terramearth",
    name: "TerramEarth",
    officialUrl:
      "https://services.google.com/fh/files/blogs/master_case_study_terramearth.pdf",
    verbatim: false,
    legacy: true,
    context: null,
  },
};

export function getCaseStudy(id) {
  return id ? (CASE_STUDIES[id] ?? null) : null;
}
