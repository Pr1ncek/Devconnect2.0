import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth-actions';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  avatarURL = this.props.profile.avatarURL;

  shouldComponentUpdate(nextProps) {
    if (nextProps.profile.profile) {
      if (nextProps.profile.profile.user) {
        if (nextProps.profile.profile.user._id === nextProps.auth.user.id) {
          this.avatarURL = nextProps.profile.profile.avatarURL;
          return true;
        }
      }
    }
    return false;
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          {this.props.profile.profile &&
          Object.keys(this.props.profile.profile).length > 0 ? (
            <img
              src={this.avatarURL}
              alt=""
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
          ) : null}

          <p
            style={{ display: 'inline' }}
            className="pr-5 pl-3 text-white font-weight-bold"
          >
            {user.name}
          </p>
          <button className="btn btn-danger" onClick={this.onLogoutClick}>
            Logout
          </button>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link
              className="navbar-brand"
              to={isAuthenticated ? '/dashboard' : '/'}
            >
              DevConnector
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    {' '}
                    Developers
                  </Link>
                </li>
                {isAuthenticated && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/feed">
                      {' '}
                      Post Feed
                    </Link>
                  </li>
                )}
              </ul>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
