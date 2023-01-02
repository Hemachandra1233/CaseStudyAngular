import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUserRoleComponent } from './assign-user-role.component';

describe('AssignUserRoleComponent', () => {
  let component: AssignUserRoleComponent;
  let fixture: ComponentFixture<AssignUserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignUserRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
