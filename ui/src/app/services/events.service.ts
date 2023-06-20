import { Injectable } from '@angular/core';
import { Events1CService } from './1C/api/events.service';
import { EventApiServiceConvert } from './1C/api/convert/planner-full-api-convert-1c.service';
import { CalendarEvent } from 'calendar-utils';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IEventDetailsFrom1C, IEventFromApi1C } from '../models/1C/IEvent-1C';
import { environment } from '../../environments/environment';
import { IEventDetails } from '../models/IEvent';
import { IOption } from '../models/IOption';
import { OptionConvert1cService } from './1C/api/convert/option-convert-1c.service';


@Injectable({
    providedIn: 'root',
})
export class EventsService {
    constructor(
        private event1CService: Events1CService,
        private eventApiServiceConvert: EventApiServiceConvert,
        private optionConvert: OptionConvert1cService,
    ) {
    }
    
    // public getAllEventsShort(userId: string, allUsers: boolean): Observable<CalendarEvent[]> {
    //     if (environment.backend === '1c') {
    //         const events$: Observable<IEventFromApi1C[]> = this.event1CService.getAllEventsShortFrom1C(userId, allUsers);
    //         return events$.pipe(
    //             map(apiEvents => this.eventApiServiceConvert.convertApiShortToCalendarEventAction(apiEvents)),
    //             catchError(error => {
    //                 console.log(error);
    //                 return of([] as CalendarEvent[]);
    //             })
    //         );
    //     }
    //     return of([] as CalendarEvent[]);
    // }
    
    public getEventsShort(id: string, allUsers: boolean): Observable<CalendarEvent[]> {
        if (environment.backend === '1c') {
            const events$: Observable<IEventFromApi1C[]> = this.event1CService.getEventsShortFrom1C(id, allUsers);
            return events$.pipe(
                map(apiEvents => this.eventApiServiceConvert.convertApiShortToCalendarEventAction(apiEvents)),
                catchError(error => {
                    console.log(error);
                    return of([] as CalendarEvent[]);
                })
            );
        }
        return of([] as CalendarEvent[]);
    }
    
    public getEventDetailsById(id: string, userId: string): Observable<IEventDetails> {
        if (environment.backend === '1c') {
            return this.event1CService.getEventDetailsFrom1CByEventId(id, userId).pipe(
                map(eventDetails => this.eventApiServiceConvert.convertApiEventDetail(eventDetails)));
        }
        return of({} as IEventDetails);
    }
    
    public getEventType(): Observable<IOption[]> {
        if (environment.backend === '1c') {
            return this.event1CService.getEventTypes().pipe(
                map(eventType => this.optionConvert.convertOptions(eventType))
            );
        }
        return of([] as IOption[]);
    }
    
    public deleteEvent(eventId: string): Observable<any> {
        if (environment.backend === '1c') {
            return this.event1CService.deleteEvent(eventId);
        }
        return ({} as Observable<any>);
    }
    
    public createEvent(eventDetails: IEventDetails): Observable<any> {
        if (environment.backend === '1c') {
            let sendDataEventDetails: IEventDetailsFrom1C = this.eventApiServiceConvert.convertApiEventDetailFroCreateEvent(eventDetails);
            sendDataEventDetails.className.type = 'Справочник.ТерриторииИПомещения';
            sendDataEventDetails.participants[0].role.type = 'Справочник.гкРолиВСовещании';
            console.log(sendDataEventDetails);
            return this.event1CService.createNewEvent(sendDataEventDetails);
        }
        return ({} as Observable<any>);
    }
}
