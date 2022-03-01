import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssignRoleComponent } from './user-assign-role.component';

describe('UserAssignRoleComponent', () => {
  let component: UserAssignRoleComponent;
  let fixture: ComponentFixture<UserAssignRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAssignRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssignRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
