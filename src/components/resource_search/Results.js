import React, { Component } from 'react';
import ProviderListItem from './ProviderListItem.js'

export default class Results extends Component {
  render() {
    return(
      <ul className='results'>
        {this.props.loaded && 
          this.props.searchResults.map((provider) => { 
            return(<ProviderListItem key={provider.id} provider={provider} />)
          })
        }
      </ul>
    )
  }
}