import React, { Component } from 'react';
import ProviderListItem from './ProviderListItem.js'

export default class Results extends Component {
  render() {  
    return(
      <ul className='results'>
        {this.props.loaded && 
          this.props.providers.map((p) => { 
            return(<ProviderListItem key={p.id} provider={p} />)
          })
        }
      </ul>
    )
  }
}