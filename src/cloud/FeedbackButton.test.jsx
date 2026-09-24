// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import FeedbackButton from "./FeedbackButton.jsx";
import { setFeedbackContext } from "./feedback-context.js";

function fakeClient(error = null) {
  const insert = vi.fn(async () => ({ error }));
  return { insert, client: { from: vi.fn(() => ({ insert })) } };
}

function openAndType(client, user, text) {
  render(<FeedbackButton client={client} user={user} />);
  fireEvent.click(screen.getByRole("button", { name: "Feedback" }));
  fireEvent.change(screen.getByPlaceholderText(/What happened/), { target: { value: text } });
}

describe("FeedbackButton", () => {
  afterEach(() => {
    cleanup();
    setFeedbackContext({ certId: null, questionId: null });
  });

  it("sends the report with the question being studied and the user's email", async () => {
    setFeedbackContext({ certId: "gcp-pca", questionId: 42 });
    const { client, insert } = fakeClient();

    openAndType(client, { email: "me@example.com" }, "Option C should be correct");
    expect(screen.getByLabelText(/current question \(#42\)/).checked).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => expect(screen.getByText(/Thanks!/)).toBeTruthy());
    expect(client.from).toHaveBeenCalledWith("feedback");
    expect(insert.mock.calls[0][0]).toMatchObject({
      kind: "question",
      message: "Option C should be correct",
      email: "me@example.com",
      cert_id: "gcp-pca",
      question_id: 42,
    });
  });

  it("defaults to a bug report with no question outside a session", async () => {
    setFeedbackContext({ certId: "gcp-pde", questionId: null });
    const { client, insert } = fakeClient();

    openAndType(client, null, "The timer froze");
    expect(screen.queryByLabelText(/current question/)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => expect(insert).toHaveBeenCalled());
    expect(insert.mock.calls[0][0]).toMatchObject({ kind: "bug", question_id: null, email: null });
  });

  it("offers email as a fallback when sending fails", async () => {
    const { client } = fakeClient({ message: "offline" });

    openAndType(client, null, "Something broke");
    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    const link = await screen.findByText("Email it instead");
    expect(link.getAttribute("href")).toMatch(/^mailto:carleondel@gmail\.com\?subject=/);
  });
});
