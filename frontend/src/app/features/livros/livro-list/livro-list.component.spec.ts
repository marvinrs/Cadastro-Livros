import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivroListComponent } from './livro-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { Livro } from '../../../core/models';

describe('LivroListComponent', () => {
  let component: LivroListComponent;
  let fixture: ComponentFixture<LivroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule
      ],
      declarations: [LivroListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize displayedColumns correctly', () => {
    expect(component.displayedColumns).toEqual(['codl', 'titulo', 'editora', 'valor', 'autores', 'acoes']);
  });

  it('should initialize dataSource with mock data', () => {
    component.carregarLivros();
    expect(component.dataSource.data.length).toBeGreaterThan(0);
    expect(component.dataSource.data[0].titulo).toBe('Dom Casmurro');
  });

  it('should apply filter correctly', () => {
    component.carregarLivros();
    const event = { target: { value: 'Dom Casmurro' } } as unknown as Event;
    component.aplicarFiltro(event);
    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].titulo).toBe('Dom Casmurro');
  });

  it('should navigate to novo livro form', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.novo();
    expect(routerSpy).toHaveBeenCalledWith(['/livros/novo']);
  });

  it('should navigate to editar livro form', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    const livro: Livro = { codl: 1, titulo: 'Dom Casmurro', editora: 'Editora Globo', edicao: 1, ano_publicacao: '1899', valor: 45.90, valor_formatado: 'R$ 45,90', autores: [] };
    component.editar(livro);
    expect(routerSpy).toHaveBeenCalledWith(['/livros', 1, 'editar']);
  });

  it('should confirm before deleting a livro', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(console, 'log');
    const livro: Livro = { codl: 1, titulo: 'Dom Casmurro', editora: 'Editora Globo', edicao: 1, ano_publicacao: '1899', valor: 45.90, valor_formatado: 'R$ 45,90', autores: [] };
    component.excluir(livro);
    expect(console.log).toHaveBeenCalledWith('Excluir:', livro);
  });
});
