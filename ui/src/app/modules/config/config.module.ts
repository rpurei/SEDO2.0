import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { SidebarModule } from "primeng/sidebar";
import { ButtonModule } from "primeng/button";
import { RadioButtonModule } from "primeng/radiobutton";
import { FormsModule } from "@angular/forms";
import { InputSwitchModule } from "primeng/inputswitch";



@NgModule({
  declarations: [
    ConfigComponent
  ],
  exports: [
    ConfigComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    RadioButtonModule,
    FormsModule,
    InputSwitchModule
  ]
})
export class ConfigModule { }
