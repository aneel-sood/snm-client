import React, { Component } from 'react'

// components
import ClientsIndex from './clients/ClientsIndex.js'
import NewClient from './clients/NewClient.js'

// redux
import { connect } from 'react-redux'
import { fetchClients, createClient } from '../store/actions.js'

// styles
import { Modal, Button } from 'react-bootstrap'
import '../stylesheets/Clients.css'

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = { showNewClientModal: false } 
  }

  render() {
    const p = this.props, s = this.state;
    return(
      <div className='clients content'>
        <Button bsStyle="primary" onClick={this.showNewClientModal}>New Client</Button>
        <h3 className='title'>Clients</h3>
        { p.clientsLoaded &&
          <ClientsIndex clients={p.clients} />
        }
        <Modal show={s.showNewClientModal} onHide={this.hideNewClientModal}>
          <Modal.Header closeButton>
            <h4>New Client</h4>
          </Modal.Header>
          <Modal.Body>
            <NewClient create={this.createClient}/>
          </Modal.Body>
        </Modal>
      </div>
    )
  }

  componentWillMount() {
    this.props.dispatch(fetchClients());
  }

  createClient = (params) => {
    this.props.dispatch(createClient(params));
  }

  showNewClientModal = () => {
    this.setState({ showNewClientModal: true })
  } 

  hideNewClientModal = () => {
    this.setState({ showNewClientModal: false })
  } 
}

const mapStateToProps = (state) => {
  return {
    clients: state.clients.index,
    clientsLoaded: state.clients.indexLoaded
  }
}

export default connect(
  mapStateToProps
)(Clients);