import { CONSTANT_AUTHORITY } from './../constant/constant-authorities';
import { LOCAL_STORAGE } from './../constant/constant';
import { Utils } from 'src/app/share/util/utils.static';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  data: any[] =[];
  dataAuthorites: any[] = [];
  constructor() {
    this.data = Utils.getSecureStorage(LOCAL_STORAGE.CONSTANT_AUTHORITY);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let checkReturn = false;
      console.log('route', route);
      console.log('state', state);
      console.log('state url', state.url);

      if(this.data.length <= 0 ) {
        this.data = Utils.getSecureStorage(LOCAL_STORAGE.CONSTANT_AUTHORITY);
      }
      if('/home/dashboard' === state.url) {
        checkReturn  = true;
      }
      if(this.data.length > -0) {
        let code = 'NA';
        CONSTANT_AUTHORITY.forEach(element => {
           if(element.URL === state.url) {
              code = element.CODE;
           }
        });
        if(code != 'NA') {
          for (let index = 0; index < this.data.length; index++) {
            const element = this.data[index];
            console.log('element', element);
            if(code === element.name) {
              checkReturn = true;
            }
          }
        }
      }
      if(checkReturn === false) {
        alert("Your user don't have permission access this function. pls check with user administrator");
      }
      return checkReturn;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     console.log('childRoute', childRoute);
     console.log('state', state);
     return true;
  }


}
