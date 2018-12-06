
import { Component, OnInit ,ViewChild, ElementRef,NgZone} from '@angular/core';
import { DealsService } from '../deals.service';
import {ActivatedRoute, Params} from '@angular/router'
import { Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-deals-edit',
  templateUrl: './user-deals-edit.component.html',
  styleUrls: ['./user-deals-edit.component.css']
})
export class UserDealsEditComponent implements OnInit {
  id:any;
  @ViewChild('postform') form
  dealslists = [];
  deallistobj={
    category:'',
    name:'',
    quantity:'',
    qnty:'',
    subQuantity:'',
    subqnty:'',
    price:'',
    description:'',
    date:new Date().toLocaleDateString(),
    avlPlace:{},
    validityTime:''
  }
  success:any
  categoryArr = []
  showUnit:any
  submitted:boolean;
  public addrKeys: string[];
  public addr: object;

  setAddress(addrObj) {
    //We are wrapping this in a NgZone to reflect the changes
    //to the object in the DOM.
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      console.log(this.addrKeys)
      console.log(this.addr)
    });
  }

  constructor(private  _dealsService:DealsService,private route:ActivatedRoute,private router:Router,public zone:NgZone,public loadingCtrl:NgxSpinnerService) { }

  ngOnInit() {

    this.loadingCtrl.show();
    this.InitialCall();

    this.id = this.route.snapshot.params['id']

    this._dealsService.getDeals()
    .subscribe(
      res=>{
        this.loadingCtrl.hide();
        this.dealslists = res
        console.log(this.dealslists)
        for(let i=0; i < this.dealslists.length; i++){
          if(this.id == this.dealslists[i]._id){
            this.deallistobj.category = this.dealslists[i].category
            this.deallistobj.name = this.dealslists[i].name
            this.deallistobj.quantity = this.dealslists[i].quantity
            this.deallistobj.qnty = this.dealslists[i].qnty
            this.deallistobj.subQuantity = this.dealslists[i].subQuantity
            this.deallistobj.subqnty = this.dealslists[i].subqnty
            this.deallistobj.price = this.dealslists[i].price
            this.deallistobj.description = this.dealslists[i].description
            this.deallistobj.avlPlace = this.dealslists[i].avlPlace.formatted_address
            this.deallistobj.validityTime = this.dealslists[i].validityTime
            this.showUnit = this.dealslists[i].qnty
          }
        }
        
         console.log(this.deallistobj)
      },
      err=>{
        this.loadingCtrl.hide();
        console.log(err)
      }
    )

      //category

  this._dealsService.getCategory()
  .subscribe(
      res => {
        this.categoryArr = res;
        console.log(this.categoryArr)
      },
  
      err => {
          this.categoryArr = [];
      });

   
  }

  getunits(){
    this.showUnit =this.deallistobj.qnty
   
  }


InitialCall() {
  for(let i=0; i < this.dealslists.length; i++){
    if(this.id == this.dealslists[i]._id){
      this.deallistobj.category = this.dealslists[i].category
      this.deallistobj.name = this.dealslists[i].name
      this.deallistobj.quantity = this.dealslists[i].quantity
      this.deallistobj.qnty = this.dealslists[i].qnty
      this.deallistobj.price = this.dealslists[i].price
      this.deallistobj.description = this.dealslists[i].description
      this.deallistobj.avlPlace = this.dealslists[i].avlPlace
      this.deallistobj.validityTime = this.dealslists[i].validityTime
    }
  }
}

  update(){
    console.log(this.deallistobj)
    let curntDte = new Date().toLocaleDateString();
    this.deallistobj.date = curntDte
    this.deallistobj.avlPlace = this.addr
    this._dealsService.editDeals(this.deallistobj,this.id)
    .subscribe(
      res=>{
        console.log(this.deallistobj),

        // console.log(res)
        this.success = "Updated successfully!"
        setTimeout(() => {
          // swal.close();
         // this.loadingCtrl.show();
          this.router.navigate(['/user-deals']);
         // this.loadingCtrl.hide();
      }, 3000);
      
      },
      err=>console.log(err),

    )
  }


  handleInput(evt)
			{
				var charCode = (evt.which) ? evt.which : evt.keyCode;
				if (charCode != 46 && charCode > 31 
				&& (charCode < 48 || charCode > 57))
				return true;
				return false;
      } 
      
      onSubmit(){
        this.form.form.markAsPristine();
        this.form.form.markAsUntouched();
        this.form.form.updateValueAndValidity();
       
        this.InitialCall(); 
      }
}
