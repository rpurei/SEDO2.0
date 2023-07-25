import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'weatherDate'
})
export class WeatherDatePipe implements PipeTransform {
    
    transform(value: string, ...args: unknown[]): unknown {
        return null;
    }
    
}
