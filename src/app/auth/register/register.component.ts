import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  name = '';
  lastname = '';
  email = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService
      .signup({
        email: this.email,
        name: this.name,
        lastname: this.lastname,
      })
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/task']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err.error?.error || 'Registration failed';
        },
      });
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
