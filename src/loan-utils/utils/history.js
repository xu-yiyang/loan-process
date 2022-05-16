import {
  // createBrowserHistory,
  createMemoryHistory,
  createHashHistory
} from 'history';
// use this way to fix bug(Invariant Violation: Browser history needs a DOM)
export const history = (typeof window !== 'undefined'
  ? createHashHistory()
  : createMemoryHistory());

export const hashHistory = createHashHistory()