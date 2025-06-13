import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  showButtons = true;
  userFullName = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.setVisibility();
    this.loadUserInfo();

    this.router.events.subscribe(() => {
      this.setVisibility();
    });
  }

  setVisibility(): void {
    const currentUrl = this.router.url;
    this.showButtons =
      !currentUrl.includes('/auth/login') &&
      !currentUrl.includes('/auth/register');
  }

  loadUserInfo(): void {
    const user = this.authService.getUser();
    if (user) {
      this.userFullName = `${user.name} ${user.lastName}`;
    }
    console.log(this.authService.getUser());
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
  shouldShowButtons(): boolean {
    const hiddenRoutes = ['/auth/login', '/auth/register'];
    return !hiddenRoutes.includes(this.router.url);
  }
}
