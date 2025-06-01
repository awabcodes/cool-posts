import { TestBed } from '@angular/core/testing';
import { LoaderService } from '../services/loader.service';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { loaderInterceptor } from './loader.interceptor';

describe('loaderInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService, provideHttpClient(withInterceptors([loaderInterceptor])), provideHttpClientTesting()],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    loaderService = TestBed.inject(LoaderService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should trigger the loader to show', () => {
    jest.spyOn(loaderService, 'show');
    httpClient.get('/test').subscribe();

    httpMock.expectOne('/test');

    expect(loaderService.show).toHaveBeenCalled();
  });

  it('should trigger the loader to hide', () => {
    jest.spyOn(loaderService, 'hide');
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    req.flush({});

    expect(loaderService.hide).toHaveBeenCalled();
  });
});
