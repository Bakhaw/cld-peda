import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { withContext } from '../../context/AppStateProvider';

class CreateInvitation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      inputError: false
    }
  }

  checkInputError = () => {
    const { inputValue } = this.state;

    // TODO inputValue.split('-') pour check chaque dates toute seule et vérifier si elle est valide avec moment(date).isValid()

    if (inputValue === '') return this.setState({ inputError: true });
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    await this.checkInputError();

    const { inputError, inputValue } = this.state;
    const { getAvailablesEvents, getAvailablesEventsDatesJSON } = this.props.actions;
    const params = new URLSearchParams();

    params.append('dates', inputValue);
    params.append('checked', false);

    if (inputError) return console.log('inputError sorry :)')

    try {
      await axios({
        method: 'post',
        url: '/invitations/add',
        data: params,
      });

      await getAvailablesEventsDatesJSON();
      await getAvailablesEvents();

      this.setState({ inputValue: '' });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { inputError, inputValue } = this.state;
    return (
      <div className='create-invitation'>
        <Typography variant='h1'>Créer des invitations</Typography>

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <TextField error={inputError}
            id='outlined-name'
            label='Ajouter des dates'
            placeholder='JJ/MM/AAAA'
            helperText='(Si dates début - fin sont identiques, mettre quand même les deux dates)'
            margin='normal'
            multiline
            name='dates'
            onChange={this.handleInputChange}
            value={inputValue}
            variant='outlined'
          />

          <Button type='submit' size='large' variant='extendedFab' color='primary'>
            Valider
          </Button>
        </form>
      </div>
    );
  }
}

export default withContext(CreateInvitation);