import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, retry } from 'rxjs/operators';
import { Plano, TI00001 } from '../model';

@Injectable({
  providedIn: 'root'
})
export class PlanosService {
  url_plan = 'http://localhost:3001/planos';
  url_ti00001 = 'http://localhost:3001/TI00001'

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPlanos(): Observable<Plano[]> {
    return this.httpClient.get<Plano[]>(this.url_plan)
      .pipe(
        retry(2),
        catchError(this.handleError))
    };

  getTI01(): Observable<TI00001[]>{
    return this.httpClient.get<TI00001[]>(this.url_ti00001)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  };

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

