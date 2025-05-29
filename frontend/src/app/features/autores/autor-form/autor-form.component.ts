import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Autor } from '../../../core/models';
import { AutorService } from '../../../core/services/autor.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-autor-form',
  templateUrl: './autor-form.component.html',
  styleUrls: ['./autor-form.component.scss']
})
export class AutorFormComponent implements OnInit {
  form: FormGroup;
  loading = false;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private autorService: AutorService,
    private notification: NotificationService,
    public dialogRef: MatDialogRef<AutorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Autor
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(40)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.form.patchValue(this.data);
    }
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const autor = this.form.value;

    const request = this.isEditMode
      ? this.autorService.atualizar(this.data.cod_au!, autor)
      : this.autorService.criar(autor);

    request.subscribe({
      next: (result) => {
        this.notification.success(`Autor ${this.isEditMode ? 'atualizado' : 'criado'} com sucesso`);
        this.dialogRef.close(result);
      },
      error: (error) => {
        this.notification.error(error.message || 'Erro ao salvar autor');
        this.loading = false;
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('maxlength')) {
      return `Máximo ${field.errors?.['maxlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
