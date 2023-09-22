import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Week } from '../base/models/week.model';
import { WeekProduction } from '../base/models/weekproduction.model';
import { FilterService } from 'src/app/services/filter.service';
import { ColorService } from 'src/app/services/color.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-color-dashboard',
  templateUrl: './color-dashboard.component.html',
  styleUrls: ['./color-dashboard.component.scss'],
})
export class ColorDashboardComponent implements OnInit, OnDestroy {
  datos: Week[] = [];
  semanas: any[] = [];

  @ViewChild('chartPredictionLine') chartPredictionLine!: UIChart;
  prediccion: any;
  prediccionOpts: any;

  @ViewChild('chartEficiencia') chartEficiencia!: UIChart;
  eficiencia: any;
  eficienciaOpts: any;

  produccionPie: any;
  produccionPieOps: any;

  filtrosVisibles = {
    finca: true,
    weekInicial: true,
    weekFinal: true,
    per: false,
    color: true,
  };
  filterSubscription: Subscription | undefined;

  constructor(
    private filterService: FilterService,
    private colorService: ColorService,
    private loadingService: LoadingService
  ) {}
  ngOnDestroy(): void {
    this.filterSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.prediccionGrafica();
    this.produccionPieGrafica();
    this.eficienciaGrafica();
    this.filterSubscription = this.filterService.getData.subscribe({
      next: (filterData: any) => {
        this.loadingService.setLoading(true);
        if (filterData) {
          const color = (filterData.color as string).replace(' ', '%20');
          if (color) {
            const getTableData$ = this.colorService.getTableData(
              filterData.semanaInicial
            );
            const getGraphData$ = this.colorService.getGraphData(color);
            this.loadData(
              getTableData$,
              getGraphData$,
              filterData.semanaInicial
            );
          }
        }
      },
    });
  }

  prediccionGrafica() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.prediccion = {
      labels: [],
      datasets: [
        {
          label: 'Predición',
          data: [],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
        {
          label: 'Real',
          data: [],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          tension: 0.4,
        },
      ],
    };

    this.prediccionOpts = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: 'Grafica de produccion estimada vs real',
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
  eficienciaGrafica() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.eficiencia = {
      labels: [],
      datasets: [
        {
          label: 'Estimada',
          data: [],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0,
        },
        {
          label: 'Real',
          data: [],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          tension: 0,
        },
      ],
    };

    this.eficienciaOpts = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: 'Grafica de eficiencia estimada vs real',
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          type: 'linear',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          type: 'linear',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  produccionPieGrafica() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.produccionPie = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };

    this.produccionPieOps = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };
  }

  transformDataTable(array: any[]) {
    const colores: any[] = [];
    this.datos.length = 0;
    this.semanas.length = 0;
    array.forEach((objeto) => {
      if (colores.indexOf(objeto.COLOR) == -1) {
        colores.push(objeto.COLOR);
      }
    });
    colores.forEach((color) => {
      const result: WeekProduction[] = array
        .filter((val: any) => {
          return val.COLOR == color;
        })
        .map((object: any) => {
          return {
            name: object.SEMANA_AN,
            value: object.PREDICCION,
          };
        });
      const dataWeek: Week = {
        week: result,
        color: color,
      };
      this.datos.push(dataWeek);
    });
    this.getSemanas();
  }
  getSemanas() {
    const val = this.datos[0];
    val.week.forEach((week: WeekProduction) => {
      this.semanas.push({
        name: week.name,
        values: this.getValues(week.name),
      });
    });
  }
  getValues(nombreSemana: string) {
    const valuesByWeek: number[] = [];
    this.datos.forEach((data: Week) => {
      data.week.forEach((value: WeekProduction) => {
        if (nombreSemana == value.name) {
          valuesByWeek.push(value.value);
        }
      });
    });
    return valuesByWeek;
  }
  findProductionValues(semana: string, color: string, array: any[]) {
    return array
      .filter((val: any) => {
        return val.SEMANA_AN == semana && val.COLOR == color;
      })
      .map((object: any) => {
        return object.PREDICCION;
      });
  }

  loadData(
    getTableData$: Observable<any>,
    getGraphData$: Observable<any>,
    fechaInicial: string
  ) {
    forkJoin([getTableData$, getGraphData$]).subscribe({
      next: (value: any[]) => {
        const dataTable = value[0];
        const graphData = value[1];
        this.loadTableData(dataTable);
        this.loadPrediccionData(graphData, fechaInicial);
        this.loadingService.setLoading(false);
      },
    });
  }

  loadPrediccionData(value: any, fechaInicial: string) {
    const response: any[] = value as any[];
    const weeksPrediction = response
      .filter((value: any) => {
        return value.SEMANA_PRED == fechaInicial;
      })
      .map((value: any) => {
        const year = (value.SEMANA_PROD as string).substring(0,3);
        const weekDate =  (value.SEMANA_PROD as string).substring(4,5);
        return year + "-" + weekDate;
      });
    const predictedProduction = response
      .filter((value: any) => {
        return value.SEMANA_PRED == fechaInicial;
      })
      .map((value: any) => {
        return value.PREDICCION as number;
      });
    const realProduction = response
      .filter((value: any) => {
        return value.SEMANA_PRED == fechaInicial;
      })
      .map((value: any) => {
        return value.PRODUCCION as number;
      });
    const dataEficiencia = response
      .filter((value: any) => {
        return value.SEMANA_PRED == fechaInicial;
      })
      .map((value: any) => {
        return value.EFICIENCIA;
      });
    this.prediccion.labels = weeksPrediction;
    this.eficiencia.labels = weeksPrediction;
    this.prediccion.datasets[0].data = predictedProduction;
    this.prediccion.datasets[1].data = realProduction;
    this.eficiencia.datasets[1].data = dataEficiencia;
    this.eficiencia.datasets[0].data = dataEficiencia.flatMap(() => 115);
    this.chartEficiencia.reinit();
    this.chartPredictionLine.reinit();
  }
  loadTableData(dataTable: any) {
    this.transformDataTable(dataTable);
  }
}
