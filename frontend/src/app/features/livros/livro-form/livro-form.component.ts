import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Livro, Autor, Assunto } from '../../../core/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.scss']
})
export class LivroFormComponent implements OnInit {
  form: FormGroup;
  livroId: number | null = null;
  isEditMode = false;
  loading = false;

  // Autocomplete
  autores: Autor[] = [];
  assuntos: Assunto[] = [];
  filteredAutores$!: Observable<Autor[]>;
  filteredAssuntos$!: Observable<Assunto[]>;

  // Chips
  selectedAutores: Autor[] = [];
  selectedAssuntos: Assunto[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.livroId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.livroId;

    this.carregarDados();
    this.setupAutocomplete();

    if (this.isEditMode) {
      this.carregarLivro();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(40)]],
      editora: ['', [Validators.required, Validators.maxLength(40)]],
      edicao: [1, [Validators.required, Validators.min(1)]],
      ano_publicacao: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      valor: [0, [Validators.required, Validators.min(0)]],
      autorInput: [''],
      assuntoInput: ['']
    });
  }

  carregarDados(): void {
    // TODO: Carregar do service
    // Dados mockados por enquanto
    this.autores = [
      { cod_au: 1, nome: 'Machado de Assis' },
      { cod_au: 2, nome: 'Clarice Lispector' },
      { cod_au: 3, nome: 'Paulo Coelho' }
    ];

    this.assuntos = [
      { cod_as: 1, descricao: 'Romance' },
      { cod_as: 2, descricao: 'Ficção' },
      { cod_as: 3, descricao: 'Técnico' }
    ];
  }

  setupAutocomplete(): void {
    this.filteredAutores$ = this.form.get('autorInput')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterAutores(value || ''))
    );

    this.filteredAssuntos$ = this.form.get('assuntoInput')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterAssuntos(value || ''))
    );
  }

  private _filterAutores(value: string): Autor[] {
    const filterValue = value.toLowerCase();
    return this.autores.filter(autor => 
      autor.nome.toLowerCase().includes(filterValue)
    );
  }

  private _filterAssuntos(value: string): Assunto[] {
    const filterValue = value.toLowerCase();
    return this.assuntos.filter(assunto => 
      assunto.descricao.toLowerCase().includes(filterValue)
    );
  }

  carregarLivro(): void {
    // TODO: Carregar do service
    const livroMock: Livro = {
      codl: 1,
      titulo: 'Dom Casmurro',
      editora: 'Editora Globo',
      edicao: 1,
      ano_publicacao: '1899',
      valor: 45.90,
      autores: [{ cod_au: 1, nome: 'Machado de Assis' }],
      assuntos: [{ cod_as: 1, descricao: 'Romance' }]
    };

    this.form.patchValue(livroMock);
    this.selectedAutores = livroMock.autores || [];
    this.selectedAssuntos = livroMock.assuntos || [];
  }

  adicionarAutor(autor: Autor): void {
    if (!this.selectedAutores.find(a => a.cod_au === autor.cod_au)) {
      this.selectedAutores.push(autor);
      this.form.get('autorInput')!.setValue('');
    }
  }

  removerAutor(autor: Autor): void {
    const index = this.selectedAutores.findIndex(a => a.cod_au === autor.cod_au);
    if (index >= 0) {
      this.selectedAutores.splice(index, 1);
    }
  }

  adicionarAssunto(assunto: Assunto): void {
    if (!this.selectedAssuntos.find(a => a.cod_as === assunto.cod_as)) {
      this.selectedAssuntos.push(assunto);
      this.form.get('assuntoInput')!.setValue('');
    }
  }

  removerAssunto(assunto: Assunto): void {
    const index = this.selectedAssuntos.findIndex(a => a.cod_as === assunto.cod_as);
    if (index >= 0) {
      this.selectedAssuntos.splice(index, 1);
    }
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.selectedAutores.length === 0) {
      this.snackBar.open('Selecione pelo menos um autor', 'Fechar', { duration: 3000 });
      return;
    }

    this.loading = true;
    const livro: Livro = {
      ...this.form.value,
      autores: this.selectedAutores,
      assuntos: this.selectedAssuntos
    };

    // TODO: Implementar chamada ao service
    console.log('Salvando livro:', livro);

    setTimeout(() => {
      this.loading = false;
      this.snackBar.open('Livro salvo com sucesso!', 'Fechar', { duration: 3000 });
      this.router.navigate(['/livros']);
    }, 1000);
  }

  cancelar(): void {
    this.router.navigate(['/livros']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('maxlength')) {
      return `Máximo ${field.errors?.['maxlength'].requiredLength} caracteres`;
    }
    if (field?.hasError('min')) {
      return `Valor mínimo: ${field.errors?.['min'].min}`;
    }
    if (field?.hasError('pattern')) {
      return 'Formato inválido';
    }
    return '';
  }
}
