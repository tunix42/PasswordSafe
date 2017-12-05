import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';
import {timer} from "rxjs/observable/timer";
import {Events, ToastController, Platform} from "ionic-angular";
import {Md5} from 'ts-md5/dist/md5';

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

  setPassword(newPassword) {
    let hash = Md5.hashStr(newPassword);
    return this.storage.set(this.passwordKey, hash).then((newHash) => {
      this.showToast('Nieuw wachtwoord geregistreerd');
      return newHash;
    });
  }

  registerPassword(passwordForm) {
    return new Promise((resolve, reject) => {
      if(passwordForm.newPassword !== passwordForm.confirmPassword) reject('Nieuwe wachtwoorden komen niet overeen');

      this.getPassword().then((savedPassword) => {
        if(savedPassword){
          this.login(passwordForm.oldPassword).then((authenticated) => {
            if(!authenticated) {
              reject('Oude wachtwoord is onjuist');
            }
            else{
              this.setPassword(passwordForm.newPassword).then((newHash) => {
                resolve(newHash);
              });
            }
          });
        }
        else{
          this.setPassword(passwordForm.newPassword).then((newHash) => {
            resolve(newHash);
          });
        }
      });
    });
  }

  login(password) {
    return this.getPassword().then((hashedPassword) => {
      this.authenticated = hashedPassword === Md5.hashStr(password);
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
