import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Medication, DosageUnit, WeekDay } from '../../../../core';

interface FormType {
  name: FormControl<string | null>;
  dosage: FormControl<number | null>;
  unit: FormControl<DosageUnit | null>;
  days: FormControl<WeekDay[]>;
  times: FormArray<FormControl<string | null>>;
}

@Component({
  selector: 'app-add-medication-form',
  standalone: true,
  imports: [],
  templateUrl: './add-medication-form.component.html',
  styleUrl: './add-medication-form.component.css',
})
export class AddMedicationFormComponent {
  form: FormGroup = new FormGroup<FormType>({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    dosage: new FormControl(null, {
      validators: [Validators.min(0)],
    }),
    unit: new FormControl(null, [Validators.required]),
    days: new FormControl([], { nonNullable: true }),
    times: new FormArray([new FormControl()]),
  });
}
