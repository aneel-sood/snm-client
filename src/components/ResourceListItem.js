import React, { Component } from 'react';
import _ from 'lodash/string';
import '../stylesheets/ResourceListItem.css';

export default class ResourceListItem extends Component {

  render() {
    const p = this.props.vals;
    return (
      <li className='resource'>
        <div>
          <span className='type'>{ _.capitalize(p.type) }</span><br />
          <span className='full-name'>{p.provider.first_name} {p.provider.last_name}</span><br />
          <span className='email'>{p.provider.email} </span>
        </div>
      </li>
    )
  }

}