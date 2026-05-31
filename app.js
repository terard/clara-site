const typedResponse = document.querySelector("#typed-response");
const fullResponse = "I can read GUIDEcx, but I will not call that competitive intelligence yet. One vendor mostly reveals that vendor's roadmap and reviewer mix. Who are we comparing it against?";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typedResponse && !prefersReducedMotion) {
  typedResponse.textContent = "";
  let index = 0;
  const typeNext = () => {
    typedResponse.textContent = fullResponse.slice(0, index);
    index += 1;
    if (index <= fullResponse.length) {
      window.setTimeout(typeNext, 22);
    }
  };
  typeNext();
}

const demoStates = {
  gate: {
    kicker: "Angle gate",
    heading: "Clara asks what you are really trying to prove.",
    conversation: [
      ["User", "Summarize GUIDEcx reviews."],
      ["Clara", "One vendor mostly reveals that vendor's roadmap and reviewer mix. Which category, segment, competitor set, wedge, belief, and decision should I test?"]
    ],
    outputLabel: "Minimum viable angle",
    outputValue: "Category + segment + competitors + decision"
  },
  source: {
    kicker: "Source health",
    heading: "Clara separates source coverage from source confidence.",
    conversation: [
      ["User", "Use public reviews and practitioner threads."],
      ["Clara", "I found usable Rocketlane, GUIDEcx, and Dock material, but the source set is moderate rather than strong. Review campaigns and dynamic pages can distort the read."]
    ],
    outputLabel: "Confidence call",
    outputValue: "Moderate: enough for a hypothesis, not a final bet"
  },
  map: {
    kicker: "White-space map",
    heading: "Clara names the opening that repeats across vendors.",
    conversation: [
      ["User", "What is the wedge?"],
      ["Clara", "Shared visibility is table stakes. The opening is customer-action recovery plus CRM truth: no more dead portals, no more manual risk updates."]
    ],
    outputLabel: "Recommended wedge",
    outputValue: "Recover customer action and sync go-live truth"
  }
};

const tabs = [...document.querySelectorAll(".demo-tab")];
const panel = document.querySelector("#demo-panel");
const kicker = document.querySelector("#demo-kicker");
const heading = document.querySelector("#demo-heading");
const conversation = document.querySelector("#demo-conversation");
const output = document.querySelector("#demo-output");

const renderDemo = (key) => {
  const state = demoStates[key];
  if (!state || !panel || !kicker || !heading || !conversation || !output) return;

  tabs.forEach((tab) => {
    const isActive = tab.dataset.demo === key;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  kicker.textContent = state.kicker;
  heading.textContent = state.heading;
  conversation.innerHTML = state.conversation
    .map(([speaker, text]) => `<p><strong>${speaker}</strong> ${text}</p>`)
    .join("");
  output.innerHTML = `<span>${state.outputLabel}</span><strong>${state.outputValue}</strong>`;
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => renderDemo(tab.dataset.demo));
});

const revealItems = [...document.querySelectorAll(".reveal")];

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => observer.observe(item));
}
