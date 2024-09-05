import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "login",
    loadComponent: () =>
      import("./login/login.component").then((m) => m.LoginComponent),
    data: { animation: 'One' }
  },
  {
    path: "register",
    loadComponent: () =>
      import("./register/register.component").then((m) => m.RegisterComponent),
    data: { animation: 'Two' }
  },
  {
    path: "user",
    loadComponent: () =>
      import("./user-details/user-details.component").then(
        (m) => m.UserDetailsComponent
      ),
  },
  {
    path: "personal",
    loadComponent: () =>
      import("./personal-details/personal-details.component").then(
        (m) => m.PersonalDetailsComponent
      ),
  },
  {
    path: "home",
    loadComponent: () =>
      import("./home/home.component").then((m) => m.HomeComponent),
  },
];
