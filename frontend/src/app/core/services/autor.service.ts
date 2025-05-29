import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Autor, ApiResponse, PaginatedResponse } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private apiUrl = `${environment.apiUrl}/autores`;

  constructor(private http: HttpClient) { }

  listar(page: number = 1, perPage: number = 10, search?: string): Observable<PaginatedResponse<Autor>> {
    const params: any = { page, per_page: perPage };
    if (search) {
      params.search = search;
    }

    return this.http.get<PaginatedResponse<Autor>>(this.apiUrl, { params });
  }

  listarTodos(): Observable<Autor[]> {
    return this.http.get<ApiResponse<Autor[]>>(`${this.apiUrl}/todos`)
      .pipe(map(response => response.data!));
  }

  buscarPorId(id: number): Observable<Autor> {
    return this.http.get<ApiResponse<Autor>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data!));
  }

  criar(autor: Autor): Observable<Autor> {
    return this.http.post<ApiResponse<Autor>>(this.apiUrl, autor)
      .pipe(map(response => response.data!));
  }

  atualizar(id: number, autor: Autor): Observable<Autor> {
    return this.http.put<ApiResponse<Autor>>(`${this.apiUrl}/${id}`, autor)
      .pipe(map(response => response.data!));
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
