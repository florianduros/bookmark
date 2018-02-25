import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tile from './Tile'
import './List.css'

class List extends Component {

  static propTypes = {
    bookmarks: PropTypes.array.isRequired,
    filter: PropTypes.string,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func
  }

  static defaultProps = {
    filter: ''
  }

  render() {
    return (
      <div className="List-container">
        {this.props.bookmarks.filter(({ title, tags }) => title.toLowerCase().includes(this.props.filter.toLowerCase()) || tags.some(tag => tag.toLowerCase().includes(this.props.filter.toLowerCase())))
          .map((bookmark, index) => (
            <Tile key={index} bookmark={bookmark} handleEdit={evt => this.props.handleEdit(evt, bookmark, index)} handleDelete={evt => this.props.handleDelete(evt, bookmark, index)}/>))}
      </div>
    )
  }
}

export default List
