import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { NodeService } from '../../../demo/service/node.service';
import { Representative } from '../../../demo/api/customer';
import { Table } from 'primeng/table';
import { CustomerService } from '../../../demo/service/customer.service';
import { IEvent1C } from '../../../../models/1C/IEvent-1C';

@Component({
    selector: 'app-planner',
    templateUrl: './planner-block.component.html',
    styleUrls: ['./planner-block.component.scss'],
})
export class PlannerBlockComponent implements OnInit {
    constructor(private nodeService: NodeService, private customerService: CustomerService) {
    }
    
    selectedDate = new Date();
    event: IEvent1C[] = [];
    loading: boolean = true;
    representatives: Representative[] = [];
    files1: TreeNode[] = [];
    files2: TreeNode[] = [];
    files3: TreeNode[] = [];
    cols: any[] = [];
    countries: any[] = [];
    filteredPersons: any[] = [];
    selectedPersonAdvanced: any[] = [];
    users = [
        {name: 'Владимиров Вадим Андреевич', notification: true},
        {name: 'Иванов Иван Иванович', notification: false},
        {name: 'Замухрышка Игорь Павлович', notification: true},
        {name: 'Овсянникова Елезавета Викторовна', notification: false},
    ];
    items: MenuItem[] = [];
    statuses: any[] = [];
    date!: Date[];
    @ViewChild('filter') filter!: ElementRef;
    test1 =  false;
    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    test(a: any) {
        console.log(a);
    }
    ngOnInit() {
        this.getTheDateEventFromTheApi(this.selectedDate);
        this.items = [
            {label: 'Обновить', icon: 'pi pi-refresh'},
            {label: 'Удалить', icon: 'pi pi-times'},
            {label: 'Angular.io', icon: 'pi pi-info', url: 'https://angular.io'},
            {separator: true},
            {label: 'Установки', icon: 'pi pi-cog'},
        ];
        

        
        this.customerService.getEvents().then((event) => {
            this.event = event;
            this.loading = false;
            console.log(this.event);
            // this.events.forEach((customer) => (customer.end = new Date(customer.end)));
        });
        
        this.statuses = [
            {label: 'Unqualified', value: 'unqualified'},
            {label: 'Qualified', value: 'qualified'},
            {label: 'New', value: 'new'},
            {label: 'Negotiation', value: 'negotiation'},
            {label: 'Renewal', value: 'renewal'},
            {label: 'Proposal', value: 'proposal'},
        ];
        
        this.representatives = [
            {name: 'Amy Elsner', image: 'amyelsner.png'},
            {name: 'Anna Fali', image: 'annafali.png'},
            {name: 'Asiya Javayant', image: 'asiyajavayant.png'},
            {name: 'Bernardo Dominic', image: 'bernardodominic.png'},
            {name: 'Elwin Sharvill', image: 'elwinsharvill.png'},
            {name: 'Ioni Bowcher', image: 'ionibowcher.png'},
            {name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png'},
            {name: 'Onyama Limba', image: 'onyamalimba.png'},
            {name: 'Stephen Shaw', image: 'stephenshaw.png'},
            {name: 'XuXue Feng', image: 'xuxuefeng.png'},
        ];
        
        this.nodeService.getFiles().then((files) => (this.files1 = files));
        this.nodeService.getFilesystem().then((files) => (this.files2 = files));
        this.nodeService.getFiles().then((files) => {
            this.files3 = [
                {
                    label: '/',
                    children: files,
                },
            ];
        });
        
        this.cols = [
            {field: 'name', header: 'Имя'},
            {field: 'size', header: 'Размер'},
            {field: 'type', header: 'Тип'},
        ];
    }
    
    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    
    editDate(date: Date) {
        this.selectedDate = date;
        this.getTheDateEventFromTheApi(date);
    }
    
    getTheDateEventFromTheApi(date: Date) {
        console.log(date);
    }
    
    filterPerson(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        this.filteredPersons = filtered;
    }
}
