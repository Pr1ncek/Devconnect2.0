import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const { education, experience } = this.props.profile;

    const expItems = experience.map(exp => {
      return (
        <li key={exp._id} className="list-group-item">
          <h4>{exp.company}</h4>
          <p>
            <Moment format="YYYY/MM">{exp.from}</Moment> -
            {exp.to === null ? (
              ' Now'
            ) : (
              <Moment format="YYYY/MM">{exp.to}</Moment>
            )}
          </p>
          <p>
            <strong>Position:</strong> {exp.title}
          </p>
          <p>
            <strong>Company:</strong> {exp.company}
          </p>
          <p>
            <strong>Location:</strong> {exp.location}
          </p>
          <p>
            {exp.description === '' ? null : (
              <span>
                <strong>Description:</strong> {exp.description}
              </span>
            )}
          </p>
        </li>
      );
    });

    const eduItems = education.map(edu => {
      return (
        <li key={edu._id} className="list-group-item">
          <h4>{edu.institute}</h4>
          <p>
            <Moment format="YYYY/MM">{edu.from}</Moment> -
            {edu.to === null ? (
              ' Now'
            ) : (
              <Moment format="YYYY/MM">{edu.to}</Moment>
            )}
          </p>
          <p>
            <strong>Degree:</strong> {edu.degree}
          </p>
          <p>
            <strong>Major:</strong> {edu.major}
          </p>
          <p>
            <strong>Location:</strong> {edu.location}
          </p>
          <p>
            {edu.description === '' ? null : (
              <span>
                <strong>Description:</strong> {edu.description}
              </span>
            )}
          </p>
        </li>
      );
    });

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
