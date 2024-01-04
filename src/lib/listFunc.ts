export const documentById = (id: string) => {
  return document.getElementById?.(id) as any;
};

export const slug = (str: string | undefined) => {
  const lowercasedStr = str?.toLowerCase();
  return lowercasedStr?.replace?.(/\s+/g, "-")?.replace?.(/[^\w-]/g, "");
};

export function rstr(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}
