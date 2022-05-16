import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import moment from 'moment';
import { styled, Card } from 'loan-ui';
import { ConfigContext, toThousands, history } from 'loan-utils';
import { NavWrap, OrderStatusItem } from 'loan-components';
import { connect } from 'react-redux'
import selectors from './external-data-selector'
import { actions } from './external-data-action'
import iconGou from './assets/icon.png';
import fail from './assets/fail.png';

const Content = styled.div`
  > div {
    margin-bottom: 0.2rem;
  }
  .am-button {
    width: 4rem;
  }
`

const SubmitInfo = styled.div`
  padding-top: 0.4rem;
  text-align: center;
  * {
    margin-bottom: 0.4rem;
  }
  img {
    width: 1rem;
  }
  span {
    display: block;
    font-size:0.32rem;
    color: #0E66FF;
  }
  p {
    font-size:0.28rem;
    line-height:0.38rem;
    color:#888888;
  }
  .am-button {
    width: 4rem;
  }
`
const Fail = styled.div`
  height: 100vh;
  text-align: center;
  background: #fff;
  img {
    width: 1.8rem;
    margin: 0.9rem 0 0.4rem;
  }
  p {
    font-size:0.32rem;
    color: #FF370A;
  }
  .am-button {
    width: 4rem;
    margin-top: 1.5rem;
  }
`

class SubmitResultScene extends Component {
  static contextType = ConfigContext;

  render() {
    const { text } = this.context;
    const result = this.props.apply_loans_data.length !== 0;
    console.log(this.props);
    return (
      <NavWrap title={text.submitResultScene_title} isPadding={result}>
        {
          result ? (
            <Content>
              <Card>
                <SubmitInfo>
                  <img src={iconGou} alt=""/>
                  <span>{text.submitResultScene_info_span}</span>
                  <p>
                  Anda Dapat Mengajuakan di {this.props.apply_loans_data.length} produk<br/>
                    {text.submitResultScene_info_p2}：Rp {toThousands(this.props.apply_loans_amount)}
                  </p>
                  <Button type="ghost" inline onClick={() => history.replace('order-scene')}>
                    {text.submitResultScene_info_btn}
                  </Button>
                </SubmitInfo>
              </Card>
              {
                this.props.apply_loans_data.map(item => {
                  return (
                    <Card>
                      <OrderStatusItem
                        Logo={item.product_icon}
                        data={{
                          name: item.product_name,
                          time: moment(item.loan_time * 1000).format('YYYY-MM-DD'),
                          amount: `Rp ${toThousands(item.loan_amount)}`
                        }}
                        onClick={() => {
                          history.push(`/order-details-scene?id=${item.id}`)
                        }}
                      />
                    </Card>
                  )
                })
              }
            </Content>
          ) : (
            <Fail>
              <img src={fail} alt=""/>
              <p>{text.submitResultScene_fail}</p>
              <Button type="ghost" inline onClick={() => {
                history.replace('credit-items-scene')
              }}>
                {text.submitResultScene_fail_btn}
              </Button>
            </Fail>
          )
        }
      </NavWrap>
    );
  }
}
export default connect(
  selectors,
  actions
)(
  SubmitResultScene
)
