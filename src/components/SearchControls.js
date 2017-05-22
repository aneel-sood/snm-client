import React, { Component } from 'react';
import { Button, FormGroup, InputGroup, FormControl, ControlLabel, Form} from 'react-bootstrap';
import '../stylesheets/SearchControls.css';

export default class SearchControls extends Component {
  render() {
    const p = this.props;
    return (
      <div className='controls'>
        <FormGroup>
          <InputGroup className='type-select'>
            <FormControl componentClass="select" onChange={p.onTypeSelect} value={p.type}>
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
        <Form inline>
          <InputGroup className='language-select source'>
            <ControlLabel>Source Language</ControlLabel>
            <FormControl componentClass="select">
              <option value="AR">Arabic</option>
              <option value="EN">English</option>
              <option value="FR">French</option>
              <option value="GK">Greek</option>
              <option value="IT">Italian</option>
              <option value="RU">Russian</option>
              <option value="SP">Spanish</option>
            </FormControl>
          </InputGroup>
          <InputGroup className='language-select target'>
            <ControlLabel>Target Language</ControlLabel>
            <FormControl componentClass="select">
              <option value="AR">Arabic</option>
              <option value="EN">English</option>
              <option value="FR">French</option>
              <option value="GK">Greek</option>
              <option value="IT">Italian</option>
              <option value="RU">Russian</option>
              <option value="SP">Spanish</option>
            </FormControl>
          </InputGroup>
        </Form>
      </div>
    )
  }

}