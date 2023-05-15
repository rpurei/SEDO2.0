import { Injectable } from '@angular/core';
import { IEventFromApi1C } from '../../../../models/1C/IEvent-1C';
import { CalendarEvent, EventColor } from 'calendar-utils';
import { addDays, format} from 'date-fns';


@Injectable({
    providedIn: 'root',
})
export class PlannerFullApiServiceConvert {
    
    colors: Record<string, EventColor> = {
        red: {
            primary: '#ad2121',
            secondary: '#FAE3E3',
        },
        blue: {
            primary: '#1e90ff',
            secondary: '#D1E8FF',
        },
        yellow: {
            primary: '#e3bc08',
            secondary: '#FDF1BA',
        },
    };
    
    convertApiShortToCalendarEventAction(apiEvents: IEventFromApi1C[]): CalendarEvent[] {
        return apiEvents.map(event => ({
            start: addDays(new Date(event.start), 0),
            end: addDays(new Date(event.end), 0),
            title: `${format(new Date(event.start), 'HH:mm')} ${event.type} ${event.title} ${event.className}`, //TODO: Добавить автора события из 1С
            meta: event.className,
            color: { ...(this.colors)['blue'] }, //TODO: Добавить важнос
        }));
    }
    
    convertApiDetailsToCalendarEventAction(value: any) {
        value = value * 2;
        return value;
    }
    
    
}
