import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";


export default class ClientForm extends Component {
  constructor(props) {
    super(props);
    const client = this.props.client;
    this.state = { 
      form: {
        id: client.id || '',
        first_name: client.first_name || '',
        last_name: client.last_name || '',
        email: client.email || '',
        location: {
          address: '',
          geoPoint: { lat: 43.6570, lng: -79.3932 }
        }
      },
      mapZoom: 12
    } 
  }

  render() {
    const s = this.state;
    const autoCompleteInputProps = {
      value: this.state.form.location.address, 
      onChange: this.addressValChange
    }
    const GettingStartedGoogleMap = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={s.mapZoom}
        defaultCenter={s.form.location.geoPoint}
      >
        <Marker position={s.form.location.geoPoint} />
      </GoogleMap>
    ));
    return (
      <Row>
        <Col sm={8}>
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

          <FormGroup controlId="address">
            <Col componentClass={ControlLabel} sm={3}>
              Address
            </Col>
            <Col sm={9}>
              <PlacesAutocomplete inputProps={autoCompleteInputProps} onSelect={this.addressSelected}
                styles={{root: { zIndex: 1 }}} />
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
        </Col>
        <Col sm={4}>
          <div style={{width: '100%', height: '190px'}}>
            <GettingStartedGoogleMap
              containerElement={
                <div style={{ height: `100%` }} />
              }
              mapElement={
                <div style={{ height: `100%` }} />
              }
            />
          </div>
        </Col>
      </Row>
    )
  }

  submit = () => {
    this.props.action(this.state.form);
  }

  formValChange = (e) => {
    let nextForm = {...this.state.form, [e.target.id]: e.target.value};
    this.setState({ form: nextForm });    
  }

  addressValChange = (val) => {
    let nextLocation = {...this.state.form.location, address: val},
        nextForm = {...this.state.form, location: nextLocation};
    this.setState({ form: nextForm });    
  }

  addressSelected = (address) => {
    this.addressValChange(address);

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Success Yay', { lat, lng })
        let nextGeoPoint = {lat, lng},
            nextLocation = {...this.state.form.location, geoPoint: nextGeoPoint},
            nextForm = {...this.state.form, location: nextLocation};
        this.setState({ form: nextForm, mapZoom: 14 })
      })
      .catch((error) => {
        console.log('Oh no!', error)
      })
  }
}