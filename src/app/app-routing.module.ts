import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
      path: '',
      canActivate: [AuthGuardService],
      component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuardService],

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
