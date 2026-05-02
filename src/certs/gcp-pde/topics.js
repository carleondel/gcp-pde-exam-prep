import { QUESTIONS } from "./questions.js";

export const TOPICS = [...new Set(QUESTIONS.map(q => q.topic))];
