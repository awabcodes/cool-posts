import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header class="w-full z-10 bg-gray-900 text-white p-6">
      <nav class="flex items-center justify-between">
        <div class="text-2xl font-bold">
          <a routerLink="/">Cool Posts</a>
        </div>
      </nav>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
