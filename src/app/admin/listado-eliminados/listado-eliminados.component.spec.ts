import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEliminadosComponent } from './listado-eliminados.component';

describe('ListadoEliminadosComponent', () => {
  let component: ListadoEliminadosComponent;
  let fixture: ComponentFixture<ListadoEliminadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoEliminadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoEliminadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
