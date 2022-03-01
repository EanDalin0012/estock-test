import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOTComponent } from './add-ot.component';

describe('AddOTComponent', () => {
  let component: AddOTComponent;
  let fixture: ComponentFixture<AddOTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
