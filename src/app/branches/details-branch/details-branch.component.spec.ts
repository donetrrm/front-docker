import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBranchComponent } from './details-branch.component';

describe('DetailsBranchComponent', () => {
  let component: DetailsBranchComponent;
  let fixture: ComponentFixture<DetailsBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
