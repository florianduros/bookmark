import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import Chip from 'material-ui/Chip'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import 'react-table/react-table.css'

class Table extends Component {

  static propTypes = {
    bookmarks: PropTypes.array.isRequired,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func
  }

  render() {
    return (
      <ReactTable
          data={this.props.bookmarks}
          columns={[
            {
              width: 60,
              style: { margin: 'auto' },
              accessor: 'index',
              Cell: row => (
                <Fragment>
                  <EditIcon onClick={evt => this.props.handleEdit(evt, this.props.bookmarks.find(bookmark => bookmark.index === row.value), row.value)}/>
                  <DeleteIcon onClick={evt => this.props.handleDelete(evt, this.props.bookmarks.find(bookmark => bookmark.index === row.value), row.value)}/>
                </Fragment>
              )
            },
            {
              accessor: 'isVideo',
              width: 50,
              style: { margin: 'auto'},
              Cell: row => (
                <Fragment>{row.value ? (<img alt="vimeo" src="vimeo.png"/>) : (<img alt="flickr" src="flickr.png"/>)}</Fragment>
              )
            },
            {
              Header: 'Title',
              accessor: 'title',
              style: { margin: 'auto', textAlign: 'center'},
            },
            {
              Header: 'URL',
              accessor: 'url',
              style: { margin: 'auto', textAlign: 'center'},
            },
            {
              Header: 'Width',
              accessor: 'width',
              className : 'Table-cell',
              style: { margin: 'auto', textAlign: 'center'},
              width: 100,
              Cell: row => (<span>{row.value ? `${row.value}px` : '' }</span>)
            },
            {
              Header: 'Height',
              accessor: 'height',
              width: 100,
              style: { margin: 'auto', textAlign: 'center'},
              Cell: row => (<span>{row.value ? `${row.value}px` : '' }</span>)
            },
            {
              Header: 'Duration',
              accessor: 'fancyDuration',
              width: 150,
              style: { margin: 'auto', textAlign: 'center'},
            },
            {
              Header: 'Tags',
              accessor: 'tags',
              style: { padding: '0'},
              Cell: row => (
                <Fragment>
                   {row.value.length ?
                    <div className="Tile-tags-container">
                      {row.value.map((tag, index) => (
                      <Chip key={index} style={{ margin: "4px"}}>{tag}</Chip>
                    ))}
                    </div> : ('')
                  }
                </Fragment>
              )
            }
          ]}
          defaultPageSize={10}
       />
    )
  }
}

export default Table
