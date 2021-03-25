import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDatepickerModule} from '@angular/material/datepicker';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RegisterComponent } from './register/register.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './register/calendar/calendar.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { NgbModule, NgbNavbar } from '@ng-bootstrap/ng-bootstrap'; 
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OwnerComponent } from './owner/owner.component';
import { OwnerLoginComponent } from './owner-login/owner-login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './owner-login/auth-guard';
import { AuthService } from './owner-login/auth-service';
import { AlertComponent } from './alert/alert.component';
import { BigPictureComponent } from './big-picture/big-picture.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RegisterComponent,
    ContactComponent,
    AboutMeComponent,
    HomeComponent,
    CalendarComponent,
    OwnerComponent,
    OwnerLoginComponent,
    AlertComponent,
    BigPictureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NgbModule,
    CarouselModule.forRoot(),
    HttpClientModule

  ],
  providers: [DatePipe, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
