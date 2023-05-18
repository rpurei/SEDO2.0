import { Injectable } from '@angular/core';
import { IOptions1C } from '../../../../models/1C/IOptions-1C';
import { IOption } from '../../../../models/IOption';
import { IParticipants1C } from '../../../../models/1C/IEvent-1C';
import { IParticipant } from '../../../../models/IUser';

@Injectable({
    providedIn: 'root',
})
export class OptionConvert1cService {
    
    public changeOptionsType(option1c: IOptions1C): IOption {
        return <IOption>{
            id: option1c.guid,
            name: option1c.name,
        };
    }
    
    public convertOptions(options: IOptions1C[]): IOption[] {
        if (!Array.isArray(options)) {
            return [] as IOption[];
        }
        return options.map(option => this.changeOptionsType(option));
    }
    
    public changeParticipantsType(participants: IParticipants1C[]): IParticipant[] {
        return participants.map(participant => ({
            deputy: this.changeOptionsType(participant.deputy),
            isAbsent: participant.isAbsent,
            isKnow: participant.isKnow,
            isMust: participant.isMust,
            user: this.changeOptionsType(participant.name),
            order: participant.order,
            role: this.changeOptionsType(participant.role),
            presence: participant.typePart,
            presenceRus: participant.typePartRus,
        }));
    }
}
