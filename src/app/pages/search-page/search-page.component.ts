import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Medication, MedicationService } from '../../core';
import { AddMedicationFormComponent } from './components/add-medication-form/add-medication-form.component';
import { debounceTime, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FrequencyPipe } from '../../core/pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

type SubKeyType = 'SearchBox' | 'Data';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzTableModule,
    NzInputDirective,
    NzButtonComponent,
    NzModalModule,
    NzInputGroupComponent,
    NzIconDirective,
    DatePipe,
    FrequencyPipe,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
  providers: [NzModalService],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  modalService = inject(NzModalService);
  medicationService = inject(MedicationService);
  subMap: Map<SubKeyType, Subscription> = new Map();
  medications: Medication[] = [];
  searchControl = new FormControl();

  ngOnInit(): void {
    this.loadData();
    this.listenOnSearchChange();
  }

  listenOnSearchChange() {
    let sub = this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: string) => {
        this.loadData(value);
      });
    this.subMap.set('SearchBox', sub);
  }

  loadData(searchTerm?: string) {
    this.removeSubscription('Data');
    let sub = this.medicationService
      .getMedicationList(searchTerm)
      .subscribe((data) => {
        this.medications = data;
      });
    this.subMap.set('Data', sub);
  }

  openModal() {
    this.modalService.create({
      nzTitle: 'Add medication',
      nzFooter: null,
      nzContent: AddMedicationFormComponent,
      nzClosable: false,
    });
  }

  removeSubscription(key: SubKeyType) {
    if (this.subMap.has(key)) {
      this.subMap.get(key)?.unsubscribe();
    }
    this.subMap.delete(key);
  }

  subLoading(key: SubKeyType): boolean {
    if (!this.subMap.has(key)) {
      return false;
    }
    return !this.subMap.get(key)?.closed;
  }

  ngOnDestroy(): void {
    for (let key of this.subMap.keys()) {
      this.removeSubscription(key);
    }
  }
}
