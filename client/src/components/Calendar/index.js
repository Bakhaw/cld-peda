import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import CalendarModal from './EventInfosModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calendarCards: [],
            isCalendarModalOpen: false,
            messages: {
                month: 'Mois',
                week: 'Semaine',
                day: 'Jour',
                today: "Aujourd'hui",
                previous: '<',
                next: '>',
            },
            selectedCardTitle: '',
            selectedCards: []
        }
        this.localizer = BigCalendar.momentLocalizer(moment);
    }

    componentDidMount() {
        this.getAllCalendarCards();
    }

    getAllCalendarCards = async () => {
        console.log('getAllCalendarCards')
        const request = await axios.get('/calendar');
        const calendarCards = await request.data;

        this.setState({ calendarCards });
    }

    handleSelectedEvent = async (selectedEvent) => {
        const request = await axios.get(`/calendar/${selectedEvent.invitationId}`);
        const selectedCards = await request.data;
        this.setState({ selectedCards, selectedCardTitle: selectedEvent.title });
    }

    showCalendarModal = async (e) => {
        await this.handleSelectedEvent(e);
        this.setState({ isCalendarModalOpen: true })
    }

    closeCalendarModal = () => {
        console.log('closeCalendarModal')
        this.setState({ isCalendarModalOpen: false })        
    }

    render() {
        const { isCalendarModalOpen, calendarCards, messages, selectedCards, selectedCardTitle } = this.state;
        return (
            <div>
                <BigCalendar culture='fr-FR'
                    // formats={{
                    //     eventTimeRangeFormat: ({ start, end }, culture, local) =>
                    //         local.format(start, 'DD/MM/YYYY', culture) +
                    //         local.format(end, 'DD/MM/YYYY', culture),
                    // }}
                    defaultView='month'
                    endAccessor='end'
                    events={calendarCards}
                    localizer={this.localizer}
                    messages={messages}
                    onSelectEvent={this.showCalendarModal}
                    startAccessor='start'
                    views={['month', 'week']} />

                    {isCalendarModalOpen &&
                        <CalendarModal isCalendarModalOpen={isCalendarModalOpen}
                                    closeCalendarModal={this.closeCalendarModal}
                                    getAllCalendarCards={this.getAllCalendarCards}
                                    selectedCardTitle={selectedCardTitle}
                                    selectedCards={selectedCards}/>
                    }
            </div>
        )
    }
}

export default Calendar;