import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadZoneComponent } from './upload-zone.component';

describe('UploadZoneComponent', () => {
  let component: UploadZoneComponent;
  let fixture: ComponentFixture<UploadZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadZoneComponent]
    });
    fixture = TestBed.createComponent(UploadZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
