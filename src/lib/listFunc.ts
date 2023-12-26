export const documentById = (id: string) => {
  return document.getElementById?.(id) as any;
};

export const slug = (str: string | undefined) => {
  const lowercasedStr = str?.toLowerCase();
  return lowercasedStr?.replace(/\s+/g, "-").replace(/[^\w-]/g, "");
};
