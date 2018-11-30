import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile-actions';

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
      return;
    }
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (!profile || loading) {
      dashboardContent = <h4>Loading...</h4>;
    } else {
      dashboardContent = <h4>Dashboard...</h4>;
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              <p className="lead text-muted">Welcome {user.name}</p>
              <div className="btn-group mb-4" role="group">
                <a href="edit-profile.html" className="btn btn-light">
                  <i className="fas fa-user-circle text-info mr-1" /> Edit
                  Profile
                </a>
                <a href="add-experience.html" className="btn btn-light">
                  <i className="fab fa-black-tie text-info mr-1" />
                  Add Experience
                </a>
                <a href="add-education.html" className="btn btn-light">
                  <i className="fas fa-graduation-cap text-info mr-1" />
                  Add Education
                </a>
                {dashboardContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
