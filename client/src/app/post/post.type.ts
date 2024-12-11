export interface PostState {
  posts: Post[];
  loading: boolean;
}

export interface Post {
  _id: string;
  description: string;
  postPic: string;
  createdAt: string;
  owner: User;
  likes: string[];
  comments: Comment;
  __v: number;
}

export interface Comment {
  _id: string;
  comment: string;
  username: string;
  userId: string;
  replies: string[];
  parentId: string;
  createdAt: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  createdPost: string[];
}

export interface CreatePost {
  file: File;
  description: string;
  userId: string;
}
