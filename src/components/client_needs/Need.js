import React, { Component } from 'react';
import _ from 'lodash';

export default class Need extends Component {
  constructor(props) {
    super(props);

    this.showSearchModal = this.showSearchModal.bind(this);
  }

  render() {
    const need = this.props.need;
    return (
      <div className='need' onClick={this.showSearchModal}>
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
                return <li>{r.resource.type}</li>
              })
            }
            </ul>
          </div>
        }
      </div>
    );
  }

  showSearchModal() {
    this.props.showSearchModal(this.props.need.id);
  }

  requirementKeys() {
    const requirements = this.props.need.requirements;
    return _.keys(requirements);
  }
}