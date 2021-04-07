import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PlataformaService {
  url_plat = 'http://localhost:3000/plataformas';
  url_plan = 'http://localhost:3000/planos';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPlataformas(id: number): Observable<[]> {
    return this.httpClient.get<[]>(this.url_plat + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getPlanos(): Observable<[]> {
    return this.httpClient.get<[]>(this.url_plan)
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
