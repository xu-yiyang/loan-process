import Mock from 'mockjs'

let user_info_completeness = {
  code: 0,
  success: true,
  data: {
    step: 0
  },
}

let ktp_ocr = Mock.mock({
  code: 0,
  success: true,
  data: {
    name: '@cname',
    id_card_number: '@guid',
    birthday: '@now',
    gender: 'PEREMPUAN'
  },
})

let Loan = {
  user_info_completeness,
  ktp_ocr
}
export default Loan