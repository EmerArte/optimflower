import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { exposedApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterData = new BehaviorSubject<any>(null);
  getData = this.filterData.asObservable();
  
  constructor(private httpClient: HttpClient) {}
  getColors() {
    const url = exposedApi.API_FLOWER + '/api/getfiltroeficiencia';
    return this.httpClient.get(url);
  }
  getDates() {
    const url = exposedApi.API_FLOWER + '/api/getfiltroprediccion';
    return this.httpClient.get(url);
  }
  setDataWell(data: any) {
    this.filterData.next(data);
  }
}
