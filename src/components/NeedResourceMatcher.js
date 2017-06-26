import React, { Component } from 'react';
import _ from 'lodash';

// store
import { fetchProviderResources } from '../store/actions.js';
import { saveNeedMatchState } from '../store/actions/needActions.js';
import { connect } from 'react-redux';

// Components
import NeedControls from './need_resource_matcher/NeedControls.js';
import RecommendedResources from './need_resource_matcher/RecommendedResources.js';

// Styles
import { Modal } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import '../stylesheets/NeedResourceMatcher.css';

class NeedResourceMatcher extends Component {
  render() {
    const p = this.props,
          resourceSearchResponse = p.searchResultsByNeedId[p.need.id],
          searchResponseInitialized = !_.isUndefined(resourceSearchResponse),
          resourcesLoaded = searchResponseInitialized && resourceSearchResponse.loaded,
          resourcesByProvider = searchResponseInitialized && resourceSearchResponse.result;
    return (
      <Modal show={p.show} onHide={p.onHide} container={p.modalContainer} bsSize='lg'
        aria-labelledby="contained-modal-title">
        <Modal.Header closeButton>
          <NeedControls need={p.need} updateNeed={p.updateNeed} 
            fetchResources={this.fetchResources} />
        </Modal.Header>
        <Modal.Body>
          {resourcesLoaded &&
            <RecommendedResources resourcesByProvider={resourcesByProvider} 
              saveMatchState={this.saveMatchState} />
          }
        </Modal.Body>
      </Modal>
    )
  }

  fetchResources = (needType, detailsParams) => {
    const p = this.props,
    params = {
      resource_type: needType,
      details: detailsParams
    }
    p.dispatch(fetchProviderResources(p.need.id, params));
  }

  saveMatchState = (resourceId, pending=false, fulfilled=false) => {
    const p = this.props;
    p.dispatch(saveNeedMatchState(resourceId, p.need.id, pending, fulfilled));
  }
}

const mapStateToProps = (state) => {
  return {
    searchResultsByNeedId: state.searchResultsByNeedId
  }
}

export default connect(
  mapStateToProps
)(NeedResourceMatcher);
