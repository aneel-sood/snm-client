import React, { Component } from 'react';
import ProviderListItem from './ProviderListItem.js'

export default class Results extends Component {
  render() {
    const p = this.props,
          responseLoaded = p.searchResponse.loaded,
          providerResources = p.searchResponse.result;
    return(
      <ul className='results'>
        {responseLoaded && 
          providerResources.map((provider) => { 
            return(<ProviderListItem key={provider.id} provider={provider} />)
          })
        }
      </ul>
    )
  }
}