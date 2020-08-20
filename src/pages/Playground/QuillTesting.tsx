/* Interesting stuff / thoughts:
  Upload image instead of adding it to the page as base-64:
    - https://github.com/quilljs/quill/issues/1089
    - Might want to fiddle around with compression, adding the base-64 one for the preview and then converting it when posting the blog, etc

  Upload videos from drive:
    - Might be possible with own videoHandler
    - Drag and drop?
    - Last resort is building a custom uploader following the code of the image upload (and I am frightened)
  
  Upload audio:
    - Might be possible to salvage this somehow: https://stackoverflow.com/q/58506688/6707985
    - Probably same thing as with video. Gotta build something for that
  
  Popup for optional caption?
    
  Generally: https://quilljs.com/guides/cloning-medium-with-parchment/ might be useful
*/

import * as React from "react";
import * as ReactQuill from "react-quill";
import { Value } from "react-quill";
import UploadDropzone from "../../components/UploadDropzone/UploadDropzone";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./QuillTesting.scss";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import TitleInput from "../../components/BlogTitleInput/BlogTitleInput";
import SuggestionCard from "./SuggestionCard";

import suggestions from "./copy";
import { toast } from "react-toastify";
import BackendApi from "../../apis/backend";
import { useHistory } from "react-router-dom";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote"],
  ["image", "video"],
];

const modules = {
  toolbar: toolbarOptions,
};

// Moving to its own component for the sole reason to prevent every keyinput causing an entire rerender of the page
// Because of setState in the page component
const QuillWrapper = React.forwardRef((_, ref: React.RefObject<ReactQuill>) => {
  const [value, setValue] = React.useState("");

  return (
    <div className="quill-container column-center">
      <ReactQuill
        theme="snow"
        ref={ref}
        value={value}
        onChange={setValue}
        modules={modules}
      />
    </div>
  );
});

const htmlToText = (html: string) => {
  const sneakyDiv = document.createElement("div");
  sneakyDiv.innerHTML = html;
  return sneakyDiv.innerText.trim();
};

const PostButton: React.FC<{
  title: string;
  titleImage: string;
  readTime: number;
  blogContent: React.RefObject<ReactQuill>;
}> = ({ blogContent, readTime, title, titleImage }) => {
  const savedTitle = htmlToText(title);
  const history = useHistory();
  const onClick = async () => {
    const ref = blogContent.current;
    if (!ref) {
      toast("'tis broken!");
      return;
    }

    const content = ref.getEditor().getContents();
    const response = await BackendApi().post("/blogs", {
      title: savedTitle,
      titleImage,
      readTime,
      blogContent: JSON.stringify(content),
    });

    const preview = response.data.previewId;
    const previewUrl = `/blogs/preview/${preview}`;

    toast(`Your post was submitted! Click here to see the preview again.`, {
      type: "success",
      autoClose: false,
      onClick: () => history.push(previewUrl),
    });
  };

  return (
    <button
      className="inverted write-your-blog-post-button float-shadow"
      onClick={onClick}
    >
      POST
    </button>
  );
};

const PreviewWrapper: React.FC<{ editor: React.RefObject<ReactQuill> }> = ({
  editor,
}) => {
  const [preview, setPreview] = React.useState<Value>("");

  // This will update the preview every second or so
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const ref = editor.current;
      if (!ref) return;
      const fullDelta = ref.getEditor().getContents();
      setPreview(fullDelta);
    }, 1000);

    return () => clearInterval(intervalId);
  });

  return (
    <ReactQuill
      value={preview}
      readOnly
      theme="bubble"
      className="blog-preview-quill"
    />
  );
};

const QuillTesting: React.FC = () => {
  const editorRef = React.useRef(null);
  const [uploadOpen, setUploadOpen] = React.useState(false);

  const [title, setTitle] = React.useState("");

  return (
    <>
      <NavBar fixed classNames={uploadOpen ? "blur" : ""} />

      <div className="mobile-note">
        This has been disabled for your own good. Don't write an entire blogpost
        on a phone like that!
      </div>

      {uploadOpen && <UploadDropzone onClose={() => setUploadOpen(false)} />}
      <div
        className={`column-center ${uploadOpen ? "blur" : ""} write-your-blog`}
      >
        <div className="page-header write-your-blog-header">
          Write your blog <div className="inline-blue">post</div>
        </div>
        <TitleInput value={title} onChange={setTitle} editable />
        <button onClick={() => setUploadOpen(true)}>
          ADD TITLE IMAGE (pref 1400 x 500)
        </button>
        <QuillWrapper ref={editorRef} />
        <div className="suggestions column-center">
          {suggestions.map((s, index) => (
            <SuggestionCard
              completed={Math.random() > 0.5}
              content={s}
              key={index}
            />
          ))}
          <PostButton
            title={title}
            titleImage={"https://picsum.photos/1380/487"}
            readTime={7}
            blogContent={editorRef}
          />
        </div>
        <div className="ruler" />
        <div className="blog-preview column-center">
          <div className="blog-preview-title">Preview</div>
          <div className="blog-preview-titleimage">
            <img
              src="https://picsum.photos/1380/487"
              className="blog-preview-image"
            />
          </div>
          <TitleInput value={title} />
          <div className="column blog-preview-text">
            <div className="row blog-preview-remark">
              Matej P. - 7 min. read
            </div>
            <PreviewWrapper editor={editorRef} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default QuillTesting;
