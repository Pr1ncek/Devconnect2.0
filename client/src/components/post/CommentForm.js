import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { addComment } from '../../actions/post-action';
import isEmpty from '../../validation/is-empty';

class CommentForm extends Component {
  state = {
    content: '',
    title: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.errors)) {
      this.setState({ errors: nextProps.errors });
    } else {
      this.setState({ title: '', content: '', errors: {} });
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    const commentData = {
      title: this.state.title,
      content: this.state.content
    };
    console.log(commentData);
    this.props.addComment(this.props.postId, commentData);
  };

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white font-weight-bold">
            Reply to this post
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  error={this.state.errors.title}
                />
                <TextAreaFieldGroup
                  placeholder="Content"
                  name="content"
                  value={this.state.content}
                  onChange={this.handleChange}
                  error={this.state.errors.content}
                />
              </div>
              <button type="submit" className="btn btn-info">
                Reply
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
