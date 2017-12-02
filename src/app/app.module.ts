import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { PasswordSafe } from './app.component';

@NgModule({
  declarations: [
    PasswordSafe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(PasswordSafe)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PasswordSafe
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
