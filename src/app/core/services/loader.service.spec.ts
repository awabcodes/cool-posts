import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LoaderService] });
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show the loader', () => {
    service.show();

    service.isLoading$.subscribe((isLoading) => expect(isLoading).toBe(true));
  });

  it('should hide the loader', () => {
    service.show();

    service.hide();

    service.isLoading$.subscribe((isLoading) => {
      expect(service.counter).toEqual(0);
      expect(isLoading).toBe(false);
    });
  });
});
