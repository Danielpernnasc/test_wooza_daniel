import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Tablet } from '../model';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {
  url ='https://my-json-server.typicode.com/Danielpernnasc/data/plataforma'



 

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPlataformasTablet(): Observable<[Tablet]> {
    return this.httpClient.get<[Tablet]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getPlataformaDesk(): Observable<[any]>{
    return this.httpClient.get<[any]>(this.url)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getPlataformaWifi(): Observable<[any]>{
    return this.httpClient.get<any>(this.url)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do error: ${error.status},`+`messagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
