import { Component } from '@angular/core';
import { Account } from "../../models/account"
import {NavParams, ToastController, ViewController} from "ionic-angular";
import {Clipboard} from "@ionic-native/clipboard";

@Component({
  selector: 'account-details',
  templateUrl: 'account-details.html'
})
export class AccountDetailsComponent {

  private account: Account;
  private showPassword: boolean = false;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              private clipboard: Clipboard,
              private toastCtrl: ToastController) {
    this.account = this.navParams.data.account;
  }

  copyToClipboard(data) {
    this.clipboard.copy(data).then(() => {
      this.toastCtrl.create({
        message: this.account.platform + ' gekopieerd naar clipboard',
        duration: 3000,
      }).present();
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
