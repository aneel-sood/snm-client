import React, { Component } from 'react';
import _ from 'lodash';

export default class Need extends Component {
  render() {
    const need = this.props.need;
    return (
      <div className='need'>
        <h5>Type: {need.type}</h5>
        <p>Requirements</p>
        {
          this.requirementKeys().map((key) => {
            return <p key={key}>{key}: {need.requirements[key]}</p>
          })
        }
      </div>
    );
  }

  requirementKeys() {
    const requirements = this.props.need.requirements;
    return _.keys(requirements);
  }
}