import React, { Component } from 'react';
import { InputGroup, FormControl, ControlLabel, Form, Button} from 'react-bootstrap';
import '../stylesheets/SearchControls.css';

export default class SearchControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source_lang: 'AR',
      target_lang: 'EN'
    }
    this.updateSourceLang = this.updateSourceLang.bind(this);
    this.updateTargetLang = this.updateTargetLang.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentWillMount() {
    this.search();
  }
  
  updateSourceLang(event) {
    this.setState({source_lang: event.target.value});
  }

  updateTargetLang(event) {
    this.setState({target_lang: event.target.value});
  }

  onSearch() {
    this.search();
  }

  search() {
    const searchParameters = {
      type: 'translator', 
      details: this.state
    }
    this.props.fetchData(searchParameters);
  }

  render() {
    const s = this.state;
    return (
      <div className='controls'>
        <Form inline>
          <InputGroup className='language-select source'>
            <ControlLabel>Source Language</ControlLabel>
            <FormControl componentClass="select" onChange={this.updateSourceLang} value={s.source_lang}>
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
            <FormControl componentClass="select" onChange={this.updateTargetLang} value={s.target_lang}>
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
        <InputGroup.Button>
          <Button bsStyle="primary" onClick={this.onSearch}>Search</Button>
        </InputGroup.Button>
      </div>
    )
  }

}