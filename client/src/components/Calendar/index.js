import React, { Component, Fragment } from 'react'
import axios from 'axios';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

import EventInfosModal from './EventInfosModal';
import Loader from '../Loader';

import { withContext } from '../../context/AppStateProvider';

import 'react-big-calendar/lib/css/react-big-calendar.css';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: { // ? modifie les keys par leur valeur, ex: month devient Mois, dans l'affichage du Calendrier
                month: 'Mois',
                week: 'Semaine',
                day: 'Jour',
                today: "Aujourd'hui",
                previous: '<',
                next: '>',
            },
            calendarCards: [],
        }
        this.localizer = BigCalendar.momentLocalizer(moment);
    }

    async componentDidMount() {
        const { toggleAppLoading } = this.props.actions;

        toggleAppLoading(true);
        await this.getAllCalendarCards();
        toggleAppLoading(false);
    }

    getAllCalendarCards = async () => {
        const request = await axios.get('/calendar');
        const calendarCards = await request.data;

        this.setState({ calendarCards });
    }

    openCalendarModal = async (e) => {
        const { handleClickOnEventOnCalendar, openCalendarModal, toggleModalLoading } = this.props.actions;
        toggleModalLoading(true);
        openCalendarModal();
        await handleClickOnEventOnCalendar(e);
        toggleModalLoading(false);
    }

    render() {
        const { calendarCards, messages } = this.state;
        const { contextState } = this.props;

        const { appLoading } = contextState;

        if (appLoading) return <Loader />;

        return (
            <Fragment>
                <BigCalendar culture='fr-FR'
                    defaultView='month'
                    endAccessor='end'
                    events={calendarCards}
                    localizer={this.localizer}
                    messages={messages}
                    onSelectEvent={this.openCalendarModal}
                    startAccessor='start'
                    views={['month', 'week']} />

                <EventInfosModal getAllCalendarCards={this.getAllCalendarCards} />
            </Fragment>
        )
    }
}

export default withContext(Calendar);