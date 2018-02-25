import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tile from './Tile'
import './List.css'

class List extends Component {

  static propTypes = {
    bookmarks: PropTypes.array.isRequired,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func
  }

  render() {
    return (
      <div className="List-container">
        {this.props.bookmarks.map((bookmark) => (
            <Tile key={bookmark.index} bookmark={bookmark} handleEdit={evt => this.props.handleEdit(evt, bookmark, bookmark.index)} handleDelete={evt => this.props.handleDelete(evt, bookmark, bookmark.index)}/>))}
      </div>
    )
  }
}

export default List
