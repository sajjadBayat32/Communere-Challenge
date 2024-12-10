import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Medication, MedicationService } from '../../core';
import { AddMedicationFormComponent } from './components/add-medication-form/add-medication-form.component';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FrequencyPipe } from '../../core/pipe';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [NzTableModule, NzInputDirective, NzButtonComponent, NzModalModule, NzInputGroupComponent, NzIconDirective, DatePipe, FrequencyPipe],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
  providers: [NzModalService]
})
export class SearchPageComponent implements OnInit, OnDestroy {
  modalService = inject(NzModalService);
  medicationService = inject(MedicationService);
  dataSubscription!: Subscription;
  medications: Medication[] = [];

  ngOnInit(): void {
      this.loadData();
  }

  loadData() {
    this.dataSubscription = this.medicationService.getMedicationList().subscribe((data) => {
      this.medications = data;
    })
  }


  openModal() {
    this.modalService.create({
      nzTitle: "Add medication",
      nzFooter: null,
      nzContent: AddMedicationFormComponent,
      nzClosable: false,
    })
  }

  ngOnDestroy(): void {
      this.dataSubscription?.unsubscribe();
  }
}
