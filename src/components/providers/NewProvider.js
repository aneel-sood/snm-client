import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

export default class NewProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      form: {
        first_name: '',
        last_name: '',
        email: ''
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
              placeholder="Pro"
              onChange={this.formValChange} />
          </Col>
        </FormGroup>

        <FormGroup controlId="last_name">
          <Col componentClass={ControlLabel} sm={3}>
            Last name
          </Col>
          <Col sm={9}>
            <FormControl type="text" value={this.state.form.last_name} 
              placeholder="Vider"
              onChange={this.formValChange} />
          </Col>
        </FormGroup>

        <FormGroup controlId="email">
          <Col componentClass={ControlLabel} sm={3}>
            Email
          </Col>
          <Col sm={9}>
            <FormControl type="text" value={this.state.form.email} 
              placeholder="pro.vider@email.com"
              onChange={this.formValChange} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={3} sm={9}>
            <Button type="submit" onClick={this.createProvider}>
              Save
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }

  createProvider = () => {
    this.props.create(this.state.form);
  }

  formValChange = (e) => {
    let nextForm = {...this.state.form, [e.target.id]: e.target.value};
    this.setState({ form: nextForm });    
  }
}