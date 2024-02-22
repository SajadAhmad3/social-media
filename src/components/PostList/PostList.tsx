import { useContext, useEffect, useState } from "react";
import Post from "../Post/Post";
import { PostList as PostListData } from "../../store/post-store";
import Loading from "../LoadingSpinner/Loading";

function PostList() {
  const { postList, fetching } = useContext(PostListData);

  return (
    <>
      <div
        className="d-flex flex-wrap align-items-center justify-content-center border border-grey m-2 rounded overflow-y-auto"
        style={{ height: "700px" }}
      >
        {fetching && <Loading />}
        {!fetching && postList.length === 0 && (
          <div>
            <h1>Welcome!</h1>
          </div>
        )}

        {!fetching &&
          postList.map((post: any) => <Post key={post.id} post={post} />)}
      </div>
    </>
  );
}

export default PostList;
