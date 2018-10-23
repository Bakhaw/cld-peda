import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class CreateInvitation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    }
  }
  
  handleChange = event => {
    this.setState({
      inputValue: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.append('dates', this.state.inputValue);
    params.append('checked', false);

    try {
      await axios({
        method: 'post',
        url: '/invitations/add',
        data: params,
      });      
      this.props.getInvitations();
      this.setState({ inputValue: '' });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className='create-invitation'>
        <h1>Créer des invitations</h1>

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <TextField
            id='outlined-name'
            label='Ajouter des dates'
            name='dates'
            value={this.state.inputValue}
            onChange={this.handleChange}
            multiline
            margin='normal'
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

export default CreateInvitation;