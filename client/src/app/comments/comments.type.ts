export interface Comment {
  _id: string;
  comment: string;
  username: string;
  userId: string;
  replies: string[];
  showReplies: Replie[];
  parentId: string;
  createdAt: string;
}

export interface CommentState {
  comments: Comment[];
  loading: boolean;
}

export interface Replie {
  _id: string;
  comment: string;
  username: string;
  userId: string;
  parentId: string;
  createdAt: string;
}

export interface ActiveCommentInterface {
  id: string;
  type: ActiveCommentTypeEnum;
}

export enum ActiveCommentTypeEnum {
  replying = 'replying',
  editing = 'editing',
}
