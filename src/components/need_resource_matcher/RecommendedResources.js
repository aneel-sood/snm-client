import React, { Component } from 'react';
import ResourceProvider from './recommended_resources/ResourceProvider.js';

export default class RecommendedResources extends Component {

  render() {
    const p = this.props;
    return (
      <div className='recommended-resources'>
        <h5 className='title'>Recommended Resources</h5>
        <ul>
          {p.resourcesByProvider.map((provider) => { 
            return <ResourceProvider key={provider.id} provider={provider} 
              saveMatchState={p.saveMatchState}/>
          })}
        </ul>
      </div>
    )
  }
}