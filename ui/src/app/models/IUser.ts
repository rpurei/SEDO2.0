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

export interface IPhonebook {
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
