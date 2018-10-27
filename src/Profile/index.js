import cx from 'classnames';
import React, { Component } from 'react';
import Avatar from '../Avatar';
import TimeAgo from 'react-timeago';

export default class Profile extends Component {

  constructor(props) {
    super(props);

    const { user } = props || {};
    this.state = {
      success: '',
      displayName: user.displayName
    };
  }

  async doUpdateProfile(event) {
    event.preventDefault();
    const { user } = this.props;
    await user.updateProfile({
      displayName: this.state.displayName
    });
    this.setState({
      success: 'Profile updated'
    });
  }

  render() {
    const { user } = this.props;
    return (
      <div>
       {this.state.success && (
         <p style={{ color: 'white', background: 'green' }}>{this.state.success}</p>
       )}
       {user.uid && (
         <div>
           <Avatar user={user} size="230" round={false} />
           <h3>{user.displayName}</h3>
           <p>{user.email}</p>
           <p>
             Joined <TimeAgo date={user.metadata.creationTime} />
           </p>

           <form onSubmit={this.doUpdateProfile.bind(this)}>

            <div className={cx('u-form-group')}>
              <input
                type="displayName"
                value={this.state.displayName}
                placeholder="Display Name (optional)"
                onChange={event => this.setState({ displayName: event.target.value })}
              />
            </div>

            <button type="submit">Update profile</button>
           </form>
         </div>
       )}
      </div>
    );
  }
}

