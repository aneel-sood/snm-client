import React, { Component } from 'react';
import ClientOverviewRow from './ClientOverviewRow.js'

import { Table } from 'react-bootstrap';

export default class ClientNeedsOverview extends Component {
  render() {
    const p = this.props;
    return(
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Pending Needs</th>
            <th>Fulfilled Needs</th>
            <th>Last Resource Bookmark</th>
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