import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      author: false,
      data: {}
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    current: PropTypes.object,
    handleURL: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleClose: PropTypes.func
  }

  open = () => this.setState({ open: true })
  handleClose = () => {
    this.setState({ open: false })
    if (this.props.handleClose) this.props.handleClose()
  }

  render() {
    const actions = [
      <FlatButton
      label="Cancel"
      primary={true}
      onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
    //    disabled={!(this.state.url && this.state.author)}
        onClick={this.props.handleSubmit}
      />,
    ];

    return (
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={true}
        open={this.state.open}>
        <TextField floatingLabelText="URL" fullWidth={true} underlineShow={false} onChange={this.props.handleURL}/>
        <Divider />
        <TextField floatingLabelText="Title" fullWidth={true} underlineShow={false} value={this.props.data.title}/>
        <Divider />
        <TextField floatingLabelText="Author name" fullWidth={true} underlineShow={false}/>
        <Divider />
        <TextField floatingLabelText="Width in pixels" fullWidth={true} type="number" underlineShow={false} defaultValue={this.props.data.width}/>
        <Divider />
        <TextField floatingLabelText="Height in pixels" fullWidth={true} type="number" underlineShow={false} defaultValue="10" value={this.props.data.height}/>
        <Divider />
        {this.props.data.video &&
          <TextField floatingLabelText="Duration in seconds" fullWidth={true} type="number" underlineShow={false} value={this.props.data.duration}/>
        }
      </Dialog>
    )
  }
}

export default Modal
