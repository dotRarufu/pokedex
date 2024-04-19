export const isArraySubset = <T>(subset: T[], superset: T[]): boolean => {
  return subset.some((value) => superset.includes(value));
};

export const removeDuplicates = <T>(arr: T[]): T[] => {
  return [...new Set(arr)];
};
