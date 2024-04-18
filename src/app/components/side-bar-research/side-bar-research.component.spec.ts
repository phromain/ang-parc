import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarResearchComponent } from './side-bar-research.component';

describe('SideBarResearchComponent', () => {
  let component: SideBarResearchComponent;
  let fixture: ComponentFixture<SideBarResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarResearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideBarResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
