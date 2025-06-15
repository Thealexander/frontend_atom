import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    const spy = jasmine.createSpyObj('AuthService', ['login', 'isLoggedIn']);
    spy.isLoggedIn.and.returnValue(false); // o true
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/task']);
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const email = this.loginForm.value.email;

    this.authService.signin(email).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/task']);
      },
      error: (err: any) => {
        this.errorMessage = 'Login failed. Please try again.';
        console.error(err);
      },
    });
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
