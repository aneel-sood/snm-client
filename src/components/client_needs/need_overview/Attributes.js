import React, { Component } from 'react';
import _ from 'lodash';

export default class Attributes extends Component {
  render() {
    const p = this.props;
    return (
      <div className='attributes'>    
        { !_.isEmpty(p.matchedResources) &&
          <div className='resource-match-kpis'>
            <span className='label'>10 Matche Resources</span>
            <span className='label'>Last State Change:</span>
          </div>
        }
      </div>
    )
  }

  
}

