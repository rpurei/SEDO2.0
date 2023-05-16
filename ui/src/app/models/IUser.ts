import { IOption } from './IOption';

export class IUser {
    id?: number;
    login?: string;
    full_name?: string;
    password?: string;
    email?: string;
    auth_source?: number;
    active?: boolean;
    roles?: string[];
    created?: string;
    updated?: string;
}

export interface IUserCapsule {
    guid: string;
    img: string;
    name: string;
}

export interface IUserDetail {
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
    order: number;
    role: IOption;
    presence: string;
    presenceRus: string;
}
