import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  optsent: any;
  public notificationMsg: any = {};
  public trackInformationData: any = {};
  @ViewChild('notificationForm') mytemplateForm: NgForm;
  @ViewChild('specifynotificationForm') mytemplateFormmdl: NgForm;

  constructor(private _dealsService: DealsService) {}

  ngOnInit() {
      document.getElementById('focusDiv').focus();
  }

  notificationToAll() {
    console.log('function works');
    console.log(this.notificationMsg);
    this._dealsService.notificationToAll(this.notificationMsg).subscribe(
      res => {
        console.log(res);
        this.optsent = 'Notification has been sent successfully!';
        setTimeout(() => {
          this.optsent = '';
        }, 3000);
        this.mytemplateForm.reset();
        // this.notificationMsg=''
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'notificationtoall';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'notificationtoall';
        this.postTrackInformation();
      }
    );
  }

  //specific Users
  notificationToSpecifyUsers() {
    console.log('function works');
    console.log(this.notificationMsg);
    this._dealsService
      .notificationTospecificUsers(this.notificationMsg)
      .subscribe(
        res => {
          console.log(res);
          this.optsent = 'Notification has been sent successfully!';
          setTimeout(() => {
            this.optsent = '';
          }, 3000);
          this.mytemplateFormmdl.reset();
          // this.notificationMsg=''
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'notificationospecificeusers';
        this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'notificationospecificeusers';
          this.postTrackInformation();
        }
      );
  }

  clear(){
    this.mytemplateFormmdl.reset();
  }

  postTrackInformation() {
    let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
    let token = localStorage.getItem('token');
    let UserName = localStorage.getItem('firstname');
    let ipAddress = JSON.parse(localStorage.getItem('privateIP'));
    this.trackInformationData.UserId = acntID;
    this.trackInformationData.jwt = token;
    this.trackInformationData.ipAddress = ipAddress;
    this.trackInformationData.UserName = UserName;
    this.trackInformationData.apiCallingAt = new Date().getTime();
    this._dealsService
      .trackInformationPost(this.trackInformationData)
      .subscribe(data => {
        console.log(data);
      });
  }

}
