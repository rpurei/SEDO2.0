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
            type: option1c.type
        };
    }
    
    public convertOptionToOption1C(option: IOption): IOptions1C {
        return <IOptions1C>{
            guid: option.id,
            name: option.name,
            type: option.type
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
    
    // @ts-ignore
    public changeParticipantsTypeTo1C(participants: IParticipant[]): IParticipants1C[] {
        return participants.map(participant => ({
            deputy: this.convertOptionToOption1C(participant.deputy),
            substitute: this.convertOptionToOption1C({id: '', name: '', type: ''}), // Добавьте необходимую логику для преобразования substitute, если требуется
            isAbsent: participant.isAbsent,
            isKnow: participant.isKnow,
            isMust: participant.isMust,
            name: this.convertOptionToOption1C(participant.user),
            order: participant.order!,
            role: this.convertOptionToOption1C(participant.role),
            typePart: participant.presence,
            typePartRus: participant.presenceRus,
        }));
    }
    
}
