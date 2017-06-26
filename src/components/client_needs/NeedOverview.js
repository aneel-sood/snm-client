import React, { Component } from 'react';
import _ from 'lodash';
import { Glyphicon } from 'react-bootstrap';

export default class NeedOverview extends Component {
  render() {
    const p = this.props,
          need = p.need;
    return (
      <div className='need'>
        <Glyphicon glyph="glyphicon glyphicon-remove" onClick={this.deleteNeed} />
        <div onClick={this.showSearchModal}>
          <h4 className='type-title'>{p.index}. {_.capitalize(need.type)}</h4>
        </div>
      </div>
    )
  }

  deleteNeed = () => {
    const p = this.props;
    p.delete(p.need.id);
  }

  showSearchModal = () => {
    const p = this.props;
    p.showSearchModal(p.need.id);
  }
}