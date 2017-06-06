import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchDashboardClientData } from '../store/actions.js'
import ClientNeedsOverview from './dashboard/ClientNeedsOverview.js'
import _ from 'lodash'

class Dashboard extends Component {

  render() {
    const p = this.props;
    return(
      <div>
        { p.clientDataLoaded &&
          <ClientNeedsOverview clients={p.clients} />
        }
      </div>
    )
  }

  componentWillMount() {
    this.props.dispatch(fetchDashboardClientData());
  }
}

const mapStateToProps = (state) => {
  return {
    clients: state.clients.dashboard.index,
    clientDataLoaded: state.clients.dashboard.loaded
  }
}

export default connect(
  mapStateToProps
)(Dashboard);