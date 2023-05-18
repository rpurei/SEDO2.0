import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CountryService } from '../../../../demo/service/country.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
    constructor(
        private countryService: CountryService,
        private messageService: MessageService,
    ) {
    }
    
    @Input() eventId!: string;
    endLoading: boolean = false;
    display: boolean = false;
    eventDetail!: any;
    visibleModification: boolean = false;
    cities: any;
    value: any;
    selectedCity: any;
    testInfo: any;
    selectedCountryAdvanced: any[] = [];
    filteredCountries: any[] = [];
    countries: any[] = [];
    items!: MenuItem[];
    people!: any[]; // TODO: создать интерфейс
    activeItem!: MenuItem;
  loading: boolean = false;
  uploadedFiles: any[] = [];

  @ViewChild('filter') filter!: ElementRef;

  showEventDetails() {
      // this.customerService.getEventsDetail().then((eventDetails) => {
      //   this.eventDetail = eventDetails;
      //   this.endLoading = true;
      //   this.loading = false;
      //   this.display = true;
      //   // this.events.forEach((customer) => (customer.end = new Date(customer.end)));
      // });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  filterCountry(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      const country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

  test(a: any) {
    console.log(a);
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Участники', icon: 'pi pi-fw pi-user' },
      { label: 'Информация к событию', icon: 'pi pi-fw pi-info-circle' },
      // { label: 'Оценка', icon: 'pi pi-fw pi-dollar' },
      { label: 'Протокол', icon: 'pi pi-fw pi-file' },
    ];

    this.activeItem = this.items[0];
    // this.testInfo = Date.parse(this.event.dateStart);
    // this.testInfo = new Date(this.testInfo);

    this.countryService.getCountries().then((countries) => {
      this.countries = countries;
    });

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  onActiveItemChange(event: any) {
    this.activeItem = event;
    console.log(this.activeItem);
  }

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }
}
