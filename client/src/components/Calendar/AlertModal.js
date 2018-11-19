import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

import Loader from '../Loader';

import { withContext } from '../../context/AppStateProvider';

class AlertModal extends Component {
  handleRemoveUserFromEventSubmit = async () => {
    const { actions, calendar, getAllCalendarCards } = this.props;
    const { selectedEventOnCalendar, selectedEventOnCalendarType } = calendar.state;
    const { toggleModalLoading } = actions;

    let query;

    toggleModalLoading(true);

    if (selectedEventOnCalendarType === 'invitation') {
      // ? Si c'est une invitation, donc que qqun s'est inscrit dessus
      query = `delete/cardsByInvitationId/${selectedEventOnCalendar[0].invitationId}`;
    } else {
      // ? Si c'est un event ajouté direct au calendrier depuis l'interface Admin
      query = `delete/${selectedEventOnCalendar[0]._id}`;
    }

    try {
      await axios.get(`/calendar/${query}`).catch(err => console.log(err));
      if (selectedEventOnCalendarType === 'invitation') await this.toggleEventCheckToFalse();
    } catch (err) {
      console.log(err);
    }

    await getAllCalendarCards();
    this.props.closeAlertModal();
    calendar.actions.closeCalendarModal();

    toggleModalLoading(false);
  };

  toggleEventCheckToFalse = async () => {
    const { calendar } = this.props;
    const { selectedEventOnCalendar } = calendar.state;
    try {
      await axios.get(`/invitations/toggleEventCheckToFalse/${selectedEventOnCalendar[0].invitationId}`).catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { calendar, contextState, closeAlertModal, isAlertModalOpen } = this.props;
    const { selectedEventOnCalendarType } = calendar.state;
    const { modalLoading } = contextState;

    return (
      <Dialog open={isAlertModalOpen} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
        {modalLoading && (
          <DialogContent>
            <Loader />
          </DialogContent>
        )}

        {!modalLoading && (
          <Fragment>
            <DialogContent>
              <Typography variant="subheading">
                {selectedEventOnCalendarType === 'invitation'
                  ? 'Êtes-vous sûr de vouloir vous retirer de cet évènement ? (vous serez retiré de tous les bilans)'
                  : 'Voulez-vous vraiment supprimer cet évènement ?'}
              </Typography>
            </DialogContent>

            <DialogActions>
              <Button onClick={closeAlertModal} color="secondary" variant="text">
                Non
              </Button>

              <Button onClick={this.handleRemoveUserFromEventSubmit} color="primary" variant="contained">
                Oui
              </Button>
            </DialogActions>
          </Fragment>
        )}
      </Dialog>
    );
  }
}

export default withContext(AlertModal);
