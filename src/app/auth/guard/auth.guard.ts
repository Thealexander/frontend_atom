import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('auth-token');

  if (!token) {
    return router.createUrlTree(['/auth/login']);
  }

  return true;
};