import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Glyphicon } from 'react-bootstrap';

export default class NeedRow extends Component {
  render() {
    const n = this.props.need;
    return(
      <tr className='need' onClick={this.showSearchModal}>
        <td>
          {_.capitalize(n.type)}
        </td>
        <td className='centered-text'>
          {this.requirementsText()}
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

  requirementsText = () => {
    const n = this.props.need;
    let text = "";
    _.forOwn(n.requirements, (value, key) => {
      text = text + key + ": " + value + "; "
    })
    return text
  }
}