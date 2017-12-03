import { NgModule } from '@angular/core';
import { AccountAddComponent } from './account-add/account-add';
import { AccountDetailsComponent } from './account-details/account-details';

@NgModule({
	declarations: [
	  AccountAddComponent,
    AccountDetailsComponent
  ],
	imports: [],
	exports: [
	  AccountAddComponent,
    AccountDetailsComponent
  ]
})
export class ComponentsModule {}
