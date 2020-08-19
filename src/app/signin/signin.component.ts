import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LaravelConnector } from '../service/laravelconnector.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

  placeHolderStatus: boolean = false;
  nameMsg: string = "";
  pswdMsg: string = "";
  mainMsg: string = "";

  constructor(private connectorService: LaravelConnector, private router: Router, private userSession: SessionStorageService) { }

  ngOnInit() {
    this.placeHolderStatus = false;
    this.nameMsg = "enter name";
    this.pswdMsg = "enter password";
    this.mainMsg = "";
  }

  onSignIn(form: NgForm) {

    const name = form.value.uname;
    const pswd = form.value.password;

    if ((name == "" || pswd == "") || (name == null || pswd == null)) {  //if required fields are not filled
      this.placeHolderStatus = true;
      this.nameMsg = "enter name here";
      this.pswdMsg = "enter password here";
    }

    else if (name != "" || pswd != "") { // if required fields are filled
      this.placeHolderStatus = true;
      const formData = [name, pswd];
      this.connectorService.GetDataFromBackend(formData); // send data to Connector Service

      return this.connectorService.isSignInAuthenticated(form).then(
        (signInStatus) => {
          if (signInStatus[0]) {
            this.placeHolderStatus = true;
            this.connectorService.setUserValidationStatus(true);
            this.userSession.store('username',name);
            this.removeMessage();
            this.router.navigate(['/']);
          }
          else {
            this.placeHolderStatus = false;
            this.mainMsg = "Invalid Username/Password";
            this.connectorService.setUserValidationStatus(false);
            this.removeMessage();
          }
        }
      );

      // setTimeout(
      //   () => {
      //     if (this.connectorService.userdbData[0].name == name && this.connectorService.userdbData[0].password == pswd) {
      //       this.mainMsg = "Login Successfull";
      //       this.connectorService.setUserValidationStatus(true);
      //       this.clearFormFields(form);
      //       this.router.navigate(['/']);
      //       this.removeMessage();
      //     }
      //     else {
      //       this.mainMsg = "Invalid Username/Password";
      //       this.connectorService.setUserValidationStatus(false);
      //       this.removeMessage();
      //     }
      //   }, 300
      // ); //---
    }
  }

  clearFormFields(form: NgForm) {
    this.placeHolderStatus = false;
    form.resetForm();
  }

  removeMessage() {
    setTimeout(() => { this.mainMsg = "" }, 2000);
  }
}
