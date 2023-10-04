import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';
import { LoadingService } from 'src/app/services/loading.service';

interface WeekDto {
  value: number;
  display: string;
}
const actualDate: Date = new Date();
@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent implements OnInit {
  @Input('filtros') filtrosVisibles = {
    finca: true,
    weekInicial: true,
    weekFinal: false,
    variedad: true,
    per: true,
    color: true
  }


  weeks!: any[];
  finca!: any[];
  variedad!: any[];
  per: any[] | undefined;
  color: any[] | undefined;
  selectedWeek: string | undefined;
  formFilters: any;
  lastChangeFilterValue: any;


  constructor(private formBuilder: FormBuilder, private filterService: FilterService, private loadingService: LoadingService) {
    this.construirFormulario();
  }

  ngOnInit(): void {
    this.getFiltersData();
  }

  construirFormulario() {
    this.formFilters = this.formBuilder.group({
      finca: [null, Validators.required],
      color: [null, Validators.required],
      variedad: [null, Validators.required],
      per: [null, Validators.required],
      semanaInicial: [null, Validators.required],
      semanaFinal: [null, Validators.required],
    });
  }

  getFiltersData(){
    const color$ = this.filterService.getColors();
    const weeks$ = this.filterService.getDates();
    const variedad$ = this.filterService.getVariedad();
    this.loadingService.setLoading(true);
    forkJoin([color$, weeks$, variedad$]).subscribe(
      {
        next:(data:any[]) =>{
          this.color = data[0];
          this.weeks = data[1];
          this.variedad = data[2];
          this.finca = [
            {
              nombre: "Finca 1"
            }
          ];
          this.per = [
            {
              nombre: "Per 1"
            }
          ];
          this.loadingService.setLoading(false);
          this.detectChangeInFilters();
        },
        error:(err: any) =>{
          console.log(err)
          this.loadingService.setLoading(false);

        }
      }
    )
  }
  detectChangeInFilters(){
    this.formFilters.valueChanges.subscribe((e:any) => {
      if(JSON.stringify(this.lastChangeFilterValue) != JSON.stringify(e)){
        this.lastChangeFilterValue = e;
        if(e.finca != null && e.finca!= null  && e.color!= null 
           && e.color != null && e.variedad!= null 
           && e.variedad != null && e.per!= null  && e.per != null
           && e.semanaInicial != null  && e.semanaInicial != null
           && e.semanaFinal != null  && e.semanaFinal != null){
          this.filterService.setDataWell(e)
        }
      }
      
    });
  }
}
