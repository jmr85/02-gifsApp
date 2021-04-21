import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';
import { throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

    private apiKey     : string = 'E1Xs92016grdQgcmMAnfn0bSA6iBk9HV';
    private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

    public resultados: Gif[] = [];

    private _historial: string[] = [];

    errorHandler(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    }

    get historial() {
      return [...this._historial];
    }

    constructor(private http: HttpClient){
      
      this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];// si es null me devuelve un arreglo vacio
      this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];
      // if(localStorage.getItem('historial')){
      //     this._historial = JSON.parse( localStorage.getItem('historial')! );
      // }
      
    }

    buscarGifs( query: string = '' ){
      
      query = query.trim().toLowerCase();//borra espacios adelante/atras y convierte a minuscula

     /* solo va insertar si no existe */
      if( !this._historial.includes(query) ){
        this._historial.unshift(query);//inserta al inicio
        this._historial = this._historial.splice(0,10);//asigna a historial elemento 0 a 10

        localStorage.setItem('historial', JSON.stringify( this._historial ) );
        
      }

      const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);

      this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, {params})
        .pipe(catchError(this.errorHandler))
        .subscribe((resp) => {
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify( this.resultados ) );
        });
    }
}