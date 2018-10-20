import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import CreateInvitation from '../CreateInvitation';
import Modal from '../Modal';

class Invitation extends Component {
  state = {
    startDates: [],
    endDates: [],
    invitations: [],
    selectedDatesIds: [],
    selectedDates: [],
    showDialog: false
  }

  componentDidMount() {
    this.getInvitations();
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
    // params.append('invitationId')

    axios({
      method: 'post',
      url: '/calendar/add',
      data: params
    })
      .then(res => {
        this.toggleCheckedDates();
        this.props.history.push('/calendrier')
      })
      .catch(err => console.log(err));

  }

  toggleCheckedDates = () => {
    console.log('selectedDatesIds', this.state.selectedDatesIds)

    const params = new URLSearchParams();
    params.append('selectedDatesIds', this.state.selectedDatesIds);

    axios({
      method: 'post',
      url: '/invitations/toggleCheckedDates',
      data: params
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  getInvitations = async () => {
    const request = await axios.get('/invitations/availables');
    const invitations = await request.data;

    this.setState({ invitations })
  }

  selectDate = (item) => {
    this.setState({ selectedDates: [item], selectedDatesIds: [item._id] })
    // await this.setState(prevState => {
    //   let newState = Object.assign({}, prevState);
    //   let i = prevState.selectedDates.find(n => n._id === item._id);
    //   if (i) {
    //     newState.selectedDates = newState.selectedDates.filter(n => n._id !== i._id);
    //     newState.selectedDatesIds = newState.selectedDatesIds.filter(n => n !== i._id);
    //   } else {
    //     newState.selectedDates.push(item);
    //     newState.selectedDatesIds.push(item._id);
    //   }
    //   return newState;
    // });
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
    return (
      <div>
        {this.props.isAdmin &&
          <CreateInvitation getInvitations={this.getInvitations} />
        }

        {this.state.invitations.length === 0
          ? <p>Il n'y à plus d'invitations disponibles</p>
          : <List component='nav'>
            {this.state.invitations.map((d, i) => {
              return (
                <ListItem button
                  key={i}
                  onClick={() => this.selectDate(d)}
                  selected={this.state.selectedDatesIds.includes(d._id)}>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={d.dates} />

                  {this.props.isAdmin &&
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

        {!this.props.isAdmin &&
          <Button  disabled={this.state.invitations.length === 0} className='submit-button' type='submit' size='large' variant='contained' color='primary' onClick={this.handleSubmit}>
            Valider
          </Button>
        }
      </div>
    )
  }
}

export default Invitation;
