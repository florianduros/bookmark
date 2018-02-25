import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Tile from '../Tile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider><Tile bookmark={{ tags: [] }}/></MuiThemeProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

const testFunctionHandle = (mock, jsx, index) => {
  const div = document.createElement('div');
  const mui = ReactDOM.render(jsx, div);
  const icon = ReactTestUtils.scryRenderedDOMComponentsWithTag(mui, 'svg')[index]
  ReactTestUtils.Simulate.click(icon)
  expect(mock.mock.calls.length).toBe(1);
  ReactDOM.unmountComponentAtNode(div)
}

it('call handleEdit', () => {
  const mock = jest.fn();
  testFunctionHandle(mock, <MuiThemeProvider><Tile bookmark={{ tags: [], width: 15 }} handleEdit={mock}/></MuiThemeProvider>, 0)
});

it('call handleDelete', () => {
  const mock = jest.fn();
  testFunctionHandle(mock, <MuiThemeProvider><Tile bookmark={{ tags: [], height: 15 }} handleDelete={mock}/></MuiThemeProvider>, 1)
});
