import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLoadService } from 'shared/services/app-load.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { SafePipe } from 'shared/pipes/safe.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxSpinnerModule
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [{provide: APP_INITIALIZER, useFactory: appInitFactory, deps: [AppLoadService], multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function appInitFactory(appLoadService: AppLoadService) {
  return async () => {
    await appLoadService.initializeApp();
  };
}
