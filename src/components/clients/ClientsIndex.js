import React, { Component } from 'react';
import ClientRow from './ClientRow.js'
import { Table } from 'react-bootstrap';

export default class ClientsIndex extends Component {
  render() {
    const p = this.props;
    return(
      <Table striped condensed hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            p.clients.map((client) => {
              return <ClientRow key={ client.id } client={ client } delete={p.delete} />
            })
          }
        </tbody>
      </Table>
    )
  }
}