import { Component } from '@angular/core';

@Component({
  selector: 'app-color-dashboard',
  templateUrl: './color-dashboard.component.html',
  styleUrls: ['./color-dashboard.component.scss']
})
export class ColorDashboardComponent {
  filtrosVisibles = {
    finca: true,
    weekInicial: true,
    weekFinal: true,
    per: false,
    color: true
  }
}
