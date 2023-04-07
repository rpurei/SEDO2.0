import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from "../../../api/product";
import { ProductService } from "../../../service/product.service";

@Component({
    templateUrl: './listdemo.component.html'
})
export class ListDemoComponent implements OnInit {

    products: Product[] = [];
    sortOptions: SelectItem[] = [];
    sortOrder: number = 0;
    sortField: string = '';
    sourceCities: any[] = [];
    targetCities: any[] = [];
    orderCities: any[] = [];

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.sourceCities = [
            {name: 'Белгород', code: 'BLG'},
            {name: 'Воронеж', code: 'VRN'},
            {name: 'Курск', code: 'KRS'}
        ];

        this.targetCities = [];

        this.orderCities = [
            {name: 'Белгород', code: 'BLG'},
            {name: 'Воронеж', code: 'VRN'},
            {name: 'Курск', code: 'KRS'}
        ];

        this.sortOptions = [
            { label: 'Цена по убыванию', value: '!price' },
            { label: 'Цена по возрастанию', value: 'price' }
        ];
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

}
