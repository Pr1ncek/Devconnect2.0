import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/set-auth-token';
import { SET_CURRENT_USER } from './actions/types';
import store from './store';
import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
