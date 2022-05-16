import React from 'react';
import { styled } from 'loan-ui';
import { Icon } from 'antd-mobile';
import { history } from 'loan-utils';

const Wrap = styled.div`
  position: relative;
  background: #0E66FF;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.32rem;
  color: #fff;
`

const Back = styled.div`
  position: absolute;
  left: 0.3rem;
  font-size: 0;
`

const Nav = ({title, isBack}) => {
  return (
    <Wrap>
      {isBack && <Back onClick={() => history.goBack()}>
        <Icon type='left' />
      </Back>}
      <span>{title}</span>
    </Wrap>
  );
}
export {Nav}
