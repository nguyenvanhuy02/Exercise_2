import {Injectable} from '@angular/core';
import {TokenService} from "../../service/security/token.service";
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate{

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    // @ts-ignore
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.tokenService.getToken()) {

      const roles = this.tokenService.getRole();

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < roles.length; i++) {

        if (roles[i] === 'ROLE_ADMIN') {
          return true;
        }

      }

      this.toastr.error('You do not have access to this page');
      this.router.navigateByUrl('');

    } else {
      this.toastr.error('Login required');
      this.router.navigateByUrl('/login');
    }


  }
}
