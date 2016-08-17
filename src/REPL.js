import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import CodeEditor from 'react-codemirror'
import Playground from './components/Playground'
import Babel from './components/Babel'
import Tabs from 'react-toolbox/lib/tabs/Tabs'
import Tab from 'react-toolbox/lib/tabs/Tab'
import tabsTheme from './themes/tabs.scss'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import checkboxTheme from './themes/checkbox.scss'
import editorTheme from './themes/editor.scss'

const tabs = ['es🚀', 'es5', 'ast']

const presets = [
  'es2015',
  'es2015-loose',
  'react',
  'stage-3',
  'stage-2',
  'stage-1',
  'stage-0',
]

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
    options: CodeEditor.propTypes.options,
  }

  static defaultProps = {
    babel: {
      result: { code: '' }
    },
    dependencies: {},
    options: {
      mode: 'jsx',
      lineNumbers: true,
      theme: 'one-dark'
    }
  }

  state = {
    tab: 0,
    runtimeError: null,
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
            <parseerror>
              { (babel.error || runtimeError).toString() }
            </parseerror>
          )}
          <Playground 
            code={babel.result.code}
            dependencies={dependencies}
            onRuntimeError={ (e) => this.setState({ runtimeError: e }) }
          />
        </div>
        <div className="code">
          <div className="inner">
            <div className="presets">
              <div className="inner">
                {presets.map(preset => (
                  <Checkbox
                    key={preset}
                    theme={checkboxTheme}
                    checked={!!~babel.options.presets.indexOf(preset)}
                    label={preset}
                    onChange={this._onPresetToggled.bind(this, preset)}
                  />
                ))}
              </div>
            </div>
            <Tabs theme={tabsTheme} index={tab} onChange={(tab) => this.setState({ tab })}>
              {tabs.map(t => (
                <Tab key={t} label={t} theme={tabsTheme}>
                  <div className="editor">
                    { this._renderTab(tabs[tab]) }
                  </div>
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
    )
  }

  _onPresetToggled(preset, checked) {
    const { babel } = this.props
    if (checked) {
      babel.onOptionsChange({ 
        presets: [ ...babel.options.presets, preset ] 
      })
    } else {
      babel.onOptionsChange({
        presets: babel.options.presets.filter(p => p !== preset)
      })
    }
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


