import React, { Component } from 'react';

export default class ClientBio extends Component {
  render() {
    const client = this.props.client;
    return (
      <div className='bio'>
        <h5>{client.first_name} {client.last_name}</h5>
        <span>Email: {client.email}</span>
      </div>
    );
  }
}