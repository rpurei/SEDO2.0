import { Injectable } from '@angular/core';
import { IEventDetailsFrom1C, IEventFromApi1C, IParticipants1C } from '../../../../models/1C/IEvent-1C';
import { CalendarEvent, EventColor } from 'calendar-utils';
import { addDays, format } from 'date-fns';
import { IEventDetails } from '../../../../models/IEvent';
import { IFiles1C, IOptions1C, IViolations1C } from '../../../../models/1C/IOptions-1C';
import { IOption, IViolation } from '../../../../models/IOption';
import { IFileEvent } from '../../../../models/IFiles';
import { IParticipant } from '../../../../models/IUser';


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
            participant: this.changeOptionsType(violation.participant),
            sum: violation.sum,
            violationNumber: violation.violationNumber,
            violationType: this.changeOptionsType(violation.violationType),
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
    
    public changeParticipantsType(participants: IParticipants1C[]): IParticipant[] {
        return participants.map(participant => ({
            deputy: this.changeOptionsType(participant.deputy),
            isAbsent: participant.isAbsent,
            isKnow: participant.isKnow,
            isMust: participant.isMust,
            user: this.changeOptionsType(participant.name),
            order: participant.order,
            role: this.changeOptionsType(participant.role),
            presence: participant.typePart,
            presenceRus: participant.typePartRus,
        }));
    }
    
    private changeOptionsType(option1c: IOptions1C): IOption {
        return {
            id: option1c.guid!,
            name: option1c.name!,
        };
    }
    
    convertApiEventDetail(eventDetail: IEventDetailsFrom1C): IEventDetails {
        return {
            room: this.changeOptionsType(eventDetail.className),
            meetingType: this.changeOptionsType(eventDetail.committeeType),
            descriptionEvent: eventDetail.desc,
            duration: eventDetail.duration,
            dateEnd: eventDetail.end,
            files: this.changeFileType(eventDetail.files),
            id: eventDetail.guid,
            importance: eventDetail.importance,
            initiator: this.changeOptionsType(eventDetail.initiator),
            leader: this.changeOptionsType(eventDetail.leader),
            notification: eventDetail.notification!, //TODO: Узнать точный тип массива
            organization: this.changeOptionsType(eventDetail.org),
            participants: this.changeParticipantsType(eventDetail.participants),
            secretary: this.changeOptionsType(eventDetail.secretary),
            softId: eventDetail.softId,
            dateStart: eventDetail.start,
            subDiv: this.changeOptionsType(eventDetail.subdiv),
            title: eventDetail.title,
            typeEvent: this.changeOptionsType(eventDetail.type),
            violations: this.changeViolationsType(eventDetail.violations!),
        };
    }
    
}
