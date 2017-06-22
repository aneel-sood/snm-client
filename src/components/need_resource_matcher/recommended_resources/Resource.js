import React, { Component } from 'react';

export default class Resource extends Component {
  render() {
    const r = this.props.resource;
    return (
      <li className="resource">
        {
          Object.keys(r.details).map((key, i) => {
            return (
              <p key={i}>{key}: {r.details[key].toString()}</p>
            )
          })
        }
      </li>
    );
  }
}