import React, { Component, Fragment } from "react";

import CreateInvitation from "../CreateInvitation";
import Events from "./Events";
import Loader from "../Loader";

import { withContext } from "../../context/AppStateProvider";

class Invitation extends Component {
  async componentDidMount() {
    const {
      getAvailablesEvents,
      getAvailablesEventsDatesJSON,
      toggleAppLoading
    } = this.props.actions;
    toggleAppLoading(true);
    await getAvailablesEvents();
    await getAvailablesEventsDatesJSON();
    toggleAppLoading(false);
  }

  render() {
    const { contextState, eventTitle, history, isAdmin } = this.props;
    const { appLoading, allEvents } = contextState;

    if (appLoading) return <Loader />;

    return (
      <Fragment>
        {/* {isAdmin && <CreateInvitation />} */}

        {allEvents.length === 0 ? (
          <p>Il n'y à pas d'invitations disponibles</p>
        ) : (
          <Events eventTitle={eventTitle} history={history} isAdmin={isAdmin} />
        )}
      </Fragment>
    );
  }
}

export default withContext(Invitation);
