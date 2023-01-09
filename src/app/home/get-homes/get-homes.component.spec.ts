import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetHomesComponent } from './get-homes.component';

describe('GetHomesComponent', () => {
  let component: GetHomesComponent;
  let fixture: ComponentFixture<GetHomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetHomesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
