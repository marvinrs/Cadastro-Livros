// Autor
export interface Autor {
  cod_au?: number;
  nome: string;
  created_at?: Date;
  updated_at?: Date;
  livros_count?: number;
}

// Assunto
export interface Assunto {
  cod_as?: number;
  descricao: string;
  created_at?: Date;
  updated_at?: Date;
  livros_count?: number;
}

// Livro
export interface Livro {
  codl?: number;
  titulo: string;
  editora: string;
  edicao: number;
  ano_publicacao: string;
  valor: number;
  valor_formatado?: string;
  capa_url?: string;
  autores?: Autor[];
  assuntos?: Assunto[];
  created_at?: Date;
  updated_at?: Date;
}

// Relatório
export interface RelatorioLivro {
  cod_au: number;
  nome_autor: string;
  codl: number;
  titulo: string;
  editora: string;
  edicao: number;
  ano_publicacao: string;
  valor: number;
  assunto: string;
}

// Estatísticas
export interface Estatisticas {
  total_livros: number;
  total_autores: number;
  total_assuntos: number;
  valor_medio: number;
  valor_total: number;
  valor_maximo: number;
  valor_minimo: number;
  valor_medio_formatado?: string;
  valor_total_formatado?: string;
  valor_maximo_formatado?: string;
  valor_minimo_formatado?: string;
}

// Response da API
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
}

// Paginação
export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

// Usuario (para autenticação futura)
export interface Usuario {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: 'admin' | 'operator' | 'viewer';
  created_at?: Date;
  updated_at?: Date;
}

// Login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: Usuario;
  token: string;
}
