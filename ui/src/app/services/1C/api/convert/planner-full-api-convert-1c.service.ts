import { Injectable } from '@angular/core';
import { IEventDetailsFrom1C, IEventFromApi1C } from '../../../../models/1C/IEvent-1C';
import { CalendarEvent, EventColor } from 'calendar-utils';
import { addDays, format } from 'date-fns';
import { IEventDetails } from '../../../../models/IEvent';
import { IFiles1C, IViolations1C } from '../../../../models/1C/IOptions-1C';
import { IViolation } from '../../../../models/IOption';
import { IFileEvent } from '../../../../models/IFiles';
import { OptionConvert1cService } from './option-convert-1c.service';


@Injectable({
    providedIn: 'root',
})
export class EventApiServiceConvert {
    constructor(private optionConvert: OptionConvert1cService) {
    }
    
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
            id: event.guid,
            end: addDays(new Date(event.end), 0),
            title: `${format(new Date(event.start), 'HH:mm')} ${event.type} ${event.title} ${event.className}`, //TODO: Добавить автора события из 1С
            meta: event.className,
            color: {...(this.colors)['blue']}, //TODO: Добавить настройки цвета в зависимости от типа мероприятия
        }));
    }
    
    convertApiDetailsToCalendarEventAction(value: any) {
        value = value * 2;
        return value;
    }
    
    public changeViolationsType(violations: IViolations1C[]): IViolation[] {
        return violations.map(violation => ({
            delayTime: violation.delayTime,
            note: violation.note,
            participant: this.optionConvert.changeOptionsType(violation.participant),
            sum: violation.sum,
            violationNumber: violation.violationNumber,
            violationType: this.optionConvert.changeOptionsType(violation.violationType),
        }));
    }
    
    public changeFileType(files: IFiles1C[]): IFileEvent[] {
        return files.map(file => ({
            author: file.author.name!,
            createDate: file.createDate,
            id: file.guid,
            name: file.name,
            link: file.name, //TODO: Изменить потом на ссылку на файл
            order: file.order,
            type: file.type,
        }));
    }
    
    public convertFileEventToFile(files: IFileEvent[]): IFiles1C[] {
        return files.map(file => ({
            guid: file.id,
            name: file.name,
            title: '', // TODO: Добавить соответствующее значение
            type: file.type,
            size: 0, // TODO: Добавить соответствующее значение
            createDate: file.createDate,
            author: {
                guid: '', // TODO: Добавить соответствующее значение
                name: file.author
            },
            order: file.order,
            typeDoc: '' // TODO: Добавить соответствующее значение
        }));
    }
    
    convertApiEventDetail(eventDetail: IEventDetailsFrom1C): IEventDetails {
        return {
            room: this.optionConvert.changeOptionsType(eventDetail.className),
            meetingType: this.optionConvert.changeOptionsType(eventDetail.committeeType),
            descriptionEvent: eventDetail.desc,
            duration: eventDetail.duration,
            dateEnd: eventDetail.end,
            files: this.changeFileType(eventDetail.files),
            id: eventDetail.guid,
            importance: eventDetail.importance,
            initiator: this.optionConvert.changeOptionsType(eventDetail.initiator),
            leader: this.optionConvert.changeOptionsType(eventDetail.leader),
            notification: eventDetail.notification!, //TODO: Узнать точный тип массива
            organization: this.optionConvert.changeOptionsType(eventDetail.org),
            participants: this.optionConvert.changeParticipantsType(eventDetail.participants),
            secretary: this.optionConvert.changeOptionsType(eventDetail.secretary),
            softId: eventDetail.softId,
            dateStart: eventDetail.start,
            subDiv: this.optionConvert.changeOptionsType(eventDetail.subdiv),
            title: eventDetail.title,
            typeEvent: this.optionConvert.changeOptionsType(eventDetail.type),
            violations: this.changeViolationsType(eventDetail.violations!),
        };
    }
    
    // @ts-ignore
    convertApiEventDetailFroCreateEvent(eventDetail: IEventDetails): IEventDetailsFrom1C {
        // return {
        //     className: this.optionConvert.convertOptionToOption1C(eventDetail.room),
        //     committeeType: this.optionConvert.convertOptionToOption1C(eventDetail.meetingType),
        //     desc: eventDetail.descriptionEvent,
        //     duration: eventDetail.duration,
        //     end: eventDetail.dateEnd,
        //     files: this.convertFileEventToFile(eventDetail.files),
        //     guid: eventDetail.id,
        //     importance: eventDetail.importance,
        //     initiator: this.optionConvert.convertOptionToOption1C(eventDetail.initiator),
        //     leader: this.optionConvert.convertOptionToOption1C(eventDetail.leader),
        //     notification: eventDetail.notification,
        //     org: this.optionConvert.convertOptionToOption1C(eventDetail.organization),
        //     participants: this.optionConvert.changeParticipantsType(eventDetail.participants),
        //     secretary: this.optionConvert.convertOptionToOption1C(eventDetail.secretary),
        //     softId: eventDetail.softId,
        //     start: eventDetail.dateStart,
        //     subdiv: this.optionConvert.convertOptionToOption1C(eventDetail.subDiv),
        //     title: eventDetail.title,
        //     type: this.optionConvert.convertOptionToOption1C(eventDetail.typeEvent),
        //     violations: this.changeViolationsType(eventDetail.violations),
        // };
    }
    
}
