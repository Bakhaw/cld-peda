import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import { Link } from 'react-router-dom';

import 'react-big-calendar/lib/css/react-big-calendar.css';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calendarCards: [],
            messages: {
                month: 'Mois',
                week: 'Semaine',
                day: 'Jour',
                today: "Aujourd'hui",
                previous: '<',
                next: '>',
            }
        }
        this.localizer = BigCalendar.momentLocalizer(moment);
    }

    componentDidMount() {
      this.getCalendarCards();
    }

    getCalendarCards = async () => {
        const request = await axios.get('/calendar');
        const calendarCards = await request.data;

        this.setState({ calendarCards });
    }

    render() {
        return (
            <div>
                <Link to='/'>
                    <p>Retour à l'accueil</p>
                </Link>

                <BigCalendar culture='fr-FR'
                formats={{
                    eventTimeRangeFormat: ({ start, end }, culture, local) => 
                        local.format(start, 'DD/MM/YYYY', culture) +
                        local.format(end, 'DD/MM/YYYY', culture),
                }}
                defaultView='month'
                endAccessor='end'
                events={this.state.calendarCards}
                localizer={this.localizer}
                messages={this.state.messages}
                onSelectEvent={() => console.log('selected')}
                startAccessor='start'
                views={['month', 'week']} />
            </div>
        )
    }
}

export default Calendar;