import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AppLayoutModule } from './layout/app.layout.module';
import { VariedadDashboardComponent } from './components/variedad-dashboard/variedad-dashboard.component';
import { ColorDashboardComponent } from './components/color-dashboard/color-dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VariedadDashboardComponent,
    ColorDashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppLayoutModule,
    AppRoutingModule,
    ButtonModule,
    PasswordModule,
    KeyFilterModule,
    InputTextModule,
    CardModule,
    ToastModule,
    MessagesModule,
    ProgressSpinnerModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
