import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import {
  createProfile,
  getCurrentProfile
} from '../../actions/profile-actions';
import { clearErrors } from '../../actions/error-actions';
import store from '../../store';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      avatarURL: '',
      githubUsername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillUnmount() {
    store.dispatch(this.props.clearErrors());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.errors && Object.keys(nextProps.errors).length === 0)
      if (nextProps.profile.profile) {
        const profile = nextProps.profile.profile;
        const { skills, social } = profile;
        this.setState(prevState => ({
          ...prevState,
          ...profile,
          ...social,
          skills: skills.join(',')
        }));
        console.log(this.state);
      }
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.createProfile({ ...this.state }, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <div>
            <InputGroup
              placeholder="Twitter Profile URL"
              name="twitter"
              icon="fab fa-twitter"
              value={this.state.twitter}
              onChange={this.onChange}
              error={errors.twitter}
            />

            <InputGroup
              placeholder="Facebook Page URL"
              name="facebook"
              icon="fab fa-facebook"
              value={this.state.facebook}
              onChange={this.onChange}
              error={errors.facebook}
            />

            <InputGroup
              placeholder="Linkedin Profile URL"
              name="linkedin"
              icon="fab fa-linkedin"
              value={this.state.linkedin}
              onChange={this.onChange}
              error={errors.linkedin}
            />

            <InputGroup
              placeholder="YouTube Channel URL"
              name="youtube"
              icon="fab fa-youtube"
              value={this.state.youtube}
              onChange={this.onChange}
              error={errors.youtube}
            />

            <InputGroup
              placeholder="Instagram Page URL"
              name="instagram"
              icon="fab fa-instagram"
              value={this.state.instagram}
              onChange={this.onChange}
              error={errors.instagram}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="edit-profile mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link className="btn btn-light" to="/dashboard">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb-3">* = Required Fields</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Profile Image URL"
                  name="avatarURL"
                  value={this.state.avatarURL}
                  onChange={this.onChange}
                  error={errors.avatarURL}
                  info="Provide an image url for your profile picture"
                />
                <TextFieldGroup
                  placeholder="* Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career eg. Senior Developer"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={this.state.errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubUsername"
                  value={this.state.githubUsername}
                  onChange={this.onChange}
                  error={errors.githubUsername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted ml-2">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile, clearErrors }
)(withRouter(EditProfile));
