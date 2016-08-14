import React, { Component, PropTypes } from 'react'
import invariant from 'invariant'

/*
  Presets:
  ---------------
  'es2015',
  'es2015-loose',
  'react',
  'stage-0',
  'stage-1',
  'stage-2',
  'stage-3',
*/

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
        })
      }

      static defaultProps = {
        code: '// hello world',
        babelOptions: { 
          presets: ['react', 'es2015', 'stage-1'] 
        }
      }

      state = this._transform(this.props.code)

      componentDidMount() {
        invariant(window.Babel, `
          Babel is not defined. You need to include babel-standalone.
          https://npmcdn.com/babel-standalone/babel.min.js
        `)
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.code !== this.props.code) {
          this.setState(this._transform(nextProps.code))
        }
      }

      render() {

        const {
          babelOptions,
          ...rest
        } = this.props

        const propsToForward = {
          ...rest,
          babel: this.state
        }
        return <InnerComponent { ...propsToForward } />
      }

      _transform(code) {
        const { babelOptions } = this.props

        let result
        try {
          result = {
            result: window.Babel.transform(code, babelOptions),
            error: null
          }
        } catch(error) {
          result = {
            result: { code: '' },
            error
          }
        }

        return result
      }
    }
  }
}