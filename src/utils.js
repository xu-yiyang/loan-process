import { loadable } from 'loan-components';
import { isObject, isString } from 'loan-utils';

export const AsyncLoading = (module) => {
  if (isString(module) || (isObject(module) && !module.componentConfig)){
    return loadable(
      () =>
        Promise.all([
            import(`./scene/index.js`),
            // import(`./scene-config/index/config.js`),
            import(`./scene/${module.componentName || module}/index.js`),
          ]).then(([index, components]) => {
              return index.default(components.default)
          }).catch(err => {
            console.error(err, 'AsyncLoading');
          })
    )
  } else if (isObject(module)) {
    return loadable(
      () =>
        Promise.all([
            import(`./scene/index.js`),
            import(`./scene/${module.componentName}/index.js`),
            import(`./scene-config/${module.componentConfig}/config.js`),
          ]).then(([index, components, componentsConfig]) => {
            return index.default(components.default, componentsConfig.default)
          }).catch(err => {
            console.error(err, 'AsyncLoading');
          })
    )
  }
}