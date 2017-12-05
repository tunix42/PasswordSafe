import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage";
import { ReactiveFormsModule } from '@angular/forms';

import { PasswordSafe } from './app.component';
import { AccountAddComponent } from "../components/account-add/account-add";
import { AccountServiceProvider } from '../providers/services/account-service';
import { AccountDetailsComponent } from "../components/account-details/account-details";
import { Clipboard } from "@ionic-native/clipboard";
import { AuthServiceProvider } from "../providers/services/auth-service";

@NgModule({
  declarations: [
    PasswordSafe,
    AccountAddComponent,
    AccountDetailsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(PasswordSafe),
    IonicStorageModule.forRoot(),
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PasswordSafe,
    AccountAddComponent,
    AccountDetailsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AccountServiceProvider,
    Clipboard,
    AuthServiceProvider
  ]
})
export class AppModule {}
