/**
 * What the user is looking at, so a feedback report can say which question
 * it is about. The app writes it as the screen changes; the feedback dialog
 * reads it when opened. A plain module value rather than React state: the
 * dialog lives outside the app tree and nothing needs to re-render on it.
 */
let current = { certId: null, questionId: null };

export function setFeedbackContext(context) {
  current = { ...current, ...context };
}

export function getFeedbackContext() {
  return current;
}
