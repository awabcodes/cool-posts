import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ErrorService } from '../services/error.service';
import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let errorService: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorService, provideHttpClient(withInterceptors([errorInterceptor])), provideHttpClientTesting()],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    errorService = TestBed.inject(ErrorService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('successful requests should not trigger the error service', () => {
    jest.spyOn(errorService, 'displayError');
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    req.flush({});

    expect(errorService.displayError).not.toHaveBeenCalled();
  });

  it('failed requests should trigger the error service', () => {
    jest.spyOn(errorService, 'displayError');
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 400, statusText: 'Bad Request' });

    expect(errorService.displayError).toHaveBeenCalledWith(
      'Bad Request',
      'Http failure response for /test: 400 Bad Request'
    );
  });
});
