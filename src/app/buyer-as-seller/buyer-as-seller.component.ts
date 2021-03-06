import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

declare var swal: any;

@Component({
  selector: 'app-buyer-as-seller',
  templateUrl: './buyer-as-seller.component.html',
  styleUrls: ['./buyer-as-seller.component.css']
})
export class BuyerAsSellerComponent implements OnInit {
  id: any;
  success: any;
  public crntUser: any = {};
  public trackInformationData: any = {};
  loggedUser = [];
  currentuserId: any;
  show = true;
  roleStatus: any;
  private sendMailSignUpBuyer =
    'https://uzhavarsanthai.herokuapp.com/api/sendMailSignUpBuyer';

  constructor(
    private _dealsService: DealsService,
    private _auth: AuthService,
    public loadingCtrl: NgxSpinnerService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadingCtrl.show();
    document.getElementById('focusDiv').focus();
    this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getSingleUser();
  }

  getSingleUser() {
    this._dealsService.getDetails().subscribe(
      res => {
        this.loggedUser = res;
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'details';
        this.postTrackInformation();
        for (let i = 0; i < this.loggedUser.length; i++) {
          if (this.id == this.loggedUser[i]._id) {
            this.crntUser = this.loggedUser[i];
            this.roleStatus = this.loggedUser[i].roleStatus;
          }
        }
        this.loadingCtrl.hide();
        console.log(this.crntUser);
        if (this.roleStatus == 'Deactive') {
        }
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'details';
        this.postTrackInformation();
      }
    );
  }

  updateUser() {
    this.show = false;
    this.crntUser.roleStatus = 'Deactive';
    // this.crntUser.role = 'seller';
    console.log(this.crntUser);
    this._dealsService.updateCustomer(this.crntUser, this.id).subscribe(
      data => {
        console.log(data);
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'updateuser';
        this.postTrackInformation();
        if (data.roleStatus == 'Deactive') {
          if (data) {
            this.http.post<any>(this.sendMailSignUpBuyer, data).subscribe(
              data => {
                if (data) {
                  console.log(data);
                  console.log('success');
                }
              },
              err => {
                console.log(err);
              }
            );
          }
          swal({
            title: 'Requested successfully!',
            text:
              'Your request for seller has been sent succesfully! Please wait until you get confirmation message to LOGIN.',
            imageUrl:
              'https://res.cloudinary.com/uzhavar-image/image/upload/v1559912230/progress.gif'
          });
          this.getSingleUser();
          this.router.navigate(['/buyerAsSeller']);
        }
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'updateuser';
        this.postTrackInformation();
      }
    );
  }

  postTrackInformation() {
    let tracking = this._auth.loggedIn()
    if(tracking){
      let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
      let token = localStorage.getItem('token');
      let UserName = localStorage.getItem('firstname');
      let ipAddress = JSON.parse(localStorage.getItem('privateIP'));
      this.trackInformationData.UserId = acntID;
      this.trackInformationData.jwt = token;
      this.trackInformationData.ipAddress = ipAddress;
      this.trackInformationData.UserName = UserName;
    }else{
      this.trackInformationData.UserId = '';
      this.trackInformationData.jwt = '';
      this.trackInformationData.ipAddress = '';
      this.trackInformationData.UserName = '';
    }
    this.trackInformationData.apiCallingAt = new Date().getTime();
    this._dealsService
      .trackInformationPost(this.trackInformationData)
      .subscribe(data => {
        console.log(data);
      });
  }

}
