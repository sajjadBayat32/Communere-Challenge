import { Component, inject, OnDestroy } from "@angular/core";
import {
	AbstractControl,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {
	DosageUnit,
	DosageUnitList,
	WeekDay,
	WeekDays,
  MedicationService
} from "../../../../core";
import { NzInputDirective } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzInputNumberComponent } from "ng-zorro-antd/input-number";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzTimePickerModule } from "ng-zorro-antd/time-picker";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzModalRef } from "ng-zorro-antd/modal";
import { Subscription } from "rxjs";

interface FormType {
	name: FormControl<string | null>;
	dosage: FormControl<number | null>;
	unit: FormControl<DosageUnit | null>;
	time: FormControl<Date | null>;
}

@Component({
	selector: "app-add-medication-form",
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		NzInputDirective,
		NzSelectModule,
		NzInputNumberComponent,
		NzTimePickerModule,
		NzButtonComponent,
	],
	templateUrl: "./add-medication-form.component.html",
	styleUrl: "./add-medication-form.component.css",
})
export class AddMedicationFormComponent implements OnDestroy {
  readonly modalRef = inject(NzModalRef);
	messageService = inject(NzMessageService);
	medicationService = inject(MedicationService);
	unitList = DosageUnitList;
	weekDays = WeekDays;

	form: FormGroup = new FormGroup<FormType>({
		name: new FormControl<string>("", [
			Validators.required,
			Validators.minLength(3),
		]),
		dosage: new FormControl(null, {
			validators: [Validators.required, Validators.min(0)],
		}),
		unit: new FormControl(null, [Validators.required]),
		time: new FormControl(null),
	});
  selectedDays: Set<WeekDay> = new Set();
	addedTimes: string[] = [];
  subscription!: Subscription;

  selectDay(day: WeekDay): void {
    if (this.selectedDays.has(day)) {
      this.selectedDays.delete(day);
    } else {
      this.selectedDays.add(day);
    }
  }

	addTime(): void {
		/* check for uniqueness */
		let time = this.control("time").value;
		if (time instanceof Date) {
			this.addedTimes.push(this.getTimeFormat(time));
      this.control("time").reset();
		}
	}

	submitForm(): void {
    if (this.formIsValid) {
      let formData = {
        ...this.form.value,
        days: Array.from(this.selectedDays),
        times: this.addedTimes
      }
      this.subscription = this.medicationService.addMedication(formData).subscribe(() => {
        this.closeModal();
        /* todo: use returned object */
      })
    }
	}

  onCancel() {
    this.closeModal();
  }

  closeModal() {
    this.modalRef.close();
  }

  get formIsValid(): boolean {
    if (this.form.invalid) {
			this.messageService.error("Form is invalid");
      this.form.markAllAsTouched();
      this.form.markAsDirty();
			return false;
		}
    if (this.selectedDays.size === 0) {
			this.messageService.error("No day has been added");
			return false;
		}
    if (this.addedTimes.length === 0) {
			this.messageService.error("No time has been added");
			return false;
		}
    return true;
  }

	control(key: keyof FormType): AbstractControl {
		return this.form.controls[key];
	}

	controlIsInvalid(key: keyof FormType): boolean {
		return this.control(key).invalid && this.control(key).touched;
	}

	getTimeFormat(date: Date) {
		return new Intl.DateTimeFormat("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		}).format(date);
	}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
