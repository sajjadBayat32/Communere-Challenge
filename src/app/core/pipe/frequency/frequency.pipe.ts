import { Pipe, PipeTransform } from '@angular/core';
import { WeekDay, WeekDays } from '../../types';

@Pipe({
  name: 'frequency',
  standalone: true
})
export class FrequencyPipe implements PipeTransform {

  transform(days: WeekDay[], times: string[]): unknown {
    let daysStr = days.length === WeekDays.length ? "Every day" : days.join(", ");
    let timesStr = times.join(", ")
    return `${daysStr} at ${timesStr}`;
  }

}
