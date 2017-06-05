import React, { Component } from 'react';

export default class ClientOverviewRow extends Component {
  render() {
    const c = this.props.client;
    return(
      <li>{c.first_name} {c.last_name} {c.pending_needs_count} 
        {c.fulfilled_needs_count} {this.bookmarkDateStr()}</li>
    )
  }

  bookmarkDateStr() {
    const jsonDate = this.props.client.latest_resource_bookmark_datetime;
    let str;

    if (jsonDate) {
      str = new Date(jsonDate).toDateString()
    } else {
      str = 'n/a'
    }
    return str;
  }
}