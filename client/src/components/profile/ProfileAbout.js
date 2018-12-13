import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    const skills = profile.skills.map((skill, index) => {
      return (
        <div className="p-3" key={index}>
          <i className="fa fa-check" /> {skill}
        </div>
      );
    });

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            {isEmpty(profile.bio) ? null : (
              <span>
                <h3 className="text-center text-info">
                  {profile.user.name.split(' ')[0]}'s bio
                </h3>
                <p className="lead">{profile.bio}</p>
                <hr />
              </span>
            )}
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
