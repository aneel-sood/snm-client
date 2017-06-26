import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import _ from 'lodash';

export default class Resource extends Component {
  render() {
    const r = this.props.resource;
    return (
      <li className="resource">
        <Glyphicon glyph="glyphicon glyphicon-pushpin" onClick={this.matchResource} />
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