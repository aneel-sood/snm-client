import React, { Component } from 'react';
import { fetchResources } from '../store/actions.js'
import { connect } from 'react-redux'
import '../stylesheets/ResourceSearch.css';
import ResourceListItem from './ResourceListItem.js'
import SearchControls from './SearchControls.js'

class ResourceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {type: 'translator'};
    this.typeSelected = this.typeSelected.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    this.fetch();
  }

  typeSelected(event) {
    this.setState({type: event.target.value});
  }

  search() {
    this.fetch();
  }

  fetch() {
    this.props.dispatch(fetchResources(this.state.type));
  }

  render() {
    const loaded = this.props.resourcesLoaded;
    return (
      <div className='resource-search'>
        <SearchControls type={this.state.type} onTypeSelect={this.typeSelected} onSearch={this.search} />
        <ul className='results'>
          {loaded ? this.renderIndex() : 'Wait...'}
        </ul>
      </div>
    );
  }

  renderIndex() {
    return(
      this.props.resources.map((resource) =>
        <ResourceListItem key={resource.id} vals={resource} />
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