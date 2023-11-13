import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { ActivatedRoute } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { AutorizadoComponent } from 'src/app/seguridad/autorizado/autorizado.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent, MockComponent(AutorizadoComponent)],
      imports: [PrimeNGModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '1' } } } },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});