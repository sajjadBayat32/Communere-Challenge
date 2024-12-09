import { DosageUnit } from './dosage-unit.type';

export interface Medication {
  name: string;
  dosage: number;
  unit: DosageUnit;
  days: Date[];
  times: string[];
}
