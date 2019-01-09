import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/post-action';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (loading) {
      postContent = <Spinner />;
    } else if (!loading && post === null) {
      postContent = <h2>This post no longer exists!</h2>;
    } else {
      postContent = (
        <React.Fragment>
          <PostItem post={post} showActions={false} />
          <div>
            <CommentForm postId={post._id.toString()} />
          </div>
          <div>
            <CommentFeed
              postId={post._id.toString()}
              comments={post.comments}
            />
          </div>
        </React.Fragment>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed
            </Link>
            <div>{postContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
