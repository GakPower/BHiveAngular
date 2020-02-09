import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule, MatInputModule, MatProgressSpinnerModule, MatRippleModule} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ContactButtonsComponent } from './contact-buttons/contact-buttons.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import { ProfileComponent } from './profile/profile.component';
import { StatsComponent } from './stats/stats.component';
import { AutoFocusDirective } from './auto-focus.directive';
import { ScaleStatsComponent } from './scale-stats/scale-stats.component';
import {MatTooltipModule} from '@angular/material';
import { HistoryComponent } from './history/history.component';
import { HistoryDataComponent } from './history-data/history-data.component';
import { HistoryDivComponent } from './history-div/history-div.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ContactButtonsComponent,
    ProfileComponent,
    StatsComponent,
    AutoFocusDirective,
    ScaleStatsComponent,
    HistoryComponent,
    HistoryDataComponent,
    HistoryDivComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatCheckboxModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatDividerModule,
    MatTabsModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
