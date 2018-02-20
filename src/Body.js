import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import './Body.css'

class Body extends Component {
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  render() {
    return (
      <div className="Body">
        <Dialog
          title="Add a bookmark"
          modal={true}
          open={this.state.open}/>
        <FloatingActionButton className="Body-floating-button" backgroundColor="#00796B" onClick={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

export default Body
