import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthGuardData, createAuthGuard } from "keycloak-angular";

const isAccessAllowed = async (
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot,
    authData: AuthGuardData
  ): Promise<boolean | UrlTree> => {
    const { authenticated, grantedRoles } = authData;
    const router = inject(Router);
  
    const requiredRoles = route.data['roles'];
    if (!requiredRoles) {
      return false;
    }

    const hasAllRole = (requiredRoles: string[], roles: string[]): boolean => 
      requiredRoles.every(role => roles.includes(role));

    
    if (authenticated && hasAllRole(requiredRoles, grantedRoles.resourceRoles["frontend-angular"])) {
      return true;
    }
  
    return router.parseUrl("/forbidden");
  };
  
  export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);