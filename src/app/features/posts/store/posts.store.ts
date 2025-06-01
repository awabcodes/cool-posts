import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { Post } from '../models/post.model';
import { computed, inject } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { lastValueFrom } from 'rxjs';
import { ErrorService } from '../../../core/services/error.service';

type PostsState = {
  posts: Post[];
  activePost: Post | null;
  displayedProperty: { key: keyof Post; index: number };
};

const initialState: PostsState = {
  posts: [],
  activePost: null,
  displayedProperty: { key: 'title', index: 2 },
};

export const PostsStore = signalStore(
  withState<PostsState>(initialState),
  withProps((store, errorService = inject(ErrorService)) => ({
    serverError$: errorService.serverError$,
  })),
  withComputed(({ posts }) => ({
    postsCount: computed(() => posts().length),
  })),
  withMethods((store, postsService = inject(PostsService)) => ({
    async loadPosts(): Promise<void> {
      const posts = await lastValueFrom(postsService.getPosts());
      patchState(store, { posts: posts });
    },
    selectPost(post: Post) {
      const properties = Object.keys(post) as (keyof Post)[];

      if (post.id === store.activePost()?.id) {
        const nextIndex = (store.displayedProperty.index() + 1) % properties.length;
        patchState(store, {
          displayedProperty: {
            index: nextIndex,
            key: properties[nextIndex],
          },
        });
      } else {
        patchState(store, {
          activePost: post,
          displayedProperty: {
            index: 0,
            key: properties[0],
          },
        });
      }
    },
    displayPost(post: Post) {
      if (post.id === store.activePost()?.id) {
        return post[store.displayedProperty.key()];
      }

      return post.title;
    },
    isPostActive(post: Post) {
      return post.id === store.activePost()?.id;
    },
  })),
  withHooks({
    onInit(store) {
      store.loadPosts();
    },
  })
);
