import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import { styled, Card } from 'loan-ui';
import { ConfigContext, addAbilityOnEnter } from 'loan-utils';
import { NavWrap } from 'loan-components';
import { connect } from 'react-redux'
import selectors from './external-data-selector'
import { prepareSceneData } from './external-data-action'
import icon from './assets/icon.png';
import Logo from './assets/logo.png';

const Content = styled.div`
  > * {
    margin-bottom: 0.2rem;
  }
`

const Item1 = styled.div`
  text-align: center;
  padding: 0.6rem 0;
  img {
    width: 1.5rem;
    margin-bottom: 0.34rem;
  }
  p {
    color: #000;
    font-size: 0.28rem;
  }
`

const Title = styled.p`
  text-align: center;
  color: #888;
  font-size: 0.26em;
`

const ListItem = styled.div`
  padding: 0.3rem 0;
  .name {
    line-height: 0.48rem;
    font-size:0.32rem;
    color:#000000;
    span {
      font-size:0.24rem;
      float: right;
      color: #888888;
    }
    img {
      width: 0.48rem;
      margin-right: 0.16rem;
      vertical-align: middle;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.4rem 0 0.3rem;
    i {
      font-size:0.36rem;
      color: #0E66FF;
      display: block;
      margin-bottom: 0.2rem;
    }
    p {
      font-size:0.25rem;
      color: #888;
    }
    em {
      color: #000;
    }
    span:nth-child(2) {
      text-align: right;
    }
  }
  > p {
    padding: 0.2rem 0 0;
    font-size:0.24rem;
    color: #888;
    border-top: 1px solid #E9E9E9;
  }
`

class MatchFailScene extends Component {
  static contextType = ConfigContext;

  render() {
    const { text } = this.context;
    return (
      <NavWrap title={text.matchFailScene_title}>
        <Content>
          <Card>
            <Item1>
              <img src={icon} alt=""/>
              <p>
                {text.matchFailScene_item1_p}
              </p>
            </Item1>
          </Card>
          <Title>
            {text.matchFailScene_Title}
          </Title>
          {
            this.props?.other_no_api_products?.map(item => {
              return (
                <Card key={item.id}>
                  <ListItem>
                    <div className='name'>
                      <img src={Logo} alt=""/>
                      {item.name}
                      <span>
                        {item.sales_volume} orang telah meminjam
                      </span>
                    </div>
                    <div className='info'>
                      <span>
                        <i>VDN {
                          item.loan_amount.length > 1 ? `${item.loan_amount[0]}~${item.loan_amount[item.loan_amount.length-1]}` : item.loan_amount[0]
                        }</i>
                        <p>Jumlan maksimum</p>
                      </span>
                      <span>
                        <Button type="primary" inline size="small" onClick={() => {
                          if(item.download_uri) window.location.href = item.download_uri
                        }}>Pergi unduh</Button>
                        <p>
                          Suku bunga
                          <em>{item.loan_rate_display}/hari</em>
                        </p>
                      </span>
                    </div>
                    <p>
                      {text.matchFailScene_item1_list_p}
                    </p>
                  </ListItem>
                </Card>
              )
            })
          }
        </Content>
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
  )(MatchFailScene)
)