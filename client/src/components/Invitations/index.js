import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import CreateInvitation from '../CreateInvitation';
import Modal from '../Modal';

class Invitation extends Component {
  state = {
    loading: false,
    startDates: [],
    endDates: [],
    invitations: [],
    invitationDates: [],
    selectedDates: [],
    selectedDatesId: '',
    showDialog: false
  }

  async componentDidMount() {
    await this.setState({ loading: true });
    await this.getOnlyInvitationsDates();
    await this.getInvitations();
    await this.setState({ loading: false });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.filterDates(this.state.selectedDates);
    this.addNewDatesInCalendar();
  }

  addNewDatesInCalendar = async () => {
    const params = new URLSearchParams();
    params.append('startDates', this.state.startDates);
    params.append('endDates', this.state.endDates);
    params.append('title', this.props.title);
    params.append('invitationId', this.state.selectedDatesId)

    axios({
      method: 'post',
      url: '/calendar/add',
      data: params
    })
      .then(res => {
        this.toggleEventCheckToTrue();
        this.props.history.push('/calendrier')
      })
      .catch(err => console.log(err));

  }

  toggleEventCheckToTrue = () => {
    axios.get(`/invitations/toggleEventCheckToTrue/${this.state.selectedDatesId}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  getInvitations = async () => {
    const request = await axios.get('/invitations/availables');
    const invitations = await request.data;

    this.setState({ invitations })
  }

  getOnlyInvitationsDates = async () => {
    const request = await axios.get('/invitations/availables/dates');
    const invitationDates = await request.data;

    this.setState({ invitationDates });
  }

  selectDate = (item) => {
    this.setState({ selectedDates: [item], selectedDatesId: item._id })
  }

  removeItem = async (id) => {
    await axios.get(`/invitations/delete/${id}`);
    this.getInvitations();
  }

  filterDates = (array) => {
    let startDates = [];
    let endDates = [];

    let filteredDates;

    filteredDates = array.map(d => {
      return d.dates.split(',');
    });

    filteredDates.forEach((fullDate, i) => {
      fullDate.forEach(date => {
        startDates.push(date.split('-')[0]);
        endDates.push(date.split('-')[1]);
      })
    });

    this.setState({ startDates, endDates });
  }

  render() {
    const { isAdmin } = this.props;
    const { invitations, invitationDates, selectedDatesId } = this.state;
    if (this.state.loading) return <div className='loading-container'><CircularProgress /></div>
    else return (
      <div>
        {isAdmin &&
          <CreateInvitation getInvitations={this.getInvitations} />
        }

        {invitations.length === 0
          ? <p>Il n'y à pas d'invitations disponibles</p>
          : <List component='nav'>
            {invitations.map((d, i) => {
              const dates = invitationDates[i].dates;

              return (
                <ListItem button
                  key={i}
                  onClick={() => this.selectDate(d)}
                  selected={selectedDatesId === d._id}>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText inset>
                    {dates.map((date, j) => {
                      const startDate = moment(date.start, 'MM/DD/YYYY').locale('fr').format('D MMMM YYYY');
                      const endDate = moment(date.end, 'MM/DD/YYYY').locale('fr').format('D MMMM YYYY');
                      return (
                        <p key={j}>{startDate} - {endDate}</p>
                      )
                    })}
                  </ListItemText>

                  {isAdmin &&
                    <div className='admin-action-buttons'>
                      <Modal item={d} getInvitations={this.getInvitations} />
                      <Button onClick={() => this.removeItem(d._id)}
                        size='small'
                        color='secondary'>
                        Supprimer
                      </Button>
                    </div>
                  }

                </ListItem>
              )

            })}
          </List>
        }

        {!isAdmin &&
          <Button disabled={selectedDatesId === ''} className='submit-button' type='submit' size='large' variant='extendedFab' color='primary' onClick={this.handleSubmit}>
            Valider
          </Button>
        }
      </div>
    )
  }
}

export default Invitation;
