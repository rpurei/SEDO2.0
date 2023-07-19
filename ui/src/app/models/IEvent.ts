import { IFileEvent } from './IFiles';
import { IOption, IViolation } from './IOption';
import { IParticipant } from './IUser';

export interface IEventDetails {
    room: IOption;
    meetingType: IOption;
    descriptionEvent: string;
    importance: string;
    duration: number;
    dateEnd: string;
    files: IFileEvent[];
    id: string;
    initiator: IOption;
    leader: IOption;
    notification: any[]; //TODO: Узнать точный тип массива
    organization: IOption;
    participants: IParticipant[];
    secretary?: IOption;
    softId: string;
    dateStart: string;
    subDiv: IOption;
    title: string;
    typeEvent: IOption;
    violations: IViolation[];
    
}

export interface IEventInfo {
    eventsQuantity: number,
    duration: number
}

export interface IQuantityEvents {
    monday: IEventInfo;
    tuesday: IEventInfo;
    wednesday: IEventInfo;
    thursday: IEventInfo;
    friday: IEventInfo;
    saturday: IEventInfo;
    sunday: IEventInfo;
    total: IEventInfo;
}

