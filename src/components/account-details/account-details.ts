import { Component } from '@angular/core';
import { Account } from "../../models/account"
import {NavParams, ViewController} from "ionic-angular";

@Component({
  selector: 'account-details',
  templateUrl: 'account-details.html'
})
export class AccountDetailsComponent {

  private account: Account;
  private showPassword: boolean = false;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.account = this.navParams.data.account;
  }

  copyToClipboard(data) {
    console.log('coppied: ' + data);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
