import React, { Component } from 'react';
import _ from 'lodash';

export default class ResourceRow extends Component {
  render() {
    const r = this.props.resource;
    return(
      <tr>
        <td>
          {_.capitalize(r.type)}
        </td>
        <td className='centered-text'>
          {this.detailsText()}
        </td>
        <td className='centered-text'>
          {r.provider.first_name} {r.provider.last_name}
        </td>
      </tr>
    )
  }

  detailsText = () => {
    const r = this.props.resource;
    let text = "";
    _.forOwn(r.details, (value, key) => {
      text = text + key + ": " + value + "; "
    })
    return text
  }
}