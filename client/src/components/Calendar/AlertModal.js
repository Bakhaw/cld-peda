import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

class EventInfosModal extends Component {

    state = {
        loading: false
    }

    removeUserFromEvent = async () => {
        console.log('Remove user from event')

        this.setState({ loading: true })

        axios.get(`/calendar/delete/${this.props.selectedCards[0].invitationId}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))


        await this.toggleEventCheckToFalse();
        await this.props.getAllCalendarCards();
        this.props.closeAlertModal();
        this.props.closeCalendarModal();

        this.setState({ loading: false })
    }

    toggleEventCheckToFalse = () => {
        console.log('Toggle event check to false')
        axios.get(`/invitations/toggleEventCheckToFalse/${this.props.selectedCards[0].invitationId}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.isAlertModalOpen}
                    // onClose={this.props.closeAlertModal}
                    maxWidth='sm'
                    fullWidth
                    aria-labelledby='form-dialog-title'
                >
                    {this.state.loading &&
                        <DialogContent>
                            <div className='modal-loading-container'><CircularProgress /></div>
                        </DialogContent>
                    }

                    {!this.state.loading &&
                        <div>
                            <DialogContent>
                                <Typography variant='subheading'>
                                    Êtes-vous sûr de vouloir vous retirer de cet évènement ?
                                </Typography>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={this.props.closeAlertModal} color='secondary' variant='text'>
                                    Non
                                </Button>

                                <Button onClick={this.removeUserFromEvent} color='primary' variant='contained'>
                                    Oui
                                </Button>
                            </DialogActions>
                        </div>
                    }
                </Dialog>
            </div>
        );
    }
}

export default EventInfosModal;