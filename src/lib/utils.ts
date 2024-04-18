export const isArraySubset = <T>(subset: T[], superset: T[]): boolean => {
  return subset.some((value) => superset.includes(value));
};
