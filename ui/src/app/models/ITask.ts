import { IFiles } from './IFiles';
import { IUserCapsule } from './IUser';
import { Data } from '@angular/router';

export interface ITaskCapsule {
    dateStart: Date;
    title: string;
    author: string;
    guid: string;
}

export interface ITask {
    dateExecution?: Date;
    dateStart?: Date;
    files?: IFiles[];
    project?: '';
    dateAcceptanceExecution?: Date;
    buttons: IButton[];
    guid: string;
    author: string;
    importance: string;
    completed: boolean;
    dateCreated: Date;
    ExcludedFromProcess: boolean;
    executors: IExecutors[];
    title: string;
    description: string;
    accepted: boolean;
    stateProcess: string;
    dateEnd: Date;
    logbook: IRichText[];
}

export interface IButton {
    url: string;
    name: string;
    comment: boolean;
}

interface IExecutors {
    guid: string;
    name: string;
    type: string;
}

export interface IRichText {
    title: string;
    data: string[];
    created: string;
    user: IUserCapsule;
    date: Data;
}
