import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have title as "Sistema de Cadastro de Livros"', () => {
    expect(component.title).toBe('Sistema de Cadastro de Livros');
  });

  it('should toggle sidenav when toggleSidenav is called', () => {
    const initialState = component.sidenavOpened;
    component.toggleSidenav();
    expect(component.sidenavOpened).toBe(!initialState);
  });

  it('should have 5 menu items', () => {
    expect(component.menuItems.length).toBe(5);
    expect(component.menuItems[0].label).toBe('Dashboard');
    expect(component.menuItems[1].label).toBe('Livros');
    expect(component.menuItems[2].label).toBe('Autores');
    expect(component.menuItems[3].label).toBe('Assuntos');
    expect(component.menuItems[4].label).toBe('Relatórios');
  });
});
