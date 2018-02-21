import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Modal from './Modal'
import './Body.css'
import { isVimeo, isFlickr } from './urlHandler'
import Player from '@vimeo/player';

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: {}
    }
  }

  handleOpen = () => this.modal.open()
  handleClose = () => this.setState({ current: {} })
  handleURL = async (event, value) => {
    const hasValue = Boolean(value)
    const video = hasValue ? isVimeo(value) : null
    const current = {
      video,
      picture: hasValue ? isFlickr(value) : null
    }

    if (video) {
      const player = new Player('handstick', { url: value })

      try {
        current.title = await player.getVideoTitle()
        current.height = await player.getVideoHeight()
        current.width = await player.getVideoWidth()
        current.duration = await player.getDuration()
      } catch (e) {
        console.error('unable to get video informations', e)
      }
    }

    this.setState({ current })
  }
  render() {
    return (
      <div className="Body">
        <div id="handstick" hidden></div>
        <Modal title="Add a bookmark" ref={(modal) => { this.modal = modal; }} handleClose={this.handleClose} handleURL={this.handleURL} data={this.state.current}/>
        <FloatingActionButton className="Body-floating-button" backgroundColor="#006064" onClick={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

export default Body
