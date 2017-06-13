import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClient, createClientNeed, updateClientNeed, deleteClientNeed } from '../store/actions.js';
import _ from 'lodash';

import Need from './client_needs/Need.js';
import ClientBio from './client_needs/ClientBio.js';
import ResourceSearch from './client_needs/ResourceSearch.js';

import { Button, Panel } from 'react-bootstrap';
import '../stylesheets/ClientNeeds.css';



class ClientNeeds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSearchModal: false,
      activeNeed: undefined
    } 

    this.addNeed = this.addNeed.bind(this);
    this.updateNeed = this.updateNeed.bind(this);
    this.deleteNeed = this.deleteNeed.bind(this);
    this.showSearchModal = this.showSearchModal.bind(this);
    this.closeSearchModal = this.closeSearchModal.bind(this);
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
              <Panel header="Not Matched to any Resource" bsStyle="primary">
                {
                  this.needsWithoutAnyMatchingResources().map((n) => {
                    return <Need key={n.id} need={n} showSearchModal={this.showSearchModal}/>
                  })
                }
              </Panel>
              <Panel header="Matched to Potential Resource(s)" bsStyle="success">
                {
                  this.needsWithPotentialResources().map((n) => {
                    return <Need key={n.id} need={n} showSearchModal={this.showSearchModal}/>
                  })
                }
              </Panel>
              <Panel header="Matched to Pending Resource(s)" bsStyle="info">
                {
                  this.needsWithPendingResources().map((n) => {
                    return <Need key={n.id} need={n} showSearchModal={this.showSearchModal}/>
                  })
                }
              </Panel>
              <Panel header="Fulfilled" bsStyle="warning">
                {
                  this.fulfilledNeeds().map((n) => {
                    return <Need key={n.id} need={n} showSearchModal={this.showSearchModal}/>
                  })
                }
              </Panel>
              {this.state.activeNeed &&
                <ResourceSearch show={this.state.showSearchModal} onHide={this.closeSearchModal} need={this.state.activeNeed} 
                  updateNeed={this.updateNeed} removeNeed={this.deleteNeed}/>
              }
            </div>
          </div>
        }
      </div>
    )
  }

  showSearchModal(needId) {
    const activeNeed = this.getNeedById(needId);
    this.setState({ activeNeed: activeNeed, showSearchModal: true });
  }

  closeSearchModal() {
    this.setState({ showSearchModal: false });
  }

  getNeedById(id) {
    const p = this.props,
          clientId = p.match.params.id,
          client = p.clientsById[clientId],
          need = _.find(client.needs, (n) => {return n.id === id});
    return need;
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