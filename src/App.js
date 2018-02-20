import React, { Component } from 'react'
import 'roboto-npm-webfont'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css'
import Header from './Header'
import Body from './Body'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header/>
          <Body/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App
