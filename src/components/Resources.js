import React, { Component } from 'react'

// components
import ResourcesIndex from './resources/ResourcesIndex.js'

// redux
import { connect } from 'react-redux'
import { fetchResources } from '../store/actions.js'

// styles
// import { Modal, Button } from 'react-bootstrap'
// import '../stylesheets/Resources.css'

class Resources extends Component {

  render() {
    const p = this.props, s = this.state;
    return(
      <div className='resources content'>
        <h3 className='title'>Resources</h3>
        { p.resourcesLoaded &&
          <ResourcesIndex resources={p.resources} />
        }
      </div>
    )
  }

  componentWillMount() {
    this.props.dispatch(fetchResources());
  }

  // createClient = (params) => {
  //   this.props.dispatch(createClient(params));
  // }

  // showNewClientModal = () => {
  //   this.setState({ showNewClientModal: true })
  // } 

  // hideNewClientModal = () => {
  //   this.setState({ showNewClientModal: false })
  // } 
}

const mapStateToProps = (state) => {
  return {
    resources: state.resources.index,
    resourcesLoaded: state.resources.loaded
  }
}

export default connect(
  mapStateToProps
)(Resources);