import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import TextField from 'material-ui/TextField'
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
    this.state = { openAdd: false, openEdit: false, filter: '', bookmarks: [
      {
        title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        isVideo: true,
        url: 'https://vimeo.com/250953833250953833250953833250953833',
        author: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        height: 20,
        duration: '20:10',
        fancyDuration: '20h 10m',
        tags: []
      },
      {
        title: 'capybara',
        isVideo: true,
        url: 'https://vimeo.com/250953833250953833250953833250953833',
        author: 'Mr Alpaca',
        height: 20,
        tags: ['capybara', 'alpaca']
      },
      {
        title: 'capybara2',
        isVideo: true,
        url: 'https://vimeo.com/250953833250953833250953833250953833',
        author: 'Mr Alpaca2',
        height: 20,
        tags: ['capybara', 'alpaca']
      },
      {
        title: 'toto',
        isVideo: false,
        tags: []
      }]}
  }

  computeDuration = (bookmark) => {
    if (bookmark.duration) {
      const duration = moment.duration(bookmark.duration)
      bookmark.fancyDuration = `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`
    }
  }

  handleAdd = (evt, bookmark) => {
    this.computeDuration(bookmark)
    this.setState({ openAdd: false, bookmarks: this.sort(this.state.bookmarks.concat(bookmark)) })
  }

  handleEdit = (evt, bookmark) => {
    this.computeDuration(bookmark)
    this.setState({
      openEdit: false,
      bookmarks: this.sort(this.state.bookmarks.map((_bookmark, index) => this.state.currentIndex === index ? bookmark : _bookmark))
    })
  }

  sort(bookmarks) {
    return bookmarks.sort(({ title: titleA }, {title: titleB }) => titleA.localeCompare(titleB))
  }

  render() {
    return (
      <div className="Body">
        <div className="Body-container">
          <span className="Body-extra">{this.state.bookmarks.length} bookmark(s)</span>
          <div className="Body-search-container">
            <div className="Body-search"><TextField hintStyle={styles.hintStyle} underlineStyle={styles.underlineStyle} hintText="search field on title and tags" onChange={(evt, filter) => this.setState({ filter })}/></div>
          </div>
        </div>
        <div className="Body-bookmarks">
          {this.state.bookmarks.filter(({ title, tags }) => title.includes(this.state.filter) || tags.some(tag => tag.includes(this.state.filter))).map((bookmark, index) => (
            <Tile key={index} bookmark={bookmark} handleEdit={() => this.setState({ currentIndex: index, current: bookmark, openEdit: true })} handleDelete={() =>  this.setState({ bookmarks: this.state.bookmarks.filter((bookmark, i) => i !== index) }
          ) }/>))}
        </div>
        <Modal title="Add a bookmark" open={this.state.openAdd} handleSubmit={this.handleAdd} handleClose={() => this.setState({ openAdd: false })}/>
        <Modal title="Edit a bookmark" bookmark={this.state.current} handleSubmit={this.handleEdit} open={this.state.openEdit} handleClose={() => this.setState({ openEdit: false })}/>
        <FloatingActionButton className="Body-floating-button" backgroundColor="#006064" onClick={() => this.setState({ openAdd: true })}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

export default Body
