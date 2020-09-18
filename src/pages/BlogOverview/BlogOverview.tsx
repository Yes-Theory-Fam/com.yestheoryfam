import * as React from "react";
import { Link } from "react-router-dom";
import ClampLines from "react-clamp-lines";

import { Quill } from "react-quill";
import { Delta, DeltaStatic } from "quill";

import styles from "./BlogOverview.module.scss";
import classNames from "classnames";
import BackendApi from "../../apis/backend";
import IBlogProps from "../../types/Blog";

const BlogOverviewHeader: React.FC = () => {
  return (
    <div className="page-header blog-overview-header">
      Experience <div className="inline-blue">empowering stories</div>
    </div>
  );
};

// This is potentially very, very dumb but it's 00:30 currently and I am starting to get frustrated with this.
// This function attempts to turn a Quill Delta to a string that can be used as preview in the overview
// This is achieved by using all insert deltas that insert a string, replacing whitespace with single spaces and joining them.
// I am afraid of this.
const blogContentToContent = (delta: DeltaStatic) => {
  const DeltaS = Quill.import("delta");

  const actualDelta: Delta = new DeltaS(delta);

  return actualDelta
    .filter((op) => op.insert && typeof op.insert === "string")
    .map((op) => op.insert.toString().replace(/\s/g, " "))
    .join(" ");
};

const FeaturedArticle: React.FC<{ blog: IBlogProps }> = ({ blog }) => {
  const { authorName, readTime, title, blogContent, titleImage, id } = blog;

  const content = blogContentToContent(blogContent);

  return (
    <div className={classNames(styles.featuredArticle, "column")}>
      <div className={styles.blogOverviewSectionHeader}>Latest article</div>
      <div className={classNames(styles.featuredArticleBlog, "column")}>
        <div className={classNames(styles.featuredImage, "centered-content")}>
          <img src={titleImage} className={styles.featuredImage} />
        </div>
        <div className={classNames(styles.featuredTextContent, "column")}>
          <Remark author={authorName} time={readTime} />
          <Title title={title} />
          <div className={styles.featuredSummary}>{content}</div>
          <Link
            to={{
              pathname: `/blogs/${id}`,
              state: blog,
            }}
            className="button"
          >
            READ POST
          </Link>
        </div>
      </div>
    </div>
  );
};

const Remark: React.FC<{ author: string; time: number }> = ({ author, time }) => {
  return (
    <div className={styles.blogOverviewRemark}>
      {author} - {time} min read
    </div>
  );
};

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <div className={styles.featuredTitle}>{title}</div>;
};

const OtherArticles: React.FC<{ blogs: Array<IBlogProps> }> = ({ blogs }) => {
  return (
    <div className="column">
      <div className={styles.blogOverviewSectionHeader}>Other articles</div>
      <div className={styles.otherArticleGrid}>
        {blogs.map((blog, index) => (
          <OtherArticleTile key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
};

const OtherArticleTile: React.FC<{ blog: IBlogProps }> = ({ blog }) => {
  const { authorName, readTime, title, blogContent, id, titleImage } = blog;
  const content = blogContentToContent(blogContent);

  return (
    <div className={classNames(styles.otherArticleTile, "column")}>
      <div className={styles.otherArticleTileTop}>
        <div className={styles.otherArticleTileImageContainer}>
          <img className={styles.otherArticleTileImage} src={titleImage} />
        </div>
        <Remark author={authorName} time={readTime} />
        <Link
          to={{
            pathname: `/blogs/${id}`,
            state: blog,
          }}
          className={styles.otherArticleTileTitle}
        >
          {title}
        </Link>
      </div>
      <ClampLines text={content} lines={4} id={id} buttons={false} />
    </div>
  );
};

const getBlogs = async () => {
  const response = await BackendApi().get("/blogs");
  if (response.status !== 200) throw "Couldn't fetch blogs; response: " + response;

  const fixedBlogs = response.data.map((blog: IBlogProps) => ({
    ...blog,
    blogContent: JSON.parse(blog.blogContent.toString()), // I know this is a blatant hack to get around TS and I am sorry!
  }));

  return fixedBlogs;
};

const BlogOverview: React.FC = () => {
  const [blogs, setBlogs] = React.useState<Array<IBlogProps>>();
  React.useEffect(() => {
    if (blogs) return;

    getBlogs().then(setBlogs);
  });

  if (!blogs) return <></>;

  if (blogs.length < 1) return <>No blogs yet, kinda sad</>;

  const [featured, ...other] = blogs;

  return (
    <div className="column-center">
      <BlogOverviewHeader />
      <div className={classNames(styles.blogOverviewArticles, "column")}>
        <FeaturedArticle blog={featured} />
        <OtherArticles blogs={other} />
      </div>
    </div>
  );
};

export default BlogOverview;
