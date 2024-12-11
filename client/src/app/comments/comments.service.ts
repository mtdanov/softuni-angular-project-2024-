import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from './comments.type';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getPostComments(postId: string) {
    return this.http.get<Comment[]>(
      `http://localhost:3010/comments/getComments/${postId}`
    );
  }
  createComment(
    comment: any,
    userId: string | undefined,
    username: string | undefined,
    postId: string,
    parentId: string | null
  ) {
    return this.http.post<Comment>('http://localhost:3010/comments/create', {
      comment,
      userId,
      username,
      postId,
      parentId,
    });
  }

  getReplies(parentId: string) {
    return this.http.get<Comment[]>(
      `http://localhost:3010/comments/${parentId}/replies`
    );
  }

  getComment(commentId: string) {
    return this.http.get<Comment[]>(
      `http://localhost:3010/comments/${commentId}/getComment`
    );
  }

  editComment(commentId: string, text: string) {
    return this.http.patch<Comment>(
      `http://localhost:3010/comments/${commentId}/edit`,
      {
        text,
      }
    );
  }

  deleteComment(commentId: string, postId: string) {
    return this.http.delete(
      `http://localhost:3010/comments/${postId}/${commentId}/delete`
    );
  }

  deleteReplie(parentId: string, commentId: string, postId: string) {
    return this.http.delete(
      `http://localhost:3010/comments/${postId}/${parentId}/${commentId}/delete`
    );
  }
}
