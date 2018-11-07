import React, { Component } from 'react';
import key from '../../key';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Invitations from '../Invitations';

class AdminInterface extends Component {

  state = {
    key: key,
    inputValue: '',
    showAdminInterface: false,
    errorPass: false
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  }

  checkPass = () => {
    const { inputValue, key } = this.state;

    if (inputValue === key) {
      this.setState({ errorPass: false, showAdminInterface: true })
    } else {
      this.setState({ errorPass: true, showAdminInterface: false }, () => {
        setTimeout(() => this.setState({ errorPass: false }), 2000);
      });
    }
  }


  render() {
    const { errorPass, showAdminInterface } = this.state;
    return (
      <div className='admin-container'>
        {!showAdminInterface &&
          <div className='login'>
            <Typography variant='h1'>Connexion</Typography>
            <TextField className='login-input'
              error={errorPass}
              helperText={errorPass ? 'Mot de passe invalide' : '* Champ requis'}
              variant='outlined'
              margin='normal'
              label='Mot de passe'
              required
              type='password'
              onChange={this.handleInputChange} />
            <Button variant='extendedFab' color='primary' size='large' onClick={this.checkPass}>
              Valider
            </Button>
          </div>
        }

        {showAdminInterface &&
          <div className='admin-create-invitations'>
            <Invitations isAdmin={true} />
          </div>
        }
      </div>
    );
  }
}

export default AdminInterface;