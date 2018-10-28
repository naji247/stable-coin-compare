import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import s from './BlogPostExample.css';
import { connect } from 'react-redux';
import { Element } from 'react-scroll';
import _ from 'lodash';
import Navbar from '../../components/Navbar';
import Fade from 'react-reveal/Fade';

class BlogPostExample extends React.Component {
  render() {
    return (
      <div>
        <div className={s.bannerImage}>
          <div className={s.bannerOpacity}>
            <Navbar transparent="True" />
            <div className={s.titleWrapper}>
              <h2 className={s.articleTitle}>
                Tether price crashes as selling tests stablecoin's dollar peg
              </h2>
              <h3 className={s.articleDate}>Oct 25, 2018</h3>
            </div>
          </div>
        </div>
        <div className={s.contentContainer}>
          <div className={s.contentTextContainer}>
            <h2 className={s.textHeader}>Overview</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2 className={s.textHeader}>More Information</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className={s.relatedContainer}>
            <h2 className={s.textHeader}>Related Articles</h2>
            <RelatedArticleCard
              title="Coinbase releases a new stablecoin USD Circle"
              date="Oct 20, 2018"
            />
            <RelatedArticleCard
              title="Coinbase releases a new stablecoin USD Circle"
              date="Oct 20, 2018"
            />
            <RelatedArticleCard
              title="Coinbase releases a new stablecoin USD Circle"
              date="Oct 20, 2018"
            />
          </div>
        </div>
      </div>
    );
  }
}
const RelatedArticleCard = props => (
  <a href="/about" className={s.relatedArticleCard}>
    <div className={s.relatedArticleOpacity}>
      <h2 className={s.relatedArticleTitle}>{props.title}</h2>
      <h3 className={s.relatedArticleDate}>{props.date}</h3>
    </div>
  </a>
);

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(BlogPostExample));
