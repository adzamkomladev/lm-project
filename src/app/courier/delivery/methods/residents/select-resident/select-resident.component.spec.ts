import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectResidentComponent } from './select-resident.component';

describe('SelectResidentComponent', () => {
  let component: SelectResidentComponent;
  let fixture: ComponentFixture<SelectResidentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectResidentComponent]
    });
    fixture = TestBed.createComponent(SelectResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
