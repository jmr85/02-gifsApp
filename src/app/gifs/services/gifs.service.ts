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

    buscarGifs( query: string = '' ){
      
      query = query.trim().toLowerCase();//borra espacios adelante/atras y convierte a minuscula

     /* solo va insertar si no existe */
      if( !this._historial.includes(query) ){
        this._historial.unshift(query);//inserta al inicio
        this._historial = this._historial.splice(0,10);//asigna a historial elemento 0 a 10
      }
      console.log(this._historial);//solo para ver que se este grabando
    }
}
