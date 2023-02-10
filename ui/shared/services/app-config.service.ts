import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public userPermissions = [];

  public userSubunits = [];

  constructor() { }

  /**
   * Initialization function to be called when the application starts for fetching the config
   * @returns {Promise<any>}
   */
  public init() {
    return new Promise((resolve, reject) => {
      LKWService.callService('lkwapi', 'core/authorization', 'GET', null, (err : any, permissionData:any) => {
        this.userPermissions = permissionData;
        if(err){
          reject(err);
        }
        resolve(true);
      });
    });
  }
}
