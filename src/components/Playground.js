import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Dimensions from 'react-dimensions'
import invariant from 'invariant'

// Inspired by: 
// https://github.com/ryanseddon/react-frame-component/blob/master/index.js

@Dimensions()
export default class Playground extends Component {

  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    initialContents: PropTypes.string,
    onRuntimeError: PropTypes.func,
  }

  static defaultProps = {
    initialContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            html, body {
              margin: 0;
              height: 100%;
            }
            .mount {
              height: 100%;
            }
          </style>
        </head>
        <body>
          <div class="mount"></div>
        </body>
      </html>
    `,
  }

  get window() {
    const doc = this.document
    return doc.defaultView || doc.parentWindow
  }

  get document() {
    return ReactDOM.findDOMNode(this).contentDocument
  }

  docIsReady() {
    const doc = this.document
    if (doc && doc.readyState === 'complete') {
      doc.open()
      doc.write(this.props.initialContent)
      doc.close()
      return true
    }
    return false
  }

  componentDidMount() {
    const ready = this.tryToRefresh()
    if (!ready) this.setTimeout(this.tryToRefresh, 0)
  }

  componentDidUpdate(prevProps, prevState) {
    const { code } = this.props
    if (this.window && code !== prevProps.code) {
      this.refresh()
    }
  }

  tryToRefresh() {
    if (this.docIsReady()) {
      this.window.opener = null // security
      this.refresh()
      return true
    }
    return false
  }

  refresh() {
    const { dependencies, code, onRuntimeError } = this.props
    this.window.__packages = dependencies
    this.window.require = (pkg) => {
      invariant(this.window.__packages[pkg], 
        `Package ${ pkg } not found`)
      return this.window.__packages[pkg]
    }
    let err = null
    try{
      this.window.eval.call(this.window, code)
    } catch(e) {
      err = e
    }
    if (onRuntimeError) onRuntimeError(err)
  }

  render() {
    const {
      head,
      containerWidth,
      containerHeight,
      style,
      children,
      className,
    } = this.props

    const styles = {
      width: containerWidth,
      height: containerHeight,
      ...style
    }

    return (
      <iframe 
        style={styles} 
        className={className} 
      />
    )
  }
}
