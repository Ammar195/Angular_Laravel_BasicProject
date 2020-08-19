import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LaravelConnector } from '../service/laravelconnector.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  roleStatus: boolean = false;
  passwordMatchStatus: boolean = false;
  removePwordMsg: boolean = false;

  role: string = "SELECT ROLE";
  mainMsg: string = "";

  constructor(private connectorService: LaravelConnector) { }

  ngOnInit() {
    this.mainMsg = "";
    this.removePwordMsg = false;
  }

  setRole(seletectedRole: string) {
    this.role = seletectedRole;
    if (this.role != "SELECT ROLE")
      this.roleStatus = false;
  }

  onSignUp(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPswd;
    const setRole = this.role;

    if (setRole == "SELECT ROLE")
      this.roleStatus = true;
    else
      this.roleStatus = false;

    if ((name != "" && email != "" && password != "" && confirmPassword != "" && setRole != "SELECT ROLE") || (name != null && email != null && password != null && confirmPassword != null && setRole != "SELECT ROLE")) {
      if (password == confirmPassword) {
        this.passwordMatchStatus = false;
        const formData = [name, email, password, setRole];
        this.connectorService.SubmitDataToBackend(formData);

        return this.connectorService.isSignUpAuthenticated(form).then(
          (signUpStatus: any) => {
            this.mainMsg = signUpStatus[0];
            this.removeMsg();
          }
        );
      }
      else {
        this.passwordMatchStatus = true;
      }
    }
  }

  clearFormFields(form: NgForm) {
    this.passwordMatchStatus = false;
    form.resetForm();
  }

  removeMsg() {
    setTimeout(() => {
      this.mainMsg = "";
    }, 2000);
  }

  removePasswordMsg(cPasswordVal: HTMLInputElement) {
    if (cPasswordVal.value.length >= 5) {
      setTimeout(() => { this.removePwordMsg = false; }, 2500);
    }
    else{
      this.removePwordMsg = true;
    }
  }

}

/*
 return this._http.post('http://127.0.0.1:8000/api/items', JSON.stringify(form.value), { headers: this.headers })
   .toPromise()
   .then(res => res.json().data)
   .catch(this.handleError);
 }

 private handleError(error: any): Promise<any> {
   console.error('An error occurred', error); // for demo purposes only
   return Promise.reject(error.message || error);
 }*/