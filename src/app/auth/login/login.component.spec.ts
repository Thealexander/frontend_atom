import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: { login: jasmine.Spy<(email: string) => any> };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as unknown as {
      login: jasmine.Spy<(email: string) => any>;
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit if form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should call AuthService.login with email on submit', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    authService.login.and.returnValue(of({ token: '123' }));

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('test@example.com');
  });

  it('should set errorMessage on login error', () => {
    component.loginForm.controls['email'].setValue('error@example.com');
    authService.login.and.returnValue(
      throwError(() => new Error('Invalid login'))
    );

    component.onSubmit();

    expect(component.errorMessage).toBe('Invalid login');
  });
});
