import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Autor } from '../../../core/models';
import { AutorService } from '../../../core/services/autor.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AutorFormComponent } from '../autor-form/autor-form.component';

@Component({
  selector: 'app-autor-list',
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.scss']
})
export class AutorListComponent implements OnInit {
  displayedColumns: string[] = ['cod_au', 'nome', 'livros_count', 'acoes'];
  dataSource = new MatTableDataSource<Autor>();
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private autorService: AutorService,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.carregarAutores();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarAutores(): void {
    this.loading = true;
    this.autorService.listar().subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.notification.error('Erro ao carregar autores');
        this.loading = false;
      }
    });
  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirFormulario(autor?: Autor): void {
    const dialogRef = this.dialog.open(AutorFormComponent, {
      width: '600px',
      data: autor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarAutores();
      }
    });
  }

  excluir(autor: Autor): void {
    if (confirm(`Deseja excluir o autor "${autor.nome}"?`)) {
      this.autorService.excluir(autor.cod_au!).subscribe({
        next: () => {
          this.notification.success('Autor excluído com sucesso');
          this.carregarAutores();
        },
        error: (error) => {
          this.notification.error(error.message || 'Erro ao excluir autor');
        }
      });
    }
  }
}
