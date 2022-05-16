/* eslint-enable */
import React, { Component } from 'react'
import propTypes from 'prop-types'
// import { closeLoading } from '../../utils'
// import Stat from '@wac/skyline-stat-dianshi'

export const addAbilityOnEnter = onEnterLogic => WrappedComponent => {
  class RouteWithOnEnter extends Component {
    static contextTypes = {
      store: propTypes.object,
    }
    state = {
      externalDataIsReady: false,
      errorPage: false,
    }

    componentDidMount() {
      // let currentPathname = window?.location?.hash?.split('/')[1]
      // closeLoading()
      const { store } = this.context
      onEnterLogic(store)
        .then(() => {
          this.setState({
            externalDataIsReady: true,
          })
          // Stat.trackSinglePage({
          //   skl_page: `DS_API_PV`,
          //   DS_page_name: currentPathname.replace(/-/g, '_'),
          // })
        })
        .catch(error => {
          console.error(error)
          this.setState({
            externalDataIsReady: true,
          })
          // Stat.trackSinglePage({
          //   skl_page: `DS_API_PV`,
          //   DS_page_name: currentPathname.replace(/-/g, '_'),
          // })
        })
    }

    render() {
      return (
        <React.Fragment>
          {this.state.externalDataIsReady && <WrappedComponent {...this.props} />}
          {this.state.errorPage && <div> 页面出错了</div>}
        </React.Fragment>
      )
    }
  }

  return RouteWithOnEnter
}
