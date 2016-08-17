import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import GoogleMap from 'google-map-react'

class Marker extends Component {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  }

  static defaultProps = {
    width: 40,
    height: 40,
  }

  render() {
    const style = this._getStyle(this.props)
    return (
      <div style={style}>{ this.props.children }</div>
    )
  }

  _getStyle = ({ width, height }) => ({
    position: 'absolute',
    width,
    height,
    left: -width / 2,
    top: -height / 2,
    border: '5px solid #f44336',
    borderRadius: height,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
    lineHeight: 2.5,
    padding: 4
  })
}

const NYC = { lat: 40.7127837, lng: -74.0059413 }

const map = (
  <GoogleMap
    defaultCenter={NYC}
    defaultZoom={5}>
    <Marker { ...NYC }>NYC</Marker>
  </GoogleMap>
)

render(map, document.body.children[0])

