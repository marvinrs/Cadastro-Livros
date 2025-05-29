import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivroFormComponent } from './livro-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

describe('LivroFormComponent', () => {
  let component: LivroFormComponent;
  let fixture: ComponentFixture<LivroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
      declarations: [LivroFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('titulo')).toBeTruthy();
  });

  it('should validate required fields', () => {
    component.form.get('titulo')!.setValue('');
    fixture.detectChanges();

    const errorMessage = component.getErrorMessage('titulo');
    expect(errorMessage).toBe('Campo obrigatório');
  });

  it('should disable save button when form is invalid', () => {
    component.form.get('titulo')!.setValue('');
    fixture.detectChanges();

    const saveButton = fixture.nativeElement.querySelector('button[color="primary"]');
    expect(saveButton.disabled).toBeTruthy();
  });

  it('should add and remove autores', () => {
    const mockAutor = { cod_au: 1, nome: 'Machado de Assis' };

    component.adicionarAutor(mockAutor);
    expect(component.selectedAutores.length).toBe(1);

    component.removerAutor(mockAutor);
    expect(component.selectedAutores.length).toBe(0);
  });

  it('should add and remove assuntos', () => {
    const mockAssunto = { cod_as: 1, descricao: 'Romance' };

    component.adicionarAssunto(mockAssunto);
    expect(component.selectedAssuntos.length).toBe(1);

    component.removerAssunto(mockAssunto);
    expect(component.selectedAssuntos.length).toBe(0);
  });
});
