import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterComponent } from './register/register.component';
import { MonitorComponent } from './monitor/monitor.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'monitor', component: MonitorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [LoginFormComponent, RegisterComponent, MonitorComponent];
