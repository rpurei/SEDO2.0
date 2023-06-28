import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rooms1CService } from './1C/api/rooms.service';
import { RoomsConvert1cService } from './1C/api/convert/rooms-convert-1c.service';
import { IRoom } from '../models/IRoom';
import { IRoomsList1C } from '../models/1C/IOptions-1C';


@Injectable({
    providedIn: 'root',
})
export class RoomsService {
    constructor(private rooms1CService: Rooms1CService, private roomConvertService: RoomsConvert1cService) {
    }
    
    public getAllRooms(): Observable<IRoom[]> {
        if (environment.backend ==='1c') {
            const events$: Observable<IRoomsList1C[]> = this.rooms1CService.getAllRoomsFrom1C();
            return events$.pipe(
                map(apiEvents => this.roomConvertService.convertApiRooms(apiEvents)),
                catchError(error => {
                    console.log(error);
                    return of([] as IRoom[]);
                })
            );
        } return of([] as IRoom[]);
    }
  public filterRooms(allRooms: IRoom[], event: any) {
      let filtered: IRoom[] = [];
      let query = event.query;
      for (let i = 0; i < allRooms.length; i++) {
          let room = allRooms[i];
          if (room.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(room);
          }
      }
     return filtered;
  }
}
