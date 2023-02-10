import { Injectable } from '@angular/core';
import {WidgetScriptStore, WidgetStyleStore} from '../../shared/constants/widget-scripts-constants';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  private scripts: any = {};
  private styles: any = {};

  constructor() {
    WidgetScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });

    WidgetStyleStore.forEach(style => {
      this.styles[style.name] = {
        loaded: false,
        href: style.href
      };
    });
  }

  async loadAllScripts() {
    this.loadStyles(...Object.keys(this.styles));
    for (const scriptName of Object.keys(this.scripts)) {
      await this.loadScript(scriptName);
    }
    // Set scripts configuration
    this.setConfiguration();
  }

  public loadScript(name: string) {

    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve({script: name, loaded: true, status: 'Already Loaded'});
      } else {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.onload = () => {
          this.scripts[name].loaded = true;
          resolve({script: name, loaded: true, status: 'Loaded'});
          if (name === 'serviceJS') {
            this.setConfiguration();
          }
        };
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('body')[0].appendChild(script);
      }
    });
  }

  public loadExternalStyle(url: string) {
    return new Promise(resolve => {
      // load style
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.href = url;
      style.onload = () => {
        resolve({style: url, loaded: true, status: 'Loaded'});
      };
      style.onerror = (error: any) => resolve({style: url, loaded: false, status: 'Loaded'});
      document.getElementsByTagName('head')[0].appendChild(style);
    });
  }

  private setConfiguration() {
    lkwConfig.services.lvp = {};
    lkwConfig.services.lvp.root = environment.apiURL;
    lkwConfig.services.lvp.sendJSON = true;
  }

  private loadStyles(...styles: string[]) {
    const promises: any[] = [];
    styles.forEach((script) => promises.push(this.loadStyle(script)));
    return Promise.all(promises);
  }

  private loadStyle(name: string) {
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (this.styles[name].loaded) {
        resolve({style: name, loaded: true, status: 'Already Loaded'});
      } else {
        // load style
        const style = document.createElement('link');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.href = this.styles[name].href;
        style.onload = () => {
          this.styles[name].loaded = true;
          resolve({style: name, loaded: true, status: 'Loaded'});
        };
        style.onerror = (error: any) => resolve({style: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(style);
      }
    });
  }
}
