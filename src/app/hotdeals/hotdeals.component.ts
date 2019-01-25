import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router} from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import { ViewcategoryComponent} from '../../app/viewcategory/viewcategory.component';
@Component({
  selector: 'app-hotdeals',
  templateUrl: './hotdeals.component.html',
  styleUrls: ['./hotdeals.component.css']
})
export class HotdealsComponent implements OnInit {
  crdDeals=[]
  id:any;
  categeoryName:string;
  viewCategory=[];
  queryString:any;
  p:any;
  constructor(private _dealsService:DealsService,private route:Router,private router:ActivatedRoute,private catcomp:ViewcategoryComponent) { }

  ngOnInit() {
    this.id = this.router.snapshot.params['id']
    this._dealsService.getDeals()
    .subscribe(
      res =>{ 
        this.crdDeals = res
      let j =0;
        for(let i=0; i < this.crdDeals.length; i++){
          if(this.id == this.crdDeals[i].categoryId){
            this.viewCategory[j] = this.crdDeals[i]
            j++;
          }
        }
},
      err =>{
        console.log(err)
      } 
    )
  }

}
