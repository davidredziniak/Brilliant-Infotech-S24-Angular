import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { tokenInterceptor } from "./token.interceptor";
import { provideAnimations } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([tokenInterceptor]), withFetch()),
    provideAnimations()
  ],
};
