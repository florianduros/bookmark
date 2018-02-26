import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import moment from 'moment'
import Modal from './Modal'
import List from './List'
import Table from './Table'
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
    this.state = { openAdd: false, openEdit: false, filter: '', display: 'table', bookmarks: [
      {
        title: 'capybara hot springs',
        isVideo: true,
        url: 'https://vimeo.com/122311493',
        author: 'Leonid Kosolapov',
        width: 800,
        height: 600,
        date: moment(),
        tags: ['capybara', 'hot'],
        duration: '00:02:12',
        fancyDuration: '00h 02m 12s'
      },
      {
        title: 'emu',
        isVideo: false,
        url: 'https://www.flickr.com/photos/mathiasappel/25838827250/in/photolist-FEmvgg-FnhK8y-F5dF5s-ED7Tsf-b81pDg-8in8kt-5Xoi3a-whpJbA-qiMxu5-oukrZ3-ouks7N-ecWt4C-oFSY5R-oXXURQ-6fGHnd-s3kDem-47zrmt-r2sWsM-9HU7KM-bHW1ta-F3iXFx-e72uhp-aA2f4p-aBQLHE-gKUdgz-A6wHy-eVE3cV-e1hHKA-b8EYN-9pE4AJ-4NyESZ-994ZaD-7w22D4-dUMVRi-cefnNd-dwBFFq-u7sme-p7kL75-poYEmx-6kGMJa-6RtiNi-9PP3pM-6jbGzA-f8kNhM-cgFQjC-GZZZCj-9amCzM-e72usX-aoaGkF-5TuBc1',
        author: 'Mathias Appel',
        width: 1920,
        height: 1080,
        date: moment(),
        tags: ['animals', 'emu']
      },
      {
        title: 'SEASONS',
        isVideo: true,
        url: 'https://vimeo.com/250953833',
        author: 'sam yurkovich',
        width: 1920,
        height: 1080,
        date: moment(),
        duration: '00:01:21',
        fancyDuration: '00h 01m 21s',
        tags: ['black and white']
      }
    ]}
  }

  computeDuration = (bookmark) => {
    if (bookmark.duration) {
      const duration = moment.duration(bookmark.duration)
      bookmark.fancyDuration = `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`
    }
  }

  handleAdd = (evt, bookmark) => {
    bookmark.date = moment()
    this.computeDuration(bookmark)
    this.setState({ openAdd: false, bookmarks: this.sort(this.state.bookmarks.concat(bookmark)) })
  }

  handleBeforeEdit = (evt, bookmark, index) => this.setState({ currentIndex: index, current: bookmark, openEdit: true })
  handleBeforeDelete = (evt, bookmark, index) => this.setState({ bookmarks: this.state.bookmarks.filter((bookmark, i) => i !== index)})

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

  getBookmarks = () => {
    return this.state.bookmarks
      .map((bookmark, index) => Object.assign(bookmark, { index }))
      .filter(({ title, tags }) => title.toLowerCase().includes(this.state.filter.toLowerCase()) ||
                                    tags.some(tag => tag.toLowerCase().includes(this.state.filter.toLowerCase())))
  }

  render() {
    return (
      <div className="Body">
        <div className="Body-container">
          <span className="Body-extra">{this.state.bookmarks.length} bookmark(s)</span>
          <div className="Body-search-container">
            <div className="Body-search"><TextField hintStyle={styles.hintStyle} underlineStyle={styles.underlineStyle} hintText="search field on title and tags" onChange={(evt, filter) => this.setState({ filter })}/></div>
          </div>
          <RadioButtonGroup name="display" className="Body-button" defaultSelected={this.state.display} onChange={(evt, value) => this.setState( { display: value} )}>
            <RadioButton value="table" label="Table"/>
            <RadioButton value="list" label="List" style={{ marginLeft: "10px" }} />
          </RadioButtonGroup>
        </div>
        {this.state.display === 'table' ?
          <Table bookmarks={this.getBookmarks()} handleEdit={this.handleBeforeEdit} handleDelete={this.handleBeforeDelete} /> :
          <List bookmarks={this.getBookmarks()} handleEdit={this.handleBeforeEdit} handleDelete={this.handleBeforeDelete} />
        }
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
