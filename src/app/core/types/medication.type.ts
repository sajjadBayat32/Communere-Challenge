import { DosageUnit } from './dosage-unit.type';

export interface Medication {
  id: string;
  updatedData: Date;
  name: string;
  dosage: number;
  unit: DosageUnit;
  days: Date[];
  times: string[];
}
