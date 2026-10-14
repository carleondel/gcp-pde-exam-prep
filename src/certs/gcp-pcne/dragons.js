import { defineDragon } from "../../data/gamification.js";

// Topic-themed bosses. `topics` are canonical topics from domains.js.
export const DRAGONS = [
  defineDragon({
    id: "pcne_vpc_leviathan",
    name: "VPC Leviathan",
    emoji: "\uD83D\uDC0B",
    tier: 2,
    topics: ["VPC & Shared VPC", "Routing", "IP Addressing"],
    topicLabel: "VPC & Routing",
  }),
  defineDragon({
    id: "pcne_pod_wyvern",
    name: "Pod Wyvern",
    emoji: "\uD83D\uDC32",
    tier: 2,
    topics: ["GKE Networking"],
    topicLabel: "GKE Networking",
  }),
  defineDragon({
    id: "pcne_dns_sphinx",
    name: "DNS Sphinx",
    emoji: "\uD83D\uDD2E",
    tier: 2,
    topics: ["Cloud DNS", "Private Access"],
    topicLabel: "DNS & Private Access",
  }),
  defineDragon({
    id: "pcne_lb_hydra",
    name: "Load Balancer Hydra",
    emoji: "\uD83D\uDC09",
    tier: 3,
    topics: ["Load Balancing", "Cloud CDN"],
    topicLabel: "Load Balancing & CDN",
  }),
  defineDragon({
    id: "pcne_packet_wraith",
    name: "Packet Wraith",
    emoji: "\uD83D\uDC7B",
    tier: 3,
    topics: ["Monitoring & Logging", "Troubleshooting"],
    topicLabel: "Operations",
  }),
  defineDragon({
    id: "pcne_firewall_basilisk",
    name: "Firewall Basilisk",
    emoji: "\uD83D\uDC0D",
    tier: 3,
    topics: ["Firewalls", "Cloud Armor", "Cloud NAT & Egress", "Network Security"],
    topicLabel: "Network Security",
  }),
  defineDragon({
    id: "pcne_interconnect_kraken",
    name: "Interconnect Kraken",
    emoji: "\uD83D\uDC19",
    tier: 4,
    topics: [
      "Cloud Interconnect",
      "Cloud VPN",
      "Cloud Router & BGP",
      "Network Connectivity Center",
    ],
    topicLabel: "Hybrid Connectivity",
  }),
  defineDragon({
    id: "pcne_architect_phoenix",
    name: "Network Architect Phoenix",
    emoji: "\uD83D\uDD25",
    tier: 4,
    topics: ["Network Design", "IP Addressing", "Private Access"],
    topicLabel: "Network Design",
  }),
];
