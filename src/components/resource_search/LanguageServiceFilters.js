import React, { Component } from 'react';
import { InputGroup, FormControl, ControlLabel, Form, FormGroup, Button} from 'react-bootstrap';

export default class LanguageServiceFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source_lang: 'ANY',
      target_lang: 'ANY'
    }
    this.updateSourceLang = this.updateSourceLang.bind(this);
    this.updateTargetLang = this.updateTargetLang.bind(this);
    this.search = this.search.bind(this);
  }

  render() {
    const s = this.state;
    return (
      <div className='controls'>
        <Form>
          <FormGroup>
            <InputGroup className='language-select source'>
              <ControlLabel>Source Language</ControlLabel>
              <FormControl componentClass="select" onChange={this.updateSourceLang} value={s.source_lang}>
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
            <InputGroup className='language-select target'>
              <ControlLabel>Target Language</ControlLabel>
              <FormControl componentClass="select" onChange={this.updateTargetLang} value={s.target_lang}>
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
      </div>
    )
  }

  search() {
    const s = this.state;
    let params = {};
    if (s.source_lang !== 'ANY') { params.source_lang = s.source_lang }
    if (s.target_lang !== 'ANY') { params.target_lang = s.target_lang }
    this.props.fetchData(params);
  }

  updateSourceLang(event) {
    this.setState({source_lang: event.target.value});
  }

  updateTargetLang(event) {
    this.setState({target_lang: event.target.value});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.resourceType !== nextProps.resourceType) {
      this.setState({source_lang: 'ANY', target_lang: 'ANY'});
    }
  }
};