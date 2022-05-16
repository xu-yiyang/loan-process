import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import defaultTheme from './theme/default.json'
import GlobalStyle from './global'
import { IThemeProviderPropTypes } from './prop-types'

let currentTheme: any = defaultTheme
export const getCurrentTheme = () => currentTheme

export default class extends React.Component<IThemeProviderPropTypes> {
  public componentDidMount() {
    currentTheme = this.props.theme
  }

  public componentDidUpdate() {
    currentTheme = this.props.theme
  }

  public render() {
    const { children, theme } = this.props

    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        {children}
      </ThemeProvider>
    )
  }
}
