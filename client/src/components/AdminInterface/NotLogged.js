import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import key from '../../key';

class NotLogged extends Component {
  state = {
    errorPass: false,
    inputValue: '',
    key: key,
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  checkPass = () => {
    const { inputValue, key } = this.state;

    if (inputValue === key) {
      this.props.showAdminInterface();
    } else {
      this.setState({ errorPass: true });
    }
  };

  render() {
    const { errorPass, inputValue } = this.state;

    return (
      <div className="login">
        <Typography variant="h1">Connexion</Typography>
        <TextField
          className="login-input"
          error={errorPass}
          helperText={errorPass ? 'Mot de passe invalide' : '* Champ requis'}
          variant="outlined"
          margin="normal"
          label="Mot de passe"
          required
          type="password"
          onChange={this.handleInputChange}
        />
        <Button color="primary" disabled={inputValue === ''} onClick={this.checkPass} size="large" variant="extendedFab">
          Valider
        </Button>
      </div>
    );
  }
}

export default NotLogged;
