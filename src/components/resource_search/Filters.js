import React, { Component } from 'react';
import { InputGroup, FormControl, ControlLabel, Form, FormGroup, Button} from 'react-bootstrap';

export default class Filters extends Component {
  constructor(props) {
    super(props);
    let defaultState = {
      language_of_service: 'ANY'
    };

    this.state = props.requirements || defaultState;

    this.updateLanguage = this.updateLanguage.bind(this);
    this.search = this.search.bind(this);
  }

  render() {
    const s = this.state;
    return (
      <Form>
        <FormGroup>
          <InputGroup className='language_of_service-select'>
            <ControlLabel>Language of Service</ControlLabel>
            <FormControl componentClass="select" onChange={this.updateLanguage} 
              value={s.language_of_service}>
              <option value="ANY">Any</option>
              <option value="AR">Arabic</option>
              <option value="EN">English</option>
              <option value="FR">French</option>
              <option value="GK">Greek</option>
              <option value="IT">Italian</option>
              <option value="RU">Russian</option>
              <option value="SP">Spanish</option>
            </FormControl>
          </InputGroup>
        </FormGroup>
        <Button bsStyle="primary" onClick={this.search}>Search</Button>
      </Form>
    )
  }

  search() {
    this.props.fetchData(this.state);
  }

  updateLanguage(event) {
    this.setState({language_of_service: event.target.value});
  }
}