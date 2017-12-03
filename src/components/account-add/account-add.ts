import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../models/account";
import {NavParams, ToastController, ViewController} from "ionic-angular";
import {AccountServiceProvider} from "../../providers/account-service/account-service";

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
              private toastCtrl: ToastController) {
    this.renderForm(this.navParams.data.account || new Account());
  }

  renderForm(account) {
    this.form = this.formBuilder.group(
      {
        platform: [account.platform || '', Validators.required],
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
          this.navParams.data.addAccount(newAccount);
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
