import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public contact: any = {};
  successMsg: any;
  submitted: any;
  @ViewChild('contactform') mytemplateForm: NgForm;

  constructor(private adminService: AdminService) {}

  ngOnInit() {}

  contactDetail() {
    this.adminService.addContact(this.contact);
    this.successMsg = 'Your message received successfully';
    this.mytemplateForm.reset();
    setTimeout(() => {
      this.successMsg = '';
    }, 3000);
  }
}
