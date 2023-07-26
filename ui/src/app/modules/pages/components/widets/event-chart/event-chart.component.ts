import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../../../services/events.service';
import { IQuantityEvents } from '../../../../../models/IEvent';

@Component({
    selector: 'app-event-chart',
    templateUrl: './event-chart.component.html',
    styleUrls: ['./event-chart.component.scss']
})
export class EventChartComponent implements OnInit {
    constructor(private eventsService: EventsService) {
    }
    items: any;
    tasks: any;
    pieOptions: any;
    quantityEvents: IQuantityEvents = {} as IQuantityEvents;
    quantityEventsForUser: string = '';
    isLoading: boolean = true;
    
    getQuantityEvents(quantityEventsForUser: string) {
        this.isLoading = true;
        this.eventsService.getQuantityEvents(quantityEventsForUser).subscribe({
            next: value => {
                this.isLoading = false;
                this.quantityEvents = value;
                this.quantityEvents.total.duration = Math.round(this.quantityEvents.total.duration / 60);
                for (const day in this.quantityEvents) {
                    if (this.quantityEvents.hasOwnProperty(day) && day !== 'total') {
                        // @ts-ignore
                        this.tasks.datasets[0].data.push(this.quantityEvents[day].eventsQuantity);
                    }
                }
                
                console.log(this.tasks.datasets[0].data);
            }
        });
    }
    
    ngOnInit() {
        this.quantityEventsForUser = JSON.parse(localStorage.getItem('user')!).id;
        this.getQuantityEvents(this.quantityEventsForUser);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        this.items = [
            {
                label: 'Добавить', icon: 'pi pi-fw pi-plus', command: () => {
                    console.log('god');
                }
            },
            {label: 'Удалить', icon: 'pi pi-fw pi-minus'}
        ];
        this.tasks = {
            labels: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
            datasets: [
                {
                    label: 'Количество задач: ',
                    data: [],
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400'),
                        documentStyle.getPropertyValue('--yellow-400'), // Добавлен новый цвет --red-400
                        documentStyle.getPropertyValue('--green-400') // Добавлен новый цвет --green-400
                    ]
                }]
        };
        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }
    
    
}
