import { describe, expect, it } from "vitest";

import { createDomainHelpers } from "../engine/domain-helpers.js";
import { CERT_LIST, CERTS, DEFAULT_CERT_ID, getActiveCert, isKnownCertId } from "./index.js";

describe("cert registry", () => {
  it("registers every cert under its own id", () => {
    for (const [id, cert] of Object.entries(CERTS)) {
      expect(cert.id).toBe(id);
    }
  });

  it("has a default that actually exists", () => {
    expect(CERTS[DEFAULT_CERT_ID]).toBeDefined();
  });

  it("recognises registered ids and rejects everything else", () => {
    expect(isKnownCertId(DEFAULT_CERT_ID)).toBe(true);
    expect(isKnownCertId("not-a-cert")).toBe(false);
    expect(isKnownCertId("")).toBe(false);
    expect(isKnownCertId(null)).toBe(false);
    expect(isKnownCertId(undefined)).toBe(false);
  });

  it("falls back to the default for an unknown id", () => {
    expect(getActiveCert("not-a-cert").id).toBe(DEFAULT_CERT_ID);
    expect(getActiveCert(undefined).id).toBe(DEFAULT_CERT_ID);
  });
});

describe.each(CERT_LIST.map((cert) => [cert.id, cert]))("%s manifest", (id, cert) => {
  it("carries everything the app reads", () => {
    for (const field of ["name", "short", "tagline", "brand", "logoPath", "disclaimer"]) {
      expect(cert[field], field).toBeTruthy();
    }
    expect(typeof cert.loadQuestions).toBe("function");
    expect(cert.passPercent).toBeGreaterThan(0);
    expect(cert.passPercent).toBeLessThanOrEqual(100);
    expect(cert.mock.count).toBeGreaterThan(0);
    expect(cert.mock.durationSec).toBeGreaterThan(0);
  });

  it("uses an ISO dump date when it declares one", () => {
    if (cert.questionsDumpedAt !== undefined) {
      expect(cert.questionsDumpedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("has domain weights that add up to 100", () => {
    const total = cert.examDomains.reduce((sum, domain) => sum + domain.weight, 0);
    expect(total).toBeCloseTo(100, 5);
  });

  it("gives every domain a unique id and at least one topic", () => {
    const ids = cert.examDomains.map((domain) => domain.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const domain of cert.examDomains) {
      expect(domain.topics.length, domain.short).toBeGreaterThan(0);
    }
  });

  it("maps every canonical topic to exactly one domain", () => {
    const canonicals = [...new Set(Object.values(cert.topicMap))];
    for (const canonical of canonicals) {
      const owners = cert.examDomains.filter((domain) => domain.topics.includes(canonical));
      expect(owners.length, `${canonical} is owned by ${owners.length} domains`).toBe(1);
    }
  });
});

describe.each(CERT_LIST.map((cert) => [cert.id, cert]))("%s question bank", (id, cert) => {
  it("loads and is not empty", async () => {
    const { QUESTIONS } = await cert.loadQuestions();
    expect(Array.isArray(QUESTIONS)).toBe(true);
    expect(QUESTIONS.length).toBeGreaterThan(0);
  });

  it("has no duplicate question ids", async () => {
    const { QUESTIONS } = await cert.loadQuestions();
    const ids = QUESTIONS.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps every correct index inside the options", async () => {
    const { QUESTIONS } = await cert.loadQuestions();
    const broken = QUESTIONS.filter((question) => {
      const indexes = Array.isArray(question.correct) ? question.correct : [question.correct];
      return indexes.some((index) => !Number.isInteger(index) || !question.options[index]);
    });
    expect(broken.map((question) => question.id)).toEqual([]);
  });

  it("maps every question topic to a known domain", async () => {
    const { QUESTIONS } = await cert.loadQuestions();
    const { getCanonicalTopic } = createDomainHelpers(cert);
    const orphans = QUESTIONS.filter((question) => {
      const canonical = getCanonicalTopic(question.topic);
      return !cert.examDomains.some((domain) => domain.topics.includes(canonical));
    });
    expect(orphans.map((question) => question.topic)).toEqual([]);
  });

  it("points every caseStudy at one that exists", async () => {
    const { QUESTIONS } = await cert.loadQuestions();
    const missing = QUESTIONS.filter(
      (question) => question.caseStudy && !cert.caseStudies?.[question.caseStudy],
    );
    expect(missing.map((question) => question.caseStudy)).toEqual([]);
  });

  it("gives each option a rationale when it provides them at all", async () => {
    const { QUESTIONS } = await cert.loadQuestions();
    const mismatched = QUESTIONS.filter(
      (question) =>
        question.optionRationales?.length &&
        question.optionRationales.length !== question.options.length,
    );
    expect(mismatched.map((question) => question.id)).toEqual([]);
  });

  // The platinum requires the whole achievement set, so an achievement that
  // cannot be earned on one cert makes that cert's platinum impossible.
  // "Full Spectrum" needs 80% in every domain, which needs enough questions
  // in every domain for its accuracy to be reported at all.
  it("has enough questions per domain for Full Spectrum to be reachable", async () => {
    const { QUESTIONS } = await cert.loadQuestions();
    const { getCanonicalTopic } = createDomainHelpers(cert);

    const starved = cert.examDomains.filter((domain) => {
      const count = QUESTIONS.filter((question) =>
        domain.topics.includes(getCanonicalTopic(question.topic)),
      ).length;
      return count < 10;
    });

    expect(starved.map((domain) => domain.short)).toEqual([]);
  });
});
