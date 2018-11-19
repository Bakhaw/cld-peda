import React, { Component, Fragment } from 'react'
import moment from 'moment'

import Button from '@material-ui/core/Button'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Loader from '../Loader'
import EditEventModal from './EditEventModal'
import RemoveEventAlertModal from './RemoveEventAlertModal'

import { withContext } from '../../context/AppStateProvider'

class Events extends Component {
  state = {
    isRemoveEventAlertModalOpen: false,
  }

  openRemoveEventAlertModal = () => {
    this.setState({ isRemoveEventAlertModalOpen: true })
  }

  closeRemoveEventAlertModal = () => {
    this.setState({ isRemoveEventAlertModalOpen: false })
  }

  render() {
    const { actions, contextState, eventTitle, history, isAdmin } = this.props
    const {
      allEvents,
      appLoading,
      availablesEvents,
      selectedEventOnEventsListId,
    } = contextState
    const { handleAddNewDatesInCalendarSubmit, selectEvent } = actions

    if (appLoading) return <Loader />

    return (
      <Fragment>
        <List className="invitations-list-container">
          {availablesEvents.length > 0 &&
            allEvents.map((item, i) => {
              const eventDates = availablesEvents[i].dates
              return (
                <ListItem
                  button
                  key={i}
                  onClick={() => selectEvent(item)}
                  selected={selectedEventOnEventsListId === item._id}
                >
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <div className="invitation-content">
                    <ListItemText inset>
                      {eventDates.map((date, j) => {
                        const startDate = moment(date.start, 'DD/MM/YYYY')
                          .locale('fr')
                          .format('D MMMM YYYY')
                        const endDate = moment(date.end, 'DD/MM/YYYY')
                          .locale('fr')
                          .format('D MMMM YYYY')
                        return (
                          <p key={j}>
                            {startDate}{' '}
                            {startDate !== endDate && `- ${endDate}`}
                          </p>
                        )
                      })}
                    </ListItemText>

                    {isAdmin && (
                      <div className="admin-action-buttons">
                        <EditEventModal item={item} />

                        <RemoveEventAlertModal item={item} />
                      </div>
                    )}
                  </div>
                </ListItem>
              )
            })}
        </List>

        {!isAdmin && (
          <div className="chose-event">
            <Button
              className="submit-button"
              color="primary"
              disabled={selectedEventOnEventsListId === ''}
              onClick={e =>
                handleAddNewDatesInCalendarSubmit(e, eventTitle, history)
              }
              size="large"
              type="submit"
              variant="extendedFab"
            >
              Valider
            </Button>
          </div>
        )}
      </Fragment>
    )
  }
}

export default withContext(Events)
