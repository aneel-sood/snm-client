import React, { Component } from 'react';
import { fetchClient, createNeed } from '../store/actions.js'
import { connect } from 'react-redux'

import ResourceSearch from './ResourceSearch.js'

class ClientNeeds extends Component {
  constructor(props) {
    super(props);
    this.saveNewNeed = this.saveNewNeed.bind(this);
  }

  render() {  
    const p = this.props,
          client = p.client;
    return(
      <div>
        {p.clientLoaded && 
          <div>
            <h4>Newcomer: {client.first_name} {client.last_name}</h4>
            <ResourceSearch need={{id: this.tempNeedId()}} saveNeed={this.saveNewNeed} />
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

  saveNewNeed(requirementsParams) {
    const p = this.props;
    p.dispatch(createNeed(p.client.id, requirementsParams));
  }

  tempNeedId() {
    const allNeedIds = this.props.client.needs.map((n) => {return n.id}),
          currentMaxId = Math.max(...allNeedIds);

    return currentMaxId + 1;
  }
}

const mapStateToProps = (state) => {
  return {
    client: state.clients.items[1],
    clientLoaded: state.clients.loaded
  }
}

export default connect(
  mapStateToProps
)(ClientNeeds);