import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpReqsComponent } from './http-reqs.component';

describe('HttpReqsComponent', () => {
  let component: HttpReqsComponent;
  let fixture: ComponentFixture<HttpReqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HttpReqsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HttpReqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
