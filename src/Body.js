import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import moment from 'moment'
import Modal from './Modal'
import Tile from './Tile'
import './Body.css'


const styles = {
  hintStyle: {
    color: 'black',
  },
  underlineStyle: {
    borderColor: 'black'
  }
};

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false, filter: '', bookmarks: [
      {
        title: 'capybara',
        isVideo: true,
        url: 'https://vimeo.com/250953833250953833250953833250953833',
        author: 'Mr Alpaca',
        height: 20
      },
      {
        title: 'capybara2',
        isVideo: true,
        url: 'https://vimeo.com/250953833250953833250953833250953833',
        author: 'Mr Alpaca2',
        height: 20,
        duration: '30h 10m 20s'
      },
      {
        title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        isVideo: true,
        url: 'https://vimeo.com/250953833250953833250953833250953833',
        author: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        height: 20,
        duration: '20h 10m'
      },
      {
        title: 'toto',
        isVideo: false
      }]}
  }

  handleSubmit = (evt, bookmark) => {
    if (bookmark.duration) {
      const duration = moment.duration(bookmark.duration)
      bookmark.duration = `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`
    }

    this.setState({ open: false, bookmarks: this.state.bookmarks.concat(bookmark).sort(({ title: titleA }, {title: titleB }) => titleA.localeCompare(titleB))})
  }
  render() {
    return (
      <div className="Body">
        <div className="Body-container">
          <span className="Body-extra">{this.state.bookmarks.length} bookmark(s)</span>
          <div className="Body-search-container">
            <div className="Body-search"><TextField hintStyle={styles.hintStyle} underlineStyle={styles.underlineStyle} hintText="search field on title" onChange={(evt, filter) => this.setState({ filter })}/></div>
          </div>
        </div>
        <div className="Body-bookmarks">
          {this.state.bookmarks.filter(({ title }) => title.includes(this.state.filter)).map((bookmark, index) => (<Tile key={index} bookmark={bookmark}/>))}
        </div>
        <Modal title="Add a bookmark" open={this.state.open} handleSubmit={this.handleSubmit} handleClose={() => this.setState({ open: false })}/>
        <FloatingActionButton className="Body-floating-button" backgroundColor="#006064" onClick={() => this.setState({ open: true })}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

export default Body
