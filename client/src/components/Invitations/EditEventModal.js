import React, { Component, Fragment } from 'react'
import axios from 'axios'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import { withContext } from '../../context/AppStateProvider'

class EditEventModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      showDialog: false,
    }
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  showDialog = () => {
    this.setState({ showDialog: true })
  }

  closeDialog = () => {
    this.setState({ showDialog: false })
  }

  updateItem = async id => {
    const {
      getAvailablesEvents,
      getAvailablesEventsDatesJSON,
    } = this.props.actions
    const params = new URLSearchParams()
    params.append('dates', this.state.inputValue)

    axios({
      method: 'post',
      url: `/invitations/update/${id}`,
      data: params,
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))

    await getAvailablesEventsDatesJSON()
    await getAvailablesEvents()
    this.closeDialog()
  }

  render() {
    const { _id, dates } = this.props.item
    return (
      <Fragment>
        <Button
          onClick={this.showDialog}
          color="primary"
          variant="text"
          size="small"
        >
          Modifier
        </Button>
        <Dialog
          open={this.state.showDialog}
          onClose={this.closeDialog}
          maxWidth="md"
          fullWidth
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Modifier les dates</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              defaultValue={dates}
              onChange={e => this.handleInputChange(e)}
              multiline
              margin="dense"
              id="dates"
              label="Dates"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="secondary" variant="text">
              Annuler
            </Button>
            <Button
              onClick={() => this.updateItem(_id)}
              color="primary"
              variant="extendedFab"
            >
              Sauvegarder
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

export default withContext(EditEventModal)
