import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class Resource extends Component {
  render() {
    const r = this.props.resource;
    return (
      <li className="resource">
        <Glyphicon glyph="glyphicon glyphicon-star" onClick={this.matchResource} />
        <Glyphicon glyph="glyphicon glyphicon-play-circle" onClick={this.matchResourcePending} />
        <Glyphicon glyph="glyphicon glyphicon-ok" onClick={this.matchResourceFulfilled} />
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