import React from 'react';
import { styled, css } from 'loan-ui';
import Config from 'scene-config/index';
import { Link } from 'react-router-dom';

import HomeOutlined from './assets/HomeOutlined.js'
import FileTextOutlined from './assets/FileTextOutlined.js'

const Wrap = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 1rem;
  background: #fff;
  z-index: 999;
  ul {
    height: 100%;
    display: flex;
    text-align: center;
    align-items: center;
  }
`


const Li = styled.li`
  font-size: 0.3rem;
  width: 50%;
  line-height: 0.4rem;
  a {
    color: #999999;
    ${(props) => (props.active === true) && css`
      color: #0E66FF;
    `}
  }
`

const Footer = () => {
  const pathname = window.location.pathname;
  const list = [
    {
      text: Config.text.footer_loan,
      pathname: '/credit-items-scene',
      active: /credit-items-scene/,
      icon: HomeOutlined,
    },
    {
      text: Config.text.footer_order,
      pathname: '/order-scene',
      active: /order-scene/,
      icon: FileTextOutlined,
    },
    // {
    //   text: '我的',
    //   pathname: '/credit-items-scene',
    //   active: /credit-items-scene/,
    //   icon: <UserOutlined />,
    // }
  ]
  return (
    <Wrap>
      <ul>
        {
          list.map(item => {
            return (
              <Li
                key={item.pathname}
                active={item.active.test(pathname)}
              >
                <Link to={item.pathname}>
                  {item.icon}<br/>{item.text}
                </Link>
              </Li>
            )
          })
        }
      </ul>
    </Wrap>
  );
}
export {Footer}
