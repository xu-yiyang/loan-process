import React, { Component } from 'react';
import { List, Button, Radio, WhiteSpace, Toast, Modal } from 'antd-mobile';
import { styled, Card } from 'loan-ui';
import { NavWrap, ListForm, Steps } from 'loan-components';
import { connect } from 'react-redux'
import { addAbilityOnEnter, ConfigContext, history } from 'loan-utils';
import selectors from './external-data-selector'
import { prepareSceneData, actions } from './external-data-action'
import Img from 'assets/backImg.png';

const alert = Modal.alert;
const RadioItem = Radio.RadioItem;

const Btn = styled.div`
  margin: 0.6rem 0;
`
const BankName = styled.span`
  font-size:0.32rem;
`
const Name = styled.span`
  font-size:0.28rem;
  font-weight:400;
  color:rgba(136,136,136,1);
  margin-left: 0.24rem;
`
const ImgDiv = styled.div`
  img {
    width: 3rem;
  }
`

class DebitCardScene extends Component {
  static contextType = ConfigContext;
  state = {
    id: this.props?.userBanksList?.[0]?.id,
  };

  componentDidMount() {
    if(sessionStorage.getItem('step') !== '3') {
      if (window.history && window.history.pushState) {
        // 监听手机返回
        window.history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.goBack, false);
  }

  goBack() {
    alert(<ImgDiv><img src={Img} alt='' /></ImgDiv>, 'kurang satu langkah untuk mendapatkan limit maksimal Rp 8.000.000, yakin untuk kembali?', [
      { text: 'Yakin', onPress: () => {
        window.removeEventListener('popstate', this.goBack, false);
        history.replace('credit-items-scene')
      }},
      { text: 'Batal' }
    ])
  }


  onChange = (id) => {
    this.setState({
      id,
    });
  };

  render() {
    const { text } = this.context
    const { id } = this.state;
    return (
      <NavWrap title={text.debitCardScene_title} isBgDiv={false}>
        <Steps current={2} />
        <Card>
          <ListForm>
            {this.props?.userBanksList?.map(i => (
              <RadioItem key={i.id} checked={id === i.id} onChange={() => this.onChange(i.id)}>
                <BankName>{i.bank_name}</BankName><Name>{i.bank_user_name}</Name>
                <List.Item.Brief>{i.bank_account}</List.Item.Brief>
              </RadioItem>
            ))}
          </ListForm>
        </Card>
        <WhiteSpace/>
        <Card>
          <ListForm>
            <List.Item arrow="horizontal" onClick={() => {
              history.push('/add-debit-card-scene')
            }}>
              {text.debitCardScene_add}
            </List.Item>
          </ListForm>
        </Card>
        <Btn>
          <Button type="primary" size='large' onClick={() => {
            if(this.state.id) {
              history.push(`/loan-apple-scene/${this.state.id}`)
            } else {
              Toast.fail('Pilih kartu bank')
            }
          }}>
            {text.debitCardScene_btn}
          </Button>
        </Btn>
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
  )(DebitCardScene)
)