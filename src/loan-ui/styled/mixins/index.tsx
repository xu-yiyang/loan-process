import { css } from '..'

export const active = css`
  &:active {
    background-color: ${(props) => props.theme.hx_theme_hover};
  }
`

export const textOverflow = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const bigZIndex = (n: number = 0) => css`
  z-index: ${1000 + n};
`
