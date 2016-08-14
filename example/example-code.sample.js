import React from 'react'
import { render } from 'react-dom'
import GoogleMap from 'google-map-react'

const map = (
  <GoogleMap
    defaultCenter={{ lat: 40.7127837, lng: -74.0059413 }}
    defaultZoom={9} 
  />
)

render(map, document.body.children[0])
