import * as sc from 'styled-components'
import { ITheme } from './prop-types'
import ThemeProvider, { getCurrentTheme } from './theme-provider'
import defaultTheme from './theme/default.json'

const { default: styled } = sc as sc.ThemedStyledComponentsModule<ITheme>

export default styled
export { styled, ThemeProvider, getCurrentTheme, defaultTheme }
export * from './other-api'
