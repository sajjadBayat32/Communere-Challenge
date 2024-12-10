import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medication } from '../types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  constructor(private apiService: ApiService) {}

  getMedicationList(searchTerm?: string): Observable<Medication[]> {
    return this.apiService.getMedicationList(searchTerm);
  }

  addMedication(
    formData: Omit<Medication, 'id' | 'updatedData'>
  ): Observable<Medication> {
    return this.apiService.addMedication(formData);
  }
}
