import React, { Component } from 'react';
import Resource from './Resource.js';

export default class ProviderListItem extends Component {
  render() {  
    const p = this.props;
    return(
      <li className='provider'>
        <div>
          <span className='full-name'>{p.provider.first_name} {p.provider.last_name}</span><br />
          <span className='email'>{p.provider.email} </span>
        </div>
        <div className='resources'>
          <ul>
            {
              p.provider.resources.map((r) => { 
                return (
                  <Resource key={r.id} resource={r} bookmarkResource={p.bookmarkResource} />
                )
              })
            }
          </ul>
        </div>
      </li>
    )
  }
}