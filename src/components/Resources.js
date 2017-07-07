import React, { Component } from 'react';

// components
import ResourcesIndex from './resources/ResourcesIndex.js';
import NewResource from './resources/NewResource.js';

// redux
import { connect } from 'react-redux';
import { fetchResources, createResource, fetchProviders } from '../store/actions.js';

// styles
import { Modal, Button } from 'react-bootstrap';

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = { showNewResourceModal: false } 
  }

  render() {
    const p = this.props, s = this.state;
    return(
      <div className='resources content'>
        <Button bsStyle="primary" onClick={this.showNewResourceModal}>New Resource</Button>
        <h3 className='title'>Resources</h3>
        { p.resourcesLoaded &&
          <ResourcesIndex resources={p.resources} />
        }
        <Modal show={s.showNewResourceModal} onHide={this.hideNewResourceModal}>
          <Modal.Header closeButton>
            <h4>New Resource</h4>
          </Modal.Header>
          <Modal.Body>
            {p.providersLoaded &&
              <NewResource create={this.createResource} providers={p.providers} />
            }
          </Modal.Body>
        </Modal>
      </div>
    )
  }

  componentWillMount() {
    this.props.dispatch(fetchResources());
    this.props.dispatch(fetchProviders());
  }

  createResource = (params) => {
    this.props.dispatch(createResource(params));
  }

  showNewResourceModal = () => {
    this.setState({ showNewResourceModal: true })
  } 

  hideNewResourceModal = () => {
    this.setState({ showNewResourceModal: false })
  } 
}

const mapStateToProps = (state) => {
  return {
    resources: state.resources.index,
    resourcesLoaded: state.resources.loaded,
    providers: state.providers.index,
    providersLoaded: state.providers.loaded
  }
}

export default connect(
  mapStateToProps
)(Resources);