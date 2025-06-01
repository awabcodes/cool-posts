import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './core/services/loader.service';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, RouterOutlet, SpinnerComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  loaderService = inject(LoaderService);
}
