import React, { Component, Fragment } from 'react'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import PropTypes from 'prop-types'
import './Tile.css'

const style = {
  width: 300,
  margin: 10,
  display: 'inline-block',
};

class Tile extends Component {

  static propTypes = {
    bookmark: PropTypes.object.isRequired,
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func,
  }

  static defaultProps = {
    handleDelete: () => {},
    handleEdit: () => {},
  }

  render() {
    return (
      <Paper style={style} zDepth={1}>
        <div className="Tile-container">
          {this.props.bookmark.isVideo ? (<img alt="vimeo" src="vimeo.png"/>) : (<img alt="flickr" src="flickr.png"/>)}
          <div className="Tile-title-container">
            <span className="Tile-title Tile-ellipsis">{this.props.bookmark.title}</span>
            <EditIcon onClick={this.props.handleEdit}/>
            <DeleteIcon onClick={this.props.handleDelete}/>
          </div>
          <a className="Tile-url Tile-ellipsis" href={this.props.bookmark.url}>{this.props.bookmark.url}</a>
          <div className="Tile-row">
            <span className="Tile-row-title Tile-text">Author</span>
            <span className="Tile-author Tile-ellipsis Tile-text">{this.props.bookmark.author ? this.props.bookmark.author: 'unknown'}</span>
          </div>
          <div className="Tile-container-row">
            <div className="Tile-row">
              <span className="Tile-row-title Tile-text">Height</span>
              <span className="Tile-text">{this.props.bookmark.height ? `${this.props.bookmark.height}px` : 'unknown'}</span>
            </div>
            <div className="Tile-row">
              <span className="Tile-row-title Tile-text">Width</span>
              <span className="Tile-text">{this.props.bookmark.width ? `${this.props.bookmark.width}px` : 'unknown'}</span>
            </div>
          </div>
          {this.props.bookmark.isVideo &&
            <Fragment>
              <div className="Tile-row">
                <span className="Tile-row-title Tile-text">Duration</span>
                <span className="Tile-text">{this.props.bookmark.fancyDuration ? this.props.bookmark.fancyDuration : 'unknown' }</span>
              </div>
            </Fragment>
          }
          {this.props.bookmark.tags.length ?
            <div className="Tile-tags-container">
              {this.props.bookmark.tags.map((tag, index) => (
              <Chip key={index} style={{ margin: "4px"}}>{tag}</Chip>
            ))}
            </div> : ('')
          }
        </div>
      </Paper>
    )
  }
}

export default Tile
