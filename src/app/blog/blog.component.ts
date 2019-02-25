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

  constructor(
    private _auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  id: any;
  public bloglistobj: any = {};

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this._auth.blogGetOneData(this.id).subscribe(
      res => {
        console.log(res);
        this.blogUserData = res;
      },
      err => console.log(err)
    );
  }

  post() {
    if (this.id) {
      this._auth.blogEditData(this.blogUserData, this.id).subscribe(
        res => {
          console.log(res);
          // this.success = "Updated successfully!"
          setTimeout(() => {
            this.router.navigate(['/blog-view']);
          }, 1000);
        },
        err => console.log(err)
      );
    } else {
      this.blogUserData.bloggerName = this._auth.getUserName();
      this.blogUserData.createdAt = new Date().getTime();
      this._auth.blogUserData(this.blogUserData).subscribe(data => {
        console.log(data);
      });
      this.mytemplateForm.reset();
      this.router.navigate(['/blog-view']);
    }
  }
}
