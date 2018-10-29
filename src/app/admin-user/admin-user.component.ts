import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  registerUser=[]

  constructor(private _dealService:DealsService) { }

  ngOnInit() {

    this._dealService.getDetails()
       .subscribe(
         res=>{
          this.registerUser= res;
         },
         err=>{
          console.log(err)
         }
       )

  }

}
