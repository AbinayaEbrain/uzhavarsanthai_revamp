import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from '../auth.service';
import { DealsService } from '../deals.service';
import { filter, pairwise } from 'rxjs/operators';
// loader
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('input1') inputEl:ElementRef;
  userData = {};
  errormsg;
  id: any;
  user: any;
  wholedata: any;
  deactiveErrorMsg: any;
  submitted: boolean;
  previousUrl: string;

  constructor(
    private router: Router,
    private _auth: AuthService,
    private _dealsService: DealsService,
    private location: Location,
    public loadingCtrl: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.loadingCtrl.show();
    setTimeout(() => this.inputEl.nativeElement.focus());
    setTimeout(() => {
      // swal.close();
      this.loadingCtrl.hide();
    }, 1000);

    this.router.events
      .pipe(
        filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((e: any) => {
        console.log(e[0].urlAfterRedirects); // previous url
        this.previousUrl = e[0].urlAfterRedirects;
        localStorage.setItem('previousUrl', e[0].urlAfterRedirects);
      });
  }
  
  logform() {
    this.loadingCtrl.show();
    this._auth.logInUser(this.userData).subscribe(
      res => {
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        localStorage.setItem('status', JSON.stringify(res.user.status));
        localStorage.setItem('firstname', JSON.stringify(res.user.firstname));
        localStorage.setItem('payload', JSON.stringify(res.payload));
        localStorage.setItem('token', res.token);

        this.wholedata = JSON.parse(localStorage.getItem('status'));
        this.user = JSON.parse(localStorage.getItem('firstname'));
        let previousUrl1 = localStorage.getItem('previousUrl');
        if (this.user === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          if (this.wholedata === 'ACTIVE') {
            if (previousUrl1 == '/blog-view') {
              this.router.navigate(['/blog']);
            } else 
            {
              this.router.navigate(['/products']);
            }
          } else {
            this.deactiveErrorMsg = 'Your account has been deactivated !';
            setTimeout(() => {
              this.deactiveErrorMsg = '';
            }, 3000);
          }
          this.loadingCtrl.hide();
        }

        this.loadingCtrl.hide();
      },
      err => {
        this.loadingCtrl.hide();
        if (err.statusText === 'Unauthorized') {
          this.errormsg = 'Invalid Phone Number and Password !';
          setTimeout(() => {
            this.errormsg = '';
          }, 3000);
        }
      }
    );
  }

  register() {
    this.router.navigate(['/register']);
  }
}
