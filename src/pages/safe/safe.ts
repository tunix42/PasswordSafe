import { Component } from '@angular/core';
import {AlertController, Events, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import { AccountAddComponent } from "../../components/account-add/account-add";
import { AccountServiceProvider } from "../../providers/services/account-service";
import { AccountDetailsComponent } from "../../components/account-details/account-details";
import {AuthServiceProvider} from "../../providers/services/auth-service";

@IonicPage()
@Component({
  selector: 'page-safe',
  templateUrl: 'safe.html',
})
export class SafePage {

  private accounts;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public accountsService: AccountServiceProvider,
              public alertCtrl: AlertController,
              private events: Events,
              private authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    this.getAccounts();
    this.events.subscribe('authService:logout', () => {
      this.navCtrl.setRoot('LoginPage');
    });
  }

  ionViewCanEnter() {
    return this.authService.isAuthenticated();
  }

  getAccounts() {
    this.accountsService.getAll().then((accounts) => {
      this.accounts = accounts || [];
    });
  }

  addAccount() {
    let modal = this.modalCtrl.create(AccountAddComponent,
      {
        addAccount: (newAccount) => {
          this.accounts.push(newAccount);
        }
      }
    );
    modal.present();
  }

  showDetails(account: Account) {
    let modal = this.modalCtrl.create(AccountDetailsComponent, {account: account});
    modal.onDidDismiss(() => {
      this.getAccounts();
    });
    modal.present();
  }

}
