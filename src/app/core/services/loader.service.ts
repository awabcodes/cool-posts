import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Service for managing application-wide loading states with reference counting.
 *
 * This service uses a counter-based approach to handle multiple concurrent loading operations.
 * The loading state is only activated when the first operation starts and only deactivated
 * when all operations complete.
 *
 * @example
 * ```typescript
 * // In component template
 * @if (loaderService.isLoading$ | async) {
 *   <div>Loading...</div>
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  /**
   * Internal BehaviorSubject that maintains the current loading state.
   * @private
   * @readonly
   */
  private readonly loadingState = new BehaviorSubject(false);

  /**
   * Observable stream of the current loading state.
   */
  isLoading$ = this.loadingState.asObservable();

  /**
   * Reference counter to track the number of active loading operations.
   * Loading state is true when counter > 0, false when counter === 0.
   */
  counter = 0;

  /**
   * Increments the loading counter and activates loading state if this is the first operation.
   *
   * Multiple calls to show() will increment the counter, but loading state will only
   * be activated once when the counter goes from 0 to 1.
   */
  show() {
    this.counter++;
    if (this.counter === 1) {
      this.loadingState.next(true);
    }
  }

  /**
   * Decrements the loading counter and deactivates loading state when all operations complete.
   *
   * The counter will not go below 0. Loading state is only deactivated when the counter
   * reaches exactly 0, ensuring all operations have completed.
   */
  hide() {
    if (this.counter - 1 >= 0) {
      this.counter--;
    }
    if (this.counter === 0) {
      this.loadingState.next(false);
    }
  }
}
