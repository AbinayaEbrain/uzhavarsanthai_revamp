import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  blogArr =[];
  id:any
  public bloglistobj: any = {};
  
  success: any;


  constructor(private _auth:AuthService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this._auth.blogGetData().subscribe(
res =>{
  
  this.blogArr = res;
  
  console.log(res);
},
err => {
  this.blogArr = [];
}
    );

  }
  deleteblog(){
    this.id = this.route.snapshot.params['id']
    console.log(this.id)
    this._auth.blogDeleteData(this.id)
    .subscribe(
       res=>{ 

         console.log(res)
        setTimeout(() => {
          // swal.close();
          this.router.navigate(['/blog-view']);
      }, 1000);
       },
       err=>{ console.log(err);
      },
    
    )
   }
  blogEditData(id) {
    this.router.navigate(['blog', id]);
  }
  // update(){
  //   this._auth.blogEditData(this.bloglistobj,this.id)
  //   .subscribe(
  //     res=>{
  //       console.log(res);
  //      // this.success = "Updated successfully!"
  //       setTimeout(() => {
  //         this.router.navigate(['/blog-view']);
  //     }, 3000);
      
  //     },
  //     err=>console.log(err),

  //   )
  // }
}
