import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchClients } from '../store/actions.js'
import ClientsIndex from './clients/ClientsIndex.js'

class Clients extends Component {

  render() {
    const p = this.props;
    return(
      <div className='clients content'>
        <h3 className='title'>Clients</h3>
        { p.clientsLoaded &&
          <ClientsIndex clients={p.clients} />
        }
      </div>
    )
  }

  componentWillMount() {
    this.props.dispatch(fetchClients());
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