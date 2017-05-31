import React, { Component } from 'react';
import { fetchClient, createNeed } from '../store/actions.js'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';

import ResourceSearch from './ResourceSearch.js'

class ClientNeeds extends Component {
  constructor(props) {
    super(props);
    this.saveNewNeed = this.saveNewNeed.bind(this);
    this.addNewNeed = this.addNewNeed.bind(this);
  }

  render() {  
    const p = this.props,
          client = p.client;
    return(
      <div>
        {p.clientLoaded && 
          <div>
            <h4>Newcomer: {client.first_name} {client.last_name}</h4>
            <Button bsStyle="info" onClick={this.addNewNeed}>New Need</Button>
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

  componentWillMount() { // this is probably no longer necessary after the clients index page is created
    this.props.dispatch(fetchClient(1));
  }

  addNewNeed(event) {
    this.saveNewNeed({});
  }

  saveNewNeed(requirementsParams) {
    const p = this.props;
    p.dispatch(createNeed(p.client.id, requirementsParams));
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