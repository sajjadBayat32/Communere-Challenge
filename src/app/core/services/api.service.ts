import { Injectable } from '@angular/core';
import { DataStoreService } from './data-store.service';
import { Medication } from '../types';
import { delay, Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ApiService {
  constructor(private dataStoreService: DataStoreService) {}

  getMedicationList(): Observable<Medication[]> {
    let result = this.dataStoreService.getEntities<Medication>('Medication');
    return of(result).pipe(delay(2000));
  }

  addMedication(
    formData: Omit<Medication, 'id' | 'updatedData'>
  ): Observable<Medication> {
    let newEntityId = uuid();
    let newEntity: Medication = {
      ...formData,
      id: newEntityId,
      updatedData: new Date(),
    };
    this.dataStoreService.addEntity<Medication>('Medication', newEntity);
    return of(newEntity).pipe(delay(2000));
  }
}
