import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { DealsService } from '../deals.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {
  ticketData : any = {};
  username:any;
  userphone:any;
  userrole:any;
  successMsg:any;
  ticketlngth:any;
  userid:any;
  totalTickets = [];
  userTickets = [];
  zeroCount:any;
  @ViewChild('ticketForm') mytemplateForm: NgForm;
  constructor(private _dealsService: DealsService,public loadingCtrl: NgxSpinnerService,private router: Router,) { }

  ngOnInit() {
      this.userid = JSON.parse(localStorage.getItem('currentUser'))._id;
      this.getAlltickets();
  }
  getAlltickets(){
    this._dealsService.getTickets().subscribe(
      res => {
          console.log(res);
          this.totalTickets = res;
          console.log(this.totalTickets.length);
          let j = 0;
          for(let i = 0; i < this.totalTickets.length; i++){
            console.log(this.totalTickets.length);
            if(this.userid == this.totalTickets[i].userid){
             this.userTickets[j] = this.totalTickets[i];
             j++;
             this.ticketlngth = this.userTickets.length;
             console.log(this.userTickets);
            }
          }
      },
      err => {
        console.log(err);
      }
    );
  }
sendticket(){
  this.loadingCtrl.show();
  var a = "#"
  this.ticketId = Math.floor(100000 + Math.random() * 900000);
  console.log(this.ticketId);
  this.ticketData.ticketId = a+""+this.ticketId;
  this.ticketData.ticketStatus = 'Open';
  this.username = JSON.parse(localStorage.getItem('currentUser')).firstname;
  this.userphone = JSON.parse(localStorage.getItem('currentUser')).phone;
  this.userrole = JSON.parse(localStorage.getItem('currentUser')).role;
  this.ticketData.username = this.username;
  this.ticketData.userphone = this.userphone;
  this.ticketData.userrole = this.userrole;
  this.ticketData.userid = this.userid;
  this.ticketData.createddate = new Date();
  console.log(this.ticketData);
  this._dealsService.sendTicket(this.ticketData).subscribe(
    res => {
        console.log(res);
        this.loadingCtrl.hide();
        this.successMsg = "Ticket Created successfully!"
        this.mytemplateForm.reset();
        setTimeout(() => {
          this.successMsg="";
          this.loadingCtrl.show();
        this.router.navigateByUrl('/dummy', { skipLocationChange: true });
        setTimeout(() => this.router.navigate(['/my-tickets']),100);
          this.loadingCtrl.hide();
      }, 3000);
    },
    err => {
      console.log(err);
    }
  );
}
}
