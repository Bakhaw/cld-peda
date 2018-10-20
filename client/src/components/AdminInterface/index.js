import React, { Component } from 'react';
import key from '../../key';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Invitations from '../Invitations';

class AdminInterface extends Component {

  state = {
    invitations: [],
    key: key,
    inputValue: '',
    showAdminInterface: false,
    errorPass: false
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  }

  checkPass = () => {
    if (this.state.inputValue === this.state.key) {
      this.setState({ errorPass: false, showAdminInterface: true })
    } else {
      this.setState({ errorPass: true, showAdminInterface: false }, () => {
        setTimeout(() => this.setState({ errorPass: false }), 2000);
      });
    }
  }


  render() {
    return (
      <div className='admin-container'>
        {!this.state.showAdminInterface &&
          <div className='login'>
            <h1>Bienvenue</h1>
            <TextField className='login-input'
              error={this.state.errorPass}
              helperText={this.state.errorPass ? 'Mot de passe invalide' : ''}
              variant='outlined'
              margin='normal'
              label='Mot de passe'
              type='password'
              onChange={this.handleInputChange} />
            <Button variant='contained' color='primary' size='large' onClick={this.checkPass}>
              Valider
            </Button>
          </div>
        }

        {this.state.showAdminInterface &&
          <div className='admin-create-invitations'>
            <Invitations isAdmin={this.props.location.pathname === '/admin'}/>
          </div>
        }
      </div>
    );
  }
}

export default AdminInterface;