import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import s from './Blog.css';
import { connect } from 'react-redux';
import { Element } from 'react-scroll';
import _ from 'lodash';
import Navbar from '../../components/Navbar';
import Fade from 'react-reveal/Fade';
import blogPostMetadata from './blogPostMetadata.json';
import blogExampleHtml from './posts/blog-post-example.html';

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

class Blog extends React.Component {
  render() {
    const headerArticle = _.first(_.values(blogPostMetadata));
    const previousArticles = _.values(blogPostMetadata).slice(1);
    return (
      <div>
        <Navbar />
        <div className={s.root}>
          <h1 className={s.blogHeader}>Blog</h1>
          <a
            href={`/blog/${headerArticle.id}`}
            className={s.currentArticleCard}
            style={{
              backgroundImage: `url("${blogPosts[`${headerArticle.id}.jpg`]}")`
            }}
          >
            <div className={s.currentArticleOpacity}>
              <h2 className={s.currentArticleTitle}>
                {headerArticle.title}
              </h2>
              <h3 className={s.currentArticleDate}>{headerArticle.date}</h3>
            </div>
          </a>
          <div className={s.currentArticleTeaserText}>
            <div
              className={s.currentArticleContent}
              dangerouslySetInnerHTML={{
                __html: blogPosts[`${headerArticle.id}.html`]
              }}
            />
            <a href={`/blog/${headerArticle.id}`} className={s.readMoreButton}>
              Read More
            </a>
          </div>
          <div className={s.previousArticlesOutsideContainer}>
            <div className={s.previousArticlesContainer}>
              <h2 className={s.previousArticlesHeader}>Previous Articles</h2>
              <div className={s.previousArticlesCardsContainer}>
                {_.map(previousArticles, prevArticle => (
                  <PrevArticleCard {...prevArticle} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const PrevArticleCard = props => (
  <a
    href={`/blog/${props.id}`}
    className={s.prevArticleCard}
    style={{
      backgroundImage: `url("${blogPosts[`${props.id}.jpg`]}")`
    }}
  >
    <div className={s.prevArticleOpacity}>
      <h2 className={s.prevArticleTitle}>{props.title}</h2>
      <h3 className={s.prevArticleDate}>{props.date}</h3>
    </div>
  </a>
);

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(Blog));
