import React, { Component } from 'react';
import { fetchProviders } from '../store/actions.js'
import { connect } from 'react-redux'

// components
import Filters from './resource_search/Filters.js'
import LanguageServiceFilters from './resource_search/LanguageServiceFilters.js'
import Results from './resource_search/Results.js'
import { Well, FormGroup, InputGroup, FormControl} from 'react-bootstrap';

// stylesheets
import '../stylesheets/ResourceSearch.css';
import '../stylesheets/Filters.css';
import '../stylesheets/Results.css';

class ResourceSearch extends Component {
  constructor(props) {
    super(props);

    let initialState = {};
    if (props.need) {
      initialState.need = props.need;
      initialState.type = props.need.type;
    } else {
      initialState.need = {id: props.tempId};
      initialState.type = "";
    }

    this.state = initialState;

    this.fetchData = this.fetchData.bind(this);
    this.typeChanged = this.typeChanged.bind(this);
    this.filtersComponent = this.filtersComponent.bind(this);
  }

  render() {
    const p = this.props,
          FiltersComponent = this.filtersComponent();
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
          <div className='filters'>
            {this.state.type !== '' &&
              <FiltersComponent fetchData={this.fetchData} resourceType={this.state.type}
                requirements={this.state.need.requirements} />
            }
          </div>
        </Well>
        {p.searchResultsById[this.state.need.id] &&
          <Results searchResults={p.searchResultsById[this.state.need.id].result} 
            loaded={p.searchResultsById[this.state.need.id].loaded} />
        }
      </div>
    );
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

  fetchData(detailsParams) {
    const params = {
      resource_type: this.state.type,
      details: detailsParams
    }
    this.props.dispatch(fetchProviders(this.state.need.id, params));
  }

  typeChanged(event) {
    this.setState({type: event.target.value}, () => {this.fetchData({})});
  }
}

const mapStateToProps = (state) => {
  return {
    searchResultsById: state.providers
  }
}

export default connect(
  mapStateToProps
)(ResourceSearch);