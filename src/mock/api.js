import Mock from 'mockjs'

let home = Mock.mock({
  code: 200,
  success: true,
  data: '@title(5)',
})

let sms_login = Mock.mock({
  token: '@guid',
})

let photosToken = Mock.mock({
  AccessKeyId: '@guid',
  AccessKeySecret: '@guid',
  SecurityToken: '@guid',
})

let api = {
  home,
  sms_login,
  photosToken
}
export default api