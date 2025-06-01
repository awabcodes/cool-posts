import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostsStore } from './store/posts.store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [PostCardComponent, AsyncPipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  providers: [PostsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  readonly store = inject(PostsStore);
}
