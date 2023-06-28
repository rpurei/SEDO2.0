import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../services/layout.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  ngOnInit(): void {
    this.year = this.date.getFullYear();
  }
  constructor(public layoutService: LayoutService) {}
  date: Date = new Date();
  year: number = 0;
}
