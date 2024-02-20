import { createContext, useReducer } from "react";

const DEFAULT_CONTEXT = {
  postList: [],
  addPost: (
    username: string,
    postBody: string,
    postTitle: string,
    likes: number,
    tags: any
  ) => {},
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
    default:
      return currPostList;
  }
};

const PostListProvider = ({ children }: any) => {
  const [postList, dispatchPostList] = useReducer(
    PostListReducer,
    DEFAULT_POST_LIST
  );
  const addPost = (
    username: string,
    postTitle: string,
    postBody: string,
    likes: number,
    tags: any
  ) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now,
        userId: username,
        title: postTitle,
        body: postBody,
        likes,
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

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "About You",
    body: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam rerum aperiam, tenetur esse impedit ea sapiente voluptatem veritatis, dolorem quaerat numquam cupiditate sint hic doloremque quos veniam deleniti dicta nam!",
    likes: 45,
    userId: "user-1",
    tags: ["coding", "react.js"],
  },
  {
    id: "2",
    title: "About Me",
    body: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam rerum aperiam, tenetur esse impedit ea sapiente voluptatem veritatis, dolorem quaerat numquam cupiditate sint hic doloremque quos veniam deleniti dicta nam!",
    likes: 32,
    userId: "user-1",
    tags: ["Summer", "Goa"],
  },
];

export default PostListProvider;
