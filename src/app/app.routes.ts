import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { PersonalDetailsComponent } from "./personal-details/personal-details.component";

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "user", component: UserDetailsComponent },
  { path: "personal", component: PersonalDetailsComponent },
];
