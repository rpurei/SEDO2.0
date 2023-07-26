import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'weatherDate'
})
export class WeatherDatePipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): string {
        let date = new Date(value);
        let dateNow = new Date();
        if (date.getDay() === dateNow.getDay()) {
            return date.toLocaleString('ru', {hour: '2-digit', minute: '2-digit'});
        }
        return date.toLocaleString('ru', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(',', '');
    }
}
