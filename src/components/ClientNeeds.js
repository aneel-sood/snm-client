import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchClient, createClientNeed, updateClientNeed, deleteClientNeed } from '../store/actions.js'
import _ from 'lodash';

import Need from './client_needs/Need.js'
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
              <h5>Not Matched to any Resource</h5>
              {
                this.needsWithoutAnyMatchingResources().map((n) => {
                  return <Need key={n.id} need={n} />
                })
              }
              <h5>Matched to Potential Resource(s)</h5>
              {
                this.needsWithPotentialResources().map((n) => {
                  return <Need key={n.id} need={n} />
                })
              }
              <h5>Matched to Pending Resource(s)</h5>
              {
                this.needsWithPendingResources().map((n) => {
                  return <Need key={n.id} need={n} />
                })
              }
              <h5>Fulfilled</h5>
              {
                this.fulfilledNeeds().map((n) => {
                  return <Need key={n.id} need={n} />
                })
              }
              {/*
                client.needs.map((n) => {
                  return <ResourceSearch key={n.id} need={n} updateNeed={this.updateNeed} 
                    removeNeed={this.deleteNeed} />
                })
              */}
            </div>
          </div>
        }
      </div>
    )
  }

  needsWithoutAnyMatchingResources() {
    const p = this.props,
          clientId = p.match.params.id,
          client = p.clientsById[clientId],
          needs = _.filter(client.needs, (n) => {return n.resources.length === 0});
    return needs;
  }

  needsWithPotentialResources() {
    const p = this.props,
          clientId = p.match.params.id,
          client = p.clientsById[clientId],
          needs = _.filter(client.needs, (n) => {
            return _.find(n.resources, (r) => {return !r.pending && !r.fulfilled});
          });
    return needs;
  }

  needsWithPendingResources() {
    const p = this.props,
          clientId = p.match.params.id,
          client = p.clientsById[clientId],
          needs = _.filter(client.needs, (n) => {
            return _.find(n.resources, (r) => {return r.pending});
          });
    return needs;
  }

  fulfilledNeeds() {
    const p = this.props,
          clientId = p.match.params.id,
          client = p.clientsById[clientId],
          needs = _.filter(client.needs, (n) => {
            return _.find(n.resources, (r) => {return r.fulfilled});
          });
    return needs;
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