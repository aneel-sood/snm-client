import React, { Component } from 'react';
import { fetchAllResources } from '../store/actions.js'
import { connect } from 'react-redux'

class ResourceSearch extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAllResources());
  }

  renderResults() {
    const resources = this.props.resources;
    if (typeof resources === 'undefined' || resources.length === 0) {
      return (
        <p>Waiting...</p>
      )
    } else {
      return (
        this.props.resources.map(
          (r) => <p>{r.type}: {r.provider.first_name} {r.provider.last_name}</p>
        )
      )
    }
  }

  render() {
    return (
      <div>
        <p>Resoure Search...</p>
        {this.renderResults()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    resources: state.resources.resources
  }
}

export default connect(
  mapStateToProps
)(ResourceSearch);