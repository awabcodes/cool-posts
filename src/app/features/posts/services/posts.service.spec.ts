import { TestBed } from '@angular/core/testing';
import { PostsService } from './posts.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('PostsService', () => {
  let httpMock: HttpTestingController;
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [PostsService, provideHttpClient(), provideHttpClientTesting()] });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PostsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts', () => {
    service
      .getPosts()
      .subscribe((posts) => expect(posts).toEqual([{ id: 1, userId: 1, title: 'title', body: 'body' }]));

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, userId: 1, title: 'title', body: 'body' }]);
  });
});
