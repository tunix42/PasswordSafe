import { Component } from '@angular/core';
import { Account } from "../../models/account"
import {AlertController, Events, ModalController, NavParams, ToastController, ViewController} from "ionic-angular";
import {Clipboard} from "@ionic-native/clipboard";
import {AccountServiceProvider} from "../../providers/services/account-service";
import {AuthServiceProvider} from "../../providers/services/auth-service";
import {AccountAddComponent} from "../account-add/account-add";

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
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private accountService: AccountServiceProvider,
              private events: Events,
              private authService: AuthServiceProvider,
              private modalCtrl: ModalController) {
    this.account = this.navParams.data.account;
    this.events.subscribe('authService:logout', () => {
      this.viewCtrl.dismiss();
    });
  }

  ionViewCanEnter() {
    return this.authService.isAuthenticated();
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

  editAccount() {
    let modal = this.modalCtrl.create(AccountAddComponent,
      {
        account: this.account,
        refreshAccounts: () => {

        }
      }
    );
    modal.present();
  }

  deleteAccount() {
    let confirm = this.alertCtrl.create({
      title: `${this.account.platform} verwijderen?`,
      message: `Weet je zeker dat je het account voor ${this.account.platform} wilt verwijderen?`,
      buttons: [
        {
          text: 'Annuleer',
          role: 'cancel'
        },
        {
          text: 'Verwijder',
          handler: () => {
            this.accountService.delete(this.account).then(() => {
              let toast = this.toastCtrl.create({
                message: `Account voor ${this.account.platform} verwijderd`,
                duration: 3000
              });
              toast.present();
              this.viewCtrl.dismiss();
            })
          }
        }
      ]
    });
    confirm.present();
  }
}
