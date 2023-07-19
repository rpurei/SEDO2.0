import { Injectable } from '@angular/core';
import { IEventDetailsFrom1C, IEventFromApi1C, IEventInfo1C, IQuantityEvents1C } from '../../../../models/1C/IEvent-1C';
import { CalendarEvent, EventColor } from 'calendar-utils';
import { addDays, format } from 'date-fns';
import { IEventDetails, IEventInfo, IQuantityEvents } from '../../../../models/IEvent';
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
        green: {
            primary: '#008000',
            secondary: '#B9E9B9',
        },
        orange: {
            primary: '#ff6600',
            secondary: '#FFD8AD',
        },
        purple: {
            primary: '#800080',
            secondary: '#E8CCFF',
        },
        pink: {
            primary: '#ff69b4',
            secondary: '#FFDAF0',
        },
        teal: {
            primary: '#008080',
            secondary: '#B9E9E9',
        },
        gray: {
            primary: '#808080',
            secondary: '#E6E6E6',
        },
        brown: {
            primary: '#964B00',
            secondary: '#F5DEB3',
        },
        cyan: {
            primary: '#00FFFF',
            secondary: '#E0FFFF',
        },
        lime: {
            primary: '#00FF00',
            secondary: '#CCFFCC',
        },
        indigo: {
            primary: '#4B0082',
            secondary: '#D9B3FF',
        },
        magenta: {
            primary: '#FF00FF',
            secondary: '#FFC0CB',
        },
        silver: {
            primary: '#C0C0C0',
            secondary: '#F2F2F2',
        },
        gold: {
            primary: '#FFD700',
            secondary: '#FFECB3',
        },
        black: {
            primary: '#000000',
            secondary: '#C0C0C0',
        },
    }
    
    changeColor(typeEvent: any) {
        switch (typeEvent) {
            case 'Переговоры':
                return {...this.colors['red']};
            case 'Комитет':
                return {...this.colors['blue']};
            case 'Обучение':
                return {...this.colors['yellow']};
            case 'Аудит':
                return {...this.colors['green']};
            case 'Вебинар':
                return {...this.colors['orange']};
            case 'Инвентаризация':
                return {...this.colors['purple']};
            case 'Выездное обучение':
                return {...this.colors['pink']};
            case 'Обучение ПП-Ромашка':
                return {...this.colors['teal']};
            case 'Планерка':
                return {...this.colors['gray']};
            case 'Рабочая встреча':
                return {...this.colors['brown']};
            case 'Рабочее совещание':
                return {...this.colors['cyan']};
            case 'Рабочий час':
                return {...this.colors['lime']};
            case 'Собеседование':
                return {...this.colors['indigo']};
            case 'Тестирование':
                return {...this.colors['magenta']};
            case 'Бизнес-совещание':
                return {...this.colors['silver']};
            case 'Встреча с ЭФКО':
                return {...this.colors['gold']};
            default:
                return {...this.colors['black']};
        }
    }
    
    convertEventInfo(eventInfo1C: IEventInfo1C): IEventInfo {
        return {
            eventsQuantity: eventInfo1C.events,
            duration: eventInfo1C.duration
        };
    }
    
    convertApiQuantityEvents(apiQuantityEvents: IQuantityEvents1C): IQuantityEvents {
        return {
            monday: this.convertEventInfo(apiQuantityEvents.day1),
            tuesday: this.convertEventInfo(apiQuantityEvents.day2),
            wednesday: this.convertEventInfo(apiQuantityEvents.day3),
            thursday: this.convertEventInfo(apiQuantityEvents.day4),
            friday: this.convertEventInfo(apiQuantityEvents.day5),
            saturday: this.convertEventInfo(apiQuantityEvents.day6),
            sunday: this.convertEventInfo(apiQuantityEvents.day7),
            total: this.convertEventInfo(apiQuantityEvents.total),
        };
    }
    
    convertApiShortToCalendarEventAction(apiEvents: IEventFromApi1C[]): CalendarEvent[] {
        function eventType(eventType: string): string {
            if (eventType === 'Комитет') {
                return '';
            } else return eventType;
        }
        
        
        return apiEvents.map(event => ({
            start: addDays(new Date(event.start), 0),
            id: event.guid,
            end: addDays(new Date(event.end), 0),
            title: `Начало мероприятия в <b>${format(new Date(event.start), 'HH:mm')}</b> ${eventType(event.type)} ${event.title} ${event.className}`, //TODO: Добавить автора события из 1С
            meta: event.className,
            color: this.changeColor(event.type), //TODO: Добавить настройки цвета в зависимости от типа мероприятия
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
                name: file.author,
                type: 'Справочник.Пользователи'
            },
            order: file.order,
            typeDoc: '' // TODO: Добавить соответствующее значение
        }));
    }
    
    convertApiEventDetail(eventDetail: IEventDetailsFrom1C): IEventDetails {
        const convertedEventDetail: IEventDetails = {
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
            notification: eventDetail.notification!, // TODO: Узнать точный тип массива
            organization: this.optionConvert.changeOptionsType(eventDetail.org),
            participants: this.optionConvert.changeParticipantsType(eventDetail.participants),
            softId: eventDetail.softId,
            dateStart: eventDetail.start,
            subDiv: this.optionConvert.changeOptionsType(eventDetail.subdiv),
            title: eventDetail.title,
            typeEvent: this.optionConvert.changeOptionsType(eventDetail.type),
            violations: this.changeViolationsType(eventDetail.violations!),
        };
    
        if (eventDetail.secretary) {
            convertedEventDetail.secretary = this.optionConvert.changeOptionsType(eventDetail.secretary);
        }
    
        return convertedEventDetail;
    }
    
    convertApiEventDetailFroCreateEvent(eventDetail: IEventDetails): IEventDetailsFrom1C {
        const convertedEventDetail: IEventDetailsFrom1C = {
            className: this.optionConvert.convertOptionToOption1C(eventDetail.room),
            committeeType: this.optionConvert.convertOptionToOption1C(eventDetail.meetingType),
            desc: eventDetail.descriptionEvent,
            duration: eventDetail.duration,
            end: eventDetail.dateEnd,
            files: this.convertFileEventToFile(eventDetail.files),
            guid: eventDetail.id,
            importance: eventDetail.importance,
            initiator: this.optionConvert.convertOptionToOption1C(eventDetail.initiator),
            leader: this.optionConvert.convertOptionToOption1C(eventDetail.leader),
            notification: eventDetail.notification,
            org: this.optionConvert.convertOptionToOption1C(eventDetail.organization),
            participants: this.optionConvert.changeParticipantsTypeTo1C(eventDetail.participants),
            softId: eventDetail.softId,
            start: eventDetail.dateStart,
            subdiv: this.optionConvert.convertOptionToOption1C(eventDetail.subDiv),
            title: eventDetail.title,
            type: this.optionConvert.convertOptionToOption1C(eventDetail.typeEvent),
            violations: this.changeViolationsTypeTo1C(eventDetail.violations),
        };
        
        if (eventDetail.secretary) {
            convertedEventDetail.secretary = this.optionConvert.convertOptionToOption1C(eventDetail.secretary);
        }
        
        return convertedEventDetail;
    }
    
    public changeViolationsTypeTo1C(violations: IViolation[]): IViolations1C[] {
        return violations.map(violation => ({
            delayTime: violation.delayTime,
            note: violation.note,
            participant: this.optionConvert.convertOptionToOption1C(violation.participant),
            sum: violation.sum,
            violationNumber: violation.violationNumber,
            violationType: this.optionConvert.convertOptionToOption1C(violation.violationType),
        }));
    }
    
}
