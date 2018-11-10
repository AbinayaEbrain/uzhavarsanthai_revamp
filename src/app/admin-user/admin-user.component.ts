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
    _id:'',
    status:'',
    address:{
      city:'',
      location:''
    }
  }
  ]

  mapDeals=[];
  id:any
errMsg:any;
deactiveMsg:any
activeMsg:any
p:any;
data:any;

  constructor(private _dealService:DealsService,private route:ActivatedRoute,private router:Router,public loadingCtrl: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.loadingCtrl.show();
    this._dealService.getDetails()
       .subscribe(
         res=>{
          this.loadingCtrl.hide();
          this.registerUser= res;

          console.log( this.registerUser)
            for(let i=0;i<this.registerUser.length;i++){
              if(this.registerUser[i].firstname == "Admin"){
               console.log(this.registerUser)
                this.registerUser.splice(this.registerUser.indexOf(this.registerUser[i]), 1);
               }
            }
         

          if(this.registerUser.length == 0){
            this.errMsg = "No users found"
            }
         },
         err=>{
          this.loadingCtrl.hide();
          console.log(err)
         }
       )

  }

  //Deactivate Account
  deactiveAccount(data,id){
    this.id = this.route.snapshot.params['id']
    // alert(this.id)
    console.log(this.id)
    this._dealService.deactivateAccount(data,this.id)
    .subscribe(
       res=>{ 
         console.log(res)
         this.deactiveMsg ='Account Deactivated!'
            setTimeout(()=>{
              this.deactiveMsg = ''
              this.router.navigate[('/admin-user')]
            },2000)
           // this.router.navigate[('/admin-user')]
       },
       err=>{ console.log(err);
      },
    
    )
  }

   //activate Account
  activeAccount(data,id){
    this.id = this.route.snapshot.params['id']
    // alert(this.id)
    console.log(this.id)
    this._dealService.activateAccount(data,this.id)
    .subscribe(
       res=>{ 
         console.log(res)
         this.activeMsg ='Account Activated!'
        //  alert(this.activeMsg)
         setTimeout(()=>{
          this.activeMsg = ''
          this.router.navigate[('/admin-user')]
         },2000)
        
       },
       err=>{ console.log(err);
      },
    
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
