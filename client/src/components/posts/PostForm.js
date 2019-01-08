import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { addPost } from '../../actions/post-action';
import isEmpty from '../../validation/is-empty';

class PostForm extends Component {
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
    const postData = { title: this.state.title, content: this.state.content };
    this.props.addPost(postData);
  };

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Join the dicussion
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
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
