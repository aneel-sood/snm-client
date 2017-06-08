import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchClient, createClientNeed, updateClientNeed, deleteClientNeed } from '../store/actions.js'

import ResourceSearch from './ResourceSearch.js'
import ClientBio from './client_needs/ClientBio.js'

import { Button } from 'react-bootstrap';
import '../stylesheets/ClientNeeds.css';



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
          <div className='client-needs'>
            <ClientBio client={client} />
            <div className='needs'>
              <Button bsStyle="info" onClick={this.addNeed}>New Need</Button>
              {
                client.needs.map((n) => {
                  return <ResourceSearch key={n.id} need={n} updateNeed={this.updateNeed} 
                    removeNeed={this.deleteNeed} />
                })
              }
            </div>
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