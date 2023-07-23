import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicComponentHighchartComponent } from './dynamic-component-highchart.component';

describe('DynamicComponentHighchartComponent', () => {
  let component: DynamicComponentHighchartComponent;
  let fixture: ComponentFixture<DynamicComponentHighchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicComponentHighchartComponent]
    });
    fixture = TestBed.createComponent(DynamicComponentHighchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
