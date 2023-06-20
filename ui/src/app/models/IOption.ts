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

















