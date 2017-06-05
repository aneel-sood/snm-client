import React, { Component } from 'react';
import ClientOverviewRow from './ClientOverviewRow.js'

export default class ClientNeedsOverview extends Component {
  render() {
    const p = this.props;
    return(
      <ul>{
        p.clients.map((client) => {
          return <ClientOverviewRow key={ client.id } client={ client } />
        })
      }</ul>
    )
  }
}