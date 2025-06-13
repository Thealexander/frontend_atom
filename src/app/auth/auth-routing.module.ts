import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { reverseAuthGuard } from './guard/reverse-auth.guard';

import { RegisterComponent } from './register/register.component'; // si aplica

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [reverseAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [reverseAuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
