import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

// components
import GenericResourceRequirements from './need_row/GenericResourceRequirements.js';
import LanguageResourceRequirements from './need_row/LanguageResourceRequirements.js';

// utilities
import _ from 'lodash';
import moment from 'moment';

export default class NeedRow extends Component {
  render() {
    const n = this.props.need,
              RequirementsComponent = this.requirementsComponent();
    return(
      <tr className='need' onClick={this.showSearchModal}>
        <td>
          {_.capitalize(n.type)}
        </td>
        <td className='centered-text'>
          {!_.isEmpty(n.requirements) &&
            <RequirementsComponent requirements={n.requirements} />
          }
        </td>
        <td>
          {moment(n.created_at).format('MMMM Do YYYY, h:mm a')}
        </td>
        <td>
          <Glyphicon glyph="glyphicon glyphicon-remove" onClick={this.deleteNeed} />
        </td>
      </tr>
    )
  }

  deleteNeed = (e) => {
    e.stopPropagation();
    const p = this.props;
    p.delete(p.need.id);
  }

  showSearchModal = () => {
    const p = this.props,
          activeModalTab = _.isEmpty(p.need.resources) ? 1 : 2;
    p.showSearchModal(p.need.id, activeModalTab);
  }

  requirementsComponent = () => {
    let Component;
    switch (this.props.need.type) {
      case 'interpreter':
      case 'translator':
        Component = LanguageResourceRequirements;
        break;
      default:
        Component = GenericResourceRequirements;
    }
    return Component;
  }
}