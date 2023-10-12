import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShinobisComponent } from './shinobis.component';

describe('ShinobisComponent', () => {
  let component: ShinobisComponent;
  let fixture: ComponentFixture<ShinobisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShinobisComponent]
    });
    fixture = TestBed.createComponent(ShinobisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
