import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import { styled, Card } from 'loan-ui';
import { connect } from 'react-redux'
import { Footer } from 'loan-components';
import { ConfigContext, addAbilityOnEnter, getToken, history, getUserInfo } from 'loan-utils';
import { prepareSceneData, actions } from './external-data-action'
import selectors from './external-data-selector'
import bg from './assets/bg.png';
import icon1 from './assets/icon1.png';
import icon2 from './assets/icon2.png';
import icon3 from './assets/icon1.png';
import svgImg from './assets/user.svg'
import SoundOutlined from './assets/SoundOutlined.svg'

const Wrap = styled.div`
  background: url(${bg}) no-repeat top / 100%;
  padding: 0 0.3rem;
  overflow: hidden;
  text-align: center;
  h1 {
    font-size: 0.32rem;
    font-weight: normal;
    margin: 0.42rem 0
  }
`
const IconList = styled.div`
  h2 {
    font-size: 0.52rem;
    font-weight: normal;
    margin-bottom: 0.6rem;
  }
  ul {
    display: flex;
    justify-content: center;
    margin-bottom: 0.6rem;
    li {
      width: 33.3333%;
      img {
        width: 1rem;
      }
      p {
        margin-top: 0.3rem;
        font-size: 0.28rem;
      }
    }
  }
`
const Detail = styled.div`
  padding: 0.5rem 0.18rem;
  h3 {
    font-size: 0.28rem;
    color: #999;
    margin-bottom: 0.37rem;
    font-weight: normal;
  }
  i {
    font-size:0.72rem;
    font-weight:500;
    color:rgba(34,34,34,1);
    margin-bottom: 0.65rem;
    line-height:0.72rem;
    display: block;
  }
  p {
    margin-top: 0.48rem;
    font-size:0.24rem;
    font-weight:500;
    color:rgba(153,153,153,1);
    line-height:0.36rem;
  }
`
const Broadcast = styled.div`
  margin: 0.24rem 0 1.24rem;
  p {
    font-size:0.28rem;
    font-weight:400;
    color:rgba(153,153,153,1);
    margin: 0.1rem 0;
    display: flex;
    justify-content: center;
    span {
      margin-left: 0.17rem;
    }
    img {
      width: 0.3rem;
    }
  }
`

const SwitchUser = styled.div`
  position: absolute;
  right: 0.3rem;
  top: 0.42rem;
  color: #fff;
  img {
    width: 0.3rem;
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
  }
`

class CreditItemsScene extends Component {
  static contextType = ConfigContext;
  render() {
    const { text } = this.context
    const { summary } = this.props
    return (
      <Wrap>
        <SwitchUser onClick={() => history.push('login-scene')}>
          <img src={svgImg} alt=""/>
          <span> 切换账号</span>
        </SwitchUser>
        <h1>{text.creditItemsScene_h1}</h1>
        <IconList>
          <h2>{text.creditItemsScene_h2}</h2>
          <ul>
            <li>
              <img src={icon1} alt=""/>
              <p>{text.creditItemsScene_icon1}</p>
            </li>
            <li>
              <img src={icon2} alt=""/>
              <p>{text.creditItemsScene_icon2}</p>
            </li>
            <li>
              <img src={icon3} alt=""/>
              <p>{text.creditItemsScene_icon3}</p>
            </li>
          </ul>
        </IconList>
        <Card isPadding={true}>
          <Detail>
            <h3>{text.creditItemsScene_h3}</h3>
            <i>{text.creditItemsScene_limit}</i>
            <Button type="primary" size='large' onClick={() => {
              if(getToken()) {
                this.props.getStep({
                  mobile: getUserInfo().phone_number
                })
              } else {
                history.push('./login-scene')
              }
            }}>
              {text.creditItemsScene_button}
            </Button>
            <p>
              {text.creditItemsScene_p1}<br/>
              {text.creditItemsScene_p2}
            </p>
          </Detail>
        </Card>
        <Broadcast>
          <Card isPadding={true}>
            <p>
              <img src={SoundOutlined} alt=""/>
              <span>{summary}</span>
            </p>
          </Card>
        </Broadcast>
        <Footer/>
      </Wrap>
    );
  }
}

export default connect(
  selectors,
  actions
)(
  addAbilityOnEnter(
    prepareSceneData()
  )(CreditItemsScene)
)

// export default addAbilityOnEnter(prepareSceneData())(
//   connect(
//     selectors,
//     actions
//   )(CreditItemsScene)
// )