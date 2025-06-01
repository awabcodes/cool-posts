import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  imports: [],
  template: `
    <div
      role="progressbar"
      aria-label="Loading"
      class="fixed block top-0 left-0 w-full h-full bg-white opacity-50 z-1000"
    >
      <div
        class="absolute top-1/2 left-1/2 w-20 h-20 rounded-[50%] border-10 border-t-gray-900 border-gray-500 animate-spin"
      ></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
