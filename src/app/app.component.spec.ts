import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { LoaderService } from './core/services/loader.service';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loaderService: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([]), LoaderService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderService);
  });

  it('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

    const header = fixture.debugElement.query(By.css('[data-testid="header"]'));
    expect(header).toBeTruthy();

    const spinner = fixture.debugElement.query(By.css('[data-testid="spinner"]'));
    expect(spinner).toBeFalsy();
  });

  it('should display spinner when loading', async () => {
    loaderService.show();
    fixture.detectChanges();

    await fixture.whenStable();

    const spinner = fixture.debugElement.query(By.css('[data-testid="spinner"]'));
    expect(spinner).toBeTruthy();
  });

  it('should hide spinner when not loading', async () => {
    loaderService.hide();
    fixture.detectChanges();

    await fixture.whenStable();

    const spinner = fixture.debugElement.query(By.css('[data-testid="spinner"]'));
    expect(spinner).toBeFalsy();
  });
});
