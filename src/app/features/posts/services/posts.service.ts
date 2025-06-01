import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  http = inject(HttpClient);

  getPosts() {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
  }
}
