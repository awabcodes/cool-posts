import { TestBed } from '@angular/core/testing';
import { PostsStore } from './posts.store';
import { PostsService } from '../services/posts.service';
import { of } from 'rxjs';
import { ErrorService } from '../../../core/services/error.service';
import { provideHttpClient } from '@angular/common/http';

describe('PostsStore', () => {
  let postsService: PostsService;
  let errorService: ErrorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClient(), PostsStore, PostsService, ErrorService],
    }).compileComponents();

    postsService = TestBed.inject(PostsService);
    errorService = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    const store = TestBed.inject(PostsStore);

    expect(store.posts()).toEqual([]);
    expect(store.postsCount()).toEqual(0);
    expect(store.activePost()).toBeNull();
    expect(store.displayedProperty()).toEqual({ key: 'title', index: 2 });
  });

  it('should load posts', async () => {
    jest.spyOn(postsService, 'getPosts').mockReturnValue(
      of([
        { id: 1, userId: 1, title: 'title', body: 'body' },
        { id: 2, userId: 2, title: 'title', body: 'body' },
      ])
    );
    const store = TestBed.inject(PostsStore);

    await store.loadPosts();

    expect(postsService.getPosts).toHaveBeenCalled();

    expect(store.posts()).toEqual([
      { id: 1, userId: 1, title: 'title', body: 'body' },
      { id: 2, userId: 2, title: 'title', body: 'body' },
    ]);
    expect(store.postsCount()).toEqual(2);
  });

  it('should select post', async () => {
    const post = { id: 1, userId: 1, title: 'title', body: 'body' };
    const store = TestBed.inject(PostsStore);

    store.selectPost(post);

    expect(store.activePost()).toEqual(post);
    expect(store.displayedProperty()).toEqual({ key: 'id', index: 0 });

    store.selectPost(post);

    expect(store.activePost()).toEqual(post);
    expect(store.displayedProperty()).toEqual({ key: 'userId', index: 1 });
  });

  it('should display post', async () => {
    const post = { id: 1, userId: 1, title: 'title', body: 'body' };
    const store = TestBed.inject(PostsStore);

    expect(store.displayPost(post)).toEqual('title');

    store.selectPost(post);

    expect(store.displayPost(post)).toEqual(1);
  });

  it('should check if post is active', async () => {
    const post = { id: 1, userId: 1, title: 'title', body: 'body' };
    const store = TestBed.inject(PostsStore);

    expect(store.isPostActive(post)).toBeFalsy();
    store.selectPost(post);
    expect(store.isPostActive(post)).toBeTruthy();
  });

  it('should expose server error', async () => {
    const store = TestBed.inject(PostsStore);

    errorService.displayError('error', 'message');

    store.serverError$.subscribe((error) => {
      expect(error).toEqual({ error: 'error', message: 'message' });
    });
  });
});
