// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PENDING_CODE_KEY, captureRedeemCode, loadAccess, redeemPendingCode } from "./access.js";

describe("access codes", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState(null, "", "/app/");
  });

  it("parks a ?redeem= code and removes it from the URL, keeping the rest", () => {
    window.history.replaceState(null, "", "/app/?cert=gcp-pca&redeem=df-ana-7k3q");

    expect(captureRedeemCode()).toBe("DF-ANA-7K3Q");
    expect(window.location.search).toBe("?cert=gcp-pca");
    expect(window.localStorage.getItem(PENDING_CODE_KEY)).toBe("DF-ANA-7K3Q");
  });

  it("does nothing without a code", async () => {
    const client = { rpc: vi.fn() };
    expect(captureRedeemCode()).toBeNull();
    expect(await redeemPendingCode(client)).toBeNull();
    expect(client.rpc).not.toHaveBeenCalled();
  });

  it("redeems the parked code once and reports success", async () => {
    window.localStorage.setItem(PENDING_CODE_KEY, "DF-ANA-7K3Q");
    const client = { rpc: vi.fn(async () => ({ data: [{ plan: "pro" }], error: null })) };

    const message = await redeemPendingCode(client);

    expect(client.rpc).toHaveBeenCalledWith("redeem_access_code", { p_code: "DF-ANA-7K3Q" });
    expect(message.ok).toBe(true);
    expect(window.localStorage.getItem(PENDING_CODE_KEY)).toBeNull();
  });

  it("shows the server's reason and drops a bad code", async () => {
    window.localStorage.setItem(PENDING_CODE_KEY, "DF-NOPE");
    const client = {
      rpc: vi.fn(async () => ({ error: { message: "That code has already been used" } })),
    };

    const message = await redeemPendingCode(client);

    expect(message).toEqual({ ok: false, text: "That code has already been used (DF-NOPE)." });
    expect(window.localStorage.getItem(PENDING_CODE_KEY)).toBeNull();
  });

  it("picks the best active grant and ignores expired ones", async () => {
    const rows = [
      { plan: "exam_pass", expires_at: null },
      { plan: "teams", expires_at: "2020-01-01T00:00:00Z" },
      { plan: "pro", expires_at: null },
    ];
    const eq = vi.fn(async () => ({ data: rows, error: null }));
    const client = { from: () => ({ select: () => ({ eq }) }) };

    expect(await loadAccess(client, "user-1")).toEqual({ plan: "pro", expires_at: null });
    expect(eq).toHaveBeenCalledWith("redeemed_by", "user-1");
  });
});
