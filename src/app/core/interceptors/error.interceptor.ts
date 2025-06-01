import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { catchError, throwError } from 'rxjs';

/**
 * HTTP interceptor that catches all HTTP errors and broadcasts them via ErrorService.
 *
 * Automatically intercepts failed HTTP requests and displays error messages to users
 * while preserving the original error for further handling.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      errorService.displayError(error.statusText, error.message);

      return throwError(() => error);
    })
  );
};
