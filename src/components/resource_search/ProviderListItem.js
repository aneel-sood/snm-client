import React, { Component } from 'react';

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
                  <li key={r.id}>
                    {
                      Object.keys(r.details).map((key, i) => {
                        return (
                          <p key={i}>{key}: {r.details[key].toString()}</p>
                        )
                      })
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>
      </li>
    )
  }
}