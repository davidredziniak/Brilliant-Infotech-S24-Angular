import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: "register", loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },
  { path: "user", loadComponent: () => import('./user-details/user-details.component').then(m => m.UserDetailsComponent) },
  { path: "personal", loadComponent: () => import('./personal-details/personal-details.component').then(m => m.PersonalDetailsComponent) },
];
