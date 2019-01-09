import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/post-action';

class CommentItem extends Component {
  handleDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };

  render() {
    const { comment, auth, postId } = this.props;
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
                src={comment.avatarURL}
                alt=""
              />
            </Link>
            <br />
            <p className="text-center">{comment.author}</p>
          </div>
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-10">
                <p className="h5">{comment.title}</p>
                <p className="lead">{comment.content}</p>
              </div>
              <div className="col-md-2">
                {comment.user === auth.user.id && (
                  <button
                    type="button"
                    className="btn btn-danger mr-1"
                    onClick={() => this.handleDeleteClick(postId, comment._id)}
                  >
                    <i className="fas fa-times" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
