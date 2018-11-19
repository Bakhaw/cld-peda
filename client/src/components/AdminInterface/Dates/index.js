import React, { Component, Fragment } from "react";
import AddDates from "./AddDates";
import Invitations from "../../Invitations";

class Dates extends Component {
  render() {
    return (
      <Fragment>
        <AddDates />
        <Invitations isAdmin={true} />
      </Fragment>
    );
  }
}

export default Dates;
