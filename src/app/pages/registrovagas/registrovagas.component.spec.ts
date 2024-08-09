import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrovagasComponent } from './registrovagas.component';

describe('RegistrovagasComponent', () => {
  let component: RegistrovagasComponent;
  let fixture: ComponentFixture<RegistrovagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrovagasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrovagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
