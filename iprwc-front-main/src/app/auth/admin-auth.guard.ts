import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> | Promise<boolean> | boolean   {
    return this.authService.getRole().pipe(take(1), map(role => {
      if (role.role.match("ADMIN")){
        return true;
      } else {
        this.router.navigate(['/products']);
        return false;
      }
    }));
  }
}

export const AdminAuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean   => {
  return inject(PermissionsService).canActivate(next, state);
}
