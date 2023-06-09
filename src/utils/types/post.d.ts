interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface PostParams {
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PostState {
  loading: {
    post: boolean;
    comment: boolean;
    add: boolean;
  };
  error: {
    postErr: {} | null;
    commentErr: {} | null;
    addErr: {} | null;
  };
  post: Post[];
  searchData: Post[];
  comment: Comment[];
  add: Post | null;
}
