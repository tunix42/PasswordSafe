import { Injectable } from '@angular/core';
import {Account} from "../../models/account";
import { Storage } from '@ionic/storage';

@Injectable()
export class AccountServiceProvider {

  constructor(public storage: Storage) {

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

  delete(account: Account) {
    return new Promise((resolve) => {
      this.getAll().then((accounts) => {
        let index = accounts.indexOf(account);
        accounts.splice(index, 1);
        this.storage.set('accounts', accounts).then((setAcounts) => {
          resolve(setAcounts);
        });
      });
    });
  }
}
