export interface ITheme {
  // hx_theme: string
  // hx_theme_hover: string
  // hx_theme_loading: string
  // hx_theme_rgba: string
  // hx_theme_border: string
  // hx_theme_title_border: string
  // hx_theme_btn_border: string
  // hx_theme_text:  string
  // hx_theme_default_text: string
  // hx_theme_btn_text: string
  // hx_theme_border_bottom:string
  // hx_theme_txt: string
  // successColor: string
  // warningColor: string
  // errorColor: string
  // disabledColor: string
  // btn_border_color: string
  // // 主色
  // primaryColor: string

  // // 辅色
  // linkColor: string             // 链接色
  // successColor: string          // 成功色
  // warningColor: string          // 警告色
  // errorColor: string            // 错误色

  // // 效果色
  // borderColor: string           // 边框色
  // disabledColor: string         // 失效色
  // activeColor: string           // 活动色

  // // 文本色
  // textColorHeading: string      // 标题色
  // textColor: string             // 主文本色
  // textColorSecondary: string    // 次文本色
  // textColorDisabled: string     // 失效色

  // // 字号
  // fontSizeBase: string          // 主字号
  // fontSizeSecondary: string     // 次字号

  // // 视觉效果
  // horizonPaddingBase: string    // 水平内边距
  // borderRadiusBase: string      // 圆角
  // boxShadow: string             // 卡片阴影
}

export interface IThemeProviderPropTypes {
  theme?: ITheme
  children?: React.ReactNode
}
