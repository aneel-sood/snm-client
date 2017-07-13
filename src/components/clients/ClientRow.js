import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';

export default class ClientRow extends Component {
  render() {
    const c = this.props.client;
    return(
      <tr>
        <td>
          <Link to={`/client/${c.id}`}>
            {c.first_name} {c.last_name}
          </Link>
        </td>
        <td className='centered-text'>
          {c.email}
        </td>
        <td>
          <Glyphicon glyph="glyphicon glyphicon-remove" onClick={this.delete} />
        </td>
      </tr>
    )
  }

  delete = () => {
    const p = this.props;
    p.delete(p.client.id);
  }
}