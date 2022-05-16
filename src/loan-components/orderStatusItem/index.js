import React from 'react';
import { styled, css } from 'loan-ui';
import Config from 'scene-config/index';

const StatusItem = styled.div`
  padding: 0.3rem 0;
  .name {
    line-height: 0.48rem;
    font-size:0.28rem;
    color:#999999;
    time {
      font-size:0.24rem;
      float: right;
    }
    img {
      width: 0.48rem;
      margin-right: 0.16rem;
      vertical-align: middle;
    }
  }
  .info {
    margin-top: 0.35rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    em {
      font-size:0.36rem;
      color: #000;
      display: block;
      margin-bottom: 0.1rem;
    }
    i {
      font-size:0.24rem;
      color: #999999;
    }
    span {
      font-size:0.32rem;
      ${props => props.type === 'primary' && css`
        color: #0E66FF;
      `}
      ${props => props.type === 'warning' && css`
        color: #FF5353;
      `}
      ${props => props.type === 'success' && css`
        color: #7d7d7d;
      `}
    }
  }
`

const OrderStatusItem = ({Logo, data, type = 'primary', status, onClick}) => {
  return (
    <StatusItem type={type} onClick={() => onClick()}>
      <div className='name'>
        <img src={Logo} alt=""/>
        {data.name}
        <time>
          {data.time}
        </time>
      </div>
      <div className='info'>
        <div>
          <em>{data.amount}</em>
          <i>{Config.text.orderStatusItem_amount}</i>
        </div>
        <div>
          <span>{Config.text.orderStatusItem_status[status]}</span>
        </div>
      </div>
    </StatusItem>
  );
}
export {
  OrderStatusItem
}
