// Stable selectors for text that can be customized independently on each invitation.
export const editableTextSelectors = {
  invitationTitle: ".section_two .title-big span",
  invitationSubtitle: ".section_two .headig_text > p",
  invitationMessage: ".section_two > .text_message",
  announcement: ".section_two .titel_thong-bao",
  groomFamilyLabel: ".item_cha-me:first-child > span:nth-child(1)",
  groomFather: ".item_cha-me:first-child > span:nth-child(2)",
  groomMother: ".item_cha-me:first-child > span:nth-child(3)",
  groomFamilyAddress: ".item_cha-me:first-child > span:nth-child(4)",
  brideFamilyLabel: ".item_cha-me:last-child > span:nth-child(1)",
  brideFather: ".item_cha-me:last-child > span:nth-child(2)",
  brideMother: ".item_cha-me:last-child > span:nth-child(3)",
  brideFamilyAddress: ".item_cha-me:last-child > span:nth-child(4)",
  groomRole: ".content_dau-re .content_item:first-child .item-text",
  groomName: ".content_dau-re .content_item:first-child h3",
  brideRole: ".content_dau-re .content_item:last-child .item-text",
  brideName: ".content_dau-re .content_item:last-child h3",
  familyMessage: ".section_three > .text_message",
  detailsTitle: ".section_four > .title-big span",
  ceremonyText: ".date-top > p:first-child",
  countdownTitle: ".countdown-title",
  venueTitle: ".section_five > .title-big span",
  timelineTitle: "#lcln-timeline .lcln-title",
  timelineTime1: ".lcln-item:nth-child(1) .lcln-time",
  timelineEvent1: ".lcln-item:nth-child(1) .lcln-event",
  timelineTime2: ".lcln-item:nth-child(2) .lcln-time",
  timelineEvent2: ".lcln-item:nth-child(2) .lcln-event",
  timelineTime3: ".lcln-item:nth-child(3) .lcln-time",
  timelineEvent3: ".lcln-item:nth-child(3) .lcln-event",
  timelineTime4: ".lcln-item:nth-child(4) .lcln-time",
  timelineEvent4: ".lcln-item:nth-child(4) .lcln-event",
  timelineTime5: ".lcln-item:nth-child(5) .lcln-time",
  timelineEvent5: ".lcln-item:nth-child(5) .lcln-event",
  rsvpButton: "#js-open-rsvp",
  rsvpText: ".rsvp-text",
} as const;

export type WeddingTextKey = keyof typeof editableTextSelectors;
export type WeddingTexts = Partial<Record<WeddingTextKey, string>>;
const defaults = new WeakMap<Element, string>();

export function applyWeddingTexts(texts: WeddingTexts = {}) {
  for (const [key, selector] of Object.entries(editableTextSelectors)) {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) continue;
    if (!defaults.has(element)) defaults.set(element, element.innerHTML);
    const value = texts[key as WeddingTextKey];
    if (typeof value === "string") {
      element.textContent = value;
      element.style.whiteSpace = "pre-line";
    } else {
      element.innerHTML = defaults.get(element) ?? "";
      element.style.removeProperty("white-space");
    }
  }
}
