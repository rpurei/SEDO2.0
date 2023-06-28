export interface IOptions1C {
    type: string | ' ';
    guid: string;
    name: string;
}

export interface IRoomsList1C extends IOptions1C {
    capacity: number;
}

export interface IFiles1C {
    guid: string;
    name: string;
    title: string;
    type: string;
    size: number;
    createDate: string;
    author: IOptions1C;
    order: number;
    typeDoc: string;
}

export interface IViolations1C {
    delayTime: number;
    note: string;
    participant: IOptions1C;
    sum: number;
    violationNumber: number;
    violationType: IOptions1C;
}

interface MeetingParticipant1C {
    name: IOptions1C;
    role: IOptions1C;
}

export interface ICommittee1C extends IOptions1C {
    participants: MeetingParticipant1C[];
    secretary?: IOptions1C;
    
}
