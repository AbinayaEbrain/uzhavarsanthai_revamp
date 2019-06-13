import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgForm } from '@angular/forms';
import { DealsService } from '../deals.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public contact: any = {};
  public trackInformationData: any = {};
  successMsg: any;
  submitted: any;
  @ViewChild('contactform') mytemplateForm: NgForm;

  constructor(private adminService: AdminService,
              private _dealService: DealsService
            ) {}

  ngOnInit() {
      document.getElementById('focusDiv').focus();
  }

  contactDetail() {
    this.adminService.addContact(this.contact);
    this.trackInformationData.response = 'Success';
    this.trackInformationData.apiName = 'blogetone';
    this.postTrackInformation();
    this.successMsg = 'Your message received successfully';
    this.mytemplateForm.reset();
    setTimeout(() => {
      this.successMsg = '';
    }, 3000);
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
    this._dealService
      .trackInformationPost(this.trackInformationData)
      .subscribe(data => {
        console.log(data);
      });
  }

}
