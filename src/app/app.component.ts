import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'taskpad App';
  constructor(public router: Router) {}

  shouldShowNavbar(): boolean {
    const hiddenRoutes = ['/auth/login', '/auth/register'];
    return !hiddenRoutes.includes(this.router.url);
  }
}
