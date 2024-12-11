export interface CreatePost {
  name: string;
  description: string;
  owner: string;
}

export interface GetPost {
  _id: string;
  description: string;
  postPic: string;
  createdAt: string;
  owner: string;
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

export interface Likes {
  likesLength: number;
  id: string;
}
