import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import List from '../List';
import Tile from '../Tile';

const bookmarks = [
  {
    title: 'Title 1',
    isVideo: true,
    url: 'https://vimeo.com/25095383',
    author: 'Author 1',
    tags: ['tag1', 'tag2']
  },
  {
    title: 'Different',
    isVideo: true,
    url: 'https://vimeo.com/25095383',
    author: 'Author 2',
    tags: ['other tag']
  },
  {
    title: 'Other title',
    isVideo: false,
    url: 'https://vimeo.com/25095383',
    author: 'Author 3',
    tags: []
  },
]

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider><List bookmarks={bookmarks}/></MuiThemeProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('all the bookmarks are displayed', () => {
  const div = document.createElement('div');
  const mui = ReactDOM.render(<MuiThemeProvider><List bookmarks={bookmarks}/></MuiThemeProvider>, div);
  expect(ReactTestUtils.scryRenderedComponentsWithType(mui, Tile).length).toBe(3)
  ReactDOM.unmountComponentAtNode(div);
});

it('filter the bookmarks on title', () => {
  const div = document.createElement('div');
  const mui = ReactDOM.render(<MuiThemeProvider><List bookmarks={bookmarks} filter={'title' }/></MuiThemeProvider>, div);
  expect(ReactTestUtils.scryRenderedComponentsWithType(mui, Tile).length).toBe(2)
  ReactDOM.unmountComponentAtNode(div);
});

it('filter the bookmarks on title and tags', () => {
  const div = document.createElement('div');
  const mui = ReactDOM.render(<MuiThemeProvider><List bookmarks={bookmarks} filter={'other' }/></MuiThemeProvider>, div);
  expect(ReactTestUtils.scryRenderedComponentsWithType(mui, Tile).length).toBe(2)
  ReactDOM.unmountComponentAtNode(div);
});
