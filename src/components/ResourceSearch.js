import React, { Component } from 'react';
import { fetchAllResources } from '../store/actions.js'
import { connect } from 'react-redux'
import '../stylesheets/ResourceSearch.css';

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
        <ul className='results'>
          {loaded ? this.renderIndex() : 'Wait...'}
        </ul>
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