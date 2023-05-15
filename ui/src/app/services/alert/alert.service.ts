import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    constructor(private service: MessageService) {
    }
    
    private defaultKey = 'overlay';
    
    success(message: string) {
        this.service.add({key: this.defaultKey, severity: 'success', summary: 'Успешно', detail: message});
    }
    
    error(message: string) {
        this.service.add({key: this.defaultKey, severity: 'error', summary: 'Ошибка', detail: message});
    }
    
    info(message: string) {
        this.service.add({key: this.defaultKey, severity: 'info', summary: 'Информация', detail: message});
    }
    
    warning(message: string) {
        this.service.add({key: this.defaultKey, severity: 'warn', summary: 'Предупреждение', detail: message});
    }
    
    clear(id = this.defaultKey) {
        this.service.clear(id);
    }
}
