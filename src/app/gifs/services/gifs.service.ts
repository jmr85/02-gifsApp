import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
    
    private apiKey: string = 'E1Xs92016grdQgcmMAnfn0bSA6iBk9HV';
    private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
    private _historial: string[] = [];

    get historial() {
      return [...this._historial];
    }

    async buscarGifs( query: string = '' ){
      
    
      const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=E1Xs92016grdQgcmMAnfn0bSA6iBk9HV&q=simpsons&limit=10');
      const data = await resp.json();
      console.log(data); 
      //console.log(this._historial);//solo para ver que se este grabando
    }
}
