import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../models/account";
import {Events, NavParams, ToastController, ViewController} from "ionic-angular";
import {AccountServiceProvider} from "../../providers/services/account-service";
import {existValidator} from "../../providers/validators/exist.validator";
import {AuthServiceProvider} from "../../providers/services/auth-service";

@Component({
  selector: 'account-add',
  templateUrl: 'account-add.html'
})
export class AccountAddComponent {

  private form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private viewCtrl: ViewController,
              private accountService: AccountServiceProvider,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private events: Events,
              private authService: AuthServiceProvider) {
    this.renderForm(this.navParams.data.account);
    this.accountService.getAll().then((accounts: Account[]) => {
      if(accounts) {
        let platforms = accounts.map(account => account.platform);
        if(this.navParams.data.account) {
          let index = platforms.indexOf(this.navParams.data.account.platform);
          platforms.splice(index);
        }
        this.renderForm(this.navParams.data.account, platforms);
      }
    });
    this.events.subscribe('authService:logout', () => {
      this.viewCtrl.dismiss();
    });
  }

  ionViewCanEnter() {
    return this.authService.isAuthenticated();
  }

  renderForm(account: Account = new Account(), existingPlatforms = null) {
    this.form = this.formBuilder.group(
      {
        platform: [account.platform || '', [Validators.required, existValidator(existingPlatforms)]],
        platformIcon: [account.platformIcon || 'lock', Validators.required],
        username: [account.username || ''],
        password: [account.password || '', Validators.required]
      }
    );
  }

  submit() {
    let newAccount: Account = this.form.value;
    this.accountService.save(newAccount)
      .then(
        (accounts) => {
          this.navParams.data.refreshAccounts(newAccount);
          this.toastCtrl.create({
            message: newAccount.platform + ' account is opgeslagen!',
            duration: 3000,
          }).present();
          this.viewCtrl.dismiss(newAccount);
        },
        (err) => {
          console.log(err)
        });
  }
}
