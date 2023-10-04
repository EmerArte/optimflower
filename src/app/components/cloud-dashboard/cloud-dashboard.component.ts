import { Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { Subscription } from 'rxjs';
import { CloudService } from 'src/app/services/cloud.service';
import { FilterService } from 'src/app/services/filter.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-cloud-dashboard',
  templateUrl: './cloud-dashboard.component.html',
  styleUrls: ['./cloud-dashboard.component.scss']
})
export class CloudDashboardComponent implements OnInit {
  filtrosVisibles = {
    finca: true,
    weekInicial: true,
    weekFinal: false,
    variedad: true,
    per: false,
    color: true,
  };
  filterSubscription: Subscription | undefined;

  @ViewChild('chartProduccion') chartProduccion!: UIChart;
  produccion: any;
  produccionOpts: any;
  
  variedadSeleccionada: any;


  constructor(private cloudService: CloudService, private filterService: FilterService, private loadingService: LoadingService
    ) {
    this.construirGraficaProduccion();

  }
  ngOnInit(): void {
    this.filterSubscription = this.filterService.getData.subscribe({
      next: (filterData: any) => {

        
        if (filterData) {
          if(this.variedadSeleccionada != filterData.variedad){
            this.loadingService.setLoading(true);
            this.variedadSeleccionada = filterData.variedad;
            this.cloudService.getNubeVariedad(filterData.variedad.R_VARIEDAD_ID).subscribe({
              next: (data: any) => {
                let labels = data as any[];
                labels = labels.map((item: any) => {
                  return item.EDAD
                });
                let dataValues = data as any[];
                dataValues = dataValues.map((item: any) => {
                  return Number(item.INDICE).toFixed(2);
                });
                this.loadingService.setLoading(false);
                this.produccion.labels = labels;
                this.produccion.datasets[0].data = dataValues;
                this.chartProduccion.refresh();
              },
              error: (err: any) => {
                this.loadingService.setLoading(false);
                console.log(err);
              }
            });
          }else{
            this.loadingService.setLoading(false);
          }
        }



      },
      error: (err: any) => {
        this.loadingService.setLoading(false);
        console.log(err);
      }
    });
  }
  ngOnDestroy(): void {
    this.filterSubscription?.unsubscribe();
  }

  construirGraficaProduccion() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.produccion = {
      labels: [],
      datasets: [
        {
          label: 'Indice',
          data: [],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          tension: 0.4,
        }
      ],
    };

    this.produccionOpts = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        tooltip: {
        },
        title: {
          display: true,
          text: 'Edad VS índice',
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          title:{
            display: true,
            text: 'Edad'
          },
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          title:{
            display: true,
            text: 'Índice'
          },
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

  construirGraficaTallos() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.produccion = {
      labels: [],
      datasets: [
        {
          label: 'Indice',
          data: [],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          tension: 0.4,
        }
      ],
    };

    this.produccionOpts = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        tooltip: {
        },
        title: {
          display: true,
          text: 'Edad VS índice',
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          title:{
            display: true,
            text: 'Edad'
          },
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          title:{
            display: true,
            text: 'Índice'
          },
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



}
