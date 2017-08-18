import React, { Component } from 'react';
import _ from 'lodash';

// components
import GenericResourceDetails from './resource_row/GenericResourceDetails.js'
import LanguageResourceDetails from './resource_row/LanguageResourceDetails.js'
import { Glyphicon, Dropdown, MenuItem } from 'react-bootstrap';
import CustomToggle from '../shared/CustomToggle.js';

export default class ResourceRow extends Component {
  render() {
    const r = this.props.resource,
          DetailsComponent = this.detailsComponent();
    return(
      <tr>
        <td>
          {_.capitalize(r.type)}
        </td>
        <td className='centered-text'>
          <DetailsComponent details={r.details} />
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

  delete = () => {
    const p = this.props;
    p.delete(p.resource.id);
  }

  update = () => {
    const p = this.props;
    p.showUpdateModal(p.resource);
  }

  detailsComponent = () => {
    let Component;
    switch (this.props.resource.type) {
      case 'interpreter':
      case 'translator':
        Component = LanguageResourceDetails;
        break;
      default:
        Component = GenericResourceDetails;
    }
    return Component;
  }
}