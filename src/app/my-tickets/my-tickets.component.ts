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
  ticketId: number;
  ticketData : any = {};
  disputeArr : any = [];
  username:any;
  userphone:any;
  userrole:any;
  successMsg:any;
  submitted:any;
  ticketlngth:any;
  userid:any;
  totalTickets = [];
  userTickets = [];
  p:any;
  getExactDisputes = [];
  getAllDisputes = [];
  zeroCount:any;
  noDisputesMsg : any;
  noTicketsMsg:any;
  disputelength :any;
  disputelength1 :any;
  noOpenTicketsMsg :any;
  noClosedTicketsMsg : any;
  @ViewChild('ticketForm') mytemplateForm: NgForm;

  constructor(private _dealsService: DealsService,public loadingCtrl: NgxSpinnerService,private router: Router,) { }

  ngOnInit() {
      this.loadingCtrl.show();
      setTimeout(() => {
      this.loadingCtrl.hide();
      },3000);
      this.userid = JSON.parse(localStorage.getItem('currentUser'))._id;
      this.getAlltickets();
      this.getdispute();
  }
  getdisputes(){
    this.loadingCtrl.show();
    this._dealsService.getdispute().subscribe(
      res => {
          console.log(res);
          this.getAllDisputes = res;
          let j = 0;
          for(let i = 0; i < this.getAllDisputes.length;i++){
            console.log(this.getAllDisputes.length);
            if(this.userid == this.getAllDisputes[i].disputerId){
              this.getExactDisputes[j] =  this.getAllDisputes[i];
              j++;
              this.loadingCtrl.hide();
              this.disputelength = this.getExactDisputes.length;
              console.log(this.getExactDisputes);
            }
          }
          if(this.getExactDisputes.length == 0){
            this.loadingCtrl.show();
            console.log('no');
            this.disputelength1 = this.getExactDisputes.length;
            this.noDisputesMsg = "You have no disputes."
            this.loadingCtrl.hide();
          }
      },
      err => {
        this.loadingCtrl.show();
        console.log(err);
        this.loadingCtrl.hide();
      }
    );
  }

changeColor(){
  document.getElementById('paraTag').style.borderBottom = "solid #0d4608";
  document.getElementById('paraTag1').style.borderBottom = "solid white";
}
changeColor1(){
  document.getElementById('paraTag1').style.borderBottom = "solid #0d4608";
  document.getElementById('paraTag').style.borderBottom = "solid white";
}

  getAlltickets(){
    this.userTickets = [];
    this.loadingCtrl.show();
    this.getdisputes();
    this._dealsService.getTickets().subscribe(
      res => {
          console.log(res);
          this.userTickets = [];
          this.totalTickets = res;
          console.log(this.totalTickets.length);
          let j = 0;
          for(let i = 0; i < this.totalTickets.length; i++){
            console.log(this.totalTickets.length);
            if(this.userid == this.totalTickets[i].userid){
             this.userTickets[j] = this.totalTickets[i];
             j++;
             this.loadingCtrl.hide();
             this.ticketlngth = this.userTickets.length;
             console.log(this.userTickets);
            }
          }
          if(this.userTickets.length == 0){
            this.loadingCtrl.show();
            this.noTicketsMsg = "You have no tickets."
            this.loadingCtrl.hide();
            console.log(this.noTicketsMsg );
          }
      },
      err => {
        this.loadingCtrl.show();
        console.log(err);
        this.loadingCtrl.hide();
      }
    );
  }

openTickets(){
  console.log('1');
  this.userTickets = [];
  this.loadingCtrl.show();
  this._dealsService.getTickets().subscribe(
    res => {

        console.log('2');
        console.log(res);
        this.totalTickets = res;

        this.noClosedTicketsMsg = '';

        console.log('3');
        console.log(this.totalTickets.length);
        let j = 0;
        for(let i = 0; i < this.totalTickets.length; i++){
          console.log('4');
          console.log(this.totalTickets.length);
          if(this.userid == this.totalTickets[i].userid && this.totalTickets[i].ticketStatus == "Created"){
           this.userTickets[j] = this.totalTickets[i];
           j++;
           this.ticketlngth = this.userTickets.length;
           console.log(this.userTickets);
          }
          this.loadingCtrl.hide();
        }
        console.log(this.userTickets.length);
        if(this.userTickets.length == 0){
          console.log(this.userTickets.length);
          this.loadingCtrl.show();
          this.noOpenTicketsMsg = "You have no open tickets."
          this.noTicketsMsg = " ";
          this.noClosedTicketsMsg = "";
          this.loadingCtrl.hide();
          console.log(this.noOpenTicketsMsg );
        }
    },
    err => {
      this.loadingCtrl.show();
      console.log(err);
      this.loadingCtrl.hide();
    }
  );
}

closedTickets(){
  this.loadingCtrl.show();
  this._dealsService.getTickets().subscribe(
    res => {
        console.log(res);
        this.userTickets = [];
        this.totalTickets = res;
        console.log(this.totalTickets.length);
        let j = 0;
        for(let i = 0; i < this.totalTickets.length; i++){
          console.log(this.totalTickets.length);
          if(this.userid == this.totalTickets[i].userid && this.totalTickets[i].ticketStatus === "Resolved"){
           this.userTickets[j] = this.totalTickets[i];
           j++;
           this.loadingCtrl.hide();
           this.ticketlngth = this.userTickets.length;
           console.log(this.userTickets);
          }
          this.loadingCtrl.hide();
        }
        this.noOpenTicketsMsg = "";
        console.log(this.userTickets.length);
        if(this.userTickets.length == 0){
          this.loadingCtrl.show();
          this.noClosedTicketsMsg = "You have no closed tickets."
          this.noTicketsMsg = " ";
          this.noOpenTicketsMsg = "";
          this.loadingCtrl.hide();
          console.log(this.noTicketsMsg );
        }
    },
    err => {
      this.loadingCtrl.show();
      console.log(err);
      this.loadingCtrl.hide();
    }
  );
}

sendticket(){
  this.loadingCtrl.show();
  var a = "UZ"
  this.ticketId = Math.floor(100000 + Math.random() * 900000);
  console.log(this.ticketId);
  this.ticketData.ticketId = a + "-" + this.ticketId;
  this.ticketData.ticketStatus = 'Created';
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
          // this.loadingCtrl.show();
        this.router.navigateByUrl('/dummy', { skipLocationChange: true });
        setTimeout(() => this.router.navigate(['/my-tickets']),100);
          // this.loadingCtrl.hide();
      }, 3000);
    },
    err => {
      console.log(err);
    }
  );
}

// getdispute() {
//   this._dealsService.getBuyerDispute().subscribe(
//     data => {
//       console.log(data);
//       let j = 0;
//       for (let i = 0; i < data.length; i++) {
//         console.log(this.userid);
//         console.log(data.disputerId);
//         if (this.userid == data[i].disputerId) {
//           this.disputeArr[j] = data[i];
//           j++;
//         }
//       }
//       console.log(this.disputeArr);
//     },
//     err => {
//       console.log(err);
//     }
//   );
// }

getdispute() {
  this._dealsService.getdispute().subscribe(
    data => {
      console.log(data);
      let j = 0;
      for (let i = 0; i < data.length; i++) {
        console.log(this.userid);
        console.log(data[i].disputerId);
        if (this.userid == data[i].disputerId) {
          this.disputeArr[j] = data[i];
          j++;
        }
      }

      console.log(this.disputeArr);
    },
    err => {
      console.log(err);
    }
  );
}



}
