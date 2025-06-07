import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckComponent } from './deck.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DeckComponent', () => {
  let component: DeckComponent;
  let fixture: ComponentFixture<DeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
