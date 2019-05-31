import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  loggedUser = [];
  currentuserId: any;
  show = true;
  roleStatus: any;
  private sendMailSignUpBuyer =
    'https://uzhavarsanthai.herokuapp.com/api/sendMailSignUpBuyer';

  constructor(
    private _dealsService: DealsService,
    public loadingCtrl: NgxSpinnerService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadingCtrl.show();
    this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getSingleUser();
  }

  getSingleUser() {
    this._dealsService.getDetails().subscribe(
      res => {
        this.loggedUser = res;
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
            imageUrl: '../../assets/Images/progress.gif'
          });
          this.getSingleUser();
          this.router.navigate(['/buyerAsSeller']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
