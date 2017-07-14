import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import ClientForm from './ClientForm.js';

export default class CrupdateModal extends Component {
  render() {
    const 
    p = this.props, 
    newRecord = _.isUndefined(p.record.id),
    titlePrefix = newRecord ? 'New' : 'Update',
    action = newRecord ? p.create : p.update

    return(
      <Modal show={p.show} onHide={p.hide}>
        <Modal.Header closeButton>
          <h4>{titlePrefix} {p.recordType}</h4>
        </Modal.Header>
        <Modal.Body>
          <ClientForm action={action} client={p.record} />
        </Modal.Body>
      </Modal>
    )
  }
}