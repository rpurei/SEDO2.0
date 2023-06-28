
export interface IOption {
    name: string;
    id?: string;
    type: string | '';
}


export interface IViolation {
    delayTime: number;
    note: string;
    participant: IOption;
    sum: number;
    violationNumber: number;
    violationType: IOption;
}

export interface ICommittee extends IOption {
    participants: MeetingParticipant[];
    secretary?: IOption;
    
}

interface MeetingParticipant {
    name: IOption;
    role: IOption;
}













