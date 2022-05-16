import React, { useState } from 'react';
import OSS from 'ali-oss'
import { Toast, Modal, Button } from 'antd-mobile';
import { styled } from 'loan-ui';
import phone from './assets/phone.png';
import ModalImg from './assets/img.png';

const Wrap = styled.div`
  margin: 0.2rem 0;
  width: 100%;
  position: relative;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }
`

const Title = styled.div`
  font-size:0.28rem;
  font-weight:400;
  color:rgba(136,136,136,1);
  line-height:0.28rem;
  margin-bottom: 0.24rem;
`

const Imgdiv = styled.div`
  width: 100%;
  height: 4.2rem;
  background-image: url('${(props) => props.phone}');
  background-size: 100% 100%;
`

const ModalDiv = styled.div`
  img {
    width: 4rem;
  }
`

const ModalFile = styled.div`
  position: relative;
  margin-top: 0.2rem;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 111;
  }
`

const Phone = ({title, ossUpload, ktp_ocr, type, text, isModal=false}) => {
  const [phoneImg, setPhoneIng] = useState(phone)
  const [modal, setModal] = useState(false)
  const change = (e) => {
    const target = e.target
    if (target?.files?.[0]) {
      Toast.loading('Menuat, tidak ada konten...', 0);
      const file = target.files[0];
      const windowURL = window.URL || window.webkitURL;
      const dataURL = windowURL.createObjectURL(file);
      
      const client = new OSS({   
        accessKeyId: ossUpload.AccessKeyId, 
        accessKeySecret: ossUpload.AccessKeySecret,   
        stsToken: ossUpload.SecurityToken,    
        region: 'oss-ap-southeast-5',   
        bucket: 'media-cash-market-in'
      });
      const reader = new FileReader();//此处主要用FileReader处理         
      reader.readAsDataURL(file);               
      reader.onloadend = () => {  
        const index1 = file.name.lastIndexOf('.');
        const index2 = file.name.length;
        let fileName = file.name.substring(0, index1); // 文件名
        const suffix = file.name.substring(index1, index2); // 后缀名
        // fileName = this.stripscript(fileName);
        const url = fileName + '_' + new Date().getTime() + suffix; 
        //oss上传
        client.put(
          'loan_user/' + url,   //放到loan_user文件夹下                  
          file,
        ).then(res => {
          ktp_ocr({
            ktp_photo_url: res.url
          }, type, text).then(() => {
            setPhoneIng(dataURL);
          })
          //上传结果处理，此处因为需要放开图片访问权限，所以还需要调用putACL方法处理一下
          // client.putACL(res.name, 'public-read');
        })
      }
    }
  }
  // console.log(modal,'dasda');
  return (
    <Wrap>
      <Title>{title}</Title>
      <Imgdiv phone={phoneImg} onClick={() => {
        if(isModal) {
          setModal(true)
        }
      }} />
      {!isModal && <input type="file" name='face' accept="image/*" onChange={e => {
        change(e)
      }}/>}
      <Modal 
        transparent
        visible={modal}
        maskClosable
        closable
        onClose={() => {
          setModal(false)
        }}
      >
        <ModalDiv><img src={ModalImg} alt='' /></ModalDiv>
        'silahkan foto KTP dengan jelas,foto yang buram akan menyebabkan kegagalan pinjaman anda.'
        <ModalFile>
          <input type="file" name='face' accept="image/*" onChange={e => {
            setModal(false)
            change(e)
          }}/>
          <Button type='primary'>Ambil foto</Button>
        </ModalFile>
      </Modal>
    </Wrap>
  );
}
export {Phone}
