export type GiftRecipient = { owner: string; bank: string; account: string; qrUrl: string };
export type GiftSettings = { groom: GiftRecipient; bride: GiftRecipient };

export const defaultGiftSettings: GiftSettings = {
  groom: { owner: "Le Chu Long Nhat", bank: "Tp Bank", account: "0123456789", qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=MB-RE" },
  bride: { owner: "Nguyen Thi Hoai", bank: "Tp Bank", account: "9876543210", qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=VCB-DAU" },
};

export function applyGiftSettings(gifts: GiftSettings = defaultGiftSettings) {
  for (const role of ["groom", "bride"] as const) {
    const card = document.querySelector<HTMLElement>(`[data-gift="${role}"]`);
    const gift = gifts[role];
    if (!card || !gift) continue;
    const image = card.querySelector<HTMLImageElement>("img");
    const owner = card.querySelector<HTMLElement>("[data-gift-owner]");
    const bank = card.querySelector<HTMLElement>("[data-gift-bank]");
    const account = card.querySelector<HTMLElement>("[data-gift-acc]");
    if (image) image.src = gift.qrUrl;
    if (owner) owner.textContent = gift.owner;
    if (bank) bank.textContent = gift.bank;
    if (account) account.textContent = gift.account;
  }
}
