import { createContext, useReducer } from "react";

const DEFAULT_CONTEXT = {
  postList: [],
  addPost: (
    username: string,
    postBody: string,
    postTitle: string,
    reactions: number,
    tags: any
  ) => {},
  deletePost: (postId: any) => {},
  addPosts: (posts: any) => {},
};

export const PostList = createContext(DEFAULT_CONTEXT);

const PostListReducer = (currPostList: any, action: any) => {
  switch (action.type) {
    case "DELETE_POST":
      return currPostList.filter(
        (post: any) => post.id !== action.payload.postId
      );
    case "ADD_POST":
      return [action.payload, ...currPostList];
    case "ADD_POSTS":
      return action.payload.posts;
    default:
      return currPostList;
  }
};

const PostListProvider = ({ children }: any) => {
  const [postList, dispatchPostList] = useReducer(PostListReducer, []);
  const addPost = (
    username: string,
    postTitle: string,
    postBody: string,
    reactions: number,
    tags: any
  ) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now,
        userId: username,
        title: postTitle,
        body: postBody,
        reactions,
        tags,
      },
    });
  };
  const deletePost = (postId: any) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  const addPosts = (posts: any) => {
    dispatchPostList({
      type: "ADD_POSTS",
      payload: {
        posts,
      },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost, addPosts }}>
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
