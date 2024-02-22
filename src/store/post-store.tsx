import { createContext, useEffect, useReducer, useState } from "react";

const DEFAULT_CONTEXT = {
  postList: [],
  fetching: false,
  addPost: (post: any) => {},
  deletePost: (postId: any) => {},
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
  const [fetching, setFetching] = useState(false);

  const addPost = (post: any) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
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

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setFetching(true);
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addPosts(data.posts);
        setFetching(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PostList.Provider value={{ postList, addPost, deletePost, fetching }}>
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
