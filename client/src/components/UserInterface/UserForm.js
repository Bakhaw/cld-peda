import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

function UserForm({ handleChangeInput, handleFormSubmit, lastname, name }) {
  return (
    <div className="user-form">
      <Typography variant="h1">Qui êtes-vous ?</Typography>
      <TextField
        className="user-input"
        label="Nom"
        error={lastname.error}
        name="lastname"
        onChange={handleChangeInput}
        required
        value={lastname.value}
        variant="outlined"
      />
      <TextField
        className="user-input"
        label="Prénom"
        error={name.error}
        helperText="* Champs obligatoires"
        name="name"
        onChange={handleChangeInput}
        required
        value={name.value}
        variant="outlined"
      />
      <Button
        className="submit-button"
        color="primary"
        onClick={handleFormSubmit}
        size="large"
        type="submit"
        variant="extendedFab"
      >
        Valider
      </Button>

      <Link to="/calendrier" className="show-calendar">
        <Button size="large" variant="text" color="primary">
          Voir le Calendrier
        </Button>
      </Link>
    </div>
  )
}

export default UserForm
