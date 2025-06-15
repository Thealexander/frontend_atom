import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: {
    signin: jasmine.Spy<(email: string) => any>;
    saveToken: jasmine.Spy<(token: string) => void>;
    isLoggedIn: jasmine.Spy<() => boolean>;
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['signin', 'saveToken', 'isLoggedIn']);
    spy.isLoggedIn.and.returnValue(false);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as unknown as typeof spy;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit if form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should call AuthService.signin with email on submit', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    authService.signin.and.returnValue(of({ token: '123' }));
    authService.saveToken.and.stub(); // evita error

    component.onSubmit();

    expect(authService.signin).toHaveBeenCalledWith('test@example.com');
    expect(authService.saveToken).toHaveBeenCalledWith('123');
  });

  it('should set errorMessage on login error', () => {
    component.loginForm.controls['email'].setValue('error@example.com');
    authService.signin.and.returnValue(
      throwError(() => new Error('Invalid login'))
    );

    component.onSubmit();

    expect(component.errorMessage).toBe('Login failed. Please try again.');
  });
});
