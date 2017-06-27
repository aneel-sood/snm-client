import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchDashboardClientData } from '../store/actions.js'
import ClientNeedsOverview from './dashboard/ClientNeedsOverview.js'
import _ from 'lodash'
import '../stylesheets/Dashboard.css';

class Dashboard extends Component {

  render() {
    const p = this.props;
    return(
      <div className='dashboard'>
        <h3 className='title'>Recent Activity</h3>
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