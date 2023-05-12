import { IOptions1C } from './IOptions-1C';

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

export interface IEventDetails1C {
    className: IOptions1C
    committeeType: IOptions1C
    desc: string ;
    duration: number;
    end: string;
    files?: any[];
    importance: string;
    initiator: IOptions1C
    leader: IOptions1C
    notification: any[];
    org: IOptions1C
    participants: Participants[];
    secretary: IOptions1C
    softId: string;
    start: string;
    subdiv: IOptions1C
    type: IOptions1C
    title: string;
    violations?: any[];
}

export interface Participants {
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
