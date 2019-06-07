import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public blogUserData: any = {};
  @ViewChild('usrform') mytemplateForm: NgForm;
  @ViewChild('focus') divFocus: ElementRef;
  blogArr: any = [];
  loggedInBlog: any = [];
  success: any;
  id: any;
  public bloglistobj: any = {};
  show = 5;
  noBlog: any;
  blogId:any;

  constructor(
    private _auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public loadingCtrl: NgxSpinnerService
  ) {}

  ngOnInit() {
    document.getElementById('focusDiv').focus();
    this.loadingCtrl.show();
    // this.id = this.route.snapshot.params['id'];
    this.getAllBlog();
  }

  editBLog(id){
    if(this.id){
      console.log(this.id);
    this._auth.blogGetOneData(this.id).subscribe(
      res => {
        console.log(res);
        this.blogUserData = res;
        console.log(this.blogUserData);
        this.loadingCtrl.hide();
      },
      err => {
        console.log(err);
        this.loadingCtrl.hide();
      }
    );
  }
  }

  getAllBlog() {
    let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
    this._auth.blogGetData().subscribe(
      data => {
        this.blogArr = data;
        this.loadingCtrl.hide();
        console.log(this.blogArr);
        let j = 0;
        for (let i = 0; i < this.blogArr.length; i++) {
          if (acntID == this.blogArr[i].accountId) {
            this.loggedInBlog[j] = this.blogArr[i];
            j++;
          }
        }
        if (this.loggedInBlog.length == 0) {
          this.noBlog = 'No blogs added';
        }
        // console.log(this.loggedInBlog);
      },
      err => {
        console.log(err);
        this.loadingCtrl.hide();
      }
    );
  }

  edit(id) {
    this.id = id;
    console.log(this.id);
    this.editBLog(id);
    document.getElementById('focus').scrollIntoView();
  }

  
  getId(id){
    console.log(id);
    this.blogId = id
      }

  deleteblog() {
    this.id = this.blogId;
    this._auth.blogDeleteData(this.id).subscribe(
      res => {
        this.loadingCtrl.show();
        setTimeout(() => {
          // swal.close();
          this.router.navigateByUrl('/dummy', { skipLocationChange: true });
          setTimeout(() => this.router.navigate(['/blog']),0);
          // this.router.navigate(['/blog']);
          this.loadingCtrl.hide();
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
          this.success = 'Updated successfully!';
          this.getAllBlog();
          setTimeout(() => {
            this.success = '';
            this.mytemplateForm.reset();
            this.router.navigate(['/blog']);
            document.getElementById('cardFocus').scrollIntoView();
          }, 2000);
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
        this.noBlog = '';
        this.success = 'Saved successfully!';
        this.getAllBlog();
        setTimeout(() => {
          this.success = '';
          this.mytemplateForm.reset();
          document.getElementById('cardFocus').scrollIntoView();
        }, 2000);
      });
    }
  }

}
