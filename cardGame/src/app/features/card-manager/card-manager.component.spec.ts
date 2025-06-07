import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardManagerComponent } from './card-manager.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CardManagerComponent', () => {
  let component: CardManagerComponent;
  let fixture: ComponentFixture<CardManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardManagerComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
