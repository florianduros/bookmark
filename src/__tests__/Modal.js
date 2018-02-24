import React from 'react'
import ReactDOM from 'react-dom'
import Modal from '../Modal'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MuiThemeProvider><Modal open={false} title={"title"}/></MuiThemeProvider>, div)
  ReactDOM.unmountComponentAtNode(div)
});
