import React, { Component } from 'react';
import { styled } from 'loan-ui';
import { List } from 'antd-mobile';

const Wrap = styled.div`
  .am-list-item .am-list-line .am-list-content, .am-list-item .am-list-line .am-list-extra, .am-list-item .am-list-line .am-list-brief {
    font-size: 0.28rem;
  }
  .am-list-item .am-list-line .am-list-extra {
    flex-basis: 47%;
  }
  .am-list-body::before {
    display: none !important;
  }
  .am-list-body::after {
    display: none !important;
  }
  .am-list-item {
    border-bottom: 1px solid #DCDCDC;
    padding-left: 0 !important;
    .am-list-line {
      padding-right: 0;
    }
  }
  >div:last-child {
    .am-list-item {
      border-bottom: none;
    }
  }
`

class ListForm extends Component {
  render() {
    return (
      <Wrap>
        <List>
          {this.props.children}
        </List>
      </Wrap>
    );  
  }
}
export {
  ListForm
}
