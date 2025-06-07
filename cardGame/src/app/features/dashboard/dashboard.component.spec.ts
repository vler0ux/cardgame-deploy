import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent], // 👈 composant standalone
      providers: [
        provideHttpClient(withInterceptorsFromDi()), // 👈 nécessaire pour HttpClient
        {
          provide: ActivatedRoute, // 👈 ici on crée une fausse route
          useValue: {
            params: of({}),         // Simule l’abonnement à route.params
            queryParams: of({}),    // Simule les query params
            snapshot: {}            // Simule route.snapshot
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
