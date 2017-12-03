import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { AccountAddComponent } from "../../components/account-add/account-add";
import { AccountServiceProvider } from "../../providers/account-service/account-service";
import { AccountDetailsComponent } from "../../components/account-details/account-details";

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
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.accountsService.getAll().then((accounts) => {
      this.accounts = accounts;
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
    modal.present();
  }

}
