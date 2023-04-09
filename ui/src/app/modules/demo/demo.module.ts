import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { PagesModule } from "../pages/pages.module";
import { ConfigModule } from "../config/config.module";
import { CountryService } from "./service/country.service";
import { CustomerService } from "./service/customer.service";
import { EventService } from "./service/event.service";
import { IconService } from "./service/icon.service";
import { PhotoService } from "./service/photo.service";
import { ProductService } from "./service/product.service";
import { NodeService } from "./service/node.service";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { ConfirmationComponent } from "./components/uikit/menus/confirmation.component";
import { PaymentComponent } from "./components/uikit/menus/payment.component";
import { PersonalComponent } from "./components/uikit/menus/personal.component";
import { SeatComponent } from "./components/uikit/menus/seat.component";


@NgModule({
  declarations: [
    DemoComponent,
    NotfoundComponent,
    ConfirmationComponent,
    PaymentComponent,
    PersonalComponent,
    SeatComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    PagesModule,
    ConfigModule
  ],
  providers: [
              CountryService,
              CustomerService,
              EventService,
              IconService,
              NodeService,
              PhotoService,
              ProductService
  ],
  exports: [
            NotfoundComponent,
            ConfirmationComponent,
            PaymentComponent,
            PersonalComponent,
            SeatComponent
  ]
})
export class DemoModule { }
