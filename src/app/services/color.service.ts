import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exposedApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
    
  constructor(private httpClient: HttpClient) { }
  getTableData(initDate: string){
    const url = exposedApi.API_FLOWER + "/api/getprediccioncolor/" + initDate;
    return this.httpClient.get(url);
  }
  getGraphData(color: string){
    const url = exposedApi.API_FLOWER + "/api/getclaveleficiencia/" + color;
    return this.httpClient.get(url);
  }
}