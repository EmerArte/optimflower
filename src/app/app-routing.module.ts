import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { AppLayoutComponent } from './layout/app.layout.component';
import { VariedadDashboardComponent } from './components/variedad-dashboard/variedad-dashboard.component';
import { ColorDashboardComponent } from './components/color-dashboard/color-dashboard.component';
import { CloudDashboardComponent } from './components/cloud-dashboard/cloud-dashboard.component';

const routes: Routes = [
  {
      path: '',
      component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: AppLayoutComponent,
    canActivate:[AuthGuardService],
    children:[
      {
        path: '',
        redirectTo: '/dashboard/variedad',
        pathMatch: 'full',
      },
      {
        path: 'variedad',
        component: VariedadDashboardComponent,
      },
      {
        path: 'color',
        component: ColorDashboardComponent,
      },
      {
        path: 'cloud',
        component: CloudDashboardComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
