import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutorFormComponent } from './autor-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutorService } from '../../../core/services/autor.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { of, throwError } from 'rxjs';

describe('AutorFormComponent', () => {
  let component: AutorFormComponent;
  let fixture: ComponentFixture<AutorFormComponent>;
  let autorServiceSpy: jasmine.SpyObj<AutorService>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AutorFormComponent>>;

  beforeEach(async () => {
    autorServiceSpy = jasmine.createSpyObj('AutorService', ['criar', 'atualizar']);
    notificationSpy = jasmine.createSpyObj('NotificationService', ['success', 'error']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ],
      declarations: [AutorFormComponent],
      providers: [
        { provide: AutorService, useValue: autorServiceSpy },
        { provide: NotificationService, useValue: notificationSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: null }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('nome')).toBeTruthy();
  });

  it('should disable save button if form is invalid', () => {
    component.form.get('nome')?.setValue('');
    fixture.detectChanges();

    const saveButton = fixture.nativeElement.querySelector('button[color="primary"]');
    expect(saveButton.disabled).toBeTruthy();
  });

  it('should call AutorService.criar when not in edit mode', () => {
    autorServiceSpy.criar.and.returnValue(of({ nome: 'Teste', cod_au: 1 }));
    component.salvar();

    expect(autorServiceSpy.criar).toHaveBeenCalled();
    expect(notificationSpy.success).toHaveBeenCalledWith('Autor criado com sucesso');
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should call AutorService.atualizar when in edit mode', () => {
    component.isEditMode = true;
    component.data = { cod_au: 1, nome: 'Teste' };
    autorServiceSpy.atualizar.and.returnValue(of({ nome: 'Teste', cod_au: 1 }));

    component.salvar();
    expect(autorServiceSpy.atualizar).toHaveBeenCalledWith(1, jasmine.any(Object));
    expect(notificationSpy.success).toHaveBeenCalledWith('Autor atualizado com sucesso');
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should handle error when service fails', () => {
    autorServiceSpy.criar.and.returnValue(throwError(() => new Error('Erro ao salvar')));
    component.salvar();

    expect(notificationSpy.error).toHaveBeenCalledWith('Erro ao salvar');
    expect(component.loading).toBeFalse();
  });
});
