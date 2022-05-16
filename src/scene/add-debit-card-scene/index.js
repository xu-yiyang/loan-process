import React, { Component } from 'react';
import { Button, Toast, InputItem } from 'antd-mobile';
import { styled, Card } from 'loan-ui';
import { parse } from 'query-string';
import { ConfigContext, addAbilityOnEnter } from 'loan-utils';
import { NavWrap, ListForm, PickerItem } from 'loan-components';
import { connect } from 'react-redux'
import { createForm, formShape } from 'rc-form';
import selectors from './external-data-selector'
import { prepareSceneData, actions } from './external-data-action'

const Btn = styled.div`
  margin: 0.6rem 0;
`

const InputRight = styled.div`
  .am-list-item .am-input-control input {
    text-align: right;
    font-size: 0.28rem;
  }
`

class AddDebitCardScene extends Component {
  static contextType = ConfigContext;
  static propTypes = {
    form: formShape,
  };

  submit = () => {
    const { validateFields, getFieldError } = this.props.form;
    validateFields({ force: true }, (error, value) => {
      if (!error) { // 没有错误的话我们就可以根据form数据进行提交了
        var back = this.props?.supportBanksList?.find(item => {
          return item.value === value.back[0]
        })
        this.props.bank_card({
          bank_account: value.bank_account,
          bank_user_name: value.bank_user_name,
          bank_code: back.value,
          bank_name: back.label,
        }, parse(this.props.location.search))
      } else {
        // 有错误的话那就进行错误处理
        const errors = getFieldError('back')?.join(',') || getFieldError('bank_user_name')?.join(',') || getFieldError('bank_account')?.[0];
        Toast.fail(errors, 1);
      }
    });
  }

  render() {
    const { text } = this.context
    const { getFieldProps } = this.props.form;
    return (
      <NavWrap title={text.addDebitCardScene_title} isBgDiv={false}>
        <Card isPadding={false}>
          <ListForm>
            <PickerItem
              data={this.props?.supportBanksList || []}
              label={text.addDebitCardScene_card_name}
              name='back'
              getFieldProps={getFieldProps}
              rules={[
                { required: true, message: text.addDebitCardScene_card_name }
              ]}
            />
            <InputRight>
              <InputItem
                {...getFieldProps('bank_user_name', {
                  // initialValue: item.value,
                  rules: [
                    { required: true, message: text.addDebitCardScene_pop_name },
                  ]
                })}
                labelNumber={5}
                // error={validator && error}
                // onErrorClick={validator && onErrorClick}
              >
                {text.addDebitCardScene_pop_name}
              </InputItem>
            </InputRight>
            <InputRight>
              <InputItem
                {...getFieldProps('bank_account', {
                  // initialValue: item.value,
                  rules: [
                    { required: true, message: text.addDebitCardScene_card_num },
                    { validator: (rule, value, callback) => {
                      if (/^\d{10,16}$/.test(value)) { 
                        callback()
                      }
                      callback('Informasi Anda tidak memenuhi spesifikasi. Silakan masukkan 10–16 digit') 
                    }}
                  ]
                })}
                labelNumber={5}
                type='digit'
              >
                {text.addDebitCardScene_card_num}
              </InputItem>
            </InputRight>
          </ListForm>
        </Card>
        <Btn>
          <Button type="primary" size='large' onClick={() => {
            this.submit()
          }}>
            {text.addDebitCardScene_btn}
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
  )(createForm()(AddDebitCardScene))
)