import React, { Component } from 'react';

export default class ProviderRow extends Component {
  render() {
    const p = this.props.provider;
    return(
      <tr>
        <td>
          {p.first_name} {p.last_name}
        </td>
        <td className='centered-text'>
          {p.email}</td>
      </tr>
    )
  }
}