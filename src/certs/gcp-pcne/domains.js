// Mapping from raw question topics → canonical topics → 6 PCNE exam domains
//
// Domain names and weights follow the CURRENT official Professional Cloud
// Network Engineer exam guide (042426 PDF): 21 / 20 / 16 / 16 / 14 / 13.
// Note: an older v2.6 blueprint (24 / 19 / 16 / 15 / 12 / 14) is still
// circulating — do not use it.

export const TOPIC_MAP = {
  // Domain 1 — Designing and planning a Google Cloud VPC network
  "Network Design": "Network Design",
  "IP Addressing": "IP Addressing",
  "Private Access": "Private Access",

  // Domain 2 — Implementing a VPC network
  "VPC & Shared VPC": "VPC & Shared VPC",
  "VPC Peering": "VPC & Shared VPC",
  "Shared VPC": "VPC & Shared VPC",
  Routing: "Routing",
  "GKE Networking": "GKE Networking",

  // Domain 3 — Configuring managed network services
  "Load Balancing": "Load Balancing",
  "Cloud CDN": "Cloud CDN",
  CDN: "Cloud CDN",
  "Cloud DNS": "Cloud DNS",
  DNS: "Cloud DNS",

  // Domain 4 — Configuring and implementing hybrid and multicloud interconnectivity
  "Cloud Interconnect": "Cloud Interconnect",
  Interconnect: "Cloud Interconnect",
  "Cloud VPN": "Cloud VPN",
  VPN: "Cloud VPN",
  "Cloud Router & BGP": "Cloud Router & BGP",
  "Cloud Router": "Cloud Router & BGP",
  "Network Connectivity Center": "Network Connectivity Center",
  NCC: "Network Connectivity Center",

  // Domain 5 — Managing, monitoring, and troubleshooting network operations
  "Monitoring & Logging": "Monitoring & Logging",
  Troubleshooting: "Troubleshooting",

  // Domain 6 — Configuring, implementing and managing network security
  Firewalls: "Firewalls",
  Firewall: "Firewalls",
  "Cloud Armor": "Cloud Armor",
  "Cloud NAT & Egress": "Cloud NAT & Egress",
  "Cloud NAT": "Cloud NAT & Egress",
  "Network Security": "Network Security",
};

export const EXAM_DOMAINS = [
  {
    id: 1,
    name: "Designing and planning a Google Cloud VPC network",
    short: "D1 Design",
    weight: 21,
    topics: ["Network Design", "IP Addressing", "Private Access"],
  },
  {
    id: 2,
    name: "Implementing a VPC network",
    short: "D2 VPC",
    weight: 20,
    topics: ["VPC & Shared VPC", "Routing", "GKE Networking"],
  },
  {
    id: 3,
    name: "Configuring managed network services",
    short: "D3 Services",
    weight: 16,
    topics: ["Load Balancing", "Cloud CDN", "Cloud DNS"],
  },
  {
    id: 4,
    name: "Configuring and implementing hybrid and multicloud network interconnectivity",
    short: "D4 Hybrid",
    weight: 16,
    topics: [
      "Cloud Interconnect",
      "Cloud VPN",
      "Cloud Router & BGP",
      "Network Connectivity Center",
    ],
  },
  {
    id: 5,
    name: "Managing, monitoring, and troubleshooting network operations",
    short: "D5 Operations",
    weight: 14,
    topics: ["Monitoring & Logging", "Troubleshooting"],
  },
  {
    id: 6,
    name: "Configuring, implementing and managing a cloud network security solution",
    short: "D6 Security",
    weight: 13,
    topics: ["Firewalls", "Cloud Armor", "Cloud NAT & Egress", "Network Security"],
  },
];
