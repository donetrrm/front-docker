import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductBranchComponent } from './create-product-branch.component';

describe('CreateProductBranchComponent', () => {
  let component: CreateProductBranchComponent;
  let fixture: ComponentFixture<CreateProductBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
