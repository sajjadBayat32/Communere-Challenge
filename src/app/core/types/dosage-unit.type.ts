export const DosageUnitList = [
  'Capsules',
  'Tables',
  'Applications',
  'Drops',
  'Milligrams',
  'Micrograms',
] as const;
export type DosageUnit = typeof DosageUnitList[number];
