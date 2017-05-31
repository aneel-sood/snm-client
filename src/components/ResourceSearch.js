import React, { Component } from 'react';
import { fetchProviderResources } from '../store/actions.js'
import { connect } from 'react-redux'

// components
import Filters from './resource_search/Filters.js'
import LanguageServiceFilters from './resource_search/LanguageServiceFilters.js'
import Results from './resource_search/Results.js'
import { Well, FormGroup, InputGroup, FormControl } from 'react-bootstrap';

// stylesheets
import '../stylesheets/ResourceSearch.css';
import '../stylesheets/Filters.css';
import '../stylesheets/Results.css';

class ResourceSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      need: props.need,
      type: props.need.type || ""
    } 

    this.typeChanged = this.typeChanged.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.saveNeed = this.saveNeed.bind(this);
    this.filtersComponent = this.filtersComponent.bind(this);
  }

  render() {
    const p = this.props,
          FiltersComponent = this.filtersComponent(),
          typeSet = this.state.type !== '',
          needId = this.state.need.id,
          searchRequestObj = p.searchResultsById[needId];

    return (
      <div className='resource-search'>
        <Well>
          <FormGroup>
            <InputGroup className='type-select'>
              <FormControl componentClass="select" onChange={this.typeChanged} value={this.state.type}>
                <option value=""></option>
                <option value="interpreter">Interpreter</option>
                <option value="translator">Translator</option>
                <option value="dentist">Dentist</option>
              </FormControl>
            </InputGroup>
          </FormGroup>
          {typeSet &&
            <FiltersComponent resourceType={this.state.type} 
              requirements={this.state.need.requirements} 
              fetchData={this.fetchData} saveNeed={this.saveNeed} />
          }
        </Well>
        {searchRequestObj && <Results searchResponse={searchRequestObj} />}
      </div>
    );
  }

  typeChanged(event) {
    this.setState({type: event.target.value}, () => {
      this.fetchData({});
      this.saveNeed({});
    });
  }

  fetchData(detailsParams) {
    const
    s = this.state,
    p = this.props,
    params = {
      resource_type: s.type,
      details: detailsParams
    }

    p.dispatch(fetchProviderResources(s.need.id, params));
  }

  saveNeed(requirementsParams) {
    const
    s = this.state,
    p = this.props,
    params = {
      need_type: s.type,
      requirements: requirementsParams
    };
    p.updateNeed(params, p.need.id);
  }

  filtersComponent() {
    let Component;
    switch (this.state.type) {
      case 'interpreter':
      case 'translator':
        Component = LanguageServiceFilters;
        break;
      default:
        Component = Filters;
    }
    return Component;
  }
}

const mapStateToProps = (state) => {
  return {
    searchResultsById: state.searchResultsByNeedId
  }
}

export default connect(
  mapStateToProps
)(ResourceSearch);