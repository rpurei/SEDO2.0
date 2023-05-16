import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../api/customer';
import { IEvent1C } from '../../../models/1C/IEvent-1C';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomersSmall() {
        return this.http.get<any>('assets/demo/data/customers-small.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersMedium() {
        return this.http.get<any>('assets/demo/data/customers-medium.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }
    
    getCustomersLarge() {
        return this.http.get<any>('assets/demo/data/customers-large.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }
    
    // getEventsDetail() {
    //   return this.http.get<any>('assets/demo/data/event-details.json')
    //     .toPromise()
    //     .then(res => res as IEventDetails1C)
    //     .then(data => data);
    // }
    getEvents() {
        return this.http.get<any>('assets/demo/data/event.json')
            .toPromise()
            .then(res => res.data as IEvent1C[])
            .then(data => data);
    }
    
}
