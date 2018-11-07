import React, { Component, createContext } from 'react';
import axios from 'axios';

const { Consumer, Provider } = createContext();

export const withContext = Comp => props => (
    <Consumer>
        {context => <Comp {...context} {...props} />}
    </Consumer>
)

export class MyProvider extends Component {

    state = {
        appLoading: false,
        modalLoading: false,

        invitations: [],

        allEvents: [],
        availablesEvents: [],

        selectedEventOnEventsList: [],
        selectedEventOnEventsListId: '',

        endDates: [],
        startDates: [],

        isCalendarModalOpen: false,

        selectedEventOnCalendar: [],
        selectedEventOnCalendarTitle: '',
        selectedEventOnCalendarType: '',
    }

    getAvailablesEvents = async () => {
        const request = await axios.get('/invitations/availables').catch(err => console.log(err));
        const allEvents = await request.data;
        this.setState({ allEvents })
    }

    getAvailablesEventsDatesJSON = async () => {
        const request = await axios.get('/invitations/availables/dates');
        const availablesEvents = await request.data;

        this.setState({ availablesEvents });
    }

    selectEvent = (item) => {
        this.setState({ selectedEventOnEventsList: [item], selectedEventOnEventsListId: item._id });
    }

    removeEvent = async (id) => {
        await axios.get(`/invitations/delete/${id}`).catch(err => console.log(err));
        await this.getAvailablesEvents();
        await this.getAvailablesEventsDatesJSON();
        await this.resetSelectedEvent();
    }

    resetSelectedEvent = () => {
        this.setState({ endDates: [], selectedEventOnEventsListId: '', startDates: [] });
    }

    toggleEventCheckToTrue = () => {
        axios.get(`/invitations/toggleEventCheckToTrue/${this.state.selectedEventOnEventsListId}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    addNewDatesInCalendar = async (eventTitle, history) => {
        const { endDates, selectedEventOnEventsListId, startDates } = this.state;
        const params = new URLSearchParams();
        params.append('title', eventTitle);
        params.append('startDates', startDates);
        params.append('endDates', endDates);
        params.append('invitationId', selectedEventOnEventsListId)

        await axios({
            method: 'post',
            url: '/calendar/add',
            data: params
        })
        .catch(err => console.log(err))

        history.push('/calendrier')
        await this.toggleEventCheckToTrue();
        await this.resetSelectedEvent();
    }

    filterDatesBeforeAddInCalendar = () => {
        const filteredDates = this.state.selectedEventOnEventsList.map(item => item.dates.split(','));

        const startDates = [];
        const endDates = [];

        filteredDates.forEach((fullDate, i) => {
            fullDate.forEach(date => {
                startDates.push(date.split('-')[0]);
                endDates.push(date.split('-')[1]);
            })
        });

        this.setState({ startDates, endDates });
    }

    handleAddNewDatesInCalendarSubmit = async (e, eventTitle, history) => {
        e.preventDefault();
        await this.filterDatesBeforeAddInCalendar();
        await this.addNewDatesInCalendar(eventTitle, history);
    }

    openCalendarModal = () => {
        this.setState({ isCalendarModalOpen: true });
    }

    closeCalendarModal = () => {
        this.setState({ isCalendarModalOpen: false });
    }

    handleClickOnEventOnCalendar = async (selectedEvent) => {
        const { _id, invitationId, title } = selectedEvent;
        let request;
        let selectedEventOnCalendarType;

        // ? IF === Si c'est des dates séléctionnées depuis l'interface (les custom event n'ont pas d'invitationId)
        if (invitationId) {
            selectedEventOnCalendarType = 'invitation';
            request = await axios.get(`/calendar/cardsByInvitationId/${invitationId}`);
        } else {
            // ? ELSE === Si c'est des dates créées depuis l'interface admin
            selectedEventOnCalendarType = 'customEvent';
            request = await axios.get(`/calendar/cardById/${_id}`);
        }

        const selectedEventOnCalendar = await request.data;

        this.setState({ selectedEventOnCalendarType, selectedEventOnCalendar, selectedEventOnCalendarTitle: title });
    }

    toggleModalLoading = (boolean) => {
        this.setState({ modalLoading: boolean });
    }

    toggleAppLoading = (boolean) => {
        this.setState({ appLoading: boolean })
    }

    render() {
        const {
            appLoading, modalLoading,
            allEvents, availablesEvents,
            isCalendarModalOpen, selectedEventOnEventsListId, selectedEventOnCalendar, selectedEventOnCalendarTitle, selectedEventOnCalendarType,
        } = this.state;
        return (
            <Provider value={{
                calendar: {
                    state: {
                        isCalendarModalOpen,
                        selectedEventOnCalendar,
                        selectedEventOnCalendarTitle,
                        selectedEventOnCalendarType
                    },
                    actions: {
                        openCalendarModal: this.openCalendarModal,
                        closeCalendarModal: this.closeCalendarModal
                    }
                },
                contextState: {
                    appLoading,
                    modalLoading,
                    allEvents,
                    availablesEvents,
                    selectedEventOnEventsListId,
                },
                actions: {
                    getAvailablesEvents: this.getAvailablesEvents,
                    getAvailablesEventsDatesJSON: this.getAvailablesEventsDatesJSON,
                    removeEvent: this.removeEvent,
                    selectEvent: this.selectEvent,
                    openCalendarModal: this.openCalendarModal,
                    handleClickOnEventOnCalendar: this.handleClickOnEventOnCalendar,
                    handleAddNewDatesInCalendarSubmit: this.handleAddNewDatesInCalendarSubmit,
                    resetSelectedEvent: this.resetSelectedEvent,
                    toggleAppLoading: this.toggleAppLoading,
                    toggleModalLoading: this.toggleModalLoading
                }
            }}>
                {this.props.children}
            </Provider>
        )
    }
}