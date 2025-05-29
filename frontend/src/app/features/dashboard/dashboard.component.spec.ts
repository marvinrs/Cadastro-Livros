import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatIconModule],
      declarations: [DashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize stats correctly', () => {
    expect(component.stats.livros).toBe(0);
    expect(component.stats.autores).toBe(0);
    expect(component.stats.assuntos).toBe(0);
    expect(component.stats.valorTotal).toBe('R$ 0,00');
  });

  it('should display initial stats in the template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.stat-info h3')?.textContent).toContain('0');
    expect(compiled.querySelectorAll('.stat-info h3')[3]?.textContent).toContain('R$ 0,00');
  });
});
