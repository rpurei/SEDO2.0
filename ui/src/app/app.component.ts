import { Component, OnInit } from '@angular/core';
import {PrimeNGConfig, Translation} from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'ui';
  subscription: Subscription | undefined;
  constructor(private config: PrimeNGConfig, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.addLangs(['ru', 'en']);
    this.translateService.setDefaultLang('ru');
    this.translateService.use('ru');
    this.translateService.get('ru').subscribe(res => this.config.setTranslation(res));
  }

  translate(lang: string) {
        this.translateService.use(lang);
        this.translateService.get(lang).subscribe(res => this.config.setTranslation(res));
  }
}
