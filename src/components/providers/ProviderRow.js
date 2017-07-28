import React, { Component } from 'react';
import CustomToggle from '../shared/CustomToggle.js';
import { Glyphicon, Dropdown, MenuItem } from 'react-bootstrap';

export default class ProviderRow extends Component {
  render() {
    const p = this.props.provider;
    return(
      <tr>
        <td>
          {p.first_name} {p.last_name}
        </td>
        <td className='centered-text'>
          {p.email}
        </td>
        <td>
          <Dropdown id='action-menu' pullRight>
          <CustomToggle bsRole="toggle">
            <Glyphicon glyph="option-vertical" /> 
          </CustomToggle>
          <Dropdown.Menu>
            <MenuItem eventKey="1" onClick={this.update}>
              <span>Update</span>
            </MenuItem>
            <MenuItem eventKey="2" onClick={this.delete}>
              <span>Delete</span>
            </MenuItem>
          </Dropdown.Menu>
        </Dropdown>
        </td>
      </tr>
    )
  }

  delete = () => {
    const p = this.props;
    p.delete(p.provider.id);
  }

  update = () => {
    const p = this.props;
    p.showUpdateModal(p.provider);
  }
}