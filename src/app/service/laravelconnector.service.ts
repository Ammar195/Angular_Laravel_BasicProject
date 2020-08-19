import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { NgForm } from "@angular/forms";

@Injectable()
export class LaravelConnector {

  //userdbData: any = [];
  users = [];
  userValidated: boolean = false;
  signUpValidationStatus: any;
  signInValidationStatus: any;
  userRole: string = "";

  userValidationUpdate = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  // ------------- SEND DATA TO LARAVEL BACKEND (FOR SIGN UP)-----------------------
  SubmitDataToBackend(signUpData: any) {
    return this.http.post('http://127.0.0.1:8000/api/signup', signUpData).
      subscribe((res: any) => {
        this.signUpValidationStatus = res;
      })
  }

  // ------------- GET ALL DATA FROM LARAVEL BACKEND (FOR SIGN IN)-----------------
  GetDataFromBackend(signInData: any) {
    return this.http.post('http://127.0.0.1:8000/api/signin', signInData).
      subscribe((res: any) => {
        this.signInValidationStatus = res;
      })
  }

  // ------------- GET SPECIFIC DATA FROM LARAVEL BACKEND -------------------------
  GetIdDataBackend(id: number) {
    return this.http.post('http://127.0.0.1:8000/api/itemID', id).
      subscribe((data: any) => {
        this.users.push(data);
      })
  }
  //-------------------------------------------------------------------------------

  setUserValidationStatus(status: boolean) {
    this.userValidated = status;
    this.userValidationUpdate.next(this.userValidated);
  }

  getUserValidationStatus() {
    return this.userValidated;
  }

  getUserRole() {
    this.userRole = this.signInValidationStatus[1];
    return this.userRole;
  }

  isSignUpAuthenticated(myForm: NgForm) {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.signUpValidationStatus);
          if (this.signUpValidationStatus[1]) {
            myForm.resetForm();
          }
        }, 500);
      }
    );
    return promise;
  }

  isSignInAuthenticated(myForm: NgForm) {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.signInValidationStatus);
          if (this.signInValidationStatus)
            myForm.resetForm();
        }, 500)
      }
    );
    return promise;
  }
  //-----------------------------------------------------------------------------
}
    // return this.http.get('http://127.0.0.1:8000/api/item').subscribe(data => {
    //   this.userdbData = data;
    // });