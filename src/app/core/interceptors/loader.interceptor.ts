import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

/**
 * HTTP interceptor that automatically shows/hides loading indicators for all HTTP requests.
 *
 * Shows loader when request starts and hides it when request completes (success or error).
 * Supports multiple concurrent requests through the LoaderService's counter mechanism.
 */
export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  loaderService.show();

  return next(req).pipe(finalize(() => loaderService.hide()));
};
