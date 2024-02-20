import { useContext, useRef } from "react";
import { PostList } from "../../store/post-store";

function CreatePost() {
  const { addPost } = useContext(PostList);
  const usernameElement: any = useRef();
  const titleElement: any = useRef();
  const bodyElement: any = useRef();
  const reactionsElement: any = useRef();
  const tagsElement: any = useRef();

  function handleSubmit(event: any) {
    event.preventDefault();
    const username = usernameElement.current.value;
    const postTitle = titleElement.current.value;
    const postBody = bodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    usernameElement.current.value = "";
    titleElement.current.value = "";
    bodyElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";

    addPost(username, postTitle, postBody, reactions, tags);
  }

  return (
    <>
      <form className="w-75 mx-auto my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            ref={usernameElement}
            className="form-control"
            id="username"
            placeholder="Your username"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post Title
          </label>
          <input
            ref={titleElement}
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter your title here ..."
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Post Content
          </label>
          <textarea
            ref={bodyElement}
            rows={5}
            className="form-control"
            id="body"
            placeholder="Enter content here ..."
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="likes" className="form-label">
            Post Likes
          </label>
          <input
            ref={reactionsElement}
            type="number"
            className="form-control"
            id="likes"
            placeholder="Number of likes ..."
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Post Tags
          </label>
          <input
            ref={tagsElement}
            type="text"
            className="form-control"
            id="tags"
            placeholder="#hashtags"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </>
  );
}

export default CreatePost;
