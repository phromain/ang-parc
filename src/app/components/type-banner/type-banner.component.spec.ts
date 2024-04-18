import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBannerComponent } from './type-banner.component';

describe('TypeBannerComponent', () => {
  let component: TypeBannerComponent;
  let fixture: ComponentFixture<TypeBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
