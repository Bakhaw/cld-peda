import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class Modal extends Component {

  state = {
    inputValue: this.props.item.dates,
    showDialog: false
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  showDialog = () => {
    this.setState({ showDialog: true });
  }

  closeDialog = () => {
    this.setState({ showDialog: false });
  }

  updateItem = async (id) => {
    const params = new URLSearchParams();
    params.append('dates', this.state.inputValue);
    await axios({
      method: 'post',
      url: `/invitations/update/${id}`,
      data: params
    });

    this.closeDialog();
    this.props.getInvitations();
  }

  render() {
    return (
      <div>
        <Button onClick={this.showDialog} color='primary' variant='outlined' size='small'>Modifier</Button>
        <Dialog
          open={this.state.showDialog}
          onClose={this.closeDialog}
          maxWidth='md'
          fullWidth
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Modifier les dates</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              defaultValue={this.props.item.dates}
              onChange={(e) => this.handleInputChange(e)}
              multiline
              margin="dense"
              id="dates"
              label="Dates"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color='secondary' variant='outlined'>
              Cancel
          </Button>
            <Button onClick={() => this.updateItem(this.props.item._id)} color='primary' variant='contained'>
              Sauvegarder
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Modal;