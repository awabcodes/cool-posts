import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Service for managing and broadcasting application-wide error messages.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  serverError: Subject<{ error: string; message: string }> = new Subject();

  readonly serverError$ = this.serverError.asObservable();

  /**
   * Broadcasts an error notification to all subscribers.
   */
  displayError(error: string, message: string) {
    this.serverError.next({ error, message });
  }
}
