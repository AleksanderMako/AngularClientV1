import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFLightComponent } from './update-flight.component';

describe('UpdateFLightComponent', () => {
  let component: UpdateFLightComponent;
  let fixture: ComponentFixture<UpdateFLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
