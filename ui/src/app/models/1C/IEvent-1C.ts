import { IFiles1C, IOptions1C, IViolations1C } from './IOptions-1C';

export interface IEvent1C {
    className: string;
    dateEnd: Date;
    guid: string;
    org: string;
    softId?: string;
    dateStart: Date;
    subdiv?: string;
    title?: string;
    type: string;
    author: string;
}

export interface IEventDetailsFrom1C {
    isFilesVisible?: boolean;
    userId?: string;
    guid: string;
    softId: string;
    title: string;
    importance: string;
    type: IOptions1C;
    committeeType: IOptions1C;
    start: string;
    end: string;
    desc: string;
    initiator: IOptions1C;
    org: IOptions1C;
    subdiv: IOptions1C;
    className: IOptions1C;
    leader: IOptions1C;
    secretary?: IOptions1C;
    duration: number;
    participants: IParticipants1C[];
    files: IFiles1C[];
    violations?: IViolations1C[];
    notification?: any[]; //TODO: Выяснить точно какой тип данных в массиве:)
    // changeOptionsType(option1C: IOptions1C): IOption;
    //
    // changeViolationsType(violations1C: IViolations1C): IViolation;
}

export interface IParticipants1C {
    deputy: IOptions1C;
    substitute: IOptions1C;
    isAbsent: boolean;
    isKnow: string;
    isMust: boolean;
    name: IOptions1C;
    order: number;
    role: IOptions1C;
    typePart: string;
    typePartRus: string;
}

export interface IEventFromApi1C {
    guid: string;
    softId: string;
    title: string;
    type: string;
    start: string;
    end: string;
    org: string;
    subdiv: string;
    className: string;
    author?: string;
}

export interface IEventInfo1C {
    events: number,
    duration: number
}

export interface IQuantityEvents1C {
    day1: IEventInfo1C;
    day2: IEventInfo1C;
    day3: IEventInfo1C;
    day4: IEventInfo1C;
    day5: IEventInfo1C;
    day6: IEventInfo1C;
    day7: IEventInfo1C;
    total: IEventInfo1C;
}
