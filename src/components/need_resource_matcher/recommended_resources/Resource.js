import React, { Component } from 'react';
import { Glyphicon, Dropdown, MenuItem } from 'react-bootstrap';
import _ from 'lodash';

export default class Resource extends Component {
  render() {
    const r = this.props.resource;
    return (
      <li className="resource">
        <Dropdown id='match-menu' pullRight>
          <CustomToggle bsRole="toggle">
            <Glyphicon glyph="pushpin" />
          </CustomToggle>
          <Dropdown.Menu className="super-colors">
            <MenuItem eventKey="1" onClick={this.matchResource}>Match</MenuItem>
            <MenuItem eventKey="2" onClick={this.matchResourcePending}>Pending</MenuItem>
            <MenuItem eventKey="3" onClick={this.matchResourceFulfilled}>Fulfilled</MenuItem>
          </Dropdown.Menu>
        </Dropdown>
        <h5>{_.capitalize(r.type)}</h5>
        {
          Object.keys(r.details).map((key, i) => {
            return (
              <p key={i}>{key}: {r.details[key].toString()}</p>
            )
          })
        }
      </li>
    );
  }

  matchResource = () => {
    this.saveMatchState();
  }

  matchResourcePending = () => {
    this.saveMatchState(true);
  }

  matchResourceFulfilled = () => {
    this.saveMatchState(false, true);
  }

  saveMatchState = (pending=false, fulfilled=false) => {
    const p = this.props;
    p.saveMatchState(p.resource.id, pending, fulfilled)
  }
}

class CustomToggle extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <a href="" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}