import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import REPL from '../src/REPL'
import Babel from '../src/components/Babel'
import GoogleMap from 'google-map-react'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/zenburn.css'
import 'codemirror/mode/jsx/jsx'
import './example.less'

const editorOptions = {
  mode: 'jsx',
  lineNumbers: true,
  theme: 'zenburn'
}

const code = `

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import GoogleMap from 'google-map-react'

const K_WIDTH = 40
const K_HEIGHT = 40

const mapMarkerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '5px solid #f44336',
  borderRadius: K_HEIGHT,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  fontFamily: 'Helvetica Neue',
  lineHeight: 2.5,
  padding: 4
}

const map = (
  <GoogleMap
    defaultCenter={{ lat: 40.7127837, lng: -74.0059413 }}
    defaultZoom={9}>
    <div style={mapMarkerStyle} lat={40.7127837} lng={-74.0059413}>NYC</div>
  </GoogleMap>
)

ReactDOM.render(map, document.body.children[0])

`

export class REPLDemo extends React.Component {

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

ReactDOM.render(<REPLDemo />, document.querySelector('#react-mount-node'))
