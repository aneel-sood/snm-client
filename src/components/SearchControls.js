import React, { Component } from 'react';
import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';

export default class SearchControls extends Component {
  render() {
    const p = this.props;
    return (
      <FormGroup>
        <InputGroup className='type-select'>
          <FormControl componentClass="select" placeholder="select" 
            onChange={p.onTypeSelect} value={p.type}>
            <option value="interpreter">Interpreter</option>
            <option value="translator">Translator</option>
            <option value="dentist">Dentist</option>
            <option value="gp">General Practitioner</option>
          </FormControl>
          <InputGroup.Button>
            <Button bsStyle="primary" onClick={p.onSearch}>Search</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    )
  }

}