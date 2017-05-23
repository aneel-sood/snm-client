import React, { Component } from 'react';
import { fetchResources } from '../store/actions.js'
import { connect } from 'react-redux'
import '../stylesheets/ResourceSearch.css';
import ResourceListItem from './ResourceListItem.js'
import SearchControls from './SearchControls.js'
import { Well, FormGroup, InputGroup, FormControl} from 'react-bootstrap';



class ResourceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {type: ''};

    this.fetchData = this.fetchData.bind(this);
    this.typeChanged = this.typeChanged.bind(this);
  }

  fetchData(detailsParams) {
    const params = {
      type: this.state.type,
      details: detailsParams
    }
    this.props.dispatch(fetchResources(params));
  }

  typeChanged(event) {
    this.setState({type: event.target.value}, () => {this.fetchData({})});
  }

  render() {
    const loaded = this.props.resourcesLoaded;
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
                <option value="gp">General Practitioner</option>
              </FormControl>
            </InputGroup>
          </FormGroup>
          <SearchControls fetchData={this.fetchData} />
        </Well>
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