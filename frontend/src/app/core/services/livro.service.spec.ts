import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LivroService } from './livro.service';
import { environment } from '../../../environments/environment';
import { Livro, ApiResponse, PaginatedResponse } from '../models';

describe('LivroService', () => {
  let service: LivroService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/livros`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LivroService]
    });
    service = TestBed.inject(LivroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list livros', () => {
    const mockResponse: PaginatedResponse<Livro> = {
      data: [{ titulo: 'Livro Teste', editora: 'Editora A', edicao: 1, ano_publicacao: "2023", valor: 100, autores: [], assuntos: [] }],
      total: 1,
      current_page: 1,
      per_page: 10,
      last_page: 0,
      from: 0,
      to: 0
    };

    service.listar(1, 10).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}?page=1&per_page=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch livro by ID', () => {
    const mockLivro: ApiResponse<Livro> = {
      data: { titulo: 'Livro Teste', editora: 'Editora A', edicao: 1, ano_publicacao: "2023", valor: 100, autores: [], assuntos: [] },
      success: false
    };

    service.buscarPorId(1).subscribe(livro => {
      expect(livro).toEqual(mockLivro.data);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLivro);
  });

  it('should create a livro', () => {
    const mockLivro: ApiResponse<Livro> = {
      data: { titulo: 'Novo Livro', editora: 'Editora X', edicao: 2, ano_publicacao: "2024", valor: 150, autores: [], assuntos: [] },
      success: false
    };

    service.criar(mockLivro.data).subscribe(livro => {
      expect(livro).toEqual(mockLivro.data);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockLivro);
  });

  it('should update a livro', () => {
    const updatedLivro: ApiResponse<Livro> = {
      data: { titulo: 'Livro Atualizado', editora: 'Editora Y', edicao: 3, ano_publicacao: "2025", valor: 200, autores: [], assuntos: [] },
      success: false
    };

    service.atualizar(1, updatedLivro.data).subscribe(livro => {
      expect(livro).toEqual(updatedLivro.data);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedLivro);
  });

  it('should delete a livro', () => {
    service.excluir(1).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
