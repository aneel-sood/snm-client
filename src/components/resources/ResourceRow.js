import React, { Component } from 'react';
import CustomToggle from '../shared/CustomToggle.js';
import { Glyphicon, Dropdown, MenuItem } from 'react-bootstrap';
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

  detailsText = () => {
    const r = this.props.resource;
    let text = "";
    _.forOwn(r.details, (value, key) => {
      text = text + key + ": " + value + "; "
    })
    return text
  }

  delete = () => {
    const p = this.props;
    p.delete(p.resource.id);
  }

  update = () => {
    const p = this.props;
    p.showUpdateModal(p.resource);
  }
}