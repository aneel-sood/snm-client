import React, { Component } from 'react';

export default class Results extends Component {
  render() {  
    return(
      <ul className='results'>
        {this.props.loaded && 
          this.props.providers.map((p) => { 
            return (
              <li className='provider' key={p.id}>
                <div>
                  <span className='full-name'>{p.first_name} {p.last_name}</span><br />
                  <span className='email'>{p.email} </span>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}