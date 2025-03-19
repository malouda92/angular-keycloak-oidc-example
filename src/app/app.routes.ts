import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { canActivateAuthRole } from "./app-auth.guard";
import { ForbiddenComponent } from "./forbidden/forbidden.component";
import { PlanComponent } from "./plan/plan.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'forbidden', component: ForbiddenComponent, canActivate: [canActivateAuthRole], data: { roles: ['user'] } },
    { path: 'plan', component: PlanComponent, canActivate: [canActivateAuthRole], data: { roles: ['user', 'admin'] } }, 
    { path: 'dashboard', component: DashboardComponent, canActivate: [canActivateAuthRole], data: { roles: ['user', 'superadmin'] }}
  ];