import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Livro } from '../../../core/models';

@Component({
  selector: 'app-livro-list',
  templateUrl: './livro-list.component.html',
  styleUrls: ['./livro-list.component.scss']
})
export class LivroListComponent implements OnInit {
  displayedColumns: string[] = ['codl', 'titulo', 'editora', 'valor', 'autores', 'acoes'];
  dataSource = new MatTableDataSource<Livro>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarLivros(): void {
    // TODO: Implementar chamada ao service
    // Por enquanto, dados mockados
    this.dataSource.data = [
      {
        codl: 1,
        titulo: 'Dom Casmurro',
        editora: 'Editora Globo',
        edicao: 1,
        ano_publicacao: '1899',
        valor: 45.90,
        valor_formatado: 'R$ 45,90',
        autores: [{ cod_au: 1, nome: 'Machado de Assis' }],
        assuntos: [{ cod_as: 1, descricao: 'Romance' }]
      }
    ];
  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  novo(): void {
    this.router.navigate(['/livros/novo']);
  }

  editar(livro: Livro): void {
    this.router.navigate(['/livros', livro.codl, 'editar']);
  }

  excluir(livro: Livro): void {
    if (confirm(`Deseja excluir o livro "${livro.titulo}"?`)) {
      // TODO: Implementar exclusão
      console.log('Excluir:', livro);
    }
  }
}
