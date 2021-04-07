import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Clientes } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'http://localhost:3000/plataformas';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getClient(): Observable<[Clientes]> {
    return this.httpClient.get<[Clientes]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  saveClient(cliente: Clientes): Observable<Clientes> {
    return this.httpClient.post<Clientes>(this.url, JSON.stringify(cliente), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  updateClient(cliente: Clientes): Observable<Clientes> {
    return this.httpClient.put<Clientes>(this.url + '/ ' + cliente.id, JSON.stringify(cliente),
  this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  deleteClient(cliente: Clientes) {
    return this.httpClient.delete<Clientes>(this.url+ '/' + cliente.id, this.httpOptions)
      .pipe(
        retry(1),
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
