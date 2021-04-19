import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

    public resultados: Gif[] = [];

    private _historial: string[] = [];

    get historial() {
      return [...this._historial];
    }

    constructor(private http: HttpClient){}

    buscarGifs( query: string = '' ){
      
      query = query.trim().toLowerCase();//borra espacios adelante/atras y convierte a minuscula

     /* solo va insertar si no existe */
      if( !this._historial.includes(query) ){
        this._historial.unshift(query);//inserta al inicio
        this._historial = this._historial.splice(0,10);//asigna a historial elemento 0 a 10
      }

      this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=E1Xs92016grdQgcmMAnfn0bSA6iBk9HV&q=${ query }&limit=10`)
        .subscribe((resp) => {
          console.log(resp.data);
          this.resultados = resp.data;
        });
    }
}
