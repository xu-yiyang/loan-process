import React, { Component } from 'react';
import { Button, List } from 'antd-mobile';
import { styled, Card, css } from 'loan-ui';
import { ConfigContext, addAbilityOnEnter, toThousands } from 'loan-utils';
import { NavWrap, ListForm } from 'loan-components';
import { connect } from 'react-redux'
import selectors from './external-data-selector'
import { prepareSceneData, actions } from './external-data-action'
import Logo from 'assets/logo.png';
import Config from 'scene-config/index';

const Content = styled.div`
  margin-bottom: 1.5rem;
  > div {
    margin-bottom: 0.2rem;
  }
  .card1 {
    position: relative;
    .header {
      margin: 0 -0.2rem;
      padding: 0.2rem 0.2rem;
      line-height: 0.28rem;
      font-size:0.28rem;
      color:#000;
      background: #F4F4F4;
      img {
        width: 0.48rem;
        margin-right: 0.16rem;
        vertical-align: middle;
      }
    }
    :before {
      content: '';
      position: absolute;
      background:rgba(14,102,255,1);
      width: 0.28rem;
      height: 0.28rem;
      border-radius: 100%;
      left: -0.35rem;
      top: 0.7rem;
    }
    :after {
      content: '';
      position: absolute;
      background:rgba(14,102,255,1);
      width: 0.28rem;
      height: 0.28rem;
      border-radius: 100%;
      right: -0.35rem;
      top: 0.7rem;
    }
    .amount {
      text-align: center;
      padding: 0.6rem 0;
      h4 {
        font-size:0.28rem;
        color:rgba(136,136,136,1);
        margin-bottom: 0.16rem;
      }
      p {
        font-size:0.48rem;
        color: #000;
      }
    }
  }
  .bankcard {
    h4 {
      font-size:0.28rem;
      color: #000;
      margin-bottom: 0.24rem;
      font-weight: normal;
    }
    div {
      background: #0E66FF;
      border-radius: 4px;
      padding: 0.3rem;
      color: #fff;
      i {
        float: right;
      }
      p {
        margin-top: 0.4rem;
      }
    }
  }
`

const Tag = styled.div`
  border-radius:50px;
  padding: 0 0.33rem;
  float: right;
  font-size: 0.28rem;
  text-align: center;
  line-height: 0.47rem;
  ${props => props.type === 'disabled' && css`
    background:rgba(153,153,153,0.18);
    color: #222;
  `}
  ${props => props.type === 'primary' && css`
    background:rgba(14,102,255,0.18);
    color: #0E66FF;
  `}
  ${props => props.type === 'warning' && css`
    background:rgba(255,83,83,0.18);
    color: #FF5353;
  `}
`

const BtnBox = styled.div`
  margin-bottom: 0 !important;
  background: #fff;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0.2rem 0.3rem;
  box-sizing: border-box;
  display: flex;
  > * {
    flex: 1 1 0%;
    margin: 0 0.2rem;
  }
`

class OrderDetailsScene extends Component {
  static contextType = ConfigContext;
  
  render() {
    console.log(this.props);
    const { text } = this.context
    const { user_orders, payment_delay_h5 } = this.props
    return (
      <NavWrap title={text.orderDetailsScene_title}>
        <Content>
          <Card className='card1'>
            <div className='header'>
              <img src={Logo} alt=""/>
              {user_orders.product_name}
              <Tag type={user_orders.order_status === 200 ? 'disabled' : 'primary'}>
                {Config.text.orderStatusItem_status[user_orders.order_status]}
              </Tag>
            </div>
            <div className='amount'>
              <h4>{text.orderDetailsScene_repay_amount}</h4>
              <p>Rp {toThousands(user_orders.repay_amount)}</p>
            </div>
            <ListForm>
              <List.Item extra={toThousands(user_orders.loan_amount)}>
                {text.orderDetailsScene_loan_amount}
              </List.Item>
              <List.Item extra={toThousands(user_orders.actual_amount)}>
                {text.orderDetailsScene_actual_amount}
              </List.Item>
              <List.Item extra={toThousands(user_orders.interest_rate)}>
                {text.orderDetailsScene_interest_rate}
              </List.Item>
              <List.Item extra={toThousands(user_orders.interest_amount)}>
                {text.orderDetailsScene_interest_amount}
              </List.Item>
              <List.Item extra={toThousands(user_orders.admin_amount)}>
                {text.orderDetailsScene_admin_amount}
              </List.Item>
              <List.Item extra={`${user_orders.loan_term} Hari`}>
                {text.orderDetailsScene_loan_term}
              </List.Item>
            </ListForm>
          </Card>
          <Card>
            <ListForm>
              <List.Item extra={user_orders.order_no}>
                {text.orderDetailsScene_order_no}
              </List.Item>
              <List.Item extra={user_orders.loan_time}>
                {text.orderDetailsScene_loan_time}
              </List.Item>
            </ListForm>
          </Card>
          <Card className='bankcard' isPadding={true}>
            <h4>{text.orderDetailsScene_card_tit}</h4>
            <div>
              {user_orders.bank_card.bank_user_name}<i>{user_orders.bank_card.bank_name}</i>
              <p>{user_orders.bank_card.bank_account}</p>
            </div>
          </Card>
          {
            user_orders.api_contract === 1 && (
              <Card onClick={() => {
                this.props.get_contract({
                  product_id: user_orders.product_id,
                  amount: user_orders.loan_amount,
                  period: user_orders.loan_term
                })
              }}>
                <ListForm>
                  <List.Item arrow='horizontal'>
                    {text.orderDetailsScene_protocol}
                  </List.Item>
                </ListForm>
              </Card>
            )
          }
          {
            (user_orders.order_status === 175 || user_orders.order_status === 180) && (
              <Button type="primary" size='large'>
                {text.orderDetailsScene_btn}
              </Button>
            )
          }
          {
            (payment_delay_h5 || user_orders.order_status === 175 || user_orders.order_status === 180) &&
            <BtnBox>
              {
                payment_delay_h5 && (
                  <Button type='ghost' onClick={() => {
                    window.location.href = payment_delay_h5
                  }}>
                    {text.orderDetailsScene_delay_btn}
                  </Button>
                )
              }
              {
                (user_orders.order_status === 175 || user_orders.order_status === 180) && (
                  <Button type="primary" size='large' onClick={() => {
                    this.props.payment_h5({
                      order_no: user_orders.order_no
                    })
                  }}>
                    {text.orderDetailsScene_btn}
                  </Button>
                )
              }
            </BtnBox>
          }
        </Content>
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
  )(OrderDetailsScene)
)