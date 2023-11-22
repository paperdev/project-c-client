interface iPost {
  userId: number;
  id: number;
  title: string;
  time: string;
  tags: string[];
  urls: string[];
  likeCount: number;
  comments: iComment[];
};

interface iComment {
  postId: number;
  userId: number;
  id: number;
  avatarSrc: string;
  time: string;
  text: string;
}

interface iPostUpdateBody {
  likeCount: number | undefined;
  comment: iComment | undefined;
}

export {
  type iPost,
  type iComment,
  type iPostUpdateBody,
}