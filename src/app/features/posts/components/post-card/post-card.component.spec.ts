import { TestBed } from '@angular/core/testing';
import { PostCardComponent } from './post-card.component';
import { Component, signal } from '@angular/core';
import { Post } from '../../models/post.model';
import { By } from '@angular/platform-browser';

@Component({
  imports: [PostCardComponent],
  template: `
    <app-post-card
      [post]="post"
      [label]="label"
      [isActive]="isActive"
      (selectPost)="selectPost($event)"
    ></app-post-card>
  `,
})
class PostCardWrapperComponent {
  post = signal<Post>({ id: 1, userId: 1, title: 'title', body: 'body' });
  label = signal<string | number>('label');
  isActive = signal<boolean>(false);

  selectPost = jest.fn();
}

describe('PostCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCardWrapperComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PostCardWrapperComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show the label', () => {
    const fixture = TestBed.createComponent(PostCardWrapperComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('[data-testid=label]')).nativeElement;

    expect(label.textContent).toContain('label');

    app.label = signal(2);
    fixture.detectChanges();

    expect(label.textContent).toContain('2');
  });

  it('should change background color depending on active state', () => {
    const fixture = TestBed.createComponent(PostCardWrapperComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const post = fixture.debugElement.query(By.css('[data-testid=post]')).nativeElement;

    app.isActive = signal(true);
    fixture.detectChanges();

    expect(post.classList.contains('bg-slate-300')).toBeTruthy();
  });

  it('should select post', () => {
    const fixture = TestBed.createComponent(PostCardWrapperComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const post = fixture.debugElement.query(By.css('[data-testid=post]')).nativeElement;

    expect(app.selectPost).not.toHaveBeenCalled();

    post.click();

    expect(app.selectPost).toHaveBeenCalledWith(app.post);
  });
});
