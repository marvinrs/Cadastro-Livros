import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Assunto, ApiResponse, PaginatedResponse } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {
  private apiUrl = `${environment.apiUrl}/assuntos`;

  constructor(private http: HttpClient) { }

  listar(page: number = 1, perPage: number = 10, search?: string): Observable<PaginatedResponse<Assunto>> {
    const params: any = { page, per_page: perPage };
    if (search) {
      params.search = search;
    }

    return this.http.get<PaginatedResponse<Assunto>>(this.apiUrl, { params });
  }

  listarTodos(): Observable<Assunto[]> {
    return this.http.get<ApiResponse<Assunto[]>>(`${this.apiUrl}/todos`)
      .pipe(map(response => response.data!));
  }

  buscarPorId(id: number): Observable<Assunto> {
    return this.http.get<ApiResponse<Assunto>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data!));
  }

  criar(assunto: Assunto): Observable<Assunto> {
    return this.http.post<ApiResponse<Assunto>>(this.apiUrl, assunto)
      .pipe(map(response => response.data!));
  }

  atualizar(id: number, assunto: Assunto): Observable<Assunto> {
    return this.http.put<ApiResponse<Assunto>>(`${this.apiUrl}/${id}`, assunto)
      .pipe(map(response => response.data!));
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
