import { Component, OnInit } from '@angular/core';
import { Week } from '../base/models/week.model';
import { WeekProduction } from '../base/models/weekproduction.model';
import { data } from '../base/utilities/per1';

@Component({
  selector: 'app-color-dashboard',
  templateUrl: './color-dashboard.component.html',
  styleUrls: ['./color-dashboard.component.scss']
})
export class ColorDashboardComponent implements OnInit{

  datos: Week[] = [];
  semanas: any[] = [];

  prediccion: any;
  prediccionOpts: any;

  produccionPie:any;
  produccionPieOps:any;

  filtrosVisibles = {
    finca: true,
    weekInicial: true,
    weekFinal: true,
    per: false,
    color: true
  }
  ngOnInit(): void {
    this.transformData();
    this.prediccionGrafica();
    this.produccionPieGrafica();
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

  prediccionGrafica(){
    const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.prediccion = {
            labels: ['11', '12', '13', '14', '15', '16', '17', '18', '19'],
            datasets: [
                {
                    label: 'Predición',
                    data: [58293, 46234, 45656, 66563, 24244, 12345, 45674, 24356, 58293],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Real',
                    data: [43234, 36234, 25656, 60063, 20345, 14345, 45631, 31323, 32244],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--yellow-500'),
                    tension: 0.4
                }
            ]
        };

        this.prediccionOpts = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
  }
  produccionPieGrafica(){
    const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.produccionPie = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };


        this.produccionPieOps = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
  }
}
