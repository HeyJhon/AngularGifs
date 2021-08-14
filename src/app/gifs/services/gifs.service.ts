import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Gif,SearchGiftResponse } from '../interfaces/gif.interface';
@Injectable({
  providedIn: 'root'
})
export class GifsService {

private apiKey :string = 'bYiFLRXEkbREeq7a3eQPnVbN5nXkZP9z';
private _historial: string[] = [];
private servicioUrl = 'https://api.giphy.com/v1/gifs';

public resultados : Gif[] = [];

get historial(){
  return [...this._historial]
}

  constructor(private _http : HttpClient){

     if( localStorage.getItem('historial')){
       this._historial = JSON.parse(localStorage.getItem('historial')!);
     }

     this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs(query: string){

    query = query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){

      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', 10)
    .set('q', query);
    console.log(params.toString());
    this._http.get<SearchGiftResponse>(`${this.servicioUrl}/search`,{params})
              .subscribe( (resp) =>{
                  this.resultados = resp.data;
                  console.log(resp.data);
                  localStorage.setItem('resultados', JSON.stringify(this.resultados));

              });
    
  }

}
