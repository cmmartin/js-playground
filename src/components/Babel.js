import React, { Component, PropTypes } from 'react'
import invariant from 'invariant'

export default function makeBabelHOC() {
  return function (InnerComponent) {
    return class Babel extends Component {
      static propTypes = {
        code: PropTypes.string.isRequired,
        babelOptions: PropTypes.shape({
          presets: PropTypes.array,
          plugins: PropTypes.array,
          // plus a lot more
          // https://babeljs.io/docs/usage/options/
        }),
        onBabelOptionsChange: PropTypes.func
      }

      static defaultProps = {
        code: '// hello world',
        babelOptions: { 
          presets: ['react', 'es2015', 'stage-1'] 
        },
        onBabelOptionsChange: () => {}
      }

      state = {
        result: {}
      }

      componentDidMount() {
        invariant(window.Babel, `
          Babel is not defined. You need to include babel-standalone.
          https://unpkg.com/babel-standalone/babel.min.js
        `)
        this.setState(this._transform(this.props.code, this.props.babelOptions))
      }

      componentWillReceiveProps(nextProps) {
        const codeChanged = nextProps.code !== this.props.code
        const configChanged = nextProps.babelOptions !== this.props.babelOptions
        if (codeChanged || configChanged) {
          this.setState(this._transform(nextProps.code, nextProps.babelOptions))
        }
      }

      render() {

        const {
          babelOptions,
          onBabelOptionsChange,
          ...rest,
        } = this.props

        const propsToForward = {
          ...rest,
          babel: {
            ...this.state,
            options: babelOptions,
            onOptionsChange: onBabelOptionsChange
          }
        }
        return <InnerComponent { ...propsToForward } />
      }

      _transform(code, options) {

        let result
        try {
          result = {
            result: window.Babel.transform(code, options),
            error: null,
          }
        } catch(error) {
          result = {
            result: { code: '' },
            error,
          }
        }

        return result
      }
    }
  }
}