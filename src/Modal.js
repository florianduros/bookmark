import React, { Component, Fragment } from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import PropTypes from 'prop-types'
import { isVimeo, isFlickr } from './urlHandler'
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      data: { isVideo: false },
    }
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func,
    handleClose: PropTypes.func
  }

  static defaultProps = {
    handleSubmit: () => {},
    handleClose: () => {},
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      this.setState({ data: {} })
    }
  }

  handleURL = (evt, url) => {
    const data = { ...this.state.data, ...{ url, isVideo: false }};
    if (isVimeo(url)) {
      this.setState({ isVideo: true, data: { ...data, ...{ isVideo: true }} , error: null })
    } else if (isFlickr(url)) {
      this.setState({ data , error: null })
    } else {
      this.setState({ data: { ...this.state.data, ...{ url: false }}, error: 'The URL is not from vimeo or a flickr.' })
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={!(this.state.data.url && this.state.data.title)}
        onClick={(evt => this.props.handleSubmit(evt, this.state.data))}
      />,
    ];

    return (
      <Dialog
        title='Add a bookmark'
        actions={actions}
        modal={true}
        open={this.props.open}>
          <TextField hintText="Title" fullWidth={true} underlineShow={false} onChange={(evt, title) => this.setState({ data: {...this.state.data, ...{ title }}})}/>
          <Divider />
          <TextField hintText="URL" fullWidth={true} underlineShow={false} onChange={this.handleURL} errorText={this.state.error}/>
          <Divider />
          <TextField hintText="Author name" fullWidth={true} underlineShow={false} onChange={(evt, author) => this.setState({ data: {...this.state.data, ...{ author }}})}/>
          <Divider />
          <TextField hintText="Width in pixels" fullWidth={true} type="number" underlineShow={false} onChange={(evt, pixels) => this.setState({ data: {...this.state.data, ...{ pixels }}})}/>
          <Divider />
          <TextField hintText="Height in pixels" fullWidth={true} type="number" underlineShow={false} onChange={(evt, height) => this.setState({ data: {...this.state.data, ...{ height }}})}/>
          {this.state.data.isVideo &&
            <Fragment>
              <Divider />
              <div>
                <span className="Modal-text">Duration</span>
                <input className="Modal-time" type="time" step="1" onChange={({ target }) => this.setState({ data: {...this.state.data, ...{ duration: target.value }}})}/>
              </div>
            </Fragment>
          }
          The Title and URL fields must be filled
      </Dialog>
    )
  }
}

export default Modal
