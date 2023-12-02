import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCodeComponent } from './package-code.component';

describe('PackageCodeComponent', () => {
  let component: PackageCodeComponent;
  let fixture: ComponentFixture<PackageCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PackageCodeComponent]
    });
    fixture = TestBed.createComponent(PackageCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
