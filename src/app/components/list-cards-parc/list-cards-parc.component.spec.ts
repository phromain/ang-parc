import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardsParcComponent } from './list-cards-parc.component';

describe('ListCardsParcComponent', () => {
  let component: ListCardsParcComponent;
  let fixture: ComponentFixture<ListCardsParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCardsParcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCardsParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
