import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransplantCenterComponent } from './transplant-center.component';

describe('TransplantCenterComponent', () => {
  let component: TransplantCenterComponent;
  let fixture: ComponentFixture<TransplantCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransplantCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransplantCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
