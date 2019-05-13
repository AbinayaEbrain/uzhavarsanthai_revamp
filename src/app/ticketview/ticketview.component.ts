import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ticketview',
  templateUrl: './ticketview.component.html',
  styleUrls: ['./ticketview.component.css']
})
export class TicketviewComponent implements OnInit {
id:any;
totalTickets = [];
userTickets = [];
ticketId:any;
ticketStatus:any;
ticketTitle:any;
ticketDescrip:any;
ticketDate:any;

  constructor( private _dealsService: DealsService,
    private route: ActivatedRoute,
    private router: Router, public loadingCtrl: NgxSpinnerService) { }

  ngOnInit() {
      this.loadingCtrl.show();
        this.id = this.route.snapshot.params['id'];
        console.log(this.id);
        this._dealsService.getTickets().subscribe(
          res => {
              console.log(res);
              this.totalTickets = res;
              console.log(this.totalTickets.length);
              let j = 0;
              for(let i = 0; i < this.totalTickets.length; i++){
                console.log(this.totalTickets.length);
                if(this.id == this.totalTickets[i]._id){
                 this.userTickets[j] = this.totalTickets[i];
                 this.ticketId = this.userTickets[j].ticketId;
                 this.ticketStatus = this.userTickets[j].ticketStatus;
                 this.ticketTitle = this.userTickets[j].ticketTitle;
                 this.ticketDescrip = this.userTickets[j].ticketDescription;
                 this.ticketDate = this.userTickets[j].createddate;
                 console.log(this.ticketId);
                 j++;
              this.loadingCtrl.hide();
                 console.log(this.userTickets);
                }
              }
          },
          err => {
            console.log(err);
          }
        );
  }

}
