import { Injectable } from '@angular/core';
import { IRoomsList1C } from '../../../../models/1C/IOptions-1C';
import { IRoom } from '../../../../models/IRoom';


@Injectable({
    providedIn: 'root',
})
export class RoomsConvert1cService {
    
    convertApiRooms(apiEvents: IRoomsList1C[]): IRoom[] {
        return apiEvents.map(event => ({
            name: event.name!,
            id: event.guid!,
            capacity: event.capacity , //TODO: Добавить автора события из 1С
        }));
    }
    
}
