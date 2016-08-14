import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import CodeEditor from 'react-codemirror'
import Tabs from './components/Tabs'
import Playground from './components/Playground'
import Babel from './components/Babel'
import ParseError from './components/ParseError'
import debounce from 'lodash/debounce'

const tabs = ['es🚀', 'es5', 'ast']

@Babel()
export default class REPL extends Component {

  static propTypes = {
    code: PropTypes.string.isRequired,
    onCodeChange: PropTypes.func.isRequired,
    dependencies: PropTypes.object,
    babel: PropTypes.shape({
      result: PropTypes.shape({
        code: PropTypes.string,
        ast: PropTypes.object,
      }),
      error: PropTypes.instanceOf(Error),
    }),
    options: CodeEditor.propTypes.options
  }

  static defaultProps = {
    babel: {
      result: { code: '' }
    },
    dependencies: {},
    options: {
      mode: 'jsx',
      lineNumbers: true
    }
  }

  state = {
    tab: 'es🚀',
    runtimeError: null
  }

  render() {
    const { 
      tab, 
      runtimeError 
    } = this.state

    const {
      code,
      onCodeChange,
      babel,
      dependencies,
      options,
      containerWidth,
      containerHeight,
    } = this.props

    return (
      <section className="repl">
        <div className="playground">
          {(babel.error || runtimeError) &&  (
            <ParseError>
              { (babel.error || runtimeError).toString() }
            </ParseError>
          )}
          <Playground 
            code={babel.result.code}
            dependencies={dependencies}
            style={{ outline: 0 }}
            onRuntimeError={ (e) => this.setState({ runtimeError: e }) }
          />
        </div>
        <div className="code">
          <div className="inner">
            <Tabs 
              className="tabs"
              tabs={tabs} 
              activeTab={tab} 
              onActiveTabChange={
                (tab) => this.setState({ tab })
              } 
            />
            <div className="editor">
              { this._renderTab(tab) }
            </div>
          </div>
        </div>
      </section>
    )
  }

  _renderTab(tab) {
    const {
      onCodeChange,
      options
    } = this.props

    const props = {
      options,
      value: this._getCodeForTab(tab),
      onChange: onCodeChange
    }

    return <CodeEditor { ...props } />
  }

  _getCodeForTab(tab) {
    const { code, babel } = this.props
    switch(tab) {
      case 'es5':
        return babel.result.code
      case 'es🚀':
        return code
      case 'ast':
        return JSON.stringify(babel.result.ast, null, 2)
      default:
        return ''
    }
  }
}


