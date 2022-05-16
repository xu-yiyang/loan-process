import Mock, { Random } from 'mockjs'

// 此处会劫持/api/v1/home接口，并返回数据
Mock.mock('/api/v1/home', 'get', () => {
  return Mock.mock({
    code: 200,
    success: true,
    data: '@title(5)',
  })
})

Mock.mock('/loan/app/user_info_completeness', 'post', () => {
  return {
    code: 0,
    success: true,
    data: {
      step: 1
    },
  }
})

Mock.mock('/api/v1/users/sms_login', 'post', () => {
  return Mock.mock({
    token: '@guid',
  })
})

Mock.mock('/api/v1/upload/photos/token', 'get', () => {
  return Mock.mock({
    AccessKeyId: '@guid',
    AccessKeySecret: '@guid',
    SecurityToken: '@guid',
  })
})

Mock.mock('/loan/app/ktp_ocr', 'post', () => {
  return Mock.mock({
    code: 0,
    success: true,
    data: {
      name: '@cname',
      id_card_number: '@guid',
      birthday: '@now',
      gender: 'PEREMPUAN'
    },
  })
})

Mock.mock('/loan/app/params', 'get', () => {
  return Mock.mock({
    code: 0,
    success: true,
    data: {
      other_fields: [{
        index: 0,
        type: 0,
        key: 'income',
        value: '',
        title: '姓名'
      },{
        index: 0,
        type: 0,
        key: 'company_phone',
        value: '',
        title: '手机'
      },{
        index: 1,
        type: 1,
        key: 'select1',
        value: '',
        title: '选项',
        options: ['选项1','选项2']
      },{
        index: 1,
        type: 2,
        key: 'arer',
        value: '',
        title: '地区',
      },{
        index: 1,
        type: 4,
        key: 'date',
        value: '',
        title: '日期',
      }],
      relation_list: [6, 7],
      loancontacts_set: [{
        name: 'adasd',
        mobile: '1392349282349',
        relation: '2 + 4',
      }, {
        name: 'adasd1',
        mobile: '1392349282349',
        relation: '2 + 5',
      }],
    },
  })
})

Mock.mock('/loan/app/support_banks', 'get', () => {
  return Mock.mock({
    code: 0,
    success: true,
    'data|1-10': [{
      bankName: '@name',
      bankCode: '@id'
    }],
  })
})

Mock.mock('/loan/app/bank_card', 'post', () => {
  return Mock.mock({
    code: 0,
    success: true,
  })
})

Mock.mock('/loan/app/user_banks', 'get', () => {
  const d = Mock.mock({
    'data|1-10': [{
      id: '@id',
      bank_name: '@name',
      bank_user_name: '@name',
      bank_account: '@guid'
    }],
  })
  return d.data
})

Mock.mock('/loan/need_liveness', 'post', () => {
  return Mock.mock({
    code: 0,
    data: 0,
  })
})

Mock.mock('/loan/app/loan_products', 'get', () => {
  const d = Mock.mock({
    'data|1-10': [{
      id: '@id',
      name: '@name',
      images: Random.image('200x200', '#FF6600'),
      api_contract: 1,
      api_amount: 1,
      loan_info: {
        'loan_amount|1-100': 100,
        'period|1-100': 100,
        'admin_amount|1-00': 100,
        'actual_amount|1-00': 100,
        'repay_total_amount|1-00': 100,
      },
    },{
      id: '@id',
      name: '@name',
      images: Random.image('200x200', '#FF6600'),
      api_contract: 0,
      api_amount: 0,
      loan_info: {
        'loan_amount|1-100': 100,
        'period|1-100': 100,
        'admin_amount|1-00': 100,
        'actual_amount|1-00': 100,
        'repay_total_amount|1-00': 100,
      },
    }],
  })
  return d.data
})

Mock.mock('/loan/app/get_contract', 'get', () => {
  return Mock.mock({
    code: 0,
    data: 'https://www.baidu.com/',
  })
})

Mock.mock('/loan/app/loan_amount_period', 'post', () => {
  const d = Mock.mock({
    'data|1-10': [{
      'loan_amount|1-100': 100,
      'repay_total_amount|1-100': 100,
      'actual_amount|1-00': 100,
    }],
  })
  return d.data
})

Mock.mock('/loan/app/apply_loans', 'post', () => {
  const d = Mock.mock({
    'data|1-10': [{
      'id': '@id',
      'product_icon': Random.image('200x200', '#FF6600'),
      'product_name': '@name',
      'loan_time': 1652666320,
      'loan_amount|1-100': 100,
    }],
  })
  return d.data
})

Mock.mock('/loan/app/user_basic', 'post', () => {
  return {
    info: '1'
  }
})

Mock.mock('/loan/app/user_orders', 'get', () => {
  const d = Mock.mock({
    'data|1-10': [{
      'user_orders': /100|200/,
      'id': '@name',
      'order_status|1-100': /200|90|100|170|175|180|169|110/,
      'product_icon': Random.image('200x200', '#FF6600'),
      'product_name': '@name',
      'loan_amount|1-100': 100,
      'repay_amount|1-100': 100,
      'actual_amount|1-100': 100,
      'interest_rate|1-100': 100,
      'interest_amount|1-100': 100,
      'admin_amount|1-100': 100,
      'loan_term|1-100': 100,
      'order_no': '@guid',
      'loan_time': '@now',
      'bank_card': {
        bank_user_name: '@name',
        bank_name: '@name',
        bank_account: '@id',
      },
      'api_contract': 1,
      'product_id': '@id',
    },]
  })
  return d.data
})

Mock.mock('/loan/app/user_orders/1', 'get', () => {
  const d = Mock.mock({
    'data': {
      'user_orders': /100|200/,
      'id': '@name',
      'order_status|1-100': /200|90|100|170|175|180|169|110/,
      'product_icon': Random.image('200x200', '#FF6600'),
      'product_name': '@name',
      'loan_amount|1-100': 100,
      'repay_amount|1-100': 100,
      'actual_amount|1-100': 100,
      'interest_rate|1-100': 100,
      'interest_amount|1-100': 100,
      'admin_amount|1-100': 100,
      'loan_term|1-100': 100,
      'order_no': '@guid',
      'loan_time': '@now',
      'bank_card': {
        bank_user_name: '@name',
        bank_name: '@name',
        bank_account: '@id',
      },
      'api_contract': 1,
      'product_id': '@id',
    },
  })
  return d.data
})

Mock.mock('/loan/app/payment_delay_h5', 'get', () => {
  return {
    code: 0,
    data: 'https://www.baidu.com'
  }
})

Mock.mock('/loan/app/payment_h5', 'get', () => {
  return {
    code: 0,
    data: 'https://www.baidu.com'
  }
})