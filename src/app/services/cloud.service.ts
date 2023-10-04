import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exposedApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CloudService {
    constructor(private httpClient: HttpClient) { }

    getNubeVariedad(variedad: any){
        const url = exposedApi.API_FLOWER + "/api/getnubebyvariedad/" + variedad;
        return this.httpClient.get(url);
    }
    getRegresionByVariedad(variedad: any, outlier: any){
        const url = exposedApi.API_FLOWER + "/api/getregresionbyvariedad/" + variedad + "/" + outlier;
        return this.httpClient.get(url);
    }
}