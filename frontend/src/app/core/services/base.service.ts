import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  protected apiUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  protected getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  protected handleError(error: any): Observable<never> {
    let errorMessage = 'Ocorreu um erro inesperado';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
    }

    console.error('Erro na API:', error);
    return throwError(() => new Error(errorMessage));
  }

  protected buildParams(params: any): HttpParams {
    let httpParams = new HttpParams();

    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        if (Array.isArray(params[key])) {
          params[key].forEach((value: any) => {
            httpParams = httpParams.append(`${key}[]`, value.toString());
          });
        } else {
          httpParams = httpParams.append(key, params[key].toString());
        }
      }
    });

    return httpParams;
  }
}
