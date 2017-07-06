import React, { Component } from 'react';
import ProviderRow from './ProviderRow.js'

import { Table } from 'react-bootstrap';

export default class ProvidersIndex extends Component {
  render() {
    const p = this.props;
    return(
      <Table striped condensed hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {
            p.providers.map((provider) => {
              return <ProviderRow key={ provider.id } provider={ provider } />
            })
          }
        </tbody>
      </Table>
    )
  }
}