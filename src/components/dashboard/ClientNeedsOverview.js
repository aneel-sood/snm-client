import React, { Component } from 'react';
import ClientOverviewRow from './ClientOverviewRow.js'

import { Table } from 'react-bootstrap';

export default class ClientNeedsOverview extends Component {
  render() {
    const p = this.props;
    return(
      <Table striped condensed hover>
        <thead>
          <tr>
            <th>Client</th>
            <th>Without Matches</th>
            <th>With Matches</th>
            <th>Pending</th>
            <th>Fulfilled</th>
            <th>Recent Activty</th>
          </tr>
        </thead>
        <tbody>
          {
            p.clients.map((client) => {
              return <ClientOverviewRow key={ client.id } client={ client } />
            })
          }
        </tbody>
      </Table>
    )
  }
}