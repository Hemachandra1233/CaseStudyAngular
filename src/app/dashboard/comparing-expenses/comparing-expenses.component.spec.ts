import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparingExpensesComponent } from './comparing-expenses.component';

describe('ComparingExpensesComponent', () => {
  let component: ComparingExpensesComponent;
  let fixture: ComponentFixture<ComparingExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparingExpensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparingExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
