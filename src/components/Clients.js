import React, { Component } from 'react'

// components
import ClientsIndex from './clients/ClientsIndex.js'
import CrupdateModal from './clients/CrupdateModal.js'

// redux
import { connect } from 'react-redux'
import { fetchClients, createClient, updateClient, deleteClient } from '../store/actions.js'

// styles
import { Button } from 'react-bootstrap'

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showCrupdateModal: false,
      activeClient: {}
    } 
  }

  render() {
    const p = this.props, s = this.state;
    return(
      <div className='clients content'>
        <Button bsStyle="primary" onClick={this.showCrupdateModal}>New Client</Button>
        <h3 className='title'>Clients</h3>
        { p.clientsLoaded &&
          <ClientsIndex clients={p.clients} delete={this.deleteClient} 
            showUpdateModal={this.showCrupdateModal} />
        }
        <CrupdateModal record={s.activeClient} create={this.createClient} 
          update={this.updateClient} show={s.showCrupdateModal} 
          hide={this.hideCrupdateModal} recordType={'Client'} />
      </div>
    )
  }

  componentWillMount() {
    this.props.dispatch(fetchClients());
  }

  createClient = (params) => {
    this.props.dispatch(createClient(params));
  }

  updateClient = (params) => {
    const id = params.id;
    delete params.id;
    this.props.dispatch(updateClient(id, params));
  }

  deleteClient = (id) => {
    this.props.dispatch(deleteClient(id));
  }

  showCrupdateModal = (client={}) => {
    this.setState({ showCrupdateModal: true, activeClient: client })
  } 

  hideCrupdateModal = () => {
    this.setState({ showCrupdateModal: false })
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