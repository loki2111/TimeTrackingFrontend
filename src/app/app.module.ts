import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './components/adminpanel/adminpanel.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserregisterComponent } from './components/userregister/userregister.component';
import { UserDashboardComponent } from './components/userdashboard/userdashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { ExcelService } from './services/excel.service';
import { UserlocationComponent } from './components/userlocation/userlocation.component';




@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    UserregisterComponent,
    UserDashboardComponent,
    AdminComponent,
    LoginComponent,
    UserlocationComponent

    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    HttpClientModule,
    CommonModule,

  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
