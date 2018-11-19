import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { withContext } from '../../../context/AppStateProvider';
import FormTemplate from './FormTemplate';

class AddCustomEvents extends Component {
  initialState = {
    dates: {
      error: false,
      value: '',
    },
    title: {
      error: false,
      value: '',
    },
    formError: false,
  };

  state = this.initialState;

  toggleInputError = key => {
    this.setState({
      [key]: {
        ...this.state[key],
        error: true,
      },
      formError: true,
    });
  };

  checkInputsErrors = () => {
    // TODO inputValue.split('-') pour check chaque dates toute seule et vérifier si elle est valide avec moment(date).isValid() et toggle une erreur ou pas
    const { dates, title } = this.state;

    this.setState({
      dates: {
        ...this.state.dates,
        error: false,
      },
      title: {
        ...this.state.title,
        error: false,
      },
      formError: false,
    }); // ? reset value after retyping in input

    if (dates.value === '') this.toggleInputError('dates');
    if (title.value === '') this.toggleInputError('title');
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: {
        ...this.state[event.target.name],
        value: event.target.value,
      },
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    await this.checkInputsErrors();

    const { formError, dates, title } = this.state;

    if (!formError) {
      const { getAvailablesEvents, getAvailablesEventsDatesJSON } = this.props.actions;
      console.log('No errors !');
      const params = new URLSearchParams();
      params.append('dates', dates.value);
      params.append('title', title.value);

      try {
        await axios({
          method: 'post',
          url: '/calendar/add',
          data: params,
        });

        await getAvailablesEventsDatesJSON();
        await getAvailablesEvents();

        this.setState(this.initialState);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('Errors !');
    }
  };

  render() {
    return (
      <div className="create-invitation">
        <Typography variant="h1">Ajouter un évènement personnalisé</Typography>

        <form onSubmit={e => this.handleSubmit(e)}>
          {FormTemplate.map((item, index) => {
            const { helperText, label, multiline, name, placeholder, value } = item;
            return (
              <TextField
                key={index}
                error={this.state[value].error}
                id="outlined-name"
                helperText={helperText}
                label={label}
                margin="normal"
                multiline={multiline}
                name={name}
                onChange={this.handleInputChange}
                placeholder={placeholder}
                value={this.state[value].value}
                variant="outlined"
              />
            );
          })}

          <Button type="submit" size="large" variant="extendedFab" color="primary">
            Valider
          </Button>
        </form>
      </div>
    );
  }
}

export default withContext(AddCustomEvents);
