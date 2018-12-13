import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile-actions';

class Experience extends Component {
  onDeleteClick = expId => this.props.deleteExperience(expId);

  render() {
    const { experience } = this.props;
    const content = experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>{exp.location}</td>
        <td>
          <Moment format="YYYY/MM">{exp.from}</Moment> -{' '}
          {exp.current ? 'Current' : <Moment format="YYYY/MM">{exp.to}</Moment>}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={e => this.onDeleteClick(exp._id)}
          >
            Delete
          </button>{' '}
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Location</th>
              <th>Years</th>
              <th />
            </tr>
            {content}
          </thead>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  experience: PropTypes.array.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
