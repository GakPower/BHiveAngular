import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterComponent } from './register/register.component';
import { MonitorComponent } from './monitor/monitor.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import {ProfileComponent} from './profile/profile.component';
import {StatsComponent} from './stats/stats.component';
import {HistoryComponent} from './history/history.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent, data: {animation: 'Login'} },
  { path: 'register', component: RegisterComponent, data: {animation: 'Register'} },
  { path: 'monitor', component: MonitorComponent, data: {animation: 'Monitor'} },
  { path: 'forgotPass', component: ForgotPassComponent, data: {animation: 'ForgotPass'} },
  { path: 'profile', component: ProfileComponent, data: {animation: 'Profile'} },
  { path: 'stats', component: StatsComponent, data: {animation: 'Stats'} },
  { path: 'history', component: HistoryComponent, data: {animation: 'History'} },
  { path: 'settings', component: SettingsComponent, data: {animation: 'Settings'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [LoginFormComponent, RegisterComponent,
  MonitorComponent, ForgotPassComponent, ProfileComponent,
  StatsComponent, HistoryComponent, SettingsComponent];
