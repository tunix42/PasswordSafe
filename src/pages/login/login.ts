import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/services/auth-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private password: string;
  public registerForm: FormGroup;
  public segment = 'login';
  public registered: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthServiceProvider,
              public formBuilder: FormBuilder) {
    this.renderRegisterForm();
    this.authService.getPassword().then((password) => {
      this.registered = password !== null;
      if(!this.registered) {
        this.segment = 'register';
      }
    })
  }

  ionViewDidLoad() {
  }

  login(){
    this.authService.login(this.password).then((authenticated) => {
      if(authenticated) {
        this.navCtrl.setRoot('SafePage');
        return;
      }
      this.showAuthError();
    });
  }

  showAuthError() {
    console.log('Wronggggg');
  }

  renderRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        oldPassword: [null],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }
    );
  }

  register() {
    this.authService.setPassword(this.registerForm.value).then((newHash) => {
      this.renderRegisterForm();
    })

  }

}
