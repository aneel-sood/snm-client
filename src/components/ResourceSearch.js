import React, { Component } from 'react';
import { fetchResources } from '../store/actions.js'
import { connect } from 'react-redux'
import '../stylesheets/ResourceSearch.css';
import ResourceListItem from './ResourceListItem.js'
import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';

class ResourceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {type: 'translator'};

    this.resourceTypeSelected = this.resourceTypeSelected.bind(this);
  }

  fetch(type) {
    this.props.dispatch(fetchResources(type));
  }

  componentDidMount() {
    this.fetch(this.state.type);
  }

  resourceTypeSelected(event) {
    this.fetch(event.target.value);
    this.setState({type: event.target.value});
  }

  render() {
    const loaded = this.props.resourcesLoaded;
    return (
      <div className='resource-search'>
        <FormGroup>
          <InputGroup className='type-select'>
            <FormControl componentClass="select" placeholder="select" value={this.state.type} onChange={this.resourceTypeSelected}>
              <option value="interpreter">Interpreter</option>
              <option value="translator">Translator</option>
              <option value="dentist">Dentist</option>
              <option value="gp">General Practitioner</option>
            </FormControl>
            <InputGroup.Button>
              <Button bsStyle="primary">Search</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
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