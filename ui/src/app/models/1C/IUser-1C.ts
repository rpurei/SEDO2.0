import { IOptions1C } from './IOptions-1C';

export interface IUserDetailListFrom1C {
    birthday: string;
    div: string;
    email: string;
    fio: string;
    foto: string;
    gender: number;
    guid: string;
    phone: string[];
    position: string;
    skype: string;
    subdivision: string;
}

export interface IUserDetailsFrom1C {
    boss: IOptions1C,
    div: IOptions1C,
    email: string,
    gender: number,
    guid: string,
    name: string,
    photo: string,
    position: IOptions1C,
    subdiv: IOptions1C,
    userRole: string,
    phone?: string[]
}
