import React, { Component, Fragment } from 'react'
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
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
      currentTag: null,
      tags: []
    }
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    bookmark: PropTypes.object,
    handleSubmit: PropTypes.func,
    handleClose: PropTypes.func
  }

  static defaultProps = {
    bookmark: {},
    handleSubmit: () => {},
    handleClose: () => {},
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      this.setState({ data: {}, tags: [], currentTag: null })
    }

    if (nextProps.bookmark) {
      this.setState({ data: nextProps.bookmark, tags: nextProps.bookmark.tags || []})
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
      <FlatButton label="Cancel" primary={true} onClick={this.props.handleClose} />,
      <FlatButton label="Submit" primary={true} disabled={!(this.state.data.url && this.state.data.title)}
        onClick={(evt => this.props.handleSubmit(evt, Object.assign({}, this.state.data, { tags: this.state.tags })))}
      />,
    ];

    return (
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={true}
        open={this.props.open}>
          <TextField hintText="Title" defaultValue={this.props.bookmark.title} fullWidth={true} underlineShow={false} onChange={(evt, title) => this.setState({ data: {...this.state.data, ...{ title }}})}/>
          <Divider />
          <TextField hintText="URL" defaultValue={this.props.bookmark.url} fullWidth={true} underlineShow={false} onChange={this.handleURL} errorText={this.state.error}/>
          <Divider />
          <TextField hintText="Author name" defaultValue={this.props.bookmark.author} fullWidth={true} underlineShow={false} onChange={(evt, author) => this.setState({ data: {...this.state.data, ...{ author }}})}/>
          <Divider />
          <TextField hintText="Width in pixels" defaultValue={this.props.bookmark.width} fullWidth={true} type="number" underlineShow={false} onChange={(evt, width) => this.setState({ data: {...this.state.data, ...{ width }}})}/>
          <Divider />
          <TextField hintText="Height in pixels" defaultValue={this.props.bookmark.height} fullWidth={true} type="number" underlineShow={false} onChange={(evt, height) => this.setState({ data: {...this.state.data, ...{ height }}})}/>
          <Divider />
          {this.state.data.isVideo &&
            <Fragment>
              <div>
                <span className="Modal-text">Duration</span>
                <input ref={(input) => { this.input = input; }} className="Modal-time" type="time" step="1" onChange={({ target }) => this.setState({ data: {...this.state.data, ...{ duration: target.value }}})}/>
              </div>
              <Divider />
            </Fragment>
          }
          <div className="Modal-tags-add">
            <span>Tags</span>
            <TextField  className="Modal-tags-input" fullWidth={true} hintText="tag name" onChange={(evt, currentTag) => this.setState({ currentTag })} />
            <RaisedButton label="Add" secondary={true} onClick={() => this.setState({ tags: this.state.tags.concat(this.state.currentTag) })}/>
          </div>
          <div className="Modal-tags-container">
            {this.state.tags.map((tag, index) => (
              <Chip key={index} style={{ margin: "4px"}} onRequestDelete={() =>
                this.setState({ tags: this.state.tags.filter((tag, i) => i !== index) })
              }>{tag}</Chip>
            ))}
          </div>
          The Title and URL fields must be filled
      </Dialog>
    )
  }
}

export default Modal
