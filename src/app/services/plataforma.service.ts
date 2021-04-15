import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {
  url_tablet = 'http://localhost:3001/tablet';
  url_desktop = 'http://localhost:3001/desktop';
  url_wifi = 'http://localhost:3001/wifi';
 

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPlataformasTablet(): Observable<[any]> {
    return this.httpClient.get<[any]>(this.url_tablet)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getPlataformaDesk(): Observable<[any]>{
    return this.httpClient.get<[any]>(this.url_desktop)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getPlataformaWifi(): Observable<[any]>{
    return this.httpClient.get<any>(this.url_wifi)
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
