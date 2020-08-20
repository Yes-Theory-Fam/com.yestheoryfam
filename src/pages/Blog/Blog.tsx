import * as React from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";

import IBlogProps from "../../types/Blog";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import TitleInput from "../../components/BlogTitleInput/BlogTitleInput";
import BackendApi from "../../apis/backend";

import "./Blog.scss";
import { IoMdClose } from "react-icons/io";

const getBlog = async (preview: boolean | undefined, id: string) => {
  const url = `/blogs/${preview ? "preview/" : ""}${id}`;
  console.log(url);

  const response = await BackendApi().get(url);
  if (response.status !== 200) throw `Couldn't get blog with id ${id}`;
  const blog: IBlogProps = response.data;
  blog.blogContent = JSON.parse(response.data.blogContent);

  return blog;
};

const acceptBlog = async (previewId: string) => {
  const url = `/blogs/preview/${previewId}/accept`;
  const response = await BackendApi().post(url);

  if (response.status !== 204) {
    toast("Error publishing the post! 'tis probably broken?", {
      type: "error",
    });
    return;
  }

  toast("Post published!", { type: "success" });
};

const rejectBlog = async (previewId: string, reason: string) => {
  const url = `/blogs/preview/${previewId}/reject`;
  const response = await BackendApi().post(url, { message: reason });

  if (response.status !== 204) {
    toast("Error publishing the post! 'tis probably broken?", {
      type: "error",
    });
    return;
  }

  toast("Post rejected!", { type: "success" });
};

// TODO; this is the bit that shows three more blogs in the bottom!
const BlogSuggestions: React.FC = () => {
  return <></>;
};

const VotingButtons: React.FC<{
  blog: IBlogProps;
  onDeny: () => void;
  previewId: string;
}> = ({ blog, onDeny, previewId }) => {
  const { id } = blog;
  const [isVisible, setIsVisible] = React.useState(false);
  const checkForMod = async () => {
    const response = await BackendApi().get("/is-mod");
    if (response.status === 200) return true;
    return false;
  };

  React.useEffect(() => {
    checkForMod().then(setIsVisible);
  }, [setIsVisible]);

  if (!isVisible) return <></>;

  const history = useHistory();

  return (
    <div className="row blog-preview-vote">
      <button
        onClick={() => {
          acceptBlog(previewId);
          setTimeout(() => history.push(`/blogs/${id}`, blog), 5000);
        }}
      >
        ACCEPT
      </button>
      <button onClick={onDeny}>REJECT</button>
    </div>
  );
};

const ReasoningModal: React.FC<{
  onClose: () => void;
  previewId: string;
}> = ({ onClose: closeFunction, previewId }) => {
  const textRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div className="reasoning-modal centered-content">
      <div className="reasoning-modal-body column-center">
        <div className="reasoning-modal-top row">
          Reason for rejection
          <div
            className="centered-content reasoning-modal-close-button"
            onClick={closeFunction}
          >
            <IoMdClose size={22} />
          </div>
        </div>
        <textarea ref={textRef} />
        <div className="row reasoning-modal-buttons">
          <button onClick={closeFunction}>CANCEL</button>
          <button
            onClick={() => {
              rejectBlog(previewId, textRef.current?.value ?? "");
              closeFunction();
            }}
          >
            REJECT
          </button>
        </div>
      </div>
    </div>
  );
};

const Blog: React.FC<
  RouteComponentProps<{ id: string }, {}, IBlogProps | null> & {
    preview?: boolean | undefined;
  }
> = ({ preview, match, location }) => {
  const [blogData, setBlogData] = React.useState<IBlogProps>();
  // In case data was already passed through location state, we can reuse those and don't need to reload everything again.
  if (!blogData && location.state) setBlogData(location.state);

  const [explanationVisible, setExplanationVisible] = React.useState(false);
  const { id } = match.params;

  React.useEffect(() => {
    if (blogData) return;
    getBlog(preview, id).then(setBlogData);
  });

  if (!blogData) {
    return <></>; // TODO Loading indicator
  }

  const {
    titleImage,
    title,
    authorName,
    readTime,
    blogContent,
    isPublic,
    id: blogId,
  } = blogData;
  const userIsMod = true;

  if (isPublic && preview) {
    const history = useHistory();
    // Push through the already loaded blogData so it doesn't have to be reloaded
    history.push(`/blogs/${blogId}`, blogData);
    return <></>;
  }

  return (
    <>
      <NavBar fixed />
      {explanationVisible && (
        <ReasoningModal
          onClose={() => setExplanationVisible(false)}
          previewId={id}
        />
      )}
      <div className="column-center">
        <div className="blog column-center">
          <div className="blog-preview-titleimage">
            <img src={titleImage} className="blog-preview-image" />
          </div>
          <TitleInput value={title} />
          <div className="column blog-preview-text">
            <div className="row blog-preview-remark">
              {authorName} - {readTime} min. read
            </div>
            <ReactQuill value={blogContent} readOnly theme="bubble" />
          </div>
        </div>
        {!preview && <BlogSuggestions />}
        {preview && userIsMod && (
          <VotingButtons
            previewId={id}
            blog={blogData}
            onDeny={() => setExplanationVisible(true)}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Blog;
