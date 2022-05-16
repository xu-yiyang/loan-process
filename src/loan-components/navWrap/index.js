import React from 'react';
import { styled, css } from 'loan-ui';
import { Nav } from '../nav';

const Wrap = styled.div`
  min-height: 100vh;
  position: relative;
`

const Content = styled.div`
  overflow: hidden;
  position: relative;
  z-index: 1;
  ${props => props.isPadding && css`
    padding: 0.27rem 0.16rem;
  `}
  ${props => props.isBgDiv && css`
    padding: 0 0.16rem;
  `}
`

const BgDiv = styled.div`
  background: #0E66FF;
  height: 3rem;
  position: absolute;
  top: 0.9rem;
  left: 0;
  width: 100%;
`

const NavWrap = ({children, title, className, isPadding = true, isBack = true, isBgDiv = true}) => {
  return (
    <Wrap className={className}>
      <Nav title={title} isBack={isBack} />
      {isBgDiv && <BgDiv/>}
      <Content isPadding={isPadding} isBgDiv={isBgDiv}>
        {children}
      </Content>
    </Wrap>
  );
}
export {NavWrap}
