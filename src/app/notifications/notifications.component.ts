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
  public notificationMsg: any = {}
  @ViewChild('notificationForm') mytemplateForm: NgForm;
  @ViewChild('specifynotificationForm') mytemplateFormmdl: NgForm;

  constructor(private _dealsService:DealsService) { }

  ngOnInit() {
  }

  notificationToAll(notificationMsg){
    console.log('function works');
    console.log(this.notificationMsg);
    this._dealsService.notificationToAll(this.notificationMsg)
    .subscribe(
      res => {
      console.log(res);
      this.optsent = 'Notification has been sent successfully!';
      setTimeout(() => {
        this.optsent = '';
      }, 3000);
      this.mytemplateForm.reset();
      // this.notificationMsg=''
      },
      err => {
        console.log(err);
      }
    );
  }

  //specific Users
  notificationToSpecifyUsers(){
    console.log('function works');
    console.log(this.notificationMsg);
    this._dealsService.notificationTospecificUsers(this.notificationMsg)
    .subscribe(
      res=>{
      console.log(res);
      this.optsent = 'Notification has been sent successfully!';
      setTimeout(() => {
        this.optsent = '';
      }, 3000);
      this.mytemplateFormmdl.reset();
      // this.notificationMsg=''
      },
      err=>{
        console.log(err);
      }
    )
  }
}

