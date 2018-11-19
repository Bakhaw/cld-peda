import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

import Invitations from '../Invitations'
import UserForm from './UserForm'

import { withContext } from '../../context/AppStateProvider'

class UserChooseDates extends Component {
  state = {
    step: 1,
    lastname: {
      value: '',
      error: false,
    },
    name: {
      value: '',
      error: false,
    },
  }

  checkUserFormErrors = key => {
    if (this.state[key].value === '') {
      this.setState(prevState => {
        let newState = Object.assign({}, prevState)
        newState[key].value = prevState[key].value
        newState[key].error = true
        return newState
      })
    }
  }

  handleUserFormInputChange = e => {
    this.setState({ [e.target.name]: { value: e.target.value, error: false } })
  }

  handleUserFormSubmit = () => {
    const { lastname, name } = this.state

    this.checkUserFormErrors('lastname')
    this.checkUserFormErrors('name')

    if (lastname.value !== '' && name.value !== '')
      this.setState({ step: this.state.step + 1 })
  }

  render() {
    const { lastname, name, step } = this.state
    const { history } = this.props
    return (
      // if (redirectToCalendar === true) return <Redirect to={{ pathname: '/calendrier' }}/>

      <div className="user-container">
        {step === 1 && (
          <UserForm
            handleChangeInput={this.handleUserFormInputChange}
            handleFormSubmit={this.handleUserFormSubmit}
            lastname={lastname}
            name={name}
          />
        )}

        {step === 2 && (
          <div className="choose-date">
            <Typography variant="h1">
              Choisissez vos dates, {name.value}
            </Typography>
            <Invitations
              eventTitle={`${lastname.value} ${name.value}`}
              history={history}
              isAdmin={false}
            />
          </div>
        )}
      </div>
    )
  }
}

export default withContext(UserChooseDates)
