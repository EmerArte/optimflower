import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface WeekDto{
  value: number,
  display: string
}
const actualDate: Date = new Date();
@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit{
  
  weeks: WeekDto[] | undefined;
  selectedWeek: number | undefined;
  formFilters: any;
  constructor(private router: Router,
    private formBuilder: FormBuilder,){
      this.construirFormulario();
  }



  ngOnInit(): void {
    this.weeks = Array.from({ length: this.getWeek() }, (_, index) => {
      const value = index + 1;
      index = value;
      return {value: value, display: "Semana " + value}
    });
  }


  construirFormulario() {
    this.formFilters = this.formBuilder.group({
      finca: [null, Validators.required],
      color: [null, Validators.required],
      per: [null, Validators.required],
      semanaInicial: [null, Validators.required],
      semanaFinal: [null, Validators.required]
    });
  }











  getWeek() {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
  }
}
