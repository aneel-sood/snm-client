import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap'

export default class NewClient extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      form: {
        provider: '',
        type: '',
        details: ''
      } 
    } 
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="provider">
          <Col componentClass={ControlLabel} sm={3}>
            Provider
          </Col>
          <Col sm={9}>
            <FormControl type="text" value={this.state.form.provider} 
              onChange={this.formValChange} />
          </Col>
        </FormGroup>

        <FormGroup controlId="type">
          <Col componentClass={ControlLabel} sm={3}>
            Type
          </Col>
          <Col sm={9}>
            <FormControl type="text" value={this.state.form.type} 
              onChange={this.formValChange} />
          </Col>
        </FormGroup>

        <FormGroup controlId="details">
          <Col componentClass={ControlLabel} sm={3}>
            Details
          </Col>
          <Col sm={9}>
            <FormControl type="text" value={this.state.form.details} 
              onChange={this.formValChange} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={3} sm={9}>
            <Button type="submit" onClick={this.createResource}>
              Save
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }

  createResource = () => {
    this.props.create(this.state.form);
  }

  formValChange = (e) => {
    let nextForm = {...this.state.form, [e.target.id]: e.target.value};
    this.setState({ form: nextForm });    
  }
}