import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { PostList } from "../../store/post-store";

function Post({ post }: any) {
  const { deletePost } = useContext(PostList);
  return (
    <>
      <div className="card mx-5 my-4" style={{ width: "30rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            {post.title}
            <span className="badge text-bg-success float-end">
              {post.reactions}
            </span>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              onClick={() => deletePost(post.id)}
            >
              <AiFillDelete />
            </span>
          </h5>
          <p className="card-text">{post.body}</p>
          {post.tags.map((tag: any) => (
            <span key={tag} className="badge text-bg-primary mx-2 py-2">{tag}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Post;
