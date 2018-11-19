import React, { Component } from 'react';

import BackOffice from './BackOffice';
import NotLogged from './NotLogged';

class AdminInterface extends Component {
  state = {
    showAdminInterface: true,
  };

  showAdminInterface = () => {
    this.setState({ showAdminInterface: true });
  };

  render() {
    const { showAdminInterface } = this.state;
    return (
      <div className="admin-container">
        {!showAdminInterface && <NotLogged showAdminInterface={this.showAdminInterface} />}

        {showAdminInterface && <BackOffice />}
      </div>
    );
  }
}

export default AdminInterface;
