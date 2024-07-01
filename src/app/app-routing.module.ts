import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminPanelComponent } from './components/adminpanel/adminpanel.component';
import { UserregisterComponent } from './components/userregister/userregister.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserDashboardComponent } from './components/userdashboard/userdashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/userlogin', pathMatch: 'full' },
  { path: 'userlogin', component: LoginComponent },
  { path: 'adminpanel', component: AdminPanelComponent },
  { path:'userregister',component:UserregisterComponent},
  {path:'admin',component:AdminComponent},
  {path:'userdashboard',component:UserDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
