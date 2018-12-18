
import { Component, OnInit ,ViewChild, ElementRef,NgZone} from '@angular/core';
import { DealsService } from '../deals.service';
import {ActivatedRoute, Params} from '@angular/router'
import { Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import {  FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:5000/api/upload';

interface FileReaderEventTarget extends EventTarget {
  result:string
}

// interface FileReaderEvent extends Event {
//   target: FileReaderEventTarget;
//   getMessage():string;
// }

interface EventTarget { result: any; }

@Component({
  selector: 'app-user-deals-edit',
  templateUrl: './user-deals-edit.component.html',
  styleUrls: ['./user-deals-edit.component.css']
})
export class UserDealsEditComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  id:any;
  @ViewChild('postform') form
  dealslists = [];
  time:any
  public deallistobj: any = {};
  success:any
  categoryArr = []
  showUnit:any
  submitted:boolean;
  public addrKeys: string[];
  public addr: {
    formatted_address:''
  };
  public address:any
 public formatted_address:any
 url: ''

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

  constructor(private  _dealsService:DealsService,private route:ActivatedRoute,private router:Router,public zone:NgZone,public loadingCtrl:NgxSpinnerService
  , private datePipe: DatePipe) {}

  onSelectFile(event) { // called each time file input changes
    
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
      }
    }
    if(this.url !== null || this.url !== ''){
      document.getElementById('hide').style.display='block';
      document.getElementById('show').style.display='none';
    }
}

  ngOnInit() {

    this.loadingCtrl.show();
    this.InitialCall();

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false};

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
         console.log("ImageUpload:uploaded:", item, status, response);

         localStorage.setItem('Image', JSON.stringify(response));
     };


    this.id = this.route.snapshot.params['id']

    //edit deals

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
            this.deallistobj.image = this.dealslists[i].image
            this.address = this.dealslists[i].avlPlace
            this.time = this.dealslists[i].validityTime
            this.showUnit = this.dealslists[i].qnty
            
          }
        console.log(this.address)
        
        }
        
        this.deallistobj.avlPlace = this.address.formatted_address 
        this.deallistobj.validityTime = this.datePipe.transform((this.time),'dd/MM/yyyy');
        localStorage.setItem('Image', JSON.stringify(this.deallistobj.image));
        console.log(this.deallistobj)

      },
      err=>{
        this.loadingCtrl.hide();
        console.log(err)
      }
    )


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
    this.showUnit = this.deallistobj.qnty
  }


InitialCall() {
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
      this.deallistobj.avlPlace = this.dealslists[i].avlPlace
      this.time = this.dealslists[i].validityTime
    }
  }
  this.deallistobj.validityTime = this.datePipe.transform((this.time),'MM/dd/yyyy');
  console.log(this.deallistobj)
}

  update(){
    
    let curntDte = new Date().toLocaleDateString();
    this.deallistobj.date = curntDte

    if(this.addr == null || this.addr == undefined){
      this.deallistobj.avlPlace = this.address 
    }
    else{
      this.deallistobj.avlPlace = this.addr
    }

    this.deallistobj.image = JSON.parse(localStorage.getItem('Image'));
    
    console.log(this.deallistobj)

    this._dealsService.editDeals(this.deallistobj,this.id)
    .subscribe(
      res=>{

        console.log(res),

        this.success = "Updated successfully!"
        setTimeout(() => {
          
         // this.loadingCtrl.show();
          this.router.navigate(['/user-deals']);
         // this.loadingCtrl.hide();
      }, 2000);
      
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
