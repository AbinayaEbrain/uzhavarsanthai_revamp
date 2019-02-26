import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public blogUserData: any = {};
  @ViewChild('usrform') mytemplateForm: NgForm;
  blogArr: any = [];
  loggedInBlog: any = [];

  constructor(
    private _auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  id: any;
  public bloglistobj: any = {};
  show = 5;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;

    this._auth.blogGetData().subscribe(
      data => {
        this.blogArr = data;
        console.log(this.blogArr);
        let j = 0;
        for (let i = 0; i < this.blogArr.length; i++) {
          if (acntID == this.blogArr[i].accountId) {
            this.loggedInBlog[j] = this.blogArr[i];
            j++;
          }
        }
        console.log(this.loggedInBlog);
      },
      err => {
        console.log(err);
      }
    );

    this._auth.blogGetOneData(this.id).subscribe(
      res => {
        console.log(res);
        this.blogUserData = res;
      },
      err => console.log(err)
    );
  }

  deleteblog() {
    this.id = this.route.snapshot.params['id'];
    this._auth.blogDeleteData(this.id).subscribe(
      res => {
        setTimeout(() => {
          // swal.close();
          this.router.navigate(['/blog']);
        }, 1000);
      },
      err => {
        console.log(err);
      }
    );
  }

  increaseShow() {
    this.show += 5; 
  }

  post() {
    if (this.id) {
      this._auth.blogEditData(this.blogUserData, this.id).subscribe(
        res => {
          console.log(res);
          // this.success = "Updated successfully!"
          setTimeout(() => {
            this.router.navigate(['/blog']);
          }, 1000);
        },
        err => console.log(err)
      );
    } else {
      this.blogUserData.bloggerName = this._auth.getUserName();
      this.blogUserData.createdAt = new Date().getTime();
      this.blogUserData.accountId = JSON.parse(
        localStorage.getItem('currentUser')
      )._id;
      this._auth.blogUserData(this.blogUserData).subscribe(data => {
        console.log(data);
      });
      this.mytemplateForm.reset();
      this.router.navigate(['/blog']);
    }
  }
}
