import React, { Component } from 'react';
import { defaults } from '../../store/defaults.js';
import _ from 'lodash';

// components
import GenericResourceDetails from './resource_form/GenericResourceDetails.js'
import LanguageResourceDetails from './resource_form/LanguageResourceDetails.js'

// styles
import { Button, Form, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import Select from 'react-select';

export default class ResourceForm extends Component {
  constructor(props) {
    super(props);
    const resource = this.props.resource;
    this.state = { 
      form: {
        id: resource.id || '',
        provider_id: (resource.provider && resource.provider.id) || '',
        type: resource.type || '',
        details: resource.details || ''
      } 
    } 
  }

  render() {
    const DetailsComponent = this.detailsComponent();

    return (
      <Form horizontal>
        <FormGroup controlId="provider">
          <Col componentClass={ControlLabel} sm={3}>
            Provider
          </Col>
          <Col sm={9}>
            <Select options={this.providersSelectOptions()} onChange={this.providerValChange} 
              value={this.state.form.provider_id} />
          </Col>
        </FormGroup>

        <FormGroup controlId="type">
          <Col componentClass={ControlLabel} sm={3}>
            Type
          </Col>
          <Col sm={9}>
            <Select options={defaults.resourceTypeMap} onChange={this.typeValChange} 
              value={this.state.form.type} />
          </Col>
        </FormGroup>

        {!_.isEmpty(this.state.form.type) && 
          <DetailsComponent details={this.state.form.details} updateDetails={this.detailsChange} />
        }

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

  providerValChange = (newVal) => {
    newVal = newVal ? newVal.value : "";
    let nextForm = {...this.state.form, provider_id: newVal};
    this.setState({ form: nextForm });    
  }

  typeValChange = (newVal) => {
    newVal = newVal ? newVal.value : "";
    let nextForm = {...this.state.form, type: newVal, details: {}};
    this.setState({ form: nextForm });    
  }

  detailsChange = (newVal) => {
    let nextForm = {...this.state.form, details: newVal};
    this.setState({ form: nextForm });    
  }

  providersSelectOptions = () => {
    const options = this.props.providers.map(provider => {
      let name = provider.first_name + ' ' + provider.last_name;
      return {value: provider.id, label: name}
    })
    return options;
  }

  detailsComponent = () => {
    let Component;
    switch (this.state.form.type) {
      case 'interpreter':
      case 'translator':
        Component = LanguageResourceDetails;
        break;
      default:
        Component = GenericResourceDetails;
    }
    return Component;
  }
}