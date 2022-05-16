// import 'react-app-polyfill/ie9';
// import 'core-js'
import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { history, createRootReducer, middlewareWithHashHistory, isDev, isTest } from 'loan-utils'
import { CreateAppRouter } from './loan-components'
import { routesConfig } from './router-config'
import { ThemeProvider, defaultTheme } from './loan-ui/styled'
import './rem'
import { defaultState } from './default-state'
import './global.less';
import * as serviceWorker from './serviceWorker'
import { LocaleProvider } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US'; // 英文
// import { IntlProvider } from 'react-intl';
// import id_ID_Config from './locales/id_ID';
import { vconsole } from './vconsole';
if (isDev || isTest) {
  vconsole(routesConfig, history)
}

if (process.env.REACT_APP_MOCK) {    // 判断是否为mock模式
  require('./mock/index.js')
}

let store: any = createStore(createRootReducer(defaultState), middlewareWithHashHistory)
render(
  <Provider store={store}>
    <Router history={history}>
      {/* <IntlProvider locale="zh" messages={id_ID_Config}> */}
        <LocaleProvider locale={enUS}>
          <ThemeProvider theme={defaultTheme}>
            <CreateAppRouter routesConfig={routesConfig} />
          </ThemeProvider>
        </LocaleProvider>
      {/* </IntlProvider> */}
    </Router>
  </Provider>,
  document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
