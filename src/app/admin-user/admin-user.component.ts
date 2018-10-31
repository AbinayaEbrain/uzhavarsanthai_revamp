import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import {ActivatedRoute} from '@angular/router';
import {Router, ParamMap} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  registerUser=[{
    firstname:'',
    _id:''
  }
  ]
  id:any
errMsg:any;
  constructor(private _dealService:DealsService,private route:ActivatedRoute,private router:Router,public loadingCtrl: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.loadingCtrl.show();
    this._dealService.getDetails()
       .subscribe(
         res=>{
          this.loadingCtrl.hide();
          this.registerUser= res;

          for(let i=0;i<this.registerUser.length;i++){
            if(this.registerUser[i].firstname == "Admin"){
              // alert(this.registerUser[i].firstname)
              // alert("i"+i)
              this.registerUser.splice(this.registerUser.indexOf(this.registerUser[i]), 1);
              //alert(this.registerUser.indexOf(this.registerUser[i]))
              
              // document.getElementById('shwBtn').style.display='block';
            }
          }
         

          if(this.registerUser.length == 0){
            this.errMsg = "No Category Added"
 
          }
         },
         err=>{
          this.loadingCtrl.hide();
          console.log(err)
         }
       )

  }

  deleteuser(){
    this.id = this.route.snapshot.params['id']
    this._dealService.deleteUser(this.id)
    .subscribe(
       res=>{ console.log(res)
       
       
       },
       err=>{ console.log(err);
      },
    
    )
  }

}
