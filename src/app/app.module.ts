import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2Webstorage } from 'ngx-webstorage';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

import { DropdownDirective } from './directives/dropdown.directive';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LaravelConnector } from './service/laravelconnector.service';
import { LoginGuard } from './service/loginGuard.service';
import { LoginStatusService } from './service/loginStatus.service';
import { MydashboardComponent } from './mydashboard/mydashboard.component';

const appRoutes : Routes = [
  {path: '', component: HomeComponent, pathMatch: "full"},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'mydashboard', component: MydashboardComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    DropdownDirective,
    MydashboardComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2Webstorage,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [RouterModule, LaravelConnector, LoginGuard, LoginStatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
