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
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(Blog));
