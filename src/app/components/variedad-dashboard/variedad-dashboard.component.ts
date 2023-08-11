import { Component, OnInit } from '@angular/core';
import { data } from '../base/utilities/per1';
import { Week } from '../base/models/week.model';
import { WeekProduction } from '../base/models/weekproduction.model';

@Component({
  selector: 'app-variedad-dashboard',
  templateUrl: './variedad-dashboard.component.html',
  styleUrls: ['./variedad-dashboard.component.scss'],
})
export class VariedadDashboardComponent implements OnInit {
  datos: Week[] = [];
  semanas: any[] = [];
  constructor() {}
  ngOnInit(): void {
    this.transformData();
  }
  transformData() {
    data.forEach((element) => {
      let week: Week | any = {};
      week.color = element.name;
      let titulo = 18;
      const weekProdArray: WeekProduction[] = [];
      element.produccion.forEach((res: number) => {
        let weekProd: WeekProduction = {
          value: Number.parseFloat((res * 100).toFixed(2)),
          name: '2023-' + titulo,
        };
        titulo++;
        weekProdArray.push(weekProd);
      });
      week.week = weekProdArray;
      this.datos.push(week);
    });
    this.getSemanas();
    console.log(this.semanas);
    
  }
  getSemanas() {
    const val = this.datos[0];
    val.week.forEach((week: WeekProduction) => {
      this.semanas.push({
        name: week.name,
        values: this.getValues(week.name)
      });
    });
  }
  getValues(nombreSemana: string){
    const valuesByWeek: number[] = [];
    this.datos.forEach((data: Week) =>{
      data.week.forEach((value: WeekProduction)=>{
        if(nombreSemana == value.name){
          valuesByWeek.push(value.value);
        }
      })
    })
    return valuesByWeek;
  }
}
