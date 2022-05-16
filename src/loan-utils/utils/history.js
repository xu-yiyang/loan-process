import { createBrowserHistory, createMemoryHistory } from 'history';
// use this way to fix bug(Invariant Violation: Browser history needs a DOM)
export const history = (typeof window !== 'undefined'
  ? createBrowserHistory()
  : createMemoryHistory());

// export const hashHistory = createHashHistory({})