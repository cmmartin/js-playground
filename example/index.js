import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import REPL from '../src/REPL'
import GoogleMap from 'google-map-react'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/zenburn.css'
import 'codemirror/mode/jsx/jsx'
import './example.less'

import code from 'raw!./example-code.sample.js'

const editorOptions = {
  mode: 'jsx',
  lineNumbers: true,
  theme: 'zenburn'
}

export class REPLDemo extends Component {

  state = { code }

  render() {
    return (
      <REPL 
        code={this.state.code}
        dependencies={{ 
          'react': React,
          'react-dom': ReactDOM,
          'google-map-react': GoogleMap
        }}
        onCodeChange={(code) => this.setState({ code })}  
        options={editorOptions}
      />
    )
  }
}

render(<REPLDemo />, document.querySelector('#react-mount-node'))
