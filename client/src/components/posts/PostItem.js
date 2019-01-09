import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost, likePost } from '../../actions/post-action';

class PostItem extends Component {
  handleDeleteClick = postId => {
    this.props.deletePost(postId);
  };

  handleLikeClick = postId => {
    this.props.likePost(postId);
  };

  checkIfUserLikedPost = likes => {
    if (likes.filter(like => like._id === this.props.auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-4">
        <div className="row">
          <div className="col-md-2">
            <Link to="/">
              <img
                className="d-none d-md-block ml-3 mt-3"
                style={{
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px'
                }}
                src={post.avatarURL}
                alt=""
              />
            </Link>
            <br />
            <p className="text-center">{post.author}</p>
          </div>
          <div className="col-md-10">
            <p className="h5">{post.title}</p>
            <p className="lead">{post.content}</p>
            {showActions && (
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => this.handleLikeClick(post._id)}
                >
                  <i
                    className={`${this.checkIfUserLikedPost(post.likes) &&
                      'text-info'} fas fa-thumbs-up`}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>

                <Link to={`post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id && (
                  <button
                    type="button"
                    className="btn btn-danger mr-1"
                    onClick={() => this.handleDeleteClick(post._id)}
                  >
                    <i className="fas fa-times" />
                  </button>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, likePost }
)(PostItem);
