import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile-actions';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;

    let content;

    if (profiles === null || loading) {
      content = <Spinner />;
    } else {
      if (profiles.length === 0) {
        content = <h4>No Profiles Found!</h4>;
      } else {
        content = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center mb-5">
                Browse and connect with developers
              </p>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
