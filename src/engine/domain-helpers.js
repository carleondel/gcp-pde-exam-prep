export function createDomainHelpers({ topicMap, examDomains }) {
  function getCanonicalTopic(topic) {
    return topicMap[topic] || topic;
  }

  function getDomainForTopic(canonicalTopic) {
    return examDomains.find((d) => d.topics.includes(canonicalTopic)) || null;
  }

  function computeDomainStats(topicHistory) {
    const byCanonical = {};
    for (const [topic, entries] of Object.entries(topicHistory)) {
      const canonical = getCanonicalTopic(topic);
      if (!byCanonical[canonical]) byCanonical[canonical] = { correct: 0, total: 0 };
      for (const e of entries) {
        byCanonical[canonical].total += 1;
        if (e.correct) byCanonical[canonical].correct += 1;
      }
    }

    return examDomains.map((domain) => {
      let correct = 0;
      let total = 0;
      for (const t of domain.topics) {
        if (byCanonical[t]) {
          correct += byCanonical[t].correct;
          total += byCanonical[t].total;
        }
      }
      const accuracy = total >= 10 ? Math.round((correct / total) * 100) : null;
      return { ...domain, correct, total, accuracy };
    });
  }

  function computeCanonicalTopicStats(topicHistory) {
    const byCanonical = {};
    for (const [topic, entries] of Object.entries(topicHistory)) {
      const canonical = getCanonicalTopic(topic);
      if (!byCanonical[canonical]) byCanonical[canonical] = { correct: 0, total: 0 };
      for (const e of entries) {
        byCanonical[canonical].total += 1;
        if (e.correct) byCanonical[canonical].correct += 1;
      }
    }

    return examDomains.flatMap((domain) =>
      domain.topics.map((topic) => {
        const stats = byCanonical[topic] || { correct: 0, total: 0 };
        const accuracy = stats.total >= 10 ? Math.round((stats.correct / stats.total) * 100) : null;
        return { topic, domainId: domain.id, ...stats, accuracy };
      }),
    );
  }

  return {
    getCanonicalTopic,
    getDomainForTopic,
    computeDomainStats,
    computeCanonicalTopicStats,
  };
}

export function getWeakestDomain(domainStats) {
  const candidates = domainStats.filter((d) => d.total >= 10 && d.accuracy !== null && d.accuracy < 70);
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => a.accuracy - b.accuracy || b.weight - a.weight);
  return candidates[0];
}
