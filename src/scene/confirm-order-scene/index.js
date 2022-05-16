import React, { Component } from 'react';
import { Button, List, Checkbox, Modal, Toast } from 'antd-mobile';
import { styled, Card } from 'loan-ui';
import { ConfigContext, addAbilityOnEnter, toThousands } from 'loan-utils';
import { ListForm, NavWrap } from 'loan-components';
import { connect } from 'react-redux'
import selectors from './external-data-selector'
import { prepareSceneData, actions } from './external-data-action'
import styles from './index.module.less';

const Content = styled.div`
  > div {
    margin-bottom: 0.2rem;
  }
  .quotaCard {
    overflow: hidden;
    text-align: center;
    h4 {
      font-size:0.28rem;
      font-weight:400;
      color:rgba(0,0,0,1);
      margin: 0.6rem 0 0.3rem;
    }
    em {
      font-size:0.6rem;
      font-weight:500;
      color:rgba(14,102,255,1);
      display: block;
      margin-bottom: 0.6rem;
    }
    span {
      font-size:0.24rem;
      color:rgba(136,136,136,1);
      display: block;
      margin-bottom: 0.6rem;
    }
  }
  .loanItem {
    position: relative;
    > div {
      margin-bottom: 0.24rem;
    }
    .checkbox {
      position: absolute;
      right: 0.3rem;
      top: 0.22rem;
      .am-checkbox-inner {
        border-radius: 5px;
      }
    }
    .name {
      line-height: 0.48rem;
      font-size:0.28rem;
      color:rgba(0,0,0,1);
      img {
        width: 0.48rem;
        margin-right: 0.16rem;
        vertical-align: middle;
      }
    }
    .info {
      overflow: hidden;
      span {
        width: 50%;
        float: left;
        strong {
          color:rgba(14,102,255,1);
          font-size:0.36rem;
        }
        i {
          color:rgba(0,0,0,1);
          font-size:0.28rem;
        }
        p {
          font-size:0.24rem;
          color:rgba(136,136,136,1);
          margin-top: 0.08rem;
        }
      }
    }
    .protocol {
      font-size:0.24rem;
      display: flex;
      color: #999;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0;
      a {
        color: #0E66FF;
      }
    }
  }
`

const LoanList = styled.div`
  .am-list-body, .am-list-item {
    background: none;
  }
  background:rgba(244,244,244,1);
  border-radius: 8px;
  padding: 0 0.16rem;
`

const Btn = styled.div`
  text-align: center;
  font-size:0.24rem;
  p {
    color:#999;
    em {
      color: #FF5353;
    }
    margin-bottom:0.2rem;
  }
`

const ModalGrid = styled.div`
  text-align: left;
  h5 {
    font-size:0.24rem;
    color:rgba(153,153,153,1);
    margin-bottom: 0.16rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 42%;
      padding: 0.14rem 0 0.14rem 0.24rem;
      border-radius:4px;
      margin-bottom: 0.24rem;
      border:1px solid rgba(153,153,153,1);
      font-size:0.32rem;
      line-height: 1;
      color:rgba(153,153,153,1);
    }
    li.activity {
      border-color: #0E66FF;
      color:#0E66FF;
    }
  }
`

class ConfirmOrderScene extends Component {
  static contextType = ConfigContext;
  constructor(props) {
    super(props);
    const checkboxData = {}
    const products = []
    let totalAmount = 0
    // eslint-disable-next-line
    this.props?.loan_products?.forEach(item => {
      checkboxData[item.id] = {
        amount: item.loan_info.loan_amount,
        period: item.loan_info.period,
        actual_amount: item.loan_info.actual_amount,
        repay_amount: item.loan_info.repay_total_amount
      }
      products.push(item.id)
      totalAmount+=item.loan_info.loan_amount
    })
    this.state = {
      modal: false,
      bank_id: localStorage.getItem('bankId'),
      checkboxData,
      products,
      totalAmount,
      loan_products: this.props?.loan_products,
      limitSel: 0,
      limitSelData: {},
      termSel: 0,
    }
  }

  // onClick = (key) => {
  //   this.setState({
  //     [key]: !this.state[key],
  //   });
  // }

  showModal = (key, id) => (e) => {
    e.stopPropagation(); // 阻止冒泡
    e.preventDefault(); // 修复 Android 上点击穿透
    this.props.loan_amount_period({
      product_id: id
    }).then(res => {
      const { limitSel } = this.state
      this.setState({
        [key]: true,
        limitSelData: {
          ...res[limitSel],
          admin_amount: res[limitSel].repay_total_amount - res[limitSel].actual_amount,
          id
        }
      });
    }, error => {
      Toast.fail(error.msg || error.message)
    })
  }
  
  onClose = (key) => {
    this.setState({
      [key]: false,
    });
  }

  render() {
    const { text } = this.context
    const limitSel = this.props.loan_amount_period_data
    const termSel = ['7天']
    return (
      <NavWrap title={text.confirmOrderScene_title}>
        <Content>
          <Card className='quotaCard'>
            <h4>{text.confirmOrderScene_card_quota_title}</h4>
            <em>Rp {toThousands(this.state.totalAmount)}</em>
            <span>Rekomendasikan {this.state.loan_products?.length} {text.confirmOrderScene_card_quota_tip}</span>
          </Card>
          {
            this.state.loan_products?.map(item => {
              return (
                <Card className='loanItem' isPadding={true} key={item.name}>
                  <div className='checkbox'>
                    <Checkbox defaultChecked={true} data={item} onChange={val => {
                      // this.onClick(item.name)
                      const data = val.target.data
                      let totalAmount = data.loan_info.loan_amount
                      if(val.target.checked) {
                        this.setState({
                          checkboxData: {
                            ...this.state.checkboxData,
                            [data.id]: {
                              amount: data.loan_info.loan_amount,
                              period: data.loan_info.period,
                              actual_amount: data.loan_info.actual_amount,
                              repay_amount: data.loan_info.repay_total_amount
                            }
                          },
                          products: [...this.state.products, data.id],
                          totalAmount: this.state.totalAmount + totalAmount
                        })
                      } else {
                        const checkboxData = {...this.state.checkboxData}
                        const products = this.state.products.filter(i => i !== data.id)
                        delete checkboxData[data.id]
                        this.setState({
                          checkboxData,
                          products,
                          totalAmount: this.state.totalAmount - totalAmount
                        })
                      }
                    }} />
                  </div>
                  <div className='name'>
                    <img src={item.images} alt=""/>
                    {item.name}
                  </div>
                  <div className='info'>
                    <span>
                      <strong>{`Rp ${toThousands(item.loan_info.loan_amount)}`}</strong>
                      <p>{text.confirmOrderScene_card_loanItem_info1}</p>
                    </span>
                    <span>
                      <i>{item.loan_info.period} Hari</i>
                      <p>{text.confirmOrderScene_card_loanItem_info2}</p>
                    </span>
                  </div>
                  <LoanList>
                    <ListForm>
                      <List.Item extra={`Rp ${toThousands(item.loan_info.admin_amount)}`}>
                        {text.confirmOrderScene_card_loanItem_list_label1}
                      </List.Item>
                      <List.Item extra={`Rp ${toThousands(item.loan_info.actual_amount)}`}>
                        {text.confirmOrderScene_card_loanItem_list_label2}
                      </List.Item>
                      <List.Item extra={`Rp ${toThousands(item.loan_info.repay_total_amount)}`}>
                        {text.confirmOrderScene_card_loanItem_list_label3}
                      </List.Item>
                    </ListForm>
                  </LoanList>
                  <div className='protocol'>
                    {item.api_contract === 1 ? <span>
                      Lihat
                      <a onClick={(e) => {
                        e.stopPropagation(); // 阻止冒泡
                        this.props.get_contract({
                          product_id: item.id,
                          amount: item.loan_info.loan_amount,
                          period: item.loan_info.period
                        })
                      }}>《Perjanjian Pinjaman》</a>
                    </span> : <div></div>}
                    {item.api_amount === 1 ? <Button type="ghost" inline size="small" onClick={this.showModal('modal', item.id)}>
                      {text.confirmOrderScene_card_loanItem_btn}
                    </Button> : <div></div>}
                  </div>
                </Card>
              )
            })
          }
          
          <Modal
            popup
            className={styles['confirm-order-modal']}
            visible={this.state.modal}
            onClose={() => this.onClose('modal')}
            animationType="slide-up"
            // afterClose={() => { console.log('afterClose'); }}
          >
            <h2>
              {text.confirmOrderScene__modal_tit}
              <i onClick={() => this.onClose('modal')}>{text.confirmOrderScene__modal_close}</i>
            </h2>
            <div className={styles.content}>
              <ModalGrid>
                <h5>{text.confirmOrderScene__modal_sel1}</h5>
                <ul>
                  {
                    limitSel.map((item, index) => {
                      return (
                        <li
                          key={item.loan_amount}
                          className={index === this.state.limitSel ? 'activity' : ''}
                          onClick={() => {
                            this.setState({
                              limitSel: index,
                              limitSelData: {
                                ...this.state.limitSelData,
                                ...item,
                                admin_amount: item.repay_total_amount - item.actual_amount
                              },
                            })
                          }}
                        >
                          {item.loan_amount}
                        </li>
                      )
                    })
                  }
                </ul>
              </ModalGrid>
              <ModalGrid>
                <h5>{text.confirmOrderScene__modal_sel2}</h5>
                <ul>
                  {
                    termSel.map((item, index) => {
                      return (
                        <li
                          key={item}
                          className={index === this.state.termSel ? 'activity' : ''}
                          onClick={() => {
                            this.setState({
                              termSel: index
                            })
                          }}
                        >
                          {item}
                        </li>
                      )
                    })
                  }
                </ul>
              </ModalGrid>
              <LoanList>
                <ListForm>
                  <List.Item extra={`Rp ${toThousands(this.state.limitSelData.admin_amount)}`}>
                    {text.confirmOrderScene_card_loanItem_list_label1}
                  </List.Item>
                  <List.Item extra={`Rp ${toThousands(this.state.limitSelData.actual_amount)}`}>
                    {text.confirmOrderScene_card_loanItem_list_label2}
                  </List.Item>
                  <List.Item extra={`Rp ${toThousands(this.state.limitSelData.repay_total_amount)}`}>
                    {text.confirmOrderScene_card_loanItem_list_label3}
                  </List.Item>
                </ListForm>
              </LoanList>
              <Button type="primary" onClick={() => {
                const { limitSelData, checkboxData, loan_products } = this.state
                let totalAmount = 0
                const new_loan_products = loan_products.map(item => {
                  if(item.id === limitSelData.id) {
                    item.loan_info.loan_amount = limitSelData.loan_amount;
                    item.loan_info.period = limitSelData.period;
                    item.loan_info.admin_amount = limitSelData.admin_amount;
                    item.loan_info.actual_amount = limitSelData.actual_amount;
                    item.loan_info.repay_total_amount = limitSelData.repay_total_amount;
                  }
                  totalAmount+=item.loan_info.loan_amount
                  return item
                })
                this.setState({
                  checkboxData: { // 修改选择的数据 
                    ...checkboxData,
                    [limitSelData.id]: {
                      amount: limitSelData.loan_amount,
                      period: limitSelData.period,
                      actual_amount: limitSelData.actual_amount,
                      repay_amount: limitSelData.repay_total_amount
                    }
                  },
                  loan_products: new_loan_products,
                  totalAmount
                })
                this.onClose('modal');
              }}>
                {text.confirmOrderScene__modal_btn}
              </Button>
            </div>
          </Modal>
          <Btn>
            <p>
              <em>*</em>
              {text.confirmOrderScene_protocol_tip}
            </p>
            <Button type="primary" size='large' onClick={() => {
              if(JSON.stringify(this.state.checkboxData) === '{}') {
                Toast.fail('Tolong pilih satu')
              } else {
                this.props.apply_loans({
                  ...this.state.checkboxData,
                  products: this.state.products,
                  bank_id: this.state.bank_id,
                }, this.state.totalAmount)
              }
            }}>
              {text.confirmOrderScene_btn}
            </Button>
          </Btn>
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
  )(ConfirmOrderScene)
)
