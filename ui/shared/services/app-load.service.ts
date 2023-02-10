import { Injectable } from '@angular/core';
import {AppConfigService} from './app-config.service';
import {ScriptService} from './script.service';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {

  constructor(private appConfigService: AppConfigService, private scriptService: ScriptService) { }

  async initializeApp() {
    // Loads the serviceJS script before authentication verify
    await this.scriptService.loadScript('serviceJS');
    return new Promise((resolve, reject) => {
      LKWService.verifyCredentials(async (err : any) => {
        if (err) {
          console.log('Authentication failed..');
          reject(err);
        } else {
          
          // After verifying the token load the rest of the scripts
          await this.appConfigService.init();
          this.scriptService.loadAllScripts();
          resolve('Ok');
        }
      }, true);
    });
  }
}
