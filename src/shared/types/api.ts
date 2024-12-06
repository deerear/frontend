export interface Post {
  postId: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Comment {
  commentId: string;
  content: string;
  createdAt: string;
}

export interface DM {
  dmId: string;
  message: string;
  createdAt: string;
}

export interface Profile {
  nickname: string;
  email: string;
  profileImg: string;
}

export interface PaginatedResponse<T> {
  objects: T[];
  key?: string;
  hasNext: boolean;
  size: number;
}
