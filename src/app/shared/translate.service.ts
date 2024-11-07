import { Injectable } from '@angular/core';
import { MENU } from './pipes/menu-translation';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private _currentLang:string = 'es';
  
  constructor() { }

  getCurrentLang():string{
    if(!this._currentLang){
      this._currentLang = 'es';
    }
    return this._currentLang;
  }

  setCurrentLang(lang:string){
    this._currentLang = lang;
  }

  getMenuTranslation(menuName:string | number):string | number{
    this.getCurrentLang();
    let translateWork = MENU[this._currentLang][menuName];
    if(translateWork != undefined){
      return translateWork;
    }
    return menuName;
  }
}
