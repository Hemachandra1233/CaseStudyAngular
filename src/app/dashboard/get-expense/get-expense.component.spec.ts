import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetExpenseComponent } from './get-expense.component';

describe('GetExpenseComponent', () => {
  let component: GetExpenseComponent;
  let fixture: ComponentFixture<GetExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
