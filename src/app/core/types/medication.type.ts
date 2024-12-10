import { DosageUnit } from './dosage-unit.type';
import { WeekDay } from './week-day.type';

export interface Medication {
  id: string;
  lastUpdated: Date;
  name: string;
  dosage: number;
  unit: DosageUnit;
  days: WeekDay[];
  times: string[];
}
