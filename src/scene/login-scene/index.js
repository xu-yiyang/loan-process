import React, { Component } from 'react';
import { Button, InputItem, Flex, WhiteSpace, Toast } from 'antd-mobile';
import { connect } from 'react-redux'
import { createForm, formShape } from 'rc-form';
import { styled } from 'loan-ui';
import logo from './assets/logo.png';
import { NavWrap } from 'loan-components';
import { ConfigContext } from 'loan-utils';
import { actions } from './external-data-action'

const Wrap = styled.div`
  background: #fff;
  min-height: calc(100vh - 1rem);
`

const Content = styled.div`
  overflow: hidden; 
  padding: 0 0.7rem;
  img {
    display: block;
    width: 2rem;
    margin: 1rem auto;
  }
  .button {
    margin: 1rem 0 0.23rem;
  }
  .am-list-item {
    border: 1px solid #ddd;
  }
`

const Tip = styled.div`
  font-size:0.2rem;
  font-weight:400;
  color:rgba(136,136,136,1);
  line-height:0.28rem;
  a {
    color: #0E66FF;
  }
`

const Error = styled.p`
  color: red;
`

class LoginScene extends Component {
  static contextType = ConfigContext;
  static propTypes = {
    form: formShape,
  };
  state = {
    codeDisabled: true,
    phone: '',
    loginScene_code_btn: this.context.text.loginScene_code_btn
  }

  submit = () => {
    const { validateFields, getFieldsValue } = this.props.form;
    const { text } = this.context
    validateFields({ force: true }, (error) => {
      if (!error) { // 没有错误的话我们就可以根据form数据进行提交了
        const phone_number = getFieldsValue().phone_number.replace(/\s/g, '')
        this.props.login({
          ...getFieldsValue(),
          phone_number
        }, text)
      } else {
        console.log(error);
        // 有错误的话那就进行错误处理
        // Toast.info(error);
      }
    });
  }

  render() {
    const { text } = this.context
    const { getFieldProps, getFieldError } = this.props.form;
    let errorsphone = getFieldError('phone_number');
    let errorscode = getFieldError('code');
    return (
      <NavWrap title={text.loginScene_title} isPadding={false} isBgDiv={false}>
        <Wrap>
          <Content>
            <img src={logo} alt="" />
            <InputItem
              clear
              type='phone'
              placeholder={text.loginScene_phone_placeholder}
              {...getFieldProps('phone_number', {
                onChange:(val) => {
                  const phone = val.replace(/\s/g, '')
                  if (/^(8[0-9])[0-9]{6,9}$/.exec(phone)) {
                    this.setState({
                      codeDisabled: false,
                      phone: phone
                    });
                  } else {
                    this.setState({
                      codeDisabled: true,
                      phone: ''
                    });
                  }
                },
                rules: [
                  { required: true, message: text.loginScene_phone_rule },
                  { validator: (rule, value, callback) => {
                    const phone = value?.replace(/\s/g, '')
                    if (/^(8[0-9])[0-9]{6,9}$/.test(phone)) { 
                      callback()
                    }
                    callback(text.loginScene_phone_rule) 
                  }}
                ]
              })}
            />
            {errorsphone ? <Error>{errorsphone.join(',')}</Error> : null}
            <WhiteSpace size="lg" />
            <Flex>
              <Flex.Item>
                <InputItem
                  clear
                  type='number'
                  maxLength={4}
                  // moneyKeyboardAlign="left"
                  placeholder={text.loginScene_code_placeholder}
                  {...getFieldProps('code', {
                    rules: [
                      { required: true, message: text.loginScene_code_placeholder }
                    ]
                  })}
                />
              </Flex.Item>
              <Flex.Item>
                <Button
                  type="primary"
                  disabled={this.state.codeDisabled}
                  onClick={() => {
                    this.props.sendVerification(`phone_number=${this.state.phone}`).then(res => {
                      if(res.status === 200) {
                        let time = 60
                        Toast.success(text.loginScene_success, 1)
                        this.setState({
                          codeDisabled: false,
                        });
                        const interval = setInterval(() => {
                          if(time>0) {
                            this.setState({
                              loginScene_code_btn: `${time--}s`,
                              codeDisabled: true,
                            });
                          } else {
                            this.setState({
                              codeDisabled: false,
                              loginScene_code_btn: text.loginScene_code_btn
                            });
                            clearInterval(interval)
                          }
                        }, 1000)
                      }
                    })
                  }}
                >
                   {this.state.loginScene_code_btn}
                </Button>
              </Flex.Item>
            </Flex>
            {errorscode ? <Error>{errorscode.join(',')}</Error> : null}
            <Button className='button' type="primary" size='large' onClick={() => {
              this.submit()
            }}>
              {text.loginScene_btn}
            </Button>
            <Tip>
              {text.loginScene_tip}
              <a href="/loginProtocol.html">{text.loginScene_tip_a}</a>
            </Tip>
          </Content>
        </Wrap>
      </NavWrap>
    );
  }
}
export default connect(
  null,
  actions
)(createForm()(LoginScene))