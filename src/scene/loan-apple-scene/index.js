import React, { Component } from 'react';
import { Button, List, Radio, Modal } from 'antd-mobile';
import { styled, Card } from 'loan-ui';
import { ConfigContext, addAbilityOnEnter, history } from 'loan-utils';
import { NavWrap, ListForm } from 'loan-components';
import { connect } from 'react-redux'
import selectors from './external-data-selector'
import { prepareSceneData, actions } from './external-data-action'

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
const ModalTit = styled.p`
  font-size:0.34rem;
  font-weight:400;
  color:rgba(0,0,0,1);
  margin: 0.4rem 0;
  text-align: left;
`

const Scrool = styled.div`
  max-height: calc(100vh - 3.8rem);
  overflow-y: auto;
`

class LoanAppleScene extends Component {
  static contextType = ConfigContext;
  state = {
    id: parseInt(this.props.match.params.id) || this.props?.userBanksList?.[0].id,
    modal: false,
    selectData: this.props?.userBanksList?.find(item => {
      const id = parseInt(this.props.match.params.id) || this.props?.userBanksList?.[0].id
      return item.id === id
    })
  };

  componentDidMount() {
    sessionStorage.setItem('step', 3)
  }

  onChange = (data) => {
    this.setState({
      id: data.id,
      selectData: data
    });
    this.onClose('modal')
  };

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  
  onClose = key => {
    this.setState({
      [key]: false,
    });
  }

  render() {
    const { text } = this.context
    const { selectData, id } = this.state
    return (
      <NavWrap title={text.loanAppleScene_title} isBgDiv={false}>
        <Card isPadding={false}>
          <ListForm>
            <List.Item extra={'Selesai'}>
              {text.loanAppleScene_otentifikasi}
            </List.Item>
            <List.Item extra={'Selesai'} arrow='horizontal' onClick={() => {
              history.push('/base-info-scene?history=loan-apple-scene')
            }}>
              {text.loanAppleScene_informasi}
            </List.Item>
            {/* <PickerItem
              data={[{
                label: 'Selesai',
                value: 'Selesai'
              }]}
              label={text.loanAppleScene_informasi}
            /> */}
            <List.Item arrow="horizontal" onClick={this.showModal('modal')}>
              <BankName>{selectData?.bank_name}</BankName><Name>{selectData?.bank_user_name}</Name>
              <List.Item.Brief>{selectData?.bank_account}</List.Item.Brief>
            </List.Item>
          </ListForm>
        </Card>
        <Modal
          closable
          popup
          className='loan-apple-modal'
          visible={this.state.modal}
          onClose={() => this.onClose('modal')}
          animationType="slide-up"
          // afterClose={() => { console.log('afterClose'); }}
        >
          <Card>
            <ModalTit>{text.loanAppleScene_modal_tit}</ModalTit>
            <ListForm>
              <Scrool>
                {this.props?.userBanksList?.map(i => (
                  <RadioItem key={i.id} checked={id === i.id} onChange={() => this.onChange(i)}>
                    <BankName>{i.bank_name}</BankName><Name>{i.bank_user_name}</Name>
                    <List.Item.Brief>{i.bank_account}</List.Item.Brief>
                  </RadioItem>
                ))}
              </Scrool>
              <List.Item arrow="horizontal" onClick={() => {
                history.push('/add-debit-card-scene?history=loan-apple-scene')
              }}>
                <p style={{ color: '#0E66FF', margin: '0.4rem 0' }}>
                  {text.loanAppleScene_modal_add}
                </p>
              </List.Item>
            </ListForm>
          </Card>
        </Modal>
        <Btn>
          <Button type="primary" size='large' onClick={() => {
            localStorage.setItem('bankId', this.state.id)
            this.props.need_liveness()
          }}>
            {text.loanAppleScene_btn}
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
  )(LoanAppleScene)
)
