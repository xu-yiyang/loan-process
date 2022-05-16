import React, { Component } from 'react';
import { List, Button, Modal, InputItem, DatePicker, Toast } from 'antd-mobile';
import { createForm, formShape } from 'rc-form';
import { connect } from 'react-redux'
import { parse } from 'query-string';
import { styled, Card, css } from 'loan-ui';
import { addAbilityOnEnter, ConfigContext, history } from 'loan-utils';
import { NavWrap, PickerItem, ListForm, Steps } from 'loan-components';
import selectors from './external-data-selector'
import { prepareSceneData, actions } from './external-data-action'
import Img from 'assets/backImg.png';

const provinces = require('./provinces.json');

const alert = Modal.alert;
const { Item } = List;

const Btn = styled.div`
  margin: 0.6rem 0;
`

const ImgDiv = styled.div`
  img {
    width: 3rem;
  }
`

const Label = styled.div`
  font-size:0.3rem;
  margin-top: 0.2rem;
  p {
    color:rgba(0,0,0,1);
  }
  .am-list-item .am-input-label, .am-list-item .am-list-line .am-list-content {
    color: #888888;
  }
`

const InputRight = styled.div`
  .am-list-item .am-input-control input {
    text-align: right;
    color: #888;
    font-size: 0.28rem;
  }
`

const ErrorInput = styled.div`
  ${(props) => props.error && css`
    .am-list-item .am-list-line .am-list-content, .am-list-item .am-input-label, .am-list-item .am-list-line .am-list-content {
      color: red !important;
    }
  `}
`

class BaseInfoScene extends Component {
  static contextType = ConfigContext;
  static propTypes = {
    form: formShape,
  };

  componentDidMount() {
    if(sessionStorage.getItem('step') !== '3') {
      if (window.history && window.history.pushState) {
        // 监听手机返回
        window.history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.goBack, false);
  }

  goBack() {
    alert(<ImgDiv><img src={Img} alt='' /></ImgDiv>, 'kurang satu langkah untuk mendapatkan limit maksimal Rp 8.000.000, yakin untuk kembali?', [
      { text: 'Yakin', onPress: () => {
        history.replace('credit-items-scene')
      }},
      { text: 'Batal' }
    ])
  }

  inputHtml = (item) => {
    const { getFieldProps, getFieldError } = this.props.form;
    // let errors;
    switch (item.type) {
      case 0: // 输入框
        let type = 'text'
        let validator = null
        let error = getFieldError(item.key) ? true : false;
        const onErrorClick = () => {
          Toast.info('E-mail tidak memenuhi soesifikasi');
        }
        if (item.key === 'income') {
          type = 'digit'
        } else if (item.key === 'company_phone') {
          type='phone'
        } else if (item.key === 'email') {
          validator = (rule, value, callback) => {
            if (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) { 
              callback()
            }
            callback('E-mail tidak memenuhi soesifikasi') 
          }
        }
        return <ErrorInput error={error} key={item.key}>
          <InputItem
            {...getFieldProps(item.key, {
              initialValue: item?.value,
              rules: [
                { required: true, message: item.title },
                { validator: validator}
              ]
            })}
            labelNumber={7}
            type={type}
            error={validator && error}
            onErrorClick={validator && onErrorClick}
            
          >
            {item.title}
          </InputItem>
          {/* {(errors = getFieldError(item.key)) ? <Error>{errors.join(',')}</Error> : null} */}
        </ErrorInput>
      case 1: // 单选框
        const options = item.options.map(item => {
          return {
            label: item,
            value: item
          }
        })
        return <ErrorInput error={getFieldError(item.key) ? true : false} key={item.key}>
          <PickerItem
            name={item.key}
            getFieldProps={getFieldProps}
            rules={[
              { required: true, message: item.title }
            ]}
            data={options}
            label={item.title}
            pickerVal={item.value && [item.value]}
          />
        </ErrorInput>
      case 2: // 地区
        return <ErrorInput error={getFieldError(item.key) ? true : false} key={item.key}>
          <PickerItem
            name={item.key}
            getFieldProps={getFieldProps}
            rules={[
              { required: true, message: item.title }
            ]}
            pickerVal={item?.value?.split('.')}
            data={provinces}
            label={item.title}
            cols={4}
          />
        </ErrorInput>
      case 4: // 日期
        return <ErrorInput error={getFieldError(item.key) ? true : false} key={item.key}>
          <DatePicker
            mode="date"
            {...getFieldProps(item.key, {
              rules: [
                { required: true, message: item.title }
              ]
            })}
          >
            <Item arrow="horizontal">{item.title}</Item>
          </DatePicker>
        </ErrorInput>
      default:
        break;
    }
  }

  submit = () => {
    const { validateFields } = this.props.form;
    validateFields({ force: true }, (error, value) => {
      if (!error) { // 没有错误的话我们就可以根据form数据进行提交了
        this.props.user_basic({
          info: {
            user_type: value.user_type[0],
            loan_remark: value.loan_remark[0],
            education: value.education[0],
            marital_status: value.marital_status[0],
            children_number: value.children_number[0],
            religion: value.religion[0],
            income: value.income,
            province: value.province.join('.'),
            address: value.address,
            residence_duration: value.residence_duration[0],
            email: value.email,
            whatsApp: value.whatsApp,
            profession: value.profession[0],
            company_name: value.company_name,
            company_province: value.company_province.join('.'),
            company_address: value.company_address,
            company_phone: value.company_phone,
            salary: value.salary[0],
            workTime: value.workTime[0]
          },
          loancontacts_set: [{
            'mobile': value.mobile1.replace(/\s/g, ''),
            'name': value.name1,
            'relation': value.relation1
          }, {
            'mobile': value.mobile2.replace(/\s/g, ''),
            'name': value.name2,
            'relation': value.relation2
          }]
        }, parse(this.props.location.search))
      } else {
        Toast.info('Harap lengkapi informasinya', 1);
        // 有错误的话那就进行错误处理
        // Toast.info(error);
      }
    });
  }

  render() {
    const { text } = this.context
    const { getFieldProps, getFieldError } = this.props.form;
    const { loancontacts_set, relation_list } = this.props
    return (
      <NavWrap title={text.baseInfoScene_title} isBgDiv={false}>
        {parse(this.props.location.search).history ? '' : <Steps current={1} />}
        <InputRight>
          <Card>
            <ListForm>
              {
                this.props?.inputItem?.map(item => {
                  if(item.index === 0) {
                    return this.inputHtml(item)
                  }
                })
              }
            </ListForm>
          </Card>
          <br/>
          <Card isPadding>
            <ListForm>
              <Label>
                <p>{text.baseInfoScene_contacts_1}</p>
                <ErrorInput error={getFieldError('name1') ? true : false}>
                  <InputItem
                    {...getFieldProps('name1', {
                      initialValue: loancontacts_set?.[0]?.name,
                      rules: [
                        { required: true, message: text.baseInfoScene_contacts_name }
                      ]
                    })}
                    labelNumber={5}
                  >
                    {text.baseInfoScene_contacts_name}
                  </InputItem>
                </ErrorInput>
                <ErrorInput error={getFieldError('mobile1') ? true : false}>
                  <InputItem
                    {...getFieldProps('mobile1', {
                      initialValue: loancontacts_set?.[0]?.mobile,
                      rules: [
                        { required: true, message: text.baseInfoScene_contacts_mobile }
                      ]
                    })}
                    type='phone'
                    labelNumber={5}
                  >
                    {text.baseInfoScene_contacts_mobile}
                  </InputItem>
                </ErrorInput>
                <ErrorInput error={getFieldError('relation1') ? true : false}>
                  <PickerItem
                    name='relation1'
                    getFieldProps={getFieldProps}
                    rules={[
                      { required: true, message: text.baseInfoScene_contacts_relation }
                    ]}
                    data={relation_list}
                    // eslint-disable-next-line
                    pickerVal={eval(loancontacts_set?.[0]?.relation)}
                    label={text.baseInfoScene_contacts_relation}
                  />
                </ErrorInput>
              </Label>
              
              <Label>
                <p>{text.baseInfoScene_contacts_2}</p>
                <ErrorInput error={getFieldError('name2') ? true : false}>
                  <InputItem
                    {...getFieldProps('name2', {
                      initialValue: loancontacts_set?.[1]?.name,
                      rules: [
                        { required: true, message: text.baseInfoScene_contacts_name }
                      ]
                    })}
                    labelNumber={7}
                  >
                    {text.baseInfoScene_contacts_name}
                  </InputItem>
                </ErrorInput>
                <ErrorInput error={getFieldError('mobile2') ? true : false}>
                  <InputItem
                    {...getFieldProps('mobile2', {
                      initialValue: loancontacts_set?.[1]?.mobile,
                      rules: [
                        { required: true, message: text.baseInfoScene_contacts_mobile }
                      ]
                    })}
                    type='phone'
                    labelNumber={7}
                  >
                    {text.baseInfoScene_contacts_mobile}
                  </InputItem>
                </ErrorInput>
                <ErrorInput error={getFieldError('relation2') ? true : false}>
                  <PickerItem
                    name='relation2'
                    getFieldProps={getFieldProps}
                    rules={[
                      { required: true, message: text.baseInfoScene_contacts_relation }
                    ]}
                    // eslint-disable-next-line
                    pickerVal={eval(loancontacts_set?.[1]?.relation)}
                    data={relation_list}
                    label={text.baseInfoScene_contacts_relation}
                  />
                </ErrorInput>
              </Label>
            </ListForm>
          </Card>
          <br/>
          <Card>
            <ListForm>
              {
                this.props?.inputItem?.map(item => {
                  if(item.index === 1) {
                    return this.inputHtml(item)
                  }
                })
              }
            </ListForm>
          </Card>
        </InputRight>
        <Btn>
          <Button type='primary' size='large' onClick={() => {
            this.submit()
          }}>
            {text.baseInfoScene_btn}
          </Button>
        </Btn>
      </NavWrap>
    );
  }
}

export default connect(
  selectors,
  actions
)(
  addAbilityOnEnter(
    prepareSceneData()
  )(createForm()(BaseInfoScene))
)