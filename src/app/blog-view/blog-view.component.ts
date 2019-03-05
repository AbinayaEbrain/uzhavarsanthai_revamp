import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {
  blogArr = [];
  id: any;
  public bloglistobj: any = {};
  errMsg: any;
  success: any;
  show = 5;
  noBlog: any;

  constructor(
    private _auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public loadingCtrl: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.loadingCtrl.show();
    this.getAllBlog();
  }

  getAllBlog() {
    this._auth.blogGetData().subscribe(
      res => {
        this.blogArr = res;
        this.loadingCtrl.hide();
        if (this.blogArr.length == 0) {
          this.noBlog = 'No blogs added';
        }
      },
      err => {
        this.blogArr = [];
      }
    );
  }

  increaseShow() {
    this.show += 5;
  }

  deleteblog() {
    this.id = this.route.snapshot.params['id'];
    this._auth.blogDeleteData(this.id).subscribe(
      res => {
        setTimeout(() => {
          // swal.close();
          this.router.navigate(['/blog-view']);
        }, 1000);
      },
      err => {
        console.log(err);
      }
    );
  }
  blogEditData(id) {
    this.router.navigate(['blog', id]);
  }

  addBlog() {
    let isLoggedIn = this._auth.loggedIn();
    if (isLoggedIn == true) {
      this.router.navigate(['/blog']);
    } else {
      this.errMsg = 'You must login first!';

      // setTimeout(() => {
      //   this.router.navigate(['/login']);
      // }, 2000);
    }
  }

  openblog() {
    document.getElementById('hide').innerHTML = '';
  }
}
