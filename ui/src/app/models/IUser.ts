import { IOption } from './IOption';

export interface IUser {
    boss: IOption,
    div: IOption,
    email: string,
    gender: number,
    id: string,
    name: string,
    photo: string,
    position: IOption,
    subdiv: IOption,
    roles?: string,
    phone?: string[]
    skype?: string
    birthday?: string,
    department?: string
}

export interface IUserCapsule {
    guid: string;
    img: string;
    name: string;
}

export interface IUserDetailList {
    id: string;
    name: string;
    gender: number;
    email: string;
    skype: string;
    phone: string[];
    photo: string;
    subdivision: string;
    position: string;
    birthday: string;
    department: string;
}

export interface IParticipant {
    deputy: IOption;
    isAbsent: boolean;
    isKnow: string;
    isMust: boolean;
    user: IOption;
    order?: number;
    role: IOption;
    presence: string;
    presenceRus: string;
}

export interface IUserDetails {
    boss: IOption,
    div: IOption,
    email: string,
    gender: number,
    id: string,
    name: string,
    photo: string,
    position: IOption,
    subdiv: IOption,
    userRole: string
}
