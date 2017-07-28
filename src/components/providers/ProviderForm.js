import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap'

export default class ProviderForm extends Component {
  constructor(props) {
    super(props);
    const provider = this.props.provider;
    this.state = { 
      form: {
        id: provider.id || '',
        first_name: provider.first_name || '',
        last_name: provider.last_name || '',
        email: provider.email || ''
      } 
    } 
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="first_name">
          <Col componentClass={ControlLabel} sm={3}>
            First name
          </Col>
          <Col sm={9}>
            <FormControl type="text" value={this.state.form.first_name} 
              placeholder="Aravind"
              onChange={this.formValChange} />
          </Col>
        </FormGroup>

        <FormGroup controlId="last_name">
          <Col componentClass={ControlLabel} sm={3}>
            Last name
          </Col>
          <Col sm={9}>
            <FormControl type="text" value={this.state.form.last_name} 
              placeholder="Adiga"
              onChange={this.formValChange} />
          </Col>
        </FormGroup>

        <FormGroup controlId="email">
          <Col componentClass={ControlLabel} sm={3}>
            Email
          </Col>
          <Col sm={9}>
            <FormControl type="text" value={this.state.form.email} 
              placeholder="aravind.adiga.gmail.com"
              onChange={this.formValChange} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={3} sm={9}>
            <Button type="submit" onClick={this.submit}>
              Submit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }

  submit = () => {
    this.props.action(this.state.form);
  }

  formValChange = (e) => {
    let nextForm = {...this.state.form, [e.target.id]: e.target.value};
    this.setState({ form: nextForm });    
  }
}