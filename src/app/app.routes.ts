import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/guards/auth/auth.guard';
import { authenticatedGuard } from './auth/guards/auth/authenticated.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate: [authenticatedGuard]},
  { path: 'sign-up', component: SignUpComponent,canActivate: [authenticatedGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate: [authGuard] },
  { path: 'projects', component: DashboardComponent,canActivate: [authGuard]},
  { path: 'userstory/:id', component: DashboardComponent,canActivate: [authGuard] },
  { path: 'ticket/:id', component: DashboardComponent,canActivate: [authGuard] },
  { path: 'details-projects/:id', component: DashboardComponent,canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'details-projects', redirectTo: '/projects', pathMatch: 'full' },
];
