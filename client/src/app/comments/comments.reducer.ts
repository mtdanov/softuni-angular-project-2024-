import { createReducer, on } from '@ngrx/store';
import * as CommentActions from './comments.actions';
import { Comment, Replie } from './comments.type';

export interface CommentState {
  comments: Comment[];
  loading: boolean;
}

export const initialState: CommentState = {
  comments: [],
  loading: false,
};
export const commentReducer = createReducer(
  initialState,
  on(CommentActions.loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    loading: true,
    comments,
  })),
  on(CommentActions.addedComment, (state, { comment }) => ({
    ...state,
    comments: createComment(state.comments, comment),
  })),

  on(CommentActions.editedComment, (state, { comment }) => ({
    ...state,
    comments: updateComment(state.comments, comment),
  })),
  on(CommentActions.deleteComment, (state, { postId, commentId }) => ({
    ...state,
    comments: deleteComment(state.comments, commentId),
  })),
  on(CommentActions.addedReplie, (state, { comment }) => ({
    ...state,
    comments: addReply(state.comments, comment),
  })),
  on(CommentActions.gotReplies, (state, { parentId, replies }) => ({
    ...state,
    comments: gotReplies(state.comments, parentId, replies),
  })),

  on(CommentActions.editReplySuccess, (state, { parentId, replyId, text }) => ({
    ...state,
    comments: updateReply(state.comments, parentId, replyId, text),
  })),
  on(CommentActions.deleteReply, (state, { parentId, replyId }) => ({
    ...state,
    comments: deleteReply(state.comments, parentId, replyId),
  }))
);

const createComment = (comments: Comment[], comment: Comment) => [
  ...comments,
  comment,
];

const updateComment = (comments: Comment[], changes: Comment) =>
  comments.map((comment) => {
    return comment._id === changes._id
      ? Object.assign({}, comment, changes)
      : comment;
  });

const deleteComment = (comments: Comment[], commentId: string) =>
  comments.filter((comment) => commentId !== comment._id);

const deleteReply = (
  comments: Comment[],
  parentId: string,
  replyId: string
): Comment[] => {
  return comments.map((comment) =>
    comment._id === parentId
      ? {
          ...comment,
          replies: comment.replies.filter((id) => id !== replyId),
          showReplies: comment.showReplies.filter(
            (reply) => reply._id !== replyId
          ),
        }
      : comment
  );
};

const updateReply = (
  comments: Comment[],
  parentId: string,
  replyId: string,
  newText: string
): Comment[] => {
  return comments.map((comment) =>
    comment._id === parentId
      ? {
          ...comment,
          showReplies: comment.showReplies.map((reply) =>
            reply._id === replyId ? { ...reply, comment: newText } : reply
          ),
        }
      : comment
  );
};

const gotReplies = (
  comments: Comment[],
  parentId: string,
  replies: Replie[]
): Comment[] => {
  return comments.map((comment) =>
    comment._id === parentId
      ? {
          ...comment,
          showReplies: [...replies],
        }
      : comment
  );
};

const addReply = (comments: Comment[], reply: Replie): Comment[] => {
  return comments.map((comment) =>
    comment._id === reply.parentId
      ? {
          ...comment,
          replies: [...comment.replies, reply._id],
          showReplies: [...comment.showReplies, reply],
        }
      : comment
  );
};

// const updateReply = (
//   comments: Comment[],
//   parentId: string,
//   replyId: string,
//   newText: string
// ) => {
//   return comments.map((comment) => {
//     if (comment._id === parentId) {
//       return {
//         ...comment,
//         showReplies: comment.showReplies.map((reply) =>
//           reply._id === replyId ? { ...reply, comment: newText } : reply
//         ),
//       };
//     }
//     return comment;
//   });
// };

// const addReply = (comments: Comment[], comment: Comment) => {
//   return comments.map((c) =>
//     c._id === comment.parentId
//       ? { ...c, showReplies: [...c.showReplies, comment] }
//       : c
//   );
// };

// const addReplies = (
//   comments: Comment[],
//   parentId: string,
//   replies: Replie[]
// ) => {
//   return comments.map((comment) =>
//     comment._id === parentId ? { ...comment, showReplies: replies } : comment
//   );
// };
// const deleteReply = (
//   comments: Comment[],
//   parentId: string,
//   replyId: string
// ) => {
//   return comments.map((comment) => {
//     if (comment._id === parentId) {
//       return {
//         ...comment,
//         showReplies: comment.showReplies.filter(
//           (reply) => reply._id !== replyId
//         ),
//       };
//     }
//     return comment;
//   });
// };

// on(CommentActions.gotReplies, (state, { parentId, replies }) => ({
//   ...state,
//   replies: {
//     ...state.replies,
//     [parentId]: replies,
//   },
// })),
