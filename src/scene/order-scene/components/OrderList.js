import React from 'react';
import { styled, Card } from 'loan-ui';
import { OrderStatusItem } from 'loan-components';
import { toThousands, history } from 'loan-utils';
import moment from 'moment';
import noOrderImg from '../assets/no-order.png';

const Content = styled.div`
  .order-list {
    height: calc(100vh - 3.3rem);
    overflow-y: auto;
    overflow-x: hidden;
    > div {
      border-bottom: 1px solid #E9E9E9;
    }
  }
`

const NoOrder = styled.p`
  text-align: center;
  padding-top: 2rem;
  img {
    width: 3.6rem;
  }
`

const OrderList = ({ data }) => {
  return (
    <Content>
      <Card className='order-list'>
        {
          data.length === 0 ? (
            <NoOrder><img src={noOrderImg} alt=""/></NoOrder>
          ) : (
            data.map(item => {
              return (
                <OrderStatusItem
                  key={item.id}
                  status={item.order_status}
                  Logo={item.product_icon}
                  type={item.order_status === 200 ? 'success' : 'primary'}
                  data={{
                    name: item.product_name,
                    time: moment(item.loan_time * 1000).format('YYYY-MM-DD'),
                    amount: `Rp ${toThousands(item.loan_amount)}`,
                  }}
                  onClick={() => {
                    history.push(`/order-details-scene?id=${item.id}`)
                  }}
                />
              )
            })
          )
        }
      </Card>
    </Content>
  );
}
export default OrderList
