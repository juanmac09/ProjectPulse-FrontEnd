import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/authService/auth-service.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const excludedUrls = ['/auth/login', '/auth/signup', '/company/all'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  if (!isExcluded) {

    const token = authService.getToken();

    req = req.clone({
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  return next(req);

};
