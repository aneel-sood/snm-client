import React, { Component } from 'react';
import ResourceRow from './ResourceRow.js'

import { Table } from 'react-bootstrap';

export default class ResourcesIndex extends Component {
  render() {
    const p = this.props;
    return(
      <Table striped condensed hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Details</th>
            <th>Provider</th>
          </tr>
        </thead>
        <tbody>
          {
            p.resources.map((resource) => {
              return <ResourceRow key={ resource.id } resource={ resource } />
            })
          }
        </tbody>
      </Table>
    )
  }
}