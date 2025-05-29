import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuntoListComponent } from './assunto-list.component';

describe('AssuntoListComponent', () => {
  let component: AssuntoListComponent;
  let fixture: ComponentFixture<AssuntoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssuntoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssuntoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
