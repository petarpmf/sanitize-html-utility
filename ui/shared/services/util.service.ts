import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  
  private modesMetadataCache;
  constructor(private spinner: NgxSpinnerService) { }

  public static convertObjectToQueryString(obj) {
    const queryString = Object.keys(obj).reduce(function (a, k) {
      if (!!obj[k] && obj[k] !== 'null') {
        a.push(k + '=' + encodeURIComponent(obj[k]));
      }
      return a;
    }, []).join('&');
    return queryString;
  }

  public async LKWServiceCall(apiPath: string, method = 'GET', body?: any, service = 'lvp'): Promise<any> {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      LKWService.callService(service, apiPath, method, body, (err, data) => {

        if (!!err && !data) {
          this.spinner.hide();
          console.error('Error: ', apiPath);
          //this.responseHandlerService.handleResponse(undefined, err);
          reject(err);
          this.spinner.hide();
          return;
        };
        if (data && data.status >= 400) {
          this.spinner.hide();
          //this.responseHandlerService.handleResponse(undefined, data);
          resolve(data);
        }

        this.spinner.hide();
        !!data ? resolve(data) : resolve('');
      });
    });
  }
}
