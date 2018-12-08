import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile-actions';

class Education extends Component {
  onDeleteClick = eduId => this.props.deleteEducation(eduId);

  render() {
    const { education } = this.props;
    const content = education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.institute}</td>
        <td>{edu.degree}</td>
        <td>{edu.major}</td>
        <td>{edu.location}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
          {edu.current ? (
            'Current'
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={e => this.onDeleteClick(edu._id)}
          >
            Delete
          </button>{' '}
        </td>
      </tr>
    ));

    return (
      <div className="mt-5">
        <h4 className="mb-4">Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Institute</th>
              <th>Degree</th>
              <th>Major</th>
              <th>Location</th>
              <th>Attended</th>
              <th />
            </tr>
            {content}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  education: PropTypes.array.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
