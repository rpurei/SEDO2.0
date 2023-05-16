import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { IEventDetails } from '../../../../../models/IEvent';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
    @Input() eventDetail: IEventDetails = {} as IEventDetails;
    selectedOrganisation = '';
    dateStart: Date = new Date();
    
    
    countries: any[] = [];
    filteredCountries: any;
    isChange: boolean = false;
    cities: any;
    activeItem: any;
    uploadedFiles: any[] = [];
    items: any[] = [];
    loading: boolean = false;
    people!: any[]; // TODO: создать интерфейс
    visibleModification: boolean = false;
    display: boolean = false;
    
    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
    onActiveItemChange(event: any) {
        this.activeItem = event;
        console.log(this.activeItem);
    }
    
    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
    }
    
    filterCountry(event: any) {
        // const filtered: any[] = [];
        // const query = event.query;
        // for (let i = 0; i < this.countries.length; i++) {
        //     const country = this.countries[i];
        //     if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        //         filtered.push(country);
        //     }
        // }
        //
        // this.filteredCountries = filtered;
    }
    
    ngOnInit(): void {
        this.dateStart = new Date(this.eventDetail.dateStart);
        this.selectedOrganisation = this.eventDetail.organization.name;
        this.items = [
            {label: 'Участники', icon: 'pi pi-fw pi-user'},
            {label: 'Информация к событию', icon: 'pi pi-fw pi-info-circle'},
            {label: 'Оценка', icon: 'pi pi-fw pi-dollar'},
            {label: 'Протокол', icon: 'pi pi-fw pi-file'},
        ];
        this.activeItem = this.items[0];
    }
    
    
}
