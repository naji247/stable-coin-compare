import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import s from './Blog.css';
import { connect } from 'react-redux';
import { Element } from 'react-scroll';
import _ from 'lodash';
import Navbar from '../../components/Navbar';
import Fade from 'react-reveal/Fade';

class Blog extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1 className={s.blogHeader}>Blog</h1>
        <div className={s.currentArticleHeader}>
          <h2 className={s.currentArticleTitle}>
            Tether price crashes as selling tests stablecoin's dollar peg
          </h2>
          <h3 className={s.currentArticleDate}>Oct 25, 2018</h3>
        </div>
        <div className={s.currentArticleTeaserText}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat...
          </p>
          <button className={s.readMoreButton} type="button">
            Read More
          </button>
        </div>
        <div className={s.previousArticlesOutsideContainer}>
          <div className={s.previousArticlesContainer}>
            <h2 className={s.previousArticlesHeader}>Previous Articles</h2>
            <div className={s.previousArticlesCardsContainer}>
              <PrevArticleCard
                title="Coinbase releases a new stablecoin USD Circle"
                date="Oct 20, 2018"
              />
              <PrevArticleCard
                title="Coinbase releases a new stablecoin USD Circle MORE EXAMPLE TEXT"
                date="Oct 20, 2018"
              />
              <PrevArticleCard
                title="Coinbase releases a new stablecoin USD Circle MORE EXAMPLE TEXT"
                date="Oct 20, 2018"
              />
              <PrevArticleCard
                title="Coinbase releases a new stablecoin USD Circle MORE EXAMPLE TEXT"
                date="Oct 20, 2018"
              />
              <PrevArticleCard
                title="Coinbase releases a new stablecoin USD Circle MORE EXAMPLE TEXT"
                date="Oct 20, 2018"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const PrevArticleCard = props => (
  <div className={s.prevArticleCard}>
    <h2 className={s.prevArticleTitle}>{props.title}</h2>
    <h3 className={s.prevArticleDate}>{props.date}</h3>
  </div>
);

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(Blog));
