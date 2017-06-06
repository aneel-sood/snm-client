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
          clientId = p.match.params.id,
          client = p.clientsById[clientId];
    return(
      <div>
        {client && client.loaded &&
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

  componentWillMount() { 
    const clientId = this.props.match.params.id;
    this.props.dispatch(fetchClient(clientId));
  }

  addNeed(event) {
    const p = this.props,
          clientId = this.props.match.params.id;
    p.dispatch(createClientNeed(clientId));
  }

  updateNeed(requirementsParams, needId) {
    const p = this.props,
              clientId = this.props.match.params.id;
    p.dispatch(updateClientNeed(clientId, needId, requirementsParams));
  }

  deleteNeed(needId) {
    const p = this.props,
              clientId = this.props.match.params.id;
    p.dispatch(deleteClientNeed(clientId, needId));
  }
}

const mapStateToProps = (state) => {
  return {
    clientsById: state.clients.byId
  }
}

export default connect(
  mapStateToProps
)(ClientNeeds);