import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicationFormComponent } from './add-medication-form.component';

describe('AddMedicationFormComponent', () => {
  let component: AddMedicationFormComponent;
  let fixture: ComponentFixture<AddMedicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMedicationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMedicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
