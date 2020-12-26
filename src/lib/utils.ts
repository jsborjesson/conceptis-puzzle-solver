export const deepCopy = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const difference = <T>(a: T[], b: T[]): T[] => {
  return a.filter(item => !b.includes(item));
};

export const intersection = <T>(a: T[], b: T[]): T[] => {
  return a.filter(item => b.includes(item));
};
