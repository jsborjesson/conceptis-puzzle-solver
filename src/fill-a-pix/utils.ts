export const deepCopy = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const difference = <T>(a: T[], b: T[]): T[] => {
  const aVal = a.map(obj => JSON.stringify(obj));
  const bVal = b.map(obj => JSON.stringify(obj));

  return aVal
    .filter(item => !bVal.includes(item))
    .map(item => JSON.parse(item));
};
