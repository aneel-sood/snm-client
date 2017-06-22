import React, { Component } from 'react';
import _ from 'lodash';
import { Glyphicon } from 'react-bootstrap';

export default class Need extends Component {
  render() {
    const need = this.props.need;
    return (
      <div className='need'>
        <Glyphicon glyph="glyphicon glyphicon-remove" onClick={this.deleteNeed} />
        <div onClick={this.showSearchModal}>
          <h4>Need Type: {need.type}</h4>
          <h5>Requirements:</h5>
          {
            this.requirementKeys().map((key) => {
              return <p key={key}>{key}: {need.requirements[key]}</p>
            })
          }
          {need.resources.length > 0 &&
            <div>
              <h5>Resources:</h5>
              <ul>
              {
                need.resources.map((r) => {
                  return <li key={r.resource.id}>{r.resource.type}</li>
                })
              }
              </ul>
            </div>
          }
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

  requirementKeys() {
    const requirements = this.props.need.requirements;
    return _.keys(requirements);
  }
}