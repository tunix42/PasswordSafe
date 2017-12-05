import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';
import {timer} from "rxjs/observable/timer";
import {Events, ToastController, Platform} from "ionic-angular";

@Injectable()
export class AuthServiceProvider {

  private passwordKey: string = 'password';
  private authenticated: boolean = false;

  constructor(private storage: Storage,
              private toastCtrl: ToastController,
              private events: Events,
              private platform: Platform) {

  }

  isAuthenticated() {
    return this.authenticated;
  }

  getPassword() {
    return this.storage.get(this.passwordKey);
  }

  setPassword(passwordForm) {
    return this.login(passwordForm.oldPassword).then((authenticated) => {
      if(authenticated) {
        let confirmation = passwordForm.newPassword === passwordForm.confirmPassword;
        if(confirmation) {
          let hash = this.hash(passwordForm.newPassword);
          return this.storage.set(this.passwordKey, hash).then((newHash) => {
            this.showToast('Nieuw wachtwoord geregistreerd');
          });
        }
      }
    });
  }

  hash(password) {
    //Todo Real hash
    return password;
  }

  login(password) {
    return this.getPassword().then((hashedPassword) => {
      this.authenticated = hashedPassword === this.hash(password);
      if(this.authenticated) {
        this.setExpiration();
        this.showToast('Je bent ingelogd');
      }
      return this.authenticated;
    })
  }

  setExpiration() {
    this.platform.pause.subscribe(() => {
      this.logout();
    });
    timer(30000).subscribe(() => {
      this.logout();
    });
  }

  logout() {
    this.authenticated = false;
    this.events.publish('authService:logout');
    this.showToast('Je bent uitgelogd');
  }

  showToast(message) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }
}
