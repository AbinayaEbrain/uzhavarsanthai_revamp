
import { Component, OnInit ,ViewChild} from '@angular/core';
import { DealsService } from '../deals.service';
import {ActivatedRoute, Params} from '@angular/router'
import { Router} from '@angular/router'

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
    price:'',
    description:'',
    date:new Date().toLocaleDateString(),
    avlPlace:''
  }
  constructor(private  _dealsService:DealsService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {

    
    this.InitialCall();

    this.id = this.route.snapshot.params['id']
   
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
    }
  }
}

  update(){
    console.log(this.deallistobj)
    let curntDte = new Date().toLocaleDateString();
    this.deallistobj.date = curntDte
    this._dealsService.editDeals(this.deallistobj,this.id)
    .subscribe(
      res=>{console.log(this.deallistobj),
        this.router.navigate[('/user-deals')]},
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
