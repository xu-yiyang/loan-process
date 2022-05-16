import { css } from '../other-api'

export default css`
  *,
  *::before,
  *::after {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  *[contenteditable] {
    -webkit-user-select: auto !important;
  }

  *:focus {
    outline: none;
  }

  html,
  body {
    font-family: PingFang SC, Helvetica Neue, Hiragino Sans GB, Helvetica, Microsoft YaHei, Arial;
    font-size: ${(props) => props.theme.hx_theme};
  }

  a {
    background: transparent;
    text-decoration: none;
    outline: none;
  }

  input {
    -webkit-appearance: none;
  }
`
