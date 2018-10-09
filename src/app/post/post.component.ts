import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  deals = [];

  constructor(private _dealsService:DealsService) { }

  ngOnInit() {

    this._dealsService.getPost()
    .subscribe(
      res => this.deals = res,
      err => console.log(err)
      
    )
  }

}
