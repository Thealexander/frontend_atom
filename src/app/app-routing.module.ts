import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { reverseAuthGuard } from './auth/guard/reverse-auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [reverseAuthGuard]
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then((m) => m.TaskModule),
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
