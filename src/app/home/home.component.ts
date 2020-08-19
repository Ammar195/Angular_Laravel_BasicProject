import { Component, OnInit, OnChanges } from '@angular/core';
import { LaravelConnector } from '../service/laravelconnector.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userSigninStatus: boolean = false;
  userRole: string = "";
  showPostForm: boolean = false;
  uploadedImagePath: string = "";

  constructor(private connectorService: LaravelConnector) { }

  ngOnInit() {
    if (this.connectorService.getUserValidationStatus() != null && this.connectorService.getUserValidationStatus() != false) {
      this.userSigninStatus = this.connectorService.getUserValidationStatus();
      this.userRole = this.connectorService.getUserRole();
    }
    else
      this.userSigninStatus = false;
  }

  postAd() {
    this.showPostForm = !this.showPostForm;
  }
 // url: string = "";
  onFileChanged(event) {
    this.uploadedImagePath = event.target.files[0];
   console.log (this.uploadedImagePath);
    // var reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]); // read file as data url

    // reader.onload = (event) => { // called once readAsDataURL is completed
    //   this.url = event.target.result;
    // }
  }

  onAdSubmit(form: NgForm) {

  }

}
