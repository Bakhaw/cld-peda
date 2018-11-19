import React, { Component, Fragment } from 'react'
import axios from 'axios'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'

import Loader from '../Loader'

import { withContext } from '../../context/AppStateProvider'

class RemoveEventAlertModal extends Component {
  state = {
    isRemoveEventAlertModalOpen: false,
  }

  openModal = () => {
    this.setState({ isRemoveEventAlertModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isRemoveEventAlertModalOpen: false })
  }

  removeEvent = async id => {
    const {
      getAvailablesEvents,
      getAvailablesEventsDatesJSON,
      resetSelectedEvent,
      toggleModalLoading,
    } = this.props.actions

    toggleModalLoading(true)

    await axios.get(`/invitations/delete/${id}`).catch(err => console.log(err))
    await getAvailablesEvents()
    await getAvailablesEventsDatesJSON()
    await resetSelectedEvent()

    this.closeModal()

    toggleModalLoading(false)
  }

  render() {
    const { contextState, item } = this.props
    const { modalLoading } = contextState

    return (
      <Fragment>
        <Button
          onClick={this.openModal}
          color="secondary"
          variant="text"
          size="small"
        >
          Supprimer
        </Button>

        <Dialog
          open={this.state.isRemoveEventAlertModalOpen}
          maxWidth="sm"
          fullWidth
          aria-labelledby="form-dialog-title"
        >
          {modalLoading && (
            <DialogContent>
              <Loader />
            </DialogContent>
          )}

          {!modalLoading && (
            <Fragment>
              <DialogContent>
                <Typography variant="subheading">
                  Voulez-vous vraiment supprimer cet évènement ?
                </Typography>
              </DialogContent>

              <DialogActions>
                <Button
                  onClick={this.closeModal}
                  color="secondary"
                  variant="text"
                >
                  Non
                </Button>

                <Button
                  onClick={() => this.removeEvent(item._id)}
                  color="primary"
                  variant="contained"
                >
                  Oui
                </Button>
              </DialogActions>
            </Fragment>
          )}
        </Dialog>
      </Fragment>
    )
  }
}

export default withContext(RemoveEventAlertModal)
