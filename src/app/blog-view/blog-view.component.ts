import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DealsService } from '../deals.service';
declare var $: any;
// import * as moment from 'moment';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {
  blogArr = [];
  id: any;
  public bloglistobj: any = {};
  public trackInformationData: any = {};
  errMsg: any;
  success: any;
  show = 5;
  noBlog: any;

  constructor(
    private _auth: AuthService,
    private _dealService: DealsService,
    private route: ActivatedRoute,
    private router: Router,
    public loadingCtrl: NgxSpinnerService
  ) {}

  ngOnInit() {
    document.getElementById('focusDiv').focus();
    this.loadingCtrl.show();
    this.getAllBlog();
  }

  getAllBlog() {
    this._auth.blogGetData().subscribe(
      res => {
        this.blogArr = res;
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'blogview';
        this.postTrackInformation();
        this.loadingCtrl.hide();
        if (this.blogArr.length == 0) {
          this.noBlog = 'No blogs added';
        }
      },
      err => {
        this.blogArr = [];
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'blogview';
        this.postTrackInformation();
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
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'blogdel';
        this.postTrackInformation();
        setTimeout(() => {
          // swal.close();
          this.router.navigate(['/blog-view']);
        }, 1000);
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'blogdel';
        this.postTrackInformation();
      }
    );
  }
  blogEditData(id) {
    this.router.navigate(['blog', id]);
  }

  addBlog() {
    $('.showAlert').show();
    let isLoggedIn = this._auth.loggedIn();
    if (isLoggedIn == true) {
      this.router.navigate(['/blog']);
    } else {
      $('.showAlert').show();
      this.errMsg = 'You must login first!';
      // setTimeout(() => {
      //   this.errMsg = '';
      // }, 1000);
    }
  }

  openblog() {
    document.getElementById('hide').innerHTML = '';
  }

  postTrackInformation() {
    let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
    let token = localStorage.getItem('token');
    let UserName = localStorage.getItem('firstname');
    let ipAddress = JSON.parse(localStorage.getItem('privateIP'));
    this.trackInformationData.UserId = acntID;
    this.trackInformationData.jwt = token;
    this.trackInformationData.ipAddress = ipAddress;
    this.trackInformationData.UserName = UserName;
    this.trackInformationData.apiCallingAt = new Date().getTime();
    this._dealService
      .trackInformationPost(this.trackInformationData)
      .subscribe(data => {
        console.log(data);
      });
  }
}
