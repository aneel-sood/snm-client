import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ClientOverviewRow extends Component {
  render() {
    const c = this.props.client;
    return(
      <tr>
        <td>
          <Link to={`/client/${c.id}`}>
          {c.first_name} {c.last_name}
          </Link>
        </td>
        <td>{c.pending_needs_count}</td>
        <td>{c.fulfilled_needs_count}</td>
        <td>{this.bookmarkDateStr()}</td>
      </tr>
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