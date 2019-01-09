import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2 mt-4 ml-4">
            <img
              src={profile.avatarURL}
              alt=""
              style={{ borderRadius: '50%', height: '170px', width: '170px' }}
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8 mt-4 ml-5">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{' '}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>at {profile.location}</span>
              )}
            </p>
            <Link className="btn btn-info" to={`/profile/${profile.handle}`}>
              View Profile
            </Link>
          </div>
          <div className="col-md-3 d-none d-md-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li className="list-group-item" key={index}>
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
