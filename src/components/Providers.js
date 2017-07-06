import React, { Component } from 'react'

// components
import ProvidersIndex from './providers/ProvidersIndex.js'
import NewProvider from './providers/NewProvider.js'

// redux
import { connect } from 'react-redux'
import { fetchProviders, createProvider } from '../store/actions.js'

// styles
import { Modal, Button } from 'react-bootstrap'

class Providers extends Component {
  constructor(props) {
    super(props);
    this.state = { showNewProviderModal: false } 
  }

  render() {
    const p = this.props, s = this.state;
    return(
      <div className='providers content'>
        <Button bsStyle="primary" onClick={this.showNewProviderModal}>New Provider</Button>
        <h3 className='title'>Providers</h3>
        { p.providersLoaded &&
          <ProvidersIndex providers={p.providers} />
        }
        <Modal show={s.showNewProviderModal} onHide={this.hideNewProviderModal}>
          <Modal.Header closeButton>
            <h4>New Provider</h4>
          </Modal.Header>
          <Modal.Body>
            <NewProvider create={this.createProvider}/>
          </Modal.Body>
        </Modal>
      </div>
    )
  }

  componentWillMount() {
    this.props.dispatch(fetchProviders());
  }

  createProvider = (params) => {
    this.props.dispatch(createProvider(params));
  }

  showNewProviderModal = () => {
    this.setState({ showNewProviderModal: true })
  } 

  hideNewProviderModal = () => {
    this.setState({ showNewProviderModal: false })
  } 
}

const mapStateToProps = (state) => {
  return {
    providers: state.providers.index,
    providersLoaded: state.providers.loaded
  }
}

export default connect(
  mapStateToProps
)(Providers);