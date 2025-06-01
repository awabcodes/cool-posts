import { TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { PostsService } from './services/posts.service';
import { provideHttpClient } from '@angular/common/http';
import { PostsStore } from './store/posts.store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ErrorService } from '../../core/services/error.service';

describe('PostsComponent', () => {
  let postsService: PostsService;
  let errorService: ErrorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsComponent],
      providers: [provideHttpClient(), PostsService, PostsStore, ErrorService],
    }).compileComponents();

    postsService = TestBed.inject(PostsService);
    errorService = TestBed.inject(ErrorService);

    jest.spyOn(postsService, 'getPosts').mockReturnValue(
      of([
        { id: 1, userId: 1, title: 'title', body: 'body' },
        { id: 2, userId: 2, title: 'title', body: 'body' },
      ])
    );
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PostsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load posts on init', async () => {
    const fixture = TestBed.createComponent(PostsComponent);
    const app = fixture.componentInstance;

    expect(app.store.posts()).toEqual([]);

    await fixture.whenStable();

    expect(app.store.posts()).toEqual([
      { id: 1, userId: 1, title: 'title', body: 'body' },
      { id: 2, userId: 2, title: 'title', body: 'body' },
    ]);
  });

  it('should display posts', async () => {
    const fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const posts = fixture.debugElement.queryAll(By.css('[data-testid="post-card"]'));
    expect(posts.length).toEqual(2);
  });

  it('should display no posts found', async () => {
    jest.spyOn(postsService, 'getPosts').mockReturnValue(of([]));

    const fixture = TestBed.createComponent(PostsComponent);
    const app = fixture.componentInstance;

    app.store.loadPosts();
    fixture.detectChanges();

    const noPostsFound = fixture.debugElement.query(By.css('[data-testid="no-posts-found"]'));
    expect(noPostsFound).toBeTruthy();
  });

  it('should display posts count', async () => {
    const fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const postsCount = fixture.debugElement.query(By.css('[data-testid="posts-count"]'));
    expect(postsCount).toBeTruthy();
    expect(postsCount.nativeElement.textContent).toEqual('Posts Count - 2');
  });

  it('should display active post', async () => {
    const fixture = TestBed.createComponent(PostsComponent);
    const app = fixture.componentInstance;

    app.store.selectPost({ id: 1, userId: 1, title: 'title', body: 'body' });
    fixture.detectChanges();

    const activePostId = fixture.debugElement.query(By.css('[data-testid="active-post-id"]'));
    expect(activePostId).toBeTruthy();
    expect(activePostId.nativeElement.textContent).toEqual('Active Post Id - 1');
  });

  it('should display server error', async () => {
    const fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();

    errorService.displayError('error', 'message');
    fixture.detectChanges();

    const serverError = fixture.debugElement.query(By.css('[data-testid="server-error"]'));
    expect(serverError).toBeTruthy();
    expect(serverError.nativeElement.textContent).toEqual('error - message');
  });
});
