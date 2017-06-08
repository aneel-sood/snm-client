import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class Resource extends Component {
  constructor(props) {
    super(props);

    this.bookmarkResource = this.bookmarkResource.bind(this);
    this.bookmarkFulfillingResource = this.bookmarkFulfillingResource.bind(this);
  }

  render() {
    const r = this.props.resource;
    return (
      <li className="resource">
        <Glyphicon glyph="glyphicon glyphicon-bookmark" onClick={this.bookmarkResource} />
        <Glyphicon glyph="glyphicon glyphicon-check" onClick={this.bookmarkFulfillingResource} />
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

  bookmarkResource() {
    this.bookmark();
  }

  bookmarkFulfillingResource() {
    this.bookmark(true);
  }

  bookmark(fulfilled=false) {
    const p = this.props;
    p.bookmarkResource(p.resource.id, fulfilled);
  }
}