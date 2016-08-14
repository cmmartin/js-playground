import React, { Component, PropTypes } from 'react'

export default class REPL extends Component {

  static propTypes = {
    tabs: PropTypes.array,
    activeTab: PropTypes.any,
    onActiveTabChange: PropTypes.func
  }

  render() {
    const {
      tabs,
      activeTab,
      onActiveTabChange,
      className,
    } = this.props

    return (
      <div className={className}>
        <ul className="inner">
          {tabs.map(tab => (
            <li key={tab} className={ 'tab' + (tab === activeTab ? ' active' : '') }>
              <a href="#"
                className="inner"
                onClick={() => onActiveTabChange(tab)}>
                { tab.toUpperCase() }
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
