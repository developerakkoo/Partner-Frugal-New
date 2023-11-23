import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadDocsPage } from './upload-docs.page';

describe('UploadDocsPage', () => {
  let component: UploadDocsPage;
  let fixture: ComponentFixture<UploadDocsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UploadDocsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
