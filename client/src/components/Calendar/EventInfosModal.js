import React, { Component } from 'react';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import AlertModal from './AlertModal';

class EventInfosModal extends Component {

  state = {
    isAlertModalOpen: false
  }

  newCalendarDate = date => {
    return moment(date, 'MM/DD/YYYY').locale('fr').format('D MMMM YYYY')
  }

  showAlertModal = () => {
    this.setState({ isAlertModalOpen: true });
  }

  closeAlertModal = () => {
    this.setState({ isAlertModalOpen: false });
  }

  render() {
    const { loading, selectedCardTitle, selectedCards } = this.props;
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
          <DialogContent className='event-infos-modal-content'>
            {loading && <div className='modal-loading-container'><CircularProgress /></div>}

            {!loading && selectedCards.map((d, i) => {
              return (
                <div key={i} className='date-card'>
                  <h2>Bilan n°{i + 1}</h2>
                  <Typography variant='subheading' className='modal-calendar-date'>
                    {moment(d.start, 'MM/DD/YYYY').locale('fr').format('D MMMM YYYY')}
                  </Typography>
                  {moment(d.start, 'MM/DD/YYYY').locale('fr').format('D MMMM YYYY') !== moment(d.end, 'MM/DD/YYYY').subtract('1', 'day').locale('fr').format('D MMMM YYYY') &&
                    <Typography variant='subheading' className='modal-calendar-date'>
                      {/* on avait ajouté 1j dans le back pour que le front affiche le jour en entier */}
                      {moment(d.end, 'MM/DD/YYYY').subtract('1', 'day').locale('fr').format('D MMMM YYYY')}
                    </Typography>
                  }
                </div>
              )
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeCalendarModal} color='secondary' variant='text'>
              Fermer
          </Button>
            <Button onClick={this.showAlertModal} color='primary' variant='contained'>
              Me retirer de cet évènement
            </Button>
          </DialogActions>
        </Dialog>

        <AlertModal closeAlertModal={this.closeAlertModal}
          closeCalendarModal={this.props.closeCalendarModal}
          getAllCalendarCards={this.props.getAllCalendarCards}
          isAlertModalOpen={this.state.isAlertModalOpen}
          selectedCards={this.props.selectedCards} />
      </div>
    );
  }
}

export default EventInfosModal;