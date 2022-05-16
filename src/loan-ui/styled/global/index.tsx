import { createGlobalStyle } from '../other-api'
import normalize from './normalize'
import reset from './reset'

export default createGlobalStyle`
  ${normalize}
  ${reset}
`
