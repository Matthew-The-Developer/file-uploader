import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentViewLinkComponent } from './document-view-link.component';

describe('DocumentViewLinkComponent', () => {
  let component: DocumentViewLinkComponent;
  let fixture: ComponentFixture<DocumentViewLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentViewLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentViewLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
