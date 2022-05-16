import React, { Component } from 'react';
import { styled } from 'loan-ui';
import { ConfigContext, addAbilityOnEnter } from 'loan-utils';
import { NavWrap, Footer } from 'loan-components';
import { connect } from 'react-redux'
import selectors from './external-data-selector'
import { prepareSceneData } from './external-data-action'
import OrderList from './components/OrderList';

const Tab = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.3rem;
  span {
    font-size:0.28rem;
    color:rgba(255,255,255,1);
    width: 2.4rem;
    line-height: 0.6rem;
    text-align: center;
  }
  span.activity {
    color: #0E66FF;
    background: #fff;
    border-radius: 50px;
  }
`

class OrderScene extends Component {
  static contextType = ConfigContext;
  state = {
    activity: 0,
    user_orders: [...this.props.user_orders]?.filter(item => {
      return item.order_status !== 200
    }) || [],
    tab1_num: [...this.props.user_orders]?.filter(item => {
      return item.order_status !== 200
    }) || [],
    tab2_num: [...this.props.user_orders]?.filter(item => {
      return item.order_status === 200
    }) || [],
  }

  render() {
    const { text } = this.context;
    console.log(this.props.user_orders, 'datadata')
    return (
      <NavWrap title={text.orderScene_title} isBack={false}>
        <Tab>
          <span className={this.state.activity === 0 ? 'activity' : ''} onClick={() => {
            const user_orders = [...this.props.user_orders].filter(item => {
              return item.order_status !== 200
            })
            this.setState({
              activity: 0,
              user_orders
            })
          }}>
            {text.orderScene_tab1}({this.state.tab1_num.length})
          </span>
          <span className={this.state.activity === 1 ? 'activity' : ''} onClick={() => {
            const user_orders = [...this.props.user_orders].filter(item => {
              return item.order_status === 200
            })
            this.setState({
              activity: 1,
              user_orders
            })
          }}>
            {text.orderScene_tab2}({this.state.tab2_num.length})
          </span>
        </Tab>
        <OrderList data={this.state.user_orders} />
        <Footer/>
      </NavWrap>
    );
  }
}
export default connect(
  selectors,
  null
)(
  addAbilityOnEnter(
    prepareSceneData()
  )(OrderScene)
)