import React, { Component } from 'react';
import { styled } from 'loan-ui';
import { ConfigContext, getToken, history } from 'loan-utils';

const Wrap = styled.div`
  background:rgba(237,237,237,1);
  min-height: 100vh;
`

const indexScene = (Components, componentsConfig) => {
  return class Index extends Component {
    render() {
      if(!window.location.hash.includes('credit-items-scene') && !window.location.hash.includes('login-scene') && !getToken()) {
        history.replace('login-scene')
      }
      return (
        <ConfigContext.Provider value={componentsConfig}>
          <Wrap>
            <Components {...this.props} />
          </Wrap>
        </ConfigContext.Provider>
      );
    }
  }
}

const index = (Components, componentsConfig) => {
  // return inject('userStore')(observer(indexScene(Components,componentsConfig)))
  return indexScene(Components,componentsConfig)
}

export default index