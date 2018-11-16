import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import s from './BlogPostExample.css';
import { connect } from 'react-redux';
import { Element } from 'react-scroll';
import _ from 'lodash';
import Navbar from '../../components/Navbar';
import Fade from 'react-reveal/Fade';
import blogPostMetadata from '../blog/blogPostMetadata.json';
import blogExampleHtml from '../blog/posts/blog-post-example.html';

function importAll(r) {
  const blogs = {};
  r.keys().map((item, index) => {
    blogs[item.replace('./', '')] = r(item);
  });
  return blogs;
}

const blogPosts = importAll(
  require.context('../blog/posts', false, /\.(png|jpe?g|svg|html)$/)
);

class BlogPostExample extends React.Component {
  render() {
    if (!this.props.blogId) return null;
    const id = this.props.blogId;
    const relatedArticles = blogPostMetadata[id].relatedArticleIds.map(
      relId => blogPostMetadata[relId]
    );

    return (
      <div>
        <div
          className={s.bannerImage}
          style={{ backgroundImage: `url("${blogPosts[id + '.jpg']}")` }}
        >
          <div className={s.bannerOpacity}>
            <Navbar background="transparent" />
            <div className={s.titleWrapper}>
              <h2 className={s.articleTitle}>{blogPostMetadata[id].title}</h2>
              <h3 className={s.articleDate}>{blogPostMetadata[id].date}</h3>
            </div>
          </div>
        </div>
        <div className={s.contentContainer}>
          <div
            className={s.contentTextContainer}
            dangerouslySetInnerHTML={{ __html: blogPosts[`${id}.html`] }}
          />
          <div className={s.relatedContainer}>
            {relatedArticles.length > 0 ? (
              <h2 className={s.textHeader}>Related Articles</h2>
            ) : null}
            {_.map(relatedArticles, article => (
              <RelatedArticleCard {...article} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const RelatedArticleCard = props => (
  <a
    href={`${props.id}`}
    className={s.relatedArticleCard}
    style={{ backgroundImage: `url("${blogPosts[props.id + '.jpg']}")` }}
  >
    <div className={s.relatedArticleOpacity}>
      <h2 className={s.relatedArticleTitle}>{props.title}</h2>
      <h3 className={s.relatedArticleDate}>{props.date}</h3>
    </div>
  </a>
);

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(BlogPostExample));
