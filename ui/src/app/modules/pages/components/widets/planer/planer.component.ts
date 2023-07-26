import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-planer',
    templateUrl: './planer.component.html',
    styleUrls: ['./planer.component.scss']
})
export class PlanerComponent implements OnInit {
    items: any;
    tasks: any;
    pieOptions: any;
    
    ngOnInit(): void {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
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
        this.items = [
            {label: 'Добавить', icon: 'pi pi-fw pi-plus'},
            {label: 'Удалить', icon: 'pi pi-fw pi-minus'}
        ];
        this.tasks = {
            labels: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'],
            datasets: [
                {
                    label: 'Количество задач: ',
                    data: [2, 0, 7, 3, 4, 5],
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
    }
    
}
