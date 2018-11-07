import React, { Component, Fragment } from 'react';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import AlertModal from './AlertModal';
import Loader from '../Loader';

import { withContext } from '../../context/AppStateProvider';

class EventInfosModal extends Component {

  state = {
    isAlertModalOpen: false
  }

  addStartDate = (date) => {
    return moment(date, 'MM/DD/YYYY').locale('fr').format('D MMMM YYYY');
  }

  addEndDate = (date) => {
    // ? on subtract() car on avait add('1', 'days') pour la endDate pour améliorer l'UI de l'event
    // ? sur le Calendrier
    return moment(date, 'MM/DD/YYYY').subtract('1', 'day').locale('fr').format('D MMMM YYYY');
  }

  displayDates = (selectedEventOnCalendar) => {
    return selectedEventOnCalendar.map((d, i) => (
      <div key={i} className='date-card'>
        <h2>Bilan n°{i + 1}</h2>
        <Typography variant='subheading' className='modal-calendar-date'>
          {this.addStartDate(d.start)}
        </Typography>
        {this.addStartDate(d.start) !== this.addEndDate(d.end) &&
          <Typography variant='subheading' className='modal-calendar-date'>
            {this.addEndDate(d.end)}
          </Typography>
        }
      </div>
    )
    )
  }

  showAlertModal = () => {
    this.setState({ isAlertModalOpen: true });
  }

  closeAlertModal = () => {
    this.setState({ isAlertModalOpen: false });
  }

  render() {
    const { calendar, contextState } = this.props;
    const { modalLoading } = contextState;
    const { isCalendarModalOpen, selectedEventOnCalendar, selectedEventOnCalendarTitle, selectedEventOnCalendarType } = calendar.state;
    const { closeCalendarModal } = calendar.actions;

    return (
      <Fragment>
        <Dialog
          open={isCalendarModalOpen}
          onClose={closeCalendarModal}
          maxWidth='md'
          fullWidth
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>{selectedEventOnCalendarTitle}</DialogTitle>
          <DialogContent className='event-infos-modal-content'>
            {modalLoading && <Loader />}

            {!modalLoading && this.displayDates(selectedEventOnCalendar)}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeCalendarModal} color='secondary' variant='text'>
              Fermer
                </Button>
            <Button onClick={this.showAlertModal} color='primary' variant='contained'>
              {selectedEventOnCalendarType === 'invitation' ? 'Me retirer de cet évènement' : 'Supprimer cet évènement'}
            </Button>
          </DialogActions>
        </Dialog>

        <AlertModal closeAlertModal={this.closeAlertModal}
          isAlertModalOpen={this.state.isAlertModalOpen}
          {...this.props} />
      </Fragment>
    );
  }
}

export default withContext(EventInfosModal);