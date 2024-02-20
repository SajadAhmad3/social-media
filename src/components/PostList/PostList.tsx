import { useContext } from "react";
import Post from "../Post/Post";
import { PostList as PostListData } from "../../store/post-store";

function PostList() {
  const { postList } = useContext(PostListData);
  return (
    <>
      <div className="d-flex flex-wrap">
        {postList.map((post: any) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

export default PostList;
