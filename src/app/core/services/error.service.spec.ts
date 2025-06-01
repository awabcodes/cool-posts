import { TestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ErrorService] });
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should publish an error', () => {
    jest.spyOn(service.serverError, 'next');

    service.displayError('error', 'message');

    expect(service.serverError.next).toHaveBeenCalledWith({ error: 'error', message: 'message' });
  });
});
