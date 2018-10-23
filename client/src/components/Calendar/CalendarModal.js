import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class CalendarModal extends Component {

  state = {
    inputValue: '',
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  removeUserFromEvent = () => {
    console.log('Remove user from event')
    axios.get(`/calendar/delete/${this.props.selectedCards[0].invitationId}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    this.toggleEventCheckToFalse();
  }

  toggleEventCheckToFalse = () => {
    console.log('Toggle event check to false')
    axios.get(`/invitations/toggleEventCheckToFalse/${this.props.selectedCards[0].invitationId}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  newCalendarDate = date => {
    return moment(date, 'MM/DD/YYYY').locale('fr').format('D MMMM YYYY')
  }

  render() {
    const { selectedCardTitle, selectedCards } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.isCalendarModalOpen}
          onClose={this.props.closeCalendarModal}
          maxWidth='md'
          fullWidth
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title' className='modal-calendar-title'>{selectedCardTitle}</DialogTitle>
          <DialogContent>
            {selectedCards.map((d, i) => {
              return (
                <div key={i}>
                  <h3>Date {i + 1}</h3>
                  <Typography variant='subheading' className='modal-calendar-date'>
                    {moment(d.start, 'MM/DD/YYYY').locale('fr').format('D MMMM YYYY')}
                  </Typography>
                  <Typography variant='subheading' className='modal-calendar-date'>
                    {/* on avait ajouté 1j dans le back pour que le front affiche le jour en entier */}
                    {moment(d.end, 'MM/DD/YYYY').subtract('1', 'day').locale('fr').format('D MMMM YYYY')}
                    </Typography>
                </div>
              )
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeCalendarModal} color='secondary' variant='outlined'>
              Annuler
          </Button>
            <Button onClick={() => this.removeUserFromEvent()} color='primary' variant='contained'>
              Me retirer de cet évènement
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CalendarModal;