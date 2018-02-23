import React, { Component, Fragment } from 'react'
import Paper from 'material-ui/Paper'
import './Tile.css'

const style = {
  height: 154,
  width: 300,
  margin: 20,
  display: 'inline-block',
};

class Tile extends Component {
  render() {
    return (
      <Paper style={style} zDepth={1}>
        <div className="Tile-container">
          {this.props.bookmark.isVideo ? (<img alt="vimeo" src="vimeo.png"/>) : (<img alt="flickr" src="flickr.png"/>)}
          <span className="Tile-title Tile-ellipsis">{this.props.bookmark.title}</span>
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
                <span className="Tile-text">{this.props.bookmark.duration ? this.props.bookmark.duration : 'unknown' }</span>
              </div>
            </Fragment>
          }
        </div>
      </Paper>
    )
  }
}

export default Tile