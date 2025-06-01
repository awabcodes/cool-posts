import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-card',
  imports: [],
  template: `
    <div
      data-testid="post"
      (click)="selectPost.emit(post())"
      class="p-4 rounded-lg cursor-pointer shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      [class.bg-slate-300]="isActive()"
      [class.bg-white]="!isActive()"
    >
      <h3 class="h-[160px] text-lg overflow-hidden text-ellipsis text-gray-900" data-testid="label">
        {{ label() }}
      </h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {
  post = input.required<Post>();
  label = input.required<string | number>();
  isActive = input.required<boolean>();

  selectPost = output<Post>();
}
