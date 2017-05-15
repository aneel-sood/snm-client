import React, { Component } from 'react';
import { fetchAllResources } from '../store/actions.js'
import { connect } from 'react-redux'

class ResourceSearch extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAllResources());
  }

  render() {
    const loaded = this.props.resourcesLoaded;
    return (
      <div>
        <p>Resoure Search...</p>
        {loaded ? <ul>{this.renderIndex()}</ul> : <p>Wait...</p>}
      </div>
    );
  }

  renderIndex() {
    return(
      this.props.resources.map((r) =>
        <li key={r.id}>
          {r.type}: {r.provider.first_name} {r.provider.last_name}
        </li>
      )
    )
  }
}

const mapStateToProps = (state) => {
  return {
    resources: state.resources.index,
    resourcesLoaded: state.resources.loaded
  }
}

export default connect(
  mapStateToProps
)(ResourceSearch);