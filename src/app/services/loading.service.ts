import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
    private loading: boolean = false;
    constructor(){
    }

    getLoading(){
        return this.loading;
    }
    setLoading(isLoading: boolean){
        setTimeout(() => {
            this.loading = isLoading;
        }, 0);
       
    }
}