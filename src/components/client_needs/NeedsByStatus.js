import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import _ from 'lodash';

// store
import { connect } from 'react-redux';
import { createClientNeed, updateClientNeed, deleteClientNeed } 
  from '../../store/actions/needActions.js';

// components 
import NeedOverview from './NeedOverview.js';
import NeedResourceMatcher from '../NeedResourceMatcher.js';


class NeedsByStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSearchModal: false,
      activeNeedId: undefined    
    } 
  }

  render() {
    const s = this.state,
      needs = {
        withoutResources: this.withoutResources(),
        withPotentialResources: this.withPotentialResources(),
        withPendingResources: this.withPendingResources(),
        withFulfillingResources: this.withFulfillingResources()
      }, 
      headers = {
        withoutResources: "Needs Without Matched Resources (" + needs.withoutResources.length + ")",
        withPotentialResources: "Needs With Matched Resources (" + needs.withPotentialResources.length + ")",
        withPendingResources: "Needs With Pending Resources (" + needs.withPendingResources.length + ")",
        withFulfillingResources: "Needs Fulfilled (" + needs.withFulfillingResources.length + ")"
      }

    return (
      <div className='needs modal-container'>
        <Button bsStyle="info" onClick={this.addNeed}>New Need</Button>
        <Panel header={headers.withoutResources} bsStyle="primary">
          {needs.withoutResources.map((n, i) => {
            return <NeedOverview key={n.id} need={n} delete={this.deleteNeed} index={i+1} 
                      showSearchModal={this.showSearchModal}/>})}
        </Panel>
        <Panel header={headers.withPotentialResources} bsStyle="success">
          {needs.withPotentialResources.map((n, i) => {
            return <NeedOverview key={n.id} need={n} delete={this.deleteNeed} index={i+1} 
                      showSearchModal={this.showSearchModal}/>})}
        </Panel>
        <Panel header={headers.withPendingResources} bsStyle="info">
          {needs.withPendingResources.map((n, i) => {
            return <NeedOverview key={n.id} need={n} delete={this.deleteNeed} index={i+1} 
                      showSearchModal={this.showSearchModal}/>})}
        </Panel>
        <Panel header={headers.withFulfillingResources} bsStyle="warning">
          {needs.withFulfillingResources.map((n, i) => {
            return <NeedOverview key={n.id} need={n} delete={this.deleteNeed} index={i+1} 
                      showSearchModal={this.showSearchModal}/>})}
        </Panel>
        {s.showSearchModal &&
          <NeedResourceMatcher show={s.showSearchModal} onHide={this.closeSearchModal} 
            modalContainer={this} need={this.getNeedById(s.activeNeedId)} updateNeed={this.updateNeed} 
            deleteNeed={this.deleteNeed}/>
        }
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const p = this.props,
          newNeed = _.find(p.needs, (n) => {return n.type === ''});

    if (newNeed && !prevState.showSearchModal) {
      this.setState({ activeNeedId: newNeed.id, showSearchModal: true});
    }
  }

  // Need CRUD Methods
  addNeed = (event) => {
    const p = this.props;
    p.dispatch(createClientNeed(p.clientId));
  }  

  updateNeed = (requirementsParams, needId) => {
    const p = this.props;

    console.log('posting need update with requirements...')
    console.log(requirementsParams.requirements)
    p.dispatch(updateClientNeed(p.clientId, needId, requirementsParams));
  }

  deleteNeed = (needId) => {
    const p = this.props;
    p.dispatch(deleteClientNeed(p.clientId, needId));
  }

  // Matcher Modal Methods
  showSearchModal = (needId) => {
    this.setState({ activeNeedId: needId, showSearchModal: true });
  }

  closeSearchModal = () => {
    this.setState({ showSearchModal: false });
    const s = this.state,
          closedNeed = this.getNeedById(s.activeNeedId);
    if (closedNeed.type === '') {
      this.deleteNeed(closedNeed.id)
    }
  }

  // Need Filtering Methods
  withoutResources() {
    const needs = _.filter(this.props.needs, (n) => {
      return n.resources.length === 0
    });
    return needs;
  }

  withPotentialResources() {
    const needs = _.filter(this.props.needs, (n) => {
      return _.find(n.resources, (r) => {return !r.pending && !r.fulfilled});
    });
    return needs;
  }

  withPendingResources() {
    const needs = _.filter(this.props.needs, (n) => {
      return _.find(n.resources, (r) => {return r.pending});
    });
    return needs;
  }

  withFulfillingResources() {
    const needs = _.filter(this.props.needs, (n) => {
      return _.find(n.resources, (r) => {return r.fulfilled});
    });
    return needs;
  }

  // Helper methods
  getNeedById = (id) => {
    const need = _.find(this.props.needs, (n) => {return n.id === id});
    return need;
  }
}

const mapStateToProps = (state) => {
  return {
    loaded: state.needs.loaded,
    clientId: state.needs.clientId,
    needs: state.needs.index
  }
}

export default connect(mapStateToProps)(NeedsByStatus);