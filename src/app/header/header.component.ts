import { Component, OnInit, OnDestroy } from '@angular/core';
import { LaravelConnector } from '../service/laravelconnector.service';
import { Subscription } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  userSigninStatus : boolean = false;

  constructor (private connectorService : LaravelConnector, private userSession: SessionStorageService, private router: Router) { }

  ngOnInit() {
    //console.log (this.userSession.retrieve('username'));
   if (this.userSession.retrieve('username') != null){
      this.userSigninStatus = true;
   }
   else{
      this.userSigninStatus = false;
   }
    this.subscription = this.connectorService.userValidationUpdate.subscribe (
      (signInStatus) => {
        this.userSigninStatus = signInStatus;
      }
    );
  }

  signOut(){
    this.connectorService.setUserValidationStatus(false);
    this.userSession.clear();
    this.router.navigate(['/']);
  }

  ngOnDestroy(){
    this.subscription;
  }
}
