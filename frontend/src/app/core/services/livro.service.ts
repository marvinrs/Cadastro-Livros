import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Livro, ApiResponse, PaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private apiUrl = `${environment.apiUrl}/livros`;

  constructor(private http: HttpClient) { }

  listar(page: number = 1, perPage: number = 10, search?: string): Observable<PaginatedResponse<Livro>> {
    const params: any = { page, per_page: perPage };
    if (search) {
      params.search = search;
    }
    
    return this.http.get<PaginatedResponse<Livro>>(this.apiUrl, { params });
  }

  buscarPorId(id: number): Observable<Livro> {
    return this.http.get<ApiResponse<Livro>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data!));
  }

  criar(livro: Livro): Observable<Livro> {
    const payload = this.prepararPayload(livro);
    return this.http.post<ApiResponse<Livro>>(this.apiUrl, payload)
      .pipe(map(response => response.data!));
  }

  atualizar(id: number, livro: Livro): Observable<Livro> {
    const payload = this.prepararPayload(livro);
    return this.http.put<ApiResponse<Livro>>(`${this.apiUrl}/${id}`, payload)
      .pipe(map(response => response.data!));
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private prepararPayload(livro: Livro): any {
    return {
      titulo: livro.titulo,
      editora: livro.editora,
      edicao: livro.edicao,
      ano_publicacao: livro.ano_publicacao,
      valor: livro.valor,
      autores_ids: livro.autores?.map(a => a.cod_au) || [],
      assuntos_ids: livro.assuntos?.map(a => a.cod_as) || []
    };
  }
}
