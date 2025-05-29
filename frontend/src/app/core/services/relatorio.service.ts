import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Estatisticas, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private apiUrl = `${environment.apiUrl}/relatorios`;

  constructor(private http: HttpClient) { }

  obterEstatisticas(): Observable<Estatisticas> {
    return this.http.get<ApiResponse<Estatisticas>>(`${this.apiUrl}/estatisticas`)
      .pipe(map(response => response.data!));
  }

  gerarRelatorioPDF(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/livros?formato=pdf`, {
      responseType: 'blob'
    });
  }

  exportarExcel(tipo: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/exportar/${tipo}?formato=excel`, {
      responseType: 'blob'
    });
  }
}
