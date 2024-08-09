import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarcandidaturasComponent } from './listarcandidaturas.component';

describe('ListarcandidaturasComponent', () => {
  let component: ListarcandidaturasComponent;
  let fixture: ComponentFixture<ListarcandidaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarcandidaturasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarcandidaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
