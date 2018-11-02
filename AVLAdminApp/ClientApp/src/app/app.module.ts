import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentification.service';
import { routing } from './app.routing';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { ValuesComponent } from './values/values.component';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { ServiceAccountsComponent } from './service-accounts/service-accounts.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { UnitsComponent } from './units/units.component';
import { MapServicesComponent } from './map-services/map-services.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ValuesComponent,
    HomeComponent,
    ServiceAccountsComponent,
    UnitsComponent,
    MapServicesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    routing,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
