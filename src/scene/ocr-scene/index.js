import React, { Component } from 'react';
import { DatePicker, List, Button, InputItem, WhiteSpace, Modal } from 'antd-mobile';
import moment from 'moment';
import { createForm, formShape } from 'rc-form';
import { connect } from 'react-redux'
import { styled, Card } from 'loan-ui';
import { addAbilityOnEnter, ConfigContext, history } from 'loan-utils';
import { Steps, NavWrap, Phone, PickerItem, ListForm } from 'loan-components';
import selectors from './external-data-selector'
import { prepareSceneData, actions } from './external-data-action'
import Img from 'assets/backImg.png';

const alert = Modal.alert;
const { Item } = List;

const Btn = styled.div`
  margin: 0.6rem 0;
`

const ImgDiv = styled.div`
  img {
    width: 3rem;
  }
`

const ModalBox = styled.div`
  h3 {
    font-size:0.3rem;
    color:rgba(0,0,0,1);
    margin-bottom: 0.45rem;
  }
  li {
    text-align:left;
    font-size:0.28rem;
    border-bottom: 1px solid #DCDCDC;
    margin-bottom: 0.23rem;
    p {
      color:rgba(136,136,136,1);
    }
    span {
      color:#000;
      line-height: 0.6rem;
    }
  }
  > p {
    font-size:0.24rem;
    color:#888888;
    margin: 0.5rem 0;
  }
`

class OcrScene extends Component {
  static contextType = ConfigContext;
  static propTypes = {
    form: formShape,
  };
  state = {
    modalShow: false
    // date: this.props?.phoneInfo?.birthday,
    // genderVal: this.props?.phoneInfo?.gender
  }

  componentDidMount() {
    if (window.history && window.history.pushState) {
      // 监听手机返回
      window.history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.goBack, false);
  }

  goBack() {
    alert(<ImgDiv><img src={Img} alt=""/></ImgDiv>, 'kurang satu langkah untuk mendapatkan limit maksimal Rp 8.000.000, yakin untuk kembali?', [
      { text: 'Yakin', onPress: () => {
        history.replace('credit-items-scene')
      } },
      { text: 'Batal' },
    ])
  }

  submit = () => {
    const { validateFields } = this.props.form;
    const { user_ktp, phoneInfo, idcard_image_hand } = this.props
    validateFields({ force: true }, (error, value) => {
      if (!error) { // 没有错误的话我们就可以根据form数据进行提交了
        user_ktp({
          user_input: {
            id_card_number: value.id_card_number,
            name: value.name,
            birthday: moment(value.birthday).format('YYYY-MM-DD'),
            gender: value.gender[0]
          },
          ocr_result: phoneInfo,
          idcard_image_hand: idcard_image_hand
        })
      } else {
        console.log(error);
        // 有错误的话那就进行错误处理
        // Toast.info(error);
      }
    });
  }

  render() {
    const { text } = this.context
    const { getFieldProps, getFieldsValue } = this.props.form;
    const { phoneInfo, ossUpload, ktp_ocr, idcard_image_hand } = this.props
    return (
      <NavWrap title={text.ocrScene_title} isBgDiv={false}>
        <Steps current={0} />
        <Card isPadding={true}>
          <Phone title={text.ocrScene_phone1_title} ossUpload={ossUpload} ktp_ocr={ktp_ocr} text={text} type='face' isModal={true} />
          <Phone title={text.ocrScene_phone2_title} ossUpload={ossUpload} ktp_ocr={ktp_ocr} text={text} />
          {
            phoneInfo && (
              <ListForm>
                {text.ocrScene_list1}
                <InputItem
                  {...getFieldProps('name', {
                    initialValue: phoneInfo.name
                  })}
                  clear
                />
                <WhiteSpace size='md' />
                {text.ocrScene_list2}
                <InputItem
                  {...getFieldProps('id_card_number', {
                    initialValue: phoneInfo.id_card_number
                  })}
                  clear
                />
                <DatePicker
                  mode="date"
                  {...getFieldProps('birthday', {
                    initialValue: new Date(phoneInfo.birthday),
                    onChange: date => {
                      this.setState({ date })
                    }
                  })}
                >
                  <Item arrow="horizontal">{text.ocrScene_list3}</Item>
                </DatePicker>
                <PickerItem
                  name='gender'
                  getFieldProps={getFieldProps}
                  pickerVal={[phoneInfo.gender]}
                  data={[{
                    label: 'LAKI-LAKI',
                    value: 'LAKI-LAKI'
                  },{
                    label: 'PEREMPUAN',
                    value: 'PEREMPUAN'
                  }]}
                  label={text.ocrScene_list4}
                />
              </ListForm>
            )
          }
        </Card>
        <Btn>
          <Button type="primary" size='large' disabled={(!idcard_image_hand || !phoneInfo) ? true : false} onClick={() => {
            // this.submit()
            this.setState({
              modalShow: true
            })
          }}>
            {text.ocrScene_btn}
          </Button>
        </Btn>
        <Modal 
          transparent
          visible={this.state.modalShow}
          maskClosable
          closable
          onClose={() => {
            this.setState({
              modalShow: false
            })
          }}
          footer={[
            { text: 'Batal', onPress: () => {
              this.setState({
                modalShow: false
              })
            }},
            { text: text.ocrScene_modal_btn, onPress: () => {
              this.submit()
            }},
          ]}
        >
          <ModalBox>
            <h3>{text.ocrScene_modal_title}</h3>
            <ul>
              <li>
                <p>Nama Sesuai KTP：</p>
                <span>{getFieldsValue().name}</span>
              </li>
              <li>
                <p>Nomor KTP:</p>
                <span>{getFieldsValue().id_card_number}</span>
              </li>
              <li>
                <p>Tanggal Lahir：</p>
                <span>{moment(getFieldsValue().birthday).format('YYYY-MM-DD')}</span>
              </li>
              <li>
                <p>Jenis Kelamin：</p>
                <span>{getFieldsValue().gender?.[0]}</span>
              </li>
            </ul>
            <p>
              {text.ocrScene_modal_tip}
            </p>
          </ModalBox>
        </Modal>
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
  )(createForm()(OcrScene))
)