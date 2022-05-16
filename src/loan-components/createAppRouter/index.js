import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

class CreateAppRouter extends React.Component {
  genRouteComponent = route => {
    const { path, component: RouteComp } = route;
    return(
      <Route
        key={path}
        path={path}
        render={props => {
          // const hasAuth = !permissionKey || this.state.auth[permissionKey];
          return <RouteComp {...props} />
        }}
      />
    );
  }
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Redirect exact from='/' to='/credit-items-scene' />
          {this.props.routesConfig.map((route) => (this.genRouteComponent(route)))}
        </Switch>
      </React.Fragment>
    )
  }
}

export {
  CreateAppRouter
}
