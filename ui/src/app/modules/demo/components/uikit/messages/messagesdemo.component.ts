import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Component({
    templateUrl: './messagesdemo.component.html',
    providers: [MessageService]
})
export class MessagesDemoComponent {

    msgs: Message[] = [];

    constructor(private service: MessageService) { }

    showInfoViaToast() {
        this.service.add({ severity: 'info', summary: 'Информация', detail: 'Информационное сообщение' });
    }

    showWarnViaToast() {
        this.service.add({ key: 'tst', severity: 'warn', summary: 'Предупреждение', detail: 'Есть несохраненные изменения' });
    }

    showErrorViaToast() {
        this.service.add({ key: 'tst', severity: 'error', summary: 'Ошибка', detail: 'Ошибка валидации' });
    }

    showSuccessViaToast() {
        this.service.add({ key: 'tst', severity: 'success', summary: 'Успешно', detail: 'Сообщение отправлено' });
    }

    showInfoViaMessages() {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Информация', detail: 'Информационное сообщение' });
    }

    showWarnViaMessages() {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Предупреждение', detail: 'Есть несохраненные изменения' });
    }

    showErrorViaMessages() {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка валидации' });
    }

    showSuccessViaMessages() {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Успешно', detail: 'Сообщение отправлено' });
    }

}
