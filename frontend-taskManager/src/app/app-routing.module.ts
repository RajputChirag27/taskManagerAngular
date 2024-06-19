import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomePageComponent } from './homepage/homepage.component';
import { AuthGuard } from '../guards/auth.guard';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginGuard } from 'src/guards/login.guard';

const routes: Routes = [
  {path : "", redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'homepage', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'taskManager', component: TaskManagerComponent, canActivate: [AuthGuard]},
  {path: 'taskManager/:id', component: TaskManagerComponent, canActivate: [AuthGuard]},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'dashboard',loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]},
  {path: 'about-us',loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)},
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
