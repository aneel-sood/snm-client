import React, { Component } from 'react';
import { fetchClient } from '../store/actions.js'
import { connect } from 'react-redux'

import ResourceSearch from './ResourceSearch.js'

class ClientNeeds extends Component {
  render() {  
    const p = this.props,
          client = p.clients[1];
    return(
      <div>
        {p.clientLoaded && 
          <div>
            <h4>Newcomer: {client.first_name} {client.last_name}</h4>
            <ResourceSearch />
            {
              client.needs.map((n) => {
                return <ResourceSearch key={n.id} need={n} />
              })
            }
          </div>
        }
      </div>
    )
  }

  fetchData(id=1) {
    this.props.dispatch(fetchClient(id));
  }

  componentWillMount() {
    this.props.dispatch(fetchClient(1));
  }
}

const mapStateToProps = (state) => {
  return {
    clients: state.clients.items,
    clientLoaded: state.clients.loaded
  }
}

export default connect(
  mapStateToProps
)(ClientNeeds);