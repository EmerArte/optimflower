import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoadingService } from './services/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'optimflower';
  constructor(
    private primengConfig: PrimeNGConfig,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
  isLoading(){
    return this.loadingService.getLoading();
  }
}
