import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import firebase from 'firebase';
import 'firebase/auth';

import {signinWithGoogle} from '../lib/google_signin';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      error: {}
    };
  }

  signinWithGoogle() {
    signinWithGoogle((isLoading) => {
      this.setState({
        ...this.state,
        loading: isLoading
      });
    }, (error) => {
      this.setState({loading: false, error})
    }, this.props.signinSuccess)
  }

  signin() {
    const {email, password} = this.state;
    if (!email) 
      return;
    if (!password) 
      return;
    this.setState({loading: true, error: {}});
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        this.setState({loading: false});
        this
          .props
          .signinSuccess();
      })
      .catch((error) => {
        console.log('error', error);
        this.setState({error, loading: false});
      });
  }

  render() {
    const {loading, error} = this.state;

    return (
      <div className={cx('email-signin')}>
        <form>
          <div className={cx('u-form-group')}>
            <input
              type="email"
              placeholder="Email"
              onChange={event => this.setState({email: event.target.value})}/>
          </div>
          <div className={cx('u-form-group')}>
            <input
              type="password"
              placeholder="Password"
              onChange={event => this.setState({password: event.target.value})}/>
          </div>
          <div className={cx('u-form-group')}>
            <button onClick={() => this.signin()}>
              {loading
                ? 'Please wait...'
                : 'Signin'}
            </button>
          </div>
          <div className={cx('u-form-group error')}>
            {error.message}
          </div>
          <div>
            <img
              alt='Sign In with Google'
              src='btn_google_signin_dark_normal_web.png'
              onClick={() => this.signinWithGoogle()}/>
          </div>
        </form>
      </div>
    );
  }
}

Signin.propTypes = {
  signinSuccess: PropTypes.func.isRequired
};

export default Signin;
