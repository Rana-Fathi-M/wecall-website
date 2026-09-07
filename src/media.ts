export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const img = (file: string) => asset(`assets/images/${file}`);

export const photos = {
  desks: { light: img("intro-desks.png"), dark: img("cream-desks.png") },
  deals: { light: img("intro-deals.png"), dark: img("cream-deals.png") },
  managers: { light: img("intro-managers.png"), dark: img("cream-managers.png") },
  flip: { light: img("strategy-flip.png"), dark: img("cream-flip.png") },
  brrr: { light: img("strategy-brrrr.png"), dark: img("cream-brrrr.png") },
  seats: { light: img("intro-seats.png"), dark: img("cream-seats.png") },
  creative: { light: img("strategy-creative.png"), dark: img("cream-creative.png") },
  office: { light: img("weCallOffice.jpeg"), dark: img("weCallOffice.jpeg") },
  nightDesk: { light: img("WecallIMG1.png"), dark: img("WecallIMG1.png") },
  close: { light: img("WecallIMG2.png"), dark: img("WecallIMG2.png") },
  closings: { light: img("WecallIMG3.png"), dark: img("WecallIMG3.png") },
} as const;
