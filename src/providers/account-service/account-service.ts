import { Injectable } from '@angular/core';
import {Account} from "../../models/account";
import { Storage } from '@ionic/storage';

@Injectable()
export class AccountServiceProvider {

  constructor(public storage: Storage) {

  }

  save(account: Account) {
    return new Promise((resolve) => {
      this.getAll().then((accounts) => {
        accounts = accounts || [];
        accounts.push(account);
        this.storage.set('accounts', accounts).then((setAccounts) => {
          resolve(setAccounts);
        });
      });
    })

  }

  getAll() {
    return this.storage.get('accounts');
  }

  getByPlatform(platform: string) {
    this.getAll().then((accounts) => {
      let foundAccount = accounts.filter((account) => {
        return account.platform === platform;
      });
      return foundAccount;
    })
  }

}
