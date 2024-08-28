import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from './_services/user.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const authToken = userService.currentToken;

  // Intercept the request and add the session JWT
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  // If "skip" is True in headers, continue with request without Authorization token
  // Login + Registration page
  if (req.headers.get("skip"))
    return next(req);
  
  return next(authReq);
};
