import * as React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { arrayToChunks } from "../../utils";
import ClampLines from "react-clamp-lines";

import "./BlogOverview.scss";

interface IBlogProps {
  author: string;
  time: number;
  title: string;
  content: string;
}

const BlogOverviewHeader: React.FC = () => {
  return (
    <div className="overview-header">
      Experience <div className="overview-header-blue">empowering stories</div>
    </div>
  );
};

const FeaturedArticle: React.FC<IBlogProps> = ({
  author,
  time,
  title,
  content
}) => {
  return (
    <div className="featured-article">
      <div className="latest-article">Latest article</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <img
          className="featured-image"
          src="https://via.placeholder.com/605x433.png?text=Placeholder+for+Image"
        />
        <div className="text-content">
          <Remark author={author} time={time} />
          <Title title={title} />
          <div className="featured-content">{content}</div>
          <Link to="/" className="read-more-button">
            READ POST
          </Link>
        </div>
      </div>
    </div>
  );
};

const Remark: React.FC<{ author: string; time: number }> = ({
  author,
  time
}) => {
  return (
    <div className="remark">
      {author} - {time} min read
    </div>
  );
};

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <div className="featured-title">{title}</div>;
};

const OtherArticles: React.FC<{ blogs: Array<IBlogProps> }> = ({ blogs }) => {
  return (
    <div className="other-articles">
      <div className="other-articles-header">Other articles</div>
      {arrayToChunks(blogs, 3).map((chunk, index) => (
        <OtherArticlesRow blogs={chunk} rowIndex={index} />
      ))}
    </div>
  );
};

const OtherArticlesRow: React.FC<{
  blogs: Array<IBlogProps>;
  rowIndex: number;
}> = ({ blogs, rowIndex }) => {
  return (
    <div className="other-articles-row">
      {blogs.map((blog, index) => (
        <OtherArticleTile {...blog} id={`article-${rowIndex}-${index}`} />
      ))}
    </div>
  );
};

const OtherArticleTile: React.FC<IBlogProps & { id: string }> = ({
  author,
  time,
  title,
  content,
  id
}) => {
  return (
    <div className="other-article-tile">
      <img
        className="other-article-tile-image"
        src="https://via.placeholder.com/398x260.png?text=Placeholder+for+Image"
      />
      <Remark author={author} time={time} />
      <div className="other-article-tile-title">{title}</div>
      <ClampLines text={content} lines={4} id={id} buttons={false} />
    </div>
  );
};

const BlogOverview: React.FC = () => {
  return (
    <>
      <NavBar fixed={false} />
      <div className="blog-overview">
        <BlogOverviewHeader />
        <div className="articles">
          <FeaturedArticle
            author="Carola S."
            time={7}
            title="How I survived Bali with 10 strangers"
            content="Luctus accumsan tortor posuere ac ut. Viverra maecenas accumsan lacus vel facilisis volutpat est. Nec ullamcorper sit amet risus nullam eget felis."
          />
          <OtherArticles blogs={otherArticles} />
        </div>
      </div>
      <Footer />
    </>
  );
};

const otherArticles: Array<IBlogProps> = [
  {
    author: "Matej P.",
    time: 7,
    content:
      "I'll start- So my name is Cody, I'm 20 years old and live in Brisbane, Australia. I've lived a amazing life so far. I've been overseas twice, skydived twice, and have wonderful family/friends that I love to the moon and back. I have all these things yet my life hasn't been all butterflies and rainbows. ...",
    title: "How does it feel to meet strangers?"
  },
  {
    author: "John D.",
    time: 7,
    content:
      "Today I took a pretty big step out of my comfort zone (while of course wearing my seek discomfort t shirt). A couple weeks ago I signed up to be a small group leader for an activity my school does called make the change and today was the training. Most of it wasn’t extremely difficult, but one activity called “if you really knew me” pushed me way out of my comfort zone. Basically you go around the circle and each time you say ...",
    title: "FiYestas changed my life; they can change yours too!"
  },
  {
    author: "Matinoz S.",
    time: 7,
    content:
      "I’ve ever done. ⁣If you would have told me that I would randomly by a flight cross country by myself, and not plan out every step of the trip along the way even a few weeks ago I would have thought you were nuts. In light of this, I decided to roll with the flow and take things as they came up, a really good life lesson that I know has alrea",
    title:
      "I recently took a trip to San Diego and it was the biggest discomfort"
  },
  {
    author: "Jamie L.",
    time: 7,
    content:
      'We could finally use this and incorporate in our films and photoshoot. I\'m loving the vibes of this flag and whenever we bring these all around the Philippines- people are always like "Is that some sort of a movement or a cult?"',
    title: "First ever SEEK DISCOMFORT Flag"
  },
  {
    author: "Matej P.",
    time: 7,
    content:
      "I'll start- So my name is Cody, I'm 20 years old and live in Brisbane, Australia. I've lived a amazing life so far. I've been overseas twice, skydived twice, and have wonderful family/friends that I love to the moon and back. I have all these things yet my life hasn't been all butterflies and rainbows. ...",
    title: "How does it feel to meet strangers?"
  },
  {
    author: "John D.",
    time: 7,
    content:
      "Today I took a pretty big step out of my comfort zone (while of course wearing my seek discomfort t shirt). A couple weeks ago I signed up to be a small group leader for an activity my school does called make the change and today was the training. Most of it wasn’t extremely difficult, but one activity called “if you really knew me” pushed me way out of my comfort zone. Basically you go around the circle and each time you say ...",
    title: "FiYestas changed my life; they can change yours too!"
  },
  {
    author: "Matinoz S.",
    time: 7,
    content:
      "I’ve ever done. ⁣If you would have told me that I would randomly by a flight cross country by myself, and not plan out every step of the trip along the way even a few weeks ago I would have thought you were nuts. In light of this, I decided to roll with the flow and take things as they came up, a really good life lesson that I know has alrea",
    title:
      "I recently took a trip to San Diego and it was the biggest discomfort"
  }
];

export default BlogOverview;
