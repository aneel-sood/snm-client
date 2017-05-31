import React, { Component } from 'react';
import { fetchClient, createClientNeed, updateClientNeed, deleteClientNeed } from '../store/actions.js'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';

import ResourceSearch from './ResourceSearch.js'

class ClientNeeds extends Component {
  constructor(props) {
    super(props);
    this.addNeed = this.addNeed.bind(this);
    this.updateNeed = this.updateNeed.bind(this);
    this.deleteNeed = this.deleteNeed.bind(this);
  }

  render() {  
    const p = this.props,
          client = p.client;
    return(
      <div>
        {p.clientLoaded && 
          <div>
            <h4>Newcomer: {client.first_name} {client.last_name}</h4>
            <Button bsStyle="info" onClick={this.addNeed}>New Need</Button>
            {
              client.needs.map((n) => {
                return <ResourceSearch key={n.id} need={n} updateNeed={this.updateNeed} 
                  removeNeed={this.deleteNeed} />
              })
            }
          </div>
        }
      </div>
    )
  }

  fetchData(id=1) {
    this.props.dispatch(fetchClient(id));
  }

  componentWillMount() { // this is probably no longer necessary after the clients index page is created
    this.props.dispatch(fetchClient(1));
  }

  addNeed(event) {
    const p = this.props;
    p.dispatch(createClientNeed(p.client.id));
  }

  updateNeed(requirementsParams, needId) {
    const p = this.props;
    p.dispatch(updateClientNeed(p.client.id, needId, requirementsParams));
  }

  deleteNeed(needId) {
    const p = this.props;
    p.dispatch(deleteClientNeed(p.client.id, needId));
  }
}

const mapStateToProps = (state) => {
  return {
    client: state.clients.items[1],
    clientLoaded: state.clients.loaded
  }
}

export default connect(
  mapStateToProps
)(ClientNeeds);