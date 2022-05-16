/**
 * 分离 other-api 以避免循环依赖
 */

import * as sc from 'styled-components'
import { ITheme } from './prop-types'

const { css, createGlobalStyle, keyframes } = sc as sc.ThemedStyledComponentsModule<ITheme>

export { css, createGlobalStyle, keyframes }
