import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, retry } from 'rxjs/operators';
import { Modem, Plano, planoDesk } from '../model';

@Injectable({
  providedIn: 'root'
})
export class PlanosService {
  // url_planMob = 'https://my-json-server.typicode.com/Danielpernnasc/data/planos_tablet';
  // url_plandek = 'https://my-json-server.typicode.com/Danielpernnasc/data/planos_desktop';
  // url_planwifi = 'https://my-json-server.typicode.com/Danielpernnasc/data/planos_wifi';
  url_planMob = 'https://dadofakeservidorapp.herokuapp.com/planos_tablet';
  url_plandek = 'https://dadofakeservidorapp.herokuapp.com/planos_desktop';
  url_planwifi = 'https://dadofakeservidorapp.herokuapp.com/planos_wifi';


  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPlanos(): Observable<[Plano]> {
    return this.httpClient.get<[Plano]>(this.url_planMob)
      .pipe(
        retry(2),
        catchError(this.handleError))
    };

  getPlanosdesk(): Observable<planoDesk[]>{
    return this.httpClient.get<planoDesk[]>(this.url_plandek)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  };

  getPlanoWifi(): Observable<Modem[]>{
    return this.httpClient.get<Modem[]>(this.url_planwifi)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  // getPlanosId(id: number): Observable<TI00001> {
  //   return this.httpClient.get<TI00001>(this.url_plan + '/' + id)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }

  
    handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {

        errorMessage = error.error.message;
      } else {
        errorMessage = `Código do erro: ${error.status},` + `messagem: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }

  }

