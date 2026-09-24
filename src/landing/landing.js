const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const CONTACT = "carleondel@gmail.com";

const form = document.querySelector("[data-waitlist]");
const planSelect = form?.querySelector("select[name=plan]");
const status = form?.querySelector("[data-status]");

// Plan buttons pre-select the plan and jump to the early-bird form.
document.querySelectorAll("[data-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    if (planSelect) planSelect.value = button.dataset.plan;
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
    form?.querySelector("input[type=email]")?.focus({ preventScroll: true });
  });
});

function show(message, ok) {
  status.textContent = message;
  status.dataset.ok = String(ok);
}

async function join(email, plan) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ email, plan, source: "landing-pricing" }),
  });
  // 409: already on the list, which is a success from the visitor's side.
  if (!response.ok && response.status !== 409) throw new Error(String(response.status));
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = form.email.value.trim();
  const plan = planSelect.value;
  const button = form.querySelector("button[type=submit]");
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    window.location.href = `mailto:${CONTACT}?subject=${encodeURIComponent(`DataForge early-bird: ${plan}`)}`;
    return;
  }
  button.disabled = true;
  try {
    await join(email, plan);
    form.reset();
    show("You're on the list. We'll email you before paid plans launch.", true);
  } catch {
    show(`Something went wrong. Email ${CONTACT} and we'll add you.`, false);
  } finally {
    button.disabled = false;
  }
});
